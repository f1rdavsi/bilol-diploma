import { UserRole } from '@prisma/client'
import { idSchema, statusSchema } from '../../../utils/schemas'
import { requireRole, staffRoles } from '../../../utils/auth'
import { validationError } from '../../../utils/errors'
import { prisma } from '../../../utils/prisma'
import { createStatusHistory } from '../../../utils/orderHistory'

export default defineEventHandler(async (event) => {
  const user = await requireRole(event, staffRoles)

  try {
    const id = idSchema.parse(getRouterParam(event, 'id'))
    const { status } = statusSchema.parse(await readBody(event))
    const ownershipWhere = user.role === UserRole.ROLE_MECHANIC ? { id, employeeId: user.id } : { id }
    return await prisma.$transaction(async (tx) => {
      const current = await tx.repairOrder.findFirstOrThrow({ where: ownershipWhere })
      const queuePosition = status === 'QUEUE' && current.status !== 'QUEUE'
        ? await tx.repairOrder.count({ where: { status: 'QUEUE' } }) + 1
        : current.queuePosition
      const repairOrder = await tx.repairOrder.update({
        where: { id },
        data: {
          status,
          queuePosition: status === 'QUEUE' ? queuePosition : 0
        },
        include: {
          client: true,
          car: true,
          employee: { select: { id: true, name: true, email: true, role: true } },
          statusHistory: {
            include: { changedBy: { select: { id: true, name: true, email: true, role: true } } },
            orderBy: { createdAt: 'desc' }
          }
        }
      })

      if (current.status !== status) {
        await createStatusHistory(tx, {
          repairOrderId: id,
          changedById: user.id,
          fromStatus: current.status,
          toStatus: status,
          note: 'Статус изменён через канбан'
        })
      }

      return repairOrder
    })
  } catch (error) {
    validationError(error)
  }
})

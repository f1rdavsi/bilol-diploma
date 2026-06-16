import { UserRole } from '@prisma/client'
import { idSchema, orderSchema } from '../../utils/schemas'
import { requireRole, managerRoles } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'
import { createStatusHistory } from '../../utils/orderHistory'

export default defineEventHandler(async (event) => {
  const user = await requireRole(event, [...managerRoles, UserRole.ROLE_MECHANIC])

  try {
    const id = idSchema.parse(getRouterParam(event, 'id'))
    const body = orderSchema.partial().parse(await readBody(event))
    const ownershipWhere = user.role === UserRole.ROLE_MECHANIC ? { id, employeeId: user.id } : { id }

    return await prisma.$transaction(async (tx) => {
      const current = await tx.repairOrder.findFirstOrThrow({ where: ownershipWhere })
      const nextStatus = body.status ?? current.status
      const queuePosition = nextStatus === 'QUEUE'
        ? body.queuePosition || current.queuePosition || (await tx.repairOrder.count({ where: { status: 'QUEUE' } })) + 1
        : 0
      const repairOrder = await tx.repairOrder.update({
        where: { id },
        data: { ...body, queuePosition },
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

      if (body.status && body.status !== current.status) {
        await createStatusHistory(tx, {
          repairOrderId: id,
          changedById: user.id,
          fromStatus: current.status,
          toStatus: body.status,
          note: 'Статус изменён в форме заявки'
        })
      }

      return repairOrder
    })
  } catch (error) {
    validationError(error)
  }
})

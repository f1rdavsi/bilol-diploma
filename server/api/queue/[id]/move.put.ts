import { RepairStatus } from '@prisma/client'
import { idSchema, queueMoveSchema } from '../../../utils/schemas'
import { requireRole, managerRoles } from '../../../utils/auth'
import { validationError } from '../../../utils/errors'
import { prisma } from '../../../utils/prisma'

const activeStatuses = [
  RepairStatus.NEW,
  RepairStatus.QUEUE,
  RepairStatus.DIAGNOSTICS,
  RepairStatus.IN_REPAIR,
  RepairStatus.WAITING_PARTS
]

const repairOrderInclude = {
  client: true,
  car: true,
  employee: { select: { id: true, name: true, role: true, email: true } },
  statusHistory: {
    include: { changedBy: { select: { id: true, name: true, email: true, role: true } } },
    orderBy: { createdAt: 'desc' as const }
  }
}

export default defineEventHandler(async (event) => {
  await requireRole(event, managerRoles)

  try {
    const id = idSchema.parse(getRouterParam(event, 'id'))
    const { queuePosition } = queueMoveSchema.parse(await readBody(event))

    return await prisma.$transaction(async (tx) => {
      const items = await tx.repairOrder.findMany({
        where: { status: { in: activeStatuses } },
        orderBy: [{ queuePosition: 'asc' }, { createdAt: 'asc' }]
      })
      const currentIndex = items.findIndex(item => item.id === id)

      if (currentIndex === -1) {
        throw createError({ statusCode: 404, statusMessage: 'Repair order not found in active queue' })
      }

      const nextItems = [...items]
      const [moved] = nextItems.splice(currentIndex, 1)

      if (!moved) {
        throw createError({ statusCode: 404, statusMessage: 'Repair order not found in active queue' })
      }

      const nextIndex = Math.min(Math.max(queuePosition - 1, 0), nextItems.length)
      nextItems.splice(nextIndex, 0, moved)

      await Promise.all(
        nextItems.map((item, index) =>
          tx.repairOrder.update({
            where: { id: item.id },
            data: { queuePosition: index + 1 }
          })
        )
      )

      return await tx.repairOrder.findUniqueOrThrow({
        where: { id },
        include: repairOrderInclude
      })
    })
  } catch (error) {
    validationError(error)
  }
})

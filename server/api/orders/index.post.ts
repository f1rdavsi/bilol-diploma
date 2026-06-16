import { orderSchema } from '../../utils/schemas'
import { requireRole, managerRoles } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'
import { createStatusHistory } from '../../utils/orderHistory'

export default defineEventHandler(async (event) => {
  const user = await requireRole(event, managerRoles)

  try {
    const body = orderSchema.parse(await readBody(event))
    return await prisma.$transaction(async (tx) => {
      const queuePosition = body.status === 'QUEUE'
        ? body.queuePosition || (await tx.repairOrder.count({ where: { status: 'QUEUE' } })) + 1
        : 0
      const repairOrder = await tx.repairOrder.create({ data: { ...body, queuePosition } })

      await createStatusHistory(tx, {
        repairOrderId: repairOrder.id,
        changedById: user.id,
        toStatus: repairOrder.status,
        note: 'Заявка создана в админке'
      })

      return repairOrder
    })
  } catch (error) {
    validationError(error)
  }
})

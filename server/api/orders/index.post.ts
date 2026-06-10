import { orderSchema } from '../../utils/schemas'
import { requireRole, managerRoles } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, managerRoles)

  try {
    const body = orderSchema.parse(await readBody(event))
    const queuePosition = body.queuePosition || (await prisma.repairOrder.count({ where: { status: 'QUEUE' } })) + 1
    return await prisma.repairOrder.create({ data: { ...body, queuePosition } })
  } catch (error) {
    validationError(error)
  }
})

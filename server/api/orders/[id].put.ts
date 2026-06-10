import { UserRole } from '@prisma/client'
import { idSchema, orderSchema } from '../../utils/schemas'
import { requireRole, managerRoles } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = await requireRole(event, [...managerRoles, UserRole.ROLE_MECHANIC])

  try {
    const id = idSchema.parse(getRouterParam(event, 'id'))
    const body = orderSchema.partial().parse(await readBody(event))
    const where = user.role === UserRole.ROLE_MECHANIC ? { id, employeeId: user.id } : { id }
    return await prisma.repairOrder.update({ where, data: body })
  } catch (error) {
    validationError(error)
  }
})

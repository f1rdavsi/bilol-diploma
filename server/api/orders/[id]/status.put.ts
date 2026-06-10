import { UserRole } from '@prisma/client'
import { idSchema, statusSchema } from '../../../utils/schemas'
import { requireRole, staffRoles } from '../../../utils/auth'
import { validationError } from '../../../utils/errors'
import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = await requireRole(event, staffRoles)

  try {
    const id = idSchema.parse(getRouterParam(event, 'id'))
    const { status } = statusSchema.parse(await readBody(event))
    const where = user.role === UserRole.ROLE_MECHANIC ? { id, employeeId: user.id } : { id }
    return await prisma.repairOrder.update({ where, data: { status } })
  } catch (error) {
    validationError(error)
  }
})

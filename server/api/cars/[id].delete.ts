import { idSchema } from '../../utils/schemas'
import { requireRole, managerRoles } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, managerRoles)

  try {
    const id = idSchema.parse(getRouterParam(event, 'id'))
    await prisma.car.delete({ where: { id } })
    return { ok: true }
  } catch (error) {
    validationError(error)
  }
})

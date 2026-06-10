import { carSchema, idSchema } from '../../utils/schemas'
import { requireRole, managerRoles } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, managerRoles)

  try {
    const id = idSchema.parse(getRouterParam(event, 'id'))
    return await prisma.car.update({ where: { id }, data: carSchema.parse(await readBody(event)) })
  } catch (error) {
    validationError(error)
  }
})

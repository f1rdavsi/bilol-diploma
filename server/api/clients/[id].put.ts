import { clientSchema, idSchema } from '../../utils/schemas'
import { requireRole, managerRoles } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, managerRoles)

  try {
    const id = idSchema.parse(getRouterParam(event, 'id'))
    return await prisma.client.update({ where: { id }, data: clientSchema.parse(await readBody(event)) })
  } catch (error) {
    validationError(error)
  }
})

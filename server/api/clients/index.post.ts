import { clientSchema } from '../../utils/schemas'
import { requireRole, managerRoles } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, managerRoles)

  try {
    return await prisma.client.create({ data: clientSchema.parse(await readBody(event)) })
  } catch (error) {
    validationError(error)
  }
})

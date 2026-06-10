import { UserRole } from '@prisma/client'
import { idSchema } from '../../utils/schemas'
import { requireRole } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, [UserRole.ROLE_ADMIN])

  try {
    const id = idSchema.parse(getRouterParam(event, 'id'))
    await prisma.user.delete({ where: { id } })
    return { ok: true }
  } catch (error) {
    validationError(error)
  }
})

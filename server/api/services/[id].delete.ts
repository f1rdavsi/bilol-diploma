import { UserRole } from '@prisma/client'
import { requireRole } from '../../utils/auth'
import { idSchema } from '../../utils/schemas'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, [UserRole.ROLE_ADMIN, UserRole.ROLE_MANAGER])
  const id = idSchema.parse(getRouterParam(event, 'id'))

  await prisma.service.delete({ where: { id } })

  return { ok: true }
})

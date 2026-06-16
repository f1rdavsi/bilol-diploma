import { UserRole } from '@prisma/client'
import { requireRole } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { idSchema, serviceSchema } from '../../utils/schemas'
import { prisma } from '../../utils/prisma'
import { serializeService } from '../../utils/services'

export default defineEventHandler(async (event) => {
  await requireRole(event, [UserRole.ROLE_ADMIN, UserRole.ROLE_MANAGER])
  const id = idSchema.parse(getRouterParam(event, 'id'))

  try {
    const body = serviceSchema.parse(await readBody(event))
    const service = await prisma.service.update({
      where: { id },
      data: body
    })

    return serializeService(service)
  } catch (error) {
    validationError(error)
  }
})

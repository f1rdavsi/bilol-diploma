import { UserRole } from '@prisma/client'
import { requireRole } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'
import { serviceSchema } from '../../utils/schemas'
import { serializeService } from '../../utils/services'

export default defineEventHandler(async (event) => {
  await requireRole(event, [UserRole.ROLE_ADMIN, UserRole.ROLE_MANAGER])

  try {
    const body = serviceSchema.parse(await readBody(event))
    const service = await prisma.service.create({ data: body })

    return serializeService(service)
  } catch (error) {
    validationError(error)
  }
})

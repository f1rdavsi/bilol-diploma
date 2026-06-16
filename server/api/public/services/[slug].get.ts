import { prisma } from '../../../utils/prisma'
import { serializeService } from '../../../utils/services'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found' })
  }

  const service = await prisma.service.findFirst({
    where: { slug, isActive: true }
  })

  if (!service) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found' })
  }

  return serializeService(service)
})

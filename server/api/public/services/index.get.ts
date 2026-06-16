import type { Prisma } from '@prisma/client'
import { prisma } from '../../../utils/prisma'
import { serializeService } from '../../../utils/services'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const search = typeof query.search === 'string' && query.search.length >= 2 ? query.search : ''
  const where: Prisma.ServiceWhereInput = {
    isActive: true,
    ...(search ? { OR: [{ title: { contains: search } }, { short: { contains: search } }] } : {})
  }

  const items = await prisma.service.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }]
  })

  return { items: items.map(serializeService), total: items.length }
})

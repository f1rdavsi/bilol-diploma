import type { Prisma } from '@prisma/client'
import { requireRole, managerRoles } from '../../utils/auth'
import { listQuery } from '../../utils/query'
import { prisma } from '../../utils/prisma'
import { serializeService } from '../../utils/services'

export default defineEventHandler(async (event) => {
  await requireRole(event, managerRoles)
  const { search, page, pageSize, skip } = listQuery(event)
  const where: Prisma.ServiceWhereInput = search
    ? { OR: [{ title: { contains: search } }, { slug: { contains: search } }, { short: { contains: search } }] }
    : {}

  const [items, total] = await Promise.all([
    prisma.service.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
      skip,
      take: pageSize
    }),
    prisma.service.count({ where })
  ])

  return { items: items.map(serializeService), total, page, pageSize }
})

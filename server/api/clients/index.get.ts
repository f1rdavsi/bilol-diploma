import { Prisma } from '@prisma/client'
import { requireRole, staffRoles } from '../../utils/auth'
import { listQuery } from '../../utils/query'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, staffRoles)
  const { search, page, pageSize, skip } = listQuery(event)
  const where: Prisma.ClientWhereInput = search
    ? {
        OR: [
          { fullName: { contains: search } },
          { phone: { contains: search } },
          { address: { contains: search } }
        ]
      }
    : {}

  const [items, total] = await Promise.all([
    prisma.client.findMany({
      where,
      include: { cars: true, _count: { select: { orders: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize
    }),
    prisma.client.count({ where })
  ])

  return { items, total, page, pageSize }
})

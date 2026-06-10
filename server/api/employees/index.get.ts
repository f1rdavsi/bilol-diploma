import { UserRole } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import { requireRole, managerRoles } from '../../utils/auth'
import { listQuery } from '../../utils/query'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, managerRoles)
  const { search, page, pageSize, skip } = listQuery(event)
  const where: Prisma.UserWhereInput = {
    role: { in: [UserRole.ROLE_ADMIN, UserRole.ROLE_MANAGER, UserRole.ROLE_MECHANIC] },
    ...(search ? { OR: [{ name: { contains: search } }, { email: { contains: search } }] } : {})
  }

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: { id: true, name: true, email: true, role: true, createdAt: true, _count: { select: { assignedOrders: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize
    }),
    prisma.user.count({ where })
  ])

  return { items, total, page, pageSize }
})

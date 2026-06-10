import { Prisma, UserRole } from '@prisma/client'
import { requireRole, requireUser, staffRoles } from '../../utils/auth'
import { listQuery } from '../../utils/query'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = await requireRole(event, staffRoles)
  const { search, page, pageSize, skip } = listQuery(event)
  const query = getQuery(event)
  const status = typeof query.status === 'string' ? query.status : undefined
  const where: Prisma.RepairOrderWhereInput = {
    ...(user.role === UserRole.ROLE_MECHANIC ? { employeeId: user.id } : {}),
    ...(status ? { status: status as never } : {}),
    ...(search
      ? {
          OR: [
            { problemDescription: { contains: search } },
            { client: { fullName: { contains: search } } },
            { car: { plateNumber: { contains: search } } },
            { car: { vin: { contains: search } } }
          ]
        }
      : {})
  }

  await requireUser(event)
  const [items, total] = await Promise.all([
    prisma.repairOrder.findMany({
      where,
      include: { client: true, car: true, employee: { select: { id: true, name: true, email: true, role: true } } },
      orderBy: [{ queuePosition: 'asc' }, { createdAt: 'desc' }],
      skip,
      take: pageSize
    }),
    prisma.repairOrder.count({ where })
  ])

  return { items, total, page, pageSize }
})

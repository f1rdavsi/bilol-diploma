import { Prisma } from '@prisma/client'
import { requireRole, staffRoles } from '../../utils/auth'
import { listQuery } from '../../utils/query'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, staffRoles)
  const query = getQuery(event)
  const { search, page, pageSize, skip } = listQuery(event)
  const clientId = query.clientId ? Number(query.clientId) : undefined
  const where: Prisma.CarWhereInput = {
    ...(clientId ? { clientId } : {}),
    ...(search
      ? {
          OR: [
            { brand: { contains: search } },
            { model: { contains: search } },
            { vin: { contains: search } },
            { plateNumber: { contains: search } }
          ]
        }
      : {})
  }

  const [items, total] = await Promise.all([
    prisma.car.findMany({ where, include: { client: true }, orderBy: { createdAt: 'desc' }, skip, take: pageSize }),
    prisma.car.count({ where })
  ])

  return { items, total, page, pageSize }
})

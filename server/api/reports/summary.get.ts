import { RepairStatus, UserRole } from '@prisma/client'
import { requireRole, staffRoles } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, staffRoles)

  const [clients, cars, activeOrders, completedOrders, byStatus, mechanics] = await Promise.all([
    prisma.client.count(),
    prisma.car.count(),
    prisma.repairOrder.count({ where: { status: { notIn: [RepairStatus.COMPLETED, RepairStatus.HANDED_OVER] } } }),
    prisma.repairOrder.count({ where: { status: { in: [RepairStatus.COMPLETED, RepairStatus.HANDED_OVER] } } }),
    prisma.repairOrder.groupBy({ by: ['status'], _count: { status: true } }),
    prisma.user.findMany({
      where: { role: UserRole.ROLE_MECHANIC },
      select: { id: true, name: true, _count: { select: { assignedOrders: true } } },
      orderBy: { name: 'asc' }
    })
  ])

  return { clients, cars, activeOrders, completedOrders, byStatus, mechanics }
})

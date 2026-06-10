import { RepairStatus } from '@prisma/client'
import { requireRole, staffRoles } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireRole(event, staffRoles)

  const items = await prisma.repairOrder.findMany({
    where: { status: { in: [RepairStatus.QUEUE, RepairStatus.DIAGNOSTICS, RepairStatus.IN_REPAIR, RepairStatus.WAITING_PARTS] } },
    include: { client: true, car: true, employee: { select: { id: true, name: true, role: true, email: true } } },
    orderBy: [{ queuePosition: 'asc' }, { createdAt: 'asc' }]
  })

  return { items, total: items.length }
})

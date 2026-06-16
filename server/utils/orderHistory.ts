import type { Prisma, RepairStatus } from '@prisma/client'

type HistoryTx = Prisma.TransactionClient

export async function createStatusHistory(
  tx: HistoryTx,
  params: {
    repairOrderId: number
    changedById?: number | null
    fromStatus?: RepairStatus | null
    toStatus: RepairStatus
    note?: string | null
  }
) {
  return await tx.repairOrderStatusHistory.create({
    data: {
      repairOrderId: params.repairOrderId,
      changedById: params.changedById ?? null,
      fromStatus: params.fromStatus ?? null,
      toStatus: params.toStatus,
      note: params.note ?? null
    }
  })
}

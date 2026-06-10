<script setup lang="ts">
import { ListOrdered, TimerReset } from 'lucide-vue-next'
import type { TableRow } from '~/types/table'

definePageMeta({ layout: 'admin' })

const store = useQueueStore()
const toast = useToastStore()

await callOnce('queue', () => store.fetchItems(), { mode: 'navigation' })

async function move(id: number, queuePosition: number) {
  if (!Number.isInteger(queuePosition) || queuePosition < 1) {
    toast.error('Некорректная позиция', 'Позиция должна быть больше нуля')
    return
  }

  try {
    await store.move(id, queuePosition)
    toast.success('Очередь обновлена')
  } catch {
    toast.error('Не удалось изменить очередь')
  }
}
</script>

<template>
  <section class="space-y-5">
    <div class="grid gap-4 md:grid-cols-[1fr_280px]">
      <div>
        <h1 class="page-title">Очередь ремонта</h1>
        <p class="page-muted">Активные заявки, приоритет и назначенные механики</p>
      </div>
      <UiCard class="flex items-center gap-3 p-4">
        <div class="flex size-10 items-center justify-center rounded-md bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200">
          <ListOrdered class="size-5" />
        </div>
        <div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Активные заявки</p>
          <p class="text-2xl font-bold">{{ store.items.length }}</p>
        </div>
      </UiCard>
    </div>

    <UiCard class="border-cyan-200/70 bg-cyan-50/60 p-4 dark:border-cyan-900 dark:bg-cyan-950/30">
      <div class="flex items-start gap-3">
        <TimerReset class="mt-0.5 size-5 text-cyan-700 dark:text-cyan-300" />
        <div>
          <p class="font-semibold">Операционная очередь</p>
          <p class="page-muted">Меняйте позицию прямо в таблице. После изменения список обновится автоматически.</p>
        </div>
      </div>
    </UiCard>

    <DataTable :columns="[{ key: 'queuePosition', label: 'Позиция' }, { key: 'client', label: 'Клиент' }, { key: 'car', label: 'Авто' }, { key: 'status', label: 'Статус' }, { key: 'employee', label: 'Механик' }]" :rows="store.items as TableRow[]" :loading="store.loading">
      <template #client="{ row }">{{ row.client?.fullName }}</template>
      <template #car="{ row }">{{ row.car?.brand }} {{ row.car?.model }} {{ row.car?.plateNumber }}</template>
      <template #status="{ row }"><StatusBadge :status="String(row.status)" /></template>
      <template #employee="{ row }">{{ row.employee?.name || 'Не назначен' }}</template>
      <template #actions="{ row }">
        <UiInput class="ml-auto w-24" type="number" min="1" :model-value="Number(row.queuePosition)" @change="move(row.id, Number(($event.target as HTMLInputElement).value))" />
      </template>
    </DataTable>
  </section>
</template>

<script setup lang="ts">
import { DragDropProvider, PointerSensor, type DragEndEvent } from '@dnd-kit/vue'
import { PointerActivationConstraints } from '@dnd-kit/dom'
import { move as moveItems } from '@dnd-kit/helpers'
import { ListOrdered, RefreshCw, TimerReset } from 'lucide-vue-next'
import type { RepairOrder } from '~/services/resourcesApi'

definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] })

const store = useQueueStore()
const toast = useToastStore()
const pending = ref(false)
const sensors = [
  PointerSensor.configure({
    activationConstraints: [
      new PointerActivationConstraints.Distance({ value: 6 })
    ]
  })
]

await callOnce('queue', () => store.fetchItems(), { mode: 'navigation' })

async function persistOrder(order: RepairOrder[], movedId: number) {
  pending.value = true

  try {
    const queuePosition = order.findIndex(item => item.id === movedId) + 1

    if (queuePosition < 1) return

    await store.move(movedId, queuePosition)
    toast.success('Очередь обновлена')
  } catch {
    await store.fetchItems()
    toast.error('Не удалось изменить очередь')
  } finally {
    pending.value = false
  }
}

async function handleDragEnd(event: DragEndEvent) {
  if (event.canceled) return

  const movedId = Number(event.operation.source?.id)
  const nextItems = moveItems(store.items, event) as RepairOrder[]

  if (!Number.isInteger(movedId) || nextItems.map(item => item.id).join(',') === store.items.map(item => item.id).join(',')) return

  store.setItems(nextItems.map((item, index) => ({ ...item, queuePosition: index + 1 })))
  await persistOrder(nextItems, movedId)
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
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-3">
          <TimerReset class="mt-0.5 size-5 text-cyan-700 dark:text-cyan-300" />
          <div>
            <p class="font-semibold">Операционная очередь</p>
            <p class="page-muted">Зажмите карточку и потяните ее вверх или вниз, чтобы поменять приоритет ремонта.</p>
          </div>
        </div>
        <RefreshCw v-if="pending || store.loading" class="size-5 animate-spin text-cyan-700 dark:text-cyan-300" />
      </div>
    </UiCard>

    <ClientOnly>
      <DragDropProvider :sensors="sensors" @drag-end="handleDragEnd">
        <ol class="space-y-3">
          <QueueSortableItem
            v-for="(order, index) in store.items"
            :key="order.id"
            :order="order"
            :index="index"
            :disabled="pending || store.loading"
          />
        </ol>
      </DragDropProvider>

      <template #fallback>
        <UiCard class="p-6 text-sm text-slate-500 dark:text-slate-400">Загрузка очереди...</UiCard>
      </template>
    </ClientOnly>

    <UiCard v-if="!store.loading && !store.items.length" class="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
      Нет активных заявок в очереди
    </UiCard>
  </section>
</template>

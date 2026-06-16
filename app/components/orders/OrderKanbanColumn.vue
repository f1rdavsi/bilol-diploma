<script setup lang="ts">
import { useDroppable } from '@dnd-kit-vue/core'
import type { ComponentPublicInstance } from 'vue'
import type { RepairOrder, RepairStatus } from '~/services/resourcesApi'

const props = defineProps<{
  status: RepairStatus
  title: string
  description: string
  orders: RepairOrder[]
  disabled?: boolean
}>()

const emit = defineEmits<{ open: [order: RepairOrder] }>()

const droppableId = computed(() => `status-${props.status}`)
const dropData = computed(() => ({ status: props.status }))
const { setNodeRef, isOver } = useDroppable({
  id: droppableId,
  data: dropData,
  disabled: computed(() => Boolean(props.disabled))
})

function bindNode(element: Element | ComponentPublicInstance | null) {
  setNodeRef(element instanceof HTMLElement ? element : null)
}
</script>

<template>
  <section
    :ref="bindNode"
    class="flex min-h-[520px] w-[320px] shrink-0 flex-col rounded-lg border bg-slate-50/80 p-3 transition dark:bg-slate-900/60"
    :class="isOver ? 'border-cyan-300 ring-2 ring-cyan-200 dark:border-cyan-700 dark:ring-cyan-900' : 'border-slate-200 dark:border-slate-800'"
  >
    <header class="mb-3 flex items-start justify-between gap-3">
      <div>
        <h2 class="text-sm font-bold text-slate-950 dark:text-white">{{ title }}</h2>
        <p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{{ description }}</p>
      </div>
      <span class="rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:ring-slate-800">
        {{ orders.length }}
      </span>
    </header>

    <div class="flex flex-1 flex-col gap-3">
      <OrderKanbanCard
        v-for="order in orders"
        :key="order.id"
        :order="order"
        :disabled="disabled"
        @open="emit('open', $event)"
      />

      <div v-if="!orders.length" class="grid flex-1 place-items-center rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400 dark:border-slate-700">
        Нет заявок
      </div>
    </div>
  </section>
</template>

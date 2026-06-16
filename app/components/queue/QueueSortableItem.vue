<script setup lang="ts">
import { computed, ref } from 'vue'
import { UserRound, Wrench } from 'lucide-vue-next'
import { useSortable } from '@dnd-kit/vue/sortable'
import type { RepairOrder } from '~/services/resourcesApi'

const props = defineProps<{
  order: RepairOrder
  index: number
  disabled?: boolean
}>()

const element = ref<HTMLElement | null>(null)
const disabled = computed(() => Boolean(props.disabled))

const { isDragging, isDropTarget } = useSortable({
  id: computed(() => props.order.id),
  index: computed(() => props.index),
  element,
  disabled,
  data: computed(() => ({ orderId: props.order.id }))
})
</script>

<template>
  <li
    ref="element"
    class="grid select-none gap-3 rounded-lg border bg-white p-4 shadow-sm transition dark:bg-slate-950 md:grid-cols-[56px_1fr_auto]"
    :class="[
      disabled ? 'cursor-not-allowed opacity-70' : isDragging ? 'cursor-grabbing opacity-45 ring-2 ring-cyan-300 dark:ring-cyan-800' : 'cursor-grab hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md active:cursor-grabbing dark:hover:border-cyan-900',
      isDropTarget ? 'border-cyan-300 bg-cyan-50/70 dark:border-cyan-800 dark:bg-cyan-950/30' : 'border-slate-200 dark:border-slate-800'
    ]"
  >
    <div class="flex items-center">
      <span class="inline-flex min-w-10 justify-center rounded-md bg-slate-100 px-2 py-1 text-sm font-bold text-slate-700 dark:bg-slate-900 dark:text-slate-200">
        {{ index + 1 }}
      </span>
    </div>

    <div class="min-w-0">
      <div class="flex flex-wrap items-center gap-2">
        <p class="font-semibold text-slate-950 dark:text-white">
          #{{ order.id }} {{ order.client?.fullName || 'Клиент' }}
        </p>
        <StatusBadge :status="order.status" />
      </div>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {{ order.car?.brand }} {{ order.car?.model }} · {{ order.car?.plateNumber }}
      </p>
      <p class="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
        {{ order.problemDescription }}
      </p>
    </div>

    <div class="grid gap-2 text-sm text-slate-500 dark:text-slate-400 md:min-w-48">
      <span class="inline-flex items-center gap-2">
        <UserRound class="size-4" />
        {{ order.employee?.name || 'Не назначен' }}
      </span>
      <span class="inline-flex items-center gap-2">
        <Wrench class="size-4" />
        {{ Number(order.price || 0).toLocaleString('ru-RU') }} TJS
      </span>
    </div>
  </li>
</template>

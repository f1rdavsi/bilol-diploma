<script setup lang="ts">
import { CalendarClock, GripVertical, UserRound } from 'lucide-vue-next'
import { useDraggable } from '@dnd-kit-vue/core'
import type { ComponentPublicInstance } from 'vue'
import type { RepairOrder } from '~/services/resourcesApi'

const props = defineProps<{ order: RepairOrder, disabled?: boolean }>()
const emit = defineEmits<{ open: [order: RepairOrder] }>()

const draggableId = computed(() => `order-${props.order.id}`)
const dragData = computed(() => ({ orderId: props.order.id, status: props.order.status }))
const disabled = computed(() => Boolean(props.disabled))
const { attributes, listeners, setActivatorNodeRef, setNodeRef, transform, isDragging } = useDraggable({
  id: draggableId,
  data: dragData,
  disabled
})

const cardStyle = computed(() => ({
  transform: transform.value ? `translate3d(${Math.round(transform.value.x)}px, ${Math.round(transform.value.y)}px, 0)` : undefined,
  opacity: isDragging.value ? '0.35' : undefined
}))
const dragBindings = computed(() => ({ ...attributes.value, ...listeners.value }))

function bindNode(element: Element | ComponentPublicInstance | null) {
  setNodeRef(element instanceof HTMLElement ? element : null)
}

function bindActivatorNode(element: Element | ComponentPublicInstance | null) {
  setActivatorNodeRef(element instanceof HTMLElement ? element : null)
}
</script>

<template>
  <article
    :ref="bindNode"
    class="group cursor-pointer rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-cyan-900"
    :style="cardStyle"
    @click="emit('open', order)"
  >
    <div class="mb-3 flex items-start justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-slate-950 dark:text-white">#{{ order.id }} {{ order.client?.fullName || 'Клиент' }}</p>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {{ order.car?.brand }} {{ order.car?.model }} {{ order.car?.plateNumber }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <StatusBadge :status="order.status" />
        <button
          v-if="!disabled"
          :ref="bindActivatorNode"
          class="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-cyan-700 active:cursor-grabbing dark:hover:bg-slate-800 dark:hover:text-cyan-300"
          title="Перетащить"
          type="button"
          v-bind="dragBindings"
          @click.stop
        >
          <GripVertical class="size-4" />
        </button>
      </div>
    </div>

    <p class="line-clamp-3 text-sm leading-5 text-slate-600 dark:text-slate-300">{{ order.problemDescription }}</p>

    <div class="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
      <span class="inline-flex items-center gap-1.5">
        <UserRound class="size-3.5" />
        {{ order.employee?.name || 'Не назначен' }}
      </span>
      <span class="inline-flex items-center gap-1.5">
        <CalendarClock class="size-3.5" />
        {{ Number(order.price || 0).toLocaleString('ru-RU') }} TJS
      </span>
    </div>
  </article>
</template>

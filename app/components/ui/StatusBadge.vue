<script setup lang="ts">
import type { RepairStatus } from '~/services/resourcesApi'

const props = defineProps<{ status: RepairStatus | string }>()

const labels: Record<string, string> = {
  QUEUE: 'В очереди',
  DIAGNOSTICS: 'Диагностика',
  IN_REPAIR: 'В ремонте',
  WAITING_PARTS: 'Ожидание деталей',
  COMPLETED: 'Завершено',
  HANDED_OVER: 'Выдано'
}

const classes = computed(() => ({
  QUEUE: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  DIAGNOSTICS: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-200',
  IN_REPAIR: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200',
  WAITING_PARTS: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  COMPLETED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
  HANDED_OVER: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200'
}[props.status] || 'bg-rose-100 text-rose-700'))
</script>

<template>
  <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium" :class="classes">
    {{ labels[status] || status }}
  </span>
</template>

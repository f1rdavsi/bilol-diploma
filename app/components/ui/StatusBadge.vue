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
  QUEUE: 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700',
  DIAGNOSTICS: 'bg-indigo-100 text-indigo-700 ring-indigo-200 dark:bg-indigo-950 dark:text-indigo-200 dark:ring-indigo-900',
  IN_REPAIR: 'bg-blue-100 text-blue-700 ring-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:ring-blue-900',
  WAITING_PARTS: 'bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-900',
  COMPLETED: 'bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-900',
  HANDED_OVER: 'bg-cyan-100 text-cyan-700 ring-cyan-200 dark:bg-cyan-950 dark:text-cyan-200 dark:ring-cyan-900'
}[props.status] || 'bg-rose-100 text-rose-700 ring-rose-200'))
</script>

<template>
  <span class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1" :class="classes">
    {{ labels[status] || status }}
  </span>
</template>

<script setup lang="ts">
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-vue-next'
import { cn } from '~/utils/cn'

const props = withDefaults(defineProps<{
  variant?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  class?: string
}>(), {
  variant: 'info',
  title: '',
  class: ''
})

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle
}

const styles = {
  info: 'border-cyan-200 bg-cyan-50 text-cyan-950 dark:border-cyan-900 dark:bg-cyan-950/35 dark:text-cyan-100',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/35 dark:text-emerald-100',
  warning: 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/35 dark:text-amber-100',
  danger: 'border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-900 dark:bg-rose-950/35 dark:text-rose-100'
}
</script>

<template>
  <div :class="cn('flex gap-3 rounded-lg border p-4 text-sm', styles[props.variant], $props.class)">
    <component :is="icons[props.variant]" class="mt-0.5 size-5 shrink-0" />
    <div>
      <p v-if="title" class="font-semibold">{{ title }}</p>
      <div class="mt-1 leading-6"><slot /></div>
    </div>
  </div>
</template>

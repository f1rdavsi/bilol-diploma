<script setup lang="ts">
import { cn } from '~/utils/cn'

withDefaults(defineProps<{ orientation?: 'horizontal' | 'vertical', class?: string }>(), {
  orientation: 'horizontal',
  class: ''
})
</script>

<template>
  <div
    role="separator"
    :class="cn(orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full', 'bg-slate-200 dark:bg-slate-800', $props.class)"
  />
</template>

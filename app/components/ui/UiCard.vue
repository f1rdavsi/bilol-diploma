<script setup lang="ts">
import { cn } from '~/utils/cn'

defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100', $props.class)">
    <slot />
  </div>
</template>

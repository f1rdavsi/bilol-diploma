<script setup lang="ts">
import { cn } from '~/utils/cn'

defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('overflow-auto rounded-lg border border-slate-200 dark:border-slate-800', $props.class)">
    <slot />
  </div>
</template>

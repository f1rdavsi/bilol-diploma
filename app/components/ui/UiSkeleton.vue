<script setup lang="ts">
import { cn } from '~/utils/cn'

defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-slate-200 dark:bg-slate-800', $props.class)" />
</template>

<script setup lang="ts">
defineProps<{
  label: string
  error?: string
}>()
</script>

<template>
  <label class="block space-y-1.5">
    <span class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ label }}</span>
    <slot />
    <span v-if="error" class="block text-xs font-medium text-rose-600 dark:text-rose-300">{{ error }}</span>
  </label>
</template>

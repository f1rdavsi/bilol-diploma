<script setup lang="ts">
defineProps<{ prefix?: string, suffix?: string }>()
</script>

<template>
  <div class="flex h-10 items-center overflow-hidden rounded-md border border-slate-300 bg-white text-sm focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-100 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-cyan-400 dark:focus-within:ring-cyan-950">
    <span v-if="prefix" class="border-r border-slate-200 px-3 text-slate-500 dark:border-slate-800">{{ prefix }}</span>
    <slot />
    <span v-if="suffix" class="border-l border-slate-200 px-3 text-slate-500 dark:border-slate-800">{{ suffix }}</span>
  </div>
</template>

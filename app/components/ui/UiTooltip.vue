<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <span class="group relative inline-flex">
    <slot />
    <span class="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-950 px-2 py-1 text-xs text-white shadow-lg group-hover:block dark:bg-slate-100 dark:text-slate-950">
      {{ text }}
    </span>
  </span>
</template>

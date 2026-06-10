<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <span class="relative inline-flex">
    <span @click="open = !open"><slot name="trigger" /></span>
    <div v-if="open" class="absolute right-0 top-full z-30 mt-2 min-w-56 rounded-lg border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <slot />
    </div>
  </span>
</template>

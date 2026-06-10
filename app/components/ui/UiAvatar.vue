<script setup lang="ts">
defineProps<{ name?: string, src?: string }>()
</script>

<template>
  <div class="inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
    <img v-if="src" :src="src" :alt="name || 'Avatar'" class="size-full object-cover">
    <span v-else>{{ (name || 'U').split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase() }}</span>
  </div>
</template>

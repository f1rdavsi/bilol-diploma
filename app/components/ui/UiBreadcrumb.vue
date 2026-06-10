<script setup lang="ts">
defineProps<{ items: { label: string, to?: string }[] }>()
</script>

<template>
  <nav class="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
    <template v-for="(item, index) in items" :key="item.label">
      <NuxtLink v-if="item.to" :to="item.to" class="hover:text-slate-950 dark:hover:text-white">{{ item.label }}</NuxtLink>
      <span v-else class="font-medium text-slate-900 dark:text-slate-100">{{ item.label }}</span>
      <span v-if="index < items.length - 1">/</span>
    </template>
  </nav>
</template>

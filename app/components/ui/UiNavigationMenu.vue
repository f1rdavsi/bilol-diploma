<script setup lang="ts">
defineProps<{ items: { label: string, to: string }[] }>()
</script>

<template>
  <nav class="flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
    <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
defineProps<{ items: { label: string, value: number }[] }>()

const maxValue = computed(() => 1)
</script>

<template>
  <div class="space-y-3">
    <div v-for="item in items" :key="item.label">
      <div class="mb-1 flex justify-between text-sm">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
      <div class="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
        <div class="h-full rounded-full bg-cyan-600 dark:bg-cyan-400" :style="{ width: `${Math.min(100, (item.value / Math.max(...items.map(i => i.value), maxValue)) * 100)}%` }" />
      </div>
    </div>
  </div>
</template>

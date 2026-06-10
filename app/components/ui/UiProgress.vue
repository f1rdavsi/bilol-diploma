<script setup lang="ts">
const props = withDefaults(defineProps<{ value?: number }>(), { value: 0 })

const normalized = computed(() => Math.min(100, Math.max(0, props.value)))
</script>

<template>
  <div class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
    <div class="h-full rounded-full bg-cyan-600 transition-all dark:bg-cyan-400" :style="{ width: `${normalized}%` }" />
  </div>
</template>

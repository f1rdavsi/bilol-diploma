<script setup lang="ts">
defineProps<{ title: string }>()
const open = ref(false)
</script>

<template>
  <div class="rounded-lg border border-slate-200 dark:border-slate-800">
    <button class="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold" @click="open = !open">
      {{ title }}
      <span>{{ open ? '−' : '+' }}</span>
    </button>
    <div v-if="open" class="px-4 pb-4 text-sm text-slate-500 dark:text-slate-400">
      <slot />
    </div>
  </div>
</template>

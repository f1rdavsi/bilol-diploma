<script setup lang="ts">
import { Inbox } from 'lucide-vue-next'

withDefaults(defineProps<{ title?: string, description?: string }>(), {
  title: 'Нет данных',
  description: 'Здесь появятся записи после добавления.'
})
</script>

<template>
  <div class="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
    <div class="mb-3 flex size-12 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
      <Inbox class="size-6" />
    </div>
    <h3 class="font-semibold">{{ title }}</h3>
    <p class="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{{ description }}</p>
    <div v-if="$slots.default" class="mt-4">
      <slot />
    </div>
  </div>
</template>

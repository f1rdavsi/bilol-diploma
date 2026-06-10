<script setup lang="ts">
const props = defineProps<{ items: { title: string, description: string }[] }>()
const index = ref(0)
const current = computed(() => props.items[index.value])
</script>

<template>
  <div class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
    <div class="min-h-24">
      <h3 class="font-semibold">{{ current?.title }}</h3>
      <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{{ current?.description }}</p>
    </div>
    <div class="mt-4 flex justify-between">
      <AppButton variant="outline" size="sm" @click="index = Math.max(0, index - 1)">Назад</AppButton>
      <AppButton variant="outline" size="sm" @click="index = Math.min(items.length - 1, index + 1)">Вперед</AppButton>
    </div>
  </div>
</template>

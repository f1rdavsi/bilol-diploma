<script setup lang="ts">
const props = withDefaults(defineProps<{ page: number, total: number, pageSize?: number }>(), {
  pageSize: 10
})

const emit = defineEmits<{ change: [page: number] }>()
const pages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

function go(page: number) {
  emit('change', Math.min(pages.value, Math.max(1, page)))
}
</script>

<template>
  <div class="flex items-center justify-between gap-3">
    <p class="text-sm text-slate-500 dark:text-slate-400">Страница {{ page }} из {{ pages }}</p>
    <div class="flex gap-2">
      <AppButton variant="outline" size="sm" :disabled="page <= 1" @click="go(page - 1)">Назад</AppButton>
      <AppButton variant="outline" size="sm" :disabled="page >= pages" @click="go(page + 1)">Вперед</AppButton>
    </div>
  </div>
</template>

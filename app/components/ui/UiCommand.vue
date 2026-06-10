<script setup lang="ts">
import { Search } from 'lucide-vue-next'

const props = defineProps<{ items: { label: string, description?: string }[] }>()
const search = ref('')
const filtered = computed(() => props.items.filter(item => item.label.toLowerCase().includes(search.value.toLowerCase())))
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
    <div class="flex items-center gap-2 border-b border-slate-200 px-3 dark:border-slate-800">
      <Search class="size-4 text-slate-400" />
      <input v-model="search" class="h-11 flex-1 border-0 bg-transparent px-0 focus:ring-0" placeholder="Введите команду...">
    </div>
    <div class="max-h-72 overflow-auto p-1">
      <button v-for="item in filtered" :key="item.label" class="block w-full rounded-md px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800">
        <span class="block text-sm font-medium">{{ item.label }}</span>
        <span v-if="item.description" class="text-xs text-slate-500">{{ item.description }}</span>
      </button>
    </div>
  </div>
</template>

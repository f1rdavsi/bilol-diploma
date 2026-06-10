<script setup lang="ts">
defineProps<{ items: { label: string, danger?: boolean }[] }>()
const emit = defineEmits<{ select: [item: { label: string, danger?: boolean }] }>()
const open = ref(false)
</script>

<template>
  <span class="relative inline-flex">
    <span @click="open = !open"><slot /></span>
    <div v-if="open" class="absolute right-0 top-full z-30 mt-2 min-w-44 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <button
        v-for="item in items"
        :key="item.label"
        class="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        :class="item.danger ? 'text-rose-600 dark:text-rose-300' : 'text-slate-700 dark:text-slate-200'"
        @click="emit('select', item); open = false"
      >
        {{ item.label }}
      </button>
    </div>
  </span>
</template>

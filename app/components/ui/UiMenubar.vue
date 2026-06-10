<script setup lang="ts">
defineProps<{ items: { label: string, children?: string[] }[] }>()
const active = ref<string | null>(null)
</script>

<template>
  <div class="inline-flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
    <span v-for="item in items" :key="item.label" class="relative">
      <button class="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800" @click="active = active === item.label ? null : item.label">
        {{ item.label }}
      </button>
      <div v-if="active === item.label && item.children?.length" class="absolute left-0 top-full z-30 mt-1 min-w-40 rounded-md border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <button v-for="child in item.children" :key="child" class="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
          {{ child }}
        </button>
      </div>
    </span>
  </div>
</template>

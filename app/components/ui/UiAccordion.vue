<script setup lang="ts">
defineProps<{ items: { title: string, content: string }[] }>()

const openIndex = ref<number | null>(0)
</script>

<template>
  <div class="divide-y divide-slate-200 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
    <div v-for="(item, index) in items" :key="item.title">
      <button class="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold" @click="openIndex = openIndex === index ? null : index">
        {{ item.title }}
        <span class="text-slate-400">{{ openIndex === index ? '−' : '+' }}</span>
      </button>
      <div v-if="openIndex === index" class="px-4 pb-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

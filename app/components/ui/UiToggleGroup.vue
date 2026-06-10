<script setup lang="ts">
defineProps<{ modelValue?: string, items: { value: string, label: string }[] }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="inline-flex rounded-md border border-slate-200 p-1 dark:border-slate-800">
    <button
      v-for="item in items"
      :key="item.value"
      class="rounded px-3 py-1.5 text-sm font-medium"
      :class="modelValue === item.value ? 'bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950' : 'hover:bg-slate-100 dark:hover:bg-slate-800'"
      @click="$emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue?: string, items: { value: string, label: string }[] }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="grid gap-2">
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      class="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-left text-sm dark:border-slate-800"
      @click="$emit('update:modelValue', item.value)"
    >
      <span class="flex size-4 items-center justify-center rounded-full border" :class="modelValue === item.value ? 'border-cyan-600' : 'border-slate-300 dark:border-slate-700'">
        <span v-if="modelValue === item.value" class="size-2 rounded-full bg-cyan-600" />
      </span>
      {{ item.label }}
    </button>
  </div>
</template>

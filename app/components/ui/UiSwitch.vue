<script setup lang="ts">
defineProps<{ modelValue?: boolean }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="Boolean(modelValue)"
    class="inline-flex h-6 w-11 items-center rounded-full border border-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
    :class="modelValue ? 'bg-cyan-600 dark:bg-cyan-400' : 'bg-slate-300 dark:bg-slate-700'"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span class="size-5 rounded-full bg-white shadow transition" :class="modelValue ? 'translate-x-5' : 'translate-x-0.5'" />
  </button>
</template>

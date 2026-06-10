<script setup lang="ts">
import { Check } from 'lucide-vue-next'

defineProps<{ modelValue?: boolean }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="Boolean(modelValue)"
    class="inline-flex size-5 items-center justify-center rounded border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
    :class="modelValue ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-950' : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900'"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <Check v-if="modelValue" class="size-4" />
  </button>
</template>

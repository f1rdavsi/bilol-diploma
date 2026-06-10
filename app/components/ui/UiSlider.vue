<script setup lang="ts">
withDefaults(defineProps<{ modelValue?: number, min?: number, max?: number, step?: number }>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1
})

defineEmits<{ 'update:modelValue': [value: number] }>()
</script>

<template>
  <input
    type="range"
    :value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    class="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-cyan-600 dark:bg-slate-800"
    @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
  >
</template>

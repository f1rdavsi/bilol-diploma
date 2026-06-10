<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue?: string, length?: number }>(), { modelValue: '', length: 6 })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const digits = computed(() => props.modelValue?.split('') || [])

function setDigit(index: number, value: string) {
  const next = [...digits.value]
  next[index] = value.slice(-1)
  emit('update:modelValue', next.join('').slice(0, props.length))
}
</script>

<template>
  <div class="flex gap-2">
    <input
      v-for="(_, index) in Array.from({ length })"
      :key="index"
      :value="digits[index] || ''"
      maxlength="1"
      class="size-10 rounded-md border border-slate-300 bg-white text-center text-sm font-semibold dark:border-slate-700 dark:bg-slate-900"
      @input="setDigit(index, ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>

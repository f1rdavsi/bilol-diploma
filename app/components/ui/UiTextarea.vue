<script setup lang="ts">
import { cn } from '~/utils/cn'

defineProps<{
  modelValue?: string | number | null
  class?: string
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <textarea
    :value="modelValue ?? ''"
    :class="cn('flex min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-950', $props.class)"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

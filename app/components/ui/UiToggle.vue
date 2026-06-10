<script setup lang="ts">
defineProps<{ modelValue?: boolean }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <button
    type="button"
    class="h-9 rounded-md px-3 text-sm font-medium transition"
    :class="modelValue ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-100' : 'hover:bg-slate-100 dark:hover:bg-slate-800'"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <slot />
  </button>
</template>

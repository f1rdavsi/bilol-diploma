<script setup lang="ts">
defineProps<{ type?: 'button' | 'submit', variant?: 'primary' | 'ghost' | 'danger', disabled?: boolean }>()
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    class="inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60"
    :class="{
      'bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400': !variant || variant === 'primary',
      'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800': variant === 'ghost',
      'bg-rose-600 text-white hover:bg-rose-700': variant === 'danger'
    }"
  >
    <slot />
  </button>
</template>

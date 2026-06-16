<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  text?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div :class="['max-w-3xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p v-if="eyebrow" class="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
      {{ eyebrow }}
    </p>
    <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
      {{ title }}
    </h2>
    <p v-if="text" class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
      {{ text }}
    </p>
  </div>
</template>

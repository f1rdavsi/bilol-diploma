<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title: string
  text: string
  icon: Component
}>()
</script>

<template>
  <article class="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-950/10 dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-cyan-300/40">
    <ThreeDIcon :icon="icon" />
    <h3 class="mt-7 text-xl font-black text-slate-950 dark:text-white">{{ title }}</h3>
    <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">{{ text }}</p>
  </article>
</template>

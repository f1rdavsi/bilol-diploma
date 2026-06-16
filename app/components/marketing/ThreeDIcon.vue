<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
}>()
</script>

<template>
  <div class="icon-3d relative grid size-16 place-items-center rounded-2xl bg-slate-950 text-cyan-200 shadow-2xl shadow-cyan-950/25 ring-1 ring-white/10 dark:bg-white/10">
    <div class="absolute inset-1 rounded-xl bg-gradient-to-br from-cyan-300/35 via-white/10 to-emerald-300/20" />
    <component :is="icon" class="relative z-10 size-8 drop-shadow" />
  </div>
</template>

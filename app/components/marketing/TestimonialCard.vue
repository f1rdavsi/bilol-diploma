<script setup lang="ts">
import { Star } from 'lucide-vue-next'

defineProps<{
  name: string
  car: string
  text: string
  rating: number
}>()
</script>

<template>
  <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
    <div class="flex gap-1 text-amber-400">
      <Star v-for="item in rating" :key="item" class="size-5 fill-current" />
    </div>
    <p class="mt-5 min-h-28 text-lg leading-8 text-slate-700 dark:text-slate-200">“{{ text }}”</p>
    <div class="mt-6 border-t border-slate-200 pt-5 dark:border-white/10">
      <p class="font-black text-slate-950 dark:text-white">{{ name }}</p>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ car }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { formatServicePrice, type MarketingService } from '~/data/marketing'

defineProps<{
  service: MarketingService
}>()
</script>

<template>
  <article class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-950/[0.12] dark:border-white/10 dark:bg-white/[0.06]">
    <NuxtLink :to="`/services/${service.slug}`" class="block">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img :src="service.image" :alt="service.title" loading="lazy" class="h-full w-full object-cover transition duration-700 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
        <div class="absolute bottom-4 left-4">
          <ThreeDIcon :icon="service.icon" />
        </div>
      </div>
      <div class="p-6">
        <div class="flex items-start justify-between gap-4">
          <h3 class="text-2xl font-black text-slate-950 dark:text-white">{{ service.title }}</h3>
          <span class="grid size-10 shrink-0 place-items-center rounded-full bg-slate-950 text-cyan-200 transition group-hover:rotate-12 dark:bg-white dark:text-slate-950">
            <ArrowUpRight class="size-5" />
          </span>
        </div>
        <p class="mt-3 min-h-16 leading-7 text-slate-600 dark:text-slate-300">{{ service.short }}</p>
        <p class="mt-5 text-lg font-black text-cyan-700 dark:text-cyan-300">{{ formatServicePrice(service) }}</p>
      </div>
    </NuxtLink>
  </article>
</template>

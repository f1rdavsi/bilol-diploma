<script setup lang="ts">
import { CarFront, LogIn, Menu, X } from 'lucide-vue-next'
import { siteNav } from '~/data/marketing'

const open = ref(false)

watch(() => useRoute().fullPath, () => {
  open.value = false
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl dark:bg-slate-950/[0.72]">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-3">
        <span class="grid size-11 place-items-center rounded-2xl bg-slate-950 text-cyan-200 shadow-lg shadow-cyan-950/20 dark:bg-white dark:text-slate-950">
          <CarFront class="size-6" />
        </span>
        <span>
          <span class="block text-lg font-black tracking-tight text-slate-950 dark:text-white">AutoService</span>
          <span class="block text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">Premium Care</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="item in siteNav"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white dark:text-slate-200 dark:hover:bg-white dark:hover:text-slate-950"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <ThemeSwitcher />
        <NuxtLink
          to="/auth/login"
          class="inline-flex h-11 items-center gap-2 rounded-full bg-cyan-500 px-5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:bg-cyan-300"
        >
          <LogIn class="size-4" />
          Вход
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2 lg:hidden">
        <ThemeSwitcher />
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-950 dark:border-white/10 dark:bg-white/10 dark:text-white"
          aria-label="Открыть меню"
          @click="open = !open"
        >
          <X v-if="open" class="size-5" />
          <Menu v-else class="size-5" />
        </button>
      </div>
    </div>

    <div v-if="open" class="border-t border-slate-200 bg-white px-4 py-4 shadow-xl dark:border-white/10 dark:bg-slate-950 lg:hidden">
      <div class="mx-auto grid max-w-7xl gap-2">
        <NuxtLink
          v-for="item in siteNav"
          :key="item.to"
          :to="item.to"
          class="rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/10"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink to="/auth/login" class="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 text-sm font-bold text-slate-950">
          <LogIn class="size-4" />
          Вход в систему
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { BarChart3, Blocks, Car, ClipboardList, LayoutDashboard, ListOrdered, UsersRound, Wrench } from 'lucide-vue-next'

const items = [
  { to: '/dashboard', label: 'Панель', icon: LayoutDashboard },
  { to: '/clients', label: 'Клиенты', icon: UsersRound },
  { to: '/cars', label: 'Автомобили', icon: Car },
  { to: '/orders', label: 'Заявки', icon: ClipboardList },
  { to: '/queue', label: 'Очередь', icon: ListOrdered },
  { to: '/employees', label: 'Сотрудники', icon: Wrench },
  { to: '/reports', label: 'Отчеты', icon: BarChart3 },
  { to: '/components', label: 'UI Kit', icon: Blocks }
]
</script>

<template>
  <aside class="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white/88 p-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/88 md:block">
    <div class="mb-8 rounded-lg bg-slate-950 p-4 text-white shadow-xl shadow-cyan-950/20 dark:bg-slate-900">
      <div class="mb-4 flex items-center gap-3">
        <div class="flex size-11 items-center justify-center rounded-lg bg-cyan-400 text-slate-950">
          <Wrench class="size-6" />
        </div>
        <div>
          <p class="text-lg font-bold">AutoService</p>
          <p class="text-xs text-cyan-100">Queue control</p>
        </div>
      </div>
      <div class="rounded-md bg-white/10 p-3">
        <p class="text-xs uppercase tracking-[0.16em] text-cyan-100">Смена</p>
        <p class="mt-1 text-sm font-semibold">Операционная панель</p>
      </div>
    </div>

    <nav class="space-y-1">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
        active-class="bg-cyan-50 text-cyan-800 ring-1 ring-cyan-100 dark:bg-cyan-950/70 dark:text-cyan-100 dark:ring-cyan-900"
      >
        <component :is="item.icon" class="size-4 text-slate-400 transition group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
        {{ item.label }}
      </NuxtLink>
    </nav>
  </aside>
</template>

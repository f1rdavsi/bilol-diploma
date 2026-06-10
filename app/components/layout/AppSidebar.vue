<script setup lang="ts">
import { BarChart3, Car, ClipboardList, LayoutDashboard, ListOrdered, UsersRound, Wrench } from 'lucide-vue-next'

const items = [
  { to: '/dashboard', label: 'Панель', icon: LayoutDashboard },
  { to: '/clients', label: 'Клиенты', icon: UsersRound },
  { to: '/cars', label: 'Автомобили', icon: Car },
  { to: '/orders', label: 'Заявки', icon: ClipboardList },
  { to: '/queue', label: 'Очередь', icon: ListOrdered },
  { to: '/employees', label: 'Сотрудники', icon: Wrench },
  { to: '/reports', label: 'Отчеты', icon: BarChart3 }
]
</script>

<template>
  <aside class="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:block">
    <div class="mb-8">
      <p class="text-lg font-bold">AutoService Queue</p>
      <p class="text-xs text-slate-500">Управление ремонтом</p>
    </div>
    <nav class="space-y-1">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        active-class="bg-cyan-50 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200"
      >
        <component :is="item.icon" class="size-4" />
        {{ item.label }}
      </NuxtLink>
    </nav>
  </aside>
</template>

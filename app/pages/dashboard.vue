<script setup lang="ts">
import { Activity, CarFront, CheckCircle2, ClipboardList, Timer, UsersRound, Wrench } from 'lucide-vue-next'

definePageMeta({ layout: 'admin' })

const reports = useReportsStore()
await callOnce('dashboard-summary', () => reports.fetchSummary(), { mode: 'navigation' })

const cards = computed(() => [
  { label: 'Клиенты', value: reports.summary?.clients ?? 0, icon: UsersRound, tone: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950 dark:text-cyan-200' },
  { label: 'Автомобили', value: reports.summary?.cars ?? 0, icon: CarFront, tone: 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-200' },
  { label: 'Активные заявки', value: reports.summary?.activeOrders ?? 0, icon: ClipboardList, tone: 'text-amber-700 bg-amber-50 dark:bg-amber-950 dark:text-amber-200' },
  { label: 'Завершено', value: reports.summary?.completedOrders ?? 0, icon: CheckCircle2, tone: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-200' }
])
</script>

<template>
  <section class="space-y-6">
    <div class="overflow-hidden rounded-lg bg-slate-950 text-white shadow-xl shadow-cyan-950/20">
      <div class="grid gap-6 p-6 md:grid-cols-[1fr_320px] md:p-8">
        <div>
          <p class="text-sm uppercase tracking-[0.2em] text-cyan-200">AutoService Queue</p>
          <h1 class="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            Панель управления ремонтом и загрузкой сервиса
          </h1>
          <p class="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Быстрый обзор очереди, активных работ, завершенных ремонтов и нагрузки мастеров.
          </p>
        </div>
        <div class="rounded-lg border border-white/10 bg-white/10 p-4">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <p class="text-sm text-slate-300">Операционный фокус</p>
              <p class="text-xl font-bold">Очередь и сроки</p>
            </div>
            <Timer class="size-7 text-cyan-200" />
          </div>
          <div class="space-y-3 text-sm">
            <div class="flex items-center justify-between rounded-md bg-slate-950/45 px-3 py-2">
              <span>Активные ремонты</span>
              <strong>{{ reports.summary?.activeOrders ?? 0 }}</strong>
            </div>
            <div class="flex items-center justify-between rounded-md bg-slate-950/45 px-3 py-2">
              <span>Механики в системе</span>
              <strong>{{ reports.summary?.mechanics?.length ?? 0 }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div v-for="card in cards" :key="card.label" class="app-surface p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="page-muted">{{ card.label }}</p>
            <p class="mt-2 text-3xl font-bold">{{ card.value }}</p>
          </div>
          <div class="flex size-11 items-center justify-center rounded-lg" :class="card.tone">
            <component :is="card.icon" class="size-6" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div class="app-surface p-5">
        <div class="mb-4 flex items-center gap-2">
          <Activity class="size-5 text-cyan-600 dark:text-cyan-300" />
          <h2 class="font-semibold">Заявки по статусам</h2>
        </div>
        <div class="space-y-3">
          <div v-for="item in reports.summary?.byStatus || []" :key="item.status" class="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-950">
            <StatusBadge :status="item.status" />
            <span class="font-semibold">{{ item._count.status }}</span>
          </div>
        </div>
      </div>

      <div class="app-surface p-5">
        <div class="mb-4 flex items-center gap-2">
          <Wrench class="size-5 text-cyan-600 dark:text-cyan-300" />
          <h2 class="font-semibold">Загрузка механиков</h2>
        </div>
        <div class="space-y-3">
          <div v-for="mechanic in reports.summary?.mechanics || []" :key="mechanic.id" class="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-950">
            <span>{{ mechanic.name }}</span>
            <span class="font-semibold">{{ mechanic._count.assignedOrders }} заявок</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

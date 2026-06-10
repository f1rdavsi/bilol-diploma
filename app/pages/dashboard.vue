<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const reports = useReportsStore()
await callOnce('dashboard-summary', () => reports.fetchSummary(), { mode: 'navigation' })

const cards = computed(() => [
  { label: 'Клиенты', value: reports.summary?.clients ?? 0 },
  { label: 'Автомобили', value: reports.summary?.cars ?? 0 },
  { label: 'Активные заявки', value: reports.summary?.activeOrders ?? 0 },
  { label: 'Завершено', value: reports.summary?.completedOrders ?? 0 }
])
</script>

<template>
  <section class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Панель управления</h1>
      <p class="text-sm text-slate-500">Сводка работы автосервиса</p>
    </div>
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div v-for="card in cards" :key="card.label" class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <p class="text-sm text-slate-500">{{ card.label }}</p>
        <p class="mt-2 text-3xl font-bold">{{ card.value }}</p>
      </div>
    </div>
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 class="mb-4 font-semibold">Заявки по статусам</h2>
        <div class="space-y-3">
          <div v-for="item in reports.summary?.byStatus || []" :key="item.status" class="flex items-center justify-between">
            <StatusBadge :status="item.status" />
            <span class="font-semibold">{{ item._count.status }}</span>
          </div>
        </div>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 class="mb-4 font-semibold">Загрузка механиков</h2>
        <div class="space-y-3">
          <div v-for="mechanic in reports.summary?.mechanics || []" :key="mechanic.id" class="flex items-center justify-between">
            <span>{{ mechanic.name }}</span>
            <span class="font-semibold">{{ mechanic._count.assignedOrders }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

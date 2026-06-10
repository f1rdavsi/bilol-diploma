<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const reports = useReportsStore()
await callOnce('reports', () => reports.fetchSummary(), { mode: 'navigation' })
</script>

<template>
  <section class="space-y-5">
    <div>
      <h1 class="text-2xl font-bold">Отчеты</h1>
      <p class="text-sm text-slate-500">Статистика заявок и сотрудников</p>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 class="mb-4 font-semibold">Статусы ремонта</h2>
        <div class="space-y-3">
          <div v-for="item in reports.summary?.byStatus || []" :key="item.status" class="flex justify-between">
            <StatusBadge :status="item.status" />
            <strong>{{ item._count.status }}</strong>
          </div>
        </div>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 class="mb-4 font-semibold">Механики</h2>
        <div class="space-y-3">
          <div v-for="mechanic in reports.summary?.mechanics || []" :key="mechanic.id" class="flex justify-between">
            <span>{{ mechanic.name }}</span>
            <strong>{{ mechanic._count.assignedOrders }}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

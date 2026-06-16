<script setup lang="ts">
import { BarChart3, Download, Wrench } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] })

const reports = useReportsStore()
const toast = useToastStore()

await callOnce('reports', () => reports.fetchSummary(), { mode: 'navigation' })

function exportSoon() {
  toast.info('Экспорт в разработке', 'Следующий шаг: PDF/Excel отчеты для дипломной демонстрации')
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="page-title">Отчеты</h1>
        <p class="page-muted">Статистика заявок, загрузка сотрудников и будущая аналитика сервиса</p>
      </div>
      <AppButton variant="secondary" @click="exportSoon">
        <Download class="size-4" />
        Экспорт
      </AppButton>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <UiCard class="p-5">
        <div class="mb-4 flex items-center gap-2">
          <BarChart3 class="size-5 text-cyan-600 dark:text-cyan-300" />
          <h2 class="font-semibold">Статусы ремонта</h2>
        </div>
        <div class="space-y-3">
          <div v-for="item in reports.summary?.byStatus || []" :key="item.status" class="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-950">
            <StatusBadge :status="item.status" />
            <strong>{{ item._count.status }}</strong>
          </div>
        </div>
      </UiCard>

      <UiCard class="p-5">
        <div class="mb-4 flex items-center gap-2">
          <Wrench class="size-5 text-cyan-600 dark:text-cyan-300" />
          <h2 class="font-semibold">Механики</h2>
        </div>
        <div class="space-y-3">
          <div v-for="mechanic in reports.summary?.mechanics || []" :key="mechanic.id" class="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-950">
            <span>{{ mechanic.name }}</span>
            <strong>{{ mechanic._count.assignedOrders }} заявок</strong>
          </div>
        </div>
      </UiCard>
    </div>
  </section>
</template>

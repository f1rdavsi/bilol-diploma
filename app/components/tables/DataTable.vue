<script setup lang="ts">
import type { TableRow } from '~/types/table'

defineProps<{
  columns: { key: string, label: string }[]
  rows: TableRow[]
  loading?: boolean
  empty?: string
}>()
</script>

<template>
  <div class="app-surface overflow-hidden">
    <div v-if="loading" class="p-6 text-sm text-slate-500 dark:text-slate-400">Загрузка данных...</div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
        <thead class="bg-slate-50 text-left text-xs uppercase tracking-[0.08em] text-slate-500 dark:bg-slate-900/80 dark:text-slate-400">
          <tr>
            <th v-for="column in columns" :key="column.key" class="whitespace-nowrap px-4 py-3 font-semibold">
              {{ column.label }}
            </th>
            <th class="whitespace-nowrap px-4 py-3 text-right font-semibold">Действия</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr v-if="!rows.length">
            <td :colspan="columns.length + 1" class="px-4 py-10 text-center text-slate-500 dark:text-slate-400">
              {{ empty || 'Нет данных для отображения' }}
            </td>
          </tr>
          <tr v-for="row in rows" :key="String(row.id)" class="transition hover:bg-cyan-50/50 dark:hover:bg-slate-800/70">
            <td v-for="column in columns" :key="column.key" class="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-200">
              <slot :name="column.key" :row="row">
                {{ row[column.key] }}
              </slot>
            </td>
            <td class="whitespace-nowrap px-4 py-3 text-right">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

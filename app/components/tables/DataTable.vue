<script setup lang="ts">
defineProps<{
  columns: { key: string, label: string }[]
  rows: Record<string, unknown>[]
  loading?: boolean
  empty?: string
}>()
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
    <div v-if="loading" class="p-6 text-sm text-slate-500">Загрузка...</div>
    <table v-else class="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
      <thead class="bg-slate-100 text-left text-xs uppercase text-slate-600 dark:bg-slate-900 dark:text-slate-400">
        <tr>
          <th v-for="column in columns" :key="column.key" class="px-4 py-3 font-semibold">
            {{ column.label }}
          </th>
          <th class="px-4 py-3 text-right font-semibold">Действия</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
        <tr v-if="!rows.length">
          <td :colspan="columns.length + 1" class="px-4 py-8 text-center text-slate-500">
            {{ empty || 'Нет данных' }}
          </td>
        </tr>
        <tr v-for="row in rows" :key="String(row.id)" class="hover:bg-slate-50 dark:hover:bg-slate-800/60">
          <td v-for="column in columns" :key="column.key" class="px-4 py-3">
            <slot :name="column.key" :row="row">
              {{ row[column.key] }}
            </slot>
          </td>
          <td class="px-4 py-3 text-right">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

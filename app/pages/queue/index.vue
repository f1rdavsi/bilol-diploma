<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const store = useQueueStore()
await callOnce('queue', () => store.fetchItems(), { mode: 'navigation' })
</script>

<template>
  <section class="space-y-5">
    <div>
      <h1 class="text-2xl font-bold">Очередь ремонта</h1>
      <p class="text-sm text-slate-500">Активные заявки: {{ store.items.length }}</p>
    </div>
    <DataTable :columns="[{ key: 'queuePosition', label: 'Позиция' }, { key: 'client', label: 'Клиент' }, { key: 'car', label: 'Авто' }, { key: 'status', label: 'Статус' }, { key: 'employee', label: 'Механик' }]" :rows="store.items as Record<string, unknown>[]" :loading="store.loading">
      <template #client="{ row }">{{ row.client?.fullName }}</template>
      <template #car="{ row }">{{ row.car?.brand }} {{ row.car?.model }} {{ row.car?.plateNumber }}</template>
      <template #status="{ row }"><StatusBadge :status="row.status" /></template>
      <template #employee="{ row }">{{ row.employee?.name || 'Не назначен' }}</template>
      <template #actions="{ row }">
        <input class="w-20" type="number" min="1" :value="row.queuePosition" @change="store.move(row.id, Number(($event.target as HTMLInputElement).value))">
      </template>
    </DataTable>
  </section>
</template>

<script setup lang="ts">
import type { TableRow } from '~/types/table'

definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] })

const store = useCarsStore()
const clients = useClientsStore()
const form = reactive({ id: 0, clientId: 0, brand: '', model: '', year: new Date().getFullYear(), vin: '', plateNumber: '' })
const search = useDebouncedSearch(value => store.fetchItems({ search: value }))

await Promise.all([callOnce('cars', () => store.fetchItems(), { mode: 'navigation' }), callOnce('clients-for-cars', () => clients.fetchItems({ pageSize: 100 }), { mode: 'navigation' })])

function edit(row: Record<string, unknown>) {
  Object.assign(form, row)
}

async function save() {
  await store.save({ ...form, id: form.id || undefined, clientId: Number(form.clientId), year: Number(form.year) })
  Object.assign(form, { id: 0, clientId: 0, brand: '', model: '', year: new Date().getFullYear(), vin: '', plateNumber: '' })
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="text-2xl font-bold">Автомобили</h1>
        <p class="text-sm text-slate-500">Всего: {{ store.total }}</p>
      </div>
      <input v-model="search" class="w-full md:w-72" placeholder="Поиск">
    </div>
    <form class="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-3 xl:grid-cols-6" @submit.prevent="save">
      <select v-model.number="form.clientId" required>
        <option :value="0" disabled>Клиент</option>
        <option v-for="client in clients.items" :key="client.id" :value="client.id">{{ client.fullName }}</option>
      </select>
      <input v-model="form.brand" required placeholder="Марка">
      <input v-model="form.model" required placeholder="Модель">
      <input v-model.number="form.year" required type="number" placeholder="Год">
      <input v-model="form.vin" required placeholder="VIN">
      <input v-model="form.plateNumber" required placeholder="Гос. номер">
      <AppButton type="submit">{{ form.id ? 'Сохранить' : 'Добавить' }}</AppButton>
    </form>
    <DataTable :columns="[{ key: 'brand', label: 'Марка' }, { key: 'model', label: 'Модель' }, { key: 'plateNumber', label: 'Номер' }, { key: 'vin', label: 'VIN' }]" :rows="store.items as TableRow[]" :loading="store.loading">
      <template #actions="{ row }">
        <AppButton variant="ghost" @click="edit(row)">Изменить</AppButton>
        <AppButton variant="danger" @click="store.remove(row.id)">Удалить</AppButton>
      </template>
    </DataTable>
  </section>
</template>

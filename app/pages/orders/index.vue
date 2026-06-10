<script setup lang="ts">
import type { RepairStatus } from '~/services/resourcesApi'

definePageMeta({ layout: 'admin' })

const store = useOrdersStore()
const clients = useClientsStore()
const cars = useCarsStore()
const employees = useEmployeesStore()
const form = reactive({ id: 0, clientId: 0, carId: 0, employeeId: null as number | null, problemDescription: '', status: 'QUEUE' as RepairStatus, price: 0, queuePosition: 0 })
const statuses: RepairStatus[] = ['QUEUE', 'DIAGNOSTICS', 'IN_REPAIR', 'WAITING_PARTS', 'COMPLETED', 'HANDED_OVER']
const search = useDebouncedSearch(value => store.fetchItems({ search: value }))

await Promise.all([
  callOnce('orders', () => store.fetchItems(), { mode: 'navigation' }),
  callOnce('clients-for-orders', () => clients.fetchItems({ pageSize: 100 }), { mode: 'navigation' }),
  callOnce('cars-for-orders', () => cars.fetchItems({ pageSize: 100 }), { mode: 'navigation' }),
  callOnce('employees-for-orders', () => employees.fetchItems({ pageSize: 100 }), { mode: 'navigation' })
])

function edit(row: any) {
  Object.assign(form, row)
}

async function save() {
  await store.save({ ...form, id: form.id || undefined, employeeId: form.employeeId || null, price: Number(form.price), queuePosition: Number(form.queuePosition) })
  Object.assign(form, { id: 0, clientId: 0, carId: 0, employeeId: null, problemDescription: '', status: 'QUEUE', price: 0, queuePosition: 0 })
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="text-2xl font-bold">Заявки</h1>
        <p class="text-sm text-slate-500">Всего: {{ store.total }}</p>
      </div>
      <input v-model="search" class="w-full md:w-72" placeholder="Поиск">
    </div>
    <form class="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-3" @submit.prevent="save">
      <select v-model.number="form.clientId" required>
        <option :value="0" disabled>Клиент</option>
        <option v-for="client in clients.items" :key="client.id" :value="client.id">{{ client.fullName }}</option>
      </select>
      <select v-model.number="form.carId" required>
        <option :value="0" disabled>Автомобиль</option>
        <option v-for="car in cars.items" :key="car.id" :value="car.id">{{ car.brand }} {{ car.model }} {{ car.plateNumber }}</option>
      </select>
      <select v-model.number="form.employeeId">
        <option :value="null">Механик</option>
        <option v-for="employee in employees.items" :key="employee.id" :value="employee.id">{{ employee.name }}</option>
      </select>
      <select v-model="form.status">
        <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
      </select>
      <input v-model.number="form.price" type="number" min="0" placeholder="Стоимость">
      <input v-model.number="form.queuePosition" type="number" min="0" placeholder="Позиция">
      <textarea v-model="form.problemDescription" required class="md:col-span-2" placeholder="Описание неисправности" />
      <AppButton type="submit">{{ form.id ? 'Сохранить' : 'Добавить' }}</AppButton>
    </form>
    <DataTable :columns="[{ key: 'client', label: 'Клиент' }, { key: 'car', label: 'Авто' }, { key: 'status', label: 'Статус' }, { key: 'price', label: 'Стоимость' }]" :rows="store.items as any" :loading="store.loading">
      <template #client="{ row }">{{ row.client?.fullName }}</template>
      <template #car="{ row }">{{ row.car?.brand }} {{ row.car?.model }}</template>
      <template #status="{ row }"><StatusBadge :status="row.status" /></template>
      <template #actions="{ row }">
        <AppButton variant="ghost" @click="edit(row)">Изменить</AppButton>
        <AppButton variant="danger" @click="store.remove(row.id)">Удалить</AppButton>
      </template>
    </DataTable>
  </section>
</template>

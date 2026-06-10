<script setup lang="ts">
import { ClipboardPlus, Search } from 'lucide-vue-next'
import type { RepairStatus } from '~/services/resourcesApi'
import type { TableRow } from '~/types/table'
import { getFormErrors, orderFormSchema, type FormErrors } from '~/utils/formSchemas'

definePageMeta({ layout: 'admin' })

const store = useOrdersStore()
const clients = useClientsStore()
const cars = useCarsStore()
const employees = useEmployeesStore()
const toast = useToastStore()
const form = reactive({ id: 0, clientId: 0, carId: 0, employeeId: null as number | null, problemDescription: '', status: 'QUEUE' as RepairStatus, price: 0, queuePosition: 0 })
const errors = ref<FormErrors>({})
const statuses: { value: RepairStatus, label: string }[] = [
  { value: 'QUEUE', label: 'В очереди' },
  { value: 'DIAGNOSTICS', label: 'Диагностика' },
  { value: 'IN_REPAIR', label: 'В ремонте' },
  { value: 'WAITING_PARTS', label: 'Ожидание деталей' },
  { value: 'COMPLETED', label: 'Завершено' },
  { value: 'HANDED_OVER', label: 'Выдано' }
]
const search = useDebouncedSearch(value => store.fetchItems({ search: value }))

await Promise.all([
  callOnce('orders', () => store.fetchItems(), { mode: 'navigation' }),
  callOnce('clients-for-orders', () => clients.fetchItems({ pageSize: 100 }), { mode: 'navigation' }),
  callOnce('cars-for-orders', () => cars.fetchItems({ pageSize: 100 }), { mode: 'navigation' }),
  callOnce('employees-for-orders', () => employees.fetchItems({ pageSize: 100 }), { mode: 'navigation' })
])

function edit(row: Record<string, unknown>) {
  Object.assign(form, row)
  errors.value = {}
}

function resetForm() {
  Object.assign(form, { id: 0, clientId: 0, carId: 0, employeeId: null, problemDescription: '', status: 'QUEUE', price: 0, queuePosition: 0 })
  errors.value = {}
}

async function save() {
  const parsed = orderFormSchema.safeParse({ ...form, employeeId: form.employeeId || null })

  if (!parsed.success) {
    errors.value = getFormErrors(parsed.error)
    toast.error('Проверьте заявку', 'Клиент, автомобиль и описание обязательны')
    return
  }

  try {
    await store.save({ ...parsed.data, id: form.id || undefined })
    toast.success(form.id ? 'Заявка обновлена' : 'Заявка создана')
    resetForm()
  } catch {
    toast.error('Не удалось сохранить заявку')
  }
}

async function remove(id: number) {
  try {
    await store.remove(id)
    toast.success('Заявка удалена')
  } catch {
    toast.error('Не удалось удалить заявку')
  }
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="page-title">Заявки</h1>
        <p class="page-muted">Ремонтные обращения, статусы и назначенные мастера. Всего: {{ store.total }}</p>
      </div>
      <div class="relative w-full md:w-80">
        <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <UiInput v-model="search" class="pl-9" placeholder="Клиент, авто, статус" />
      </div>
    </div>

    <UiCard class="p-4">
      <div class="mb-4 flex items-center gap-2">
        <div class="flex size-9 items-center justify-center rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200">
          <ClipboardPlus class="size-5" />
        </div>
        <div>
          <h2 class="font-semibold">{{ form.id ? 'Редактировать заявку' : 'Новая заявка на ремонт' }}</h2>
          <p class="page-muted">Фиксируйте проблему, очередь, стоимость и ответственного механика</p>
        </div>
      </div>

      <form class="grid gap-3 md:grid-cols-3" @submit.prevent="save">
        <FormField label="Клиент" :error="errors.clientId">
          <UiSelect v-model="form.clientId">
            <option :value="0" disabled>Выберите клиента</option>
            <option v-for="client in clients.items" :key="client.id" :value="client.id">{{ client.fullName }}</option>
          </UiSelect>
        </FormField>
        <FormField label="Автомобиль" :error="errors.carId">
          <UiSelect v-model="form.carId">
            <option :value="0" disabled>Выберите автомобиль</option>
            <option v-for="car in cars.items" :key="car.id" :value="car.id">{{ car.brand }} {{ car.model }} {{ car.plateNumber }}</option>
          </UiSelect>
        </FormField>
        <FormField label="Механик" :error="errors.employeeId">
          <UiSelect v-model="form.employeeId">
            <option :value="null">Не назначен</option>
            <option v-for="employee in employees.items" :key="employee.id" :value="employee.id">{{ employee.name }}</option>
          </UiSelect>
        </FormField>
        <FormField label="Статус" :error="errors.status">
          <UiSelect v-model="form.status">
            <option v-for="status in statuses" :key="status.value" :value="status.value">{{ status.label }}</option>
          </UiSelect>
        </FormField>
        <FormField label="Стоимость" :error="errors.price">
          <UiInput v-model="form.price" type="number" min="0" placeholder="0" />
        </FormField>
        <FormField label="Позиция в очереди" :error="errors.queuePosition">
          <UiInput v-model="form.queuePosition" type="number" min="0" placeholder="0" />
        </FormField>
        <FormField class="md:col-span-2" label="Описание неисправности" :error="errors.problemDescription">
          <UiTextarea v-model="form.problemDescription" placeholder="Что беспокоит клиента, симптомы, предварительные заметки" />
        </FormField>
        <div class="flex items-end gap-2">
          <AppButton type="submit" class="flex-1">{{ form.id ? 'Сохранить' : 'Создать' }}</AppButton>
          <AppButton v-if="form.id" variant="outline" @click="resetForm">Отмена</AppButton>
        </div>
      </form>
    </UiCard>

    <DataTable :columns="[{ key: 'client', label: 'Клиент' }, { key: 'car', label: 'Авто' }, { key: 'status', label: 'Статус' }, { key: 'price', label: 'Стоимость' }]" :rows="store.items as TableRow[]" :loading="store.loading">
      <template #client="{ row }">{{ row.client?.fullName }}</template>
      <template #car="{ row }">{{ row.car?.brand }} {{ row.car?.model }}</template>
      <template #status="{ row }"><StatusBadge :status="String(row.status)" /></template>
      <template #actions="{ row }">
        <div class="flex justify-end gap-2">
          <AppButton variant="ghost" size="sm" @click="edit(row)">Изменить</AppButton>
          <AppButton variant="danger" size="sm" @click="remove(row.id)">Удалить</AppButton>
        </div>
      </template>
    </DataTable>
  </section>
</template>

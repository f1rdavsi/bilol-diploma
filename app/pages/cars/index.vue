<script setup lang="ts">
import { CarFront, Search } from 'lucide-vue-next'
import type { TableRow } from '~/types/table'
import { carFormSchema, getFormErrors, type FormErrors } from '~/utils/formSchemas'

definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] })

const store = useCarsStore()
const clients = useClientsStore()
const toast = useToastStore()
const form = reactive({ id: 0, clientId: 0, brand: '', model: '', year: new Date().getFullYear(), vin: '', plateNumber: '' })
const errors = ref<FormErrors>({})
const search = useDebouncedSearch(value => store.fetchItems({ search: value }))

await Promise.all([
  callOnce('cars', () => store.fetchItems(), { mode: 'navigation' }),
  callOnce('clients-for-cars', () => clients.fetchItems({ pageSize: 100 }), { mode: 'navigation' })
])

function edit(row: Record<string, unknown>) {
  Object.assign(form, row)
  errors.value = {}
}

function resetForm() {
  Object.assign(form, { id: 0, clientId: 0, brand: '', model: '', year: new Date().getFullYear(), vin: '', plateNumber: '' })
  errors.value = {}
}

async function save() {
  const parsed = carFormSchema.safeParse(form)

  if (!parsed.success) {
    errors.value = getFormErrors(parsed.error)
    toast.error('Проверьте автомобиль', 'VIN, номер или год заполнены некорректно')
    return
  }

  try {
    await store.save({ ...parsed.data, id: form.id || undefined })
    toast.success(form.id ? 'Автомобиль обновлен' : 'Автомобиль добавлен')
    resetForm()
  } catch {
    toast.error('Не удалось сохранить автомобиль', 'VIN или госномер могут уже существовать')
  }
}

async function remove(id: number) {
  try {
    await store.remove(id)
    toast.success('Автомобиль удален')
  } catch {
    toast.error('Не удалось удалить автомобиль')
  }
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="page-title">Автомобили</h1>
        <p class="page-muted">Всего записей: {{ store.total }}</p>
      </div>
      <div class="relative w-full md:w-80">
        <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <UiInput v-model="search" class="pl-9" placeholder="VIN, номер, марка" />
      </div>
    </div>

    <UiCard class="p-4">
      <div class="mb-4 flex items-center gap-2">
        <div class="flex size-9 items-center justify-center rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
          <CarFront class="size-5" />
        </div>
        <div>
          <h2 class="font-semibold">{{ form.id ? 'Редактировать автомобиль' : 'Новый автомобиль' }}</h2>
          <p class="page-muted">Привязка автомобиля к клиенту и заявкам ремонта</p>
        </div>
      </div>

      <form class="grid gap-3 md:grid-cols-3 xl:grid-cols-6" @submit.prevent="save">
        <FormField label="Клиент" :error="errors.clientId">
          <UiSelect v-model="form.clientId">
            <option :value="0" disabled>Выберите клиента</option>
            <option v-for="client in clients.items" :key="client.id" :value="client.id">{{ client.fullName }}</option>
          </UiSelect>
        </FormField>
        <FormField label="Марка" :error="errors.brand">
          <UiInput v-model="form.brand" placeholder="Toyota" />
        </FormField>
        <FormField label="Модель" :error="errors.model">
          <UiInput v-model="form.model" placeholder="Camry" />
        </FormField>
        <FormField label="Год" :error="errors.year">
          <UiInput v-model="form.year" type="number" placeholder="2021" />
        </FormField>
        <FormField label="VIN" :error="errors.vin">
          <UiInput v-model="form.vin" placeholder="JTDBE32K..." />
        </FormField>
        <FormField label="Гос. номер" :error="errors.plateNumber">
          <UiInput v-model="form.plateNumber" placeholder="0101AA01" />
        </FormField>
        <div class="flex items-end gap-2 xl:col-span-2">
          <AppButton type="submit">{{ form.id ? 'Сохранить' : 'Добавить' }}</AppButton>
          <AppButton v-if="form.id" variant="outline" @click="resetForm">Отмена</AppButton>
        </div>
      </form>
    </UiCard>

    <DataTable :columns="[{ key: 'brand', label: 'Марка' }, { key: 'model', label: 'Модель' }, { key: 'plateNumber', label: 'Номер' }, { key: 'vin', label: 'VIN' }]" :rows="store.items as TableRow[]" :loading="store.loading">
      <template #actions="{ row }">
        <div class="flex justify-end gap-2">
          <AppButton variant="ghost" size="sm" @click="edit(row)">Изменить</AppButton>
          <AppButton variant="danger" size="sm" @click="remove(row.id)">Удалить</AppButton>
        </div>
      </template>
    </DataTable>
  </section>
</template>

<script setup lang="ts">
import { Plus, Search } from 'lucide-vue-next'
import type { TableRow } from '~/types/table'
import { clientFormSchema, getFormErrors, type FormErrors } from '~/utils/formSchemas'

definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] })

const store = useClientsStore()
const toast = useToastStore()
const formOpen = ref(false)
const form = reactive({ id: 0, fullName: '', phone: '', address: '' })
const errors = ref<FormErrors>({})
const search = useDebouncedSearch(value => store.fetchItems({ search: value }))

await callOnce('clients', () => store.fetchItems(), { mode: 'navigation' })

function resetForm() {
  Object.assign(form, { id: 0, fullName: '', phone: '', address: '' })
  errors.value = {}
}

function openCreate() {
  resetForm()
  formOpen.value = true
}

function edit(row: Record<string, unknown>) {
  Object.assign(form, row)
  errors.value = {}
  formOpen.value = true
}

function closeForm() {
  formOpen.value = false
  resetForm()
}

async function save() {
  const parsed = clientFormSchema.safeParse(form)

  if (!parsed.success) {
    errors.value = getFormErrors(parsed.error)
    toast.error('Проверьте форму', 'Некоторые поля заполнены некорректно')
    return
  }

  try {
    await store.save({ ...parsed.data, id: form.id || undefined })
    toast.success(form.id ? 'Клиент обновлен' : 'Клиент добавлен')
    closeForm()
  } catch {
    toast.error('Не удалось сохранить клиента', 'Проверьте данные или попробуйте еще раз')
  }
}

async function remove(id: number) {
  try {
    await store.remove(id)
    toast.success('Клиент удален')
  } catch {
    toast.error('Не удалось удалить клиента')
  }
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="page-title">Клиенты</h1>
        <p class="page-muted">Клиентская база автосервиса. Всего записей: {{ store.total }}</p>
      </div>
      <div class="flex flex-col gap-2 sm:flex-row">
        <div class="relative w-full sm:w-80">
          <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <UiInput v-model="search" class="pl-9" placeholder="Поиск от 2 символов" />
        </div>
        <AppButton @click="openCreate">
          <Plus class="size-4" />
          Добавить клиента
        </AppButton>
      </div>
    </div>

    <DataTable
      :columns="[
        { key: 'fullName', label: 'ФИО' },
        { key: 'phone', label: 'Телефон' },
        { key: 'address', label: 'Адрес' }
      ]"
      :rows="store.items as TableRow[]"
      :loading="store.loading"
    >
      <template #actions="{ row }">
        <div class="flex justify-end gap-2">
          <AppButton variant="ghost" size="sm" @click="edit(row)">Изменить</AppButton>
          <AppButton variant="danger" size="sm" @click="remove(Number(row.id))">Удалить</AppButton>
        </div>
      </template>
    </DataTable>

    <Modal :open="formOpen" :title="form.id ? 'Редактировать клиента' : 'Новый клиент'" @close="closeForm">
      <form class="grid gap-4" @submit.prevent="save">
        <FormField label="ФИО" :error="errors.fullName">
          <UiInput v-model="form.fullName" placeholder="Иванов Иван" />
        </FormField>
        <FormField label="Телефон" :error="errors.phone">
          <UiInput v-model="form.phone" placeholder="+992 900 00 00 00" />
        </FormField>
        <FormField label="Адрес" :error="errors.address">
          <UiInput v-model="form.address" placeholder="Город, улица" />
        </FormField>
        <div class="flex justify-end gap-2">
          <AppButton variant="outline" @click="closeForm">Отмена</AppButton>
          <AppButton type="submit">{{ form.id ? 'Сохранить' : 'Добавить' }}</AppButton>
        </div>
      </form>
    </Modal>
  </section>
</template>

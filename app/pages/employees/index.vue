<script setup lang="ts">
import { Search, ShieldCheck } from 'lucide-vue-next'
import type { TableRow } from '~/types/table'
import { employeeFormSchema, getFormErrors, type FormErrors } from '~/utils/formSchemas'

definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] })

const store = useEmployeesStore()
const toast = useToastStore()
const roles = [
  { value: 'ROLE_ADMIN', label: 'Администратор' },
  { value: 'ROLE_MANAGER', label: 'Менеджер' },
  { value: 'ROLE_MECHANIC', label: 'Механик' }
]
const form = reactive({ id: 0, name: '', email: '', password: '', role: 'ROLE_MECHANIC' })
const errors = ref<FormErrors>({})
const search = useDebouncedSearch(value => store.fetchItems({ search: value }))

await callOnce('employees', () => store.fetchItems(), { mode: 'navigation' })

function edit(row: Record<string, unknown>) {
  Object.assign(form, { ...row, password: '' })
  errors.value = {}
}

function resetForm() {
  Object.assign(form, { id: 0, name: '', email: '', password: '', role: 'ROLE_MECHANIC' })
  errors.value = {}
}

async function save() {
  const parsed = employeeFormSchema.safeParse(form)

  if (!parsed.success) {
    errors.value = getFormErrors(parsed.error)
    toast.error('Проверьте сотрудника', 'Имя, email или пароль заполнены некорректно')
    return
  }

  try {
    await store.save({ ...parsed.data, id: form.id || undefined, password: form.password || undefined })
    toast.success(form.id ? 'Сотрудник обновлен' : 'Сотрудник добавлен')
    resetForm()
  } catch {
    toast.error('Не удалось сохранить сотрудника', 'Email может уже использоваться')
  }
}

async function remove(id: number) {
  try {
    await store.remove(id)
    toast.success('Сотрудник удален')
  } catch {
    toast.error('Не удалось удалить сотрудника')
  }
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="page-title">Сотрудники</h1>
        <p class="page-muted">Пользователи системы и роли доступа. Всего: {{ store.total }}</p>
      </div>
      <div class="relative w-full md:w-80">
        <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <UiInput v-model="search" class="pl-9" placeholder="Имя или email" />
      </div>
    </div>

    <UiCard class="p-4">
      <div class="mb-4 flex items-center gap-2">
        <div class="flex size-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
          <ShieldCheck class="size-5" />
        </div>
        <div>
          <h2 class="font-semibold">{{ form.id ? 'Редактировать сотрудника' : 'Новый сотрудник' }}</h2>
          <p class="page-muted">Роль определяет доступ к разделам админки</p>
        </div>
      </div>

      <form class="grid gap-3 md:grid-cols-5" @submit.prevent="save">
        <FormField label="Имя" :error="errors.name">
          <UiInput v-model="form.name" placeholder="Имя сотрудника" />
        </FormField>
        <FormField label="Email" :error="errors.email">
          <UiInput v-model="form.email" type="email" placeholder="email@example.com" />
        </FormField>
        <FormField label="Пароль" :error="errors.password">
          <UiInput v-model="form.password" type="password" :placeholder="form.id ? 'Оставьте пустым' : 'Минимум 8 символов'" />
        </FormField>
        <FormField label="Роль" :error="errors.role">
          <UiSelect v-model="form.role">
            <option v-for="role in roles" :key="role.value" :value="role.value">{{ role.label }}</option>
          </UiSelect>
        </FormField>
        <div class="flex items-end gap-2">
          <AppButton type="submit" class="flex-1">{{ form.id ? 'Сохранить' : 'Добавить' }}</AppButton>
          <AppButton v-if="form.id" variant="outline" @click="resetForm">Отмена</AppButton>
        </div>
      </form>
    </UiCard>

    <DataTable :columns="[{ key: 'name', label: 'Имя' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Роль' }]" :rows="store.items as TableRow[]" :loading="store.loading">
      <template #role="{ row }">
        <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{{ row.role }}</span>
      </template>
      <template #actions="{ row }">
        <div class="flex justify-end gap-2">
          <AppButton variant="ghost" size="sm" @click="edit(row)">Изменить</AppButton>
          <AppButton variant="danger" size="sm" @click="remove(row.id)">Удалить</AppButton>
        </div>
      </template>
    </DataTable>
  </section>
</template>

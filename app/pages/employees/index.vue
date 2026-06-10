<script setup lang="ts">
definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] })

const store = useEmployeesStore()
const roles = ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_MECHANIC']
const form = reactive({ id: 0, name: '', email: '', password: '', role: 'ROLE_MECHANIC' })
const search = useDebouncedSearch(value => store.fetchItems({ search: value }))

await callOnce('employees', () => store.fetchItems(), { mode: 'navigation' })

function edit(row: Record<string, unknown>) {
  Object.assign(form, { ...row, password: '' })
}

async function save() {
  await store.save({ ...form, id: form.id || undefined, password: form.password || undefined })
  Object.assign(form, { id: 0, name: '', email: '', password: '', role: 'ROLE_MECHANIC' })
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="text-2xl font-bold">Сотрудники</h1>
        <p class="text-sm text-slate-500">Всего: {{ store.total }}</p>
      </div>
      <input v-model="search" class="w-full md:w-72" placeholder="Поиск">
    </div>
    <form class="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-5" @submit.prevent="save">
      <input v-model="form.name" required placeholder="Имя">
      <input v-model="form.email" required type="email" placeholder="Email">
      <input v-model="form.password" :required="!form.id" type="password" placeholder="Пароль">
      <select v-model="form.role">
        <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
      </select>
      <AppButton type="submit">{{ form.id ? 'Сохранить' : 'Добавить' }}</AppButton>
    </form>
    <DataTable :columns="[{ key: 'name', label: 'Имя' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Роль' }]" :rows="store.items as Record<string, unknown>[]" :loading="store.loading">
      <template #actions="{ row }">
        <AppButton variant="ghost" @click="edit(row)">Изменить</AppButton>
        <AppButton variant="danger" @click="store.remove(row.id)">Удалить</AppButton>
      </template>
    </DataTable>
  </section>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] })

const store = useClientsStore()
const form = reactive({ id: 0, fullName: '', phone: '', address: '' })
const search = useDebouncedSearch(value => store.fetchItems({ search: value }))

await callOnce('clients', () => store.fetchItems(), { mode: 'navigation' })

function edit(row: Record<string, unknown>) {
  Object.assign(form, row)
}

async function save() {
  await store.save({ ...form, id: form.id || undefined })
  Object.assign(form, { id: 0, fullName: '', phone: '', address: '' })
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="text-2xl font-bold">Клиенты</h1>
        <p class="text-sm text-slate-500">Всего: {{ store.total }}</p>
      </div>
      <input v-model="search" class="w-full md:w-72" placeholder="Поиск">
    </div>
    <form class="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4" @submit.prevent="save">
      <input v-model="form.fullName" required placeholder="ФИО">
      <input v-model="form.phone" required placeholder="Телефон">
      <input v-model="form.address" placeholder="Адрес">
      <AppButton type="submit">{{ form.id ? 'Сохранить' : 'Добавить' }}</AppButton>
    </form>
    <DataTable :columns="[{ key: 'fullName', label: 'ФИО' }, { key: 'phone', label: 'Телефон' }, { key: 'address', label: 'Адрес' }]" :rows="store.items as Record<string, unknown>[]" :loading="store.loading">
      <template #actions="{ row }">
        <AppButton variant="ghost" @click="edit(row)">Изменить</AppButton>
        <AppButton variant="danger" @click="store.remove(row.id)">Удалить</AppButton>
      </template>
    </DataTable>
  </section>
</template>

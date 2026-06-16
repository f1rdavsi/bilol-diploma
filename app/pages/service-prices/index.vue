<script setup lang="ts">
import { Plus, Search } from 'lucide-vue-next'
import type { TableRow } from '~/types/table'
import { getFormErrors, serviceFormSchema, type FormErrors } from '~/utils/formSchemas'

definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] })

const store = useServicesStore()
const toast = useToastStore()
const search = useDebouncedSearch(value => store.fetchItems({ search: value, pageSize: 50 }))
const iconOptions = ['ScanLine', 'Gauge', 'Settings2', 'BatteryCharging', 'BrainCircuit', 'Zap', 'Wrench', 'Cpu', 'ShieldCheck', 'Sparkles']
const formOpen = ref(false)
const form = reactive({
  id: 0,
  slug: '',
  title: '',
  short: '',
  description: '',
  price: 0,
  currency: 'TJS',
  image: '',
  icon: 'Wrench',
  benefitsText: '',
  stepsText: '',
  isActive: true,
  sortOrder: 0
})
const errors = ref<FormErrors>({})

await callOnce('service-prices', () => store.fetchItems({ pageSize: 50 }), { mode: 'navigation' })

function lines(value: string) {
  return value
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean)
}

function resetForm() {
  Object.assign(form, {
    id: 0,
    slug: '',
    title: '',
    short: '',
    description: '',
    price: 0,
    currency: 'TJS',
    image: '',
    icon: 'Wrench',
    benefitsText: '',
    stepsText: '',
    isActive: true,
    sortOrder: 0
  })
  errors.value = {}
}

function openCreate() {
  resetForm()
  formOpen.value = true
}

function edit(row: Record<string, unknown>) {
  Object.assign(form, {
    ...row,
    price: Number(row.price || 0),
    currency: String(row.currency || 'TJS'),
    benefitsText: Array.isArray(row.benefits) ? row.benefits.join('\n') : '',
    stepsText: Array.isArray(row.steps) ? row.steps.join('\n') : ''
  })
  errors.value = {}
  formOpen.value = true
}

function closeForm() {
  formOpen.value = false
  resetForm()
}

async function save() {
  const parsed = serviceFormSchema.safeParse(form)

  if (!parsed.success) {
    errors.value = getFormErrors(parsed.error)
    toast.error('Проверьте услугу', 'Заполните название, slug, цену, описание и списки')
    return
  }

  const { benefitsText, stepsText, ...data } = parsed.data

  try {
    await store.save({
      ...data,
      id: form.id || undefined,
      currency: 'TJS',
      benefits: lines(benefitsText),
      steps: lines(stepsText)
    })
    toast.success(form.id ? 'Услуга обновлена' : 'Услуга добавлена')
    closeForm()
    await store.fetchItems({ pageSize: 50 })
  } catch {
    toast.error('Не удалось сохранить услугу', 'Slug должен быть уникальным')
  }
}

async function remove(id: number) {
  try {
    await store.remove(id)
    toast.success('Услуга удалена')
    await store.fetchItems({ pageSize: 50 })
  } catch {
    toast.error('Не удалось удалить услугу')
  }
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="page-title">Прайс услуг</h1>
        <p class="page-muted">Управление услугами публичного сайта. Валюта: сомони. Всего: {{ store.total }}</p>
      </div>
      <div class="flex flex-col gap-2 sm:flex-row">
        <div class="relative w-full sm:w-80">
          <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <UiInput v-model="search" class="pl-9" placeholder="Название или slug" />
        </div>
        <AppButton @click="openCreate">
          <Plus class="size-4" />
          Добавить услугу
        </AppButton>
      </div>
    </div>

    <DataTable
      :columns="[
        { key: 'title', label: 'Услуга' },
        { key: 'slug', label: 'Slug' },
        { key: 'price', label: 'Цена' },
        { key: 'isActive', label: 'Статус' },
        { key: 'sortOrder', label: 'Порядок' }
      ]"
      :rows="store.items as TableRow[]"
      :loading="store.loading"
    >
      <template #price="{ row }">
        <span class="font-bold">{{ Number(row.price).toLocaleString('ru-RU') }} сомони</span>
      </template>
      <template #isActive="{ row }">
        <span
          class="rounded-md px-2 py-1 text-xs font-semibold"
          :class="row.isActive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'"
        >
          {{ row.isActive ? 'Активна' : 'Скрыта' }}
        </span>
      </template>
      <template #actions="{ row }">
        <div class="flex justify-end gap-2">
          <AppButton variant="ghost" size="sm" @click="edit(row)">Изменить</AppButton>
          <AppButton variant="danger" size="sm" @click="remove(Number(row.id))">Удалить</AppButton>
        </div>
      </template>
    </DataTable>

    <Modal :open="formOpen" :title="form.id ? 'Редактировать услугу' : 'Новая услуга'" size="xl" @close="closeForm">
      <form class="grid gap-4" @submit.prevent="save">
        <div class="grid gap-4 md:grid-cols-4">
          <FormField label="Название" :error="errors.title">
            <UiInput v-model="form.title" placeholder="Компьютерная диагностика" />
          </FormField>
          <FormField label="Slug" :error="errors.slug">
            <UiInput v-model="form.slug" placeholder="computer-diagnostics" />
          </FormField>
          <FormField label="Цена, сомони" :error="errors.price">
            <UiInput v-model="form.price" type="number" min="0" />
          </FormField>
          <FormField label="Порядок" :error="errors.sortOrder">
            <UiInput v-model="form.sortOrder" type="number" min="0" />
          </FormField>
        </div>

        <div class="grid gap-4 md:grid-cols-[1fr_220px_140px]">
          <FormField label="Изображение" :error="errors.image">
            <UiInput v-model="form.image" placeholder="https://images.unsplash.com/..." />
          </FormField>
          <FormField label="Иконка" :error="errors.icon">
            <UiSelect v-model="form.icon">
              <option v-for="icon in iconOptions" :key="icon" :value="icon">{{ icon }}</option>
            </UiSelect>
          </FormField>
          <label class="flex items-end gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold dark:border-slate-800">
            <input v-model="form.isActive" type="checkbox" class="size-4">
            Активна
          </label>
        </div>

        <FormField label="Краткое описание" :error="errors.short">
          <UiInput v-model="form.short" placeholder="Короткий текст для карточки" />
        </FormField>
        <FormField label="Полное описание" :error="errors.description">
          <UiTextarea v-model="form.description" placeholder="Описание услуги для детальной страницы" />
        </FormField>

        <div class="grid gap-4 md:grid-cols-2">
          <FormField label="Преимущества, каждое с новой строки" :error="errors.benefitsText">
            <UiTextarea v-model="form.benefitsText" rows="5" />
          </FormField>
          <FormField label="Этапы работ, каждый с новой строки" :error="errors.stepsText">
            <UiTextarea v-model="form.stepsText" rows="5" />
          </FormField>
        </div>

        <div class="flex justify-end gap-2">
          <AppButton variant="outline" @click="closeForm">Отмена</AppButton>
          <AppButton type="submit">{{ form.id ? 'Сохранить' : 'Добавить' }}</AppButton>
        </div>
      </form>
    </Modal>
  </section>
</template>

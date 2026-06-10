<script setup lang="ts">
import { PackageCheck } from 'lucide-vue-next'
import { uiRegistry } from '~/utils/componentRegistry'

definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] })

const toast = useToastStore()
const tab = ref('foundation')
const sheetOpen = ref(false)
const dialogOpen = ref(false)
const switchValue = ref(true)
const checkboxValue = ref(true)
const radioValue = ref('manager')
const sliderValue = ref(68)
const toggleValue = ref(false)
const toggleGroupValue = ref('week')
const otp = ref('123')

const stats = computed(() => {
  const implemented = uiRegistry.filter(item => item.status === 'implemented').length
  const aliases = uiRegistry.filter(item => item.status === 'alias').length
  const planned = uiRegistry.filter(item => item.status === 'planned').length
  return { implemented, aliases, planned, total: uiRegistry.length }
})

const statusVariant = {
  implemented: 'success',
  alias: 'warning',
  planned: 'secondary'
} as const

const statusLabel = {
  implemented: 'Готов',
  alias: 'Через аналог',
  planned: 'Запланирован'
}
</script>

<template>
  <section class="space-y-6">
    <div class="rounded-lg bg-slate-950 p-6 text-white shadow-xl shadow-cyan-950/20">
      <UiBreadcrumb :items="[{ label: 'Панель', to: '/dashboard' }, { label: 'UI Kit' }]" />
      <div class="mt-5 grid gap-5 md:grid-cols-[1fr_320px]">
        <div>
          <p class="text-sm uppercase tracking-[0.2em] text-cyan-200">shadcn-style registry</p>
          <h1 class="mt-2 text-3xl font-bold md:text-4xl">Компоненты админки</h1>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Внутренний UI-kit проекта AutoService Queue: формы, таблицы, статусы, уведомления, диалоги, меню и компоненты аналитики.
          </p>
        </div>
        <div class="rounded-lg border border-white/10 bg-white/10 p-4">
          <div class="flex items-center gap-3">
            <PackageCheck class="size-8 text-cyan-200" />
            <div>
              <p class="text-sm text-slate-300">Покрытие registry</p>
              <p class="text-2xl font-bold">{{ stats.implemented + stats.aliases }}/{{ stats.total }}</p>
            </div>
          </div>
          <UiProgress class="mt-4" :value="((stats.implemented + stats.aliases) / stats.total) * 100" />
        </div>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <UiCard class="p-5">
        <p class="page-muted">Готово</p>
        <p class="mt-2 text-3xl font-bold">{{ stats.implemented }}</p>
      </UiCard>
      <UiCard class="p-5">
        <p class="page-muted">Через аналог</p>
        <p class="mt-2 text-3xl font-bold">{{ stats.aliases }}</p>
      </UiCard>
      <UiCard class="p-5">
        <p class="page-muted">Запланировано</p>
        <p class="mt-2 text-3xl font-bold">{{ stats.planned }}</p>
      </UiCard>
    </div>

    <UiTabs v-model="tab" :tabs="[{ value: 'foundation', label: 'Основа' }, { value: 'forms', label: 'Формы' }, { value: 'overlays', label: 'Overlays' }, { value: 'registry', label: 'Registry' }]">
      <template #default="{ active }">
        <div v-if="active === 'foundation'" class="grid gap-4 lg:grid-cols-2">
          <UiCard class="p-5">
            <h2 class="mb-4 font-semibold">Button, Badge, Alert</h2>
            <div class="flex flex-wrap gap-2">
              <AppButton>Primary</AppButton>
              <AppButton variant="secondary">Secondary</AppButton>
              <AppButton variant="outline">Outline</AppButton>
              <AppButton variant="danger">Danger</AppButton>
              <UiTooltip text="Подсказка как Tooltip">
                <AppButton variant="ghost">Tooltip</AppButton>
              </UiTooltip>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              <UiBadge>Default</UiBadge>
              <UiBadge variant="success">Success</UiBadge>
              <UiBadge variant="warning">Warning</UiBadge>
              <UiBadge variant="danger">Danger</UiBadge>
            </div>
            <UiAlert class="mt-4" title="Сервис работает" variant="success">
              Очередь, заявки и формы подключены к единой дизайн-системе.
            </UiAlert>
          </UiCard>

          <UiCard class="p-5">
            <h2 class="mb-4 font-semibold">Accordion, Carousel, Chart</h2>
            <UiAccordion :items="[{ title: 'Очередь', content: 'Управление порядком ремонта.' }, { title: 'Заявки', content: 'Создание и назначение мастеров.' }]" />
            <UiCarousel class="mt-4" :items="[{ title: 'SLA контроль', description: 'Покажет риск задержки ремонта.' }, { title: 'Фото автомобиля', description: 'Добавит доказательную историю до и после ремонта.' }]" />
            <UiChart class="mt-4" :items="[{ label: 'Диагностика', value: 7 }, { label: 'В ремонте', value: 12 }, { label: 'Ожидание', value: 4 }]" />
          </UiCard>
        </div>

        <div v-else-if="active === 'forms'" class="grid gap-4 lg:grid-cols-2">
          <UiCard class="p-5">
            <h2 class="mb-4 font-semibold">Inputs</h2>
            <div class="grid gap-3">
              <FormField label="Input">
                <UiInput placeholder="Номер заявки или VIN" />
              </FormField>
              <FormField label="Input Group">
                <UiInputGroup prefix="VIN">
                  <input class="h-full flex-1 border-0 bg-transparent px-3 focus:ring-0" placeholder="JTDBE32K...">
                </UiInputGroup>
              </FormField>
              <FormField label="Select">
                <UiSelect>
                  <option>Менеджер</option>
                  <option>Механик</option>
                </UiSelect>
              </FormField>
              <FormField label="Textarea">
                <UiTextarea placeholder="Комментарий механика" />
              </FormField>
              <FormField label="Input OTP">
                <UiInputOtp v-model="otp" />
              </FormField>
            </div>
          </UiCard>

          <UiCard class="p-5">
            <h2 class="mb-4 font-semibold">Controls</h2>
            <div class="space-y-4">
              <div class="flex items-center gap-3"><UiCheckbox v-model="checkboxValue" /> <span>Подтвердить выдачу</span></div>
              <div class="flex items-center gap-3"><UiSwitch v-model="switchValue" /> <span>Темная смена</span></div>
              <UiRadioGroup v-model="radioValue" :items="[{ value: 'admin', label: 'Админ' }, { value: 'manager', label: 'Менеджер' }, { value: 'mechanic', label: 'Механик' }]" />
              <UiSlider v-model="sliderValue" />
              <UiToggle v-model="toggleValue">Срочно</UiToggle>
              <UiToggleGroup v-model="toggleGroupValue" :items="[{ value: 'day', label: 'День' }, { value: 'week', label: 'Неделя' }, { value: 'month', label: 'Месяц' }]" />
            </div>
          </UiCard>
        </div>

        <div v-else-if="active === 'overlays'" class="grid gap-4 lg:grid-cols-2">
          <UiCard class="p-5">
            <h2 class="mb-4 font-semibold">Menus and overlays</h2>
            <div class="flex flex-wrap gap-2">
              <AppButton @click="dialogOpen = true">Dialog</AppButton>
              <AppButton variant="secondary" @click="sheetOpen = true">Sheet</AppButton>
              <UiDropdownMenu :items="[{ label: 'Редактировать' }, { label: 'Удалить', danger: true }]" @select="toast.info($event.label)">
                <AppButton variant="outline">Dropdown</AppButton>
              </UiDropdownMenu>
              <UiPopover>
                <template #trigger><AppButton variant="outline">Popover</AppButton></template>
                <p class="text-sm text-slate-500">Быстрая карточка заявки или клиента.</p>
              </UiPopover>
            </div>
            <UiCommand class="mt-4" :items="[{ label: 'Создать заявку', description: 'Быстро открыть форму ремонта' }, { label: 'Добавить клиента' }, { label: 'Открыть отчеты' }]" />
          </UiCard>

          <UiCard class="p-5">
            <h2 class="mb-4 font-semibold">Navigation, menu, calendar</h2>
            <UiNavigationMenu :items="[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Orders', to: '/orders' }, { label: 'Reports', to: '/reports' }]" />
            <UiMenubar class="mt-4" :items="[{ label: 'Файл', children: ['Экспорт', 'Печать'] }, { label: 'Заявка', children: ['Создать', 'Назначить'] }]" />
            <UiCalendar class="mt-4" />
          </UiCard>
        </div>

        <div v-else class="space-y-4">
          <UiAlert title="Все компоненты из списка добавлены в registry" variant="info">
            Часть тяжелых компонентов закрыта через легкий MVP или alias: например Drawer через Sheet, Date Picker через Calendar, Combobox через Command.
          </UiAlert>
          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <UiCard v-for="item in uiRegistry" :key="item.name" class="p-4">
              <div class="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h3 class="font-semibold">{{ item.name }}</h3>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ item.description }}</p>
                </div>
                <UiBadge :variant="statusVariant[item.status]">{{ statusLabel[item.status] }}</UiBadge>
              </div>
              <p v-if="item.localComponent" class="text-xs text-slate-500 dark:text-slate-400">
                {{ item.localComponent }}
              </p>
            </UiCard>
          </div>
        </div>
      </template>
    </UiTabs>

    <UiDialog v-model="dialogOpen" title="Dialog" description="Пример модального окна для подтверждения действий">
      <p class="text-sm text-slate-500 dark:text-slate-400">Можно использовать для удаления заявки, смены статуса или просмотра деталей.</p>
    </UiDialog>

    <UiSheet v-model="sheetOpen" title="Sheet">
      <p class="text-sm text-slate-500 dark:text-slate-400">Боковая панель хорошо подходит для карточки заявки или фильтров таблицы.</p>
    </UiSheet>
  </section>
</template>

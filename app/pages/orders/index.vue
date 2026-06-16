<script setup lang="ts">
import { DndContext, DragOverlay, PointerSensor, type DragCancelEvent, type DragEndEvent, type DragStartEvent, useSensor, useSensors } from '@dnd-kit-vue/core'
import { Pencil, Plus, Search, Trash2 } from 'lucide-vue-next'
import type { RepairOrder, RepairStatus } from '~/services/resourcesApi'
import { ordersApi } from '~/services/resourcesApi'
import { getFormErrors, orderFormSchema, type FormErrors } from '~/utils/formSchemas'

definePageMeta({ layout: 'admin', roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_MECHANIC'] })

const store = useOrdersStore()
const clients = useClientsStore()
const cars = useCarsStore()
const employees = useEmployeesStore()
const auth = useAuthStore()
const toast = useToastStore()
const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

const statuses: { value: RepairStatus, label: string, description: string }[] = [
  { value: 'NEW', label: 'Новые', description: 'Заявки с сайта и первичные обращения' },
  { value: 'QUEUE', label: 'Очередь', description: 'Приняты менеджером и ждут старта' },
  { value: 'DIAGNOSTICS', label: 'Диагностика', description: 'Проверка и уточнение работ' },
  { value: 'IN_REPAIR', label: 'В ремонте', description: 'Активная работа мастера' },
  { value: 'WAITING_PARTS', label: 'Ожидание', description: 'Ждём детали или согласование' },
  { value: 'COMPLETED', label: 'Готово', description: 'Работы завершены' },
  { value: 'HANDED_OVER', label: 'Выдано', description: 'Автомобиль передан клиенту' }
]

const form = reactive({
  id: 0,
  clientId: 0,
  carId: 0,
  employeeId: null as number | null,
  problemDescription: '',
  status: 'NEW' as RepairStatus,
  price: 0,
  queuePosition: 0
})
const errors = ref<FormErrors>({})
const formOpen = ref(false)
const detailsOpen = ref(false)
const selectedOrder = ref<RepairOrder | null>(null)
const activeOrderId = ref<number | null>(null)
const search = useDebouncedSearch(value => store.fetchItems({ search: value, pageSize: 200 }))

const canManage = computed(() => auth.user?.role === 'ROLE_ADMIN' || auth.user?.role === 'ROLE_MANAGER')
const groupedOrders = computed(() => Object.fromEntries(
  statuses.map(status => [
    status.value,
    store.items.filter(order => order.status === status.value)
  ])
) as Record<RepairStatus, RepairOrder[]>)
const activeOrder = computed(() => store.items.find(order => order.id === activeOrderId.value) || null)

await Promise.all([
  callOnce('orders-kanban', () => store.fetchItems({ pageSize: 200 }), { mode: 'navigation' }),
  callOnce('clients-for-orders', () => clients.fetchItems({ pageSize: 100 }), { mode: 'navigation' }),
  callOnce('cars-for-orders', () => cars.fetchItems({ pageSize: 100 }), { mode: 'navigation' }),
  callOnce('employees-for-orders', () => employees.fetchItems({ pageSize: 100 }), { mode: 'navigation' })
])

function resetForm() {
  Object.assign(form, { id: 0, clientId: 0, carId: 0, employeeId: null, problemDescription: '', status: 'NEW', price: 0, queuePosition: 0 })
  errors.value = {}
}

function openCreate() {
  resetForm()
  formOpen.value = true
}

function openEdit(order: RepairOrder) {
  Object.assign(form, {
    id: order.id,
    clientId: order.clientId,
    carId: order.carId,
    employeeId: order.employeeId || null,
    problemDescription: order.problemDescription,
    status: order.status,
    price: Number(order.price || 0),
    queuePosition: order.queuePosition || 0
  })
  errors.value = {}
  formOpen.value = true
}

function openDetails(order: RepairOrder) {
  selectedOrder.value = order
  detailsOpen.value = true
}

async function save() {
  if (!canManage.value) return

  const parsed = orderFormSchema.safeParse({ ...form, employeeId: form.employeeId || null })

  if (!parsed.success) {
    errors.value = getFormErrors(parsed.error)
    toast.error('Проверьте заявку', 'Клиент, автомобиль и описание обязательны')
    return
  }

  try {
    await store.save({ ...parsed.data, id: form.id || undefined })
    toast.success(form.id ? 'Заявка обновлена' : 'Заявка создана')
    formOpen.value = false
    resetForm()
  } catch {
    toast.error('Не удалось сохранить заявку')
  }
}

async function remove(order: RepairOrder) {
  if (!canManage.value) return

  try {
    await store.remove(order.id)
    if (selectedOrder.value?.id === order.id) detailsOpen.value = false
    toast.success('Заявка удалена')
  } catch {
    toast.error('Не удалось удалить заявку')
  }
}

function handleDragStart(event: DragStartEvent) {
  activeOrderId.value = Number(String(event.active.id).replace('order-', ''))
}

function handleDragCancel(_event: DragCancelEvent) {
  activeOrderId.value = null
}

async function handleDragEnd(event: DragEndEvent) {
  activeOrderId.value = null

  if (!canManage.value || !event.over) return

  const orderId = Number(String(event.active.id).replace('order-', ''))
  const status = String(event.over.id).replace('status-', '') as RepairStatus
  const order = store.items.find(item => item.id === orderId)

  if (!order || order.status === status) return

  try {
    await ordersApi.updateStatus(orderId, status)
    await store.fetchItems({ pageSize: 200 })
    toast.success('Статус обновлён', `Заявка #${orderId} перенесена в колонку «${statuses.find(item => item.value === status)?.label}»`)
  } catch {
    toast.error('Не удалось изменить статус')
  }
}

function formatDate(value?: string) {
  if (!value) return ''
  return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}
</script>

<template>
  <section class="space-y-5">
    <div class="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 class="page-title">Канбан заявок</h1>
        <p class="page-muted">Управляйте обращениями по статусам. Новые заявки с сайта попадают в первую колонку. Всего: {{ store.total }}</p>
      </div>
      <div class="flex flex-col gap-2 sm:flex-row">
        <div class="relative w-full sm:w-80">
          <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <UiInput v-model="search" class="pl-9" placeholder="Клиент, авто, VIN или описание" />
        </div>
        <AppButton v-if="canManage" class="gap-2" @click="openCreate">
          <Plus class="size-4" />
          Новая заявка
        </AppButton>
      </div>
    </div>

    <UiCard v-if="!canManage" class="border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
      Для механика канбан открыт в режиме просмотра назначенных заявок. Перетаскивание и редактирование доступны менеджеру и админу.
    </UiCard>

    <ClientOnly>
      <DndContext
        :sensors="sensors"
        :on-drag-start="handleDragStart"
        :on-drag-cancel="handleDragCancel"
        :on-drag-end="handleDragEnd"
      >
        <div class="overflow-x-auto pb-2">
          <div class="flex min-w-max gap-4">
            <OrderKanbanColumn
              v-for="status in statuses"
              :key="status.value"
              :status="status.value"
              :title="status.label"
              :description="status.description"
              :orders="groupedOrders[status.value]"
              :disabled="!canManage"
              @open="openDetails"
            />
          </div>
        </div>
        <DragOverlay :drop-animation="null" :style="{ pointerEvents: 'none' }" :z-index="70">
          <OrderKanbanPreview v-if="activeOrder" :order="activeOrder" />
        </DragOverlay>
      </DndContext>
    </ClientOnly>

    <Modal :open="formOpen" :title="form.id ? 'Редактировать заявку' : 'Новая заявка'" @close="formOpen = false">
      <form class="grid gap-3 md:grid-cols-2" @submit.prevent="save">
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
        <FormField label="Стоимость, TJS" :error="errors.price">
          <UiInput v-model="form.price" type="number" min="0" placeholder="0" />
        </FormField>
        <FormField label="Позиция в очереди" :error="errors.queuePosition">
          <UiInput v-model="form.queuePosition" type="number" min="0" placeholder="Автоматически" />
        </FormField>
        <FormField class="md:col-span-2" label="Описание неисправности" :error="errors.problemDescription">
          <UiTextarea v-model="form.problemDescription" rows="5" placeholder="Что беспокоит клиента, симптомы, предварительные заметки" />
        </FormField>
        <div class="flex justify-end gap-2 md:col-span-2">
          <AppButton variant="outline" @click="formOpen = false">Отмена</AppButton>
          <AppButton type="submit">{{ form.id ? 'Сохранить' : 'Создать' }}</AppButton>
        </div>
      </form>
    </Modal>

    <UiSheet v-model="detailsOpen" title="Детали заявки">
      <div v-if="selectedOrder" class="space-y-5">
        <div class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
          <div class="mb-3 flex items-start justify-between gap-3">
            <div>
              <p class="text-lg font-bold">Заявка #{{ selectedOrder.id }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ selectedOrder.client?.fullName }} · {{ selectedOrder.client?.phone }}</p>
            </div>
            <StatusBadge :status="selectedOrder.status" />
          </div>
          <div class="grid gap-3 text-sm">
            <p><span class="text-slate-500">Авто:</span> {{ selectedOrder.car?.brand }} {{ selectedOrder.car?.model }} {{ selectedOrder.car?.year }} · {{ selectedOrder.car?.plateNumber }}</p>
            <p><span class="text-slate-500">VIN:</span> {{ selectedOrder.car?.vin }}</p>
            <p><span class="text-slate-500">Механик:</span> {{ selectedOrder.employee?.name || 'Не назначен' }}</p>
            <p><span class="text-slate-500">Стоимость:</span> {{ Number(selectedOrder.price || 0).toLocaleString('ru-RU') }} TJS</p>
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-semibold">Описание</h3>
          <p class="whitespace-pre-line rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700 dark:bg-slate-950 dark:text-slate-200">{{ selectedOrder.problemDescription }}</p>
        </div>

        <div>
          <h3 class="mb-3 text-sm font-semibold">История статусов</h3>
          <div class="space-y-3">
            <div v-for="item in selectedOrder.statusHistory || []" :key="item.id" class="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
              <div class="flex items-center justify-between gap-3">
                <StatusBadge :status="item.toStatus" />
                <span class="text-xs text-slate-500">{{ formatDate(item.createdAt) }}</span>
              </div>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {{ item.changedBy?.name || 'Система' }}
                <span v-if="item.fromStatus">перевёл из {{ item.fromStatus }}</span>
              </p>
              <p v-if="item.note" class="mt-1 text-xs text-slate-500">{{ item.note }}</p>
            </div>
            <div v-if="!selectedOrder.statusHistory?.length" class="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-700">
              История появится после первого изменения статуса.
            </div>
          </div>
        </div>

        <div v-if="canManage" class="flex gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
          <AppButton variant="outline" class="flex-1 gap-2" @click="openEdit(selectedOrder)">
            <Pencil class="size-4" />
            Изменить
          </AppButton>
          <AppButton variant="danger" class="gap-2" @click="remove(selectedOrder)">
            <Trash2 class="size-4" />
            Удалить
          </AppButton>
        </div>
      </div>
    </UiSheet>
  </section>
</template>

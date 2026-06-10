import { carsApi, clientsApi, employeesApi, ordersApi, queueApi, reportsApi, type Car, type Client, type Employee, type RepairOrder } from '~/services/resourcesApi'

function createResourceStore<T, TData>(api: {
  list: (params?: Record<string, string | number | undefined>) => Promise<{ items: T[], total: number }>
  create?: (data: TData) => Promise<T>
  update?: (id: number, data: TData) => Promise<T>
  delete?: (id: number) => Promise<unknown>
}) {
  const items = ref<T[]>([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchItems(params: Record<string, string | number | undefined> = {}) {
    loading.value = true
    error.value = null
    try {
      const data = await api.list(params)
      items.value = data.items
      total.value = data.total
    } catch {
      error.value = 'Ошибка загрузки данных'
    } finally {
      loading.value = false
    }
  }

  async function save(data: TData & { id?: number }) {
    if (data.id && api.update) await api.update(data.id, data)
    else if (api.create) await api.create(data)
    await fetchItems()
  }

  async function remove(id: number) {
    if (api.delete) await api.delete(id)
    await fetchItems()
  }

  return { items, total, loading, error, fetchItems, save, remove }
}

export const useClientsStore = defineStore('clients', () => createResourceStore<Client, Partial<Client>>(clientsApi))
export const useCarsStore = defineStore('cars', () => createResourceStore<Car, Partial<Car>>(carsApi))
export const useOrdersStore = defineStore('orders', () => createResourceStore<RepairOrder, Partial<RepairOrder>>(ordersApi))
export const useEmployeesStore = defineStore('employees', () => createResourceStore<Employee, Partial<Employee> & { password?: string }>(employeesApi))

export const useQueueStore = defineStore('queue', () => {
  const items = ref<RepairOrder[]>([])
  const loading = ref(false)

  async function fetchItems() {
    loading.value = true
    try {
      items.value = (await queueApi.list()).items
    } finally {
      loading.value = false
    }
  }

  async function move(id: number, queuePosition: number) {
    await queueApi.move(id, queuePosition)
    await fetchItems()
  }

  return { items, loading, fetchItems, move }
})

export const useReportsStore = defineStore('reports', () => {
  const summary = ref<any>(null)
  const loading = ref(false)

  async function fetchSummary() {
    loading.value = true
    try {
      summary.value = await reportsApi.summary()
    } finally {
      loading.value = false
    }
  }

  return { summary, loading, fetchSummary }
})

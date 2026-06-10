import type { ListResponse } from './api'
import { apiFetch } from './api'

export type RepairStatus = 'QUEUE' | 'DIAGNOSTICS' | 'IN_REPAIR' | 'WAITING_PARTS' | 'COMPLETED' | 'HANDED_OVER'

export type Client = { id: number, fullName: string, phone: string, address?: string | null, cars?: Car[] }
export type Car = { id: number, clientId: number, brand: string, model: string, year: number, vin: string, plateNumber: string, client?: Client }
export type Employee = { id: number, name: string, email: string, role: string, _count?: { assignedOrders: number } }
export type RepairOrder = {
  id: number
  clientId: number
  carId: number
  employeeId?: number | null
  client?: Client
  car?: Car
  employee?: Employee | null
  problemDescription: string
  status: RepairStatus
  price: string | number
  queuePosition: number
}

export type ReportsSummary = {
  clients: number
  cars: number
  activeOrders: number
  completedOrders: number
  byStatus: { status: RepairStatus, _count: { status: number } }[]
  mechanics: { id: number, name: string, _count: { assignedOrders: number } }[]
}

function query(params: Record<string, string | number | undefined>) {
  const queryParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') queryParams.set(key, String(value))
  })
  const result = queryParams.toString()
  return result ? `?${result}` : ''
}

export const clientsApi = {
  list: (params: Record<string, string | number | undefined> = {}) => apiFetch<ListResponse<Client>>(`/api/clients${query(params)}`),
  create: (data: Partial<Client>) => apiFetch<Client>('/api/clients', { method: 'POST', body: data }),
  update: (id: number, data: Partial<Client>) => apiFetch<Client>(`/api/clients/${id}`, { method: 'PUT', body: data }),
  delete: (id: number) => apiFetch(`/api/clients/${id}`, { method: 'DELETE' })
}

export const carsApi = {
  list: (params: Record<string, string | number | undefined> = {}) => apiFetch<ListResponse<Car>>(`/api/cars${query(params)}`),
  create: (data: Partial<Car>) => apiFetch<Car>('/api/cars', { method: 'POST', body: data }),
  update: (id: number, data: Partial<Car>) => apiFetch<Car>(`/api/cars/${id}`, { method: 'PUT', body: data }),
  delete: (id: number) => apiFetch(`/api/cars/${id}`, { method: 'DELETE' })
}

export const ordersApi = {
  list: (params: Record<string, string | number | undefined> = {}) => apiFetch<ListResponse<RepairOrder>>(`/api/orders${query(params)}`),
  create: (data: Partial<RepairOrder>) => apiFetch<RepairOrder>('/api/orders', { method: 'POST', body: data }),
  update: (id: number, data: Partial<RepairOrder>) => apiFetch<RepairOrder>(`/api/orders/${id}`, { method: 'PUT', body: data }),
  updateStatus: (id: number, status: RepairStatus) => apiFetch<RepairOrder>(`/api/orders/${id}/status`, { method: 'PUT', body: { status } }),
  delete: (id: number) => apiFetch(`/api/orders/${id}`, { method: 'DELETE' })
}

export const queueApi = {
  list: () => apiFetch<ListResponse<RepairOrder>>('/api/queue'),
  move: (id: number, queuePosition: number) => apiFetch<RepairOrder>(`/api/queue/${id}/move`, { method: 'PUT', body: { queuePosition } })
}

export const employeesApi = {
  list: (params: Record<string, string | number | undefined> = {}) => apiFetch<ListResponse<Employee>>(`/api/employees${query(params)}`),
  create: (data: Partial<Employee> & { password?: string }) => apiFetch<Employee>('/api/employees', { method: 'POST', body: data }),
  update: (id: number, data: Partial<Employee> & { password?: string }) => apiFetch<Employee>(`/api/employees/${id}`, { method: 'PUT', body: data }),
  delete: (id: number) => apiFetch(`/api/employees/${id}`, { method: 'DELETE' })
}

export const reportsApi = {
  summary: () => apiFetch<ReportsSummary>('/api/reports/summary')
}

import { apiFetch } from './api'

export type UserRole = 'ROLE_ADMIN' | 'ROLE_MANAGER' | 'ROLE_MECHANIC'

export type CurrentUser = {
  id: number
  name: string
  email: string
  role: UserRole
}

export const authApi = {
  me: () => apiFetch<CurrentUser | null>('/api/auth/me'),
  login: (data: { email: string, password: string }) => apiFetch<CurrentUser>('/api/auth/login', { method: 'POST', body: data }),
  logout: () => apiFetch<{ ok: boolean }>('/api/auth/logout', { method: 'POST' })
}

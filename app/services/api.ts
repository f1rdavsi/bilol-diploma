export type ListResponse<T> = {
  items: T[]
  total: number
  page?: number
  pageSize?: number
}

export function apiFetch<T>(url: string, options: Parameters<typeof $fetch<T>>[1] = {}) {
  return $fetch<T>(url, {
    credentials: 'include',
    ...options
  })
}

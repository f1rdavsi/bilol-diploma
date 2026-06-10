export type ToastVariant = 'success' | 'error' | 'info'

export type ToastMessage = {
  id: number
  title: string
  description?: string
  variant: ToastVariant
}

export const useToastStore = defineStore('toast', () => {
  const items = ref<ToastMessage[]>([])

  function show(message: Omit<ToastMessage, 'id'>) {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    items.value.push({ id, ...message })
    window.setTimeout(() => dismiss(id), 4200)
  }

  function success(title: string, description?: string) {
    show({ title, description, variant: 'success' })
  }

  function error(title: string, description?: string) {
    show({ title, description, variant: 'error' })
  }

  function info(title: string, description?: string) {
    show({ title, description, variant: 'info' })
  }

  function dismiss(id: number) {
    items.value = items.value.filter(item => item.id !== id)
  }

  return { items, show, success, error, info, dismiss }
})

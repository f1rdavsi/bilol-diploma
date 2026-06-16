import { authApi, type CurrentUser } from '~/services/authApi'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<CurrentUser | null>(null)
  const loading = ref(false)
  const checked = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => Boolean(user.value))

  async function fetchUser(force = false) {
    if (checked.value && !force) return user.value

    loading.value = true
    error.value = null

    try {
      user.value = await authApi.me()
    } catch {
      user.value = null
    } finally {
      checked.value = true
      loading.value = false
    }

    return user.value
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null

    try {
      user.value = await authApi.login({ email, password })
      checked.value = true
      useToastStore().success('Вход выполнен', 'Добро пожаловать в панель управления')

      const route = useRoute()
      const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
        ? route.query.redirect
        : '/dashboard'
      await navigateTo(redirect)
    } catch {
      user.value = null
      checked.value = true
      error.value = 'Неверный email или пароль'
      useToastStore().error('Не удалось войти', error.value)
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await authApi.logout()
    user.value = null
    checked.value = true
    useToastStore().info('Вы вышли из системы')
    await navigateTo('/auth/login')
  }

  return { user, loading, checked, error, isAuthenticated, fetchUser, login, logout }
})

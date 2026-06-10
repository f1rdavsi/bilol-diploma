import { authApi, type CurrentUser } from '~/services/authApi'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<CurrentUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => Boolean(user.value))

  async function fetchUser() {
    user.value = await authApi.me()
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      user.value = await authApi.login({ email, password })
      await navigateTo('/dashboard')
    } catch {
      error.value = 'Неверный email или пароль'
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await authApi.logout()
    user.value = null
    await navigateTo('/auth/login')
  }

  return { user, loading, error, isAuthenticated, fetchUser, login, logout }
})

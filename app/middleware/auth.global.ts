export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  if (!auth.user) {
    await auth.fetchUser()
  }

  if (to.path.startsWith('/auth')) {
    if (auth.user) return navigateTo('/dashboard')
    return
  }

  if (!auth.user) {
    return navigateTo('/auth/login')
  }

  const roles = to.meta.roles as string[] | undefined
  if (roles?.length && !roles.includes(auth.user.role)) {
    return abortNavigation('Недостаточно прав')
  }
})

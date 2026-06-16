export default defineNuxtRouteMiddleware(async (to) => {
  const publicPaths = ['/', '/about', '/services', '/contacts', '/sitemap.xml', '/robots.txt']
  const isPublicPath = publicPaths.includes(to.path) || to.path.startsWith('/services/')
  const isAuthPath = to.path.startsWith('/auth')
  const auth = useAuthStore()

  if (isPublicPath) {
    return
  }

  if (!auth.checked) {
    await auth.fetchUser()
  }

  if (isAuthPath) {
    if (auth.user) return navigateTo('/dashboard')
    return
  }

  if (!auth.user) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    })
  }

  const roles = to.meta.roles as string[] | undefined
  if (roles?.length && !roles.includes(auth.user.role)) {
    return abortNavigation('Недостаточно прав')
  }
})

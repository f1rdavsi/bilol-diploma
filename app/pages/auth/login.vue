<script setup lang="ts">
definePageMeta({ layout: 'default' })

const auth = useAuthStore()
const email = ref('admin@autoservice.local')
const password = ref('password123')
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-slate-950">
    <form class="w-full max-w-sm rounded-lg bg-white p-6 shadow-sm dark:bg-slate-900" @submit.prevent="auth.login(email, password)">
      <h1 class="mb-1 text-2xl font-bold">AutoService Queue</h1>
      <p class="mb-6 text-sm text-slate-500">Вход в систему автосервиса</p>
      <label class="mb-4 block">
        <span class="mb-1 block text-sm font-medium">Email</span>
        <input v-model="email" class="w-full" type="email" required>
      </label>
      <label class="mb-4 block">
        <span class="mb-1 block text-sm font-medium">Пароль</span>
        <input v-model="password" class="w-full" type="password" required>
      </label>
      <p v-if="auth.error" class="mb-4 rounded-md bg-rose-50 p-3 text-sm text-rose-700">{{ auth.error }}</p>
      <AppButton type="submit" class="w-full" :disabled="auth.loading">
        Войти
      </AppButton>
    </form>
  </div>
</template>

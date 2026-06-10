<script setup lang="ts">
import { LogOut, Moon, Sun } from 'lucide-vue-next'

const auth = useAuthStore()
const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900">
    <div>
      <p class="text-sm text-slate-500">Текущая смена</p>
      <p class="font-semibold">{{ auth.user?.name }}</p>
    </div>
    <div class="flex items-center gap-2">
      <AppButton variant="ghost" @click="toggleTheme">
        <Moon v-if="!isDark" class="size-4" />
        <Sun v-else class="size-4" />
      </AppButton>
      <AppButton variant="ghost" @click="auth.logout">
        <LogOut class="size-4" />
        Выйти
      </AppButton>
    </div>
  </header>
</template>

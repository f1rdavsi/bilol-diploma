<script setup lang="ts">
import { LogOut, Moon, Search, Sun } from 'lucide-vue-next'

const auth = useAuthStore()
const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/[0.82] px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/[0.82] md:px-6">
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Текущая смена</p>
        <p class="font-semibold">{{ auth.user?.name || 'Пользователь' }}</p>
      </div>

      <div class="hidden min-w-0 flex-1 justify-center lg:flex">
        <div class="flex w-full max-w-md items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <Search class="size-4" />
          <span>Поиск клиента, VIN или заявки</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <AppButton variant="ghost" title="Переключить тему" @click="toggleTheme">
          <Moon v-if="!isDark" class="size-4" />
          <Sun v-else class="size-4" />
        </AppButton>
        <AppButton variant="ghost" @click="auth.logout">
          <LogOut class="size-4" />
          Выйти
        </AppButton>
      </div>
    </div>
  </header>
</template>

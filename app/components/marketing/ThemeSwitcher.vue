<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const isDark = ref(false)

function applyTheme(value: boolean) {
  isDark.value = value
  document.documentElement.classList.toggle('dark', value)
  localStorage.setItem('autoservice-theme', value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('autoservice-theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(saved ? saved === 'dark' : prefersDark)
})
</script>

<template>
  <button
    type="button"
    class="inline-flex size-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/80 text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-cyan-200"
    :aria-label="isDark ? 'Включить светлую тему' : 'Включить темную тему'"
    @click="applyTheme(!isDark)"
  >
    <Sun v-if="isDark" class="size-5" />
    <Moon v-else class="size-5" />
  </button>
</template>

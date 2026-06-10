<script setup lang="ts">
import { ArrowRight, CalendarClock, CarFront, CheckCircle2, Gauge, ShieldCheck, Sparkles, Wrench } from 'lucide-vue-next'

definePageMeta({ layout: 'default' })

const auth = useAuthStore()
const email = ref('admin@autoservice.local')
const password = ref('password123')

const metrics = [
  { label: 'Активные посты', value: '08' },
  { label: 'Заявки сегодня', value: '24' },
  { label: 'Среднее ожидание', value: '18м' }
]

const flow = [
  { icon: CalendarClock, title: 'Запись', text: 'Клиент и автомобиль фиксируются в очереди' },
  { icon: Wrench, title: 'Ремонт', text: 'Мастер видит назначенные работы и статусы' },
  { icon: CheckCircle2, title: 'Выдача', text: 'История ремонта остается в системе' }
]
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-slate-950 text-white">
    <div class="grid min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
      <section class="relative flex min-h-[520px] items-center px-6 py-10 md:px-10 lg:px-16">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_32%),radial-gradient(circle_at_78%_18%,rgba(16,185,129,0.16),transparent_26%),linear-gradient(135deg,#020617_0%,#0f172a_50%,#111827_100%)]" />
        <div class="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,rgba(8,47,73,0.55))]" />
        <div class="relative z-10 w-full max-w-4xl">
          <div class="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">
            <Sparkles class="size-4" />
            Очередь автосервиса под контролем
          </div>

          <div class="grid gap-6 xl:grid-cols-[1fr_330px]">
            <div>
              <div class="mb-6 flex items-center gap-4">
                <div class="flex size-14 items-center justify-center rounded-lg bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25">
                  <CarFront class="size-8" />
                </div>
                <div>
                  <p class="text-sm uppercase tracking-[0.18em] text-cyan-200">AutoService Queue</p>
                  <h1 class="text-4xl font-bold leading-tight md:text-6xl">
                    Рабочая панель автосервиса
                  </h1>
                </div>
              </div>

              <p class="max-w-2xl text-lg leading-8 text-slate-300">
                Управляйте клиентами, автомобилями, заявками и загрузкой мастеров из одного быстрого интерфейса.
              </p>

              <div class="mt-8 grid gap-3 sm:grid-cols-3">
                <div v-for="metric in metrics" :key="metric.label" class="rounded-lg border border-white/10 bg-white/8 p-4 backdrop-blur">
                  <p class="text-3xl font-bold text-white">{{ metric.value }}</p>
                  <p class="mt-1 text-sm text-slate-300">{{ metric.label }}</p>
                </div>
              </div>
            </div>

            <div class="rounded-lg border border-white/10 bg-white/10 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur">
              <div class="mb-4 flex items-center justify-between">
                <div>
                  <p class="text-sm text-slate-300">Сейчас в очереди</p>
                  <p class="text-2xl font-bold">Диагностика</p>
                </div>
                <Gauge class="size-8 text-cyan-200" />
              </div>
              <div class="space-y-3">
                <div v-for="(item, index) in flow" :key="item.title" class="flex gap-3 rounded-md bg-slate-950/45 p-3">
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-cyan-300/15 text-cyan-200">
                    <component :is="item.icon" class="size-5" />
                  </div>
                  <div>
                    <p class="font-semibold">{{ index + 1 }}. {{ item.title }}</p>
                    <p class="text-sm leading-5 text-slate-300">{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="flex items-center justify-center bg-slate-100 px-6 py-10 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
        <form class="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900" @submit.prevent="auth.login(email, password)">
          <div class="mb-6 flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-medium text-cyan-700 dark:text-cyan-300">Вход в систему</p>
              <h2 class="mt-1 text-3xl font-bold">Добро пожаловать</h2>
            </div>
            <div class="flex size-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <ShieldCheck class="size-6" />
            </div>
          </div>

          <div class="space-y-4">
            <label class="block">
              <span class="mb-1 block text-sm font-medium">Email</span>
              <UiInput v-model="email" type="email" autocomplete="email" required />
            </label>
            <label class="block">
              <span class="mb-1 block text-sm font-medium">Пароль</span>
              <UiInput v-model="password" type="password" autocomplete="current-password" required />
            </label>
          </div>

          <p v-if="auth.error" class="mt-4 rounded-md bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">
            {{ auth.error }}
          </p>

          <button
            type="submit"
            :disabled="auth.loading"
            class="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-cyan-700 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            {{ auth.loading ? 'Входим...' : 'Войти в панель' }}
            <ArrowRight class="size-4" />
          </button>

          <div class="mt-5 rounded-md bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
            <p class="font-medium text-slate-900 dark:text-white">Тестовый доступ</p>
            <p class="mt-1">admin@autoservice.local</p>
            <p>password123</p>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

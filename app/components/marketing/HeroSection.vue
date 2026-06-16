<script setup lang="ts">
import { ArrowRight, CalendarCheck, Gauge, ShieldCheck } from 'lucide-vue-next'
import { heroImage } from '~/data/marketing'
</script>

<template>
  <section class="relative min-h-[860px] overflow-hidden bg-slate-950 pt-20 text-white md:min-h-[900px]">
    <img
      :src="heroImage"
      alt="Премиальный автомобиль в современном автосервисе"
      class="absolute inset-0 h-full w-full object-cover opacity-[0.74]"
      fetchpriority="high"
    >
    <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.94)_0%,rgba(2,6,23,0.74)_42%,rgba(2,6,23,0.22)_100%)]" />
    <div class="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950" />

    <div class="relative z-10 mx-auto grid min-h-[780px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
      <div class="max-w-4xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur">
          <ShieldCheck class="size-4" />
          Премиальный автосервис с цифровым контролем работ
        </div>

        <h1 class="mt-8 max-w-5xl text-5xl font-black leading-[0.98] tracking-tight md:text-7xl lg:text-8xl">
          AutoService Premium Care
        </h1>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
          Диагностика, ремонт и обслуживание автомобилей с прозрачной очередью, точной сметой и технологичным клиентским опытом.
        </p>

        <div class="mt-10 flex flex-col gap-4 sm:flex-row">
          <NuxtLink to="/contacts" class="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 text-base font-black text-slate-950 shadow-2xl shadow-cyan-400/25 transition hover:-translate-y-1 hover:bg-cyan-200">
            Записаться на обслуживание
            <ArrowRight class="size-5" />
          </NuxtLink>
          <NuxtLink to="/services" class="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-base font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.18]">
            Смотреть услуги
          </NuxtLink>
        </div>
      </div>

      <div class="hero-dashboard rounded-[2rem] border border-white/[0.16] bg-white/[0.12] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
        <div class="rounded-[1.5rem] border border-white/10 bg-slate-950/[0.72] p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-slate-400">Загрузка сервиса</p>
              <p class="mt-1 text-3xl font-black">87%</p>
            </div>
            <ThreeDIcon :icon="Gauge" />
          </div>
          <div class="mt-6 h-3 rounded-full bg-white/10">
            <div class="h-full w-[87%] rounded-full bg-cyan-300 shadow-lg shadow-cyan-400/40" />
          </div>
          <div class="mt-6 grid gap-3">
            <div class="rounded-2xl bg-white/[0.08] p-4">
              <p class="text-sm text-slate-400">Ближайшая запись</p>
              <p class="mt-1 font-bold">Сегодня, 14:30 — диагностика</p>
            </div>
            <div class="rounded-2xl bg-white/[0.08] p-4">
              <p class="text-sm text-slate-400">Контроль качества</p>
              <p class="mt-1 font-bold">Фотоотчет, смета, история работ</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative z-10 mx-auto -mt-24 grid max-w-7xl gap-4 px-4 pb-10 sm:px-6 md:grid-cols-3 lg:px-8">
      <div class="rounded-3xl border border-white/[0.12] bg-white/80 p-5 text-slate-950 shadow-xl backdrop-blur dark:bg-white/10 dark:text-white">
        <CalendarCheck class="size-7 text-cyan-600 dark:text-cyan-300" />
        <p class="mt-4 text-2xl font-black">Онлайн-запись</p>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Заявка попадает менеджеру без лишних звонков.</p>
      </div>
      <div class="rounded-3xl border border-white/[0.12] bg-white/80 p-5 text-slate-950 shadow-xl backdrop-blur dark:bg-white/10 dark:text-white">
        <Gauge class="size-7 text-cyan-600 dark:text-cyan-300" />
        <p class="mt-4 text-2xl font-black">Точная диагностика</p>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Проверяем узлы до ремонта, а не меняем детали вслепую.</p>
      </div>
      <div class="rounded-3xl border border-white/[0.12] bg-white/80 p-5 text-slate-950 shadow-xl backdrop-blur dark:bg-white/10 dark:text-white">
        <ShieldCheck class="size-7 text-cyan-600 dark:text-cyan-300" />
        <p class="mt-4 text-2xl font-black">Гарантия</p>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Фиксируем работы и сроки в истории обслуживания.</p>
      </div>
    </div>
  </section>
</template>

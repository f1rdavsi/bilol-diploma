<script setup lang="ts">
import { CarFront, Mail, MapPin, Phone } from 'lucide-vue-next'
import { services, siteNav } from '~/data/marketing'
</script>

<template>
  <footer class="border-t border-slate-200 bg-slate-950 text-white dark:border-white/10">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_0.8fr_0.8fr] lg:px-8">
      <div>
        <div class="flex items-center gap-3">
          <span class="grid size-12 place-items-center rounded-2xl bg-cyan-400 text-slate-950">
            <CarFront class="size-7" />
          </span>
          <div>
            <p class="text-xl font-black">AutoService Premium Care</p>
            <p class="text-sm text-slate-400">Технологичный сервис для вашего автомобиля</p>
          </div>
        </div>
        <p class="mt-6 max-w-md leading-7 text-slate-300">
          Диагностика, ремонт и обслуживание автомобилей с прозрачной очередью, понятными сроками и вниманием к деталям.
        </p>
      </div>

      <div>
        <p class="font-bold">Навигация</p>
        <div class="mt-4 grid gap-3">
          <NuxtLink v-for="item in siteNav" :key="item.to" :to="item.to" class="text-sm text-slate-300 transition hover:text-cyan-200">
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>

      <div>
        <p class="font-bold">Контакты</p>
        <div class="mt-4 grid gap-3 text-sm text-slate-300">
          <span class="flex items-center gap-2"><Phone class="size-4 text-cyan-300" /> +7 900 555-41-20</span>
          <span class="flex items-center gap-2"><Mail class="size-4 text-cyan-300" /> hello@autoservice.local</span>
          <span class="flex items-center gap-2"><MapPin class="size-4 text-cyan-300" /> Москва, Технопарк, 18</span>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10 px-4 py-5">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 AutoService Queue. Все права защищены.</p>
        <p>{{ services.length }} ключевых направлений ремонта</p>
      </div>
    </div>
  </footer>
</template>

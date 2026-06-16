<script setup lang="ts">
import { Clock, Mail, MapPin, Phone } from 'lucide-vue-next'
import { contactImage } from '~/data/marketing'

definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Контакты — AutoService Premium Care',
  description: 'Адрес, телефон, график работы, карта и форма записи в AutoService Premium Care.',
  ogTitle: 'Контакты AutoService Premium Care',
  ogDescription: 'Запишитесь на диагностику, ремонт или обслуживание автомобиля.',
  ogImage: contactImage
})

const contacts = [
  { icon: MapPin, title: 'Адрес', text: 'Москва, Технопарк, 18' },
  { icon: Phone, title: 'Телефон', text: '+7 900 555-41-20' },
  { icon: Mail, title: 'Email', text: 'hello@autoservice.local' },
  { icon: Clock, title: 'График', text: 'Пн-Сб: 09:00-21:00' }
]
</script>

<template>
  <div class="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
    <SiteHeader />
    <main class="pt-20">
      <section class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <img :src="contactImage" alt="Зона автосервиса" class="absolute inset-0 h-full w-full object-cover opacity-30">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/92 to-slate-50/35 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/40" />
        <div class="relative mx-auto max-w-7xl">
          <SectionTitle eyebrow="Контакты" title="Запишитесь на сервис, мы подготовим мастера и время" text="Оставьте заявку или свяжитесь с нами напрямую. Менеджер уточнит задачу и предложит ближайший удобный слот." />
        </div>
      </section>

      <section class="section-pad">
        <div class="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div class="grid gap-4 sm:grid-cols-2">
            <article v-for="item in contacts" :key="item.title" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
              <ThreeDIcon :icon="item.icon" />
              <h3 class="mt-6 text-xl font-black">{{ item.title }}</h3>
              <p class="mt-2 text-slate-600 dark:text-slate-300">{{ item.text }}</p>
            </article>
            <div class="sm:col-span-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
              <iframe
                title="Карта AutoService Premium Care"
                src="https://www.openstreetmap.org/export/embed.html?bbox=37.588%2C55.733%2C37.644%2C55.767&layer=mapnik"
                class="h-80 w-full"
                loading="lazy"
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

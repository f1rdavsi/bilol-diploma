<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { ctaImage, features, stats, testimonials, withMarketingIcon } from '~/data/marketing'

definePageMeta({ layout: 'default' })

const { data: serviceItems } = await useAsyncData('public-services-home', fetchMarketingServices, {
  default: () => []
})
const marketingServices = computed(() => serviceItems.value.map(withMarketingIcon))

useSeoMeta({
  title: 'AutoService Premium Care — современный автосервис',
  description: 'Премиальный автосервис: диагностика, ремонт двигателя, ходовой части, замена масла, автоэлектрика и онлайн-запись.',
  ogTitle: 'AutoService Premium Care',
  ogDescription: 'Технологичный автосервис с прозрачной очередью, гарантией и современной диагностикой.',
  ogImage: ctaImage
})
</script>

<template>
  <div class="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
    <SiteHeader />
    <main>
      <HeroSection />

      <section class="section-pad">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Почему выбирают нас"
            title="Сервис, где автомобиль не теряется между мастером, менеджером и очередью"
            text="Мы соединяем сильную техническую команду, цифровой контроль работ и премиальный клиентский опыт."
          />
          <div class="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <FeatureCard v-for="feature in features" :key="feature.title" v-bind="feature" />
          </div>
        </div>
      </section>

      <section class="section-pad bg-white dark:bg-white/[0.03]">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              eyebrow="Услуги"
              title="Ремонт и обслуживание без хаоса"
              text="Ключевые направления работ закрываются внутри одного сервиса: от первичной диагностики до финальной проверки."
            />
            <NuxtLink to="/services" class="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-slate-200 px-5 font-bold transition hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:hover:text-cyan-200">
              Все услуги
              <ArrowRight class="size-4" />
            </NuxtLink>
          </div>
          <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <ServiceCard v-for="service in marketingServices" :key="service.slug" :service="service" />
          </div>
        </div>
      </section>

      <section class="section-pad">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-5 md:grid-cols-3">
            <div v-for="item in stats" :key="item.label" class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
              <p class="text-5xl font-black text-cyan-700 dark:text-cyan-300">{{ item.value }}</p>
              <p class="mt-4 text-lg leading-7 text-slate-600 dark:text-slate-300">{{ item.label }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section-pad bg-white dark:bg-white/[0.03]">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle align="center" eyebrow="Отзывы" title="Клиенты возвращаются, потому что понимают, за что платят" />
          <div class="mt-12 grid gap-6 md:grid-cols-3">
            <TestimonialCard v-for="item in testimonials" :key="item.name" v-bind="item" />
          </div>
        </div>
      </section>

      <section class="px-4 py-20 sm:px-6 lg:px-8">
        <div class="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-white shadow-2xl shadow-cyan-950/20 md:px-12">
          <img :src="ctaImage" alt="Спортивный автомобиль" loading="lazy" class="absolute inset-0 h-full w-full object-cover opacity-35">
          <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/82 to-slate-950/35" />
          <div class="relative max-w-2xl">
            <p class="text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Готовы к обслуживанию</p>
            <h2 class="mt-4 text-4xl font-black tracking-tight md:text-6xl">Запишите автомобиль на удобное время</h2>
            <p class="mt-5 text-lg leading-8 text-slate-200">Менеджер уточнит задачу, подберет слот и заранее подготовит мастера к вашему визиту.</p>
            <NuxtLink to="/contacts" class="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-200">
              Записаться на обслуживание
              <ArrowRight class="size-5" />
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

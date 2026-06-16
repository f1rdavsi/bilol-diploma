<script setup lang="ts">
import { aboutImage, features, servicePhotos, team } from '~/data/marketing'

definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'О компании — AutoService Premium Care',
  description: 'История, миссия, команда и преимущества премиального автосервиса AutoService Premium Care.',
  ogTitle: 'О компании AutoService Premium Care',
  ogDescription: 'Современный автосервис с профессиональной командой и цифровым контролем ремонта.',
  ogImage: aboutImage
})
</script>

<template>
  <div class="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
    <SiteHeader />
    <main class="pt-20">
      <section class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <img :src="aboutImage" alt="Премиальный автомобиль" class="absolute inset-0 h-full w-full object-cover opacity-28">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-slate-50/40 dark:from-slate-950 dark:via-slate-950/92 dark:to-slate-950/42" />
        <div class="relative mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="О компании"
            title="Мы строим автосервис, где технологии усиливают доверие"
            text="AutoService Premium Care вырос из небольшой диагностической зоны в современный сервисный центр с прозрачной очередью, командой мастеров и высоким стандартом клиентского опыта."
          />
        </div>
      </section>

      <section class="section-pad">
        <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionTitle eyebrow="Миссия" title="Ремонт должен быть понятным, быстрым и предсказуемым" />
          </div>
          <div class="grid gap-5 md:grid-cols-2">
            <FeatureCard v-for="feature in features" :key="feature.title" v-bind="feature" />
          </div>
        </div>
      </section>

      <section class="section-pad bg-white dark:bg-white/[0.03]">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle align="center" eyebrow="Сервисная зона" title="Чистое пространство, точное оборудование, спокойная приемка" />
          <div class="mt-12 grid gap-5 md:grid-cols-3">
            <img v-for="photo in servicePhotos" :key="photo.src" :src="photo.src" :alt="photo.alt" loading="lazy" class="aspect-[4/3] rounded-3xl object-cover shadow-xl">
          </div>
        </div>
      </section>

      <section class="section-pad">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Команда" title="Люди, которые отвечают за качество" />
          <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <article v-for="member in team" :key="member.name" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
              <ThreeDIcon :icon="member.icon" />
              <h3 class="mt-6 text-xl font-black">{{ member.name }}</h3>
              <p class="mt-2 text-slate-600 dark:text-slate-300">{{ member.role }}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

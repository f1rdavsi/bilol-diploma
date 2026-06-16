<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next'
import { formatServicePrice, type MarketingService, withMarketingIcon } from '~/data/marketing'

definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const { data: service } = await useAsyncData(`public-service-${slug}`, () => fetchMarketingService(String(slug)))

if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Услуга не найдена' })
}

const serviceItem = computed(() => withMarketingIcon(service.value as Omit<MarketingService, 'icon'> & { iconName: string }))

useSeoMeta({
  title: () => `${service.value?.title || 'Услуга'} — AutoService Premium Care`,
  description: () => service.value?.description || 'Услуга автосервиса AutoService Premium Care',
  ogTitle: () => service.value?.title || 'Услуга AutoService Premium Care',
  ogDescription: () => service.value?.short || 'Премиальный автосервис',
  ogImage: () => service.value?.image || ''
})
</script>

<template>
  <div class="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
    <SiteHeader />
    <main class="pt-20">
      <section class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <img :src="serviceItem.image" :alt="serviceItem.title" class="absolute inset-0 h-full w-full object-cover opacity-35">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/38 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/40" />
        <div class="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <ThreeDIcon :icon="serviceItem.icon" />
            <h1 class="mt-8 text-5xl font-black tracking-tight md:text-7xl">{{ serviceItem.title }}</h1>
            <p class="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">{{ serviceItem.description }}</p>
          </div>
          <div class="rounded-3xl border border-slate-200 bg-white/[0.86] p-6 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-white/[0.08]">
            <p class="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Стоимость</p>
            <p class="mt-3 text-5xl font-black">{{ formatServicePrice(serviceItem) }}</p>
            <NuxtLink to="/contacts" class="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-cyan-500 font-black text-slate-950 transition hover:bg-cyan-300">
              Записаться
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="section-pad">
        <div class="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <SectionTitle eyebrow="Преимущества" title="Что получает клиент" />
          </div>
          <div class="grid gap-4 lg:col-span-2">
            <div v-for="benefit in serviceItem.benefits" :key="benefit" class="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06]">
              <CheckCircle2 class="mt-1 size-6 shrink-0 text-cyan-600 dark:text-cyan-300" />
              <p class="text-lg font-bold">{{ benefit }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section-pad bg-white dark:bg-white/[0.03]">
        <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <SectionTitle eyebrow="Этапы работ" title="Понятный процесс от приемки до выдачи" />
            <div class="mt-10 grid gap-5">
              <div v-for="(step, index) in serviceItem.steps" :key="step" class="flex gap-4">
                <span class="grid size-11 shrink-0 place-items-center rounded-full bg-slate-950 font-black text-cyan-200 dark:bg-white dark:text-slate-950">{{ index + 1 }}</span>
                <p class="pt-2 text-lg font-bold">{{ step }}</p>
              </div>
            </div>
          </div>
          <ContactForm :service-slug="serviceItem.slug" />
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

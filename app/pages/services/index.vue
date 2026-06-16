<script setup lang="ts">
import { withMarketingIcon } from '~/data/marketing'

definePageMeta({ layout: 'default' })

const { data: serviceItems } = await useAsyncData('public-services-page', fetchMarketingServices, {
  default: () => []
})
const marketingServices = computed(() => serviceItems.value.map(withMarketingIcon))

useSeoMeta({
  title: 'Услуги автосервиса — AutoService Premium Care',
  description: 'Диагностика, ремонт двигателя, ходовой части, замена масла, компьютерная диагностика и автоэлектрика.',
  ogTitle: 'Услуги AutoService Premium Care',
  ogDescription: 'Полный набор услуг премиального автосервиса с понятной стоимостью.'
})
</script>

<template>
  <div class="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
    <SiteHeader />
    <main class="pt-20">
      <section class="section-pad">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            align="center"
            eyebrow="Услуги"
            title="Все, что нужно автомобилю, в одном технологичном сервисе"
            text="Выберите направление, изучите детали и оставьте заявку на удобное время."
          />
          <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <ServiceCard v-for="service in marketingServices" :key="service.slug" :service="service" />
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

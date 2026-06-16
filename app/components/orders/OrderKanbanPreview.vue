<script setup lang="ts">
import { CalendarClock, UserRound } from 'lucide-vue-next'
import type { RepairOrder } from '~/services/resourcesApi'

defineProps<{ order: RepairOrder }>()
</script>

<template>
  <article class="w-[288px] rotate-1 rounded-lg border border-cyan-200 bg-white p-4 text-left shadow-2xl shadow-cyan-950/20 ring-2 ring-cyan-200/70 dark:border-cyan-800 dark:bg-slate-950 dark:ring-cyan-900/70">
    <div class="mb-3 flex items-start justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-slate-950 dark:text-white">#{{ order.id }} {{ order.client?.fullName || 'Клиент' }}</p>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {{ order.car?.brand }} {{ order.car?.model }} {{ order.car?.plateNumber }}
        </p>
      </div>
      <StatusBadge :status="order.status" />
    </div>

    <p class="line-clamp-3 text-sm leading-5 text-slate-600 dark:text-slate-300">{{ order.problemDescription }}</p>

    <div class="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
      <span class="inline-flex items-center gap-1.5">
        <UserRound class="size-3.5" />
        {{ order.employee?.name || 'Не назначен' }}
      </span>
      <span class="inline-flex items-center gap-1.5">
        <CalendarClock class="size-3.5" />
        {{ Number(order.price || 0).toLocaleString('ru-RU') }} TJS
      </span>
    </div>
  </article>
</template>

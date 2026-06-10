<script setup lang="ts">
const today = new Date()
const days = Array.from({ length: 35 }, (_, index) => index + 1)
</script>

<template>
  <div class="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
    <div class="mb-3 flex items-center justify-between">
      <p class="font-semibold">{{ today.toLocaleString('ru-RU', { month: 'long', year: 'numeric' }) }}</p>
      <UiBadge variant="secondary">MVP</UiBadge>
    </div>
    <div class="grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
      <span v-for="day in ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']" :key="day">{{ day }}</span>
    </div>
    <div class="mt-2 grid grid-cols-7 gap-1">
      <button v-for="day in days" :key="day" class="aspect-square rounded-md text-sm hover:bg-slate-100 dark:hover:bg-slate-800" :class="day === today.getDate() ? 'bg-cyan-600 text-white hover:bg-cyan-600' : ''">
        {{ day }}
      </button>
    </div>
  </div>
</template>

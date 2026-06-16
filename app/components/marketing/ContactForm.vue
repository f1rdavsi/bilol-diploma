<script setup lang="ts">
import { Send } from 'lucide-vue-next'

const props = defineProps<{
  serviceSlug?: string
}>()

const sent = ref(false)
const loading = ref(false)
const error = ref('')
const form = reactive({
  name: '',
  phone: '',
  car: '',
  message: ''
})

async function submit() {
  loading.value = true
  error.value = ''
  sent.value = false

  try {
    await $fetch('/api/public/requests', {
      method: 'POST',
      body: {
        ...form,
        serviceSlug: props.serviceSlug
      }
    })
    sent.value = true
    Object.assign(form, { name: '', phone: '', car: '', message: '' })
  } catch {
    sent.value = false
    error.value = 'Не удалось отправить заявку. Проверьте данные и попробуйте еще раз.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/[0.08] dark:border-white/10 dark:bg-white/[0.06]" @submit.prevent="submit">
    <div class="grid gap-4 sm:grid-cols-2">
      <label>
        <span class="mb-2 block text-sm font-bold text-slate-800 dark:text-slate-100">Имя</span>
        <input v-model="form.name" required placeholder="Ваше имя">
      </label>
      <label>
        <span class="mb-2 block text-sm font-bold text-slate-800 dark:text-slate-100">Телефон</span>
        <input v-model="form.phone" required type="tel" placeholder="+992 900 00 00 00">
      </label>
    </div>
    <label class="mt-4 block">
      <span class="mb-2 block text-sm font-bold text-slate-800 dark:text-slate-100">Автомобиль</span>
      <input v-model="form.car" placeholder="Марка, модель, год">
    </label>
    <label class="mt-4 block">
      <span class="mb-2 block text-sm font-bold text-slate-800 dark:text-slate-100">Что нужно сделать</span>
      <textarea v-model="form.message" placeholder="Опишите задачу или неисправность" />
    </label>
    <button
      type="submit"
      :disabled="loading"
      class="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {{ loading ? 'Отправляем...' : 'Отправить заявку' }}
      <Send class="size-4" />
    </button>
    <p v-if="error" class="mt-4 rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">
      {{ error }}
    </p>
    <p v-if="sent" class="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
      Заявка отправлена. Менеджер свяжется с вами в ближайшее время.
    </p>
  </form>
</template>

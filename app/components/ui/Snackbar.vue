<script setup lang="ts">
import { CheckCircle2, Info, X, XCircle } from 'lucide-vue-next'

const toast = useToastStore()

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info
}

const styles = {
  success: 'border-emerald-200 bg-white text-slate-950 shadow-emerald-950/10 dark:border-emerald-900 dark:bg-slate-900 dark:text-white',
  error: 'border-rose-200 bg-white text-slate-950 shadow-rose-950/10 dark:border-rose-900 dark:bg-slate-900 dark:text-white',
  info: 'border-cyan-200 bg-white text-slate-950 shadow-cyan-950/10 dark:border-cyan-900 dark:bg-slate-900 dark:text-white'
}

const iconStyles = {
  success: 'text-emerald-600 dark:text-emerald-300',
  error: 'text-rose-600 dark:text-rose-300',
  info: 'text-cyan-600 dark:text-cyan-300'
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
      <TransitionGroup name="snackbar">
        <div
          v-for="item in toast.items"
          :key="item.id"
          class="flex gap-3 rounded-lg border p-4 shadow-xl backdrop-blur"
          :class="styles[item.variant]"
        >
          <component :is="icons[item.variant]" class="mt-0.5 size-5 shrink-0" :class="iconStyles[item.variant]" />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold">{{ item.title }}</p>
            <p v-if="item.description" class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {{ item.description }}
            </p>
          </div>
          <button class="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white" @click="toast.dismiss(item.id)">
            <X class="size-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 180ms ease;
}

.snackbar-enter-from,
.snackbar-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>

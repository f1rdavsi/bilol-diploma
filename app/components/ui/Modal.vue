<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  open: boolean
  title: string
  size?: 'md' | 'lg' | 'xl'
}>(), {
  size: 'md'
})

defineEmits<{ close: [] }>()

const sizeClass = computed(() => ({
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl'
}[props.size]))
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
      <div class="max-h-[92vh] w-full overflow-hidden rounded-lg bg-white shadow-xl dark:bg-slate-900" :class="sizeClass">
        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
          <button class="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800" @click="$emit('close')">
            <span class="sr-only">Закрыть</span>
            ×
          </button>
        </div>
        <div class="max-h-[calc(92vh-73px)] overflow-y-auto p-5">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

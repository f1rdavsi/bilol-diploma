<script setup lang="ts">
import { X } from 'lucide-vue-next'

withDefaults(defineProps<{ modelValue: boolean, title?: string, side?: 'right' | 'left' }>(), {
  title: '',
  side: 'right'
})
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm" @click.self="$emit('update:modelValue', false)">
      <aside
        class="fixed top-0 h-full w-full max-w-md border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        :class="side === 'right' ? 'right-0 border-l' : 'left-0 border-r'"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-semibold">{{ title }}</h2>
          <button class="rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" @click="$emit('update:modelValue', false)">
            <X class="size-4" />
          </button>
        </div>
        <slot />
      </aside>
    </div>
  </Teleport>
</template>

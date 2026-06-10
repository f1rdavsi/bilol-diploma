<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{ modelValue: boolean, title?: string, description?: string }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm" @click.self="$emit('update:modelValue', false)">
      <div class="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div class="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 v-if="title" class="text-lg font-semibold">{{ title }}</h2>
            <p v-if="description" class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ description }}</p>
          </div>
          <button class="rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" @click="$emit('update:modelValue', false)">
            <X class="size-4" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

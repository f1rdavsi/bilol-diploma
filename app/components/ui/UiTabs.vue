<script setup lang="ts">
const props = defineProps<{ tabs: { value: string, label: string }[], modelValue?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const active = computed({
  get: () => props.modelValue || props.tabs[0]?.value || '',
  set: value => emit('update:modelValue', value)
})
</script>

<template>
  <div>
    <div class="inline-flex rounded-md bg-slate-100 p-1 dark:bg-slate-900">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        class="rounded px-3 py-1.5 text-sm font-medium transition"
        :class="active === tab.value ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'"
        @click="active = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="mt-4">
      <slot :active="active" />
    </div>
  </div>
</template>

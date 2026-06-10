<script setup lang="ts">
defineProps<{ items: string[] }>()
const open = ref(false)
const point = reactive({ x: 0, y: 0 })

function show(event: MouseEvent) {
  event.preventDefault()
  point.x = event.clientX
  point.y = event.clientY
  open.value = true
}
</script>

<template>
  <div @contextmenu="show" @click="open = false">
    <slot />
    <Teleport to="body">
      <div v-if="open" class="fixed z-50 min-w-44 rounded-lg border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-800 dark:bg-slate-900" :style="{ left: `${point.x}px`, top: `${point.y}px` }">
        <button v-for="item in items" :key="item" class="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
          {{ item }}
        </button>
      </div>
    </Teleport>
  </div>
</template>

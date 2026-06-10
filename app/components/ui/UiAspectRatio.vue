<script setup lang="ts">
withDefaults(defineProps<{ ratio?: number }>(), { ratio: 16 / 9 })
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-lg" :style="{ aspectRatio: String(ratio) }">
    <slot />
  </div>
</template>

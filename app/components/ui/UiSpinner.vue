<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'
import { cn } from '~/utils/cn'

defineProps<{ class?: string }>()
</script>

<template>
  <LoaderCircle :class="cn('size-4 animate-spin text-current', $props.class)" />
</template>

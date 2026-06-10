<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/utils/cn'

const badgeVariants = cva('inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1', {
  variants: {
    variant: {
      default: 'bg-slate-950 text-white ring-slate-950 dark:bg-slate-100 dark:text-slate-950 dark:ring-slate-100',
      secondary: 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700',
      success: 'bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-900',
      warning: 'bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-900',
      danger: 'bg-rose-100 text-rose-700 ring-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:ring-rose-900',
      outline: 'bg-transparent text-slate-700 ring-slate-300 dark:text-slate-200 dark:ring-slate-700'
    }
  },
  defaultVariants: { variant: 'default' }
})

type BadgeVariants = VariantProps<typeof badgeVariants>

defineProps<{ variant?: BadgeVariants['variant'], class?: string }>()
</script>

<template>
  <span :class="cn(badgeVariants({ variant }), $props.class)">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-slate-950',
  {
    variants: {
      variant: {
        primary: 'bg-cyan-700 text-white shadow-sm shadow-cyan-950/15 hover:bg-cyan-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300',
        secondary: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
        ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white',
        danger: 'bg-rose-600 text-white shadow-sm shadow-rose-950/15 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400',
        outline: 'border border-slate-300 bg-transparent text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800'
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-11 px-5',
        icon: 'size-10 p-0'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

defineProps<{
  type?: 'button' | 'submit'
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  disabled?: boolean
  class?: string
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    :class="cn(buttonVariants({ variant, size }), $props.class)"
  >
    <slot />
  </button>
</template>

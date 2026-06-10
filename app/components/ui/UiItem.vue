<template>
  <div class="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
    <slot name="media" />
    <div class="min-w-0 flex-1">
      <slot />
    </div>
    <slot name="actions" />
  </div>
</template>

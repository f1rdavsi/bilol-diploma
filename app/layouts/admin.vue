<template>
  <div class="flex min-h-screen bg-slate-50 dark:bg-slate-950">
    <AppSidebar />
    <div class="min-w-0 flex-1">
      <AppHeader />
      <main class="p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

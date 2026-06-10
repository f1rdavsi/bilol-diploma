<template>
  <div class="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
    <div class="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.11),transparent_22%)]" />
    <div class="relative flex min-h-screen">
      <AppSidebar />
      <div class="min-w-0 flex-1">
        <AppHeader />
        <main class="mx-auto w-full max-w-7xl p-4 md:p-6 xl:p-8">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

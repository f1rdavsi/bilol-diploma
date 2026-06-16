<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'ru'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#020617' }
  ],
  script: [
    {
      innerHTML: "try{var t=localStorage.getItem('autoservice-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}"
    }
  ]
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Snackbar />
</template>

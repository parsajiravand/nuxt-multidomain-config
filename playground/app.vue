<template>
  <div>
    <NuxtWelcome v-if="$config.multiDomainConfig" />
    <NuxtPage />
  </div>
</template>

<script setup>
// Meta tags are handled by Nuxt automatically
useHead({
  title: 'Multi-Domain Config Demo',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Multi-domain configuration demo for Nuxt' }
  ]
})
</script>

<style>
/* Global styles can be added here if needed */
</style>

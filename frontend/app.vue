<!-- Aplicativo -->
<template>
  <div>
    <Header />
    <NuxtLayout >
      <NuxtPage />
    </NuxtLayout>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<style>
main {
  min-height: 70vh;
  padding: 1.5rem;
  background-color: #f0f0f0;
}
</style>


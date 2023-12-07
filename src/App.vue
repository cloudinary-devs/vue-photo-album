<script setup>
import TopNav from './components/TopNav.vue'
</script>

<template>
  <TopNav />
  <main class="bg-gray-200 container mx-auto p-8 rounded-lg shadow-2xl">
    <RouterView />
  </main>
</template>

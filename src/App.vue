<script setup>
import HeadSection from "./components/HeadSection.vue";
</script>

<template>
  <div class="container">
    <header>
      <HeadSection />
    </header>
    <router-view />
  </div>
</template>

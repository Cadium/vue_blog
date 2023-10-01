<script setup>
import Footer from "../components/Footer.vue";
import BlogPosts from "../components/BlogPosts.vue";
</script>

<template>
  <div class="homepage-container">
    <main>
      <BlogPosts />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

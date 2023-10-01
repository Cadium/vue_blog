<script>
import MoreArticles from "@/components/MoreArticles.vue";

export default {
  props: ["id"],
  data() {
    return {
      blog: null,
    };
  },
  mounted() {
    fetch("https://techcrunch.com/wp-json/wp/v2/posts/" + this.id)
      .then((response) => response.json())
      .then((data) => (this.blog = data))
      .catch((error) => console.log(error.message));
  },
  components: { MoreArticles },
};
</script>

<template>
  <div v-if="blog" class="blog-details">
    <h1 v-html="blog.title.rendered"></h1>
    <p v-html="blog.content.rendered"></p>
    <h5>More Articles</h5>
    <MoreArticles />
  </div>
  <div v-else class="loading">
    <p>Loading Blog Details...</p>
  </div>
</template>

<style scoped>
.blog-details {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  text-align: center;
}

h1 {
  font-size: 32px;
  margin-bottom: 23px;
}

.blog-details p {
  margin-bottom: 20px;
  color: #6e6e6e;
  word-spacing: 2px;
  font-size: 18px;
  min-width: 350px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}

h5 {
  margin-top: 60px;
  font-size: 24px;
}

@media (max-width: 768px) {
  .blog-details {
    width: 90vw;
  }
}
</style>

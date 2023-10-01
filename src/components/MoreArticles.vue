<template>
  <div v-if="blogs.length" class="blog-container">
    <router-link
      v-for="blog in blogs"
      :key="blog.id"
      :to="{ name: 'BlogDetails', params: { id: blog.id } }"
      class="blog-card"
    >
      <img
        :src="blog.jetpack_featured_media_url"
        alt="blog thumbnail"
        class="card-header-image"
      />
      <div class="blog-text">
        <div class="date-time">
          <span>{{ formattedDate(blog.date) }}</span>
        </div>
        <div class="author-name">Author: {{ blog.author }}</div>
        <h2 v-html="blog.title.rendered"></h2>
        <p v-html="blog.excerpt.rendered"></p>
        <div class="blog-link">
          <span>{{ getReadingTime(blog) }} Min Read</span>
          <button>Read More <img src="./icon/arrow.svg" alt="arrow" /></button>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else class="loading">Loading Blog Posts...</div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      blogs: [],
    };
  },
  methods: {
    formattedDate(date) {
      return moment(date).fromNow();
    },
    getReadingTime(blog) {
      const totalWords =
        blog.title.rendered.split(" ").length +
        blog.excerpt.rendered.split(" ").length;
      return Math.ceil(totalWords / 200);
    },
    fetchBlogPosts() {
      fetch("https://techcrunch.com/wp-json/wp/v2/posts?_embed")
        .then((response) => response.json())
        .then((data) => {
          const authorRequests = data.map((post) =>
            fetch(`https://techcrunch.com/wp-json/wp/v2/users/${post.author}`)
              .then((response) => response.json())
              .then((authorData) => ({
                ...post,
                author: authorData.name,
              }))
          );

          Promise.all(authorRequests)
            .then((blogsWithAuthors) => {
              this.blogs = blogsWithAuthors;
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error.message));
    },
  },
  mounted() {
    this.fetchBlogPosts();
  },
};
</script>

<style scoped>
h5 {
  display: block;
}
.blog-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 50px 0 62px 0;
}

.blog-card {
  width: 350px;
  padding: 10px;
  border: 1px solid #f5f5f5;
  background-color: #ffffff;
  margin-bottom: 62px;
}

.card-header-image {
  margin-bottom: 16px;
  width: 330px;
  align-self: center;
}

.blog-text {
  display: flex;
  flex-direction: column;
}

.date-time {
  margin-bottom: 8px;
}

.author-name {
  color: #1473e6;
  font-weight: bold;
  margin-bottom: 8px;
}

h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

p {
  font-size: 14px;
  color: #6e6e6e;
  line-height: 21px;
}

.blog-link {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 20px;
}

button {
  color: #1473e6;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.loading {
  display: flex;
  justify-content: center;
  font-size: 28px;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .blog-card {
    width: 80vw;
    max-width: 350px;
  }
}
</style>

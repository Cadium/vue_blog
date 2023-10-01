<template>
  <div v-if="blogs.length" class="blog-container">
    <!-- Top Article -->
    <div v-if="topArticle" class="top-article">
      <div class="image-container">
        <img
          :src="topArticle.jetpack_featured_media_url"
          alt="top article thumbnail"
          class="card-header-image"
        />
      </div>
      <div class="blog-text">
        <div class="date-time">
          <span>{{ formattedDate(topArticle.date) }}</span>
        </div>
        <div class="author-name">Author: {{ topArticle.author }}</div>
        <h2 v-html="topArticle.title.rendered"></h2>
        <p v-html="topArticle.excerpt.rendered"></p>
        <div class="blog-link">
          <span
            >{{
              getReadingTime(
                topArticle.title.rendered +
                  " " +
                  (topArticle.subtitle ? topArticle.subtitle : "") +
                  " " +
                  topArticle.content.rendered
              )
            }}
            Min Read</span
          >
          <router-link
            :to="{ name: 'BlogDetails', params: { id: topArticle.id } }"
          >
            <button class="read-more-button" @click="scrollToTop()">
              Read More <img src="./icon/arrow.svg" alt="arrow" />
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Other Articles -->
    <div v-for="blog in blogs" :key="blog.id" class="blog-card">
      <div class="image-container">
        <img
          :src="blog.jetpack_featured_media_url"
          alt="blog thumbnail"
          class="card-header-image"
        />
      </div>
      <div class="blog-text">
        <div class="date-time">
          <span>{{ formattedDate(blog.date) }}</span>
        </div>
        <div class="author-name">Author: {{ blog.author }}</div>
        <h2 v-html="blog.title.rendered"></h2>
        <p v-html="blog.excerpt.rendered"></p>
        <div class="blog-link">
          <span
            >{{
              getReadingTime(
                blog.title.rendered +
                  " " +
                  (blog.subtitle ? blog.subtitle : "") +
                  " " +
                  blog.content.rendered
              )
            }}
            Min Read</span
          >
          <router-link :to="{ name: 'BlogDetails', params: { id: blog.id } }">
            <button @click="scrollToTop()">
              Read More <img src="./icon/arrow.svg" alt="arrow" />
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading Blog Posts...</div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      blogs: [],
      topArticle: null,
    };
  },
  methods: {
    formattedDate(date) {
      return moment(date).fromNow(); // Formats the date using moment.js
    },
    getReadingTime(str) {
      const arr = str.split(" ");
      return parseInt(arr.filter((word) => word !== "").length / 200);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    separateTopArticle() {
      // Assuming blogs are sorted by date, get the first article as the top article
      this.topArticle = this.blogs[0];
      // Remove the top article from the list of articles
      this.blogs = this.blogs.slice(1);
    },
    fetchBlogPosts() {
      return fetch("https://techcrunch.com/wp-json/wp/v2/posts?_embed")
        .then((response) => response.json())
        .then((data) => {
          // Fetch author information for each post
          const authorRequests = data.map((post) =>
            fetch(`https://techcrunch.com/wp-json/wp/v2/users/${post.author}`)
              .then((response) => response.json())
              .then((authorData) => ({
                ...post,
                author: authorData.name,
              }))
          );

          // Wait for all author requests to complete before updating blogs data
          return Promise.all(authorRequests)
            .then((blogsWithAuthors) => {
              this.blogs = blogsWithAuthors;
              this.separateTopArticle();
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.log(error.message));
    },
  },
  mounted() {
    this.fetchBlogPosts();
  },
};
</script>

<style lang="scss" scoped>
.blog-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 50px 0 62px 0;
}

/* Styles for the top article */
.top-article {
  width: 100%;
  padding: 10px;
  border: 1px solid #f5f5f5;
  background-color: #ffffff;
  margin-bottom: 62px;
  display: flex;
}

.top-article .image-container {
  width: 50%;
  margin-right: 20px;
}

.top-article .image-container img {
  width: 100%;
  height: auto;
}

.top-article .date-time {
  margin-bottom: 8px;
}
.top-article .author-name {
  color: #1473e6;
  font-weight: bold;
  margin-bottom: 8px;
}
.top-article .blog-text {
  width: 50%;
}

.top-article .read-more-button {
  color: #1473e6;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 12px;
}

/* Styles for other articles */
.blog-card {
  width: 350px;
  padding: 10px;
  border: 1px solid #f5f5f5;
  background-color: #ffffff;
  margin-bottom: 62px;
}

.blog-card .image-container img {
  width: 100%;
  height: auto;
  margin-bottom: 16px;
}

.blog-card .date-time {
  margin-bottom: 8px;
}

.blog-card .author-name {
  color: #1473e6;
  font-weight: bold;
  margin-bottom: 8px;
}

.blog-card h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.blog-card p {
  font-size: 14px;
  color: #6e6e6e;
  line-height: 21px;
}

.blog-card .blog-link {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 20px;
}

.blog-card button {
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
/* Media query for screens smaller than 768px (typical phones) */
@media (max-width: 768px) {
  .top-article {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .top-article .image-container {
    width: 100%;
    margin-bottom: 20px;
  }

  .top-article .image-container img {
    width: 100%;
    height: auto;
    max-width: 100%;
  }

  .top-article .blog-text {
    width: 100%;
    text-align: center;
  }

  .top-article .read-more-button {
    color: #1473e6; /* Text color */
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 10px; /* Adjust top margin for spacing */
  }
}
</style>

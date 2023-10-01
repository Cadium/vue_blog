import BlogDetails from "@/views/BlogDetails.vue";
import BlogHomepage from "@/views/BlogHomepage.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "BlogHomepage",
    component: BlogHomepage,
  },
  {
    path: "/details/:id",
    name: "BlogDetails",
    component: BlogDetails,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

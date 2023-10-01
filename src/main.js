import Vue from "vue";
import App from "./App.vue";
import "./assets/global.css";
import router from "./router";
import Flutterwave from "flutterwave-vue-v3";

Vue.config.productionTip = false;

Vue.use(Flutterwave, {
  publicKey: "FLWPUBK_TEST-48ecceefb72d364c5fc37a85ccb60cd6-X",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

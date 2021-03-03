import Vue from "vue";
import "@/plugins/font";
import "@/plugins/fomantic";
import App from "./App.vue";
import router from "./router";
import $ from "jquery";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import "@/plugins/font";
import "@/plugins/fomantic";
import App from "./App.vue";
import router from "./router";
import $ from "jquery";
import "@/plugins/animate"

import VueHighlightJS from "vue-highlight.js";

// Highlight.js languages (Only required languages)
import python from "highlight.js/lib/languages/python";

import "highlight.js/styles/gruvbox-dark.css";

Vue.use(VueHighlightJS, {
  // Register only languages that you want
  languages: {
    python
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

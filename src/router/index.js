import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Files from "@/views/Files";
import Stars from "@/views/Stars";
import Love from "@/views/Love";

Vue.use(VueRouter);

const routes = [
  {
    path: "/OYO",
    redirect: "/OYO/home"
  },
  {
    path: "/OYO/home",
    name: "Home",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/OYO/files",
    name: "Files",
    component: Files,
    meta: {
      title: "文件"
    }
  },
  {
    path: "/OYO/stars",
    name: "Stars",
    component: Stars,
    meta: {
      title: "收藏"
    }
  },
  {
    path: "/OYO/love",
    name: "Love",
    component: Love,
    meta: {
      title: "爱你 ✌️❤️"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes: routes
});

router.beforeEach((to, from, next) => {
  document.title = "OYO - " + to.matched[0].meta.title;
  next();
});

export default router;

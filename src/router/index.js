import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Contents from "@/views/Contents";
import File from "@/views/File";
import Stars from "@/views/Stars";
import Login from "@/views/Login";
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
    path: "/OYO/contents*",
    name: "Files",
    component: Contents,
    meta: {
      title: "文件"
    }
  },
  {
    path: "/OYO/file*",
    name: "File",
    component: File,
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
    path: "/OYO/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录"
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
  to.matched[0]
    ? (document.title = "OYO - " + to.matched[0].meta.title)
    : (document.title = "OYO");
  next();
});

export default router;

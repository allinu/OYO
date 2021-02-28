<template>
  <div class="ui attached">
    <!-- NOTE 导航栏 -->
    <MenuBarBase></MenuBarBase>
    <!-- NOTE 下面显示路由主体内容 -->
    <router-view />
    <!-- NOTE 下面显示页脚 -->
    <Footer></Footer>
  </div>
</template>

<script>
import MenuBarBase from "@/components/MenuBarBase";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    MenuBarBase,
    Footer,
  },
};
</script>

<style>
* {
  font-family: "NFM", "SCM";
}
@keyframes hue {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}
.colorful {
  border: none;
  border-radius: 5px;
  background: linear-gradient(135deg, #fff, #fbb);
  animation: hue 6s linear infinite;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
</style>

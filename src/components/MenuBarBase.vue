<template>
  <div class="ui secondary menu">
    <div class="ui container">
      <router-link class="item" to="/OYO/home">
        <img id="logo" src="@/assets/OYO LOGO.png" alt="LOGO" />
      </router-link>
      <router-link class="item" to="/OYO/contents">
        <span class="ui medium text">文件</span></router-link
      >
      <router-link class="item" to="/OYO/stars"
        ><span class="ui medium text">收藏</span></router-link
      >
      <router-link class="item" to="/OYO/kernel">
        <span class="ui medium text">运行</span></router-link
      >
      <div class="right menu">
        <router-link class="ui item" to="/OYO/login">
          <span class="nf nf-fa-user_circle_o"></span>
          <!-- <span class="ui medium text">登 录</span> -->
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemuBarBase',
}
</script>

<style scoped>
#logo {
  width: 30px;
  margin-left: -25px;
}
.ui.secondary.menu .item {
  background: none;
}
.ui.secondary.menu a.item:hover {
  background: none;
}
.ui.secondary.menu .active.item {
  background: none;
  color: red;
}
span.ui.medium.text {
  font-size: 1.2em;
}
.nf {
  font-size: 20px;
}
</style>

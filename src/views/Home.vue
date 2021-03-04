<template>
  <div>
    <div class="main-bg"></div>

    <div class="main">
      <CustomLogo class="logo" />
      <div class="content">
        <img src="@/assets/jupyter.png" alt="jupyter" />
        <i class="nf nf-fa-plus"></i>
        <img src="@/assets/vue.png" alt="vue" />
        <i class="nf nf-fae-equal"></i>
        <img src="@/assets/OYO LOGO.png" alt="vue" />
      </div>
    </div>
  </div>
</template>

<script>
import CustomLogo from '@/components/CustomLogo'

export default {
  name: 'Home',
  components: {
    CustomLogo,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.main {
  padding-top: 50px;
  text-align: center;
  position: relative;
  height: 650px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 10%);
  overflow: hidden;
}
.main > .content {
  margin-top: 50px;
  font-family: 'NFM', 'SCR',monospace;
}
.main > .content > .nf {
  color: rgba(0, 0, 0, 0.2);
  margin: 0 40px;
  font-size: 40px;
  vertical-align: super;
}
.main > .content > img {
  width: 40px;
}
</style>

<template>
  <div>
    <div class="main-bg"></div>

    <div class="main">
      <CustomLogo class="logo" />
    </div>
  </div>
</template>

<script>
import CustomLogo from "@/components/CustomLogo";

export default {
  name: "Home",
  components: {
    CustomLogo
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.main {
  padding-top: 150px;
  text-align: center;
  text-align: center;
  position: relative;
  height: 650px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 10%);
  overflow: hidden;
}
.main > h1 {
  margin-top: 50px;
  font-family: "NFM", "SCR";
}

.logo {
  font-size: 120px;
}
</style>

<template>
  <div id="logo">
    <img src="@/assets/OYO LOGO.png" alt="LOGO" />
  </div>
</template>

<script>
export default {
  name: 'CustomLogo',
  data() {
    return {
      heartColor: 'red',
      circleColor: 'black',
    }
  },
}
</script>

<style scoped>
#logo img {
  width: 20vw;
  /* height: 10vh; */
}
</style>

<template>
  <div id="logo">
    <i class="nf nf-dev-python"></i>
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
#logo {
  letter-spacing: 0.45em;
}
#logo .nf {
  color: red;
}
</style>

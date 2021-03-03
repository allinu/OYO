<template>
  <div class="ui container">
    <hr />
    <div class="ui aligned grid">
      <span class="left floated left aligned six wide column"
        >联系我：
        <a :href="mail_to">{{ author_mail }}</a>
      </span>
      <span class="right floated right aligned six wide column"
        >版本：{{ version }}</span
      >
    </div>
  </div>
</template>
<script>
var moment = require('moment')

moment.locale('zh-cn')

export default {
  name: 'Footer',
  data() {
    return {
      version: '1.0.0',
      author_mail: 'lionacc@163.com',
    }
  },
  computed: {
    mail_to: function () {
      return 'mailto:' + this.author_mail
    },
  },
}
</script>
<style scoped>
</style>

<template>
  <div class="ui container animate__animated animate__fadeIn animate__faster">
    <hr />
    <div class="ui aligned grid">
      <span class="left floated left aligned six wide column">
        <span class="nf nf-fa-paper_plane"></span>
        <a :href="feedback_url"> 反馈/建议</a>
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
      feedback_url: 'https://github.com/allinu/OYO/issues/new/choose',
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
.ui.grid {
  margin-top: 5px;
}
</style>

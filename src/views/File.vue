<template>
  <div class="ui container">
    <!-- <div class="ui breadcrumb">
      <span v-for="(path, index) in paths" :key="index">
        <a class="section" @click="click_path(index)">{{ path }}</a>
        <span class="divider nf nf-fae-slash"> </span>
      </span>
    </div> -->
    <div class="ui list">{{ ans }}</div>
  </div>
</template>

<script>
const axios = require('axios')
const moment = require('moment')

moment.locale('zh_CN')

axios.defaults.withCredentials = true
export default {
  name: 'File',
  data() {
    return {
      ans: { data: { content: {} } },
    }
  },
  created() {
    this.get_files()
  },
  methods: {
    get_files() {
      axios
        .get('/api/contents' + this.$route.params.pathMatch)
        .then((ans) => ((this.ans = ans), console.log(ans)))
    },
    format_date(time) {
      return moment(time).format('YYYY/MM/DD HH:mm:ss')
    },
  },
  computed: {},
}
</script>

<style lang="css" scoped>
a {
  margin-left: 10px;
  margin-right: 20px;
  color: black;
}
</style>
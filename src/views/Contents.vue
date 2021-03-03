<template>
  <div class="ui container">
    <div class="ui breadcrumb">
      <a class="section nf nf-mdi-home_circle" @click="click_path_home()"></a>
      <span class="divider nf nf-fa-chevron_right"> </span>
      <span v-for="(path, index) in paths" :key="index">
        <a class="section" @click="click_path(index)">{{ path }}</a>
        <span class="divider nf nf-fa-chevron_right"> </span>
      </span>
    </div>
    <div class="ui list">
      <div class="item" v-for="(file, index) in ans.data.content" :key="index">
        <span class=".nf nf-mdi-folder" v-if="file.type == 'directory'"></span>
        <span class=".nf nf-mdi-file" v-if="file.type == 'notebook'"></span>
        <a @click="post_route(file.name, 0)" v-if="file.type == 'directory'">{{
          file.name
        }}</a>
        <a @click="post_route(file.name, 1)" v-if="file.type == 'notebook'">{{
          file.name
        }}</a>
        <span class="ui grey text">{{ format_date(file.last_modified) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
const moment = require('moment')

moment.locale('zh_CN')

axios.defaults.withCredentials = true
export default {
  name: 'Contents',
  data() {
    return {
      ans: { data: { content: {} } },
      paths: [],
    }
  },
  created() {
    this.get_files()
    this.get_paths()
  },
  methods: {
    get_files() {
      axios
        .get('/api/contents' + this.$route.params.pathMatch)
        .then((ans) => (this.ans = ans))
    },
    post_route(file_name, type = 0) {
      if (type == 0) {
        this.$router.push({
          path: this.$route.path + '/' + file_name,
        })
      }
      if (type == 1) {
        // this.$router.push({
        //   path: '/OYO/file/' + file_name,
        // })
        let path = window.location.origin + '/OYO/file/' + file_name
        window.open(path, '_blank')
      }
    },
    format_date(time) {
      return moment(time).format('YYYY/MM/DD HH:mm:ss')
    },
    get_paths() {
      this.paths = this.$route.path.split('/')
      let tmp = []
      for (let i in this.paths) {
        if (
          this.paths[i] != '' &&
          this.paths[i] != 'OYO' &&
          this.paths[i] != 'contents' &&
          this.paths[i] != 'file'
        ) {
          tmp.push(this.paths[i])
        }
      }
      this.paths = tmp
    },
    click_path(index) {
      let path = '/OYO/contents/'
      for (let i = 0; i <= index; i++) {
        path = path + this.paths[i] + '/'
      }
      this.$router.push({
        path: path,
      })
    },
    click_path_home() {
      let path = '/OYO/contents/'
      this.$router.push({
        path: path,
      })
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
a.section.nf {
  vertical-align: middle;
}
.nf {
  /* color: #000; */
  padding: 0 10px;
  font-size: 20px;
  line-height: 20px;
}
</style>
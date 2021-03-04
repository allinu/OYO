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
    <div class="ui middle aligned list">
      <div
        class="ui item other"
        v-for="(file, index) in ans.data.content"
        :key="index"
      >
        <span
          class=".nf nf-mdi-folder"
          style="color: #0c85d0"
          v-if="file.type === 'directory'"
        ></span>
        <span
          class=".nf nf-fa-file_text_o"
          v-if="file.type === 'notebook'"
        ></span>
        <a @click="post_route(file.name, 0)" v-if="file.type === 'directory'">{{
          file.name
        }}</a>
        <a @click="post_route(file.name, 1)" v-if="file.type === 'notebook'">{{
          file.name
        }}</a>
        <span class="ui middle aligned right floated grey text">
          {{ format_date(file.last_modified) }}</span
        >
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
    this.sort_item()
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
          this.paths[i] !== '' &&
          this.paths[i] !== 'OYO' &&
          this.paths[i] !== 'contents' &&
          this.paths[i] !== 'file'
        ) {
          // INFO 对URL中的中文进行解码(恢复中文)
          tmp.push(decodeURIComponent(this.paths[i]))
        }
      }
      this.paths = tmp
    },
    click_path(index) {
      let path = '/OYO/contents/'
      for (let i = 0; i <= index; i++) {
        path = path + this.paths[i] + '/'
      }
      if (this.$route.path !== path){
      this.$router.push({
        path: path,
      })}
    },
    click_path_home() {
      let path = '/OYO/contents/'
      if (this.$route.path !== path){
        this.$router.push({
          path: path,
        }) 
      }
    },
    // TODO 文件夹置顶排序
    sort_item(){
        console.log(this.ans)
    }
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
.ui.breadcrumb {
  padding: 0 10px;
}
.ui.list {
  height: 80vh;
  padding: 10px;
  overflow: scroll;
  scrollbar-width: 0;
}
.ui.list >>> span.nf {
  font-size: 20px;
}
.ui.item {
  padding-left: 10px;
  padding-right: 10px;
  line-height: 25px;
  border-radius: 5px;
}
.item.other:hover {
  background: rgba(0, 0, 0, 0.051);
}
.ui.item .ui.text {
  line-height: 25px;
}
</style>

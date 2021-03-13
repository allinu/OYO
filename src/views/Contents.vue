<template>
  <div class="ui container animate__animated animate__fadeIn animate__faster">
    <div class="ui breadcrumb">
      <a class="section" @click="click_path_home()">
        <span class="nf nf-mdi-home_circle"></span>
      </a>
      <span class="divider nf nf-fa-chevron_right"> </span>
      <span v-for="(path, index) in paths" :key="index">
        <a class="section" @click="click_path(index)"
          ><span class="nf nf-mdi-folder"></span>{{ path }}</a
        ><span class="divider nf nf-fa-chevron_right"></span>
      </span>
    </div>
    <div class="ui middle aligned list">
      <!-- INFO 目录 -->
      <div
        class="ui item other"
        v-for="dir in dirs"
        :key="dir.id"
        @click="post_route(dir.name, 0)"
      >
        <span class=".nf nf-mdi-folder" style="color: #0c85d0"></span>
        <a>{{ dir.name }}</a>
        <!-- <span class="right floated">{{ format_date(dir.last_modified) }}</span> -->
      </div>
      <!-- INFO Notebook Files -->
      <div
        class="ui item other"
        v-for="file in nb_files"
        :key="file.id"
        @click="post_route(file.path, 1)"
      >
        <span class=".nf nf-fa-file_code_o"></span>
        <a>{{ file.name }}</a>
        <span class="right floated">{{ format_date(file.last_modified) }}</span>
      </div>
      <!-- INFO 其他文件 -->
      <div
        class="ui item other"
        v-for="file in other_files"
        :key="file.id"
        @click="post_route(file.path, 2)"
      >
        <span class=".nf nf-fa-file_o"></span>
        <a>{{ file.name }}</a>
        <span class="right floated">{{ format_date(file.last_modified) }}</span>
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
      ans: { data: { content: { last_modified: '' } } },
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
        let path = window.location.origin + '/OYO/file/' + file_name
        window.open(path, '_blank')
      }
      if (type == 2) {
        let path = window.location.origin + '/OYO/image/' + file_name
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
      if (this.$route.path !== path) {
        this.$router.push({
          path: path,
        })
      }
    },
    click_path_home() {
      let path = '/OYO/contents/'
      if (this.$route.path !== path) {
        this.$router.push({
          path: path,
        })
      }
    },
  },
  computed: {
    dirs: function () {
      let dir_list = []
      for (let i = 0; i < this.ans.data.content.length; i++) {
        const tmp = this.ans.data.content[i]
        if (tmp.type === 'directory') {
          dir_list.push(tmp)
        }
      }
      return dir_list
    },
    nb_files: function () {
      let file_list = []
      for (let i = 0; i < this.ans.data.content.length; i++) {
        const tmp = this.ans.data.content[i]
        if (tmp.type === 'notebook') {
          file_list.push(tmp)
        }
      }
      return file_list
    },
    other_files: function () {
      let file_list = []
      for (let i = 0; i < this.ans.data.content.length; i++) {
        const tmp = this.ans.data.content[i]
        if (tmp.type === 'file') {
          file_list.push(tmp)
        }
      }
      return file_list
    },
  },
}
</script>

<style lang="css" scoped>
.ui.list {
  background: rgba(0, 0, 0, 0.051);
  border-radius: 5px;
}
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
  vertical-align: middle;
}
.ui.breadcrumb {
  padding: 0 10px;
}
.ui.breadcrumb .divider {
  padding: 0;
  margin: 0;
  padding-right: 2px;
  margin-left: 10px;
}

.ui.list {
  height: 80vh;
  padding: 10px;
  overflow: scroll;
  scrollbar-width: 0;
}
.ui.list .ui.item span.nf {
  font-size: 20px;
}
.ui.item {
  padding-left: 10px;
  padding-right: 10px;
  line-height: 25px;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
}
.item.other:hover {
  background: rgba(0, 0, 0, 0.051);
}
.ui.item .ui.text {
  line-height: 25px;
}
</style>

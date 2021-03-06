<template lang="html">
  <div class="ui container">
    <div class="ui button" @click="create_kernel"> 创建Kernel</div>
    <h3 >正在运行的Kernel</h3>
    <div class="ui middle aligned list">
      <div class="ui item other" v-for="(kernel, kernel_index) in ans.data" :key="kernel_index">
        <!-- <span class=".nf nf-fa-file_code_o"></span> -->
        <a>{{ kernel.id }}</a>
        <span class="right floated">{{ format_date(last_activity) }}</span>
      </div>
    </div>
  </div>
</template>
<script>
const moment = require('moment')
moment.locale('zh_CN')
import axios from 'axios'
export default {
  name: 'Kernel',
  data() {
    return {
      ans: {
        data: [
          {
            id: '',
            name: '',
            last_activity: '',
            execution_state: '',
            connections: 0,
          },
        ],
      },
      kernel_id_ans: {},
    }
  },
  methods: {
    post_route(index = 0) {
      if (this.$route.params.pathMatch === '') {
        this.$router.push({
          path: this.$route.path + '/' + this.ans.data[index].id,
        })
      }
    },
    format_date(time) {
      return moment(time).format('YYYY/MM/DD HH:mm:ss')
    },
    get_kernels() {
      axios
        .get('/api/kernels' + this.$route.params.pathMatch)
        .then((ans) => (this.ans = ans))
    },
    get_kernel(index = 0) {
      axios
        .get('/api/kernels/' + ans.data[index].id)
        .then((ans) => (this.ans = ans))
    },
    create_kernel() {
      axios.post('/api/kernels').then((ans) => console.log(ans))
    },
    login() {
      axios.get('/api/')
    },
  },
  created() {
    this.get_kernels()
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
}
.item.other:hover {
  background: rgba(0, 0, 0, 0.1);
}
.ui.item .ui.text {
  line-height: 25px;
}
</style>

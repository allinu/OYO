<template>
  <div class="ui container animate__animated animate__fadeIn">
    <div class="ui aligned grid">
      <span class="left floated left aligned six wide column">
        <strong>名称: {{ ans.name }}</strong>
      </span>
      <strong class="right floated right aligned six wide column"
        >最后编辑日期 ：{{ format_date(ans.last_modified) }}</strong
      >
    </div>
    <!-- INFO 图像显示 -->
    <img :src="make_img(ans.content)" />
    <!-- INFO Markdown 显示 -->
  </div>
</template>

<script>
const moment = require('moment')

moment.locale('zh_CN')
const axios = require('axios')

axios.defaults.withCredentials = true
export default {
  components: {},
  name: 'Image',
  data() {
    return {
      type: 'code',
      input_content: '',
      ans: {
        name: '',
        path: '',
        last_modified: '',
        created: '',
        content: {
          cells: [
            {
              cell_type: 'code',
              execution_count: 2,
              id: 'silver-reviewer',
              metadata: {
                trusted: false,
              },
              outputs: [
                {
                  name: 'stdout',
                  output_type: 'stream',
                  text: '',
                  'image/png': '',
                },
              ],
              source: 'time.sleep(2)\nprint("hi ")',
            },
          ],
          metadata: {
            kernelspec: {
              display_name: 'Python 3',
              language: 'python',
              name: 'python3',
            },
            language_info: {
              codemirror_mode: {
                name: 'ipython',
                version: 3,
              },
              file_extension: '.py',
              mimetype: 'text/x-python',
              name: 'python',
              nbconvert_exporter: 'python',
              pygments_lexer: 'ipython3',
              version: '3.9.2',
            },
          },
          nbformat: 4,
          nbformat_minor: 5,
        },
        format: 'json',
        mimetype: null,
        size: 2779,
        writable: true,
        type: 'notebook',
      },
    }
  },
  // TODO 建立socket链接发送代码
  created() {
    this.get_files()
  },
  methods: {
    get_files() {
      axios
        .get('/api/contents' + this.$route.params.pathMatch)
        .then((ans) => (this.ans = ans.data))
    },
    format_date(time) {
      return moment(time).format('YYYY/MM/DD HH:mm:ss')
    },

    make_img(base64) {
      return 'data:image/png;base64,' + base64
    },
  },
  computed: {},
  updated() {},
}
</script>

<style lang="css" scoped>
.ui.grid {
  margin-bottom: 2px;
}
strong {
  font-size: 1.2em;
}

img {
  width: 100%;
  border-radius: 5px;
}
</style>
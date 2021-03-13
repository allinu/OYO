<template>
  <div class="ui container">
    <Loader
      v-show="loader === true"
      class="animate__animated animate__fadeIn"
    ></Loader>

    <div
      v-show="loader === false"
      class="ui middle aligned list animate__animated animate__fadeIn"
    >
      <div
        class="ui item"
        v-for="(cell, index) in ans.content.cells"
        :key="index"
      >
        <!-- INFO 输入部分 -->
        <div
          class="content source"
          contenteditable="true"
          v-if="cell.source !== ''"
        >
          <highlight-code
            v-if="cell.cell_type !== 'markdown' && cell.source !== ''"
            lang="python"
            >{{ cell.source }}
          </highlight-code>
          <markdown-it-vue
            v-if="cell.cell_type === 'markdown'"
            :content="cell.source"
          />
        </div>
        <!-- INFO 输出部分 -->

        <div
          class="content output"
          v-if="Array.isArray(cell.outputs) && cell.outputs.length !== 0"
        >
          <div
            v-for="(output, output_index) in cell.outputs"
            :key="output_index"
          >
            <!-- INFO 普通输出 -->
            <highlight-code
              v-if="
                cell.cell_type === 'code' &&
                Array.isArray(cell.outputs) &&
                output.length !== 0 &&
                output.output_type === 'stream'
              "
              lang="python"
              >{{ output.text }}
            </highlight-code>
            <!-- INFO 图像显示 -->
            <div
              v-if="
                cell.cell_type === 'code' &&
                Array.isArray(cell.outputs) &&
                cell.outputs.length !== 0 &&
                output['image/png'] !== '' &&
                output.output_type === 'display_data'
              "
              lang="python"
            >
              <img :src="make_img(output.data['image/png'])" />
            </div>
            <!-- INFO Markdown 显示 -->
            <markdown-it-vue
              class="md-body"
              v-if="
                cell.cell_type === 'markdown' &&
                Array.isArray(cell.outputs) &&
                cell.outputs.length !== 0
              "
              :content="output"
            />
          </div>
        </div>
      </div>

      <!-- INFO 预览部分 -->
      <div class="ui item" v-if="input_content !== ''">
        <div class="content">
          <span class="ui label circular">{{ type }}</span>

          <highlight-code v-if="type === 'code'" lang="python"
            >{{ input_content }}
          </highlight-code>
          <markdown-it-vue
            class="md-body"
            v-if="type === 'markdown'"
            :content="input_content"
          />
        </div>
      </div>
    </div>

    <form v-show="loader === false" class="ui reply form">
      <div class="field">
        <textarea
          v-model="input_content"
          @keydown.tab.prevent="tabber($event)"
        ></textarea>
      </div>
      <div class="ui inline fields">
        <input type="radio" id="code" value="code" v-model="type" />
        <label for="code">Code</label>
        <br />
        <input type="radio" id="markdown" value="markdown" v-model="type" />
        <label for="markdown">Markdown</label>
        <br />
      </div>

      <div class="ui blue submit button">发送</div>
    </form>
  </div>
</template>

<script>
import Loader from '@/components/Loader'

const axios = require('axios')
const moment = require('moment')
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

moment.locale('zh_CN')

axios.defaults.withCredentials = true
export default {
  components: {
    MarkdownItVue,
    Loader,
  },
  name: 'File',
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
      loader: true,
    }
  },
  // TODO 建立socket链接发送代码
  created() {
    this.get_files()
    setInterval(this.set_loader, 1000)
  },
  methods: {
    get_files() {
      axios
        .get('/api/contents' + this.$route.params.pathMatch)
        .then((ans) => (this.ans = ans.data))
      console.log(this.$route.params.pathMatch)
    },
    format_date(time) {
      return moment(time).format('YYYY/MM/DD HH:mm:ss')
    },
    tabber(event) {
      if (event) {
        event.preventDefault()
        let startText = this.input_content.slice(0, event.target.selectionStart)
        let endText = this.input_content.slice(event.target.selectionStart)
        this.input_content = `${startText}    ${endText}`
        event.target.selectionEnd = event.target.selectionStart + 1
      }
    },
    make_img(base64) {
      return 'data:image/png;base64,' + base64
    },
    set_loader() {
      this.loader = false
    },
  },
  computed: {},
  updated() {},
}
</script>

<style lang="css" scoped>
a {
  color: black;
}

.ui.item {
  padding: 10px;
  border-left: 5px solid white;
  border-radius: 5px;
}

.ui.item:hover {
  background: rgba(0, 0, 0, 0.1);
  border-left: 5px solid red;
  border-radius: 5px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
}
.ui.item:focus,
.content:focus {
  outline: none;
}
.ui.item:focus .ui.item {
  background: rgba(0, 0, 0, 0.3);
}
.ui.item >>> .hljs {
  font-family: 'NFM', 'SCM', monospace;
  font-size: 1.1em;
  padding: 9px;
  border-radius: 5px;
}
.ui.item >>> .hljs {
  line-height: 1.4em;
}
.markdown-body >>> pre {
  border-radius: 5px;
}
.ui.form textarea {
  font-family: 'NFM', 'SCM', monospace;
}
</style>
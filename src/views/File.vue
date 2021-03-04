<template>
  <div class="ui container">
    <div class="ui comments">
      <div
        class="ui comment"
        v-for="(cell, index) in ans.content.cells"
        :key="index"
      >
        <!-- INFO 输入部分 -->
        <a class="avatar" v-if="cell.source !== ''">
          <span class="nf nf-fa-user_circle_o"></span>
        </a>
        <div class="content" v-if="cell.source !== ''">
          <a class="author">YOU</a>
          <div class="metadata">
            <span class="date">{{ cell.cell_type }}</span>
          </div>
          <highlight-code
            v-if="cell.cell_type !== 'markdown' && cell.source !== ''"
            lang="python"
          >{{ cell.source }}
          </highlight-code
          >
          <Markdown
            v-if="cell.cell_type === 'markdown'"
            :content="cell.source"
          />
          <!-- <div class="actions">
            <a class="type">{{ cell.cell_type }}</a>
          </div> -->
        </div>
        <!-- INFO 输出部分 -->
        <a
          class="avatar"
          v-if="Array.isArray(cell.outputs) && cell.outputs.length !== 0"
        >
          <span class="nf nf-mdi-robot"></span>
        </a>

        <div
          class="content"
          v-if="Array.isArray(cell.outputs) && cell.outputs.length !== 0"
        >
          <a class="author">BOT</a>
          <div class="metadata">
            <span class="date">{{ cell.cell_type }}</span>
          </div>
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
            <Markdown
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
      <div class="ui comment" v-if="input_content !== ''">
        <a class="avatar">
          <span class="nf nf-fa-user_circle_o preview"></span>
        </a>
        <div class="content">
          <a class="author">预览</a>
          <div class="metadata">
            <span class="date">{{ type }}</span>
          </div>

          <highlight-code v-if="type === 'code'" lang="python">{{
              input_content
            }}
          </highlight-code>
          <Markdown v-if="type === 'markdown'" :content="input_content"/>

          <!-- <div class="actions">
            <a class="type">{{ type }}</a>
          </div> -->
        </div>
      </div>
    </div>

    <form class="ui reply form">
      <div class="field">
        <textarea
          v-model="input_content"
          @keydown.tab.prevent="tabber($event)"
        ></textarea>
      </div>
      <div class="ui inline fields">
        <input type="radio" id="code" value="code" v-model="type"/>
        <label for="code">Code</label>
        <br/>
        <input type="radio" id="markdown" value="markdown" v-model="type"/>
        <label for="markdown">Markdown</label>
        <br/>
      </div>

      <div class="ui blue submit button">发送</div>
    </form>
  </div>
</template>

<script>
const axios = require('axios')
const moment = require('moment')
import Markdown from '@/components/Markdown.vue'
import 'github-markdown-css'

moment.locale('zh_CN')

axios.defaults.withCredentials = true
export default {
  components: {Markdown},
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
    }
  },
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
  },
  computed: {},
  updated() {
  },
}
</script>

<style lang="css" scoped>
a {
  color: black;
}

.ui.form textarea {
  font-family: 'NFM', 'SCM', monospace;
}

.ui.comment >>> span.nf {
  font-size: 30px;
}

.ui.comment >>> span.nf.nf-fa-user_circle_o {
  color: #7f51ec;
}

.ui.comment >>> span.nf.nf-fa-user_circle_o.preview {
  color: #ff5353;
}

.ui.comment >>> span.nf-mdi-robot {
  color: rgba(24, 196, 124, 0.897);
}

.ui.comments >>> .comment {
  padding: 5px;
  padding-left: 20px;
  border-radius: 5px;
  width: 173%;
}

.comment:hover {
  background: rgba(0, 0, 0, 0.05);
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
}

.ui.comment >>> .hljs {
  font-family: 'NFM', 'SCM', monospace;
  font-size: 1.1em;
  padding: 9px;
  border-radius: 5px;
}

.ui.comments .comment .actions a {
  color: rgba(115, 41, 235, 0.644);
}
</style>
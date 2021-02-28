<template>
  <div class="ui container">
    <div class="main">
      <h2>Files</h2>
    </div>
  </div>
</template>
<script>
import 'axios'
import axios from 'axios'

const API = 'http://localhost:8888/api/'

export default {
  name: 'Files',
  data() {
    return {
      file_list: [],
    }
  },
  methods: {
    login() {
      const api = API + '/login'
      axios.post(api, {})
    },
  },
  mounted() {},
}
</script>

<style scoped>
* {
  font-family: 'NFM', 'SCM';
}
</style>

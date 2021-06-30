<template>
  <div class="reponseBox">
    <el-card class="box-card">
      <pre v-highlightjs><code class="json" v-html="code"></code></pre>
    </el-card>
  </div>
</template>

<script>
import hljs from 'highlight.js'
export default {
  name: 'ReponstCard',
  props: {
   
  },
  data() {
    return {
      code: null,
    }
  },
  updated() {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
  },
       
  methods: {
    setCode(val) {
      this.code = JSON.stringify(val, null, 2)
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .reponseBox {
    width: 100%;
    margin: 0 auto;
    min-height: 100px;
    overflow: hidden;
  }
  .reponseBox .el-card {
    min-height: 100px;
    text-align: left;
    background-color: #2d2d2d;
    overflow-x: auto;
  }

  .reponseBox .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    box-shadow: none;
  }

  pre code {
    white-space: pre;
     height: auto;
  }
  pre {
    margin: 0;
  }

</style>

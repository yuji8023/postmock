<template>
  <div id="app">
    <div class="headerBox">
      <div class="leftBox"><UrlInput ref="oldUrl" /></div>
      <div class="rightBox"><UrlInput ref="newUrl" /></div>
    </div>
    <div class="headBox">
      <h2>Request</h2>
      <ParamInput @handle-request="handleRequest" />
    </div>
    <div class="contentBox">
      <h2 style="marginLeft: 20px">Response</h2>
      <div class="leftBox"><ReponseCard ref="oldRes" /></div>
      <div class="rightBox"><ReponseCard ref="newRes" /></div>
    </div>
    <div class="footBox">
      <h2>Diff</h2>
      <ReponseDiff ref="diff" />
    </div>
  </div>
</template>

<script>
import UrlInput from './components/UrlInput.vue';
import ParamInput from './components/ParamInput.vue';
import ReponseCard from './components/ReponseCard.vue';
import ReponseDiff from './components/ReponseDiff.vue';
export default {
  name: 'App',
  components: {
    UrlInput,
    ParamInput,
    ReponseCard,
    ReponseDiff
  },
  methods: {
    getClass(object){
      return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    },
    handleRequest(body) {
      let oldObj = this.$refs['oldUrl'].getVal();
      let newObj = this.$refs['newUrl'].getVal();
      let contentType;
      // 校验域名
      if(!oldObj.inputVal && !newObj.inputVal) {
        this.$message({
          message: 'Url为空',
          type: 'warning'    
        });
        return;
      }
      contentType = body.contentType;
      console.log(oldObj.select)
      console.log(contentType)
      if (oldObj.inputVal){
        this.$axios({
            method: oldObj.select,
            headers: {
              ...body.headerObj,
              'Content-Type':contentType
            },
            url: oldObj.inputVal,
            data: contentType == 'application/x-www-form-urlencoded' ? this.qs.stringify(body.paramObj) : body.paramObj
        }).then(res => {
          this.$refs['oldRes'].setCode(res.data);
        }).catch(error => {
          this.$message({
            message: '请求出错'+ error,
            type: 'warning'  
          });
        })
      }

      if (newObj.inputVal) {
        this.$axios({
            method: newObj.select,
            headers: {
              ...body.headerObj,
              'Content-Type':contentType
            },
            url: newObj.inputVal,
            data: contentType == 'application/x-www-form-urlencoded' ? this.qs.stringify(body.paramObj) : body.paramObj
        }).then(res => {
          this.$refs['newRes'].setCode(res.data)
        }).catch(error => {
          this.$message({
            message: '请求出错'+ error,
            type: 'warning'  
          });
        })
      }

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 16px;
  min-height: calc(100vh - 100px);
}
h2 {
  text-align: left;
}
.headerBox {
  overflow: hidden;
}
.leftBox {
  float: left;
  width: calc(50% - 40px);
  margin-left: 20px;
}
.rightBox {
  float: right;
  width: calc(50% - 40px);
  margin-right: 20px;
}

.headBox {
  width: calc(100% - 40px);
  margin: 20px auto;
  overflow: hidden;
}

.contentBox {
  overflow: hidden;
}

.footBox {
  width: calc(100% - 40px);
  margin: 20px auto;
  overflow: hidden;
}

</style>

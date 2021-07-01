<template>
  <div id="app">
    <div class="headerBox">
      <div class="leftBox"><UrlInput ref="oldUrl" /></div>
      <div class="rightBox"><UrlInput ref="newUrl" /></div>
    </div>
    <div class="headBox">
      <h2>Request</h2>
      <ParamInput :sendLoading="sendLoading" @handle-request="handleRequest" />
    </div>
    <div class="bot3" v-for="(item, i) in resArr" :key="i">
      <div class="contentBox">
        <h2 style="marginLeft: 20px">Response - 第{{i + 1}} 组</h2>
        <div class="leftBox"> <ReponseCard ref="oldRes" :code="item.left" /></div>
        <div class="rightBox"><ReponseCard ref="newRes" :code="item.right"/></div>
      </div>
      <div class="footBox">
        <h2>Diff - 第{{i + 1}} 组</h2>
        <ReponseDiff :oldJosn="item.left" :newJson="item.right" ref="diff" />
      </div>
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
  data() {
    return {
      resArr: [],
      sendLoading: false
    }
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
      if(!oldObj.inputVal || !newObj.inputVal) {
        this.$message({
          message: 'Url为空',
          type: 'warning'    
        });
        return;
      }
      this.sendLoading = true;
      contentType = body.contentType;
      let param = body.paramObj;
      param.firstUrl = oldObj.inputVal;
      param.secondUrl = newObj.inputVal;

      this.$axios({
          method: 'post',
          headers: {
            ...body.headerObj,
            'Content-Type':contentType
          },
          url: 'https://gateway.fangkuaiyi.com/plm/data/diff/list',
          data: contentType == 'application/x-www-form-urlencoded' ? this.qs.stringify(param) : param
      }).then(res => {
        this.resArr = res.data.data;
        this.sendLoading = false;
      }).catch(error => {
        this.$message({
          message: '请求出错'+ error,
          type: 'warning'  
        });
        this.sendLoading = false;
      })

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

.bot3 {
  border-top: 3px solid #e1e1e1;
}

</style>

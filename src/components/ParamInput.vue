<template>
  <div class="paramBox">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane class="body-area" label="Body" name="first">
        <el-input
          v-model="paramStr"
          type="textarea"
          :placeholder="placeholderStr"
          :autosize="{
            minRows: 3
          }"
        >
        </el-input>
        <el-button-group class="group-btn">
          <el-button @click="setType('kv')" :type="type=='kv' ? 'primary' : '' " size="mini" >KV</el-button>
          <el-button @click="setType('raw')" :type="type=='raw' ? 'primary' : '' " size="mini" >RAW</el-button>
        </el-button-group>
      </el-tab-pane>
      <el-tab-pane label="Header" name="second">
        <el-input
          v-model="headerStr"
          type="textarea"
          placeholder='User-Agent: Mozilla/5.0
  Cookie: key=value'
          :autosize="{
            minRows: 3
          }"
        >
        </el-input>
      </el-tab-pane>
      <el-tab-pane label="Content-Type" name="third">
        <el-radio-group v-model="radio">
          <el-radio label="application/json">application/json</el-radio>
          <el-radio label="multipart/form-data">multipart/form-data</el-radio>
          <el-radio label="application/x-www-form-urlencoded">application/x-www-form-urlencoded</el-radio>
          <el-radio disabled label="application/xml">application/xml</el-radio>
        </el-radio-group>
      </el-tab-pane>
    </el-tabs>
    
    <el-button class="send" @click="send" type="primary" :loading="sendLoading">Send</el-button>
    <!-- <el-alert
      title="内容格式错误"
      type="error">
    </el-alert> -->
  </div>
</template>

<script>
import * as common from '../utils/common.js';
const str1 = `paramStr: yuji`
export default {
  name: 'UrlInput',
  props: {
    sendLoading: Boolean
  },
  data() {
    return {
      paramStr: '',
      headerStr: '',
      activeName: 'first',
      radio: 'application/x-www-form-urlencoded',
      type: 'kv',
      placeholderStr: str1
    }
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    },
    setType(type) {
      if (this.type == type) return;
      this.type = type;
      const paramStr = this.paramStr;
      
      let str;
      
      switch (type) {
        case 'kv':
          this.placeholderStr = str1;
          str = common.objectToKvString(common.fromUrlEncodeToObject(paramStr))
          break;
        case 'raw':
          this.placeholderStr = `name=yuji&age=18`;
          str = common.objectToJsonString(common.kvStringToObject(paramStr))
          break;
      }
      this.paramStr = str;
    },
    getParam() {
      const paramStr = this.paramStr;
      let obj;
      if (this.type == 'kv') {
        obj = common.kvStringToObject(paramStr) 
      }
      if (this.type == 'raw') {
        obj = common.fromUrlEncodeToObject(paramStr)
      }
      return obj;
    },
    send() {
      this.$emit('handle-request', {
        paramObj: this.getParam(),
        headerObj: common.kvStringToObject(this.headerStr),
        contentType: this.radio
      })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .paramBox {
    width: 100%;
    margin: 0 auto;
    height: 100%;
  }

  .el-tabs {
    width: calc(100% - 120px);
    float: left;
  }

  .paramBox .el-alert {
    width: calc(100% - 120px);
  }

  .body-area {
    position: relative;
  }

  .group-btn {
    position: absolute;
    top: 0;
    right: 0;
  }

  .paramBox .send {
    float: right;
    height: 74px;
    margin-top: 60px;
  }
</style>

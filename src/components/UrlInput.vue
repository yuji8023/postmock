<template>
  <div class="urlBox">
    <el-input placeholder="Enter request URL" v-model="inputVal" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="GET" value="get"></el-option>
        <el-option label="POST" value="post"></el-option>
      </el-select>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'UrlInput',
  props: {
   
  },
  data() {
    return {
      select: 'get',
      inputVal: '',
    }
  },
  methods: {
    getVal () {
      return {
        inputVal: this.inputVal,
        select: this.select
      }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .urlBox {
    width: 100%;
    margin: 0 auto;
    height: 40px;
  }

</style>

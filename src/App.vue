<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-11-24 10:54:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body {
  --themeColor: #f97c28;
}
* {
  font-family: Microsoft YaHei;
  font-size: 12px !important;
}
#app{
  overflow: auto;
}
.el-loading-mask.is-fullscreen {
  background-color: rgba(10, 10, 10, 0.5);
}
button {
  font-family: Microsoft YaHei;
}
.el-table td {
  padding: 6px 0 !important;
}
.el-table .cell {
  line-height: 20px !important;
}
.el-table{
  .el-table__body-wrapper{
    tr{
      td{
        color: #000000;
      }
    }
  }
}

i.close-right{
  position: absolute;
  right: 5px;
}
</style>
<script>
import './assets/css/reset.css'
import './assets/css/base.less'
export default {
  name: 'App',
  mounted() {
    this.$appConfig.primaryColor().then(res => {
      document.body.style.setProperty('--themeColor', 'red')
    })
  }
}
</script>

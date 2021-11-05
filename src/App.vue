<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-15 17:24:57
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
</style>
<script>
import './assets/css/reset.css'
import './assets/css/base.less'
export default {
  name: 'App',
  mounted() {
    this.$appConfig.primaryColor().then(res => {
      document.body.style.setProperty('--themeColor', res)
    })
  }
}
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body {
  --themeColor: #f97c28;
  /*overflow: hidden;*/
}
#app {
  font-family: Microsoft YaHei;
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
    // this.$appConfig.primaryColor().then(res => {
    //   document.body.style.setProperty('--themeColor', res)
    // })
  }
}
</script>

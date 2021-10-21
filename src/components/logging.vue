<template>
  <div>
    <!-- 日志 -->
    <div :class="{ showLogBox: true, showBox: showConsole }">
      <span v-if="!showConsole" class="closeBox" @click="changeshowConsole(true)"><i class="el-icon-d-arrow-right" /></span>
      <!-- @click="showConsole = true" -->
      <span v-else class="closeBox" @click="changeshowConsole(false)"><i class="el-icon-d-arrow-left" /></span>
      <div class="consoleBox" v-html="consoleMsg" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showConsole: {
      type: Boolean,
      default: false
    },
    consoleMsg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    changeshowConsole(status) {
      this.$emit('changeshowConsole', status)
    }
  }
}
</script>

<style scoped lang="less">
.showLogBox {
  position: fixed;
  bottom: 0;
  right: 0px;
  width: 360px;
  height: 500px;
  z-index: 100000;
  transition: all 0.3s;
  &.showBox {
    transform: translateX(360px);
  }
  .consoleBox {
    width: 360px;
    height: 500px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    padding: 10px;
    overflow-y: auto;
    display: inline-block;
    position: absolute;
  }
  .closeBox {
    width: 20px;
    background: #ffffff;
    display: inline-block;
    vertical-align: top;
    line-height: 40px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: 1px solid #eeeeee;
    background-color: #f6f7fa;
    border-right: none;
    cursor: pointer;
    padding-left: 1px;
    position: absolute;
    top: 0px;
    left: -20px;
  }
  i {
    font-size: 18px;
    color: #909399;
  }
}
</style>

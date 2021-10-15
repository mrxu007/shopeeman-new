<!--
 * @Author: your name
 * @Date: 2021-10-13 10:14:33
 * @LastEditTime: 2021-10-13 11:27:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\components\echart-line.vue
-->
<!--echarts图形组件-->
<template>
  <div
    :id="id"
    :class="id"
    :style="'height:' + height + ';' + 'width:' + width"
  />
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    // 唯一标识符
    id: { type: String, default: 'chart' },
    // 宽
    width: {
      type: String,
      default: '100%'
    },
    // 高
    height: {
      type: String,
      default: '100%'
    },
    option: {
      // 所有配置
      type: Object,
      default: null
    }
  },
  data() {
    return {
      resizeTimer: null,
      myChart: null
    }
  },
  watch: {
    option: {
      deep: true,
      handler: function(newV, oldv) {
        this.option = newV
        this.drawChart()
      }
    }
  },
  mounted() {
    this.drawChart()
    window.addEventListener('resize', () => {
      if (this.resizeTimer) clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        this.myChart.resize()
      }, 0)
    })
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById(this.id))
      this.myChart = myChart
      const option = this.option
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped></style>

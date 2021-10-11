<!--
 * @Author: your name
 * @Date: 2021-10-11 11:37:54
 * @LastEditTime: 2021-10-11 14:52:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\components\echart-line.vue
-->
<template>
  <div class="chart-line">
    <div id="chartLine"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'ChartLine',
  props: {
    lineData: {
      type: Object,
    },
  },
  data() {
    return {
      chartData: {
        
      },
    }
  },
  mounted() {
    console.log("props",this.lineData)
    this.renderLine()
  },
  methods: {
      renderLine(){
          let data = this.lineData
          let lineData = {
              legend:{
                  data: data.legend
              },
              xAxis: {
                data: data.xAxis,
             },
             yAxis: {},
             series: data.series
          }
          let myChart = echarts.init(document.getElementById('chartLine'))
          console.log("lineData",lineData)
          myChart.setOption(lineData)
      }
  },
}
</script>

<style lang="less" scoped>
.chart-line {
}
#chartLine {
  width: 100%;
  height: 400px;
}
</style>

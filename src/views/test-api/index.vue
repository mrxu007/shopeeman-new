<template>
  <div>
    <el-button type="primary" size="mini">获取数据</el-button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getMallDataStatistics()
  },
  methods: {
    async getMallDataStatistics() {
      const res = await this.$api.getMallDataStatistics({ 'sysMallIds': '424,6448,6466,6676,24057,27681,108591,195471,232877,352204,355973,355991,356024,649527,649578,649644,649656,649740,649746,649747,716742,716743,716757,716760,716765,897750', 'days': '7' })
      debugger
    }
  }
}
</script>

<style>
</style>

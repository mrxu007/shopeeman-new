<template>
  <div class="container">
    <el-table
      ref="shopGroupTable"
      highlight-current-row
      width="100"
      height="calc(100vh - 20px)"
      :data-changes-scroll-top="false"
      :row-height="40"
      :border="false"
      :data="shopGruopData"
      :row-class-name="tableRowClassName"
      @row-click="rowClick"
    >
      <el-table-column align="center" prop="group_name" label="店铺分组" />
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    getData: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      shopGruopData: [] // 店铺分组数据
    }
  },
  async mounted() {
    await this.getBindMallCount()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'default-current-row'
      }
    },
    // 点击店铺分组
    rowClick(row) {
      this.$emit('getGroupId', row.id)
      if (row.id !== 0) {
        document.querySelector('.default-current-row').style.color = '#60627d'
        document.querySelector('.default-current-row').style.backgroundColor = '#fff'
      }
      this.getData()
      console.log(row)
    },
    // 获取店铺分组
    async getBindMallCount() {
      const { data } = await this.$api.getBindMallCount()
      if (data.code === 200) {
        this.shopGruopData = data.data
        this.shopGruopData.unshift({ 'id': 0, 'group_name': '全部分组' })
        this.shopGruopData.push({ 'id': -1, 'group_name': '无分组' })
        console.log('shopGroupData', data.data)
      } else {
        this.$message.error(`店铺分组数据错误${data.message}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
    /deep/.el-table {
      border-radius: 5px;
      /deep/.el-table__row {
        cursor: pointer;
      }
    }
    /deep/.el-table .default-current-row {
      color: #f74e1d;
      background-color: #ecf5ff;
    }
    /deep/.current-row {
      color: #f74e1d !important;
    }
</style>

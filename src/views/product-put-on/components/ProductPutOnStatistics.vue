<!--
 * @Author: your name
 * @Date: 2021-10-21 09:38:11
 * @LastEditTime: 2021-11-02 12:23:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\product-put-on\components\ProductPutOnCategoryblack.vue
-->
<template>
  <div class="putOn-statistics">
    <!-- btn区 -->
    <div class="tool-bar">
      <div class="tool-row">
        <storeChoose :is-all="true" @changeMallList="changeMallList" />
      </div>
      <div class="tool-row">
        <div class="tool-item mar-right">
          <span>查询时间：</span>
          <!-- <el-date-picker
            v-model="statisticsTime"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            style="width: 200px"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            :default-time="['00:00:00', '23:59:59']"
          /> -->
          <el-date-picker
            v-model="statisticsTime"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            style="width: 220px"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </div>
        <el-button type="primary" size="mini" class="mar-right" @click="searchTableList">查 询</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="exportData">导 出</el-button>
      </div>
    </div>
    <!-- 表格区 -->
    <div class="content">
      <el-table
        ref="multipleTable"
        v-loading="tableLoading"
        :data="tableDataCut"
        tooltip-effect="dark"
        height="calc(100vh - 145px)"
      >
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column width="120px" label="站点" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="店铺" prop="platform_mall_name" align="center">
          <template v-slot="{row}"><span>{{ row.mall_alias_name || row.platform_mall_name }}</span></template>
        </el-table-column>
        <el-table-column min-width="60px" label="店铺分组" prop="group_name" align="center" />
        <el-table-column min-width="60px" label="上架总量" prop="upCount" align="center" sortable />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[100,200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import storeChoose from '../../../components/store-choose'
import { exportExcelDataCommon, waitStart } from '../../../util/util'
export default {
  components: {
    storeChoose
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      statisticsTime: [],
      pageSize: 100, // 页码
      currentPage: 1, // 页码
      total: 0, // 表格总数
      multipleSelection: [],
      tableLoading: false,
      tableData: [],
      mallData: [],
      tableDataCut: []
    }
  },
  async mounted() {
    const end = new Date().getTime()
    const start = end - 3 * 24 * 60 * 60 * 1000
    this.statisticsTime = [this.$dayjs(start).format('YYYY-MM-DD'), this.$dayjs(end).format('YYYY-MM-DD')]
    waitStart(() => {
      return this.mallData[0]
    }, 20)
    this.searchTableList()
  },
  methods: {
    changeMallList(val) {
      this.mallData = val
      console.log(val)
    },
    // 导出数据
    exportData() {
      if (!this.tableData.length) {
        return this.$message.warning('没有可导出的数据！')
      }
      let num = 1
      let str = `<tr>
                <td>编号</td>
                <td>站点</td>
                <td>店铺</td>
                <td>店铺分组</td>
                <td>店铺总量</td>
                </tr>`
      for (let i = 0; i < this.tableData.length; i++) {
        const item = this.tableData[i]
        str += `<tr><td>${num++}</td>
                        <td>${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
                        <td>${item.platform_mall_name ? item.platform_mall_name : '' + '\t'}</td>
                        <td>${item.group_name ? item.group_name : '' + '\t'}</td>
                        <td>${item.upCount ? item.upCount : 0 + '\t'}</td>
                    </tr>`
      }
      exportExcelDataCommon('店铺上架数量统计', str)
    },
    // 查询
    async searchTableList() {
      console.log(this.statisticsTime)
      this.tableData = []
      const params = [this.statisticsTime[0] + ' 00:00:00', this.statisticsTime[1] + ' 23:59:59']
      this.tableLoading = true
      const res = await this.$commodityService.getStatisticsNew(params)
      if (!res) {
        this.tableLoading = false
        return
      }
      const resObj = res && JSON.parse(res)
      const statisticData = resObj.data || []
      const obj = {
        country: '--',
        platform_mall_name: '--',
        group_name: '--',
        upCount: 0
      }
      let sum = 0
      this.tableData.push(obj)
      for (let i = 0; i < this.mallData.length; i++) {
        const mall = this.mallData[i]
        mall.upCount = 0
        statisticData.forEach((item) => {
          item.list.forEach((subItem) => {
            if (Number(subItem.mallId) === Number(mall.platform_mall_id)) {
              mall.upCount += subItem.cnt
            }
          })
        })
        sum = sum + mall.upCount
        this.tableData.push(mall)
      }
      this.$set(obj, 'upCount', sum)
      this.total = this.tableData.length
      this.dataCut()
      // console.log(res, this.mallData, this.tableData)
      this.tableLoading = false
    },
    //   表格选择
    selectionChange(val) {
      this.multipleSelection = val
    },
    // 分页设置
    dataCut() {
      this.tableDataCut = this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.dataCut()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.dataCut()
    }
  }
}
</script>

<style lang="less" scoped>
.putOn-statistics {
  min-width: 1200px;
  margin: 10px;
}
.mar-right {
  margin-right: 10px;
}
.tool-bar {
  // height: 100px;
  height: 50px;
  background: #fff;
  display: flex;
  .tool-row {
    // padding: 10px 16px 0 0px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .tool-item {
      display: flex;
      align-items: center;
    }
  }
}
.content {
  margin-top: 20px;
  // margin: 20px 0;
  background: #fff;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: 35px;
  }
}
</style>

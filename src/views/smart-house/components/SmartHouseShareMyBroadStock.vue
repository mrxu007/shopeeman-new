<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul>
        <li>
          <span>仓库名称：</span>
          <el-select
            v-model="form.wid"
            size="mini"
            filterable
          >
            <el-option :value="'0'" label="全部" />
            <el-option
              v-for="(item, index) in widList"
              :key="index"
              :value="item.id"
              :label="item.warehouse_name"
            />
          </el-select>
        </li>
        <li>
          <span>系统商品编号：</span>
          <el-input
            v-model="form.sys_sku_id"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <el-button
            type="primary"
            size="mini"
            @click="
              page =1
              getSharedIndex()"
          >搜 索</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="exportTableData"
          >导出数据</el-button>
        </li>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="isShowLoading"
        height="calc(100vh - 165px)"
        :row-style="{ height: '45px' }"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
        />
        <el-table-column
          label="仓库名称"
          align="center"
          min-width="100"
          prop="warehouse_name"
        />
        <el-table-column
          prop="sys_sku_id"
          label="系统商品编号"
          min-width="120"
          align="center"
        />
        <el-table-column
          label="商品编号(SkuId)"
          align="center"
          min-width="120"
        >
          <template slot-scope="{row}">
            {{ row.stock && row.stock.sku_id?row.stock.sku_id:'' }}
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          align="center"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.stock && row.stock.goods_name?row.stock.goods_name:'' }}
          </template>
        </el-table-column>
        <el-table-column
          label="商品规格"
          align="center"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.stock && row.stock.sku_name?row.stock.sku_name:'' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          min-width="90"
        >
          <template slot-scope="{row}">
            <span :style="colorObj[row.status] && 'color:'+colorObj[row.status]">{{ row.status ?statusObj[row.status]:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="shared_num"
          label="共享库存"
          align="center"
          min-width="70"
        />
        <el-table-column
          prop="consume_num"
          label="可使用库存"
          align="center"
          min-width="80"
        />
        <el-table-column
          label="商品单价(RMB)"
          align="center"
          min-width="110"
        >
          <template slot-scope="{row}">
            {{ row.stock &&row.stock.sku_price ?row.stock.sku_price/100:'' }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.stock.sku_image"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  style="width: 400px; height: 400px"
                  :src="row.stock.sku_image"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.stock.sku_image"
              >
                <div slot="error" class="image-slot" />
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          min-width="130"
          align="center"
          label="商品链接"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.stock.sku_url"
              type="primary"
              size="mini"
              @click="openUrl(row.stock.sku_url)"
            >查看商品链接</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="page"
          :page-sizes="[30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
  </el-row>
</template>

<script>
import ShareMyBroadStock from '../../../module-api/smart-house-api/share-my-broad-stock'
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      isShowLoading: false,
      ShareMyBroadStock: new ShareMyBroadStock(this),

      total: 0,
      pageSize: 30,
      page: 1,

      tableData: [], // 表格数据
      widList: [], // 仓库数据

      form: { // 条件搜索
        wid: '0', // 仓库ID
        sys_sku_id: '', // sku
        status: '' // 1正常 2已完成 3弃用
      },

      statusObj: {
        1: '正常',
        2: '已完成',
        3: '弃用'
      },
      colorObj: {
        1: 'green',
        3: 'red'
      }
    }
  },
  async mounted() {
    // 获取仓库
    await this.getOverseasWarehouse()
    // 获取数据
    await this.getSharedIndex()
  },
  methods: {
    // 获取数据
    async getSharedIndex() {
      this.isShowLoading = true
      this.form.page = this.page
      this.form.page_num = this.pageSize
      const res = await this.ShareMyBroadStock.getSharedIndex(this.form)
      if (res.code === 200) {
        this.tableData = res.data.data
        this.total = res.data.total
        for (let index = 0; index < this.tableData.length; index++) {
          const element = this.tableData[index]
          // 获取海外仓库中文名
          const resName = await this.ShareMyBroadStock.overseasWh(element.wid)
          if (resName.code === 200) {
            this.$set(element, 'warehouse_name', resName.data)
          } else {
            this.$set(element, 'warehouse_name', '')
          }
        }
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(res.data)
      }
      this.isShowLoading = false
    },
    // 获取仓库
    async getOverseasWarehouse() {
      const myMap = new Map()
      const res = await this.ShareMyBroadStock.getOverseasWarehouse()
      if (res.code === 200) {
        res.data.forEach(item => {
          this.widList = this.widList.concat(item.child)
        })
        this.widList = this.widList.filter((item) => !myMap.has(item.id) && myMap.set(item.id, 1))
      } else {
        this.$message.error(res.data)
      }
    },
    // 打开商品链接
    openUrl(row) {
      window.open(row)
    },
    // 导出数据
    async exportTableData() {
      if (this.total === 0) return this.$message('暂无导出数据')
      this.isShowLoading = true
      const exportData = []
      const params = this.form
      params.pageSize = this.pageSize
      params.page = 1
      while (exportData.length < this.total) {
        const res = await this.ShareMyBroadStock.getSharedIndex(params)
        if (res.code === 200) {
          const resData = res.data.data
          resData.forEach(async item => {
            const resName = await this.ShareMyBroadStock.overseasWh(item.wid)
            if (resName.code === 200) {
              item.warehouse_name = resName.data
            } else {
              item.warehouse_name = ''
            }
            exportData.push(item)
          })
          params.page++
        } else {
          this.$message.error('导出数据错误', res.data)
          this.isShowLoading = false
          break
        }
      }
      let str = `<tr>
          <td>仓库名称</td>
          <td>系统商品编号</td>
          <td>商品编号</td>
          <td>商品名称</td>
          <td>商品规格</td>
          <td>状态</td>
          <td>共享库存</td>
          <td>可使用库存</td>
          <td>商品单价(RMB)</td>
          <td>商品图片</td>
          <td>商品链接</td>
        </td>`
      exportData.forEach(item => {
        str += `<tr>
        <td>${item.warehouse_name ? item.warehouse_name : '' + '\t'}</td>
        <td>${item.sys_sku_id ? item.sys_sku_id : '' + '\t'}</td>
        <td style="mso-number-format:'\@';">${item.stock && item.stock.sku_id ? item.stock.sku_id : '' + '\t'}</td>
        <td>${item.stock && item.stock.goods_name ? item.stock.goods_name : '' + '\t'}</td>
        <td>${item.stock && item.stock.sku_name ? item.stock.sku_name : '' + '\t'}</td>
        <td>${this.statusObj[item.status] ? this.statusObj[item.status] : '' + '\t'}</td>
        <td>${item.shared_num ? item.shared_num : '' + '\t'}</td>
        <td>${item.consume_num ? item.consume_num : '' + '\t'}</td>
        <td>${item.stock && item.stock.sku_price ? item.stock.sku_price / 100 : '' + '\t'}</td>
        <td>${item.stock.sku_image || item.stock.real_image_url + '\t'}</td>
         <td>${item.stock && item.stock.sku_url ? item.stock.sku_url : '' + '\t'}</td>
        </tr>`
      })
      this.isShowLoading = false
      exportExcelDataCommon('共享给我的海外仓库存数据', str)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getSharedIndex()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getSharedIndex()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/share-my-broad-stock.less';
</style>

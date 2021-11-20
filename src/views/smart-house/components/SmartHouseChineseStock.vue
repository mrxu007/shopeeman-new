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
            <el-option
              v-for="(item, index) in widList"
              :key="index"
              :label="item.warehouse_name"
              :value="item.wid"
            />
          </el-select>
        </li>
        <li>
          <span>商品编号：</span>
          <el-input
            v-model="form.sku_id"
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
              getStock()"
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
        />
        <el-table-column
          label="商品编号(SkuId)"
          align="center"
          min-width="100"
          prop="sku_id"
        />
        <el-table-column
          label="商品名称"
          align="center"
          min-width="100"
          prop="goods_name"
        />
        <el-table-column
          label="商品规格"
          align="center"
          min-width="100"
          prop="sku_name"
        />
        <el-table-column
          label="采购数量"
          align="center"
          min-width="100"
          prop="purchase_num"
        />
        <el-table-column
          label="仓库库存"
          align="center"
          min-width="100"
          prop="stock"
        />
        <el-table-column
          label="在途库存"
          align="center"
          min-width="100"
          prop="transport_num"
        />
        <el-table-column
          label="总库存"
          align="center"
          min-width="120"
        >
          <template slot-scope="{row}">
            {{ row.transport_num+row.stock }}
          </template>
        </el-table-column>
        <el-table-column
          label="占用库存"
          align="center"
          min-width="100"
          prop="frozen_num"
        />
        <el-table-column
          label="占用库存"
          align="center"
          min-width="100"
          prop="frozen_num"
        />
        <el-table-column
          label="商品单价(RMB)"
          align="center"
          min-width="110"
          prop="sku_price"
        />
        <el-table-column
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.sku_image"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <img
                  :src="row.sku_image"
                  width="300px"
                  height="300px"
                >
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.sku_image"
              />
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
              v-if="row.goods_url"
              type="primary"
              size="mini"
              @click="openUrl(row.goods_url)"
            >查看商品链接</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="货架仓位"
          align="center"
          min-width="100"
          prop="position_code"
        />
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
import ChineseStock from '../../../module-api/smart-house-api/chinese-stock'
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      isShowLoading: false,
      ChineseStock: new ChineseStock(this),

      total: 0,
      pageSize: 30,
      page: 1,

      tableData: [], // 表格数据
      widList: [], // 仓库数据

      form: { // 条件搜索
        wid: '', // 仓库ID
        sku_id: '' // sku
      }
    }
  },
  async mounted() {
    // 获取仓库
    await this.getWarehouseList()
    // 获取数据
    await this.getStock()
  },
  methods: {
    // 获取数据
    async getStock() {
      this.isShowLoading = true
      this.form.page = this.page
      this.form.page_size = this.pageSize
      const res = await this.ChineseStock.getStock(this.form)
      if (res.code === 200) {
        this.tableData = res.data.data
        this.total = res.data.total
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(res.data)
      }
      this.isShowLoading = false
    },
    // 获取仓库
    async getWarehouseList() {
      const myMap = new Map()
      const res = await this.ChineseStock.getWarehouseList()
      if (res.code === 200) {
        res.data.forEach(item => {
          if (item.user_ids) {
            const flag = item.user_ids.some(uItem => {
              return uItem === this.muid
            })
            if (flag) {
              this.widList.push(item)
            }
          } else {
            if (item.status !== 2) {
              this.widList.push(item)
            }
          }
        })
        this.widList = this.widList.filter((item) => !myMap.has(item.id) && myMap.set(item.id, 1))
        this.form.wid = this.widList[0].wid
      } else {
        this.$message.error(`${res.data}`)
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
      let resData = []
      const params = this.form
      params.pageSize = this.pageSize
      params.page = 1
      while (resData.length < this.total) {
        const res = await this.ChineseStock.getStock(params)
        if (res.code === 200) {
          resData = resData.concat(res.data.data)
          params.page++
        } else {
          this.$message.error('导出数据错误', res.data)
          this.isShowLoading = false
          break
        }
      }
      let str = `<tr>
          <td>仓库名称</td>
          <td>商品编号(SkuId)</td>
          <td>商品名称</td>
          <td>商品规格</td>
          <td>采购数量</td>
          <td>仓库库存</td>
          <td>在途库存</td>
          <td>总库存</td>
          <td>占用库存</td>
          <td>商品单价(RMB)</td>
          <td>商品图片</td>
          <td>商品链接</td>
          <td>货架仓位</td>
        </td>`
      resData.forEach(item => {
        str += `<tr>
        <td>${'' + '\t'}</td>
        <td>${item.sku_id ? item.sku_id : '' + '\t'}</td>
        <td>${item.goods_name ? item.goods_name : '' + '\t'}</td>
        <td>${item.sku_name ? item.sku_name : '' + '\t'}</td>
        <td>${item.purchase_num ? item.purchase_num : '' + '\t'}</td>
        <td>${item.stock ? item.stock : '' + '\t'}</td>
        <td>${item.transport_num ? item.transport_num : '' + '\t'}</td>
        <td>${item.transport_num && item.stock ? item.transport_num + item.stock : '' + '\t'}</td>
        <td>${item.frozen_num ? item.frozen_num : '' + '\t'}</td>
        <td>${item.sku_price ? item.sku_price : '' + '\t'}</td>
        <td>${item.sku_image ? item.sku_image : '' + '\t'}</td>
        <td>${item.goods_url ? item.goods_url : '' + '\t'}</td>
        <td>${item.position_code ? item.position_code : '' + '\t'}</td>
        </tr>`
      })
      this.isShowLoading = false
      exportExcelDataCommon('国内仓库存数据', str)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getStock()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getStock()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/chinese-stock.less';
</style>

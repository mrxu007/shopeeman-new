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
        height="calc(100vh - 160px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :default-sort="{prop: 'sku_name',order: 'descending'}"
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
          min-width="130"
          prop="warehouse_name"
        />
        <el-table-column
          label="商品编号(SkuId)"
          align="center"
          min-width="150"
          prop="sku_id"
        />
        <el-table-column
          label="商品名称"
          align="center"
          min-width="150"
          prop="goods_name"
          show-overflow-tooltip
        />
        <el-table-column
          label="商品规格"
          align="center"
          min-width="150"
          prop="sku_name"
          show-overflow-tooltip
          sortable
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
          min-width="90"
          prop="stock"
        />
        <el-table-column
          label="在途库存"
          align="center"
          min-width="90"
          prop="transport_num"
        />
        <el-table-column
          label="总库存"
          align="center"
          min-width="90"
          :render-header="allStockTooltip"
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
          label="商品单价(RMB)"
          align="center"
          min-width="110"
          prop="sku_price"
        />
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
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              style="width: 40px; height: 40px"
              :src="row.sku_image"
              :preview-src-list="[row.sku_image]"
              effect="light"
            >
              <div slot="content">
                <el-image
                  style="width: 400px; height: 400px"
                  :src="row.sku_image"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.sku_image"
              >
                <div slot="error" class="image-slot" />
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="货架仓位"
          align="center"
          min-width="150"
          prop="position_code"
          show-overflow-tooltip
        />
        <el-table-column
          label="操作"
          align="center"
          min-width="100"
        >
          <template v-slot="{ row }">
            <el-button type="primary" size="mini" @click="updateStockPriceDia(row)">商品编辑</el-button>
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
    <el-dialog
      class="update-price-dialog"
      :visible.sync="updatePriceVisible"
      width="330px"
      title="修改库存价格"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-position="right" label-width="80px">
        <el-form-item label="商品名称：">
          <el-input v-model="updatePriceData.goods_name" size="mini" disabled />
        </el-form-item>
        <el-form-item label="skuId：">
          <el-input v-model="updatePriceData.sku_id" size="mini" disabled />
        </el-form-item>
        <el-form-item label="商品规格：">
          <el-input v-model="updatePriceData.sku_name" size="mini" />
        </el-form-item>
        <el-form-item label="商品链接：">
          <el-input v-model="updatePriceData.goods_url" size="mini" />
        </el-form-item>
        <el-form-item label="图片链接：">
          <el-input v-model="updatePriceData.sku_image" size="mini" />
        </el-form-item>
        <el-form-item label="商品价格：">
          <el-input v-model="updatePriceData.sku_price" size="mini" style="width:100px" />
          <span style="color:#969393;margin-left: 5px;">RMB</span>
        </el-form-item>
        <!-- <el-form-item label="新价格：" style="margin-bottom: 10px;">
          <el-input v-model="updatePriceData.newPrice" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d.]/g,0)" />
          <span style="color:#969393;margin-left: 5px;">RMB</span>
        </el-form-item> -->
        <el-form-item style="margin-top: 10px;">
          <el-button type="primary" size="mini" style="margin-left:10px;width:100px" @click="updateStockPrice">确 定</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import ChineseStock from '../../../module-api/smart-house-api/chinese-stock'
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      updatePriceVisible: false,
      isShowLoading: false,
      ChineseStock: new ChineseStock(this),

      total: 0,
      pageSize: 30,
      page: 1,

      updatePriceData: {}, // 修改库存价格数据
      tableData: [], // 表格数据
      widList: [], // 仓库数据
      muid: 0,

      form: { // 条件搜索
        wid: '', // 仓库ID
        sku_id: '' // sku
      }
    }
  },
  async mounted() {
    // 获取用户信息，用来判断中转仓的显示
    await this.getUserInfo()
    // 获取仓库
    await this.getWarehouseList()
    // 获取数据
    await this.getStock()
  },
  methods: {
    // 商品编辑
    async  updateStockPrice() {
      if (!this.updatePriceData.sku_price) return this.$message('价格不能为空')
      // if (!this.updatePriceData.sku_name) return this.$message('商品规格不能为空')
      // if (!this.updatePriceData.goods_url) return this.$message('商品链接不能为空')
      // if (!this.updatePriceData.sku_image) return this.$message('图片链接不能为空')
      const parmas = {}
      parmas['wid'] = this.updatePriceData.wid
      parmas['sku_id'] = this.updatePriceData.sku_id
      parmas['sku_name'] = this.updatePriceData.sku_name
      parmas['goods_url'] = this.updatePriceData.goods_url
      parmas['sku_image'] = this.updatePriceData.sku_image
      parmas['sku_price'] = parseFloat(this.updatePriceData.sku_price).toFixed(2)
      const res = await this.ChineseStock.updateStockPrice(parmas)
      if (res.code === 200) {
        this.$message.success('商品编辑成功')
        this.updatePriceVisible = false
        this.getStock()
      } else {
        this.$message.error(res.data)
      }
    },
    // 商品编辑弹窗
    updateStockPriceDia(row) {
      console.log(row)
      this.updatePriceVisible = true
      this.updatePriceData = JSON.parse(JSON.stringify(row))
    },
    // 获取数据
    async getStock() {
      this.isShowLoading = true
      this.form.page = this.page
      this.form.page_size = this.pageSize
      this.form.sku_id.trim()
      const res = await this.ChineseStock.getStock(this.form)
      if (res.code === 200) {
        this.tableData = res.data.data
        this.total = res.data.total
        for (let index = 0; index < this.tableData.length; index++) {
          const element = this.tableData[index]
          // 获取仓库中文名
          const resName = await this.ChineseStock.transferWarehouse(element.wid)
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
    // 获取用户muid
    async getUserInfo() {
      const res = await this.ChineseStock.getUserInfo()
      if (res.code === 200) {
        this.muid = res.data.muid
      } else {
        this.$message.error(res.data)
      }
    },
    // 获取中转仓
    async getWarehouseList() {
      let data = []
      const myMap = new Map()
      // 判断是否缓存 有则使用缓存数据 没有则调取服务端 然后缓存一份
      const res1 = await this.ChineseStock.temporaryCacheInfo('get', 'getWarehouseList', '')
      if (res1.code === 200) {
        data = res1.data
      } else {
        const res2 = await this.ChineseStock.getWarehouseList()
        if (res2.code === 200) {
          data = res2.data
          await this.ChineseStock.temporaryCacheInfo('save', 'getWarehouseList', data)
        } else {
          this.$message.error(`${res2.data}`)
          return
        }
      }
      data.forEach(item => {
        // 判断user_ids是否有值 没有则判断状态 有则只显示与muid对应的
        if (item.user_ids) {
          console.log(this.muid)
          const flag = item.user_ids.some(uItem => { return uItem === this.muid })
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
    },
    // 打开外部链接
    async openUrl(url) {
      try {
        await this.$BaseUtilService.openUrl(url)
      } catch (error) {
        this.$message.error(`打开链接【${url}】失败`)
      }
    },
    // 导出数据
    async exportTableData() {
      if (this.total === 0) return this.$message('暂无导出数据')
      this.isShowLoading = true
      const exportData = []
      this.form.sku_id.trim()
      const params = this.form
      params.page_size = 200
      params.page = 1
      while (exportData.length < this.total) {
        const res = await this.ChineseStock.getStock(params)
        if (res.code === 200) {
          const resData = res.data.data
          resData.forEach(async item => {
            const resName = await this.ChineseStock.transferWarehouse(item.wid)
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
      exportData.forEach(item => {
        str += `<tr>
        <td>${item.warehouse_name ? item.warehouse_name : '' + '\t'}</td>
        <td style="mso-number-format:'\@';">${item.sku_id ? item.sku_id : '' + '\t'}</td>
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
    allStockTooltip(h, { column }) {
      return [
        column.label,
        h('el-tooltip', {
          props: { content: '仓库库存+在途库存', placement: 'top' }
        },
        [h('span', { class: { 'el-icon-question': true }})]
        )
      ]
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

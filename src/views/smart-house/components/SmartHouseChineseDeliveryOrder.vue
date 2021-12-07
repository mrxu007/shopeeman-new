<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
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
              :value="item.wid"
              :label="item.warehouse_name"
            />
          </el-select>
        </li>
        <li class="status">
          <span>订单出库状态：</span>
          <el-select
            v-model="form.status"
            size="mini"
            filterable
          >
            <el-option
              label="全部"
              :value="''"
            />
            <el-option
              v-for="(item, index) in statusList"
              :key="index"
              :label="item.lable"
              :value="item.value"
            />
          </el-select>
        </li>
        <li>
          <span>出库单创建时间：</span>
          <el-date-picker
            v-model="form.createdAt"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
      </ul>
      <ul>
        <li>
          <span>订单编号：</span>
          <el-input
            v-model="form.homeOrderSn"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span>平台物流单号：</span>
          <el-input
            v-model="form.platformTrackingNumber"
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
              getHomeOutStockOrder()"
          >搜 索</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="cancelHomeOrder(multipleSelection,2)"
          >批量取消订单</el-button>
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
        height="calc(100vh - 200px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="50"
          fixed
        />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
          fixed
        />
        <el-table-column
          prop="country"
          label="站点"
          min-width="100"
          align="center"
          fixed
        >
          <template slot-scope="{row}">
            {{ row.country | chineseSite }}
          </template>
        </el-table-column>
        <el-table-column
          prop="home_order_sn"
          label="订单编号"
          min-width="135"
          align="center"
          fixed
        />
        <el-table-column
          prop="platform_tracking_number"
          label="平台物流单号"
          align="center"
          min-width="130"
        />
        <el-table-column
          label="所属仓库"
          align="center"
          min-width="140"
          prop="warehouse_name"
        />
        <el-table-column
          prop="created_at"
          label="出库单创建时间"
          align="center"
          min-width="140"
        />
        <el-table-column
          prop="outbound_time"
          label="订单出库时间"
          align="center"
          min-width="140"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          min-width="150"
        >
          <template slot-scope="{row}">
            {{ row.status?statusObj[row.status]:'' }}
          </template>
        </el-table-column>
        <el-table-column
          label="出库商品详情"
          align="center"
          min-width="125"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              @click="
                detailsVisible = true
                getDetails(row)"
            >查看商品详情</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_num"
          label="出库商品总数"
          align="center"
          min-width="95"
        />
        <el-table-column
          prop="remark"
          label="仓库备注"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="goods_price"
          label="出库商品总价(RMB)"
          align="center"
          min-width="135"
        />
        <el-table-column
          align="center"
          label="操作"
          min-width="100"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.status!=5 && row.status !=6"
              size="mini"
              type="primary"
              @click="cancelHomeOrder(row,1)"
            >取消订单</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作状态"
          align="center"
          min-width="140"
          fixed="right"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span :style="row.color && 'color:' + row.color">{{ row.orderStatus }}</span>
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
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
    <!-- 查看出库商品详情弹窗 -->
    <el-dialog
      class="details-dialog"
      title="出库商品详情"
      :visible.sync="detailsVisible"
      width="1000px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table
        height="420"
        :data="detailsData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :row-style="{
          color: 'black',
          height: '50px',
        }"
      >
        <el-table-column
          width="50"
          align="center"
          type="index"
          label="序号"
          fixed
        />
        <el-table-column
          prop="home_order_sn"
          width="150"
          align="center"
          label="订单编号"
          show-overflow-tooltip
          fixed
        />
        <el-table-column
          width="150"
          align="center"
          label="商品编号(SKU)"
          prop="sku_id"
          show-overflow-tooltip
        />
        <el-table-column
          width="150"
          align="center"
          label="商品名称"
          prop="goods_name"
          show-overflow-tooltip
        />
        <el-table-column
          width="100"
          align="center"
          label="出库数量"
          prop="goods_count"
        />
        <el-table-column
          width="120"
          align="center"
          label="商品单价(RMB)"
          prop="goods_price"
        />
        <el-table-column
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.goods_img"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  :src="row.goods_img"
                  style="width: 400px; height: 400px"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.goods_img"
              >
                <div slot="error" class="image-slot" />
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
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
      </el-table>
    </el-dialog>
  </el-row>
</template>

<script>
import ChineseDeliveryOrder from '../../../module-api/smart-house-api/chinese-delivery-order'
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      showConsole: true,
      isShowLoading: false,
      detailsVisible: false,
      ChineseDeliveryOrder: new ChineseDeliveryOrder(this),

      total: 0,
      pageSize: 30,
      page: 1,

      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据
      detailsData: [], // 商品详情数据
      muid: 0,

      form: { // 条件搜索
        wid: '', // 仓库id
        homeOrderSn: '', // 出库单号
        platformTrackingNumber: '', // 物流单号
        createdAt: '', // 创建时间
        status: ''// 订单出库状态
      },
      statusObj: {
        1: '待入库',
        2: '等待包裹',
        3: '紧急入库',
        4: '待出库',
        5: '已出库',
        6: '已完成',
        7: '订单作废',
        8: '订单暂停',
        9: '异常'
      },
      widList: [], // 仓库列表
      statusList: [
        { value: 1, lable: '待入库' },
        { value: 2, lable: '等待包裹' },
        { value: 3, lable: '紧急入库' },
        { value: 4, lable: '待出库' },
        { value: 5, lable: '已出库' },
        { value: 6, lable: '已完成' },
        { value: 7, lable: '订单作废' },
        { value: 8, lable: '订单暂停' },
        { value: 9, lable: '异常' }
      ]
    }
  },
  async mounted() {
    this.form.createdAt = [new Date().getTime() - 3600 * 1000 * 24 * 15, new Date()]
    // 获取仓库
    await this.getWarehouseList()
    // 获取数据
    await this.getHomeOutStockOrder()
  },
  methods: {
    // 取消/批量取消订单
    async cancelHomeOrder(val, type) {
      let data = []
      if (type === 1) {
        data.push(val)
      } else {
        if (!val?.length) return this.$message('请选择需要取消订单的商品')
        data = val
      }
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        if (element.status !== 5 && element.status !== 6) {
          const pamars = {}
          pamars['id'] = element.id
          const res = await this.ChineseDeliveryOrder.cancelHomeOrder(pamars)
          console.log('cancelHomeOrder', res)
          if (res.code === 200) {
            this.$set(element, 'orderStatus', '取消订单成功')
            this.$set(element, 'color', 'green')
          } else {
            this.$set(element, 'orderStatus', res.data)
            this.$set(element, 'color', 'red')
          }
        }
      }
    },
    // 设置uid
    setUid(row) {
      this.overseaOrderSn = row.homeOrderSn
      this.stockForm.app_uid = row.uid
      this.reissueVisible = true
      this.getStock()
    },
    // 打开外部链接
    async openUrl(url) {
      try {
        await this.$BaseUtilService.openUrl(url)
      } catch (error) {
        this.$message.error(`打开链接【${url}】失败`)
      }
    },
    // 获取用户muid
    async getUserInfo() {
      const res = await this.ChineseDeliveryOrder.getUserInfo()
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
      const res1 = await this.ChineseDeliveryOrder.temporaryCacheInfo('get', 'getWarehouseList', '')
      if (res1.code === 200) {
        data = res1.data
      } else {
        const res2 = await this.ChineseDeliveryOrder.getWarehouseList()
        if (res2.code === 200) {
          data = res2.data
          await this.ChineseDeliveryOrder.temporaryCacheInfo('save', 'getWarehouseList', data)
        } else {
          this.$message.error(`${res2.data}`)
          return
        }
      }
      data.forEach(item => {
        // 判断user_ids是否有值 没有则判断状态 有则只显示与muid对应的
        if (item.user_ids) {
          const flag = item.user_ids.some(uItem => { return uItem === this.muid })
          if (flag) {
            this.widList.push(item)
          }
        } else {
          // 弹窗仓库列表不需要判断
          if (item.status !== 2) {
            this.widList.push(item)
          }
        }
      })
      this.widList = this.widList.filter((item) => !myMap.has(item.id) && myMap.set(item.id, 1))
      this.form.wid = this.widList[0].wid
    },
    // 获取数据
    async getHomeOutStockOrder() {
      this.isShowLoading = true
      this.form.page = this.page
      this.form.pageSize = this.pageSize
      const res = await this.ChineseDeliveryOrder.getHomeOutStockOrder(this.form)
      console.log('tableData', res)
      if (res.code === 200) {
        this.tableData = res.data.data
        this.tableData.map(async item => {
          // 获取仓库中文名
          const resName = await this.ChineseDeliveryOrder.transferWarehouse(item.wid)
          if (resName.code === 200) {
            this.$set(item, 'warehouse_name', resName.data)
          } else {
            this.$set(item, 'warehouse_name', '')
          }
          let goods_num = 0
          let goods_price = 0
          item.home_out_stock_sku.forEach(skuItem => {
            goods_num += skuItem.goods_count ? Number(skuItem.goods_count) : 0
            goods_price += skuItem.goods_price ? parseFloat(skuItem.goods_price).toFixed(2) * skuItem.goods_count : 0
          })
          item.goods_num = goods_num
          item.goods_price = goods_price
        })
        this.total = res.data.total
      } else {
        this.$message.error(res.data)
      }
      this.isShowLoading = false
    },
    // 查看商品详情
    getDetails(row) {
      this.detailsData = row.home_out_stock_sku
      this.detailsData.map(item => {
        item.home_order_sn = row.home_order_sn
      })
    },
    // 导出数据
    async exportTableData() {
      if (this.total === 0) return this.$message('暂无导出数据')
      this.isShowLoading = true
      const data = []
      const exportData = []
      const params = this.form
      params.pageSize = 200
      params.page = 1
      while (exportData.length < this.total) {
        const res = await this.ChineseDeliveryOrder.getHomeOutStockOrder(params)
        if (res.code === 200) {
          const resData = res.data.data
          resData.forEach(async item => {
            const resName = await this.ChineseDeliveryOrder.transferWarehouse(item.wid)
            if (resName.code === 200) {
              item.warehouse_name = resName.data
            } else {
              item.warehouse_name = ''
            }
            exportData.push(item)
          })
          params.page++
        } else {
          this.$refs.Logs.writeLog('导出数据错误', res.data)
          this.isShowLoading = false
          break
        }
      }
      exportData.forEach(item => {
        item.home_out_stock_sku.forEach(skuItem => {
          const obj = {}
          obj['country'] = item.country
          obj['home_order_sn'] = item.home_order_sn
          obj['platform_tracking_number'] = item.platform_tracking_number
          obj['warehouse_name'] = item.warehouse_name
          obj['created_at'] = item.created_at
          obj['outbound_time'] = item.outbound_time
          obj['status'] = item.status
          obj['sys_order_id'] = skuItem.sys_order_id
          obj['sku_id'] = skuItem.sku_id
          obj['goods_name'] = skuItem.goods_name
          obj['goods_count'] = skuItem.goods_count
          obj['goods_price'] = skuItem.goods_price
          obj['goods_describe'] = skuItem.goods_describe
          obj['goods_img'] = skuItem.goods_img
          obj['goods_url'] = skuItem.goods_url
          data.push(obj)
        })
      })
      let str = `<tr>
          <td>站点</td>
          <td>订单编号</td>
          <td>平台物流单号</td>
          <td>所属仓库</td>
          <td>出库单创建时间</td>
          <td>订单出库时间</td>
          <td>状态</td>
          <td>系统商品编号</td>
          <td>商品编号</td>
          <td>商品名称</td>
          <td>出库数量</td>
          <td>商品单价(RMB)</td>
          <td>商品规格</td>
          <td>商品图片</td>
          <td>商品链接</td>
        </td>`
      data.forEach(item => {
        str += `<tr>
        <td>${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
        <td>${item.home_order_sn ? item.home_order_sn : '' + '\t'}</td>
        <td>${item.platform_tracking_number ? item.platform_tracking_number : '' + '\t'}</td>
        <td>${item.warehouse_name ? item.warehouse_name : '' + '\t'}</td>
        <td>${item.created_at ? item.created_at : '' + '\t'}</td>
        <td>${item.outbound_time ? item.outbound_time : '' + '\t'}</td>
        <td>${this.statusObj[item.status] ? this.statusObj[item.status] : '' + '\t'}</td>
        <td>${item.sys_order_id ? item.sys_order_id : '' + '\t'}</td>
        <td>${item.sku_id ? item.sku_id : '' + '\t'}</td>
        <td>${item.goods_name ? item.goods_name : '' + '\t'}</td>
        <td>${item.goods_count ? item.goods_count : '' + '\t'}</td>
         <td>${item.goods_price ? item.goods_price : '' + '\t'}</td>
        <td>${item.goods_describe ? item.goods_describe : '' + '\t'}</td>
        <td>${item.goods_img ? item.goods_img : '' + '\t'}</td>
        <td>${item.goods_url ? item.goods_url : '' + '\t'}</td>
        </tr>`
      })
      this.isShowLoading = false
      exportExcelDataCommon('国内仓出库订单数据', str)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getHomeOutStockOrder()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getHomeOutStockOrder()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/chinese-deliver-order.less';
</style>

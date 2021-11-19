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
              :value="item.id"
              :label="item.warehouse_name"
            />
          </el-select>
        </li>
        <li class="status">
          <span>商品状态：</span>
          <el-select
            v-model="form.status"
            size="mini"
            filterable
          >
            <el-option :value="''" label="全部" />
            <el-option
              v-for="(item, index) in statusList"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </li>
        <li>
          <span>订单编号：</span>
          <el-input
            v-model="form.oversea_order_sn"
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
              stockSharedList()"
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
          label="仓库名称"
          align="center"
          min-width="100"
          fixed
        />
        <el-table-column
          prop="oversea_order_sn"
          label="系统商品编号"
          min-width="135"
          align="center"
          fixed
        />
        <el-table-column
          prop="logistic_no"
          label="商品编号(SkuId)"
          align="center"
          min-width="130"
        />
        <el-table-column
          prop="created_at"
          label="商品名称"
          align="center"
          min-width="140"
        />
        <el-table-column
          prop="deliver_time"
          label="商品规格"
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
          prop="deliver_time"
          label="共享库存"
          align="center"
          min-width="140"
        />
        <el-table-column
          prop="deliver_time"
          label="可使用库存"
          align="center"
          min-width="140"
        />
        <el-table-column
          prop="deliver_time"
          label="商品单价(RMB)"
          align="center"
          min-width="140"
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
          label="绑定用户"
          align="center"
          min-width="125"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              @click="getSharedUserList"
            >查看绑定用户</el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品链接"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.sku_url"
              type="primary"
              size="mini"
              @click="openUrl(row.sku_url)"
            >查看商品链接</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="175"
          fixed="right"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              @click="bindUserVisible=true"
            >绑定用户</el-button>
            <el-button
              size="mini"
              type="primary"
            >撤 销</el-button>
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
    <!-- 共享库存绑定用户弹窗 -->
    <el-dialog
      class="shared-user-dialog"
      title="共享库存绑定用户"
      :visible.sync="sharedUserVisible"
      width="400px"
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
        />
        <el-table-column
          prop="order_sn"
          width="150"
          align="center"
          label="平台名称"
        />
        <el-table-column
          width="150"
          align="center"
          label="用户名称"
          prop="sys_sku_id"
        />
        <el-table-column
          width="150"
          align="center"
          label="操作"
          prop="sku_id"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.sku_url"
              type="primary"
              size="mini"
            >删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加共享库存绑定用户弹窗 -->
    <el-dialog
      class="bind-user-dialog"
      title="添加共享库存绑定用户"
      :visible.sync="bindUserVisible"
      width="300px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <ul>
        <li style="margin-bottom: 15px;">
          <span>共享平台：</span>
          <el-select
            size="mini"
            filterable
          >
            <el-option
              v-for="(item,index) in 3"
              :key="index"
            />
          </el-select>
        </li>
        <li style="margin-bottom: 15px;">
          <span>用户名称：</span>
          <el-input
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <el-button
            type="primary"
            size="mini"
          >添 加</el-button>
        </li>
      </ul>
    </el-dialog>
  </el-row>
</template>

<script>
import ShareBroadStock from '../../../module-api/smart-house-api/share-broad-stock'
import { exportExcelDataCommon } from '../../../util/util'
import { statusList } from './warehouse'
export default {
  data() {
    return {
      showConsole: true,
      isShowLoading: false,
      sharedUserVisible: false,
      bindUserVisible: false,
      ShareBroadStock: new ShareBroadStock(this),

      total: 0,
      pageSize: 30,
      page: 1,

      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据

      form: { // 条件搜索
        app_uid: '', // 用户ID
        wid: '', // 仓库ID
        sys_sku_id: '', // sku
        status: '' // 1正常 2已完成 3弃用
      },

      statusList: [
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '已完成'
        },
        {
          value: 3,
          label: '弃用'
        }
      ]
    }
  },
  async mounted() {
    // 获取数据
    await this.stockSharedList()
  },
  methods: {
    // 查看绑定用户
    getSharedUserList() {

    },
    // 导出数据
    async exportTableData() {
      if (this.total === 0) return this.$message('暂无导出数据')
      this.isShowLoading = true
      const exportData = []
      let resData = []
      const params = this.form
      params.pageSize = this.pageSize
      params.page = 1
      while (resData.length < this.total) {
        const res = await this.ShareBroadStock.stockSharedList(params)
        if (res.code === 200) {
          resData = resData.concat(res.data.data)
          params.page++
        } else {
          this.$refs.Logs.writeLog('导出数据错误', res.data)
          this.isShowLoading = false
          break
        }
      }
      resData.forEach(item => {
        item.sku_list.forEach(skuItem => {
          const obj = {}
          obj['country'] = item.country
          obj['oversea_order_sn'] = item.oversea_order_sn
          obj['logistic_no'] = item.logistic_no
          obj['created_at'] = item.created_at
          obj['deliver_time'] = item.deliver_time
          obj['status'] = item.status
          obj['sys_sku_id'] = skuItem.sys_sku_id
          obj['sku_id'] = skuItem.sku_id
          obj['goods_name'] = skuItem.goods_name
          obj['sku_num'] = skuItem.sku_num
          obj['sku_id'] = skuItem.sku_id
          obj['goods_name'] = skuItem.goods_name
          obj['sku_price'] = skuItem.sku_price
          obj['sku_name'] = skuItem.sku_name
          obj['sku_image'] = skuItem.sku_image
          obj['sku_url'] = skuItem.sku_url
          exportData.push(obj)
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
      exportData.forEach(item => {
        str += `<tr>
        <td>${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
        <td>${item.oversea_order_sn ? item.oversea_order_sn : '' + '\t'}</td>
        <td>${item.logistic_no ? item.logistic_no : '' + '\t'}</td>
        <td>${'' + '\t'}</td>
        <td>${item.created_at ? item.created_at : '' + '\t'}</td>
        <td>${item.deliver_time ? item.deliver_time : '' + '\t'}</td>
        <td>${this.statusObj[item.status] ? this.statusObj[item.status] : '' + '\t'}</td>
        <td>${item.sys_sku_id ? item.sys_sku_id : '' + '\t'}</td>
        <td>${item.sku_id ? item.sku_id : '' + '\t'}</td>
        <td>${item.goods_name ? item.goods_name : '' + '\t'}</td>
        <td>${item.sku_num ? item.sku_num : '' + '\t'}</td>
         <td>${item.sku_price ? item.sku_price : '' + '\t'}</td>
        <td>${item.sku_name ? item.sku_name : '' + '\t'}</td>
        <td>${item.sku_image ? item.sku_image : '' + '\t'}</td>
        <td>${item.goods_url ? item.goods_url : '' + '\t'}</td>
        </tr>`
      })
      this.isShowLoading = false
      exportExcelDataCommon('海外仓出库订单数据', str)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.stockSharedList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.stockSharedList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/share-broad-stock.less';
</style>

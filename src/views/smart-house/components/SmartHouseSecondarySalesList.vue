<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>二次销售状态：</span>
          <el-select v-model="form.returnStatus" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="-1" />
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>二次销售类型：</span>
          <el-select v-model="form.returnType" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="-1" />
            <el-option v-for="(item, index) in returnType" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>包裹创建时间：</span>
          <el-date-picker
            v-model="form.returnCreateTime"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
      </ul>
      <ul style="margin-bottom: 10px">
        <li style="margin-left: 35px;">
          <span>商品ID：</span>
          <el-input v-model="form.returnGoodsId" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li style="margin-left: 38px;">
          <span>SkuID：</span>
          <el-input v-model="form.returnSkuId" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li style="margin-left: 25px;">
          <span>主订单号：</span>
          <el-input v-model="form.returnMainOrderNum" style="width:228px!important" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
      </ul>
      <ul style="align-items: center;">
        <li>
          <span>平台物流单号：</span>
          <el-input v-model="form.returnLogisticsDocNum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getSencondSales">搜索</el-button>
          <el-button type="primary" size="mini" :loading="Loading2" @click="DerivedData">导出数据</el-button>
        </li>
        <li>
          <span style="color: red;width:444px">温馨提示：此模块展示数据为海外仓退回仓库的包裹数据，若需将此模块包裹数据进行二次销售，请前往【订单管理】使用二次销售功能进行匹配（不支持拆包出库）</span>
        </li>
      </ul>
      <ul>
        <!-- <span style="color: red; margin-top: 15px">温馨提示：此模块展示数据为海外仓退回仓库的包裹数据，若需将此模块包裹数据进行二次销售，请前往【订单管理】使用二次销售功能进行匹配（不支持拆包出库）</span> -->
      </ul>
      <el-row id="article">
        <el-table
          ref="plTable"
          v-loading="Loading3"
          header-align="center"
          height="calc(100vh - 283px)"
          :data="tableData"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" min-width="50px" />
          <el-table-column align="center" label="站点" min-width="70px" prop="country" fixed>
            <template slot-scope="{row}"><span>{{ row.country | chineseSite }}</span></template>
          </el-table-column>
          <el-table-column align="center" prop="receive_warehouse_name" label="包裹所在仓库" min-width="150px" fixed />
          <el-table-column align="center" prop="platform_tracking_number" label="平台物流单号" min-width="150px" />
          <el-table-column prop="order_sn" label="订单编号" min-width="150px" align="center" />
          <el-table-column prop="type" label="二次销售类型" min-width="120px" align="center">
            <template slot-scope="{row}"><span>{{ returnType[row.type].label }}</span></template>
          </el-table-column>
          <el-table-column prop="status" label="二次销售状态" min-width="120px" align="center">
            <template slot-scope="{row}"><span>{{ returnStatusList[row.status].label }}</span></template>
          </el-table-column>
          <el-table-column prop="goods_id" label="商品ID" min-width="120px" align="center">
            <template slot-scope="{ row }">
              <span>
                <el-button type="text" @click.native="open(row)">
                  {{ row.goods_id }}
                </el-button>
              </span></template>
          </el-table-column>
          <el-table-column prop="goods_img" label="商品图片" min-width="100px" align="center">
            <template slot-scope="scope">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px; display: inline-block">
                <div slot="content">
                  <el-image :src="[scope.row.country, scope.row.platform_mall_id, scope.row.goods_img] | imageRender" style="width: 400px; height: 400px" />
                </div>
                <el-image :src="[scope.row.country, scope.row.platform_mall_id, scope.row.goods_img] | imageRender" style="width: 56px; height: 56px" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="goods_count" label="商品数量" min-width="120px" align="center" />
          <el-table-column prop="goods_price" label="商品价格" min-width="120px" align="center">
            <template slot-scope="{row}"><span>{{ row.goods_price }}{{ row.country | siteCoin }}</span></template>
          </el-table-column>
          <el-table-column prop="variation_name" label="商品规格" min-width="180px" align="center" />
          <el-table-column prop="variation_id" label="商品货号（skuid）" min-width="140px" align="center" />
          <el-table-column prop="goods_name" label="商品名称" min-width="150px" align="center">
            <template slot-scope="{row}">
              <el-tooltip v-if="row.goods_name" effect="dark" placement="top-start">
                <div slot="content" style="width:200px;height:auto">{{ row.goods_name }}</div>
                <el-button type="text" class="bindmallclass">{{ row.goods_name }}</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="return_create_time" label="包裹创建时间" min-width="150px" align="center" />
          <el-table-column prop="expired_at" label="过期时间" min-width="180px" align="center" />
          <el-table-column prop="ext.free_storage_days" label="免租天数" min-width="100px" align="center" />
          <el-table-column prop="resale_order_sn" label="二次销售订单号" min-width="150px" align="center" fixed="right" />
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
            :page-sizes="[20, 50, 100, 200]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-row>
    </el-row>
  </el-row>
</template>
<script>
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      Loading1: false,
      Loading2: false,
      Loading3: false,
      currentPage: 1,
      tableData: [],
      total: 0,
      pageSize: 50,
      page: 1,
      form: {
        returnStatus: -1, // 二次销售状态
        returnCreateTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 包裹创建时间
        returnType: -1, // 二次销售类型
        returnGoodsId: '', // 商品ID
        returnSkuId: '', // SkuID
        returnMainOrderNum: '', // 主订单号
        returnLogisticsDocNum: '' // 平台物流单号
      },
      returnStatusList: [
        { value: 0, label: '已收货或上架' },
        { value: 1, label: '已匹配订单' },
        { value: 2, label: '已下架' }
      ],
      returnType: [
        { value: 0, label: '未知' },
        { value: 1, label: '跨境' },
        { value: 2, label: '本土预售' },
        { value: 3, label: '本土拍单' },
        { value: 4, label: '采购物流单号' },
        { value: 5, label: '备货暂存' }
      ]
    }
  },
  mounted() {
    this.getSencondSales()
  },
  methods: {
    // 打开网页
    open(row) {
      const url = this.$filters.countryShopeebuyCom(row.country)
      // window.BaseUtilBridgeService.openUrl('https://th.xiapibuy.com/product/' + row.platform_mall_id + '/' + row.goods_id)
      window.BaseUtilBridgeService.openUrl(`${url}/product/${row.platform_mall_id}/${row.goods_id}`)
    },
    // 搜索功能
    async getSencondSales() {
      this.Loading1 = true
      this.Loading3 = true
      const returnCreateTime = this.form.returnCreateTime ? `${this.$dayjs(this.form.returnCreateTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.returnCreateTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const parmas = {
        status: Number(this.form.returnStatus),
        createTime: returnCreateTime,
        type: Number(this.form.returnType),
        goodsId: this.form.returnGoodsId,
        variationId: this.form.returnSkuId,
        orderSn: this.form.returnMainOrderNum,
        platformTrackingNumber: this.form.returnLogisticsDocNum,
        page: this.page,
        pageSize: this.pageSize
      }
      console.log('parmas', parmas)
      try {
        const { data } = await this.$api.getsecondlist(parmas)
        if (data.code === 200) {
          this.tableData = data.data.data
          // console.log(this.tableData[0].ext)
          // this.tableData[0].ext = JSON.parse(this.tableData[0].ext)
          // console.log(this.tableData[0].ext.free_storage_days)
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].ext && this.tableData[i].ext !== undefined) {
              this.tableData[i].ext = JSON.parse(this.tableData[i].ext)
            }
          }
          console.log(this.tableData)
          this.total = data.data.total
        } else {
          this.$message.error('数据获取失败', data.message)
        }
      } catch (error) {
        console.log(error)
      }
      this.Loading1 = false
      this.Loading3 = false
    },
    // 导出数据
    async DerivedData() {
      this.Loading2 = true
      if (this.tableData.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">站点</td>
        <td style="width: 200px; text-align:left;">包裹所在仓库</td>
        <td style="width: 200px; text-align:left;">平台物流单号</td>
        <td style="width: 200px; text-align:left;">订单编号</td>
        <td style="width: 200px; text-align:left;">二次销售类型</td>
        <td style="width: 200px; text-align:left;">二次销售状态</td>
        <td style="width: 200px; text-align:left;">商品ID</td>
        <td style="width: 200px; text-align:left;">商品图片</td>
        <td style="width: 200px; text-align:left;">商品数量</td>
        <td style="width: 200px; text-align:left;">商品价格</td>
        <td style="width: 200px; text-align:left;">商品规格</td>
        <td style="width: 200px; text-align:left;">商品货号（skuid）</td>
        <td style="width: 200px; text-align:left;">商品名称</td>
        <td style="width: 200px; text-align:left;">包裹创建时间</td>
        <td style="width: 200px; text-align:left;">过期时间</td>
        <td style="width: 200px; text-align:left;">免租天数</td>
        <td style="width: 200px; text-align:left;">二次销售订单号</td>
      </tr>`
        this.tableData.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.id || ''}</td>
          <td style="text-align:left;">${this.$filters.chineseSite(item.country) || ''}</td>
          <td style="text-align:left;mso-number-format:'\@';">${item.platform_tracking_number || ''}</td>
          <td style="text-align:left;">${item.order_sn || ''}</td>1
          <td style="text-align:left;">${this.returnType[item.type].label || ''}</td>
          <td style="text-align:left;">${this.returnStatusList[item.status].label || ''}</td>
          <td style="text-align:left;">${item.goods_id || ''}</td>
          <td style="text-align:left;">${item.goods_img ? this.$filters.imageRender([item.country, item.platform_mall_id, item.goods_img]) : '' + '\t'}</td>
          <td style="text-align:left;">${item.goods_count || ''}</td>
          <td style="text-align:left;">${item.goods_price || ''}</td>
          <td style="text-align:left;">${item.variation_name || ''}</td>
          <td style="text-align:left;">${item.variation_id || ''}</td>
          <td style="text-align:left;">${item.goods_name || ''}</td>
          <td style="text-align:left;">${item.return_create_time || ''}</td>
          <td style="text-align:left;">${item.expired_at || ''}</td>
          <td style="text-align:left;">${item.ext.free_storage_days === null ? '' : item.ext.free_storage_days}</td>
          <td style="text-align:left;">${item.resale_order_sn || ''}</td>
      
        </tr>
        `
        })
        exportExcelDataCommon('二次销售信息', msg)
        this.Loading2 = false
      } else {
        this.Loading2 = false
        return this.$notify({
          title: '订单信息',
          type: 'warning',
          message: `没有可以导出的订单`
        })
      }
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getSencondSales()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getSencondSales()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../module-less/smart-house-less/return-secondsale.less';
.bindmallclass{
   width: 200px;
      // height: 50px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
}
</style>

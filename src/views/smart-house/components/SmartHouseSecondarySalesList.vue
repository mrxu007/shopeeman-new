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
          <span>商品ID：</span>
          <el-input v-model="form.returnGoodsId" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
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
        <li>
          <span>二次销售类型：</span>
          <el-select v-model="form.returnType" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="-1" />
            <el-option v-for="(item, index) in returnType" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>

        <li style="margin-left:3px">
          <span>SkuID：</span>
          <el-input v-model="form.returnSkuId" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <span>平台物流单号：</span>
          <el-input v-model="form.returnLogisticsDocNum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <span>主订单号：</span>
          <el-input v-model="form.returnMainOrderNum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getSencondSales">搜索</el-button>
          <el-button type="primary" size="mini" :loading="Loading2" @click="DerivedData">导出数据</el-button>
        </li>
      </ul>
      <ul>
        <span style="color: red; margin-top: 10px">温馨提示：此模块展示数据为海外仓退回仓库的包裹数据，若需将此模块包裹数据进行二次销售，请前往【订单管理】使用二次销售功能进行匹配（不支持拆包出库）</span>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="Loading3"
        header-align="center"
        height="calc(100vh - 230px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" min-width="50px" />
        <el-table-column align="center" label="序号" type="index" min-width="50px" fixed />
        <el-table-column align="center" label="站点" min-width="70px" prop="country" fixed>
          <template slot-scope="{row}"><span>{{ row.country | chineseSite }}</span></template>
        </el-table-column>
        <el-table-column align="center" prop="receive_warehouse_name" label="包裹所在仓库" min-width="150px" fixed />
        <el-table-column align="center" prop="platform_tracking_number" label="平台物流单号" min-width="150px" show-overflow-tooltip />
        <el-table-column prop="order_sn" label="订单编号" min-width="180px" align="center">
          <template slot-scope="{ row }">
            <span>
              <span
                v-if="row.order_sn"
                class="copyIcon"
                @click="copy(row.order_sn)"
              ><i class="el-icon-document-copy" />
                {{ row.order_sn }}
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="二次销售类型" min-width="120px" align="center">
          <template slot-scope="{row}"><span>{{ returnType[row.type].label }}</span></template>
        </el-table-column>
        <el-table-column prop="status" label="二次销售状态" min-width="120px" align="center">
          <template slot-scope="{row}"><span>{{ returnStatusList[row.status].label }}</span></template>
        </el-table-column>
        <el-table-column prop="goods_id" label="商品ID" min-width="120px" align="center">
          <template slot-scope="{ row }">
            <span>
              <span
                v-if="row.goods_id"
                class="copyIcon"
                @click="copy(row.productId)"
              ><i class="el-icon-document-copy" /></span>
              <el-button type="text" @click.native="open(row)">
                {{ row.goods_id }}
              </el-button>
            </span>
          </template>
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
        <el-table-column label="商品规格" min-width="180px" align="center" show-overflow-tooltip>
          <template v-slot="{row}">
            {{ row.variation_sku?row.variation_sku:row.variation_name }}
          </template>
        </el-table-column>
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
        <el-table-column prop="resale_order_sn" label="二次销售订单号" min-width="150px" align="center" />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="page"
          :page-size="pageSize"
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
          :page-sizes="[50,100, 200]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
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
      const returnCreateTime = this.form.returnCreateTime ? `${this.$dayjs(this.form.returnCreateTime[0]).format('YYYY-MM-DD 00:00:00')}/${this.$dayjs(this.form.returnCreateTime[1]).format('YYYY-MM-DD 23:23:23')}` : ''
      const parmas = {
        orderSn: this.form.returnMainOrderNum,
        platformTrackingNumber: this.form.returnLogisticsDocNum,
        createTime: returnCreateTime,
        goodsId: this.form.returnGoodsId,
        variationId: this.form.returnSkuId,
        type: this.form.returnType,
        status: this.form.returnStatus,
        page: this.page,
        pageSize: this.pageSize
      }
      console.log('parmas', parmas)
      try {
        const { data } = await this.$api.getsecondStroelist(parmas)
        if (data.code === 200) {
          this.tableData = data.data.data
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].ext && this.tableData[i].ext !== undefined) {
              this.tableData[i].ext = JSON.parse(this.tableData[i].ext)
            }
          }
          this.total = data.data.total
        } else {
          this.$message.error('数据获取失败', data.message)
        }
      } catch (error) {
        console.log(`${error}`)
      }
      this.Loading1 = false
      this.Loading3 = false
    },
    // 导出数据
    async DerivedData() {
      if (this.total === 0) return this.$message('暂无导出数据')
      this.Loading2 = true
      let resData = []
      const returnCreateTime = this.form.returnCreateTime ? `${this.$dayjs(this.form.returnCreateTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.returnCreateTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const parmas = {
        orderSn: this.form.returnMainOrderNum,
        platformTrackingNumber: this.form.returnLogisticsDocNum,
        createTime: returnCreateTime,
        goodsId: this.form.returnGoodsId,
        variationId: this.form.returnSkuId,
        type: this.form.returnType,
        status: this.form.returnStatus
      }
      parmas.pageSize = 200
      parmas.page = 1
      while (resData.length < this.total) {
        try {
          const { data } = await this.$api.getsecondStroelist(parmas)
          if (data.code === 200) {
            resData = resData.concat(data.data.data)
            parmas.page++
          } else {
            this.$message.error('导出数据错误', data.message)
            this.Loading2 = false
            break
          }
        } catch (error) {
          this.$message.error(`导出数据错误`)
          this.Loading2 = false
          break
        }
      }
      let msg = `<tr>
        <td>站点</td>
        <td>发货仓库</td>
        <td>收货仓库</td>
        <td>平台物流单号</td>
        <td>订单编号</td>
        <td>二次销售类型</td>
        <td>二次销售状态</td>
        <td>商品ID</td>
        <td>商品链接</td>
        <td>商品数量</td>
        <td>商品价格</td>
        <td>价格币种</td>
        <td>商品规格</td>
        <td>商品货号（skuId）</td>
        <td>商品名称</td>
        <td>二次销售订单号</td>
        <td>包裹创建时间</td>
      </tr>`
      resData.forEach((item) => {
        console.log(item)
        msg += `
        <tr>
          <td>${this.$filters.chineseSite(item.country) || ''}</td>
          <td>${item.warehouse_name || ''}</td>
          <td>${item.receive_warehouse_name || ''}</td>
          <td style="text-align:left;mso-number-format:'\@';">${item.platform_tracking_number || ''}</td>
          <td>${item.order_sn || ''}</td>
          <td>${this.returnType[item.type].label || ''}</td>
          <td>${this.returnStatusList[item.status].label || ''}</td>
          <td>${item.goods_id || ''}</td>
          <td>${this.$filters.countryShopeebuyCom(item.country)}/product/${item.platform_mall_id}/${item.goods_id || ''}</td>
          <td>${item.goods_count || ''}</td>
          <td>${item.goods_price || ''}</td>
          <td>${this.$filters.siteCoin(item.country) || ''}</td>
          <td>${item.variation_sku ? item.variation_sku : item.variation_name || ''}</td>
          <td>${item.variation_id || ''}</td>
          <td>${item.goods_name || ''}</td>
          <td>${item.resale_order_sn || ''}</td>
          <td>${item.return_create_time || ''}</td>
        </tr>
        `
      })
      exportExcelDataCommon('二次销售列表数据', msg)
      this.Loading2 = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.page = 1
      this.getSencondSales()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getSencondSales()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 点击复制
    copy(attr) {
      const target = document.createElement('div')
      target.id = 'tempTarget'
      target.style.opacity = '0'
      target.innerText = attr
      document.body.appendChild(target)
      try {
        const range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        this.$message.success('复制成功')
      } catch (e) {
        // console.log('复制失败')
      }
      target.parentElement.removeChild(target)
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

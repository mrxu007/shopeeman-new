<!--
 * @Author: your name
 * @Date: 2021-11-16 20:01:09
 * @LastEditTime: 2021-12-16 14:26:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\SelfGoodsStore.vue
-->
<template>
  <div class="product-store">
    <div class="btn-header">
      <div class="item-box mar-right">
        <span>创建时间：</span>
        <el-date-picker
          v-model="searchTime"
          size="mini"
          value-format="yyyy-MM-dd"
          type="daterange"
          style="width: 230px"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </div>
      <div class="item-box">
        <span>商品名称:</span>
        <el-input v-model="goodsName" size="mini" clearable class="inputBox" />
      </div>
      <div class="item-box">
        <span>商品ID:</span>
        <el-input v-model="goodsCode" size="mini" clearable class="inputBox" />
      </div>
      <div class="item-box">
        <span>SKUID:</span>
        <el-input v-model="skuCode" size="mini" clearable class="inputBox" />
      </div>
      <el-button type="primary" size="mini" style="margin-left:10px;" @click="searchTableList">搜 索</el-button>
    </div>
    <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" tooltip-effect="dark" height="500" :default-sort="{prop: 'sku_name',order: 'descending'}">>
      <el-table-column align="center" type="index" label="序号" width="50">
        <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" type="index" label="站点" width="80">
        <template slot-scope="scope">
          <span>产品中心</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="商品ID" prop="product_id" align="center" />
      <el-table-column width="130px" label="SKUID" prop="sku_id" align="center" />
      <el-table-column width="80px" label="商品名称" prop="goods_name" align="center" show-overflow-tooltip />
      <el-table-column width="100px" label="商品规格" prop="sku_name" align="center" sortable />
      <el-table-column width="80px" label="库存数量" prop="stock_num" align="center" />
      <el-table-column width="120px" label="商品单价(RMB)" prop="sku_price" align="center" />
      <el-table-column min-width="80" label="商品链接" prop="goods_url" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.goods_url">
            <el-button type="primary" size="mini">查看商品</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" width="80">
        <template v-if="scope.row.sku_image" slot-scope="scope">
          <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 32px; height: 32px; display: inline-block">
            <div slot="content">
              <el-image :src="scope.row.sku_image" style="width: 400px; height: 400px" />
            </div>
            <el-image :src="scope.row.sku_image" style="width: 32px; height: 32px" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="60px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" class="mar-right" @click="addTo(scope.row)">添加到出库单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { creatDate } from '../../../../util/util'
export default {
  name: 'ProductGoodsStore',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      searchTime: [],
      goodsName: '', // 商品名称
      goodsCode: '',
      skuCode: '',
      tableLoading: false
    }
  },
  mounted() {
    this.searchTime = creatDate(30)
    this.searchTableList()
  },
  methods: {
    // 添加到出库单
    async addTo(row) {
      this.$emit('getChooseData', row)
    },
    // 列表
    async searchTableList() {
      this.tableData = []
      // 获取产品中心列表数据
      const params = {
        ProductName: this.goodsName,
        ProductId: this.goodsCode,
        SkuId: this.skuCode,
        CateId: 0,
        Status: '-1'
      }
      params['page'] = this.currentPage
      params['pageSize'] = this.pageSize
      this.tableLoading = true
      const res = await this.$commodityService.getProductList(params)
      const resObj = res && JSON.parse(res)
      console.log(resObj, '4')
      if (resObj.status_code === 200) {
        this.total = resObj.data.total
        const arr = resObj.data.data
        arr.forEach(async item => {
          await this.getProductSkuList(item)
        })
      }
      this.tableLoading = false
      console.log(this.tableData)
    },
    // SKU详情
    async getProductSkuList(row) {
      const res = await this.$commodityService.getProductSkuList(row.product_id)
      const resObj = res && JSON.parse(res)
      console.log('skuDetailsData', resObj)
      if (resObj.status_code === 200) {
        const skuDetailsData = resObj.data
        skuDetailsData.forEach(item => {
          item.goods_name = row.product_name
          item.stock_num = item.stock
          item.sku_price = item.price
          item.sku_image = item.image_url
          item.id = item.Id
          this.tableData.push(item)
          console.log(this.tableData)
        })
      }
    },
    // 计算总库存
    totalStock(data) {
      let stock = 0
      for (let i = 0; i < data.length; i++) {
        stock += data[i].stock_num
      }
      return stock
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.searchTableList()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.searchTableList()
    }
  }
}
</script>

<style lang="less" scoped>
.product-store {
    /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.mar-right {
  margin-right: 10px;
}
.inputBox{
  width:150px;
}
.btn-header {
  display: flex;
  margin-top:10px;
  .item-box {
    display: flex;
    align-items: center;
    span {
      width: 80px;
      display: inline-block;
      text-align: right;
    }
  }
}
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: 35px;
  }
</style>


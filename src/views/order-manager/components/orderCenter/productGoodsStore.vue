<!--
 * @Author: your name
 * @Date: 2021-11-16 20:01:09
 * @LastEditTime: 2021-11-23 21:41:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\SelfGoodsStore.vue
-->
<template>
  <div class="self-store">
    <div class="btn-header">
      <div class="item-box mar-right">
        <span>创建时间：</span>
        <el-date-picker
          v-model="searchTime"
          size="mini"
          value-format="yyyy-MM-dd"
          type="daterange"
          style="width: 200px"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </div>
      <div class="item-box">
        <span style="width: 80px">商品名称:</span>
        <el-input v-model="goodsName" size="mini" clearable class="inputBox" />
      </div>
       <div class="item-box">
        <span style="width: 80px">商品编码:</span>
        <el-input v-model="goodsCode" size="mini" clearable class="inputBox" />
      </div>
       <div class="item-box">
        <span style="width: 80px">SKU编码:</span>
        <el-input v-model="skuCode" size="mini" clearable class="inputBox" />
      </div>
      <el-button type="primary" size="mini" style="margin-left:10px;" >搜 索</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" max-height="500">
      <el-table-column align="center" type="index" label="序号" width="50">
        <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" type="index" label="仓库名称" width="80">
        <template slot-scope="scope">
          <span>产品中心</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="系统商品ID" prop="id" align="center" />
      <el-table-column width="130px" label="商品ID" prop="sku_id" align="center" />
      <el-table-column width="80px" label="商品名称" prop="goods_name" align="center" show-overflow-tooltip />
      <el-table-column width="80px" label="商品规格" prop="sku_name" align="center" />
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
        <template slot-scope="scope">
          <el-image :src="scope.row.sku_image" style="width: 60px; height: 60px" />
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
        },
      },
      tableData:[],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      searchTime:[],
      goodsName:'',//商品名称
      goodsCode:'',
      skuCode:''
    }
  },
  mounted() {
    this.searchTime = creatDate(30)
    this.searchTableList()
  },
  methods: {
      //添加到出库单
    async addTo(row){
        this.$emit('getChooseData',row)
    },
    // 列表
    async searchTableList() {
      // 获取产品中心列表数据
      let params = {
        ProductName : this.goodsName,
        ProductId : this.goodsCode,
        SkuId : this.skuCode,
        CateId: 0,
        Status: '-1'
      }
      params['page'] = this.currentPage
      params['pageSize'] = this.pageSize
      const res = await this.$commodityService.getProductList(params)
      let resObj = res&&JSON.parse(res)
      console.log(resObj,"4")
     if(resObj.status_code === 200){
       this.total = resObj.data.total
       let arr = resObj.data.data
       arr.forEach(async item=>{
         await this.getProductSkuList(item)
       })
     }
      // params.createTime = this.$dayjs(this.searchTime[0]).format('YYYY-MM-DD') + ' 00:00:00' + '/' + this.$dayjs(this.searchTime[1]).format('YYYY-MM-DD') + ' 23:59:59'
      // params['page'] = this.currentPage
      // params['pageSize'] = this.pageSize
      // const res = await this.$api.getUserStore(params)
      // if (res && res.data.code === 200) {
      //   this.total = res.data.data.total
      //   let array = res.data.data.data
      //   array.forEach((item) => {
      //     item.user_stocks_skus.forEach((subItem) => {
      //       let obj = {
      //         goods_id: item.id,
      //         goods_name: item.goods_name,
      //         goods_url:item.goods_url
      //       }
      //       obj = Object.assign(obj, subItem)
      //       this.tableData.push(obj)
      //     })
      //   })
      //   // this.tableData = res.data.data.data
      // } else {
      //   this.$message.error(res.data.message)
      // }
      console.log(this.tableData)
    },
    // SKU详情
    async getProductSkuList(row) {
      const res = await this.$commodityService.getProductSkuList(row.product_id)
      let resObj = res&&JSON.parse(res)
      console.log('skuDetailsData', resObj)
      if(resObj.status_code === 200){
        let skuDetailsData = resObj.data
        skuDetailsData.forEach(item=>{
          item.goods_name = row.product_name
          item.stock_num = item.stock
          item.sku_price = item.price
          item.goods_url = item.image_url
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
    },
  },
}
</script>

<style lang="less" scoped>
.self-store {
    /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.mar-right {
  margin-right: 10px;
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


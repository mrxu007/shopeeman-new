<!--
 * @Author: your name
 * @Date: 2021-11-16 20:01:09
 * @LastEditTime: 2021-11-24 11:54:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\SelfGoodsStore.vue
-->
<template>
  <div class="inland-store">
    <div class="btn-header">
      <div class="item-box mar-right">
        <span>仓库名称：</span>
        <el-select v-model="wid" size="mini" filterable>
          <el-option v-for="(item, index) in widList" :key="index" :label="item.warehouse_name" :value="item.wid" />
        </el-select>
      </div>
      <div class="item-box">
        <span style="width: 80px">商品编号:</span>
        <el-input v-model="sku_id" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
      </div>
      <el-button type="primary" size="mini" style="margin-left: 10px" @click="searchTableList">搜 索</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" max-height="500">
      <el-table-column align="center" type="index" label="序号" width="50">
        <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" type="index" label="仓库名称" width="80">
        <template slot-scope="scope">
          <span>国内仓库</span>
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
export default {
  name: 'InLandGoodsStore',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      wid: '', //仓库名
      widList: [],
      sku_id: '',
    }
  },
  async mounted() {
    await this.getWareHouseList()
    await this.searchTableList()
  },
  methods: {
    async getWareHouseList() {
      let appinfo = await this.$appConfig.getUserInfo()
      let res = await this.$api.getWarehouseList()
      if(res.data.code === 200){
        let arr = res.data.data || []
        console.log(arr,"arr")
        this.widList = arr.filter(item=>{
          return item.status!==2 && item.user_ids && item.user_ids.indexOf(appinfo.muid)
        })
        this.wid = this.widList[0].wid || ''
      }
    },
    //添加到出库单
    async addTo(row) {
      this.$emit('getChooseData', row)
    },
    // 列表
    async searchTableList() {
      // 获取列表数据
      let params = {
        wid: this.wid,
        sku_id: this.sku_id
      }
      params['page'] = this.currentPage
      params['page_size'] = this.pageSize
      console.log("params",params)
      const res = await this.$XzyNetMessageService.post('xzy.shopifyV2.get_stock', params)
      let resObj = res && JSON.parse(res)
      let data = resObj && JSON.parse(resObj.data)
      console.log(data, '4')
      if (data && data.code === 200) {
        this.total = 0
        // let arr = resObj.data.data
        // arr.forEach(async (item) => {
        //   await this.getProductSkuList(item)
        // })
      }
      console.log(this.tableData)
    },
    // SKU详情
    async getProductSkuList(row) {
      const res = await this.$commodityService.getProductSkuList(row.product_id)
      let resObj = res && JSON.parse(res)
      console.log('skuDetailsData', resObj)
      if (resObj.status_code === 200) {
        let skuDetailsData = resObj.data
        skuDetailsData.forEach((item) => {
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
.inland-store {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.mar-right {
  margin-right: 10px;
}
.btn-header {
  display: flex;
  margin-top: 10px;
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


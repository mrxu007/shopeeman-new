<!--
 * @Author: your name
 * @Date: 2021-11-16 20:01:09
 * @LastEditTime: 2021-12-04 18:10:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\SelfGoodsStore.vue
-->
<template>
  <div class="abroad-store">
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的海外仓库存列表" name="myStore"> </el-tab-pane>
        <el-tab-pane label="共享我的海外仓库存" name="shareStore" v-if="addGiftAbroad!=='gift'"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn-header">
      <div class="item-box mar-right">
        <span>仓库名称：</span>
        <el-select v-model="wid" size="mini" filterable @change="searchTableList">
          <el-option label="全部" value="0" />
          <el-option v-for="(item, index) in widList" :key="index" :label="item.warehouse_name" :value="item.id" />
        </el-select>
      </div>
      <div class="item-box">
        <span style="width: 90px">系统商品编号:</span>
        <el-input v-model="sys_sku_id" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" class="inputWidth" />
      </div>
      <div class="item-box" v-if="activeName==='myStore'">
        <span style="width: 80px">商品编号:</span>
        <el-input v-model="sku_id" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" class="inputWidth" />
      </div>
      <div class="item-box" v-if="activeName==='myStore'">
        <span style="width: 80px">商品规格:</span>
        <el-input v-model="sku_name" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" class="inputWidth" />
      </div>
      <el-button type="primary" size="mini" style="margin-left: 10px" @click="searchTableList">搜 索</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="500" v-loading="tableLoading">
      <el-table-column align="center" type="index" label="序号" width="50">
        <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" type="index" label="仓库名称" width="80">
        <template slot-scope="scope">
          <span>国内仓库</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="系统商品ID" prop="sys_sku_id" align="center" />
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
  name: 'AbroadGoodsStore',
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
      wid: '0', //仓库名
      widList: [],
      sku_id: '',
      sys_sku_id: '',
      sku_name: '',
      activeName: 'myStore',
      tableLoading: false,
    }
  },
  props:{
    addGiftAbroad:{
      type:String,
      default:''
    }
  },
  async mounted() {
    this.tableData = []
    await this.getWareHouseList()
    await this.searchTableList()
  },
  methods: {
    //切换tab
    handleClick() {
      this.currentPage = 1
      this.wid = '0'
      this.sku_id = ''
      this.sys_sku_id = ''
      this.sku_name = ''
      this.total = 0 
      this.tableData = []
      this.searchTableList()
    },
    async getWareHouseList() {
      let myMap = new Map()
      let res = await this.$api.getOverseasWarehouse()
      if (res.data.code === 200) {
        let arr = res.data.data || []
        arr.forEach((item) => {
          this.widList = this.widList.concat(item.child)
        })
      } else {
        this.$message.error(res.data)
      }
      this.widList = this.widList.filter((item) => !myMap.has(item.id) && myMap.set(item.id, 1))
      console.log(this.widList)
    },
    //添加到出库单
    async addTo(row) {
      this.$emit('getChooseData', row)
    },
    //获取共享海外仓
    async getAbroadShareList() {
      this.tableData = []
      let params = {
        wid: this.wid,
        sys_sku_id: this.sys_sku_id,
      }
      params['page'] = this.currentPage
      params['page_num'] = this.pageSize
      this.tableLoading = true
      let res = await this.$XzyNetMessageService.post('xzy.getSharedIndex', params) //item.shared_id = item.id
      let resObj = res && JSON.parse(res)
      let data = resObj && JSON.parse(resObj.data)
      let arrList = []
      if(data.code === 200){
         this.total = data.data.total
         let arr = data.data.data
         arr.forEach(item=>{
           let obj = item.stock
           item = obj
           item.shared_id = item.id
           this.tableData.push(item)
        })  
      }
      this.tableLoading = false
    },
    //获取海外仓
    async getAbroadList() {
      let params = {
        wid: this.wid,
        sku_id: this.sku_id,
        sys_sku_id: this.sys_sku_id,
        sku_name: this.sku_name,
      }
      params['page'] = this.currentPage
      params['page_num'] = this.pageSize
      console.log(params)
      this.tableLoading = true
      let res = await this.$XzyNetMessageService.post('xzy.stock.index', params)
      let resObj = res && JSON.parse(res)
      let data = resObj && JSON.parse(resObj.data)
      if(data.code===200){
        this.total = data.data.total
        let arr = data.data.data
        arr.forEach(item=>{
          item.stock_num = item.stock_num
        })
        this.tableData = arr
      }
      this.tableLoading = false
    },
    // 列表
    async searchTableList() {
      this.tableData = []
      if (this.activeName === 'myStore') {
        this.getAbroadList()
      } else {
        this.getAbroadShareList()
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
.abroad-store {
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
  .inputWidth {
    width: 180px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  height: 35px;
}
</style>


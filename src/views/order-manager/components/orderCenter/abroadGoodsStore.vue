<!--
 * @Author: your name
 * @Date: 2021-11-16 20:01:09
 * @LastEditTime: 2022-01-21 15:11:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\SelfGoodsStore.vue
-->
<template>
  <div class="abroad-store">
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的海外仓库存列表" name="myStore" />
        <el-tab-pane v-if="addGiftAbroad!=='gift'" label="共享我的海外仓库存" name="shareStore" />
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
        <el-input v-model="sys_sku_id" clearable size="mini" oninput="value=value.replace(/\s/g,'')" class="inputWidth" />
      </div>
      <div v-if="activeName==='myStore'" class="item-box">
        <span style="width: 60px">商品编号:</span>
        <el-input v-model="sku_id" clearable size="mini" oninput="value=value.replace(/\s/g,'')" class="inputWidth" />
      </div>
      <div v-if="activeName==='myStore'" class="item-box">
        <span style="width: 60px">商品规格:</span>
        <el-input v-model="sku_name" clearable size="mini" oninput="value=value.replace(/\s/g,'')" class="inputWidth" />
      </div>
      <div v-if="activeName==='myStore'" class="item-box">
        <el-checkbox v-model="isFilter">过滤0库存</el-checkbox>
      </div>
      <el-button type="primary" size="mini" style="margin-left: 10px" @click="searchTableList">搜 索</el-button>
    </div>
    <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" tooltip-effect="dark" height="500" :default-sort="{prop: 'sku_name',order: 'descending'}">
      <el-table-column align="center" type="index" label="序号" width="50">
        <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" type="index" label="仓库名称" width="80">
        <template slot-scope="scope">
          <span>{{ changeName(scope.row.wid) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="系统商品编号" prop="sys_sku_id" align="center" />
      <el-table-column width="130px" label="SKUID" prop="sku_id" align="center" />
      <el-table-column width="80px" label="商品名称" prop="goods_name" align="center" show-overflow-tooltip />
      <el-table-column width="100px" sortable label="商品规格" prop="sku_name" align="center" />
      <el-table-column width="80px" label="库存数量" prop="shared_num" align="center" />
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
export default {
  name: 'AbroadGoodsStore',
  props: {
    addGiftAbroad: {
      type: String,
      default: ''
    }
  },
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
      wid: '0', // 仓库名
      widList: [],
      sku_id: '',
      sys_sku_id: '',
      sku_name: '',
      activeName: 'myStore',
      tableLoading: false,
      isFilter: true
    }
  },
  async mounted() {
    this.tableData = []
    await this.getWareHouseList()
    await this.searchTableList()
  },
  methods: {
    changeName(wid) {
      const res = this.widList.find(n => n.id === Number(wid))
      return res ? res.warehouse_name : ''
    },
    // 切换tab
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
      const myMap = new Map()
      const res = await this.$api.getOverseasWarehouse()
      if (res.data.code === 200) {
        const arr = res.data.data || []
        arr.forEach((item) => {
          this.widList = this.widList.concat(item.child)
        })
      } else {
        this.$message.error(res.data)
      }
      this.widList = this.widList.filter((item) => !myMap.has(item.id) && myMap.set(item.id, 1))
      console.log('widList', this.widList)
    },
    // 添加到出库单
    async addTo(row) {
      this.$emit('getChooseData', row)
    },
    // 获取共享海外仓
    async getAbroadShareList() {
      this.tableData = []
      const params = {
        wid: this.wid,
        sys_sku_id: this.sys_sku_id
      }
      params['page'] = this.currentPage
      params['page_num'] = this.pageSize
      this.tableLoading = true
      const res = await this.$XzyNetMessageService.post('xzy.getSharedIndex', params) // item.shared_id = item.id
      const resObj = res && JSON.parse(res)
      const data = resObj && JSON.parse(resObj.data)
      console.log('getSharedIndex', data)
      const arrList = []
      if (data.code === 200) {
        this.total = data.data.total
        const arr = data.data.data
        arr.forEach(item => {
          console.log(item)
          const id = item.id
          const obj = item.stock
          item = { ...obj,
            shared_id: id,
            sku_price: (item?.stock?.sku_price) / 100
          }
          this.tableData.push(item)
        })
      }
      this.tableLoading = false
    },
    // 获取海外仓
    async getAbroadList() {
      const params = {
        wid: this.wid,
        sku_id: this.sku_id,
        sys_sku_id: this.sys_sku_id,
        sku_name: this.sku_name
      }
      params['page'] = this.currentPage
      params['page_num'] = this.pageSize
      if (this.wid == '0') {
        params['type'] = 'query'
      }
      console.log(params)
      this.tableLoading = true
      const res = await this.$XzyNetMessageService.post('xzy.stock.index', params)
      const resObj = res && JSON.parse(res)
      const data = resObj && JSON.parse(resObj.data)
      if (data.code === 200) {
        this.total = data.data.total
        const arr = data.data.data
        arr.forEach(item => {
          item.shared_num = item.stock_num
          item.sku_price = item.sku_price / 100
        })
        this.tableData = arr
        if (this.isFilter) {
          this.tableData = arr.filter(n => n.stock_num > 0)
        }
      }
      console.log('xzy.stock.index', this.tableData)
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
    }
  }
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
      text-align: left;
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


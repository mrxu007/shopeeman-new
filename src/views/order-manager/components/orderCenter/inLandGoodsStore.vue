<!--
 * @Author: your name
 * @Date: 2021-11-16 20:01:09
 * @LastEditTime: 2021-12-16 21:28:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\SelfGoodsStore.vue
-->
<template>
  <div class="inland-store">
    <div class="btn-header">
      <div class="item-box mar-right">
        <span>仓库名称：</span>
        <el-select v-model="wid" size="mini" filterable @change="searchTableList">
          <el-option v-for="(item, index) in widList" :key="index" :label="item.warehouse_name" :value="item.wid" />
        </el-select>
      </div>
      <div class="item-box">
        <span style="width: 80px">商品编号:</span>
        <el-input v-model="sku_id" clearable size="mini" oninput="value=value.replace(/\s/g,'')" />
      </div>
      <el-button type="primary" size="mini" style="margin-left: 10px" @click="searchTableList">搜 索</el-button>
    </div>
    <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" tooltip-effect="dark" height="500" :default-sort="{prop: 'sku_name',order: 'descending'}">>
      <el-table-column align="center" type="index" label="序号" width="50">
        <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" type="index" label="仓库名称" width="80">
        <template slot-scope="scope">
          <span>{{ changeName(scope.row.wid) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="系统商品ID" prop="id" align="center" />
      <el-table-column width="130px" label="商品ID" prop="sku_id" align="center" />
      <el-table-column width="80px" label="商品名称" prop="goods_name" align="center" show-overflow-tooltip />
      <el-table-column width="100px" label="商品规格" prop="sku_name" sortable align="center" />
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
export default {
  name: 'InLandGoodsStore',
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
      wid: '', // 仓库名
      widList: [],
      sku_id: '',
      tableLoading: false
    }
  },
  async mounted() {
    await this.getWareHouseList()
    await this.searchTableList()
  },
  methods: {
    changeName(wid) {
      const res = this.widList.find(n => n.wid == wid)
      return res ? res.warehouse_name : ''
    },
    async getWareHouseList() {
      const appinfo = await this.$appConfig.getUserInfo()
      const res = await this.$api.getWarehouseList()
      if (res.data.code === 200) {
        const arr = res.data.data || []
        const arrFilter = arr.filter(item => {
          return item.status != 2 || (item.user_ids && item.user_ids.indexOf(appinfo.muid) > -1)
        })
        // if(!arrFilter)
        this.widList = arrFilter.length ? arrFilter : arr
        this.wid = this.widList[0].wid || ''
      }
    },
    // 添加到出库单
    async addTo(row) {
      this.$emit('getChooseData', row)
    },
    // 列表
    async searchTableList() {
      // 获取列表数据
      const params = {
        wid: this.wid,
        sku_id: this.sku_id
      }
      params['page'] = this.currentPage
      params['page_size'] = this.pageSize
      this.tableLoading = true
      const res = await this.$XzyNetMessageService.post('xzy.shopifyV2.get_stock', params)
      const resObj = res && JSON.parse(res)
      const data = resObj && JSON.parse(resObj.data)
      console.log(resObj, 'resObj')
      if (data && data.code === 200) {
        this.total = data.data.total
        const arr = data.data.data
        arr.forEach(async(item) => {
          item.stock_num = item.stock - item.frozen_num
        })
        this.tableData = arr
      }
      this.tableLoading = false
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


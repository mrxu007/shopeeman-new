<!--
 * @Author: your name
 * @Date: 2021-11-16 20:01:09
 * @LastEditTime: 2021-12-15 18:10:39
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
          style="width: 240px"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </div>
      <div class="item-box">
        <span style="width: 60px">站点：</span>
        <el-select v-model="countryVal" size="mini" filterable @change="searchTableList">
          <el-option label="全部" :value="''" />
          <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <el-button type="primary" size="mini" @click="searchTableList" style="margin-left: 10px">搜 索</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" max-height="500" v-loading="tableLoading">
      <el-table-column align="center" type="index" label="序号" width="50">
        <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" type="index" label="站点" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.country | chineseSite}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="商品ID" prop="goods_id_id" align="center" />
      <el-table-column width="120px" label="SKUID" prop="sku_id" align="center" />
      <el-table-column width="80px" label="商品名称" prop="goods_name" align="center" show-overflow-tooltip />
      <el-table-column width="80px" label="商品规格" prop="sku_name" align="center" />
      <el-table-column width="80px" label="库存数量" prop="stock_num" align="center" />
      <el-table-column width="120px" label="商品单价(RMB)" prop="sku_price" align="center" />
      <el-table-column min-width="80" label="商品链接" prop="goods_url" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.goods_url">
            <el-button type="primary" size="mini" @click="$BaseUtilService.openUrl(scope.row.goods_url)">查看商品</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" width="80">
        <template slot-scope="scope" v-if="scope.row.sku_image">
           <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 32px; height: 32px; display: inline-block">
              <div slot="content">
                <el-image :src="scope.row.sku_image" style="width: 400px; height: 400px" ></el-image>
              </div>
              <el-image :src="scope.row.sku_image" style="width: 32px; height: 32px" ></el-image>
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
  name: 'SelfGoodsStore',
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
      countries: this.$filters.countries_option,
      countryVal: '',
      searchTime: [],
      tableLoading:false
    }
  },
  mounted() {
    // this.searchTime = creatDate(30)
    this.searchTableList()
  },
  methods: {
    //添加到出库单
    async addTo(row) {
      this.$emit('getChooseData', row)
    },
    // 列表
    async searchTableList() {
      this.tableData = []
      const params = {
        country: this.countryVal,
        createTime: '',
      }
      if (this.searchTime.length){
        params['createTime'] = this.$dayjs(this.searchTime[0]).format('YYYY-MM-DD') + ' 00:00:00' + '/' + this.$dayjs(this.searchTime[1]).format('YYYY-MM-DD') + ' 23:59:59'
      }else {
        params['createTime'] = ''
      }
      params['page'] = this.currentPage
      params['pageSize'] = this.pageSize
      this.tableLoading = true
      const res = await this.$api.getUserStore(params)
      if (res && res.data.code === 200) {
        this.total = res.data.data.total
        let array = res.data.data.data
        array.forEach((item) => {
          item.user_stocks_skus.forEach((subItem) => {
            let obj = {
              goods_id: item.id,
              goods_name: item.goods_name,
              goods_url: item.goods_url,
              country:item.country,
              goods_id_id: item.goods_id
            }
            obj = Object.assign(obj, subItem)
            this.tableData.push(obj)
          })
        })
        // this.tableData = res.data.data.data
      } else {
        this.$message.error(res.data.message)
      }
      this.tableLoading = false
      console.log(this.tableData)
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


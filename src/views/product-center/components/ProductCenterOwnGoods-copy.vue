
<template>
  <div class="product-center">
    <div class="selectBox">
      <div class="select-row">
        <div class="item-box">
          <span>商品创建时间:</span>
          <el-date-picker v-model="form.returnCreateTime" unlink-panels size="mini" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 220px" />
        </div>
        <div class="item-box">
          <product-choose ref="isClean" @CateId="CateId" class="mar-left" />
        </div>
      </div>
      <div class="select-row">
        <div class="item-box">
          <span>商品更新时间:</span>
          <el-date-picker v-model="form.returnUpdateTime" unlink-panels size="mini" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 220px" />
        </div>
        <div class="item-box">
          <span style="width: 60px; margin-left: 10px">Sku编码：</span>
          <el-input v-model="form.returnSkuId" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 178px" />
        </div>
        <div class="item-box">
          <span style="width: 60px">商品名称：</span>
          <el-input v-model="form.returnGoodsName" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 178px" />
        </div>
        <div class="item-box">
          <span style="width: 60px">商品ID：</span>
          <el-input v-model="form.returnGoodsId" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 178px" />
        </div>
        <el-button type="primary" size="mini" @click="getProductList" class="mar-left">查询</el-button>
        <el-button type="primary" size="mini" @click="DerivedData">导出数据</el-button>
        <el-button type="primary" size="mini" @click="Creategoods">创建商品</el-button>
        <el-upload
          ref="importRef"
          style="margin: 0 10px"
          accept=".xls, .xlsx"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="importTemplate"
          :show-file-list="false"
          :auto-upload="false"
        >
          <el-button :data="importTemplateData" size="mini" type="primary"> 导入商品 </el-button>
        </el-upload>
        <el-button type="primary" size="mini" @click="downloadTemplate">下载导入模板</el-button>
        <el-checkbox v-model="showlog" style="margin-left: 10px">隐藏日志</el-checkbox>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="plTable"
        v-loading="tableLoading"
        header-align="center"
        height="calc(100vh - 183px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" label="商品ID" width="100" prop="product_id" fixed />
        <el-table-column align="center" prop="product_name" label="商品名称" width="100" />
        <el-table-column v-if="false" align="center" prop="weight" label="商品重量" width="100" />
        <el-table-column v-if="false" align="center" prop="volume" label="体积" width="100" />
        <el-table-column v-if="false" align="center" prop="uid" label="uid" width="100" />
        <el-table-column v-if="false" align="center" prop="cate_id" label="商品类目id" width="150" />
        <el-table-column align="center" prop="cate_name" label="商品类目" width="150" />
        <el-table-column width="90" align="center" label="商品主图">
          <template slot-scope="{ row }">
            <el-tooltip v-if="row.image_url" effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 90px; height: 50px">
              <div slot="content">
                <img :src="row.image_url" width="400px" height="280px" />
              </div>
              <el-image style="width: 40px; height: 40px" :src="row.image_url" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="商品状态" width="160" align="center" />
        <el-table-column prop="price" label="价格" width="120" align="center" />
        <el-table-column prop="stock" label="库存" width="140" align="center" />
        <el-table-column prop="remark" label="备注" width="140" align="center" />
        <el-table-column prop="created_at" label="创建时间" width="90" align="center" />
        <el-table-column prop="updated_at" label="更新时间" width="90" align="center" />
        <el-table-column label="操作"  align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="Eidtgoods(row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <div class="pagination">
        <el-pagination
          background
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <Logs ref="Logs" v-model="showlog" clear />
  </div>
</template>

<script>
import ProductChoose from '../../../components/product-choose-product-center.vue'
export default {
  components: {
    ProductChoose,
  },
  data() {
    return {
      form: {
        returnCreateTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 商品创建时间
        returnCategory: '', // 商品类目
        returnStatus: -1, // 商品状态,
        returnUpdateTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 商品更新时间
        returnSkuId: '', // sku编码
        returnGoodsName: '', // 商品名称
        returnGoodsId: '', // 商品ID
      },
      showlog: true,
      tableLoading: false,
      multipleSelection: [],
      tableData: [],
      pageSize: 20, // 分页
      currentPage: 1, // 分页
      total: 0, // 分页
    }
  },
  methods: {
    // 获取产品中心列表数据
    async getProductList() {
      const returnCreateStartTime = this.form.returnCreateTime ? `${this.$dayjs(this.form.returnCreateTime[0]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const returnCreateEndTime = this.form.returnCreateTime ? `${this.$dayjs(this.form.returnCreateTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const returnUpdateStartTime = this.form.returnUpdateTime ? `${this.$dayjs(this.form.returnUpdateTime[0]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const returnUpdateEndTime = this.form.returnUpdateTime ? `${this.$dayjs(this.form.returnUpdateTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const parmas = { // 产品中心条件搜索
        CateId: Number(this.form.returnCategory), // 类目ID
        ProductName: this.form.returnGoodsName, // 商品名称
        ProductId: this.form.returnGoodsId, // 商品编码
        SkuId: this.form.returnSkuId, // SKU编码
        Status: this.form.returnStatus, // 商品状态
        StartTime: returnCreateStartTime, // 商品创建时间
        EndTime: returnCreateEndTime, // 商品创建结束时间
        UpdateStartTime: returnUpdateStartTime, // 商品更新开始时间
        UpdateEndTime: returnUpdateEndTime // 商品更新结束时间
      }
      parmas['page'] = this.currentPage
      params['page_size'] = this.pageSize
      // parmas.CateId = Number(this.form.returnCategory)
      // parmas.ProductName = this.form.returnGoodsName
      // parmas.ProductId = this.form.returnGoodsId
      // parmas.SkuId = this.form.returnSkuId
      // parmas.Status = this.form.returnStatus
      const res = await this.StrockUpForegin.getProductList(parmas)
      console.log("res",res)
      if (res.code !== 200) {
        this.$message.error(res.data)
      }
      this.total = res.data.total
      this.tableData = res.data.data
      console.log('tableData', this.tableData)
    },
    CateId(val) {
      console.log(val, 'val')
      this.form.returnCategory = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
     handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(size) {
      this.currentPage = 1
      this.pageSize = size
    },
  },
}
</script>

<style lang="less" scoped>
.product-center {
  margin: 10px;
  overflow: hidden;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.mar-left {
  margin-left: 10px;
}
.selectBox {
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: auto;
  .select-row {
    display: flex;
    margin: 5px 0;
  }
}
.item-box {
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 80px;
    text-align: right;
  }
}
.content {
  padding:0 16px;
  background: #fff;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 133px);
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: 35px;
  }
}
</style>
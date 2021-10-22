<!--
 * @Author: your name
 * @Date: 2021-10-21 09:38:11
 * @LastEditTime: 2021-10-22 11:29:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\product-put-on\components\ProductPutOnCategoryblack.vue
-->
<template>
  <div class="category-black">
    <!-- btn区 -->
    <div class="tool-bar">
      <div class="tool-row">
        <div class="tool-item mar-right">
          <span>类目来源：</span>
          <el-select v-model="categorySource" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in categorySourceList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <category-choose :isAll="true" :level="2" @setCategory="setCategory"></category-choose>
      </div>
      <div class="tool-row">
        <div class="tool-item mar-right">
          <el-input v-model="categoryKeyWord" placeholder="按关键词搜索查询" size="mini"></el-input>
        </div>
        <el-button type="primary" size="mini" @click="searchTableList" class="tool-item mar-right">查 询</el-button>
        <el-button type="primary" size="mini" @click="addBlackVisible = true" class="tool-item mar-right">添 加</el-button>
        <el-button type="primary" size="mini" @click="batchDelete" class="tool-item">批量删除</el-button>
      </div>
    </div>
    <!-- 表格区 -->
    <div class="content">
      <el-table v-loading="tableLoading" ref="multipleTable" :data="tableData" tooltip-effect="dark" max-height="680" @selection-change="selectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
                <el-table-column width="120px" label="站点" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="项目来源" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="一级类目" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="二级类目" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="末级类目" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="创建时间" prop="created_at" align="center" >
            <template slot-scope="scope">{{ $dayjs(scope.row.created_at).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="操作结果" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="操作" prop="warehouse_name" align="center" />
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
    <el-dialog title="添加黑名单" :visible.sync="addBlackVisible" width="500px">
      <div class="addBlack-dialog">
        <category-choose :level="2" :isCategoryAll="false" @setCategory="setAddCategory" :isColumn="true"></category-choose>
        <div class="addBlack-item bottom-item">
          <el-button type="primary" size="mini" @click="addCategoryBlack">确 定</el-button>
          <el-button type="primary" size="mini" @click="addBlackVisible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CategoryChoose from '../../../components/category-choose.vue'
export default {
  components: {
    CategoryChoose,
  },
  data() {
    return {
      countryVal: '',
      countries: [
        { label: '马来站', value: 'MY' },
        { label: '台湾站', value: 'TW' },
        { label: '新加坡站', value: 'SG' },
        { label: '菲律宾站', value: 'PH' },
        { label: '泰国站', value: 'TH' },
        { label: '越南站', value: 'VN' },
        { label: '印尼站', value: 'ID' },
        { label: '巴西站', value: 'BR' },
      ],
      categorySource: '0',
      categorySourceList: [
        {
          value: '0',
          label: '全部',
        },
        {
          value: '-1',
          label: '公有',
        },
        {
          value: '1',
          label: '私有',
        },
      ],
      categoryKeyWord: '',
      multipleSelection: [],
      pageSize: 20, //页码
      currentPage: 1, //页码
      total: 0, //表格总数
      addBlackVisible: false, //添加弹窗
      tableLoading: false,
      selectCategory: {
        country: '',
        categoryFirst: '',
        categorySecond: '',
        categoryThird: '',
        categoryList: [],
      },
      tableData: [],
      tableLoading: false,
      addSelectCategory: {
        country: '',
        categoryFirst: '',
        categorySecond: '',
        categoryThird: '',
        categoryList: [],
      },
    }
  },
  mounted() {},
  methods: {
    setAddCategory(val) {
      this.addSelectCategory = val
      console.log('setAddCategory', val)
    },
    async setCategory(val) {
      this.selectCategory = val
      console.log('setCategory', val)
    },
    //查询
    async searchTableList() {
      let params = {
        type: this.categorySource,
        country: this.selectCategory.country,
        page: this.currentPage,
        perpage: this.pageSize,
        parentCategoryTree: this.selectCategory.categoryList,
      }
      if (params.country == '') {
        delete params.country
      }
      this.tableLoading = true
      let res = await this.$commodityService.getBlackCategory(params)
      if (!res) {
        return this.$message.warning('添加失败')
      }
      let resObj = JSON.parse(res)
      if (resObj && resObj.code === 200) {
        this.total = resObj.data.total
        this.tableData = resObj.data.data
      } else {
        this.$message.warning(resObj.msg)
      }
      console.log(resObj)

      this.tableLoading = false
    },
    //添加黑名单
    async addCategoryBlack() {
      let params = [this.addSelectCategory.categoryList[this.addSelectCategory.categoryList.length - 1], this.addSelectCategory.country, this.addSelectCategory.categoryList]
      console.log(this.addSelectCategory, params)
      let res = await this.$commodityService.addBlackCategory(params)
      if (!res) {
          return this.$message.warning('添加失败')
      }
      let resObj = JSON.parse(res)
        if(resObj.code===200){
            this.$message.success('添加成功')
            this.addBlackVisible = false
            await this.searchTableList()
        }else{
            this.$message.error(resObj.msg)
        }
      console.log(res, 'addBlackCategory')
    },
    //批量删除
    async batchDelete() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请勾选要删除的数据！')
      }
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let id = this.multipleSelection[i].id
        let res = await this.$commodityService.deleteBlackCategory(id)
        if (!res) {
          return this.$message.warning('删除失败')
        }
        let resObj = JSON.parse(res)
        if(resObj.code===200){
            this.$message.success('删除成功')
        }else{
            this.$message.error(resObj.msg)
        }
        console.log(res,resObj)
      }
      this.searchTableList()
    },
    //   表格选择
    selectionChange(val) {
      this.multipleSelection = val
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
.category-black {
  min-width: 1280px;
  margin: 10px;
}
.mar-right {
  margin-right: 10px;
}
.tool-bar {
  height: 100px;
  background: #fff;
  .tool-row {
    padding: 16px 16px 0 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .tool-item {
      display: flex;
      align-items: center;
    }
  }
}
.content {
  margin: 20px 0;
  background: #fff;
  height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: 35px;
  }
}
.addBlack-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .addBlack-item {
    display: flex;
    margin-bottom: 10px;
    span {
      display: inline-block;
      width: 80px;
    }
  }
  .bottom-item {
    margin-top: 50px;
  }
}
</style>
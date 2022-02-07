<!--
 * @Author: your name
 * @Date: 2021-10-21 09:38:11
 * @LastEditTime: 2021-11-03 16:55:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\product-put-on\components\ProductPutOnCategoryblack.vue
-->
<template>
  <div class="category-black">
    <!-- btn区 -->
    <div class="tool-bar">
      <div class="tool-row">
        <!-- <category-choose :is-all="true" :level="3" @setCategory="setCategory" /> -->
        <category-choose :is-all="true" :level="2" @setCategory="setCategory" />
        <div class="tool-item mar-right">
          <span>类目来源：</span>
          <el-select v-model="categorySource" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in categorySourceList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="tool-item mar-right" style="margin-left: 0px;">
          <span style="white-space: nowrap">关键词：</span>
          <el-input v-model="categoryKeyWord" placeholder="按关键词搜索查询" size="mini" clearable />
        </div>
      </div>
      <div class="tool-row">
        <el-button type="primary" size="mini" class="tool-item " @click="searchTableList">查 询</el-button>
        <el-button type="primary" size="mini" class="tool-item " @click="addBlackVisible = true,addkey++">添 加</el-button>
        <el-button type="primary" size="mini" class="tool-item" @click="batchDelete">批量删除</el-button>
      </div>
    </div>
    <!-- 表格区 -->
    <div class="content">
      <el-table
        ref="multipleTable"
        v-loading="tableLoading"
        :data="tableData"
        tooltip-effect="dark"
        height="calc(100vh - 205px)"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column width="80px" label="站点" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="项目来源" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.uid === 0 ? '公有' : '私有' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" label="一级类目" prop="warehouse_name" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.parent_category_list && scope.row.parent_category_list.length ? (scope.row.parent_category_list[0] ? scope.row.parent_category_list[0].category_name+'('+scope.row.parent_category_list[0].category_cn_name+')' : '') : '' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" label="二级类目" prop="warehouse_name" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.parent_category_list && scope.row.parent_category_list.length ? (scope.row.parent_category_list[1] ? scope.row.parent_category_list[1].category_name+'('+scope.row.parent_category_list[1].category_cn_name+')' : '') : '' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" label="末级类目" prop="warehouse_name" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.parent_category_list && scope.row.parent_category_list.length ? (scope.row.parent_category_list[2] ? scope.row.parent_category_list[2].category_name+'('+scope.row.parent_category_list[2].category_cn_name+')' : '') : '' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="60px" label="创建时间" align="center">
          <template slot-scope="scope">{{ $dayjs(scope.row.created_at).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <!-- <el-table-column min-width="60px" label="操作结果" prop="warehouse_name" align="center" /> -->
        <el-table-column min-width="60px" label="操作" prop="warehouse_name" align="center">
          <template slot-scope="{row}">
            <div>
              <el-button v-if="row.uid!==0" size="mini" type="primary" @click="delInfo(row.id)">删除</el-button>
            </div>
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
    <el-dialog title="添加黑名单" :visible.sync="addBlackVisible" width="500px">
      <div class="addBlack-dialog">
        <!-- <category-choose :level="2" :is-category-all="false" :is-column="true" @setCategory="setAddCategory" /> -->
        <category-choose :key="addkey" :level="3" :is-category-all="false" :is-column="true" @setCategory="setAddCategory" />
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
    CategoryChoose
  },
  data() {
    return {
      addkey: '0',
      countryVal: '',
      countries: this.$filters.countries_option,
      categorySource: '0',
      categorySourceList: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '-1',
          label: '公有'
        },
        {
          value: '1',
          label: '私有'
        }
      ],
      categoryKeyWord: '',
      multipleSelection: [],
      pageSize: 20, // 页码
      currentPage: 1, // 页码
      total: 0, // 表格总数
      addBlackVisible: false, // 添加弹窗
      tableLoading: false,
      selectCategory: {
        country: '',
        categoryFirst: '',
        categorySecond: '',
        categoryThird: '',
        categoryList: []
      },
      tableData: [],
      addSelectCategory: {
        country: '',
        categoryFirst: '',
        categorySecond: '',
        categoryThird: '',
        categoryList: []
      }
    }
  },
  mounted() {
    this.searchTableList()
  },
  methods: {
    setAddCategory(val) {
      this.addSelectCategory = val
      console.log('setAddCategory', val)
    },
    async setCategory(val) {
      this.selectCategory = val
      console.log('setCategory', val)
    },
    // 查询
    async searchTableList() {
      const params = {
        type: this.categorySource,
        country: this.selectCategory.country,
        page: this.currentPage,
        perpage: this.pageSize,
        parentCategoryTree: this.selectCategory.categoryList
      }
      if (params.country === '') {
        delete params.country
      }
      this.tableLoading = true
      const res = await this.$commodityService.getBlackCategory(params)
      if (!res) {
        return this.$message.warning('添加失败')
      }
      this.tableData = []
      const resObj = JSON.parse(res)
      if (resObj && resObj.code === 200) {
        this.total = resObj.data.total
        this.tableData = resObj.data.data
      } else {
        this.$message.warning(resObj.msg)
      }
      this.tableLoading = false
    },
    // 添加黑名单
    async addCategoryBlack() {
      const params = [this.addSelectCategory.categoryList[this.addSelectCategory.categoryList.length - 1], this.addSelectCategory.country, this.addSelectCategory.categoryList]
      console.log(this.addSelectCategory, params)
      const res = await this.$commodityService.addBlackCategory(params)
      if (!res) {
        return this.$message.warning('添加失败')
      }
      const resObj = JSON.parse(res)
      if (resObj && resObj.code === 200) {
        this.$message.success('添加成功')
        this.addBlackVisible = false
        await this.searchTableList()
      } else {
        this.$message.error(resObj.msg)
      }
      console.log(res, 'addBlackCategory')
    },
    // 删除
    async delInfo(val) {
      const id = val
      const res = await this.$commodityService.deleteBlackCategory(id)
      if (!res) {
        return this.$message.warning('删除失败')
      }
      const resObj = JSON.parse(res)
      if (resObj && resObj.code === 200) {
        this.$message.success('删除成功')
      } else {
        this.$message.error(resObj.msg)
      }
      console.log(res, resObj)
      this.searchTableList()
    },
    // 批量删除
    async batchDelete() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请勾选要删除的数据！')
      }
      for (let i = 0; i < this.multipleSelection.length; i++) {
        const id = this.multipleSelection[i].id
        const res = await this.$commodityService.deleteBlackCategory(id)
        if (!res) {
          return this.$message.warning('删除失败')
        }
        const resObj = JSON.parse(res)
        if (resObj && resObj.code === 200) {
          this.$message.success('删除成功')
        } else {
          this.$message.error(resObj.msg)
        }
        console.log(res, resObj)
      }
      this.searchTableList()
    },
    // 转换类型中文
    changeTypeName(value, baseData) {
      let str = ''
      const data = baseData.find((item) => item.value == value)
      str = data ? data.label : ''
      return str
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
    }
  }
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
      span{
        display: inline-block;
        // width: 80px;
      }
    }
  }
}
.content {
  margin: 20px 0;
  background: #fff;
  // height: calc(100vh - 150px);
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
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

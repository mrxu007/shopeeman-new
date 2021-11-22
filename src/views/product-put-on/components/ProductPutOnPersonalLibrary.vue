<template>
  <div class="personal-container">
    <header>
      <div class="header-left">
        <p class="text">基础操作</p>
        <el-button type="primary" size="mini">批量添加尺寸图</el-button>
        <el-button type="primary" size="mini">批量删除尺寸图</el-button>
        <el-button type="primary" size="mini">一键上新</el-button>
        <el-button type="primary" size="mini">批量映射虾皮类目</el-button>
        <el-button type="primary" size="mini">标记优选商品</el-button>
        <el-button type="primary" size="mini">取消标记优选商品</el-button>
        <el-button type="primary" size="mini">标记商品标签</el-button>
        <el-button type="primary" size="mini">取消商品标签</el-button>
        <el-button type="primary" size="mini">翻译后的数据导出</el-button>
        <el-button type="primary" size="mini">批量设置重量/体积</el-button>
        <el-button type="primary" size="mini">取消收藏</el-button>
      </div>
      <div class="header-right">
        <p class="text">列表筛选</p>
        <ul class="search-list">
          <li>
            <p>采购来源：</p>
            <el-select v-model="buysource" placeholder="" size="mini">
              <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item">全部</el-option>
            </el-select>
          </li>
          <li>
            <p>筛选时间：</p>
            <el-select v-model="time" placeholder="" size="mini">
              <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item">全部</el-option>
            </el-select>
            <el-date-picker v-model="value2" size="mini" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
          </li>
          <li>
            <p>优选商品：</p>
            <el-select v-model="isHighGoods" placeholder="" size="mini">
              <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item">全部</el-option>
            </el-select>
          </li>
          <li>
            <p>编辑状态：</p>
            <el-select v-model="isEdit" placeholder="" size="mini">
              <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item">全部</el-option>
            </el-select>
          </li>
          <li>
            <p>语种：</p>
            <el-select v-model="language" placeholder="" size="mini">
              <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item">全部</el-option>
            </el-select>
          </li>
          <li>
            <p>价格区间：</p>
            <el-input v-model="price" size="mini" placeholder="" />
            <span class="slot">-</span>
            <el-input size="mini" placeholder="" />
          </li>
          <li>
            <p>商品ID：</p>
            <el-input size="mini" placeholder="" />
          </li>
          <li>
            <p>商品标签：</p>
            <el-select v-model="goods_tag" placeholder="" size="mini">
              <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item">全部</el-option>
            </el-select>
          </li>
          <li>
            <el-button type="primary" size="mini">刷新</el-button>
            <el-button type="primary" size="mini">搜索</el-button>
          </li>
        </ul>
      </div>
    </header>
    <article>
      <p class="tip">尊敬的用户：您好，为提高私有选品库模块的性能，系统只能保存近30天的非精选商品数据，为保证部分精选商品不被清理，请将需要保留的商品标记为精选商品</p>
      <u-table
        ref="plTable"
        v-loading="buttonStatus.getList"
        :max-height="Height"
        use-virtual
        :data-changes-scroll-top="false"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        row-key="id"
        :big-data-checkbox="true"
        :border="false"
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" />
        <u-table-column align="center" type="index" label="序号" />
        <u-table-column align="center" label="标签" />
        <u-table-column align="center" label="采购来源" prop="GoodsId" />
        <u-table-column align="center" label="优选商品" prop="Title" />
        <u-table-column align="center" label="商品Id">
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.goods_id }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="标题" prop="Price" width="300px" fit>
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.title }}</p>
          </template>
        </u-table-column>

        <u-table-column align="center" label="主图" prop="Sales">
          <template v-slot="{ row }">
            <div style="justify-content: center; display: flex">
              <img :src="row.image" style="width: 56px; height: 56px" />
            </div>
          </template>
        </u-table-column>
        <u-table-column align="center" label="价格" prop="price" />
        <u-table-column align="center" label="库存" prop="stock" />
        <u-table-column align="center" label="销量" prop="sales" />
        <u-table-column align="center" label="重量(kg)">
          <template v-slot="{ row }">
            <el-input v-model="row.weight" size="mini" />
          </template>
        </u-table-column>
        <u-table-column align="center" label="体积" width="130">
          <template v-slot="{ row }">
            <ul>
              <li style="display: flex">
                <p>长（cm）</p>
                <el-input v-model="row.long" size="mini" />
              </li>
              <li style="display: flex">
                <p>宽（cm）</p>
                <el-input v-model="row.width" size="mini" />
              </li>
              <li style="display: flex">
                <p>高（cm）</p>
                <el-input v-model="row.height" size="mini" />
              </li>
            </ul>
          </template>
        </u-table-column>
        <u-table-column align="center" label="翻译语种" prop="language" />
        <u-table-column align="center" label="源平台类目名称" prop="category_id" />
        <u-table-column align="center" label="更新时间" prop="updated_at" />
        <u-table-column align="center" label="收藏时间" prop="created_at" />
        <u-table-column align="center" label="操作结果" />
      </u-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          :total="total"
          :current-page="currentPage"
          :page-sizes="[30, 100, 200]"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </article>
  </div>
</template>

<script>
import PersonalLibraryAPI from '../../../module-api/product-put-on-api/personal-library-api'
export default {
  data() {
    return {
      Height: 500,
      PersonalLibraryAPInstance: new PersonalLibraryAPI(this),
      // search
      value2: '',
      // table
      goodsList: [],
      multipleSelection: [],
      buysource: '',
      time: '',
      isHighGoods: '',
      isEdit: '',
      language: '',
      price: '',
      goods_tag: '',

      // button
      buttonStatus: {
        getList: false
      },

      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 30
    }
  },
  mounted() {
    this.getGoodsList()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.currentPage = 1
      this.getGoodsList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getGoodsList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('this.multipleSelection', this.multipleSelection)
    },
    async getGoodsList() {
      const params = {
        page: this.currentPage,
        perpage: this.pageSize,
        goodsId: '',
        language: '',
        source: '',
        keyword: '',
        minPrice: '',
        maxPrice: '',
        timeType: 2,
        startTime: '2021-11-20 00:00:00',
        endTime: '2021-11-22 23:59:59',
        isEditTitle: '',
        isEditDescription: '',
        categoryId: '',
        isFeatured: 0,
        mainShowData: ''
      }
      this.buttonStatus.getList = true
      this.goodsList = []
      this.$refs.plTable.reloadData(this.goodsList)
      const res = await this.PersonalLibraryAPInstance.getCollectGoodsV2(params)
      // debugger
      if (res.code !== 200) {
        this.$message.error(`${res.code}:${res.data}`)
      } else {
        this.total = res.data.total
        this.goodsList.push(...res.data.data)
      }
      this.buttonStatus.getList = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/product-put-less/personal-library.less';
</style>

<template>
  <div class="contaniner">
    <div class="operation">
      <div class="o-item">
        <span>站点：</span>
        <el-select v-model="form.site" size="mini" filterable>
          <el-option v-for="(item, index) in siteList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="o-item">
        <span>一级类目：</span>
        <el-select v-model="form.site" size="mini" filterable>
          <el-option v-for="(item, index) in siteList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="o-item">
        <span>二级类目：</span>
        <el-select v-model="form.site" size="mini" filterable>
          <el-option v-for="(item, index) in siteList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="o-item">
        <span>三级类目：</span>
        <el-select v-model="form.site" size="mini" filterable>
          <el-option v-for="(item, index) in siteList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="o-item">
        <span>排序：</span>
        <el-select v-model="form.sort" size="mini" filterable>
          <el-option v-for="(item, index) in sortList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="o-item">
        <el-button type="primary" size="mini" @click="getChildUserList">搜索</el-button>
      </div>
    </div>
    <div class="table-content">
      <u-table
        v-loading="isloading"
        :data="tableData"
        :row-height="40"
        :border="false"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
      >
        <u-table-column type="index" align="center" label="序号" min-width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </u-table-column>
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="站点" min-width="180" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="日期" min-width="180" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="一级类目" min-width="180" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="二级类目" min-width="180" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="三级类目" min-width="180" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="商品平均价" min-width="180" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="商品日增长数" min-width="180" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="动销率(日)" min-width="180" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="商品总数(日)" min-width="180" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="有销量的商品数(日)" min-width="180" />
      </u-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isloading: false,
      form: {
        site: '', // 站点
        sort: '0' // 排序
      },
      sortList: [
        { value: '0', label: '日期' },
        { value: '1', label: '商品平均价' },
        { value: '2', label: '商品日增长数' },
        { value: '3', label: '动销率(日)' },
        { value: '4', label: '商品总数(日)' },
        { value: '5', label: '有销量的商品数(日)' }
      ],
      siteList: [
        { value: '', label: '全部' },
        { value: 'TH', label: '泰国站' },
        { value: 'MY', label: '马来站' },
        { value: 'TW', label: '台湾站' },
        { value: 'PH', label: '菲律宾站' },
        { value: 'ID', label: '印尼站' },
        { value: 'SG', label: '新加坡站' },
        { value: 'VN', label: '越南站' }
      ],
      tableData: [] // 表格数据
    }
  },
  mounted() {
    this.getChildUserList()
  },
  methods: {
    // 获取数据列表
    async getChildUserList() {
      this.isloading = true
      try {
        const { data } = await this.$api.getChildUserList({
          name: this.accountNameVal,
          isEnable: this.isEnable
        })
        console.log('tableData', data)
        if (data.code === 200) {
          this.total = data.data.length
          this.currentPage = 1
          this.tableData = data.data
          this.isloading = false
        } else {
          this.$message.error(`获取数据失败${data.message}`)
          this.isloading = false
        }
      } catch (err) {
        this.$message.error(`获取数据失败`)
        console.log(err)
        this.isloading = false
      }
    }
  }
}
</script>

<style lang="less">
@import '../../../module-less/product-put-less/hot-suggest.less';
</style>

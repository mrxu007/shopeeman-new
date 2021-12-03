<template>
  <div v-loading="loading" class="detai">
    <div class="condition">
      <div class="condition—item">
        <label>订单号：</label>
        <el-input v-model="query.orderSn" size="mini" style="width:180px" clearable />
      </div>
      <div class="condition—item">
        <label>拍单号：</label>
        <el-input v-model="query.shotOrderSn" size="mini" style="width:180px" clearable />
      </div>
      <el-button class="condition—item" type="primary" size="mini" @click="getTableList">搜索</el-button>
    </div>
    <div class="table-form">
      <el-table
        height="calc(100vh - 90px)"
        :data="tableList"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <el-table-column label="订单号" prop="order_sn" min-width="300px">
          <template slot-scope="{ row }">
            <span v-if="row.order_sn">{{ row.order_sn }}
              <el-button
                type="text"
                class="copyIcon"
                @click="copy(row.order_sn)"
              ><i
                class="el-icon-document-copy"
              /></el-button></span>
          </template>
        </el-table-column>
        <el-table-column label="拍单号" prop="shot_order_sn" min-width="300px">
          <template slot-scope="{ row }">
            <span v-if="row.shot_order_sn">{{ row.shot_order_sn }}
              <el-button
                type="text"
                class="copyIcon"
                @click="copy(row.shot_order_sn)"
              ><i
                class="el-icon-document-copy"
              /></el-button></span>
          </template>
        </el-table-column>
        <el-table-column label="修改前金额" prop="shot_amount_before" min-width="150px" align="center" />
        <el-table-column label="修改后金额" prop="shot_amount" min-width="150px" align="center" />
        <el-table-column label="修改时间" prop="updated_at" min-width="150px" align="center" />
      </el-table>
      <div class="pagination" style="display:flex;justify-content: flex-end;">
        <el-pagination
          background
          :current-page.sync="page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: {
        orderSn: '', // 订单号
        shotOrderSn: '', // 拍单号
        page: 1,
        pageSize: 20
      },
      total: 0,
      tableList: [],
      loading: false
    }
  },
  created() {
    this.getTableList()// 初始化数据
  },
  methods: {
    // 初始化数据 查询
    async getTableList() {
      const params = this.query
      this.loading = true
      const res = await this.$api.shotAmountRecord({ params })
      console.log(res)
      if (res.data.code === 200) {
        this.tableList = res.data.data && res.data.data.data || []
        this.query.page = res.data.data.current_page
        this.total = res.data.data.total
      } else {
        this.$message.error('网络走丢~')
      }
      this.loading = false
    },
    // 分页
    handleSizeChange(val) { this.query.pageSize = val },
    handleCurrentChange(val) { this.query.page = val },
    // 复制
    copy(attr) {
      const target = document.createElement('div')
      target.id = 'tempTarget'
      target.style.opacity = '0'
      target.innerText = attr
      document.body.appendChild(target)
      try {
        const range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        this.$message.success('复制成功')
      } catch (e) {
        // console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    }
  }
}
</script>
<style lang="less">
    .detai{
        min-width: 1280px;
        padding: 10px;
        .condition{
            display: flex;
            .condition—item{
                margin-right: 5px;
            }
        }
        .table-form{
            border: 0.5px solid rgb(224, 224, 224);
            margin-top: 10px;
        }
    }
</style>

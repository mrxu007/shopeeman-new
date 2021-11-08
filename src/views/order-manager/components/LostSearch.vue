<template>
  <div v-loading="loading" class="detai">
    <div class="condition">
      <div class="condition—item">
        <el-select v-model="selType" size="mini" style="width:120px;margin-right:3px">
          <el-option label="订单号后八位" value="1" />
          <el-option label="系统订单ID" value="2" />
          <el-option label="商品规格" value="3" />
        </el-select>
        <el-input v-model="inputDes" size="mini" style="width:180px" clearable />
      </div>
      <div class="condition—item">
        <label>包裹图片上的时间：</label>
        <el-date-picker
          v-model="query.goodsTime"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
          size="mini"
          style="width:150px"
        />
      </div>
      <el-button class="condition—item" type="primary" size="mini" @click="getTableList">查询丢失信息</el-button>
      <span style="color:red">通过实际包裹信息查询对应的订单信息</span>
    </div>
    <div class="table-form">
      <el-table
        height="calc(100vh - 90px)"
        :data="tableList"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <el-table-column label="订单号" prop="order_sn" min-width="300px">
          <template slot-scope="{ row }">
            <span>{{ row.order_sn }}
              <el-button
                type="text"
                class="copyIcon"
                @click="copy(row.order_sn)"
              ><i
                class="el-icon-document-copy"
              /></el-button></span>
          </template>
        </el-table-column>
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
      selType: '1',
      inputDes: '',
      query: {
        order: '', // 订单号后八位
        orderID: '', // 系统订单ID
        goodModel: '', // 系统订单ID
        goodsTime: ''// 包裹时间
      },
      total: 0,
      tableList: [],
      loading: false
    }
  },
  created() {
    this.getTableList()// 初始化数据
    this.query.goodsTime = new Date()
  },
  methods: {
    // 初始化数据 查询
    async getTableList() {
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
            align-items: center;
            .condition—item{
                margin-right: 15px;
            }
        }
        .table-form{
            border: 0.5px solid rgb(224, 224, 224);
            margin-top: 10px;
        }
    }
</style>


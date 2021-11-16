<template>
  <div v-loading="loading" class="detai">
    <div class="condition">
      <div class="condition—item">
        <el-select v-model="query.type" size="mini" style="width:120px;margin-right:3px">
          <el-option label="订单号后八位" value="1" />
          <el-option label="系统订单ID" value="2" />
          <el-option label="商品规格" value="3" />
        </el-select>
        <el-input v-model="query.data" size="mini" style="width:180px" clearable />
      </div>
      <div class="condition—item">
        <label>包裹图片上的时间：</label>
        <el-date-picker
          v-model="cloumn_date"
          size="mini"
          style="width: 324px"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="-"
          :picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
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
        <el-table-column label="订单号" prop="" min-width="300px">
          <template slot-scope="{ row }">
            <span>{{ row }}
              <el-button type="text" class="copyIcon" @click="copy(row)">
                <i class="el-icon-document-copy" /></el-button></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputDes: '',
      query: {
        type: '1', // 类型
        data: '', // 值
        shottedAt: ''// 包裹时间
      },
      total: 0,
      tableList: [],
      loading: false,
      cloumn_date: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    this.initFor()// 时间
    // this.getTableList()// 初始化数据
    // this.query.shottedAt = new Date()
  },
  methods: {
    initFor() {
      const d = new Date()
      const d1 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' 00:00:00'
      const d2 = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' 23:59:59'
      this.cloumn_date = [d2, d1]
      // this.cloumn_date && this.cloumn_date.length > 0 ? this.cloumn_date.join('/').toString() : ''
      console.log(this.cloumn_date)
    },
    // 数据 查询
    async getTableList() {
      if (!this.query.data) {
        this.$message.warning('查询信息不能为空')
        return
      }
      const params = {
        type: this.query.type,
        data: this.query.data,
        shottedAt: this.cloumn_date && this.cloumn_date.length > 0 ? this.cloumn_date.join('/').toString() : ''
      }
      this.loading = true
      try {
        const res = await this.$api.getOrderSn({ params })
        this.loading = false
        if (res.data.code === 200) {
          this.tableList = res.data.data
        } else {
          this.$message.warning('数据请求失败！')
        }
        console.log(res)
      } catch (error) {
        this.$message.error(error)
      }
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
        min-width: 1200px;
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


<template>
  <div class="detail">
    <ul>
      <li>
        历史公告
      </li>
      <li>
        <el-table
          :header-cell-style="{ background: '#f7fafa' }"
          :data="tableList"
          :row-style="{ height: '50px' }"
        >
          <el-table-column prop="title" label="标题" min-width="100px" align="center">
            <template v-slot="{row}">
              <el-link type="primary" @click="getHistoryNoticeDetail(row.id)">{{ row.title }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="publish_at" label="发布时间" min-width="150px" align="center" />
        </el-table>
      </li>
    </ul>

    <el-dialog
      title="提示"
      width="1100px"
      :visible.sync="dialogVisible"
    >
      <span v-html="rawHtml" />
    </el-dialog>
  </div>
</template>

<script>

export default {

  data() {
    return {
      tableList: [],
      rawHtml: '',
      dialogVisible: false
    }
  },
  created() {
    this.getHistoryNotice()
  },
  methods: {
    // 获取历史
    async getHistoryNotice() {
    //   const codeList = [
    //     'shopee.native', // 系统公告：主简码
    //     'shopee.native.tz.sys.update', // 顶部公告简码
    //     'shopee.native.tz.sys.ggtz', // 活动公告弹窗简码
    //     'shopee.native.tz.sys.lsgg', // 历史公告简码
    //     'shopee.native.tz.sys.scrollNotice' // 滚动公告简码
    //   ]
      const res = await this.$YipService.HistoryNotice('code_shopee.native.tz.sys.lsgg', '1', '10')
      if (JSON.parse(res).code === 200) {
        this.tableList = JSON.parse(res).data.data
      } else {
        this.$message.warning('数据获取失败')
      }
    },
    // 获取详情
    async getHistoryNoticeDetail(contentId) {
      const res = await this.$YipService.HistoryNoticeDetail('code_shopee.native.tz.sys.lsgg', contentId.toString())
      if (JSON.parse(res).code === 200) {
        this.rawHtml = JSON.parse(res).data.description
        this.dialogVisible = true
      } else {
        this.$message.warning('数据获取失败')
      }
    }
  }
}

</script>
<style lang="less" scoped>
.detail{
   width: 100%;
   height: 100%;
   background-color: white;
   padding: 10px;
    ul{
        width: 500px;
        li{
          margin-bottom: 10px;
          h2{
              margin-bottom: 5px;
          }
        }
}
    }
</style>

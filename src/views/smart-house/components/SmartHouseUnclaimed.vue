<template>
  <div v-loading="isLoading" class="unclaimed-package">
    <div class="operating-box">
      <div class="form-item">
        <span class="title">上家物流单号：</span>
        <el-input
          v-model="packageCode"
          size="mini"
          clearable
          oninput="value=value.replace(/\s+/g,'')"
        />
        <el-button
          type="primary"
          size="mini"
          :loading="serchDataLoading"
          style="width:80px;height:30px"
          @click="serchData"
        >搜索</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table
        max-height="540px"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa'
        }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="包裹图片">
          <template slot-scope="scope">
            <el-tooltip
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 56px; height: 56px"
            >
              <div slot="content">
                <img :src="scope.row.package_image" width="400px" height="400px">
              </div>
              <el-image
                v-if="scope.row.package_image"
                :src="scope.row.package_image"
                alt=""
                width="56px"
                height="56px"
                style="border-radius: 4px;"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="package_time" label="签收时间" />
        <el-table-column prop="package_code" label="包裹物流单号">
          <template slot-scope="{ row }">
            <span>
              {{ row.package_code }}
              <span
                v-if="row.package_code"
                class="copyIcon"
                @click="copy(row.package_code)"
              ><i class="el-icon-document-copy" /></span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="markPackageToMyFun(scope.row.id)"
            >标记为我的</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 输入订单号弹窗 -->
    <el-dialog
      title="输入订单号"
      class="dialog1"
      width="350px"
      top="16vh"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="synchVisible"
      @closed="closeDialog"
    >
      <div class="form-items">
        <span class="title">订单号：</span>
        <el-input
          v-model="orderSn"
          size="mini"
          clearable
          oninput="value=value.replace(/\s+/g,'')"
        />
        <el-button
          type="primary"
          size="mini"
          @click="markPackageToMy"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serchDataLoading: false,
      packageCode: '', // 上家物流单号
      tableData: [],
      isLoading: false,
      synchVisible: false,
      listId: '',
      orderSn: ''
    }
  },
  mounted() {

  },
  methods: {
    // 点击复制
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
    },
    // 查询失物数据
    async serchData() {
      this.serchDataLoading = true
      if (!this.packageCode) {
        this.serchDataLoading = false
        return this.$message('请输入要搜索的物流单号')
      }
      this.tableData = []
      this.isLoading = true
      const query = this.packageCode
      try {
        const res = await this.$api.getUnclaimedPackage({ packageCode: query })
        const data = res.data
        console.log(data, '--------')
        if (data.code === 200 && data.data && data.data.length) {
          this.tableData = data.data
        } else if (data.code === 200) {
          this.$message({
            type: 'success',
            message: data.message
          })
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
        this.serchDataLoading = false
        this.isLoading = false
      } catch (err) {
        console.log(err)
        this.isLoading = false
        this.serchDataLoading = false
        // this.$message.error('查询失败')
      }
    },
    // 标记为我的
    markPackageToMyFun(id) {
      this.listId = id
      this.synchVisible = true
    },
    async markPackageToMy() {
      if (!this.orderSn) {
        this.$message.warning('请输入订单号')
        return
      }
      this.isLoading = true
      const query = {
        id: this.listId,
        orderSn: this.orderSn
      }
      const { data } = await this.$api.markPackageToMy(query)
      if (data.code === 200) {
        this.$message({
          type: 'success',
          message: '标记成功'
        })
        this.closeDialog()
      } else {
        this.$message({
          type: 'error',
          message: data.message
        })
      }

      this.isLoading = false
    },
    // 关闭弹窗
    closeDialog() {
      this.listId = ''
      this.orderSn = ''
      this.synchVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/unclaimed-package.less';
</style>

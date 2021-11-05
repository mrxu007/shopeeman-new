<template>
  <div class="trustIp-management">
    <div class="operation">
      <div class="one">
        <div class="o-item">
          <span style="width:47px">信任IP：</span>
          <el-input v-model="ipVal" style="width: 130px" placeholder="请输入内容" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </div>
        <div class="o-item">
          <el-button
            type="primary"
            size="mini"
            @click="
              getIPTrustList"
          >搜索</el-button>
          <el-button type="primary" size="mini" @click="isShowDialog = true">添加信任IP</el-button>
          <el-button type="primary" size="mini" @click="isShowPhoneNum = true">配置接收短信的手机号</el-button>
        </div>
        <div class="o-item-alone">
          <span style="width:84px">登录是否检测：</span>
          <el-radio v-model="isOpenIpCheck" label="0">关闭检测</el-radio>
          <el-radio v-model="isOpenIpCheck" label="1">当信任IP数大于 <el-input v-model="trustIpCount" size="mini" oninput="value=value.replace(/\s+/g,'')" />时打开检测 </el-radio>
        </div>
        <div class="o-item">
          <el-button type="primary" size="mini" @click="saveConfigure">保存配置</el-button>
        </div>
      </div>
      <p class="tips">
        温馨提示：用于软件安全防护，可对登录的IP进行检测，若登录的IP不在信任IP列表中，将进行手机短信验证，接收短信验证码的手机号最多3个(默认开户手机号)
      </p>
    </div>
    <div class="table-content">
      <el-table
        v-loading="isloading"
        :data="tableData.slice((page - 1) * pageSize, page * pageSize)"
        stripe
        height="calc(100vh - 163px)"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column type="index" align="center" label="序号" min-width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          align="center"
          label="IP"
          min-width="100"
        />
        <el-table-column
          prop="remark"
          align="center"
          label="备注"
          min-width="130"
        />
        <el-table-column
          prop="created_at"
          align="center"
          label="添加时间"
          min-width="140"
        />
        <el-table-column
          label="操作"
          align="center"
          min-width="150"
        >
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="
                isShowDialog = true
                updataTrustIp(row)
              "
            >修改</el-button>
            <el-button type="primary" size="mini" @click="deleteTrustIp(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :current-page="page"
        :page-sizes="[30, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="dialog-content">
      <el-dialog :close-on-click-modal="false" title="编辑信任IP" :visible.sync="isShowDialog" @close="closeDialog">
        <div class="form-content">
          <el-form label-position="right" label-width="80px">
            <el-form-item label="当前IP:">
              <el-input v-model="currentIp" size="mini" placeholder="请输入IP" clearable oninput="value=value.replace(/\s+/g,'')" />
            </el-form-item>
            <el-form-item label="备注:">
              <el-input v-model="remark" type="textarea" :rows="2" placeholder="请输入内容" oninput="value=value.replace(/\s+/g,'')" />
            </el-form-item>
          </el-form>
          <div style="text-align: center">
            <el-button type="primary" size="mini" @click="editTruestIp">确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="phone-dialog">
      <el-dialog :close-on-click-modal="false" title="配置手机号码" :visible.sync="isShowPhoneNum" @close="closePhoneDialog">
        <div style="display: flex; margin-bottom: 10px">
          <div class="o-item">
            <span>手机号码：</span>
            <el-input
              v-model="phoneNum"
              placeholder="请输入手机号"
              clearable
              size="mini"
              oninput="value=value.replace(/\s+/g,'')"
            />
          </div>
          <div class="o-item">
            <el-button type="primary" size="mini" @click="updatePhoneNum(1, phoneNum)">添加手机号</el-button>
          </div>
        </div>
        <div class="dialog-table">
          <el-table
            :data="phoneTableData"
            stripe
            style="min-width: 240px"
            max-height="400"
            :header-cell-style="{
              textAlign: 'center',
              backgroundColor: '#f5f7fa',
            }"
          >
            <el-table-column type="index" align="center" label="序号" min-width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="" align="center" label="手机号" min-width="100">
              <template slot-scope="{ row }">
                {{ row ? row : '' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="80">
              <template slot-scope="{ row }">
                <el-button type="primary" size="mini" @click="updatePhoneNum(2, row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 30,
      page: 1,
      total: 0,
      isShowDialog: false, // 是否打开账号创建/修改弹窗
      isShowPhoneNum: false, // 是否打开配置接收手机号弹窗
      isloading: false,
      isOpenIpCheck: '', // 是否打开检测
      phoneNum: '', // 配置手机号码手机号
      ipVal: '', // 搜索信任IP
      currentIp: '', // 更新信任IP
      remark: '', // 备注
      ipId: '', // 不传则为新增,传值则为更新
      trustIpCount: '', // 信任IP数
      phoneTableData: [], // 配置手机号码数据
      tableData: [] // 表格数据
    }
  },
  mounted() {
    this.getUserInfo()
    this.getIPTrustList()
  },
  methods: {
    // 获取列表信息
    async getIPTrustList() {
      this.isloading = true
      const params = {
        ip: this.ipVal
      }
      const { data } = await this.$api.getIPTrustList(params)
      console.log('tableData', data)
      if (data.code === 200) {
        this.tableData = data.data
        this.total = this.tableData.length
        this.isloading = false
      } else {
        this.$message.error(`获取数据失败${data.message}`)
        this.isloading = false
      }
    },
    // 用户信息
    async getUserInfo() {
      try {
        const data = await this.$appConfig.getUserInfo()
        const trustIpCount = localStorage.getItem('trustIpCount')
        const isOpenIpCheck = localStorage.getItem('isOpenIpCheck')
        const phoneTableData = localStorage.getItem('phoneTableData')
        this.isOpenIpCheck = isOpenIpCheck ? isOpenIpCheck + '' : data.is_open_ip_check + ''
        this.trustIpCount = trustIpCount || data.trust_ip_count
        this.phoneTableData = phoneTableData ? phoneTableData.split(',') : data.phone_list
        console.log('login', data)
      } catch (error) {
        console.log(error)
      }
    },
    // 保存配置
    async saveConfigure() {
      if (!this.trustIpCount) {
        this.$message(`信任IP数不能为空`)
        return
      }
      if (Number(this.trustIpCount) > 100) {
        this.$message(`信任IP数量最大值为100，请重新设置`)
        return
      }
      const params = {
        isOpenIpCheck: this.isOpenIpCheck, // 是否开启信任IP管理：1是;0不是
        trustIpCount: this.trustIpCount
      }
      const { data } = await this.$api.setIpCheck(params)
      if (data.code === 200) {
        this.$message.success(`保存成功`)
        localStorage.setItem('isOpenIpCheck', this.isOpenIpCheck)
        localStorage.setItem('trustIpCount', this.trustIpCount)
      } else {
        this.$message.error(`保存失败${data.message}`)
      }
    },
    // 删除信任IP
    deleteTrustIp(val) {
      this.$confirm('此操作将永久删除该IP, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data } = await this.$api.deleteTrustedIP({
          id: val.id
        })
        if (data.code === 200) {
          this.$message.success(`删除成功`)
        } else {
          this.$message.error(`删除失败${data.message}`)
        }
        this.getIPTrustList()
      })
    },
    // 更新信任IP
    async editTruestIp() {
      if (!this.currentIp) {
        this.$message(`请输入IP地址`)
        return
      }
      const params = {
        id: this.ipId, // 自增ID，不传则为新增,传值则为更新
        ip: this.currentIp,
        remark: this.remark
      }
      const { data } = await this.$api.updateTrustedIP(params)
      if (data.code === 200) {
        this.$message.success(`保存成功`)
      } else {
        this.$message.error(`保存失败${data.message}`)
      }
      this.isShowDialog = false
      this.getIPTrustList()
    },
    // 修改信任IP
    updataTrustIp(val) {
      this.ipId = val.id
      this.currentIp = val.ip
      this.remark = val.remark
    },
    updatePhoneNum(actionVal, phoneNumVal) {
      const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
      switch (actionVal) {
        case 1:
          if (actionVal === 1) {
            if (this.phoneNum === '') {
              this.$message('请输入手机号')
              return
            }
            if (!reg.test(this.phoneNum)) {
              this.$message('手机号码格式有误')
              return
            }
            if (this.phoneTableData.length >= 3) {
              this.$message('最多只能添加3个手机号码')
              return
            }
          }
          this.updatePhoneListForIp(actionVal, phoneNumVal)
          break
        case 2:
          this.$confirm('此操作将永久删除该手机号, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updatePhoneListForIp(actionVal, phoneNumVal)
          })
          break
      }
    },
    // 更新手机号
    async updatePhoneListForIp(actionVal, phoneNumVal) {
      const params = {
        phone: phoneNumVal,
        action: actionVal //	1：新增;2：删除
      }
      const { data } = await this.$api.updatePhoneListForIp(params)
      if (data.code === 200) {
        if (params.action === 1) {
          this.phoneTableData.push(params.phone)
          localStorage.setItem('phoneTableData', this.phoneTableData)
        } else {
          const phoneTableData = localStorage.getItem('phoneTableData')
          if (phoneTableData) {
            let localPhoneTableData = phoneTableData.split(',')
            localPhoneTableData = localPhoneTableData.filter(item => {
              return item !== params.phone
            })
            localStorage.setItem('phoneTableData', localPhoneTableData)
          }
          this.phoneTableData = this.phoneTableData.filter(item => {
            return item !== params.phone
          })
        }
        this.$message.success(`更新成功`)
      } else {
        this.$message.error(`更新失败${data.message}`)
      }
    },
    closeDialog() {
      this.ipId = ''
      this.currentIp = ''
      this.remark = ''
    },
    closePhoneDialog() {
      this.phoneNum = ''
    },
    handleCurrentChange(val) {
      this.page = val
    },
    handleSizeChange(val) {
      this.pageSize = val
    }
  }
}
</script>

<style lang="less">
.trustIp-management {
  background-color: #fff;
  margin: 10px;
  padding:16px 16px 1px 16px;
  //   width:calc(100vw) ;
  .operation {
    overflow: auto;
    .one{
      padding: 0px 13px;
      display: flex;
      align-items: center;
      .o-item {
        display: flex;
        align-items: center;
        margin-right: 20px;
      }
      .o-item-alone {
        display: flex;
        align-items: center;
        margin-right: 10px;
        /deep/.el-radio {
          margin-right: 10px;
          display: flex;
          align-items: center;
        }
        /deep/.el-input {
          width: 61px !important;
        }
        /deep/.el-input__inner {
          width: 60px !important;
        }
      }
    }
    .tips {
      color: red;
      margin: 10px 0;
      width: 852px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
  }
  .dialog-content {
    /deep/.el-textarea__inner {
      font-family: '微软雅黑';
    }
    /deep/.el-form {
      /deep/.el-form-item {
        margin-bottom: 5px !important;
      }
    }
    /deep/.el-dialog {
      width: 350px !important;
      /deep/.el-dialog__body {
        width: 350px !important;
        display: flex !important;
        justify-content: center;
      }
      /deep/.el-dialog__header {
        padding: 5px 0 0 10px !important;
      }
      /deep/.el-dialog__title {
        font-size: 12px !important;
        color: #3031337a !important;
      }
    }
  }
  .phone-dialog {
    /deep/.el-form {
      /deep/.el-form-item {
        margin-bottom: 5px !important;
      }
    }
    /deep/.el-dialog {
      width: 500px !important;
      /deep/.el-dialog__body {
        width: 500px !important;
        // display: flex !important;
      }
      /deep/.el-dialog__header {
        padding: 5px 0 0 10px !important;
      }
      /deep/.el-dialog__title {
        font-size: 12px !important;
        color: #3031337a !important;
      }
    }
    /deep/.el-input {
      width: 130px !important;
    }
    /deep/.el-input__inner {
      width: 130px !important;
    }
    .o-item {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
  }
}
</style>

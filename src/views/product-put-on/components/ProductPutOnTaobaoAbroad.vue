<template>
  <div v-loading="loading" class="detail">
    <div class="condition">
      <div class="condition_item">
        <el-button type="primary" size="mini" @click="dialogVisible_token = true">新增授权</el-button>
        <el-button type="primary" size="mini" @click="refeshSatua">刷新状态</el-button>
        <!-- <el-button type="primary" size="mini" @click="open('1')"> <a :href="downPDF" style="color: white">下载教程</a></el-button> -->
        <el-button type="primary" size="mini" @click="open('1')"> 下载教程</el-button>
        <el-button type="text" size="mini" @click="open('2')"> <span class="linkdec">注册淘宝天猫海外平台账号</span> </el-button>
        <!-- <el-link type="primary" class="linkdec" href="https://distributor.taobao.global/apps/seller/login">注册淘宝天猫海外平台账号</el-link> -->
      </div>
      <div class="condition_item">
        <div class="conditon_item_dec">
          <span>账号别名：</span>
          <el-input v-model="query.account_alies" clearable size="mini" style="width: 180px" />
        </div>
        <div class="conditon_item_dec">
          <span>账号：</span>
          <el-input v-model="query.account" clearable size="mini" style="width: 180px" />
        </div>
        <el-button class="conditon_item_dec" type="primary" size="mini" @click="getTableList">搜索</el-button>
      </div>
    </div>

    <div class="tabledes">
      <el-table height="calc(100vh - 106px)" :header-cell-style="{ background: '#f7fafa' }" :data="tableList">
        <el-table-column label="账号" prop="account" min-width="200px" />
        <el-table-column label="账号别名" prop="account_alias_name" min-width="200px" />
        <el-table-column label="授权状态" prop="status" min-width="200px">
          <template v-slot="{ row }">
            <span>{{ Number(row.status) === 1 ? '正常' : '授权过期' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="created_at" min-width="200px" />
        <el-table-column label="更新时间" prop="updated_at" min-width="200px" />
        <el-table-column label="操作" prop="" min-width="250px">
          <template v-slot="{ row }">
            <el-button type="primary" size="mini" @click="updataName(row)">修改账号别名</el-button>
            <el-button type="primary" size="mini" @click="delAccount(row)">删除账号</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改别名 -->
    <el-dialog title="修改账号别名" :visible.sync="dialogVisible_updata" width="30%" @closed="clearVisible">
      <div>
        <div style="display: flex; align-items: baseline">
          <span>当前账号别名：</span>
          <h3 style="color: red">{{ currentName }}</h3>
        </div>
        <div style="display: flex; align-items: baseline">
          <span>新的账号别名：</span>
          <el-input v-model="newName" type="text" size="mini" style="width: 250px; margin-top: 10px" clearable />
        </div>
        <el-button type="primary" size="mini" style="width: 100px; margin-top: 10px; margin-left: 115px" @click="updataNameFun()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 天猫淘宝海外平台授权 -->
    <el-dialog title="天猫淘宝海外平台授权" :visible.sync="dialogVisible_token" width="400px" @closed="clearVisible">
      <div style="display: flex; justify-content: center; flex-wrap: wrap">
        <div style="display: flex; align-items: baseline">
          <span>账号别名：</span>
          <el-input v-model="tokenName" type="text" size="mini" style="width: 250px" clearable />
        </div>
        <div style="margin-top: 10px"><el-button type="primary" size="mini" style="width: 100px" @click="getToken">确定</el-button></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TBApi from '../../../module-api/smart-house-api/tao-bao'
export default {
  data() {
    return {
      rowData: '',
      loading: false,
      dialogVisible_token: false,
      tokenName: '',
      currentName: '',
      newName: '',
      dialogVisible_updata: false,
      tableList: [],
      query: {
        account_alies: '', // 账号别名
        account: '' // 账号
      },
      TBApiInstance: new TBApi(this),
      user_uid: '', // 用户ID
      user_uuid: '0', // 子账号ID
      downPDF: 'https://shopeeman.oss-cn-shenzhen.aliyuncs.com/files/shopeemanFiles/appFiles/20211111/20211111153709618cc825a8c5b.pdf'
    }
  },
  created() {
    this.getUser()
    // this.getTableList()
  },
  methods: {
    // 注册天猫海外平台
    open(type) {
      // 1 下载教程  2 注册海外平台
      if (type === '1') {
        window.open(this.downPDF)
      } else {
        window.BaseUtilBridgeService.openUrl('https://distributor.taobao.global/apps/seller/login"')
      }
    },
    // 新增授权
    async getToken() {
      if (!this.tokenName) {
        this.$message.warning('填写信息不能为空')
        return
      }
      const params = {
        accountAliasName: this.tokenName
      }
      const res = await this.TBApiInstance.getTbGlobalAuthUrl(params)
      console.log('token', res)
      if (res.code === 200) {
        const url = res.data.url
        // window.location.href = url
        window.BaseUtilBridgeService.openUrl(url)
      } else {
        this.$message.error(res.data)
      }
    },
    // 删除
    async delAccount(row) {
      const params = {
        id: row.id
      }
      this.loading = true
      const res = await this.TBApiInstance.deleteAccount(params)
      this.loading = false
      if (res.code === 200) {
        this.$message.success('删除成功')
      } else {
        this.$message.error(res.data)
      }
      this.getTableList()
    },
    // 修改账户别名
    updataName(row) {
      this.rowData = row
      this.currentName = row.account_alias_name
      this.dialogVisible_updata = true
    },
    async updataNameFun() {
      if (!this.newName) {
        this.$message.warning('填写信息不能为空')
        return
      }
      const params = {
        id: this.rowData.id,
        uuid: this.user_uuid,
        accountAliasName: this.newName
      }
      this.loading = true
      const res = await this.TBApiInstance.updateAliasName(params)
      console.log('update', res)
      if (res.code === 200) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(res.data)
      }
      this.dialogVisible_updata = false
      this.getTableList()
      this.newName = ''
    },
    // 关闭弹窗
    clearVisible() {
      this.newName = ''
      this.tokenName = ''
    },
    // 获取用户信息
    async getUser() {
      const userInfo = await this.$appConfig.getUserInfo()
      this.user_uid = userInfo.muid
      this.getTableList() // 初始化列表
    },
    // 刷新状态
    async refeshSatua() {
      this.tableList.forEach(e => {
        const params = {
          userId: e.user_id
        }
        this.loading = true
        this.TBApiInstance.refreshAccessToken(params).then(res => {
          this.loading = false
          console.log(res)
        })
      })
      this.getTableList()
    },
    // 表格
    async getTableList() {
      console.log(this._this.userInfo)
      debugger
      // const params = {
      //   uid: this.user_uid,
      //   uuid: this.user_uuid,
      //   account: this.query.account,
      //   accountAliasName: this.query.account_alies
      // }

      this.loading = true
      const res = await this.TBApiInstance.getTbGlobalUser(params)
      debugger
      this.loading = false
      if (res.code === 200) {
        this.tableList = res.data.data
      } else {
        this.$message.error(res.data)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.detail {
  min-width: 1200px;
  padding: 10px;
  .condition_item {
    display: flex;
    margin: 10px 0px;
    .el-button {
      margin-right: 20px;
    }
    .conditon_item_dec {
      margin-right: 20px;
    }
    .linkdec {
      // text-decoration: underline;
      color: blue;
    }
    .linkdec:hover {
      color: red;
    }
  }
}
</style>

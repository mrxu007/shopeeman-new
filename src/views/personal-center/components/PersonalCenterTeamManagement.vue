<template>
  <div class="team-management">
    <div class="operation">
      <div class="o-item">
        <span>账号名称：</span>
        <el-input
          v-model="accountNameVal"
          oninput="value=value.replace(/\s/g,'')"
          placeholder="请输入内容"
          clearable
          size="mini"
          style="width:120px"
        />
      </div>
      <div class="o-item">
        <el-select v-model="isEnable" placeholder="请选择用户状态" size="mini">
          <el-option v-for="item in is_enable" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="o-item">
        <el-button type="primary" size="mini" @click="getChildUserList">搜索</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="
            isShowDialog = true
            showAddOrEdit = true
          "
        >添加子账号
        </el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        v-loading="isloading"
        :data="tableData"
        stripe
        height="calc(100vh - 105px)"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column
          type="index"
          align="center"
          label="序号"
          min-width="50"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="typeCn"
          align="center"
          label="类型"
          min-width="180"
        />
        <el-table-column
          prop="name"
          align="center"
          label="账号"
          min-width="120"
        />
        <el-table-column
          prop="groupCn"
          align="center"
          label="关联店分组"
          min-width="180"
        />
        <el-table-column
          prop="is_enable"
          align="center"
          label="状态"
          min-width="80"
        >
          <template slot-scope="{row}">
            <span>{{ row.is_enable===1?'启用':'停用' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="note" align="center" label="备注" min-width="180" />
        <el-table-column label="操作" align="center" min-width="180">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="deleteChildUser(row)">删除</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="
                isShowDialog = true
                showAddOrEdit = false
                editSubAccountDia(row)
              "
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-content">
      <el-dialog :close-on-click-modal="false" title="账号创建/修改" :visible.sync="isShowDialog" @close="closeDialog">
        <div class="dialog-left">
          <div class="form-content">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="用户类型:">
                <el-checkbox-group v-model="typeListId">
                  <el-checkbox v-for="(item,i) in typeList" :key="i" :label="item.id+''">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="子账号:">
                <el-input v-model="name" size="mini" placeholder="请输入子账号名" clearable oninput="value=value.replace(/\s/g,'')" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="password" placeholder="请输入密码(不得小于9位)" oninput="value=value.replace(/\s/g,'')" show-password size="mini" />
              </el-form-item>
              <el-form-item label="状态:">
                <el-radio v-model="diaIsEnable" label="1">启用</el-radio>
                <el-radio v-model="diaIsEnable" label="2">停用</el-radio>
              </el-form-item>
              <el-form-item label="备注:">
                <el-input v-model="note" size="mini" placeholder="请输入备注" clearable oninput="value=value.replace(/\s/g,'')" />
              </el-form-item>
            </el-form>
          </div>
          <div style="text-align: center; margin-top: 10px">
            <el-button v-if="showAddOrEdit" type="primary" size="mini" @click="startOperation('add')">新增</el-button>
            <el-button v-if="!showAddOrEdit" type="primary" size="mini" @click="startOperation('updata')">修改</el-button>
          </div>
        </div>
        <div class="dialog-right">
          <div class="operation-content">
            <span style="width: 60px">店铺分组:</span>
            <el-input v-model="shopGroupVal" placeholder="请输入店铺分组名称" clearable size="mini" oninput="value=value.replace(/\s/g,'')" />
            <el-button style="margin-left: 15px" type="primary" size="mini" @click="getBindMallCount">查找</el-button>
          </div>
          <div class="dialog-table">
            <el-table ref="shopGruopDataRef" :data="shopGruopData" stripe style="min-width: 240px" max-height="400" :row-key="getRowKey " @selection-change="handleSelectionChange">
              <el-table-column type="selection" align="center" min-width="45" :reserve-selection="true" />
              <el-table-column align="center" label="序号" min-width="40">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="group_name" align="center" label="分组名称" min-width="80" />
              <el-table-column prop="bind_mall_count" align="center" label="绑定店铺数量" min-width="90" />
            </el-table>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDialog: false, // 是否打开账号创建/修改弹窗
      showAddOrEdit: true,
      currentPage: 1, // 前往的页数
      shopGroupVal: '', // 搜索店铺分组
      accountNameVal: '', // 搜索子账号名
      multipleSelection: [], // 选择的店铺分组
      typeListId: [], // 用户类别
      typeList: [], // 用户类别list
      diaIsEnable: '1', // 弹窗用户状态
      name: '', // 子账号
      password: '', // 密码
      note: '', // 备注
      total: 0,
      isloading: false,
      isEnable: '0', // 用户状态
      accountId: '', // 子账户ID
      is_enable: [ // 用户状态
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '启用'
        },
        {
          value: '2',
          label: '停用'
        }
      ],
      tableData: [], // 表格数据
      shopGruopData: [] // 店铺分组数据
    }
  },
  mounted() {
    this.getChildUserList()
    this.getBindMallCount()
    this.userRoleList()
  },
  methods: {
    // 获取店铺分组
    async getBindMallCount() {
      const params = {
        groupName: this.shopGroupVal.trim()
      }
      const { data } = await this.$api.getBindMallCount(params)
      if (data.code === 200) {
        this.shopGruopData = data.data
      } else {
        this.$message.error(`店铺分组数据错误${data.message}`)
      }
    },
    // 获取子账号角色类型
    async userRoleList() {
      const { data } = await this.$api.userRoleList()
      if (data.code === 200) {
        this.typeList = data.data
      } else {
        this.$message.error(`角色类型获取错误${data.message}`)
      }
    },
    startOperation(val) {
      if (this.typeListId.length === 0) {
        this.$message('请选择用户类别')
        return
      }
      if (!this.name) {
        this.$message('请填写账号')
        return
      }
      if (this.multipleSelection.length === 0) {
        this.$message('至少选择一个店铺分组')
        return
      }
      const shopGroupId = []
      for (let index = 0; index < this.multipleSelection.length; index++) {
        const element = this.multipleSelection[index]
        if (element.bind_mall_count === 0) {
          this.$message('有未绑定店铺的分组')
          return
        }
        shopGroupId.push(element.id)
      }
      switch (val) {
        case 'add':
          if (!this.password) {
            this.$message('请填写密码')
            return
          }
          if (this.password.trim().length < 9) {
            this.$message('密码最少必须为9位')
            return
          }
          this.addSubAccount(shopGroupId)
          break
        case 'updata':
          if (this.password !== '' && this.password.trim().length < 9) {
            this.$message('密码最少必须为9位')
            return
          }
          this.editSubAccount(shopGroupId)
          break
      }
    },
    // 修改子账号弹窗
    editSubAccountDia(val) {
      this.accountId = val.id
      this.name = val.name
      // this.password = val.password
      console.log(val.password)
      this.diaIsEnable = val.is_enable.toString()
      this.note = val.note
      val.type.forEach(item => {
        this.typeListId.push(item)
      })
      if (this.isShowDialog) {
        this.$nextTick(() => {
          this.shopGruopData.forEach(row => {
            val.bind_mall_group_id.forEach(id => {
              if (id === row.id) {
                this.$refs.shopGruopDataRef.toggleRowSelection(row)
              }
            })
          })
        })
      }
    },
    // 删除子账号
    deleteChildUser(val) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data } = await this.$api.deleteChildUser({
          id: val.id
        })
        if (data.code === 200) {
          this.$message.success('删除成功')
        } else {
          this.$message.error(`删除失败:${data.message}`)
        }
        this.getChildUserList()
      })
    },
    // 修改子账号
    async editSubAccount(shopGroupId) {
      const params = {
        id: this.accountId,
        type: this.typeListId.toString(),
        name: this.name,
        password: this.password,
        note: this.note,
        isEnable: this.diaIsEnable,
        groupIds: shopGroupId.toString()
      }
      const { data } = await this.$api.editChildUsers(params)
      if (data.code === 200) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(`修改失败:${data.message}`)
      }
      this.isShowDialog = false
      this.getChildUserList()
    },
    // 添加子账号
    async addSubAccount(shopGroupId) {
      console.log(shopGroupId.toString())
      if (this.tableData.length >= 20) {
        this.$message('子账号数量达到上限制')
        return
      }
      const params = {
        type: this.typeListId.toString(),
        name: this.name,
        password: this.password,
        note: this.note,
        isEnable: this.diaIsEnable,
        groupIds: shopGroupId.toString()
      }
      const { data } = await this.$api.saveChildUsers(params)
      if (data.code === 200) {
        this.$message.success('添加成功')
      } else {
        this.$message.error(`添加失败:${data.message}`)
      }
      this.isShowDialog = false
      this.getChildUserList()
    },
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    closeDialog() {
      this.accountId = ''
      this.typeListId = []
      this.name = ''
      this.password = ''
      this.note = ''
      this.diaIsEnable = '1'
      this.$refs.shopGruopDataRef.clearSelection()
      this.shopGroupVal = ''
    },
    // 记住所选项
    getRowKey(row) {
      return row.id
    }
  }
}
</script>

<style lang="less">
.team-management {
  background-color: #fff;
  margin: 10px;
  padding: 16px;
  // min-width: 1100px;
  .operation {
    // padding: 16px;
    margin-bottom: 10px;
    display: flex;
    height: 40px;
    align-items: center;
    overflow: auto;
    .o-item {
      display: flex;
      align-items: center;
      margin-right: 10px;
      span {
        min-width: 70px;
      }
      /deep/.el-select {
        /deep/.el-input {
          width: 82px;
        }
        /deep/.el-input__suffix {
          text-align: end !important;
        }
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .dialog-content {
    /deep/.el-dialog {
      margin-top: 10vh !important;
      width: 800px !important;
      /deep/.el-dialog__body {
        width: 800px !important;
        display: flex !important;
        justify-content: space-between;
      }
      /deep/.el-dialog__header {
        padding: 5px 0 0 10px !important;
      }
      /deep/.el-dialog__title {
        font-size: 12px !important;
        color: #3031337a !important;
      }
    }
    .dialog-left {
      // min-width: 220px;
      .form-content {
        width: 305px;
        /deep/.el-checkbox-group {
          width: 250px !important;

          /deep/.el-checkbox {
            margin-right: 5px !important;
            /deep/.el-checkbox__label {
              padding-left: 5px !important;
            }
          }
        }
        /deep/.el-form {
          /deep/.el-form-item {
            margin-bottom: 10px !important;
          }
        }
      }
    }
    .dialog-right {
      min-width: 410px;
      margin-left: 20px;
      margin-top: 5px;
      .el-input{
        width: 160px;
      }
      .operation-content {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

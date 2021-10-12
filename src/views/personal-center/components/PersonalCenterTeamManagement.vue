<template>
  <div class="team-management">
    <div class="operation">
      <div class="o-item">
        <span>账号名称：</span>
        <el-input v-model="accountNameVal" placeholder="请输入内容" clearable size="mini" />
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
      <el-table v-loading="isloading" :data="tableData" stripe style="min-width: 1000px" height="calc(100vh - 135px)">
        <el-table-column type="index" align="center" label="序号" min-width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="typeCn" align="center" show-overflow-tooltip label="类型" min-width="180" />
        <el-table-column prop="name" align="center" show-overflow-tooltip label="账号" min-width="180" />
        <el-table-column prop="groupCn" align="center" show-overflow-tooltip label="关联店分组" min-width="180" />
        <el-table-column prop="is_enable" align="center" label="状态" min-width="80">
          <template slot-scope="{row}">
            <span>{{ row.is_enable===1?'启用':'停用' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="note" align="center" show-overflow-tooltip label="备注" min-width="180" />
        <el-table-column label="操作" align="center" min-width="180">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="deleteChildUser(row)">删除</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="
                editSubAccountDia(row)
                isShowDialog = true
                showAddOrEdit = false
              "
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[30, 50, 100, 200]"
        :page-size="30"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="dialog-content">
      <el-dialog :close-on-click-modal="false" title="账号创建/修改" :visible.sync="isShowDialog" @close="closeDialog">
        <div class="dialog-left">
          <div class="form-content">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="用户类型:">
                <el-checkbox-group v-model="typeListId">
                  <el-checkbox v-for="(item,i) in typeList" :key="i" :label="item.id">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="子账号:">
                <el-input v-model="name" size="mini" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="password" oninput="value=value.replace(/[\W]/g,'')" show-password size="mini" />
              </el-form-item>
              <el-form-item label="状态:">
                <el-radio v-model="diaIsEnable" label="1">启用</el-radio>
                <el-radio v-model="diaIsEnable" label="2">停用</el-radio>
              </el-form-item>
              <el-form-item label="备注:">
                <el-input v-model="note" size="mini" />
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
            <span style="width: 120px">店铺分组:</span>
            <el-input v-model="shopGroupVal" placeholder="请输入内容" clearable size="mini" />
            <el-button style="margin-left: 20px" type="primary" size="mini">查找</el-button>
          </div>
          <div class="dialog-table">
            <el-table ref="shopGruopDataRef" :data="shopGruopData" stripe style="min-width: 240px" max-height="350" @selection-change="handleSelectionChange">
              <el-table-column type="selection" align="center" min-width="55" />
              <el-table-column prop="num" align="center" show-overflow-tooltip label="序号" min-width="60" />
              <el-table-column prop="groupName" align="center" show-overflow-tooltip label="分组名称" min-width="80" />
              <el-table-column prop="shopNum" align="center" label="绑定店铺数量" min-width="100" />
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
      shopGroupVal: '',
      accountNameVal: '',
      multipleSelection: [],
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
          label: '请选择用户状态'
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
      shopGruopData: [
        { num: 78908, groupName: '111', shopNum: 2 },
        { num: 78908, groupName: '1111', shopNum: 2 },
        { num: 78908, groupName: '111', shopNum: 2 }
      ]
    }
  },
  async mounted() {
    await this.getChildUserList()
    await this.userRoleList()
  },
  methods: {
    // 获取子账号角色类型
    async userRoleList() {
      this.typeList = []
      const { data } = await this.$api.userRoleList()
      console.log(data)
      const list = Object.keys(data)
      list.forEach(item => {
        const obj = {
          id: item,
          name: data[item]
        }
        this.typeList.push(obj)
      })
    },
    startOperation(val) {
      if (this.typeListId.length === 0) {
        this.$message('请选择用户类别')
        return
      }
      if (this.name === '') {
        this.$message('请填写账号')
        return
      }
      if (this.password.trim().length < 9) {
        this.$message('密码最少必须为9位')
        return
      }
      if (this.multipleSelection.length === 0) {
        this.$message('至少选择一个店铺分组')
        return
      }
      switch (val) {
        case 'add':
          this.addSubAccount()
          break
        case 'updata':
          this.editSubAccount()
          break
      }
    },
    // 修改子账号弹窗
    editSubAccountDia(val) {
      this.accountId = val.id
      this.name = val.name
      this.password = val.password
      this.diaIsEnable = val.is_enable.toString()
      this.note = val.note
      val.type.forEach(val => {
        this.typeListId.push(val)
      })
      setTimeout(() => {
        this.shopGruopData.forEach(row => {
          if (val.shopGroup === row.groupName) {
            this.$refs.shopGruopDataRef.toggleRowSelection(row)
          }
        })
      })
    },
    // 删除子账号
    async deleteChildUser(val) {
      const { data } = await this.$api.deleteChildUser({
        id: val.id
      })
      if (data.status === 'success') {
        this.$message.success('删除成功')
      } else {
        this.$message.error(`删除失败:${data.errMsg}`)
      }
      this.getChildUserList()
    },
    // 修改子账号
    async editSubAccount() {
      const params = {
        id: this.accountId,
        type: this.typeListId.toString(),
        name: this.name,
        password: this.password,
        note: this.note,
        is_enable: this.diaIsEnable,
        groupIds: '1,3'
      }
      const { data } = await this.$api.editChildUsers(params)
      if (data.status === 'success') {
        this.$message.success('修改成功')
      } else {
        this.$message.error(`添加失败:${data.errMsg}`)
      }
      this.isShowDialog = false
      this.getChildUserList()
    },
    // 添加子账号
    async addSubAccount() {
      if (this.tableData.length >= 20) {
        this.$message('子账号数量达到上限制')
        return
      }
      console.log(this.typeListId, 'aaaaaa')
      const params = {
        type: this.typeListId.toString(),
        name: this.name,
        password: this.password,
        note: this.note,
        is_enable: this.diaIsEnable,
        groupIds: '1,3'
      }
      const { data } = await this.$api.saveChildUsers(params)
      if (data.status === 'success') {
        this.$message.success('添加成功')
      } else {
        this.$message.error(`添加失败:${data.errMsg}`)
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
          is_enable: this.isEnable
        })
        console.log(data)
        this.total = data.total
        this.currentPage = data.current_page
        this.tableData = data.data
        this.isloading = false
      } catch (error) {
        console.log(error)
        this.$message.error('获取数据失败')
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
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style lang="less">
.team-management {
  background-color: #fff;
  margin: 10px;
  padding: 16px;
  min-width: 1100px;
  .operation {
    min-width: 500px;
    padding: 16px;
    display: flex;
    height: 40px;
    align-items: center;
    .o-item {
      display: flex;
      align-items: center;
      margin-right: 10px;
      span {
        min-width: 80px;
      }
      /deep/.el-select {
        /deep/.el-input {
          width: 140px;
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
    .dialog-left {
      min-width: 320px;
      .form-content {
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
            margin-bottom: 1px !important;
          }
        }
      }
    }
    .dialog-right {
      min-width: 320px;
      margin-left: 20px;
      .operation-content {
        display: flex;
        align-items: center;
      }
    }
    /deep/.el-dialog {
      min-width: 700px !important;
      /deep/.el-dialog__body {
        min-width: 660px !important;
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
  }
}
</style>

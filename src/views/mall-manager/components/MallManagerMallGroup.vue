<template>
  <el-row class="contaniner">
    <el-row class="header">
      <el-col :span="24" class="header-top">
        <ul>
          <li>
            <span>分组名称：</span>
            <el-input v-model="groupName" placeholder="" size="mini" />
          </li>
          <li>
            <el-button type="primary" size="mini" @click="getGroup">查询</el-button>
            <el-button type="primary" size="mini" @click="openGroupDialog(null)">新增分组</el-button>
            <el-button type="primary" size="mini" @click="deleteGroup">删除当前分组</el-button>
            <el-button type="primary" size="mini">绑定运营</el-button>
            <el-button type="primary" size="mini">绑定客服</el-button>
            <el-button type="primary" size="mini">绑定跟单</el-button>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="article">
      <el-table
        ref="plTable"
        v-loading="buttonStatus.search"
        height="calc(100vh - 130px)"
        :data="groupList"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序列号" width="100" />
        <el-table-column align="center" label="分组名称" prop="group_name" />
        <el-table-column align="center" label="绑定运营">
          <template v-slot="{ row }"> {{ row.new_role_operator.join(',') || '-' }} </template>
        </el-table-column>
        <el-table-column align="center" label="绑定客服">
          <template v-slot="{ row }"> {{ row.new_role_customer_servicer.join(',') || '-' }} </template>
        </el-table-column>
        <el-table-column align="center" label="绑定跟单">
          <template v-slot="{ row }"> {{ row.new_role_follower_id.join(',') || '-' }} </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" size="mini" @click="openGroupDialog(row)">修改分组</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 新增/修改店铺 -->
    <el-dialog
      class="edit-group-dialog"
      :title="typeOpt ? '修改店铺分组' : '新增店铺分组'"
      :visible.sync="editGroupDialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal="false"
    >
      <el-row class="contaniner-dialog">
        <div class="con-lft">
          <ul>
            <li v-show="typeOpt">
              <p>分组列表：</p>
              <el-select v-model="groupId" placeholder="" size="mini">
                <el-option v-for="(item, index) in groupList" :key="index" :value="item.id" :label="item.group_name" />
              </el-select>
            </li>
            <li v-show="!typeOpt">
              <p>新增分组：</p>
              <el-input v-model.trim="addGroupName" placeholder="" size="mini" />
            </li>
            <li class="btn">
              <el-button type="primary" size="mini" @click="addOrUpdatemallGroup">保存</el-button>
              <el-button type="primary" size="mini">Excel导入分组</el-button>
            </li>
            <li>
              <div class="text-log">
                <div class="text-log-content" v-html="consoleMsg" />
              </div>
            </li>
          </ul>
        </div>
        <div class="con-rht">
          <ul>
            <li>
              <p>站点：</p>
              <el-select v-model="siteId" placeholder="" size="mini">
                <el-option label="全部" :value="0" />
                <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
              </el-select>
              <el-button type="primary" size="mini" @click="getMallList">刷新店铺</el-button>
            </li>
            <li>
              <p>店铺ID：</p>
              <el-input v-model.trim="systemId" placeholder="" size="mini" />
              <el-button type="primary" size="mini">查询</el-button>
              <el-checkbox v-model="isHide" @change="showMallbangingEvent">隐藏已绑定分组店铺</el-checkbox>
            </li>
          </ul>
          <div class="con-rht-text">
            <span>绑定当前分组的店铺始终会显示</span>
          </div>
          <div class="con-rht-table">
            <u-table
              ref="plTable2"
              :height="420"
              use-virtual
              :header-cell-style="{
                backgroundColor: '#f5f7fa',
              }"
              :data-changes-scroll-top="false"
              :row-height="50"
              :border="false"
              @table-body-scroll="tableScroll"
            >
              <!-- <el-table-column align="center" type="selection" /> -->
              <el-table-column align="center" type="index" label="序号" />
              <el-table-column align="center" prop="" label="站点">
                <template v-slot="{ row }">
                  {{ countriesObj[row.country] }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="platform_mall_id" label="店铺ID" />
              <el-table-column align="center" prop="platform_mall_name" label="店铺名称" />
              <el-table-column align="center" prop="group_name" label="已绑定分组" />
              <u-table-column align="center" label="操作">
                <template v-slot="{ row }">
                  <el-button v-if="row.isSelected" size="mini" type="primary" style="margin: 0" @click="delbingingMall(row)">删除</el-button>
                  <el-button v-else size="mini" style="margin: 0" plain @click="addbingingMall(row)">添加</el-button>
                </template>
              </u-table-column>
            </u-table>
          </div>
        </div>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
import { countriesObj, countries } from '../../../util/countries'
export default {
  data() {
    return {
      groupName: '',
      groupList: [],
      groupListTemp: [],
      consoleMsg: '',
      buttonStatus: {
        search: false,
        addGroup: false,
        delGroup: false
      },

      // table
      multipleSelection: [],

      // 店铺分组弹框
      typeOpt: '',
      editGroupDialogVisible: false,
      groupId: '',
      siteId: 0,
      systemId: '',
      addGroupName: '',
      mallList: [],
      mallListTemp: [],
      countries: null,
      countriesObj: null,
      isHide: false,
      bindMallList: []

    }
  },
  created() {
    this.countries = countries
    this.countriesObj = countriesObj
    this.getGroup()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      done()
      this.importMallListData = []
      this.consoleMsg = ''
      //   })
      //   .catch(_ => {})
    },
    openGroupDialog(val) {
      this.typeOpt = val
      this.editGroupDialogVisible = true
      if (this.mallListTemp.length === 0) {
        this.getMallList()
      }
    },
    tableScroll({ scrollTop, scrollLeft, table, judgeFlse }) {
      // {scrollTop， scrollLeft, table, judgeFlse: 这个参数返回一个boolean值，为true则代表表格滚动到了底部了，false没有滚动到底部，必须开起大数据渲染模式才能有值哦}, event
      console.log(scrollTop, scrollLeft, table, judgeFlse)
    },
    delbingingMall(row) { // 删除绑定店铺
      const index = this.bindMallList.findIndex(item => {
        return item.id === row.id
      })
      row.isSelected = false
      this.bindMallList.splice(index, 1)
      console.log('111111111111')
    },
    addbingingMall(row) { // 添加绑定店铺
      this.bindMallList.push(row)
      row.isSelected = true
    },
    showMallbangingEvent() {
      if (this.isHide) {
        this.mallListTemp = this.mallList.filter(item => !item.group_name)
      } else {
        this.mallListTemp = this.mallList
      }
      this.$refs.plTable2.reloadData(this.mallListTemp)
    },
    async getGroup() {
      if (this.buttonStatus.search) {
        return
      }
      this.buttonStatus.search = true
      const params = {
        groupName: this.groupName
      }
      const res = await this.$api.getMallGroup(params)
      if (res.data.code !== 200) {
        this.$message.error(`获取店铺分组列表失败:  ${res.data.message}`)
        this.buttonStatus.search = false
        return
      }
      this.groupList = res.data.data
      this.groupListTemp = this.groupList
      console.log('groupListTemp', this.groupListTemp)
      this.buttonStatus.search = false
    },
    async addOrUpdatemallGroup() {
      if (this.buttonStatus.addGroup) {
        return
      }
      const addGroupName = this.addGroupName
      if (!addGroupName) {
        this.$message.error('新增分组名不能为空')
        return
      }
      if (this.bindMallList.length === 0) {
        this.$message.error('新增分组,最少绑定一个店铺')
        return
      }
      const isRepeatGroupName = this.groupList.find(item => item.group_name === addGroupName)
      if (isRepeatGroupName) {
        this.$message.error('分组名已存在')
        return
      }
      this.buttonStatus.addGroup = true
      const TypeName = this.typeOpt ? '修改' : '添加'
      const params = {
        groupName: this.addGroupName, // 店铺分组必填
        sysMallId: this.bindMallList.join(','), // 系统店铺id 多个用英文逗号隔开
        groupId: this.typeOpt ? this.groupId : '' // 分组id   修改的时候 必填 新增时 不传
      }
      const res = await this.$api.addOrUpdatemallGroup(params)
      if (res.data.code !== 200) {
        this.$message.error(`店铺分组${TypeName}失败: ${res.data.message}`)
        this.buttonStatus.addGroup = false
        return
      }
      this.$message.success('新增分组成功')
      this.getGroup()
      this.buttonStatus.addGroup = false
    },
    async deleteGroup() {
      if (this.buttonStatus.delGroup) {
        return
      }
      this.buttonStatus.delGroup = true
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择需要删除的分组')
        return
      }
      const ids = this.multipleSelection.map(item => {
        return item.id
      })
      const params = {
        groupId: ids.join(',')
      }
      const res = await this.$api.deleteGroup(params)
      if (res.data.code !== 200) {
        this.$message.error(`删除店铺分组失败: ${res.data.message}`)
        this.buttonStatus.delGroup = false
        return
      }
      this.getGroup()
      this.buttonStatus.delGroup = false
    },
    async getMallList() {
      const params = {
        'country': ''
      }
      console.log('1111111111111')
      this.$api.getMallList(params).then((res) => { // 数据未影响到任何操作可以使用异步
        if (res.data.code !== 200) {
          this.$message.error('获取店铺列表失败')
          return
        }
        this.mallList = res.data.data.map(item => {
          item.isSelected = false
          return item
        })
        this.mallListTemp = this.mallList
        console.log('this.mallListTemp', this.mallListTemp)
        this.$refs.plTable2.reloadData(this.mallListTemp)
      })
      console.log('3333333')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/mall-manager-less/mall-group.less';
</style>

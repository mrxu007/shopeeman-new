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
            <!-- <el-button type="primary" size="mini" :disabled="true">绑定运营</el-button>
            <el-button type="primary" size="mini" :disabled="true">绑定客服</el-button>
            <el-button type="primary" size="mini" :disabled="true">绑定跟单</el-button> -->
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="article">
      <el-table
        ref="plTable"
        v-loading="buttonStatus.search"
        height="calc(100vh - 140px)"
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
    <!-- 新增/修改店铺弹框 -->
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
              <p style="width: 72px">分组列表：</p>
              <el-select v-model="groupId" placeholder="" size="mini" @change="switchSelectMallStatus">
                <el-option v-for="(item, index) in groupList" :key="index" :value="item.id" :label="item.group_name" />
              </el-select>
            </li>
            <li>
              <p>{{ !typeOpt ? '新增分组：' : '修改分组名：' }}</p>
              <el-input v-model.trim="addGroupName" placeholder="" size="mini" />
            </li>
            <li class="btn">
              <el-button type="primary" size="mini" @click="addOrUpdatemallGroup">保存</el-button>
              <el-button v-show="!typeOpt" type="primary" size="mini" @click="openExcelDialog">Excel导入分组</el-button>
            </li>
            <li>
              <div class="text-log">
                <div class="text-log-content" />
              </div>
            </li>
          </ul>
        </div>
        <div class="con-rht">
          <ul>
            <li>
              <p>站点：</p>
              <el-select v-model="siteId" placeholder="" size="mini" @change="switchSelectMallStatus">
                <el-option label="全部" :value="0" />
                <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
              </el-select>
              <el-button type="primary" size="mini" @click="switchSelectMallStatus">刷新店铺</el-button>
            </li>
            <li>
              <p>店铺ID：</p>
              <el-input v-model.trim="systemId" placeholder="" size="mini" />
              <el-button type="primary" size="mini" @click="switchSelectMallStatus">查询</el-button>
              <el-checkbox v-model="isHide" @change="switchSelectMallStatus">隐藏已绑定分组店铺</el-checkbox>
            </li>
          </ul>
          <div class="con-rht-text">
            <span>绑定当前分组的店铺始终会显示</span>
          </div>
          <div class="con-rht-table">
            <u-table
              ref="plTable2"
              v-loading="buttonStatus.mallList"
              :height="420"
              use-virtual
              :header-cell-style="{
                backgroundColor: '#f5f7fa',
              }"
              :data-changes-scroll-top="false"
              :row-height="50"
              :border="false"
            >
              <!-- @table-body-scroll="tableScroll" -->
              <!-- <el-table-column align="center" type="selection" /> -->
              <u-table-column align="center" type="index" label="序号">
                <template v-slot="{ $index }">
                  {{ (currentPage - 1) * pageSize + $index + 1 }}
                </template>
              </u-table-column>
              <el-table-column align="center" prop="" label="站点">
                <template v-slot="{ row }">
                  {{ row.country | chineseSite }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="platform_mall_id" label="店铺ID" />
              <el-table-column align="center" label="店铺名称" show-overflow-tooltip>
                <template v-slot="{ row }">
                  {{ row.mall_alias_name ? row.mall_alias_name : row.platform_mall_name }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="group_name" label="已绑定分组" />
              <u-table-column align="center" label="操作">
                <template slot="header" slot-scope="scope">
                  <el-checkbox v-model="isSelectAll" label="全选" @change="selectAllEvent" />
                </template>
                <template v-slot="{ row }">
                  <el-button v-if="row.isSelected" size="mini" type="primary" style="margin: 0" @click="delbingingMall(row, true)">删除</el-button>
                  <el-button v-else size="mini" style="margin: 0" plain @click="addbingingMall(row, true)">添加</el-button>
                </template>
              </u-table-column>
            </u-table>
            <div class="pagination">
              <el-pagination
                background
                layout="total, sizes, prev, pager, next"
                :total="total"
                :current-page="currentPage"
                :page-sizes="[200, 500]"
                :page-size="pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </el-row>
    </el-dialog>
    <!-- Excal导入店铺分组 -->
    <el-dialog
      class="excel-dialog"
      title="Excel导入店铺分组"
      :visible.sync="ExcelDialogVisible"
      width="500px"
      :before-close="handleClose2"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal="false"
    >
      <ul>
        <li class="btn">
          <el-upload ref="importRef" accept=".xls, .xlsx" action="https://jsonplaceholder.typicode.com/posts/" :on-change="importTemplateEvent" :show-file-list="false" :auto-upload="false">
            <el-button :data="importTemplateData" size="mini" type="primary"> 批量导入 </el-button>
          </el-upload>
          <el-button type="primary" size="mini" @click="downloadTemplate('downExcelGroupTemplate')">下载模板</el-button>
          <span class="tip">请先下载数据模板再进行批量导入</span>
        </li>
        <li class="tip2">
          <p>导入信息：</p>
        </li>
        <li>
          <div class="text-log">
            <div class="text-log-content" v-html="consoleMsg" />
          </div>
        </li>
      </ul>
    </el-dialog>
  </el-row>
</template>

<script>
import { exportExcelDataCommon } from '../../../util/util'
import xlsx from 'xlsx'
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
        delGroup: false,
        mallList: false
      },

      // table
      multipleSelection: [],
      isSelectAll: false,

      // 店铺分组弹框
      typeOpt: '',
      editGroupDialogVisible: false,
      ExcelDialogVisible: false,
      groupId: '',
      siteId: 0,
      systemId: '',
      addGroupName: '',
      mallList: [],
      mallListTemp: [],
      countries: this.$filters.countries_option,
      isHide: false,
      bindMallList: [],
      bindMallListObj: {
        del: {},
        add: {}
      },
      firstReFresh: true,
      importTemplateData: '',

      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 200

    }
  },
  created() {
    this.getGroup()
    this.getMallList()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.currentPage = 1
      this.getMallList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getMallList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      done()
      this.reset()
      //   })
      //   .catch(_ => {})
    },
    handleClose2(done) {
      done()
      this.consoleMsg = ''
    },

    downloadTemplate(type) { // 下载修改店铺水印模板
      this[type]()
    },
    // 表格导入
    importTemplateEvent(file) {
      const files = { 0: file.raw }
      if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.writeLog('上传格式不对,请上传xls、xls格式的文件', false)
        return
      }
      if (files.length <= 0) {
        this.writeLog('表格为空', false)
        return
      }
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        const data = ev.target.result
        const workbook = xlsx.read(data, {
          type: 'binary'
        })
        const wsname = workbook.SheetNames[0] // 去第一张表
        let ws = xlsx.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成Json表格
        // console.log('ws表格里面的数据，且是json格式', ws)
        this.importTemplateData = ws
        ws = null
        this.writeLog(`正在读取中...`, true)
        this.importGroupName()
        // 重写数据
        this.$refs.importRef.value = ''
      }
      fileReader.readAsBinaryString(files[0])
    },
    async importGroupName() {
      const len = this.importTemplateData.length
      const importGroupObj = {}
      const mallListTempRelationId = {}
      this.mallListTemp.map(item => {
        mallListTempRelationId[`${item.platform_mall_id}`] = item.id
      })
      for (let i = 0; i < len; i++) {
        // if (this.isStop) {
        //   this.writeLog('取消导入', false)
        //   break
        // }
        const item = this.importTemplateData[i]
        if (!item['店铺ID(必填)']) {
          this.writeLog(`(${i + 1}/${len})item['店铺ID(必填)']`, false)
          continue
        }
        if (!item['分组名称(必填)']) {
          this.writeLog(`(${i + 1}/${len})分组名称(必填)`, false)
          continue
        }
        const mallID = item['店铺ID(必填)'] + ''
        const groupName = item['分组名称(必填)']
        if (!importGroupObj[`${groupName}`]) {
          importGroupObj[`${groupName}`] = []
        }
        importGroupObj[`${groupName}`].push(mallListTempRelationId[mallID])
      }
      const params = {}
      let res = null
      let index = 1
      const lens = Object.keys(importGroupObj).length

      for (const key in importGroupObj) {
        const isRepeatGroupName = this.groupList.find(item => item.group_name === key)
        if (isRepeatGroupName) {
          console.log('找到重复分组名', isRepeatGroupName)
          params['groupName'] = key // 分组名
          params['groupId'] = isRepeatGroupName.id // 分组id
          params['sysMallIds'] = importGroupObj[key].join(',')
          res = await this.$api.updateGroup(params)
        } else {
          console.log('创建新分组名', isRepeatGroupName)
          params['groupName'] = key // 分组名
          params['sysMallIds'] = importGroupObj[key].join(',')
          res = await this.$api.addGroup(params)
        }
        if (res.data.code !== 200) {
          this.$message.error()
          this.writeLog(`(${index}/${lens})店铺分组导入失败: ${res.data.message}`, false)
          this.buttonStatus.addGroup = false
          continue
        }
        this.writeLog(`(${index}/${lens})店铺分组名：【${key}】导入成功`, true)
        index++
      }
      this.getGroup()
      this.getMallList()
      this.writeLog(`导入结束`, true)
      this.importTemplateData = null
    },
    downExcelGroupTemplate() {
      let template = `<tr>
      <td style="width: 200px; text-align:left;">店铺名称<span style="color:red">(必填)</span></td>
      <td style="width: 200px; text-align:left;">店铺ID<span style="color:red">(必填)</span></td>
      <td style="width: 200px; text-align:left;">分组名称<span style="color:red">(必填)</span></td>
      </tr>`
      this.mallListTemp.map(item => {
        template += `
          <tr>
            <td style="width: 200px; text-align:left;">${item.platform_mall_name}</td>
            <td style="width: 200px; text-align:left;">${item.platform_mall_id}</td>
            <td style="width: 200px; text-align:left;">${item.group_name || ''}</td>
          </tr>
        `
      })
      exportExcelDataCommon('批量导入分组', template)
    },
    async openExcelDialog() {
      this.ExcelDialogVisible = true
    },
    openGroupDialog(row) {
      this.typeOpt = row
      this.editGroupDialogVisible = true
      this.reset()
      if (row) {
        this.groupId = row.id
      }
      // this.$refs.plTable2?.reloadData(this.mallListTemp)
      this.switchSelectMallStatus()
    },
    tableScroll({ scrollTop, scrollLeft, table, judgeFlse }) {
      // {scrollTop， scrollLeft, table, judgeFlse: 这个参数返回一个boolean值，为true则代表表格滚动到了底部了，false没有滚动到底部，必须开起大数据渲染模式才能有值哦}, event
      console.log(scrollTop, scrollLeft, table, judgeFlse)
    },
    delbingingMall(row, batchType) { // 删除绑定店铺
      const index = this.bindMallList.findIndex(item => {
        return item.id === row.id
      })
      row.isSelected = false
      if (!this.bindMallListObj['del'][row.id]) { // 用来更新壳数据
        this.bindMallListObj['del'][row.id] = row
        this.bindMallListObj['add'][row.id] ? delete this.bindMallListObj['add'][row.id] : '' // 如果删除操作查找到在添加存档里面有存档，就抹除
      }
      // console.log('bindMallListObj', this.bindMallListObj)
      this.bindMallList.splice(index, 1)
      if (batchType) {
        if (this.bindMallList.length === this.total) {
          this.isSelectAll = true
        } else {
          this.isSelectAll = false
        }
      }
    },
    addbingingMall(row, batchType) { // 添加绑定店铺
      this.bindMallList.push(row)
      if (!this.bindMallListObj['add'][row.id]) { // 用来更新壳数据
        this.bindMallListObj['add'][row.id] = row
        this.bindMallListObj['del'][row.id] ? delete this.bindMallListObj['del'][row.id] : '' // 如果添加操作查找到在删除存档里面有存档，就抹除
      }
      // console.log('bindMallListObj', this.bindMallListObj)
      row.isSelected = true
      if (batchType) {
        if (this.bindMallList.length === this.total) {
          this.isSelectAll = true
        } else {
          this.isSelectAll = false
        }
      }
    },
    selectAllEvent() {
      this.bindMallList = []
      if (this.isSelectAll) { // 全选
        this.mallListTemp.map(item => {
          this.addbingingMall(item, null)
        })
      } else { // 取消
        this.mallListTemp.map(item => {
          this.delbingingMall(item, null)
        })
      }
    },
    search() {
      let attrLen = 0
      this.mallListTemp = this.mallList
      let siteNameFlat = false
      let systemIdFlat = false
      if (this.siteId !== 0) { // 登陆账户名
        siteNameFlat = true
        attrLen++
      }
      if (this.systemId.trim()) { // 店铺名称
        systemIdFlat = true
        attrLen++
      }
      if (attrLen > 0) {
        this.mallListTemp = this.mallListTemp.filter(item => {
          let flat = 0
          if (siteNameFlat) {
            if (item['country'] === this.siteId) {
              flat++
            }
          }
          if (systemIdFlat) {
            if (this.systemId.indexOf(`${item.platform_mall_id}`) > -1) {
              flat++
            }
          }
          if (flat === attrLen) {
            return item
          }
        })
      }
      if (this.isHide) { // 3、显示隐藏已绑定店铺
        this.mallListTemp = this.mallListTemp.filter(item => !item.group_name)
      }
      //  this.$refs.plTable2?.reloadData(this.mallListTemp)
    },
    reset() {
      this.bindMallList = []
      this.bindMallListObj['del'] = {}
      this.bindMallListObj['add'] = {}
      this.isSelectAll = false
    },
    async switchSelectMallStatus() {
      this.reset()
      console.log('groupId', this.groupId)
      console.log('bindMallList', this.bindMallList)
      if (!this.typeOpt) { // 新增店铺
        this.mallList.map(item => { // 2、给原数组分组下对应店铺变更状态
          item.isSelected = false
        })
      } else {
        this.mallList.map(item => { // 2、给原数组分组下对应店铺变更状态
          if (item.mall_group_id === this.groupId) {
            this.addbingingMall(item)
          } else {
            item.isSelected = false
          }
        })
      }
      this.search() // 3、 对当前table里面的数据进行筛选

      // 5、始终将当前分组的选项显示  注意去重
      const mallListTempObj = {}
      this.mallListTemp.map(item => {
        mallListTempObj[`${item.platform_mall_id}`] = '1'
      })
      const noRepeat = []
      this.bindMallList.map(item => {
        const repeatData = mallListTempObj[item.platform_mall_id]
        if (!repeatData) {
          noRepeat.push(item)
        } else {
          console.log('找到重复的店铺信息', item.platform_mall_name)
        }
      })
      this.mallListTemp.push(...noRepeat)
      this.$nextTick(() => {
        this.$refs.plTable2.reloadData(this.mallListTemp)
      })
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
      console.log('this.groupList', this.groupList)
      this.buttonStatus.search = false
    },
    async addOrUpdatemallGroup() {
      if (this.buttonStatus.addGroup) {
        return
      }
      const addGroupName = this.addGroupName
      const typeOpt = this.typeOpt
      const TypeName = typeOpt ? '修改' : '添加'
      if (!addGroupName && !typeOpt) { // 新增分组名的验证
        this.$message.error('新增分组名不能为空')
        return
      }
      const isRepeatGroupName = this.groupList.find(item => item.group_name === addGroupName)
      if (isRepeatGroupName && !typeOpt) {
        this.$message.error('分组名已存在')
        return
      }
      this.buttonStatus.addGroup = true
      const ids = this.bindMallList.map(item => {
        return item.id
      })
      if (ids.length === 0 && typeOpt) { // 针对更新分组下的店铺验证
        this.$message.error('请至少勾选一个店铺')
        this.buttonStatus.addGroup = false
        return
      }
      const params = {}
      params['sysMallIds'] = ids.join(',') // 系统店铺id 多个用英文逗号隔开
      let res = null
      if (!typeOpt) {
        params['groupName'] = this.addGroupName // 分组名
        res = await this.$api.addGroup(params)
      } else {
        const groupName = this.groupList.find(item => item.id === this.groupId)?.group_name
        params['groupName'] = this.addGroupName || groupName // 分组名
        params['groupId'] = this.groupId // 分组id
        res = await this.$api.updateGroup(params)
      }
      if (res.data.code !== 200) {
        this.$message.error(`店铺分组${TypeName}失败: ${res.data.message}`)
        this.buttonStatus.addGroup = false
        return
      }
      this.$message.success(`店铺分组${TypeName}成功`)
      this.buttonStatus.addGroup = false
      this.editGroupDialogVisible = false
      this.addGroupName = ''
      this.updateClientData()
      this.getMallList()
      this.getGroup()
    },
    async updateClientData() {
      console.log('this.bindMallListObj', this.bindMallListObj)
      const addArr = this.bindMallListObj['add']
      const delArr = this.bindMallListObj['del']
      console.log('groupId', this.groupId)
      const groupId = this.groupId
      const groupName = this.groupList.find(item => item.id === groupId)?.group_name
      for (const key in delArr) {
        console.log('delArr', key, delArr[key])
        const mallId = delArr[key].platform_mall_id
        let res = await this.$appConfig.getGlobalCacheInfo('mallInfo', mallId)
        res = JSON.parse(res)
        if (res.GroupName === undefined || `${groupId}` === res.mall_group_id) {
          console.log('该店铺分组为当前分组，需要删除')
          res.GroupName = ''
          res.mall_group_id = 0
          this.$appConfig.updateInfoMall(mallId, JSON.stringify(res)) // 更新里面店铺的cookie （壳）
        }
      }
      for (const key in addArr) {
        console.log('addArr', key, addArr[key])
        const mallId = addArr[key].platform_mall_id
        let res1 = await this.$appConfig.getGlobalCacheInfo('mallInfo', mallId)
        res1 = JSON.parse(res1)
        if (res1.GroupName === undefined || `${groupId}` === res1.mall_group_id) {
          continue
        }
        console.log('该店铺为新添加分组')
        res1.GroupName = groupName
        res1.mall_group_id = `${groupId}`
        this.$appConfig.updateInfoMall(mallId, JSON.stringify(res1)) // 更新里面店铺的cookie （壳）
      }
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
      if (this.buttonStatus.mallList) {
        return
      }
      const params = {
        'country': '',
        page: this.currentPage,
        pageSize: this.pageSize
      }
      this.buttonStatus.mallList = true
      const res = await this.$api.getMallList(params)
      if (res.data.code !== 200) {
        this.$message.error('获取店铺列表失败')
        this.buttonStatus.mallList = false
        return
      }
      this.mallList = res.data.data.data.map(item => {
        item.isSelected = false
        return item
      })
      this.mallListTemp = this.mallList
      this.total = res.data.data.total
      console.log('this.mallListTemp', this.mallListTemp)
      this.buttonStatus.mallList = false

      // this.$refs.plTable2?.reloadData(this.mallListTemp)
    },
    writeLog(msg, success, setcolor) {
      if (!msg) return
      let color = success ? 'green' : 'red'
      if (setcolor) {
        color = setcolor
      }
      const time = this.dateFormat(new Date(Date.now()), 'hh:mm:ss')
      this.consoleMsg =
        `<p style="color:${color}">${time}:${msg}</p>` + this.consoleMsg
    },
    dateFormat(time, fmt) {
      var o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        S: time.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (time.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      return fmt
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/mall-manager-less/mall-group.less';
</style>

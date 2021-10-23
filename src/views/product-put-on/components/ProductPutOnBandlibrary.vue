<template>
  <div class="contaniner">
    <div class="operation">
      <div class="o-item">
        <span style="min-width:42px">站点：</span>
        <el-select v-model="form.site" placeholder="" size="mini" filterable>
          <el-option v-for="(item, index) in siteList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="o-item">
        <span style="min-width:84px">关键字类别：</span>
        <el-select v-model="form.type" placeholder="" size="mini" filterable>
          <el-option v-for="(item, index) in typeList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="o-item">
        <span style="min-width:57px">词来源：</span>
        <el-select v-model="form.source" placeholder="" size="mini" filterable>
          <el-option v-for="(item, index) in sourceList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="o-item">
        <span style="min-width:57px">关键词：</span>
        <el-input v-model="form.keyWord" size="mini" placeholder="请输入关键词" clearable />
      </div>
      <div class="o-item">
        <el-button type="primary" size="mini" @click="getBannedWordList()">查询</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible= true">添加</el-button>
        <el-button type="primary" size="mini" @click="batchDelete()">批量删除</el-button>
        <el-button type="primary" size="mini" @click="dialogBanWordVisible= true"> 批量导入 </el-button>
        <el-button type="primary" size="mini" @click="exportSearch()">导出数据</el-button>
      </div>
      <div class="o-item">
        <el-checkbox v-model="showConsole">隐藏日志</el-checkbox>
      </div>
    </div>
    <div class="table-content">
      <el-table
        v-loading="isloading"
        :data="tableData"
        height="calc(100vh - 145px)"
        :border="false"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" align="center" label="序号" min-width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column type="selection" align="center" min-width="55" />
        <el-table-column prop="country" align="center" label="站点" min-width="80" />
        <el-table-column prop="uid" align="center" label="词来源" min-width="80" />
        <el-table-column prop="type" align="center" label="词类型" min-width="80" />
        <el-table-column prop="word" align="center" show-overflow-tooltip label="关键词" min-width="180" />
        <el-table-column prop="created_at" align="center" show-overflow-tooltip label="添加时间" min-width="100" />

      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :current-page="page"
        :page-sizes="[10, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="dialog-content">
      <el-dialog
        title="添加禁售词"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        @close="dialogClose"
      >
        <span>
          <el-form label-position="right" label-width="80px">
            <el-form-item label="站点:">
              <el-select v-model="dialogSite" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in siteList.slice(1)" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="类别:">
              <el-select v-model="dialogType" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in typeList.slice(1)" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="关键词:">
              <el-input v-model="dialogkeyWord" size="mini" placeholder="请输入关键词" clearable />
            </el-form-item>
            <el-form-item>
              <el-button style="margin-right:20px" size="mini" type="primary" @click="addBannedWord()">确 定</el-button>
              <el-button type="primary" size="mini" @click="dialogVisible = false">取 消</el-button>
            </el-form-item>
          </el-form>
        </span>
      </el-dialog>
    </div>
    <div class="dialog-ban-content">
      <el-dialog
        title="批量导入禁售词"
        :visible.sync="dialogBanWordVisible"
        :close-on-click-modal="false"
        @close="dialogClose"
      >
        <div style="display: flex;">
          <el-upload ref="importRef" accept=".xls,.xlsx " action="https://jsonplaceholder.typicode.com/posts/" :on-change="importTemplateEvent" :show-file-list="false" :auto-upload="false">
            <el-button :data="importTemplateData" size="mini" type="primary" style="margin-right: 10px"> 批量导入 </el-button>
          </el-upload>
          <el-button type="primary" size="mini" @click="downloadTemplate()">下载模板</el-button>
        </div>
        <span>
          <div class="text-log-content" v-html="batchConsoleMsg" />
        </span>
        <span style="display: flex;justify-content:center;">
          <el-button type="primary" size="mini" @click="dialogBanWordVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      showConsole: true,
      consoleMsg: '', // 打印日志
      batchConsoleMsg: '', // 批量导入信息
      dialogBanWordVisible: false,
      dialogVisible: false,
      page: 1,
      total: 0,
      pageSize: 30,
      isloading: false,
      multipleSelection: [],
      importTemplateData: '', // 导入数据
      dialogSite: 'MY', // 弹框站点
      dialogType: '1', // 弹框关键词类别
      dialogkeyWord: '', // 弹框关键词
      form: {
        site: '', // 站点
        type: '0', // 关键词类别
        source: '0', // 词来源
        keyWord: '' // 关键词

      },
      sourceList: [
        { value: '0', label: '全部' },
        { value: '-1', label: '系统' },
        { value: '1', label: '用户' }
      ],
      typeList: [
        { value: '0', label: '全部' },
        { value: '1', label: '禁运词' },
        { value: '2', label: '品牌词' },
        { value: '3', label: '违规词' }
      ],
      siteList: [
        { value: '', label: '全部' },
        { value: 'MY', label: '马来站' },
        { value: 'TH', label: '泰国站' },
        { value: 'TW', label: '台湾站' },
        { value: 'PH', label: '菲律宾站' },
        { value: 'ID', label: '印尼站' },
        { value: 'SG', label: '新加坡站' },
        { value: 'VN', label: '越南站' }
      ],
      typeObj: {
        '禁运词': '1',
        '品牌词': '2',
        '违规词': '3'
      },
      siteObj: {
        '马来站': 'MY',
        '台湾站': 'TW',
        '新加坡站': 'SG',
        '菲律宾站': 'PH',
        '泰国站': 'TH',
        '越南站': 'VN',
        '印尼站': 'ID',
        '巴西站': 'BR'
      },
      tableData: [] // 表格数据
    }
  },
  mounted() {
    this.getBannedWordList()
  },
  methods: {
    // 导出excel
    async exportSearch() {
      const data = []
      const len = this.total % 10 === 0 ? (this.total / 10) : (Math.floor(this.total / 10) + 1)
      for (let index = 1; index <= len; index++) {
        const parmas = {
          page: index
        }
        try {
          const res = await this.$commodityService.getBannedWordList(parmas)
          const jsonData = JSON.parse(res).data.data
          jsonData.forEach(item => {
            data.push(item)
          })
        } catch (error) {
          console.log(error)
        }
      }
      if (!data?.length) {
        return this.$message('暂无导出数据')
      }
      let str =
      `<tr>
          <td>站点</td>
          <td>词来源</td>
          <td>词类型</td>
          <td>关键词</td>
          <td>添加时间</td>
      </tr>`
      data.forEach((item) => {
        item.created_at = item.created_at.replace('T', ' ').replace('Z', '')
        item.country = this.$options.filters.chineseSite(item.country)
        item.uid = item.uid === 0 ? '系统' : '用户'
        if (item.type === 2) {
          item.type = '品牌词'
        } else if (item.type === 3) {
          item.type = '违规词'
        } else {
          item.type = '禁运词'
        }
        str += `<tr>
        <td>${item.country ? item.country : '' + '\t'}</td>
        <td>${item.uid ? item.uid : '' + '\t'}</td>
        <td>${item.type ? item.type : '' + '\t'}</td>
        <td>${item.word ? item.word : '' + '\t'}</td>
        <td>${item.created_at ? item.created_at : '' + '\t'}</td>
        </tr>`
      })
      exportExcelDataCommon('品牌词库', str)
    },
    // 批量删除
    async batchDelete() {
      if (this.multipleSelection.length <= 0) return this.$message('请选择要删除的数据')
      for (let index = 0; index < this.multipleSelection.length; index++) {
        const element = this.multipleSelection[index]
        const res = await this.$commodityService.deleteDannedWord(element.id)
        const jsonData = JSON.parse(res)
        if (jsonData.code === 200) {
          this.$refs.Logs.writeLog(`违规词【${element.word}】删除成功`, true)
        } else {
          this.$refs.Logs.writeLog(`违规词【${element.word}】删除失败 ${jsonData.msg}`, false)
        }
      }
      this.showConsole = false
      this.getBannedWordList()
    },
    // 下载模板
    downloadTemplate() {
      const template = `
      <tr>
        <td style="width: 500px">站点(马来站,台湾站,新加坡站,菲律宾站,泰国站,越南站,印尼站,巴西站)<span style="color:red">（必填）</span></td>
        <td>关键词类型(违规词,品牌词,禁运词)<span style="color:red">（必填）</span></td>
        <td>关键词<span style="color:red">（必填）</span></td>
      </tr>
      <tr>
        <td>台湾站</td>
        <td>违规词</td>
        <td>食品</td>
      </tr>
      `
      exportExcelDataCommon('SHOPEE品牌词模板', template)
    },
    // 批量导入
    async batchImport() {
      const dataSum = this.importTemplateData.length
      if (dataSum <= 0) {
        this.batchWriteLog(`表格数据为空`, false)
        return
      }
      let successNum = 0
      let failNum = 0
      this.batchWriteLog('开始导入禁售词')
      for (let index = 0; index < dataSum; index++) {
        const element = this.importTemplateData[index]
        const countryVal = element['站点(马来站,台湾站,新加坡站,菲律宾站,泰国站,越南站,印尼站,巴西站)（必填）']
        const typeVal = element['关键词类型(违规词,品牌词,禁运词)（必填）']
        const wordVal = element['关键词（必填）']
        if (!countryVal || !typeVal || !wordVal || !this.typeObj[typeVal] || !this.siteObj[countryVal]) {
          failNum++
          this.batchWriteLog(`【${index + 1}】参数错误,请按要求填写`, false)
          continue
        }
        const parmas = {
          word: wordVal.toString(),
          country: this.siteObj[countryVal],
          type: this.typeObj[typeVal]
        }
        console.log('execlVal', parmas)
        try {
          const res = await this.$commodityService.addBannedWord(parmas)
          const jsonData = JSON.parse(res)
          console.log('batchImport', jsonData)
          if (jsonData.code === 200) {
            if (jsonData.data === 1) {
              this.batchWriteLog(`站点【${countryVal}】 禁售词【${wordVal}】 重复添加`, false)
              failNum++
              continue
            }
            successNum++
            this.batchWriteLog(`站点【${countryVal}】 添加禁售词【${wordVal}】 成功`, true)
          } else {
            this.$refs.Logs.writeLog(`站点【${countryVal}】 禁售词【${wordVal}】添加失败 ${jsonData.msg}`, false)
          }
        } catch (error) {
          this.batchWriteLog(`${error}`, false)
        }
      }
      this.getBannedWordList()
      this.batchWriteLog(`导入总数：${dataSum}，成功数：${successNum}，失败数：${failNum}`)
    },
    // 添加禁售词
    async addBannedWord() {
      if (this.dialogkeyWord.trim() === '') return this.$message('请填写禁售词')
      const parmas = {
        word: this.dialogkeyWord.trim(),
        country: this.dialogSite,
        type: this.dialogType
      }
      try {
        const res = await this.$commodityService.addBannedWord(parmas)
        const jsonData = JSON.parse(res)
        console.log(jsonData)
        if (jsonData.code === 200) {
          if (jsonData.data === 1) return this.$message.error('不可重复添加')
          this.$message.success('添加成功')
          this.getBannedWordList()
        } else {
          this.$message.success('添加失败' + jsonData.msg)
        }
      } catch (error) {
        console.log(error)
      }
      this.dialogVisible = false
    },
    // 获取数据列表
    async getBannedWordList() {
      this.isloading = true
      const parmas = {
        page: this.page,
        perpage: this.pageSize,
        word: this.form.keyWord.trim(),
        country: this.form.site,
        source: Number(this.form.source),
        type: Number(this.form.type)
      }
      try {
        const res = await this.$commodityService.getBannedWordList(parmas)
        const jsonData = JSON.parse(res)
        console.log('tableData', jsonData)
        if (jsonData.code === 200) {
          this.tableData = jsonData.data.data
          if (this.tableData) {
            this.tableData.map(item => {
              item.created_at = item.created_at.replace('T', ' ').replace('Z', '')
              item.country = this.$options.filters.chineseSite(item.country)
              item.uid = item.uid === 0 ? '系统' : '用户'
              if (item.type === 2) {
                item.type = '品牌词'
              } else if (item.type === 3) {
                item.type = '违规词'
              } else {
                item.type = '禁运词'
              }
            })
          }
          this.total = jsonData.data.total
          this.isloading = false
        } else {
          this.$message.error(`获取数据失败:${jsonData.msg}`)
          this.isloading = false
        }
      } catch (err) {
        this.tableData = []
        this.$message.error(`获取数据失败`)
        console.log(err)
        this.isloading = false
      }
    },
    // 表格导入
    importTemplateEvent(file) {
      const files = { 0: file.raw }
      if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$refs.Logs.writeLog('格式错误,请上传xls、xlsx格式的文件', false)
        this.showConsole = false
        return
      }
      if (files.length <= 0) {
        this.$refs.Logs.writeLog('表格为空', false)
        return
      }
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        const data = ev.target.result
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        const wsname = workbook.SheetNames[0] // 取第一张表
        let ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成Json表格
        this.importTemplateData = ws
        this.batchImport()
        ws = null
        this.$refs.importRef.value = ''
      }
      fileReader.readAsBinaryString(files[0])
    },
    batchWriteLog(msg, success = true) {
      if (!msg) return
      const color = success ? 'green' : 'red'
      this.batchConsoleMsg = `<p style="color:${color}; margin-top: 8px;">${msg}</p>` + this.batchConsoleMsg
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.page = val
      this.getBannedWordList()
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getBannedWordList()
    },
    dialogClose() {
      this.batchConsoleMsg = ''
      this.showConsole = true
      this.dialogkeyWord = ''
      this.dialogSite = 'MY'
      this.dialogType = '1'
    }
  }
}
</script>

<style lang="less">
@import '../../../module-less/product-put-less/band-library.less';
</style>

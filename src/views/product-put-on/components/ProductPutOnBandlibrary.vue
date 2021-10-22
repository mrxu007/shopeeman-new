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
        <el-input v-model="keyWord" size="mini" placeholder="请输入关键词" clearable />
      </div>
      <div class="o-item">
        <el-button type="primary" size="mini" @click="getChildUserList">查询</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible= true">添加</el-button>
        <el-button type="primary" size="mini" @click="batchDelete()">批量删除</el-button>
        <el-button type="primary" size="mini" @click="dialogBanWordVisible= true"> 批量导入 </el-button>
        <el-button type="primary" size="mini" @click="getChildUserList">导出数据</el-button>
      </div>
      <div class="o-item">
        <el-checkbox v-model="showConsole">隐藏日志</el-checkbox>
      </div>
    </div>
    <div class="table-content">
      <u-table
        v-loading="isloading"
        :data="tableData"
        :row-height="40"
        :border="false"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <u-table-column type="index" align="center" label="序号" min-width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </u-table-column>
        <u-table-column type="selection" align="center" min-width="55" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="站点" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="词来源" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="词类型" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="关键词" />
        <u-table-column prop="typeCn" align="center" show-overflow-tooltip label="添加时间" />
      </u-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :current-page="page"
        :page-sizes="[30, 50, 100, 200]"
        :page-size="30"
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
              <el-button style="margin-right:20px" size="mini" type="primary" @click="saveBanWord()">确 定</el-button>
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
      >
        <div style="display: flex;">
          <el-upload ref="importRef" accept=".xls, .xlsx" action="https://jsonplaceholder.typicode.com/posts/" :on-change="importTemplateEvent" :show-file-list="false" :auto-upload="false">
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
      <Logging :console-msg="consoleMsg" :show-console="showConsole" @changeshowConsole="changeshowConsole" />
    </div>
  </div>
</template>

<script>
const Logging = () => import('@/components/logging.vue')
import shpeeManMixin from '@/util/shpeeMan-mixin' // 公共方法
import { exportExcelDataCommon } from '../../../util/util'
export default {
  components: {
    Logging
  },
  mixins: [shpeeManMixin],
  data() {
    return {
      showConsole: true,
      consoleMsg: '', // 打印日志
      batchConsoleMsg: '', // 批量导入信息
      dialogBanWordVisible: false,
      dialogVisible: false,
      page: 1,
      total: 0,
      isloading: false,
      multipleSelection: [],
      keyWord: '', // 关键词
      dialogSite: 'MY', // 弹框站点
      dialogType: '1', // 弹框关键词类别
      dialogkeyWord: '', // 弹框关键词
      form: {
        site: '', // 站点
        type: '0', // 关键词类别
        source: '0'// 词来源
      },
      sourceList: [
        { value: '0', label: '全部' },
        { value: '1', label: '系统' },
        { value: '3', label: '用户' }
      ],
      typeList: [
        { value: '0', label: '全部' },
        { value: '1', label: '违规词' },
        { value: '2', label: '品牌词' },
        { value: '3', label: '禁运词' }
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
    this.getChildUserList()
  },
  methods: {
    // 批量删除
    batchDelete() {
      if (this.multipleSelection.length <= 0) return this.$message('请选择要删除的数据')
    },
    // 下载模板
    downloadTemplate() {
      const template = `
      <tr>
        <td>站点</td>
        <td>关键词类型</td>
        <td>关键词</td>
      </tr>`
      exportExcelDataCommon('SHOPEE品牌词模板', template)
    },
    // 批量导入
    batchImport() {
      const dataSum = this.importTemplateData.length
      if (dataSum <= 0) {
        this.writeLog('表格数据不能为空', false)
        this.showConsole = false
        return
      }
      let successNum = 0
      let failNum = 0
      console.log(this.importTemplateData)
      this.batchWriteLog('开始导入禁售词')
      for (let index = 0; index < dataSum; index++) {
        const element = this.importTemplateData[index]
        if (!element['站点'] || !element['关键词类型'] || !element['关键词']) {
          failNum++
          this.batchWriteLog(`表头错误`, false)
          continue
        }
        successNum++
        console.log(this.siteObj[element['站点']])
        this.batchWriteLog(`站点-${this.siteObj[element['站点']]} 添加禁售词"${element['关键词']}"-成功`, true)
      }
      this.batchWriteLog(`导入总数：${dataSum}，成功数：${successNum}，失败数：${failNum}`)
    },
    // 添加禁售词
    saveBanWord() {
      if (this.dialogkeyWord.trim() === '') return this.$message('请填写禁售词')
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
    batchWriteLog(msg, success = true) {
      if (!msg) return
      const color = success ? 'green' : 'red'
      this.batchConsoleMsg = `<p style="color:${color}; margin-top: 8px;">${msg}</p>` + this.batchConsoleMsg
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less">
@import '../../../module-less/product-put-less/band-library.less';
</style>

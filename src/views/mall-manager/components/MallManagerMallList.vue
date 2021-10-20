<template>
  <el-row class="contaniner">
    <el-row class="header">
      <el-col :span="8" class="header-lft">
        <ul>
          <li>
            <span>站点：</span>
            <el-select v-model="countryVal" placeholder="" size="mini" filterable>
              <el-option label="全部" :value="0" />
              <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </li>
          <li>
            <el-select v-model="mallSearchConditionVal" class="unnormal" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in mallSearchCondition" :key="index" :label="item.label" :value="item.value" />
            </el-select>
            <el-input v-model="mallSearchConditionInputVal" class="unnormal2" placeholder="" size="mini" />
          </li>
          <li>
            <span>店铺状态：</span>
            <el-select v-model="mallStausVal" placeholder="" size="mini" filterable>
              <el-option label="全部" :value="0" />
              <el-option v-for="(item, index) in mallStatus" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </li>
          <li>
            <span>店铺分组：</span>
            <el-select v-model="groupId" placeholder="" size="mini" filterable>
              <el-option label="全部" :value="0" />
              <el-option label="无分组" :value="-1" />
              <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item" />
            </el-select>
          </li>
        </ul>
      </el-col>
      <el-col :span="16" class="header-rht">
        <ul>
          <li>
            <el-checkbox>强制登录</el-checkbox>
            <el-button type="primary" size="mini">一键登录</el-button>
            <el-button type="primary" size="mini" @click="importMall('authorization')">导入店铺</el-button>
            <el-button type="primary" size="mini" @click="exportMall">导出店铺</el-button>
            <el-button type="primary" size="mini" @click="editWaterMall('update')">修改账号登录密码</el-button>
            <el-button type="primary" size="mini" @click="editWaterMall('edit')">修改店铺水印文字</el-button>
            <el-button type="primary" size="mini">设置店铺封面</el-button>
            <el-button type="primary" size="mini">设置退货地址</el-button>
            <el-button type="primary" size="mini">刷新登录状态</el-button>
            <el-button type="primary" size="mini">同步店铺信息</el-button>
            <el-button type="primary" size="mini">更新浏览器识别码</el-button>
            <el-button type="primary" size="mini">一键解绑店铺</el-button>
            <el-button type="primary" size="mini">开启店铺休假模式</el-button>
            <el-button type="primary" size="mini">关闭店铺休假模式</el-button>
            <el-button type="primary" size="mini">批量修改物流方式</el-button>
            <el-button type="primary" size="mini" @click="getMallList">查询</el-button>
            <el-checkbox>隐藏日志</el-checkbox>
            <p class="res-text">温馨提示：导入新加披站点店铺时，若账号为手机号时，填写模板时请填写完整(带有国家区号)的手机号，否则登录失败</p>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row id="article">
      <!-- @table-body-scroll="tableScroll" -->
      <el-table
        ref="plTable"
        height="calc(100vh - 216px)"
        :data="mallListTemp"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column align="center" prop="group_name" label="分组" />
        <el-table-column align="center" prop="" label="站点">
          <template v-slot="{ row }">
            {{ countriesObj[row.country] }}
          </template>
        </el-table-column>

        <el-table-column align="center" prop="mall_account_info" label="店铺真实名称">
          <template v-slot="{ row }">
            {{ row.mall_account_info.userRealName }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="platform_mall_id" label="店铺ID" />
        <el-table-column align="center" prop="good_mall_status" label="是否优质店铺">
          <template v-slot="{ row }">
            {{ row.good_mall_status === '-1' ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="platform_mall_name" label="店铺账号" />
        <el-table-column align="center" prop="watermark" label="店铺水印文字" />
        <el-table-column align="center" prop="item_limit" label="店铺额度" />
        <el-table-column align="center" prop="mall_alias_name" label="店铺别名" />
        <el-table-column align="center" prop="web_login_info" label="登录状态">
          <template v-slot="{ row }">
            {{ row.web_login_info ? '检测成功' : '等待检测...' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="mall_status" label="店铺状态">
          <template v-slot="{ row }">
            {{ mallStatusObj[row.mall_status] }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="授权日期" />
      </el-table>
    </el-row>
    <!-- 修改店铺水印弹框 -->
    <el-dialog
      class="water-dialog"
      :title="importType === 'edit' ? '修改店铺水印文字' : '修改账号登录密码'"
      :visible.sync="waterDialogVisible"
      width="612px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="header-opt">
        <el-upload ref="importRef" accept=".xls, .xlsx" action="https://jsonplaceholder.typicode.com/posts/" :on-change="importTemplateEvent" :show-file-list="false" :auto-upload="false">
          <el-button :data="importTemplateData" size="mini" type="primary" style="margin-right: 10px"> 批量导入 </el-button>
        </el-upload>
        <el-button type="primary" size="mini" @click="downloadTemplate">下载模板</el-button>
      </div>
      <p class="text-label">导入信息:</p>
      <div class="text-log">
        <div class="text-log-content" v-html="consoleMsg" />
      </div>
    </el-dialog>
    <!-- 导入店铺弹框 -->
    <el-dialog
      class="import-mall-dialog"
      title="店铺导入"
      :visible.sync="importMallDialogVisible"
      width="1184px"
      :before-close="handleClose2"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-row>
        <div class="header-dialog">
          <p>提示：1、每个店铺的SPC_EC与SPC_SC_TK数据都不一样，请注意区分</p>
          <p>2、登录识别码为选填项，可在授权异常时填写后重新进行授权操作，来源方式可前往店铺管理---》更新浏览器识别码---》下载教程中查看</p>
        </div>

        <div class="opt-dialog">
          <el-upload ref="importRef" accept=".xls, .xlsx" action="https://jsonplaceholder.typicode.com/posts/" :on-change="importTemplateEvent" :show-file-list="false" :auto-upload="false">
            <el-button :data="importTemplateData" size="mini" type="primary" style="margin-right: 10px"> 批量导入 </el-button>
          </el-upload>
          <el-button type="primary" size="mini" :loading="isStopDisable" @click="isStop = true">取消导入</el-button>
          <el-button type="primary" size="mini" @click="downloadTemplate">下载模板</el-button>
        </div>
        <div class="container-dialog">
          <div>
            <div class="text-log">
              <div class="text-log-content" v-html="consoleMsg" />
            </div>
            <div class="text-btn">
              <el-button type="primary" size="mini">店铺授权</el-button>
            </div>
          </div>
          <el-table
            ref="plTable2"
            height="calc(100vh - 430px)"
            :data="importMallListData"
            :header-cell-style="{
              backgroundColor: '#f5f7fa',
            }"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column align="center" type="selection" width="50" />
            <el-table-column align="center" type="index" label="序号" />
            <el-table-column align="center" prop="mallGroup" label="分组" />
            <el-table-column align="center" prop="" label="站点">
              <template v-slot="{ row }">
                {{ countriesObj[row.country] }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="platformMallName" label="店铺真实名称" />
            <el-table-column align="center" prop="accountName" label="店铺账号" />
            <!-- <el-table-column align="center" prop="watermark" label="店铺水印文字" /> -->
            <el-table-column align="center" prop="mallAliasName" label="店铺别名" />
            <el-table-column align="center" prop="web_login_info" label="登录识别码" width="200">
              <template v-slot="{ row }">
                <div>
                  <p>SPC_EC : <el-input v-model="row.spcMark.SPC_EC" size="mini" /></p>
                  <p>SPC_SC_TK : <el-input v-model="row.spcMark.SPC_SC_TK" size="mini" /></p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </el-dialog>
    <!-- 删除店铺弹框 -->
    <el-dialog class="import-mall-dialog" title="删除店铺" :visible.sync="delMallDialog" width="30%" :before-close="handleClose2" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-row>
        <ul>
          <li>
            <p>温馨提示：</p>
            <div>
              <p>1、解绑店铺的同时会删除店铺对应的订单信息，采购订单信息，仓库订单信息，无法恢复，请谨慎操作；</p>
              <p>2、请输入确认信息 【删除店铺，后果自负】</p>
            </div>
          </li>
          <li>
            <p>当前IP：</p>
            <el-input v-model="IPVal" size="mini" />
          </li>
          <li>
            <p>确认信息：</p>
            <el-input v-model="confirmVal" size="mini" />
          </li>
        </ul>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
import { getMallListAPI, updateWatermarkAPI, updateUserPasswordAPI } from '../../../module-api/mall-manager-api/mall-list-api'
import { delay, exportExcelDataCommon } from '../../../util/util'
import xlsx from 'xlsx'
export default {
  data() {
    return {
      height: 300,
      rowHeight: 50,
      consoleMsg: '',
      mallList: [],
      mallListTemp: [],
      importMallListData: [],
      multipleSelection: [],
      multipleSelection2: [],
      countryVal: 0,
      countries: [
        { label: '马来站', value: 'MY' },
        { label: '台湾站', value: 'TW' },
        { label: '新加坡站', value: 'SG' },
        { label: '菲律宾站', value: 'PH' },
        { label: '泰国站', value: 'TH' },
        { label: '越南站', value: 'VN' },
        { label: '印尼站', value: 'ID' },
        { label: '巴西站', value: 'BR' }
      ],
      countriesObj: {
        'MY': '马来站',
        'TW': '台湾站',
        'SG': '新加坡站',
        'PH': '菲律宾站',
        'TH': '泰国站',
        'VN': '越南站',
        'ID': '印尼站',
        'BR': '巴西站'
      },
      mallSearchConditionVal: 'mallName',
      mallSearchCondition: [
        {
          label: '店铺名称',
          value: 'mallName'
        },
        {
          label: '店铺ID',
          value: 'mallId'
        },
        {
          label: '店铺别名',
          value: 'mallAliasName'
        }
      ],
      mallSearchConditionInputVal: '',
      mallStausVal: 0,
      mallStatus: [
        { label: '正常', value: 1 }, // 0 1 都是正常
        { label: '冻结', value: 2 },
        { label: '禁止', value: 3 }
      ],
      mallStatusObj: {
        '0': '正常',
        '1': '正常',
        '2': '冻结',
        '3': '禁止'
      },
      groupId: 0,
      // dialog
      waterDialogVisible: false,
      importMallDialogVisible: false,
      delMallDialog: false,

      // 导入
      importTemplateData: '',
      IPVal: '',
      comfirmVal: '',
      isStop: false,
      isStopDisable: false,
      importType: null
    }
  },
  computed: {
    heightCalc() {
      const res = 'calc(100vh - 250px)'.replace('px', '')
      debugger
      return res
    }
  },
  watch: {
    isStop: {
      handler(val) {
        console.log('我监听到了isStop', val)
        if (val) {
          this.isStopDisable = true
        } else {
          this.isStopDisable = false
        }
        setTimeout(() => {
          this.isStop = false
          console.log('isStop还原', val)
        }, 10000)
      }
    }
  },
  created() {
    this.getMallList()
  },
  methods: {
    // tableScroll({ scrollTop, scrollLeft, table, judgeFlse }) {
    //   // {scrollTop， scrollLeft, table, judgeFlse: 这个参数返回一个boolean值，为true则代表表格滚动到了底部了，false没有滚动到底部，必须开起大数据渲染模式才能有值哦}, event
    //   console.log(scrollTop, scrollLeft, table, judgeFlse)
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
    },
    editWaterMall(val) {
      this.importType = val
      if (!this.multipleSelection.length && this.importType === 'edit') {
        this.$message.error('请先勾选店铺')
        return
      }
      this.waterDialogVisible = true
    },
    importMall(val) {
      this.importType = val
      this.importMallDialogVisible = true
    },
    exportMall() { // 下载店铺信息
      let template = `<tr>
        <td style="width: 200px; text-align:left;">分组</td>
        <td style="width: 200px; text-align:left;">站点</td>
        <td style="width: 200px; text-align:left;">店铺真实名称</td>
        <td style="width: 200px; text-align:left;">店铺ID</td>
        <td style="width: 200px; text-align:left;">店铺账号</td>
        <td style="width: 200px; text-align:left;">店铺水印文字</td>
        <td style="width: 200px; text-align:left;">店铺额度</td>
        <td style="width: 200px; text-align:left;">店铺别名</td>
        <td style="width: 200px; text-align:left;">店铺状态</td>
        <td style="width: 200px; text-align:left;">授权日期</td>
      </tr>`
      this.mallList.map(item => {
        template += `
        <tr>
          <td style="text-align:left;">${item.group_name || ''}</td>
          <td style="text-align:left;">${this.countriesObj[item.country] || ''}</td>
          <td style="text-align:left;">${item?.mall_account_info?.userRealName || ''}</td>
          <td style="text-align:left;">${item.platform_mall_id}</td>
          <td style="text-align:left;">${item.platform_mall_name}</td>
          <td style="text-align:left;">${item.watermark || ''}</td>
          <td style="text-align:left;">${item.item_limit || ''}</td>
          <td style="text-align:left;">${item.mall_alias_name || ''}</td>
          <td style="text-align:left;">${this.mallStatusObj[item.mall_status]}</td>
          <td style="text-align:left;">${item.created_at}</td>
        </tr>
        `
      })
      exportExcelDataCommon('店铺信息', template)
    },
    downloadTemplate() { // 下载修改店铺水印模板
      if (this.importType === 'edit') {
        let template = `<tr>
      <td style="width: 200px; text-align:left;">站点</td>
      <td style="width: 200px; text-align:left;">店铺名称</td>
      <td style="width: 200px; text-align:left;">店铺ID<span style="color:red">(必填)</span></td>
      <td style="width: 200px; text-align:left;">店铺文字水印</td>
      <td style="width: 200px; text-align:left;">分组</td>
      </tr>`
        this.multipleSelection.map(item => {
          template += `
        <tr>
          <td style="text-align:left;">${this.countriesObj[item.country]}</td>
          <td style="text-align:left;">${item.platform_mall_name}</td>
          <td style="text-align:left;">${item.platform_mall_id}</td>
          <td style="text-align:left;">${item.watermark || ''}</td>
          <td style="text-align:left;">${item.group_name || ''}</td>
        </tr>
        `
        })
        exportExcelDataCommon('修改店铺水印文字模板', template)
      } else if (this.importType === 'update') {
        const template = `<tr>
        <td style="width: 200px; text-align:left;">SHOPEE店铺ID<span style="color:red">(必填)</span></td>
        <td style="width: 200px; text-align:left;">店铺登录账号<span style="color:red">(必填)</span></td>
        <td style="width: 200px; text-align:left;">密码(必填)</td>
      </tr>`
        exportExcelDataCommon('修改店铺密码模板', template)
      } else {
        const template = `<tr>
      <td style="width: 400px">站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)<span style="color:red">(必填)</span></td>
      <td style="width: 300px">账号<span style="color:red">(必填)(如果为手机号，请不要加国家区号)</span></td>
      <td style="width: 200px">密码<span style="color:red">(必填)</span></span></td>
      <td style="width: 200px">店铺真实名称<span style="color:red">(必填)</span></span></td>
      <td style="width: 200px">分组<span style="color:orange">(选填)</span></td>
      <td style="width: 200px">店铺主体名称<span style="color:red">(需申IP隔离必填)</span></td>
      <td style="width: 200px">SPC_F<span style="color:red">(浏览识别码)</span></td>
      <td style="width: 200px">店铺别名<span style="color:orange">(选填)</span></td>
      </tr>`
        exportExcelDataCommon('SHOPEE店铺批量授权模板', template)
      }
    },
    async importEditWateNameOrUpdate() {
      const len = this.importTemplateData.length
      if (this.importType === 'edit') {
        const params = { 'lists': [] }
        // {"lists":[{"sysMallId":"12","watermark":"MarlonStowe"},{"sysMallId":"41","watermark":"Queen- fashion"}]}
        this.importTemplateData.forEach((item, index) => {
          if (item['店铺ID(必填)']) {
            const obj = {
              'sysMallId': item['店铺ID(必填)'],
              'watermark': item['店铺文字水印']
            }
            params['lists'].push(obj)
          } else {
            this.writeLog(`(${index + 1}/${len}),未找到店铺ID`)
          }
        })
        const res = await updateWatermarkAPI(params)
        if (res.code !== 200) {
          this.writeLog(`修改失败:${res.data}`, false)
          return
        }
        this.writeLog(`修改成功`, true)
      } else if (this.importType === 'update') {
        let succsessNum = 0
        let failNum = 0
        for (let index = 0; index < len; index++) {
          const params = {
            'sysMallId': '',
            'password': '',
            'username': ''
          }
          const item = this.importTemplateData[index]
          if (!item['SHOPEE店铺ID(必填)']) {
            this.writeLog(`(${index + 1}/${len})店铺ID不能为空`)
            continue
          }
          if (!item['店铺登录账号(必填)']) {
            this.writeLog(`(${index + 1}/${len})密码不能为空`)
            continue
          }
          if (!item['密码(必填)']) {
            this.writeLog(`(${index + 1}/${len})店铺账号不能为空`)
            continue
          }
          params['sysMallId'] = item['SHOPEE店铺ID(必填)']
          params['password'] = item['店铺登录账号(必填)']
          params['username'] = item['密码(必填)']
          // 满足条件后
          const res = await updateUserPasswordAPI(params)
          if (res.code !== 200) {
            this.writeLog(`(${index + 1}/${len})修改失败:${res.data}`, false)
            failNum++
            continue
          }
          succsessNum++
          this.writeLog(`(${index}/${len})修改成功`, true)
        }
        this.writeLog(`共导入店铺【${len}】个,成功【${succsessNum}】个, 失败【${failNum}】个`, true)
      }
      this.importTemplateData = null
    },
    async importMallName() {
      // 站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)（必填）
      // 账号（必填）(如果为手机号，请不要加国家区号)
      // 密码（必填）
      // 店铺真实名称（必填）
      // 分组(选填)
      // 店铺主体名称(需申IP隔离必填)
      // SPC_F(浏览识别码)
      // 店铺别名（选填）
      const len = this.importTemplateData.length
      const importMallArr = []
      for (let i = 0; i < len; i++) {
        if (this.isStop) {
          this.writeLog('取消导入', false)
          break
        }
        const item = this.importTemplateData[i]
        if (!item['站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)（必填）']) {
          this.writeLog(`(${i + 1}/${len})未找到站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)（必填）`, false)
          continue
        }
        if (!item['账号（必填）(如果为手机号，请不要加国家区号)']) {
          this.writeLog(`(${i + 1}/${len})未找到账号（必填）(如果为手机号，请不要加国家区号)`, false)
          continue
        }
        if (!item['密码（必填）']) {
          this.writeLog(`(${i + 1}/${len})未找到密码（必填）`, false)
          continue
        }
        if (!item['店铺真实名称（必填）']) {
          this.writeLog(`(${i + 1}/${len})未找到店铺真实名称（必填）`, false)
          continue
        }
        const country = this.countries.filter(item2 => item2.label === item['站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)（必填）'])
        if (!country.length) {
          this.writeLog(`(${i + 1}/${len})未找到[${item['站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)（必填）']}],站点填写有误`, false)
          continue
        }i
        const obj = {
          'platformMallId': '',
          'platformMallUid': '',
          'accountName': item['账号（必填）(如果为手机号，请不要加国家区号)'],
          'mallAccountInfo': { username: item['账号（必填）(如果为手机号，请不要加国家区号)'], password: item['密码（必填）'] },
          'mallGroup': item['分组(选填)'] || '',
          'itemLimit': '',
          'platformMallName': item['店铺真实名称（必填）'],
          'sysMallId': '',
          'mallAliasName': item['店铺别名（选填）'] || '',
          'country': country[0].value,
          'spcMark': {
            'SPC_EC': '',
            'SPC_SC_TK': ''
          }
        }
        importMallArr.push(obj)
      }
      this.importMallListData = importMallArr
      this.writeLog(`导入成功, 共【${this.importMallListData.length}】条数据`, true)
      this.importTemplateData = null
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
        if (this.importType === 'edit') {
          this.importEditWateNameOrUpdate()
        } else if (this.importType === 'authorization') {
          this.importMallName()
        } else if (this.importType === 'update') {
          this.importEditWateNameOrUpdate()
        } else {
          this.writeLog(`【${file.name}】该模板不符合要求,请下载指定模板`, false)
        }
        // 重写数据
        this.$refs.importRef.value = ''
      }
      fileReader.readAsBinaryString(files[0])
    },
    async getMallList() {
      const params = {}
      this.countryVal ? params['country'] = this.countryVal : ''
      this.mallSearchConditionInputVal ? params[this.mallSearchConditionVal] = this.mallSearchConditionInputVal : ''
      params['groupId'] = this.groupId
      this.mallStausVal ? params['isFilterFrozen'] = this.mallStausVal : ''
      const res = await getMallListAPI(params)
      if (res.code !== 200) {
        this.$message.error('获取店铺列表失败')
      }
      this.mallList = res.data
      this.mallListTemp = this.mallList
      console.log('this.malllist', this.mallList)
      // this.$refs.plTable && this.$refs.plTable.reloadData(this.mallList)
    },
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      done()
      this.consoleMsg = ''
      //   })
      //   .catch(_ => {})
    },
    handleClose2(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      done()
      this.importMallListData = []
      this.consoleMsg = ''
      //   })
      //   .catch(_ => {})
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
@import '../../../module-less/mall-manager-less/mall-list.less';
</style>

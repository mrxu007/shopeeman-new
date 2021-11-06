<template>
  <el-row class="contaniner">
    <el-row class="header">
      <div class="header-content">
        <el-col :span="4" class="header-lft">
          <ul>
            <li>
              <span>站点：</span>
              <el-select v-model="countryVal" placeholder="" size="mini" filterable class="unnormal2" @change="getGroup">
                <el-option label="全部" :value="0" />
                <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>店铺状态：</span>
              <el-select v-model="mallStausVal" placeholder="" size="mini" filterable class="unnormal2">
                <el-option label="全部" :value="0" />
                <el-option v-for="(item, index) in mallStatus" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>店铺分组：</span>
              <el-select v-model="groupId" placeholder="" size="mini" filterable class="unnormal2">
                <el-option label="全部" :value="0" />
                <el-option label="无分组" :value="-1" />
                <el-option v-for="(item, index) in groupList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <el-select v-model="mallSearchConditionVal" class="unnormal" placeholder="" size="mini">
                <el-option v-for="(item, index) in mallSearchCondition" :key="index" :label="item.label" :value="item.value" />
              </el-select>
              <el-input v-model="mallSearchConditionInputVal" class="unnormal2" placeholder="" size="mini" />
            </li>
          </ul>
        </el-col>
        <el-col :span="20" class="header-rht">
          <el-row class="btn-row">
            <el-checkbox>强制登录</el-checkbox>
            <el-button type="primary" size="mini" :loading="buttonStatus.login" @click="alotOfLogined(null)">一键登录</el-button>
            <el-button type="primary" size="mini" @click="importMall('authorization')">导入店铺</el-button>
            <el-button type="primary" size="mini" @click="exportMall">导出店铺</el-button>
            <el-button type="primary" size="mini" @click="editWaterMall('update')">修改账号登录密码</el-button>
            <el-button type="primary" size="mini" @click="editWaterMall('edit')">修改店铺水印文字</el-button>
            <el-button type="primary" size="mini" disabled>设置店铺封面</el-button>
          </el-row>
          <el-row class="btn-row">
            <el-button type="primary" size="mini" :loading="buttonStatus.refresh" @click="refreshStatus">刷新登录状态</el-button>
            <el-button type="primary" size="mini" :loading="buttonStatus.async" @click="handlerSelectTableOperating('asyncMallData')">同步店铺信息</el-button>
            <el-button type="primary" size="mini" disabled>更新浏览器识别码</el-button>
            <el-button type="primary" size="mini" @click="openDeleteMallDialog">一键解绑店铺</el-button>
            <el-button type="primary" size="mini" :loading="buttonStatus.openVacation" :disabled="buttonStatus.closeVacation" @click="closeOrOpenMallVacation(true)">开启店铺休假模式</el-button>
            <el-button type="primary" size="mini" :loading="buttonStatus.closeVacation" :disabled="buttonStatus.openVacation" @click="closeOrOpenMallVacation(false)">关闭店铺休假模式</el-button>
          </el-row>
          <el-row class="btn-row">
            <el-button type="primary" size="mini" @click="getMallList">查询</el-button>
            <el-button type="primary" size="mini" disabled>批量修改物流方式</el-button>
            <el-button type="primary" size="mini" disabled>设置退货地址</el-button>
            <el-checkbox v-model="hideConsole">隐藏日志</el-checkbox>
            <li style="display: inline-block">
              <el-progress v-show="isShowProgress" style="width: 230px" :text-inside="true" :stroke-width="16" :percentage="percentage" status="success" />
            </li>
          </el-row>
          <span class="res-text">温馨提示：导入新加披站点店铺时，若账号为手机号时，填写模板时请填写完整(带有国家区号)的手机号，否则登录失败</span>
        </el-col>
      </div>
    </el-row>
    <el-row id="article">
      <!-- @table-body-scroll="tableScroll" -->
      <el-table
        ref="plTable"
        v-loading="buttonStatus.mallList"
        height="calc(100vh - 245px)"
        :data="mallListTemp"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :row-style="{
          color: 'black',
          height: '50px',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column align="center" prop="group_name" label="分组" />
        <el-table-column align="center" prop="" label="站点">
          <template v-slot="{ row }">
            {{ row.country | chineseSite }}
          </template>
        </el-table-column>

        <el-table-column align="center" prop="mall_account_info" label="店铺真实名称">
          <template v-slot="{ row }">
            {{ row.mall_account_info.userRealName || row.platform_mall_name }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="platform_mall_id" label="店铺ID" />
        <el-table-column align="center" prop="good_mall_status" label="是否优质店铺">
          <template v-slot="{ row }">
            {{ row.good_mall_status === '-1' ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="platform_mall_name" label="店铺账号">
          <template v-slot="{ row }">
            {{ row.mall_account_info.username }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="watermark" label="店铺水印文字" />
        <el-table-column align="center" prop="item_limit" label="店铺额度" />
        <el-table-column align="center" prop="mall_alias_name" label="店铺别名" />
        <el-table-column align="center" prop="web_login_info" label="登录状态" show-overflow-tooltip="">
          <template v-slot="{ row }">
            <span v-html="row.LoginInfo" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="mall_status" label="店铺状态">
          <template v-slot="{ row }">
            {{ mallStatusObj[row.mall_status] }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="授权日期" min-width="120px" />
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
          <el-button type="primary" size="mini" :loading="isStopDisable" :disabled="!buttonStatus.login" @click="isStop = true">取消导入</el-button>
          <el-button type="primary" size="mini" @click="downloadTemplate">下载模板</el-button>
        </div>
        <div class="container-dialog">
          <div>
            <div class="text-log">
              <div class="text-log-content" v-html="consoleMsg" />
            </div>
            <div class="text-btn">
              <el-button type="primary" size="mini" :loading="buttonStatus.login" @click="mallAuthorization">店铺授权</el-button>
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
            <el-table-column align="center" prop="group_name" label="分组" />
            <el-table-column align="center" prop="" label="站点">
              <template v-slot="{ row }">
                {{ row.country | chineseSite }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="userRealName" label="店铺真实名称" />
            <el-table-column align="center" prop="platform_mall_name" label="店铺账号" />
            <!-- <el-table-column align="center" prop="watermark" label="店铺水印文字" /> -->
            <el-table-column align="center" prop="mall_alias_name" label="店铺别名" />
            <el-table-column align="center" label="登录识别码" width="200">
              <template v-slot="{ row }">
                <div>
                  <p>SPC_EC : <el-input v-model="row.SPC_EC" size="mini" /></p>
                  <p>SPC_SC_TK : <el-input v-model="row.SPC_SC_TK" size="mini" /></p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </el-dialog>
    <!-- 解绑店铺弹框 -->
    <el-dialog
      class="del-mall-dialog"
      title="解绑店铺"
      :show-close="false"
      :visible.sync="delMallDialog"
      width="410px"
      :before-close="handleClose2"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="contanier-dialog">
        <h3>温馨提示</h3>
        <div class="text">
          <p>1、解绑店铺的同时会删除店铺对应的订单信息，采购订单信息，仓库订单信息，无法恢复，请谨慎操作；</p>
          <p>2、请输入确认信息 【删除店铺，后果自负】</p>
        </div>
        <ul>
          <li>
            <p>当前IP：</p>
            <p class="li-first">{{ IPVal }}</p>
          </li>
          <li>
            <p>确认信息：</p>
            <el-input v-model="comfirmText" size="mini" placeholder="删除店铺，后果自负" />
          </li>
          <div class="text2">
            删除店铺的同时删除店铺下的订单信息
            <el-radio-group v-model="delOrderType">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是(无法恢复)</el-radio>
            </el-radio-group>
          </div>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel2">取 消</el-button>
        <el-button type="primary" size="mini" @click="chekedDelMall">确 定</el-button>
      </span>
    </el-dialog>
    <Logs ref="Logs" v-model="hideConsole" clear />
  </el-row>
</template>

<script>
import MallListAPI from '../../../module-api/mall-manager-api/mall-list-api'
import { delay, exportExcelDataCommon } from '../../../util/util'
import { batchOperation } from '@/util/util'

import xlsx from 'xlsx'
export default {
  data() {
    return {
      height: 300,
      rowHeight: 50,
      mallListAPIInstance: new MallListAPI(this),
      consoleMsg: '',
      buttonStatus: {
        mallList: false,
        login: false,
        delMall: false,
        refresh: false,
        async: false,
        openVacation: false,
        closeVacation: false
      },
      forceLogin: false,
      mallList: [],
      mallListTemp: [],

      importMallListData: [],
      multipleSelection: [],
      multipleSelection2: [],
      countryVal: 0,
      countries: this.$filters.countries_option,
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
        0: '正常',
        1: '正常',
        2: '冻结',
        3: '禁止'
      },
      groupId: 0,
      groupList: [],
      // dialog
      waterDialogVisible: false,
      importMallDialogVisible: false,
      delMallDialog: false,

      // 导入
      importTemplateData: '',
      IPVal: '',
      comfirmText: '',
      delOrderType: 1,
      isStop: false,
      isStopDisable: false,
      importType: null,
      hideConsole: true,
      isShowProgress: true,
      percentage: 0,
      addPercentage: 0
    }
  },
  computed: {},
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
    this.getGroup()
    this.getIP()
  },
  methods: {
    // tableScroll({ scrollTop, scrollLeft, table, judgeFlse }) {
    //   // {scrollTop， scrollLeft, table, judgeFlse: 这个参数返回一个boolean值，为true则代表表格滚动到了底部了，false没有滚动到底部，必须开起大数据渲染模式才能有值哦}, event
    //   console.log(scrollTop, scrollLeft, table, judgeFlse)
    // },
    // async test() {
    //   const res = await this.$appConfig.getUserConfig()
    // },
    cancel2() {
      this.delMallDialog = false
      this.reset()
    },
    openDeleteMallDialog() {
      const len = this.multipleSelection.length
      if (!len) {
        this.$message.error('请选择店铺')
        return
      }
      if (len > 10) {
        this.$message.error(`解绑店铺最多为：10个/次, 当前选择店铺数为：${len}个`)
        return
      }
      this.delMallDialog = true
    },
    getIP() {
      this.$BaseUtilService
        .getAddressIP()
        .then((res) => {
          this.IPVal = res
        })
        .catch((e) => {
          console.log('getIP', e)
        })
    },
    async chekedDelMall() {
      const text = this.comfirmText.replace(/,/, '，').trim() === '删除店铺，后果自负'
      if (!text) {
        this.$message.error('请填写正确的确认信息再操作')
        return
      }
      this.buttonStatus.delMall = true
      const ids = this.multipleSelection.map((item) => {
        return item.id
      })
      if (!this.IPVal) {
        return this.$message.error('未获取到IP地址,无法操作')
      }
      const params = {
        sysMallIds: ids.toString(),
        ip: this.IPVal,
        isPushToXzy: this.delOrderType
      }
      const res = await this.$api.deleteBindMall(params)
      if (res.data.code !== 200) {
        this.$message.error(`解绑店铺失败:  ${res.data.message}`)
        this.buttonStatus.delMall = false
        return
      }
      this.$message.success('解绑店铺成功')
      this.getMallList()
      this.cancel2()
      this.buttonStatus.delMall = false
    },
    reset() {
      this.comfirmText = ''
      this.delOrderType = 1
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('this.multipleSelection', this.multipleSelection)
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
    },
    async getGroup() {
      const params = {}
      this.countryVal ? params['country'] = this.countryVal : ''
      const res = await this.mallListAPIInstance.getGroup(params)
      if (res.code !== 200) {
        this.$message.error('获取店铺分组失败')
        return
      }
      this.groupList = res.data
    },
    mallAuthorization() {
      // 店铺授权
      if (!this.importMallListData.length) {
        return this.$message.error('请导入店铺')
      }
      if (!this.multipleSelection2.length) {
        return this.$message.error('请勾选店铺')
      }
      this.alotOfLogined(this.multipleSelection2)
    },
    editWaterMall(val) {
      this.importType = val
      if (!this.multipleSelection.length && this.importType === 'edit') {
        this.$message.error('请先勾选店铺')
        return
      }
      this.waterDialogVisible = true
    },
    async refreshStatus() {
      if (!this.multipleSelection.length) {
        return this.$message.error('请选择店铺')
      }
      const len = this.multipleSelection.length
      const mall = this.multipleSelection
      // for(let )
      this.buttonStatus.refresh = true
      mall.forEach(async(item, index) => {
        const res = await this.mallListAPIInstance.getUserInfo(item)
        if (res.code === 200) {
          item.LoginInfo = `<p style="color: green">登录成功</p>`
        } else {
          item.LoginInfo = `<p style="color: red">未登录(已掉线)</p>`
        }
        if (index === len - 1) {
          this.buttonStatus.refresh = false
        }
      })
    },

    // 勾选表格操作
    handlerSelectTableOperating(OperatingName) {
      if (this.multipleSelection.length) {
        this[OperatingName](this.multipleSelection)
      } else {
        this[OperatingName](this.mallList)
      }
    },
    async asyncMallData(data) {
      if (!data) {
        return this.$message('暂无同步数据')
      }
      this.buttonStatus.async = true
      this.hideConsole = false
      const len = data.length
      this.percentage = 0
      this.addPercentage = 100 / len
      const res = await batchOperation(data, this.asyncMallInfo)
      console.log(1, '完成', res)
      this.percentage = 100
      this.hideConsole = true
      this.buttonStatus.async = false
    },
    async  asyncMallInfo(item, count = { count: 1 }) {
      const platform_mall_name = item.platform_mall_name
      try {
        console.log('item - count', item, count)
        this.$refs.Logs.writeLog(`开始同步店铺【${platform_mall_name}】信息`, true)
        const res1 = this.mallListAPIInstance.getMallInfo(item)
        const res2 = this.mallListAPIInstance.getMallGoodsAmount(item)
        const res3 = await Promise.all([res1, res2])
        if (res3[0].code !== 200) {
          this.$refs.Logs.writeLog(`同步店铺【${platform_mall_name}】信息失败：${res3[0].data}`, false)
          return
        }
        const data = res3[0].data
        const params = {
          'sysMallId': item.id,
          'platformMallName': data.shop_name,
          'mallStatus': data.shop_status,
          'itemLimit': 500,
          'userEmail': data.user_email,
          'phone': data.phone,
          'userRealName': data.username
        }
        res3[1].code === 200 ? params['itemLimit'] = res3[1].data.count_for_limit : ''
        const res = await this.mallListAPIInstance.updateMallInfo(params)
        if (res.code !== 200) {
          this.$refs.Logs.writeLog(`同步店铺【${platform_mall_name}】信息失败：${res.data}`, false)
          return
        }
        this.$refs.Logs.writeLog(`同步店铺【${platform_mall_name}】信息成功`, true)
      } catch (e) {
        console.log('错误', e)
        this.$refs.Logs.writeLog(`同步店铺【${platform_mall_name}】信息失败：${e}`, false)
      } finally {
        --count.count
        this.percentage += this.addPercentage
      }
    },
    async closeOrOpenMallVacation(isOpen) {
      const len = this.multipleSelection.length
      const mall = this.multipleSelection
      if (!len) {
        return this.$message.error('请选择店铺')
      }
      if (isOpen) {
        this.buttonStatus.openVacation = true
      } else {
        this.buttonStatus.closeVacation = true
      }
      this.hideConsole = false
      mall.forEach(async(item, index) => {
        const platform_mall_name = item.platform_mall_name
        const res = await this.mallListAPIInstance.closeOrOpenMallVacation(item, isOpen)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`店铺【${platform_mall_name}】休闲模式${isOpen ? '开启' : '关闭'}成功`, true)
        } else {
          this.$refs.Logs.writeLog(`店铺【${platform_mall_name}】休闲模式${isOpen ? '开启' : '关闭'}失败：${res.data}`, false)
        }
        if (index === len - 1) {
          this.buttonStatus.openVacation = false
          this.buttonStatus.closeVacation = false
          this.hideConsole = true
        }
      })
    },
    async alotOfLogined(mallArr) {
      if (this.buttonStatus.login) {
        return
      }
      let flat = 1 // 默认一键登陆
      let len = null
      let selectMall = null
      if (mallArr) {
        // 导入店铺
        len = mallArr.length
        selectMall = mallArr
        flat = 2
      } else {
        // 一键登陆
        len = this.multipleSelection.length
        selectMall = this.multipleSelection
      }
      if (!len) {
        this.$message.error('请先勾选店铺')
        return
      }
      this.buttonStatus.login = true
      let successNum = 0
      for (let i = 0; i < len; i++) {
        const item = selectMall[i]
        const platform_mall_name = item.platform_mall_name
        flat === 1 ? item.LoginInfo = '正在登陆中...' : this.writeLog(`(${i + 1}/${len})账号【${platform_mall_name}】开始授权`, true)
        // 0、检测
        if (!this.forceLogin && flat === 1) {
          // 不强制登陆并且为一键登陆时, 走检测接口
          const userInfo = await this.mallListAPIInstance.getUserInfo(item)
          if (userInfo.code === 200) {
            item.LoginInfo = `<p style="color: green">登录成功</p>`
            continue
          }
        }

        // 1、shopeeMan官方登录
        const res = await this.$shopeemanService.login(item, flat)
        if (res.code !== 200) {
          flat === 1 ? (item.LoginInfo = `<p style="color: red">登录失败：${res.data}</p>`) : this.writeLog(`(${i + 1}/${len})账号【${platform_mall_name}】授权失败：${res.data}`, false)
          continue
        }
        const mallId = res.data.mallId // 平台店铺ID
        const mallUId = res.data.mallUId // 平台卖家ID
        let mallDataInfo = null
        if (flat === 1) {
          // 一键登陆
          // 获取壳内店铺信息,组装
          const res1_flat1 = await this.$appConfig.getGlobalCacheInfo('mallInfo', mallId)
          mallDataInfo = JSON.parse(res1_flat1)
          const Cookie = res.data.Cookie
          mallDataInfo.web_login_info['SPC_EC'] = Cookie.SPC_EC
          mallDataInfo.web_login_info['sso'] = Cookie.SPC_EC
          mallDataInfo.web_login_info['SPC_SC_TK'] = Cookie.SPC_SC_TK
          mallDataInfo.web_login_info['token'] = Cookie.SPC_SC_TK
          mallDataInfo.web_login_info['ShopeeUid'] = Cookie.ShopeeUid
          mallDataInfo.web_login_info['shopeeuid'] = Cookie.ShopeeUid
          mallDataInfo.web_login_info['shopid'] = Cookie.shopid
          // 2、更新壳信息
          await this.$appConfig.updateInfoMall(mallId, JSON.stringify(mallDataInfo)) // 更新里面店铺的cookie （壳）
        } else { // 导入店铺
          // 2、更新壳信息
          mallDataInfo = res.data.mallInfo_new
          console.log(mallId, JSON.stringify(mallDataInfo))
          await this.$appConfig.updateInfoMall(mallId, JSON.stringify(mallDataInfo)) // 更新里面店铺的cookie （壳）
          // 4、判断物流信息是否是普通店铺 (店铺导入独有)
          const res3 = await this.mallListAPIInstance.isNormalMall(mallDataInfo)
          if (res3.code !== 200 || !res3.data) {
            this.writeLog(`(${i + 1}/${len})账号【${platform_mall_name}】授权失败：该账号属于跨境店铺`, false)
            continue
          }
          // 5、获取信息额度 (店铺导入独有)
          const params2 = {
            platformMallId: mallId,
            platformMallUid: mallUId,
            mallAccountInfo: JSON.stringify(item.mall_account_info),
            mallGroup: item.group_name,
            itemLimit: 500,
            platformMallName: platform_mall_name,
            mallAliasName: item.mall_alias_name,
            mallMainName: item.MallMainName,
            country: item.country,
            SPC_EC: item.SPC_EC,
            SPC_SC_TK: item.SPC_SC_TK,
            mall_type: 1 // 写死1 普通店铺
          }
          const res4 = await this.mallListAPIInstance.getMallGoodsAmount(mallDataInfo)
          res4.code === 200 ? (params2['itemLimit'] = res4.data.count_for_limit) : ''
          // 6、上报店铺信息(店铺导入独有) 如果是导入店铺,在上报cookie之前应该先上报店铺
          const res5 = await this.mallListAPIInstance.saveMallAuthInfo(params2) // 导入店铺信息（服务端）
          if (res5.code !== 200) {
            this.writeLog(`(${i + 1}/${len})账号【${platform_mall_name}】授权失败：${res5.data}`, false)
            continue
          }
        }
        // 7、上报cookie信息
        const params = {
          mallId: mallId,
          webLoginInfo: JSON.stringify(res.data.Cookie)
        }
        const res6 = await this.mallListAPIInstance.uploadMallCookie(params) // 上报店铺信息cookie (服务端)
        if (res6.code !== 200) {
          // console.log('店铺上传失败', res.data)
          this.writeLog(`(${i + 1}/${len})账号【${platform_mall_name}】授权失败：上报店铺信息cookie失败`, false)
          continue
        }
        successNum++
        flat === 1 ? (item.LoginInfo = '<p style="color: green">登录成功</p>') : this.writeLog(`(${i + 1}/${len})账号【${platform_mall_name}】授权成功`, true)
      }
      if (flat === 2 && successNum) { // 导入店铺、并且有导入成功的店铺 满足刷新
        this.getMallList()
      }
      this.buttonStatus.login = false
    },
    importMall(val) {
      this.importType = val
      this.importMallDialogVisible = true
    },
    exportMall() {
      // 下载店铺信息
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
      this.mallList.map((item) => {
        template += `
        <tr>
          <td style="text-align:left;">${item.group_name || ''}</td>
          <td style="text-align:left;">${this.$filters.chineseSite(item.country) || ''}</td>
          <td style="text-align:left;">${item?.mall_account_info?.userRealName || item.platform_mall_name || ''}</td>
          <td style="text-align:left;">${item.platform_mall_id}</td>
          <td style="text-align:left;">${item?.mall_account_info?.username}</td>
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
    downloadTemplate() {
      // 下载修改店铺水印模板
      if (this.importType === 'edit') {
        let template = `<tr>
      <td style="width: 200px; text-align:left;">站点</td>
      <td style="width: 200px; text-align:left;">店铺名称</td>
      <td style="width: 200px; text-align:left;">店铺ID<span style="color:red">(必填)</span></td>
      <td style="width: 200px; text-align:left;">店铺文字水印</td>
      <td style="width: 200px; text-align:left;">分组</td>
      </tr>`
        this.multipleSelection.map((item) => {
          template += `
        <tr>
          <td style="text-align:left;">${this.$filters.chineseSite(item.country)}</td>
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
        const params = { lists: [] }
        // {"lists":[{"sysMallId":"12","watermark":"MarlonStowe"},{"sysMallId":"41","watermark":"Queen- fashion"}]}
        this.importTemplateData.forEach((item, index) => {
          if (item['店铺ID(必填)']) {
            const sysMallId = this.mallListAPIInstance.getMallID(item['店铺ID(必填)'] + '')
            if (sysMallId) {
              const obj = {
                sysMallId,
                watermark: item['店铺文字水印']
              }
              params['lists'].push(obj)
            } else {
              this.writeLog(`(${index + 1}/${len}) 店铺平台ID填写有误`)
            }
          } else {
            this.writeLog(`(${index + 1}/${len}) 店铺ID(必填)`)
          }
        })
        const res = await this.mallListAPIInstance.updateWatermark(params)
        if (res.code !== 200) {
          this.writeLog(`修改失败:${res.data}`, false)
          return
        }
        this.getMallList()
        this.writeLog(`修改成功`, true)
      } else if (this.importType === 'update') {
        let succsessNum = 0
        let failNum = 0
        for (let index = 0; index < len; index++) {
          const params = {
            sysMallId: '',
            password: '',
            username: ''
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
          const sysMallId = this.mallListAPIInstance.getMallID(item['SHOPEE店铺ID(必填)'] + '')
          if (!sysMallId) {
            this.writeLog(`(${index + 1}/${len}) 店铺平台ID填写有误`)
            continue
          }
          params['sysMallId'] = sysMallId
          params['username'] = item['店铺登录账号(必填)']
          params['password'] = item['密码(必填)']
          // 满足条件后
          const res = await this.mallListAPIInstance.updateUserPassword(params)
          if (res.code !== 200) {
            this.writeLog(`(${index + 1}/${len})修改失败:${res.data}`, false)
            failNum++
            continue
          }
          succsessNum++
          this.writeLog(`(${index + 1}/${len})修改成功`, true)
        }
        this.writeLog(`共导入店铺【${len}】个,成功【${succsessNum}】个, 失败【${failNum}】个`, true)
        this.getMallList()
      }
      this.importTemplateData = null
    },
    async importMallName() {
      // 站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)(必填)
      // 账号(必填)(如果为手机号，请不要加国家区号)
      // 密码(必填)
      // 店铺真实名称(必填)
      // 分组(选填)
      // 店铺主体名称(需申IP隔离必填)
      // SPC_F(浏览识别码)
      // 店铺别名(选填)
      const len = this.importTemplateData.length
      const importMallArr = []
      for (let i = 0; i < len; i++) {
        if (this.isStop) {
          this.writeLog('取消导入', false)
          break
        }
        const item = this.importTemplateData[i]
        if (!item['站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)(必填)']) {
          this.writeLog(`(${i + 1}/${len})未找到站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)(必填)`, false)
          continue
        }
        if (!item['账号(必填)(如果为手机号，请不要加国家区号)']) {
          this.writeLog(`(${i + 1}/${len})未找到账号(必填)(如果为手机号，请不要加国家区号)`, false)
          continue
        }
        if (!item['密码(必填)']) {
          this.writeLog(`(${i + 1}/${len})未找到密码(必填)`, false)
          continue
        }
        if (!item['店铺真实名称(必填)']) {
          this.writeLog(`(${i + 1}/${len})未找到店铺真实名称(必填)`, false)
          continue
        }
        const country = this.countries.filter((item2) => item2.label === item['站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)(必填)'])
        if (!country.length) {
          this.writeLog(`(${i + 1}/${len})未找到[${item['站点(马来站，台湾站，泰国站，印尼站，菲律宾站，新加坡站，越南站)(必填)']}],站点填写有误`, false)
          continue
        }
        // const obj = {
        //   'accountName': item['账号(必填)(如果为手机号，请不要加国家区号)'] + '',
        //   'mall_account_info': { username: item['账号(必填)(如果为手机号，请不要加国家区号)'] + '', password: item['密码(必填)'] },
        //   'mallGroup': item['分组(选填)'] || '',
        //   'platformMallName': item['店铺真实名称(必填)'],
        //   'mallAliasName': ,
        //   'mallMainName': item['店铺主体名称(需申IP隔离必填)'] || '',
        //   'country': country[0].value,
        //   'SPC_EC': '',
        //   'SPC_SC_TK': ''
        // }
        const password = item['密码(必填)']
        const username = `${item['账号(必填)(如果为手机号，请不要加国家区号)']}`
        const mall_alias_name = item['店铺别名(选填)'] || ''
        const GroupName = item['分组(选填)'] || ''
        const MallMainName = item['店铺主体名称(需申IP隔离必填)'] || ''
        const platformMallRealName = item['店铺真实名称(必填)']
        const obj = {
          // 数据结构与 店铺列表一致
          id: 0,
          group_name: GroupName,
          country: country[0].value,
          platform_mall_name: username,
          platform_mall_id: '',
          platform_mall_uid: '',
          MallMainName: MallMainName,
          mall_account_info: {
            // 店铺账户信息(导入模板里面的信息)
            password: password + '',
            username: username,
            userRealName: platformMallRealName,
            subsiteindex: 0
          },
          item_limit: 500,
          mall_group_uid: 0,
          mall_group_id: 0,
          watermark: '',
          created_at: '',
          mall_alias_name: mall_alias_name,
          mall_status: 1,
          good_mall_status: '-1',
          web_login_info: '',
          mall_remark: '',
          mall_type: '',

          // 渲染导入列表用的字段
          userRealName: platformMallRealName,
          SPC_EC: '',
          SPC_SC_TK: ''
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
      if (this.buttonStatus.mallList) {
        return
      }
      this.buttonStatus.mallList = true
      this.countryVal ? (params['country'] = this.countryVal) : ''
      this.mallSearchConditionInputVal ? (params[this.mallSearchConditionVal] = this.mallSearchConditionInputVal) : ''
      params['groupId'] = this.groupId
      this.mallStausVal ? (params['isFilterFrozen'] = this.mallStausVal) : ''
      const res = await this.mallListAPIInstance.getMallList(params)
      if (res.code !== 200) {
        this.$message.error(`获取店铺列表失败: ${res.data}`)
        return
      }
      this.mallList = res.data
      this.mallListTemp = this.mallList
      this.buttonStatus.mallList = false
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
      this.consoleMsg = `<p style="color:${color}">${time}:${msg}</p>` + this.consoleMsg
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
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
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

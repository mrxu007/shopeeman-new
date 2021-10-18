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
            <el-button type="primary" size="mini">导入店铺</el-button>
            <el-button type="primary" size="mini">导出店铺</el-button>
            <el-button type="primary" size="mini">修改账号登录密码</el-button>
            <el-button type="primary" size="mini">修改店铺水印文字</el-button>
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
      <el-table ref="plTable" height="calc(100vh - 216px)" :data="mallListTemp" @cahgne>
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序列号" width="100" />
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
  </el-row>
</template>

<script>
import { getMallListAPI } from '../../../module-api/mall-manager-api/mall-list-api'
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      height: 300,
      rowHeight: 50,
      mallList: [],
      mallListTemp: [],
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
        '2': '冻结',
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

      groupId: 0

    }
  },
  computed: {
    heightCalc() {
      const res = 'calc(100vh - 250px)'.replace('px', '')
      debugger
      return res
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
    downloadTemplate() {
      const headers = `<tr>
      <td>站点</td>
      <td>店铺名称</td>
      <td>店铺ID</td>
      <td>店铺文字水印</td>
      <td>分组</td>
      </tr>`
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
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/mall-manager-less/mall-list.less';
</style>

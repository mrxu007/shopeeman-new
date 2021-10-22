<template>
  <div class="content">
    <div class="all_condition">
      <div class="condition_item">
        <storeChoose @changeMallList="changeMallList" />
        <!-- <span>站点：</span>
        <el-select v-model="query.siteid" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option v-for="item in siteList" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>店铺分组：</span>
        <el-select v-model="query.siteid" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option v-for="item in siteList" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>店铺账号：</span>
        <el-select v-model="query.siteid" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option v-for="item in siteList" :key="item.id" :label="item.value" :value="item.id" />
        </el-select> -->
      </div>

      <div class="condition_item">
        <span>过期时间：</span>
        <el-date-picker
          v-model="cloumn_date"
          size="mini"
          style="width: 310px"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="-"
          :picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>

      <div class="condition_item">
        <span>状态：</span>
        <el-select v-model="query.siteid" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option v-for="item in siteList" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>IP地区/区域/渠道商：</span>
        <el-input v-model="query.prot_mallID" size="mini" style="width:180px" />
      </div>

      <div class="condition_item">
        <span>IP来源：</span>
        <el-select v-model="query.siteid" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option v-for="item in siteList" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>主体名称：</span>
        <el-input v-model="query.orderID" placeholder="主体名称" size="mini" style="width:180px" />
      </div>

      <div class="condition_item">
        <el-button size="mini" type="primary">搜素</el-button>
      </div>
    </div>
    <div class="base_option_button" style="margin: 10px;">
      <el-button size="mini" type="primary" @click="(Typeis='ipMaster',dialogvisible=true)">新增公司主体</el-button>
      <!-- <el-button size="mini" type="primary">解绑主体IP</el-button> -->
      <!-- <el-button size="mini" type="primary">绑定主体IP</el-button> -->
      <el-button size="mini" type="primary">清除IP缓存</el-button>
      <el-button size="mini" type="primary" @click="(Typeis='ipPerson',dialogvisible=true)">新增自有IP公司主体</el-button>
      <el-button size="mini" type="primary" @click="timeToMonth(1)">续费一个月</el-button>
      <el-button size="mini" type="primary" @click="timeToMonth(2)">续费三个月</el-button>
    </div>

    <div style="margin:10px">
      <span>
        温馨提示：1.因为IP为实时购买，所以购买后不会立即生成IP信息。IP信息会在三分钟内生成
        2.一个主体IP最多绑定10个店铺 3.若状态为【已绑定，已分配店铺】，但绑定店铺为空，则表示
        店铺不存在此账号
      </span>
    </div>
    <div class="table_clo">
      <div class="data_table" style="height: 100%;background-color:white">
        <el-table
          height="calc(100vh - 260px)"
          :data="tableList"
          :row-style="{ height: '50px' }"
          style="width: 100%;height: calc(100vh - 260px)"
          :header-cell-style="{ background: '#f7fafa' }"
          :row-key="generateUUID"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            min-width="55px"
            align="center"
          />
          <el-table-column label="序号" type="index" align="center" :index="indexMethod" />
          <el-table-column prop="" label="订单号" align="center" />
          <el-table-column prop="" label="主体ID" align="center" />
          <el-table-column prop="" label="主体名称" align="center" />
          <el-table-column prop="" label="代理IP" align="center" />
          <el-table-column prop="" label="IP渠道" align="center" />
          <el-table-column prop="" label="IP来源" align="center" />
          <el-table-column prop="" label="是否预售IP" align="center" />
          <el-table-column prop="" label="状态" align="center" />
          <el-table-column prop="" label="有效日期" align="center" />
          <el-table-column prop="" label="绑定店铺" align="center" />
          <el-table-column prop="" label="操作" align="center">
            <div>
              <el-button size="mini" type="primary">打开代理浏览器</el-button>
              <el-button size="mini" type="primary">修改绑定店铺</el-button>
              <el-button size="mini" type="primary">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
        <div class="pagination">

          <el-pagination
            background
            :current-page.sync="page"
            :page-sizes="[20, 50, 100, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <!-- dialog 新增公司主体-->
    <div class="dialog_addip">
      <el-dialog
        :title="Typeis==='ipMaster'?'新增公司主体':'新增自有IP公司主体'"
        :visible.sync="dialogvisible"
        width="1200px"
        height="700px"
        top="2vh"
      >
        <div class="left">
          <!--新增公司主体  -->
          <div v-if="Typeis==='ipMaster'">
            <div class="left_item">
              ip区域：
              <el-select v-model="region_ip" size="mini">
                <el-option v-for="(item,index) in region_ipList" :key="'region'+index" :label="item.value" :value="item.id" />
              </el-select>
            </div>
            <div class="left_item">
              ip周期：
              <el-select v-model="time_ip" size="mini">
                <el-option v-for="(item,index) in time_ipList" :key="'time'+index" :label="item.value" :value="item.id" />
              </el-select>
            </div>
            <div class="left_item">
              主体名称：<el-input v-model="ipName" style="width:200px" size="mini" />
              <span v-show="ipName===''" style="color:red">(必填)</span>
            </div>
            <div class="left_item">
              <el-button size="mini" type="primary" @click="submit_addIP">确定</el-button>
            </div>
          </div>
          <!-- 新增自有IP公司主体 -->
          <div v-if="Typeis==='ipPerson'">
            <div class="left_item">
              ip区域：
              <el-select v-model="query_person.ipRegion" size="mini">
                <el-option v-for="(item,index) in region_ipList" :key="'region'+index" :label="item.value" :value="item.id" />
              </el-select>
            </div>
            <div class="left_item">
              主体名称：<el-input v-model="query_person.ipName" style="width:200px" size="mini" />
              <span v-show="query_person.ipName===''" style="color:red">(必填)</span>
            </div>
            <div class="left_item">
              自有ip类型：
              <el-radio-group v-model="query_person.ipType">
                <el-radio :label="3">SSP</el-radio>
                <el-radio :label="6">SS</el-radio>
                <el-radio :label="9">HTTP</el-radio>
                <el-radio :label="9">链接</el-radio>
              </el-radio-group>
            </div>
            <div class="left_item">
              服务器ip：<el-input v-model="query_person.ipService" style="width:200px" size="mini" />
              <span v-show="query_person.ipService===''" style="color:red">(必填)</span>
            </div>
            <div class="left_item">
              服务器端口：<el-input v-model="query_person.ipPort" style="width:200px" size="mini" />
              <span v-show="query_person.ipPort===''" style="color:red">(必填)</span>
            </div>
            <div class="left_item">
              密码：<el-input v-model="query_person.ipPsd" style="width:200px" size="mini" />
            </div>
            <div class="left_item">
              加密方式：
              <el-select v-model="query_person.ipPsdMethod" size="mini">
                <el-option v-for="(item,index) in ipPsdMethodList" :key="'ipPsd'+index" :label="item.value" :value="item.id" />
              </el-select>
              <span v-show="query_person.ipPsdMethod===''" style="color:red">(必填)</span>
            </div>
            <div class="left_item">
              协议参数：<el-input v-model="query_person.agreePro" style="width:200px" size="mini" />
              <!-- <span v-show="query_person.agreePro===''" style="color:red">(非必填)</span> -->
            </div>
            <div class="left_item">
              协议：<el-input v-model="query_person.agree" style="width:200px" size="mini" />
              <span v-show="query_person.agree===''" style="color:red">(必填)</span>
            </div>
            <div class="left_item">
              混淆：<el-input v-model="query_person.mix" style="width:200px" size="mini" />
              <span v-show="query_person.mix===''" style="color:red">(必填)</span>
            </div>
            <div class="left_item">
              混淆参数：<el-input v-model="query_person.mixPro" style="width:200px" size="mini" />
              <span v-show="query_person.mixPro===''" style="color:red">(必填)</span>
            </div>
            <div class="left_item">
              <el-button size="mini" type="primary" @click="submit_IpPersion">确定</el-button>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right_condition">
            <div>
              <storeChoose @changeMallList="changeMallList" />
              <el-button type="primary" size="mini" @click="dialog_search_IPMall">查询</el-button>
            </div>
            <el-checkbox v-model="showUserIP">显示已绑定ip店铺</el-checkbox>
            <div class="right_table" style="border:1px solid #C0C4CC">
              <el-table
                ref="multipleTable"
                height="400px"
                :header-cell-style="{'background': '#f7fafa'}"
                :row-key="generateUUID"
                :data="dialog_mallList"
              >
                <el-table-column
                  type="selection"
                  width="55"
                />
                <el-table-column prop="" label="序号" />
                <el-table-column prop="" label="站点" />
                <el-table-column prop="" label="店铺名称" />
                <el-table-column prop="" label="已绑定公司主体名称" />
              </el-table>
            </div>
          </div>
        </div>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import storeChoose from '../../../components/store-choose'
export default {
  components: { storeChoose },

  data() {
    return {
      Typeis: '',
      dialogvisible: false,
      ipPsdMethodList: [
        { id: 1, value: 'none' },
        { id: 2, value: 'sfsdf' },
        { id: 3, value: 'werwr' }
      ],
      query_person: {
        ipRegion: '',
        ipName: '',
        ipType: '',
        ipService: '',
        ipPort: '',
        ipPsd: '',
        ipPsdMethod: '',
        agreePro: '',
        agree: '',
        mix: '',
        mixPro: ''
      },
      dialog_mallList: [],
      showUserIP: false,
      ipName: '', // 主体名称
      time_ipList: [
        { id: 1, value: '1个月/68元' },
        { id: 2, value: '3个月/204元' },
        { id: 3, value: '1个月/408元' },
        { id: 4, value: '1个月/816元' }

      ],
      time_ip: '',
      region_ip: '',
      region_ipList: [
        { id: 1, value: '新加坡' },
        { id: 2, value: '泰国-曼谷' },
        { id: 3, value: '菲律宾-预售' }
      ],
      tableList: [],
      page: 1,
      pageSize: 20,
      total: 0,
      siteList: [
        { id: 1, value: '美国' },
        { id: 2, value: '中国' },
        { id: 3, value: '英国' }
      ],
      query: {
        siteid: '',
        prot_mallID: '',
        orderID: ''
      },
      cloumn_date: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      showRMB: true,
      showLog: true
    }
  },
  created() {
    this.initDate()
    // this.getTableList()// tableList
    // this.GetCloudIPAreaList()// 获取IP区域列表
  },
  methods: {
    // 续费一个月
    async timeToMonth(period) {
      // period=1 一个月 2一季度
      const targetId = ''
      const uid = ''
      const uuid = ''
      const data = await this.$YipService.RenewIP(targetId, uid, uuid, period)
    },
    // 获取ip价格
    async GetIPPrice() {
      const lineId = '' // 所选ip区域的id
      const data = await this.$YipService.GetIPPrice(lineId)
      console.log('dialog_ipPrice', data)
    },
    // 新增自有主体---提交
    submit_IpPersion() {

    },
    // 新增公司主体---提交
    submit_addIP() {
      if (this.ipName === '') {
        this.$message.warning('主体名称不能为空！')
        return false
      }
    },
    // dialog 多选
    // 方法
    generateUUID() {
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
      )
      return uuid
    },

    // 多选
    handleSelectionChange(val) {
      // 获取参数
    },
    // 新增ip 店铺查询
    dialog_search_IPMall() {},
    // 获取IP区域列表
    async GetCloudIPAreaList() {
      const data = await this.$YipService.GetCloudIPAreaList()
      console.log('获取ip列表', data)
    },
    // 获取店铺信息
    changeMallList(val) {
      this.site = Object.assign(val)
      // console.log('changeMallList', this.site)
    },
    // ip- tableList
    async getTableList() {
      const params = {}
      const userInfo = await this.$appConfig.getUserInfo()
      const mallIdStr = ''
      params.uid = userInfo.muid
      params.uuid = ''
      params.mall_ids = mallIdStr || ''
      params.ip_alias = ''
      params.source = this.queryParam.source
      params.status = ''
      params.ip_address = this.queryParam.ip
      params.supplier_info = ''
      params.expiration_dates = ''
      params.ip_id = ''
      console.log('params', params)
      const res = await this.$YipService.GetIpList(JSON.stringify(params))

      console.log(res)
    },
    // 分页递增
    indexMethod(index) {
      index = (index + 1) + (this.page - 1) * this.pageSize
      return index
    },
    // 初始化时间
    initDate() {
      const d = new Date()
      const d1 =
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1) +
        '-' +
        d.getDate() +
        ' 23:59:59'
      const d2 =
        d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' 23:59:59'
      this.cloumn_date = [d2, d1]
      this.cloumn_date && this.cloumn_date.length > 0
        ? this.cloumn_date.join('/').toString()
        : ''
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.page = val
    }
  }
}
</script>
<style lang="less">

.content{
    min-width: 1200px;
    // padding: 5px;
    // margin: 10px;
    // margin-right:10px ;
    .all_condition, .table_clo{
    background-color: white;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    }
     .table_clo{
     border-radius: 0px;
     padding: 2px;
    }
    .all_condition{
    display: flex;
    flex-wrap: wrap;
    // justify-content:center;
    // margin-bottom: 30px;
    align-items: center;
    .condition_item {
      width: auto;
      display: inline-block !important;
      display: inline;
      margin-bottom: 8px;
      margin-right: 10px;
      span {
        margin-right: 5px;
      }
    }
    }
    .dialog_addip{
      .el-dialog{
        .el-dialog__body{
          display: flex;
          align-items: center;
          .left{
            padding: 5px;
            .left_item{
              margin-bottom: 10px;
            }
          }
        }
      }
    }
}
</style>

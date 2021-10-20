<template>
  <div class="content">
    <div class="overdata_view">
      <span>金额总览</span>
      <div style=" display: flex;margin-top:10px">
        <span>即将拨款：</span><h3> {{ to_back_amount }}{{ site_query.typeCoin }}</h3>
        <div style="width:20px" />
        <span>已完成拨款：</span> <h3>{{ haved_amount }}{{ site_query.typeCoin }}</h3>
      </div>
    </div>

    <div class="all_condition">
      <div class="condition_item">
        <span>站点：</span>
        <el-select
          v-model="site_query.country"
          size="mini"
          width="150px"
          placeholder="站点"
          @change="getMallSite(),exchangeRateList(),orgin='',showRMB=false"
        >
          <el-option v-for="item in siteList" :key="item.name" :label="item.name" :value="item.value" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>店铺分组：</span>
        <el-select
          v-model="mallGroupId"
          size="mini"
          width="150px"
          placeholder="店铺分组"
          collapse-tags
          multiple
          style="min-width: 235px;"
          @change="getMallSite"
        >
          <el-option label="全部" value="全选" @click.native="selectall_gruop" />
          <!-- <el-option label="全部" value="全选" /> -->
          <el-option v-for="item in mallList_gruop" :key="item.id" :label="item.mall_alias_name" :value="item.id" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>店铺：</span>
        <el-select
          v-model="query.sysMallId"
          size="mini"
          width="150px"
          collapse-tags
          multiple
          placeholder="店铺"
        >
          <el-option value="" label="全部" />
          <el-option v-for="item in mallList_mall" :key="item.id" :label="item.platform_mall_name" :value="item.platform_mall_id" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>平台店铺ID：</span>
        <el-input v-model="plantform_mallID" clearable placeholder="输入多个ID请使用英文','号隔开" size="mini" style="width:220px" />
      </div>

      <div class="condition_item">
        <span>拨款时间：</span>
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
        <el-select v-model="query.status" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option label="已拨款" value="1" />
          <el-option label="即将拨款" value="2" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>订单编号：</span>
        <el-input v-model="query.orderSn" placeholder="订单编号" size="mini" style="width:180px" clearable />
      </div>

      <div class="condition_item">
        <div>
          <el-switch
            v-model="showRMB"
            active-color="#13ce66"
            inactive-color="grey"
            @change="compete_Coin()"
          />
          <span>
            显示人民币：
          </span>
          <span>
            (当前汇率:{{ this.site_query.rate_coin }})
          </span>
        </div>

        <div>
          <el-checkbox v-model="showLog"> 隐藏日志</el-checkbox>
        </div>
      </div>

      <div class="condition_item">
        <el-button size="mini" type="primary">同步数据</el-button>
        <el-button size="mini" type="primary">取消同步</el-button>
        <el-button size="mini" type="primary">清空日志</el-button>
        <el-button size="mini" type="primary" @click="export_table(page=1),exportList=[]">导出</el-button>
        <el-button size="mini" type="primary" @click="search">搜索</el-button>
      </div>
    </div>

    <div class="table_clo">
      <div class="data_table" style="height: 100%;background-color:white">
        <el-table
          height="calc(100vh - 281px)"
          :data="tableList"
          :row-style="{ height: '50px' }"
          style="width: 100%;height: calc(100vh - 260px)"
          :header-cell-style="{ background: '#f7fafa' }"
        >
          <el-table-column label="序号" type="index" />
          <el-table-column prop="country" label="站点" align="center" />
          <el-table-column prop="platform_mall_name" label="店铺名称" align="center" />
          <el-table-column prop="order_sn" label="订单编号" align="center" />
          <el-table-column prop="" label="状态" align="center">
            <template slot-scope="{ row }">{{ Number(row.status)===1?'已拨款 ':'即将拨款' }}</template>
          </el-table-column>
          <el-table-column prop="bill_num" label="拨款单号" align="center" />
          <el-table-column prop="appropriate_amount" label="拨款金额" align="center" />
          <el-table-column prop="" label="拨款金额(RMB)" align="center">
            <template slot-scope="{ row }">{{ (row.appropriate_amount*site_query.rate_coin).toFixed(2) }}</template>
          </el-table-column>
          <el-table-column prop="created_at" label="拨款时间" align="center" />
          <!-- <el-table-column prop="" label="账单详情" align="center" /> -->
        </el-table>
        <div class="pagination">

          <el-pagination
            background
            :current-page.sync="query.page"
            :page-sizes="[20, 50, 100, 200]"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orgin: '',
      to_back_amount: '', // 即将拨款
      haved_amount: '', // 已拨款
      exportList: [], // 导出
      tableList: [],
      total: 0,
      mallList_gruop: [],
      mallList_mall: [],
      siteList: [
        { name: '马来站', value: 'MY' },
        { name: '台湾站', value: 'TW' },
        { name: '越南站', value: 'VN' },
        { name: '印尼站', value: 'ID' },
        { name: '菲律宾站', value: 'PH' },
        { name: '泰国站', value: 'TH' },
        { name: '新加坡站', value: 'SG' },
        { name: '巴西站', value: 'BR' },
        { name: '墨西哥站', value: 'MX' },
        { name: '智利站', value: 'CL' },
        { name: '哥伦比亚站', value: 'CO' }
      ],
      site_query: { // 站点参数
        country: 'TH', // 站点
        typeCoin: '฿', // 币种
        rate_coin: ''// 汇率
      },
      plantform_mallID: '', // 平台店铺ID
      mallGroupId: [], // 店铺分组
      all_mallgruopID: [], // 店铺分组-全选
      query: {
        sysMallId: [],
        orderSn: '',
        status: '',
        appropriateTime: '',
        page: 1,
        pageSize: 20
      },
      cloumn_date: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      showRMB: false,
      showLog: true
    }
  },
  created() {
    this.initDate()
    this.getTableList() // 初始化table
    this.getMallSite()// 初始化站点
    this.exchangeRateList()// 获取汇率
  },
  methods: {
    // 计算汇率
    compete_Coin() {
      if (this.showRMB === false) {
        this.to_back_amount = (this.to_back_amount / this.site_query.rate_coin).toFixed(2)
        this.haved_amount = (this.haved_amount / this.site_query.rate_coin).toFixed(2)
        this.site_query.typeCoin = this.orgin
      } else {
        this.orgin = this.site_query.typeCoin
        this.to_back_amount = (this.site_query.rate_coin * this.to_back_amount).toFixed(2)
        this.haved_amount = (this.site_query.rate_coin * this.haved_amount).toFixed(2)
        this.site_query.typeCoin = '￥'
      }
    },
    // 获取汇率
    async exchangeRateList() {
      const data = await this.$api.exchangeRateList()
      // console.log(data.data)
      if (data.data.code === 200) {
        switch (this.site_query.country) {
          case 'MY':
            this.site_query.rate_coin = data.data.data.MY
            this.site_query.typeCoin = 'RM'
            break
          case 'SG':
            this.site_query.rate_coin = data.data.data.SG
            this.site_query.typeCoin = '$'
            break
          case 'PH':
            this.site_query.rate_coin = data.data.data.PH
            this.site_query.typeCoin = '₱'
            break
          case 'TH':
            this.site_query.rate_coin = data.data.data.TH
            this.site_query.typeCoin = '฿'
            break
          case 'ID':
            this.site_query.rate_coin = data.data.data.ID
            this.site_query.typeCoin = 'Rp'
            break
          case 'TW':
            this.site_query.rate_coin = data.data.data.TW
            this.site_query.typeCoin = '$'
            break
          case 'VN':
            this.site_query.rate_coin = data.data.data.VN
            this.site_query.typeCoin = '₫'
            break
          case 'BR':
            this.site_query.rate_coin = data.data.data.BR
            this.site_query.typeCoin = 'R$'
            break
          case 'US':
            this.site_query.rate_coin = data.data.data.US
            this.site_query.typeCoin = '$'
            break
          case 'MX':
            this.site_query.rate_coin = ''
            this.site_query.typeCoin = 'MX$'
            break
          case 'CL':
            this.site_query.rate_coin = ''
            this.site_query.typeCoin = '$'
            break
          case 'CO':
            this.site_query.rate_coin = ''
            this.site_query.typeCoin = '$'
            break
          default:
            // this.site_query.typeCoin = '￥'
            break
        }
      } else {
        this.$message.warning('网络请求失败')
      }
    },
    // 导出
    export_table(page) {
      // loading = Loading.service({ text: '拼命加载中' })
      // this.getParams.page = page
    },
    // 店铺分组-全选赋值
    selectall_gruop() {
      if (this.mallGroupId.length < this.mallList_gruop.length) {
        this.mallGroupId = []
        this.mallList_gruop.map(item => {
          this.mallGroupId.push(item.id)
        })
      } else {
        this.mallGroupId = []
      }
    },
    // 获取站点店铺信息
    async getMallSite() {
      const params = {
        country: this.site_query.country,
        mallGroupId: this.mallGroupId && this.mallGroupId.toString()
      }
      // 获取店铺分组
      const data = await this.$api.getMallSite(params)
      if (data.data.code === 200) {
        this.mallList_gruop = data.data.data
        this.mallList_mall = data.data.data
        // console.log('-------', data.data.data)
      } else {
        console.log('error', data)
      }
    },
    // 搜索
    search() {
      const params = this.query
      params.sysMallId = this.query.sysMallId.toString() || ''
      params.appropriateTime = this.cloumn_date && this.cloumn_date.length >= 0 ? this.cloumn_date.join('/').toString() : ''
      this.getTableList(params)
    },
    // 初始化tableList
    async getTableList(params) {
      const data = await this.$api.getPaymentList(params)
      if (data.data.code === 200) {
        this.tableList = data.data.data.data
        this.query.page = data.data.data.last_page
        this.query.pageSize = data.data.data.per_page
        this.total = data.data.data.total
        this.to_back_amount = data.data.data.to_back_amount
        this.haved_amount = data.data.data.haved_amount
      } else {
        this.$message.warning('数据请求失败！')
      }
      console.log(data.data.data)
    },
    // 初始化时间
    initDate() {
      const d = new Date()
      const d1 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' 23:59:59'
      const d2 = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' 23:59:59'
      this.cloumn_date = [d2, d1]
      this.cloumn_date && this.cloumn_date.length > 0 ? this.cloumn_date.join('/').toString() : ''
    },
    handleSizeChange(val) {
      this.query.pageSize = val
    },
    handleCurrentChange(val) {
      this.query.page = val
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
    .overdata_view , .all_condition, .table_clo{
    background-color: white;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    }
    .overdata_view{
      padding: 10px;
      display: flex;
      flex-direction: column;
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
}
</style>

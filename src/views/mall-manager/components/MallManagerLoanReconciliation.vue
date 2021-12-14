<template>
  <div class="content">
    <div class="overdata_view">
      <div class="account-box">
        <span class="account-title">金额总览</span>
        <div class="account-item">
          <span>即将拨款：</span>
          <h3>{{ to_back_amount }}{{ site_query.typeCoin }}</h3>
          <div style="width: 20px" />
          <span>已完成拨款：</span>
          <h3>{{ haved_amount }}{{ site_query.typeCoin }}</h3>
        </div>
      </div>
    </div>

    <div class="all_condition">
      <div class="condition_box">
        <div class="condition_item">
          <storeChoose :is-all="false" @changeMallList="changeMallList" />
        </div>
        <div class="condition_item">
          <span class="w80">平台店铺ID：</span>
          <el-input v-model="plantform_mallID" clearable placeholder="输入多个ID请使用,隔开" size="mini" style="width: 180px" />
        </div>
      </div>
      <div class="condition_box">
        <div class="condition_item">
          <span class="w80">状态：</span>
          <el-select v-model="query.status" size="mini" style="width: 100px" placeholder="站点">
            <el-option value="" label="全部" />
            <el-option label="已拨款" value="1" />
            <el-option label="即将拨款" value="2" />
          </el-select>
        </div>
        <div class="condition_item">
          <span class="w80">订单编号：</span>
          <el-input v-model="query.orderSn" placeholder="订单编号" size="mini" style="width: 180px" clearable />
        </div>
        <div class="condition_item">
          <span class="w80">拨款时间：</span>
          <el-date-picker
            v-model="cloumn_date"
            size="mini"
            style="width: 240px"
            type="daterange"
            unlink-panels
            range-separator="-"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="condition_item">
          <div>
            <el-switch v-model="showRMB" active-color="#13ce66" inactive-color="grey" @change="compete_Coin()" />
            <span>显示人民币：</span>
            <span>(当前汇率：{{ site_query.rate_coin?site_query.rate_coin:'暂无该站点的汇率' }})</span>
          </div>
        </div>
      </div>
      <div class="condition_box" style="padding-left: 20px">
        <div class="condition_item">
          <el-button size="mini" type="primary" @click="search">搜索</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="
              cancelActive = false
              updataMall()
            "
          >同步数据</el-button>
          <el-button size="mini" type="primary" @click="cancelActive = true">取消同步</el-button>
          <el-button size="mini" type="primary" @click="clearLog">清空日志</el-button>
          <el-button size="mini" type="primary" @click="export_table(1), (exportList = [])">导出 </el-button>
          <el-checkbox v-model="showConsole" style="margin-left: 10px"> 隐藏日志</el-checkbox>
        </div>
      </div>
    </div>
    <div class="table_clo">
      <div class="data_table" style="height: 100%; background-color: white">
        <el-table
          v-loading="isLoading"
          height="calc(100vh - 266px)"
          :data="tableList"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ background: '#f7fafa' }"
        >
          <el-table-column label="序号" width="60" type="index" align="center" />
          <el-table-column prop="country" width="120px" label="站点" align="center">
            <template slot-scope="{ row }">
              {{ row.country | chineseSite }}
            </template>
          </el-table-column>
          <el-table-column min-width="120px" label="店铺名称" align="center">
            <template v-slot="{row}">
              {{ row.mall_alias_name?row.mall_alias_name:row.platform_mall_name }}
            </template>
          </el-table-column>
          <el-table-column prop="order_sn" label="订单编号" min-width="120px" align="center" />
          <el-table-column prop="" min-width="80px" label="状态" align="center">
            <template slot-scope="{ row }">{{ Number(row.status) === 1 ? '已拨款 ' : '即将拨款' }}</template>
          </el-table-column>
          <el-table-column prop="bill_num" width="100px" label="拨款单号" align="center" />
          <el-table-column prop="appropriate_amount" label="拨款金额" align="center" />
          <el-table-column prop="" label="拨款金额(RMB)" align="center">
            <template slot-scope="{ row }">{{ (row.appropriate_amount * site_query.rate_coin).toFixed(2) }}</template>
          </el-table-column>
          <el-table-column prop="appropriate_time" label="拨款时间" width="160px" align="center" />
          <!-- <el-table-column prop="" label="账单详情" align="center" /> -->
        </el-table>
        <div class="pagination" style="display: flex; justify-content: flex-end; margin: 4px 0px">
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
    <Logs ref="Logs" v-model="showConsole" clear />
  </div>
</template>
<script>
import storeChoose from '../../../components/store-choose'
import { delay, exportExcelDataCommon } from '../../../util/util'

export default {
  components: { storeChoose },
  data() {
    return {
      isLoading: false,
      orgin: '',
      to_back_amount: '', // 即将拨款
      haved_amount: '', // 已拨款
      exportList: [], // 导出
      tableList: [],
      total: 0,
      mallList_gruop: [],
      mallList_mall: [],
      site_query: {
        // 站点参数
        country: 'TH', // 站点
        typeCoin: '฿', // 币种
        rate_coin: '' // 汇率
      },
      plantform_mallID: '', // 平台店铺ID
      mallGroupId: [], // 店铺分组
      all_mallgruopID: [], // 店铺分组-全选
      query: {
        sysMallId: [],
        orderSn: '',
        status: '',
        appropriateTime: ''

      },
      page: 1,
      pageSize: 20,
      cloumn_date: [],
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now()
        // }
      },
      showRMB: false,
      showConsole: true,
      selectMallList: [],
      mallPageSize: 50,
      cancelActive: false
    }
  },
  async mounted() {
    // 初始化时间
    this.cloumn_date = [
      new Date().getTime() - 3600 * 1000 * 24 * 10,
      new Date().getTime() + 3600 * 1000 * 24 * 20
    ]
    // this.cloumn_date = creatDate(31)
    await this.search() // 初始化table
    await this.exchangeRateList() // 获取汇率
  },
  methods: {
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    changeMallList(val) {
      console.log(val)
      this.selectMallList = val
      this.site_query['country'] = this.selectMallList['country']
      this.exchangeRateList()
      console.log('country', this.site_query['country'])
      console.log('changeMallList', val)
    },
    // 同步信息
    async updataMall() {
      // this.uploadVisible = false
      if (!this.selectMallList.length) {
        this.$message.warning('请选择要同步的店铺！')
      }
      this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      this.$refs.Logs.writeLog(`开始同步`, true)
      try {
        for (let i = 0; i < this.selectMallList.length; i++) {
          if (this.cancelActive) {
            this.$refs.Logs.writeLog(`操作已取消！`, true)
            return
          }
          const mall = this.selectMallList[i]
          const pageNumber = 1
          this.$refs.Logs.writeLog(`开始同步店铺【${mall.platform_mall_name}】对账信息`, true)
          if (this.query.status === '') {
            await this.searchSingleMall(pageNumber, mall, 0)
            await this.searchSingleMall(pageNumber, mall, 2)
          } else if (this.query.status === '1') {
            await this.searchSingleMall(pageNumber, mall, 0)
          } else if (this.query.status === '2') {
            await this.searchSingleMall(pageNumber, mall, 2)
          }
        }
      } catch (error) {
        console.log(error)
      }
      this.search()
    },
    async searchSingleMall(pageNumber, mall, type, dataArr = [], page = 0) {
      if (this.cancelActive) {
        this.$refs.Logs.writeLog(`操作已取消！`, true)
        return
      }
      const params = {
        tran_type: type, // 0,2  type:0-status:1 付款转账完成    type:2-status:0 等待订单完成
        page_number: pageNumber,
        page_size: this.mallPageSize,
        shop_id: mall.platform_mall_id
        // start_date: '',
        // end_date: '',
      }
      if (type === 0) {
        params['start_date'] = this.$dayjs(this.cloumn_date[0]).format('YYYY-MM-DD')
        params['end_date'] = this.$dayjs(this.cloumn_date[1]).format('YYYY-MM-DD')
      }
      const res = await this.$shopeemanService.getIncomeTransaction(mall.country, params)
      const resObj = res && JSON.parse(res)
      if (resObj && resObj.status === 200) {
        const data = JSON.parse(resObj.data)
        console.log(data, 'searchSingleMall')
        if (data.code === 0) {
          let count = data.data.list.length
          data.data.list &&
            data.data.list.forEach((item) => {
              console.log(item)
              const params = {
                order_id: item.order_id + '',
                status: item.status === 1 ? '1' : '2',
                bill_num: item.id + '',
                amount: item.amount + '',
                using_wallet: item.using_wallet ? '1' : '0',
                release_time: this.$dayjs(item.release_time * 1000).format('YYYY-MM-DD HH:mm:ss')
              }
              const index = dataArr.filter((i) => i.bill_num === params.bill_num)[0] || ''
              index && count--
              !index && dataArr.push(params)
              // !index && this.UploadRecordData(mall.platform_mall_id,item)
            })
          count && this.$refs.Logs.writeLog(`同步店铺【${mall.platform_mall_name}】【${type === 0 ? '已拨款' : '即将拨款'}】第【${++page}】页货款对账数据【${count}】条`, true)
          if (dataArr.length < data.data.page_info.total && data.data.list.length >= this.mallPageSize) {
            pageNumber++
            this.searchSingleMall(pageNumber, mall, type, dataArr, page)
          } else {
            if (this.query.status !== '' || type !== 2) {
              this.$refs.Logs.writeLog(`同步店铺【${mall.platform_mall_name}】数据完成`, true)
            }
            console.log(dataArr, 'dataArr')
            if (dataArr.length) {
              this.UploadRecordData(mall.platform_mall_id, dataArr)
            }
          }
        }
      } else if (resObj && resObj.status === 403) {
        if (this.query.status !== '' || type !== 2) {
          this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】请检查店铺是否登录！`, false)
        }
      } else {
        if (this.query.status !== '' || type !== 2) {
          this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】获取失败！`, false)
        }
      }
    },
    // 上传服务端
    async UploadRecordData(mallID, dataArr) {
      const params = {
        mallId: mallID,
        bills: dataArr
      }
      console.log(params, '------------')
      const res = await this.$api.uploadPaymentList(params)
      console.log(res)
    },
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
      console.log(data.data.data)
      if (data.data.code === 200) {
        this.site_query.rate_coin = data.data.data[this.site_query.country]
      } else {
        this.$message.warning('网络请求失败')
      }
    },
    // 导出
    export_table(page) {
      const params = this.query
      params.page = page
      this.getTableList(params)
      if (this.tableList.length > 0) {
        this.exportList.push(...this.tableList)
        if (this.exportList.length >= this.total) {
          let str = `<tr>
              <td>序号</td>
              <td>站点</td>
              <td>店铺名称</td>
              <td>订单编号</td>
              <td>状态</td>
              <td>拨款编号</td>
              <td>拨款金额</td>
              <td>拨款金额（RMB）</td>
              <td>拨款时间</td>
            </tr>`
          this.exportList.forEach((item, index) => {
            str += `<tr>
              <td>${index + 1}</td>
              <td>${item.country ? this.$filters.chineseSite(item.country) : '-' + '\t'}</td>
              <td>${item.platform_mall_name ? item.platform_mall_name : '-' + '\t'}</td>
              <td>${item.order_sn ? item.order_sn : '-' + '\t'}</td>
              <td>${item.status && Number(item.status) === 1 ? '已拨款' : '即将拨款' + '\t'}</td>
              <td>${item.bill_num ? item.bill_num : '-' + '\t'}</td>
              <td>${item.appropriate_amount ? item.appropriate_amount : '-' + '\t'}</td>
              <td>${item.appropriate_amount ? (item.appropriate_amount * this.site_query.rate_coin).toFixed(2) : '-' + '\t'}</td>
              <td>${item.appropriate_time ? item.appropriate_time : '-' + '\t'}</td>
            </tr>`
          })
          exportExcelDataCommon('货款对账详情', str)
        } else {
          this.export_table(page + 1)
        }
      } else {
        this.$message.warning('暂无数据导出')
      }
    },
    // 搜索
    async search() {
      this.isLoading = true
      const params = this.query
      let sysMallId = ''
      this.selectMallList.forEach((item, index) => {
        if (index === 0) {
          sysMallId = item.id
        } else {
          sysMallId = sysMallId + ',' + item.id
        }
      })
      params.sysMallId = sysMallId
      params.appropriateTime = this.cloumn_date?.length >= 0 ? this.$dayjs(this.cloumn_date[0]).format('YYYY-MM-DD') + ' 00:00:00/' + this.$dayjs(this.cloumn_date[1]).format('YYYY-MM-DD') + ' 23:59:59' : ''
      params.page = this.page
      params.pageSize = this.pageSize
      console.log(params, 'params')
      await delay(300)
      await this.getTableList(params)
    },
    // 初始化tableList
    async getTableList(params) {
      const data = await this.$api.getPaymentList(params)
      if (data.data.code === 200) {
        // this.tableList = data.data.data.data
        this.tableList = data.data.data.data
        // this.query.page = data.data.data.last_page
        // this.query.pageSize = data.data.data.per_page
        this.total = data.data.data.total
        this.to_back_amount = data.data.data.to_back_amount
        this.haved_amount = data.data.data.haved_amount
        this.site_query.typeCoin = this.$shopeeManConfig.getSiteCoinSymbol(this.site_query.country)
        if (this.selectMallList?.length === 0) {
          this.tableList = []
        }
      } else {
        this.$message.warning('数据请求失败！')
      }
      console.log(data.data.data)
      this.isLoading = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.page = val
      this.search()
    }
  }
}
</script>
<style lang="less">
.content {
  min-width: 1200px;
  // padding: 5px;
  // margin: 10px;
  // margin-right:10px ;
  .overdata_view,
  .all_condition,
  .table_clo {
    .account-box {
      border: 1px solid #dcdcdc;
      border-radius: 4px;
      padding: 16px;
      position: relative;

      .account-title {
        padding: 0 5px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #fff;
        position: absolute;
        left: 10px;
        top: -10px;
      }

      .account-item {
        display: flex;
        align-items: center;

        span {
          margin-right: 20px;
          display: inline-block;
        }

        .acount-item-sub {
          display: flex;
          align-items: center;
        }

        .warning-style {
          color: red;
          font-size: 16px;
        }
      }
    }

    background-color: white;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
  }

  .overdata_view {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .table_clo {
    border-radius: 0px;
    padding: 2px;
  }

  .all_condition {
    .condition_box {
      display: flex;
      align-items: center;
      .condition_item {
        width: auto;
        display: inline-block !important;
        margin-bottom: 8px;
        margin-right: 10px;

        span {
          margin-right: 5px;
        }
      }
    }
  }

  .w80 {
    display: inline-block;
    text-align: right;
    width: 80px;
  }
}
</style>

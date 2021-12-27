<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-11-06 17:57:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\mall-manager\components\MallManagerWithdrawalRecord.vue
-->
<template>
  <div class="store-evaluation">
    <div class="tool-bar">
      <div class="tool-row">
        <storeChoose :span-width="'80px'" @changeMallList="changeMallList" />
        <div class="tool-item">
          <el-input v-model="userName" placeholder="请输入内容" size="mini" class="input-with-select" clearable>
            <el-select slot="prepend" v-model="userTypeSelect" placeholder="用户名称" class="miniSelectBox">
              <el-option v-for="(item, index) in userType" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-input>
        </div>
      </div>
      <div class="tool-row">
        <div class="tool-item mar-right">
          <span>评价星数：</span>
          <el-select v-model="startNum" placeholder="" size="mini" filterable class="miniSelectBox">
            <el-option v-for="(item, index) in startNumList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="tool-item mar-right">
          <span>时间：</span>
          <el-date-picker
            v-model="assessTime"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            style="width: 180px"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </div>
        <div class="tool-item mar-right">
          <span>回复类型：</span>
          <el-select v-model="replayType" placeholder="" size="mini" filterable class="miniSelectBox">
            <el-option v-for="(item, index) in replayTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-button type="primary" size="mini" style="width: 75px" :disabled="tableLoading" @click="searchRate">查 询</el-button>
        <el-button type="primary" size="mini" class="mar-right btnbox" :disabled="tableLoading" @click="batchReplay">批量回复</el-button>
        <el-button type="primary" size="mini" class="mar-right btnbox" @click="cancelAction = true">取消操作</el-button>
        <el-button type="primary" size="mini" class="mar-right btnbox" :disabled="tableLoading" @click="exportData">导出数据</el-button>
        <el-button type="primary" size="mini" class="mar-right btnbox" @click="clearLog">清除日志</el-button>
        <div class="tool-item mar-right">
          <el-checkbox v-model="showConsole">隐藏日志</el-checkbox>
        </div>
      </div>
    </div>
    <div class="content">
      <u-table
        ref="multipleTable"
        v-loading="tableLoading"
        :data="tableDataCut"
        tooltip-effect="dark"
        max-height="665px"
        :row-height="80"
        use-virtual
        :big-data-checkbox="checked"
        :data-changes-scroll-top="false"
        @selection-change="selectionChange"
      >
        <u-table-column type="selection" width="55" />
        <u-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </u-table-column>
        <u-table-column width="120px" label="站点" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
        </u-table-column>
        <u-table-column min-width="100px" label="店铺名称" prop="platform_mall_name" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.mall_alias_name ? scope.row.mall_alias_name : scope.row.platform_mall_name }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" prop="order_sn" label="订单编号" min-width="120">
          <template slot-scope="scope">
            <p class="tableActive" @click="viewDetails('orderDetail', scope.row.order_id, scope.row.platform_mall_id)">{{ scope.row.order_sn }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" prop="product_name" label="商品名称" min-width="80" show-overflow-tooltip />
        <u-table-column align="center" prop="product_id" label="商品ID" width="120">
          <template slot-scope="scope">
            <p class="tableActive" @click="openUrl(scope.row)">{{ scope.row.product_id }}</p>
          </template>
        </u-table-column>
        <u-table-column label="商品图片" prop="product_cover" align="center">
          <template slot-scope="scope">
            <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px; display: inline-block">
              <div slot="content">
                <el-image :src="[scope.row.country, scope.row.platform_mall_id, scope.row.product_cover] | imageRender" style="width: 400px; height: 400px" />
              </div>
              <el-image :src="[scope.row.country, scope.row.platform_mall_id, scope.row.product_cover] | imageRender" style="width: 56px; height: 56px" />
            </el-tooltip>
          </template>
        </u-table-column>
        <u-table-column prop="user_name" label="买家姓名" align="center" min-width="90px" />
        <u-table-column align="center" prop="rating_star" label="评价星数" min-width="100">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rating_star" />
          </template>
        </u-table-column>
        <u-table-column align="center" prop="ctime" label="评价时间" min-width="70">
          <template slot-scope="scope">
            {{ $dayjs(scope.row.ctime * 1000).format('YYYY-MM-DD HH:MM') }}
          </template>
        </u-table-column>
        <u-table-column align="center" prop="comment" label="评价内容" min-width="80" show-overflow-tooltip />
        <u-table-column align="center" label="您的回复" min-width="80" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.reply && scope.row.reply.comment">{{ scope.row.reply.comment }}</div>
            <div v-else>
              <el-button type="primary" size="mini" @click="singleReplay(scope.$index)">回复</el-button>
            </div>
          </template>
        </u-table-column>
        <u-table-column align="center" label="回复时间" min-width="80">
          <template v-if="scope.row.reply" slot-scope="scope">
            {{ $dayjs(scope.row.reply.ctime * 1000).format('YYYY-MM-DD HH:MM') }}
          </template>
        </u-table-column>
        <u-table-column align="center" prop="replyStatus" label="操作状态" min-width="70" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :style="scope.row.statusColor && 'color:' + scope.row.statusColor"> {{ scope.row.replyStatus }}</span>
          </template>
        </u-table-column>
      </u-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[1000, 2000, 5000, 10000]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <Logs ref="Logs" v-model="showConsole" clear />
    <el-dialog title="回复内容编辑" :visible.sync="replayTextVisible" width="30%">
      <div class="replay-dialog">
        <el-input v-model="replayText" type="textarea" :rows="8" placeholder="请输入内容" />
        <el-button type="primary" size="mini" class="btn" @click="userReplaySave">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { exportExcelDataCommon } from '../../../util/util'
import storeChoose from '../../../components/store-choose'
export default {
  components: {
    storeChoose
  },
  data() {
    return {
      checked: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      countryVal: '',
      groupId: '',
      mallSelect: '',
      countries: this.$filters.countries_option,
      assessTime: [],
      tableDataCut: [],
      tableData: [],
      tableLoading: false,
      replayType: '',
      replayTypeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '待回复'
        },
        {
          value: '2',
          label: '已回复'
        }
      ],
      startNum: '',
      startNumList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '5',
          label: '五颗星'
        },
        {
          value: '4',
          label: '四颗星'
        },
        {
          value: '3',
          label: '三颗星'
        },
        {
          value: '2',
          label: '两颗星'
        },
        {
          value: '1',
          label: '一颗星'
        }
      ],
      userName: '',
      userTypeSelect: '1',
      userType: [
        {
          value: '1',
          label: '用户名称'
        },
        {
          value: '2',
          label: '商品名称'
        },
        {
          value: '3',
          label: '规格名称'
        }
      ],
      showConsole: true, // 日志
      pageSize: 1000, // 页码
      currentPage: 1, // 页码
      total: 0, // 表格总数
      replayTextVisible: false, // 回复弹窗
      replayText: '',
      isBatchReplay: false,
      multipleSelection: [],
      selectMallList: [],
      cancelAction: false,
      rowInfo: {},
      mallPageSize: 50,
      rowIndex: null
    }
  },
  mounted() {},
  methods: {
    // 打开订单页面
    viewDetails(type, id, shopId) {
      const reqStr = {
        type: type,
        shopId: shopId,
        id: id
      }
      this.$BaseUtilService.getOrderDetailInfo(shopId, JSON.stringify(reqStr))
    },
    // 查询列表
    async searchRate() {
      this.cancelAction = false
      if (!this.selectMallList.length) {
        return this.$message.warning('请选择店铺')
      }
      this.clearLog()
      this.showConsole = false
      this.$refs.Logs.writeLog('开始查询', true)
      this.tableData = []
      this.tableDataCut = []
      this.total = 0
      this.tableLoading = true
      try {
        for (let i = 0; i < this.selectMallList.length; i++) {
          if (this.cancelAction) {
            this.tableLoading = false
            this.$refs.Logs.writeLog(`操作已取消！`, true)
            return
          }
          const mall = this.selectMallList[i]
          const pageNumber = 1
          await this.searchSingleMall(pageNumber, mall)
        }
      } catch (error) {
        console.log(error)
        this.tableLoading = false
      }
      this.tableLoading = false
    },
    // 查询
    async searchSingleMall(pageNumber, mall, dataArr = [], page = 0) {
      const params = {
        page_number: pageNumber,
        page_size: this.mallPageSize,
        cursor: 0,
        shop_id: mall.platform_mall_id
      }
      if (this.assessTime.length) {
        params.ctime_start = Math.round(new Date(this.assessTime[0]).getTime() / 1000)
        params.ctime_end = Math.round(new Date(this.assessTime[1]).getTime() / 1000)
      }
      if (this.startNum) {
        params.rating_star = this.startNum
      }
      if (this.userName) {
        if (this.userTypeSelect === '1') {
          params.user_name = this.userName
        } else if (this.userTypeSelect === '2') {
          params.product_name = this.userName
        } else if (this.userTypeSelect === '3') {
          params.model_name = this.userName
        }
      }
      if (this.replayType === '1') {
        params.replied = false
      } else if (this.replayType === '2') {
        params.replied = true
      }
      try {
        const res = await this.$shopeemanService.getShopEvaluateList(mall.country, params)
        const resObj = JSON.parse(res)
        if (resObj.status === 200) {
          const data = JSON.parse(resObj.data)
          console.log('data', data)
          if (data.code === 0) {
            const count = data.data.list.length
            data.data.list &&
              data.data.list.forEach(async(item) => {
                item.country = mall.country
                item.platform_mall_name = mall.platform_mall_name
                item.mall_alias_name = mall.mall_alias_name
                item.platform_mall_id = mall.platform_mall_id
                item.replyStatus = ''
                item.statusColor = ''
                item.productUrl = await this.productUrl(item)
                const index = dataArr.filter((i) => i.comment_id === item.comment_id)[0] || ''
                console.log('index', index)
                !index && dataArr.push(item)
                !index && this.tableData.push(item)
                this.total = this.tableData.length
                this.dataCut()
              })
            count && this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取到第【${++page}】页店铺评价数据【${count}】条`, true)
            if (dataArr.length < data.data.page_info.total && data.data.list.length >= this.mallPageSize) {
              pageNumber++
              this.searchSingleMall(pageNumber, mall, dataArr, page)
            } else {
              this.total += dataArr.length
              this.dataCut()
            }
          } else {
            this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】${data.message}！`, false)
          }
        } else if (resObj.status === 403) {
          this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】请检查店铺是否登录！`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】获取失败！`, false)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 导出数据
    async exportData() {
      if (!this.tableData.length) {
        return this.$message.warning('没有可以导出的订单')
      }
      console.log('点击导出13')
      let num = 1
      let str = `<tr>
              <td>编号</td>
              <td>站点</td>
              <td>店铺名</td>
              <td>订单编号</td>
              <td>商品链接</td>
              <td>图片链接</td>
              <td>商品名称</td>
              <td>买家姓名</td>
              <td>评价星数</td>
              <td>评价时间</td>
              <td>评价内容</td>
              <td>您的回复</td>
              <td>回复时间</td>
            </tr>`
      for (let i = 0; i < this.tableData.length; i++) {
        const item = this.tableData[i]
        console.log(item.product_name, '13')
        str += `<tr><td>${num++}</td>
                    <td style="mso-number-format:'\@';">${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
                    <td>${item.platform_mall_name ? item.platform_mall_name : '' + '\t'}</td>
                    <td style="mso-number-format:'\@';">${item.order_sn && item.order_sn + '\t'}</td>
                    <td>${item.productUrl ? item.productUrl : '' + '\t'}</td>
                    <td>${item.product_cover ? this.$filters.imageRender([item.country, item.platform_mall_id, item.product_cover]) : '' + '\t'}</td>
                    <td>${(item.product_name || '111') + '\t'}</td>
                    <td>${item.user_name ? item.user_name : '' + '\t'}</td>
                    <td>${item.rating_star ? item.rating_star : '' + '\t'}</td>
                    <td>${item.ctime ? this.$dayjs(item.ctime * 1000).format('YYYY-MM-DD HH:MM') : '' + '\t'}</td>
                    <td>${item.comment ? item.comment : '' + '\t'}</td>
                    <td>${item.reply && item.reply.comment ? item.reply.comment : '' + '\t'}</td>
                    <td>${item.reply && item.reply.ctime ? this.$dayjs(item.reply.ctime * 1000).format('YYYY-MM-DD HH:MM') : '' + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('商店评价信息', str)
    },
    // 单个回复
    singleReplay(index) {
      this.rowIndex = index
      this.replayTextVisible = true
    },
    // 批量回复
    batchReplay() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先勾选数据！')
      }
      this.isBatchReplay = true
      this.replayTextVisible = true
    },
    // 回复信息
    async userReplay(row) {
      const params = {
        order_id: row.order_id,
        comment_id: row.comment_id,
        comment: this.replayText,
        shop_id: row.platform_mall_id
      }
      console.log(params)
      const index = this.tableData.findIndex((n) => {
        return n.comment_id === row.comment_id
      })
      const indexCut = this.tableDataCut.findIndex((n) => {
        return n.comment_id === row.comment_id
      })
      if (row.reply && row.reply.ctime) {
        this.tableData[index].replyStatus = '已经回复过了'
        this.tableData[index].statusColor = 'green'
        this.$refs.multipleTable.toggleRowSelection(this.tableDataCut[indexCut], false)
        return
      }
      const res = await this.$shopeemanService.replyShopRating(row.country, params)
      const resObj = JSON.parse(res)
      if (resObj.status === 200) {
        const data = JSON.parse(resObj.data)
        if (data.code === 0) {
          if (this.tableData[index].reply) {
            this.tableData[index].reply.ctime = Math.round(new Date().getTime() / 1000)
            this.tableData[index].reply.comment = this.replayText
          } else {
            this.tableData[index].reply = {}
            this.tableData[index].reply.comment = this.replayText
            this.tableData[index].reply.ctime = Math.round(new Date().getTime() / 1000)
          }
          this.tableData[index].replyStatus = '回复成功'
          this.tableData[index].statusColor = 'green'
          this.replayTextVisible = false
          this.$refs.multipleTable.toggleRowSelection(this.tableDataCut[indexCut], false)
        } else {
          this.tableData[index].replyStatus = data.message
        }
      } else if (resObj.status === 403) {
        this.tableData[index].statusColor = 'red'
        this.tableData[index].replyStatus = '请检查店铺是否登录'
      } else {
        this.tableData[index].statusColor = 'red'
        this.tableData[index].replyStatus = '操作失败'
      }
    },
    userReplaySave() {
      if (this.isBatchReplay) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.userReplay(this.multipleSelection[i])
        }
      } else {
        this.userReplay(this.tableData[this.rowIndex])
      }
      this.isBatchReplay = false
    },
    async productUrl(row) {
      const params = {
        platform_mall_id: row.platform_mall_id
      }
      const webUrl = await this.$shopeemanService.getWebUrl(row.country, params)
      // const webUrl = await this.$shopeeManConfig.getSiteWebUrl(row.country)
      const url = webUrl + '/product' + '/' + row.platform_mall_id + '/' + row.product_id
      return url
    },
    // 打开外部窗口
    async openUrl(row) {
      const params = {
        platform_mall_id: row.platform_mall_id
      }
      const webUrl = await this.$shopeemanService.getWebUrl(row.country, params)
      // const webUrl = await this.$shopeeManConfig.getSiteWebUrl(row.country)
      const url = webUrl + '/product' + '/' + row.platform_mall_id + '/' + row.product_id
      this.$BaseUtilService.openUrl(url)
    },
    //   表格选择
    selectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    changeMallList(val) {
      this.selectMallList = val
      console.log('changeMallList', val)
    },
    // 分页设置
    dataCut() {
      this.tableDataCut = this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.dataCut()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.dataCut()
    },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    }
  }
}
</script>

<style lang="less" scoped>
.store-evaluation {
  // min-width: 1200px;
  margin: 10px;
}
.mar-right {
  margin-right: 10px;
}
.miniSelectBox {
  width: 100px;
}
.btnbox {
  width: 80px;
}
.activeColor {
  color: red;
}
.tool-bar {
  height: 100px;
  background: #fff;
  overflow-x: auto;
  .tool-row {
    margin: 10px 10px 0 0;
    display: flex;
    align-items: center;
    width: 1010px;
    // flex-wrap: wrap;
    .tool-item {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 80px;
        text-align: right;
      }
      // .el-select{
      //   flex:1;
      // }
    }
  }
}
.content {
  margin: 10px 0;
  background: #fff;
  height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: 35px;
  }
  .tableActive {
    color: red;
    cursor: pointer;
  }
}
.replay-dialog {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .btn {
    margin-top: 20px;
  }
}
</style>

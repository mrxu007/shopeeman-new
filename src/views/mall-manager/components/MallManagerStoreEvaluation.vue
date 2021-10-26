<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-26 12:16:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\mall-manager\components\MallManagerWithdrawalRecord.vue
-->
<template>
  <div class="store-evaluation">
    <div class="tool-bar">
      <div class="tool-row">
        <storeChoose @changeMallList="changeMallList"></storeChoose>
        <div class="tool-item">
          <span>时间：</span>
          <el-date-picker
            v-model="assessTime"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            style="width: 200px"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </div>
      </div>
      <div class="tool-row">
        <div class="tool-item mar-right">
          <span>回复类型：</span>
          <el-select v-model="replayType" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in replayTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="tool-item mar-right">
          <span>评价星数：</span>
          <el-select v-model="startNum" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in startNumList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="tool-item mar-right">
          <el-input placeholder="请输入内容" v-model="userName" size="mini" class="input-with-select" clearable>
            <el-select v-model="userTypeSelect" slot="prepend" placeholder="用户名称" style="width: 120px" >
              <el-option v-for="(item, index) in userType" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-input>
        </div>
        <el-button type="primary" size="mini" class="mar-right" @click="searchRate" :disabled="tableLoading">查询</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="batchReplay" :disabled="tableLoading">批量回复</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="cancelAction = true">取消操作</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="exportData" :disabled="tableLoading">导出数据</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="clearLog">清除日志</el-button>
        <div class="tool-item mar-right">
          <el-checkbox v-model="showConsole">隐藏日志</el-checkbox>
        </div>
      </div>
    </div>
    <div class="content">
      <el-table v-loading="tableLoading" ref="multipleTable" :data="tableDataCut" tooltip-effect="dark" max-height="650" @selection-change="selectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column width="120px" label="站点" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
        </el-table-column>
        <el-table-column min-width="100px" label="店铺名称" prop="platform_mall_name" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.mall_alias_name ? scope.row.mall_alias_name : scope.row.platform_mall_name }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="order_sn" label="订单编号" min-width="120">
          <template slot-scope="scope">
            <p class="tableActive">{{ scope.row.order_sn }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="product_name" label="商品名称" min-width="80" show-overflow-tooltip />
        <el-table-column align="center" prop="product_id" label="商品ID" width="120">
          <template slot-scope="scope">
            <p class="tableActive" @click="openUrl(scope.row)">{{ scope.row.product_id }}</p>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" prop="product_cover" align="center">
          <template slot-scope="scope">
            <el-image v-bind:src="[scope.row.country, scope.row.platform_mall_id, scope.row.product_cover] | imageRender" style="width: 60px; height: 60px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="买家姓名" align="center" min-width="90px" />
        <el-table-column align="center" prop="rating_star" label="评价星数" min-width="100">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rating_star" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ctime" label="评价时间" min-width="70">
          <template slot-scope="scope">
            {{ $dayjs(scope.row.ctime * 1000).format('YYYY-MM-DD HH:MM') }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="comment" label="评价内容" min-width="80" show-overflow-tooltip />
        <el-table-column align="center" label="您的回复" min-width="80" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.reply && scope.row.reply.comment">{{ scope.row.reply.comment }}</div>
            <div v-else>
              <el-button type="primary" size="mini" @click="singleReplay(scope.$index)">回复</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="回复时间" min-width="80">
          <template slot-scope="scope" v-if="scope.row.reply">
            {{ $dayjs(scope.row.reply.ctime * 1000).format('YYYY-MM-DD HH:MM') }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="replyStatus" label="操作状态" min-width="70" show-overflow-tooltip>
          <template slot-scope="scope"> {{scope.row.replyStatus}}</template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <Logs ref="Logs" clear v-model="showConsole" />
    <el-dialog title="回复内容编辑" :visible.sync="replayTextVisible" width="30%">
      <div class="replay-dialog">
        <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="replayText"> </el-input>
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
    storeChoose,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      countryVal: '',
      groupId: '',
      mallSelect: '',
      countries: [
        { label: '马来站', value: 'MY' },
        { label: '台湾站', value: 'TW' },
        { label: '新加坡站', value: 'SG' },
        { label: '菲律宾站', value: 'PH' },
        { label: '泰国站', value: 'TH' },
        { label: '越南站', value: 'VN' },
        { label: '印尼站', value: 'ID' },
        { label: '巴西站', value: 'BR' },
      ],
      assessTime: [],
      tableDataCut: [],
      tableData: [],
      tableLoading: false,
      replayType: '',
      replayTypeList: [
        {
          value: '',
          label: '全部',
        },
        {
          value: '1',
          label: '待回复',
        },
        {
          value: '2',
          label: '已回复',
        },
      ],
      startNum: '',
      startNumList: [
        {
          value: '',
          label: '全部',
        },
        {
          value: '5',
          label: '五颗星',
        },
        {
          value: '4',
          label: '四颗星',
        },
        {
          value: '3',
          label: '三颗星',
        },
        {
          value: '2',
          label: '两颗星',
        },
        {
          value: '1',
          label: '一颗星',
        },
      ],
      userName: '',
      userTypeSelect: '1',
      userType: [
        {
          value: '1',
          label: '用户名称',
        },
        {
          value: '2',
          label: '商品名称',
        },
        {
          value: '3',
          label: '规格名称',
        },
      ],
      showConsole: true,
      pageSize: 20, //页码
      currentPage: 1, //页码
      total: 0, //表格总数
      replayTextVisible: false, //回复弹窗
      replayText: '',
      isBatchReplay: false,
      multipleSelection: [],
      selectMallList: [],
      cancelAction: false,
      rowInfo: {},
      mallPageSize: 50,
    }
  },
  methods: {
    //查询列表
    async searchRate() {
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
          let mall = this.selectMallList[i]
          let pageNumber = 1
          console.log(pageNumber)
          await this.searchSingleMall(pageNumber, mall)
        }
      } catch (error) {
        console.log(error)
        this.tableLoading = false
      }
      this.dataCut()
      this.tableLoading = false
    },
    //查询
    async searchSingleMall(pageNumber, mall, dataArr = [], page = 0) {
      let params = {
        page_number: pageNumber,
        page_size: this.mallPageSize,
        cursor: 0,
        shop_id: mall.platform_mall_id,
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
        let res = await this.$shopeemanService.getShopEvaluateList(mall.country, params)
        let resObj = JSON.parse(res)
        if (resObj.status !== 200) {
          this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】请检查店铺是否登录！`, false)
        } else {
          let data = JSON.parse(resObj.data)
          console.log(data)
          if (data.code === 0) {
            let count = data.data.list.length
            if(count===0){
              this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取到第【${++page}】页店铺评价数据【${count}】条`, true)
            }
            data.data.list &&
              data.data.list.forEach((item) => {
                item.country = mall.country
                item.platform_mall_name = mall.platform_mall_name
                item.mall_alias_name = mall.mall_alias_name
                item.platform_mall_id = mall.platform_mall_id
                item.replyStatus = '123'
                let index = dataArr.filter((i) => i.comment_id === item.comment_id)[0] || ''
                index && count--
                !index && dataArr.push(item)
                !index && this.tableData.push(item)
              })
            count && this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取到第【${++page}】页店铺评价数据【${count}】条`, true)
            if (dataArr.length < data.data.page_info.total && data.data.list.length >= this.mallPageSize) {
              pageNumber++
              this.searchSingleMall(pageNumber, mall, dataArr, page)
            } else {
              this.total += dataArr.length
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    //导出数据
    exportData() {
      if (!this.tableData.length) {
        return this.$message.warning('没有可以导出的订单')
      }
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
        let item = this.tableData[i]
        str += `<tr><td>${num++}</td> 
                    <td style="mso-number-format:'\@';">${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
                    <td>${item.platform_mall_name ? item.platform_mall_name : '' + '\t'}</td>
                    <td style="mso-number-format:'\@';">${item.order_sn && item.order_sn + '\t'}</td>
                    <td>${item.product_id ? location.origin + '/product' + '/' + item.platform_mall_id + '/' + item.product_id : '' + '\t'}</td>
                    <td>${item.product_cover ? this.$filters.imageRender([item.country, item.platform_mall_id, item.product_cover]) : '' + '\t'}</td>
                    <td>${item.product_name ? item.product_name : '' + '\t'}</td> 
                    <td>${item.user_name ? item.user_name : '' + '\t'}</td>
                    <td>${item.rating_star ? item.rating_star : '' + '\t'}</td>
                    <td>${item.ctime ? this.$dayjs(item.ctime * 1000).format('YYYY-MM-DD HH:MM') : '' + '\t'}</td>
                    <td>${item.user_portrait ? item.user_portrait : '' + '\t'}</td>
                    <td>${item.reply && item.reply.comment ? item.reply.comment : '' + '\t'}</td>
                    <td>${item.reply && item.reply.ctime ? this.$dayjs(item.reply.ctime * 1000).format('YYYY-MM-DD HH:MM') : '' + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('商店评价信息', str)
    },
    //单个回复
    singleReplay(index) {
      this.rowIndex = index
      this.replayTextVisible = true
    },
    //批量回复
    batchReplay() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先勾选数据！')
      }
      this.isBatchReplay = true
      this.replayTextVisible = true
    },
    //回复信息
    async userReplay(row) {
      let params = {
        order_id: row.order_id,
        comment_id: row.comment_id,
        comment: this.replayText,
        shop_id: row.platform_mall_id,
      }
      console.log(params)
      let index = this.tableData.findIndex((n) => {
        return n.comment_id === row.comment_id
      })
      if(row.reply&&row.reply.ctime){
        this.tableData[index].replyStatus = '已经回复过了'
        this.$refs.multipleTable.toggleRowSelection(this.tableData[index], false)
        return 
      }
      let res = await this.$shopeemanService.replyShopRating(row.country, params)
      let resObj = JSON.parse(res)
      if (resObj.status !== 200) {
        this.tableData[index].replyStatus = '请检查店铺是否登录'
      } else {
        let data = JSON.parse(resObj.data)
        if (data.code === 0) {
          if(this.tableData[index].reply){
            this.tableData[index].reply.ctime = Math.round((new Date().getTime()) / 1000)
            this.tableData[index].reply.comment = this.replayText
          }else{
            this.tableData[index].reply = {}
            this.tableData[index].reply.comment = this.replayText
            this.tableData[index].reply.ctime = Math.round((new Date().getTime()) / 1000)
          }
          this.tableData[index].replyStatus = '回复成功'
          this.replayTextVisible = false
          this.$refs.multipleTable.toggleRowSelection(this.tableData[index], false)
        } else {
          this.tableData[index].replyStatus = data.message
        }
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
    },
    //打开外部窗口
    openUrl(row) {
      let url = location.origin + '/product' + '/' + row.platform_mall_id + '/' + row.product_id
      this.$BaseUtilService.openUrl(url)
    },
    //   表格选择
    selectionChange(val) {
      this.multipleSelection = val
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
    //清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
  },
}
</script>

<style lang="less" scoped>
.store-evaluation {
  min-width: 1280px;
  margin: 10px;
}
.mar-right {
  margin-right: 10px;
}
.activeColor {
  color: red;
}
.tool-bar {
  height: 100px;
  background: #fff;
  .tool-row {
    padding: 16px 16px 0 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .tool-item {
      //   margin-top: 10px;
      display: flex;
      align-items: center;
    }
  }
}
.content {
  margin: 20px 0;
  background: #fff;
  height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

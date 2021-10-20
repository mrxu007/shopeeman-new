<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-20 18:01:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\mall-manager\components\MallManagerWithdrawalRecord.vue
-->
<template>
  <div class="store-evaluation">
    <div class="tool-bar">
      <div class="tool-row">
        <storeChoose @changeMallList="changeMallList"></storeChoose>
        <!-- <div class="tool-item mar-right">
          <span>站点：</span>
          <el-select v-model="countryVal" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="tool-item mar-right">
          <span>店铺分组：</span>
          <el-select v-model="groupId" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option label="无分组" :value="-1" />
            <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item" />
          </el-select>
        </div>
        <div class="tool-item mar-right">
          <span>店铺：</span>
          <el-select v-model="mallSelect" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in 4" :key="index" />
          </el-select>
        </div> -->
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
          >
          </el-date-picker>
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
          <el-input placeholder="请输入内容" v-model="userName" size="mini" class="input-with-select">
            <el-select v-model="userNameSelect" slot="prepend" placeholder="用户名称" style="width: 120px">
              <el-option v-for="(item, index) in userType" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-input>
        </div>
        <el-button type="primary" size="mini" class="mar-right" @click="searchRate">查询</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="batchReplay">批量回复</el-button>
        <el-button type="primary" size="mini" class="mar-right">取消操作</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="exportData">导出数据</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="clearLog">清除日志</el-button>
        <div class="tool-item mar-right">
          <el-checkbox v-model="showConsole">隐藏日志</el-checkbox>
        </div>
      </div>
    </div>
    <div class="content">
      <el-table v-loading="tableLoading" ref="multipleTable" :data="tableData" tooltip-effect="dark" max-height="650" @selection-change="selectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="站点" prop="warehouse_name" align="center" />
        <el-table-column min-width="100px" label="店铺名称" prop="trans_number" align="center" />
        <el-table-column align="center" prop="order_sn" label="订单编号" min-width="120">
          <template slot-scope="scope">
            <p class="tableActive" >{{ scope.row.order_sn }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="product_name" label="商品名称" min-width="80" show-overflow-tooltip />
        <el-table-column align="center" prop="product_id" label="商品ID" min-width="70">
          <template slot-scope="scope">
            <p class="tableActive" @click="openUrl(scope.row)">{{ scope.row.product_id }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="product_cover" label="商品图片" min-width="70">
          <template slot-scope="scope"> </template>
        </el-table-column>
        <el-table-column prop="user_name" label="买家姓名" align="center" min-width="90px" />
        <el-table-column align="center" prop="rating_star" label="评价星数" min-width="100">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rating_star"></el-rate>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ctime" label="评价时间" min-width="70">
          <template slot-scope="scope">
            {{ $dayjs(scope.row.ctime * 1000).format('YYYY-MM-DD HH:MM') }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="user_portrait" label="评价内容" min-width="80" show-overflow-tooltip />
        <el-table-column align="center" label="您的回复" min-width="80" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.reply.comment">{{ scope.row.reply.comment }}</div>
            <div v-else>
              <el-button type="primary" size="mini" @click="singleReplay">回复</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="回复时间" min-width="80">
          <template slot-scope="scope">
            {{ $dayjs(scope.row.reply.ctime * 1000).format('YYYY-MM-DD HH:MM') }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="trans_status" label="操作状态" min-width="70">
          <template slot-scope="scope"> </template>
        </el-table-column>
      </el-table>
    </div>
    <Logs ref="Logs" clear v-model="showConsole" />
    <el-dialog title="回复内容编辑" :visible.sync="replayTextVisible" width="30%">
      <div class="replay-dialog">
        <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="replayText"> </el-input>
        <el-button type="primary" size="mini" class="btn" @click="userReplay">确定</el-button>
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
      tableData: [
        {
          comment_id: 1940787567,
          is_hidden: false,
          rating_star: 5,
          comment: '',
          images: [],
          ctime: 1578480210,
          user_id: 46644576,
          user_name: 'tanyin2',
          user_portrait: '',
          order_id: 31986779381556,
          order_sn: '200106VQ0A4USM',
          product_id: 3514088694,
          model_id: 0,
          product_cover: '75b327a8ad9496bc03d554afd834b0e7',
          product_name: '❃▽ถูกสุด+ไม่ต้องรอของ สติ๊กเกอร์ติดเล็บ‼️รุ่นใหม่ Gel Nail Strip ลายน่ารักไม่ซ้ำใคร คละสี',
          model_name: 'DA138|DA180|DA127|DA137|DA179|DA157|DA167|DA134|DA147|DA142|DA136|DA197|DA162|DA144|DA119|DA102|DA146|DA111|DA109|DA195',
          reply: {
            comment: '24242',
            is_hidden: false,
            comment_id: 1940787567,
            ctime: 1627719018,
          },
        },
      ],
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
          value: '',
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
      userNameSelect: '',
      userType: [
        {
          value: '用户名称',
          label: '用户名称',
        },
        {
          value: '商品名称',
          label: '商品名称',
        },
        {
          value: '规格名称',
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
    }
  },
  methods: {
    //查询列表
    async searchRate() {
      console.log(this.assessTime)
      let params = {
        rating_star: this.startNum, //全部不传
        page_number: this.currentPage,
        page_size: this.pageSize,
        user_name: this.userName,
        ctime_start: this.assessTime.length ? Math.round(new Date(this.assessTime[0]).getTime() / 1000) : '',
        ctime_end: this.assessTime.length ? Math.round(new Date(this.assessTime[1]).getTime() / 1000) : '',
        cursor: 0,
        // from_page_number:1
      }
      console.log(params)
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
                    <td style="mso-number-format:'\@';">${item.trade_no ? item.trade_no : '' + '\t'}</td>
                    <td>${item.amount ? item.amount : '' + '\t'}</td>
                    <td style="mso-number-format:'\@';">${item.order_sn && item.order_sn + '\t'}</td>
                    <td>${item.product_id ? location.origin + '/product' + '/' + item.mallID + '/' + item.product_id : '' + '\t'}</td>
                    <td>${item.image ? item.image : '' + '\t'}</td>
                    <td>${item.product_name ? item.product_name : '' + '\t'}</td> 
                    <td>${item.user_name ? item.user_name : '' + '\t'}</td>
                    <td>${item.rating_star ? item.rating_star : '' + '\t'}</td>
                    <td>${item.ctime ? this.$dayjs(item.ctime * 1000).format('YYYY-MM-DD HH:MM') : '' + '\t'}</td>
                    <td>${item.user_portrait ? item.user_portrait : '' + '\t'}</td>
                    <td>${item.reply.comment ? item.reply.comment : '' + '\t'}</td>
                    <td>${item.reply.ctime ? this.$dayjs(item.reply.ctime * 1000).format('YYYY-MM-DD HH:MM') : '' + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('商店评价信息', str)
    },
    //单个回复
    singleReplay(row) {
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
    userReplay() {},
    //打开外部窗口
    openUrl(row){
        let url = location.origin + '/product' + '/' + row.mallID + '/' + row.product_id
        window.open(url)
    },
    //   表格选择
    selectionChange(val) {
      this.multipleSelection = val
    },
    changeMallList(val) {
      console.log('changeMallList', val)
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
      display: flex;
      align-items: center;
    }
  }
}
.content {
  margin: 20px 0;
  background: #fff;
  height: calc(100vh - 150px);
  .tableActive{
      color:red;
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
<!--
 * @Author: your name
 * @Date: 2021-11-19 14:24:22
 * @LastEditTime: 2021-12-15 12:05:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\uploadStoreShipAmount.vue
-->
<template>
  <div class="ship-amount">
    <div class="content">
      <div class="content-left">
        <div class="left-header-btn">
          <el-upload style="margin-left: 20px" class="upload-demo" ref="upload" accept=".xlsx,.xls" :on-change="uploadShip" action="" :show-file-list="false" :auto-upload="false">
            <el-button type="primary" size="mini" class="mar-right">批量导入</el-button>
          </el-upload>
          <el-button type="primary" size="mini" @click="downTemplate" class="mar-right">下载批量模板</el-button>
          <el-button type="primary" size="mini" class="mar-right" @click="exportData">导出右侧数据</el-button>
          <el-tooltip class="item" effect="dark" content="仓库发货金额以主订单为维度进行上报，系统自动分配金额至子订单，金额单位为人民币" placement="right-end">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
        <div class="left-log">
          <span>导入信息：</span>
          <div v-html="consoleMsg" class="consoleBox"></div>
        </div>
        <div class="left-header-btn mar-top">
          <el-button type="primary" size="mini" @click="batchUpload" :disabled="clickLoading">批量上报</el-button>
          <el-button type="primary" size="mini" @click="closeWindow">关闭</el-button>
        </div>
      </div>
      <div class="content-right">
        <el-table ref="muliTbale" :data="tableData" tooltip-effect="dark" style="width: 100%" height="500">
          <el-table-column align="center" type="index" label="序号" width="50" />
          <el-table-column min-width="80px" label="站点" prop="country" align="center">
            <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
          </el-table-column>
          <el-table-column min-width="120px" label="店铺名称" prop="mallName" align="center">
            <template slot-scope="scope">{{ scope.row.mallName }}</template>
          </el-table-column>
          <el-table-column align="center" prop="orderSn" label="shopee订单号" min-width="140">
            <template slot-scope="scope">{{ scope.row.orderSn }}</template>
          </el-table-column>
          <el-table-column align="center" prop="orderStatus" label="当前订单状态" min-width="120">
            <template slot-scope="scope">{{ changeStatus(scope.row.orderStatus) }}</template>
          </el-table-column>
          <el-table-column align="center" prop="amount" label="仓库发货金额(元)" min-width="120">
            <template slot-scope="scope">{{ scope.row.amount }}</template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="操作状态" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.status }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { orderStatusName } from './orderCenter'
import { exportExcelDataCommon } from '../../../../util/util'
import XLSX from 'xlsx'
export default {
  name: 'UploadStoreShipAmount',
  data() {
    return {
      consoleMsg: '',
      tableData: [],
      clickLoading:false
    }
  },
  methods: {
    changeStatus(val) {
      return orderStatusName(val)
    },
    //导出数据
    async exportData() {
      if (!this.tableData.length) {
        return this.$message.warning('没有可导出的数据！')
      }
      let num = 1
      let str = `<tr>
        <td>编号</td>
        <td>站点</td>
        <td>店铺名称</td>
        <td>shopee订单号</td>
        <td>当前订单状态</td>
        <td>仓库发货金额(元)</td>
        <td>操作状态</td>
    </tr>`
    for (let i = 0; i < this.tableData.length; i++) {
        const item = this.tableData[i]
        str += `<tr><td>${num++}</td>
                    <td>${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
                    <td>${item.mallName ? item.mallName : '' + '\t'}</td>
                    <td>${item.orderSn ? item.orderSn : '' + '\t'}</td>
                    <td>${item.orderStatus ? this.changeStatus(item.orderStatus) : '' + '\t'}</td>
                    <td>${item.amount ? item.amount : '' + '\t'}</td> 
                    <td>${item.status ? item.status : '' + '\t'}</td> 
                </tr>`
      }
      exportExcelDataCommon('仓库发货金额信息', str)
    },
    //批量上报
    async batchUpload() {
      if (!this.tableData.length) {
        return this.$message.warning('请先导入数据')
      }
      let ids = ''
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          ids = item.orderSn
        } else {
          ids = ids + ',' + item.orderSn
        }
      })
      try {
      this.clickLoading = true
      let params = { orderSns: ids }
      let res = await this.$api.getOrderBySn(params)
      if (res.data.code === 200) {
        res.data.data.forEach((item) => {
          let index = this.tableData.findIndex((subItem) => {
            return subItem.orderSn == item.order_sn
          })
          if (index > -1) {
            this.tableData[index].country = item.country
            this.tableData[index].mallName = item.mall_name
            this.tableData[index].orderStatus = item.order_status
            this.tableData[index].main_order_sn = item.main_order_sn
          }
        })
      }
      for (let i = 0; i < this.tableData.length; i++) {
        let item = this.tableData[i]
        if (!item.country) {
          this.tableData[i].status = '失败，未匹配到订单'
        } else {
          let obj = {
            mainOrderSn: item.main_order_sn,
            amount: item.amount,
          }
          let res = await this.$api.uploadOrderWarehourseShipAmount(obj)
          console.log(res, 'res')
          if (res.data.code === 200) {
            this.tableData[i].status = '成功，已上报'
          } else {
            this.tableData[i].status = `失败，${res.data.message}`
          }
        }
      }
      this.clickLoading = false
      } catch (error) {
        console.log(error)
        this.clickLoading = false
        return this.$message.warning('操作失败，请重试')
      }
    },
    closeWindow(){
      this.$emit('close')
    },
    uploadShip(file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
      let files = { 0: file.raw }
      this.readExcel(files)
    },
    async readExcel(files) {
      this.consoleMsg = ''
      this.tableData = []
      this.writeLog(`读取文件开始`, true)
      if (files.length <= 0) {
        //如果没有文件名
        return false
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary',
          })
          const wsname = workbook.SheetNames[0] //取第一张表
          console.log(wsname, 'wsname')
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) //生成json表格内容
          console.log(ws, 'ws')
          let sour = ws
          let length = sour.length
          this.writeLog(`共读取到${length}条数据`, true)
          console.log(length, 'length')
          if (length === 0) {
            this.$message.error('导入信息不能为空')
            return
          }
          sour.forEach(async (item) => {
            let newdata = JSON.parse(JSON.stringify(item).replace('Shopee主订单号（必填，不要填写子订单号）', 'orderSn').replace('仓库发货金额（必填，单位为人民币）', 'amount'))
            let params = {
              country: '',
              mallName: '',
              orderSn: newdata.orderSn,
              orderStatus: '',
              amount: newdata.amount,
              status: '',
            }
            this.tableData.push(params)
          })
        } catch (error) {
          console.log(error)
        }
      }
      fileReader.readAsBinaryString(files[0])
    },
    // 打印日志
    writeLog(msg, success = true) {
      if (!msg) return
      const color = success ? 'green' : 'red'
      this.consoleMsg = `<p style="color:${color};margin-bottom:8px;">${msg}</p>` + this.consoleMsg
    },
    //下载批量模板
    downTemplate() {
      let str = `<tr>
              <td>Shopee主订单号（必填，不要填写子订单号）</td>
              <td>仓库发货金额（必填，单位为人民币）</td>
            </tr>`
      exportExcelDataCommon('批量上报仓库发货金额模板', str)
    },
  },
}
</script>

<style lang="less" scoped>
.ship-amount {
  .content {
    display: flex;
    .content-left {
      margin-right: 10px;
      flex: 2;
      .left-header-btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        i {
          height: 28px;
          width: 28px;
          line-height: 28px;
          font-size: 18px !important;
          cursor: pointer;
        }
      }
      .left-log {
        margin-top: 10px;
      }
      .consoleBox {
        border: 1px solid #dcdcdc;
        margin-top: 10px;
        height: 400px;
        padding: 10px;
      }
    }
    .content-right {
      flex: 5;
    }
  }
}
.mar-right {
  margin-right: 10px;
}
.mar-top {
  margin-top: 10px;
}
</style>
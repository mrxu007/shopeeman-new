<template>
  <div class="ship-amount">
    <div class="content">
      <div class="content-left">
        <div class="left-header-btn">
          <el-upload class="upload-demo" ref="upload" accept=".xlsx,.xls"
                     :on-change="importTemplateEvent" action="" :show-file-list="false" :auto-upload="false">
            <el-button type="primary" size="mini" class="mar-right">批量导入</el-button>
          </el-upload>
          <el-button type="primary" size="mini" @click="downloadTemplate" class="mar-right">下载批量模板</el-button>
          <el-tooltip class="item" effect="dark" content="订单导入数量不可超过1W条" placement="right-end">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
        <div class="left-log">
          <span>导入信息：</span>
          <div v-html="consoleMsg" class="consoleBox"></div>
        </div>
        <div class="left-header-btn mar-top">
          <el-button type="primary" size="mini" @click="batchUpload" :disabled="clickLoading">批量发货</el-button>
        </div>
      </div>
      <div class="content-right">
        <u-table ref="ordersShipmentTable" :data="ordersShipmentData" use-virtual tooltip-effect="dark" :row-height="30"
                 height="648" :header-cell-style="{backgroundColor: '#f5f7fa'}"
                 @selection-change="handleSelectionChange">
          <u-table-column align="left" type="selection" width="50px"/>
          <u-table-column align="left" label="序号" type="index" width="60px"/>
          <u-table-column align="left" label="站点" prop="country" width="80px">
            <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
          </u-table-column>
          <u-table-column align="left" label="店铺名称" prop="mallName" min-width="120px" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span class="copyStyle"
                    @dblclick="copyItem(row.mall_info.mall_alias_name || row.mall_info.platform_mall_name)">
                {{ row.mall_info.mall_alias_name || row.mall_info.platform_mall_name }}
            </span></template>
          </u-table-column>
          <u-table-column align="left" label="shopee订单号" prop="orderSn" width="170px" show-overflow-tooltip>
            <template slot-scope="{row}">
              <i class="el-icon-document-copy copyStyle" @click="copyItem(row.main_order_sn)"/>
              <span class="tableActive"
                    @click="viewDetails('orderDetail', row.order_id, row.mall_info.platform_mall_id)">
                {{ row.main_order_sn }}
              </span>
            </template>
          </u-table-column>
          <u-table-column align="left" label="当前订单状态" prop="orderStatus" width="100px" show-overflow-tooltip>
            <template slot-scope="scope">{{ changeStatus(scope.row.order_status) }}</template>
          </u-table-column>
          <u-table-column align="left" label="发货物流单号" prop="shippingTraceNo" width="170px" show-overflow-tooltip>
            <template slot-scope="{row}">{{ row.shippingTraceNo || row.tracking_no }}</template>
          </u-table-column>
          <u-table-column align="left" label="操作状态" prop="status" min-width="120px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.operation_status }}</span>
            </template>
          </u-table-column>
        </u-table>
      </div>
    </div>
  </div>
</template>

<script>
import { batchOperation, importOrder } from '@/util/util'
import xlsx from 'xlsx'
import { orderStatusName } from '@/views/order-manager/components/orderCenter/orderCenter'

export default {
  name: 'uploadOrdersShipment',
  data() {
    return {
      ordersShipmentData: [],
      tableSelect: [],
      clickLoading: false,
      consoleMsg: ''
    }
  },
  props: {
    selectMallList: {
      type: Array,
      default: []
    }
  },
  methods: {
    writeLog(msg, success = true) {
      if (!msg) return
      const color = success ? 'green' : 'red'
      this.consoleMsg = `<p style="color:${color};margin-bottom:8px;">${msg}</p>` + this.consoleMsg
    },
    changeStatus(val) {
      return orderStatusName(val)
    },
    // 打开订单页面
    viewDetails(type, id, shopId) {
      const reqStr = {
        type: type,
        shopId: shopId,
        id: id
      }
      this.$BaseUtilService.getOrderDetailInfo(shopId, JSON.stringify(reqStr))
    },
    // 点击复制
    copyItem(attr) {
      const target = document.createElement('div')
      target.id = 'tempTarget'
      target.style.opacity = '0'
      target.innerText = attr
      document.body.appendChild(target)
      try {
        const range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        this.$message.success('复制成功')
      } catch (e) {
        // console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    },
    async downloadTemplate() {
      let titleData = []
      const jsonData = []
      let importOrderName = ''
      // 下载修改店铺水印模板
      titleData = ['发货订单号(请填写订单主号)', '发货物流单号']
      importOrderName = '批量订单发货模板'
      await importOrder(titleData, jsonData, importOrderName)
    },
    importTemplateEvent(file) {
      this.consoleMsg = ''
      this.writeLog(`读取文件开始`, true)
      this.ordersShipmentData = []
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
        this.getOrdersShipment(ws)
      }
      fileReader.readAsBinaryString(files[0])
    },
    async getOrdersShipment(ws) {
      if (ws.length > 10000) {
        this.writeLog(`订单数量超过10000条`, false)
        return
      }
      let successNum = 0
      let sysMallId = [...this.selectMallList.map(son => son.id)]
      for (let i = 0; i < ws.length; i++) {
        let item = ws[i]
        let orderSn = item['发货订单号'] || item['发货订单号(请填写订单主号)']
        orderSn = orderSn.split('_')[0]
        let shippingTraceNo = item['发货物流单号'] || ''
        if (orderSn && shippingTraceNo) {
          let params = {
            timeType: 'payTime',
            otherTime: '',
            orderStatus: '1,2,3,4,5,6,7,8,9,10,20',
            shotStatus: '',
            isOwnOrder: '',
            isOverseasGoods: '',
            paymentMenthod: '',
            minGrossProfit: '',
            maxGrossProfit: '',
            goodsId: '',
            colorLabelId: 0,
            createTime: '',
            shotTime: '',
            sysMallId: sysMallId.toString(),
            logisticsIds: '',
            page: 1,
            pageSize: 20,
            orderSn: orderSn
          }
          const res = await this.$api.getOrderList(params)
          if (res.data && res.data.code === 200) {
            let data = res.data.data
            if (data.data && data.data.length > 0) {
              let ordersShipment = data.data && data.data[0]
              let index = this.ordersShipmentData.findIndex(son=> son.main_order_sn === ordersShipment.main_order_sn)
              console.log(ordersShipment)
              if (index < 0){
                if (ordersShipment.tracking_no){
                  this.ordersShipmentData.push(ordersShipment)
                  this.writeLog(`发货订单号【${orderSn}】已存在物流单号`, false)
                }else{
                  this.ordersShipmentData.push(Object.assign(ordersShipment, {
                    shippingTraceNo: shippingTraceNo
                  }))
                  this.writeLog(`发货订单号【${orderSn}】已获取到`, true)
                  ++successNum
                }
              }else{
                this.writeLog(`发货订单号【${orderSn}】已重复`, false)
              }
            } else {
              this.writeLog(`发货订单号【${orderSn}】未被找到`, false)
            }
          } else {
            this.writeLog(`发货订单号【${orderSn}】未被找到`, false)
          }
        } else if (orderSn) {
          this.writeLog(`发货订单号【${orderSn}】未匹配到发货物流单号`, false)
        } else if (shippingTraceNo) {
          this.writeLog(`发货物流单号【${orderSn}】未匹配到发货订单号`, false)
        }
      }
      this.writeLog(`读取文件结束共${ws.length}条,成功${successNum}条`, true)
    },
    handleSelectionChange(val) {
      this.tableSelect = val || []
    },
    async batchUpload() {
      await batchOperation(this.tableSelect, this.saveHandleOut, 3)
      this.$refs.ordersShipmentTable.toggleAllSelection()
    },
    async saveHandleOut(data, count = { count: 1 }) {
      let index = this.ordersShipmentData.findIndex(son=>son.order_id === data.order_id)
      try {
        if (data.order_status === 2 && !data.tracking_no){
          const params = {
            order_id: data.order_id,
            shipping_proof: data.logistics_name,
            shipping_trace_no: data.shippingTraceNo,
            channel_id: 79900,
            integrated: '',
            shop_id: data.mall_info.platform_mall_id
          }
          const res = await this.$shopeemanService.handleOutOrder(data.country, params)
          if (res.data === 200) {
            this.$refs.ordersShipmentTable.toggleRowSelection(data);
            this.$set(this.ordersShipmentData[index],'operation_status','发货成功！')
          } else {
            this.$set(this.ordersShipmentData[index],'operation_status','发货失败！')
          }
        }else{
          let status = data.tracking_no && this.changeStatus(data.order_status) || '已存在物流单号'
          this.$set(this.ordersShipmentData[index],'operation_status',`无法发货：为${status}状态！`)
        }
      } catch (error) {
        console.log(error)
      }finally {
        count.count--
      }
    }
  }
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
        height: 550px;
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

.copyStyle {
  margin-right: 8px;
  cursor: pointer;
}

.tableActive {
  color: red;
  cursor: pointer;
}
</style>
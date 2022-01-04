
<template>
  <div class="delivery-manager">
    <div class="selectBox">
      <!-- left box -->
      <div class="left-box mar-right">
        <div class="base-box">
          <span class="base-title">基础操作</span>
          <div class="base-item base-left">
            <el-row class="row-style">
              <el-button size="mini" type="primary" class="btnWidth" @click="syncSurfaceBefore">批量同步面单信息</el-button>
              <el-button size="mini" type="primary" class="btnWidth" @click="batnchDownLoad(multipleSelection, 'down')">批量下载平台面单</el-button>
            </el-row>
            <el-row class="row-style">
              <el-button size="mini" type="primary" class="btnWidth" @click="batnchDownLoad(multipleSelection, 'view')">批量预览打印平台面单</el-button>
              <el-button size="mini" type="primary" class="btnWidth" @click="getExportData">导出数据</el-button>
            </el-row>
            <el-row class="row-style">
              <el-button size="mini" type="primary" class="btnWidth" @click="downTWface">批量打印台湾虚拟面单</el-button>
              <el-button size="mini" type="primary" class="btnWidth" @click="downLoadPickList">批量下载拣货单</el-button>
            </el-row>
          </div>
        </div>
      </div>
      <!-- right select box -->
      <div class="right-box">
        <div class="base-box">
          <span class="base-title">列表筛选操作</span>
          <div class="base-item">
            <el-row class="row-style">
              <storeChoose :is-all="true" @changeMallList="changeMallList" :spanWidth="'90px'" :selectWidth="'180px'" :source="'orderCenter'"></storeChoose>
              <div class="tool-item">
                <span>创建时间：</span>
                <el-date-picker
                  @change="changeTime($event, 'createTime')"
                  v-model="createTime"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  style="width: 300px"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                />
              </div>
            </el-row>
            <el-row class="row-style">
              <div class="tool-item mar-right">
                <span>发货状态：</span>
                <el-select v-model="selectForm.orderStatus" placeholder="" size="mini" 　class="inputBox">
                  <el-option label="全部" :value="''" />
                  <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderStatusList" :key="index" />
                </el-select>
              </div>
              <div class="tool-item mar-right">
                <span>物流单号：</span>
                <el-select v-model="selectForm.hasTrackingNo" placeholder="" size="mini" 　class="inputBox">
                  <el-option label="全部" :value="''" />
                  <el-option label="已申请" value="1" />
                  <el-option label="未申请" value="2" />
                </el-select>
              </div>
              <div class="tool-item mar-right">
                <span>面单下载状态：</span>
                <el-select v-model="selectForm.isPrint" placeholder="" size="mini" class="inputBox">
                  <el-option label="全部" :value="''" />
                  <el-option label="已下载" value="1" />
                  <el-option label="未下载" value="2" />
                </el-select>
              </div>
              <div class="tool-item mar-right">
                <span>截止时间：</span>
                <el-date-picker
                  @change="changeTime($event, 'shipByDate')"
                  v-model="shipByDate"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  style="width: 300px"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </div>
            </el-row>
            <el-row class="row-style">
              <div class="tool-item mar-right">
                <span>订单编号：</span>
                <el-input v-model="selectForm.orderSn" size="mini" clearable class="inputBox" />
              </div>
              <el-button size="mini" type="primary" class="mar-right" @click="getOrderList(1)">搜索</el-button>
              <el-button size="mini" type="primary" class="mar-right" @click="goodsSearchVisible = true">订单号批量查询</el-button>
              <el-button size="mini" type="primary" class="mar-right" @click="openBefore">批量添加本地备注</el-button>
              <el-checkbox v-model="showConsole" class="mar-right">隐藏日志</el-checkbox>
              <p class="tableActive">同步和打印台湾站的面单信息（除711外），请走代理</p>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <el-table v-loading="tableLoading" ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" height="calc(100vh - 257px)">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="50" fixed="left">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="order_sn" label="订单编号" min-width="170px" fixed="left">
          <template slot-scope="scope">
            <i class="el-icon-document-copy copyStyle" @click="copyItem(scope.row.order_sn)"></i>
            <span class="tableActive" @click="viewDetails('orderDetail', scope.row.order_id, scope.row.mall_info.platform_mall_id)">{{ scope.row.order_sn }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="80px" label="站点" prop="country" align="center">
          <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.country | chineseSite }}</template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="mall_info.platform_mall_name" min-width="120px" align="center" show-overflow-tooltip />

        <el-table-column align="center" label="商品数量" min-width="80">
          <template slot-scope="scope">{{ scope.row.goods_count }}</template>
        </el-table-column>
        <el-table-column align="center" prop="123456" label="商品详情" min-width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openGoodsDetail(scope.row)">商品详情</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_time" label="订单创建时间" min-width="140" />
        <el-table-column align="center" prop="ship_by_date" label="截止发货时间" min-width="140">
          <template slot-scope="scope">{{ scope.row.ship_by_date }}</template>
        </el-table-column>
        <el-table-column align="center" prop="ship_by_date" label="是否已申请物流单号" min-width="140">
          <template slot-scope="scope">
            <p :style="{ color: scope.row.tracking_no == '' ? 'red' : '#32CD32' }">{{ scope.row.tracking_no == '' ? '未申请' : '已申请' }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ship_by_date" label="是否同步面单信息" min-width="140">
          <template slot-scope="scope">
            <p :style="{ color: scope.row.hasLogistics == 0 ? 'red' : '#32CD32' }">{{ scope.row.hasLogistics == 0 ? '否' : '是' }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="order_status" label="发货状态" min-width="100">
          <template slot-scope="scope">
            <p :style="{ color: changeOrderStatus(scope.row.order_status, 'color') }">{{ changeOrderStatus(scope.row.order_status) }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="logistics_name" label="虾皮物流" min-width="100">
          <template slot-scope="scope">{{ scope.row.logistics_name }}</template>
        </el-table-column>
        <el-table-column align="center" prop="tracking_no" label="虾皮物流单号" min-width="150">
          <template slot-scope="scope">{{ scope.row.tracking_no }}</template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="本地备注" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-show="!(scope.row.id === activeRemarkID ? true : false)" @click="editRemark(scope.$index, scope.row.id)" style="cursor: pointer">
              <el-input v-model="scope.row.remark" disabled size="mini"></el-input>
            </div>
            <el-input v-model="orderRemark" v-if="scope.row.id === activeRemarkID ? true : false" @blur="changeRemark(scope.row.id, scope.$index)" size="mini"></el-input>
            <!-- <i @click="editRemark(scope.$index, scope.row.id)" style="cursor: pointer" class="el-icon-edit-outline"></i> -->
            <!-- {{ scope.row.remark }} -->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="note" label="shopee备注" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.note }}</template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="note" label="买家备注" min-width="80">
          <template slot-scope="scope">{{}}</template>
        </el-table-column> -->
        <el-table-column align="center" prop="note" label="是否已下载面单" min-width="120">
          <template slot-scope="scope">{{ scope.row.is_print == '1' ? '已下载' : '未下载' }}</template>
        </el-table-column>
        <el-table-column label="操作" prop="" min-width="150px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-dropdown style="width: 100px; margin-left: 10px">
              <el-button style="width: 100px" size="mini" plain type="primary"> 更多操作<i class="el-icon-arrow-down el-icon--right" /> </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div class="dropdownItem" @click="syncFaceDataSingle(scope.row)">同步面单信息</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click="batnchDownLoad([scope.row], 'view')">面单预览</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" v-if="scope.row.hasLogistics != 0" @click="batnchDownLoad([scope.row], 'down')">下载面单</div></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <Logs ref="Logs" clear v-model="showConsole" />
    <el-dialog title="商品详情" :visible.sync="goodsListVisible" width="800px" :close-on-click-modal="false" @close="closeDialog">
      <el-table ref="goodsTable" :data="goodsList" tooltip-effect="dark" height="400px">
        <el-table-column align="center" prop="order_sn" label="订单编号" min-width="120" />
        <el-table-column align="center" label="商品图片" min-width="80">
          <template slot-scope="scope">
            <el-image v-bind:src="[clickRow.country, clickRow.mall_info ? clickRow.mall_info.platform_mall_id : '', scope.row.goods_img] | imageRender" style="width: 56px; height: 56px"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goods_id" label="商品ID" min-width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openUrl(clickRow, scope.row.goods_id, 'product')">{{ scope.row.goods_id }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goods_count" label="商品数量" min-width="120" />
        <el-table-column align="center" prop="variation_name" label="商品规格" min-width="120" />
      </el-table>
    </el-dialog>
    <el-dialog title="订单号批量查询" :visible.sync="goodsSearchVisible" width="500px" :close-on-click-modal="false" @close="closeDialog">
      <p>请输入订单号，一行一个，最多五十个</p>
      <el-input type="textarea" :rows="10" v-model="goodsOrderSnStr"> </el-input>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="getOrderList(1, goodsOrderSnStr)">批量查询</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量添加本地备注" :visible.sync="localRamarkVisible" width="400px" :close-on-click-modal="false">
      <div class="remark-style">
        <span>本地备注</span>
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="localRamark"> </el-input>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="batchSetRemark">批量添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderStatusList, changeOrderStatus, syncStatusFirst } from '../components/orderCenter/orderCenter'
import storeChoose from '../../../components/store-choose'
import { exportExcelDataCommon, creatDate, getDaysBetween } from '../../../util/util'
import surFaceService from '../../../services/surfaceOrder'
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
      selectMallList: [], //店铺
      createTime: [], //创建时间
      shipByDate: [], //截止时间
      selectForm: {
        orderStatus: 2, //订单状态
        orderSn: '', //订单号
        isPrint: '', //是否下载面单
        hasTrackingNo: '2', //是否申请物流单号
      },
      orderStatusList: orderStatusList, //订单状态
      trackStatus: ['', '已申请', '未申请'],
      logisticsStatusList: ['未下载', '已下载', '未下载'],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      multipleSelection: [],
      tableLoading: false,
      tableData: [],
      showConsole: true, //日志
      goodsList: [], //商品详情
      goodsListVisible: false, //商品详情
      goodsSearchVisible: false, //订单号批量查询
      goodsOrderSnStr: '', //订单号批量查询
      localRamarkVisible: false, //本地备注
      localRamark: '', //本地备注
      activeRemarkID: '', //本地备注
      orderRemark: '', //本地备注
    }
  },
  mounted() {
    this.createTime = creatDate(30)
    setTimeout(() => {
      this.getOrderList()
    }, 2000)
  },
  methods: {
    changeTime(val, key, subKey) {
      let days = getDaysBetween(new Date(val[0]).getTime(), new Date(val[1]).getTime())
      if (days > 93) {
        if (subKey) {
          this[key][subKey] = creatDate(30)
        } else {
          this[key] = creatDate(30)
        }
        return this.$message.warning('只支持查询或导出93天内的数据,请重新选择时间！')
      }
    },
    //打印台湾虚拟面单
    async downTWface() {
      try {
        let filterArr = this.multipleSelection.filter((n) => n.country == 'TW')
        if (!filterArr.length) {
          return this.$message.warning('请选择台湾站订单数据')
        }
        let ids = []
        filterArr.forEach((item) => {
          ids.push(item.main_order_sn)
        })
        let idStr = ids.toString()
        console.log(idStr, 'idStr')
        let params = {
          mainOrderSns: idStr,
        }
        let res = await this.$api.getLogisticsInformationBatch(params)
        console.log(res, 'res')
        let sheetInfo = []
        if (res.data.code === 200 && res.data.data.length) {
          sheetInfo = res.data.data
        } else {
          sheetInfo = filterArr
        }
        this.downFace(sheetInfo, filterArr, 'TW', false, false, false, true)
      } catch (error) {
        this.tableLoading = false
        console.log('downTWface', downTWface)
      }
    },
    //打印面单信息
    batnchDownLoad(arrList, type) {
      if (!arrList.length) {
        return this.$message.warning('请选择要操作的数据！')
      }
      if (type == 'down') {
        this.$confirm('pdf文件后缀是否小写?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
        })
          .then(() => {
            this.batchPrintOrderSurface(arrList, true, true, false, false)
          })
          .catch(() => {
            this.batchPrintOrderSurface(arrList, false, true, false, false)
          })
      } else if (type == 'view') {
        this.$confirm('是否需要打印虚拟面单?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
        })
          .then(() => {
            this.batchPrintOrderSurface(arrList, false, false, true, true)
          })
          .catch(() => {
            this.batchPrintOrderSurface(arrList, false, false, true, false)
          })
      }
    },
    async batchPrintOrderSurface(arrList, PdfLower, isDownload, isShowWindow, IsPrintVirtual) {
      let country = ''
      let countryId = {}
      let mainOrders = ''
      arrList.forEach((item, index) => {
        countryId[item.country] = item.country
        country = item.country
        if (index === 0) {
          mainOrders = item.main_order_sn
        } else {
          mainOrders = mainOrders + ',' + item.main_order_sn
        }
      })
      if (Object.keys(countryId).length > 1) {
        return this.$message.warning('由于每个站点面单不一致，请分站点批量预览和打印！')
      }
      let params = {
        mainOrderSns: mainOrders,
      }
      let sheetInfo = []
      try {
        let res = await this.$api.getLogisticsInformationBatch(params)
        console.log(res, 'res')
        if (res.data.code === 200) {
          sheetInfo = res.data.data
        } else {
          return this.$message.warning('面单获取失败！')
        }
        if (!sheetInfo.length) {
          return this.$message.warning('暂无面单信息')
        }
        console.log(sheetInfo, country, PdfLower, isDownload, isShowWindow, IsPrintVirtual, '-------------')
        this.downFace(sheetInfo, arrList, country, PdfLower, isDownload, isShowWindow, IsPrintVirtual)
      } catch (error) {
        this.tableLoading = false
        console.log(error)
      }
    },
    //打印面单信息
    async downFace(arrList, OrderList, country, PdfLower, isDownload, isShowWindow, IsPrintVirtual) {
      this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      try {
        let PdfInfoModel = []
        for (let i = 0; i < arrList.length; i++) {
          let info = arrList[i]
          if (!info.url && country !== 'TW') {
            this.$refs.Logs.writeLog(`订单${info.order_sn}未获取到面单信息`, false)
            continue
          }
          let orderInfo = OrderList.find((n) => {
            return n.order_sn == info.order_sn
          })
          console.log(orderInfo, 'orderInfo')
          let params = {
            PDFUrl: info.url || '',
            OrderNo: orderInfo.order_sn,
            MainOrderNo: orderInfo.order_sn,
            PlatformLogisticsId: orderInfo.tracking_no,
            PlatformLogisticsName: '',
            CreateTime: orderInfo.created_at,
            BuyerName: orderInfo.name,
            BuyerPhone: orderInfo.phone,
            BuyerAddress: info.data && info.data.full_address ? info.data.full_address : orderInfo.address,
            BuyerNote: '',
            BarInfo: {
              BarCode: orderInfo.order_sn,
              BarCodeWidth: 200,
              BarCodeHeight: 50,
            },
            SkuList: [orderInfo.goodsInfo[0].variation_sku.replace('=|=', ''), orderInfo.goodsInfo[0].goods_count],
            IsNeedCut: orderInfo.logistics_id == 30007 || orderInfo.logistics_id == 30008 ? true : false,
            IsUseA4Size: false,
            PdfWidth: 320,
            PdfHeight: 425,
            LocationY: -420,
            PrintStatus: '0',
            MallId: orderInfo.mall_info.platform_mall_id,
            MallName: orderInfo.mall_info.platform_mall_name,
          }
          PdfInfoModel.push(params)
        }

        let pdfDownloadModel1 = {
          IsDownload: isDownload,
          PdfExtendName: PdfLower ? '.pdf' : '.PDF',
          PdfExtendNameIsLower: PdfLower,
          IsPrintVirtualFaceSheet: IsPrintVirtual,
          Site: country,
          IsShowWindow: isShowWindow,
          PdfInfoList: PdfInfoModel,
          VirtualPdfPath: {},
          ConvertFaceInfoList: [],
        }
        //1、---------------getOrderPdfInfo
        console.log(JSON.stringify(pdfDownloadModel1), '111')
        let pdfInfo = await window['BaseUtilBridgeService'].getOrderPdfInfo(pdfDownloadModel1)
        let pdfInfoObj = JSON.parse(pdfInfo)
        console.log(pdfInfoObj, 'pdfInfo')
        if (pdfInfoObj.code != 200) {
          let message = ''
          for (const key in pdfInfoObj.failList) {
            message = message + ',' + key + ',' + pdfInfoObj.failList[key]
            message = message.substring(1)
          }
          return this.$refs.Logs.writeLog(`预览失败,${message}`, false)
        }
        let PdfInfoList = JSON.parse(JSON.stringify(PdfInfoModel))
         PdfInfoList.forEach((item) => {
          let htmlUrl = pdfInfoObj.data.find((n) => n && n.OrderSn == item.OrderNo)
          if (htmlUrl) {
            item.PDFUrl = htmlUrl.PDFFilePath
          }
        })
        //2、---------------getVirtualFace 虚拟面单
        console.log(JSON.stringify(PdfInfoList), '222')
        let VirtualPdfPath = null
        let VirtualPdfPathObj = {}
        if (IsPrintVirtual) {
          VirtualPdfPath = await window['BaseUtilBridgeService'].getVirtualFace(PdfInfoList, true)
          VirtualPdfPathObj = VirtualPdfPath && JSON.parse(VirtualPdfPath)
          console.log(VirtualPdfPathObj, 'VirtualPdfPath')
          if (!(VirtualPdfPathObj && VirtualPdfPathObj.code == '200')) {
            return this.$message.warning('获取虚拟面单失败')
          }
        }
        let ConvertFaceInfoModel = []
        for (let i = 0; i < arrList.length; i++) {
          let info = arrList[i]
          console.log(i, info)
          if (!info.url && country !== 'TW') {
            this.$refs.Logs.writeLog(`订单${info.order_sn}未获取到面单信息`, false)
            continue
          }
          let orderInfo = OrderList.find((n) => {
            return n.order_sn == info.order_sn
          })
          let  htmlUrl = (pdfInfoObj.data && pdfInfoObj.data.find((n) => n && n.OrderSn == orderInfo.order_sn)) || null
          console.log(htmlUrl, 'htmlUrl')
          let conParams = {
            HtmlFilePath: htmlUrl ? htmlUrl.PDFFilePath : info.url && info.url.includes('.html') ? info.url : '',
            PDFFilePath: htmlUrl ? htmlUrl.PDFFilePath : (info.url && info.url.includes('.PDF')) || (info.url && info.url.includes('.pdf')) ? info.url : '',
            LogisticsId: orderInfo.logistics_id.toString(),
            OrderSn: orderInfo.order_sn,
            MallId: Number(orderInfo.mall_info.platform_mall_id),
            VirtualFilePath: IsPrintVirtual ? VirtualPdfPathObj.data[orderInfo.order_sn] : '',
          }
          ConvertFaceInfoModel.push(conParams)
          console.log(ConvertFaceInfoModel, '-------')
        }
        //3、----------------htmlToPdf
        console.log('333', JSON.stringify(ConvertFaceInfoModel))
        let convertRes = await window['BaseUtilBridgeService'].htmlToPdf(ConvertFaceInfoModel, false)
        let convertResObj = convertRes && JSON.parse(convertRes)
        console.log(convertResObj, 'convertFaceInfoModel')
        if (convertResObj.code != 200) {
          let message = ''
          for (const key in convertResObj.failList) {
            message = message + ',' + key + ',' + convertResObj.failList[key]
            message = message.substring(1)
          }
          return this.$refs.Logs.writeLog(`打印面单失败,${message}`, false)
        }
        
       
        let pdfDownloadModel = {
          IsDownload: isDownload,
          PdfExtendName: PdfLower ? '.pdf' : '.PDF',
          PdfExtendNameIsLower: PdfLower,
          IsPrintVirtualFaceSheet: IsPrintVirtual,
          Site: country,
          IsShowWindow: isShowWindow,
          PdfInfoList: PdfInfoList,
          VirtualPdfPath: IsPrintVirtual ? VirtualPdfPathObj.data : {},
          ConvertFaceInfoList: convertResObj.data,
        }
        //5、-------------------downloadPdf
        console.log(JSON.stringify(pdfDownloadModel), '4444444--end')
        this.tableLoading = true
        await window['BaseUtilBridgeService'].downloadPdf(pdfDownloadModel)
        this.tableLoading = false
        isDownload && this.$refs.Logs.writeLog(`面单下载完成,请前往桌面查看`, true)
        IsPrintVirtual && this.$refs.Logs.writeLog(`虚拟面单下载完成,请前往软件所在文件夹查看`, true)
      } catch (error) {
        console.log("error",error)
        this.tableLoading = false
        if(error.includes('进程')){
          this.$refs.Logs.writeLog(`打印面单失败，文件被占用请重启软件`, false)
        }else{
          this.$refs.Logs.writeLog(`打印面单失败，${error}`, false)
        }
        
        console.log(error, 'downFace')
      }
    },
    //同步单个面单信息
    async syncFaceDataSingle(row) {
      //同步单个，强制开启申请面单
      this.syncSurface([row], true)
    },
    //同步面单信息
    async syncSurfaceBefore() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先选择数据！')
      }
      let arrFilterFrist = this.multipleSelection.filter((n) => {
        return n.hasLogistics !== '1' && n.tracking_no == ''
      })
      if (!arrFilterFrist.length) {
        return this.$message.warning('当前没有需要同步面单的订单！')
      }
      console.log(arrFilterFrist, 'arrFilterFrist')
      let arrFilter = arrFilterFrist.filter((n) => {
        return n.country == 'TW'
      })
      console.log(arrFilter, 'arrFilter')
      if (arrFilter.length) {
        this.$confirm('是否同时批量同步台湾站点的面单（同步台湾站的面单将会缩短发货时效，请谨慎选择）!', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
        })
          .then(() => {
            //同步台湾，强制开启申请面单
            this.syncSurface(arrFilterFrist, true)
          })
          .catch(() => {
            //不同步台湾，强制关闭申请面单
            let arrFilterTW = arrFilterFrist.filter((n) => {
              return n.country !== 'TW'
            })
            this.syncSurface(arrFilterTW, false)
          })
      } else {
        this.syncSurface(arrFilterFrist, false)
      }
    },
    //同步面单信息
    async syncSurface(syncList, isApplyForceFaceInfo) {
      this.showConsole = false
      if (!syncList.length) {
        this.$refs.Logs.writeLog('没有要同步的订单！', true)
        return
      }
      this.$refs.Logs.writeLog('同步面单信息开始，请耐心等待！', true)
      const service = new surFaceService(this, this.$refs.Logs.writeLog)
      service.handleStart(syncList, isApplyForceFaceInfo)
    },
    //下载拣货单
    async downLoadPickList() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先选择数据！')
      }
      this.showConsole = false
      this.$refs.Logs.writeLog('下载拣货单开始，请耐心等待！', true)
      const service = new surFaceService(this, this.$refs.Logs.writeLog)
      service.getPickListData(this.multipleSelection)
    },
    //获取导出数据
    async getExportData() {
      let sysMallId = ''
      this.selectMallList.forEach((item, index) => {
        if (index === 0) {
          sysMallId = item.id
        } else {
          sysMallId = sysMallId + ',' + item.id
        }
      })
      let params = JSON.parse(JSON.stringify(this.selectForm))
      params['page'] = 1
      params['pageSize'] = 200
      params['sysMallId'] = sysMallId
      params['createTime'] = this.createTime.length ? this.createTime[0] + ' 00:00:00' + '/' + this.createTime[1] + ' 23:59:59' : ''
      this.tableLoading = true
      const { data } = await this.$api.getDeliveryList(params)
      let exportData = []
      let dataFlag = (data && data.code === 200 && data.data.data && data.data.data) || []
      while (dataFlag && dataFlag.length) {
        dataFlag.forEach(async (item) => {
          item.goodsLink = await this.joinLink(item, item.goodsInfo[0].goods_id)
        })
        exportData = exportData.concat(dataFlag)
        params.page++
        let { data } = await this.$api.getDeliveryList(params)
        dataFlag = (data && data.code === 200 && data.data.data && data.data.data) || []
      }
      this.tableLoading = false
      if (!exportData.length) {
        return this.$message.warning('没有可导出的数据！')
      }
      let subExportData = []
      let dataCopy = JSON.parse(JSON.stringify(exportData))
      if (dataCopy.length > 7000) {
        let i = 0
        while (dataCopy.length) {
          subExportData[i] = dataCopy.splice(0, 7000)
          i++
        }
      } else {
        subExportData[0] = dataCopy
      }
      this.tableToExcel(subExportData)
    },
    // 导出
    tableToExcel(exportData) {
      let num = 1
      let str = `<tr>
            <td>编号</td>
            <td>站点</td>
            <td>店铺名称</td>
            <td>订单编号</td>
            <td>商品数量</td>
            <td>商品规格</td>
            <td>商品链接</td>
            <td>商品图片</td>
            <td>订单创建时间</td>
            <td>截止发货时间</td>
            <td>是否已申请物流单号</td>
            <td>是否同步面单信息</td>
            <td>发货状态</td>
            <td>虾皮物流</td>
            <td>虾皮物流单号</td>
            </tr>`
      for (let index = 0; index < exportData.length; index++) {
        let jsonData = exportData[index]
        for (let j = 0; j < jsonData.length; j++) {
          let item = jsonData[j]
          // let goodsArr = item.goodsInfo.length || []
          for (let m = 0; m < item.goodsInfo.length; m++) {
            let goodsInfo = item.goodsInfo[m]
            str += `<tr><td>${num++}</td>
                <td>${item.mall_info && item.mall_info.country ? this.$filters.chineseSite(item.mall_info.country) : '' + '\t'}</td>
                <td>${item.mall_info && item.mall_info.platform_mall_name ? item.mall_info.platform_mall_name : '' + '\t'}</td>
                <td style="mso-number-format:'\@';">${goodsInfo.order_sn ? goodsInfo.order_sn : '' + '\t'}</td>
                <td>${goodsInfo.goods_count ? goodsInfo.goods_count : '' + '\t'}</td>
                <td>${goodsInfo ? goodsInfo.variation_name : '' + '\t'}</td>
                <td>${item.goodsLink ? item.goodsLink : '' + '\t'}</td>
                <td>${goodsInfo ? this.$filters.imageRender([item.country, item.mall_info ? item.mall_info.platform_mall_id : '', goodsInfo.goods_img]) : '' + '\t'}</td>
                <td>${item.created_time ? item.created_time : '' + '\t'}</td>
                <td>${item.ship_by_date ? item.ship_by_date : '' + '\t'}</td>
                <td>${item.is_apply_tracking_no ? this.trackStatus[item.is_apply_tracking_no] : '' + '\t'}</td>
                <td>${item.hasLogistics == 0 ? '否' : '是' + '\t'}</td>
                <td>${item.order_status ? changeOrderStatus(item.order_status) : '' + '\t'}</td>
                <td>${item.logistics_name ? item.logistics_name : '' + '\t'}</td>
                <td>${item.tracking_no ? item.tracking_no : '' + '\t'}</td>
                </tr>`
          }
        }
        // jsonData.forEach((item) => {

        // })
      }
      exportExcelDataCommon('发货管理订单数据', str)
    },
    //修改单个备注
    async changeRemark(id, index) {
      const res = await this.$api.setLocalRemark({ id: id, remark: this.orderRemark })
      if (res.data.code == 200) {
        this.$message.success('设置备注成功')
        this.tableData[index].remark = this.orderRemark
        this.activeRemarkID = ''
        return
      }
      this.$message.error('设置备注失败')
      this.activeRemarkID = ''
    },
    editRemark(index, activeRemarkID) {
      this.activeRemarkID = activeRemarkID
      this.orderRemark = this.tableData[index].remark
    },
    openBefore() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先选择需要备注的商品！')
      }
      this.localRamarkVisible = true
    },
    //批量添加本地备注
    async batchSetRemark() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先选择需要标记的商品！')
      }
      this.showConsole = false
      // this.$refs.Logs.consoleMsg = ''
      this.multipleSelection.forEach(async (item) => {
        let params = {
          id: item.id,
          remark: this.localRamark,
        }
        let res = await this.$api.setLocalRemark(params)
        if (res.data.code === 200) {
          this.$refs.multipleTable.toggleRowSelection(item, false)
          this.$refs.Logs.writeLog(`订单编号【${item.order_sn}】备注成功`, true)
        } else {
          this.$refs.Logs.writeLog(`订单编号【${item.order_sn}】备注失败-${res.data.message}`, false)
        }
        console.log(res)
      })
      this.closeDialog()
      this.getOrderList()
    },
    // 处理订单编号
    handleKey(key) {
      return key
        .split('\n')
        .map((item) => {
          return item.replace(/(^\s*)|(\s*$)/g, '')
        })
        .filter((item) => {
          return item != ''
        })
    },
    //查看商品详情
    openGoodsDetail(row) {
      this.clickRow = row
      this.goodsList = row.goodsInfo
      this.goodsListVisible = true
    },
    //关闭弹窗
    closeDialog() {
      this.clickRow = {}
      this.goodsList = []
      this.goodsSearchVisible = false
      this.goodsOrderSnStr = ''
      this.localRamark = ''
      this.localRamarkVisible = false
    },
    //获取列表
    async getOrderList(page, goodsOrderSnStr) {
      let sysMallId = ''
      this.selectMallList.forEach((item, index) => {
        if (index === 0) {
          sysMallId = item.id
        } else {
          sysMallId = sysMallId + ',' + item.id
        }
      })
      let params = JSON.parse(JSON.stringify(this.selectForm))
      this.currentPage = page || this.currentPage
      params['page'] = this.currentPage
      params['pageSize'] = this.pageSize
      params['sysMallIds'] = sysMallId
      params['createTime'] = this.createTime && this.createTime.length ? this.createTime[0] + ' 00:00:00' + '/' + this.createTime[1] + ' 23:59:59' : ''
      params['shipByDate'] = this.shipByDate && this.shipByDate.length ? this.shipByDate[0] + ' 00:00:00' + '/' + this.shipByDate[1] + ' 23:59:59' : ''
      if (goodsOrderSnStr) {
        let snArr = this.handleKey(goodsOrderSnStr)
        console.log('snArr', snArr)
        snArr = snArr.splice(0, 50)
        params.orderSn = snArr.join(',')
      }
      this.tableLoading = true
      let res = await this.$api.getDeliveryList(params)
      if (res.data.code === 200) {
        this.tableData = res.data.data.data
        this.total = res.data.data.total
      } else {
        this.$message.error(`获取列表失败，${res.data.message}`)
      }
      this.tableLoading = false
      this.closeDialog()
      console.log(this.tableData)
    },
    async joinLink(row, goodsId) {
      let url = ''
      if (row.mall_info && row.mall_info.platform_mall_id) {
        let params = {
          platform_mall_id: row.mall_info ? row.mall_info.platform_mall_id : '',
        }
        const webUrl = await this.$shopeemanService.getWebUrl(row.country, params)
        url = webUrl + '/product' + '/' + row.mall_info.platform_mall_id + '/' + goodsId
      }
      return url
    },
    // 打开外部窗口
    async openUrl(data, goodsId, type) {
      let url = data
      if (type === 'product') {
        let params = {
          platform_mall_id: data.mall_info.platform_mall_id,
        }
        const webUrl = await this.$shopeemanService.getWebUrl(data.country, params)
        console.log(webUrl, 'webUrl', data.country)
        url = webUrl + '/product' + '/' + data.mall_info.platform_mall_id + '/' + goodsId
      }
      this.$BaseUtilService.openUrl(url)
    },
    // 打开订单页面
    viewDetails(type, id, shopId) {
      const reqStr = {
        type: type,
        shopId: shopId,
        id: id,
      }
      this.$BaseUtilService.getOrderDetailInfo(shopId, JSON.stringify(reqStr))
    },
    changeMallList(val) {
      this.selectMallList = val.mallList
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOrderList()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getOrderList()
    },
    //   表格选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //点击复制
    copyItem(attr) {
      let target = document.createElement('div')
      target.id = 'tempTarget'
      target.style.opacity = '0'
      target.innerText = attr
      document.body.appendChild(target)
      try {
        let range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        this.$message.success('复制成功')
      } catch (e) {
        //console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    },
    changeOrderStatus,
  },
}
</script>

<style lang="less" scoped>
.delivery-manager {
  margin: 10px;
  overflow: hidden;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .tableActive {
    color: red;
    cursor: pointer;
  }
}
.mar-right {
  margin-right: 10px;
}
.btnWidth {
  width: 160px;
}
.copyStyle {
  margin-right: 8px;
  cursor: pointer;
}
.selectBox {
  padding: 16px;
  display: flex;
  background: #fff;
  overflow: auto;
  .left-box {
    width: 360px;
  }
  .right-box {
    flex: 1;
  }
}
.content {
  margin-top: 20px;
  background: #fff;
  min-height: calc(100vh - 212px);
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
}
.base-box {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 10px;
  position: relative;
  // min-width: 702px;
  height: 100%;
  .base-title {
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
  .base-item {
  }
}
.row-style {
  display: flex;
  padding-bottom: 8px;
  align-items: center;
  .tool-item {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 90px;
      text-align: right;
    }
    .inputBox {
      width: 180px;
    }
    i {
      padding-left: 8px;
      width: 20px;
      font-size: 16px !important;
      cursor: pointer;
    }
  }
}
.remark-style {
  span {
    display: inline-block;
    width: 80px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

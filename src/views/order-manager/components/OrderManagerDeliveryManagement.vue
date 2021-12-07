<!--
 * @Author: your name
 * @Date: 2021-11-16 17:41:21
 * @LastEditTime: 2021-12-07 17:30:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\OrderManagerDeliveryManagement.vue
-->
<template>
  <div class="delivery-manager">
    <div class="selectBox">
      <!-- left box -->
      <div class="left-box mar-right">
        <div class="base-box">
          <span class="base-title">基础操作</span>
          <div class="base-item base-left">
            <el-row class="row-style">
              <el-button size="mini" type="primary" class="btnWidth" @click="syncSurface">批量同步面单信息</el-button>
              <el-button size="mini" type="primary" class="btnWidth">批量下载平台面单</el-button>
            </el-row>
            <el-row class="row-style">
              <el-button size="mini" type="primary" class="btnWidth">批量预览打印平台面单</el-button>
              <el-button size="mini" type="primary" class="btnWidth" @click="getExportData">导出数据</el-button>
            </el-row>
            <el-row class="row-style">
              <el-button size="mini" type="primary" class="btnWidth">批量打印台湾虚拟面单</el-button>
              <el-button size="mini" type="primary" class="btnWidth">批量下载拣货单</el-button>
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
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="80px" label="站点" prop="country" align="center">
          <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.country | chineseSite }}</template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="mall_info.platform_mall_name" min-width="120px" align="center" />
        <el-table-column prop="order_sn" label="订单编号" align="center" min-width="170px">
          <template slot-scope="scope">
            <span class="tableActive" @click="viewDetails('orderDetail', scope.row.order_id, scope.row.mall_info.platform_mall_id)">{{ scope.row.order_sn }}</span>
            <i class="el-icon-document-copy" style="margin-left: 8px; cursor: pointer" @click="copyItem(scope.row.order_sn)"></i>
          </template>
        </el-table-column>
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
          <template slot-scope="scope">{{ trackStatus[scope.row.is_apply_tracking_no] }}</template>
        </el-table-column>
        <el-table-column align="center" prop="ship_by_date" label="是否同步面单信息" min-width="140">
          <template slot-scope="scope">{{ scope.row.hasLogistics }}</template>
        </el-table-column>
        <el-table-column align="center" prop="order_status" label="发货状态" min-width="100">
          <template slot-scope="scope">{{ changeOrderStatus(scope.row.order_status) }}</template>
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
          <template slot-scope="scope">{{ logisticsStatusList[scope.row.is_print] }}</template>
        </el-table-column>
        <el-table-column label="操作" prop="" min-width="150px" align="center">
          <template slot-scope="scope"> </template>
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
            <el-button size="mini" type="primary" @click="openUrl(clickRow, scope.row.goods_id, 'product')">查看商品详情</el-button>
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
import { orderStatusList, changeOrderStatus } from '../components/orderCenter/orderCenter'
import storeChoose from '../../../components/store-choose'
import { exportExcelDataCommon, creatDate } from '../../../util/util'
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
      selectForm: {
        orderStatus: '', //订单状态
        orderSn: '', //订单号
        isPrint: '', //是否下载面单
        hasTrackingNo: '', //是否申请物流单号
      },
      orderStatusList: orderStatusList, //订单状态
      trackStatus: ['', '已申请', '未申请'],
      logisticsStatusList: ['', '已下载', '未下载'],
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
    setTimeout(() => {
      this.getOrderList()
    }, 2000)
  },
  methods: {
    //同步面单信息
    async syncSurface() {
      // if (!this.multipleSelection.length) {
      //   return this.$message.warning('请先选择数据！')
      // }
      const service = new surFaceService(this, this.$refs.Logs.writeLog)
      service.start(this.multipleSelection)
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
        jsonData.forEach((item) => {
          str += `<tr><td>${num++}</td>
                <td>${item.mall_info && item.mall_info.country ? this.$filters.chineseSite(item.mall_info.country) : '' + '\t'}</td>
                <td>${item.mall_info && item.mall_info.platform_mall_name ? item.mall_info.platform_mall_name : '' + '\t'}</td>
                <td style="mso-number-format:'\@';">${item.order_sn ? item.order_sn : '' + '\t'}</td>
                <td>${item.goods_count ? item.goods_count : '' + '\t'}</td>
                <td>${item.goodsInfo && item.goodsInfo.length ? item.goodsInfo[0].variation_name : '' + '\t'}</td>
                <td>${item.goodsInfo && item.goodsInfo.length ? this.joinLink(item, item.goodsInfo[0].goods_id) : '' + '\t'}</td>
                <td>${
                  item.goodsInfo && item.goodsInfo.length ? this.$filters.imageRender([item.country, item.mall_info ? item.mall_info.platform_mall_id : '', item.goodsInfo[0].goods_img]) : '' + '\t'
                }</td>
                <td>${item.created_time ? item.created_time : '' + '\t'}</td>
                <td>${item.ship_by_date ? item.ship_by_date : '' + '\t'}</td>
                <td>${item.is_apply_tracking_no ? this.trackStatus[item.is_apply_tracking_no] : '' + '\t'}</td>
                <td>${item.hasLogistics ? item.hasLogistics : '' + '\t'}</td>
                <td>${item.order_status ? changeOrderStatus(item.order_status) : '' + '\t'}</td>
                <td>${item.logistics_name ? item.logistics_name : '' + '\t'}</td>
                <td>${item.tracking_no ? item.tracking_no : '' + '\t'}</td>
                </tr>`
        })
      }
      exportExcelDataCommon('发货管理订单数据', str)
    },
    //修改单个备注
    async changeRemark(id, index) {
      if (this.orderRemark) {
        const res = await this.$api.setLocalRemark({ id: id, remark: this.orderRemark })
        if (res.data.code == 200) {
          this.$notify({
            title: '备注管理',
            type: 'success',
            message: `设置备注成功`,
          })
          this.tableData[index].remark = this.orderRemark
          this.activeRemarkID = ''
          return
        }
        // this.$message.error('设置备注失败')
        this.$notify({
          title: '备注管理',
          type: 'error',
          message: `设置备注失败`,
        })
        this.activeRemarkID = ''
      } else {
        this.$message.warning('备注不能为空')
      }
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
      params['sysMallId'] = sysMallId
      params['createTime'] = this.createTime.length ? this.createTime[0] + ' 00:00:00' + '/' + this.createTime[1] + ' 23:59:59' : ''
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
  margin: 20px 0;
  background: #fff;
  min-height: calc(100vh - 222px);
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

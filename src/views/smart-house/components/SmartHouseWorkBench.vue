<template>
  <div v-loading="isLoading" class="workbench">
    <div class="top-box">
      <div class="operate">
        <div class="title">基础操作</div>
        <div class="line" />
        <div class="btn-items">
          <el-button type="primary" size="mini" @click="markOrderNeedDeal">标记需仓库紧急处理</el-button>
          <el-button type="primary" size="mini" @click="setNoWait">标记无需等待子包裹</el-button>
        </div>
        <div class="btn-items">
          <el-button type="primary" size="mini" @click="trackingNumberChangeOrderFun">采购物流单号变更</el-button>
          <el-button type="primary" size="mini" @click="noticeTodeliver(2)">通知仓库暂停发货</el-button>
        </div>
        <div class="btn-items">
          <el-button type="primary" size="mini" @click="noticeTodeliver(1)">通知仓库发货</el-button>
          <el-button type="primary" size="mini" @click="setColorLabelFun">批量标记颜色标识</el-button>
        </div>
        <div class="btn-items">
          <el-button type="primary" size="mini" @click="compareDataVisible()">批量推送订单至仓库</el-button>
          <el-button type="primary" size="mini" @click="extService_visible">批量添加增值服务</el-button>
        </div>
        <div class="btn-items">
          <!-- <el-button type="primary" size="mini" @click="getPackage()">获取面单信息</el-button> -->
          <!-- <el-button
            type="primary"
            size="mini"
            @click="noticeTodeliver(1)"
          >通知仓库发货</el-button> -->
        </div>
      </div>
      <div class="search-list">
        <div class="title">列表筛选操作</div>
        <div class="line" />
        <div class="form-items">
          <div class="select-item">
            <storeChoose style="margin-left:5px" @change="setMallId" />
          </div>
        </div>
        <div class="select-item" style="margin-bottom: 5px; display:flex">
          <div>
            <span class="search-title">订单创建时间：</span>
            <el-date-picker
              v-model="createdTime"
              size="mini"
              value-format="yyyy-MM-dd"
              type="daterange"
              style="width: 220px"
              range-separator="-"
              :picker-options="pickerOptions"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>

          <div style="margin-left:30px">
            <span class="search-title ">颜色标识：</span>
            <el-select
              v-model="colorLabelId"
              size="mini"
              style="width: 180px"
              clearable
              placeholder="全部"
            >
              <el-option
                v-for="item in colorLogoList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :style="item.color"
              />
            </el-select>
          </div>
        </div>

        <div class="form-items">
          <div class="select-item">
            <span class="search-title">包裹入库时间：</span>
            <el-date-picker
              v-model="storageTime"
              size="mini"
              value-format="yyyy-MM-dd"
              type="daterange"
              style="width: 220px"
              range-separator="-"
              :picker-options="pickerOptions"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>

          <div class="select-item" style="margin-left:25px">
            <span class="search-title">订单编号：</span>
            <el-input v-model="packageOrderSn" size="mini" style="width: 180px" clearable />
            <span style="margin-left: 8px" class="search-title">采购物流单号：</span>
            <el-input v-model="statuoriginalTrackingNumbers" size="mini" style="width: 180px" clearable />
          </div>
        </div>
        <div class="form-items">
          <div class="select-item">
            <span class="search-title">包裹出库时间：</span>
            <el-date-picker
              v-model="outboundTime"
              size="mini"
              value-format="yyyy-MM-dd"
              type="daterange"
              style="width: 220px"
              range-separator="-"
              :picker-options="pickerOptions"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
          <div class="select-item">
            <span class="search-title">订单发货状态：</span>
            <el-select
              v-model="deliveryStatus"
              size="mini"
              style="width: 180px"
              clearable
              placeholder="全部"
            ><el-option label="全部" value="" />
              <el-option v-for="item in deliverStateList" :key="item.deliveryStatus" :label="item.label" :value="item.deliveryStatus" />
            </el-select>
          </div>
          <div class="select-item" style="margin-left:5px">
            <span class="search-title">包裹异常类型：</span>
            <el-select
              v-model="exceptionType"
              size="mini"
              style="width: 180px"
              clearable
              placeholder="全部"
            ><el-option label="全部" value="" />
              <el-option v-for="item in abnormalTypeList" :key="item.exception_type" :label="item.label" :value="item.exception_type" />
            </el-select>
          </div>

        </div>
        <div class="select-item" style="margin-top:10px">
          <el-button type="primary" style="margin-left: 4px" size="mini" class="m-80" :loading="orderPackageLoading" @click="orderPackage">搜索</el-button>
          <el-button v-if="!isExport" type="primary" size="mini" class="m-80" @click="tableToExcel">导出数据</el-button>
          <el-progress v-else style="width: 160px; display: inline-block; margin-left: 10px" :text-inside="true" :stroke-width="26" :percentage="((exportNum * 100) / total).toFixed(2) - 0" />
          <el-button type="primary" size="mini" class="m-80" style="width:120px" @click="remarkFun">批量更新用户备注</el-button>
          <el-button type="primary" size="mini" @click="closelogData">清空日志</el-button>
          <el-checkbox v-model="showlog" style="margin: 4px">隐藏日志</el-checkbox>

        </div>
      </div>
    </div>
    <div class="table-box">
      <el-table
        ref="workbenchTable"
        height="calc(100vh - 350px)"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
        :cell-style="{ textAlign: 'center' }"
        :row-style="{ height: '80px' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" fixed />
        <el-table-column label="序号" width="40" fixed>
          <template slot-scope="scope">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
          </template>
        </el-table-column>
        <el-table-column label="站点" min-width="80px" prop="country" fixed />
        <el-table-column label="店铺名称" min-width="150px" prop="mall_alias_name">
          <template slot-scope="{row}"><span>{{ row.mall_alias_name ? row.mall_alias_name :row.platform_mall_name }}</span></template>
        </el-table-column>
        <el-table-column label="仓库" min-width="120px" prop="warehouse_name" />
        <el-table-column label="颜色标识" min-width="100px" prop="colorText">
          <template slot-scope="{ row }">
            <!-- <span v-if="row.colorinfo" :style="row.color">{{ row.label }}</span> -->
            <el-tooltip v-if="row.colorinfo" effect="dark" placement="top-start">
              <div slot="content" style="width:auto;height:auto">{{ row.colorinfo.name }}</div>
              <!-- <el-button type="text"><div :style="row.colorinfo.color"></div></el-button> -->
              <div :style="{'backgroundColor':row.colorinfo.color.split(':')[1] , 'width':colorStyle.width , 'height':colorStyle.height}" /></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" min-width="180px" prop="package_order_sn">
          <template slot-scope="scope">
            <span>{{ scope.row.package_order_sn }} <span class="copyIcon" @click="copy(scope.row.package_order_sn)"><i class="el-icon-document-copy" /></span></span>
          </template>
        </el-table-column>
        <el-table-column label="数量" min-width="100px" prop="goodsCount" />
        <el-table-column label="商品详情" min-width="110px">
          <template slot-scope="scope">
            <p><el-button type="primary" size="mini" @click="getGoodsInfo(scope.row.package_order_sn)">查看签收详情</el-button></p>
          </template>
        </el-table-column>
        <el-table-column label="包裹重量" min-width="100px">
          <template slot-scope="scope">
            <p>{{ scope.row.package_weight }}g</p>
            <!--  <p>
            {{ packageType[scope.row.package_type] }}/{{ transportType[scope.row.transport_type] }}
          </p> -->
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="运费参考(元)"
          width="100"
          prop="package_weight"
        /> -->
        <el-table-column label="等待子包裹发货" min-width="120px" prop="statusText">
          <template slot-scope="scope">
            <div class="goods-detail">
              {{ scope.row.is_mark_outbound > 0 ? '否' : '是' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单发货状态" min-width="100px" prop="delivery_status">
          <template slot-scope="{row}"><span>{{ delivery_statusList[row.delivery_status] }}</span></template>
        </el-table-column>
        <el-table-column label="异常类型" min-width="100px" prop="exceptionText" />
        <el-table-column label="订单创建时间" min-width="150px" prop="order_created_time" />
        <el-table-column label="订单平台状态" min-width="110px" prop="order_status">
          <template scope="{row}"><span>{{ orderStatusList[row.order_status] }}</span></template>
        </el-table-column>
        <el-table-column label="截止发货时间" min-width="150px" prop="latest_ship_date" />
        <el-table-column label="入库时间" min-width="150px" prop="storage_time" />
        <el-table-column label="出库时间" min-width="150px" prop="outbound_time" />
        <el-table-column label="入库图片" min-width="150px">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.storage_image" effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px">
              <div slot="content">
                <img :src="scope.row.storage_image" width="400px" height="400px">
              </div>
              <el-image :src="scope.row.storage_image" alt="" width="56px" height="56px" style="border-radius: 4px; margin: 0 auto" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="出库图片" min-width="150px">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.outbound_image" effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px">
              <div slot="content">
                <img :src="scope.row.outbound_image" width="400px" height="400px">
              </div>
              <el-image :src="scope.row.outbound_image" alt="" width="56px" height="56px" style="border-radius: 4px; margin: 0 auto" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="240px" align="left" label="备注" fixed="right">
          <template slot-scope="scope">
            <p style="text-align: left;margin-left:10px">仓库备注：{{ scope.row.ext_service && scope.row.ext_service.remark }}</p>
            <p style="text-align: left;margin-left:10px">
              用户备注：
              <span v-show="!(scope.row.id === activeRemarkID ? true : false)">{{ scope.row.user_remark }}</span>
              <!-- <el-input type="text" v-model="orderRemark" size="mini"></el-input> -->
              <el-input
                v-if="scope.row.id === activeRemarkID ? true : false"
                v-model="orderRemark"
                v-focus
                style="width: 120px"
                placeholder="请输入备注内容"
                size="mini"
                @blur="changeRemark(scope.row.package_order_sn, scope.$index)"
              />
              <i style="cursor: pointer" class="el-icon-edit-outline" @click="editRemark(scope.$index, scope.row.id)" />
            </p>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
          :page-sizes="[20, 50, 100, 200]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 批量更新用户备注 -->
    <el-dialog title="批量更新用户备注" class="dialog-order" width="400px" top="6vh" :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="remarkVisible" @closed="closeDialog5">
      <div class="order-dialog">
        <div class="form-item">
          <el-input v-model="newRemark" size="mini" clearable placeholder="请输入备注" />
          <el-button type="primary" size="mini" @click="remarkServe">提交</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 采购物流单号变更弹窗 -->
    <el-dialog title="采购物流单号变更" class="dialog-order" width="400px" top="6vh" :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="orderVisible" @closed="closeDialog1">
      <div class="order-dialog">
        <ul>
          <li>
            <label>原订单编号:</label>
            <el-input v-model="oldOrderSn" size="mini" style="width:180px" clearable placeholder="原订单编号" />
          </li>
          <li style="margin-left:-15px">
            <label>采购物流单号:</label>
            <el-input v-model="package_code" size="mini" style="width:180px" clearable placeholder="采购物流单号" />
          </li>
          <li>
            <label>新订单编号:</label>
            <el-input v-model="newOrderSn" size="mini" style="width:180px" clearable placeholder="新订单编号" />
          </li>
          <el-button type="primary" style="margin-left:100px" size="mini" @click="trackingNumberChangeOrder">保存</el-button>
        </ul>
      </div>
    </el-dialog>
    <!-- 批量标记颜色弹窗 -->
    <el-dialog title="标记颜色标识" class="dialog-color" width="400px" top="6vh" :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="colorVisible" @closed="closeDialog">
      <div class="color-dialog">
        <div class="form-item">
          <span class="search-title">颜色标识：</span>
          <el-select v-model="colorLabelId1" size="mini" style="width: 150px" clearable>
            <el-option v-for="item in colorLogoList" :key="item.id" :label="item.name" :value="item.id" :style="item.color" />
          </el-select>
          <el-button type="primary" size="mini" @click="setColorLabel">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- <el-dialog title="包裹数据导出" :visible.sync="dialogVisible1" width="380px">
      <p style="font-size: 16px; text-align: center">线上即将导出{{ multipleSelection.length ? multipleSelection.length : total }}条仓库包裹数据，是否生成？</p>
      <p v-if="total > 65000" style="text-align: center; color: red; margin-top: 10px; font-size: 16px">最多单次导出65000条数据, 请重新选择筛选条件。</p>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" style="width: 80px; margin: 0 20px 20px" @click="dialogVisible1 = false">取 消</el-button>
        <el-button
          size="small"
          :disabled="total > 65000"
          style="width: 80px; margin: 0 55px"
          type="primary"
          @click="
            dialogVisible1 = false
            exportOrders(1)
          "
        >确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 设置延时退单时间弹窗 -->
    <el-dialog
      title="设置延迟推单时间(小时)"
      class="dialog-delay"
      width="400px"
      top="6vh"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="delayVisible"
      @closed="closeDialog2"
    >
      <div class="delay-dialog">
        <div class="form-item">
          <el-input v-model="delayTime" size="mini" clearable placeholder="不超过24小时" />
          <el-button type="primary" size="mini" @click="timeDelay">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 包裹详情弹窗 -->
    <el-dialog title="包裹详情" class="dialog-order" width="1000px" top="6vh" :visible.sync="dialogVisible2">
      <div>
        <el-table
          ref="workbenchTable"
          max-height="590px"
          :data="goodsList"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{
            textAlign: 'center',
            backgroundColor: '#f5f7fa',
          }"
          :cell-style="{ textAlign: 'center' }"
          :row-style="{ height: '80px' }"
        >
          <el-table-column label="订单编号" min-width="180px" prop="order_sn" fixed />
          <el-table-column label="商品名称" min-width="300px" prop="">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.goods" effect="dark" placement="top-start">
                <div slot="content" style="width:200px;height:auto">{{ scope.row.goods.goods_name }}</div>
                <el-button type="text" class="bindmallclass">{{ scope.row.goods.goods_name }}</el-button>
              </el-tooltip>
              <!-- <div v-if="scope.row.goods" class="goods-detail">
                {{ scope.row.goods.goods_name }}
              </div> -->
            </template>
          </el-table-column>
          <el-table-column label="商品ID" min-width="110px" prop="warehouse_name">
            <template slot-scope="scope">
              <div v-if="scope.row.goods" class="goods-detail">
                {{ scope.row.goods.goods_id }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数量" min-width="40px" prop="goodsCount">
            <!-- <template slot-scope="scope">
              <div v-if="scope.row.goods" class="goods-detail">
                {{ scope.row.goods.goodsCount }}
              </div>
            </template> -->
          </el-table-column>
          <el-table-column label="拍单订单号" min-width="190px" prop="package_order_sn">
            <template slot-scope="scope">
              <div v-if="scope.row.shotOrder" class="goods-detail">
                {{ scope.row.shotOrder.shot_order_sn }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="拍单时间" min-width="150px" prop="goods_count">
            <template slot-scope="scope">
              <div v-if="scope.row.shotOrder" class="goods-detail">
                {{ scope.row.shotOrder.shotted_at }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="物流单号" min-width="150px" prop="package_code" />
          <el-table-column label="状态" min-width="70px">
            <template slot-scope="{ row }">
              <span>
                {{ row.package && packageStatus[row.package.status] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="签收时间" min-width="150px">
            <template slot-scope="scope">
              <p v-if="scope.row.package">{{ scope.row.package.package_time }}</p>
            </template>
          </el-table-column>
          <el-table-column label="包裹签收图片" min-width="100px">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.package" effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px">
                <div slot="content">
                  <img :src="scope.row.package.package_image" width="400px" height="400px">
                </div>
                <el-image :src="scope.row.package.package_image" alt="" width="56px" height="56px" style="border-radius: 4px; margin: 0 auto" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="申请赔付"
            width="120"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.isAbnormslPayment !==1"
                type="primary"
                size="mini"
                @click="applyDialog(scope.row)"
              >申请赔付</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p slot="footer" style="text-align: center">
        <el-button size="mini" style="width: 80px; margin: 0 30px 10px" type="primary" @click="dialogVisible2 = false">关 闭</el-button>
      </p>
    </el-dialog>

    <!-- 增值服务 -->
    <el-dialog title="添加增值服务" :visible.sync="dialogExtService" width="400px" @closed="closeDialog4">
      <div class="exe_itemAll">
        <div class="exe_item">
          <span> 增值服务: </span>
          <el-select v-model="extParams.name" size="mini" style="width: 200px">
            <!-- <el-option v-for="item in list" :value="" :label=""></el-option> -->
            <el-option :value="extParams.name" :label="extParams.name" />
          </el-select>
        </div>
        <div class="exe_item">
          <span> 服务价格: </span>
          <el-input v-model="extParams.price" disabled clearable size="mini" style="width: 200px" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </div>
        <div class="exe_item">
          <span> 服务备注: </span>
          <el-input v-model="extParams.remark" clearable size="mini" style="width: 200px" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </div>
        <div class="exe_item">
          <!-- <el-button size="mini" @click="dialogExtService = false">取 消</el-button> -->
          <!-- <div style="width:30px" /> -->
          <el-button type="primary" size="mini" @click="extService()">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 同步数据至仓库 -->
    <el-dialog title="同步数据至仓库" :visible.sync="dialog_compareData" width="950px" @closed="closeDialog3">
      <!-- <el-dialog title="同步数据至仓库" :visible.sync="dialog_compareData" width="950px" @closed="closeDialog3"> -->
      <div class="compareData_allItem">
        <div class="compareData_item">
          <span> 温馨提示：1：请务必确认订单对应店铺绑定的仓库是否正确 </span>
          <span> 温馨提示：2：若店铺同时绑定了国内仓和海外仓，则通过采购平台区分 (Lazada和Shopeeman默认为海外仓，其余默认国内仓，自有商品无法识别) </span>
          <span> 温馨提示：3：若店铺绑定的自有仓库，请重新绑定仓库，否则无法将数同步至仓库 ，将导致您的商品无法出库！！！ </span>
        </div>

        <div class="compareData_item">
          <el-table :header-cell-style="{ background: '#f7fafa' }" :data="compareDataList" :row-style="{ height: '50px' }" max-height="400">
            <el-table-column prop="country" label="站点" min-width="80px" align="center" fixed />
            <el-table-column prop="mall_alias_name" label="店铺名称" min-width="150px" align="center">
              <template slot-scope="{row}"><span>{{ row.mall_alias_name ? row.mall_alias_name :row.platform_mall_name }}</span></template>
            </el-table-column>
            <!-- <el-table-column prop="" label="采购类型" min-width="100px" align="center" /> -->
            <el-table-column prop="warehouse_name" label="当前绑定仓库" min-width="200px" align="center" />
            <el-table-column prop="" label="是否可同步" min-width="100px" align="center"><span>是</span></el-table-column>
            <el-table-column prop="warehouse_num" label="主订单数" min-width="100px" align="center" fixed="right" />

          </el-table>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 10px">
          <el-button size="mini" type="primary" @click="compareData()">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 申请赔付弹窗 -->
    <el-dialog
      class="apply-dialog"
      title="申请赔付"
      top="6vh"
      :visible.sync="applyVisible"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleClose"
    >
      <div class="wrap">
        <div class="left">
          <el-form label-position="right" label-width="100px">
            <el-form-item label="订单编号：">
              {{ applyOrderSn }}
            </el-form-item>
            <el-form-item label="拍单订单号：">
              {{ applyShotOrderSn }}
            </el-form-item>
            <el-form-item label="采购物流单号：">
              {{ applyPackageCode }}
            </el-form-item>
            <el-form-item label="当前状态：">
              {{ packageStatus[applyStatus]?packageStatus[applyStatus]:'' }}
            </el-form-item>
            <el-form-item label="包裹所属仓库：">
              {{}}
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-form label-position="right" label-width="80px">
            <el-form-item label="赔付类型：">
              <el-select
                v-model="applyType"
                placeholder=""
                size="mini"
                filterable
                @change="handleChange1"
              >
                <el-option
                  v-for="(item, index) in applyTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span style="color:red;margin-left:5px">如需赔付清关费，请填写在备注中</span>
            </el-form-item>
            <el-form-item label="赔付金额：">
              <span style="color:red">{{ applyMoney }}</span>
            </el-form-item>
            <el-form-item label="赔付原因：">
              <el-select
                v-model="applyTypeCause"
                placeholder=""
                size="mini"
                filterable
              >
                <el-option
                  v-for="(item, index) in applyTypeCauseList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="图片凭证：">
              <div v-for="(item, i) in applyImages" :key="i">
                <div v-if="item">
                  <el-image :src="item" @click="item = ''" />
                </div>
                <div v-else>
                  <el-upload
                    accept=".jpg,.jpeg,.png,.webp"
                    action="#"
                    :show-file-list="false"
                    :auto-upload="false"
                    list-type="picture-card"
                    :on-change="handleChange2"
                  >
                    <i class="el-icon-plus" @click="getImagesIndex(i)" />
                  </el-upload>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input
                v-model="applyRemark"
                type="textarea"
                :rows="5"
                size="mini"
                resize="none"
                placeholder="请输入内容"
                maxlength="150"
                show-word-limit
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footer">
        <el-button
          type="primary"
          size="mini"
          :loading="applyLoading"
          @click="applyCompensation"
        >
          申请赔付
        </el-button>
      </div>
    </el-dialog>
    <Logs ref="autoReplyLogs" v-model="showlog" clear />
  </div>
</template>

<script>
// import { getSites, getMalls, colorLabelList, creatDate } from '../../utils/index'
import { getValue, getColorinfo, creatDate, colorLabelList, MallList } from '../../../util/util'
import { statusList, exceptionList, orderStatusList, packageStatusList } from './warehouse'
import storeChoose from '../../../components/store-choose.vue'
import ShopeeConfig from '@/services/shopeeman-config'
import { randomWord } from '../../../util/util'
export default {
  components: {
    storeChoose // 店铺选择组件
  },
  directives: {
    focus: {
      inserted(el, binding, vnode) {
        // 聚焦元素
        el.querySelector('input').focus()
      }
    }
  },
  data() {
    return {
      showlog: true,
      // colorStyle: 'width:50px;height:20px;background-color:',
      colorStyle: {
        width: '100px',
        height: '20px'
      },
      orderStatusList: {
        '1': '待支付',
        '2': '待发货',
        '3': '已发货',
        '4': '已完成',
        '5': '取消中',
        '6': '已取消',
        '7': '退款/退货',
        '8': '确认签收',
        '9': '退款成功',
        '10': '退款失败',
        '20': '无售后订单'
      },
      statusList: {
        '1': '待发货',
        '2': '订单作废',
        '3': '暂停发货'
      },
      delivery_statusList: {
        '1': '待入库',
        '2': '等待包裹',
        '3': '紧急入库',
        '4': '待出库',
        '5': '已出库',
        '6': '已完成',
        '7': '订单作废',
        '8': '暂停发货',
        '9': '异常'
      },
      shopeeConfig: new ShopeeConfig(),
      compareDataList: [],
      dialog_compareData: false, // 同步数据至仓库
      dialogExtService: false, // 增值弹窗
      extParams: {
        // 增值参数
        packageOrderSns: '',
        name: '',
        price: '',
        remark: ''
      },
      orderPackageLoading: false,
      isLoading: false, // 加载页面
      tableData: [], // 表格数据
      multipleSelection: [], // 表格多选数据
      currentPage: 1, // 当前页\
      pageSize: 20,
      site: '', // 站点
      total: 0, // 数据总条数
      siteList: [
        // 站点列表
        {
          label: '全部',
          value: ''
        }
      ],
      shopGroup: [], // 店铺分组
      shopGroupList: [
        // 店铺分组列表
        {
          label: '店铺1',
          value: '1'
        },
        {
          label: '店铺2',
          value: '2'
        }
      ],
      shopAccount: [], // 店铺账号选择
      shopAccountList: [
        // 店铺账号列表
      ],
      activeRemarkID: 0,
      orderRemark: '',
      createdTime: [], // 订单创建时间
      deliveryStatus: '', // 订单发货状态
      deliverStateList: statusList, // 订单发货状态列表
      exceptionType: '', // 包裹异常类型
      abnormalTypeList: exceptionList, // 包裹异常类型列表
      packageStatusList: packageStatusList, // 包裹状态列表
      goodsPackageStatusList: ['', '已签收,未拣货', '已拣货', '申请退件', '已退件', '未签收'], // 商品包裹状态
      statuoriginalTrackingNumbers: '', // 采购物流单号
      storageTime: [], // 包裹入库时间
      packageOrderSn: '', // 订单编号
      colorLabelId: '', // 颜色标识
      colorLabelId1: '', // 标记弹窗选择颜色标识
      colorLogoList: [],
      outboundTime: [], // 包裹出库时间
      colorVisible: false, // 显示标记颜色弹窗
      orderVisible: false, // 显示采购物流单号变更弹窗
      delayVisible: false, // 显示设置延时退单时间弹窗
      newOrderSn: '', // 新订单编号
      oldOrderSn: '', // 原订单编号
      package_code: '', // 采购物流单号
      delayTime: '24', // 设置延时退单时间
      exportOrderList: [],
      // dialogVisible1: false,
      dialogVisible2: false,
      goodsList: [],
      transportType: ['海运', '空运', '陆运'],
      packageType: ['', '普货', '敏感货', '商检货'],
      isExport: false,
      exportIndex: 0,
      exportNum: 0,
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        }
      },
      remarkVisible: false,
      newRemark: '',

      // 申请赔付
      applyVisible: false,
      applyType: 1, // 类型
      applyTypeCause: 1, // 原因
      applyOrderSn: '', // 订单号
      applyImages: ['', '', ''], // 图片凭证
      applyRemark: '', // 备注
      applyPackageCode: '', // 采购物流单号
      applyShotOrderSn: '', // 拍单订单号
      applyStatus: '',
      applyMoney: '', // 赔付金额
      imagesIndex: '', // 图片下标
      applyLoading: false,

      packageStatus: {
        '-1': '未拒收',
        '1': '已拒收',
        '2': '已签收'
      },
      applyTypeList: [
        { value: 1, label: '赔付运费' },
        { value: 2, label: '赔付采购价' },
        { value: 4, label: '赔付采购价+运费' }
      ],
      applyTypeCauseList: [
        { value: 1, label: '仓库丢件' },
        { value: 2, label: '仓库漏发' },
        { value: 3, label: '超材出库' },
        { value: 4, label: '买家收货不符' },
        { value: 5, label: '包裹到齐48小时未出库' },
        { value: 6, label: '已出库，虾皮仓未发货致订单取消' }
      ]
    }
  },
  mounted() {
    this.createdTime = creatDate(7)
    this.getInfo()
    this.orderPackage()
    // this.userInfo()
  },
  methods: {
    // 申请赔付
    async applyCompensation() {
      const flag = this.applyImages.some(item => { return item !== '' })
      if (!flag) return this.$message.warning('请上传图片凭证')
      this.applyLoading = true
      const params = {
        type: this.applyType,
        typeCause: this.applyTypeCause,
        orderSn: this.applyOrderSn,
        images: this.applyImages,
        remark: this.applyRemark
      }
      try {
        const { data } = await this.$api.applyCompensation(params)
        if (data.code !== 200) {
          this.$message.error(data.message)
          this.applyLoading = false
          return
        }
        this.$message.success('申请赔付成功')
      } catch (error) {
        this.$message.error('申请赔付异常', error)
      }
      this.applyLoading = false
    },
    // 申请赔付弹窗
    applyDialog(row) {
      this.applyVisible = true
      this.applyOrderSn = row.order_sn
      this.applyPackageCode = row.package_code
      this.applyShotOrderSn = row.shotOrder && row.shotOrder.shot_order_sn ? row.shotOrder.shot_order_sn : ''
      this.applyStatus = row.package && row.package.status ? row.package.status : ''
      this.getMoney()
    },
    // 获取赔付金额
    async getMoney() {
      const params = {
        type: this.applyType,
        orderSn: this.applyOrderSn
      }
      try {
        const { data } = await this.$api.getMoney(params)
        if (data.code !== 200) {
          this.$message.error(data.message)
          return
        }
        this.applyMoney = data.data.amount
      } catch (error) {
        this.$message.error('获取赔付金额异常', error)
      }
    },
    // 赔付类型
    handleChange1() {
      this.getMoney()
    },
    // 上传图片
    async handleChange2(file) {
      const that = this
      const localFile = file.raw
      if (!/\.(jpg|jpeg|png|webp)$/.test(localFile.name.toLowerCase())) {
        this.showlog = false
        this.$refs.autoReplyLogs.writeLog(`上传格式不对,请上传jpg、jpeg、png、webp格式的图片`, false)
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name)
        this.applyImages[this.imagesIndex] = res
        this.$forceUpdate()
      }
    },
    // 获取图片下标
    getImagesIndex(val) {
      this.imagesIndex = val
    },
    // 清空日志
    closelogData() {
      this.$refs.autoReplyLogs.consoleMsg = ''
    },
    // 打开备注弹窗
    remarkFun() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请勾选一条需要操作的数据')
        return
      }
      this.remarkVisible = true
    },
    // 备注
    async remarkServe() {
      if (this.newRemark === '') {
        // this.$notify('', '请输入备注', 'error')
        this.$message.warning('请输入备注')
        return
      }
      this.isLoading = true
      const list = []
      this.multipleSelection.forEach(item => {
        list.push(item.package_order_sn)
      })
      try {
        const query = {
          packageOrderSn: list.toString(),
          remark: this.newRemark
        }
        const res = await this.$api.setUserRemark(query)
        // console.log('000000000', res)
        const data = res.data
        if (data.code === 200) {
          // this.$notify({
          //   title: '批量备注',
          //   type: 'success',
          //   message: '操作成功'
          // })
          this.$message.success('操作成功')
          this.orderPackage()
        } else {
          // this.$notify({
          //   title: '批量备注',
          //   type: 'error',
          //   message: data.message
          // })
          this.$message.error(data.message)
        }
        this.closeDialog5()
        this.remarkVisible = false
        this.isLoading = false
      } catch (err) {
        this.closeDialog5()
        this.remarkVisible = false
        console.log(err)
        this.isLoading = false
      }
    },
    // 关闭备注弹窗
    closeDialog5() {
      this.newRemark = ''
      // this.setSelect()
      this.remarkVisible = false
    },
    // 关闭同步弹窗
    closeDialog3() {
      // this.setSelect()
      this.dialog_compareData = false
    },
    // 批量推送订单至仓库
    compareDataVisible() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请勾选需要操作的数据')
        return false
      }
      try {
        // 合并重复项
        this.compareDataList = []
        this.multipleSelection.forEach((el) => {
          el.warehouse_num = 1
          const result = this.compareDataList.findIndex((ol) => {
            return el.mall_alias_name === ol.mall_alias_name && el.warehouse_name === ol.warehouse_name
          })
          if (result !== -1) {
            this.compareDataList[result].warehouse_num = this.compareDataList[result].warehouse_num + el.warehouse_num
          } else {
            this.compareDataList.push(el)
          }
        })
        // console.log('8888888888', this.multipleSelection)
        this.dialog_compareData = true
      } catch (error) {
        console.log(error)
      }
    },
    // 批量推送订单至仓库
    async compareData() {
      // const list = []
      // this.compareDataList.forEach(item => {
      //   // 参数 sysOrderId warehouseUserId
      //   list.push({ sysOrderId: item.sys_order_id, warehouseUserId: item.warehouse_id })
      // })
      // console.log('0000', this.compareDataList)
      this.showlog = false
      this.$refs.autoReplyLogs.writeLog(`开始批量推送订单至仓库......`)
      for (let i = 0; i < this.compareDataList.length; i++) {
        try {
          const params = {
            sysOrderId: this.compareDataList[i].sys_order_id,
            warehouseUserId: this.compareDataList[i].warehouse_id
          }
          const res = await this.$api.uploadWarehouseOrder(params)
          if (res.status === 200) {
            this.$refs.autoReplyLogs.writeLog(`订单号【${this.compareDataList[i].package_order_sn}】，推送成功`, true)
          } else {
            this.$refs.autoReplyLogs.writeLog(`订单号【${this.compareDataList[i].package_order_sn}】，推送成功`, false)
            continue
          }
        } catch (error) {
          this.$refs.autoReplyLogs.writeLog(`订单号【${this.compareDataList[i].package_order_sn}】，推送成功`, false)
          break
        }
      }
      this.$refs.autoReplyLogs.writeLog(`批量推送订单至仓库结束`)
      // const params = {
      //   lists: list
      // }
      // try {
      //   const res = await this.$api.uploadWarehouseOrder(params)
      //   // console.log('同步', res)
      //   if (res.status === 200) {
      //     if (res.data.code === 200) {
      //       // this.$notify({
      //       //   title: '同步数据',
      //       //   type: 'success',
      //       //   message: '操作成功'
      //       // })
      //       this.$message.success('操作成功')
      //     } else {
      //       // this.$notify({
      //       //   title: '同步数据',
      //       //   type: 'error',
      //       //   message: res.data.message
      //       // })
      //       this.$message.error(res.data.message)
      //     }
      //   } else {
      //     this.$message.error('网络走丢~~')
      //   }
      // } catch (error) {
      //   this.$message.error(error)
      // }

      this.closeDialog3()
    },
    // 获取面单信息
    async getPackage() {
      // 需要对接第三方接口
      // const res = await this.$api.getNotHaveLogisticsInformations()
      // console.log('///////', res)
      // if (res.data.code === 200) {
      //   this.$notify({
      //     type: 'success',
      //     message: '没有打印失败的包裹'
      //   })
      // } else {
      // }
    },
    // 关闭增值服务
    closeDialog4() {
      this.extParams = {
        packageOrderSns: '',
        name: '',
        price: '',
        remark: ''
      }
      // this.setSelect()
      this.dialogExtService = false
    },
    // 增值服务
    async extService_visible() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请勾选需要操作的数据')
        return false
      }
      const first = this.multipleSelection[0].warehouse_name

      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (first !== this.multipleSelection[i].warehouse_name) {
          this.$message.warning('只能批量给同一个仓库的包裹添加增值服务')
          return
        }
      }
      // 获取服务类型
      const data = {
        wid: this.multipleSelection[0].wid,
        key: 'value_added_services'
      }
      const res = await this.$XzyNetMessageService.post('xzy.warehouse.config', data)
      const date = JSON.parse(JSON.parse(res).data)
      if (date.code !== 200) {
        this.$message.error('获取服务增值信息失败')
        return
      }
      this.extParams.name = date.data[0].name
      this.extParams.price = date.data[0].price
      this.extParams.remark = date.data[0].remark
      this.dialogExtService = true
    },
    async extService() {
      if (this.extParams.name === '' || this.extParams.price === '') {
        this.$message.warning('服务名、价格不能为空')
      } else {
        try {
          this.showlog = false
          this.$refs.autoReplyLogs.writeLog(`开始添加增值服务......`)
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.extParams.packageOrderSns = this.multipleSelection[i].package_order_sn
            const data = await this.$api.uploadExtService(this.extParams)
            if (data.data.code === 200) {
              this.$refs.autoReplyLogs.writeLog(`订单号【${this.multipleSelection[i].package_order_sn}】，添加成功`, true)
            } else {
              this.$refs.autoReplyLogs.writeLog(`订单号【${this.multipleSelection[i].package_order_sn}】，${data.data.message}`, false)
              continue
            }
          }
          this.$refs.autoReplyLogs.writeLog(`添加增值服务完成`)
        } catch (error) {
          this.$message.error(error)
        }
        // 清空数据
        this.extParams = {
          packageOrderSns: '',
          name: '',
          price: '',
          remark: ''
        }
        this.dialogExtService = false
        // this.setSelect()
        this.orderPackage()
      }
    },
    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 页数切换
    handleCurrentChange() {
      this.orderPackage()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.orderPackage()
    },
    // 关闭标记颜色弹窗
    closeDialog() {
      this.colorLabelId1 = this.colorLogoList[0].id || ''
      // this.setSelect()
      this.colorVisible = false
    },
    // 关闭采购物流单号变更弹窗
    closeDialog1() {
      // this.setSelect()
      this.orderVisible = false
    },
    // 关闭设置延时退单时间弹窗
    closeDialog2() {
      this.delayVisible = false
    },
    async getInfo() {
      colorLabelList().then((res) => {
        // console.log('color', res)
        this.colorLogoList = res
        this.colorLabelId1 = res[0].id
      })
      // getSites().then(res => {
      //   this.siteList = this.siteList.concat(res)
      // })
      MallList().then((res) => {
        this.shopAccountList = res
      })
    },
    setMallId(ids) {
      this.shopAccount = ids || []
      console.log(this.shopAccount, ids)
    },
    // 查询列表
    async orderPackage() {
      this.orderPackageLoading = true
      this.tableData = []
      this.isLoading = true
      const sysMallIds = this.shopAccount.join(',')
      const query = {
        page: this.currentPage,
        pageSize: this.pageSize,
        status: '',
        packageOrderSn: this.packageOrderSn,
        originalTrackingNumber: this.statuoriginalTrackingNumbers,
        exceptionType: this.exceptionType,
        deliveryStatus: this.deliveryStatus,
        colorLabelId: this.colorLabelId,
        sysMallIds
      }
      if (this.createdTime && this.createdTime.length) {
        query.createdTime = this.setDateFmt(this.createdTime).join('/')
      }
      if (this.storageTime && this.storageTime.length) {
        query.storageTime = this.setDateFmt(this.storageTime).join('/')
      }
      if (this.outboundTime && this.outboundTime.length) {
        query.outboundTime = this.setDateFmt(this.outboundTime).join('/')
      }

      try {
        const res = await this.$api.orderPackage(query)
        const data = res.data
        // console.log(data, '---')
        if (data.code === 200) {
          this.total = data.data.total
          // this.pageSize = data.data.per_page
          const list = data.data.data
          for (let i = 0; i < list.length; i++) {
            const item = list[i]
            if (this.site !== '' && item.country !== this.site) {
              continue
            }
            item.mall_alias_name = getValue(this.shopAccountList, 'label', 'id', item.sys_mall_id)
            // item.site = getValue(this.siteList, 'label', 'value', item.country)
            item.statusText = getValue(statusList, 'label', 'deliveryStatus', item.delivery_status)
            item.exceptionText = getValue(exceptionList, 'label', 'exception_type', item.exception_type)
            item.orderStatusText = getValue(orderStatusList, 'label', 'order_status', item.order_status)
            // item.colorText = getValue(this.colorLogoList, 'Colorinfo', 'id', item.color_id) || '无'
            item.colorinfo = getColorinfo(this.colorLogoList, item.color_id) || ''
            item.country = this.shopeeConfig.getSiteCode(item.country)
            this.tableData.push(item)
          }
          // console.log('colorLogoList', this.colorLogoList)
          // console.log('tableList', this.tableData)
          // this.tableData = data.data.data
        } else {
          // this.$notify({
          //   type: 'error',
          //   message: data.message
          // })
          this.$message.error(data.message)
        }
        this.isLoading = false
      } catch (err) {
        console.log(err)
        this.isLoading = false
        // this.$message.error('查询失败')
      }
      this.orderPackageLoading = false
    },
    // 重置列表勾选状态
    setSelect() {
      this.tableData.forEach((row) => {
        this.$refs.workbenchTable.toggleRowSelection(row, false)
      })
    },
    // 标记无需等待子包裹
    async setNoWait() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请勾选需要操作的数据')
        return
      }
      this.isLoading = true
      let id = ''
      const list = this.multipleSelection
      id = list[0].id
      for (let i = 1; i < list.length; i++) {
        const item = list[i]
        id += ',' + item.id
      }
      try {
        const query = {
          id
        }
        const res = await this.$api.setNoWait(query)
        const data = res.data
        if (data.code === 200) {
          // this.$notify({
          //   type: 'success',
          //   message: '操作成功'
          // })
          this.$message.success('操作成功')
        } else {
          let message = ''
          for (let i = 0; i < data.data.length; i++) {
            const temp = data.data[i]
            if (temp.code !== 200) {
              message = temp.message
              break
            }
          }
          // this.$notify({
          //   type: 'error',
          //   message: message
          // })
          this.$message.error(message)
        }
        // this.setSelect()
        this.orderPackage()
        this.isLoading = false
      } catch (err) {
        // this.setSelect()
        console.log(err)
        this.isLoading = false
      }
    },
    // 标记需仓库紧急处理
    async markOrderNeedDeal() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请勾选需要操作的数据')
        return
      }
      this.isLoading = true
      let id = ''
      const list = this.multipleSelection
      id = list[0].id
      for (let i = 1; i < list.length; i++) {
        const item = list[i]
        id += ',' + item.id
      }
      try {
        const query = {
          id
        }
        const res = await this.$api.markOrderNeedDeal(query)
        const data = res.data
        if (data.code === 200) {
          // this.$notify({
          //   type: 'success',
          //   message: '操作成功'
          // })
          this.$message.error('操作成功')
        } else {
          let message = ''
          for (let i = 0; i < data.data.length; i++) {
            const temp = data.data[i]
            if (temp.code !== 200) {
              message = temp.message
              break
            }
          }
          // this.$notify({
          //   type: 'error',
          //   message: message
          // })
          this.$message.error(message)
        }
        // this.setSelect()
        this.orderPackage()
        this.isLoading = false
      } catch (err) {
        console.log(err)
        // this.setSelect()
        this.isLoading = false
      }
    },
    // 通知仓库发货，暂停发货
    async noticeTodeliver(isDelivery) {
      if (!this.multipleSelection.length) {
        this.$message.warning('请勾选需要操作的数据')
        return
      }
      this.isLoading = true
      let id = ''
      const list = this.multipleSelection
      id = list[0].id
      for (let i = 1; i < list.length; i++) {
        const item = list[i]
        id += ',' + item.id
      }
      try {
        const query = {
          id,
          isDelivery
        }
        const res = await this.$api.noticeTodeliver(query)
        const data = res.data
        // console.log('data', data.data)
        if (data.code === 200) {
          // this.$notify({
          //   type: 'success',
          //   message: '操作成功'
          // })
          this.$message.success('操作成功')
          // this.setSelect()
          this.orderPackage()
        } else {
          // this.$notify({
          //   type: 'error',
          //   message: data.message
          // })
          this.$message.error(data.message)
        }

        this.isLoading = false
        // this.setSelect()
      } catch (err) {
        // this.setSelect()
        console.log(err)
        this.isLoading = false
      }
    },
    editRemark(index, activeRemarkID) {
      this.activeRemarkID = activeRemarkID
      this.orderRemark = this.tableData[index].user_remark
    },
    // 修改单个备注
    async changeRemark(id, activeOrder) {
      // this.isLoading = true
      const res = await this.$api.setUserRemark({
        packageOrderSn: id,
        remark: this.orderRemark
      })
      this.tableData[activeOrder].user_remark = this.orderRemark
      this.isfocus = true
      this.activeRemarkID = ''
      if (res.data.code !== 200) {
        this.$message.error(`修改失败:${res.data.message}`, false)
        return
      }
      this.$message.success(`修改成功`, true)
      // const data = res.data
      // this.isLoading = false
      // if (data.code === 200) {
      //   this.$notify({
      //     title: '备注管理',
      //     type: 'success',
      //     message: `设置备注成功`
      //   })
      //   this.tableData[activeOrder].user_remark = this.orderRemark
      //   this.isfocus = true
      //   this.activeRemarkID = ''
      //   return
      // }
      // this.$notify({
      //   title: '备注管理',
      //   type: 'error',
      //   message: data.message
      // })
      // this.activeRemarkID = ''
    },
    // 采购物流单号变更
    trackingNumberChangeOrderFun() {
      // if (!this.multipleSelection.length || this.multipleSelection.length > 1) {
      //   this.$message.warning('请勾选一条需要操作的数据')
      //   return
      // }
      this.orderVisible = true
    },
    async trackingNumberChangeOrder() {
      if (this.newOrderSn === '' || this.oldOrderSn === '' || this.package_code === '') {
        // this.$notify('', '请填写新的单号', 'error')
        this.$message.error('请确保输入信息有效')
        return
      }
      this.isLoading = true
      try {
        const query = {
          trackingNumber: this.package_code, // 采购物流单号
          primaryOrderSn: this.oldOrderSn, // 原订单号
          orderSn: this.newOrderSn // 新订单号
        }
        const res = await this.$api.trackingNumberChangeOrder(query)

        const data = res.data
        if (data.code === 200) {
          // this.$notify({
          //   type: 'success',
          //   message: '操作成功'
          // })
          this.$message.success('操作成功')
          this.orderPackage()
        } else {
          // this.$notify({
          //   type: 'error',
          //   message: data.message
          // })
          this.$message.warning(data.message)
        }
        // this.setSelect()
        this.orderVisible = false
        this.isLoading = false
      } catch (err) {
        // this.setSelect()
        this.orderVisible = false
        console.log(err)
        this.isLoading = false
      }
    },
    // 设置订单颜色标识
    setColorLabelFun() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请勾选需要操作的数据')
        return
      }
      this.colorVisible = true
    },
    async setColorLabel() {
      // let sysOrderIds = ''
      // const list = this.multipleSelection
      // sysOrderIds = list[0].id
      // for (let i = 1; i < list.length; i++) {
      //   const item = list[i]
      //   sysOrderIds += ',' + item.id
      // }
      const list = []
      this.multipleSelection.forEach(item => {
        list.push(item.sys_order_id)
      })
      try {
        this.showlog = false
        this.$refs.autoReplyLogs.writeLog(`正在给订单号标识颜色......`)
        for (let i = 0; i < this.multipleSelection.length; i++) {
          const query = {
            sysOrderIds: this.multipleSelection[i].sys_order_id,
            id: this.colorLabelId1
          }
          const res = await this.$api.setColorLabel(query)
          if (res.data.code === 200) {
            this.$refs.autoReplyLogs.writeLog(`订单号【${this.multipleSelection[i].package_order_sn}】，标识成功`, true)
          } else {
            this.$refs.autoReplyLogs.writeLog(`订单号【${this.multipleSelection[i].package_order_sn}】，标识失败`, false)
            continue
          }
        }
        this.$refs.autoReplyLogs.writeLog(`订单号标识颜色完成`)
        // const query = {
        //   // sysOrderIds,
        //   sysOrderIds: list.toString() || '',
        //   id: this.colorLabelId1
        // }
        // const res = await this.$api.setColorLabel(query)
        // // console.log('color', res)
        // const data = res.data
        // if (data.code === 200) {
        //   // this.$notify({
        //   //   type: 'success',
        //   //   message: '操作成功'
        //   // })
        //   this.$message.success('操作成功')
        // } else {
        //   let message = ''
        //   for (let i = 0; i < data.data.length; i++) {
        //     const temp = data.data[i]
        //     if (temp.code !== 200) {
        //       message = temp.message
        //       break
        //     }
        //   }
        //   // this.$notify({
        //   //   type: 'error',
        //   //   message: message
        //   // })
        //   this.$message.warning(message)
        // }
        // this.setSelect()
        this.colorVisible = false
        this.orderPackage()
      } catch (err) {
        // this.setSelect()
        this.colorVisible = false
        console.log(err)
      }
    },
    // 设置延时退单时间
    // 获取用户信息
    userInfo() {
      let delayTime = localStorage.getItem('delayTime')
      if (!Number(delayTime)) {
        this.$api.userInfo().then((res) => {
          if (res.data.code === 200) {
            delayTime = res.data.data.xzyDelayedTime ? res.data.data.xzyDelayedTime : 24
            localStorage.setItem('delayTime', delayTime)
          }
        })
      }
      this.delayTime = delayTime
    },
    timeDelayFun() {
      this.delayVisible = true
    },
    timeDelay() {
      const delayTime = this.delayTime - 0
      if (delayTime === '') {
        // this.$notify('', '请输入延迟时间', 'error')
        this.$message.warning('请输入延迟时间')
        return
      }
      if (delayTime > 24) {
        // this.$notify('', '时间不能超过24小时', 'error')
        this.$message.warning('时间不能超过24小时')
        return
      }
      if (delayTime < 10) {
        // this.$notify('', '时间不能少于10小时', 'error')
        this.$message.warning('时间不能少于10小时')
        return
      }
      const query = {
        xzyDelayedTime: Math.round(delayTime)
      }
      this.$api
        .timeDelay(query)
        .then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            // this.$notify({
            //   type: 'success',
            //   message: '设置成功'
            // })
            this.$message.success('设置成功')
          } else {
            // this.$notify({
            //   type: 'error',
            //   message: res.data.message
            // })
            this.$message.error(res.data.message)
          }
          this.closeDialog2()
        })
        .catch(() => {
          this.closeDialog2()
        })
    },
    // 日期选择器时间处理
    setDateFmt(data) {
      data[0] = data[0].length > 15 ? data[0] : data[0] + ' 00:00:00'
      data[1] = data[1].length > 15 ? data[1] : data[1] + ' 23:59:59'
      return data
    },
    // 查看包裹信息弹窗
    async getGoodsInfo(packageOrderSn) {
      const params = { packageOrderSn }
      try {
        const { data } = await this.$api.getGoodsInfo({ params })
        if (data.code === 200) {
          this.goodsList = data.data
          console.log('this.goodsList', this.goodsList)
          this.dialogVisible2 = true
        } else {
          this.$message.error(data.message)
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 导出
    tableToExcel() {
      // 要导出的json数据
      if (this.multipleSelection.length > 0) {
        this.importBilling([this.multipleSelection])
      } else {
        if (!this.total) {
          // return this.$notify({
          //   title: '订单信息',
          //   type: 'warning',
          //   message: `没有可以导出的订单`
          // })
          this.$message.warning('没有可以导出的订单')
        }
        this.exportOrderList = []
        // this.dialogVisible1 = true
      }
    },
    // 实时导出
    async exportOrders(page, isRef) {
      this.isExport = this.isExport ? this.isExport : new Date() - 0
      const params = {
        status: '',
        packageOrderSn: this.packageOrderSn,
        statuoriginalTrackingNumbers: this.statuoriginalTrackingNumbers,
        exceptionType: this.exceptionType,
        deliveryStatus: this.deliveryStatus,
        colorLabelId: this.colorLabelId,
        sysMallIds: this.shopAccount.join(',')
      }
      params.page = page
      params.pageSize = 200
      params.isExport = this.isExport
      if (this.createdTime && this.createdTime.length) {
        params.createdTime = this.setDateFmt(this.createdTime).join('/')
      }
      if (this.storageTime && this.storageTime.length) {
        params.storageTime = this.setDateFmt(this.storageTime).join('/')
      }
      if (this.outboundTime && this.outboundTime.length) {
        params.outboundTime = this.setDateFmt(this.outboundTime).join('/')
      }
      const { data } = await this.$api.orderPackage(params)
      // console.log(data, 2222)
      if (data && data.data && data.data.data) {
        const newData = data.data.data
        for (let i = 0; i < newData.length; i++) {
          const item = newData[i]
          if (this.site !== '' && item.country !== this.site) {
            continue
          }
          item.mall_alias_name = getValue(MallList, 'label', 'id', item.sys_mall_id)
          item.site = getValue(this.siteList, 'label', 'value', item.country)
          item.statusText = getValue(statusList, 'label', 'deliveryStatus', item.delivery_status)
          item.exceptionText = getValue(exceptionList, 'label', 'exception_type', item.exception_type)
          item.orderStatusText = getValue(orderStatusList, 'label', 'order_status', item.order_status)
          item.colorText = getValue(this.colorLogoList, 'label', 'id', item.color_id) || '无'
        }
        this.total = data.data.total
        if (this.exportOrderList[this.exportIndex]) {
          this.exportOrderList[this.exportIndex].push(...newData)
        } else {
          this.exportOrderList[this.exportIndex] = newData
        }
        if (this.exportOrderList[this.exportIndex].length >= 10000) {
          this.exportOrderList[this.exportIndex + 1] = []
          this.exportIndex++
        }
        this.exportNum = this.exportIndex * 10000 + this.exportOrderList[this.exportIndex].length
        if (this.exportNum >= this.total) {
          this.isExport = false
          this.importBilling(this.exportOrderList)
          //  loading.close()
        } else {
          this.exportOrders(params.page + 1)
        }
      } else {
        if (isRef) {
          this.isExport = false

          // this.$notify({
          //   title: '仓库管理',
          //   type: 'error',
          //   message: data.message
          // })
          this.$message.error(data.message)
        } else {
          this.exportOrders(params.page, true)
        }
      }
    },
    // 生成导出文件--订单
    importBilling(exportOrderList) {
      // console.log(exportOrderList, this.exportIndex)
      let num = 1
      let str = `<tr><td>编号</td><td>站点</td><td>店铺名称</td><td>仓库</td><td>颜色标识</td><td>订单编号</td><td>数量</td><td>商品名称</td><td>包裹重量(g)</td><td>运输方式</td><td>货物类型</td><td>是否等待子包裹发货</td>
            <td>订单发货状态</td><td>异常类型</td><td>订单创建时间</td><td>订单平台状态</td><td>截止发货时间</td><td>入库时间</td><td>出库时间</td>
            <td>入库图片</td><td>出库图片</td><td>仓库备注</td><td>用户备注</td>
            </tr>`
      for (let index = 0; index <= this.exportIndex; index++) {
        const jsonData = exportOrderList[index]
        console.log(jsonData)
        jsonData.forEach((item) => {
          str += `<tr><td>${num++}</td>
                <td>${item.site + '\t'}</td>
                <td>${item.mall_alias_name ? item.mall_alias_name : item.platform_mall_name}</td>
                <td>${item.warehouse_name}</td>
                <td>${item.colorText ? item.colorText : ''}</td>
                <td style="mso-number-format:'\@';">${item.package_order_sn ? item.package_order_sn : ''}</td>
                <td>${item.goods_count ? item.goods_count : ''}</td>
                <td>${item.goods_name ? item.goods_name : ''}</td>
                <td>${item.package_weight ? item.package_weight : ''}</td>
                <td>${item.transport_type ? this.transportType[item.transport_type] : ''}</td>
                <td>${item.package_type ? this.packageType[item.package_type] : ''}</td>
                <td>${item.is_mark_outbound > 0 ? '否' : '是'}</td>
                <td>${item.statusText ? item.statusText : ''}</td>
                <td>${item.exceptionText ? item.exceptionText : ''}</td>
                <td>${item.order_created_time}</td>
                <td>${item.orderStatusText ? item.orderStatusText : ''}</td>
                <td>${item.latest_ship_date ? item.latest_ship_date : ''}</td>
                <td>${item.storage_time ? item.storage_time : ''}</td>
                <td>${item.outbound_time ? item.outbound_time : ''}</td>
                <td>${item.storage_image ? item.storage_image : '' + '\t'}</td>
                 <td>${item.outbound_image ? item.outbound_image : '' + '\t'}</td>
              <td>${item.remark ? item.remark : '' + '\t'}</td>
               <td>${item.user_remark ? item.user_remark : '' + '\t'}</td>
                </tr>`
        })
      }
      // Worksheet名
      const worksheet = `仓库包裹数据${new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)}`
      // const uri = 'data:application/vnd.ms-excel;base64,'

      // 下载的表格模板数据
      const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:x="urn:schemas-microsoft-com:office:excel"
                xmlns="http://www.w3.org/TR/REC-html40">
                <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                  <x:Name>${worksheet}</x:Name>
                  <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
                  </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                  </head><body><table>${str}</table></body></html>`
      // 下载模板
      // let template = templates.replace(/<td/g,`<td style="mso-number-format:'\@';"`)
      const blob = new Blob([template], { type: 'html', name: worksheet })
      const a = document.createElement('a')
      document.body.appendChild(a)
      // a.href = uri + this.base64(template)
      a.href = URL.createObjectURL(blob)
      a.download = `仓库包裹数据${new Date(Date.now() + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
        .slice(0, 20)}.xls`
      a.click()
      document.body.removeChild(a)
    },
    // 点击复制
    copy(attr) {
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
        // this.$notify({
        //   type: 'success',
        //   message: '复制成功'
        // })
        this.$message.success('复制成功')
      } catch (e) {
        // console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    },
    handleClose() {
      this.applyType = 1
      this.applyTypeCause = 1
      this.applyRemark = ''
      this.applyImages = ['', '', '']
    }
  }
}
</script>

<style lang="less" scoped>
.workbench {
  min-width: 1280px;
  padding: 0 5px;
  /deep/ .el-table .cell {
    padding-left: 2px !important;
    padding-right: 2px !important;
    line-height: 18px !important;
  }
  .copyIcon {
    color: var(--themeColor);
    margin-left: 1px;
    font-size: 16px;
    cursor: pointer;
  }
  .top-box {
    display: flex;
    overflow-x: auto;
    .operate {
      width: 320px;
      height: 245px;
      padding: 15px;
      border-radius: 10px;
      background: #fff;
      .btn-items {
        display: flex;
        align-items: center;
        height: 36px;
        .el-button {
          width: 140px;
          height: 28px;
        }
      }
    }

    .search-list {
      width: 100%;
      height: 245px;
      padding: 15px;
      border-radius: 10px;
      background: #fff;
      margin-left: 15px;
      min-width: 854px;
      .form-items {
        display: flex;
        flex-wrap: wrap;
        .select-item {
          margin-right: 5px;
          margin-bottom: 5px;
          .search-title {
            // width: 98px;
            text-align: right;
          }
        }
      }
    }

    .title {
      font-size: 16px;
      font-weight: bold;
      line-height: 23px;
      letter-spacing: 1px;
    }

    .line {
      margin: 10px 0;
      width: 100%;
      height: 2px;
      background: rgb(223, 223, 223);
    }
  }
  .m-80 {
    width: 80px;
    height: 30px;
    line-height: 13px;
  }
  .table-box {
    margin-top: 15px;
    width: 100%;
    height: 100%;
    padding: 15px;
    border-radius: 10px;
    background: #fff;

    .goods-detail {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .pagination {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
  }

  .dialog-order {
    .order-dialog {
      margin-left:60px;
      margin-top: -20px;
      ul{
        li{
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          label{
            margin-right: 5px;
          }
        }
      }
    }
  }

  .dialog-color {
    .color-dialog {
      height: 280px;
      margin-top: -20px;
    }
  }

  .dialog-delay {
    .delay-dialog {
      height: 40px;
      margin-top: -20px;
    }
  }

  .form-item {
    display: flex;
    align-items: center;

    .el-button {
      margin-left: 20px;
    }
  }

  .tra {
    margin: 0 5px;
  }

  /deep/.el-select {
    .el-tag:first-of-type {
      display: flex;
      align-items: center;

      .el-select__tags-text {
        // display: inline-block;
        max-width: 48px;
        overflow: hidden;
      }
    }
  }
  .exe_itemAll {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    .exe_item {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      span {
        margin-right: 5px;
      }
    }
  }
  .compareData_allItem {
    .compareData_item {
      display: flex;
      flex-flow: column;
      font-size: smaller;
      color: rebeccapurple;
      span {
        margin-bottom: 5px;
      }
    }
  }
  .apply-dialog{
    /deep/.el-dialog__body{
      padding: 0 20px 20px 20px !important;
      .wrap{
        display: flex;
        .el-form-item{
          margin-bottom: 10px;
        }
        .left{
          width: 290px;
          margin-right: 10px;
        }
        .right{
          width: 500px;
          .el-form-item__content{
            display: flex;
          }
          .el-image{
            margin-right: 10px;
            width: 80px !important;
            height: 80px !important;
            line-height: 80px !important;
            border-radius: 6px;
          }
          .el-upload{
            margin-right: 10px;
            width: 80px !important;
            height: 80px !important;
            line-height: 80px !important;
          }
          /deep/.el-icon-plus{
            width: 80px;
            height: 80px;
            line-height: 81px;
            margin: 0px 0px;
          }
        }
      }
      .footer{
        text-align: center;
      }
    }
  }
}
.bindmallclass{
   width: 200px;
      // height: 50px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
}
@media screen and (max-width: 1335px) {
}
</style>

<!--
 * @Author: your name
 * @Date: 2021-11-09 10:17:44
 * @LastEditTime: 2021-11-24 10:55:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\order-manager\components\OrderManagerOrderCenter.vue
-->
<template>
  <div class="order-center" v-loading="indexLoading">
    <header>
      <!-- btn 区 -->
      <transition name="slide-fade">
        <div v-if="isShow" class="selectBox">
          <!-- left box -->
          <div class="left-box mar-right">
            <div class="base-box">
              <span class="base-title">基础操作</span>
              <div class="base-item">
                <buyer-account :operation="operation" :buyerAccountList="buyerAccountList"></buyer-account>
              </div>
            </div>
          </div>
          <!-- right select box -->
          <div class="right-box">
            <div class="base-box">
              <span class="base-title">列表筛选操作</span>
              <div class="base-item">
                <el-row class="row-style">
                  <storeChoose :is-all="true" @changeMallList="changeMallList" :spanWidth="'80px'" :selectWidth="'180px'" :source="'orderCenter'"></storeChoose>
                  <div class="tool-item">
                    <el-select v-model="selectForm.timeType" placeholder="" size="mini" filterable style="width: 140px">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in timeTypeList" :key="index" />
                    </el-select>
                    <el-date-picker
                      v-model="selectForm.otherTime"
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
                    <el-select v-model="orderStatus" placeholder="" size="mini" multiple collapse-tags filterable　class="inputBox">
                      <el-option label="全部" :value="''" @click.native="selectAll('orderStatus', orderStatusList)" />
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderStatusList" :key="index" />
                    </el-select>
                  </div>
                  <div class="tool-item mar-right">
                    <span>采购状态：</span>
                    <el-select v-model="shotStatus" placeholder="" size="mini" multiple collapse-tags filterable　class="inputBox">
                      <el-option label="全部" :value="''" @click.native="selectAll('shotStatus', shotStatusList)" />
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in shotStatusList" :key="index" />
                    </el-select>
                  </div>
                  <div class="tool-item mar-right">
                    <span>商品来源：</span>
                    <el-select v-model="selectForm.isOwnOrder" placeholder="" size="mini" filterable　class="inputBox">
                      <el-option label="全部" :value="''" />
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in goodsSourceList" :key="index" />
                    </el-select>
                  </div>
                  <div class="tool-item mar-right">
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
                    <span>商品ID：</span>
                    <el-input v-model="selectForm.goodsId" size="mini" clearable class="inputBox" />
                  </div>
                  <div class="tool-item mar-right">
                    <span>颜色标识：</span>
                    <el-select v-model="selectForm.colorLabelId" placeholder="" size="mini" filterable　class="inputBox">
                      <el-option label="全部" :value="''" />
                    </el-select>
                  </div>
                  <div class="tool-item mar-right">
                    <span>毛利值：</span>
                    <el-input v-model="selectForm.minGrossProfit" size="mini" clearable style="width: 85px" />
                    <p style="margin: 0 4px">-</p>
                    <el-input v-model="selectForm.maxGrossProfit" size="mini" clearable style="width: 83px" />
                  </div>
                  <div class="tool-item mar-right">
                    <span>采购时间：</span>
                    <el-date-picker
                      v-model="selectForm.shotTime"
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
                    <el-select v-model="inputType" placeholder="" size="mini" filterable style="width: 80px">
                      <el-option :label="item.label" :value="item.value" v-for="(item, index) in inputTypeList" :key="index" />
                    </el-select>
                    <el-input v-model="inputContent" size="mini" clearable style="width: 160px" />
                    <el-tooltip effect="dark" placement="bottom-start">
                      <div slot="content">
                        查询选项为订单编号时：<br />
                        1、需进行批量查询时，可用英文逗号隔开各个订单编号<br />
                        查询选项为备注或商品货号时：<br />
                        1、查询全部数据传空<br />
                        2、查未备注或无商品货号数据时，传‘无’<br />
                      </div>
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </div>
                  <div class="tool-item mar-right">
                    <span>物流方式：</span>
                    <el-select v-model="logisticsIds" placeholder="" size="mini" multiple collapse-tags filterable　class="inputBox">
                      <el-option label="全部物流" :value="''" @click.native="selectAll('logisticsIds', shipTypeList)" />
                      <el-option :label="item.ShipName" :value="item.ShipId" v-for="(item, index) in shipTypeList" :key="index" />
                    </el-select>
                  </div>
                  <div class="tool-item mar-right">
                    <span>付款方式：</span>
                    <el-select v-model="selectForm.paymentMenthod" placeholder="" size="mini" filterable　class="inputBox">
                      <el-option label="全部付款方式" :value="''" />
                    </el-select>
                  </div>
                  <div class="tool-item mar-right">
                    <span>海外商品：</span>
                    <el-select v-model="selectForm.isOverseasGoods" placeholder="" size="mini" filterable　class="inputBox">
                      <el-option label="全部" :value="''" />
                      <el-option label="是" :value="'1'" />
                      <el-option label="否" :value="'-1'" />
                    </el-select>
                  </div>
                </el-row>
                <el-row class="row-style">
                  <el-button type="primary" size="mini" class="btnMini" @click="getOrderList">搜索</el-button>
                  <el-button type="primary" size="mini" class="btnMedium">一键同步上家库存</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="batchShipInfo">批量添加采购物流单号</el-button>
                  <el-button type="primary" size="mini" class="btnLong">批量获取Lazada付款方式</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="uploadStoreShipAmountVisible = true">上报仓库发货金额</el-button>
                  <el-button type="primary" size="mini" class="btnMedium" @click="openBefore">批量添加本地备注</el-button>
                </el-row>
                <el-row class="row-style">
                  <el-button type="primary" size="mini" class="btnMini" @click="lookForbidVisible = true">查看禁运品</el-button>
                  <el-button type="primary" size="mini" class="btnMedium" @click="outStoreBefore('自有仓库商品出库', '1')">自有仓库商品出库</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="outStoreBefore('产品中心商品出库', '2')">产品中心商品出库</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="outStoreBefore('海外仓备货商品出库', '3')">海外仓备货商品出库</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="outStoreBefore('国内仓备货商品出库', '4')">国内仓备货商品出局</el-button>
                  <el-button type="primary" size="mini" class="btnMedium">批量评价订单买家</el-button>
                </el-row>
                <el-row class="row-style">
                  <el-button size="mini" class="btnMini">导出数据</el-button>
                  <el-button size="mini" class="btnMedium">导出数据报表</el-button>
                  <el-button type="primary" size="mini" class="btnLong">批量打印面单</el-button>
                  <el-button type="primary" size="mini" class="btnLong">批量天猫淘宝海外平台拍单</el-button>
                  <el-button type="primary" size="mini" class="btnLongMax">批量获取天猫淘宝海外平台订单信息</el-button>
                  <el-button type="primary" size="mini" class="btnLong">拼多多月卡优惠券查询</el-button>
                </el-row>
                <el-checkbox v-model="showConsole" class="mar-right">隐藏日志</el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="showBtn">
        <p v-if="isShow" @click="isShow = false">收起<i class="el-icon-caret-top"></i></p>
        <p @click="isShow = true" v-else>展开<i class="el-icon-caret-bottom"></i></p>
      </div>
    </header>
    <div class="content">
      <el-table v-loading="tableLoading" ref="multipleTable" :data="tableData" tooltip-effect="dark" height="400px" @selection-change="handleSelectionChange">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="80px" label="站点" prop="country" align="center" v-if="showTableColumn('站点')">
          <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.country }}</template>
        </el-table-column>
        <el-table-column min-width="80px" label="店铺分组" prop="country" align="center" v-if="showTableColumn('店铺分组')">
          <!-- <template slot-scope="scope">{{ scope.row.mall_info.country }}</template> -->
        </el-table-column>
        <el-table-column min-width="120px" label="店铺名称" prop="platform_mall_name" align="center" v-if="showTableColumn('店铺名称')">
          <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.platform_mall_name }}</template>
        </el-table-column>
        <el-table-column align="center" label="采购绑定仓库" min-width="120" v-if="showTableColumn('采购绑定仓库')">
          <template slot-scope="scope">{{ scope.row.shot_order_info.warehouse_name }}</template>
        </el-table-column>
        <el-table-column align="center" prop="color_id" label="颜色标识" min-width="70" v-if="showTableColumn('颜色标识')" />
        <el-table-column align="center" prop="color_id" label="标识名称" min-width="70" v-if="showTableColumn('标识名称')" />
        <el-table-column prop="order_sn" label="订单编号" align="center" min-width="140px" v-if="showTableColumn('订单编号')" />
        <el-table-column align="center" prop="created_time" label="订单创建时间" min-width="140" v-if="showTableColumn('订单创建时间')" />
        <el-table-column align="center" prop="order_status" label="发货状态" min-width="70" v-if="showTableColumn('发货状态')">
          <template slot-scope="scope">{{ changeTypeName(scope.row.order_status, orderStatusList) }}</template>
        </el-table-column>
        <el-table-column align="center" prop="shopee_delivery_time" label="发货时间" min-width="140" v-if="showTableColumn('发货时间')">
          <template slot-scope="scope">{{ scope.row.shopee_delivery_time }}</template>
        </el-table-column>
        <el-table-column align="center" prop="ori_platform_id" label="采购类型" min-width="120" v-if="showTableColumn('采购类型')">
          <template slot-scope="scope">{{ changeTypeName(scope.row.goods_info.ori_platform_id, goodsSourceList) }}</template>
        </el-table-column>
        <el-table-column align="center" prop="123456" label="查看采购地址" min-width="120" v-if="showTableColumn('查看采购地址')">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openUrl(scope.row.goods_info.ori_url)">查看采购地址</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="123456" label="是否可二次销售" min-width="120" v-if="showTableColumn('是否可二次销售')">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>
        <el-table-column align="center" label="商品ID" min-width="120" v-if="showTableColumn('商品ID')">
          <template slot-scope="scope">{{ scope.row.goods_info.goods_id }}</template>
        </el-table-column>
        <el-table-column align="center" label="商品创建时间" min-width="140" v-if="showTableColumn('商品创建时间')">
          <template slot-scope="scope">{{ scope.row.goods_info.created_at }}</template>
        </el-table-column>
        <el-table-column align="center" label="商品图片" min-width="80" v-if="showTableColumn('商品图片')">
          <template slot-scope="scope">
            <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px; display: inline-block">
              <div slot="content">
                <el-image
                  v-bind:src="[scope.row.country, scope.row.mall_info ? scope.row.mall_info.platform_mall_id : '', scope.row.goods_info.goods_img] | imageRender"
                  style="width: 400px; height: 400px"
                ></el-image>
              </div>
              <el-image
                v-bind:src="[scope.row.country, scope.row.mall_info ? scope.row.mall_info.platform_mall_id : '', scope.row.goods_info.goods_img] | imageRender"
                style="width: 56px; height: 56px"
              ></el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品单价" min-width="80" v-if="showTableColumn('商品单价')">
          <template slot-scope="scope">{{ scope.row.goods_info.original_price }}</template>
        </el-table-column>
        <el-table-column align="center" label="商品数量" min-width="120" v-if="showTableColumn('商品数量')">
          <template slot-scope="scope">{{ scope.row.goods_info.goods_count }}</template>
        </el-table-column>
        <el-table-column align="center" label="商品标题" min-width="120" show-overflow-tooltip v-if="showTableColumn('商品标题')">
          <template slot-scope="scope">{{ scope.row.goods_info.goods_name }}</template>
        </el-table-column>
        <el-table-column align="center" label="搜同款" min-width="80" v-if="showTableColumn('搜同款')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">搜同款</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品类目" min-width="80" v-if="showTableColumn('商品类目')">
          <template slot-scope="scope">{{ scope.row.goods_info.goods_category_id }}</template>
        </el-table-column>
        <el-table-column align="center" label="规格编号" min-width="80" v-if="showTableColumn('规格编号')">
          <template slot-scope="scope">{{ scope.row.goods_info.sku_id }}</template>
        </el-table-column>
        <el-table-column align="center" label="商品规格" min-width="80" v-if="showTableColumn('商品规格')">
          <template slot-scope="scope">{{ scope.row.goods_info.goods_spec }}</template>
        </el-table-column>
        <el-table-column align="center" label="商品货号" min-width="120" v-if="showTableColumn('商品货号')">
          <template slot-scope="scope">{{ scope.row.goods_info.variation_id }}</template>
        </el-table-column>
        <el-table-column align="center" label="是否为海外仓商品" min-width="120" v-if="showTableColumn('是否为海外仓商品')">
          <template slot-scope="scope">{{ scope.row.goods_info.is_overseas_goods === 1 ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="total_amount" label="买家付款金额" min-width="120" v-if="showTableColumn('买家付款金额')">
          <template slot-scope="scope">{{ scope.row.total_amount }}</template>
        </el-table-column>
        <el-table-column align="center" prop="escrow_amount" label="订单收入" min-width="80" v-if="showTableColumn('订单收入')">
          <template slot-scope="scope">{{ scope.row.escrow_amount }}</template>
        </el-table-column>
        <el-table-column align="center" prop="escrow_amount" label="订单收入(RMB)" min-width="120" v-if="showTableColumn('订单收入(RMB)')">
          <template slot-scope="scope">{{ scope.row.escrow_amount }}</template>
        </el-table-column>
        <el-table-column align="center" prop="actual_shipping_cost" label="实际总邮费" min-width="80" v-if="showTableColumn('实际总邮费')">
          <template slot-scope="scope">{{ scope.row.actual_shipping_cost }}</template>
        </el-table-column>
        <el-table-column align="center" prop="sell_shipping_cost" label="卖家补贴邮费" min-width="120" v-if="showTableColumn('卖家补贴邮费')">
          <template slot-scope="scope">{{ scope.row.sell_shipping_cost }}</template>
        </el-table-column>
        <el-table-column align="center" prop="shot_amount" label="采购价" min-width="80" v-if="showTableColumn('采购价')">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_amount }}</template>
        </el-table-column>
        <el-table-column align="center" prop="shot_amount_rmb" label="采购价(RMB)" min-width="100" v-if="showTableColumn('采购价(RMB)')">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_amount_rmb }}</template>
        </el-table-column>
        <el-table-column align="center" prop="warehouse_ship_amount" label="仓库发货金额" min-width="120" v-if="showTableColumn('仓库发货金额')">
          <template slot-scope="scope">{{ scope.row.warehouse_ship_amount }}</template>
        </el-table-column>
        <el-table-column align="center" prop="warehouse_ship_amount" label="仓库发货金额(RMB)" min-width="140" v-if="showTableColumn('仓库发货金额(RMB)')">
          <template slot-scope="scope">{{ scope.row.warehouse_ship_amount }}</template>
        </el-table-column>
        <el-table-column align="center" prop="gross_profit" label="含邮费毛利" min-width="80" v-if="showTableColumn('含邮费毛利')">
          <template slot-scope="scope">{{ scope.row.gross_profit }}</template>
        </el-table-column>
        <el-table-column align="center" prop="gross_profit" label="含邮费毛利(RMB)" min-width="120" v-if="showTableColumn('含邮费毛利(RMB)')">
          <template slot-scope="scope">{{ scope.row.gross_profit }}</template>
        </el-table-column>
        <el-table-column align="center" prop="real_gross_profit" label="最终毛利" min-width="80" v-if="showTableColumn('最终毛利')">
          <template slot-scope="scope">{{ scope.row.real_gross_profit }}</template>
        </el-table-column>
        <el-table-column align="center" prop="real_gross_profit" label="最终毛利(RMB)" min-width="120" v-if="showTableColumn('最终毛利(RMB)')">
          <template slot-scope="scope">{{ scope.row.real_gross_profit }}</template>
        </el-table-column>
        <el-table-column align="center" prop="pay_account_info" label="付款账号" min-width="80" v-if="showTableColumn('付款账号')">
          <template slot-scope="scope">{{ scope.row.shot_order_info.pay_account_info ? scope.row.shot_order_info.pay_account_info.name : '' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="buy_account_info" label="采购账号" min-width="120" v-if="showTableColumn('采购账号')">
          <template slot-scope="scope">{{ scope.row.shot_order_info.buy_account_info ? scope.row.shot_order_info.buy_account_info.name : '' }}</template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="" label="账单明细" min-width="80" v-if="showTableColumn('账单明细')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">账单明细</el-button>
          </template>
        </el-table-column> -->
        <el-table-column align="center" prop="" label="拍单" min-width="80" v-if="showTableColumn('拍单')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">拍单</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="采购状态" min-width="120" v-if="showTableColumn('采购状态')">
          <template slot-scope="scope">{{ changeTypeName(scope.row.shot_order_info.shot_status, shotStatusList) }}</template>
        </el-table-column>
        <el-table-column align="center" label="采购时间" min-width="140" v-if="showTableColumn('采购时间')">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shotted_at }}</template>
        </el-table-column>
        <el-table-column align="center" label="采购订单号" min-width="140" v-if="showTableColumn('采购订单号')">
          <template slot-scope="scope">{{ scope.row.shot_order_info.order_sn }}</template>
        </el-table-column>
        <el-table-column align="center" label="采购付款方式" min-width="120" v-if="showTableColumn('采购付款方式')">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_payment_method }}</template>
        </el-table-column>
        <el-table-column align="center" prop="payment_method" label="平台付款方式" min-width="120" v-if="showTableColumn('平台付款方式')">
          <template slot-scope="scope">{{ scope.row.payment_method }}</template>
        </el-table-column>
        <el-table-column align="center" label="采购物流公司" min-width="120" v-if="showTableColumn('采购物流公司')">
          <template slot-scope="scope">{{ scope.row.original_logistics_id }}</template>
        </el-table-column>
        <el-table-column align="center" label="采购物流单号" min-width="120" v-if="showTableColumn('采购物流单号')">
          <template slot-scope="scope">{{ scope.row.original_tracking_number }}</template>
        </el-table-column>
        <el-table-column align="center" label="采购发货时间" min-width="120" v-if="showTableColumn('采购发货时间')">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_shipping_time }}</template>
        </el-table-column>
        <el-table-column align="center" prop="123456" label="采购物流轨迹" min-width="120" v-if="showTableColumn('采购物流轨迹')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="trackPathVisible = true">采购物流轨迹</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="merchant_no" label="商户订单号" min-width="120" v-if="showTableColumn('商户订单号')">
          <template slot-scope="scope">{{ scope.row.shot_order_info.merchant_no }}</template>
        </el-table-column>
        <el-table-column align="center" prop="transport_type" label="运输方式" min-width="80" v-if="showTableColumn('运输方式')">
          <template slot-scope="scope">{{ scope.row.transport_type === 1 ? '空运' : scope.row.transport_type === 2 ? '陆运' : '' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="package_type" label="货物类型" min-width="80" v-if="showTableColumn('货物类型')">
          <template slot-scope="scope">{{ scope.row.package_type }}</template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="note" label="买家备注" min-width="80">
          <template slot-scope="scope">{{  }}</template>
        </el-table-column> -->
        <el-table-column align="center" prop="logistics_name" label="虾皮物流" min-width="80" v-if="showTableColumn('虾皮物流')">
          <template slot-scope="scope">{{ scope.row.logistics_name }}</template>
        </el-table-column>
        <el-table-column align="center" prop="tracking_no" label="虾皮物流单号" min-width="120" v-if="showTableColumn('虾皮物流单号')">
          <template slot-scope="scope">{{ scope.row.tracking_no }}</template>
        </el-table-column>
        <el-table-column align="center" prop="123456" label="虾皮物流轨迹" min-width="120" v-if="showTableColumn('虾皮物流轨迹')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="getSHtrackPath(scope.row)">虾皮物流轨迹</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ship_by_date" label="截止发货时间" min-width="140" v-if="showTableColumn('截止发货时间')">
          <template slot-scope="scope">{{ scope.row.ship_by_date }}</template>
        </el-table-column>
        <el-table-column align="center" prop="delivery_status" label="仓库发货状态" min-width="100" v-if="showTableColumn('仓库发货状态')">
          <template slot-scope="scope">{{ scope.row.delivery_status }}</template>
        </el-table-column>
        <el-table-column align="center" prop="arrival_time" label="入库时间" min-width="140" v-if="showTableColumn('入库时间')">
          <template slot-scope="scope">{{ scope.row.arrival_time }}</template>
        </el-table-column>
        <el-table-column align="center" prop="delivery_time" label="出库时间" min-width="140" v-if="showTableColumn('出库时间')">
          <template slot-scope="scope">{{ scope.row.delivery_time }}</template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="本地备注" min-width="80" show-overflow-tooltip v-if="showTableColumn('本地备注')">
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </el-table-column>
        <el-table-column align="center" prop="note" label="shopee备注" min-width="100" show-overflow-tooltip v-if="showTableColumn('shopee备注')">
          <template slot-scope="scope">{{ scope.row.note }}</template>
        </el-table-column>
        <el-table-column align="center" prop="note_update_time" label="shopee备注更新时间" min-width="140" v-if="showTableColumn('shopee备注更新时间')">
          <template slot-scope="scope">{{ scope.row.note_update_time }}</template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="买家姓名" min-width="140" v-if="showTableColumn('买家姓名')" />
        <el-table-column align="center" label="买家地址" min-width="140" show-overflow-tooltip v-if="showTableColumn('买家地址')">
          <template slot-scope="scope">{{ scope.row.receiver_info.address }}</template>
        </el-table-column>
        <el-table-column align="center" prop="phone" label="手机号" min-width="120" v-if="showTableColumn('手机号')">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column align="center" prop="pay_time " label="订单支付时间" min-width="140" v-if="showTableColumn('订单支付时间')">
          <template slot-scope="scope">{{ scope.row.pay_time }}</template>
        </el-table-column>
        <el-table-column align="center" prop="123456" label="订单轨迹" min-width="80" v-if="showTableColumn('订单轨迹')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">订单轨迹</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="update_time" label="订单更新时间" min-width="140" v-if="showTableColumn('订单更新时间')">
          <template slot-scope="scope">{{ scope.row.update_time }}</template>
        </el-table-column>
        <el-table-column align="center" prop="" label="操作" min-width="120" v-if="showTableColumn('操作')" fixed="right">
          <template slot-scope="scope">
            <el-dropdown style="width: 100px; margin-left: 10px">
              <el-button style="width: 100px" size="mini" plain type="primary"> 操作<i class="el-icon-arrow-down el-icon--right" /> </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item> <div class="dropdownItem" @click="singleBuyInfo(scope.row)">采购信息编辑</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="addPurchaseLink(scope.row, scope.$index)">添加采购链接</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="addMoreTrackingNumber(scope.row, scope.$index)">添加多物流单号</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="setColorSingle(scope.row, scope.$index)">标记颜色标识</div></el-dropdown-item>
                <el-dropdown-item>
                  <div
                    class="dropdownItem"
                    @click="
                      clickRow = scope.row
                      billsDetailVisible = true
                    "
                  >
                    账单明细
                  </div></el-dropdown-item
                >
                <el-dropdown-item> <div class="dropdownItem" @click="SyncOrder(scope.row)">同步此店铺订单</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="SyncOrderSingle(scope.row)">同步订单</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="syncLogisticsSingle(scope.row)">同步此订单物流</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="getSHtrackPath(scope.row)">虾皮物流轨迹</div></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-button type="primary" size="mini">操作</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <Logs ref="Logs" clear v-model="showConsole" />
    <el-dialog title="配置订单列表显示列" :visible.sync="columnVisible" width="800px" top="5vh" :close-on-click-modal="false">
      <div class="column-style">
        <div class="column-item" v-for="(item, index) in columnConfigList" :key="index">
          <span>{{ item.column_header }}</span>
          <el-switch style="display: block" v-model="item.is_show" active-color="#13ce66" inactive-color="#a9a9a9" :active-value="1" :inactive-value="-1"> </el-switch>
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="checkAllColumn(1)">显示所有列</el-button>
        <el-button type="primary" size="mini" @click="checkAllColumn(-1)">隐藏所有列</el-button>
        <el-button type="primary" size="mini" @click="uploadColumn">应用</el-button>
      </span>
    </el-dialog>
    <el-dialog title="标记为海外商品" :visible.sync="abroadVisible" width="400px" :close-on-click-modal="false">
      <div class="abroad-style">
        <el-radio v-model="isAbroadGood" :label="1">海外商品</el-radio>
        <el-radio v-model="isAbroadGood" :label="-1">非海外商品</el-radio>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="setAbroadGood">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量添加本地备注" :visible.sync="localRamarkVisible" width="400px" @open="openBefore" :close-on-click-modal="false">
      <div class="abroad-style">
        <span>本地备注</span>
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="localRamark"> </el-input>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="batchSetRemark">批量添加</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择颜色标识" :visible.sync="colorVisible" width="600px" :close-on-click-modal="false" v-if="colorVisible">
      <div class="color-style">
        <el-table ref="colorTable" :data="colorList" tooltip-effect="dark" style="width: 100%" height="500">
          <el-table-column label="标识选择" width="100">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="colorRadio" @change.native="getCurrentRow(scope.row)"></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="颜色">
            <template slot-scope="scope">
              <div class="colorBox" :style="{ background: scope.row.color }"></div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="标识名称"></el-table-column>
        </el-table>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="setColor(multipleSelection)">设置颜色</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量添加采购信息" :visible.sync="purchaseInfoVisible" width="500px" top="5vh" v-if="purchaseInfoVisible" :close-on-click-modal="false">
      <purchase-info :chooseData="multipleSelection" :buyerAccountList="buyerAccountList" @close="closeDialog" :dealType="dealType"></purchase-info>
    </el-dialog>
    <el-dialog title="同步数据至仓库" :visible.sync="pushOrderToStoreVisible" width="1200px" :close-on-click-modal="false">
      <push-order :chooseData="multipleSelection"></push-order>
    </el-dialog>
    <el-dialog title="批量添加采购物流单号" :visible.sync="shipInfoVisible" width="400px" :close-on-click-modal="false">
      <div>
        <div class="item-box">
          <span>绑定仓库：</span>
          <el-select v-model="shipBindStore" size="mini" class="btnLongMax">
            <el-option :label="item.warehouse_name" :value="item.warehouse_id" v-for="(item, index) in shipStoreList" :key="index"></el-option>
          </el-select>
        </div>
        <div class="item-box">
          <span>采购物流单号：</span>
          <el-input v-model="shipNo" size="mini" clearable class="btnLongMax" />
        </div>
        <div class="item-box">
          <span>采购物流公司：</span>
          <el-input v-model="shipCompany" size="mini" clearable class="btnLongMax" />
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="batchSaveShipInfo">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上报仓库发货金额" :visible.sync="uploadStoreShipAmountVisible" width="1200px" v-if="uploadStoreShipAmountVisible" :close-on-click-modal="false">
      <upload-store-ship-amount></upload-store-ship-amount>
    </el-dialog>
    <!-- 四类商品出库 -->
    <el-dialog :visible.sync="goodsOutStoreVisible" width="1400px" top="5vh" v-if="goodsOutStoreVisible" :close-on-click-modal="false">
         <div slot="title">{{ outStoreTitle }}</div>
          <goods-out-store :chooseData="multipleSelection" :outStoreType="outStoreType"></goods-out-store>
    </el-dialog>
    <el-dialog title="添加采购链接" :visible.sync="addBuyLinkVisible" width="1200px" v-if="addBuyLinkVisible" append-to-body :close-on-click-modal="false">
      <buy-link :linkRow="clickRow" @close="closeDialog"></buy-link>
    </el-dialog>
    <el-dialog title="查看禁运品" :visible.sync="lookForbidVisible" width="1200px" :close-on-click-modal="false">
      <div class="forbid">
        <div class="forbid-left">
          <p class="title">航空禁运品</p>
          <p v-for="(item, index) in forbidData" :key="index">({{ index + 1 }}) {{ item }}</p>
        </div>
        <div class="forbid-right">
          <p class="title">泰国海关禁止进口商品</p>
          <div class="right-col">
            <p v-for="(item, index) in forbidTHData" :key="index" class="half">({{ index + 1 }}) {{ item }}</p>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="添加多物流单号" :visible.sync="addMoreTraNumberVisible" width="700px" :close-on-click-modal="false" v-if="addMoreTraNumberVisible" @close="closeDialog">
      <div class="tra-style">
        <div class="item-box">
          <span style="width: 60px">绑定仓库</span>
          <el-select v-model="bindStore" size="mini" class="inputWidth">
            <el-option :label="item.warehouse_name" :value="item.warehouse_id" v-for="(item, index) in warehouseData" :key="index"></el-option>
          </el-select>
        </div>
        <div v-for="(item, index) in trackingNumberList" :key="index" class="tra-content">
          <div class="item-box">
            <span style="width: 80px">物流单号{{ index + 1 }}</span>
            <el-input v-model="item.original_tracking_number" size="mini" class="inputWidth"></el-input>
          </div>
          <div class="item-box">
            <span style="width: 80px">物流公司{{ index + 1 }}</span>
            <el-input v-model="item.original_logistics_company" size="mini" class="inputWidth mar-right"></el-input>
          </div>
          <el-button type="primary" size="mini" @click="deleteTraNumber(index)" class="item-box mar-right">删除</el-button>
          <el-button type="primary" size="mini" v-if="index === trackingNumberList.length - 1" @click="addTraNumber" class="item-box">添加</el-button>
        </div>
        <p>关于绑定仓库选项:</p>
        <p>1、仅显示当前订单店铺绑定的仓库</p>
        <p>2、采购类型如果为国内平台时，显示国内中转仓，如果为国外平台则显示海外仓</p>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="saveAddMoreTra">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="账单明细" :visible.sync="billsDetailVisible"  top="5vh" width="1200px" :close-on-click-modal="false" v-if="billsDetailVisible" @close="closeDialog">
      <bill-detail :chooseData="clickRow"></bill-detail>
    </el-dialog>
    <el-dialog title="物流轨迹" :visible.sync="trackPathVisible" width="400px" :close-on-click-modal="false" v-if="trackPathVisible" @close="closeDialog">
      <el-steps direction="vertical" :active="1">
        <el-step title="暂无物流信息" :description="$dayjs(new Date()).format('YYYY-MM-DD HH:mm')"></el-step>
      </el-steps>
    </el-dialog>
    <el-dialog title="虾皮物流轨迹" :visible.sync="spTrackPathVisible" width="600px" :close-on-click-modal="false" v-if="spTrackPathVisible" @close="closeDialog">
      <div class="track-step">
        <div class="step-header">
          <span>物流名称：</span>
          <span>{{ clickRow.logistics_name }}</span>
          <span>物流编号:</span>
          <span>{{ clickRow.tracking_no }}</span>
        </div>
        <div v-if="spTrackPath.length">
          <el-steps direction="vertical" :active="1">
            <el-step title="暂无物流信息" :description="$dayjs(new Date()).format('YYYY-MM-DD HH:mm')"></el-step>
          </el-steps>
        </div>
        <div v-else>
          <p>暂无</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { orderStatusList, shotStatusList, timeTypeList, inputTypeList, goodsSourceList, siteShip, columnData, forbidData, forbidTHData, syncStatus } from '../components/orderCenter/orderCenter'
import { exportExcelDataCommon, creatDate } from '../../../util/util'
import storeChoose from '../../../components/store-choose'
import BuyerAccount from './orderCenter/buyer-account.vue'
import LogisticeSyncService from '../../../services/logistics-sync-service/logistics-sync-service-new-copy'
import PurchaseInfo from './orderCenter/purchaseInfo.vue'
import PushOrder from './orderCenter/pushOrderToStore.vue'
import GoodsOutStore from './orderCenter/goodsOutStore.vue'
import BuyLink from './orderCenter/addBuyLink.vue'
import BillDetail from './orderCenter/billDetail.vue'
import UploadStoreShipAmount from './orderCenter/uploadStoreShipAmount.vue'
import _ from 'lodash'
import ShotOrderService from '../../../services/short-order/shot-order-service'
import orderSync from '../../../services/timeOrder'
export default {
  components: {
    BuyerAccount,
    storeChoose,
    PurchaseInfo,
    PushOrder,
    GoodsOutStore,
    UploadStoreShipAmount,
    BuyLink,
    BillDetail,
  },
  data() {
    return {
      selectForm: {
        timeType: 'timeType', //其它时间类型
        otherTime: '', //其它时间
        orderStatus: '', //订单状态
        shotStatus: '', //采购状态
        isOwnOrder: '', //商品来源
        isOverseasGoods: '', //海外商品
        paymentMenthod: '', //付款方式
        minGrossProfit: '', //最小毛利
        maxGrossProfit: '', //最大毛利
        goodsId: '', //商品id
        colorLabelId: '', //颜色标识
        createTime: '', //创建时间
        shotTime: '', //采购时间
        paymentMenthod: '', //付款方式
        isOverseasGoods: '', //海外商品
        isOverseasGoods: '', //海外商品
        sysMallId: '', //系统店铺id  多个用英文逗号隔开
        logisticsIds: '', //物流方式
      },
      createTime: [], //创建时间
      logisticsIds: [], //物流方式
      orderStatus: [], ///订单状态
      shotStatus: [], //采购状态
      inputType: 'orderSn',
      inputContent: '',
      orderStatusList: orderStatusList, //订单状态
      shotStatusList: shotStatusList, //采购状态
      timeTypeList: timeTypeList, //其它时间类型
      inputTypeList: inputTypeList,
      goodsSourceList: goodsSourceList, //商品来源
      columnConfigList: columnData, //自定义配置列
      forbidData: forbidData,
      forbidTHData: forbidTHData,
      shipTypeList: [], //物流方式
      tableLoading: false,
      tableData: [],
      pageSize: 20,
      currentPage: 1,
      total: 0,
      showConsole: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      isShow: true,
      operation: {
        upData: 'buyerAccountList',
        left: [
          { title: '登录买手号', type: 'primary', key: 1 },
          { title: '同步订单', type: 'primary', key: 2, check: 'order' },
          { title: '获取物流单号', type: 'primary', key: 3, check: 'ship' },
          { title: '批量拍单', type: 'primary', key: 4, click: 'purchaseHandler' },
          { title: '配置自定义列', type: 'primary', key: 5 },
          { title: '上传账号信息', type: 'primary', key: 6 },
          { title: '下载账号信息', type: 'primary', key: 7 },
        ],
        center: [
          { title: '拼多多账号', platform: 1, centerTitle: '拼多多个人中心' },
          { title: '淘宝账号', platform: 2, centerTitle: '淘宝个人中心' },
          { title: '1688账号', platform: 8, centerTitle: '1688个人中心' },
          { title: '京喜账号', platform: 10, centerTitle: '京喜个人中心' },
          { title: 'lazada账号', platform: 9, centerTitle: 'lazada个人中心' },
          { title: 'shopee账号', platform: 11, centerTitle: 'shopee个人中心' },
          // { title: '天猫淘宝海外账号', platform: 888, centerTitle: '刷新天猫淘宝海外平台账号' },
        ],
        right: [
          { title: '批量推送订单至仓库 ', key: 8, type: 'primary' },
          { title: '批量标记颜色', key: 9, type: 'primary', click: 'getColorList' },
          { title: '批量标记海外商品', key: 10, type: 'primary' },
          { title: '批量添加采购信息', key: 11, type: 'primary' },
        ],
      },
      selectMallList: [],
      chooseTime: [],
      productID: '',
      multipleSelection: [],
      buyerAccountList: [],
      buyerAccountListGlobal: [],
      accountpdd: null,
      accounttaobao: null,
      account1688: null,
      accountjx: null,
      accountlazada: null,
      accountshopee: null,
      accountCrossBorder: null,
      showConsole: true, //日志
      columnVisible: false, //自定义配置列弹窗
      abroadVisible: false, //标记为海外商品
      isAbroadGood: 0, //标记为海外商品
      indexLoading: false,
      localRamarkVisible: false, //本地备注
      localRamark: '', //本地备注
      colorVisible: false, //颜色标识
      colorList: [],
      colorRadio: '',
      colorRow: {}, //选择的颜色行
      purchaseInfoVisible: false, //批量添加采购信息
      pushOrderToStoreVisible: false, //推送订单至仓库
      goodsOutStoreVisible: false, //商品出库
      outStoreTitle: '自有商品出库',
      outStoreType: '1',
      shipInfoVisible: false, //批量添加采购物流单号
      shipBindStore: '',
      shipStoreList: [],
      shipNo: '',
      shipCompany: '',
      uploadStoreShipAmountVisible: false, //上报仓库发货金额
      dealType: 'batch', //添加采购信息状态
      singleRow: [],
      addBuyLinkVisible: false, //添加采购链接
      clickRow: {},
      lookForbidVisible: false, //查看禁运品
      addMoreTraNumberVisible: false, //添加多物流公司
      warehouseData: [],
      trackingNumberList: [],
      bindStore: '', //绑定仓库-多物流
      billsDetailVisible: false, //账单明细
      trackPathVisible: false, //采购物流轨迹
      spTrackPathVisible: false, //虾皮物流轨迹
      spTrackPath: [], //虾皮物流轨迹
    }
  },
  mounted() {
    this.indexLoading = true
    this.createTime = creatDate(30)
    // this.getBuyerList()
    this.getColumnsConfig()
    setTimeout(() => {
      this.getOrderList()
      this.indexLoading = false
    }, 2000)
  },
  methods: {
    //获取虾皮物流轨迹
    async getSHtrackPath(row) {
      this.clickRow = row
      let params = {
        order_id: row.order_id,
        shop_id: row.mall_info.platform_mall_id,
      }
      if (row.order_status === 7) {
        let res = await this.$shopeemanService.getLogisticsTrackingHistory(row.mall_info.country, params)
        if (res.code === 200) {
          this.spTrackPath = res.data
        }
      } else {
        let res = await this.$shopeemanService.getLogisticsTrackingHistoryRefund(row.mall_info.country, params)
        if (res.code === 200) {
          this.spTrackPath = res.data
        }
        console.log(res, 'getSHtrackPath')
      }
      this.spTrackPathVisible = true
    },
    //同步此订单物流
    async syncLogisticsSingle(row) {
      this.showConsole = false //打开日志
      this.$refs.Logs.consoleMsg = ''
      const service = new LogisticeSyncService(this.$refs.Logs.writeLog)
      if (!this.buyerAccountList.length) {
        this.$refs.Logs.writeLog(`没有买手号，请登录买手号`, false)
      }
      this.$refs.Logs.writeLog(`【${row.order_id}】获取采购物流轨迹开始`, true)
      service.start(this, this.buyerAccountList, [row])
    },
    //同步此订单
    async SyncOrderSingle(row) {
      this.showConsole = false //打开日志
      this.$refs.Logs.consoleMsg = ''
      this.$refs.Logs.writeLog(`【${row.order_id}】开始同步，请耐心等待!`, true)
      const orderService = new orderSync()
      await orderService.startSingel(row, this.$refs.Logs.writeLog)
    },
    //同步此店铺订单
    async SyncOrder(row) {
      console.log(row, this.selectMallList)
      let mallList = [row.mall_info]
      this.showConsole = false //打开日志
      this.$refs.Logs.consoleMsg = ''
      if (mallList.length == 0) {
        this.$refs.Logs.writeLog('没有获取到店铺数据，同步操作已取消!', false)
        return
      }
      this.$refs.Logs.writeLog('开始同步，请耐心等待!', true)
      for (let mI = 0; mI < mallList.length; mI++) {
        let mall = mallList[mI]
        for (let i = 0; i < syncStatus.length; i++) {
          //同步状态
          let statusObj = syncStatus[i]
          const orderService = new orderSync(mall, statusObj, this, this.$refs.Logs.writeLog)
          await orderService.start(`${mI + 1}/${mallList.length}`, 'manual')
        }
      }
      this.$refs.Logs.writeLog('订单同步已完成！！！', true)
    },
    // 打开外部窗口
    async openUrl(url) {
      this.$BaseUtilService.openUrl(url)
    },
    //关弹窗
    closeDialog() {
      this.trackingNumberList = []
      this.clickRow = {}
      this.purchaseInfoVisible = false
      this.addBuyLinkVisible = false
      this.multipleSelection = []
      this.billsDetailVisible = false
    },
    //保存多物流
    async saveAddMoreTra() {
      let list = []
      this.trackingNumberList.forEach((item) => {
        let obj = {
          id: item.id,
          trackingNumber: item.original_tracking_number,
          trackingNumberCompany: item.original_logistics_company,
        }
        list.push(obj)
      })
      let params = {
        sysOrderId: this.clickRow.id,
        lists: list,
        warehouseId: this.bindStore,
      }
      let res = await this.$api.updateOrderTrackingNumber(params)
      if (res.data.code === 200) {
        this.$message.success('添加成功!')
        this.addMoreTraNumberVisible = false
      } else {
        this.$message.error(`添加失败,${res.data.message}`)
      }
      console.log(res, 'res')
    },
    //添加多物流单号
    async addMoreTrackingNumber(row, index) {
      this.clickRow = row
      this.addMoreTraNumberVisible = true
      let res = await this.$appConfig.getWarehouseInfo(row.mall_info.platform_mall_id)
      let warehouseList = (res && JSON.parse(res)) || []
      if ([1, 2, 3, 5, 8, 10].indexOf(Number(row.goods_info.ori_platform_id)) > -1) {
        this.warehouseData = warehouseList.filter((item) => {
          return item.type == 0
        })
      } else if ([9, 11, 12, 15, 13].indexOf(Number(row.goods_info.ori_platform_id)) > -1) {
        this.warehouseData = warehouseList.filter((item) => {
          return item.type == 3
        })
      }
      console.log(this.warehouseData, 'this.warehouseData')
      let params = {
        sysOrderId: row.id,
      }
      let resF = await this.$api.getOrderTrackingNumber(params)
      console.log('resF', resF)
      if (resF.data.code === 200 && resF.data.data.length) {
        this.trackingNumberList = resF.data.data
      } else {
        this.addTraNumber()
      }
    },
    //删除多物流
    deleteTraNumber(index) {
      this.trackingNumberList.splice(index, 1)
    },
    //添加多物流
    addTraNumber() {
      let par = {
        id: '0',
        original_tracking_number: '',
        original_logistics_company: '',
        warehouse_user_id: '',
      }
      this.trackingNumberList.push(par)
    },
    //添加采购链接
    async addPurchaseLink(row, index) {
      this.clickRow = row
      this.addBuyLinkVisible = true
    },
    //单个采购信息编辑
    singleBuyInfo(row) {
      this.dealType = 'single'
      this.multipleSelection = []
      this.multipleSelection.push(row)
      this.purchaseInfoVisible = true
    },
    //保存-批量添加采购物流单号
    async batchSaveShipInfo() {
      if (!this.shipNo) {
        return this.$message.error('物流单号不能为空！')
      }
      let message = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let item = this.multipleSelection[i]
        let params = {
          sysOrderId: item.id,
          lists: [
            {
              id: '0',
              trackingNumber: this.shipNo,
              trackingNumberCompany: this.shipCompany,
            },
          ],
          warehouseId: this.shipBindStore,
        }
        let res = await this.$api.updateOrderTrackingNumber(params)
        if (res.data.code === 200) {
          message = message + `${item.order_sn}添加成功`
        } else {
          message = message + `${item.order_sn}添加失败${res.data.message}`
        }
      }
      this.$alert(message, '提示', {
        confirmButtonText: '确定',
      })
    },
    //批量添加采购物流单号
    async batchShipInfo() {
      let sameId = {}
      if (!this.multipleSelection.length) {
        return this.$message.warning('请选择订单数据！')
      }
      this.multipleSelection.forEach((item) => {
        sameId[Number(item.goods_info.ori_platform_id)] = item.goods_info.ori_platform_id
      })
      console.log(sameId)
      if (Object.keys(sameId).length > 1) {
        return this.$message.warning('只能批量添加同一个采购平台的物流信息！')
      }
      let storeInfo = null
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let order = this.multipleSelection[i]
        let orderType = 0
        if ([1, 2, 3, 5, 8, 10].indexOf(Number(order.goods_info.ori_platform_id)) > -1) {
          orderType = 0
        } else if ([9, 11, 12, 15, 13].indexOf(Number(order.goods_info.ori_platform_id)) > -1) {
          orderType = 3
        }
        let res = await this.$appConfig.getWarehouseInfo(order.mall_info.platform_mall_id)
        let warehouseList = (res && JSON.parse(res)) || []
        console.log(warehouseList, 'warehouseList', orderType)
        storeInfo = warehouseList.find((item) => {
          return item.type == orderType
        })
        console.log(storeInfo, 'storeInfo')
        if (storeInfo) {
          break
        }
      }
      this.shipStoreList = [storeInfo]
      console.log('223')
      this.shipInfoVisible = true
    },
    //批量拍单
    async purchaseHandler() {
      if (!this.multipleSelection.length) {
        return this.$notify({
          title: '拍单管理',
          type: 'warning',
          message: `请选择要操作的订单`,
        })
      }
      console.log('4544656')
      const waitOrders = JSON.parse(JSON.stringify(this.multipleSelection))
      let purchasesIdTb = {}
      let abroadShopeeCountry = {}
      let abroadLazadaCountry = {}
      let purchasesId = {}
      //若存在以下几种情况，提示后不在继续拍单
      // 1.若同时存在阿里巴巴和淘宝天猫的订单则提示 “淘宝(天猫)与1688的订单请分开拍单”
      waitOrders.forEach((item) => {
        purchasesId[item.goods_info.ori_platform_id] = item.goods_info.ori_platform_id
        if (item.goods_info.ori_platform_id && (item.goods_info.ori_platform_id == 2 || item.goods_info.ori_platform_id == 3)) {
          purchasesIdTb['tb'] = 'tb'
        } else if (item.goods_info.ori_platform_id && item.goods_info.ori_platform_id == 8) {
          purchasesIdTb['1688'] = '1688'
        } else if (item.goods_info.ori_platform_id && item.goods_info.ori_platform_id == 9) {
          abroadLazadaCountry[item.goods_info.ori_country] = item.goods_info.ori_country
          purchasesId[item.goods_info.ori_platform_id] = item.goods_info.ori_country
        } else if (item.goods_info.ori_platform_id && item.goods_info.ori_platform_id == 11) {
          abroadShopeeCountry[item.goods_info.ori_country] = item.goods_info.ori_country
          purchasesId[item.goods_info.ori_platform_id] = item.goods_info.ori_country
        }
      })
      console.log()
      if (Object.keys(purchasesIdTb).length > 1) {
        return this.$notify({
          title: '拍单管理',
          type: 'error',
          message: '淘宝(天猫)与1688的订单请分开拍单！',
        })
      }
      //2.存在上家类型为速卖通提示 “请先将速卖通的采购链接更换成国内的采购链接再进行拍单！”
      let smtFilter = waitOrders.filter((item) => {
        return item.goods_info.ori_platform_id && item.goods_info.ori_platform_id == 12
      })
      if (smtFilter.length > 0) {
        return this.$notify({
          title: '拍单管理',
          type: 'error',
          message: '请先将速卖通的采购链接更换成国内的采购链接再进行拍单！',
        })
      }
      //3.若上家类型为11:shopee、9:lazada，并且同时存在不同的站点订单提示  “目前只支持单个站点的Shopee/lazada批量拍单,请区分站点”  goods_info.ori_country
      if (Object.keys(abroadLazadaCountry).length > 1) {
        return this.$notify({
          title: '拍单管理',
          type: 'error',
          message: '目前只支持单个站点的Shopee/lazada批量拍单,请区分站点！',
        })
      }
      if (Object.keys(abroadShopeeCountry).length > 1) {
        return this.$notify({
          title: '拍单管理',
          type: 'error',
          message: '目前只支持单个站点的Shopee/lazada批量拍单,请区分站点！',
        })
      }
      //4.若上家类型为shopee、lazada  判断选择的买手号是否与选择的订单的站点是否一致，若不一致则提示 “请登录并选择对应站点的Shopee/Lazada拍单账号”
      //5.都需要判断是否登录并选择拍单号，若有某个上家平台的订单但是，单业务未选择买手号则提示  “请登录并选择1688（相应平台（淘宝天猫、拼多多等））拍单账号”
      let account = []
      account[1] = this.accountpdd
      account[2] = this.accounttaobao
      account[3] = this.accounttaobao
      account[10] = this.accountjx
      account[4] = this.accountjd
      account[8] = this.account1688
      account[9] = this.accountlazada
      account[11] = this.accountshopee
      account[13] = this.accountCrossBorder
      const pddAccount = this.getAccountById(this.accountpdd)
      const taobaoAccount = this.getAccountById(this.accounttaobao)
      const jdAccount = this.getAccountById(this.accountjd)
      const jxAccount = this.getAccountById(this.accountjx)
      const AlibabaAccount = this.getAccountById(this.account1688)
      const lazadaAccount = this.getAccountById(this.accountlazada)
      const shopeeAccount = this.getAccountById(this.accountshopee)
      const crossBorderAccount = this.getAccountGlobalById(this.accountCrossBorder)
      console.log('accountCrossBorder', this.accountCrossBorder, this.buyerAccountListGlobal, this.buyerAccountList)
      console.log(purchasesId, 'purchasesId', this.accountpdd, this.accounttaobao, this.account1688, this.accountjx, this.accountlazada, this.accountshopee, pddAccount, crossBorderAccount)
      for (const key in purchasesId) {
        console.log(key)
        if (!account[key]) {
          return this.$notify({
            title: '拍单管理',
            type: 'error',
            message: `请登录并选择${this.changeTypeName(key, this.goodsSourceList)}拍单账号`,
          })
        }
        if (key == 9 && account[9] && lazadaAccount) {
          if (lazadaAccount.site != purchasesId[key]) {
            return this.$notify({
              title: '拍单管理',
              type: 'error',
              message: `请登录并选择对应站点的Shopee/Lazada拍单账号`,
            })
          }
        }
        if (key == 11 && account[11] && shopeeAccount) {
          if (shopeeAccount.site != purchasesId[key]) {
            return this.$notify({
              title: '拍单管理',
              type: 'error',
              message: `请登录并选择对应站点的Shopee/Lazada拍单账号`,
            })
          }
        }
      }
      //
      const buyerAccount = _.remove([pddAccount, taobaoAccount, jdAccount, jxAccount, AlibabaAccount, lazadaAccount, shopeeAccount, crossBorderAccount], (n) => {
        return n != null && n !== undefined
      })
      this.showConsole = false
      const service = new ShotOrderService(waitOrders, buyerAccount, this)
      service.start(this.$refs.Logs.writeLog)
    },
    getAccountGlobalById(id) {
      let userInfo = null
      if (id) {
        this.buyerAccountListGlobal.forEach((item) => {
          if (item.id === id) {
            userInfo = item
          }
        })
      }
      return userInfo
    },
    getAccountById(id) {
      let userInfo = null
      if (id) {
        this.buyerAccountList.forEach((item) => {
          if (item.id === id) {
            userInfo = item
          }
        })
      }
      return userInfo
    },
    //打开商品出库弹窗
    outStoreBefore(title, type) {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请选择数据')
      }
      this.outStoreTitle = title
      this.outStoreType = type
      console.log(this.outStoreType,"79")
      this.goodsOutStoreVisible = true
    },
    // close() {
    //   this.purchaseInfoVisible = false
    //   this.addBuyLinkVisible = false
    //   this.multipleSelection = []
    // },
    async setColorSingle(row, index) {
      this.clickRow = row
      this.multipleSelection = [row]
      this.colorVisible = true
      await this.getColorList()
    },
    //设置颜色
    async setColor(arrData) {
      let ids = ''
      arrData.forEach((item, index) => {
        if (index === 0) {
          ids = item.id
        } else {
          ids = ids + ',' + item.id
        }
      })
      let params = {
        sysOrderIds: ids,
        id: this.colorRow.id,
      }
      let res = await this.$api.setColorLabel(params)
      if (res.data.code === 200) {
        this.$message.success('设置成功')
        this.colorVisible = false
      } else {
        this.$message.error(`设置失败-${res.data.message}`)
      }
      console.log(res, 'color')
    },
    //获取标识选择
    async getColorList() {
      let res = await this.$api.colorLabelList()
      if (res.data.code === 200) {
        this.colorList = res.data.data
      }
      console.log(res, 'color')
    },
    //颜色标识
    getCurrentRow(row) {
      this.colorRow = row
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
      this.$refs.Logs.consoleMsg = ''
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
      this.localRamark = ''
      this.localRamarkVisible = false
    },
    //标记为海外商品
    async setAbroadGood() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先选择需要标记的商品！')
      }
      if (this.isAbroadGood === 0) {
        return this.$message.warning('请选择标记类型！')
      }
      this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      this.multipleSelection.forEach(async (item) => {
        let params = {
          sysOrderId: item.id,
          status: this.isAbroadGood,
        }
        let res = await this.$api.markGoodsIsOverseas(params)
        if (res.data.code === 200) {
          this.$refs.multipleTable.toggleRowSelection(item, false)
          this.$refs.Logs.writeLog(`商品ID【${item.goods_info.goods_id}】标记成功`, true)
        } else {
          this.$refs.Logs.writeLog(`商品ID【${item.goods_info.goods_id}】标记失败-${res.data.message}`, false)
        }
        console.log(res)
      })
      this.isAbroadGood = 0
      this.abroadVisible = false
    },
    //表头显示处理
    showTableColumn(name) {
      let hasName = this.columnConfigList.find((item) => item.column_header == name)
      // console.log(hasName,"hasName")
      // return true
      if (hasName.is_show === 1) {
        return true
      } else {
        return false
      }
    },
    //显示、隐藏所有列
    checkAllColumn(val) {
      this.columnConfigList.forEach((item) => {
        item.is_show = val
      })
    },
    //上传配置列
    async uploadColumn() {
      let arr = []
      this.columnConfigList.forEach((item) => {
        let params = {
          columnHeader: item.column_header,
          isShow: item.is_show,
          firstColumnIsCheckbox: item.first_column_is_checkbox,
        }
        arr.push(params)
      })
      let params = {
        columnId: 1, //  1 => '订单列表',         2 => '售后列表',
        lists: arr,
      }
      let res = await this.$api.uploadColumnsConfig(params)
      if (res.data.code === 200) {
        this.$message.success('配置成功！')
        this.columnVisible = false
        this.getColumnsConfig()
      }
    },
    //获取自定义配置列
    async getColumnsConfig() {
      let { data } = await this.$api.getColumnsConfig()
      if (data.code === 200) {
        let resData = data.data
        if (!resData) {
          return
        } else {
          this.columnConfigList = resData
        }
      }
      // console.log(data.data, 'getColumnsConfig')
    },
    //同步物流单号
    async syncLogistics() {
      this.showConsole = false //打开日志
      this.$refs.Logs.consoleMsg = ''
      this.$refs.Logs.writeLog(`获取采购物流轨迹开始`, true)
      const service = new LogisticeSyncService(this.$refs.Logs.writeLog)
      if (!this.buyerAccountList.length) {
        this.$refs.Logs.writeLog(`没有买手号，请登录买手号`, false)
        return this.$message.warning('没有买手号,请登录！')
      }
      if (this.multipleSelection.length > 0) {
        service.start(this, this.buyerAccountList, this.multipleSelection)
      } else {
        service.start(this, this.buyerAccountList)
      }
      console.log(this.buyerAccountList)
    },
    //获取订单列表数据
    async getOrderList() {
      let sysMallId = ''
      this.selectMallList.forEach((item, index) => {
        if (index === 0) {
          sysMallId = item.id
        } else {
          sysMallId = sysMallId + ',' + item.id
        }
      })
      let params = JSON.parse(JSON.stringify(this.selectForm))
      params['page'] = this.currentPage
      params['pageSize'] = this.pageSize
      params['sysMallId'] = sysMallId
      params[this.inputType] = this.inputContent
      params['orderStatus'] = this.orderStatus.join(',')
      params['shotStatus'] = this.shotStatus.join(',')
      params['logisticsIds'] = this.logisticsIds.join(',')
      params['createTime'] = this.createTime.length ? this.createTime[0] + ' 00:00:00' + '/' + this.createTime[1] + ' 23:59:59' : ''
      let res = await this.$api.getOrderList(params)
      if (res.data.code === 200) {
        this.tableData = res.data.data.data
        this.total = res.data.data.total
      } else {
        this.$message.error(res.data.message)
      }
      console.log(this.tableData)
    },
    //获取买手号（服务端）
    async getBuyerList() {
      let res = await this.$api.getBuyerList()
      if (res.data.code === 200) {
        this.buyerAccountList = res.data.data
      }

      console.log('getBuyerList', this.buyerAccountList)
    },
    //获取买手号（壳）
    // async getBuyers() {
    //   let res = await this.$appConfig.getGlobalCacheInfo('buyerInfo', 'key')
    //   let resObj = res && JSON.parse(res)
    //   this.buyerAccountList = []
    //   resObj &&
    //     resObj.forEach((item) => {
    //       this.buyerAccountList.push(JSON.parse(item.BuyerDetail))
    //     })
    //   console.log('buyers', resObj, this.buyerAccountList)
    // },
    //商品来源中文信息
    changeTypeName(code, arr) {
      let res = arr.find((item) => {
        return item.value == code
      })
      return (res && res.label) || ''
    },
    //全选
    selectAll(key, baseData) {
      if (this[key].length < baseData.length) {
        this[key] = []
        // this[key].push('')
        baseData.map((item) => {
          this[key].push(item.value || item.ShipId)
        })
      } else {
        this[key] = []
      }
    },
    changeMallList(val) {
      this.selectMallList = val.mallList
      this.shipTypeList = siteShip(val.country || '') //物流方式
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
  },
}
</script>

<style lang="less" scoped>
.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.order-center {
  margin: 10px;
  overflow: hidden;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.content {
  margin: 20px 0;
  background: #fff;
  height: calc(100vh - 420px);
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
.mar-right {
  margin-right: 10px;
}
.selectBox {
  padding: 16px;
  display: flex;
  background: #fff;
  overflow: auto;
  .left-box {
    width: 730px;
  }
  .right-box {
    flex: 1;
  }
}
.base-box {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 10px;
  position: relative;
  min-width: 702px;
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
  .tool-item {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 80px;
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
.showBtn {
  width: 100%;
  height: 26px;
  line-height: 26px;
  background-color: #ffffff;
  font-size: 16px;
  letter-spacing: 1px;
  color: var(--themeColor);
  text-align: right;
  z-index: 99;
  cursor: pointer;
  p {
    display: inline-block;
  }
  i {
    font-size: 18px;
    vertical-align: middle;
  }
}
.btnMini {
  width: 80px;
}
.btnMedium {
  width: 120px;
}
.btnLong {
  width: 160px;
}
.btnLongMax {
  width: 220px;
}
.column-style {
  overflow: auto;
  height: 600px;
  display: flex;
  // justify-content: center;
  flex-wrap: wrap;
  .column-item {
    span {
      display: inline-block;
      width: 120px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #dcdcdc;
      margin-right: 5px;
    }
    display: flex;
    margin: 10px;
    align-items: center;
    min-width: 160px;
  }
}
.abroad-style {
  span {
    display: inline-block;
    width: 80px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.colorBox {
  height: 30px;
  width: 80px;
}
.item-box {
  display: flex;
  align-items: center;
  // justify-content: center;
  margin-bottom: 20px;
  span {
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 10px;
  }
  i {
    font-size: 18px !important;
    color: red;
    margin-left: 10px;
    cursor: pointer;
  }
}
.forbid {
  display: flex;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .title {
    font-weight: 900;
    font-size: 14px !important;
  }
  p {
    height: 26px;
  }
  .forbid-left {
    flex: 6;
  }
  .forbid-right {
    flex: 4;
    .right-col {
      display: flex;
      flex-wrap: wrap;
      .half {
        width: 50%;
      }
    }
  }
}
.tra-style {
  display: flex;
  flex-direction: column;
  .tra-content {
    display: flex;
  }
  p {
    color: red;
    height: 26px;
  }
}
.track-step {
  .step-header {
    display: flex;
    // justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
}

</style>
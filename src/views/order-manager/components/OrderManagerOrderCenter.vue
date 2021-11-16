<!--
 * @Author: your name
 * @Date: 2021-11-09 10:17:44
 * @LastEditTime: 2021-11-15 18:45:42
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
                  <el-button type="primary" size="mini" class="btnLong">批量添加采购物流单号</el-button>
                  <el-button type="primary" size="mini" class="btnLong">批量获取Lazada付款方式</el-button>
                  <el-button type="primary" size="mini" class="btnLong">上报仓库发货金额</el-button>
                  <el-button type="primary" size="mini" class="btnMedium" @click="openBefore">批量添加本地备注</el-button>
                </el-row>
                <el-row class="row-style">
                  <el-button type="primary" size="mini" class="btnMini">查看禁运品</el-button>
                  <el-button type="primary" size="mini" class="btnMedium">自有仓库商品出库</el-button>
                  <el-button type="primary" size="mini" class="btnLong">产品中心商品出库</el-button>
                  <el-button type="primary" size="mini" class="btnLong">海外仓备货商品出库</el-button>
                  <el-button type="primary" size="mini" class="btnLong">国内仓备货商品出局</el-button>
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
          <template slot-scope="scope">{{ scope.row.shot_order_info.warehouse_user_id }}</template>
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
          <template slot-scope="scope">{{}}</template>
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
        <el-table-column align="center" prop="" label="账单明细" min-width="80" v-if="showTableColumn('账单明细')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">账单明细</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="拍单" min-width="80" v-if="showTableColumn('拍单')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">拍单</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="操作" min-width="80" v-if="showTableColumn('操作')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">操作</el-button>
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
            <el-button type="primary" size="mini">采购物流轨迹</el-button>
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
        <el-table-column align="center" prop="logistics_id" label="虾皮物流" min-width="80" v-if="showTableColumn('虾皮物流')">
          <template slot-scope="scope">{{ scope.row.logistics_id }}</template>
        </el-table-column>
        <el-table-column align="center" prop="tracking_no" label="虾皮物流单号" min-width="120" v-if="showTableColumn('虾皮物流单号')">
          <template slot-scope="scope">{{ scope.row.tracking_no }}</template>
        </el-table-column>
        <el-table-column align="center" prop="123456" label="虾皮物流轨迹" min-width="120" v-if="showTableColumn('虾皮物流轨迹')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">虾皮物流轨迹</el-button>
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
    <el-dialog title="配置订单列表显示列" :visible.sync="columnVisible" width="800px">
      <div class="column-style">
        <div class="column-item" v-for="(item, index) in columnConfigList" :key="index">
          <span>{{ item.column_header }}</span>
          <el-switch style="display: block" v-model="item.is_show" active-color="#13ce66" inactive-color="#a9a9a9"> </el-switch>
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="checkAllColumn(true)">显示所有列</el-button>
        <el-button type="primary" size="mini" @click="checkAllColumn(false)">隐藏所有列</el-button>
        <el-button type="primary" size="mini" @click="uploadColumn">应用</el-button>
      </span>
    </el-dialog>
    <el-dialog title="标记为海外商品" :visible.sync="abroadVisible" width="400px">
      <div class="abroad-style">
        <el-radio v-model="isAbroadGood" :label="1">海外商品</el-radio>
        <el-radio v-model="isAbroadGood" :label="-1">非海外商品</el-radio>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="setAbroadGood">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量添加本地备注" :visible.sync="localRamarkVisible" width="400px" @open="openBefore">
      <div class="abroad-style">
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
import { orderStatusList, shotStatusList, timeTypeList, inputTypeList, goodsSourceList, siteShip } from '../components/orderCenter/orderCenter'
import { exportExcelDataCommon, creatDate } from '../../../util/util'
import storeChoose from '../../../components/store-choose'
import BuyerAccount from './orderCenter/buyer-account.vue'
import LogisticeSyncService from '../../../services/logistics-sync-service/logistics-sync-service-new-copy'
export default {
  components: {
    BuyerAccount,
    storeChoose,
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
        url: {
          getAccount: {
            path: '/api/buyerAccount/',
          },
          upAccount: {
            path: '/api/buyerAccount/store',
          },
          removeAccount: {
            path: '/api/buyerAccount/destroy',
          },
        },
        upData: 'buyerAccountList',
        left: [
          { title: '登录买手号', type: 'primary', key: 1 },
          { title: '同步订单', type: 'primary', key: 2 },
          { title: '获取物流单号', type: 'primary', key: 3, click: 'syncLogistics' },
          { title: '批量拍单', type: 'primary', key: 4 },
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
          { title: '天猫淘宝海外账号', platform: 888, centerTitle: '刷新天猫淘宝海外平台账号' },
        ],
        right: [
          { title: '批量推送订单至仓库 ', key: 8, type: 'primary' },
          { title: '批量标记颜色', key: 9, type: 'primary' },
          { title: '批量标记海外商品', key: 10, type: 'primary' },
          { title: '批量添加采购信息', key: 11, type: 'primary' },
        ],
      },
      selectMallList: [],
      chooseTime: [],
      productID: '',
      multipleSelection: [],
      buyerAccountList: [],
      accountpdd: [],
      accounttaobao: [],
      account1688: [],
      accountjx: [],
      accountlazada: [],
      accountshopee: [],
      showConsole: true, //日志
      columnConfigList: [], //自定义配置列
      columnVisible: false, //自定义配置列弹窗
      abroadVisible: false, //标记为海外商品
      isAbroadGood: 0, //标记为海外商品
      indexLoading: false,
      localRamarkVisible: false, //本地备注
      localRamark: '', //本地备注
    }
  },
  mounted() {
    this.indexLoading = true
    this.createTime = creatDate(15)
    this.getBuyerList()
    this.getColumnsConfig()
    setTimeout(() => {
      this.getOrderList()
      this.indexLoading = false
    }, 2000)
  },
  methods: {
    openBefore(){
      if(!this.multipleSelection.length){
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
          "id": item.id,
          "remark": this.localRamark,
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
      // return hasName
      return true
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
          isShow: item.is_show ? 1 : -1,
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
      console.log(res)
    },
    //获取自定义配置列
    async getColumnsConfig() {
      let { data } = await this.$api.getColumnsConfig()
      if (data.code === 200) {
        this.columnConfigList = data.data
      }
      console.log(this.columnConfigList, 'getColumnsConfig')
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
    async getBuyers() {
      let res = await this.$appConfig.getGlobalCacheInfo('buyerInfo', 'key')
      let resObj = res && JSON.parse(res)
      this.buyerAccountList = []
      resObj &&
        resObj.forEach((item) => {
          this.buyerAccountList.push(JSON.parse(item.BuyerDetail))
        })
      console.log('buyers', resObj, this.buyerAccountList)
    },
    //商品来源中文信息
    changeTypeName(code, arr) {
      let res = arr.find((item) => {
        return item.value === code
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
    width: 710px;
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
  span{
    display: inline-block;
    width:80px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
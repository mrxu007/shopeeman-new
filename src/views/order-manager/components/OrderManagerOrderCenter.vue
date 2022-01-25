
<template>
  <div class="order-center">
    <header>
      <!-- btn 区 -->
      <transition name="slide-fade">
        <div v-show="isShow" class="selectBox">
          <!-- left box -->
          <div class="left-box mar-right">
            <div class="base-box">
              <span class="base-title">基础操作</span>
              <div class="base-item">
                <buyer-account :operation="operation" :buyer-account-list="buyerAccountList" />
              </div>
            </div>
          </div>
          <!-- right select box -->
          <div class="right-box">
            <div class="base-box">
              <span class="base-title">列表筛选操作</span>
              <div class="base-item">
                <el-row class="row-style">
                  <storeChoose :is-all="true" :span-width="'80px'" :select-width="'180px'" :source="'orderCenter'" @changeMallList="changeMallList" />
                  <div class="tool-item">
                    <el-select v-model="selectForm.timeType" placeholder="" size="mini" filterable style="width: 140px">
                      <el-option v-for="(item, index) in timeTypeList" :key="index" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-date-picker
                      v-model="selectForm.otherTime"
                      size="mini"
                      unlink-panels
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      style="width: 300px"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      @change="changeTime($event, 'selectForm', 'otherTime')"
                    />
                  </div>
                </el-row>
                <el-row class="row-style">
                  <div class="tool-item mar-right">
                    <span>发货状态：</span>
                    <el-select v-model="orderStatus" placeholder="" size="mini" multiple collapse-tags filterable　class="inputBox">
                      <el-option label="全部" :value="''" @click.native="selectAll('orderStatus', orderStatusList)" />
                      <el-option v-for="(item, index) in orderStatusList" :key="index" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                  <div class="tool-item mar-right">
                    <span>采购状态：</span>
                    <el-select v-model="shotStatus" placeholder="" size="mini" multiple collapse-tags filterable　class="inputBox">
                      <el-option label="全部" :value="''" @click.native="selectAll('shotStatus', shotStatusList)" />
                      <el-option v-for="(item, index) in shotStatusList" :key="index" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                  <div class="tool-item mar-right">
                    <span>商品来源：</span>
                    <el-select v-model="selectForm.isOwnOrder" placeholder="" size="mini" filterable　class="inputBox">
                      <el-option label="全部" :value="''" />
                      <el-option v-for="(item, index) in goodsSourceList" :key="index" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                  <div class="tool-item mar-right">
                    <span>创建时间：</span>
                    <el-date-picker
                      v-model="createTime"
                      size="mini"
                      unlink-panels
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      style="width: 300px"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      @change="changeTime($event, 'createTime')"
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
                      <el-option label="全部" :value="0" />
                      <el-option label="未标识" :value="-1" />
                      <el-option label="已标识" :value="-2" />
                      <el-option v-for="item in selectColorList" :key="item.id" :label="item.name" :value="item.id" :style="{ color: item.color }" />
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
                      unlink-panels
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      style="width: 300px"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      @change="changeTime($event, 'selectForm', 'shotTime')"
                    />
                  </div>
                </el-row>
                <el-row class="row-style">
                  <div class="tool-item mar-right">
                    <el-select v-model="inputType" placeholder="" size="mini" filterable style="width: 80px" @change="inputContent = ''">
                      <el-option v-for="(item, index) in inputTypeList" :key="index" :label="item.label" :value="item.value" />
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
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </div>
                  <div class="tool-item mar-right">
                    <span>物流方式：</span>
                    <el-select v-model="logisticsIds" placeholder="" size="mini" multiple collapse-tags filterable　class="inputBox">
                      <el-option label="全部物流" :value="''" @click.native="selectAll('logisticsIds', shipTypeList)" />
                      <el-option v-for="(item, index) in shipTypeList" :key="index" :label="item.ShipName" :value="item.ShipId" />
                    </el-select>
                  </div>
                  <div class="tool-item mar-right">
                    <span>付款方式：</span>
                    <el-select v-model="selectForm.paymentMenthod" placeholder="" size="mini" filterable　class="inputBox">
                      <!-- <el-option label="全部付款方式" :value="''" /> -->
                      <el-option v-for="(item, index) in payMethodList" :key="index" :label="item.label" :value="item.value" />
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
                  <el-button type="primary" size="mini" class="btnMini" @click="getOrderList(1)">搜索</el-button>
                  <el-button type="primary" size="mini" class="btnMedium" @click="syncOriginGoodsNum">一键同步上家库存</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="batchShipInfo">批量添加采购物流单号</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="getLazadaPayType">批量获取Lazada付款方式</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="uploadStoreShipAmountVisible = true">上报仓库发货金额</el-button>
                  <el-button type="primary" size="mini" class="btnMedium" @click="openBefore">批量添加本地备注</el-button>
                </el-row>
                <el-row class="row-style">
                  <el-button type="primary" size="mini" class="btnMini" @click="lookForbidVisible = true">查看禁运品</el-button>
                  <el-button type="primary" size="mini" class="btnMedium" @click="outStoreBefore('自有仓库商品出库', '1')">自有仓库商品出库</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="outStoreBefore('产品中心商品出库', '2')">产品中心商品出库</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="outStoreBefore('海外仓备货商品出库', '3')">海外仓备货商品出库</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="outStoreBefore('国内仓备货商品出库', '4')">国内仓备货商品出库</el-button>
                  <el-button type="primary" size="mini" class="btnMedium mar-right" @click="batchReplyOrderBuyer(multipleSelection)">批量评价订单买家</el-button>
                  <el-checkbox v-model="showConsole" class="mar-right">隐藏日志</el-checkbox>
                </el-row>
                <el-row class="row-style">
                  <el-button size="mini" class="btnMini" @click="applyAsyncExportOrder">导出数据</el-button>
                  <el-button size="mini" class="btnMedium" @click="orderReportVisible = true">导出数据报表</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="batchPrintOrderSurface">批量打印面单</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="purchaseGlobalOrder">批量天猫淘宝海外平台拍单</el-button>
                  <el-button type="primary" size="mini" class="btnLongMax" @click="getCrossBorderOrderInfo">批量获取天猫淘宝海外平台订单信息</el-button>
                  <el-button type="primary" size="mini" class="btnLong" @click="openPddDisount">拼多多月卡优惠券查询</el-button>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="showBtn">
        <p v-if="isShow" @click="isShow = false">收起<i class="el-icon-caret-top" /></p>
        <p v-else @click="isShow = true">展开<i class="el-icon-caret-bottom" /></p>
      </div>
    </header>
    <div class="content" :style="{ height: isShow ? '520px' : '840px' }">
      <p>
        温馨提示：1、最终毛利 = 订单收入-采购金额-仓库发货金额（生成仓库发货金额才会去计算，会有汇率差）；含邮费毛利 =
        订单收入-采购价；2、若登录了Lazada买手号但点击采购订单号依旧提示登录，请使用编辑采购信息编辑重新保存下拍单信息
      </p>
      <u-table
        ref="multipleTable"
        v-loading="tableLoading"
        use-virtual
        :border="false"
        :data="tableData"
        tooltip-effect="dark"
        :height="isShow ? 420 : 730"
        :row-height="60"
        :cell-style="{ padding: '0px' }"
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" width="50" fixed="left" />
        <u-table-column align="center" type="index" label="序号" width="50" fixed="left">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('订单编号')" prop="order_sn" label="订单编号" width="170px" fixed="left">
          <template slot-scope="scope">
            <i class="el-icon-document-copy copyStyle" @click="copyItem(scope.row.order_sn)" />
            <span class="tableActive" @click="viewDetails('orderDetail', scope.row.order_id, scope.row.mall_info.platform_mall_id)">{{ scope.row.order_sn }}</span>
          </template>
        </u-table-column>
        <u-table-column align="center" prop="" label="操作" width="140" v-if="showTableColumn('操作')" fixed="left">
          <template slot-scope="scope">
            <el-dropdown style="width: 100px; margin-left: 10px" trigger="click" size="mini">
              <el-button style="width: 100px" size="mini" plain type="primary"> 操作<i class="el-icon-arrow-down el-icon--right" /> </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item> <div class="dropdownItem" @click="singleBuyInfo(scope.row)">采购信息编辑</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="addPurchaseLink(scope.row, scope.$index)">添加采购链接</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="addMoreTrackingNumber(scope.row, scope.$index)">添加多物流单号</div></el-dropdown-item>
                <el-dropdown-item> <div class="" @click="setColorSingle(scope.row, scope.$index)">标记颜色标识</div></el-dropdown-item>
                <el-dropdown-item> <div class="" @click="setAbroadSingle(scope.row, scope.$index)">标记海外商品</div></el-dropdown-item>
                <el-dropdown-item> <div class="" @click="pushOrderToStoreSingle(scope.row, scope.$index)">推送订单至仓库</div></el-dropdown-item>
                <el-dropdown-item>
                  <div
                    class="dropdownItemdropdownItem"
                    @click="
                      clickRow = scope.row
                      billsDetailVisible = true
                    "
                  >
                    账单明细
                  </div></el-dropdown-item
                >
                <el-dropdown-item> <div class="dropdownItem" @click="SyncOrder(scope.row)">同步此店铺订单</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="SyncOrderSingle(scope.row)">同步此订单</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="syncLogisticsSingle(scope.row)">同步此订单物流</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="singlePurchase(scope.row)">重新采购</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="getSHtrackPath(scope.row)">虾皮物流轨迹</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="getorderPath(scope.row)">订单轨迹</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="handleOutOrder(scope.row)">手动发货</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="batchReplyOrderBuyer([scope.row])">回复订单评论</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="viewDetails('itemDetail', scope.row.goods_info.goods_id, scope.row.mall_info.platform_mall_id)">商品编辑</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="goodsDelist(scope.row)">商品下架</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="goodsDelete(scope.row)">商品删除</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="goodsTop(scope.row)">商品置顶</div></el-dropdown-item>
                <!-- <el-dropdown-item> <div class="dropdownItem" @click="goodsTop(scope.row)">面单打印</div></el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </u-table-column>
        <u-table-column width="80px" label="站点" prop="country" align="center" v-if="showTableColumn('站点')">
          <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.country | chineseSite }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('店铺分组')" width="80px" label="店铺分组" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.group_name }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('店铺名称')" width="120px" label="店铺名称" prop="platform_mall_name" align="center" show-overflow-tooltip>
          <template v-if="scope.row.mall_info" slot-scope="scope">
            <span class="copyStyle" @dblclick="copyItem(scope.row.mall_info.mall_alias_name ? scope.row.mall_info.mall_alias_name : scope.row.mall_info.platform_mall_name)"
              >{{ scope.row.mall_info.mall_alias_name || scope.row.mall_info.platform_mall_name }}
            </span>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购绑定仓库')" align="center" label="采购绑定仓库" width="120">
          <template slot-scope="scope">{{ scope.row.shot_order_info.warehouse_name }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('颜色标识')" align="center" prop="color_id" label="颜色标识" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <p :style="{ background: changeColorLabel(scope.row.color_id), height: '20px' }" />
            <span>{{ changeColorLabel(scope.row.color_id, 'name') }}</span>
          </template>
        </u-table-column>
        <!-- <u-table-column align="center" prop="color_id" label="标识名称" width="120" v-if="showTableColumn('标识名称')">
          <template slot-scope="scope">
            <span>{{ changeColorLabel(scope.row.color_id, 'name') }}</span>
          </template>
        </u-table-column> -->
        <u-table-column v-if="showTableColumn('订单创建时间')" sortable align="center" prop="created_time" label="订单创建时间" width="140" />
        <u-table-column v-if="showTableColumn('发货状态')" sortable align="center" prop="order_status" label="发货状态" width="100">
          <template slot-scope="scope">
            <p :style="{ color: changeOrderStatus(scope.row.order_status, 'color') }">{{ changeOrderStatus(scope.row.order_status) }}</p>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('发货时间')" align="center" prop="shopee_delivery_time" label="发货时间" width="140">
          <template slot-scope="scope">{{ scope.row.shopee_delivery_time }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购类型')" sortable align="center" prop="goods_info.ori_platform_id" label="采购类型" width="120">
          <template slot-scope="scope">{{ changeTypeName(scope.row.goods_info.ori_platform_id, goodsSourceList) }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('查看采购地址')" align="center" prop="123456" label="查看采购地址" width="130">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openUrl(scope.row.goods_info.ori_url)">查看采购地址</el-button>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('是否可二次销售')" align="center" label="是否可二次销售" width="140">
          <template slot-scope="scope">
            <el-button v-if="scope.row.shot_order_info.buy_account_info && scope.row.shot_order_info.buy_account_info.second_sale_num" size="mini" type="primary" @click="cancelSecondSale(scope.row)"
              >取消二次销售</el-button
            >
            <el-button v-if="scope.row.isSecond" size="mini" type="primary" @click="chooseSecondSale(scope.row)">{{ scope.row.secondSaleTitle }}</el-button>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('商品ID')" align="center" label="商品ID" width="140">
          <template slot-scope="scope">
            <span class="tableActive" @click="openUrl(scope.row, 'product')">{{ scope.row.goods_info.goods_id }}</span>
            <i class="el-icon-document-copy" style="margin-left: 8px; cursor: pointer" @click="copyItem(scope.row.goods_info.goods_id)" />
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('商品创建时间')" sortable prop="goods_info.created_at" align="center" label="商品创建时间" width="140">
          <template slot-scope="scope">{{ scope.row.goods_info.created_at }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('商品图片')" align="center" label="商品图片" width="80">
          <template slot-scope="scope">
            <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 32px; height: 32px; display: inline-block">
              <div slot="content">
                <el-image :src="[scope.row.goods_info.goods_img] | imageRender" style="width: 400px; height: 400px" />
              </div>
              <el-image :src="[scope.row.goods_info.goods_img, true] | imageRender" style="width: 32px; height: 32px" />
            </el-tooltip>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('商品单价')" sortable prop="goods_info.discounted_price" align="center" label="商品单价" width="100">
          <template slot-scope="scope">{{ scope.row.goods_info.discounted_price }}{{ scope.row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('商品单价(RMB)')" sortable prop="goods_info.discounted_price" align="center" label="商品单价(RMB)" width="140">
          <template slot-scope="scope">{{ changeMoney(scope.row.goods_info.discounted_price, scope.row.country) }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('商品数量')" align="center" label="商品数量" width="120">
          <template slot-scope="scope">{{ scope.row.goods_info.goods_count }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('商品标题')" align="center" label="商品标题" width="120" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.goods_info.goods_name }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('搜同款')" align="center" label="搜同款" width="120">
          <template slot-scope="scope">
            <el-dropdown
              @command="
                (val) => {
                  soSameItem(val, scope.row)
                }
              "
            >
              <el-button type="primary" size="mini">图搜同款</el-button>
              <el-dropdown-menu slot="dropdown">
                <p style="text-align: center; margin-bottom: 5px">选择平台</p>
                <el-dropdown-item command="淘宝">淘宝</el-dropdown-item>
                <el-dropdown-item command="1688">1688</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </u-table-column>
        <!-- <u-table-column v-if="showTableColumn('商品类目')" align="center" label="商品类目" width="120">
          <template slot-scope="scope"></template>
          <template slot-scope="scope">
            <span>{{ scope.row.categoryName }} </span>
          </template>
        </u-table-column> -->
        <u-table-column v-if="showTableColumn('商品类目')" align="center" label="商品类目" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.goods_info ? getCategoryName(scope.row.goods_info.goods_category_id, scope.row.country) : '未匹配到类目' }} </span>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('规格编号')" align="center" label="规格编号" width="120">
          <template slot-scope="scope">{{ scope.row.goods_info.variation_id }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('商品规格')" align="center" label="商品规格" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="display: flex; flex-direction: column">
              <span>{{ scope.row.goods_info.variation_name }}</span>
              <el-link v-if="scope.row.goods_info && Number(scope.row.goods_info.ori_platform_id) === 1" size="mini" type="danger" @click="setSKURelation(scope.row)">
                {{ scope.row.empty_info ? '重新映射SKU' : '加入收藏' }}</el-link
              >
            </div>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('商品货号')" align="center" label="商品货号" width="120" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.goods_info.variation_sku.replace('=|=', '') }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('买家付款金额')" align="center" prop="total_amount" label="买家付款金额" width="120">
          <template slot-scope="scope">{{ scope.row.total_amount }}{{ scope.row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('订单收入')" align="center" prop="escrow_amount" label="订单收入" width="120">
          <template slot-scope="scope">{{ scope.row.escrow_amount }}{{ scope.row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('订单收入(RMB)')" align="center" prop="escrow_amount" label="订单收入(RMB)" width="120">
          <template slot-scope="scope">{{ changeMoney(scope.row.escrow_amount, scope.row.country) }}元</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('实际总邮费')" align="center" prop="actual_shipping_cost" label="实际总邮费" width="80">
          <template slot-scope="scope">{{ scope.row.actual_shipping_cost }}{{ scope.row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('卖家补贴邮费')" align="center" prop="sell_shipping_cost" label="卖家补贴邮费" width="120">
          <template slot-scope="scope">{{ scope.row.sell_shipping_cost }}{{ scope.row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购价')" sortable align="center" prop="shot_order_info.shot_amount" label="采购价" width="120">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_amount }}{{ scope.row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购价(RMB)')" align="center" prop="shot_amount_rmb" label="采购价(RMB)" width="100">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_amount_rmb }}元</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('仓库发货金额')" sortable align="center" prop="warehouse_ship_amount" label="仓库发货金额" width="120">
          <template slot-scope="scope">{{ changeMoney(scope.row.warehouse_ship_amount, scope.row.country, 'toA') }}{{ scope.row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('仓库发货金额(RMB)')" align="center" prop="warehouse_ship_amount" label="仓库发货金额(RMB)" width="140">
          <template slot-scope="scope">{{ scope.row.warehouse_ship_amount }}元</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('含邮费毛利')" align="center" prop="gross_profit" label="含邮费毛利" width="120">
          <template slot-scope="scope">{{ scope.row.gross_profit }}{{ scope.row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('含邮费毛利(RMB)')" align="center" prop="gross_profit" label="含邮费毛利(RMB)" width="120">
          <template slot-scope="scope">{{ changeMoney(scope.row.gross_profit, scope.row.country) }}元</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('最终毛利')" sortable align="center" prop="real_gross_profit" label="最终毛利" width="100">
          <template slot-scope="scope">{{ scope.row.real_gross_profit }}{{ scope.row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('最终毛利(RMB)')" align="center" prop="real_gross_profit" label="最终毛利(RMB)" width="120">
          <template slot-scope="scope">{{ changeMoney(scope.row.real_gross_profit, scope.row.country) }}元</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('付款账号')" align="center" prop="pay_account_info" label="付款账号" width="120">
          <template slot-scope="scope">{{ scope.row.shot_order_info.pay_account_info ? scope.row.shot_order_info.pay_account_info.name : '' }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购账号')" align="center" prop="buy_account_info" label="采购账号" width="120">
          <template slot-scope="scope">{{ scope.row.shot_order_info.buy_account_info ? scope.row.shot_order_info.buy_account_info.name : '' }}</template>
        </u-table-column>
        <!-- <u-table-column align="center" prop="" label="账单明细" width="80" v-if="showTableColumn('账单明细')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">账单明细</el-button>
          </template>
        </u-table-column> -->
        <u-table-column v-if="showTableColumn('拍单')" align="center" prop="" label="拍单" width="80">
          <template v-if="scope.row.shot_order_info.shot_status == 1" slot-scope="scope">
            <el-button type="primary" size="mini" @click="singlePurchase(scope.row)">采购</el-button>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购状态')" align="center" label="采购状态" width="120">
          <template slot-scope="scope">
            <p :style="{ color: changeShotStatus(scope.row.shot_order_info.shot_status, 'color') }">{{ changeShotStatus(scope.row.shot_order_info.shot_status) }}</p>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购时间')" sortable prop="shot_order_info.shotted_at" align="center" label="采购时间" width="140">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shotted_at }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购订单号')" label="采购订单号" width="150">
          <template slot-scope="scope">
            <i v-if="scope.row.shot_order_info.shot_order_sn" class="el-icon-document-copy copyStyle tableActive" @click="copyItem(scope.row.shot_order_info.shot_order_sn)" />
            <span class="tableActive" @click="clickBuyOrder(scope.row)">{{ scope.row.shot_order_info.shot_order_sn }}</span>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购付款方式')" align="center" label="采购付款方式" width="120">
          <template slot-scope="scope">{{ buyPayMethod[scope.row.shot_order_info.shot_payment_method] }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('平台付款方式')" align="center" prop="payment_method" label="平台付款方式" width="120">
          <template slot-scope="scope">{{ changePlatformPayMethod(scope.row.country, scope.row.payment_method) }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购物流公司')" sortable prop="shot_order_info.shot_logistics_company" align="center" label="采购物流公司" width="120">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_logistics_company }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购物流单号')" align="center" label="采购物流单号" width="120">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_tracking_number }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('采购发货时间')" align="center" label="采购发货时间" width="140">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_shipping_time }}</template>
        </u-table-column>
        <u-table-column align="center" prop="merchant_no" label="商户订单号" width="140" v-if="showTableColumn('商户订单号')" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.shot_order_info.merchant_no }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('运输方式')" align="center" prop="transport_type" label="运输方式" width="80">
          <template slot-scope="scope">{{ scope.row.transport_type === 1 ? '空运' : scope.row.transport_type === 2 ? '陆运' : '' }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('货物类型')" align="center" prop="package_type" label="货物类型" width="80">
          <template slot-scope="scope">{{ changePackageType(scope.row.package_type) }}</template>
        </u-table-column>
        <u-table-column align="center" prop="logistics_name" label="虾皮物流" width="100" v-if="showTableColumn('虾皮物流')" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.logistics_name }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('虾皮物流单号')" align="center" prop="tracking_no" label="虾皮物流单号" width="150">
          <template slot-scope="scope">{{ scope.row.tracking_no }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('虾皮物流轨迹')" align="center" prop="123456" label="虾皮物流轨迹" width="130">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="getSHtrackPath(scope.row)">虾皮物流轨迹</el-button>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('截止发货时间')" sortable align="center" prop="ship_by_date" label="截止发货时间" width="140">
          <template slot-scope="scope">{{ scope.row.ship_by_date }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('仓库发货状态')" sortable align="center" prop="delivery_status" label="仓库发货状态" width="120">
          <template slot-scope="scope">{{ changeDeliveryStatus(scope.row.delivery_status) }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('入库时间')" sortable align="center" prop="arrival_time" label="入库时间" width="140">
          <template slot-scope="scope">{{ scope.row.arrival_time }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('出库时间')" sortable align="center" prop="delivery_time" label="出库时间" width="140">
          <template slot-scope="scope">{{ scope.row.delivery_time }}</template>
        </u-table-column>
        <u-table-column sortable align="center" prop="remark" label="本地备注" width="150" show-overflow-tooltip v-if="showTableColumn('本地备注')">
          <template slot-scope="scope">
            <div v-show="!(scope.row.id === activeRemarkID ? true : false) || scope.row.remark == ''" @click.stop="editRemark(scope.$index, scope.row.id)" style="cursor: pointer; min-width: 20px">
              <p @dblclick="copyItem(scope.row.remark)" style="color: #000">{{ scope.row.remark }}</p>
              <!-- <el-input v-model="scope.row.remark" disabled size="mini"></el-input> -->
            </div>
            <el-input v-if="scope.row.id === activeRemarkID ? true : false" v-model="orderRemark" size="mini" @blur="changeRemark(scope.row.id, scope.$index)"
          /></template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('shopee备注')" align="center" prop="note" label="shopee备注" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-show="!(scope.row.id === activeRemarkIDNode ? true : false)" style="cursor: pointer" @click="editRemarkNode(scope.$index, scope.row.id)">
              <el-input v-model="scope.row.note" disabled size="mini" />
            </div>
            <el-input v-if="scope.row.id === activeRemarkIDNode ? true : false" v-model="orderRemarkNode" size="mini" @blur="changeRemarkNode(scope.row.id, scope.$index)" />
            <!-- {{ scope.row.note }} -->
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('shopee备注更新时间')" align="center" prop="note_update_time" label="shopee备注更新时间" width="140">
          <template slot-scope="scope">{{ scope.row.note_update_time }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('买家姓名')" align="center" prop="name" label="买家姓名" width="140">
          <template slot-scope="scope">
            <span class="copyStyle" @dblclick="copyItem(scope.row.name)">{{ scope.row.name }}</span>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('买家地址')" align="center" label="买家地址" width="140" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="copyStyle" @dblclick="copyItem(scope.row.receiver_info.address)"> {{ scope.row.receiver_info.address }} </span>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('手机号')" align="center" prop="phone" label="手机号" width="120">
          <template slot-scope="scope">
            <span class="copyStyle" @dblclick="copyItem(scope.row.phone)"> {{ scope.row.phone }}</span>
          </template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('订单支付时间')" sortable align="center" prop="pay_time " label="订单支付时间" width="140">
          <template slot-scope="scope">{{ scope.row.pay_time }}</template>
        </u-table-column>
        <u-table-column sortable align="center" prop="update_time" label="订单更新时间" width="140" v-if="showTableColumn('订单更新时间')">
          <template slot-scope="scope">{{ scope.row.update_time }}</template>
        </u-table-column>
        <u-table-column v-if="showTableColumn('是否为海外仓商品')" align="center" label="是否为海外仓商品" width="120">
          <template slot-scope="scope">{{ scope.row.goods_info.is_overseas_goods == 1 ? '是' : '否' }}</template>
        </u-table-column>
      </u-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <Logs ref="Logs" v-model="showConsole" clear />
    <el-dialog v-if="columnVisible" title="配置订单列表显示列" :visible.sync="columnVisible" width="800px" top="5vh" :close-on-click-modal="false" @close="closeDialog">
      <div class="column-style">
        <div v-for="(item, index) in columnConfigList" :key="index" class="column-item">
          <span>{{ item.column_header }}</span>
          <el-switch v-model="item.is_show" style="display: block" active-color="#13ce66" inactive-color="#a9a9a9" :active-value="1" :inactive-value="-1" />
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="checkAllColumn(1)">显示所有列</el-button>
        <el-button type="primary" size="mini" @click="checkAllColumn(-1)">隐藏所有列</el-button>
        <el-button type="primary" size="mini" @click="uploadColumn">应用</el-button>
      </span>
    </el-dialog>
    <el-dialog title="标记为海外商品" :visible.sync="abroadVisible" width="400px" :close-on-click-modal="false" @close="closeDialog('noRefresh')">
      <div class="abroad-mar">
        <el-radio v-model="isAbroadGood" :label="1">海外商品</el-radio>
        <el-radio v-model="isAbroadGood" :label="-1">非海外商品</el-radio>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="setAbroadGood(multipleSelection)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量添加本地备注" :visible.sync="localRamarkVisible" width="400px" :close-on-click-modal="false" @open="openBefore">
      <div class="remark-style">
        <span>本地备注</span>
        <el-input v-model="localRamark" type="textarea" :rows="4" placeholder="请输入内容" />
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="batchSetRemark">批量添加</el-button>
      </span>
    </el-dialog>
    <el-dialog v-if="colorVisible" title="选择颜色标识" :visible.sync="colorVisible" width="600px" :close-on-click-modal="false">
      <div class="color-style">
        <el-table ref="colorTable" :data="colorList" tooltip-effect="dark" style="width: 100%" height="500" :loading="colorLoading">
          <el-table-column label="标识选择" width="120">
            <template slot-scope="scope">
              <el-radio v-model="colorRadio" :label="scope.$index" @change.native="getCurrentRow(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="颜色">
            <template slot-scope="scope">
              <div class="colorBox" :style="{ background: scope.row.color }" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="标识名称" />
        </el-table>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="setColor(multipleSelection)">设置颜色</el-button>
      </span>
    </el-dialog>
    <el-dialog v-if="purchaseInfoVisible" title="添加采购信息" :visible.sync="purchaseInfoVisible" width="500px" top="5vh" :close-on-click-modal="false">
      <purchase-info :choose-data="multipleSelection" :buyer-account-list="buyerAccountList" :deal-type="dealType" @close="closeDialog" />
    </el-dialog>
    <el-dialog v-if="pushOrderToStoreVisible" title="同步数据至仓库" :visible.sync="pushOrderToStoreVisible" width="1200px" top="5vh" :close-on-click-modal="false" @close="closeDialog('noRefresh')">
      <push-order :choose-data="multipleSelection" />
    </el-dialog>
    <el-dialog v-if="shipInfoVisible" title="批量添加采购物流单号" :visible.sync="shipInfoVisible" width="400px" :close-on-click-modal="false" @close="closeDialog">
      <div v-loading="shipLoading">
        <div class="item-box">
          <span>绑定仓库：</span>
          <el-select v-model="shipBindStore" size="mini" class="btnLongMax">
            <el-option v-for="(item, index) in shipStoreList" :key="index" :label="item.warehouse_name" :value="item.id" />
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
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button type="primary" size="mini" @click="batchSaveShipInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-if="uploadStoreShipAmountVisible" title="上报仓库发货金额" :visible.sync="uploadStoreShipAmountVisible" width="1200px" :close-on-click-modal="false">
      <upload-store-ship-amount @close="closeDialog" />
    </el-dialog>
    <!-- 四类商品出库 -->
    <el-dialog v-if="goodsOutStoreVisible" :visible.sync="goodsOutStoreVisible" width="1400px" top="5vh" :close-on-click-modal="false">
      <div slot="title">{{ outStoreTitle }}</div>
      <goods-out-store :choose-data="multipleSelection" :out-store-type="outStoreType" @close="closeDialog" />
    </el-dialog>
    <el-dialog v-if="addBuyLinkVisible" title="添加采购链接" :visible.sync="addBuyLinkVisible" width="1200px" append-to-body :close-on-click-modal="false" @close="closeDialog">
      <buy-link :link-row="clickRow" @close="closeDialog" />
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
    <el-dialog v-if="addMoreTraNumberVisible" title="添加多物流单号" :visible.sync="addMoreTraNumberVisible" width="700px" :close-on-click-modal="false" @close="closeDialog">
      <div class="tra-style">
        <div class="item-box">
          <span style="width: 60px">绑定仓库</span>
          <el-select v-model="bindStore" size="mini" class="inputWidth">
            <el-option v-for="(item, index) in warehouseData" :key="index" :label="item.warehouse_name" :value="item.id" />
          </el-select>
        </div>
        <div v-for="(item, index) in trackingNumberList" :key="index" class="tra-content">
          <div class="item-box">
            <span style="width: 80px">物流单号{{ index + 1 }}</span>
            <el-input v-model="item.original_tracking_number" size="mini" class="inputWidth" />
          </div>
          <div class="item-box">
            <span style="width: 80px">物流公司{{ index + 1 }}</span>
            <el-input v-model="item.original_logistics_company" size="mini" class="inputWidth mar-right" />
          </div>
          <el-button type="primary" size="mini" class="item-box mar-right" @click="deleteTraNumber(index)">删除</el-button>
          <el-button v-if="index === trackingNumberList.length - 1" type="primary" size="mini" class="item-box" @click="addTraNumber">添加</el-button>
        </div>
        <p>关于绑定仓库选项:</p>
        <p>1、仅显示当前订单店铺绑定的仓库</p>
        <p>2、采购类型如果为国内平台时，显示国内中转仓，如果为国外平台则显示海外仓</p>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="saveAddMoreTra">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog v-if="billsDetailVisible" title="账单明细" :visible.sync="billsDetailVisible" top="5vh" width="1200px" :close-on-click-modal="false" @close="closeDialog('noRefresh')">
      <bill-detail :choose-data="clickRow" />
    </el-dialog>
    <el-dialog v-if="trackPathVisible" title="物流轨迹" :visible.sync="trackPathVisible" width="400px" :close-on-click-modal="false" @close="closeDialog('noRefresh')">
      <el-steps direction="vertical" :active="1">
        <el-step title="暂无物流信息" :description="$dayjs(new Date()).format('YYYY-MM-DD HH:mm')" />
      </el-steps>
    </el-dialog>
    <el-dialog v-if="spTrackPathVisible" title="虾皮物流轨迹" :visible.sync="spTrackPathVisible" width="500px" :close-on-click-modal="false" @close="closeDialog('noRefresh')">
      <div class="track-step">
        <div class="step-header">
          <div class="step-item">
            <span>物流名称：</span>
            <p>{{ clickRow.logistics_name }}</p>
          </div>
          <div class="step-item">
            <span>物流编号:</span>
            <p>{{ clickRow.tracking_no }}</p>
          </div>
        </div>
        <div v-loading="shipInfoLoading" class="step-content">
          <el-steps direction="vertical" :active="1" space="80px">
            <el-step v-for="(item, index) in spTrackPath" :key="index" icon="el-icon-s-help" :title="item.description" :description="$dayjs(item.ctime * 1000).format('YYYY-MM-DD HH:mm')" />
          </el-steps>
        </div>
      </div>
    </el-dialog>
    <el-dialog v-if="orderPathVisible" title="订单轨迹" :visible.sync="orderPathVisible" width="500px" :close-on-click-modal="false" @close="closeDialog('noRefresh')">
      <div class="track-step">
        <div v-loading="orderPathInfoLoading" class="step-content">
          <el-steps direction="vertical" :active="1" space="80px">
            <el-step v-for="(item, index) in orderTrackPath" :key="index" icon="el-icon-s-help" :title="item[0]" :description="item[1]" />
          </el-steps>
        </div>
      </div>
    </el-dialog>
    <el-dialog v-if="orderReportVisible" title="订单报表" :visible.sync="orderReportVisible" top="5vh" width="800px" :close-on-click-modal="false" @close="closeDialog('noRefresh')">
      <export-report />
    </el-dialog>
    <el-dialog v-if="replayOrderBuyerVisible" title="回复订单买家" :visible.sync="replayOrderBuyerVisible" top="5vh" width="600px" :close-on-click-modal="false" @close="closeDialog('noRefresh')">
      <reply-buyer :choose-data="replyBuyerData" @close="closeDialog('noRefresh')" />
    </el-dialog>
    <el-dialog v-if="handOutOrderVisible" title="填写发货单号" :visible.sync="handOutOrderVisible" top="5vh" width="500px" :close-on-click-modal="false" @close="closeDialog">
      <div class="handle-out">
        <div class="item">
          <span>当前订单状态：</span>
          <p>{{ changeTypeName(clickRow.order_status, orderStatusList) }}</p>
        </div>
        <div class="item">
          <span>订单号：</span>
          <p>{{ clickRow.order_sn }}</p>
        </div>
        <div class="item">
          <span>站点：</span>
          <p>{{ clickRow.country | chineseSite }}</p>
        </div>
        <div class="item">
          <span>发货物流名称：</span>
          <el-input v-model="shippingProof" size="mini" class="inputWidth" />
        </div>
        <div class="item">
          <span>发货物流单号：</span>
          <el-input v-model="shippingTraceNo" size="mini" class="inputWidth" />
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="saveHandleOut">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog v-if="secondSaleVisible" title="二次销售" :visible.sync="secondSaleVisible" top="5vh" width="1500px" :close-on-click-modal="false" @close="closeDialog">
      <second-sale :choose-data="clickRow" :second-order-data="secondOrderList" @close="closeDialog" />
    </el-dialog>
    <el-dialog v-if="collectionVisible" title="图搜同款" :visible.sync="collectionVisible" top="5vh" width="1200px" :close-on-click-modal="false" @close="closeDialog('noRefresh')">
      <image-collection :choose-data="clickRow" :collect-type="collectType" @close="closeDialog('noRefresh')" />
    </el-dialog>
  </div>
</template>

<script>
import {
  orderStatusList,
  shotStatusList,
  timeTypeList,
  inputTypeList,
  goodsSourceList,
  siteShip,
  columnData,
  forbidData,
  forbidTHData,
  syncStatus,
  changePackageType,
  changeDeliveryStatus,
  changeBuyerType,
  buyPayMethod,
  changePlatformPayMethod,
  platformPayMethod,
  changeOrderStatus,
  changeShotStatus,
} from '../components/orderCenter/orderCenter'
import { setGoodsDelist, setGoodsDelete } from './orderCenter/handleGoods'
import { creatDate, getDaysBetween, dealwithOriginGoodsNum } from '../../../util/util'
import storeChoose from '../../../components/store-choose'
import BuyerAccount from './orderCenter/buyer-account.vue'
import LogisticeSyncService from '../../../services/logistics-sync-service/logistics-sync-service-new-copy'
import PurchaseInfo from './orderCenter/purchaseInfo.vue'
import PushOrder from './orderCenter/pushOrderToStore.vue'
import GoodsOutStore from './orderCenter/goodsOutStore.vue'
import BuyLink from './orderCenter/addBuyLink.vue'
import BillDetail from './orderCenter/billDetail.vue'
import ExportReport from './orderCenter/exportReport.vue'
import ReplyBuyer from './orderCenter/replyBuyer.vue'
import SecondSale from './orderCenter/secondSale.vue'
import ImageCollection from './orderCenter/imageCollection.vue'
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
    ExportReport,
    ReplyBuyer,
    SecondSale,
    ImageCollection,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      selectForm: {
        timeType: 'payTime', // 其它时间类型
        otherTime: '', // 其它时间
        orderStatus: '', // 订单状态
        shotStatus: '', // 采购状态
        isOwnOrder: '', // 商品来源
        isOverseasGoods: '', // 海外商品
        paymentMenthod: '', // 付款方式
        minGrossProfit: '', // 最小毛利
        maxGrossProfit: '', // 最大毛利
        goodsId: '', // 商品id
        colorLabelId: 0, // 颜色标识
        createTime: '', // 创建时间
        shotTime: '', // 采购时间
        // paymentMenthod: '', //付款方式
        isOverseasGoods: '', // 海外商品
        isOverseasGoods: '', // 海外商品
        sysMallId: '', // 系统店铺id  多个用英文逗号隔开
        logisticsIds: '', // 物流方式
      },
      createTime: [], // 创建时间 --搜索
      logisticsIds: [''], // 物流方式--搜索
      orderStatus: [20], // /发货状态--搜索
      shotStatus: [''], // 采购状态--搜索
      inputType: 'orderSn', // --搜索
      inputContent: '', // --搜索
      orderStatusList: orderStatusList, // 订单状态
      shotStatusList: shotStatusList, // 采购状态
      timeTypeList: timeTypeList, // 其它时间类型
      inputTypeList: inputTypeList, // --搜索
      goodsSourceList: goodsSourceList, // 商品来源
      columnConfigList: columnData, // 自定义配置列
      forbidData: forbidData, // 禁运品
      forbidTHData: forbidTHData, // 禁运品
      buyPayMethod: buyPayMethod, // 采购付款方式
      payMethodList: [{ label: '全部', value: '' }], // 平台付款方式
      shipTypeList: [], // 物流方式
      tableLoading: false,
      tableData: [], // 分页
      pageSize: 20, // 分页
      currentPage: 1, // 分页
      total: 0, // 分页
      showConsole: true, // 日志
      isShow: true, // btn收缩
      // 买手号配置
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
          { title: '批量添加采购信息', key: 11, type: 'primary', click: 'batchAddBuyInfo' },
        ],
      },
      selectMallList: [], // 店铺选择
      multipleSelection: [],
      buyerAccountList: [], // 买手号
      buyerAccountListGlobal: [], // 买手号天猫淘宝海外
      accountpdd: null, // 买手号
      accounttaobao: null, // 买手号
      account1688: null, // 买手号
      accountjx: null, // 买手号
      accountlazada: null, // 买手号
      accountshopee: null, // 买手号
      accountCrossBorder: null, // 买手号
      columnVisible: false, // 自定义配置列弹窗
      abroadVisible: false, // 标记为海外商品
      isAbroadGood: 0, // 标记为海外商品
      localRamarkVisible: false, // 本地备注
      localRamark: '', // 本地备注
      colorVisible: false, // 颜色标识
      colorList: [], // 颜色标识
      selectColorList: [],
      colorRadio: '', // 颜色标识
      colorRow: {}, // 选择的颜色行
      purchaseInfoVisible: false, // 批量添加采购信息
      pushOrderToStoreVisible: false, // 推送订单至仓库
      goodsOutStoreVisible: false, // 商品出库
      outStoreTitle: '自有商品出库',
      outStoreType: '1',
      shipInfoVisible: false, // 批量添加采购物流单号
      shipBindStore: '', // 批量添加采购物流单号
      shipStoreList: [], // 批量添加采购物流单号
      shipNo: '', // 批量添加采购物流单号
      shipCompany: '', // 批量添加采购物流单号
      uploadStoreShipAmountVisible: false, // 上报仓库发货金额
      dealType: 'batch', // 添加采购信息状态
      addBuyLinkVisible: false, // 添加采购链接
      clickRow: {}, // 当前选中行
      lookForbidVisible: false, // 查看禁运品
      addMoreTraNumberVisible: false, // 添加多物流公司
      warehouseData: [], // 添加多物流公司
      trackingNumberList: [], // 添加多物流公司
      bindStore: '', // 绑定仓库-多物流
      billsDetailVisible: false, // 账单明细
      trackPathVisible: false, // 采购物流轨迹
      spTrackPathVisible: false, // 虾皮物流轨迹
      spTrackPath: [], // 虾皮物流轨迹
      shipInfoLoading: false, // 虾皮物流轨迹
      orderPathVisible: false, // 订单轨迹
      orderPathInfoLoading: false, // 订单轨迹
      orderTrackPath: [], // 订单轨迹
      orderReportVisible: false, // 订单报表
      replayOrderBuyerVisible: false, // 回复买家
      replyBuyerData: [], // 批量回复买家
      handOutOrderVisible: false, // 手动发货
      shippingProof: '', // 手动出库物流名
      shippingTraceNo: '', // 手动出库物流单号
      secondSaleVisible: false, // 二次销售
      secondOrderList: [], // 二次销售列表
      collectionVisible: false, // 图搜同款
      collectType: '淘宝', // 图搜同款
      rateList: {}, // 汇率
      categoryInfo: {},
      localRamark: '', // 本地备注
      activeRemarkID: '', // 本地备注
      orderRemark: '', // 本地备注
      localRamarkNode: '', // shopee备注
      activeRemarkIDNode: '', // shopee备注
      orderRemarkNode: '', // shopee备注
      shipLoading: false,
      colorLoading: false,
    }
  },
  computed: {
    getCategoryName() {
      return function (id, country) {
        if (!this.categoryInfo[id]) {
          this.categoryInfo[id] = '正在获取类目...'
          this.getCategoryInfo(id, country)
          return this.categoryInfo[id] || ''
        }
        return this.categoryInfo[id] || ''
      }
    },
  },
  mounted() {
    this.tableLoading = true
    this.createTime = creatDate(15)
    this.getColorList()
    this.getColumnsConfig()
    this.getSecondSaleList()
    this.getRate()
    setTimeout(() => {
      this.getOrderList(1)
    }, 2000)
    // 保存sku映射
    this.$IpcMain.on('skuRelation', async (response) => {
      console.log('skuRelation', response)
      response['OriGoodsPlatform '] = 1
      console.log(JSON.stringify(response), 'response')
      const res = await this.$commodityService.saveSkuRelation(JSON.stringify(response))
      const resObj = res && JSON.parse(res)
      console.log('res', resObj)
      if (resObj && resObj.code === 200) {
        return this.$message.success('收藏成功')
      } else {
        return this.$message.error(`收藏失败，${resObj.msg}`)
      }
    })
    this.$IpcMain.on('FinishShotOrderMessage', async (response) => {
      console.log('FinishShotOrderMessage', response)
      this.getOrderList()
    })
    this.$IpcMain.on('updateShopeeCookie', async (response) => {
      // let obj = response && JSON.parse(response) || ''
      console.log('updateShopeeCookie', response)
    })
  },
  methods: {
    async clickBuyOrder(row) {
      console.log(row, 'row', this.buyerAccountList)
      if (!row.shot_order_info.buy_account_info) {
        return this.$message.warning('订单无买手号信息')
      }
      const buy = this.buyerAccountList.find((n) => n.name === row.shot_order_info.buy_account_info.name && n.type == row.shot_order_info.buy_account_info.type)
      let account = ''
      if (buy) {
        switch (buy.type) {
          case 1:
            account = this.changeAccountParams(buy)
            await this.$buyerAccountService.pddOrderCenter(account, row.shot_order_info.shot_order_sn)
            break
          case 2:
          case 3:
            account = this.changeAccountParams(buy)
            await this.$buyerAccountService.taobaoOrderCenter(account, row.shot_order_info.shot_order_sn)
            break
          case 8:
            account = this.changeAccountParams(buy)
            await this.$buyerAccountService.AlibabaOrderCenter(account, row.shot_order_info.shot_order_sn)
            break
          case 9:
            account = this.changeAccountParams(buy)
            await this.$buyerAccountService.lazadaOrderCenter(row.country, account, row.shot_order_info.shot_order_sn)
            break
          case 11:
            let url = ''
            if (row.shot_order_info.buy_account_info.orderType) {
              url = `/user/purchase/order/${row.shot_order_info.shot_order_sn}?type=${row.shot_order_info.buy_account_info.orderType}`
            } else {
              url = `/user/purchase/order/${row.shot_order_info.shot_order_sn}/?shopid=${row.mall_info.platform_mall_id}`
            }
            account = this.changeAccountParams(buy)
            await this.$buyerAccountService.shopeeOrderCenter(row.country, account, row.shot_order_info.url)
            break
          default:
            break
        }
      } else {
        return this.$message.warning('请登录相应买手号！')
      }
    },
    editRemarkNode(index, activeRemarkID) {
      this.activeRemarkIDNode = activeRemarkID
      this.orderRemarkNode = this.tableData[index].note
      this.orderRemarkCopyNode = this.tableData[index].note
    },
    // 修改单个备注
    async changeRemarkNode(id, index) {
      const params = {
        order_id: this.tableData[index].order_id,
        new_note: this.orderRemarkNode,
        shop_id: this.tableData[index].mall_info.platform_mall_id,
      }
      const res = await this.$shopeemanService.updateNode(this.tableData[index].country, params)
      console.log(res)
      if (res.code == 200) {
        this.$message.error(`设置备注成功`)
        this.tableData[index].note = this.orderRemarkNode
        this.activeRemarkIDNode = ''
        return
      }
      this.$message.error(`设置备注失败`)
      this.activeRemarkIDNode = ''
    },
    editRemark(index, activeRemarkID) {
      this.activeRemarkID = activeRemarkID
      // console.log(this.tableData[index].remark,"5555555")
      this.orderRemark = this.tableData[index].remark
      this.orderRemarkCopy = this.tableData[index].remark
    },
    // 修改单个备注
    async changeRemark(id, index) {
      const res = await this.$api.setLocalRemark({ id: id, remark: this.orderRemark })
      if (res.data.code == 200) {
        this.$message.success(`设置备注成功`)
        this.tableData[index].remark = this.orderRemark
        this.activeRemarkID = ''
        return
      }
      this.$message.error(`设置备注失败`)
      this.activeRemarkID = ''
    },
    changeTime(val, key, subKey) {
      const days = getDaysBetween(new Date(val[0]).getTime(), new Date(val[1]).getTime())
      if (days > 93) {
        if (subKey) {
          this[key][subKey] = creatDate(30)
        } else {
          this[key] = creatDate(30)
        }
        return this.$message.warning(`只支持查询或导出93天内的数据,请重新选择时间！`)
      }
      console.log(days, val, 'time-time')
    },
    // 打印面单信息
    async batchPrintOrderSurface() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请选择要操作的数据！')
      }
      let country = ''
      const countryId = {}
      let mainOrders = ''
      this.multipleSelection.forEach((item, index) => {
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
      const params = {
        mainOrderSns: mainOrders,
      }
      let sheetInfo = []
      try {
        const res = await this.$api.getLogisticsInformationBatch(params)
        console.log(res, 'res')
        if (res.data.code === 200) {
          sheetInfo = res.data.data
        } else {
          return this.$message.warning('面单获取失败！')
        }
        if (!sheetInfo.length) {
          return this.$message.warning('暂无面单信息')
        }
        const PdfInfoModel = []
        this.showConsole = false
        for (let i = 0; i < sheetInfo.length; i++) {
          const info = sheetInfo[i]
          if (!info.url) {
            this.$refs.Logs.writeLog(`订单${info.order_sn}获取面单信息为空`, false)
            continue
          }
          const orderInfo = this.multipleSelection.find((n) => {
            return n.main_order_sn == info.order_sn
          })
          console.log(orderInfo, 'orderInfo')
          const params = {
            PDFUrl: info.url,
            OrderNo: orderInfo.main_order_sn,
            MainOrderNo: orderInfo.main_order_sn,
            PlatformLogisticsId: orderInfo.tracking_no,
            PlatformLogisticsName: '',
            CreateTime: info.created_at,
            BuyerName: orderInfo.name,
            BuyerPhone: orderInfo.phone,
            BuyerAddress: orderInfo.receiver_info.address,
            BuyerNote: '',
            BarInfo: {
              BarCode: orderInfo.main_order_sn,
              BarCodeWidth: 200,
              BarCodeHeight: 50,
            },
            SkuList: [orderInfo.goods_info.variation_sku.replace('=|=', ''), orderInfo.goods_info.goods_count],
            IsNeedCut: !!(orderInfo.logistics_id == 30008 || orderInfo.logistics_id == 30007),
            IsUseA4Size: false,
            PdfWidth: 320,
            PdfHeight: 425,
            LocationY: -420,
            PrintStatus: '0',
            MallId: orderInfo.mall_info.platform_mall_id,
            MallName: orderInfo.mall_info.platform_mall_name,
          }
          PdfInfoModel.push(params)

          // let conParams = {
          //   HtmlFilePath: info.url.includes('.html') ? info.url : '',
          //   PDFFilePath: info.url.includes('.PDF') || info.url.includes('.pdf') ? info.url : '',
          //   LogisticsId: orderInfo.logistics_id,
          //   OrderSn: orderInfo.order_sn,
          //   MallId: orderInfo.mall_info.platform_mall_id,
          //   VirtualFilePath: '',
          // }
          // ConvertFaceInfoModel.push(conParams)
        }
        const pdfDownloadModel1 = {
          IsDownload: false,
          PdfExtendName: '.PDF',
          PdfExtendNameIsLower: false,
          IsPrintVirtualFaceSheet: false,
          Site: country,
          IsShowWindow: true,
          PdfInfoList: PdfInfoModel,
          VirtualPdfPath: {},
          ConvertFaceInfoList: [],
        }
        console.log(JSON.stringify(pdfDownloadModel1), '111')
        const pdfInfo = await window['BaseUtilBridgeService'].getOrderPdfInfo(pdfDownloadModel1)
        const pdfInfoObj = JSON.parse(pdfInfo)
        console.log('pdfInfoObj', pdfInfoObj)
        if (pdfInfoObj.code == 200) {
        } else {
          let message = ''
          for (const key in pdfInfoObj.failList) {
            message = message + ',' + pdfInfoObj.failList[key]
            message = message.substring(1)
          }
          return this.$refs.Logs.writeLog(`${message}`, false)
        }
        const ConvertFaceInfoModel = []
        for (let i = 0; i < sheetInfo.length; i++) {
          const info = sheetInfo[i]
          console.log(i, info)
          if (!info.url && country !== 'TW') {
            this.$refs.Logs.writeLog(`订单${info.order_sn}未获取到面单信息`, false)
            continue
          }
          const orderInfo = this.multipleSelection.find((n) => {
            return n.main_order_sn == info.order_sn
          })
          console.log(orderInfo, 'orderInfo')
          const htmlUrl = (pdfInfoObj.data && pdfInfoObj.data.find((n) => n && n.OrderSn == orderInfo.main_order_sn)) || null
          console.log(htmlUrl, 'htmlUrl')
          const conParams = {
            HtmlFilePath: htmlUrl ? htmlUrl.PDFFilePath : info.url && info.url.includes('.html') ? info.url : '',
            PDFFilePath: htmlUrl ? htmlUrl.PDFFilePath : (info.url && info.url.includes('.PDF')) || (info.url && info.url.includes('.pdf')) ? info.url : '',
            LogisticsId: orderInfo.logistics_id.toString(),
            OrderSn: orderInfo.main_order_sn,
            MallId: Number(orderInfo.mall_info.platform_mall_id),
            VirtualFilePath: '',
          }
          ConvertFaceInfoModel.push(conParams)
          console.log(ConvertFaceInfoModel, '-------')
        }

        console.log(JSON.stringify(ConvertFaceInfoModel), 'ConvertFaceInfoModel')
        const convertRes = await window['BaseUtilBridgeService'].htmlToPdf(ConvertFaceInfoModel, false)
        const convertResObj = convertRes && JSON.parse(convertRes)
        console.log(convertRes, convertResObj, 'convertFaceInfoModel')
        if (!convertResObj && !convertResObj.code == 200) {
          let message = ''
          for (const key in convertResObj.failList) {
            message = message + ',' + convertResObj.failList[key]
            message = message.substring(1)
          }
          return this.$refs.Logs.writeLog(`打印面单失败,${message}`, false)
        }
        const PdfInfoList = JSON.parse(JSON.stringify(PdfInfoModel))
        PdfInfoList.forEach((item) => {
          const htmlUrl = pdfInfoObj.data.find((n) => n && n.OrderSn == item.OrderNo)
          if (htmlUrl) {
            item.PDFUrl = htmlUrl.PDFFilePath
          }
        })
        const pdfDownloadModel = {
          IsDownload: false,
          PdfExtendName: '.PDF',
          PdfExtendNameIsLower: false,
          IsPrintVirtualFaceSheet: false,
          Site: country,
          IsShowWindow: true,
          PdfInfoList: PdfInfoList,
          VirtualPdfPath: {},
          ConvertFaceInfoList: convertResObj.data,
        }
        console.log(JSON.stringify(pdfDownloadModel))
        this.tableLoading = true
        const down = await window['BaseUtilBridgeService'].downloadPdf(pdfDownloadModel)
        console.log('down', down)
        this.tableLoading = false
      } catch (error) {
        console.log(error, '123456')
        this.tableLoading = false
        this.$refs.Logs.writeLog(`打印面单失败`, false)
      }
    },
    // 推送订单至仓库
    async pushOrderToStoreSingle(row, index) {
      this.multipleSelection = [row]
      this.pushOrderToStoreVisible = true
    },
    // 获取汇率
    async getRate() {
      const info = await window['ConfigBridgeService'].getUserInfo()
      this.rateList = info.ExchangeRates || {}
    },
    changeMoney(data, country, type) {
      let amount = data
      if (this.rateList[country]) {
        if (type) {
          amount = (Number(data) / Number(this.rateList[country] || 1)).toFixed(2)
        } else {
          amount = (Number(data) * Number(this.rateList[country] || 1)).toFixed(2)
        }
      }
      return amount
    },
    // sku映射
    async setSKURelation(row) {
      if (!this.accountpdd) {
        this.$message.error('请先选择拼多多买手号')
        return
      }
      const pddAccount = this.getAccountById(this.accountpdd)
      if (!pddAccount) {
        return this.$message.warning(`没有找到拼多多买手号`)
      }
      const buyer = this.changeAccountParams(pddAccount)
      const skuInfo = {
        OrderSn: row.order_sn,
        SysOrderId: row.id,
        OriGoodsUrl: row.goods_info.ori_url,
        GoodsTitle: row.goods_info.goods_name,
        GoodsId: row.goods_info.goods_id,
        GoodsSku: row.goods_info.variation_sku,
        GoodsSkuId: row.goods_info.variation_id,
        GoodsNum: row.goods_info.goods_count,
        GoodsPrice: row.total_amount,
        OriGoodsTitle: '',
        OriGoodsSku: '',
        OriGoodsSkuId: row.ori_sku_id || '',
        OriGoodsNum: '',
        OriGoodsId: row.ori_goods_id || '',
      }
      this.$buyerAccountService.getSkuRelation(skuInfo, buyer)
    },

    // 一键同步上家库存
    async syncOriginGoodsNum() {
      if (!this.multipleSelection.length) {
        return this.$message.warning(`请选择要操作的数据`)
      }
      this.showConsole = false // 打开日志
      this.$refs.Logs.consoleMsg = ''
      this.$refs.Logs.writeLog(`开始同步上家库存，请耐心等待！`, true)
      for (let i = 0; i < this.multipleSelection.length; i++) {
        const order = this.multipleSelection[i]
        await dealwithOriginGoodsNum(
          order.goods_info.ori_goods_id,
          order.goods_info.ori_platform_id,
          order.mall_info.platform_mall_id,
          order.goods_info.goods_id,
          order.country,
          order.order_sn,
          this.$refs.Logs.writeLog,
          order.goods_info.ori_platform_mall_id,
          order.goods_info.ori_country
        )
      }
    },
    // 转换颜色标识名
    changeColorLabel(colorId, type) {
      const colorInfo = this.colorList.find((item) => item.id == colorId)
      if (type === 'name') {
        return colorInfo && colorInfo.id !== 0 ? colorInfo.name : ''
      }
      return colorInfo ? colorInfo.color : ''
    },
    // 图搜同款
    async soSameItem(val, row) {
      this.clickRow = row
      this.collectType = val
      this.collectionVisible = true
    },
    // 取消二次销售
    async cancelSecondSale(row) {
      const params = {
        sysOrderId: row.id,
      }
      const res = await this.$api.cancelSecondSale(params)
      if (res.data.code === 200) {
        this.$message.success('取消成功！')
        this.getOrderList()
      } else {
        this.$message.error(`取消失败，${res.data.message}`)
      }
    },
    // 二次销售列表
    async getSecondSaleList() {
      const params = {
        goodsId: this.goodsId,
        variationId: this.skuId,
        goodsSpec: this.goodsNum,
      }
      const res = await this.$api.getsecondlist(params)
      if (res.data.code === 200) {
        this.secondOrderList = res.data.data
      }
    },
    // 判断二次销售
    async isSecondSale() {
      this.tableData.forEach((row, index) => {
        let flag = true
        let secondSaleTitle = '自选出库'
        let secondType = 'nomal'
        if (row.order_sn != row.main_order_sn) {
          flag = false
        }
        // 1、如果为取消二次销售，显示出取消按钮
        else if (row.shot_order_info.buy_account_info && row.shot_order_info.buy_account_info.second_sale_num) {
          flag = false
        }
        // 2、如果二次销售数据为空，则不显示按钮
        else if (!this.secondOrderList.length) {
          flag = false
        }
        // 3、如果平台订单的发货状态为售后，不显示二次销售按钮
        else if (Number(row.order_status >= 6)) {
          flag = false
        }
        // 4、如果订单的采购状态为上家已发货，不显示二次销售按钮
        else if (Number(row.shot_order_info.shot_status) >= 4) {
          flag = false
        } else {
          for (let i = 0; i < this.secondOrderList.length; i++) {
            const item = this.secondOrderList[i]
            if (row.goods_info.variation_id == item.variation_id && row.country == item.country && item.goods_count > 0) {
              secondSaleTitle = '规格编号匹配出库'
              secondType = 'skuId'
              flag = true
              break
            }
            if (row.goods_info.goods_id == item.goods_id && row.country == item.country && item.goods_count > 0) {
              secondSaleTitle = '商品ID匹配出库'
              secondType = 'goodsId'
              flag = true
              break
            }
            if (row.goods_info.goods_spec && row.goods_info.goods_spec == item.variation_name && row.country == item.country && item.goods_count > 0) {
              console.log('商品货号匹配出库')
              secondSaleTitle = '商品货号匹配出库'
              secondType = 'skuName'
              flag = true
              break
            }
          }
        }
        this.$set(this.tableData[index], 'secondSaleTitle', secondSaleTitle)
        this.$set(this.tableData[index], 'isSecond', flag)
        this.$set(this.tableData[index], 'secondType', secondType)
      })
    },
    // 二次销售自选出库
    async chooseSecondSale(row) {
      this.clickRow = row
      this.secondSaleVisible = true
    },
    // 商品置顶
    async goodsTop(row) {
      const params = {
        id: Number(row.goods_info.goods_id),
        shop_id: row.mall_info.platform_mall_id,
      }
      const res = await this.$shopeemanService.handleGoodsTop(row.country, params)
      if (res.code === 200) {
        this.$message.success(`商品置顶成功！`)
      } else {
        this.$message.error(`商品置顶失败`)
      }
    },
    // 商品删除
    async goodsDelete(row) {
      this.$confirm('是否删除该商品?', '商品删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          setGoodsDelete(this, row)
          // this.setGoodsDelete(row)
        })
        .catch(() => {})
    },
    // 商品删除
    // async setGoodsDelete(row) {
    //   let params = {
    //     product_id_list: [Number(row.goods_info.goods_id)],
    //     shop_id: row.mall_info.platform_mall_id,
    //   }
    //   let res = await this.$shopeemanService.handleGoodsDelete(row.country, params)
    //   if (res.code === 200) {
    //     this.$message.success(`商品删除成功！`)
    //   } else {
    //     this.$message.error(`${res.data}`)
    //   }
    // },
    // 商品下架
    async goodsDelist(row) {
      this.$confirm('是否下架该商品?', '商品下架', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          setGoodsDelist(this, row)
          // this.setGoodsDelist(row)
        })
        .catch(() => {})
    },
    // 商品下架
    // async setGoodsDelist(row) {
    //   let params = [
    //     {
    //       id: Number(row.goods_info.goods_id),
    //       unlisted: true,
    //     },
    //   ]
    //   let data = {
    //     shop_id: row.mall_info.platform_mall_id,
    //   }
    //   let res = await this.$shopeemanService.handleGoodsDelist(row.country, data, params)
    //   if (res.code === 200) {
    //     this.$message.success(`商品下架成功！`)
    //   } else {
    //     this.$message.error(`${res.data}`)
    //   }
    //   console.log(res, 'res')
    // },
    // 订单出库
    async saveHandleOut() {
      const params = {
        order_id: this.clickRow.order_id,
        shipping_proof: this.shippingProof,
        shipping_trace_no: this.shippingTraceNo,
        channel_id: 79900,
        integrated: '',
        shop_id: this.clickRow.mall_info.platform_mall_id,
      }
      const res = await this.$shopeemanService.handleOutOrder(this.clickRow.country, params)
      if (res.data === 200) {
        this.$message.success('发货成功！')
        this.closeDialog()
      } else {
        this.$message.error(`发货失败，${res.data}`)
      }
    },
    handleOutOrder(row) {
      this.clickRow = row
      this.handOutOrderVisible = true
      this.shippingProof = row.logistics_name
      this.shippingTraceNo = row.tracking_no
    },
    // 拼多多月卡优惠券查询
    async openPddDisount() {
      const pddBuys = []
      const buyFilter = this.buyerAccountList.filter((item) => item.type === 1)
      if (buyFilter.length) {
        buyFilter.forEach((item) => {
          const buy = this.changeAccountParams(item)
          pddBuys.push(buy)
        })
      }
      await this.$buyerAccountService.pddCouponWindow(pddBuys)
    },
    // 转换参数为壳需要
    changeAccountParams(account) {
      const params = {
        UserNameCache: account.cache_path,
        Password: '',
        shotOrderPlatform: changeBuyerType(account.type),
        LoginedCookies: account.login_info,
        UserName: account.name,
        Cookiestr: JSON.stringify(account.login_info),
        AccountType: account.type,
        Ua: account.ua,
        Country: account.site || '',
      }
      return params
    },
    // 获取类目
    // async getCategoryInfo(country, cateId) {
    //   if (this.categoryInfo[cateId]) {
    //     return this.categoryInfo[cateId]
    //   } else {
    //     this.categoryInfo[cateId] = ''
    //     const res = await this.$commodityService.getCategoryTbInfo(country, cateId.toString(), '0', '')
    //     const resObj = res && JSON.parse(res)
    //     // console.log(resObj, '类目')
    //     if (resObj && resObj.code === 200 && resObj.data.categories && resObj.data.categories.length) {
    //       const categoryName = resObj.data.categories[0].category_cn_name
    //       this.categoryInfo[cateId] = categoryName
    //       // console.log(this.categoryInfo[cateId], categoryName)
    //       return categoryName
    //     } else {
    //       return ''
    //     }
    //   }
    // },
    async getCategoryInfo(id, country) {
      const res = await this.$commodityService.getCategoryTbInfo(country, id.toString(), '0', '')
      const resObj = res && JSON.parse(res)
      if (resObj && resObj.code === 200 && resObj.data.categories && resObj.data.categories.length) {
        this.categoryInfo[id] = resObj.data.categories[0].category_cn_name || ''
      } else {
        this.categoryInfo[id] = '类目获取失败'
      }
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
    // 批量回复订单买家
    async batchReplyOrderBuyer(arr) {
      if (!arr.length) {
        return this.$message.warning('请选择数据！')
      }
      this.replyBuyerData = arr
      this.replayOrderBuyerVisible = true
    },
    // 批量获取lazada付款方式
    async getLazadaPayType() {
      const arr = this.multipleSelection.filter((item) => item.goods_info.ori_platform_id == 9)
      if (!arr.length) {
        return this.$message.warning('请选择采购类型为lazada的数据')
      }
      const buyersFilter = this.buyerAccountList.filter((item) => item.type === 9)
      this.showConsole = false
      if (!buyersFilter.length) {
        this.$refs.Logs.writeLog(`请登录lazada买手号`, false)
        return this.$message.warning('请登录lazada买手号')
      }
      console.log(buyersFilter)
      this.$refs.Logs.writeLog(`开始获取lazada付款方式`, true) // country,cookieStr,orderId
      for (let i = 0; i < arr.length; i++) {
        const order = arr[i]
        if (!order.shot_order_info.buy_account_info) {
          this.$refs.Logs.writeLog(`【${order.order_sn}】，当前没有拍单信息，无法获取！`, false)
          continue
        }
        const buyer_name = order.shot_order_info.buy_account_info.name
        // let buy = buyersFilter.find((item) => item.name === 'maishou8526')
        const buy = buyersFilter.find((item) => item.name === buyer_name)
        if (!buy) {
          this.$refs.Logs.writeLog(`【${order.order_sn}】，对应的买手号【${buyer_name}】没有找到，请登录对应买手号！`, false)
          continue
        }
        let msg = ''
        try {
          const res = await this.$commodityService.getLazadaOrderDetail(order.country, JSON.stringify(buy.login_info), order.shot_order_info.shot_order_sn)
          // let res = await this.$commodityService.getLazadaOrderDetail(order.country, JSON.stringify(buy.login_info), '272554505256501')
          msg = res
          const resObj = JSON.parse(res)
          if (resObj && resObj.data) {
            // let payRes = await this.$commodityService.getLazadaPayMethod(order.country, JSON.stringify(buy.login_info), res, '272554505256501')
            const payRes = await this.$commodityService.getLazadaPayMethod(order.country, JSON.stringify(buy.login_info), res, order.shot_order_info.shot_order_sn)
            const params = {
              sysOrderId: order.id,
              shotOrderSn: order.shot_order_info.shot_order_sn,
              paymentMethod: payRes,
            }
            const uploadRes = await this.$api.uplaodLazadaPaymentMethod(params)
            if (uploadRes.data.code === 200) {
              this.$refs.Logs.writeLog(`【${order.order_sn}】获取付款方式成功，上报成功`, true)
            } else {
              this.$refs.Logs.writeLog(`【${order.order_sn}】获取付款方式失败，上报失败，${uploadRes.data.message}`, false)
            }
          }
        } catch (error) {
          this.$refs.Logs.writeLog(`【${order.order_sn}】获取付款方式失败，买手号【${buyer_name}】${msg || error}`, false)
          console.log('catch', msg)
        }
      }
    },
    // 获取订单轨迹
    async getorderPath(row) {
      this.orderTrackPath = []
      this.clickRow = row
      this.orderPathVisible = true
      const params = {
        package_order_sn: row.order_sn,
        // package_order_sn: '210516S654NNU9',
      }
      this.orderPathInfoLoading = true
      const res = await this.$XzyNetMessageService.post('xzy.orderTrajectoryV2', params)
      const resObj = (res && JSON.parse(res) && JSON.parse(res).data && JSON.parse(JSON.parse(res).data)) || undefined
      if (resObj && resObj.code === 200) {
        this.orderTrackPath = resObj.data.reverse()
      }
      if (!this.orderTrackPath.length) {
        const params = ['暂无订单信息', this.$dayjs(new Date()).format('YYYY-MM-DD HH:ss')]
        this.orderTrackPath.push(params)
      }
      this.orderPathInfoLoading = false
      console.log(resObj, 'getorderPath')
    },
    // 获取虾皮物流轨迹
    async getSHtrackPath(row) {
      console.log(row)
      this.spTrackPathVisible = true
      this.clickRow = row
      const params = {
        order_id: row.order_id,
        shop_id: row.mall_info.platform_mall_id,
      }
      this.shipInfoLoading = true
      if (row.order_status == 7) {
        const res = await this.$shopeemanService.getLogisticsTrackingHistoryRefund(row.mall_info.country, params)
        if (res.code === 200) {
          this.spTrackPath = res.data.history
        }
      } else {
        const res = await this.$shopeemanService.getLogisticsTrackingHistory(row.mall_info.country, params)
        if (res.code === 200) {
          this.spTrackPath = (res.data.list && res.data.list.length && res.data.list[0].tracking_info) || []
        }
      }
      if (!this.spTrackPath.length) {
        const params = {
          ctime: Math.round(new Date().getTime() / 1000),
          description: '暂无物流信息',
        }
        this.spTrackPath.push(params)
      }
      this.shipInfoLoading = false
    },
    // 同步此订单物流
    async syncLogisticsSingle(row) {
      this.showConsole = false // 打开日志
      this.$refs.Logs.consoleMsg = ''
      const service = new LogisticeSyncService(this.$refs.Logs.writeLog)
      if (!this.buyerAccountList.length) {
        this.$refs.Logs.writeLog(`没有买手号，请登录买手号`, false)
      }
      this.$refs.Logs.writeLog(`【${row.order_id}】获取采购物流轨迹开始`, true)
      service.start(this, this.buyerAccountList, [row])
    },
    // 同步此订单
    async SyncOrderSingle(row) {
      this.showConsole = false // 打开日志
      this.$refs.Logs.consoleMsg = ''
      this.$refs.Logs.writeLog(`【${row.order_id}】开始同步，请耐心等待!`, true)
      const orderService = new orderSync()
      await orderService.startSingel(row, this.$refs.Logs.writeLog)
    },
    // 同步此店铺订单
    async SyncOrder(row) {
      console.log(row, this.selectMallList)
      const mallList = [row.mall_info]
      this.showConsole = false // 打开日志
      this.$refs.Logs.consoleMsg = ''
      if (mallList.length == 0) {
        this.$refs.Logs.writeLog('没有获取到店铺数据，同步操作已取消!', false)
        return
      }
      this.$refs.Logs.writeLog('开始同步，请耐心等待!', true)
      for (let mI = 0; mI < mallList.length; mI++) {
        const mall = mallList[mI]
        for (let i = 0; i < syncStatus.length; i++) {
          // 同步状态
          const statusObj = syncStatus[i]
          const orderService = new orderSync(mall, statusObj, this, this.$refs.Logs.writeLog)
          await orderService.start(`${mI + 1}/${mallList.length}`, 'manual')
        }
      }
      this.$refs.Logs.writeLog('订单同步已完成！！！', true)
    },
    // 打开外部窗口
    async openUrl(data, type) {
      let url = data
      if (type === 'product') {
        const params = {
          platform_mall_id: data.mall_info.platform_mall_id,
        }
        const webUrl = await this.$shopeemanService.getWebUrl(data.country, params)
        console.log(webUrl, 'webUrl', data.country)
        url = webUrl + '/product' + '/' + data.mall_info.platform_mall_id + '/' + data.goods_info.goods_id
      }
      this.$BaseUtilService.openUrl(url)
    },
    // 关弹窗
    closeDialog(refresh) {
      this.colorVisible = false
      this.uploadStoreShipAmountVisible = false
      this.purchaseInfoVisible = false
      this.addBuyLinkVisible = false
      this.billsDetailVisible = false
      this.handOutOrderVisible = false
      this.replayOrderBuyerVisible = false
      this.secondSaleVisible = false
      this.abroadVisible = false
      this.goodsOutStoreVisible = false

      // 批量添加采购物流单号
      this.shipNo = ''
      this.shipCompany = ''
      this.shipBindStore = ''
      this.shipInfoVisible = false
      //
      this.trackingNumberList = []

      this.multipleSelection = []

      this.isAbroadGood = 0

      this.$refs.multipleTable.clearSelection()
      if (!refresh) {
        this.getOrderList()
      }
      this.clickRow = {}
    },
    // 保存多物流
    async saveAddMoreTra() {
      const list = []
      this.trackingNumberList.forEach((item) => {
        const obj = {
          id: item.id,
          trackingNumber: item.original_tracking_number,
          trackingNumberCompany: item.original_logistics_company,
        }
        list.push(obj)
      })
      const params = {
        sysOrderId: this.clickRow.id,
        lists: list,
        warehouseId: this.bindStore,
      }
      const res = await this.$api.updateOrderTrackingNumber(params)
      if (res.data.code === 200) {
        this.$message.success('添加成功!')
        this.closeDialog()
        this.addMoreTraNumberVisible = false
      } else {
        this.$message.error(`添加失败,${res.data.message}`)
      }
      console.log(res, 'res')
    },
    // 添加多物流单号
    async addMoreTrackingNumber(row, index) {
      this.clickRow = row
      this.addMoreTraNumberVisible = true
      const res = await this.$appConfig.getWarehouseInfo(row.mall_info.platform_mall_id)
      const resObj = (res && JSON.parse(res)) || {}
      const warehouseList = []
      for (const key in resObj) {
        warehouseList.push(resObj[key])
      }
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
      const params = {
        sysOrderId: row.id,
      }
      const resF = await this.$api.getOrderTrackingNumber(params)
      console.log('resF', resF)
      if (resF.data.code === 200 && resF.data.data.length) {
        this.trackingNumberList = resF.data.data
      } else {
        this.addTraNumber()
      }
    },
    // 删除多物流
    deleteTraNumber(index) {
      this.trackingNumberList.splice(index, 1)
    },
    // 添加多物流
    addTraNumber() {
      const par = {
        id: '0',
        original_tracking_number: '',
        original_logistics_company: '',
        warehouse_user_id: '',
      }
      this.trackingNumberList.push(par)
    },
    // 添加采购链接
    async addPurchaseLink(row, index) {
      this.clickRow = row
      this.addBuyLinkVisible = true
    },
    batchAddBuyInfo() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先选择商品！')
      }
      const sourceId = {}
      this.multipleSelection.forEach((item) => {
        sourceId[Number(item.goods_info.ori_platform_id)] = item.goods_info.ori_platform_id
      })
      if (Object.keys(sourceId).length > 1) {
        return this.$message.warning(`只能批量添加同一个采购平台的信息`)
      }
      this.dealType = 'batch'
      this.purchaseInfoVisible = true
    },
    // 单个采购信息编辑
    singleBuyInfo(row) {
      this.dealType = 'single'
      this.multipleSelection = []
      this.multipleSelection.push(row)
      this.purchaseInfoVisible = true
    },
    // 保存-批量添加采购物流单号
    async batchSaveShipInfo() {
      if (!this.shipNo) {
        return this.$message.error('物流单号不能为空！')
      }
      let message = ''
      this.shipLoading = true
      for (let i = 0; i < this.multipleSelection.length; i++) {
        const item = this.multipleSelection[i]
        const params = {
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

        const res = await this.$api.updateOrderTrackingNumber(params)
        if (res.data.code === 200) {
          message = message + `<p>【${item.order_sn}】添加成功</p>\n`
        } else {
          message = message + `<p>【${item.order_sn}】添加失败${res.data.message}\n</p>\n`
        }
      }
      this.shipLoading = false
      this.$alert(message, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
      })
    },
    // 批量添加采购物流单号
    async batchShipInfo() {
      const sameId = {}
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
      const filterOrder = this.multipleSelection.filter((n) => n.shot_order_info.shot_tracking_number)
      if (filterOrder.length) {
        let orders = ''
        filterOrder.forEach((item) => {
          orders = orders + ',' + item.order_sn
        })
        orders = orders.substring(1)
        return this.$message.warning(`【${orders}】已经存在采购物流单号，不能进行批量添加，请勿勾选这类订单`)
      }
      let storeInfo = null
      for (let i = 0; i < this.multipleSelection.length; i++) {
        const order = this.multipleSelection[i]
        let orderType = 0
        if ([1, 2, 3, 5, 8, 10].indexOf(Number(order.goods_info.ori_platform_id)) > -1) {
          orderType = 0
        } else if ([9, 11, 12, 15, 13].indexOf(Number(order.goods_info.ori_platform_id)) > -1) {
          orderType = 3
        }
        const res = await this.$appConfig.getWarehouseInfo(order.mall_info.platform_mall_id)
        // console.log(res, 'warehouseList')
        const warehouseList = res == '{}' ? [] : JSON.parse(res)
        console.log(warehouseList, 'warehouseList', orderType)
        storeInfo = warehouseList.find((item) => {
          return item.type == orderType
        })
        console.log(storeInfo, 'storeInfo')
        if (storeInfo) {
          break
        }
      }
      if (!storeInfo) {
        return this.$message.error('未绑定仓库！')
      }
      this.shipStoreList = [storeInfo]
      this.shipInfoVisible = true
    },
    async singlePurchase(row) {
      this.multipleSelection = []
      this.multipleSelection.push(row)
      this.purchaseHandler()
    },
    // 批量获取天猫淘宝海外平台拍单信息
    async getCrossBorderOrderInfo() {
      if (!this.multipleSelection.length) {
        return this.$message.warning(`请选择要操作的订单`)
      }
      const orderFilter = this.multipleSelection.filter((item) => {
        return item.goods_info.ori_platform_id == 13
      })
      if (!orderFilter.length) {
        return this.$message.warning(`请选择天猫淘宝海外平台订单！`)
      }
      if (!this.buyerAccountListGlobal.length) {
        return this.$message.warning(`请登录天猫海外平台买手号！`)
      }
      this.showConsole = false
      this.$refs.Logs.writeLog(`获取天猫淘宝海外平台订单信息开始`, true)
      for (let i = 0; i < orderFilter.length; i++) {
        const order = orderFilter[i]
        if (!order.shot_order_info.buy_account_info) {
          this.$refs.Logs.writeLog(`订单编号【${order.order_sn}】没有拍单信息`, false)
          continue
        }
        const buyName = order.shot_order_info.buy_account_info.name
        const buy = this.buyerAccountListGlobal.find((item) => {
          return item.user_id == buyName.split('_')[1]
        })
        if (!buy) {
          this.$refs.Logs.writeLog(`订单编号【${order.order_sn}】没有登录相应的买手号【${buyName}】`, false)
          continue
        }
        const res = await window['BaseUtilBridgeService'].getCrossBorderOrderInfo(buy.access_token, order.shot_order_info.shot_order_sn)
        const resObj = res && JSON.parse(res)
        if (resObj.success) {
          const dataArr = (resObj.data && resObj.data.purchase_orders) || []
          const resOrder = dataArr.find((item) => {
            return item.outer_purchase_id == order.shot_order_info.shot_order_sn
          })
          if (resOrder && resOrder.sub_purchase_orders) {
            const params = {
              sysOrderId: order.id,
              trackingNumber: resOrder.sub_purchase_orders[0].logistic_number || '',
              // shippingId:,
              deliveryTime: resOrder.sub_purchase_orders[0].rts_time || '',
              trackingNumberCompany: resOrder.sub_purchase_orders[0].logistic_company_name || '',
            }
            const trackRes = await this.$api.uploadTrackingNumber(params)
            console.log(trackRes, 'trackRes')
            if (trackRes.data.code === 200) {
              this.$refs.Logs.writeLog(`订单编号【${order.order_sn}】获取成功`, true)
            } else {
              this.$refs.Logs.writeLog(`订单编号【${order.order_sn}】上报失败，${trackRes.data.message}`, false)
            }
          } else {
            this.$refs.Logs.writeLog(`订单编号【${order.order_sn}】获取失败，暂无物流信息`, false)
          }
        } else {
          this.$refs.Logs.writeLog(`订单编号【${order.order_sn}】获取失败，${resObj.message}`, false)
        }
        console.log(resObj, 'getCrossBorderOrderInfo')
      }
      this.$refs.Logs.writeLog(`获取天猫淘宝海外平台订单信息结束`, true)
      console.log(this.buyerAccountListGlobal, 'this.buyerAccountListGlobal', orderFilter)
    },
    // 批量天猫淘宝海外平台拍单
    async purchaseGlobalOrder() {
      if (!this.multipleSelection.length) {
        return this.$message.warning(`请选择要操作的订单`)
      }
      const orderFilter = this.multipleSelection.filter((item) => {
        return item.goods_info.ori_platform_id == 13
      })
      if (!orderFilter.length) {
        return this.$message.warning(`请选择天猫淘宝海外平台订单！`)
      }
      const crossBorderAccount = this.getAccountGlobalById(this.accountCrossBorder)
      if (!crossBorderAccount) {
        return this.$message.warning(`请登录并选择${this.changeTypeName(13, this.goodsSourceList)}拍单账号`)
      }
      const buyerAccount = [crossBorderAccount]
      this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      const service = new ShotOrderService(orderFilter, buyerAccount, this)
      service.start(this.$refs.Logs.writeLog)
      console.log('crossBorderAccount', crossBorderAccount)
    },
    // 批量拍单
    async purchaseHandler() {
      if (!this.multipleSelection.length) {
        return this.$message.warning(`请选择要操作的订单`)
      }
      console.log('4544656')
      const waitOrders = JSON.parse(JSON.stringify(this.multipleSelection))
      const purchasesIdTb = {}
      const abroadShopeeCountry = {}
      const abroadLazadaCountry = {}
      const purchasesId = {}
      // 若存在以下几种情况，提示后不在继续拍单
      // 1.若同时存在阿里巴巴和淘宝天猫的订单则提示 “淘宝(天猫)与1688的订单请分开拍单”
      waitOrders.forEach((item) => {
        purchasesId[item.goods_info.ori_platform_id] = item.goods_info.ori_platform_id
        if (item.goods_info.ori_platform_id && (item.goods_info.ori_platform_id == 2 || item.goods_info.ori_platform_id == 3)) {
          purchasesIdTb['tb'] = 'tb'
        } else if (item.goods_info.ori_platform_id && item.goods_info.ori_platform_id == 8) {
          purchasesIdTb['1688'] = '1688'
        } else if (item.goods_info.ori_platform_id && item.goods_info.ori_platform_id == 9) {
          abroadLazadaCountry[item.country] = item.country
          purchasesId[item.goods_info.ori_platform_id] = item.country
        } else if (item.goods_info.ori_platform_id && item.goods_info.ori_platform_id == 11) {
          abroadShopeeCountry[item.country] = item.country
          purchasesId[item.goods_info.ori_platform_id] = item.country
        }
      })
      console.log(abroadLazadaCountry, purchasesId)
      if (Object.keys(purchasesIdTb).length > 1) {
        return this.$message.error(`淘宝(天猫)与1688的订单请分开拍单`)
      }
      // 2.存在上家类型为速卖通提示 “请先将速卖通的采购链接更换成国内的采购链接再进行拍单！”
      const smtFilter = waitOrders.filter((item) => {
        return item.goods_info.ori_platform_id && item.goods_info.ori_platform_id == 12
      })
      if (smtFilter.length > 0) {
        return this.$message.error(`请先将速卖通的采购链接更换成国内的采购链接再进行拍单！`)
      }
      // 3.若上家类型为11:shopee、9:lazada，并且同时存在不同的站点订单提示  “目前只支持单个站点的Shopee/lazada批量拍单,请区分站点”  goods_info.ori_country
      if (Object.keys(abroadLazadaCountry).length > 1) {
        return this.$message.error(`目前只支持单个站点的Shopee/lazada批量拍单,请区分站点！`)
      }
      if (Object.keys(abroadShopeeCountry).length > 1) {
        return this.$message.error(`目前只支持单个站点的Shopee/lazada批量拍单,请区分站点！`)
      }
      // 4.若上家类型为shopee、lazada  判断选择的买手号是否与选择的订单的站点是否一致，若不一致则提示 “请登录并选择对应站点的Shopee/Lazada拍单账号”
      // 5.都需要判断是否登录并选择拍单号，若有某个上家平台的订单但是，单业务未选择买手号则提示  “请登录并选择1688（相应平台（淘宝天猫、拼多多等））拍单账号”
      const account = []
      account[1] = this.accountpdd
      account[2] = this.accounttaobao
      account[3] = this.accounttaobao
      account[10] = this.accountjx
      account[4] = this.accountjd
      account[8] = this.account1688
      account[9] = this.accountlazada
      account[11] = this.accountshopee
      account[13] = this.accountCrossBorder
      // const pddAccount = this.getAccountById(this.accountpdd)
      // const taobaoAccount = this.getAccountById(this.accounttaobao)
      // const jdAccount = this.getAccountById(this.accountjd)
      // const jxAccount = this.getAccountById(this.accountjx)
      // const AlibabaAccount = this.getAccountById(this.account1688)
      // const lazadaAccount = this.getAccountById(this.accountlazada)
      // const shopeeAccount = this.getAccountById(this.accountshopee)
      // const crossBorderAccount = this.getAccountGlobalById(this.accountCrossBorder)
      let pddAccount = null
      let taobaoAccount = null
      const jdAccount = null
      let jxAccount = null
      let AlibabaAccount = null
      let lazadaAccount = null
      let shopeeAccount = null
      let crossBorderAccount = null
      console.log('accountCrossBorder', this.accountCrossBorder, this.buyerAccountListGlobal, this.buyerAccountList)
      console.log(purchasesId, 'purchasesId', this.accountpdd, this.accounttaobao, this.account1688, this.accountjx, this.accountlazada, this.accountshopee, pddAccount, crossBorderAccount)
      for (const key in purchasesId) {
        console.log(key)
        if (!account[key]) {
          return this.$message.error(`请登录并选择${this.changeTypeName(key, this.goodsSourceList)}拍单账号`)
        }
        switch (key) {
          case '1':
            pddAccount = this.getAccountById(this.accountpdd)
            break
          case '2':
          case '3':
            taobaoAccount = this.getAccountById(this.accounttaobao)
            break
          case '10':
            jxAccount = this.getAccountById(this.accountjx)
            break
          case '8':
            AlibabaAccount = this.getAccountById(this.account1688)
            break
          case '9':
            lazadaAccount = this.getAccountById(this.accountlazada)
            break
          case '11':
            shopeeAccount = this.getAccountById(this.accountshopee)
            break
          case '13':
            crossBorderAccount = this.getAccountGlobalById(this.accountCrossBorder)
            break
          default:
            break
        }
        console.log(lazadaAccount, 'lazadaAccount', purchasesId[key])
        if (key == 9 && account[9] && lazadaAccount) {
          if (lazadaAccount.site != purchasesId[key]) {
            return this.$message.error(`请登录并选择对应站点的Lazada拍单账号`)
          }
        }
        if (key == 11 && account[11] && shopeeAccount) {
          if (shopeeAccount.site != purchasesId[key]) {
            return this.$message.error(`请登录并选择对应站点的Shopee拍单账号`)
          }
        }
      }
      //
      const buyerAccount = _.remove([pddAccount, taobaoAccount, jdAccount, jxAccount, AlibabaAccount, lazadaAccount, shopeeAccount, crossBorderAccount], (n) => {
        return n != null && n !== undefined
      })
      this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      console.log(buyerAccount, 'buyerAccount')
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
    // 打开商品出库弹窗
    outStoreBefore(title, type) {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请选择数据')
      }
      const arrFilter = this.multipleSelection.filter((item) => item.order_status === 2)
      if (!arrFilter.length) {
        return this.$message.warning('只有待发货的订单，才能进行出货！')
      }
      const single = {}
      this.multipleSelection.forEach((item) => {
        single[item.order_status] = item.order_status
      })
      if (Object.keys(single).length > 1) {
        return this.$message.warning('只有待发货的订单，才能进行出货！')
      }
      this.outStoreTitle = title
      this.outStoreType = type
      console.log(this.outStoreType, '79')
      this.goodsOutStoreVisible = true
    },
    async setColorSingle(row, index) {
      this.clickRow = row
      this.multipleSelection = [row]
      this.colorVisible = true
      await this.getColorList()
    },
    // 设置颜色
    async setColor(arrData) {
      let ids = ''
      arrData.forEach((item, index) => {
        if (index === 0) {
          ids = item.id
        } else {
          ids = ids + ',' + item.id
        }
      })
      const params = {
        sysOrderIds: ids,
        id: this.colorRow.id,
      }
      const res = await this.$api.setColorLabel(params)
      if (res.data.code === 200) {
        arrData.forEach((item) => {
          const index = this.tableData.findIndex((n) => n.id == item.id)
          if (index > -1) {
            this.tableData[index].color_id = this.colorRow.id
          }
        })
        this.colorVisible = false
        this.colorRow = {}
        this.$message.success('设置成功')
        // this.closeDialog()
      } else {
        this.$message.error(`设置失败-${res.data.message}`)
      }
    },
    // 获取标识选择
    async getColorList() {
      this.colorList = []
      this.colorLoading = true
      const res = await this.$api.colorLabelList()
      this.colorLoading = false
      if (res.data.code === 200) {
        this.selectColorList = JSON.parse(JSON.stringify(res.data.data))
        this.colorList = res.data.data
        const obj = {
          id: 0,
          name: '取消标识',
          color: '',
        }
        this.colorList.unshift(obj)
      }
    },
    // 颜色标识
    getCurrentRow(row) {
      this.colorRow = row
    },
    openBefore() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先选择需要备注的商品！')
      }
      this.localRamarkVisible = true
    },
    // 批量添加本地备注
    async batchSetRemark() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先选择需要标记的商品！')
      }
      this.showConsole = false
      // this.$refs.Logs.consoleMsg = ''
      this.multipleSelection.forEach(async (item) => {
        const params = {
          id: item.id,
          remark: this.localRamark,
        }
        const res = await this.$api.setLocalRemark(params)
        if (res.data.code === 200) {
          const index = this.tableData.findIndex((n) => n.id === item.id)
          console.log(index, 'index')
          this.$set(this.tableData[index], 'remark', this.localRamark)
          // this.$refs.multipleTable.toggleRowSelection(item, false)
          this.$refs.Logs.writeLog(`订单编号【${item.order_sn}】备注成功`, true)
        } else {
          this.$refs.Logs.writeLog(`订单编号【${item.order_sn}】备注失败-${res.data.message}`, false)
        }
        console.log(res)
      })
      // this.localRamark = ''
      this.localRamarkVisible = false
      this.closeDialog('noRefresh')
    },
    setAbroadSingle(row, index) {
      this.multipleSelection = [row]
      this.abroadVisible = true
    },
    // 标记为海外商品
    async setAbroadGood(array) {
      if (!array.length) {
        return this.$message.warning('请先选择需要标记的商品！')
      }
      if (this.isAbroadGood === 0) {
        return this.$message.warning('请选择标记类型！')
      }
      // this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      array.forEach(async (item) => {
        const params = {
          sysOrderId: item.id,
          status: this.isAbroadGood,
        }
        try {
          const res = await this.$api.markGoodsIsOverseas(params)
          if (res.data.code === 200) {
            const index = this.tableData.findIndex((n) => n.id === item.id)
            this.$set(this.tableData[index].goods_info, 'is_overseas_goods', this.isAbroadGood)
            this.$refs.multipleTable.toggleRowSelection(item, false)
            this.$refs.Logs.writeLog(`商品ID【${item.goods_info.goods_id}】标记成功`, true)
          } else {
            this.$refs.Logs.writeLog(`商品ID【${item.goods_info.goods_id}】标记失败-${res.data.message}`, false)
          }
        } catch (error) {
          this.$refs.Logs.writeLog(`商品ID【${item.goods_info.goods_id}】标记失败-${error}`, false)
        }
      })
      // this.closeDialog()
      this.isAbroadGood = 0
      this.abroadVisible = false
    },
    // 表头显示处理
    showTableColumn(name) {
      const hasName = this.columnConfigList.find((item) => item.column_header == name)
      if (!hasName) {
        return true
      }
      if (hasName.is_show === 1) {
        return true
      } else {
        return false
      }
    },
    // 显示、隐藏所有列
    checkAllColumn(val) {
      this.columnConfigList.forEach((item) => {
        item.is_show = val
      })
    },
    // 上传配置列
    async uploadColumn() {
      const arr = []
      this.columnConfigList.forEach((item) => {
        const par = {
          columnHeader: item.column_header,
          isShow: item.is_show,
          // firstColumnIsCheckbox: item.first_column_is_checkbox,
        }
        arr.push(par)
      })
      let arrIndex = arr.findIndex((n) => n.columnHeader === '商品单价(RMB)')
      console.log(arrIndex,"arrIndex")
      if (arrIndex < 0) {
        let obj = {
          columnHeader: '商品单价(RMB)',
          isShow: 1,
        }
        arr.push(obj)
      }
      const params = {
        // columnId: 1, //  1 => '订单列表',         2 => '售后列表',
        lists: arr,
      }
      const res = await this.$api.uploadColumnsConfig(params)
      this.columnVisible = false
      if (res.data.code === 200) {
        this.$message.success('配置成功！')
        this.columnVisible = false
        this.getColumnsConfig()
      }
      this.$refs.multipleTable.doLayout()
    },
    // 获取自定义配置列
    async getColumnsConfig() {
      const { data } = await this.$api.getColumnsConfig()
      if (data.code === 200) {
        const resData = data.data || []
        if (!resData.length) {
          this.columnConfigList = columnData
          // return
        } else {
          this.columnConfigList = resData
        }
      }
      console.log(data, 'getColumnsConfig')
    },
    // 同步物流单号
    async syncLogistics() {
      this.showConsole = false // 打开日志
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
    },
    // 导出数据
    async applyAsyncExportOrder() {
      let sysMallId = ''
      this.selectMallList.forEach((item, index) => {
        if (index === 0) {
          sysMallId = item.id
        } else {
          sysMallId = sysMallId + ',' + item.id
        }
      })
      const params = JSON.parse(JSON.stringify(this.selectForm))
      params['page'] = this.currentPage
      params['pageSize'] = this.pageSize
      params['sysMallId'] = sysMallId
      params[this.inputType] = this.inputContent
      params['orderStatus'] = this.orderStatus.join(',')
      params['shotStatus'] = this.shotStatus.join(',')
      params['logisticsIds'] = this.logisticsIds.join(',')
      params['createTime'] = this.createTime.length ? this.createTime[0] + ' 00:00:00' + '/' + this.createTime[1] + ' 23:59:59' : ''
      console.log(params, 'params')
      const res = await this.$api.applyAsyncExportOrder(params)
      console.log(res, 'applyAsyncExportOrder')
      if (res.data.code === 200) {
        return this.$message.success(`导出数据请求成功，可点击【导出数据报表】按钮查看导出状态`)
      } else {
        return this.$message.error(`请求失败，${res.data.message}`)
      }
    },
    // 计算含邮毛利
    calcGrossProfit(escrowAmount, shotAmount, grossProfit) {
      const diff = (escrowAmount - shotAmount).toFixed(2)
      if (diff !== Number(grossProfit)) {
      }
      return diff
    },
    // 获取订单列表数据
    async getOrderList(page) {
      this.tableData = []
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
      params[this.inputType] = this.inputContent
      params['orderStatus'] = this.orderStatus.join(',')
      params['shotStatus'] = this.shotStatus.join(',')
      params['logisticsIds'] = this.logisticsIds.join(',')
      params['createTime'] = this.createTime && this.createTime.length ? this.createTime[0] + ' 00:00:00' + '/' + this.createTime[1] + ' 23:59:59' : ''
      params['otherTime'] = params['otherTime'] && params['otherTime'].length ? params['otherTime'][0] + ' 00:00:00' + '/' + params['otherTime'][1] + ' 23:59:59' : ''
      params['shotTime'] = params['shotTime'] && params['shotTime'].length ? params['shotTime'][0] + ' 00:00:00' + '/' + params['shotTime'][1] + ' 23:59:59' : ''
      this.tableLoading = true
      console.log(params, 'params')
      let res = await this.$api.getOrderList(params)
      this.tableLoading = false
      console.log(res, '111111111111111')
      try {
        if (res.data.code && res.data.code === 200) {
          this.tableData = res.data.data.data
          this.total = res.data.data.total
          this.$nextTick(() => {
            this.isSecondSale()
            this.dealWithTableList()
            this.getSkuRelation()
          })
        } else {
          this.$message.warning(`${res.data.message ? res.data.message : '获取订单列表失败'}`)
        }
      } catch (error) {
        console.log(error, '22222222222')
        this.$message.warning(`获取订单列表失败`)
        this.tableLoading = false
      }
    },
    async getSkuRelation() {
      let sysOrders = ''
      this.tableData.forEach((row, i) => {
        if (i === 0) {
          sysOrders = row.id
        } else {
          sysOrders = sysOrders + ',' + row.id
        }
      })
      const response = await this.$commodityService.getSkuRelation(sysOrders.toString())
      console.log()
      const skuInfo = response && JSON.parse(response)
      if (skuInfo.code === 200) {
        const list = skuInfo.data.data || []
        for (let index = 0; index < list.length; index++) {
          const item = list[index]
          const tbIndex = this.tableData.findIndex((ele) => {
            return ele.id === item.sysOrderId
          })
          this.tableData[tbIndex]['empty_info'] = ''
          this.$set(this.tableData[tbIndex], 'empty_info', tbIndex + 1 + 'success')
        }
      }
    },
    async dealWithTableList() {
      let sysOrders = ''
      const grossAmountRequest = []
      console.log('this.tableData', this.tableData)
      this.tableData.forEach(async (row, i) => {
        // 计算含邮毛利
        if (row.shot_order_info.shot_order_sn) {
          const diff = Number(row.escrow_amount - row.shot_order_info.shot_amount).toFixed(2)
          if (diff !== Number(row.gross_profit).toFixed(2)) {
            // console.log(i, diff - Number(row.gross_profit).toFixed(2), diff, Number(row.gross_profit).toFixed(2), 'uploadGressProfit')
            // console.log(i, Number(row.gross_profit).toFixed(2))
            row.gross_profit = diff
            const obj = {
              sys_order_id: row.id,
            }
            grossAmountRequest.push(obj)
          }
        }
        // 计算最终毛利
        if (Number(row.real_gross_profit) > 0 || [3, 4, 8].indexOf(Number(row.order_status)) > -1) {
          // console.log("计算最终毛利",Number(row.real_gross_profit)>0,Number(row.real_gross_profit))
          // 收入-采购价-仓库发货金额
          const diff = (row.escrow_amount - row.shot_order_info.shot_amount - Number(row.warehouse_ship_amount) / Number(this.rateList[row.country])).toFixed(2)
          row.real_gross_profit = diff
        }
        if (i === 0) {
          sysOrders = row.id
        } else {
          sysOrders = sysOrders + ',' + row.id
        }
        // const categoryName = await this.getCategoryInfo(row.country, row.goods_info.goods_category_id)
        // this.$set(row, 'categoryName', categoryName)
        this.isSecondSale(row, i)
      })
      if (grossAmountRequest.length > 0) {
        this.$api.uploadGressProfit({ lists: grossAmountRequest })
      }
    },
    // 获取买手号（服务端）
    // async getBuyerList() {
    //   let res = await this.$api.getBuyerList()
    //   if (res.data.code === 200) {
    //     this.buyerAccountList = res.data.data
    //   }
    //   console.log('getBuyerList', this.buyerAccountList)
    // },
    // 商品来源中文信息
    changeTypeName(code, arr) {
      const res = arr.find((item) => {
        return item.value == code
      })
      return (res && res.label) || ''
    },
    // 全选
    selectAll(key, baseData) {
      if (this[key].length < baseData.length) {
        this[key] = []
        baseData.map((item) => {
          this[key].push(item.value || item.ShipId)
        })
      } else {
        this[key] = []
      }
    },
    changeMallList(val) {
      this.selectMallList = val.mallList
      this.shipTypeList = siteShip(val.country) || [] // 物流方式
      this.logisticsIds = []
      this.payMethodList = platformPayMethod[val.country] || []
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOrderList()
    },
    handleSizeChange(size) {
      this.currentPage = 1
      this.pageSize = size
      this.getOrderList()
    },
    //   表格选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    changeShotStatus, // 采购状态
    changeOrderStatus, // 发货状态
    changePlatformPayMethod, // 平台付款方式
    changePackageType, // 货物类型
    changeDeliveryStatus, // 仓库状态
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
  .tableActive {
    color: red;
    cursor: pointer;
  }
  .copyStyle {
    margin-right: 8px;
    cursor: pointer;
  }
}
.content {
  p {
    color: red;
    // height: 26px;
    padding: 10px;
  }
  padding-right: 8px;
  // margin: 20px 0;
  background: #fff;
  // min-height: calc(100vh - 360px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  .pagination {
    display: flex;
    justify-content: flex-end;
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
  align-items: center;
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
.remark-style {
  span {
    display: inline-block;
    width: 80px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.abroad-mar {
  margin: 0 20px;
  display: flex;
  justify-content: center;
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
    .step-item {
      display: flex;
      span {
        font-weight: 900;
        font-size: 14px !important;
      }
    }

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .step-content {
    height: 500px;
    overflow: auto;
  }
}
.handle-out {
  .item {
    display: flex;
    align-items: center;
    span {
      line-height: 28px;
      height: 28px;
      display: inline-block;
      width: 120px;
      text-align: right;
    }
    .inputWidth {
      width: 200px;
    }
    p {
      height: 28px;
      line-height: 28px;
    }
    margin-bottom: 10px;
  }
}
</style>

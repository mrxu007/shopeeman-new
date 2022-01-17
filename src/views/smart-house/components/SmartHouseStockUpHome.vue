<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span style="text-align:right">物流单号：</span>
          <el-input
            v-model="form.packageCode"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span>中转仓库：</span>
          <el-select
            v-model="form.wid"
            size="mini"
            filterable
          >
            <el-option
              v-for="(item, index) in widList"
              :key="index"
              :label="item.warehouse_name"
              :value="item.wid"
            />
          </el-select>
        </li>
      </ul>
      <ul style="margin-bottom: 10px">
        <li>
          <span>采购单号：</span>
          <el-input
            v-model="form.purchaseOrderSn"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span>预报时间：</span>
          <el-date-picker
            v-model="form.createdAt"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>

        <li>
          <el-button
            type="primary"
            size="mini"
            @click="
              page =1
              getHomeWarehouse()"
          >搜 索</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="foreignVisible = true"
          >发起预报</el-button>
          <el-button
            type="primary"
            size="mini"
            :loading="isDeleteLoading"
            @click="deleteHomeForecast(multipleSelection,2)"
          >批量删除</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="exportTableData"
          >导出数据</el-button>
        </li>
      </ul>
      <ul>
        <li>
          <span style="color:red;">温馨提示：1、为让仓库方便快捷的查找您备货的商品，请在您寄送的包裹上面贴上系统的商品标签码
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、打印尺寸应不小于宽78mm x 高88mm
          </span>
        </li>
        <li>
          <el-button
            type="primary"
            size="mini"
            @click="downBarCode"
          >下载预报单条形码</el-button>
        </li>
        <li>
          <el-checkbox
            v-model="showConsole"
          >隐藏日志</el-checkbox>
        </li>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="isShowLoading"
        height="calc(100vh - 240px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="50"
          fixed
        />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          fixed
        />
        <el-table-column
          prop="package_code"
          label="预报物流单号"
          min-width="120"
          align="center"
          fixed
        />
        <el-table-column
          prop="purchase_order_sn"
          label="采购单号"
          min-width="150"
          align="center"
        />
        <el-table-column
          label="中转仓"
          align="center"
          min-width="150"
        >
          <template slot-scope="{row}">
            {{ row.warehouse_address?row.warehouse_address.warehouse_name:'' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="预报时间"
          align="center"
          min-width="140"
        />
        <el-table-column
          prop="goods_total"
          label="商品预报数量"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="goods_sign_total"
          label="商品签收数量"
          align="center"
          min-width="100"
        />
        <el-table-column
          label="商品详情"
          align="center"
          min-width="130"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              @click="
                detailsVisible = true
                getDetails(row)"
            >查看商品详情</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="95"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              @click="deleteHomeForecast(row,1)"
            >删 除</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
          min-width="140"
        />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="page"
          :page-sizes="[30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
    <!-- 查看商品详情弹窗 -->
    <el-dialog
      class="details-dialog"
      title="预报商品详情"
      :visible.sync="detailsVisible"
      width="1000px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table
        height="450"
        :data="detailsData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :row-style="{
          color: 'black',
          height: '50px',
        }"
      >
        <el-table-column
          width="50"
          align="center"
          type="index"
          label="序号"
          fixed
        />
        <el-table-column
          width="100"
          align="center"
          label="预报物流单号"
          prop="package_code"
          fixed
        />
        <el-table-column
          width="80"
          align="center"
          label="商品状态"
        >
          <template slot-scope="{row}">
            {{ row.status?skuStatusObj[row.status]:'' }}
          </template>
        </el-table-column>
        <el-table-column
          width="140"
          align="center"
          label="商品编号(SKU)"
          prop="sku_id"
          show-overflow-tooltip
        />
        <el-table-column
          width="150"
          align="center"
          label="签收时间"
          prop="sign_time"
        />
        <el-table-column
          width="100"
          align="center"
          label="商品名称"
          prop="goods_name"
          show-overflow-tooltip
        />
        <el-table-column
          width="100"
          align="center"
          label="商品购买数量"
          prop="purchase_num"
        />
        <el-table-column
          width="100"
          align="center"
          label="商品签收数量"
          prop="sign_num"
        />
        <el-table-column
          width="100"
          align="center"
          label="商品规格"
          prop="sku_spec"
          show-overflow-tooltip
        />
        <el-table-column
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.sku_image"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  :src="row.sku_image"
                  style="width: 400px; height: 400px"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.sku_image"
              >
                <div slot="error" class="image-slot" />
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品链接"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.goods_url"
              type="primary"
              size="mini"
              @click="openUrl(row.goods_url)"
            >查看商品链接</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 发起预报弹窗 -->
    <el-dialog
      class="foreign-dialog"
      title="预报中转仓备货商品"
      :visible.sync="foreignVisible"
      width="1200px"
      top="8vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="foreignClose"
    >
      <div style="display:flex;">
        <div>
          <ul>
            <li>
              <span>中转仓库：</span>
              <el-select
                v-model="foreignWid"
                size="mini"
                filterable
              >
                <el-option
                  v-for="(item, index) in foreignWidList"
                  :key="index"
                  :label="`${item.warehouse_name}(${item.detail_address})`"
                  :value="item.wid"
                />
              </el-select>
            </li>
          </ul>
          <ul>
            <li>
              <el-button
                type="primary"
                size="mini"
                :disabled="isforeignClose"
                @click="itselfGoodsImport"
              >自有商品导入</el-button>
              <el-upload ref="importRef" :disabled="isforeignClose" style="margin:0 10px" accept=".xls,.xlsx" action="https://jsonplaceholder.typicode.com/posts/" :on-change="importTemplate" :show-file-list="false" :auto-upload="false">
                <el-button :disabled="isforeignClose" :data="importTemplateData" size="mini" type="primary"> 批量Excel导入 </el-button>
              </el-upload>
              <el-button
                type="primary"
                size="mini"
                @click="downloadTemplate"
              >下载预报模板</el-button>
              <el-button
                type="primary"
                size="mini"
                :disabled="isforeignClose"
                @click="exportTickData"
              >导出勾选数据</el-button>
            </li>
          </ul>
        </div>
      </div>
      <span style="color:red">
        提示：1：应仓库要求，预报单中需包含商品的体积(长宽高)，需下载最新版的预报模板
        &nbsp;&nbsp;&nbsp;&nbsp;2：导入商品会导入到对应的中转仓库，请选择好再导入
      </span>
      <el-table
        v-loading="productLoading"
        height="420"
        :data="foreignData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :row-style="{
          color: 'black',
          height: '50px',
        }"
        @selection-change="foreignSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="50"
          fixed
        />
        <el-table-column
          width="50"
          align="center"
          type="index"
          label="序号"
          fixed
        />
        <el-table-column
          width="100"
          align="center"
          label="预报物流单号"
          prop="packageCode"
          fixed
        />
        <el-table-column
          width="120"
          align="center"
          label="采购单号"
          prop="purchaseOrderSn"
        />
        <el-table-column
          width="120"
          align="center"
          label="商品编号(SKU)"
        >
          <template slot-scope="{row}">
            {{ row.skuList[0].sku_id }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品名称"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.skuList[0].goods_name }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="商品数量"
        >
          <template slot-scope="{row}">
            {{ row.skuList[0].purchase_num }}
          </template>
        </el-table-column>
        <el-table-column
          width="110"
          align="center"
          label="商品单价(RMB)"
        >
          <template slot-scope="{row}">
            {{ row.skuList[0].sku_price }}
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          align="center"
          label="商品规格"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.skuList[0].sku_spec }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.skuList[0].sku_image"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  :src="row.skuList[0].sku_image"
                  style="width: 400px; height: 400px"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.skuList[0].sku_image"
              >
                <div slot="error" class="image-slot" />
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="商品链接"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.skuList[0].goods_url"
              type="primary"
              size="mini"
              @click="openUrl(row.skuList[0].goods_url)"
            >商品链接</el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="备注"
          prop="remark"
          show-overflow-tooltip
        />
        <el-table-column
          width="100"
          align="center"
          label="操作状态"
          prop="status"
          fixed="right"
        >
          <template slot-scope="{ row }">
            <span :style="row.color && 'color:' + row.color">{{ row.status }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--自有商品导入弹窗-->
    <el-dialog
      class="itself-goods-dialog"
      title="导入预报"
      :visible.sync="itselfGoodsVisible"
      width="1200px"
      top="8vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <ul>
        <li>
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>产品中心商品</span>
            </div>
            <div style="display:flex">
              <product-choose ref="isClean" @CateId="CateId" />
              <div class="left-wrap">
                <ul style="display:block;">
                  <li>
                    <span>商品名称：</span>
                    <el-input
                      v-model="productFrom.ProductName"
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>商品编码：</span>
                    <el-input
                      v-model="productFrom.ProductId"
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                    <el-button
                      style="margin-left:10px"
                      size="mini"
                      type="primary"
                      @click="cleanProductFrom()"
                    >清 空</el-button>
                  </li>
                  <li>
                    <span>SKU编码：</span>
                    <el-input
                      v-model="productFrom.SkuId"
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                    <el-button
                      style="margin-left:10px"
                      size="mini"
                      type="primary"
                      @click="
                        productPage=1
                        getProductList()"
                    >搜 索</el-button>
                  </li>
                </ul>
              </div>
            </div>
            <el-table
              height="420"
              :data="productData"
              :header-cell-style="{
                backgroundColor: '#f5f7fa',
              }"
              :row-style="{
                color: 'black',
                height: '50px',
              }"
            >
              <el-table-column
                width="100"
                align="center"
                label="商品ID"
                prop="product_id"
              />
              <el-table-column
                width="160"
                align="center"
                label="商品名称"
                prop="product_name"
                show-overflow-tooltip
              />
              <el-table-column
                width="80"
                align="center"
                label="主图"
              >
                <template slot-scope="{row}">
                  <el-tooltip
                    v-if="row.image_url"
                    effect="light"
                    placement="right-end"
                    :visible-arrow="false"
                    :enterable="false"
                    style="width: 50px; height: 50px"
                  >
                    <div slot="content">
                      <el-image
                        :src="row.image_url"
                        style="width: 400px; height: 400px"
                      >
                        <div slot="error" class="image-slot" />
                      </el-image>
                    </div>
                    <el-image
                      style="width: 40px; height: 40px"
                      :src="row.image_url"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                align="center"
                label="商品价格"
                prop="price"
              />
              <el-table-column
                width="103"
                align="center"
                label="操作"
                prop="remark"
              >
                <template slot-scope="{row}">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="
                      skuDetailsVisible=true
                      getProductSkuList(row)
                    "
                  >SKU详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                :current-page="productPage"
                :page-sizes="[50, 100, 200]"
                :page-size="productPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="productTotal"
                @size-change="productSizeChange"
                @current-change="productCurrentChange"
              />
            </div>
          </el-card>
        </li>
        <li>
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>预报SKU</span>
            </div>
            <div style="display:flex">
              <div class="right-wrap">
                <ul>
                  <li>
                    <span>物流单号：</span>
                    <el-input
                      v-model="foreignSku.packageCode"
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>采购单号：</span>
                    <el-input
                      v-model="foreignSku.purchaseOrderSn"
                      clearable
                      size="mini"
                      style="width:90px"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>商品数量：</span>
                    <el-input
                      v-model="foreignSku.purchase_num"
                      clearable
                      size="mini"
                      style="width:90px"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                </ul>
                <ul>
                  <li class="goods-volume">
                    <span>商品体积：</span>
                    <el-input
                      v-model="foreignSku.long"
                      size="mini"
                      style="padding:0px"
                      oninput="value=value.replace(/\s+/g,'')"
                    />*
                    <el-input
                      v-model="foreignSku.width"
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />*
                    <el-input
                      v-model="foreignSku.height"
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>商品重量：</span>
                    <el-input
                      v-model="foreignSku.weight"
                      clearable
                      size="mini"
                      style="width:90px"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                    <span style="color:red;">g</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>备注信息：</span>
                    <el-input
                      v-model="foreignSku.remark"
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <el-button
                      style="margin-left:10px"
                      size="mini"
                      type="primary"
                      @click="batchSetUp"
                    >批量设置</el-button>
                    <el-button
                      style="margin-left:10px"
                      size="mini"
                      type="primary"
                      @click="addForecast"
                    >添加到预报单</el-button>
                  </li>
                </ul>
              </div>
            </div>
            <el-table
              height="420"
              :data="goodsForeignData"
              :header-cell-style="{
                backgroundColor: '#f5f7fa',
              }"
              :row-style="{
                color: 'black',
                height: '50px',
              }"
            >
              <el-table-column
                width="120"
                align="center"
                label="SkuID"
                prop="sku_id"
                show-overflow-tooltip
              />
              <el-table-column
                width="100"
                align="center"
                label="Sku名称"
                prop="sku_name"
                show-overflow-tooltip
              />
              <el-table-column
                width="80"
                align="center"
                label="Sku图片"
              >
                <template slot-scope="{row}">
                  <el-tooltip
                    v-if="row.image_url"
                    effect="light"
                    placement="right-end"
                    :visible-arrow="false"
                    :enterable="false"
                    style="width: 50px; height: 50px"
                  >
                    <div slot="content">
                      <el-image
                        :src="row.image_url"
                        style="width: 400px; height: 400px"
                      >
                        <div slot="error" class="image-slot" />
                      </el-image>
                    </div>
                    <el-image
                      style="width: 40px; height: 40px"
                      :src="row.image_url"
                    >
                      <div slot="error" class="image-slot" />
                    </el-image>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                align="center"
                label="Sku价格"
                prop="price"
              />
              <el-table-column
                width="275"
                align="center"
                label="基本设置"
              >
                <template slot-scope="scope">
                  <el-form label-position="right" label-width="80px">
                    <el-form-item label="备注信息:">
                      <el-input
                        v-model="skuList.remark[scope.$index]"
                        size="mini"
                        oninput="value=value.replace(/\s+/g,'')"
                      />
                    </el-form-item>
                    <el-form-item label="商品体积:">
                      <el-input
                        v-model="skuList.long[scope.$index]"
                        size="mini"
                        class="volume"
                        oninput="value=value.replace(/\s+/g,'')"
                      />*
                      <el-input
                        v-model="skuList.width[scope.$index]"
                        size="mini"
                        class="volume"
                        oninput="value=value.replace(/\s+/g,'')"
                      />*
                      <el-input
                        v-model="skuList.height[scope.$index]"
                        size="mini"
                        class="volume"
                        oninput="value=value.replace(/\s+/g,'')"
                      />*
                      <el-input
                        v-model="skuList.weight[scope.$index]"
                        size="mini"
                        class="volume"
                        oninput="value=value.replace(/\s+/g,'')"
                      />
                    </el-form-item>
                    <el-form-item label="物流单号:">
                      <el-input
                        v-model="skuList.packageCode[scope.$index]"
                        size="mini"
                        oninput="value=value.replace(/\s+/g,'')"
                      />
                    </el-form-item>
                    <el-form-item label="采购单号:">
                      <el-input
                        v-model="skuList.purchaseOrderSn[scope.$index]"
                        size="mini"
                        oninput="value=value.replace(/\s+/g,'')"
                      />
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                align="center"
                label="Sku库存"
                prop="stock"
              />
              <el-table-column
                width="80"
                align="center"
                label="Sku数量"
                prop="ship_type"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="skuList.purchase_num[scope.$index]"
                    size="mini"
                    oninput="value=value.replace(/\s+/g,'')"
                  />
                </template>
              </el-table-column>
              <el-table-column
                width="103"
                align="center"
                label="操作"
                prop="remark"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="goodsForeignData.splice(scope.$index, 1)"
                  >移 除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </li>
      </ul>
    </el-dialog>
    <!--sku详情弹窗-->
    <el-dialog
      class="sku-details-dialog"
      title="选择需要预报的SKU"
      :visible.sync="skuDetailsVisible"
      width="630px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table
        v-loading="productSkuLoading"
        height="420"
        :data="skuDetailsData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :row-style="{
          color: 'black',
          height: '50px',
        }"
        @selection-change="skuDetailsSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="50"
        />
        <el-table-column
          width="50"
          align="center"
          type="index"
          label="序号"
        />
        <el-table-column
          width="120"
          align="center"
          label="SkuID"
          prop="sku_id"
          show-overflow-tooltip
        />
        <el-table-column
          width="100"
          align="center"
          label="Sku名称"
          prop="sku_name"
          show-overflow-tooltip
        />
        <el-table-column
          width="80"
          align="center"
          label="Sku图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.image_url"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  :src="row.image_url"
                  style="width: 400px; height: 400px"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.image_url"
              >
                <div slot="error" class="image-slot" />
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="Sku价格"
          prop="price"
        />
        <el-table-column
          width="100"
          align="center"
          label="Sku库存"
          prop="stock"
        />
      </el-table>
      <div style="text-align:right;padding-top: 10px;">
        <el-button
          style="margin-left:10px"
          size="mini"
          type="primary"
          @click="confirmSku()"
        >确 认</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import StrockUpHome from '../../../module-api/smart-house-api/strock-up-home'
import { exportExcelDataCommon } from '../../../util/util'
import ProductChoose from '../../../components/product-choose.vue'
import XLSX from 'xlsx'
import { data } from 'cheerio/lib/api/attributes'
export default {
  components: {
    ProductChoose
  },
  data() {
    return {
      detailsVisible: false,
      foreignVisible: false,
      itselfGoodsVisible: false,
      skuDetailsVisible: false,
      isShowLoading: false,
      isDeleteLoading: false,
      productLoading: false,
      productSkuLoading: false,
      showConsole: true,
      isforeignClose: false,
      StrockUpHome: new StrockUpHome(this),

      total: 0,
      pageSize: 30,
      page: 1,
      productTotal: 0,
      productPageSize: 50,
      productPage: 1,

      tableData: [], // 表格数据
      detailsData: [], // 预报商品详情数据
      skuDetailsSelection: [], // SKU详情勾选数据
      foreignSelection: [], // 预报海外仓备货商品勾选数据
      multipleSelection: [], // 选择数据
      importTemplateData: '', // 批量导入数据
      foreignData: [], // 批量导入预报数据
      foreignWid: '', // 预报备货商品中转仓id
      productData: [], // 产品中心数据
      excelForeignData: [], // 表格导入的预报单上传数据
      goodsForeignData: [], // 自有商品导入的预报单上传数据
      skuDetailsData: [], // 选择需要预报的SKU详情数据
      muid: 0, // 用户ID

      skuList: {
        purchaseOrderSn: [],
        packageCode: [],
        remark: [],
        long: [],
        width: [],
        height: [],
        weight: [],
        purchase_num: []
      },
      form: { // 条件搜索
        wid: '', // 仓库id
        purchaseOrderSn: '', // 采购单号
        packageCode: '', // 采购物流单号
        createdAt: '' // 预报时间
      },
      foreignSku: { // 预报SKU
        packageCode: '', // 物流单号
        purchaseOrderSn: '', // 采购单号
        purchase_num: '0', // 商品数量
        long: '0', // 长
        width: '0', // 宽
        height: '0', // 高
        weight: '0', // 高
        remark: ''// 备注
      },
      productFrom: { // 产品中心条件搜索
        CateId: 0, // 类目ID
        ProductName: '', // 商品名称
        ProductId: '', // 商品编码
        SkuId: '', // SKU编码
        Status: '-1' // 商品状态
      },
      skuStatusObj: {
        1: '已审核（待签收）',
        2: '已签收',
        3: '未审核'
      },
      widList: [], // 中转仓
      foreignWidList: [] // 预报中转仓
    }
  },
  async mounted() {
    this.form.createdAt = [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()]
    // 获取用户信息，用来判断中转仓的显示
    await this.getUserInfo()
    // 获取中转仓库
    await this.getWarehouseList()
    // 获取数据
    await this.getHomeWarehouse()
  },
  methods: {
    // 打开外部链接
    async openUrl(url) {
      try {
        await this.$BaseUtilService.openUrl(url)
      } catch (error) {
        this.$message.error(`打开链接【${url}】失败`)
      }
    },
    // 获取数据
    async getHomeWarehouse() {
      this.isShowLoading = true
      this.form.page = this.page
      this.form.pageSize = this.pageSize
      const res = await this.StrockUpHome.getHomeWarehouse(this.form)
      if (res.code === 200) {
        this.total = res.data.total
        this.tableData = res.data.data
        this.tableData.map(item => {
          let goods_total = 0
          let goods_sign_total = 0
          item.home_stocking_forecast_sub.forEach(skuItem => {
            goods_total += skuItem.purchase_num ? skuItem.purchase_num : 0
            goods_sign_total += skuItem.sign_num ? skuItem.sign_num : 0
          })
          item.goods_total = goods_total
          item.goods_sign_total = goods_sign_total
        })
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(`${res.data}`)
      }
      this.isShowLoading = false
    },
    // 删除/批量删除预报单
    async deleteHomeForecast(val, type) {
      const data = []
      if (type === 1) {
        data.push(val)
      } else {
        if (val.length === 0) return this.$message('请先选择需要删除的数据')
        this.isDeleteLoading = true
        val.forEach(item => {
          data.push(item)
        })
      }
      this.delHomeForecast(data)
    },
    delHomeForecast(data) {
      data.forEach(async item => {
        const res = await this.StrockUpHome.deleteHomeForecast(item.id)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`单号【${item.package_code}】:删除成功`, true)
          this.tableData.splice(this.tableData.findIndex(tItem => tItem.id === item.id), 1)
        } else {
          this.$refs.Logs.writeLog(`单号【${item.package_code}】:${res.data}`, false)
        }
      })
      this.showConsole = false
      this.isDeleteLoading = false
    },
    // 获取中转仓
    async getWarehouseList() {
      let data = []
      const myMap = new Map()
      // 判断是否缓存 有则使用缓存数据 没有则调取服务端 然后缓存一份
      const res1 = await this.StrockUpHome.temporaryCacheInfo('get', 'getWarehouseList', '')
      if (res1.code === 200) {
        data = res1.data
      } else {
        const res2 = await this.StrockUpHome.getWarehouseList()
        if (res2.code === 200) {
          data = res2.data
          await this.StrockUpHome.temporaryCacheInfo('save', 'getWarehouseList', data)
        } else {
          this.$message.error(`${res2.data}`)
          return
        }
      }
      data.forEach(item => {
        // 判断user_ids是否有值 没有则判断状态 有则只显示与muid对应的
        if (item.user_ids) {
          const flag = item.user_ids.some(uItem => { return uItem === this.muid })
          if (flag) {
            this.widList.push(item)
            this.foreignWidList.push(item)
          }
        } else {
          if (item.status !== 2) {
            this.widList.push(item)
            this.foreignWidList.push(item)
          }
        }
      })
      this.widList = this.widList.filter((item) => !myMap.has(item.id) && myMap.set(item.id, 1))
      this.init()
    },
    // 获取用户muid
    async getUserInfo() {
      const res = await this.StrockUpHome.getUserInfo()
      if (res.code === 200) {
        this.muid = res.data.muid
      } else {
        this.$message.error(res.data)
      }
    },
    // 初始仓库
    init() {
      this.form.wid = this.widList[0].wid
      this.foreignWid = this.foreignWidList[0].wid
    },
    // 选择需要预报的SKU确认
    confirmSku() {
      if (!this.skuDetailsSelection?.length) return this.$message('请选择需要预报的SKU')
      for (let index = 0; index < this.skuDetailsSelection.length; index++) {
        const element1 = this.skuDetailsSelection[index]
        for (let index = 0; index < this.goodsForeignData.length; index++) {
          const element2 = this.goodsForeignData[index]
          if (element1.sku_id === element2.sku_id) {
            this.$message(`SkuID【${element1.sku_id}】已存在，请勿重复添加`)
            return
          }
        }
        this.goodsForeignData.push(element1)
      }
      this.goodsForeignData.map((item, index) => {
        this.skuList.long[index] = '0'
        this.skuList.width[index] = '0'
        this.skuList.height[index] = '0'
        this.skuList.weight[index] = '0'
        this.skuList.purchase_num[index] = '1'
        this.skuList.packageCode[index] = ''
        this.skuList.purchaseOrderSn[index] = ''
        this.skuList.remark[index] = ''
      })
      this.skuDetailsVisible = false
    },
    // 获取产品中心列表数据
    async getProductList() {
      this.productLoading = true
      this.productFrom.Page = this.productPage
      this.productFrom.PageSize = this.productPageSize
      this.productFrom.Status = Number(this.productFrom.Status)
      const res = await this.StrockUpHome.getProductList(this.productFrom)
      if (res.code !== 200) {
        this.$message.error(res.data)
      }
      this.productTotal = res.data.total
      this.productData = res.data.data
      this.productLoading = false
      console.log('productData', this.productData)
    },
    // 发起商品预报
    async stockingHomeUpload() {
      this.isforeignClose = true
      const copyData = JSON.parse(JSON.stringify(this.foreignData))
      copyData.forEach(item => {
        const result = this.excelForeignData.findIndex(i => { return item.packageCode === i.packageCode })
        if (result !== -1) {
          this.excelForeignData[result].skuList.push(item.skuList[0])
        } else {
          this.excelForeignData.push(item)
        }
      })
      for (let index = 0; index < this.excelForeignData.length; index++) {
        const element = this.excelForeignData[index]
        const res = await this.StrockUpHome.stockingHomeUpload(element)
        if (res.code === 200) {
          this.foreignData.map(item => {
            if (item.packageCode === element.packageCode) {
              this.$set(item, 'status', '预报成功')
              this.$set(item, 'color', 'green')
            }
          })
        } else {
          this.foreignData.map(item => {
            if (item.packageCode === element.packageCode) {
              this.$set(item, 'status', res.data)
              this.$set(item, 'color', 'red')
            }
          })
        }
      }
      console.log('预报上传数据', this.excelForeignData)
      this.isforeignClose = false
    },
    // 添加到预报单
    addForecast() {
      if (!this.goodsForeignData?.length) return this.$message('请先选择需要预报的SKU')
      const isNull = this.goodsForeignData.some((item, index) => {
        return this.skuList.packageCode[index] === ''
      })
      if (isNull) return this.$message('请先【设置】sku的其他信息')
      this.excelForeignData = []
      this.goodsForeignData.map((item, index) => {
        const obj = {
          wid: this.foreignWid,
          purchaseOrderSn: this.skuList.purchaseOrderSn[index],
          packageCode: this.skuList.packageCode[index],
          remark: this.skuList.remark[index],
          skuList: [
            {
              sku_id: item.sku_id,
              goods_name: item.goods_name,
              goods_url: item.purchase_goods_url,
              sku_image: item.image_url,
              sku_spec: item.sku_name,
              sku_name: item.sku_name,
              sku_price: item.price,
              long: this.skuList.long[index],
              width: this.skuList.width[index],
              height: this.skuList.height[index],
              weight: this.skuList.weight[index],
              purchase_num: this.skuList.purchase_num[index],
              remark: this.skuList.remark[index]
            }
          ]
        }
        this.foreignData.push(obj)
      })
      this.stockingHomeUpload(data)
      this.itselfGoodsVisible = false
    },
    // 预报SKU批量设置
    batchSetUp() {
      if (!this.foreignSku.packageCode) return this.$message('物流单号不能为空')
      if (!this.foreignSku.purchaseOrderSn) return this.$message('采购单号不能为空')
      if (!this.foreignSku.purchase_num || Number(this.foreignSku.purchase_num) <= 0) return this.$message('商品数量不能小于或等于0')
      if (!this.foreignSku.long || Number(this.foreignSku.long) <= 0) return this.$message('商品长度不能小于或等于0')
      if (!this.foreignSku.width || Number(this.foreignSku.width) <= 0) return this.$message('商品宽度不能小于或等于0')
      if (!this.foreignSku.height || Number(this.foreignSku.height) <= 0) return this.$message('商品高度不能小于或等于0')
      if (!this.foreignSku.weight || Number(this.foreignSku.weight) <= 0) return this.$message('商品重量不能小于或等于0')
      this.$confirm('是否覆盖已单独设置的选项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.goodsForeignData.map((item, index) => {
          this.skuList.long[index] = this.foreignSku.long
          this.skuList.width[index] = this.foreignSku.width
          this.skuList.height[index] = this.foreignSku.height
          this.skuList.weight[index] = this.foreignSku.weight
          this.skuList.purchase_num[index] = this.foreignSku.purchase_num
          this.skuList.packageCode[index] = this.foreignSku.packageCode
          this.skuList.purchaseOrderSn[index] = this.foreignSku.purchaseOrderSn
          this.skuList.remark[index] = this.foreignSku.remark
          this.$forceUpdate() // 强制视图更新
        })
      })
    },
    // 下载条形码
    async downBarCode() {
      const params = {
        BarCodeList: []
      }
      if (!this.multipleSelection?.length) return this.$message('请选择需要下载的数据')
      this.showConsole = false
      this.$refs.Logs.writeLog('开始批量生成预报单条形码至软件安装目录...', true)
      for (let i = 0; i < this.multipleSelection.length; i++) {
        const item1 = this.multipleSelection[i]
        params['UniqueCode'] = item1.package_code
        params['AllFilePath'] = `中转仓预报单条形码\\${item1.package_code}\\${item1.package_code}合并面单.PDF`
        params['DirectoryName'] = `中转仓预报单条形码\\${item1.package_code}`
        params['FileWidth'] = 220
        params['FileHeight'] = 250
        params['BarCodeList'] = []
        for (let j = 0; j < item1.home_stocking_forecast_sub.length; j++) {
          const item2 = item1.home_stocking_forecast_sub[j]
          if (!item2.sys_sku_id) {
            this.$refs.Logs.writeLog(`【${item1.package_code}】的商品SkuId【${item2.sku_id}】对应的系统商品ID为空`, false)
            continue
          }
          const obj = {
            BarCodeContent: [
              `物流单号:${item1.package_code}`,
              `采购单号:${item1.purchase_order_sn}`,
              `商品SkuId:${item2.sku_id}`,
              `商品数量:${item2.purchase_num}`,
              `系统SkuId:${item2.sys_sku_id}`,
              `商品名称:${item2.sku_spec}`
            ]
          }
          obj['BarCode'] = item2.sys_sku_id
          obj['BarCodeWidth'] = 200
          obj['BarCodeHeight'] = 50
          obj['FontSize'] = 11
          obj['FilePath'] = `中转仓预报单条形码\\${item1.package_code}\\${item2.sys_sku_id}.PDF`
          params['BarCodeList'].push(obj)
        }
        const res = await this.StrockUpHome.downloadBarCode(params)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`【${item1.package_code}】条形码生成成功`, true)
        } else {
          this.$refs.Logs.writeLog(`【${item1.package_code}】条形码生成失败：${res.data}`, false)
        }
      }
      this.$refs.Logs.writeLog('批量生成条形码完成', true)
    },
    // SKU详情
    async getProductSkuList(row) {
      this.productSkuLoading = true
      const res = await this.StrockUpHome.getProductSkuList(row.product_id)
      if (res.code !== 200) {
        this.$message.error(res.data)
      }
      this.skuDetailsData = res.data
      this.skuDetailsData.map(item => {
        item.goods_name = row.product_name
      })
      this.productSkuLoading = false
      console.log('skuDetailsData', this.skuDetailsData)
    },
    // 自有商品导入
    itselfGoodsImport() {
      this.productFrom.CateId = 0
      this.productFrom.ProductName = ''
      this.productFrom.ProductId = ''
      this.productFrom.SkuId = ''
      this.productFrom.Status = '-1'

      this.foreignSku.packageCode = ''
      this.foreignSku.purchaseOrderSn = ''
      this.foreignSku.purchase_num = '0'
      this.foreignSku.long = '0'
      this.foreignSku.width = '0'
      this.foreignSku.height = '0'
      this.foreignSku.weight = '0'
      this.foreignSku.remark = ''

      this.productData = []
      this.goodsForeignData = []
      this.itselfGoodsVisible = true
      this.$nextTick(async() => {
        this.$refs.isClean.cleanData()
        // 获取产品中心数据
        await this.getProductList()
      })
    },
    // 查看详情
    getDetails(val) {
      this.detailsData = val.home_stocking_forecast_sub
      this.detailsData.map(item => {
        item.package_code = val.package_code
      })
    },

    // 批量导入Excel导入
    async batchImport() {
      const data = []
      this.excelForeignData = []
      this.foreignData = []
      const dataSum = this.importTemplateData.length
      if (dataSum <= 0) {
        this.$refs.Logs.writeLog('表格数据为空', false)
        this.showConsole = false
        return
      }
      this.$refs.Logs.writeLog('开始读取数据...', true)
      for (let index = 0; index < dataSum; index++) {
        const element = this.importTemplateData[index]
        const packageCode = element['物流单号(必填：多个SKU可对应同一物流单号)']
        const purchaseOrderSn = element['采购单号(必填)']
        const sku_id = element['商品编号(sku)(必填：只能填字母或数字)']
        const goods_name = element['商品名称(必填：中文)']
        const purchase_num = element['商品数量(必填)']
        const sku_price = element['商品单价(RMB)(必填)']
        const sku_name = element['规格名称(必填)(规格、尺寸)']
        const sku_spec = element['商品规格(必填)']
        const long = element['长(cm)(必填)']
        const width = element['宽(cm)(必填)']
        const height = element['高(cm)(必填)']
        const weight = element['重量(g)(必填)']
        const sku_image = element['商品图片链接(请填写url地址)']
        const goods_url = element['商品链接(请填写url地址)']
        const remark = element['备注(同一物流单号只需填写一次，取第一次填写的备注)']
        if (!packageCode) {
          this.$refs.Logs.writeLog(`【${index + 1}】物流单号为空`, false)
          continue
        }
        if (!purchaseOrderSn) {
          this.$refs.Logs.writeLog(`【${index + 1}】采购单号为空`, false)
          continue
        }
        if (!sku_id) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品编号(sku)为空`, false)
          continue
        }
        if (!goods_name) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品名称为空`, false)
          continue
        }
        if (!purchase_num) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品数量为空`, false)
          continue
        }
        if (!sku_price) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品单价(RMB)为空`, false)
          continue
        }
        if (!sku_name) {
          this.$refs.Logs.writeLog(`【${index + 1}】规格名称为空`, false)
          continue
        }
        if (!sku_spec) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品规格为空`, false)
          continue
        }
        if (long === '') {
          this.$refs.Logs.writeLog(`【${index + 1}】长(cm)为空`, false)
          continue
        }
        if (width === '') {
          this.$refs.Logs.writeLog(`【${index + 1}】宽(cm)为空`, false)
          continue
        }
        if (height === '') {
          this.$refs.Logs.writeLog(`【${index + 1}】高(cm)为空`, false)
          continue
        }
        if (weight === '') {
          this.$refs.Logs.writeLog(`【${index + 1}】重量(g)为空`, false)
          continue
        }
        if (goods_url && goods_url.length > 255) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品链接过长`, false)
          continue
        }
        // const Regx = /^[\w ]+$/
        // if (!Regx.test(sku_id)) {
        //   this.$refs.Logs.writeLog(`【${index + 1}】商品编号(sku)只能填字母或数字`, false)
        //   continue
        // }
        const obj = {
          wid: this.foreignWid,
          purchaseOrderSn: purchaseOrderSn,
          packageCode: packageCode,
          remark: remark,
          skuList: [
            {
              sku_id: sku_id,
              goods_name: goods_name,
              goods_url: goods_url,
              sku_image: sku_image,
              sku_spec: sku_spec,
              sku_name: sku_name,
              sku_price: sku_price,
              long: long,
              width: width,
              height: height,
              weight: weight,
              purchase_num: purchase_num
            }
          ]
        }
        data.push(obj)
      }
      const cache = []
      for (const t of data) {
        const flag = cache.find(c => c.packageCode === t.packageCode && c.skuList[0].sku_id === t.skuList[0].sku_id)
        if (flag) {
          this.$refs.Logs.writeLog(`过滤重复物流订单号【${flag.packageCode}】,商品编号(SKU)【${flag.skuList[0].sku_id}】`, false)
          continue
        }
        cache.push(t)
        this.foreignData.push(t)
      }
      this.showConsole = false
      this.$refs.Logs.writeLog(`读取完毕`, true)
      this.stockingHomeUpload(this.excelForeignData)
    },
    // 表格导入
    importTemplate(file) {
      const files = { 0: file.raw }
      if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$refs.Logs.writeLog('格式错误,请上传xls、xlsx格式的文件', false)
        this.showConsole = false
        return
      }
      if (files.length <= 0) {
        this.$refs.Logs.writeLog('表格为空', false)
        this.showConsole = false
        return
      }
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        const data = ev.target.result
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        const wsname = workbook.SheetNames[0] // 取第一张表
        let ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成Json表格
        this.importTemplateData = ws
        this.batchImport()
        ws = null
        this.$refs.importRef.value = ''
      }
      fileReader.readAsBinaryString(files[0])
    },
    // 下载模板
    downloadTemplate() {
      const template = `<tr>
      <td style="width: 300px">物流单号<span style="color:red">(必填：多个SKU可对应同一物流单号)</span></td>
      <td style="width: 180px">采购单号<span style="color:red">(必填)</span></td>
      <td style="width: 300px">商品编号(sku)<span style="color:red">(必填：只能填字母或数字)</span></td>
      <td style="width: 180px">商品名称<span style="color:red">(必填：中文)</span></td>
      <td style="width: 100px">商品数量<span style="color:red">(必填)</span></td>
      <td style="width: 150px">商品单价(RMB)<span style="color:red">(必填)</span></td>
      <td style="width: 200px">规格名称<span style="color:red">(必填)(规格、尺寸)</span></td>
      <td style="width: 150px">商品规格<span style="color:red">(必填)</span></td>
      <td style="width: 100px">长(cm)<span style="color:red">(必填)</span></td>
      <td style="width: 100px">宽(cm)<span style="color:red">(必填)</span></td>
      <td style="width: 100px">高(cm)<span style="color:red">(必填)</span></td>
      <td style="width: 100px">重量(g)<span style="color:red">(必填)</span></td>
      <td style="width: 400px">商品图片链接<span style="color:red">(请填写url地址)</span></td>
      <td style="width: 400px">商品链接<span style="color:red">(请填写url地址)</span></td>
      <td style="width: 380px">备注<span style="color:red">(同一物流单号只需填写一次，取第一次填写的备注)</span></td>
      </tr>
      <tr>
        <td>ZT0001</td>
        <td>SF123555</td>
        <td>TH135648</td>
        <td>波司登极寒系列羽绒服</td>
        <td>1</td>
        <td>20</td>
        <td>规格</td>
        <td>红色,L</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td>100</td>
        <td>https://img.alicdn.com/imgextra/i4/196993935/O1CN01BO1VFm1ewH8WsD5ms_!!196993935.jpg</td>
        <td>https://detail.tmall.com/item.htm?id=558418048450</td>
      </tr>
      `
      exportExcelDataCommon('中转仓备报模板', template)
    },
    // 导出勾选数据
    exportTickData() {
      if (!this.foreignSelection?.length) return this.$message('请选择需要导出的数据')
      let str = `<tr>
          <td>预报物流单号</td>
          <td>采购单号</td>
          <td>商品编号(SKU)</td>
          <td>商品名称</td>
          <td>商品数量</td>
          <td>商品单价(RMB)</td>
          <td>商品规格</td>
          <td>商品图片</td>
          <td>商品链接</td>
          <td>备注</td>
          <td>操作状态</td>
        </td>`
      this.foreignSelection.forEach(item => {
        str += `<tr>
        <td>${item.packageCode ? item.packageCode : '' + '\t'}</td>
        <td>${item.purchaseOrderSn ? item.purchaseOrderSn : '' + '\t'}</td>
        <td>${item.skuList[0].sku_id ? item.skuList[0].sku_id : '' + '\t'}</td>
        <td>${item.skuList[0].goods_name ? item.skuList[0].goods_name : '' + '\t'}</td>
        <td>${item.skuList[0].purchase_num ? item.skuList[0].purchase_num : '' + '\t'}</td>
        <td>${item.skuList[0].sku_price ? item.skuList[0].sku_price : '' + '\t'}</td>
        <td>${item.skuList[0].sku_spec ? item.skuList[0].sku_spec : '' + '\t'}</td>
        <td>${item.skuList[0].sku_image ? item.skuList[0].sku_image : '' + '\t'}</td>
        <td>${item.skuList[0].goods_url ? item.skuList[0].goods_url : '' + '\t'}</td>
        <td>${item.remark ? item.remark : '' + '\t'}</td>
        <td>${item.status ? item.status : '' + '\t'}</td>
        </tr>`
      })
      exportExcelDataCommon('预报中转仓备货商品数据', str)
    },
    // 导出数据
    async exportTableData() {
      if (this.total === 0) return this.$message('暂无导出数据')
      this.isShowLoading = true
      const exportData = []
      let resData = []
      const params = this.form
      params.pageSize = 200
      params.page = 1
      while (resData.length < this.total) {
        const res = await this.StrockUpHome.getHomeWarehouse(params)
        if (res.code === 200) {
          resData = resData.concat(res.data.data)
          params.page++
        } else {
          this.$refs.Logs.writeLog('导出数据错误', res.data)
          this.isShowLoading = false
          break
        }
      }
      resData.forEach(item => {
        item.home_stocking_forecast_sub.forEach(skuItem => {
          const obj = {}
          obj['package_code'] = item.package_code
          obj['purchase_order_sn'] = item.purchase_order_sn
          obj['warehouse_name'] = item.warehouse_address.warehouse_name
          obj['created_at'] = item.created_at
          obj['purchase_num'] = skuItem.purchase_num
          obj['sign_num'] = skuItem.sign_num
          obj['remark'] = item.remark
          obj['status'] = skuItem.status
          obj['sku_id'] = skuItem.sku_id
          obj['sign_time'] = skuItem.sign_time
          obj['goods_name'] = skuItem.goods_name
          obj['sku_spec'] = skuItem.sku_spec
          obj['sku_image'] = skuItem.sku_image
          obj['goods_url'] = skuItem.goods_url
          exportData.push(obj)
        })
      })
      let str = `<tr>
          <td>预报物流单号</td>
          <td>采购单号</td>
          <td>中转仓</td>
          <td>预报时间</td>
          <td>商品预购买数量</td>
          <td>商品签收数量</td>
          <td>备注</td>
          <td>商品状态</td>
          <td>商品编号(SKU)</td>
          <td>签收时间</td>
          <td>商品名称</td>
          <td>商品规格</td>
          <td>商品图片</td>
          <td>商品链接</td>
        </td>`
      exportData.forEach(item => {
        str += `<tr>
        <td>${item.package_code ? item.package_code : '' + '\t'}</td>
        <td>${item.purchase_order_sn ? item.purchase_order_sn : '' + '\t'}</td>
        <td>${item.warehouse_name ? item.warehouse_name : '' + '\t'}</td>
        <td>${item.created_at ? item.created_at : '' + '\t'}</td>
        <td>${item.purchase_num ? item.purchase_num : '' + '\t'}</td>
        <td>${item.sign_num ? item.sign_num : '' + '\t'}</td>
        <td>${item.remark ? item.remark : '' + '\t'}</td>
        <td>${item.status ? this.skuStatusObj[item.status] : '' + '\t'}</td>
        <td>${item.sku_id ? item.sku_id : '' + '\t'}</td>
        <td>${item.sign_time ? item.sign_time : '' + '\t'}</td>
        <td>${item.goods_name ? item.goods_name : '' + '\t'}</td>
        <td>${item.sku_spec ? item.sku_spec : '' + '\t'}</td>
        <td>${item.sku_image ? item.sku_image : '' + '\t'}</td>
        <td>${item.goods_url ? item.goods_url : '' + '\t'}</td>
        </tr>`
      })
      this.isShowLoading = false
      exportExcelDataCommon('国内仓预报单数据', str)
    },
    foreignClose(done) {
      if (this.isforeignClose) return this.$message('正在发起商品预报,请勿关闭')
      done()
      this.getHomeWarehouse()
      this.foreignData = []
      this.init()
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getHomeWarehouse()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getHomeWarehouse()
    },
    productSizeChange(val) {
      this.productPage = 1
      this.productPageSize = val
      this.getProductList()
    },
    productCurrentChange(val) {
      this.productPage = val
      this.getProductList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    foreignSelectionChange(val) {
      this.foreignSelection = val
    },
    skuDetailsSelectionChange(val) {
      this.skuDetailsSelection = val
    },
    CateId(val) {
      this.productFrom.CateId = val
    },
    cleanProductFrom() {
      this.productFrom.ProductName = ''
      this.productFrom.ProductId = ''
      this.productFrom.SkuId = ''
      this.$refs.isClean.cleanData()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/strock-up-home.less';
</style>

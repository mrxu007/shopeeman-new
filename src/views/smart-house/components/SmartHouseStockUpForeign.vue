<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>预报时间：</span>
          <el-date-picker
            v-model="form.created_time"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
        <li>
          <span>签收时间：</span>
          <el-date-picker
            v-model="form.sign_Time"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
        <li>
          <span>中转仓：</span>
          <el-select
            v-model="form.wid"

            size="mini"
            filterable
            @change="
              form.oversea_wid = ''
              widCollect(1)"
          >
            <el-option
              v-for="(item, index) in widList"
              :key="index"
              :label="item.warehouse_name"
              :value="item.id"
            />
          </el-select>
        </li>
        <li>
          <span>海外仓：</span>
          <el-select
            v-model="form.oversea_wid"

            size="mini"
            filterable
          >
            <el-option
              v-for="(item, index) in overseaWidList"
              :key="index"
              :label="item.warehouse_name"
              :value="item.id"
            />
          </el-select>
        </li>
        <li>
          <span>是否审核：</span>
          <el-select
            v-model="form.is_verify"

            size="mini"
            filterable
          >
            <el-option
              label="全部"
              :value="''"
            />
            <el-option
              v-for="(item, index) in isVerifyList"
              :key="index"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </li>
      </ul>
      <ul style="margin-bottom: 10px">
        <li>
          <span>入库时间：</span>
          <el-date-picker
            v-model="form.store_time"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
        <li>
          <span>物流单号：</span>
          <el-input
            v-model="form.package_code"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span style="width:121px;text-align:right">海外仓单号：</span>
          <el-input
            v-model="form.forecast_code"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <el-button
            type="primary"
            size="mini"
            @click="
              page =1
              getStockingForecastLists()"
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
            @click="deleteForecast(multipleSelection,2)"
          >批量删除</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="exportTableData"
          >导出数据</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="downTutorial"
          >海外仓商品预报教程下载</el-button>
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
          width="130"
          align="center"
          fixed
        />
        <el-table-column
          prop="forecast_code"
          label="海外仓单号"
          width="150"
          align="center"
        />
        <el-table-column
          prop="warehouse_name"
          label="中转仓"
          align="center"
          width="150"
        />
        <el-table-column
          prop="oversea_warehouse_name"
          label="海外仓"
          align="center"
          width="130"
        />
        <el-table-column
          prop="status"
          label="预报单状态"
          align="center"
          width="120"
        >
          <template slot-scope="{row}">
            {{ statusObj[row.status]?statusObj[row.status]:'已拦截(其他原因)' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="预报时间"
          align="center"
          width="140"
        />
        <el-table-column
          label="签收时间"
          align="center"
          width="140"
        >
          <template slot-scope="{row}">
            {{ row.sign_time }}
          </template>
        </el-table-column>
        <el-table-column
          prop="store_time"
          label="中转仓入库时间"
          align="center"
          width="140"
        />
        <el-table-column
          prop="goods_total"
          label="商品总量"
          align="center"
          width="100"
        />
        <el-table-column
          prop="goods_price_total"
          label="商品总价"
          align="center"
          width="100"
        >
          <template v-slot="{row}">
            {{ row.goods_price_total ? parseFloat(row.goods_price_total).toFixed(2):'' }}
          </template>
        </el-table-column>
        <el-table-column
          label="商品详情"
          align="center"
          width="130"
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
          width="95"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              @click="deleteForecast(row,1)"
            >删 除</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="运输方式"
          align="center"
          width="90"
        >
          <template slot-scope="{row}">
            {{ shipTypeObj[row.ship_type] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="is_verify"
          label="审核状态"
          align="center"
          width="90"
        >
          <template slot-scope="{row}">
            <span :style="colorObj[row.is_verify] && 'color:'+colorObj[row.is_verify]">{{ row.is_verify ?isVerifyObj[row.is_verify]:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="verify_remark"
          label="审核备注"
          align="center"
          width="140"
          show-overflow-tooltip
        />
        <el-table-column
          label="增值服务(贴单/质检)"
          align="center"
          width="150"
        >
          <template slot-scope="{row}">
            {{ `${row.is_wainscot?servicebj[row.is_wainscot]:''}/${row.is_checked?servicebj[row.is_checked]:''}` }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
          width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="warehouse_remark"
          label="仓库备注"
          align="center"
          width="140"
          show-overflow-tooltip
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
          width="130"
          align="center"
          label="预报物流单号"
          prop="package_code"
          show-overflow-tooltip
          fixed
        />
        <el-table-column
          width="120"
          align="center"
          label="商品状态"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.status?skuStatusObj[row.status]:'' }}
          </template>
        </el-table-column>
        <el-table-column
          width="140"
          align="center"
          label="商品编号(SKU)"
          show-overflow-tooltip
          prop="sku_id"
        />
        <el-table-column
          width="130"
          align="center"
          label="系统商品编码"
          prop="sys_sku_id"
          show-overflow-tooltip
        />
        <el-table-column
          width="150"
          align="center"
          label="签收时间"
          prop="sign_time"
        />
        <el-table-column
          width="150"
          align="center"
          label="中转仓入库时间"
          prop="store_time"
        />
        <el-table-column
          width="150"
          align="center"
          label="商品名称"
          prop="goods_name"
          show-overflow-tooltip
        />
        <el-table-column
          width="80"
          align="center"
          label="商品数量"
          prop="sku_num"
        />
        <el-table-column
          width="120"
          align="center"
          label="商品单价(RMB)"
          prop="sku_price"
        />
        <el-table-column
          width="120"
          align="center"
          label="商品规格"
          prop="sku_name"
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
              v-if="row.sku_url"
              type="primary"
              size="mini"
              @click="openUrl(row.sku_url)"
            >商品链接</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 发起预报弹窗 -->
    <el-dialog
      class="foreign-dialog"
      title="预报海外仓备货商品"
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
                @change="
                  foreignOverseaWid = ''
                  widCollect(2)"
              >
                <el-option
                  v-for="(item, index) in widList"
                  :key="index"
                  :label="item.warehouse_name"
                  :value="item.id"
                />
              </el-select>
            </li>
            <li>
              <span>目的仓库：</span>
              <el-select
                v-model="foreignOverseaWid"
                size="mini"
                filterable
              >
                <el-option
                  v-for="(item, index) in foreignOverseaWidList"
                  :key="index"
                  :label="item.warehouse_name"
                  :value="item.id"
                />
              </el-select>
            </li>
          </ul>
          <ul>
            <li>
              <el-button
                type="primary"
                size="mini"
                @click="itselfGoodsImport"
              >自有商品导入</el-button>
              <el-upload ref="importRef" :disabled="isforeignClose" style="margin:0 10px" accept=".xls,.xlsx" action="https://jsonplaceholder.typicode.com/posts/" :on-change="importTemplate" :show-file-list="false" :auto-upload="false">
                <el-button
                  :disabled="isforeignClose"
                  :data="importTemplateData"
                  size="mini"
                  type="primary"
                > 批量Excel导入 </el-button>
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
        <div class="wid-info">
          <p>
            {{ `${widInfo.warehouse_name?widInfo.warehouse_name:''}` }}
          </p>
          <p>
            <!-- <el-tooltip class="item" effect="dark" :content="widInfo.full_address" placement="top">
              <p class="address">{{ `地址：${widInfo.full_address}` }}</p>
            </el-tooltip> -->
            {{ `地址：${widInfo.full_address?widInfo.full_address:''}` }}
          </p>
          <p>
            {{ `收件人：${widInfo.receiving_name?widInfo.receiving_name:''}` }}
          </p>
          <p>
            {{ `联系电话：${widInfo.receiving_tel?widInfo.receiving_tel:''}` }}
          </p>
        </div>
      </div>
      <span style="color:red">
        提示：1：应仓库要求，预报单中需包含商品的体积(长宽高)，需下载最新版的预报模板
        &nbsp;&nbsp;&nbsp;&nbsp;2：导入商品会导入到对应的中转仓库和目的仓库，请选择好再导入
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
          width="130"
          align="center"
          label="预报物流单号"
          prop="package_code"
          show-overflow-tooltip
          fixed
        />
        <el-table-column
          width="120"
          align="center"
          show-overflow-tooltip
          label="商品编号(SKU)"
          prop="sku_id"
        >
          <template slot-scope="{row}">
            {{ row.sku_list[0].sku_id }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品名称"
          show-overflow-tooltip
          prop="goods_name"
        >
          <template slot-scope="{row}">
            {{ row.sku_list[0].goods_name }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="商品数量"
          prop="sku_num"
        >
          <template slot-scope="{row}">
            {{ row.sku_list[0].sku_num }}
          </template>
        </el-table-column>
        <el-table-column
          width="110"
          align="center"
          label="商品单价(RMB)"
          prop="sku_price"
        >
          <template slot-scope="{row}">
            {{ row.sku_list[0].sku_price }}
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          align="center"
          label="商品规格"
          prop="sku_name"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.sku_list[0].sku_name }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.sku_list[0].sku_image"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  :src="row.sku_list[0].sku_image"
                  style="width: 400px; height: 400px"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.sku_list[0].sku_image"
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
              v-if="row.sku_list[0].sku_url"
              type="primary"
              size="mini"
              @click="openUrl(row.sku_list[0].sku_url)"
            >商品链接</el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          align="center"
          label="运输方式"
        >
          <template slot-scope="{row}">
            {{ shipTypeObj[row.ship_type]?shipTypeObj[row.ship_type]:row.ship_type }}
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
                      v-model="foreignSku.package_code"
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>商品数量：</span>
                    <el-input
                      v-model="foreignSku.sku_num"
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>运输方式：</span>
                    <el-select
                      v-model="foreignSku.ship_type"
                      size="mini"
                      filterable
                    >
                      <el-option
                        v-for="(item, index) in shipTypeList"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </li>
                </ul>
                <ul>
                  <li class="goods-volume">
                    <span>商品体积：</span>
                    <el-input
                      v-model="foreignSku.sku_long"
                      size="mini"
                      style="padding:0px"
                      oninput="value=value.replace(/\s+/g,'')"
                    />*
                    <el-input
                      v-model="foreignSku.sku_width"
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />*
                    <el-input
                      v-model="foreignSku.sku_height"
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>贴单服务：</span>
                    <el-select
                      v-model="foreignSku.is_wainscot"
                      size="mini"
                      filterable
                    >
                      <el-option
                        v-for="(item, index) in serviceList"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </li>
                  <li>
                    <span style="width:81px;text-align:right;">质检服务：</span>
                    <el-select
                      v-model="foreignSku.is_checked"
                      size="mini"
                      filterable
                    >
                      <el-option
                        v-for="(item, index) in serviceList"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
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
                width="450"
                align="center"
                label="基本设置"
              >
                <template slot-scope="scope">
                  <div style="display:flex;">
                    <el-form label-position="right" label-width="80px">
                      <el-form-item label="备注:">
                        <el-input
                          v-model="skuList.remark[scope.$index]"
                          size="mini"
                          oninput="value=value.replace(/\s+/g,'')"
                        />
                      </el-form-item>
                      <el-form-item label="体积:">
                        <el-input
                          v-model="skuList.sku_long[scope.$index]"
                          size="mini"
                          class="volume"
                          oninput="value=value.replace(/\s+/g,'')"
                        />*
                        <el-input
                          v-model="skuList.sku_width[scope.$index]"
                          size="mini"
                          class="volume"
                          oninput="value=value.replace(/\s+/g,'')"
                        />*
                        <el-input
                          v-model="skuList.sku_height[scope.$index]"
                          size="mini"
                          class="volume"
                          oninput="value=value.replace(/\s+/g,'')"
                        />
                      </el-form-item>
                      <el-form-item label="物流单号:">
                        <el-input
                          v-model="skuList.package_code[scope.$index]"
                          size="mini"
                          oninput="value=value.replace(/\s+/g,'')"
                        />
                      </el-form-item>
                    </el-form>
                    <el-form label-position="right" label-width="80px">
                      <el-form-item label="运输方式:">
                        <el-select
                          v-model="skuList.ship_type[scope.$index]"
                          size="mini"
                          filterable
                        >
                          <el-option
                            v-for="(item, index) in shipTypeList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="贴单服务:">
                        <el-select
                          v-model="skuList.is_wainscot[scope.$index]"
                          size="mini"
                          filterable
                        >
                          <el-option
                            v-for="(item, index) in serviceList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="质检服务:">
                        <el-select
                          v-model="skuList.is_checked[scope.$index]"
                          size="mini"
                          filterable
                        >
                          <el-option
                            v-for="(item, index) in serviceList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                align="center"
                label="Sku库存"
                prop="stock"
              />
              <el-table-column
                width="120"
                align="center"
                label="Sku数量"
                prop="ship_type"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="skuList.sku_num[scope.$index]"
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
      width="620px"
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
import StrockUpForegin from '../../../module-api/smart-house-api/strock-up-foreign'
import { exportExcelDataCommon } from '../../../util/util'
import ProductChoose from '../../../components/product-choose.vue'
import XLSX from 'xlsx'
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
      StrockUpForegin: new StrockUpForegin(this),

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
      foreignWid: '', // 预报海外仓备货商品中转仓id
      foreignOverseaWid: '', // 预报海外仓备货商品目的仓id
      widInfo: {}, // 中转仓数据
      productData: [], // 产品中心数据
      excelForeignData: [], // 表格导入的预报单上传数据
      goodsForeignData: [], // 自有商品导入的预报单上传数据
      skuDetailsData: [], // 选择需要预报的SKU详情数据

      skuList: {
        remark: [],
        sku_long: [],
        sku_width: [],
        sku_height: [],
        package_code: [],
        ship_type: [],
        is_wainscot: [],
        is_checked: [],
        sku_num: []
      },
      form: { // 条件搜索
        wid: '', // 中转仓id
        oversea_wid: '', // 海外仓id
        package_code: '', // 物流单号
        forecast_code: '', // 海外仓单号
        created_time: '', // 预报时间
        sign_Time: '', // 签收时间
        store_time: '', // 入库时间
        is_verify: '' // 是否审核 -1: 未审核 1:审核成功 2:审核失败
      },
      foreignSku: { // 预报SKU
        package_code: '', // 物流单号
        sku_num: '0', // 商品数量
        ship_type: '1', // 运输方式
        sku_long: '0', // 长
        sku_width: '0', // 宽
        sku_height: '0', // 高
        is_wainscot: '1', // 贴单服务
        is_checked: '1', // 质检服务
        remark: ''// 备注
      },
      productFrom: { // 产品中心条件搜索
        CateId: 0, // 类目ID
        ProductName: '', // 商品名称
        ProductId: '', // 商品编码
        SkuId: '', // SKU编码
        Status: '-1' // 商品状态
      },
      statusObj: {
        1: '用户已下单',
        2: '预报单已签收'
      },
      shipTypeObj: {
        1: '陆运',
        2: '海运',
        3: '空运'
      },
      shipTypeNameObj: {
        '陆运': 1,
        '海运': 2
      },
      isVerifyObj: {
        '-1': '未审核',
        '1': '审核成功',
        '2': '审核失败'
      },
      colorObj: {
        1: 'green',
        2: 'red'
      },
      skuStatusObj: {
        1: '用户已下单',
        2: '签收',
        3: '称重入库',
        4: '商品sku_id与大包号已绑定',
        5: '商品sku_id与大包号已合包',
        6: '打印发票',
        7: '大包已出库',
        8: '海外仓已签收',
        9: '海外仓已入库',
        10: '海外仓已上架'
      },
      isYnObj: {
        '是': '1',
        '否': '-1'
      },
      servicebj: {
        '1': '是',
        '-1': '否'
      },
      widList: [], // 中转仓/目的仓库
      overseaWidList: [], // 海外
      foreignOverseaWidList: [], // 目的仓库
      isVerifyList: [ // 是否审核
        {
          value: '-1',
          name: '未审核'
        },
        {
          value: '1',
          name: '审核成功'
        },
        {
          value: '2',
          name: '审核失败'
        }
      ],
      shipTypeList: [// 运输方式
        {
          value: '1',
          name: '陆运'
        },
        {
          value: '2',
          name: '海运'
        }
      ],
      serviceList: [// 质检,贴单服务
        {
          value: '1',
          name: '是'
        },
        {
          value: '-1',
          name: '否'
        }
      ]
    }
  },
  async mounted() {
    this.form.created_time = [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()]
    // 获取中转仓库和目的仓库列表(海外仓备货)
    await this.getOverseasWarehouse()
    // 获取数据
    await this.getStockingForecastLists()
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
    async getStockingForecastLists() {
      this.isShowLoading = true
      this.form.page = this.page
      this.form.pageSize = this.pageSize
      const res = await this.StrockUpForegin.getStockingForecastLists(this.form)
      if (res.code === 200) {
        this.total = res.data.total
        this.tableData = res.data.data
        this.tableData.map(item => {
          let goods_total = 0
          let goods_price_total = 0
          item.sku_list.forEach(skuItem => {
            goods_total += skuItem.sku_num ? skuItem.sku_num : 0
            goods_price_total += skuItem.sku_price ? skuItem.sku_price * skuItem.sku_num : 0
          })
          item.goods_total = goods_total
          item.goods_price_total = goods_price_total
        })
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(`${res.data}`)
      }
      this.isShowLoading = false
    },
    // 删除/批量删除预报单
    async deleteForecast(val, type) {
      const data = []
      if (type === 1) {
        data.push(val.forecast_code)
      } else {
        if (val.length === 0) return this.$message('请先选择需要删除的数据')
        this.isDeleteLoading = true
        val.forEach(item => {
          data.push(item.forecast_code)
        })
      }
      this.delForecast(data)
    },
    delForecast(data) {
      data.forEach(async item => {
        const res = await this.StrockUpForegin.deleteForecast(item)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`单号【${item}】:删除成功`, true)
          this.tableData.splice(this.tableData.findIndex(tItem => tItem.forecast_code === item), 1)
        } else {
          this.$refs.Logs.writeLog(`单号【${item}】:${res.data}`, false)
        }
      })
      this.showConsole = false
      this.isDeleteLoading = false
    },
    // 下载教程
    downTutorial() {
      window.open('https://shopeeman.oss-cn-shenzhen.aliyuncs.com/files/shopeemanFiles/appFiles/20211111/20211111141313618cb47981eb1.pdf')
    },
    // 获取中转仓库和目的仓库列表(海外仓备货)
    async getOverseasWarehouse() {
      const res = await this.StrockUpForegin.getOverseasWarehouse()
      if (res.code === 200) {
        this.widList = res.data
        this.init()
      } else {
        this.$message.error(`${res.data}`)
      }
    },
    // 中转仓change事件
    widCollect(type) {
      let childList = []
      let widInfo = {}
      if (type === 1) {
        this.widList.map(item => {
          if (item.id === this.form.wid) {
            childList = item.child
          }
        })
        this.overseaWidList = childList
        this.form.oversea_wid = childList[0].id
      } else {
        this.widList.map(item => {
          if (item.id === this.foreignWid) {
            childList = item.child
            widInfo = item
          }
        })
        this.widInfo = widInfo
        this.foreignOverseaWidList = childList
        this.foreignOverseaWid = childList[0].id
      }
    },
    // 初始仓库
    init() {
      this.form.wid = this.widList[0].id
      this.form.oversea_wid = this.widList[0].child[0].id
      this.overseaWidList = this.widList[0].child
      this.foreignWid = this.widList[0].id
      this.foreignOverseaWid = this.widList[0].child[0].id
      this.foreignOverseaWidList = this.widList[0].child
      this.widInfo = this.widList[0]
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
        this.skuList.sku_long[index] = '0'
        this.skuList.sku_width[index] = '0'
        this.skuList.sku_height[index] = '0'
        this.skuList.ship_type[index] = '1'
        this.skuList.is_wainscot[index] = '1'
        this.skuList.is_checked[index] = '1'
        this.skuList.sku_num[index] = '1'
        this.skuList.package_code[index] = ''
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
      const res = await this.StrockUpForegin.getProductList(this.productFrom)
      if (res.code !== 200) {
        this.$message.error(res.data)
      }
      this.productTotal = res.data.total
      this.productData = res.data.data
      this.productLoading = false
      console.log('productData', this.productData)
    },
    // 发起商品预报
    async stockingForecastUpload() {
      this.isforeignClose = true
      console.log(this.foreignData)
      const copyData = JSON.parse(JSON.stringify(this.foreignData))
      copyData.forEach(item => {
        const result = this.excelForeignData.findIndex(i => { return item.package_code === i.package_code })
        if (result !== -1) {
          this.excelForeignData[result].sku_list.push(item.sku_list[0])
        } else {
          this.excelForeignData.push(item)
        }
      })
      for (let index = 0; index < this.excelForeignData.length; index++) {
        const element = this.excelForeignData[index]
        element.is_wainscot = this.isYnObj[element.is_wainscot] ? this.isYnObj[element.is_wainscot] : element.is_wainscot
        element.is_checked = this.isYnObj[element.is_checked] ? this.isYnObj[element.is_checked] : element.is_checked
        element.ship_type = this.shipTypeNameObj[element.ship_type] ? this.shipTypeNameObj[element.ship_type] : element.ship_type
        const res = await this.StrockUpForegin.stockingForecastUpload(element)
        if (res.code === 200) {
          this.foreignData.map(item => {
            if (item.package_code === element.package_code) {
              this.$set(item, 'status', '预报成功')
              this.$set(item, 'color', 'green')
            }
          })
        } else {
          this.foreignData.map(item => {
            if (item.package_code === element.package_code) {
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
        return this.skuList.package_code[index] === ''
      })
      if (isNull) return this.$message('请先【设置】sku的其他信息')
      this.excelForeignData = []
      this.goodsForeignData.map((item, index) => {
        const obj = {
          wid: this.foreignWid,
          oversea_wid: this.foreignOverseaWid,
          package_code: this.skuList.package_code[index],
          is_wainscot: this.skuList.is_wainscot[index],
          is_checked: this.skuList.is_checked[index],
          ship_type: this.skuList.ship_type[index],
          remark: this.skuList.remark[index],
          sku_list: [
            {
              sku_id: item.sku_id,
              goods_name: item.goods_name,
              sku_num: this.skuList.sku_num[index],
              sku_price: item.price,
              sku_name: item.sku_name,
              sku_long: this.skuList.sku_long[index],
              sku_width: this.skuList.sku_width[index],
              sku_height: this.skuList.sku_height[index],
              sku_image: item.image_url,
              sku_url: item.purchase_goods_url
            }
          ]
        }
        this.foreignData.push(obj)
      })
      this.stockingForecastUpload()
      this.itselfGoodsVisible = false
    },
    // 预报SKU批量设置
    batchSetUp() {
      if (!this.foreignSku.package_code) return this.$message('物流单号不能为空')
      if (!this.foreignSku.sku_num || Number(this.foreignSku.sku_num) <= 0) return this.$message('商品数量不能小于或等于0')
      if (!this.foreignSku.sku_long || Number(this.foreignSku.sku_long) <= 0) return this.$message('商品长度不能小于或等于0')
      if (!this.foreignSku.sku_width || Number(this.foreignSku.sku_width) <= 0) return this.$message('商品宽度不能小于或等于0')
      if (!this.foreignSku.sku_height || Number(this.foreignSku.sku_height) <= 0) return this.$message('商品高度不能小于或等于0')
      this.$confirm('是否覆盖已单独设置的选项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.goodsForeignData.map((item, index) => {
          this.skuList.sku_long[index] = this.foreignSku.sku_long
          this.skuList.sku_width[index] = this.foreignSku.sku_width
          this.skuList.sku_height[index] = this.foreignSku.sku_height
          this.skuList.ship_type[index] = this.foreignSku.ship_type
          this.skuList.is_wainscot[index] = this.foreignSku.is_wainscot
          this.skuList.is_checked[index] = this.foreignSku.is_checked
          this.skuList.sku_num[index] = this.foreignSku.sku_num
          this.skuList.package_code[index] = this.foreignSku.package_code
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
        params['AllFilePath'] = `海外仓预报单条形码\\${item1.package_code}\\${item1.package_code}合并面单.PDF`
        params['DirectoryName'] = `海外仓预报单条形码\\${item1.package_code}`
        params['FileWidth'] = 220
        params['FileHeight'] = 250
        params['BarCodeList'] = []
        for (let j = 0; j < item1.sku_list.length; j++) {
          const item2 = item1.sku_list[j]
          if (!item2.sys_sku_id) {
            this.$refs.Logs.writeLog(`【${item1.package_code}】的商品SkuId【${item2.sku_id}】对应的系统商品ID为空`, false)
            continue
          }
          const obj = {
            BarCodeContent: [
              `物流单号:${item1.package_code}`,
              `预报单号:${item1.forecast_code}`,
              `商品SkuId:${item2.sku_id}`,
              `商品数量:${item2.sku_num}`,
              `系统SkuId:${item2.sys_sku_id}`,
              `商品名称:${item2.sku_name}`
            ]
          }
          obj['BarCode'] = item2.sys_sku_id
          obj['BarCodeWidth'] = 200
          obj['BarCodeHeight'] = 50
          obj['FontSize'] = 11
          obj['FilePath'] = `海外仓预报单条形码\\${item1.package_code}\\${item2.sys_sku_id}.PDF`
          params['BarCodeList'].push(obj)
        }
        const res = await this.StrockUpForegin.downloadBarCode(params)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`【${item1.package_code}】条形码生成完成`, true)
        } else {
          this.$refs.Logs.writeLog(`【${item1.package_code}】条形码生成失败：${res.data}`, false)
        }
      }
      this.$refs.Logs.writeLog('批量生成条形码完成', true)
    },
    // SKU详情
    async getProductSkuList(row) {
      this.productSkuLoading = true
      const res = await this.StrockUpForegin.getProductSkuList(row.product_id)
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
    // 仓库选择提示
    // warehouseTips() {
    //   let warehouseName = ''
    //   let childName = ''
    //   this.widList.map(item => {
    //     if (item.id === this.foreignWid) {
    //       warehouseName = item.warehouse_name
    //     }
    //   })
    //   this.foreignOverseaWidList.map(item => {
    //     if (item.id === this.foreignOverseaWid) {
    //       childName = item.warehouse_name
    //     }
    //   })
    //   return { warehouseName, childName }
    // },
    // 自有商品导入
    async itselfGoodsImport() {
      this.productFrom.CateId = 0
      this.productFrom.ProductName = ''
      this.productFrom.ProductId = ''
      this.productFrom.SkuId = ''
      this.productFrom.Status = '-1'

      this.foreignSku.package_code = ''
      this.foreignSku.sku_num = '0'
      this.foreignSku.ship_type = '1'
      this.foreignSku.sku_long = '0'
      this.foreignSku.sku_width = '0'
      this.foreignSku.sku_height = '0'
      this.foreignSku.is_wainscot = '1'
      this.foreignSku.is_checked = '1'
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
      this.detailsData = val.sku_list
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
        const package_code = element['物流单号(必填：多个SKU可对应同一物流单号)']
        const sku_id = element['商品编号(sku)(必填：只能填字母或数字)']
        const goods_name = element['商品名称(必填：中文)']
        const sku_num = element['商品数量(必填)']
        const sku_price = element['商品单价(RMB)(必填)']
        const sku_name = element['商品规格(必填)']
        const sku_long = element['长(cm)(必填)']
        const sku_width = element['宽(cm)(必填)']
        const sku_height = element['高(cm)(必填)']
        const sku_image = element['商品图片链接(请填写url地址)']
        const sku_url = element['商品链接(请填写url地址)']
        const is_wainscot = element['贴单服务(必填：填入是或否，同一物流单号取第一次填写的)']
        const is_checked = element['质检服务(必填：填入是或否，同一物流单号取第一次填写的)']
        const ship_type = element['运输方式(必填：填入陆运或海运，同一物流单号取第一次填写的)']
        const remark = element['备注(同一物流单号只需填写一次，取第一次填写的备注)']
        if (!package_code) {
          this.$refs.Logs.writeLog(`【${index + 1}】物流单号为空`, false)
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
        if (!sku_num) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品数量为空`, false)
          continue
        }
        if (!sku_price) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品单价(RMB)为空`, false)
          continue
        }
        if (!sku_name) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品规格为空`, false)
          continue
        }
        if (sku_long === '') {
          this.$refs.Logs.writeLog(`【${index + 1}】长(cm)为空`, false)
          continue
        }
        if (sku_width === '') {
          this.$refs.Logs.writeLog(`【${index + 1}】宽(cm)为空`, false)
          continue
        }
        if (sku_height === '') {
          this.$refs.Logs.writeLog(`【${index + 1}】高(cm)为空`, false)
          continue
        }
        if (!is_wainscot) {
          this.$refs.Logs.writeLog(`【${index + 1}】贴单服务为空`, false)
          continue
        }
        if (!is_checked) {
          this.$refs.Logs.writeLog(`【${index + 1}】质检服务为空`, false)
          continue
        }
        if (!ship_type) {
          this.$refs.Logs.writeLog(`【${index + 1}】运输方式为空`, false)
          continue
        }
        if (!this.isYnObj[is_wainscot]) {
          this.$refs.Logs.writeLog(`【${index + 1}】贴单服务未找到引用值`, false)
          continue
        }
        if (!this.isYnObj[is_checked]) {
          this.$refs.Logs.writeLog(`【${index + 1}】质检服务未找到引用值`, false)
          continue
        }
        if (!this.shipTypeNameObj[ship_type]) {
          this.$refs.Logs.writeLog(`【${index + 1}】运输方式未找到引用值`, false)
          continue
        }
        var Regx = /^[A-Za-z0-9]*$/
        if (!Regx.test(sku_id)) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品编号(sku)只能填字母或数字`, false)
          continue
        }
        const obj = {
          wid: this.foreignWid,
          oversea_wid: this.foreignOverseaWid,
          package_code: package_code,
          is_wainscot: is_wainscot,
          is_checked: is_checked,
          ship_type: ship_type,
          remark: remark,
          sku_list: [
            {
              sku_id: sku_id,
              goods_name: goods_name,
              sku_num: sku_num,
              sku_price: sku_price,
              sku_name: sku_name,
              sku_long: sku_long,
              sku_width: sku_width,
              sku_height: sku_height,
              sku_image: sku_image,
              sku_url: sku_url
            }
          ]
        }
        data.push(obj)
      }
      const cache = []
      for (const t of data) {
        const flag = cache.find(c => c.package_code === t.package_code && c.sku_list[0].sku_id === t.sku_list[0].sku_id)
        if (flag) {
          this.$refs.Logs.writeLog(`过滤重复物流订单号【${flag.package_code}】,商品编号(SKU)【${flag.sku_list[0].sku_id}】`, false)
          continue
        }
        cache.push(t)
        this.foreignData.push(t)
      }
      this.stockingForecastUpload()
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
      <td style="width: 300px">商品编号(sku)<span style="color:red">(必填：只能填字母或数字)</span></td>
      <td style="width: 180px">商品名称<span style="color:red">(必填：中文)</span></td>
      <td style="width: 100px">商品数量<span style="color:red">(必填)</span></td>
      <td style="width: 150px">商品单价(RMB)<span style="color:red">(必填)</span></td>
      <td style="width: 150px">商品规格<span style="color:red">(必填)</span></td>
      <td style="width: 100px">长(cm)<span style="color:red">(必填)</span></td>
      <td style="width: 100px">宽(cm)<span style="color:red">(必填)</span></td>
      <td style="width: 100px">高(cm)<span style="color:red">(必填)</span></td>
      <td style="width: 400px">商品图片链接<span style="color:red">(请填写url地址)</span></td>
      <td style="width: 400px">商品链接<span style="color:red">(请填写url地址)</span></td>
      <td style="width: 400px">贴单服务<span style="color:red">(必填：填入是或否，同一物流单号取第一次填写的)</span></td>
      <td style="width: 400px">质检服务<span style="color:red">(必填：填入是或否，同一物流单号取第一次填写的)</span></td>
      <td style="width: 390px">运输方式<span style="color:red">(必填：填入陆运或海运，同一物流单号取第一次填写的)</span></td>
      <td style="width: 380px">备注<span style="color:red">(同一物流单号只需填写一次，取第一次填写的备注)</span></td>
      </tr>
      <tr>
        <td>ZT0001</td>
        <td>TH135648</td>
        <td>波司登极寒系列羽绒服</td>
        <td>1</td>
        <td>20</td>
        <td>红色,L</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td>https://img.alicdn.com/imgextra/i4/196993935/O1CN01BO1VFm1ewH8WsD5ms_!!196993935.jpg</td>
        <td>https://detail.tmall.com/item.htm?id=558418048450</td>
        <td>是</td>
        <td>是</td>
        <td>陆运</td>
      </tr>
      `
      exportExcelDataCommon('海外仓备货预报模板', template)
    },
    // 导出勾选数据
    exportTickData() {
      if (!this.foreignSelection?.length) return this.$message('请选择需要导出的数据')
      let str = `<tr>
          <td>预报物流单号</td>
          <td>商品编号(SKU)</td>
          <td>商品名称</td>
          <td>商品数量</td>
          <td>商品单价(RMB)</td>
          <td>商品规格</td>
          <td>商品图片</td>
          <td>商品链接</td>
          <td>运输方式</td>
          <td>备注</td>
          <td>操作状态</td>
        </td>`
      this.foreignSelection.forEach(item => {
        str += `<tr>
        <td>${item.package_code ? item.package_code : '' + '\t'}</td>
        <td>${item.sku_list[0].sku_id ? item.sku_list[0].sku_id : '' + '\t'}</td>
        <td>${item.sku_list[0].goods_name ? item.sku_list[0].goods_name : '' + '\t'}</td>
        <td>${item.sku_list[0].sku_num ? item.sku_list[0].sku_num : '' + '\t'}</td>
        <td>${item.sku_list[0].sku_price ? item.sku_list[0].sku_price : '' + '\t'}</td>
        <td>${item.sku_list[0].sku_name ? item.sku_list[0].sku_name : '' + '\t'}</td>
        <td>${item.sku_list[0].sku_image ? item.sku_list[0].sku_image : '' + '\t'}</td>
        <td>${item.sku_list[0].sku_url ? item.sku_list[0].sku_url : '' + '\t'}</td>
        <td>${this.shipTypeObj[item.ship_type] ? this.shipTypeObj[item.ship_type] : item.ship_type + '\t'}</td>
        <td>${item.remark ? item.remark : '' + '\t'}</td>
        <td>${item.status ? item.status : '' + '\t'}</td>
        </tr>`
      })
      exportExcelDataCommon('预报海外仓备货商品数据', str)
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
        const res = await this.StrockUpForegin.getStockingForecastLists(params)
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
        item.sku_list.forEach(skuItem => {
          const obj = {}
          obj['package_code'] = item.package_code
          obj['forecast_code'] = item.forecast_code
          obj['warehouse_name'] = item.warehouse_name
          obj['oversea_warehouse_name'] = item.oversea_warehouse_name
          obj['created_at'] = item.created_at
          obj['sign_time'] = item.sign_time
          obj['store_time'] = item.store_time
          obj['status'] = item.status
          obj['is_wainscot'] = item.is_wainscot
          obj['is_checked'] = item.is_checked
          obj['ship_type'] = item.ship_type
          obj['is_verify'] = item.is_verify
          obj['verify_remark'] = item.verify_remark
          obj['remark'] = item.remark
          obj['warehouse_remark'] = item.warehouse_remark
          obj['skuStatus'] = skuItem.status
          obj['sku_id'] = skuItem.sku_id
          obj['sys_sku_id'] = skuItem.sys_sku_id
          obj['goods_name'] = skuItem.goods_name
          obj['sku_num'] = skuItem.sku_num
          obj['sku_price'] = skuItem.sku_price
          obj['sku_name'] = skuItem.sku_name
          obj['sku_image'] = skuItem.sku_image
          obj['sku_url'] = skuItem.sku_url
          exportData.push(obj)
        })
      })
      let str = `<tr>
          <td>预报物流单号</td>
          <td>海外仓单号</td>
          <td>中转仓库</td>
          <td>海外仓库</td>
          <td>预报时间(RMB)</td>
          <td>签收时间</td>
          <td>中转仓入库时间</td>
          <td>预报单状态</td>
          <td>增值服务(贴单/质检)</td>
          <td>运输方式</td>
          <td>审核状态</td>
          <td>审核备注</td>
          <td>备注</td>
          <td>仓库备注</td>
          <td>商品状态</td>
          <td>商品编号(SKU)</td>
          <td>系统商品编码</td>
          <td>商品名称</td>
          <td>商品数量</td>
          <td>商品单价(RMB)</td>
          <td>商品规格</td>
          <td>商品图片</td>
          <td>商品链接</td>
        </td>`
      exportData.forEach(item => {
        str += `<tr>
        <td>${item.package_code ? item.package_code : '' + '\t'}</td>
        <td>${item.forecast_code ? item.forecast_code : '' + '\t'}</td>
        <td>${item.warehouse_name ? item.warehouse_name : '' + '\t'}</td>
        <td>${item.oversea_warehouse_name ? item.oversea_warehouse_name : '' + '\t'}</td>
        <td>${item.created_at ? item.created_at : '' + '\t'}</td>
        <td>${item.sign_time ? item.sign_time : '' + '\t'}</td>
        <td>${item.store_time ? item.store_time : '' + '\t'}</td>
        <td>${item.status ? this.statusObj[item.status] ? this.statusObj[item.status] : '已拦截(其他原因)' : '' + '\t'}</td>
        <td>${item.is_wainscot && item.is_checked ? this.servicebj[item.is_wainscot] + '/' + this.servicebj[item.is_checked] : '' + '\t'}</td>
        <td>${item.ship_type ? this.shipTypeObj[item.ship_type] : '' + '\t'}</td>
        <td>${item.is_verify ? this.isVerifyObj[item.is_verify] : '' + '\t'}</td>
        <td>${item.verify_remark ? item.verify_remark : '' + '\t'}</td>
        <td>${item.remark ? item.remark : '' + '\t'}</td>
        <td>${item.warehouse_remark ? item.warehouse_remark : '' + '\t'}</td>
        <td>${item.skuStatus ? this.skuStatusObj[item.skuStatus] ? this.skuStatusObj[item.skuStatus] : '' : '' + '\t'}</td>
        <td>${item.sku_id ? item.sku_id : '' + '\t'}</td>
        <td>${item.sys_sku_id ? item.sys_sku_id : '' + '\t'}</td>
        <td>${item.goods_name ? item.goods_name : '' + '\t'}</td>
        <td>${item.sku_num ? item.sku_num : '' + '\t'}</td>
        <td>${item.sku_price ? parseFloat(item.sku_price).toFixed(2) : '' + '\t'}</td>
        <td>${item.sku_name ? item.sku_name : '' + '\t'}</td>
        <td>${item.sku_image ? item.sku_image : '' + '\t'}</td>
        <td>${item.sku_url ? item.sku_url : '' + '\t'}</td>
        </tr>`
      })
      this.isShowLoading = false
      exportExcelDataCommon('海外仓预报单数据', str)
    },
    foreignClose(done) {
      if (this.isforeignClose) return this.$message('正在发起商品预报,请勿关闭')
      done()
      this.getStockingForecastLists()
      this.foreignData = []
      this.init()
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getStockingForecastLists()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getStockingForecastLists()
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
@import '../../../module-less/smart-house-less/strock-up-foreign.less';
</style>

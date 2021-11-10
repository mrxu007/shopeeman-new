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
            @click="deleteForecast(multipleSelection,2)"
          >批量删除</el-button>
          <el-button
            type="primary"
            size="mini"
          >导出数据</el-button>
          <el-button
            type="primary"
            size="mini"
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
        height="calc(100vh - 250px)"
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
          width="120"
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
          prop="wid"
          label="中转仓"
          align="center"
          width="120"
        />
        <el-table-column
          prop="oversea_wid"
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
        />
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
            {{ isVerifyObj[row.is_verify] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="verify_remark"
          label="审核备注"
          align="center"
          width="140"
        />
        <el-table-column
          prop=""
          label="增值服务(贴单/质检)"
          align="center"
          width="150"
        />
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
          width="140"
        />
        <el-table-column
          prop="warehouse_remark"
          label="仓库备注"
          align="center"
          width="140"
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
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table
        height="420"
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
          width="120"
          align="center"
          label="商品编号(SKU)"
          prop="sku_id"
        />
        <el-table-column
          width="130"
          align="center"
          label="系统商品编码"
          prop="sys_sku_id"
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
          width="100"
          align="center"
          label="商品名称"
          prop="goods_name"
        />
        <el-table-column
          width="80"
          align="center"
          label="商品数据量"
          prop="sku_num"
        />
        <el-table-column
          width="120"
          align="center"
          label="商品单价(RMB)"
          prop="sku_price"
        >
          <template slot-scope="{row}">
            {{ row.sku_price?parseInt(row.sku_price):'' }}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
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
                <img
                  :src="row.sku_image"
                  width="300px"
                  height="300px"
                >
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.sku_image"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="350"
          align="center"
          label="商品链接"
          prop="sku_url"
          show-overflow-tooltip
        />
      </el-table>
    </el-dialog>
    <!-- 发起预报弹窗 -->
    <el-dialog
      class="foreign-dialog"
      title="预报商品详情"
      :visible.sync="foreignVisible"
      width="1000px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="display:flex;">
        <div>
          <ul>
            <li>
              <span>中转仓库：</span>
              <el-select
                v-model="dialogWid"
                size="mini"
                filterable
                @change="
                  dialogOverseaWid = ''
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
                v-model="dialogOverseaWid"
                size="mini"
                filterable
              >
                <el-option
                  v-for="(item, index) in dialogOverseaWidList"
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
                @click="
                  itselfGoodsVisible=true
                  itselfGoodsImport()"
              >自有商品导入</el-button>
              <el-upload ref="importRef" style="margin:0 10px" accept=".xls, .xlsx" action="https://jsonplaceholder.typicode.com/posts/" :on-change="importTemplate" :show-file-list="false" :auto-upload="false">
                <el-button :data="importTemplateData" size="mini" type="primary"> 批量Excel导入 </el-button>
              </el-upload>
              <el-button
                type="primary"
                size="mini"
                @click="downloadTemplate"
              >下载预报模板</el-button>
              <el-button
                type="primary"
                size="mini"
              >导出勾选数据</el-button>
            </li>
          </ul>
          <span style="color:red">提示：1：应仓库要求，预报单中需包含商品的体积(长宽高)，需下载最新版的预报模板</span>
        </div>
        <div class="wid-info">
          <p>
            {{ `${widInfo.warehouse_name}` }}
          </p>
          <p>
            <el-tooltip class="item" effect="dark" :content="widInfo.full_address" placement="top">
              <p class="address">{{ `地址：${widInfo.full_address}` }}</p>
            </el-tooltip>
          </p>
          <p>
            {{ `收件人：${widInfo.receiving_name}` }}
          </p>
          <p>
            {{ `联系电话：${widInfo.receiving_tel}` }}
          </p>
        </div>
      </div>
      <el-table
        height="420"
        :data="foreignData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :row-style="{
          color: 'black',
          height: '50px',
        }"
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
          prop="package_code"
          fixed
        />
        <el-table-column
          width="120"
          align="center"
          label="商品编号(SKU)"
          prop="sku_id"
        >
          <template slot-scope="{row}">
            {{ row.sku_list[0].sku_id }}
          </template>
        </el-table-column>
        <el-table-column
          width="130"
          align="center"
          label="商品名称"
          prop="goods_name"
        >
          <template slot-scope="{row}">
            {{ row.sku_list[0].goods_name }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品数量"
          prop="sku_num"
        >
          <template slot-scope="{row}">
            {{ row.sku_list[0].sku_num }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品单价(RMB)"
          prop="sku_price"
        >
          <template slot-scope="{row}">
            {{ row.sku_list[0].sku_price }}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
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
                <img
                  :src="row.sku_list[0].sku_image"
                  width="300px"
                  height="300px"
                >
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.sku_list[0].sku_image"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="350"
          align="center"
          label="商品链接"
          prop="sku_url"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.sku_list[0].sku_url }}
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          align="center"
          label="运输方式"
          prop="ship_type"
        />
        <el-table-column
          width="100"
          align="center"
          label="备注"
          prop="remark"
          show-overflow-tooltip
        />
        <el-table-column
          width="100"
          align="center"
          label="操作状态"
          prop="sku_url"
          fixed="right"
        />
      </el-table>
    </el-dialog>
    <!--自有商品导入弹窗-->
    <el-dialog
      class="itself-goods-dialog"
      title="导入预报"
      :visible.sync="itselfGoodsVisible"
      width="1200px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <ul>
        <li>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>产品中心商品</span>
            </div>
            <div style="display:flex">
              <product-choose />
              <div class="left-wrap">
                <ul style="display:block;">
                  <li>
                    <span>商品名称：</span>
                    <el-input
                      v-model="form.package_code"
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>商品编码：</span>
                    <el-input
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>SKU编码：</span>
                    <el-input
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                    <el-button
                      style="margin-left:10px"
                      size="mini"
                      type="primary"
                    >搜 索</el-button>
                  </li>
                </ul>
              </div>
            </div>
            <el-table
              height="420"
              :data="foreignData"
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
                prop="package_code"
              />
              <el-table-column
                width="160"
                align="center"
                label="商品名称"
                prop="package_code"
              />
              <el-table-column
                width="80"
                align="center"
                label="主图"
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
                      <img
                        :src="row.sku_list[0].sku_image"
                        width="300px"
                        height="300px"
                      >
                    </div>
                    <el-image
                      style="width: 40px; height: 40px"
                      :src="row.sku_list[0].sku_image"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                align="center"
                label="商品价格"
                prop="ship_type"
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
                      skuDetails()
                    "
                  >SKU详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                :current-page="page"
                :page-sizes="[50, 100, 200]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-card>
        </li>
        <li>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>预报SKU</span>
            </div>
            <div style="display:flex">
              <div class="right-wrap">
                <ul>
                  <li>
                    <span>物流单号：</span>
                    <el-input
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>商品数量：</span>
                    <el-input
                      clearable
                      size="mini"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>运输方式：</span>
                    <el-select
                      size="mini"
                      filterable
                    >
                      <el-option
                        v-for="(item, index) in 2"
                        :key="index"
                      />
                    </el-select>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>商品体积：</span>
                    <el-input
                      size="mini"
                      style="width:36px"
                      oninput="value=value.replace(/\s+/g,'')"
                    />*
                    <el-input
                      size="mini"
                      style="width:36px"
                      oninput="value=value.replace(/\s+/g,'')"
                    />*
                    <el-input
                      size="mini"
                      style="width:36px"
                      oninput="value=value.replace(/\s+/g,'')"
                    />
                  </li>
                  <li>
                    <span>贴单服务：</span>
                    <el-select
                      size="mini"
                      filterable
                    >
                      <el-option
                        v-for="(item, index) in 2"
                        :key="index"
                      />
                    </el-select>
                  </li>
                  <li>
                    <span style="width:81px;text-align:right;">质检服务：</span>
                    <el-select
                      size="mini"
                      filterable
                    >
                      <el-option
                        v-for="(item, index) in 2"
                        :key="index"
                      />
                    </el-select>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>备注信息：</span>
                    <el-input
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
                    >批量设置</el-button>
                    <el-button
                      style="margin-left:10px"
                      size="mini"
                      type="primary"
                    >添加到预报单</el-button>
                  </li>
                </ul>
              </div>
            </div>
            <el-table
              height="420"
              :data="foreignData"
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
                label="SkuID"
                prop="package_code"
              />
              <el-table-column
                width="160"
                align="center"
                label="Sku名称"
                prop="package_code"
              />
              <el-table-column
                width="80"
                align="center"
                label="Sku图片"
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
                      <img
                        :src="row.sku_list[0].sku_image"
                        width="300px"
                        height="300px"
                      >
                    </div>
                    <el-image
                      style="width: 40px; height: 40px"
                      :src="row.sku_list[0].sku_image"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                align="center"
                label="Sku价格"
                prop="ship_type"
              />
              <el-table-column
                width="120"
                align="center"
                label="基本设置"
              >
                <template slot-scope="{row}">
                  <div>
                    <el-form label-position="right" label-width="80px">
                      <el-form-item label="备注:">
                        <el-input size="mini" />
                      </el-form-item>
                      <el-form-item label="体积:">
                        <el-input
                          size="mini"
                          style="width:36px"
                          oninput="value=value.replace(/\s+/g,'')"
                        />*
                        <el-input
                          size="mini"
                          style="width:36px"
                          oninput="value=value.replace(/\s+/g,'')"
                        />*
                        <el-input
                          size="mini"
                          style="width:36px"
                          oninput="value=value.replace(/\s+/g,'')"
                        />
                      </el-form-item>
                      <el-form-item label="物流单号:">
                        <el-input size="mini" />
                      </el-form-item>
                    </el-form>
                    <el-form label-position="right" label-width="80px">
                      <el-form-item label="运输方式:">
                        <el-select
                          size="mini"
                          filterable
                        >
                          <el-option
                            v-for="(item, index) in 2"
                            :key="index"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="贴单服务:">
                        <el-select
                          size="mini"
                          filterable
                        >
                          <el-option
                            v-for="(item, index) in 2"
                            :key="index"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="质检服务:">
                        <el-select
                          size="mini"
                          filterable
                        >
                          <el-option
                            v-for="(item, index) in 2"
                            :key="index"
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
                prop="ship_type"
              />
              <el-table-column
                width="120"
                align="center"
                label="Sku数量"
                prop="ship_type"
              >
                <template slot-scope="{row}">
                  <el-input size="mini" />
                </template>
              </el-table-column>
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
                  >移除</el-button>
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
      width="570px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table
        height="420"
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
        />
        <el-table-column
          width="100"
          align="center"
          label="SkuID"
          prop="package_code"
        />
        <el-table-column
          width="100"
          align="center"
          label="Sku名称"
          prop="package_code"
        />
        <el-table-column
          width="80"
          align="center"
          label="Sku图片"
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
                <img
                  :src="row.sku_image"
                  width="300px"
                  height="300px"
                >
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.sku_image"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="Sku价格"
          prop="package_code"
        />
        <el-table-column
          width="100"
          align="center"
          label="Sku库存"
          prop="package_code"
        />
      </el-table>
    </el-dialog>
  </el-row>
</template>

<script>
import ForeginStrockUp from '../../../module-api/smart-house-api/foreign-strock-up'
import { exportExcelDataCommon, exportPdfData } from '../../../util/util'
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
      showConsole: true,
      ForeginStrockUp: new ForeginStrockUp(this),
      form: {
        wid: '', // 中转仓id
        oversea_wid: '', // 海外仓id
        package_code: '', // 物流单号
        forecast_code: '', // 海外仓单号
        created_time: '', // 预报时间
        sign_Time: '', // 签收时间
        store_time: '', // 入库时间
        is_verify: '' // 是否审核 -1: 未审核 1:审核成功 2:审核失败
      },
      total: 0,
      pageSize: 30,
      page: 1,
      tableData: [], // 表格数据
      detailsData: [], // 预报商品详情数据
      multipleSelection: [], // 选择数据
      importTemplateData: '', // 批量导入数据
      foreignData: [], // 批量导入预报数据
      dialogWid: '', // 弹窗中转仓id
      dialogOverseaWid: '', // 弹窗目的仓id
      widInfo: {},
      statusObj: {
        1: '用户已下单',
        2: '预报单已签收'
      },
      shipTypeObj: {
        1: '陆运',
        2: '海运',
        3: '空运'
      },
      isVerifyObj: {
        '-1': '未审核',
        1: '审核通过',
        2: '审核拒绝'
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
      widList: [], // 中转仓/目的仓库
      overseaWidList: [], // 海外
      dialogOverseaWidList: [], // 目的仓库
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
      ]
    }
  },
  async mounted() {
    this.form.created_time = [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()]
    // 获取数据
    await this.getStockingForecastLists()
    // 获取中转仓库和目的仓库列表(海外仓备货)
    await this.getOverseasWarehouse()
    // 初始仓库
    await this.init()
  },
  methods: {
    // 获取中转仓库和目的仓库列表(海外仓备货)
    async getOverseasWarehouse() {
      const res = await this.ForeginStrockUp.getOverseasWarehouse()
      if (res.code === 200) {
        this.widList = res.data
        console.log(this.widList)
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
          if (item.id === this.dialogWid) {
            childList = item.child
            widInfo = item
          }
        })
        this.widInfo = widInfo
        this.dialogOverseaWidList = childList
        this.dialogOverseaWid = childList[0].id
      }
    },
    // 初始仓库
    init() {
      this.form.wid = this.widList[0].id
      this.form.oversea_wid = this.widList[0].child[0].id
      this.overseaWidList = this.widList[0].child
      this.dialogWid = this.widList[0].id
      this.dialogOverseaWid = this.widList[0].child[0].id
      this.dialogOverseaWidList = this.widList[0].child
      this.widInfo = this.widList[0]
    },
    // 下载条形码
    downBarCode() {
      const template = `条形码`
      const createDiv = document.createElement('div')
      createDiv.id = 'bar_code_id'
      createDiv.innerHTML = template
      document.body.appendChild(createDiv)// 添加到BODY节点中
      exportPdfData('#bar_code_id', 'cc')
    },
    // SKU详情
    skuDetails() {

    },
    // 自有商品导入
    itselfGoodsImport() {

    },
    // 查看详情
    getDetails(val) {
      this.detailsData = val.sku_list
      this.detailsData.map(item => {
        item.package_code = val.package_code
      })
    },
    // 删除/批量删除预报单
    deleteForecast(val, type) {
      const data = []
      if (type === 1) {
        data.push(val.forecast_code)
      } else {
        if (val.length === 0) return this.$message('请先选择需要删除的数据')
        val.forEach(item => {
          data.push(item.forecast_code)
        })
      }
      this.delForecast(data)
    },
    delForecast(data) {
      data.forEach(async item => {
        const res = await this.ForeginStrockUp.deleteForecast(item)
        if (res === 200) {
          this.$refs.Logs.writeLog(`单号【${item}】:删除成功`, true)
        } else {
          this.$refs.Logs.writeLog(`单号【${item}】:${res.data}`, false)
        }
      })
      this.showConsole = false
      this.getStockingForecastLists()
    },
    // 获取数据
    async getStockingForecastLists() {
      this.isShowLoading = true
      this.form.page = this.page
      this.form.pageSize = this.pageSize
      const res = await this.ForeginStrockUp.getStockingForecastLists(this.form)
      console.log(res)
      if (res.code === 200) {
        this.total = res.data.total
        this.tableData = res.data.data
        this.tableData.map(item => {
          let goods_total = 0
          let goods_price_total = 0
          item.sku_list.forEach(skuItem => {
            goods_total += skuItem.sku_num ? skuItem.sku_num : 0
            goods_price_total += skuItem.sku_price ? parseInt(skuItem.sku_price) * skuItem.sku_num : 0
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
    // 批量导入Excel导入
    batchImport() {
      const dataSum = this.importTemplateData.length
      if (dataSum <= 0) {
        this.$refs.Logs.writeLog('表格数据为空', false)
        this.showConsole = false
        return
      }
      this.showConsole = false
      this.$refs.Logs.writeLog('开始读取数据...', true)
      const data = []
      const newData = []
      const myMap = new Map()
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
        if (!sku_long) {
          this.$refs.Logs.writeLog(`【${index + 1}】长(cm)为空`, false)
          continue
        }
        if (!sku_width) {
          this.$refs.Logs.writeLog(`【${index + 1}】宽(cm)为空`, false)
          continue
        }
        if (!sku_height) {
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
        const obj = {
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
      data.map(item => {
        if (!myMap.has(item.package_code && item.sku_list[0].sku_id)) {
          myMap.set(item.package_code)
          myMap.set(item.sku_list[0].sku_id)
          this.foreignData.push(item)
        } else {
          this.$refs.Logs.writeLog(`过滤重复物流订单号【${item.package_code}】,商品编号(SKU)【${item.sku_list[0].sku_id}】`, false)
        }
      })
      const copyData = JSON.parse(JSON.stringify(this.foreignData))
      copyData.forEach(item => {
        console.log(item)
        const result = newData.findIndex(i => { return item.package_code === i.package_code })
        if (result !== -1) {
          newData[result].sku_list.push(item.sku_list[0])
        } else {
          newData.push(item)
        }
      })
      console.log(newData)
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
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getStockingForecastLists()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getStockingForecastLists()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/foreign-stock-up.less';
</style>

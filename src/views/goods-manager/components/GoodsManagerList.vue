<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom:10px">
        <storeChoose @changeMallList="changeMallList" />
        <el-button
          type="primary"
          size="mini"
          @click="isFold = !isFold"
        >{{ isFold?'折叠':'展开' }}</el-button>
      </ul>
      <ul v-if="isFold" style="margin-bottom:5px">
        <li class="data">
          <div class="base-box">
            <span class="base-title">商品数据相关</span>
            <div class="base-item">
              <ul style="margin-bottom:3px">
                <li class="data-input">
                  <el-form label-position="right" label-width="60px">
                    <el-form-item label="销售量：">
                      <el-input v-model="soldMin" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input v-model="soldMax" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="访客量：">
                      <el-input v-model="viewMin" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input v-model="viewMax" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="粉丝量：">
                      <el-input v-model="likeMin" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input v-model="likeMax" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="价格：">
                      <el-input v-model="priceMin" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input v-model="priceMax" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="商品数量：">
                      <el-input v-model="goodsMin" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input v-model="goodsMax" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <!-- <el-form-item label="评星数：">
                      <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item> -->
                  </el-form>
                </li>
                <li>
                  <el-form label-position="right" label-width="60px">
                    <el-form-item label="是否售空：">
                      <el-select
                        v-model="sellStatus"
                        size="mini"
                        filterable
                        :disabled="operationBut"
                      >
                        <el-option :value="0" label="全部" />
                        <el-option
                          v-for="(item,index) in sellStatusList"
                          :key="index"
                          :value="item.value"
                          :label="item.label"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="商品状态：">
                      <el-select
                        v-model="goodsStatus"
                        :disabled="operationBut"
                        size="mini"
                        filterable
                        multiple
                        collapse-tags
                        @change="changeSelect($event, 'goodsStatus')"
                      >
                        <el-option
                          :value="0"
                          label="全部"
                          @click.native="selectAll('goodsStatus', goodsStatusList)"
                        />
                        <el-option
                          v-for="(item,index) in goodsStatusList"
                          :key="index"
                          :value="item.value"
                          :label="item.label"
                        />
                      </el-select>

                    </el-form-item>
                    <el-form-item label="上家来源：">
                      <el-select
                        v-model="source"
                        :disabled="operationBut"
                        size="mini"
                        filterable
                        multiple
                        collapse-tags
                        @change="changeSelect($event, 'source')"
                      >
                        <el-option
                          :value="0"
                          label="全部"
                          @click.native="selectAll('source', sourceList)"
                        />
                        <el-option
                          v-for="(item,index) in sourceList"
                          :key="index"
                          :value="item.value"
                          :label="item.label"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="更新时间：">
                      <el-date-picker
                        v-model="modifyTime"
                        :disabled="operationBut"
                        unlink-panels
                        size="mini"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      />
                    </el-form-item>
                    <el-form-item label="创建时间：">
                      <el-date-picker
                        v-model="createTime"
                        :disabled="operationBut"
                        unlink-panels
                        size="mini"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      />
                    </el-form-item>
                  </el-form>
                </li>
              </ul>
              <ul style="margin-bottom:3px">
                <li>
                  <el-checkbox
                    v-model="checked"
                    style="margin-right:3px"
                  >单店查询商品数量</el-checkbox>
                  <el-input
                    size="mini"
                    style="width:105px"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                  />
                </li>
                <li class="data-goods">
                  <el-input
                    v-model="keyword"
                    size="mini"
                    class="input-with-select"
                    oninput="value=value.replace(/\s+/g,'')"
                    clearable
                  >
                    <el-select
                      slot="prepend"
                      v-model="searchType"
                    >
                      <el-option
                        v-for="(item, index) in searchTypeList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-input>
                </li>
              </ul>
              <ul style="margin-bottom:3px">
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-right:3px"
                  @click="categoryVisible = true"
                >选择类目</el-button>
                <el-input
                  size="mini"
                  style="width:455px"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                />
              </ul>
              <ul style="margin-bottom:3px">
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="operationBut"
                >一键查询100小时以上无流量商品</el-button>
                <el-button type="primary" size="mini" :disabled="operationBut">一键查询200小时以上无流量商品</el-button>
                <el-button type="primary" size="mini" :disabled="operationBut">商品一键翻新1</el-button>
              </ul>
              <ul>
                <el-button type="primary" size="mini">同步上家库存1</el-button>
                <el-button type="primary" size="mini">商品搬迁1</el-button>
                <el-button type="primary" size="mini">批量确认</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="operationBut"
                  @click="queryData"
                >查询数据</el-button>
                <el-checkbox
                  v-model="showConsole"
                  style="margin-left:10px"
                >隐藏日志</el-checkbox>
              </ul>
            </div>
          </div>

        </li>
        <li class="operation">
          <div class="base-box">
            <span class="base-title">操作选项</span>
            <div class="base-item">
              <ul style="margin-bottom:3px">
                <el-button type="primary" size="mini" :disabled="operationBut" @click="operation('batchDelete')">批量删除</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="operationBut"
                  @click="operation('batchUpDownProduct')
                          upDown = true"
                >批量下架</el-button>
                <el-button type="primary" size="mini" :disabled="operationBut" @click="titleVisible = true">批量编辑标题</el-button>
                <el-button type="primary" size="mini" :disabled="!operationBut" @click="flag=true">取消操作</el-button>
                <el-button type="primary" size="mini" :disabled="operationBut">批量修改类目属性</el-button>
              </ul>
              <ul style="margin-bottom:3px">
                <el-button type="primary" size="mini" :disabled="operationBut">货源查找</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="operationBut"
                  @click="operation('batchUpDownProduct')
                          upDown = false"
                >批量上架</el-button>
                <el-button type="primary" size="mini" :disabled="operationBut">批量编辑描述</el-button>
                <el-button type="primary" size="mini" :disabled="operationBut">导出数据</el-button>
                <el-button type="primary" size="mini" :disabled="operationBut">一键查询禁卖商品</el-button>
              </ul>
              <ul>
                <li class="operation-input">
                  <el-form label-position="right" label-width="60px">
                    <el-form-item label="商品库存：">
                      <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="商品价格：">
                      <el-input class="mini-input" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" /> % +
                      <el-input class="mini-input" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="发货天数：">
                      <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="物流方式：">
                      <el-select
                        v-model="logistics"
                        size="mini"
                        filterable
                        multiple
                        collapse-tags
                        @change="changeSelect($event, 'logistics')"
                      >
                        <el-option
                          :value="0"
                          label="全部"
                          @click.native="selectAll('logistics', logisticsList)"
                        />
                        <el-option
                          v-for="(item,index) in logisticsList"
                          :key="index"
                          :value="item.ShipId"
                          :label="item.ShipName"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="商品重量：">
                      <el-input style="width:102px" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                      <span class="red-span" style="margin-left:3px">kg</span>
                    </el-form-item>
                    <div>
                      <el-radio v-model="radio" label="1">免运</el-radio>
                      <el-radio v-model="radio" label="2">运费由买家承担</el-radio>
                    </div>
                    <el-form-item label="商品尺寸：">
                      <el-input class="mini-input item" size="mini" placeholder="长" onkeyup="value=value.replace(/[^\d]/g,'')" />*
                      <el-input class="mini-input item" size="mini" placeholder="宽" onkeyup="value=value.replace(/[^\d]/g,'')" />*
                      <el-input class="mini-input item" size="mini" placeholder="高" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                  </el-form>
                </li>
                <li class="operation-but">
                  <ul style="margin-bottom:3px">
                    <el-button type="primary" size="mini">批量更新库存</el-button>
                    <span class="red-span">（0，表示库存设置为0）</span>
                  </ul>
                  <ul style="margin-bottom:3px">
                    <el-button type="primary" size="mini">批量更新价格</el-button>
                    <span class="red-span">（加价公式：原价+原价*百分比+数值）</span>
                  </ul>
                  <ul style="margin-bottom:3px">
                    <el-button type="primary" size="mini">批量更新天数</el-button>
                    <span class="red-span">（最长30天）</span>
                  </ul>
                  <ul style="margin-bottom:3px">
                    <el-popover placement="right" width="400" trigger="click">
                      <div>
                        {{ logistics }}
                      </div>
                      <el-button slot="reference" type="primary" size="mini">批量更新物流方式</el-button>
                    </el-popover>
                    <span class="red-span">（请先至商家后台开启对应物流方式）</span>
                  </ul>
                  <ul style="margin-bottom:3px">
                    <el-button type="primary" size="mini">批量更新重量</el-button>
                    <span class="red-span">（必须大于0kg）</span>
                  </ul>
                  <ul style="margin-bottom:3px">
                    <el-button type="primary" size="mini">批量更新运费</el-button>
                    <span class="red-span">（只能更改当前商品已开启的物流）</span>
                  </ul>
                  <ul>
                    <el-button type="primary" size="mini">批量修改商品尺寸</el-button>
                  </ul>
                </li>
              </ul>
            </div>
          </div></li>
        <li class="progress">
          <div class="base-box">
            <span class="base-title">操作进度相关</span>
            <div class="base-item">
              <ul>
                <el-progress style="width: 230px" :text-inside="true" :stroke-width="24" :percentage="percentage" status="success" />
              </ul>
              <ul>
                <li>
                  <el-form label-position="right" label-width="60px">
                    <el-form-item label="查询数量：">
                      {{ queryNum }}
                    </el-form-item>
                    <el-form-item label="更新数量：">
                      {{ updateNum }}
                    </el-form-item>
                    <el-form-item label="成功数量：">
                      {{ successNum }}
                    </el-form-item>
                    <el-form-item label="失败数量：">
                      {{ failNum }}
                    </el-form-item>
                  </el-form>
                </li>
              </ul>
            </div>
          </div></li>
      </ul>
      <ul v-if="isFold">
        <span class="red-span">说明：库存公式：设置后的库存 = 原库存 +（填写的库存）；如果填写的库存为零将会把商品的库存置为0； 价格公式：设置后的价格 = 原价 +（原价*填写的百分比）+（填写的价格）</span>
      </ul>
    </el-row>
    <el-row id="article">
      <u-table
        ref="plTable"
        v-loading="isShowLoading"
        :data="tableData"
        use-virtual
        :height="420"
        :row-height="50"
        :data-changes-scroll-top="false"
        :border="false"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" label="序号" width="50" />
        <u-table-column align="center" type="index" label="序号" width="50" />
        <u-table-column align="center" min-width="80" label="站点">
          <template v-slot="{row}">
            {{ row.country | chineseSite }}
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="150" label="类目" prop="categoryName" show-overflow-tooltip />
        <u-table-column align="center" min-width="120" label="店铺名" prop="mallName" show-overflow-tooltip />
        <u-table-column align="center" min-width="100" label="主图">
          <template v-slot="{row}">
            <el-tooltip
              v-if="row.images"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  :src="[row.country ,row.platform_mall_id , row.images] | imageRender"
                  style="width: 400px; height: 400px"
                >
                  <div slot="error" class="image-slot" />
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="[row.country ,row.platform_mall_id , row.images] | imageRender"
              >
                <div slot="error" class="image-slot" />
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </el-tooltip>
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="100" label="上家类型" prop="platformTypeStr" />
        <u-table-column align="center" min-width="120" label="上家链接">
          <template v-slot="{row}">
            <span class="green-span" @click="openUrl(row,2)">
              {{ row.productId }}
            </span>
            <span
              v-if="row.productId"
              class="copyIcon"
              @click="copy(row.productId)"
            ><i class="el-icon-document-copy" /></span>
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="120" label="itemID">
          <template v-slot="{row}">
            <span class="green-span" @click="openUrl(row,1)">
              {{ row.id }}
            </span>
            <span
              v-if="row.id"
              class="copyIcon"
              @click="copy(row.id)"
            ><i class="el-icon-document-copy" /></span>
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="80" label="价格" prop="price" sortable />
        <u-table-column align="center" min-width="80" label="库存" prop="stock" sortable />
        <u-table-column align="center" min-width="150" label="标题" prop="name" show-overflow-tooltip>
          <template v-slot="{row}">
            <span class="red-span" style="cursor: pointer;" @click="viewDetails(row)">{{ row.name }}</span>
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="100" label="状态" show-overflow-tooltip>
          <template v-slot="{row}">
            <span :style="row.status && 'color:' + statusColor[row.status]">{{ statusObj[row.status] }}</span>
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="150" label="创建时间" prop="create_time">
          <template v-slot="{row}">
            {{ $dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="150" label="更新时间" prop="modify_time">
          <template v-slot="{row}">
            {{ $dayjs(row.modify_time).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="100" label="销售量" prop="sold" sortable />
        <u-table-column align="center" min-width="100" label="访客量" prop="view_count" sortable />
        <!-- <u-table-column align="center" min-width="100" label="评星数" /> -->
        <u-table-column align="center" min-width="100" label="粉丝量" prop="like_count" sortable />
        <u-table-column align="center" min-width="120" label="操作状态" show-overflow-tooltip>
          <template v-slot="{ row }">
            <span :style="row.color && 'color:' + row.color">{{ row.batchStatus }}</span>
          </template>
        </u-table-column>
      </u-table>
    </el-row>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
    <!-- 类目映射弹窗 -->
    <el-dialog
      v-if="categoryVisible"
      class="category-dialog"
      title="类目映射"
      :visible.sync="categoryVisible"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    />
    <!-- 批量编辑标题 -->
    <el-dialog
      v-if="titleVisible"
      class="title-dialog"
      title="批量编辑标题"
      :visible.sync="titleVisible"
      width="600px"
      top="20vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-position="right" label-width="110px">
        <el-form-item label="编辑类型：">
          <div>
            <el-radio v-model="titleRadio" :label="1">新标题</el-radio>
            <el-radio v-model="titleRadio" :label="2">新增关键词/标题前</el-radio>
            <el-radio v-model="titleRadio" :label="3">新增关键词/标题后</el-radio>
            <el-radio v-model="titleRadio" :label="4">删除关键词</el-radio>
          </div>
        </el-form-item>
        <el-form-item>
          <span class="red-span">新标题直接填入，需要添加或删除多个热搜词/关键词，请以英文';'间隔!</span>
        </el-form-item>
        <el-form-item label="新标题/关键字：">
          <el-input
            v-model="titleVal"
            type="textarea"
            :rows="6"
            size="mini"
            resize="none"
            :maxlength="maxLength"
            placeholder="请输入内容"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" size="mini" @click="operation('batchTitle')">保 存</el-button>
        <el-button type="primary" size="mini" @click="titleVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import GoodsList from '../../../module-api/goods-manager-api/goods-list'
import StoreChoose from '../../../components/store-choose'
import { exportExcelDataCommon, batchOperation } from '../../../util/util'
export default {
  components: {
    StoreChoose
  },
  data() {
    return {
      isFold: true,
      isShowLoading: false,
      showConsole: true,
      categoryVisible: false,
      titleVisible: true,
      operationBut: false,
      radio: '',
      checked: false,
      flag: false, // 判断是否停止
      upDown: true,
      GoodsList: new GoodsList(this),

      percentage: 0, // 进度条数据
      selectMallList: '', // 选择的店铺分组数据
      country: '', // 站点
      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据
      pageSize: 48,
      sellStatus: 0, // 是否售空
      goodsStatus: 0, // 商品状态
      goodsStatusName: '', // 商品状态请求名
      goodsStatusVal: '', // 商品状态值
      searchType: 'id', // 商品类型搜索条件
      keyword: '', // 商品类型搜索值
      source: 0, // 上家来源
      logistics: 0, // 物流方式
      queryNum: 0, // 查询数量
      updateNum: 0, // 更新数量
      successNum: 0, // 成功数量
      failNum: 0, // 失败数量
      createTime: [], // 创建时间
      modifyTime: [], // 更新时间
      goodsMin: 0, // 商品数量 走接口
      goodsMax: 999999,
      soldMin: 0, // 销售量 走接口
      soldMax: 999999,
      priceMin: 0, // 价格
      priceMax: 999999,
      viewMin: 0, // 访客量
      viewMax: 999999,
      likeMin: 0, // 粉丝量
      likeMax: 999999,
      platformData: {}, // 上家平台数据
      logisticsList: [], // 物流列表

      // 批量编辑标题
      titleRadio: 1, // 批编辑类型
      titleVal: '', // 新标题/关键字
      maxLength: '',
      minLength: '',

      sellStatusList: [
        { value: 1, label: '售空' },
        { value: 2, label: '非售空' }
      ],
      goodsStatusList: [
        { value: 1, label: '正常' },
        { value: 6, label: '审核中' },
        { value: 3, label: '禁卖下架' },
        { value: 11, label: '已售完' },
        { value: 8, label: '待上架' },
        { value: 4, label: '禁卖shopee官方删除' },
        { value: 100, label: '已压制' }
      ],
      statusObj: {
        1: '正常',
        2: '审核中',
        6: '审核中',
        3: '禁卖下架',
        11: '已售完',
        8: '待上架',
        4: '禁卖shopee官方删除',
        100: '已压制'
      },
      statusFilter: {
        1: 'live',
        8: 'unlisted',
        2: 'banned',
        3: 'banned',
        11: 'sold_out',
        100: 'deboosted'
      },
      statusColor: {
        8: 'red'
      },
      searchTypeList: [
        { value: 'name', label: '商品名称' },
        { value: 'sku', label: '主商品货号' },
        { value: 'msku', label: '商品规格货号' },
        { value: 'id', label: '商品编号' },
        { value: 'originId', label: '上家商品ID' }
      ],
      sourceList: [
        { value: '拼多多', label: '拼多多' },
        { value: '淘宝', label: '淘宝' },
        { value: '天猫', label: '天猫' },
        { value: '自有产品', label: '自有产品' },
        { value: '皮皮虾供货平台', label: '皮皮虾供货平台' },
        { value: '货老板', label: '货老板' },
        { value: '1688', label: '1688' },
        { value: 'Lazada', label: 'Lazada' },
        { value: '京喜', label: '京喜' },
        { value: 'Shopee', label: 'Shopee' },
        { value: '速卖通', label: '速卖通' },
        { value: '天猫淘宝海外平台', label: '天猫淘宝海外平台' }
        // { value: 15, label: '货老板海外' }
      ],
      // lazada各站点链接
      lazadaGoodsUrl: {
        'TH': 'https://www.lazada.co.th/products/i',
        'MY': 'https://www.lazada.com.my/products/i', // 马来西亚
        'VN': 'https://www.lazada.vn/products/i', // 越南-
        'ID': 'https://www.lazada.co.id/products/i', // 印度尼西亚
        'PH': 'https://www.lazada.com.ph/products/i', // 菲律宾
        'SG': 'https://www.lazada.sg/products/i'
      }
    }
  },
  watch: {
    country(val) {
      this.getLogistics()
    }
  },
  async mounted() {
    this.createTime = [new Date().getTime() - 3600 * 1000 * 24 * 150, new Date()]
    await this.selectAll('goodsStatus', this.goodsStatusList)
    await this.selectAll('source', this.sourceList)
  },
  methods: {
    // 批量编辑标题
    async batchTitle() {
      this.operationBut = true
      this.percentage = 0
      this.updateNum = 0
      this.successNum = 0
      this.failNum = 0
      this.$confirm(`确定更新商品标题吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.operationBut = true
        this.percentage = 0
        this.updateNum = 0
        this.successNum = 0
        this.failNum = 0
        await batchOperation(this.multipleSelection, this.getProductDetail)
        this.percentage = 100
        this.operationBut = false
      })
    },
    // 获取商品详情
    async getProductDetail(item, count = { count: 1 }) {
      try {
        const params = {
          product_id: item.id,
          version: '3.2.0',
          shop_id: item.platform_mall_id
        }
        this.$set(item, 'batchStatus', '正在获取商品详情...')
        const res = await this.$shopeemanService.searchProductDetail(item.country, params)
        if (res.code === 200 && res.data) {
          this.$set(item, 'batchStatus', '获取商品详情成功')
          this.$set(item, 'color', 'green')
        } else {
          this.$set(item, 'batchStatus', '获取商品详情失败')
          this.$set(item, 'color', 'red')
        }
      } catch (error) {
        this.$set(item, '获取商品详情异常')
        this.$set(item, 'color', 'red')
      } finally {
        --count.count
      }
    },
    editTitle(item, count = { count: 1 }) {

    },

    // 批量上下架
    async batchUpDownProduct() {
      this.operationBut = true
      this.percentage = 0
      this.updateNum = 0
      this.successNum = 0
      this.failNum = 0
      await batchOperation(this.multipleSelection, this.upDownProduct)
      this.percentage = 100
      this.operationBut = false
    },
    async upDownProduct(item, count = { count: 1 }) {
      try {
        this.updateNum++
        const params = [{ id: Number(item.id), unlisted: this.upDown }]
        const data = { mallId: item.platform_mall_id }
        const res = await this.$shopeemanService.handleGoodsDelist(item.country, data, params)
        if (res.code === 200) {
          this.successNum++
          this.$set(item, 'batchStatus', `${this.upDown ? '下架成功' : '上架成功'}`)
          this.$set(item, 'color', 'green')
        } else {
          this.failNum++
          this.$set(item, 'batchStatus', `${res.data}`)
          this.$set(item, 'color', 'red')
        }
      } catch (error) {
        console.log(error)
        this.failNum++
        this.$set(item, 'batchStatus', `${this.upDown ? '下架异常' : '上架异常'}`)
        this.$set(item, 'color', 'red')
      } finally {
        --count.count
      }
    },
    // 批量删除
    async batchDelete() {
      this.$confirm(`确定删除【${this.multipleSelection.length}】个商品吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.operationBut = true
        this.percentage = 0
        this.updateNum = 0
        this.successNum = 0
        this.failNum = 0
        await batchOperation(this.multipleSelection, this.deleteProduct)
        this.percentage = 100
        this.operationBut = false
      })
    },
    async deleteProduct(item, count = { count: 1 }) {
      try {
        this.updateNum++
        const params = {
          product_id_list: [Number(item.id)],
          mallId: item.platform_mall_id
        }
        const res = await this.$shopeemanService.handleGoodsDelete(item.country, params)
        if (res.code === 200) {
          this.successNum++
          this.$set(item, 'batchStatus', `删除成功`)
          this.$set(item, 'color', 'green')
        } else {
          this.failNum++
          this.$set(item, 'batchStatus', `删除失败`)
          this.$set(item, 'color', 'red')
        }
      } catch (error) {
        this.failNum++
        this.$set(item, 'batchStatus', `删除异常`)
        this.$set(item, 'color', 'red')
      } finally {
        --count.count
      }
    },
    operation(operationName) {
      if (!this.multipleSelection?.length) return this.$message('没有可操作的商品，请选择')
      this[operationName]()
    },
    // 打开详情页面
    viewDetails(row) {
      const reqStr = {
        type: 'itemDetail',
        shopId: row.platform_mall_id,
        id: row.id
      }
      this.$BaseUtilService.getOrderDetailInfo(row.platform_mall_id, JSON.stringify(reqStr))
    },
    // 获取物流
    getLogistics() {
      let logisticsList = this.$shopeeManConfig.getLogisticsList()
      logisticsList = logisticsList[this.country]
      this.logisticsList = []
      this.logistics = []
      logisticsList.forEach(item => {
        this.logisticsList.push(item)
        if (item.IsSelected) {
          this.logistics.push(item.ShipId)
        }
      })
    },
    // 查询数据
    async queryData() {
      if (!this.selectMallList.length) return this.$message('请选择店铺')
      if (!this.goodsStatus?.length) return this.$message('请选择商品状态')
      if (!this.source?.length) return this.$message('请选择上家来源')
      if (this.soldMin < 0 || this.soldMax > 999999) return this.$message('销售量请输入0-999999之间的数字')
      if (this.viewMin < 0 || this.viewMax > 999999) return this.$message('访客量请输入0-999999之间的数字')
      if (this.likeMin < 0 || this.likeMax > 999999) return this.$message('粉丝量请输入0-999999之间的数字')
      if (this.priceMin < 0 || this.priceMax > 999999) return this.$message('价格请输入0-999999之间的数字')
      if (this.goodsMin < 0 || this.goodsMax > 999999) return this.$message('商品数量请输入0-999999之间的数字')
      this.percentage = 0
      this.queryNum = 0
      this.updateNum = 0
      this.successNum = 0
      this.failNum = 0
      this.tableData = []
      this.$refs.Logs.consoleMsg = ''
      this.operationBut = true
      this.showConsole = false
      this.flag = false
      this.$refs.Logs.writeLog(`开始查询...`, true)
      for (let i = 0; i < this.goodsStatus.length; i++) {
        const item = this.goodsStatus[i]
        this.goodsStatusVal = item
        if (item === 0) {
          this.goodsStatusName = ''
          this.selectMallList.forEach(item => { item.pageNumber = 1 })
          await batchOperation(this.selectMallList, this.getTableData)
          break
        } else {
          this.goodsStatusName = this.statusFilter[item]
          this.selectMallList.forEach(item => { item.pageNumber = 1 })
          await batchOperation(this.selectMallList, this.getTableData)
        }
      }
      this.operationBut = false
      this.$refs.Logs.writeLog(`查询完成`, true)
    },
    // 获取数据
    async getTableData(mItem, count = { count: 1 }) {
      let res = ''
      let mallName = ''
      try {
        if (this.flag) {
          this.operationBut = false
          this.$refs.Logs.writeLog(`停止操作`, true)
          return
        }
        const params = {}
        params['mItem'] = mItem
        params['pageSize'] = this.pageSize
        params['listType'] = this.goodsStatusName ? this.goodsStatusName : 'all'
        mallName = mItem.mall_alias_name || mItem.platform_mall_name
        if ((this.searchType !== 'originId' && this.keyword) || this.goodsMax < 999999 || this.goodsMin > 0 || this.soldMin > 0 || this.soldMax < 999999) { // ？类目未判断
          if (this.keyword) {
            params['searchType'] = this.searchType
            params['keyword'] = this.keyword
          }
          params['goodsMin'] = this.goodsMin
          params['goodsMax'] = this.goodsMax
          params['soldMin'] = this.soldMin
          params['soldMax'] = this.soldMax
          res = await this.GoodsList.searchProductList(params)
        } else {
          res = await this.GoodsList.getMpskuList(params)
        }
        if (res.code === 200) {
          if (res.data.list?.length) {
            this.$refs.Logs.writeLog(`查询店铺【${mallName}】第【${mItem.pageNumber}】页数据：${res.data.list.length}`, true)
            this.queryNum += res.data.list.length
            for (let i = 0; i < res.data.list.length; i++) {
              const item = res.data.list[i]
              let stock = 0
              let sold = 0
              const price = []
              let categoryName = []
              let status = ''
              item.country = mItem.country
              item.mallName = mallName
              item.create_time = item.create_time * 1000
              item.modify_time = item.modify_time * 1000
              item.images = item.images[0]
              item.platform_mall_id = mItem.platform_mall_id
              item.model_list.forEach(modelItem => {
                price.push(Number(modelItem.price_info.normal_price))
                stock += Number(modelItem.stock_info.normal_stock)
                sold += Number(modelItem.sold)
              })
              for (let j = 0; j < item.category_path.length; j++) {
                const cItem = item.category_path[j]
                const res = await this.GoodsList.getCategoryName(item.country, cItem, '0', '')
                if (res.code === 200) {
                  categoryName.push(res.data.categories ? `${res.data.categories[0].category_name}(${res.data.categories[0].category_cn_name})` : '')
                } else {
                  categoryName = ''
                }
              }
              item.stock = stock // 库存
              item.sold = sold // 销售量
              item.price = Math.min.apply(null, price) // 价格
              item.categoryName = categoryName.join('->') // 类目
              if (item.status === 2) { // 状态
                status = 6
              } else if (item.status === 1 && item.stock === 0) {
                status = 11
              } else if (item.status === 1 && this.goodsStatusVal === 100) {
                status = 100
              } else {
                status = item.status
              }
              item.status = status
              // 获取上家类型,链接,id
              await this.getPlatformData(item.parent_sku)
              item.platformTypeStr = this.platformData['platformTypeStr']
              item.productId = this.platformData['productId']
              item.url = this.platformData['url']
            }
            const newData = this.filterData(res.data.list)
            this.tableData = this.tableData.concat(newData)
          }
          console.log('list', res.data.list)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mallName}】${res.data}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`店铺【${mallName}】获取数据异常`, false)
      } finally {
        if (res.data.list.length >= this.pageSize) {
          mItem.pageNumber++
          await this.getTableData(mItem, count)
        } else {
          const temp = 100 / this.selectMallList.length
          this.percentage += temp
          --count.count
        }
      }
    },
    // 本地过滤
    filterData(data) {
      const fData = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        // 过滤上家商品ID
        if (this.searchType === 'originId' && this.keyword && this.keyword !== item.productId) {
          continue
        }
        // 过滤上家来源
        if (this.source[0] !== 0 && !(this.source.includes(item.platformTypeStr))) {
          continue
        }
        // 过滤更新时间
        if (this.modifyTime?.length && !(item.modify_time >= this.modifyTime[0])) {
          continue
        }
        if (this.modifyTime?.length && !(item.modify_time <= new Date(this.modifyTime[1]).getTime())) {
          continue
        }
        // 过滤创建时间
        if (this.createTime?.length && !(item.create_time >= this.createTime[0])) {
          continue
        }
        if (this.createTime?.length && !(item.create_time <= new Date(this.createTime[1]).getTime())) {
          continue
        }
        // 过滤商品状态 4：禁卖shopee官方删除 6：审核中
        if (this.goodsStatusVal === 4 && item.status !== 4) {
          continue
        }
        if (this.goodsStatusVal === 6 && item.status !== 6) {
          continue
        }
        // 过滤是否售空
        if (Number(this.sellStatus) === 1 && Number(item.stock) > 0) {
          continue
        }
        if (Number(this.sellStatus) === 2 && Number(item.stock) === 0) {
          continue
        }
        // 过滤价格
        if (!(Number(item.price) >= Number(this.priceMin))) {
          continue
        }
        if (!(Number(item.price) <= Number(this.priceMax))) {
          continue
        }
        // 过滤粉丝量
        if (!(Number(item.view_count) >= Number(this.viewMin))) {
          continue
        }
        if (!(Number(item.view_count) <= Number(this.viewMax))) {
          continue
        }
        fData.push(item)
      }
      return fData
    },
    // 获取上家类型,链接,id
    async getPlatformData(itemSku) {
      await this.decryptShopeeItemSku(itemSku)
      let platform = this.platformData['platform']
      const productId = this.platformData['productId']
      if (platform === 5 && productId.toString().includes('-')) {
        this.getSelfGoodsPlatform(itemSku)
        if (this.platformData && this.platformData['platform']) {
          platform = this.platformData['platform']
        }
      }
      this.getGoodsUrl(platform)
    },
    // 解密ParentSKU
    async decryptShopeeItemSku(itemSku) {
      try {
        const regexp = /^[+-]?\d*[.]?\d*$/
        if (itemSku.length < 30) {
          const res = await this.$userInfo.user_create_time
          if (res) {
            const userTime = new Date(res).getTime()
            const encryptionTime = new Date('2018-12-20 00:00:00').getTime()
            if (userTime > encryptionTime) {
              this.platformData['platform'] = 5
              this.platformData['productId'] = itemSku
            }
          }
          if (itemSku.indexOf('_') > -1) {
            const arr = itemSku.split('_')
            if (regexp.test(arr[0]) && regexp.test(arr[1])) {
              const intPlatform = Number(arr[1])
              if (intPlatform === 1 || intPlatform === 2 || intPlatform === 3 || intPlatform === 5 || intPlatform === 6 || intPlatform === 7 || intPlatform === 8) {
                this.platformData['platform'] = intPlatform
                this.platformData['productId'] = arr[0]
              } else {
                this.platformData['platform'] = 5
                this.platformData['productId'] = itemSku
              }
            } else {
              this.platformData['platform'] = 5
              this.platformData['productId'] = itemSku
            }
          } else {
            if (regexp.test(itemSku)) {
              this.platformData['platform'] = 1
              this.platformData['productId'] = itemSku
            } else {
              this.platformData['platform'] = 5
              this.platformData['productId'] = itemSku
            }
          }
        } else {
          const res = await this.$BaseUtilService.decGoodCode(itemSku)
          if (res.indexOf('-') > -1) {
            const arr = res.split('-')
            this.getPlatformSimpleStr(arr[0], arr)
          } else {
            this.platformData['platform'] = 5
            this.platformData['productId'] = itemSku
          }
        }
      } catch (error) {
        console.log('解密异常', error)
      }
    },
    // 匹配上家平台
    getPlatformSimpleStr(name, arr) {
      try {
        const id = arr[1]
        if (name.toLocaleLowerCase() === 'pdd') {
          this.platformData['platform'] = 1
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'tb') {
          this.platformData['platform'] = 2
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'tm') {
          this.platformData['platform'] = 2
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'tb') {
          this.platformData['platform'] = 3
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'own') {
          this.platformData['platform'] = 5
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'ghpt') {
          this.platformData['platform'] = 6
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'alibaba') {
          this.platformData['platform'] = 8
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'hyj' || name.toLocaleLowerCase() === 'hlb') {
          this.platformData['platform'] = 7
          this.platformData['productId'] = id
          this.platformData['site'] = arr[2]
          this.platformData['shopId'] = arr[3]
        } else if (name.toLocaleLowerCase() === 'shopee') {
          this.platformData['platform'] = 11
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'aliexpress') {
          this.platformData['platform'] = 12
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'lazada') {
          this.platformData['platform'] = 9
          this.platformData['productId'] = id
          this.platformData['site'] = arr[2]
        } else if (name.toLocaleLowerCase() === 'hyjhw') {
          this.platformData['platform'] = 15
          this.platformData['productId'] = id
          this.platformData['site'] = arr[2]
        } else if (name.toLocaleLowerCase() === 'jx') {
          this.platformData['platform'] = 10
          this.platformData['productId'] = id
          this.platformData['site'] = arr[2]
        } else if (name.toLocaleLowerCase() === 'crossbroder') {
          this.platformData['platform'] = 13
          this.platformData['productId'] = id
          this.platformData['userId'] = arr.Length > 2 ? arr[2] : ''
        }
      } catch (error) {
        console.log('匹配上家异常', error)
      }
    },
    getSelfGoodsPlatform(itemSku) {
      let platform = '5'
      const id = ''
      let arr = []
      try {
        if (itemSku.includes('-')) {
          arr = itemSku.split('-')
          platform = arr[0]
        }
        this.getPlatformSimpleStr(platform, arr)
      } catch {
        this.platformData['platform'] = platform
        this.platformData['productId'] = id
      }
    },
    // 拼接链接
    getGoodsUrl(platform) {
      try {
        switch (platform) {
          case 1:
            this.platformData['url'] = `http://mobile.yangkeduo.com/goods.html?goods_id=${this.platformData['productId']}`
            this.platformData['platformTypeStr'] = '拼多多'
            break
          case 2:
            this.platformData['url'] = `https://item.taobao.com/item.htm?id=${this.platformData['productId']}`
            this.platformData['platformTypeStr'] = '淘宝'
            break
          case 3:
            this.platformData['url'] = `https://detail.tmall.com/item.htm?id=${this.platformData['productId']}`
            this.platformData['platformTypeStr'] = '天猫'
            break
          case 5:
            this.platformData['url'] = ''
            this.platformData['platformTypeStr'] = '自有产品'
            break
          case 6:
            this.platformData['url'] = `http://gh.ppxias.com/goods/${this.platformData['productId']}.html`
            this.platformData['platformTypeStr'] = '皮皮虾供货平台'
            break
          case 15:
          case 7:
            this.platformData['url'] = `http://www.17hyj.com/detail?goodsid=${this.platformData['productId']}`
            this.platformData['platformTypeStr'] = '货老板'
            break
          case 8:
            this.platformData['url'] = `https://detail.1688.com/offer/${this.platformData['productId']}.html`
            this.platformData['platformTypeStr'] = '1688'
            break
          case 11:
            this.platformData['url'] = `${this.$filters.countryShopeebuyCom(this.platformData['site'])}/product/${this.platformData['shopId']}/${this.platformData['productId']}`
            this.platformData['platformTypeStr'] = 'Shopee'
            break
          case 12:
            this.platformData['url'] = `https://www.aliexpress.com/item/${this.platformData['productId']}.html`
            this.platformData['platformTypeStr'] = '速卖通'
            break
          case 9:
            this.platformData['url'] = `${this.$filters.lazadaGoodsUrl(this.platformData['site'])}${this.platformData['productId']}.html`
            this.platformData['platformTypeStr'] = 'Lazada'
            break
          case 10:
            this.platformData['url'] = `https://item.m.jd.com/product/${this.platformData['productId']}.html`
            this.platformData['platformTypeStr'] = '京喜'
            break
          case 13:
            this.platformData['url'] = `https://distributor.taobao.global/apps/product/detail?mpId=${this.platformData['productId']}`
            this.platformData['platformTypeStr'] = '天猫淘宝海外平台'
            break
        }
      } catch (error) {
        console.log('拼接链接异常', error)
      }
    },
    // 全选
    selectAll(key, baseData) {
      if (this[key].length < baseData.length) {
        this[key] = []
        this[key].push(0)
        baseData.map((item) => {
          this[key].push(key === 'logistics' ? item.ShipId : item.value)
        })
      } else {
        this[key] = []
      }
    },
    changeSelect(val, key) {
      if (!val.includes(0) && val.length === this[key].length) {
      } else if (val.includes(0) && val.length - 1 < this[key].length) {
        this[key] = this[key].filter((item) => {
          return item !== 0
        })
      }
    },
    // 打开外部链接
    async openUrl(row, type) {
      if (type === 1) {
        try {
          const url = this.$filters.countryShopeebuyCom(row.country)
          this.$BaseUtilService.openUrl(`${url}/product/${row.platform_mall_id}/${row.id}`)
        } catch (error) {
          this.$message.error(`打开失败`)
        }
      } else {
        this.$BaseUtilService.openUrl(row.url)
      }
    },
    setCategory(val) {
      console.log(val)
    },
    changeMallList(val) {
      this.selectMallList = val
      this.country = val.country
      console.log('changeMallList', val)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
        this.$message.success('复制成功')
      } catch (e) {
        // console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/goods-manager-less/goods-list.less';
</style>

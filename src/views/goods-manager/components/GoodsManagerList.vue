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
                      <el-input v-model="soldMin" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input v-model="soldMax" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="访客量：">
                      <el-input v-model="viewMin" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input v-model="viewMax" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="粉丝量：">
                      <el-input v-model="likeMin" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input v-model="likeMax" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="价格：">
                      <el-input v-model="priceMin" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input v-model="priceMax" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="商品数量：">
                      <el-input v-model="goodsMin" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                      <el-input v-model="goodsMax" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
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
                    v-model="productNumChecked"
                    :disabled="operationBut"
                    style="margin-right:3px"
                  >单店查询商品数量</el-checkbox>
                  <el-input
                    v-model="productNum"
                    :disabled="operationBut"
                    size="mini"
                    style="width:105px"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                  />
                </li>
                <li class="data-goods">
                  <el-input
                    v-model="keyword"
                    :disabled="operationBut"
                    size="mini"
                    class="input-with-select"
                    clearable
                  >
                    <el-select
                      slot="prepend"
                      v-model="searchType"
                      :disabled="operationBut"
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
                  :disabled="operationBut"
                  type="primary"
                  size="mini"
                  style="margin-right:3px"
                  @click="
                    editCategory = false
                    categoryVisible = true"
                >选择类目</el-button>
                <el-input
                  v-model="categoryName"
                  :disabled="true"
                  size="mini"
                  style="width:455px"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                />
              </ul>
              <ul style="margin-bottom:3px">
                <el-button type="primary" size="mini" :disabled="operationBut" @click="operation('syncOriginGoodsNum')">同步上家库存</el-button>
                <el-button style="width: 95px;" type="primary" size="mini" :disabled="true">商品搬迁</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  style="width: 95px;"
                  :disabled="operationBut"
                  @click="
                    operation('batchConfirm')"
                >批量确认</el-button>
                <el-button type="primary" size="mini" :disabled="true">商品一键翻新</el-button>
              </ul>
              <ul>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="operationBut"
                  @click="queryType = 100
                          queryData()"
                >一键查询100小时以上无流量商品</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="operationBut"
                  @click="queryType = 200
                          queryData()"
                >一键查询200小时以上无流量商品</el-button>
              </ul>
            </div>
          </div>
        </li>
        <li class="operation">
          <div class="base-box">
            <span class="base-title">操作选项</span>
            <div class="base-item">
              <ul style="margin-bottom:3px">
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="operationBut"
                  @click="queryType = 1
                          queryData()"
                >查询数据</el-button>
                <el-button type="primary" size="mini" :disabled="operationBut" @click="operation('batchTitle')">批量编辑标题</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="operationBut"
                  @click="operation('batchUpDownProduct')
                          upDown = false"
                >批量上架</el-button>

                <el-button
                  type="primary"
                  size="mini"
                  :disabled="operationBut"
                  @click="
                    queryType = 1
                    operation('batchDelete')"
                >批量删除</el-button>
                <el-button type="primary" size="mini" :disabled="operationBut" @click="operation('batchCategory')">批量修改类目属性</el-button>
              </ul>
              <ul style="margin-bottom:3px">
                <el-button type="primary" size="mini" :disabled="operationBut" @click="exportTableData">导出数据</el-button>

                <el-button type="primary" size="mini" :disabled="operationBut" @click="operation('batchDescription')">批量编辑描述</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="operationBut"
                  @click="operation('batchUpDownProduct')
                          upDown = true"
                >批量下架</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="!operationBut"
                  @click="stop()
                          flag = true"
                >取消操作</el-button>
                <el-button type="primary" size="mini" :disabled="operationBut" @click="queryBanned">一键查询禁卖商品</el-button>
                <el-checkbox
                  v-model="showConsole"
                  style="margin-left:10px"
                >隐藏日志</el-checkbox>
              </ul>
              <ul>
                <li class="operation-input">
                  <el-form label-position="right" label-width="60px">
                    <el-form-item label="商品库存：">
                      <el-input v-model="productStock" :disabled="operationBut" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="商品价格：">
                      <el-input
                        v-model="productPrice1"
                        :disabled="operationBut"
                        class="mini-input"
                        size="mini"
                        onkeyup="value=value.replace(/[^\d]/g,'')"
                      /> % +
                      <el-input v-model="productPrice2" :disabled="operationBut" class="mini-input" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                    <el-form-item label="发货天数：">
                      <el-input
                        v-model="productDay"
                        :disabled="operationBut"
                        size="mini"
                        onkeyup="value=value.replace(/[^\d]/g,'')"
                      />
                    </el-form-item>
                    <el-form-item label="物流方式：">
                      <el-select
                        v-model="logistics"
                        :disabled="operationBut"
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
                      <el-input v-model="productWeight" :disabled="operationBut" style="width:102px" size="mini" onkeyup="value=value.replace(/[^\d.]/g,'')" />
                      <span class="red-span" style="margin-left:3px">kg</span>
                    </el-form-item>
                    <div style="line-height: 31px;">
                      <el-radio v-model="freightRadio" :disabled="operationBut" :label="1">免运</el-radio>
                      <el-radio v-model="freightRadio" :disabled="operationBut" :label="2">运费由买家承担</el-radio>
                    </div>
                    <el-form-item label="商品尺寸：">
                      <el-input v-model="productLength" :disabled="operationBut" class="mini-input item" size="mini" placeholder="长" onkeyup="value=value.replace(/[^\d]/g,'')" />*
                      <el-input v-model="productWidth" :disabled="operationBut" class="mini-input item" size="mini" placeholder="宽" onkeyup="value=value.replace(/[^\d]/g,'')" />*
                      <el-input v-model="productHeight" :disabled="operationBut" class="mini-input item" size="mini" placeholder="高" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    </el-form-item>
                  </el-form>
                </li>
                <li class="operation-but">
                  <ul style="margin-bottom:3px">
                    <el-button type="primary" size="mini" :disabled="operationBut" @click="operation('batchStock')">批量更新库存</el-button>
                    <span class="red-span">（0，表示库存设置为0）</span>
                  </ul>
                  <ul style="margin-bottom:3px">
                    <el-button type="primary" :disabled="operationBut" size="mini" @click="operation('batchPrice')">批量更新价格</el-button>
                    <span class="red-span">（加价公式：原价+原价*百分比+数值）</span>
                  </ul>
                  <ul style="margin-bottom:3px">
                    <el-button type="primary" :disabled="operationBut" size="mini" @click="operation('batchDay')">批量更新天数</el-button>
                    <span class="red-span">（最长30天）</span>
                  </ul>
                  <ul style="margin-bottom:3px">
                    <el-popover
                      v-if="isCustomShipFee"
                      placement="right"
                      width="320"
                      trigger="click"
                    >
                      <div>
                        <div v-for="(item1,i1) in logistics" :key="i1">
                          <div v-for="(item2,i2) in logisticsList" :key="i2">
                            <div v-if="item2.ShipId === item1 && item2.IsCustomShipFee ===true" style="display:flex;margin-bottom:10px">
                              <span style="line-height:24px;margin-right:10px">{{ item2.ShipName }}</span>
                              <el-input v-model="item2.CustomShipFee" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:100px" />
                            </div>
                          </div>
                        </div>
                        <div style="text-align:center">
                          <el-button type="primary" size="mini" @click="operation('batchLogistics')">确 定</el-button>
                        </div>
                      </div>
                      <el-button slot="reference" :disabled="operationBut" type="primary" size="mini">批量更新物流方式</el-button>
                    </el-popover>
                    <el-button v-if="!isCustomShipFee" slot="reference" type="primary" :disabled="operationBut" size="mini" @click="operation('batchLogistics')">批量更新物流方式</el-button>
                    <span class="red-span">（请先至商家后台开启对应物流方式）</span>
                  </ul>
                  <ul style="margin-bottom:3px">
                    <el-button type="primary" size="mini" :disabled="operationBut" @click="operation('batchWeight')">批量更新重量</el-button>
                    <span class="red-span">（必须大于0kg）</span>
                  </ul>
                  <ul style="margin-bottom:3px">
                    <el-button type="primary" size="mini" :disabled="operationBut" @click="operation('batchFreight')">批量更新运费</el-button>
                    <span class="red-span">（只能更改当前商品已开启的物流）</span>
                  </ul>
                  <ul>
                    <el-button type="primary" size="mini" :disabled="operationBut" @click="operation('batchSize')">批量修改商品尺寸</el-button>
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
                <el-progress style="width: 230px" :text-inside="true" :stroke-width="24" :percentage="parseInt(percentage)" status="success" />
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
        :data="tableData"
        use-virtual
        :height="isFold?450:760"
        :row-height="68"
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
                  :src="[ row.images] | imageRender"
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
                :src="[row.images,true] | imageRender"
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
        <u-table-column align="center" min-width="150" label="上家链接">
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
        <u-table-column align="center" min-width="120" label="操作状态" show-overflow-tooltip fixed="right">
          <template v-slot="{ row }">
            <span :style="row.color && 'color:' + row.color">{{ row.batchStatus }}</span>
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="120" label="更多操作" show-overflow-tooltip fixed="right">
          <template v-slot="{ row }">
            <el-dropdown style="width: 80px; margin-left: 10px" trigger="click" size="mini">
              <el-button style="width: 80px" size="mini" plain type="primary"> 操作<i class="el-icon-arrow-down el-icon--right" /> </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item> <div class="dropdownItem" @click="topExtension(row)">置顶推广</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="editParent(row)">修改上家</div></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
    >
      <categoryMapping
        v-if="categoryVisible"
        :country="country"
        :mall-list="selectMallList"
        :goods-current="{}"
        @categoryChange="categoryChange"
      />
    </el-dialog>
    <!-- 批量编辑标题弹窗 -->
    <el-dialog
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
            <el-tooltip
              placement="top"
            >
              <div slot="content">
                <span>新标题直接填入</span>
              </div>
              <el-radio v-model="titleRadio" :label="1">新标题</el-radio>
            </el-tooltip>
            <el-tooltip
              placement="top"
            >
              <div slot="content">
                <span>需要新增多个热搜词/关键词，请以英文';'间隔!</span>
              </div>
              <el-radio v-model="titleRadio" :label="2">新增关键词/标题前</el-radio>
            </el-tooltip>
            <el-tooltip
              placement="top"
            >
              <div slot="content">
                <span>需要新增多个热搜词/关键词，请以英文';'间隔!</span>
              </div>
              <el-radio v-model="titleRadio" :label="3">新增关键词/标题后</el-radio>
            </el-tooltip>
            <el-tooltip
              placement="top"
            >
              <div slot="content">
                <span>需要删除多个热搜词/关键词，请以英文';'间隔!</span>
              </div>
              <el-radio v-model="titleRadio" :label="4">删除关键词</el-radio>
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="新标题/关键字：">
          <el-input
            v-model="titleVal"
            type="textarea"
            :rows="6"
            size="mini"
            resize="none"
            placeholder="请输入内容"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" size="mini" @click="editProduct('setTitle')">保 存</el-button>
        <el-button type="primary" size="mini" @click="titleVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 获取描述模板弹窗 -->
    <el-dialog
      class="get-description-dialog"
      title="获取描述模板"
      :visible.sync="getDescriptionVisible"
      width="550px"
      top="20vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-position="right" label-width="110px">
        <el-form-item label="描述：">
          <div>
            <el-radio v-model="descriptionRadio" :label="1">新增关键词/描述前</el-radio>
            <el-radio v-model="descriptionRadio" :label="2">新增关键词/描述后</el-radio>
            <el-tooltip
              placement="top"
            >
              <div slot="content">
                <span>需要删除多个关键词，请以英文';'间隔!</span>
              </div>
              <el-radio v-model="descriptionRadio" :label="3">删除关键词</el-radio>
            </el-tooltip>
            <el-radio v-model="descriptionRadio" :label="4">模板</el-radio>
            <el-radio v-model="descriptionRadio" :label="5">模板+SKU</el-radio>
            <el-button type="primary" size="mini" @click="selectDescription(0)">选择模板</el-button>
          </div>
        </el-form-item>
        <el-form-item v-if="descriptionRadio === 1 ||descriptionRadio === 2 ||descriptionRadio === 3" label="关键词：">
          <el-input
            v-model="descriptionVal"
            type="textarea"
            :rows="6"
            size="mini"
            resize="none"
            placeholder="请输入内容"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" size="mini" @click="editProduct('setDescription')">确 认</el-button>
        <el-button type="primary" size="mini" @click="descriptionVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 描述模板 -->
    <el-dialog
      class="description-dialog"
      title="描述模板"
      :visible.sync="descriptionVisible"
      width="550px"
      top="20vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <ul style="margin-bottom:10px">
          <li>
            <span>标签：</span>
            <el-select v-model="descriptionConfigId" size="mini">
              <el-option v-for="(item,index) in descriptionLabelList" :key="index" :label="item.lable" :value="item.id" />
            </el-select>
          </li>
          <li>
            <span>新增标签：</span>
            <el-input v-model="descriptionConfig.tag" size="mini" style="width: 120px;" />
          </li>
        </ul>
        <ul style="margin-bottom:10px">
          <li>
            <span>描述：</span>
            <el-input
              v-model="descriptionConfig.text"
              type="textarea"
              :rows="6"
              resize="none"
              style="width: 430px"
              placeholder=""
              size="mini"
            />
          </li>
        </ul>
        <div class="footer">
          <el-button size="mini" type="primary" @click="selectDescription(1)">保存</el-button>
          <el-button size="mini" @click="selectDescription(2)">删除</el-button>
          <el-button size="mini" type="primary" @click="selectDescription(3)">确定</el-button>
          <el-button size="mini" @click="selectDescription(4)">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 上家产品修改 -->
    <el-dialog
      class="parent-dialog"
      title="上家产品修改"
      :visible.sync="parentVisible"
      width="550px"
      top="20vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <div class="base-box">
          <span class="base-title">上家产品ID设置</span>
          <div class="base-item">
            <div>
              <span>上家类型：</span>
              <el-select
                v-model="parentType"
                size="mini"
                filterable
              >
                <el-option
                  v-for="(item,index) in parentTypeList"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </div>
            <div>
              <span>&nbsp;&nbsp;&nbsp;产品ID：</span>
              <el-input
                v-model="parentId"
                size="mini"
                style="width:105px"
              />
              <el-button
                type="primary"
                size="mini"
                :loading="parentLoad1"
                @click="editpParentSku(1)"
              >修 改</el-button>
            </div>
          </div>
        </div>
        <div>
          <div class="base-box">
            <span class="base-title">上家产品链接设置</span>
            <div class="base-item">
              <div style="margin-bottom:20px">
                1688链接模板：https://detail.1688.com/offer/604199841804.html
              </div>
              <div>
                <span>产品链接：</span>
                <el-input
                  v-model="parentUrl"
                  size="mini"
                  style="width:105px"
                />
                <el-button
                  type="primary"
                  size="mini"
                  :loading="parentLoad2"
                  @click="editpParentSku(2)"
                >修 改</el-button>
              </div>
            </div>
          </div>
        </div>
      </div></el-dialog>
  </el-row>
</template>

<script>
import GoodsList from '../../../module-api/goods-manager-api/goods-list'
import StoreChoose from '../../../components/store-choose'
import { exportExcelDataCommon, batchOperation, terminateThread, dealwithOriginGoodsNum, getGoodsUrl } from '../../../util/util'
import categoryMapping from '../../../components/category-mapping'
export default {
  components: {
    StoreChoose,
    categoryMapping
  },
  data() {
    return {
      index: 1,
      parentVisible: false,
      isFold: true,
      showConsole: true,
      categoryVisible: false,
      titleVisible: false,
      sourceVisible: false,
      getDescriptionVisible: false,
      operationBut: false,
      flag: false, // 判断是否停止
      flag2: true,
      upDown: true,
      GoodsList: new GoodsList(this),

      editCategory: false, // 是否修改类目
      categoryList: {}, // 类目数据
      categoryName: '', // 类目名
      productNumChecked: false,
      productNum: 50, // 单店查询商品数据

      freightRadio: 2, // 运费类型

      titleRadio: 1, // 标题编辑类型
      titleVal: '', // 新标题/关键字

      descriptionRadio: 4, // 描述编辑类型
      descriptionVal: '', // 关键词
      descriptionConfig: {
        description: '',
        text: '',
        lable: '',
        tag: ''
      },
      descriptionConfigId: '',
      descriptionConfigText: '',
      descriptionLabelList: [],
      descriptionVisible: false,

      queryType: '', // 查询类型
      percentage: 0, // 进度条数据
      selectMallList: '', // 选择的店铺分组数据
      country: '', // 站点
      tableData: [], // 表格数据
      deleteData: [], // 删除数据
      deleteId: [], // 删除云商品记录id
      multipleSelection: [], // 选择数据
      pageSize: 48, // 查询页数大小
      sellStatus: 0, // 是否售空
      goodsStatus: 0, // 商品状态
      goodsStatusName: '', // 商品状态请求名
      goodsStatusVal: '', // 商品状态值
      searchType: 'id', // 商品类型搜索条件
      keyword: '', // 商品类型搜索值
      source: 0, // 上家来源
      queryNum: 0, // 查询数量
      updateNum: 0, // 更新数量
      successNum: 0, // 成功数量
      failNum: 0, // 失败数量
      createTime: [], // 创建时间
      modifyTime: [], // 更新时间
      goodsMin: 0, // 商品数量 走接口
      goodsMax: 99999999,
      soldMin: 0, // 销售量 走接口
      soldMax: 99999999,
      priceMin: 0, // 价格
      priceMax: 99999999,
      viewMin: 0, // 访客量
      viewMax: 99999999,
      likeMin: 0, // 粉丝量
      likeMax: 99999999,
      platformData: {}, // 上家平台数据
      logistics: 0, // 物流方式
      isCustomShipFee: false, // 物流价格显示
      logisticsFeeList: [], // 物流价格
      logisticsList: [], // 物流列表
      productStock: 10, // 商品库存
      productPrice1: -1, // 商品价格百分比
      productPrice2: 0, // 商品价格数值
      productWeight: 1, // 商品重量
      productLength: '', // 商品长
      productWidth: '', // 商品宽
      productHeight: '', // 商品高

      minDays: 0, // 最小发货天数
      maxDays: 0, // 最大发货天数
      productDay: 15, // 发货天数
      preOrderDeliveryDays: 2, // 不备货默认天数
      minLength: 0, // 标题/描述最小长度
      maxLength: 0, // 标题/描述最大长度
      isSync: false,

      // 上家产品修改
      parentType: 1, // 上家类型
      parentId: '', // 产品ID
      parentUrl: '', // 产品链接
      goodsValue: '', // 商品值
      parentLoad1: false,
      parentLoad2: false,

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
        100: 'deboosted',
        4: 'deleted'
      },
      statusColor: {
        8: 'red'
      },
      operationObj: {
        'setTitle': '标题',
        'setDescription': '描述',
        'setStock': '库存',
        'setPrice': '价格',
        'setDay': '发货天数',
        'setWeight': '重量',
        'setSize': '尺寸',
        'setFreight': '运费',
        'setLogistics': '物流方式',
        'setCategory': '类目属性'
      },
      parentTypeObj: {
        1: '拼多多',
        2: '淘宝',
        8: '1688',
        9: 'lazada'
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
      countryArr: ['SG', 'GL', 'PH', 'VN', 'TW', 'MY', 'ID', 'TH', 'MX', 'CO', 'CL', 'PL', 'FR', 'ES'], // 更新了数据的站点
      parentTypeList: [
        { value: 1, label: '拼多多' },
        { value: 2, label: '淘宝天猫' },
        { value: 8, label: '1688' },
        { value: 9, label: 'lazada' }
      ]

    }
  },
  watch: {
    country(val) {
      this.getLogistics()
      this.getDayLength('')
    },
    descriptionConfigId(val) {
      const item = this.descriptionLabelList.filter(i => i && i.id === val)[0]
      this.descriptionConfig.text = item && item.description || ''
      this.descriptionConfig.description = item && item.description || ''
      this.descriptionConfig.lable = item && item.lable || ''
    }
  },
  async mounted() {
    this.createTime = [new Date().getTime() - 3600 * 1000 * 24 * 150, new Date()]
    await this.selectAll('goodsStatus', this.goodsStatusList)
    await this.selectAll('source', this.sourceList)
  },
  methods: {
    // 同步上家库存
    async syncOriginGoodsNum() {
      this.flag = false
      this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      this.$refs.Logs.writeLog(`开始同步上家库存，请耐心等待！`, true)
      this.operationBut = true
      this.isSync = true
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.flag) {
          break
        }
        const item = this.multipleSelection[i]
        await dealwithOriginGoodsNum(item.productId, item.platform, item.platform_mall_id, item.id, item.country, '', this.$refs.Logs.writeLog)
      }
      this.operationBut = false
      this.$refs.Logs.writeLog(`同步完成！`, true)
    },
    // 修改上家sku值
    async editpParentSku(type) {
      // 获取商品编码加密值
      let parentId = ''
      let parentType = ''
      try {
        if (type === 1) {
          if (!this.parentId.trim()) return this.$message('产品ID不能为空')
          parentId = this.parentId
          parentType = this.parentType
          this.parentLoad1 = true
        } else {
          if (!this.parentUrl.trim()) return this.$message('产品链接不能为空')
          const execPlatform = /(yangkeduo.com)|(item.taobao.com)|(detail.1688.com)|(www.lazada)/g
          const platform = this.parentUrl.match(execPlatform)
          if (!platform) return this.$message(`链接:${this.parentUrl} 识别支持平台失败`, false)
          switch (platform[0]) {
            case 'yangkeduo.com':
              parentId = this.parentUrl.match(/goods_id=(\d+)/)[1]
              parentType = 1
              break
            case 'item.taobao.com':
              parentId = this.parentUrl.match(/id=(\d+)/)[1]
              parentType = 2
              break
            case 'detail.1688.com':
              parentId = this.parentUrl.match(/(\d+)\.html/)[1]
              parentType = 8
              break
            case 'www.lazada':
              parentId = this.parentUrl.match(/(\d+)\.html/)[1]
              parentType = 9
              break
          }
          this.parentLoad2 = true
        }
        const tmallCrossBorderUserId = this.goodsValue.platformTypeStr === '天猫淘宝海外平台' ? this.goodsValue.id : ''
        const parent_sku = await this.$BaseUtilService.buildGoodCode(parentType, parentId, this.goodsValue.country, this.goodsValue.platform_mall_id, tmallCrossBorderUserId)
        let productInfo = {}
        const res = await this.getProductDetail(this.goodsValue)
        if (res.code === 200) {
          productInfo = res.data
          productInfo['parent_sku'] = parent_sku
          const data = { mallId: this.goodsValue.platform_mall_id }
          const editProductRes = await this.$shopeemanService.handleProductEdit(this.goodsValue.country, data, [productInfo])
          if (editProductRes.code === 200) {
            this.batchStatus(this.goodsValue, `修改成功`, true)
            this.goodsValue.platformTypeStr = this.parentTypeObj[parentType]
            this.goodsValue.productId = parentId
            switch (parentType) {
              case 1:
                this.goodsValue.url = `http://mobile.yangkeduo.com/goods.html?goods_id=${parentId}`
                break
              case 2:
                this.goodsValue.url = `https://item.taobao.com/item.htm?id=${parentId}`
                break
              case 8:
                this.goodsValue.url = `https://detail.1688.com/offer/${parentId}.html`
                break
              case 9:
                this.goodsValue.url = `${this.$filters.lazadaGoodsUrl(this.goodsValue.country)}/${parentId}.html`
                break
            }
          } else {
            this.batchStatus(this.goodsValue, `修改失败：${editProductRes.data}`, false)
          }
        } else {
          this.$message.error(`${res.data}`)
        }
      } catch (error) {
        this.batchStatus(this.goodsValue, `修改上家异常：${error}`, false)
        this.parentVisible = false
      }
      this.parentVisible = false
      this.parentLoad1 = false
      this.parentLoad2 = false
    },
    // 修改上家
    editParent(row) {
      this.parentVisible = true
      this.goodsValue = row
      this.parentType = 1
      this.parentId = ''
      this.parentUrl = ''
    },
    // 置顶推广
    async topExtension(row) {
      const params = {
        id: Number(row.id),
        shop_id: row.platform_mall_id
      }
      const res = await this.$shopeemanService.handleGoodsTop(row.country, params)
      if (res.code === 200) {
        this.batchStatus(row, `商品置顶成功！`, true)
      } else {
        this.batchStatus(row, `${res.data}`, false)
      }
    },
    // 类目选择数据
    categoryChange(val) {
      console.log('categoryChange', val)
      if (val) {
        if (this.editCategory) {
          this.categoryList = val
          this.editProduct('setCategory')
        } else {
          const name = []
          this.categoryList = val
          this.categoryList.categoryList.forEach(item => {
            name.push(`${item.category_name}(${item.category_cn_name})`)
          })
          this.categoryName = name.join('->')
        }
      } else {
        this.categoryName = ''
      }
      this.categoryVisible = false
    },
    // 批量修改类目属性
    async batchCategory() {
      this.categoryVisible = true
      this.editCategory = true
    },
    // 批量确认
    async batchConfirm() {
      this.initData()
      this.updateNum = this.multipleSelection.length
      await batchOperation(this.multipleSelection, this.confirmProduct)
      this.operationBut = false
    },
    async confirmProduct(item, count = { count: 1 }) {
      try {
        if (item.status !== 4) {
          this.failNum++
          this.batchStatus(item, `该商品不属于禁卖shopee官方删除`, false)
        } else {
          const res = await this.GoodsList.dismissInvalidProducts(item)
          if (res.code === 200) {
            this.successNum++
            this.batchStatus(item, `确认禁卖成功`, true)
            this.successNum++
          } else {
            this.failNum++
            this.batchStatus(item, `确认禁卖失败`, false)
          }
        }
      } catch (error) {
        this.failNum++
        this.batchStatus(item, `确认禁卖异常`, false)
        console.log('确认禁卖异常', error)
      } finally {
        --count.count
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
      }
    },
    // 批量更新物流方式
    batchLogistics() {
      if (!this.logistics?.length) return this.$message('至少选择一种物流方式')
      let flag = false
      if (this.isCustomShipFee) {
        flag = this.logistics.some(item1 => {
          return this.logisticsList.some(item2 => {
            return item2.ShipId === item1 && item2.IsCustomShipFee && item2.CustomShipFee === ''
          })
        })
      }
      if (flag) return this.$message('请输入运费')
      this.editProduct('setLogistics')
    },
    // 批量更新运费
    batchFreight() {
      this.editProduct('setFreight')
    },
    // 批量修改尺寸
    batchSize() {
      if (!this.productLength || Number(this.productLength) <= 0 || !this.productWidth || Number(this.productWidth) <= 0 || !this.productHeight || Number(this.productHeight) <= 0) return this.$message('请输入 0 以上的数值')
      this.editProduct('setSize')
    },
    // 批量更新重量
    batchWeight() {
      if (!this.productWeight || Number(this.productWeight) <= 0) return this.$message('请输入 0 以上的数值')
      this.editProduct('setWeight')
    },
    // 批量更新预售天数
    batchDay() {
      if (!this.productDay) return this.$message('请填写预售天数')
      this.editProduct('setDay')
    },
    // 批量更新价格
    batchPrice() {
      if (!this.productPrice1) return this.$message('价格百分比不能为空')
      if (!this.productPrice2) return this.$message('数值不能为空')
      this.editProduct('setPrice')
    },
    // 批量更新库存
    batchStock() {
      if (!this.productStock || Number(this.productStock) < 0 || Number(this.productStock) > 10000000) return this.$message('仓库必须在 0 到 10000000 之间')
      this.editProduct('setStock')
    },
    // 批量编辑标题
    batchTitle() {
      this.titleVisible = true
      this.titleRadio = 1
      this.titleVal = ''
    },
    // 批量编辑描述
    batchDescription() {
      this.getDescriptionVisible = true
      this.descriptionRadio = 4
      this.descriptionVal = ''
    },
    // 批量更新操作
    editProduct(name) {
      if (name === 'setTitle') {
        if (this.titleRadio === 1 && !this.titleVal) return this.$message('新标题不能为空')
        if ((this.titleRadio === 2 || this.titleRadio === 3 || this.titleRadio === 4) && !this.titleVal) return this.$message('关键词不能为空')
      }
      if (name === 'setDescription') {
        if ((this.descriptionRadio === 1 || this.descriptionRadio === 2 || this.descriptionRadio === 3) && !this.descriptionVal) return this.$message('关键词不能为空')
        if ((this.descriptionRadio === 4 || this.descriptionRadio === 5) && !this.descriptionConfig.description) return this.$message('请选择模板')
      }
      this.$confirm(`确定更新商品吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.initData()
        this.titleVisible = false
        this.getDescriptionVisible = false
        this.multipleSelection.forEach(item => { item.edit = name })
        this.updateNum = this.multipleSelection.length
        await batchOperation(this.multipleSelection, this[name])
        this.operationBut = false
      })
    },
    // 获取商品详情
    async getProductDetail(item) {
      let productInfo = {}
      const params = {}
      params['product_id'] = item.id
      params['version'] = '3.2.0'
      params['shop_id'] = item.platform_mall_id
      const res = await this.$shopeemanService.searchProductDetail(item.country, params)
      if (res.code === 200 && res.data) {
        if (Number(res.data.id) === Number(item.id)) {
          productInfo = res.data
          // 处理数据
          await this.getProductInfo(productInfo, item)
          return { code: 200, data: productInfo }
        } else {
          return { code: 201, data: '获取到的产品id不一致' }
        }
      } else {
        return { code: 0, data: '获取商品详情失败' }
      }
    },
    // 更新商品
    async handleProductEdit(productInfo, item) {
      // 更新商品
      this.batchStatus(item, `正在更新${this.operationObj[item.edit]}...`, true)
      const data = { mallId: item.platform_mall_id }
      console.log('更新商品详情数据', productInfo)
      const editProductRes = await this.$shopeemanService.handleProductEdit(item.country, data, [productInfo])
      if (editProductRes.code === 200) {
        this.successNum++
        if (item.edit === 'setStock') {
          let stock = 0
          item.model_list.forEach(modelItem => { stock += Number(this.productStock) })
          item.stock = stock
        }
        if (item.edit === 'setPrice') {
          const price = []
          item.model_list.forEach(modelItem => {
            price.push(Math.ceil(Number(modelItem.price_info.normal_price) + (Number(modelItem.price_info.normal_price) * (Number(this.productPrice1) / 100)) + Number(this.productPrice2)))
          })
          item.price = Math.min.apply(null, price)
        }
        if (item.edit === 'setTitle') {
          item.name = productInfo.name
        }
        this.batchStatus(item, `更新${this.operationObj[item.edit]}成功`, true)
      } else {
        this.failNum++
        this.batchStatus(item, `更新${this.operationObj[item.edit]}失败${editProductRes.data}`, false)
      }
    },
    async setCategory(item, count = { count: 1 }) {
      try {
        let productInfo = {}
        this.batchStatus(item, `正在获取商品详情...`, true)
        const res = await this.getProductDetail(item)
        if (res.code === 200) {
          productInfo = res.data
          const categoryPath = []
          this.categoryList.categoryList.forEach(item => {
            categoryPath.push(item.category_id)
          })
          const attributes = []
          for (let i = 0; i < this.categoryList.attributesList.length; i++) {
            const att = this.categoryList.attributesList[i]
            // 新类目和未更新站点的属性格式不一致，所以需判断处理
            if (this.countryArr.includes(item.country)) {
              if (att.attribute_id < 1) {
                productInfo['brand_id'] = att.options
                continue
              }
              const obj = {}
              obj['attribute_id'] = att.attribute_id
              obj['attribute_value_id'] = att.options
              attributes.push(obj)
            } else {
              const obj = {
                custom_value: {}
              }
              obj['custom_value ']['raw_value '] = att.selected_attribute_value_name
              attributes.push(obj)
            }
          }
          productInfo['attributes'] = attributes
          productInfo['category_path'] = categoryPath
          await this.handleProductEdit(productInfo, item)
        } else {
          this.batchStatus(item, res.data, false)
          this.failNum++
        }
      } catch (error) {
        console.log(error)
        this.batchStatus(item, `更新类目异常`, false)
        this.failNum++
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    async setLogistics(item, count = { count: 1 }) {
      let productInfo = {}
      try {
        this.batchStatus(item, `正在获取商品详情...`, true)
        const res = await this.getProductDetail(item)
        if (res.code === 200) {
          productInfo = res.data
          const newSelectedDeliveryTypes = []
          // 判断选择开启的物流中是否有未在后台开启的
          for (let i = 0; i < productInfo.logistics_channels.length; i++) {
            const lItem = productInfo.logistics_channels[i]
            if (this.logistics.includes(lItem.channelid.toString()) && lItem.parent_channel_id === 0) {
              if (lItem.enabled === false) {
                // 获取物流名称
                const channelModel = []
                this.logistics.forEach(current => {
                  this.logisticsList.forEach(list => {
                    if (current === list.ShipId && current === lItem.channelid.toString()) {
                      channelModel.push(list)
                    }
                  })
                })
                const channelName = channelModel?.length > 0 ? channelModel[0].ShipName : lItem.channelid.toString()
                this.batchStatus(item, `物流方式：${channelName}未开启`, false)
                return
              }
              newSelectedDeliveryTypes.push(lItem.channelid.toString())
            }
          }
          // 过滤掉有父级物流ID的物流
          for (let i = 0; i < productInfo.logistics_channels.length; i++) {
            const lItem = productInfo.logistics_channels[i]
            const channelModel = []
            this.logistics.forEach(current => {
              this.logisticsList.forEach(list => {
                if (current === list.ShipId && current === lItem.channelid.toString()) {
                  channelModel.push(list)
                }
              })
            })
            if (newSelectedDeliveryTypes.includes(lItem.channelid.toString())) {
              lItem.enabled = true // 开启物流
            } else {
              lItem.enabled = false // 关闭物流
            }
            if (channelModel?.length > 0 && channelModel[0].CustomShipFee !== '') {
              lItem.price = channelModel[0].CustomShipFee
            }
          }
          await this.handleProductEdit(productInfo, item)
        } else {
          this.batchStatus(item, res.data, false)
          this.failNum++
        }
      } catch (error) {
        this.batchStatus(item, `更新物流方式异常`, false)
        this.failNum++
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    async setFreight(item, count = { count: 1 }) {
      let productInfo = {}
      try {
        this.batchStatus(item, `正在获取商品详情...`, true)
        const res = await this.getProductDetail(item)
        if (res.code === 200) {
          productInfo = res.data
          for (let i = 0; i < productInfo.logistics_channels.length; i++) {
            const lItem = productInfo.logistics_channels[i]
            if (lItem.enabled) {
              lItem.cover_shipping_fee = this.freightRadio === 1
            }
          }
          await this.handleProductEdit(productInfo, item)
        } else {
          this.batchStatus(item, res.data, false)
          this.failNum++
        }
      } catch (error) {
        this.batchStatus(item, `更新运费异常`, false)
        this.failNum++
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    async setSize(item, count = { count: 1 }) {
      let productInfo = {}
      try {
        this.batchStatus(item, `正在获取商品详情...`, true)
        const res = await this.getProductDetail(item)
        if (res.code === 200) {
          productInfo = res.data
          productInfo['dimension']['width'] = Number(this.productWidth)
          productInfo['dimension']['length'] = Number(this.productLength)
          productInfo['dimension']['height'] = Number(this.productHeight)
          await this.handleProductEdit(productInfo, item)
        } else {
          this.batchStatus(item, res.data, false)
          this.failNum++
        }
      } catch (error) {
        this.batchStatus(item, `更新尺寸异常`, false)
        this.failNum++
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    async setWeight(item, count = { count: 1 }) {
      let productInfo = {}
      try {
        this.batchStatus(item, `正在获取商品详情...`, true)
        const res = await this.getProductDetail(item)
        if (res.code === 200) {
          productInfo = res.data
          productInfo['weight'] = this.productWeight + ''
          await this.handleProductEdit(productInfo, item)
        } else {
          this.batchStatus(item, res.data, false)
          this.failNum++
        }
      } catch (error) {
        this.batchStatus(item, `更新重量异常`, false)
        this.failNum++
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    async setDay(item, count = { count: 1 }) {
      let productInfo = {}
      try {
        this.batchStatus(item, `正在获取商品详情...`, true)
        const res = await this.getProductDetail(item)
        if (res.code === 200) {
          productInfo = res.data
          this.getDayLength(item)
          if (Number(this.productDay) > Number(this.maxDays) || Number(this.productDay) < Number(this.preOrderDeliveryDays)) {
            this.batchStatus(item, '出货天数需设置在 ' + this.preOrderDeliveryDays + ' 到 ' + this.maxDays + ' 天', false)
          } else {
            productInfo['pre_order'] = !(Number(this.productDay) < this.minDays)
            productInfo['days_to_ship'] = productInfo.pre_order ? Number(this.productDay) : this.preOrderDeliveryDays
            await this.handleProductEdit(productInfo, item)
          }
        } else {
          this.batchStatus(item, res.data, false)
          this.failNum++
        }
      } catch (error) {
        this.batchStatus(item, `更新天数异常`, false)
        this.failNum++
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    async setPrice(item, count = { count: 1 }) {
      let productInfo = {}
      try {
        this.batchStatus(item, `正在获取商品详情...`, true)
        const res = await this.getProductDetail(item)
        if (res.code === 200) {
          productInfo = res.data
          if (item.country === 'ID') {
            // 印尼站价格判断处理
            this.checkCountryPriceForID(productInfo, item)
          }
          for (let i = 0; i < productInfo.model_list.length; i++) {
            const item = productInfo.model_list[i]
            item.price = Math.ceil(Number(item.price) + (Number(item.price) * (Number(this.productPrice1) / 100)) + Number(this.productPrice2)) + ''
          }
          await this.handleProductEdit(productInfo, item)
        } else {
          this.batchStatus(item, res.data, false)
          this.failNum++
        }
      } catch (error) {
        this.batchStatus(item, `更新价格异常`, false)
        this.failNum++
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    async setStock(item, count = { count: 1 }) {
      let productInfo = {}
      try {
        this.batchStatus(item, `正在获取商品详情...`, true)
        const res = await this.getProductDetail(item)
        if (res.code === 200) {
          productInfo = res.data
          for (let i = 0; i < productInfo.model_list.length; i++) {
            const item = productInfo.model_list[i]
            item.stock = Number(this.productStock)
          }
          await this.handleProductEdit(productInfo, item)
        } else {
          this.batchStatus(item, res.data, false)
          this.failNum++
        }
      } catch (error) {
        this.batchStatus(item, `更新库存异常`, false)
        this.failNum++
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    async setDescription(item, count = { count: 1 }) {
      let description = ''
      let productInfo = {}
      try {
        this.batchStatus(item, `正在获取商品详情...`, true)
        const res = await this.getProductDetail(item)
        if (res.code === 200) {
          productInfo = res.data
          this.descriptionVal = this.descriptionVal.replaceAll('；', ';') // 兼容中文分号
          switch (this.descriptionRadio) {
            case 1:
              productInfo['description'] = this.descriptionVal + productInfo.description
              break
            case 2:
              productInfo['description'] = productInfo.description + this.descriptionVal
              break
            case 3:
              if (this.descriptionVal.indexOf(';') > -1) {
                const arr = this.descriptionVal.split(';')
                for (let i = 0; i < arr.length; i++) {
                  const item = arr[i]
                  productInfo['description'] = productInfo.description.replaceAll(item, '')
                }
              } else {
                productInfo['description'] = productInfo.description.replaceAll(this.descriptionVal, '')
              }
              break
            case 4:
              productInfo['description'] = this.descriptionConfig.description
              break
            case 5:
              for (let i = 0; i < productInfo.tier_variation.length; i++) {
                const item1 = productInfo.tier_variation[i]
                for (let j = 0; j < item1.options.length; j++) {
                  const item2 = item1.options[j]
                  description += item2 + '\n'
                }
              }
              productInfo['description'] = this.descriptionConfig.description + '\n' + description
              break
          }
          this.getDescriptionLength(item)
          if (item.edit === 'description' && this.minLength !== 0 && productInfo.description.length < this.minLength) {
            this.batchStatus(item, '描述长度过短：最小长度' + this.minLength, false)
          } else {
            productInfo['description'] = productInfo['description'].trim().replaceAll(';', ' ').slice(0, this.maxLength)
            await this.handleProductEdit(productInfo, item)
          }
        } else {
          this.batchStatus(item, res.data, false)
          this.failNum++
        }
      } catch (error) {
        this.batchStatus(item, `更新描述异常`, false)
        this.failNum++
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    async setTitle(item, count = { count: 1 }) {
      try {
        let productInfo = {}
        this.batchStatus(item, `正在获取商品详情...`, true)
        const res = await this.getProductDetail(item)
        if (res.code === 200) {
          productInfo = res.data
          this.titleVal = this.titleVal.replaceAll('；', ';') // 兼容中文分号
          switch (this.titleRadio) {
            case 1:
              productInfo['name'] = this.titleVal
              break
            case 2:
              productInfo['name'] = this.titleVal + productInfo.name
              break
            case 3:
              productInfo['name'] = productInfo.name + this.titleVal
              break
            case 4:
              if (this.titleVal.indexOf(';') > -1) {
                const arr = this.titleVal.split(';')
                for (let i = 0; i < arr.length; i++) {
                  const item = arr[i]
                  productInfo['name'] = productInfo.name.replaceAll(item, '')
                }
              } else {
                productInfo['name'] = productInfo.name.replaceAll(this.titleVal, '')
              }
              break
          }
          // 设置标题长度
          this.getTitleLength(item)
          if (this.minLength !== 0 && productInfo.name.length < this.minLength) {
            this.batchStatus(item, '标题长度过短：最小长度' + this.minLength, false)
            this.failNum++
          } else {
            productInfo['name'] = productInfo['name'].trim().replaceAll(';', ' ').slice(0, this.maxLength)
            await this.handleProductEdit(productInfo, item)
          }
        } else {
          this.batchStatus(item, res.data, false)
          this.failNum++
        }
      } catch (error) {
        this.batchStatus(item, `更新标题异常`, false)
        this.failNum++
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    // 商品信息处理
    async getProductInfo(productInfo, item) {
      try {
        const isRefurbishProduct = false // 是否商品翻新（商品搬迁、翻新true 其它操作均为false）
        const isUseProductChannel = false // 当物流是否开放矛盾时（后台开启商品关闭），优先采用后台的物流（批量更新物流方式false 其它操作均为true）
        productInfo.id = Number(productInfo.id)
        productInfo.name = productInfo.name.toString().trim()
        productInfo.brand_id = Number(productInfo.brand_id)
        productInfo.size_chart = productInfo.size_chart.toString()
        productInfo.category_path = JSON.parse(JSON.stringify(productInfo.category_path))
        productInfo.add_on_deal = JSON.parse(JSON.stringify(productInfo.add_on_deal))
        // 处理属性信息
        if (productInfo?.attributes) {
          const attList = []
          let attObj = {}
          for (let i = 0; i < productInfo.attributes.length; i++) {
            const att = productInfo.attributes[i]
            const rawValue = att?.custom_value.raw_value?.toString()
            if (!rawValue && rawValue?.attribute_value_id?.toString() === '0') {
              continue
            }
            const attId = att.attribute_id.toString()
            if (!attId || attId === '0' || rawValue) {
              attObj = {
                attribute_id: Number(attId),
                custom_value: {
                  raw_value: att.custom_value.raw_value.toString(),
                  unit: att?.custom_value?.unit?.toString()
                }
              }
            } else {
              attObj = {
                attribute_id: Number(attId),
                attribute_value_id: Number(att.attribute_value_id)
              }
            }
            attList.push(attObj)
          }
          productInfo.attributes = attList
        }
        if (this.countryArr.includes(item.country)) {
          productInfo.ds_attr_rcmd_id = `${this.guid().toString()}|a|EN`
          productInfo.ds_cat_rcmd_id = `${this.guid().toString()}|c|EN`
        }
        productInfo.stock = Number(productInfo.stock)
        productInfo.parent_sku = productInfo.parent_sku.toString()
        productInfo.price = productInfo.price.toString()
        if (isRefurbishProduct && Number(productInfo.price_before_discount) > 0) {
          productInfo.price = productInfo.price_before_discount.toString()
        }
        productInfo.price_before_discount = productInfo.price_before_discount.toString()
        productInfo.input_normal_price = productInfo.price_info ? productInfo.price_info.input_normal_price.toString() : '0'
        productInfo.input_promotion_price = productInfo.price_info ? productInfo.price_info.input_promotion_price.toString() : '0'
        productInfo.weight = productInfo.weight.toString()
        productInfo.dimension = JSON.parse(JSON.stringify(productInfo.dimension))
        productInfo.pre_order = JSON.parse(productInfo.pre_order)
        productInfo.days_to_ship = Number(productInfo.days_to_ship)
        productInfo.description = productInfo.description.toString().trim()
        productInfo.installment_tenures = JSON.parse(JSON.stringify(productInfo.installment_tenures))
        // 处理商品 sku list
        this.getModelList(productInfo.model_list, isRefurbishProduct)
        try {
          // 获取物流
          const parmas = {}
          parmas['product_id'] = productInfo.id
          parmas['mallId'] = item.platform_mall_id
          const res = await this.$shopeemanService.getLogistics(item.country, parmas)
          // 处理物流方式
          if (res.code === 200) {
            productInfo.logistics_channels = await this.getLogisticsInfo(res.data.list, isUseProductChannel, item)
          }
        } catch (error) {
          console.log('商品信息物流异常', error)
        }
        productInfo.images = JSON.parse(JSON.stringify(productInfo.images))
        if (productInfo.tier_variation?.length > 0) {
          productInfo.tier_variation = JSON.parse(JSON.stringify(productInfo.tier_variation))
        }
        // 商品状态为8时，商品为下架状态
        if (productInfo.status.toString() === '8') {
          productInfo.unlisted = true
        }
        // 处理商品规格、尺寸信息
        if (productInfo.model_list?.length === 1 && productInfo.tier_variation?.length === 1) {
          if (!productInfo.tier_variation[0].options[0]) {
            productInfo.tier_variation[0].options[0] = !productInfo.tier_variation[0].name ? productInfo.model_list[0].name : productInfo.tier_variation[0].name
          }
          if (!productInfo.tier_variation[0].name) {
            productInfo.tier_variation[0].name = productInfo.model_list[0].name
          }
        }
        if (productInfo?.min_purchase_limit_info?.min_purchase_limit) {
          productInfo.min_purchase_limit_info.min_purchase_limit = Number(productInfo.min_purchase_limit_info.min_purchase_limit) ? Number(productInfo.min_purchase_limit_info.min_purchase_limit) : 1
          productInfo.min_purchase_limit = productInfo.min_purchase_limit_info.min_purchase_limit < 1 ? 1 : productInfo.min_purchase_limit_info.min_purchase_limit
        }
        // 商品更新前需判断站点处理商品价格
        this.checkCountryPriceForID(productInfo, item)
      } catch (error) {
        console.log('商品信息处理异常', error)
      }
    },
    // 商品更新前需判断站点处理商品价格
    checkCountryPriceForID(productInfo, item) {
      // 更新商品时，查看是否为印尼站点
      // 印尼站点的价格更新与其他站点有很大区别
      if (item.country === 'ID') {
        // 价格
        if (productInfo.input_normal_price !== '0') {
          if (item.in_promotion) {
            productInfo.price = productInfo.input_normal_price
          }
          productInfo.price = productInfo.input_normal_price
        } else {
          for (let i = 0; i < productInfo.model_list.length; i++) {
            const mItem = productInfo.model_list[i]
            if (productInfo.price === item.price.toString()) {
              if (item.in_promotion) {
                productInfo.price = mItem.input_promotion_price
                break
              }
              productInfo.price = mItem.input_normal_price
              break
            }
          }
        }
        // SKU价格
        if (productInfo.model_list?.length > 0) {
          for (let i = 0; i < productInfo.model_list.length; i++) {
            const mItem = productInfo.model_list[i]
            if (item.in_promotion) {
              item.price = item.input_normal_price
              continue
            }
            mItem.price = mItem.input_normal_price
          }
        }
      }
    },
    // 处理物流方式
    async getLogisticsInfo(logisticsJarray, isUseProductChannel, item) {
      const logModelList = []
      let idDatas = []
      if (logisticsJarray?.length > 0) {
        const params = {
          platform_mall_id: item.platform_mall_id
        }
        // 获取商家后台的物流方式
        let res = await this.$shopeemanService.getChinese(item.country, '/api/v3/logistics/get_channel_list/?', params)
        res = JSON.parse(JSON.parse(res).data)
        if (res?.data?.list) {
          idDatas = res.data.list
        }
        // 过滤无效物流
        logisticsJarray = this.filterLogistics(logisticsJarray, idDatas, isUseProductChannel)
      }
      for (let i = 0; i < logisticsJarray.length; i++) {
        const logistics = logisticsJarray[i]
        const obj = {}
        obj.channelid = Number(logistics.channel_id)
        obj.price = logistics.price ? logistics.price.toString() : '0.00'
        obj.enabled = JSON.parse(logistics.enabled)
        obj.cover_shipping_fee = JSON.parse(logistics.cover_shipping_fee)
        obj.sizeid = Number(logistics.size_id)
        obj.size = Number(logistics.size)
        obj.parent_channel_id = Number(logistics.parent_channel_id)
        logModelList.push(obj)
      }
      return logModelList
    },
    // 过滤无效物流
    filterLogistics(logisticsJarray, idDatas, isUseProductChannel) {
      const newLogisticsJarray = []
      for (let i = 0; i < idDatas.length; i++) {
        const channels = idDatas[i]
        const channelId = channels.channel_id.toString()
        const parentChannelId = 'parent_channel_id' in channels ? channels.parent_channel_id.toString() : '0'
        if (parentChannelId !== '0') {
          continue
        }
        if (!JSON.parse(channels.is_mask_channel) && !JSON.parse(channels.enabled)) {
          continue
        }
        let isAddToNewArray = false
        for (let j = 0; j < logisticsJarray.length; j++) {
          const logistics = logisticsJarray[j]
          if (logistics.channel_id.toString() === channelId) {
            if (!isUseProductChannel) {
              logistics.enabled = channels.enabled.toString()
            }
            if (!logistics?.default_price) {
              logistics.default_price = '0.00'
            }
            newLogisticsJarray.push(logistics)
            isAddToNewArray = true
            break
          }
        }
        if (!isAddToNewArray) {
          channels.price = channels.price ? channels.price.toString : '0.00'
          channels.cover_shipping_fee = !((channels.cover_shipping_fee.toString() === '0' || channels.cover_shipping_fee.toString() === 'false'))
          channels.size_id = 0
          channels.size = 0
          newLogisticsJarray.push(channels)
        }
      }
      return newLogisticsJarray
    },
    // 处理商品 sku list
    getModelList(itemModelsJarray, isRefurbishProduct) {
      try {
        if (itemModelsJarray?.length > 0) {
          for (let i = 0; i < itemModelsJarray.length; i++) {
            const item = itemModelsJarray[i]
            item.id = Number(item.id)
            item.name = !item.name && item.sku ? item.sku : item.name.toString()
            item.sku = item.sku.toString()
            item.stock = Number(item.stock)
            item.price = item.price.toString()
            if (isRefurbishProduct && Number(item.price_before_discount) > 0) {
              item.price = item.price_before_discount.toString()
            }
            item.tier_index = JSON.parse(JSON.stringify(item.tier_index))
            item.input_normal_price = item.price_info.input_normal_price.toString()
            item.input_promotion_price = item.price_info.input_promotion_price.toString()
            item.is_default = JSON.parse(item.is_default) ? JSON.parse(item.is_default) : false
          }
        }
      } catch (error) {
        console.log('商品skulist处理异常', error)
      }
    },
    // 删除有活动的商品
    async deleteActicity(item) {
      try {
        for (let i = 0; i < item.campaignTypeList.Name.length; i++) {
          const campaignType = item.campaignTypeList.Name[i]
          let activityid = ''
          if (campaignType === 1) {
            let activityid = ''
            // 获取该商品参加的折扣活动ID
            const res = await this.GoodsList.getMallDiscountsIdByKeyword(item)
            activityid = res.data.hits[0].promotionid
            // 删除
            const delRes = await this.GoodsList.deleteDiscountCampainDetail(item, activityid)
            if (delRes.code !== 200) return { batchStatus: `删除折扣活动失败：${delRes.data}`, color: false, code: delRes.code }
          } else if (campaignType === 3) {
          // 获取该商品参加的套装活动ID
            const res = await this.GoodsList.getBundleDeal(item, activityid)
            activityid = res.data.hits[0].bundle_deal_id
            // 删除
            const delRes = await this.GoodsList.deleteBundleGoods(item, activityid)
            if (delRes.code !== 200) return { batchStatus: `删除套装活动失败：${delRes.data}`, color: false, code: delRes.code }
          } else if (campaignType === 4) {
            // 获取该商品参加的加购活动ID
            const res1 = await this.GoodsList.getAddOnDealStandardSearch(item)
            activityid = res1.data.add_on_deal_list[0].add_on_deal_id
            // IsSelected为真则是主商品
            if (item.campaignTypeList.IsSelected) {
            // 获取主商品加购活动列表
              const res2 = await this.GoodsList.getAdd0nDealAggrMainItemList(item, activityid)
              const filterData = res2.data.main_item_list.filter(listItem => {
                return listItem.item_id === item.id
              })
              let status = ''
              if (filterData[0].status === 1) {
                status = 0
              }
              if (filterData[0].status === 2) {
                status = 1
              }
              // 删除主商品加购活动商品
              const delRes1 = await this.GoodsList.deleteAddOnDealMainItemList(item, status, activityid)
              if (delRes1.code !== 200) return { batchStatus: `删除主商品加购活动失败：${delRes1.data}`, color: false, code: delRes1.code }
            } else {
              // 获取子商品列表
              const res3 = await this.GoodsList.getAdd0nDealAggrSubItemList(item, activityid)
              const subItemList = res3.data.sub_item_list.filter(listItem => {
                return listItem.item_id === item.id
              })
              subItemList.map(filterItem => {
                delete filterItem.input_sub_item_price
                delete filterItem.price
                delete filterItem.sub_item_price
                filterItem.status = 0
              })
              if (subItemList?.length > 0) {
                for (let j = 0; j < subItemList.length; j++) {
                // 删除子商品加购活动商品
                  const delRes2 = await this.GoodsList.deleteAddOnDealSubItemList(item, activityid, subItemList)
                  if (delRes2.code !== 200) return { batchStatus: `删除子商品加购活动失败：${delRes2.data}`, color: false, code: delRes2.code }
                }
              }
            }
          } else {
            continue
          }
        }
        return { batchStatus: '删除活动成功', color: true, code: 200 }
      } catch (error) {
        console.log('删除活动异常', error)
        return { batchStatus: '删除活动异常', color: false, code: -2 }
      }
    },
    // 批量上下架
    async batchUpDownProduct() {
      this.initData()
      this.updateNum = this.multipleSelection.length
      await batchOperation(this.multipleSelection, this.upDownProduct)
      this.operationBut = false
    },
    async upDownProduct(item, count = { count: 1 }) {
      try {
        // 下架判断是否有活动
        if (this.upDown) {
          if (item.campaignTypeList.Name?.length > 0) {
          // 删除有活动的商品
            const { batchStatus, color } = await this.deleteActicity(item, item.campaignTypeList)
            this.batchStatus(item, batchStatus, color)
          }
        }
        const params = [{ id: Number(item.id), unlisted: this.upDown }]
        const data = { mallId: item.platform_mall_id }
        const res = await this.$shopeemanService.handleGoodsDelist(item.country, data, params)
        if (res.code === 200) {
          this.successNum++
          this.batchStatus(item, `${this.upDown ? '下架成功' : '上架成功'}`, true)
        } else {
          this.failNum++
          this.batchStatus(item, res.data, false)
        }
      } catch (error) {
        console.log(error)
        this.failNum++
        this.batchStatus(item, `${this.upDown ? '下架异常' : '上架异常'}`, false)
      } finally {
        const temp = 100 / this.multipleSelection.length
        this.percentage += temp
        --count.count
      }
    },
    // 批量删除
    async batchDelete() {
      if (this.tableData?.length > 0 && (this.queryType === 100 || this.queryType === 200)) {
        this.deleteData = this.tableData
      } else {
        this.deleteData = this.multipleSelection
      }
      this.$confirm(`确定删除【${this.deleteData.length}】个商品吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.initData()
        this.updateNum = this.deleteData.length
        await batchOperation(this.deleteData, this.deleteProduct)
        await this.deleteCollectGoodsInfo()
        this.operationBut = false
      })
    },
    async deleteProduct(item, count = { count: 1 }) {
      try {
        this.batchStatus(item, `正在删除商品...`, true)
        // 判断是否有活动
        if (item.campaignTypeList.Name?.length > 0) {
          // 删除有活动的商品
          const { batchStatus, color, code } = await this.deleteActicity(item, item.campaignTypeList)
          if (code !== 200) return this.batchStatus(item, batchStatus, color)
        }
        const params = {
          product_id_list: [Number(item.id)],
          mallId: item.platform_mall_id
        }
        const res = await this.$shopeemanService.handleGoodsDelete(item.country, params)
        if (res.code === 200) {
          this.successNum++
          this.batchStatus(item, `删除成功`, true)
          this.deleteId.push(item.id)
        } else {
          this.failNum++
          this.batchStatus(item, `删除失败`, false)
        }
      } catch (error) {
        this.failNum++
        this.batchStatus(item, `删除异常`, false)
        console.log('删除异常', error)
      } finally {
        const temp = 100 / this.deleteData.length
        this.percentage += temp
        --count.count
      }
    },
    // 删除云商品记录
    async deleteCollectGoodsInfo() {
      this.$refs.Logs.writeLog(`正在删除云商品库数据...`, true)
      const res = await this.GoodsList.deleteCollectGoodsInfo(this.deleteId)
      if (res.code === 200) {
        this.$refs.Logs.writeLog(`删除云商品库数据成功`, true)
      } else {
        this.$refs.Logs.writeLog(`删除云商品库数据失败：${res.data}`, false)
      }
    },
    // 获取活动类型
    getGoodsActInfo(item) {
      try {
        let upcomingJarray = null
        const list = {}
        const Name = []
        // 即将开始状态
        if (item?.ongoing_upcoming_campaigns?.upcoming_campaigns) {
          upcomingJarray = item.ongoing_upcoming_campaigns.upcoming_campaigns
          if (upcomingJarray?.length > 0) {
            for (let i = 0; i < upcomingJarray.length; i++) {
              const item = upcomingJarray[i]
              Name.push(item.campaign_type)
            }
          }
        }
        // 正在进行状态
        if (item?.ongoing_upcoming_campaigns?.ongoing_campaigns) {
          upcomingJarray = item.ongoing_upcoming_campaigns.ongoing_campaigns
          if (upcomingJarray?.length > 0) {
            for (let i = 0; i < upcomingJarray.length; i++) {
              const item = upcomingJarray[i]
              Name.push(item.campaign_type)
            }
          }
        }
        list.Name = [...new Set(Name)]
        list.IsSelected = item.add_on_deal
        return list
      } catch (error) {
        console.log('获取活动类型异常', error)
      }
    },
    // 发货天数范围
    getDayLength(val) {
      const country = val ? val.country : this.country
      switch (country) {
        case 'TH':
        case 'MY':
        case 'SG':
          this.minDays = 7
          this.maxDays = 30
          this.productDay = val ? this.productDay : 15
          this.preOrderDeliveryDays = 2
          break
        case 'TW':
          this.minDays = 5
          this.maxDays = 20
          this.productDay = val ? this.productDay : 10
          this.preOrderDeliveryDays = 3
          break
        case 'PH':
          this.minDays = 7
          this.maxDays = 30
          this.productDay = val ? this.productDay : 10
          this.preOrderDeliveryDays = 2
          break
        case 'ID':
          this.minDays = 7
          this.maxDays = 15
          this.productDay = val ? this.productDay : 10
          this.preOrderDeliveryDays = 2
          break
        case 'VN':
          this.minDays = 7
          this.maxDays = 15
          this.productDay = val ? this.productDay : 7
          this.preOrderDeliveryDays = 2
          break
        case 'BR':
          this.minDays = 5
          this.maxDays = 10
          this.productDay = val ? this.productDay : 7
          this.preOrderDeliveryDays = 3
          break
      }
    },
    // 判断描述长度
    getDescriptionLength(item) {
      switch (item.country) {
        case 'TH':
          this.maxLength = 3000
          this.minLength = 25
          break
        case 'VN':
          this.maxLength = 3000
          this.minLength = 100
          break
        case 'MY':
        case 'SG':
        case 'ID':
          this.maxLength = 3000
          this.minLength = 20
          break
        case 'PH':
          this.maxLength = 3000
          this.minLength = 5
          break
        case 'TW':
        case 'BR':
          this.maxLength = 3000
          this.minLength = 1
          break
      }
    },
    // 判断标题长度
    getTitleLength(item) {
      switch (item.country) {
        case 'TH':
        case 'MY':
          this.maxLength = 120
          this.minLength = 20
          break
        case 'VN':
        case 'SG':
          this.maxLength = 120
          this.minLength = 10
          break
        case 'TW':
          this.maxLength = 60
          this.minLength = 5
          break
        case 'PH':
          this.maxLength = 100
          this.minLength = 20
          break
        case 'ID':
          this.maxLength = 100
          this.minLength = 5
          break
        case 'BR':
          this.maxLength = 120
          this.minLength = 1
          break
      }
    },
    // 批量操作
    operation(operationName) {
      if (!this.multipleSelection?.length) return this.$message('没有可操作的商品，请选择')
      this[operationName]()
    },
    // 选择模板
    async selectDescription(type) {
      if (type === 0) {
        const descriptionTemplateListJson = await this.$commodityService.descriptionTemplateList()
        const descriptionTemplateListRes = JSON.parse(descriptionTemplateListJson)
        this.descriptionLabelList = descriptionTemplateListRes.data || []
        if (this.descriptionConfigId) {
          const item = this.descriptionLabelList.filter(i => i && i.id === this.descriptionConfigId)[0]
          this.descriptionConfig.text = item && item.description || this.descriptionConfig.text
          this.descriptionConfig.description = item && item.description || this.descriptionConfig.description
          this.descriptionConfig.lable = item && item.lable || ''
        } else {
          this.descriptionConfigId = this.descriptionLabelList[0] && this.descriptionLabelList[0].id || ''
        }
        this.descriptionVisible = true
      } else {
        if (type === 1) {
          const label = this.descriptionConfig.tag || this.descriptionConfig.lable
          const descriptionTemplate = await this.$commodityService.uploadDescriptionTemplate(label, this.descriptionConfig.text)
          const data = JSON.parse(descriptionTemplate)
          this.descriptionConfig.tag = ''
          this.descriptionConfigId = parseInt(data.data)
          this.descriptionConfig.description = this.descriptionConfig.text
        } else if (type === 2) {
          const resJson = await this.$commodityService.deleteDescriptionTemplate(this.descriptionConfigId)
          const res = JSON.parse(resJson)
          if (res.code === 200) {
            this.descriptionConfigId = ''
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        } else if (type === 3) {
          this.descriptionConfig.description = this.descriptionConfig.text
        } else if (type === 4) {
          this.descriptionConfig.text = this.descriptionConfig.description
        }
        this.descriptionVisible = false
      }
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
        item.CustomShipFee = ''
        this.logisticsList.push(item)
        if (item.IsSelected) {
          this.logistics.push(item.ShipId)
        }
      })
      this.setIsCustomShipFee()
    },
    // 查询数据
    async queryData() {
      if (!this.selectMallList.length) return this.$message('请选择店铺')
      if (!this.goodsStatus?.length) return this.$message('请选择商品状态')
      if (!this.source?.length) return this.$message('请选择上家来源')
      if (this.soldMin < 0 || this.soldMax > 99999999) return this.$message('销售量请输入0-99999999之间的数字')
      if (this.viewMin < 0 || this.viewMax > 99999999) return this.$message('访客量请输入0-99999999之间的数字')
      if (this.likeMin < 0 || this.likeMax > 99999999) return this.$message('粉丝量请输入0-99999999之间的数字')
      if (this.priceMin < 0 || this.priceMax > 99999999) return this.$message('价格请输入0-99999999之间的数字')
      if (this.goodsMin < 0 || this.goodsMax > 99999999) return this.$message('商品数量请输入0-99999999之间的数字')
      this.initData()
      this.flag = false
      this.flag2 = true
      this.queryNum = 0
      this.tableData = []
      this.$refs.Logs.consoleMsg = ''
      this.showConsole = false
      if (this.queryType === 1) {
        this.$refs.Logs.writeLog(`开始查询...`, true)
      } else if (this.queryType === 100) {
        this.$refs.Logs.writeLog(`开始查询100小时内无流量商品`, true)
      } else if (this.queryType === 200) {
        this.$refs.Logs.writeLog(`开始查询200小时内无流量商品`, true)
      }
      this.selectMallList.forEach(item => {
        item.pageNumber = 1
        item.mylist = []
      })
      this.index = 1
      for (let i = 0; i < this.goodsStatus.length; i++) {
        if (this.flag) {
          break
        }
        const item = this.goodsStatus[i]
        this.goodsStatusVal = item
        if (item === 0 || this.queryType === 100 || this.queryType === 200) {
          this.goodsStatusName = ''
          await batchOperation(this.selectMallList, this.getTableData)
          break
        } else {
          this.goodsStatusName = this.statusFilter[item]
          this.selectMallList.forEach(item => {
            item.pageNumber = 1
            item.mylist = []
          })
          await batchOperation(this.selectMallList, this.getTableData)
        }
      }
      this.operationBut = false
      this.showConsole = true
      this.$refs.Logs.writeLog(`查询完成`, true)
      if (this.queryType === 100 || this.queryType === 200) {
        if (this.tableData?.length > 0) {
          this.batchDelete()
        }
      }
    },
    // 获取数据
    async getTableData(mItem, count = { count: 1 }) {
      if (this.flag) {
        this.stop()
      }
      let res = ''
      let mallName = ''
      try {
        const params = {}
        params['mItem'] = mItem
        params['pageSize'] = this.pageSize
        params['listType'] = this.goodsStatusName ? this.goodsStatusName : 'all'
        mallName = mItem.mall_alias_name || mItem.platform_mall_name
        if ((this.searchType !== 'originId' && this.keyword) || this.goodsMax < 99999999 || this.goodsMin > 0 || this.soldMin > 0 || this.soldMax < 99999999 || this.categoryName) {
          if (this.keyword && !(this.queryType === 100 || this.queryType === 200)) {
            params['searchType'] = this.searchType
            params['keyword'] = this.keyword.trim()
          }
          if (this.categoryName && !(this.queryType === 100 || this.queryType === 200)) {
            params['categoryId'] = this.categoryList.categoryList[this.categoryList.categoryList.length - 1].category_id
          }
          params['goodsMin'] = this.goodsMin
          params['goodsMax'] = this.goodsMax
          if (!(this.queryType === 100 || this.queryType === 200)) {
            params['soldMin'] = this.soldMin
            params['soldMax'] = this.soldMax
          }
          res = await this.GoodsList.searchProductList(params)
        } else {
          res = await this.GoodsList.getMpskuList(params)
        }
        if (res.code === 200) {
          if (res.data.list?.length) {
            this.$refs.Logs.writeLog(`查询店铺【${mallName}】第【${mItem.pageNumber}】页数据：${res.data.list.length}`, true)
            // 组装数据
            await this.setTableData(res.data.list, mItem, mallName)
            // 过滤数据
            const newData = this.filterData(res.data.list)
            if (!this.productNumChecked) {
              this.tableData = this.tableData.concat(newData)
              this.queryNum = this.tableData.length
            } else {
              mItem.mylist = newData
            }
            console.log('tableData', res.data.list)
          }
        } else {
          this.$refs.Logs.writeLog(`店铺【${mallName}】${res.data}`, false)
        }
      } catch (error) {
        console.log(error)
        this.$refs.Logs.writeLog(`店铺【${mallName}】获取数据异常`, false)
      } finally {
        const nameData1 = this.tableData.filter(item => { return item.mallName === mallName })
        // 单店查询商品数量
        if (this.productNumChecked) {
          // 如果当前店铺长度小于设置的单店值
          if (nameData1.length < Number(this.productNum)) {
            // 切割长度
            const num = Number(this.productNum) - nameData1.length
            this.tableData = this.tableData.concat(mItem.mylist.slice(0, num))
            // 加入数据后查询当前店铺的长度
            const nameData2 = this.tableData.filter(item => { return item.mallName === mallName })
            // 当前店铺长度 大于或等于设置的单店值 设置flag2 值，不执行下一次查询
            if (nameData2.length >= Number(this.productNum)) {
              this.flag2 = false
            }
          }
        }
        if (res?.data?.list?.length >= this.pageSize && this.flag2) {
          mItem.pageNumber++
          if (!this.flag) {
            await this.getTableData(mItem, count)
          }
        } else {
          this.queryNum = this.tableData.length
          const len = this.goodsStatus.length === 8 ? 1 : this.goodsStatus.length
          this.percentage = (this.index++ / (this.selectMallList.length * len)) * 100
          --count.count
        }
      }
    },
    // 一键查询禁卖
    async queryBanned() {
      this.initData()
      this.tableData = []
      this.operationBut = true
      this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      this.flag = false
      this.flag2 = true
      this.$refs.Logs.writeLog(`开始查询禁卖商品...`, true)
      this.selectMallList.forEach(item => {
        item.pageNumber = 1
        item.mylist = []
      })
      await batchOperation(this.selectMallList, this.getBannedData)
      this.operationBut = false
      this.showConsole = true
      this.$refs.Logs.writeLog(`禁卖商品查询结束`, true)
    },
    async getBannedData(mItem, count = { count: 1 }) {
      if (this.flag) {
        this.stop()
      }
      let res = ''
      let mallName = ''
      try {
        const params = {}
        params['mItem'] = mItem
        params['pageSize'] = this.pageSize
        params['listType'] = 'banned'
        params['listOrderType'] = 'list_time_asc'
        mallName = mItem.mall_alias_name || mItem.platform_mall_name
        res = await this.GoodsList.getMpskuList(params)
        if (res.code === 200) {
          if (res.data.list?.length) {
            this.$refs.Logs.writeLog(`查询店铺【${mallName}】第【${mItem.pageNumber}】页数据：${res.data.list.length}`, true)
            // 组装数据
            await this.setTableData(res.data.list, mItem, mallName)
            if (!this.productNumChecked) {
              this.tableData = this.tableData.concat(res.data.list)
              this.queryNum = this.tableData.length
            } else {
              mItem.mylist = res.data.list
            }
          }
          console.log('list', res.data.list)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mallName}】${res.data}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`店铺【${mallName}】获取数据异常`, false)
      } finally {
        const nameData1 = this.tableData.filter(item => { return item.mallName === mallName })
        // 单店查询商品数量
        if (this.productNumChecked) {
          // 如果当前店铺长度小于设置的单店值
          if (nameData1.length < Number(this.productNum)) {
            // 切割长度
            const num = Number(this.productNum) - nameData1.length
            this.tableData = this.tableData.concat(mItem.mylist.slice(0, num))
            // 加入数据后查询当前店铺的长度
            const nameData2 = this.tableData.filter(item => { return item.mallName === mallName })
            // 当前店铺长度 大于或等于设置的单店值 设置flag2 值，不执行下一次查询
            if (nameData2.length >= Number(this.productNum)) {
              this.flag2 = false
            }
          }
        }
        if (res?.data?.list?.length >= this.pageSize && this.flag2) {
          mItem.pageNumber++
          if (!this.flag) {
            await this.getBannedData(mItem, count)
          }
        } else {
          this.queryNum = this.tableData.length
          const temp = 100 / this.selectMallList.length
          this.percentage += temp
          --count.count
        }
      }
    },
    // 表格数据组装
    async setTableData(data, mItem, mallName) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
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
        // 获取类目名
        for (let j = 0; j < item.category_path.length; j++) {
          const cItem = item.category_path[j]
          const res = await this.GoodsList.getCategoryName(item.country, cItem, '0', '')
          if (res.code === 200) {
            categoryName.push(res.data.categories ? `${res.data.categories[0].category_name}(${res.data.categories[0].category_cn_name})` : '')
          } else {
            categoryName = ''
            this.$refs.Logs.writeLog(`${res.data}`, false)
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
        item.platform = this.platformData['platform']
        item.campaignTypeList = this.getGoodsActInfo(item)// 设置活动类型
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
        // 过滤商品状态  6：审核中
        if (this.goodsStatusVal === 6 && item.status !== 6) {
          continue
        }
        // 过滤商品状态  6：审核中
        if (this.goodsStatusVal !== 6 && item.status === 6) {
          continue
        }
        // 过滤是否售空
        if (!(this.queryType === 100 || this.queryType === 200) && Number(this.sellStatus) === 1 && Number(item.stock) > 0) {
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
        // 过滤访客量
        if (!(Number(item.view_count) >= Number(this.viewMin))) {
          continue
        }
        if (!(Number(item.view_count) <= Number(this.viewMax))) {
          continue
        }
        // 过滤粉丝量
        if (!(Number(item.like_count) >= Number(this.likeMin))) {
          continue
        }
        if (!(Number(item.like_count) <= Number(this.likeMax))) {
          continue
        }
        // 过滤无流量商品
        if (this.queryType === 100) {
          if (((Number(new Date().getTime()) - Number(item.create_time)) < 360000000) || Number(item.view_count) !== 0 || Number(item.like_count) !== 0) {
            continue
          }
        }
        if (this.queryType === 200) {
          if (((Number(new Date().getTime()) - Number(item.create_time)) < 720000000) || Number(item.view_count) !== 0 || Number(item.like_count) !== 0) {
            continue
          }
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
      // 链接拼接
      const { url, platformTypeStr } = getGoodsUrl(platform, this.platformData)
      this.platformData['url'] = url
      this.platformData['platformTypeStr'] = platformTypeStr
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
          this.platformData['site'] = arr[2]
          this.platformData['shopId'] = arr[3]
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
      if (key === 'logistics') {
        this.setIsCustomShipFee()
      }
    },
    changeSelect(val, key) {
      if (!val.includes(0) && val.length === this[key].length) {
      } else if (val.includes(0) && val.length - 1 < this[key].length) {
        this[key] = this[key].filter((item) => {
          return item !== 0
        })
      }
      if (key === 'logistics') {
        this.setIsCustomShipFee()
      }
    },
    // 设置运费
    setIsCustomShipFee() {
      this.isCustomShipFee = this.logistics.some(item1 => {
        return this.logisticsList.some(item2 => {
          return item2.ShipId === item1 && item2.IsCustomShipFee
        })
      })
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
      } else if (type === 2) {
        this.$BaseUtilService.openUrl(row.url)
      } else {
        this.$BaseUtilService.openUrl(row)
      }
    },
    changeMallList(val) {
      this.selectMallList = val
      this.country = val.country
      console.log('changeMallList', val)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function(c) {
          var r = (Math.random() * 16) | 0
          var v = c == 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    handelClose() {
      this.platformData = []
      this.sourceGoodsUrl = ''
      this.sourceId = ''
    },
    batchStatus(item, msg, status) {
      this.$set(item, 'batchStatus', msg)
      this.$set(item, 'color', status ? 'green' : 'red')
    },
    stop() {
      if (!this.isSync) {
        this.$refs.Logs.writeLog(`停止操作`, true)
        terminateThread()
      }
    },
    initData() {
      this.isSync = false
      this.operationBut = true
      this.percentage = 0
      this.updateNum = 0
      this.successNum = 0
      this.failNum = 0
    },
    // 导出数据
    exportTableData() {
      if (!this.tableData?.length) return this.$message('暂无数据导出')
      let str = `<tr>
          <td>站点</td>
          <td>店铺名</td>
          <td>主图</td>
          <td>类目</td>
          <td>上家类型</td>
          <td>上家链接</td>
          <td>itemID</td>
          <td>itemID链接</td>
          <td>价格</td>
          <td>库存</td>
          <td>标题</td>
          <td>状态</td>
          <td>创建时间</td>
          <td>更新时间</td>
          <td>销售量</td>
          <td>访客量</td>
          <td>粉丝量</td>
        </td>`
      this.tableData.forEach(item => {
        str += `<tr>
        <td>${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
        <td>${item.mallName ? item.mallName : '' + '\t'}</td>
        <td>${item.images ? this.$filters.imageRender([item.images]) : '' + '\t'}</td>
        <td>${item.categoryName ? item.categoryName : '' + '\t'}</td>
        <td>${item.platformTypeStr ? item.platformTypeStr : '' + '\t'}</td>
        <td>${item.url ? item.url : '' + '\t'}</td>
        <td>${item.id ? item.id : '' + '\t'}</td>
        <td>${item.id ? `${this.$filters.countryShopeebuyCom(item.country)}/product/${item.platform_mall_id}/${item.id}` : '' + '\t'}</td>
        <td>${item.price ? item.price : '' + '\t'}</td>
        <td>${item.stock ? item.stock : '' + '\t'}</td>
        <td>${item.name ? item.name : '' + '\t'}</td>
        <td>${item.status ? this.statusObj[item.status] : '' + '\t'}</td>
        <td>${item.create_time ? this.$dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss') : '' + '\t'}</td>
        <td>${item.modify_time ? this.$dayjs(item.modify_time).format('YYYY-MM-DD HH:mm:ss') : '' + '\t'}</td>
        <td>${item.sold ? item.sold : '' + '\t'}</td>
        <td>${item.view_count ? item.view_count : '' + '\t'}</td>
        <td>${item.like_count ? item.like_count : '' + '\t'}</td>
        </tr>`
      })
      exportExcelDataCommon('商品列表数据', str)
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

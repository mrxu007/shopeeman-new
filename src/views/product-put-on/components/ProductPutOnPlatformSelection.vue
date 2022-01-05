<template>
  <div class="contaniner">
    <header>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="关键词采集" name="keyPage">
          <div class="keyword-container">
            <div class="keyword-banner-bar">
              <div v-for="item in keyworBar" :key="item.value" class="barChilren" :class="{ active: currentKeywordPlatform === item.value }" @click="switchPlatform(item)">{{ item.label }}</div>
            </div>
            <div class="keyword-banner-content">
              <ul class="item con-sub-1">
                <!-- 公共属性 -->
                <li v-show="isShowPdd">
                  <el-radio v-model="commonAttr.pddRadio" :label="1">云端采集(无需账号)</el-radio>
                  <!-- <el-radio v-model="radio" label="2">备选项</el-radio> -->
                </li>
                <li v-show="isShowPage">
                  <p>开始页码：</p>
                  <el-input v-model="commonAttr.StartPage" size="mini" />
                  <p>总页码：</p>
                  <el-input v-model="commonAttr.EndPage" size="mini" style="width:85px" />
                  <el-tooltip v-show="isShowPageSize20 || isShowPageSize50" placement="top">
                    <div v-show="isShowPageSize20" slot="content" class="tip">20条/页</div>
                    <div v-show="isShowPageSize50" slot="content" class="tip">50条/页,最多50页</div>
                    <div class="size-icon">
                      <i class="el-icon-question" style="" />
                    </div>
                  </el-tooltip>
                </li>
                <li v-show="isShowTaobao">
                  <p>排序方式：</p>
                  <el-select v-model="commonAttr.shopeeSortTypeVal" placeholder="" size="mini">
                    <el-option v-for="(item, index) in commonAttr.shopeeSortType" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                </li>
                <li v-show="isShowTaobao">
                  <p>单词最大：</p>
                  <el-input v-model="commonAttr.wordLimit" placeholder="" size="mini" />
                </li>

                <li v-show="isShowSales">
                  <p>销量区间：</p>
                  <el-input v-model="commonAttr.StartSales" size="mini" />
                  <span class="slot">-</span>
                  <el-input v-model="commonAttr.EndSales" size="mini" />
                </li>
                <li v-show="isShowPrice">
                  <p>价格区间：</p>
                  <el-input v-model="commonAttr.StartPrice" size="mini" />
                  <span class="slot">-</span>
                  <el-input v-model="commonAttr.EndPrice" size="mini" />
                </li>

                <!-- 虾皮 -->
                <li v-show="isShowShopeeSite" class="li-shopee">
                  <p>站点：</p>
                  <el-select v-model="commonAttr.shopeeSiteCode" placeholder="" size="mini" @change="getShopeeGoodsPlace">
                    <el-option v-for="(item, index) in commonAttr.shopeeSite" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                  <p class="li-shopee-spec">排序方式：</p>
                  <el-select v-model="commonAttr.shopeeSortTypeVal" placeholder="" size="mini">
                    <el-option v-for="(item, index) in commonAttr.shopeeSortType" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                </li>
                <li v-show="isShowShopeeSite" class="li-shopee">
                  <p>出货地点：</p>
                  <el-select v-model="commonAttr.shopeePlaceVal" placeholder="" size="mini" multiple collapse-tags @change="selectShopeePlaceValEvent">
                    <el-checkbox v-model="isSelectAll" label="全部" @change="selectShopeeAllEvent" />
                    <el-option v-for="(item, index) in commonAttr.shopeePlaceOrigin" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                  <el-checkbox v-model="commonAttr.isShopeeOffice" class="li-shopee-spec" label="全部">过滤虾皮官方店铺商品</el-checkbox>
                </li>
                <!-- lazada -->
                <li v-show="isShowLazadaSite">
                  <p>站点：</p>
                  <el-select v-model="commonAttr.lazadaSiteCode" placeholder="" size="mini" @change="getLazadaGoodsPlace">
                    <el-option v-for="(item, index) in commonAttr.lazadaSite" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                </li>
                <li v-show="isShowLazadaSite">
                  <div v-for="(item, itemKey, index) in commonAttr.lazadaPlaceOrigin" :key="index">
                    <p style="min-width: 128px">{{ itemKey }}</p>
                    <el-select v-model="commonAttr[`lazadaPlaceVal${index}`]" placeholder="" size="mini" multiple collapse-tags @change="selectLazadaPlaceValEvent(itemKey, index)">
                      <el-checkbox v-model="isSelectAll2[index]" label="全部" @change="selectLazadaAllEvent(itemKey, index)" />
                      <el-option v-for="(subItem, subIndex) in item" :key="subIndex" :label="subItem.label" :value="subItem.value" />
                    </el-select>
                  </div>
                </li>
                <li v-show="isShowSort">
                  <p>排序方式：</p>
                  <el-select v-model="commonAttr.alibabaSortTypeVal" placeholder="" size="mini">
                    <el-option v-for="(item, index) in commonAttr.alibabaSortType" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                </li>
                <li v-show="isShowCreateAt">
                  <p>创建时间：</p>
                  <el-date-picker
                    v-model="commonAttr.value2"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="commonAttr.pickerOptions"
                    value-format="yyyy-MM-dd"
                    size="mini"
                  />
                </li>
              </ul>
              <div class="item con-sub-3">
                <div class="size-icon" :style="isShowKeyTip?'margin-top: 3px;':'margin-top: 5px;'">关键词(一行一个)
                  <el-tooltip v-show="isShowKeyTip" placement="top">
                    <div slot="content" class="tip">采集请使用对应的站点语言搜索</div>
                    <i class="el-icon-question" style="" />
                  </el-tooltip>
                </div>
                <el-input v-model="key" size="mini" type="textarea" :rows="8" resize="none" />
              </div>
              <div class="item con-sub-3">
                <p class="text">过滤关键词(一行一个)</p>
                <el-input v-model="commonAttr.keyFilter" size="mini" type="textarea" :rows="8" resize="none" />
              </div>
              <!--操作按钮 -->
              <ul class="item con-sub-2">
                <li>
                  <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="StartCollection">开始采集</el-button>
                  <el-button type="primary" size="mini" @click="flag = true">取消采集</el-button>
                </li>
                <li class="li-item-2">
                  <p>起：</p>
                  <el-input v-model="start" size="mini" placeholder="" />
                  <p>止：</p>
                  <el-input v-model="end" size="mini" placeholder="" />
                </li>
                <li>
                  <el-button type="primary" size="mini" @click="saveGoodsInfo">收藏商品</el-button>
                  <el-button type="primary" size="mini">编辑上新</el-button>
                </li>
                <li>
                  <el-button type="primary" size="mini">插件采集</el-button>
                  <el-button type="primary" size="mini">清理全部</el-button>
                </li>
                <li>
                  <el-button type="primary" size="mini" @click="exportTableData">导出数据</el-button>
                  <el-button type="primary" size="mini" @click="batchTableDelete(goodsList,multipleSelection)">批量删除</el-button>
                </li>
              </ul>
              <div class="item">
                <p class="text">执行日志</p>
                <div class="con-sub-5">
                  <div class="con-sub-5-log" v-html="consoleMsg" />
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品链接采集" name="linkPage">
          <div class="link-container">
            <div class="item linkcon-sub-1">
              <p class="text">商品链接: 一行一个</p>
              <el-input v-model="linkKey" size="mini" type="textarea" :rows="8" resize="none" />
            </div>
            <ul class="item linkcon-sub-2">
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="StartCollection">开始采集</el-button>
                <el-button type="primary" size="mini" @click="flag = true">取消采集</el-button>
              </li>
              <li class="li-item-2">
                <p>起：</p>
                <el-input v-model="start" size="mini" placeholder="" />
                <p>止：</p>
                <el-input v-model="end" size="mini" placeholder="" />
              </li>
              <li>
                <el-button type="primary" size="mini">收藏商品</el-button>
                <el-button type="primary" size="mini">编辑上新</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini">插件采集</el-button>
                <el-button type="primary" size="mini">清理全部</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini">下载模板</el-button>
                <el-button type="primary" size="mini">链接导入</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini">导出数据</el-button>
                <el-button type="primary" size="mini">批量删除</el-button>
              </li>
            </ul>
            <div class="item">
              <p class="text">执行日志</p>
              <div class="linkcon-sub-4">
                <div class="linkcon-sub-4-log" v-html="consoleMsg" />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="整店采集" name="entriresShopPage">
          <div class="entires-container">
            <ul class="item con-sub-1">
              <li v-show="isShowSales">
                <p>销量区间：</p>
                <el-input v-model="commonAttr.StartSales" size="mini" />
                <span class="slot">-</span>
                <el-input v-model="commonAttr.EndSales" size="mini" />
              </li>
              <li v-show="isShowPrice">
                <p>价格区间：</p>
                <el-input v-model="commonAttr.StartPrice" size="mini" />
                <span class="slot">-</span>
                <el-input v-model="commonAttr.EndPrice" size="mini" />
              </li>
            </ul>
            <div class="item con-sub-3">
              <p class="text">店铺链接：一行一个<span v-show="isShowKeyTip" style="color: red">（采集请使用对应的站点语言搜索）</span></p>
              <el-input v-model="mallLinkKey" size="mini" type="textarea" :rows="8" resize="none" />
            </div>
            <div class="item con-sub-3">
              <p class="text">过滤违规词：一行一个</p>
              <el-input v-model="commonAttr.keyFilter" size="mini" type="textarea" :rows="8" resize="none" />
            </div>
            <!--操作按钮 -->
            <ul class="item con-sub-2">
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="StartCollection">开始采集</el-button>
                <el-button type="primary" size="mini" @click="flag = true">取消采集</el-button>
              </li>
              <li class="li-item-2">
                <p>起：</p>
                <el-input v-model="start" size="mini" placeholder="" />
                <p>止：</p>
                <el-input v-model="end" size="mini" placeholder="" />
              </li>
              <li>
                <el-button type="primary" size="mini">收藏商品</el-button>
                <el-button type="primary" size="mini">编辑上新</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini">插件采集</el-button>
                <el-button type="primary" size="mini">清理全部</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini">导出数据</el-button>
                <el-button type="primary" size="mini">批量删除</el-button>
              </li>
            </ul>
            <div class="item">
              <p class="text">执行日志</p>
              <div class="con-sub-5">
                <div class="con-sub-5-log" v-html="consoleMsg" />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图搜同款" name="picToPicPage">
          <div class="picture-container">
            <ul class="item con-sub-1">
              <li>
                <p>价格：</p>
                <el-input v-model="commonAttr.StartPrice" size="mini" />
                <span class="slot">-</span>
                <el-input v-model="commonAttr.EndPrice" size="mini" />
              </li>
              <li>
                <p>平台：</p>
                <el-select v-model="commonAttr.pictureSearchPlatformId" placeholder="" size="mini">
                  <el-option v-for="(item, index) in pictureSearchOrigin" :key="index" :label="item.label" :value="item.value" />
                </el-select>
                <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-error="imgSaveToUrl">
                  <el-button type="primary" size="mini">选择图片</el-button>
                </el-upload>
              </li>
            </ul>
            <div class="item con-sub-3">
              <img v-if="base64Str" style="width: 200px; height: 156px" :src="base64Str" class="avatar">
            </div>
            <!--操作按钮 -->
            <ul class="item con-sub-2">
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="StartCollection">开始采集</el-button>
                <el-button type="primary" size="mini" @click="flag = true">取消采集</el-button>
              </li>
              <li class="li-item-2">
                <p>起：</p>
                <el-input v-model="start" size="mini" placeholder="" />
                <p>止：</p>
                <el-input v-model="end" size="mini" placeholder="" />
              </li>
              <li>
                <el-button type="primary" size="mini">收藏商品</el-button>
                <el-button type="primary" size="mini">编辑上新</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini">插件采集</el-button>
                <el-button type="primary" size="mini">清理全部</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini">导出数据</el-button>
                <el-button type="primary" size="mini">批量删除</el-button>
              </li>
            </ul>
            <div class="item">
              <p class="text">执行日志</p>
              <div class="con-sub-5">
                <div class="con-sub-5-log" v-html="consoleMsg" />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="天猫淘宝海外平台采集" name="taobaoAbroadPage">
          <div class="TMTB-container">
            <ul class="item con-sub-1">
              <li>
                <p>选择账号：</p>
                <el-select v-model="TaobaoAbroadAccountId" placeholder="" size="mini" multiple collapse-tags @change="selectTaobaoAccountEventEvent">
                  <el-checkbox v-model="isSelectAllTaobaoAccount" label="全部" @change="selectTaobaoAccountEventAllEvent" />
                  <el-option v-for="(item, index) in TaobaoAbroadAccount" :key="index" :label="item.account_alias_name" :value="item.id" />
                </el-select>
              </li>
              <li>
                <p>起始时间：</p>
                <el-date-picker
                  v-model="taobaoTimeAt"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="timestamp"
                  size="mini"
                />
              </li>
            </ul>
            <!--操作按钮 -->
            <ul class="item con-sub-2">
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="StartCollection">开始采集</el-button>
                <el-button type="primary" size="mini" @click="flag = true">取消采集</el-button>
              </li>
              <li class="li-item-2">
                <p>起：</p>
                <el-input v-model="start" size="mini" placeholder="" />
                <p>止：</p>
                <el-input v-model="end" size="mini" placeholder="" />
              </li>
              <li>
                <el-button type="primary" size="mini">收藏商品</el-button>
                <el-button type="primary" size="mini">编辑上新</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini">插件采集</el-button>
                <el-button type="primary" size="mini">清理全部</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini">导出数据</el-button>
                <el-button type="primary" size="mini">批量删除</el-button>
              </li>
            </ul>
            <div class="item">
              <p class="text">执行日志</p>
              <div class="con-sub-5">
                <div class="con-sub-5-log" v-html="consoleMsg" />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="采集设置" name="sixth">
          <div class="collection-settings">
            <ul class="item left">
              <li class="text">采集设置</li>
              <li>
                <el-checkbox disabled label="启动买手号采集" />
                <p class="tip">（开启买手号，可提高收藏收藏率）</p>
              </li>
              <li>
                <el-checkbox v-model="IsDefaultFilterSkuCount" label="过滤多余的SKU" />
                <p class="tip">（勾选多余的SKU，删除所有sku图）</p>
              </li>
              <li>
                <el-checkbox v-model="IsDeleteRepeatSkuImg" label="规格图重复时，删除所有sku图" />
              </li>
              <li>
                <el-checkbox v-model="IsFilterLazadaDeliveryDay" label="启动lazada发货天数过滤商品" />
                <p class="tip2">lazada发货天数：</p>
                <el-input v-model="MinLazadaDeliveryDay" placeholder="" size="mini" />
                <span>--</span>
                <el-input v-model="MaxLazadaDeliveryDay" placeholder="" size="mini" />
              </li>
              <li>
                <el-checkbox v-model="IsFilterShopeeDeliveryDay" label="启动虾皮发货天数过滤商品" />
                <p class="tip2">虾皮发货天数：</p>
                <el-input v-model="MinShoppeDeliveryDay" placeholder="" size="mini" />
                <span>--</span>
                <el-input v-model="MaxShoppeDeliveryDay" placeholder="" size="mini" />
              </li>
              <li>
                <p class="tip">收藏时过滤掉不在此发货天数区间的商品</p>
              </li>
              <li>
                <el-checkbox v-model="IsCollectDescriptionIsNull " label="采集描述为空的数据" />
              </li>
              <li>
                <p>收藏时过滤商品发货地址（仅Shopee可用）：</p>
                <el-select v-model="GoodsDeliveryAddress" placeholder="" size="mini">
                  <el-option v-for="(item,index) in GoodsDeliveryAddressList" :key="index" :value="item.value" :label="item.label" />
                </el-select>
              </li>
            </ul>
            <ul class="item right">
              <li class="text">翻译设置</li>
              <li>
                <p>翻译缓存时间：</p>
                <el-date-picker
                  v-model="commonAttr.value2"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="commonAttr.pickerOptions"
                  value-format="yyyy-MM-dd"
                  size="mini"
                />
                <el-button type="primary" size="mini">清理</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini">清理缓存数据</el-button>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </header>
    <article v-show="activeName !== 'sixth'">
      <u-table
        ref="plTable"
        :height="Height"
        use-virtual
        :data-changes-scroll-top="false"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        row-key="id"
        :big-data-checkbox="true"
        :border="false"
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" />
        <u-table-column align="center" type="index" label="序号" />
        <u-table-column align="center" label="主图">
          <template v-slot="{row}">
            <el-tooltip
              v-if="row.Image"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  :src="row.Image"
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
                :src="row.Image"
              >
                <div slot="error" class="image-slot" />
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </el-tooltip>
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="100" label="上家ID" prop="GoodsId">
          <template v-slot="{row}">
            <span
              v-if="row.GoodsId"
              class="copyIcon"
              @click="copy(row.GoodsId)"
            ><i class="el-icon-document-copy" /></span>
            <span>
              {{ row.GoodsId }}
            </span>
          </template>
        </u-table-column>
        <u-table-column align="center" label="标题" prop="Title" width="500px" fit>
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.Title }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="类目" prop="CategoryName">
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.CategoryName }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="价格" prop="Price" sortable />
        <u-table-column align="center" label="销量" prop="Sales" sortable />
        <u-table-column align="center" label="发货地" />
        <u-table-column align="center" label="来源" prop="Origin" />
        <u-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="goodsList.splice(scope.$index, 1)">
              删除
            </el-button>
          </template>
        </u-table-column>
        <u-table-column align="center" label="操作结果" prop="StatusName" show-overflow-tooltip>
          <template v-slot="{ row }">
            <span :style="row.color && 'color:' + row.color">{{ row.StatusName }}</span>
          </template>
        </u-table-column>
      </u-table>
    </article>
  </div>
</template>

<script>
import CollectKeyWordApI from './collection-keyword-api'
import CollectLinkApI from './collection-link-api'
import CollectEntireApI from './collection-entire-api'
import CollectOtherApI from './collection-other-api'
import { batchOperation, dateFormat, exportExcelDataCommon } from '../../../util/util'
// getSiteRelation
import { shopeeSite, lazadaSite, pictureSearchOrigin, getPlatform, platformObj, getShopeeSitePlace, getLazadaSitePlace } from './collection-platformId'
import testData from './testData'
export default {
  props: {
    baseConfig: {
      type: Object,
      required: false,
      default: () => {
        return {
          keywordConfig: [1, 2, 11, 8, 1.2, 10, 12, 9] // 关键词采集配置
          // linkConfig: { // 链接采集配置
          // },
          // entireMallConfig: { // 整店采集配置
          // }
        }
      }
    }
  },
  data() {
    return {
      Height: 650,
      activeName: 'keyPage',
      CollectKeyWordApInstance: new CollectKeyWordApI(this), // 关键词采集
      collectLinkApInstance: new CollectLinkApI(this), // 链接采集
      collectEntireApInstance: new CollectEntireApI(this), // 整店采集
      collectOtherApInstance: new CollectOtherApI(this), // 整店采集

      // table attr
      multipleSelection: [],
      goodsList: [],
      // button
      buttonStatus: {
        start: false
      },
      // keyWord search
      currentKeywordPlatform: 1,
      commonAttr: {
        // 拼多多 淘宝 参数
        pddRadio: 1,
        StartPage: 1,
        EndPage: 2,
        StartSales: 0,
        EndSales: 999999999,
        StartPrice: 0,
        EndPrice: 999999999,

        // 淘宝参数
        wordLimit: 10,
        // shopee参数
        shopeeSortType: [
          { label: '价格从低到高', value: 'price,asc' },
          { label: '价格从高到低', value: 'price,desc' },
          { label: '销量从低到高', value: 'sales,asc' },
          { label: '销量从高到低', value: 'sales,desc' }
        ],
        isShopeeOffice: false,
        shopeeSortTypeVal: 'price,asc',
        shopeeSite: [],
        shopeeSiteCode: 'TW',
        shopeePlaceOrigin: '',
        shopeePlaceVal: [],
        // Lazada
        lazadaSite: [],
        lazadaSiteCode: 'MY',
        lazadaPlaceOrigin: {},
        lazadaPlaceVal0: [],
        lazadaPlaceVal1: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value2: '',
        // 1688 参数
        alibabaSortType: [
          { label: '综合排序', value: 'pop' },
          { label: '价格从低到高', value: 'price_fale' },
          { label: '价格从高到低', value: 'price_true' },
          { label: '销量从低到高', value: 'booked_false' },
          { label: '销量从高到低', value: 'booked_true' }
        ],
        alibabaSortTypeVal: 'pop',
        pictureSearchPlatformId: '2'
      },
      // 基础参数
      flag: false,
      start: 1,
      end: 5000,
      key: '',
      linkKey: '',
      mallLinkKey: '',
      keyFilter: '',
      isSelectAll: false,
      isSelectAll2: [
        false, false
      ],
      consoleMsg: '',
      // 图搜同款
      pictureSearchOrigin: [],
      base64Str: '',
      // 淘宝天猫海外账号
      TaobaoAbroadAccount: [],
      TaobaoAbroadAccountId: [],
      taobaoTimeAt: [],
      isSelectAllTaobaoAccount: false,

      shopeeGoodsDeliveryAddressDic: { // 收藏商品时使用
        'MY': 'Mainland China',
        'TW': '中國大陸',
        'VN': 'Nước ngoài',
        'ID': 'Luar Negeri',
        'PH': 'Mainland China',
        'TH': 'ต่างประเทศ',
        'SG': 'Mainland China',
        'BR': 'China Continental'
      },

      successNum: 0,
      failNum: 0,

      // 采集设置
      GoodsDeliveryAddress: 0, // 收藏时过滤商品发货地址（仅Shopee可用）
      GoodsDeliveryAddressList: [
        { value: 0, label: '不过滤' },
        { value: 1, label: '本土' },
        { value: 2, label: '跨境' }
      ],
      IsCollectDescriptionIsNull: false, // 采集描述为空的数据
      IsDefaultFilterSkuCount: true, // 过滤多余的SKU
      IsFilterLazadaDeliveryDay: false, // 启动Lazada发货天数过滤商品
      MinLazadaDeliveryDay: 0,
      MaxLazadaDeliveryDay: 20,
      IsFilterShopeeDeliveryDay: false, // 启动虾皮发货天数过滤商品
      MinShoppeDeliveryDay: 0,
      MaxShoppeDeliveryDay: 20,
      IsDeleteRepeatSkuImg: false// 规格图重复时，删除所有sku图
    }
  },
  computed: {
    keyworBar() {
      return getPlatform(this.baseConfig.keywordConfig)
    },
    // 1 拼多多    2 淘宝/天猫  11 虾皮    8 1688   1.2 拼多多优惠采集
    // 10 京喜/京东     12 速卖通    9  lazada
    isShowPdd() { // 是否显示页码
      const supportPlarm = [1]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowPage() { // 是否显示页码
      const supportPlarm = [1, 11, 8, 1.2, 10, 12, 9]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },

    isShowPageSize20() { // 是否显示页码
      const supportPlarm = [1, 8, 1.2]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowPageSize50() { // 是否显示页码
      const supportPlarm = [11]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowSales() { // 销量区间
      const supportPlarm = [1, 2, 11, 8, 1.2, 10, 12]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowPrice() { // 价格区间
      const supportPlarm = [1, 2, 11, 8, 1.2, 10, 12, 9]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowTaobao() {
      const supportPlarm = [2]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowShopeeSite() {
      const supportPlarm = [11]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowLazadaSite() {
      const supportPlarm = [9]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowKeyTip() {
      const supportPlarm = [11, 9]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowSort() {
      const supportPlarm = [8]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowCreateAt() {
      const supportPlarm = [11]
      return supportPlarm.includes(this.currentKeywordPlatform)
    }
    // isShowPrice() { //
    //   const supportPlarm = [1, 11, 8, 1.2, 10, 12, 9]
    //   return supportPlarm.includes(this.currentKeywordPlatform)
    // }

  },
  created() {
    this.commonAttr.shopeeSite = shopeeSite
    this.commonAttr.lazadaSite = lazadaSite
    this.pictureSearchOrigin = pictureSearchOrigin
    const dataTime = new Date() - 0
    this.taobaoTimeAt = [dataTime - 3600 * 1000 * 24 * 5, dataTime]
    this.getShopeeGoodsPlace()
    this.getLazadaGoodsPlace()
    this.getTaobaoAbroadAccount()
  },
  mounted() {
    this.goodsList = testData.data
    this.$refs.plTable.reloadData(this.goodsList)
    const data = this.goodsList.slice(0, 500)
    // data是数据，state是选中还是取消选中
    this.$refs.plTable.partRowSelections(data, true)
    document.querySelectorAll('.barChilren')[4].style.width = '102px'
  },
  methods: {
    selectShopeePlaceValEvent() { // 出货地点全选事件
      if (this.commonAttr.shopeePlaceOrigin.length === this.commonAttr.shopeePlaceVal.length) {
        this.isSelectAll = true
      } else {
        this.isSelectAll = false
      }
    },
    selectShopeeAllEvent() { // 出货地点全选事件
      if (this.isSelectAll) {
        this.commonAttr.shopeePlaceOrigin.map(item => {
          this.commonAttr.shopeePlaceVal.push(item.value)
        })
      } else {
        this.commonAttr.shopeePlaceVal = []
      }
    },
    selectLazadaPlaceValEvent(name, index) { // lazada地点全选事件
      if (this.commonAttr.lazadaPlaceOrigin[name].length === this.commonAttr[`lazadaPlaceVal${index}`].length) {
        this.isSelectAll2[index] = true
      } else {
        this.isSelectAll2[index] = false
      }
    },
    selectLazadaAllEvent(name, index) { // lazada出货地点全选事件
      if (this.isSelectAll2[index]) {
        console.log(name, index)
        console.log('this.commonAttr.lazadaPlaceOrigin[name]', this.commonAttr.lazadaPlaceOrigin[name])
        this.commonAttr.lazadaPlaceOrigin[name].map(item => {
          this.commonAttr[`lazadaPlaceVal${index}`].push(item.value)
        })
      } else {
        this.commonAttr[`lazadaPlaceVal${index}`] = []
      }
      console.log('this.commonAttr[`lazadaPlaceVal${index}`]', this.commonAttr[`lazadaPlaceVal${index}`])
    },
    selectTaobaoAccountEventEvent() { // 出货地点全选事件
      if (this.TaobaoAbroadAccount.length === this.TaobaoAbroadAccountId.length) {
        this.isSelectAllTaobaoAccount = true
      } else {
        this.isSelectAllTaobaoAccount = false
      }
    },
    selectTaobaoAccountEventAllEvent() { // 出货地点全选事件
      if (this.isSelectAllTaobaoAccount) {
        this.TaobaoAbroadAccount.map(item => {
          this.TaobaoAbroadAccountId.push(item.id)
        })
      } else {
        this.TaobaoAbroadAccountId = []
      }
    },
    getShopeeGoodsPlace() { // 获取shopee出货地点
      this.isSelectAll = false
      this.commonAttr.shopeePlaceVal = []
      this.commonAttr.shopeePlaceOrigin = getShopeeSitePlace(this.commonAttr.shopeeSiteCode)
    },
    getLazadaGoodsPlace() { // 获取Lazada出货地点
      this.isSelectAll2[0] = false
      this.isSelectAll2[1] = false
      this.commonAttr.lazadaPlaceVal0 = []
      this.commonAttr.lazadaPlaceVal1 = []
      this.commonAttr.lazadaPlaceOrigin = getLazadaSitePlace(this.commonAttr.lazadaSiteCode)
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    switchPlatform(row) { // 关键词选择平台
      this.currentKeywordPlatform = row.value
    },
    // 开始采集
    StartCollection() {
      this.flag = false
      switch (this.activeName) {
        case 'keyPage': // 关键字采集
          this['keywordSearch']()
          break
        case 'linkPage': // 链接采集
          this['linksSearch']()
          break
        case 'entriresShopPage': // 整店采集
          this['entriresShopSearch']()
          break
        case 'picToPicPage': // 图搜同款
          this['picToPicSearch']()
          break
        case 'taobaoAbroadPage': // 淘宝天猫海外采集
          this['taobaoAbroadSearch']()
          break
        default:
          this.$message.error('采集操作非法！！！！')
          break
      }
    },
    async keywordSearch() {
      const res = this.CollectKeyWordApInstance.handleKeyFactory(this.key) // 处理关键词
      if (res.code !== 200) {
        return this.$message.error(res.data)
      }
      let key = res.data
      const keyLen = res.data.length
      const platForm = this.currentKeywordPlatform
      this.buttonStatus.start = true
      this.consoleMsg = ''
      this.goodsList = []
      this.$refs.plTable.reloadData(this.goodsList)
      this.CollectKeyWordApInstance._initKeyWord(platForm, this.commonAttr)
      this.writeLog('开始采集搜索........', true)
      this.writeLog(`开始采集${platformObj[platForm]}商品.......`, true)

      for (let i = 0; i < keyLen; i++) {
        if (this.flag) {
          this.buttonStatus.start = false
          this.writeLog(`取消${platformObj[platForm]}商品采集`, true)
          break
        }
        const item = key[i]
        // this.writeLog(`采集关键字：${item}`, true)
        const res2 = await this.CollectKeyWordApInstance.keywordSearch(item)
        if (res2.code !== 200) {
          continue
        }
        this.goodsList.push(...res2.data)
      }
      if (platForm === 1) { // 如果当前平台为拼多多需额外调用 拼多多补充接口  1.1-------------------------
        for (let i = 0; i < keyLen; i++) {
          if (this.flag) {
            this.buttonStatus.start = false
            this.writeLog(`取消${platformObj[platForm]}商品采集`, true)
            break
          }
          const item = key[i]
          // this.writeLog(`采集关键字：${item}`, true)
          const res2 = await this.CollectKeyWordApInstance.keywordSearchTwo(item)
          if (res2.code !== 200) {
            continue
          }
          this.goodsList.push(...res2.data)
        }
      }
      this.goodsList = this.filterData(this.goodsList)
      this.$refs.plTable.reloadData(this.goodsList)
      this.writeLog(`${platformObj[platForm]}：共采集：${this.goodsList.length}条`, true)
      this.writeLog(`${platformObj[platForm]}商品采集完毕........`, true)
      key = null
      this.buttonStatus.start = false
    },
    async linksSearch() {
      const res = this.collectLinkApInstance.handleLinkKeyFactory(this.linkKey) // 处理数据
      if (res.code !== 200) {
        return this.$message.error(res.data)
      }
      this.buttonStatus.start = true
      this.consoleMsg = ''
      this.goodsList = []
      this.$refs.plTable.reloadData(this.goodsList)
      const data = res.data
      const len = data.length
      this.writeLog('开始商品链接采集搜索........', true)
      for (let i = 0; i < len; i++) {
        if (this.flag) {
          this.writeLog('取消链接采集', true)
          break
        }
        const item = data[i]
        const res2 = await this.collectLinkApInstance.getGoodsDeail(item)
        if (res2.code !== 200) {
          this.writeLog(`商品ID: ${item.GoodsId} 采集失败: ${res2.data}`, false)
          continue
        } else {
          this.writeLog(`(${i + 1}/${len})商品ID: ${item.GoodsId}采集成功`)
          this.goodsList.push(res2.data)
        }
      }
      this.writeLog(`商品链接：共采集：${this.goodsList.length}条`, true)
      this.writeLog(`商品链接采集完毕........`, true)
      this.buttonStatus.start = false
    },
    async entriresShopSearch() {
      const res = this.collectEntireApInstance.handleEntireKeyFactory(this.mallLinkKey) // 处理关键词
      if (res.code !== 200) {
        return this.$message.error(res.data)
      }
      this.buttonStatus.start = true
      this.consoleMsg = ''
      this.goodsList = []
      this.$refs.plTable.reloadData(this.goodsList)
      this.writeLog('开始整店链接采集搜索........', true)
      const data = res.data
      const len = data.length
      for (let i = 0; i < len; i++) {
        if (this.flag) {
          this.writeLog('取消整店采集', true)
          break
        }
        const item = data[i]
        const res2 = await this.collectEntireApInstance.mallSearch(item)
        if (res2.code !== 200) {
          this.writeLog(`店铺链接: ${item} 采集失败: ${res2.data}`, false)
          continue
        } else {
          this.writeLog(`(${i + 1}/${len})店铺链接: ${item} 采集成功`)
          this.goodsList.push(...res2.data)
        }
      }
      this.writeLog(`整店链接：共采集：${this.goodsList.length}条`, true)
      this.writeLog(`整店链接采集完毕........`, true)
      this.buttonStatus.start = false
    },
    async picToPicSearch() {
      if (!this.base64Str) {
        return this.$message.error('请上传图片')
      }
      this.buttonStatus.start = true
      this.consoleMsg = ''
      this.goodsList = []
      this.$refs.plTable.reloadData(this.goodsList)
      const Name = this.commonAttr.pictureSearchPlatformId === '8' ? '1688' : '淘宝'
      this.writeLog(`开始 ${Name} 图搜采集搜索........`, true)
      const params = {
        ImageBase64: this.base64Str
      }
      this.commonAttr.pictureSearchPlatformId === '8' ? params['Page'] = 1 : '' // 1688 加页码
      const res = await this.collectOtherApInstance.picSearch(this.commonAttr.pictureSearchPlatformId, params)
      if (res.code !== 200) {
        this.writeLog(`图搜采集: 采集失败: ${res.data}`, false)
      } else {
        this.writeLog('图搜采集: 采集成功', true)
        this.goodsList.push(...res.data)
      }
      this.writeLog(`图搜：共采集：${this.goodsList.length}条`, true)
      this.writeLog(`${Name} 图搜采集完毕........`, true)
      this.buttonStatus.start = false
    },
    async getTaobaoAbroadAccount() {
      const res = await this.collectOtherApInstance.getTaobaoAbroadAccount()
      if (res.code !== 200) {
        return this.$message.error(`获取淘宝天猫海外账号失败：${res.code} ${res.data}`)
      }
      this.TaobaoAbroadAccount = res.data
    },
    async taobaoAbroadSearch() {
      if (this.TaobaoAbroadAccountId.length === 0) {
        return this.$message.error('请选择账号')
      }
      this.buttonStatus.start = true
      this.consoleMsg = ''
      this.goodsList = []
      this.$refs.plTable.reloadData(this.goodsList)
      this.writeLog(`开始 淘宝天猫海外 采集搜索........`, true)
      for (let i = 0; i < this.TaobaoAbroadAccountId.length; i++) {
        if (this.flag) {
          this.writeLog('取消淘宝天猫海外采集', true)
          break
        }
        const accountID = this.TaobaoAbroadAccountId[i]
        const account = this.TaobaoAbroadAccount.find(item => item.id === accountID)
        const res = await this.collectOtherApInstance.queryTmCrossBorder(account, this.taobaoTimeAt)
        if (res.code !== 200) {
          this.writeLog(`淘宝天猫海外: 采集失败: ${res.data}`, false)
        } else {
          // this.writeLog('淘宝天猫海外: 采集成功', true)
          this.goodsList.push(...res.data)
        }
      }

      this.writeLog(`淘宝天猫海外：共采集：${this.goodsList.length}条`, true)
      this.writeLog('淘宝天猫海外采集完毕........', true)
      this.buttonStatus.start = false
    },
    // 开始收藏
    async saveGoodsInfo() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择商品')
        return
      }
      this.buttonStatus.start = true
      this.consoleMsg = ''
      this.successNum = 0
      this.failNum = 0
      this.writeLog('开始收藏商品........', true)
      await batchOperation(this.multipleSelection, this.saveGoods)
      this.writeLog(`共收藏成功：${this.successNum}个商品, 收藏失败：${this.failNum}个商品`, true)
      this.writeLog(`收藏商品完毕........`, true)
      this.buttonStatus.start = false
    },
    async saveGoods(item, count = { count: 1 }) {
      try {
        this.StatusName(item, `正在获取商品详情`, true)
        const res2 = await this.collectLinkApInstance.getGoodsDeail(item)
        if (res2.code !== 200) {
          this.StatusName(item, `获取商品详情失败：${res2.data}`, false)
          this.failNum++
          return
        } else {
          console.log('详情数据', res2.data)
          await this.setGoodsData(item, res2.data)
        }
      } catch (error) {
        this.StatusName(item, `${error}`, false)
        console.log(error)
      } finally {
        --count.count
      }
    },
    // 收藏组装数据
    async setGoodsData(item, data) {
      let goodsData = JSON.parse(JSON.stringify(data))
      // 1：描述组装处理 PddPlatform
      let goodsProperty = ''
      if (item.Platform === 1 && goodsData.CollectGoodsData?.GoodsProperty && Object.keys(goodsData.CollectGoodsData.GoodsProperty).length > 0) {
        const keys = Object.keys(goodsData.CollectGoodsData.GoodsProperty)
        for (const key of keys) {
          goodsProperty += `${key}：${goodsData.CollectGoodsData.GoodsProperty[key].join('\r\n')}\r\n`
        }
      }
      // 2：出货地点 ShopeePlatform
      if (item.Platform === 11 && this.GoodsDeliveryAddress !== 0) {
        const location = this.shopeeGoodsDeliveryAddressDic[item.Site.toUpperCase()] ? this.shopeeGoodsDeliveryAddressDic[item.Site.toUpperCase()] : ''
        if ((this.GoodsDeliveryAddress === 2 && goodsData.CollectGoodsData.Location === location) || (this.GoodsDeliveryAddress === 1 && goodsData.CollectGoodsData.Location !== location)) {
          this.StatusName(item, `商品发货地不符合条件`, false)
          this.failNum++
          return
        }
      }
      item.Description = goodsData.CollectGoodsData.GoodsDesc ? goodsData.CollectGoodsData.GoodsDesc + goodsProperty : goodsProperty// 商品描述
      goodsData.CollectGoodsData.GoodsDesc = item.Description
      item.OriginCategoryId = Number(goodsData.CollectGoodsData.CategoryId) // 源商品的类目ID
      if (!this.IsCollectDescriptionIsNull && !item.Description) {
        this.StatusName(item, `商品描述不能为空`, false)
        this.failNum++
        return
      }
      this.StatusName(item, `组装产品信息`, true)
      try {
        // 3：库存数量
        const totalStock = goodsData.CollectGoodsData.TotalQuantity // 总库存数量
        if (Object.keys(goodsData.CollectGoodsSkus).length > 0) {
          // 此处获取每一个Sku的库存数量
          const stockList = []
          const keys = Object.keys(goodsData.CollectGoodsSkus)
          for (const key of keys) {
            stockList.push(goodsData.CollectGoodsSkus[key].quantity)
          }
          if (stockList.length <= 0) {
            this.StatusName(item, `收藏失败：此商品库存为0`, false)
            this.failNum++
            return
          }
        } else {
          if (totalStock) {
            this.StatusName(item, `收藏失败：此商品库存为0`, false)
            this.failNum++
            return
          }
        }
        // 4：SKU数量-----是否舍弃超出shopee支持的sku个数，IsDefaultFilterSkuCount此配置在平台选品库----采集设置中，默认为true
        if (this.IsDefaultFilterSkuCount) {
          goodsData = this.DealGoodsSkuCount(item, goodsData)
        }
        // Lazada平台需要设置额外信息：站点
        if (item.Platform === 9) {
          goodsData.CollectGoodsData.GoodsExtraInfo['site'] = item.Site.toUpperCase()
        }
        // 天猫淘宝跨境平台：需要设置额外信息：店铺ID
        if (item.Platform === 2) {
          goodsData.CollectGoodsData.GoodsExtraInfo['UserId'] = item.ShopId.toString()
        }
        // 5：过滤特殊字符：标题、短标题、描述、过滤Emoji字符串
        await this.FilterSpecialSymbol(goodsData, item)
        // 6：对类目进行处理
        if (item.CategoryName === '未匹配到类目' && item.OriginCategoryId !== 0) {
          const cat = await this.$collectService.getGoodsCat(item.OriginCategoryId, item.Platform, item.Site)
          item.CategoryName = cat.split('|')[0] || ''
        }
        // 7:组装上报的SKU数据
        const goodsBulkInfo = {}
        goodsBulkInfo['Weight'] = goodsData.CollectGoodsData.Weight
        goodsBulkInfo['Length'] = goodsData.CollectGoodsData.Length
        goodsBulkInfo['Width'] = goodsData.CollectGoodsData.Width
        goodsBulkInfo['Height'] = goodsData.CollectGoodsData.Height
        const buildgoods = this.BuildGoodsData(goodsData, goodsBulkInfo, item)
        // 8：商品价格校验
        if (buildgoods) {
          if (buildgoods['price'].toString() === '0' && goodsData.CollectGoodsData.OriData?.data?.data?.mockData) {
            const skuCord = goodsData.CollectGoodsData.OriData['data']['data']['mockData']
            const tempPrice = skuCord || 0
            item.Price = tempPrice
            buildgoods['price'] = item.Price
          } else {
            item.Price = Number(buildgoods['price'])
          }
          this.StatusName(item, `开始收藏`, true)
          console.log('组装收藏数据', buildgoods)
          const res = await this.$commodityService.uploadCollectGoods(buildgoods)
          const jsonData = this.isJsonString(res)
          if (jsonData.code === 200) {
            this.StatusName(item, `收藏成功`, true)
            this.successNum++
          } else {
            this.StatusName(item, `收藏失败`, false)
            this.failNum++
          }
        }
      } catch (error) {
        console.log('setGoodsData', error)
        this.StatusName(item, `收藏异常`, false)
        this.failNum++
      }
    },
    async FilterSpecialSymbol(goodsData, item) {
      if (item.Platform === 9 || item.Platform === 11 || item.Platform === 12) {
        // 过滤Emoji字符串
        const reg = /[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
        goodsData.CollectGoodsData.Title = goodsData.CollectGoodsData.Title.replace(reg, '')
        goodsData.CollectGoodsData.ShortTitle = goodsData.CollectGoodsData.ShortTitle.replace(reg, '')
        goodsData.CollectGoodsData.GoodsDesc = goodsData.CollectGoodsData.GoodsDesc.replace(reg, '')
      }
      if (item.CategoryName === '未匹配到类目' && item.OriginCategoryId !== 0) {
        const cat = await this.$collectService.getGoodsCat(item.OriginCategoryId, item.Platform, item.Site)
        item.CategoryName = cat.split('|')[0] || ''
      }
    },
    // 组装上报的SKU数据
    BuildGoodsData(goodsData, goodsBulkInfo, item) {
      try {
        const goods = goodsData.CollectGoodsData
        const sku = goodsData.CollectGoodsSkus
        // 如果为Lazada平台，需要过滤发货天数，IsFilterLazadaDeliveryDay
        if (goods.Platform === 9 && this.IsFilterLazadaDeliveryDay) {
          const keys = Object.keys(sku)
          if (keys.length > 0) {
            let flag = false
            for (const key of keys) {
              const data = sku[key]
              const duringTimeArray = data.duringTime.split('-')
              const dayList = []
              let minNum = 0
              let maxNum = 0
              if (duringTimeArray.length > 0) {
                for (let i = 0; i < duringTimeArray.length; i++) {
                  const day = duringTimeArray[i]
                  dayList.push(Number(...day.match(/\d+/g)))
                }
                if (dayList.length === 1) {
                  maxNum = minNum = dayList[0]
                } else if (dayList.length === 2) {
                  minNum = dayList[0]
                  maxNum = dayList[1]
                }
                if (minNum < Number(this.MinLazadaDeliveryDay) || maxNum > Number(this.MaxLazadaDeliveryDay) || minNum > Number(this.MaxLazadaDeliveryDay)) {
                  flag = true
                }
              }
            }
            if (flag) {
              this.StatusName(item, `此商品发货天数不符合【采集设置】中设置的发货天数范围`, false)
              this.failNum++
              return
            }
          } else {
            this.StatusName(item, `此商品部分sku发货天数为空`, false)
            this.failNum++
            return
          }
        }
        // 如果为Shopee平台，需要过滤发货天数，IsFilterShopeeDeliveryDay
        if (goods.Platform === 11 && this.IsFilterShopeeDeliveryDay) {
          const deliveryDay = Number(goods.EstimatedDays) || 0
          if (deliveryDay < Number(this.MinShoppeDeliveryDay) || deliveryDay > Number(this.MaxShoppeDeliveryDay)) {
            this.StatusName(item, `此商品发货天数不符合【采集设置】中设置的发货天数范围`, false)
            this.failNum++
            return
          }
        }
        const buildGoods = {}
        buildGoods['source'] = goods.Platform// 源平台
        buildGoods['goods_id'] = goods.GoodsId// 商品ID
        buildGoods['category_id'] = goods.CategoryId// 商品类目
        buildGoods['category_name'] = goodsData.CategoryName// 类目名称
        buildGoods['language'] = (goods.Platform === 9 || goods.Platform === 11 || goods.Platform === 2) ? 'en' : 'zh-Hans' // 语种
        buildGoods['title'] = goods.Platform === 12 ? this.GetAliExpressTitle(goods.Title) : goods.Title// 标题
        buildGoods['short_title'] = goods.ShortTitle// 短标题
        buildGoods['description'] = goods.GoodsDesc// 描述
        const key = goods.GoodsId + '+' + goods.Platform
        // 组装商品的重量、体积信息
        const infoKeys = Object.keys(goodsBulkInfo)
        if (infoKeys.includes(key)) {
          const dic = goodsBulkInfo[key]
          goods.Weight = Number(dic['weight'])
          goods.Length = Number(dic['length'])
          goods.Width = Number(dic['width'])
          goods.Height = Number(dic['height'])
        }
        buildGoods['weight'] = goods.Weight// 重量
        buildGoods['long'] = goods.Length// 长度
        buildGoods['width'] = goods.Width// 宽度
        buildGoods['height'] = goods.Height// 高度
        buildGoods['spec1'] = 'Variation'// 规格一名称
        buildGoods['spec2'] = 'Size'// 规格二名称
        buildGoods['sales'] = goods.Sales// 销量
        buildGoods['stock'] = goods.TotalQuantity// 库存
        buildGoods['descImages'] = goods.DetailGallery// 详情图
        let skuData = {}
        // 处理规格列表
        skuData = this.BuildSkuDatas(item, goodsData, goods.GoodsType, goods.VaCount, goods.Platform)
        if (skuData) {
          if (goods.Platform === 11) {
            let language = ''
            if (goods.Site.toLowerCase() === 'tw') {
              language = 'zh-Hant'
              buildGoods['spec1'] = '規格'
              buildGoods['spec2'] = '尺寸'
            } else {
              language = 'en'
            }
            buildGoods['language'] = language
            if (Object.keys(sku).length === 0) {
              const skuData = {}
              skuData['skuList'] = []
              skuData['minPrice'] = goods.Price
              skuData['options'] = []
              skuData['skuStrList'] = []
            }
          } else if (goods.Platform === 12) {
            buildGoods['language'] = 'en'
          }
          if (goods.Images?.length === 0) {
            this.StatusName(item, `图片为空`, false)
            this.failNum++
            return
          }
          const minPrice = skuData['minPrice'] || 0
          buildGoods['skus'] = skuData['skuList']
          if (minPrice <= 0) {
            skuData['minPrice'] = goodsData.ListItem[0].Price
          }
          buildGoods['price'] = skuData['minPrice']
          buildGoods['images'] = this.BuildImages(goods.Images)
          buildGoods['skuStrList'] = skuData['skuStrList']
          buildGoods['goodsExtraInfo'] = goods.GoodsExtraInfo
          return buildGoods
        }
      } catch (error) {
        console.log('BuildGoodsData', error)
      }
    },
    // 组装图片信息
    BuildImages(images) {
      const imageList = []
      const md5HsImage = []
      for (let index = 0; index < images.length; index++) {
        const item = images[index]
        if (imageList.includes(item) || item.indexOf('www.youtube.com/watch') > -1) {
          continue
        }
        if (md5HsImage.includes(item.toString())) {
          continue
        }
        md5HsImage.push(item.toString())
        imageList.push(item.toString())
      }
      return imageList
    },
    // 处理规格列表
    BuildSkuDatas(item, goodsData, platformId) {
      try {
        let skuDatas = goodsData.CollectGoodsSkus
        const list = []
        for (const key in skuDatas) {
          if (skuDatas[key].image) {
            list.push(skuDatas[key].image)
          }
        }
        const distinctImg = [...new Set(list)]
        const skuListOne = this.GetVaAndSizeList(item, goodsData, goodsData.CollectGoodsData.GoodsType)
        let vaList = []
        if (skuListOne.length > 0) {
          vaList = skuListOne[0]
        }
        // 采集设置：规格图重复时，删除所有sku图
        if (distinctImg.length !== vaList.length && this.IsDeleteRepeatSkuImg) {
          for (const key in skuDatas) {
            skuDatas[key].image = ''
          }
        }
        // 判断sku信息
        const checkSkuData = this.CheckSkuIsSingle(skuDatas)
        if (checkSkuData['isSkuSingle'].toString() === '1') {
          return checkSkuData
        }
        let checkData = {}
        try {
        // 检查sku图片是否有重复的
          checkData = this.CheckSkuInvalidImages(skuDatas, platformId)
        } catch (error) {
          this.StatusName(item, `组装sku图片失败，或图片不符合规格`, false)
          this.failNum++
          return
        }
        const skuImageMapp = checkData['imageBool']
        skuDatas = checkData['skuList']
        // 判断sku的数量
        skuDatas = this.CkeckSkuNumV2(skuDatas)
        const skuList = []
        const optinList1 = []
        const optinList2 = []
        const option1ToImage = {}
        const skuStrList = []
        const giveUpOptionList = []
        // 判断图片重复的问题
        let minPrice = 0
        let currenPrice = 0
        for (const key in skuDatas) {
          const skuData = skuDatas[key]
          currenPrice = skuData.price
          if (minPrice === 0) {
            minPrice = skuData.price
          }
          const nameList = []
          const newSkuDirDatas = {}
          newSkuDirDatas['sku_spec1'] = ''
          newSkuDirDatas['sku_spec2'] = ''
          let isContinue = 1
          for (let i = 0; i < skuData.originProps.length; i++) {
            const originProp = skuData.originProps[i]
            const name = originProp.name
            nameList.push(name)
            if (i === 0) {
            // 废弃options
              if (giveUpOptionList.includes(name)) {
                isContinue = 0
                break
              }
              // 判断数量optinList1
              if (optinList1.length >= 100 && !optinList1.includes(name)) {
                isContinue = 0
                break
              }
              // 图片重复
              const value = JSON.stringify(option1ToImage).match(RegExp(/(?<=:").*?(?=")/g)) || []
              if (!Object.keys(option1ToImage).includes(name) && value.includes(skuData.image)) {
                isContinue = 0
                giveUpOptionList.push(name)
                break
              }
              if (!optinList1.includes(name)) {
                optinList1.push(name)
              }
              newSkuDirDatas['sku_spec1'] = name
              if (!Object.keys(option1ToImage).includes(name) && skuData.image) {
                option1ToImage[name] = skuData.image
              }
              if (Object.keys(option1ToImage).includes(name) && skuImageMapp) {
                if (option1ToImage[name].indexOf('http:') <= -1 && option1ToImage[name].indexOf('https:') <= -1) {
                  newSkuDirDatas['sku_image'] = 'http:' + option1ToImage[name]
                } else {
                  newSkuDirDatas['sku_image'] = option1ToImage[name]
                }
              } else {
                newSkuDirDatas['sku_image'] = ''
              }
            }
            if (i === 1) {
            // 判断数量optinList2
              if (optinList2.length >= 100 && !optinList2.includes(name)) {
                isContinue = 0
                break
              }
              if (!optinList2.includes(name)) {
                optinList2.push(name)
              }
              newSkuDirDatas['sku_spec2'] = name
            }
          }
          // 规格超出限制 舍
          if (isContinue === 0) {
            continue
          }
          if (currenPrice < minPrice) {
            minPrice = currenPrice
          }
          let quantity = skuData.quantity
          quantity = quantity > 5000 ? 5000 : quantity
          let skuStr = newSkuDirDatas['sku_spec1'].toString()
          if (newSkuDirDatas['sku_spec2']) {
            skuStr = skuStr + '+' + newSkuDirDatas['sku_spec2']
          }
          skuStrList.push(skuStr)
          newSkuDirDatas['sku_sn'] = skuData.sku
          newSkuDirDatas['sku_price'] = skuData.price
          newSkuDirDatas['sku_stock'] = quantity
          skuList.push(newSkuDirDatas)
        }
        const options = []
        if (optinList1.length > 0) {
          options.push(optinList1)
        }
        if (optinList2.length > 0) {
          options.push(optinList2)
        }
        const returnData = {}
        returnData['skuList'] = skuList
        returnData['minPrice'] = minPrice
        returnData['options'] = options
        returnData['skuStrList'] = skuStrList
        return returnData
      } catch (error) {
        console.log('BuildSkuDatas', error)
      }
    },
    CheckSkuInvalidImages(sku) {
      const checkData = {}
      const haveImageOption = {}
      const notHaveImageOption = []
      const optionAll = [] // 储存所有尺码规格
      // 1.先判断是否有sku主图
      for (const key in sku) {
        const skuData = sku[key]
        if (skuData.originProps.length <= 0) {
          continue
        }
        const originProps = skuData.originProps[0]
        const optionName = originProps.name
        if (optionAll.includes(optionName)) {
          continue
        }
        optionAll.push(optionName)
        if (!skuData.image) {
          notHaveImageOption.push(optionName)
        } else {
          haveImageOption[optionName] = skuData.image
        }
      }
      // 如果没有图片的规格,多于有图片的规格
      if (notHaveImageOption.length > Object.keys(haveImageOption).length) {
        for (const key in sku) {
          sku[key].image = ''
        }
        checkData['imageBool'] = false
        checkData['skuList'] = sku
        return checkData
      }
      // 2.判断规格图片是否重复 重复删除规格
      const clearOption = []
      const md5HsImage = []
      const dealOptionName = []
      const imgList = []
      const keys = Object.keys(sku)
      for (const key of keys) {
        const skuData = sku[key]
        if (skuData.originProps.length <= 0) {
          continue
        }
        const originProps = skuData.originProps
        const originProp = originProps[0]
        const optionName = originProp.name
        if (dealOptionName.includes(optionName)) {
          continue
        }
        dealOptionName.push(optionName)
        try {
          const isRepeat = md5HsImage.includes(skuData.image)
          imgList.push(skuData.image)
          if (isRepeat) {
            clearOption.push(key)
            continue
          }
          md5HsImage.push(skuData.image)
        } catch (error) {
          clearOption.push(optionName)
          console.log(error)
          continue
        }
      }
      for (let i = 0; i < clearOption.length; i++) {
        delete sku[clearOption[i]]
      }
      checkData['imageBool'] = true
      checkData['skuList'] = sku
      return checkData
    },
    // 判断sku数量
    CkeckSkuNumV2(skuDatas) {
      const clearSkuList = []
      const option1ToOption2List = []
      for (const key in skuDatas) {
        const skuData = skuDatas[key]
        let twoOptionStr = ''
        for (let i = 0; i < skuData.originProps.length; i++) {
          const originProp = skuData.originProps[i]
          const name = originProp.name
          if (i === 0) {
            twoOptionStr = name
          }
          if (i === 1) {
            twoOptionStr = twoOptionStr + '-' + name
          }
        }
        if (option1ToOption2List.includes(twoOptionStr)) {
          clearSkuList.push(skuData.sku)
          continue
        }
        option1ToOption2List.push(twoOptionStr)
      }
      if (clearSkuList.length > 0) {
        for (let i = 0; i < clearSkuList.length; i++) {
          delete skuDatas[clearSkuList[i]]
        }
      }
      return skuDatas
    },
    getBase64(url) {
      return new Promise((res, rej) => {
        var Img = new Image()
        var dataURL = ''
        Img.src = url + '?v=' + Math.random()
        Img.setAttribute('crossOrigin', 'Anonymous')
        Img.onload = function() {
          var canvas = document.createElement('canvas')
          var width = Img.width
          var height = Img.height
          canvas.width = width
          canvas.height = height
          canvas.getContext('2d').drawImage(Img, 0, 0, width, height)
          dataURL = canvas.toDataURL('image/jpeg')
          res(dataURL || null)
        }
      })
    },
    /**
     * 获取各个平台的缩略图路径；货老板暂不考虑，货老板可能包含拼多多淘宝1688
     * shopee/ 速卖通缩略图不支持自定义
     */
    GetSmallImageUrl(imageUrl, platform) {
      switch (platform) {
        case 1:
          return imageUrl + '?imageView2/2/w/20/q/20/format/webp'// 20为图片大小
        case 2:
        case 8:
          if (imageUrl.indexOf('460x460xz.jpg') > -1) {
            imageUrl = imageUrl.replace('460x460xz.jpg', '20x20.jpg')
            return imageUrl
          }
          return imageUrl + '_20x20.jpg'
        case 11:
          return imageUrl + '_tn'
        case 13:
          return imageUrl + '_50x50.jpg'
        case 9:
          return imageUrl + '_20x20q20.jpg_.webp'
      }
      return imageUrl
    },
    // 检查是否是单规格
    CheckSkuIsSingle(skuDatas) {
      const returnData = {}
      let minPrice = 100000
      let isSkuSingle = 0
      const len = Object.keys(skuDatas).length
      if (len === 1) {
        for (const key in skuDatas) {
          const originProps = skuDatas[key].originProps
          if (originProps.length === 0) {
            isSkuSingle = 1
            minPrice = skuDatas[key].price
          }
        }
      } else if (len === 0) {
        minPrice = 0
        isSkuSingle = 1
      }
      returnData['isSkuSingle'] = isSkuSingle
      returnData['skuList'] = {}
      returnData['minPrice'] = minPrice
      returnData['options'] = []
      returnData['skuStrList'] = []
      return returnData
    },
    // 分配sku长度
    DealGoodsSkuCount(item, goodsData) {
      // const goodsData = JSON.parse(JSON.stringify(data))
      while (true) {
        try {
          if (goodsData.CollectGoodsData.GoodsType === 1) {
          // 直接获取SKU数量。如果大于50个，随机移除超过规格，只留下50个
            const keys = Object.keys(goodsData.CollectGoodsSkus)
            if (keys.length > 50) {
              const ranKeys = this.getRandomArrayElements(keys, 50)
              const newSku = {}
              for (const key of ranKeys) {
                newSku[key] = goodsData.CollectGoodsSkus[key]
              }
              goodsData.CollectGoodsSkus = newSku
            }
          }
          if (goodsData.CollectGoodsData.GoodsType === 2) {
          // 通过sku.OriginProps 组装Sku数量（即通过两个规格组合，获取到所有的Sku数量）
            const newSkuDic = {}
            const skuList = this.GetVaAndSizeList(item, goodsData, goodsData.CollectGoodsData.GoodsType)// 根据规格数量组装SKU
            let vaList = skuList[0]
            let sizeList = skuList[1]
            const allSkuCount = Object.keys(goodsData.CollectGoodsSkus).length// 采集返回的所有的SKU列表
            const realSkuCount = vaList.length * sizeList.length// 组装出来的SKU列表
            if (realSkuCount > 50 || vaList.length > 50 || sizeList.length > 50 || realSkuCount !== allSkuCount) {
            // 需要判断单个规格的数量和组装后的SKU的数量，都不能超过50个，如果超过50个，需要随机去除，只保留到50个的SKU数量
              let maxCount = 50
              if (vaList.length > 50) {
                vaList = this.getRandomArrayElements(vaList, 50)
              }
              if (sizeList.length > 50) {
                sizeList = this.getRandomArrayElements(sizeList, 50)
              }
              if (Object.keys(goodsData.CollectGoodsSkus).length > 50) {
                maxCount = 50 / sizeList.length
              }
              if (maxCount > 50) {
                maxCount = 50
              }
              if (vaList.length > maxCount) {
                vaList = this.getRandomArrayElements(vaList, parseInt(maxCount))
              }
              const skuKeys = Object.keys(goodsData.CollectGoodsSkus)
              for (const key of skuKeys) {
                const item = goodsData.CollectGoodsSkus[key]
                const name1 = item.originProps[0] && item.originProps[0].name || ''
                const name2 = item.originProps[1] && item.originProps[1].name || ''
                if (vaList.includes(name1) && sizeList.includes(name2)) {
                  newSkuDic[key] = item
                } else {
                  let i = 0
                  const sku = this.GetVaRelativeSku(goodsData.CollectGoodsSkus, name1, name2, i++)
                  if (sku) {
                    const skuKeys = Object.keys(sku)
                    for (const key of skuKeys) {
                      newSkuDic[key] = sku[key]
                    }
                  }
                }
              }
              goodsData.CollectGoodsSkus = newSkuDic
            }
          }
          if (goodsData.CollectGoodsData.GoodsType > 2) {
            const newSkuDic = {}
            const skuList = this.GetVaAndSizeList(item, goodsData, goodsData.CollectGoodsData.GoodsType)
            for (const key in skuList) {
              if (skuList[key].length > 50) {
                skuList[key] = this.getRandomArrayElements(skuList[key], 50)
              }
            }
            const newSizeDic = {}
            let newList = []
            const oriList = skuList[2]
            if (Object.keys(skuList).length === 4) {
              for (let i = 0; i < skuList[3].length; i++) {
                const name = skuList[3][i]
                for (let j = 0; j < skuList[2].length; j++) {
                  const oriName = oriList[j]
                  const newName = oriName + '+' + name
                  newList.push(newName)
                }
              }
            } else {
              newList = skuList[2]
            }
            for (let i = 0; i < newList.length; i++) {
              const size = newList[i]
              if (Object.keys(newSizeDic).length >= 50) {
                break
              }
              for (let j = 0; j < skuList[1].length; j++) {
                const name = skuList[1][j]
                const newName = name + '+' + size
                const list = []
                list.push(name)
                list.push(size)
                newSizeDic[newName] = list
                if (Object.keys(newSizeDic).length >= 50) {
                  break
                }
              }
            }
            if ((skuList[0].length * Object.keys(newSizeDic).length) > 50) {
              let maxCount = 50
              maxCount = parseInt(50 / Object.keys(newSizeDic).length)
              if (maxCount > 50) {
                maxCount = 50
              }
              if (maxCount < skuList[0].length) {
                skuList[0] = this.getRandomArrayElements(skuList[0], skuList[0].length - maxCount)
              }
            }
            let isReverse = false
            for (let j = 0; j < skuList[0].length; j++) {
              const skuName = skuList[0][j]
              const keys = Object.keys(newSizeDic)
              for (const key of keys) {
                const sizeData = newSizeDic[key]
                const sizes = sizeData.join('+')
                const names = skuName + '+' + sizes
                let nameList = []
                const skuKeys = Object.keys(goodsData.CollectGoodsSkus)
                for (const skuKey of skuKeys) {
                  const newSku = goodsData.CollectGoodsSkus[skuKey]
                  const list = JSON.stringify(newSku.originProps).match(RegExp(/(?<="name":").*?(?=")/g))
                  const name = list.join('+')
                  if (names === name) {
                    nameList = list
                    const skuNameList = JSON.stringify(newSku.originProps).match(RegExp(/(?<="sku_name":").*?(?=")/g))
                    if (skuNameList.toString().indexOf('颜色') > -1 || skuNameList.toString().indexOf('款式') > -1) {
                      isReverse = true
                      const newProps = []
                      newProps.push(newSku.originProps[0])
                      const originPropsModel = {}
                      originPropsModel['parent_id'] = 0
                      originPropsModel['vid'] = ''
                      originPropsModel['name'] = sizes
                      newProps.push(originPropsModel)
                      if (isReverse) {
                      // newProps.reverse()
                        newSku.originProps = newProps
                        newSkuDic[skuKey] = newSku
                        break
                      }
                    }
                  }
                }
                if (nameList.length < 1) {
                  const newDic = this.GetVaRelativeSku(goodsData.CollectGoodsSkus, skuName, key, Object.keys(newSkuDic).length)
                  if (newDic) {
                    const newDicKeys = Object.keys(newDic)
                    for (const key of newDicKeys) {
                      if (isReverse) {
                      // newDic[key].originProps.reverse()
                      }
                      newSkuDic[key] = newDic[key]
                    }
                  }
                }
              }
            }
            goodsData.CollectGoodsSkus = newSkuDic
          }
          if (Object.keys(goodsData.CollectGoodsSkus).length <= 50) {
            break
          }
        } catch (error) {
          console.log('DealGoodsSkuCount', error)
          break
        }
      }
      console.log('DealGoodsSkuCount', goodsData)
      return goodsData
    },
    GetVaRelativeSku(skus, va, size, count) {
      const allSkus = JSON.parse(JSON.stringify(skus))
      const sku = {}
      try {
        for (const key of Object.keys(allSkus)) {
          const item = allSkus[key]
          const name1 = item.originProps[0] && item.originProps[0].name || ''
          if (name1 === va && Object.keys(sku).length < 1) {
            sku[key] = allSkus[key]
          }
        }
        const pddGoodsSku = {}
        pddGoodsSku['parent_id'] = 0
        pddGoodsSku['vid'] = ''
        pddGoodsSku['name'] = size
        const key = Object.keys(sku)[0]
        if (key) {
          sku[key].originProps[1] = pddGoodsSku
          const oriList = []
          const oriOne = sku[key].originProps[0]
          const oriTwo = {}
          oriTwo['parent_id'] = 0
          oriTwo['vid'] = ''
          oriTwo['name'] = size
          oriList[0] = oriOne
          oriList[1] = oriTwo
          sku[key].originProps = oriList
          const newKey = key + count.toString()
          sku[key].sku = newKey
          sku[key].quantity = 0
          const data = {}
          data[Number(newKey)] = sku[key]
          return data
        }
      } catch (error) {
        console.log('GetVaRelativeSku', error)
      }
    },
    GetVaAndSizeList(item, goodsData, goodsType) {
      const allList = {}
      let flag = false
      for (let i = 0; i < goodsType; i++) {
        allList[i] = []
      }
      for (const i in goodsData.CollectGoodsSkus) {
        const sku = goodsData.CollectGoodsSkus[i]
        for (let j = 0; j < sku.originProps.length; j++) {
          const name = sku.originProps[j].name
          if (j >= allList.length) {
            if (sku.platform === 9 && j > 1) {
              continue
            } else {
              flag = true
            }
          }
          if (name && !allList[j].includes(name)) {
            allList[j].push(name)
          }
        }
      }
      if (flag) {
        this.StatusName(item, `数据处理异常`, false)
        this.failNum++
        return
      }
      return allList
    },
    // 剪切速买通标题
    GetAliExpressTitle(title) {
      const list = title.split('|')
      if (list.length > 3) {
        // 去一头二尾
        list.shift()
        list.pop()
        list.pop()
        return list.join('|')
      }
      if (list.length === 3) {
        return list[0]
      }
      return title
    },
    // 辅助-----------------------------
    writeLog(msg, success = true) {
      if (this.consoleMsg === undefined) {
        return
      }
      if (!msg) { return }
      const color = success ? 'green' : 'red'
      const time = dateFormat(new Date(Date.now()), 'hh:mm:ss')
      this.consoleMsg += `<p style="color:${color}; margin-top: 5px;">${time}:${msg}</p>`
    },
    // 转base64 上传详情图
    imgSaveToUrl(err, file) {
      this.base64Str = null
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      const that = this
      reader.onload = () => {
        that.base64Str = reader.result
      }
    },
    // 随机取值
    getRandomArrayElements(arr, count) {
      const shuffled = arr.slice(0)
      let i = arr.length
      const min = i - count
      let temp; let index
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    },
    // 操作结果字段
    StatusName(item, msg, status) {
      this.$set(item, 'StatusName', msg)
      this.$set(item, 'color', status ? 'green' : 'red')
    },
    // 过滤数据
    filterData(data) {
      console.log('data', data)
      let fData = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        item.Sales = Number(item.Sales)
        item.Price = Number(item.Price)
        // 过滤销量
        if (this.isShowSales && item.Sales < Number(this.commonAttr.StartSales)) {
          continue
        }
        if (this.isShowSales && item.Sales > Number(this.commonAttr.EndSales)) {
          continue
        }
        // 过滤价格
        if (this.isShowPrice && item.Price < Number(this.commonAttr.StartPrice)) {
          continue
        }
        if (this.isShowPrice && item.Price > Number(this.commonAttr.EndPrice)) {
          continue
        }
        fData.push(item)
      }
      // 单词最大
      if (this.isShowTaobao) {
        if (this.commonAttr.wordLimit) {
          fData = fData.splice(0, this.commonAttr.wordLimit)
        }
      }
      // 淘宝 虾皮 排序方式
      if (this.isShowTaobao || this.isShowShopeeSite) {
        switch (this.commonAttr.shopeeSortTypeVal) {
          case 'price,asc':
            fData.sort((a, b) => { return a.Price - b.Price })
            break
          case 'price,desc':
            fData.sort((a, b) => { return b.Price - a.Price })
            break
          case 'sales,asc':
            fData.sort((a, b) => { return a.Sales - b.Sales })
            break
          case 'sales,desc':
            fData.sort((a, b) => { return b.Sales - a.Sales })
            break
        }
      }
      // 1688 排序方式
      if (this.isShowSort) {
        switch (this.commonAttr.alibabaSortTypeVal) {
          case 'pop':
            break
          case 'price_fale':
            fData.sort((a, b) => { return a.Price - b.Price })
            break
          case 'price_true':
            fData.sort((a, b) => { return b.Price - a.Price })
            break
          case 'booked_false':
            fData.sort((a, b) => { return a.Sales - b.Sales })
            break
          case 'booked_true':
            fData.sort((a, b) => { return b.Sales - a.Sales })
            break
        }
      }
      console.log('fData', fData)
      return fData
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
    },
    // 批量删除表格数据
    batchTableDelete(tableData, selectData) {
      if (!selectData.length) {
        return this.notify('批量删除', '请选择要删除的选项', 'warning')
      }
      selectData
        .map(n => n.__ob__.dep.id)
        .forEach(n => {
          console.log(n)
          tableData.splice(
            tableData.findIndex(j => j.__ob__.dep.id === n),
            1
          )
        })
    },
    // 导出数据
    exportTableData() {
      if (!this.goodsList?.length) return this.$message('暂无数据导出')
      let str = `<tr>
          <td>商品ID</td>
          <td>商品来源</td>
          <td>商品链接</td>
          <td>商品标题</td>
          <td>图片链接</td>
          <td>类目</td>
          <td>价格</td>
          <td>销量</td>
          <td>发货地</td>
        </td>`
      this.goodsList.forEach(item => {
        str += `<tr>
        <td style="mso-number-format:'\@';">${item.GoodsId ? item.GoodsId : '' + '\t'}</td>
        <td>${item.Origin ? item.Origin : '' + '\t'}</td>
        <td>${item.Url ? item.Url : '' + '\t'}</td>
        <td>${item.Title ? item.Title : '' + '\t'}</td>
        <td>${item.Image ? item.Image : '' + '\t'}</td>
        <td>${item.CategoryName ? item.CategoryName : '' + '\t'}</td>
        <td>${item.Price ? item.Price : '' + '\t'}</td>
        <td>${item.Sales ? item.Sales : '' + '\t'}</td>
        <td>${item.Sales ? item.Sales : '' + '\t'}</td>
        </tr>`
      })
      exportExcelDataCommon('测试', str)
    },
    // 判断能否转JSON
    isJsonString(str) {
      if (typeof str === 'string') {
        try {
          JSON.parse(str)
          return JSON.parse(str)
        } catch (e) {
          return str
        }
      } else {
        return str
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/product-put-less/platform-selection.less';
</style>

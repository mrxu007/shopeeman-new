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
import CollectPublicApI from './collection-public-api'
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
      CollectPublicApInstance: new CollectPublicApI(this),
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
        keyFilter: '',
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
          const res = await this.CollectPublicApInstance.setGoodsData(item, res2.data)
          if (res.code === 200) {
            this.StatusName(item, `收藏成功`, true)
            this.successNum++
          } else {
            this.StatusName(item, `${res.data}`, false)
            this.failNum++
          }
        }
      } catch (error) {
        this.StatusName(item, `${error}`, false)
        this.failNum++
        console.log(error)
      } finally {
        --count.count
      }
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
        // 过滤标题
        if (this.commonAttr.keyFilter) {
          const keyFilterArr = this.CollectKeyWordApInstance.handleKey(this.commonAttr.keyFilter)
          const fileWord = this.CollectKeyWordApInstance.filterLinkKeyWord(item.Title, keyFilterArr)
          console.log('fileWord', fileWord)
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
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/product-put-less/platform-selection.less';
</style>

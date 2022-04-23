<template>
  <div class="container-row">
    <header class="operation-header">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="关键词采集" name="keyPage">
          <div class="keyword-container">
            <div class="keyword-banner-bar">
              <div
                v-for="item in keyworBar"
                :key="item.value"
                class="barChilren"
                :class="{ active: currentKeywordPlatform === item.value }"
                @click="switchPlatform(item)"
              >
                {{ item.label }}
              </div>
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
                  <el-input v-model="commonAttr.StartPage" :disabled="buttonStatus.start" size="mini" />
                  <p>总页码：</p>
                  <el-input v-model="commonAttr.EndPage" :disabled="buttonStatus.start" size="mini" style="width:85px" />
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
                  <el-select
                    v-model="commonAttr.shopeeSortTypeVal"
                    :disabled="buttonStatus.start"
                    placeholder=""
                    size="mini"
                  >
                    <el-option
                      v-for="(item, index) in commonAttr.shopeeSortType"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </li>
                <li v-show="isShowTaobao">
                  <p>单词最大：</p>
                  <el-input v-model="commonAttr.wordLimit" :disabled="buttonStatus.start" placeholder="" size="mini" />
                </li>

                <li v-show="isShowSales">
                  <p>销量区间：</p>
                  <el-input v-model="commonAttr.StartSales" :disabled="buttonStatus.start" size="mini" />
                  <span class="slot">-</span>
                  <el-input v-model="commonAttr.EndSales" :disabled="buttonStatus.start" size="mini" />
                </li>
                <li v-show="isShowPrice">
                  <p>价格区间：</p>
                  <el-input v-model="commonAttr.StartPrice" :disabled="buttonStatus.start" size="mini" />
                  <span class="slot">-</span>
                  <el-input v-model="commonAttr.EndPrice" :disabled="buttonStatus.start" size="mini" />
                </li>

                <!-- 虾皮 -->
                <li v-show="isShowShopeeSite" class="li-shopee">
                  <p>站点：</p>
                  <el-select
                    v-model="commonAttr.shopeeSiteCode"
                    :disabled="buttonStatus.start"
                    placeholder=""
                    size="mini"
                    @change="getShopeeGoodsPlace"
                  >
                    <el-option
                      v-for="(item, index) in commonAttr.shopeeSite"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <p class="li-shopee-spec">排序方式：</p>
                  <el-select
                    v-model="commonAttr.shopeeSortTypeVal"
                    :disabled="buttonStatus.start"
                    placeholder=""
                    size="mini"
                  >
                    <el-option
                      v-for="(item, index) in commonAttr.shopeeSortType"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </li>
                <li v-show="isShowShopeeSite" class="li-shopee">
                  <p>出货地点：</p>
                  <el-select
                    v-model="commonAttr.shopeePlaceVal"
                    :disabled="buttonStatus.start"
                    placeholder=""
                    size="mini"
                  >
                    <el-option :label="'全部'" :value="'-1,-2'" />
                    <el-option
                      v-for="(item, index) in commonAttr.shopeePlaceOrigin"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-checkbox
                    v-model="commonAttr.isShopeeOffice"
                    :disabled="buttonStatus.start"
                    class="li-shopee-spec"
                    label="全部"
                  >过滤虾皮官方店铺商品
                  </el-checkbox>
                </li>
                <!-- lazada -->
                <li v-show="isShowLazadaSite">
                  <p style="min-width: 128px">站点：</p>
                  <el-select
                    v-model="commonAttr.lazadaSiteCode"
                    style="width:140px"
                    :disabled="buttonStatus.start"
                    placeholder=""
                    size="mini"
                    @change="getLazadaGoodsPlace"
                  >
                    <el-option
                      v-for="(item, index) in commonAttr.lazadaSite"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </li>
                <li v-show="isShowLazadaSite" class="li-lazada">
                  <div v-for="(item, itemKey, index) in commonAttr.lazadaPlaceOrigin" :key="index">
                    <p style="min-width: 128px">{{ itemKey }}</p>
                    <el-select
                      v-model="commonAttr[`lazadaPlaceVal${index}`]"
                      style="width:140px"
                      :disabled="buttonStatus.start"
                      placeholder=""
                      size="mini"
                      multiple
                      collapse-tags
                      @change="changeSelect($event, `${commonAttr[`lazadaPlaceVal${index}`]}`,2)"
                    >
                      <el-option :value="0" label="全部" @click.native="selectAll(`lazadaPlaceVal${index}`, item,2)" />
                      <el-option
                        v-for="(subItem, subIndex) in item"
                        :key="subIndex"
                        :label="subItem.label"
                        :value="subItem.value"
                      />
                    </el-select>
                  </div>
                </li>
                <li v-show="isShowSort">
                  <p>排序方式：</p>
                  <el-select
                    v-model="commonAttr.alibabaSortTypeVal"
                    :disabled="buttonStatus.start"
                    placeholder=""
                    size="mini"
                  >
                    <el-option
                      v-for="(item, index) in commonAttr.alibabaSortType"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </li>
                <li v-show="isShowCreateAt">
                  <p>创建时间：</p>
                  <el-date-picker
                    v-model="commonAttr.value2"
                    :disabled="buttonStatus.start"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="commonAttr.pickerOptions"
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
                  <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="isCollection">开始采集
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    :disabled="!buttonStatus.start"
                    :loading="flag"
                    @click="flag = true"
                  >取消采集
                  </el-button>
                </li>
                <li class="li-item-2">
                  <p>起：</p>
                  <el-input v-model="start" size="mini" placeholder="" />
                  <p>止：</p>
                  <el-input v-model="end" size="mini" placeholder="" />
                </li>
                <li>
                  <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="saveGoodsInfo">收藏商品
                  </el-button>
                  <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="editorUp">编辑上新
                  </el-button>
                </li>
                <li>
                  <el-button type="primary" size="mini" @click="plugVisible = true">插件采集</el-button>
                  <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="deleteAll">清理全部
                  </el-button>
                </li>
                <li>
                  <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="exportTableData">导出数据
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    :disabled="buttonStatus.start"
                    @click="batchTableDelete(goodsList,multipleSelection)"
                  >批量删除
                  </el-button>
                </li>
              </ul>
              <div class="item">
                <p class="text">收藏操作</p>
                <div class="con-sub-6">
                  <div class="con-sub-6-log">
                    <ul>
                      <li><p>收藏总产品数量：</p>{{ goodsCollectionNum }}</li>
                      <li><p>成功数量：</p>{{ successNum }}</li>
                      <li><p>失败数量：</p>{{ failNum }}</li>
                    </ul>
                  </div>
                </div>
              </div>
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
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="isCollection">开始采集
                </el-button>
                <el-button type="primary" size="mini" :disabled="!buttonStatus.start" @click="flag = true">取消采集
                </el-button>
              </li>
              <li class="li-item-2">
                <p>起：</p>
                <el-input v-model="start" size="mini" placeholder="" />
                <p>止：</p>
                <el-input v-model="end" size="mini" placeholder="" />
              </li>
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="saveGoodsInfo">收藏商品
                </el-button>
                <el-button :disabled="buttonStatus.start" type="primary" size="mini" @click="editorUp">编辑上新</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini" @click="plugVisible = true">插件采集</el-button>
                <el-button type="primary" :disabled="buttonStatus.start" size="mini" @click="deleteAll">清理全部</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini" @click="downloadTemplate"> 下载模板</el-button>
                <el-upload
                  ref="importRef"
                  :disabled="buttonStatus.start"
                  style="margin-left:10px;"
                  accept=".xls,.xlsx"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="importTemplate"
                  :show-file-list="false"
                  :auto-upload="false"
                >
                  <el-button :disabled="buttonStatus.start" style="width:96px" size="mini" type="primary">链接导入
                  </el-button>
                </el-upload>
              </li>
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="exportTableData">导出数据
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="buttonStatus.start"
                  @click="batchTableDelete(goodsList,multipleSelection)"
                >批量删除
                </el-button>
              </li>
            </ul>
            <div class="item">
              <p class="text">收藏操作</p>
              <div class="con-sub-6">
                <div class="con-sub-6-log">
                  <ul>
                    <li><p>收藏总产品数量：</p>{{ goodsCollectionNum }}</li>
                    <li><p>成功数量：</p>{{ successNum }}</li>
                    <li><p>失败数量：</p>{{ failNum }}</li>
                  </ul>
                </div>
              </div>
            </div>
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
                <el-input v-model="commonAttr.StartSales" :disabled="buttonStatus.start" size="mini" />
                <span class="slot">-</span>
                <el-input v-model="commonAttr.EndSales" :disabled="buttonStatus.start" size="mini" />
              </li>
              <li v-show="isShowPrice">
                <p>价格区间：</p>
                <el-input v-model="commonAttr.StartPrice" :disabled="buttonStatus.start" size="mini" />
                <span class="slot">-</span>
                <el-input v-model="commonAttr.EndPrice" :disabled="buttonStatus.start" size="mini" />
              </li>
            </ul>
            <div class="item con-sub-3">
              <div class="size-icon" style="margin-top: 3px;">店铺链接(一行一个)
                <el-tooltip placement="top">
                  <div slot="content">目前仅支持淘宝/Shopee/Lazada/1688/拼多多整店采集<br><br>1688店铺链接：进入1688店铺->点击首页->复制链接<br><br>店铺链接：进入shopee店铺->点击所有商品(AllProduct)
                  </div>
                  <i class="el-icon-question" style="" />
                </el-tooltip>
              </div>
              <el-input v-model="mallLinkKey" size="mini" type="textarea" :rows="8" resize="none" />
            </div>
            <div class="item con-sub-3">
              <p class="text">过滤违规词：一行一个</p>
              <el-input v-model="commonAttr.keyFilter" size="mini" type="textarea" :rows="8" resize="none" />
            </div>
            <!--操作按钮 -->
            <ul class="item con-sub-2">
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="isCollection">开始采集
                </el-button>
                <el-button type="primary" size="mini" :disabled="!buttonStatus.start" @click="flag = true">取消采集
                </el-button>
              </li>
              <li class="li-item-2">
                <p>起：</p>
                <el-input v-model="start" size="mini" placeholder="" />
                <p>止：</p>
                <el-input v-model="end" size="mini" placeholder="" />
              </li>
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="saveGoodsInfo">收藏商品
                </el-button>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="editorUp">编辑上新</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini" @click="plugVisible = true">插件采集</el-button>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="deleteAll">清理全部</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="exportTableData">导出数据
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="buttonStatus.start"
                  @click="batchTableDelete(goodsList,multipleSelection)"
                >批量删除
                </el-button>
              </li>
            </ul>
            <div class="item">
              <p class="text">收藏操作</p>
              <div class="con-sub-6">
                <div class="con-sub-6-log">
                  <ul>
                    <li><p>收藏总产品数量：</p>{{ goodsCollectionNum }}</li>
                    <li><p>成功数量：</p>{{ successNum }}</li>
                    <li><p>失败数量：</p>{{ failNum }}</li>
                  </ul>
                </div>
              </div>
            </div>
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
                <el-input v-model="commonAttr.StartPrice" :disabled="buttonStatus.start" size="mini" />
                <span class="slot">-</span>
                <el-input v-model="commonAttr.EndPrice" :disabled="buttonStatus.start" size="mini" />
              </li>
              <li>
                <p>平台：</p>
                <el-select
                  v-model="commonAttr.pictureSearchPlatformId"
                  :disabled="buttonStatus.start"
                  placeholder=""
                  size="mini"
                >
                  <el-option
                    v-for="(item, index) in pictureSearchOrigin"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-upload
                  :disabled="buttonStatus.start"
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
                  :on-error="imgSaveToUrl"
                >
                  <el-button :disabled="buttonStatus.start" style="margin-left:25px" type="primary" size="mini">选择图片
                  </el-button>
                </el-upload>
              </li>
            </ul>
            <div class="item con-sub-3">
              <img v-if="base64Str" style="width: 200px; height: 156px" :src="base64Str" class="avatar">
            </div>
            <!--操作按钮 -->
            <ul class="item con-sub-2">
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="isCollection">开始采集
                </el-button>
                <el-button type="primary" size="mini" :disabled="!buttonStatus.start" @click="flag = true">取消采集
                </el-button>
              </li>
              <li class="li-item-2">
                <p>起：</p>
                <el-input v-model="start" size="mini" placeholder="" />
                <p>止：</p>
                <el-input v-model="end" size="mini" placeholder="" />
              </li>
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="saveGoodsInfo">收藏商品
                </el-button>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="editorUp">编辑上新</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini" @click="plugVisible = true">插件采集</el-button>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="deleteAll">清理全部</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="exportTableData">导出数据
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="buttonStatus.start"
                  @click="batchTableDelete(goodsList,multipleSelection)"
                >批量删除
                </el-button>
              </li>
            </ul>
            <div class="item">
              <p class="text">收藏操作</p>
              <div class="con-sub-6">
                <div class="con-sub-6-log">
                  <ul>
                    <li><p>收藏总产品数量：</p>{{ goodsCollectionNum }}</li>
                    <li><p>成功数量：</p>{{ successNum }}</li>
                    <li><p>失败数量：</p>{{ failNum }}</li>
                  </ul>
                </div>
              </div>
            </div>
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
                <el-select
                  v-model="TaobaoAbroadAccountId"
                  style="width: 140px;"
                  :disabled="buttonStatus.start"
                  placeholder=""
                  size="mini"
                  multiple
                  collapse-tags
                  @change="changeSelect($event, 'TaobaoAbroadAccountId',1)"
                >
                  <el-option
                    :value="0"
                    label="全部"
                    @click.native="selectAll('TaobaoAbroadAccountId', TaobaoAbroadAccount,1)"
                  />
                  <el-option
                    v-for="(item, index) in TaobaoAbroadAccount"
                    :key="index"
                    :label="item.account_alias_name"
                    :value="item.id"
                  />
                </el-select>
              </li>
              <li>
                <p>起始时间：</p>
                <el-date-picker
                  v-model="taobaoTimeAt"
                  :disabled="buttonStatus.start"
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
              <li>
                <a href="#" @click="$BaseUtilService.openUrl('https:distributor.taobao.global/')">淘宝天猫海外商品铺货</a>
              </li>
            </ul>
            <!--操作按钮 -->
            <ul class="item con-sub-2">
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="isCollection">开始采集
                </el-button>
                <el-button type="primary" size="mini" :disabled="!buttonStatus.start" @click="flag = true">取消采集
                </el-button>
              </li>
              <li class="li-item-2">
                <p>起：</p>
                <el-input v-model="start" size="mini" placeholder="" />
                <p>止：</p>
                <el-input v-model="end" size="mini" placeholder="" />
              </li>
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="saveGoodsInfo">收藏商品
                </el-button>
                <el-button type="primary" :disabled="buttonStatus.start" size="mini" @click="editorUp">编辑上新</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini" @click="plugVisible = true">插件采集</el-button>
                <el-button type="primary" :disabled="buttonStatus.start" size="mini" @click="deleteAll">清理全部</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini" :disabled="buttonStatus.start" @click="exportTableData">导出数据
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="buttonStatus.start"
                  @click="batchTableDelete(goodsList,multipleSelection)"
                >批量删除
                </el-button>
              </li>
            </ul>
            <div class="item">
              <p class="text">收藏操作</p>
              <div class="con-sub-6">
                <div class="con-sub-6-log">
                  <ul>
                    <li><p>收藏总产品数量：</p>{{ goodsCollectionNum }}</li>
                    <li><p>成功数量：</p>{{ successNum }}</li>
                    <li><p>失败数量：</p>{{ failNum }}</li>
                  </ul>
                </div>
              </div>
            </div>
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
              <!-- <li>
                <el-checkbox disabled label="启动买手号采集" />
                <p class="tip">（开启买手号，可提高收藏收藏率）</p>
              </li> -->
              <li>
                <el-checkbox v-model="IsDefaultFilterSkuCount" label="过滤多余的SKU" />
                <p class="tip">（勾选多余的SKU，删除所有sku图）</p>
              </li>
              <li>
                <el-checkbox v-model="IsDeleteRepeatSkuImg" label="规格图重复时，删除所有sku图" />
              </li>
              <li>
                <el-checkbox v-model="IsFilterLazadaDeliveryDay" label="启动lazada发货天数过滤商品" />
                <p class="tip2">只收藏lazada发货天数小于</p>
                <el-input v-model="MaxLazadaDeliveryDay" style="width: 60px;margin: 0 5px;" placeholder="" size="mini" />
                天的商品
              </li>
              <li>
                <el-checkbox v-model="IsFilterShopeeDeliveryDay" label="启动shopee发货天数过滤商品" />
                <p class="tip2">只收藏shopee发货天数小于</p>
                <el-input v-model="MaxShoppeDeliveryDay" style="width: 60px;margin: 0 5px;" placeholder="" size="mini" />
                天的商品
              </li>
              <li>
                <el-checkbox v-model="IsCollectDescriptionIsNull " label="采集描述为空的数据" />
              </li>
              <li>
                <p>收藏时过滤商品发货地址（仅Shopee可用）：</p>
                <el-select v-model="GoodsDeliveryAddress" placeholder="" size="mini">
                  <el-option
                    v-for="(item,index) in GoodsDeliveryAddressList"
                    :key="index"
                    :value="item.value"
                    :label="item.label"
                  />
                </el-select>
              </li>
            </ul>
            <ul class="item right">
              <li class="text">翻译设置</li>
              <li>
                <p>翻译缓存时间：</p>
                <el-date-picker
                  v-model="commonAttr.cacheTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="mini"
                  style="margin-right:10px"
                />
                <el-button type="primary" size="mini" @click="clearTranslate">清 理</el-button>
              </li>
              <li>
                <el-button type="primary" size="mini" @click="clearCache">清理缓存数据</el-button>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </header>
    <article v-show="activeName !== 'sixth'">
      <div style="color:red;padding-bottom: 10px;">温馨提示：拼多多产品加载不出来，收藏或者组装数据慢，请切换本地IP</div>
      <u-table
        ref="plTable"
        use-virtual
        :height="activeName==='keyPage'?500:540"
        :data="goodsList"
        :data-changes-scroll-top="false"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
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
        <u-table-column align="center" min-width="150" label="上家ID" prop="GoodsId" show-overflow-tooltip>
          <template v-slot="{row}">
            <span
              v-if="row.GoodsId"
              class="copyIcon"
              @click="copy(row.GoodsId)"
            ><i class="el-icon-document-copy" /></span>
            <span style="cursor: pointer;color:blue" @click="openUrl(row.Url)">
              {{ row.GoodsId }}
            </span>
          </template>
        </u-table-column>
        <u-table-column align="center" label="标题" prop="Title" min-width="400px" show-overflow-tooltip>
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.Title }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" min-width="200" label="类目" prop="CategoryName" show-overflow-tooltip>
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.CategoryName }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="价格" prop="Price" sortable />
        <u-table-column align="center" label="销量" prop="Sales" sortable>
          <template v-slot="{ row }">
            {{ isNaN(row.Sales) ? 0 : row.Sales }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="发货地" prop="Location" />
        <u-table-column align="center" min-width="150" label="来源" prop="Origin" show-overflow-tooltip />
        <u-table-column align="center" min-width="80" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="tableDelete(scope.row,scope.$index)"
            >
              删除
            </el-button>
          </template>
        </u-table-column>
        <u-table-column min-width="100" align="center" label="操作结果" prop="StatusName" show-overflow-tooltip>
          <template v-slot="{ row }">
            <span :style="row.color && 'color:' + row.color">{{ row.StatusName }}</span>
          </template>
        </u-table-column>
      </u-table>
    </article>
    <!-- 插件采集弹窗 -->
    <el-dialog
      v-if="plugVisible"
      class="plug-dialog"
      title="插件采集"
      :visible.sync="plugVisible"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <p>1：请先下载插件程序安装至浏览器，方可使用此功能
        <el-button
          type="primary"
          size="mini"
          @click="$BaseUtilService.openUrl(`https://shopeeman.oss-cn-shenzhen.aliyuncs.com/files/shopeemanFiles/appFiles/20220106/2022010616473761d6aca9e310d.docx`)"
        >
          下载教程
        </el-button>
      </p>
      <p>2：由于推送地址端口号随时生成，重启软件后，请务必重新复制推送地址
        <el-button
          type="primary"
          size="mini"
          @click="$BaseUtilService.openUrl(`https://shopeeppxia.oss-cn-shenzhen.aliyuncs.com/desktop/plugin/CollectPligin.zip`)"
        >
          下载插件
        </el-button>
      </p>
      <div style="color: red;text-align: center;margin: 10px;font-weight: 700" v-if="!accountPermissions()">
        个人版不支持插件采集，请购买或升级进阶、企业、终生版！
      </div>
      <el-form v-else label-position="right" label-width="190px">
        <el-form-item label="拼多多关键词采集推送地址：">
          <div class="item">
            <span>{{ port }}/api/pddGoodsKeyword</span>
            <el-button size="mini" @click="copy(`${port}/api/pddGoodsKeyword`)">复 制</el-button>
          </div>
        </el-form-item>
        <el-form-item label="拼多多详情采集推送地址：">
          <div class="item">
            <span>{{ port }}/api/pddGoodsDetail</span>
            <el-button size="mini" @click="copy(`${port}/api/pddGoodsDetail`)">复 制</el-button>
          </div>
        </el-form-item>
        <el-form-item label="淘宝/天猫关键词采集推送地址：">
          <div class="item">
            <span>{{ port }}/api/tbGoodsKeyword</span>
            <el-button size="mini" @click="copy(`${port}/api/tbGoodsKeyword`)">复 制</el-button>
          </div>
        </el-form-item>
        <el-form-item label="淘宝详情采集推送地址：">
          <div class="item">
            <span>{{ port }}/api/tbGoodsDetail</span>
            <el-button size="mini" @click="copy(`${port}/api/tbGoodsDetail`)">复 制</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="on_new_dialog">
      <el-dialog
        width="1313px"
        :close-on-click-modal="false"
        top="0.5vh"
        :visible.sync="isEditorVisible"
        :modal="false"
        @close="closeEditor"
      >
        <template slot="title">
          <div style="display: flex;align-items: center">
            <div style="margin-right: 25px;">上新编辑</div>
            <el-button size="mini" :type="isNoFoldShow && 'primary' || ''" @click.native.stop="setIsNoFoldShow">
              {{ isNoFoldShow && '折叠' || '展开' }}
            </el-button>
          </div>
        </template>
        <editor-on-new-goods v-if="isEditorVisible" ref="editor_on_new_goods" :mall-table="editorSelection" :is-collect="isCollect"  @close="close"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import CollectKeyWordApI from './collection-keyword-api'
import CollectLinkApI from './collection-link-api'
import CollectEntireApI from './collection-entire-api'
import CollectOtherApI from './collection-other-api'
import CollectPublicApI from './collection-public-api'
import { batchOperation, dateFormat, exportExcelDataCommon, terminateThread,accountPermissions } from '../../../util/util'
// getSiteRelation
import editorOnNewGoods from '../../../components/editor_on_new_goods'
import {
  shopeeSite,
  lazadaSite,
  pictureSearchOrigin,
  getPlatform,
  platformObj,
  getShopeeSitePlace,
  getLazadaSitePlace
} from './collection-platformId'
import XLSX from 'xlsx'

export default {
  components: {
    editorOnNewGoods
  },
  props: {
    baseConfig: {
      type: Object,
      required: false,
      default: () => {
        return {
          keywordConfig: [1, 2, 11, 8, 10, 12, 9] // 关键词采集配置
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
      activeName: 'keyPage',
      collectName: '',
      CollectPublicApInstance: new CollectPublicApI(this),
      CollectKeyWordApInstance: new CollectKeyWordApI(this), // 关键词采集
      collectLinkApInstance: new CollectLinkApI(this), // 链接采集
      collectEntireApInstance: new CollectEntireApI(this), // 整店采集
      collectOtherApInstance: new CollectOtherApI(this), // 整店采集
      isCollect: true,
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
        EndPage: 100,
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
        shopeePlaceVal: '-1,-2',
        // Lazada
        lazadaSite: [],
        lazadaSiteCode: 'MY',
        lazadaPlaceOrigin: {},
        lazadaPlaceVal0: [],
        lazadaPlaceVal1: [],
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value2: '',
        cacheTime: [], // 翻译缓存时间
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
      linkKeyArr: '',
      importLinkData: '',
      mallLinkKey: '',
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
      goodsCollectionNum: 0,

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
      IsDeleteRepeatSkuImg: false, // 规格图重复时，删除所有sku图

      // 插件采集
      plugVisible: false,
      port: '',

      // 编辑上新
      isEditorVisible: false,
      isNoFoldShow: true,
      editorSelection: []
    }
  },
  computed: {
    keyworBar() {
      return getPlatform(this.baseConfig.keywordConfig)
    },
    // 1 拼多多    2 淘宝/天猫  11 虾皮    8 1688
    // 10 京喜/京东     12 速卖通    9  lazada
    isShowPdd() { // 是否显示页码
      const supportPlarm = [1]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowPage() { // 是否显示页码
      const supportPlarm = [1, 11, 8, 10, 12, 9]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },

    isShowPageSize20() { // 是否显示页码
      const supportPlarm = [1, 8]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowPageSize50() { // 是否显示页码
      const supportPlarm = [11]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowSales() { // 销量区间
      const supportPlarm = [1, 2, 11, 8, 10, 12]
      return supportPlarm.includes(this.currentKeywordPlatform)
    },
    isShowPrice() { // 价格区间
      const supportPlarm = [1, 2, 11, 8, 10, 12, 9]
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
    //   const supportPlarm = [1, 11, 8, 10, 12, 9]
    //   return supportPlarm.includes(this.currentKeywordPlatform)
    // }
  },
  watch: {
    flag(val) {
      if (val) {
        terminateThread()
      }
    }
  },
  async mounted() {
    this.commonAttr.shopeeSite = shopeeSite
    this.commonAttr.lazadaSite = lazadaSite
    this.pictureSearchOrigin = pictureSearchOrigin
    const dataTime = new Date() - 0
    this.taobaoTimeAt = [dataTime - 3600 * 1000 * 24 * 62, dataTime]
    this.commonAttr.cacheTime = [dataTime - 3600 * 1000 * 24 * 1, dataTime + 3600 * 1000 * 24 * 1]
    this.getShopeeGoodsPlace()
    this.getLazadaGoodsPlace()
    await this.getTaobaoAbroadAccount()
    // 监听传入的链接
    this.linkKey = localStorage.getItem('linkKey') ? localStorage.getItem('linkKey').replaceAll(',', '\n') : ''
    window.addEventListener('storage', event => {
      this.linkKey = localStorage.getItem('linkKey') ? localStorage.getItem('linkKey').replaceAll(',', '\n') : ''
    })
    // 获取插件port
    await this.getPluginPorts()
    // 监听插件采集
    await this.getPluginData()
  },
  methods: {
    // 监听插件采集
    async getPluginData() {
      try {
        this.$IpcMain.on('pddGoodsKeyword', async(response) => {
          this.collectName = `插件采集数据`
          await this.CollectPublicApInstance.pddGoodsKeyword(response)
        })
        this.$IpcMain.on('pddGoodsDetail', async(response) => {
          this.collectName = `插件采集数据`
          await this.CollectPublicApInstance.pddGoodsDetail(response)
        })
        this.$IpcMain.on('tbGoodsKeyword', async(response) => {
          this.collectName = `插件采集数据`
          await this.CollectPublicApInstance.tbGoodsKeyword(response)
        })
        this.$IpcMain.on('tbGoodsDetail', async(response) => {
          this.collectName = `插件采集数据`
          await this.CollectPublicApInstance.tbGoodsDetail(response)
        })
      } catch (error) {
        // console.log(error)
      }
    },
    // 获取插件port
    async getPluginPorts() {
      try {
        this.port = await this.$BaseUtilService.getPluginPorts()
      } catch (error) {
        this.$message.error(`获取插件路径异常${error}`)
      }
    },
    // 清理翻译缓存
    async clearTranslate() {
      try {
        if (this.cacheTime?.length > 0) {
          return this.$message.error('请选择时间')
        }
        const start = this.$dayjs(this.commonAttr.cacheTime[0]).format('YYYY-MM-DD 00:00:00')
        const end = this.$dayjs(this.commonAttr.cacheTime[1]).format('YYYY-MM-DD 00:00:00')
        const res = await this.$BaseUtilService.clearGoodsTranslateInfo(start, end)
        if (Object.keys(JSON.parse(res)).length !== 0) {
          return this.$message.success('清理翻译数据失败')
        }
        this.$message.success('清理翻译数据成功')
      } catch (error) {
        this.$message.success('清理翻译数据失败')
      }
    },
    // 清理缓存数据
    async clearCache() {
      try {
        const res = await this.$BaseUtilService.clealAllCache()
        if (!res) {
          return this.$message.error('清理缓存数据失败')
        }
        this.$message.success('清理缓存数据成功')
      } catch (error) {
        this.$message.error('清理缓存数据失败')
      }
    },
    // 编辑上新
    async editorUp() {
      if (!this.multipleSelection.length) return this.$message.error('请选择需要编辑的数据')
      console.log('multipleSelection', this.multipleSelection)
      this.editorSelection = []
      // this.multipleSelection.forEach(item => {
      for (let index = 0; index < this.multipleSelection.length; index++) {
        const item = this.multipleSelection[index]
        this.editorSelection.push(Object.assign(item, {
          title: item.Title,
          image: item.Image,
          price: item.Price,
          stock: item.Stock,
          goods_id: item.GoodsId,
          source: item.Platform
        }))
        if (index >= Number(this.end) - 1) { // 止
          break
        }
      }
      console.log(this.editorSelection)
      this.isEditorVisible = true
      // this.saveGoodsInfo()
    },
    setIsNoFoldShow() {
      this.isNoFoldShow = !this.isNoFoldShow
      this.$refs.editor_on_new_goods.setIsNoFoldShow()
    },
    getShopeeGoodsPlace() { // 获取shopee出货地点
      this.commonAttr.shopeePlaceVal = '-1,-2'
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
    isCollection() {
      if (this.goodsList.length > 0) {
        this.$confirm('确定重新采集？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.StartCollection()
        })
      } else {
        this.StartCollection()
      }
    },
    // 开始采集
    StartCollection() {
      this.flag = false
      switch (this.activeName) {
        case 'keyPage': // 关键字采集
          this['keywordSearch']()
          break
        case 'linkPage': // 链接采集
          this['linksSearch'](1)
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
    // 开始关键词采集
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
      this.commonAttr.wordLimit = this.commonAttr.wordLimit === '' ? 10 : this.commonAttr.wordLimit
      this.CollectKeyWordApInstance._initKeyWord(platForm, this.commonAttr)
      this.writeLog('开始采集搜索........', true)
      this.writeLog(`开始采集${platformObj[platForm]}商品.......`, true)
      this.collectName = `${platformObj[platForm]}关键词采集数据`
      const keyList = []
      for (let i = 0; i < keyLen; i++) {
        if (this.flag) {
          this.buttonStatus.start = false
          this.flag = false
          this.writeLog(`取消${platformObj[platForm]}商品采集`, true)
          break
        }
        const item = key[i]
        if (keyList.includes(item)) {
          this.writeLog(`重复关键词${item}`, false)
          continue
        }
        keyList.push(item)
        const itemList = []
        await this.CollectKeyWordApInstance.keywordSearch(item, itemList)
        if (platForm === 1) { // 如果当前平台为拼多多需额外调用 拼多多补充接口
          await this.CollectKeyWordApInstance.keywordSearchTwo(item)
        }
      }
      this.goodsList.forEach(row => {
        this.$refs.plTable.toggleRowSelection([{ row }])
      })
      this.writeLog(`${platformObj[platForm]}：共采集：${this.goodsList.length}条`, true)
      this.writeLog(`${platformObj[platForm]}商品采集完毕........`, true)
      key = null
      this.buttonStatus.start = false
      this.flag = false
    },
    // 开始链接采集
    async linksSearch(type) {
      let res = ''
      this.consoleMsg = ''
      if (type === 1) {
        res = this.collectLinkApInstance.handleLinkKeyFactory(this.linkKey, type) // 处理数据
      } else {
        res = this.collectLinkApInstance.handleLinkKeyFactory(this.linkKeyArr, type) // 处理数据
      }
      if (res.code !== 200) {
        return this.$message.error(res.data)
      }
      this.goodsList = []
      const data = res.data
      if (data.length > 0) {
        this.buttonStatus.start = true
        this.writeLog('开始商品链接采集搜索........', true)
        this.collectName = `商品链接采集数据`
        data.forEach(item => {
          item.type = type
        })
        await batchOperation(data, this.linkCollect)
        if (this.flag) this.writeLog('取消链接采集', true)
        this.goodsList.forEach(row => {
          this.$refs.plTable.toggleRowSelection([{ row }])
        })
        console.log(this.goodsList)
        this.writeLog(`商品链接：共采集：${this.goodsList.length}条`, true)
        this.writeLog(`商品链接采集完毕........`, true)
        this.buttonStatus.start = false
        this.flag = false
      }
    },
    async linkCollect(item, count = { count: 1 }) {
      try {
        if (this.flag) {
          terminateThread()
          return
        }
        console.log('getGoodsDeail - param', item)
        const res2 = await this.collectLinkApInstance.getGoodsDeail(item)
        console.log('getGoodsDeail', res2)
        if (res2.code !== 200) {
          this.writeLog(`商品ID: ${item.GoodsId} 采集失败: ${res2.data}`, false)
        } else {
          const data = {}
          const resData = res2.data.ListItem[0]
          data.Image = resData.Image
          data.GoodsId = resData.GoodsId
          data.Title = resData.Title
          data.CategoryName = resData.CategoryName
          data.Price = resData.Price
          data.Sales = resData.Sales
          data.Origin = resData.Origin
          data.isDetail = true
          data.Platform = item.platformId
          data.Url = item.Url
          data.Site = item.Site || null
          data.ShopId = item.ShopId || null
          if (item.type === 2) {
            data.isLink = true
            data.Weight = item.Weight || 0
            data.Length = item.Length || 0
            data.Width = item.Width || 0
            data.Height = item.Height || 0
          }
          this.writeLog(`商品ID: ${item.GoodsId}采集成功`)
          this.goodsList.push(data)
          console.log('linkData', this.goodsList)
        }
      } catch (error) {
        console.log(error)
        this.writeLog(`商品ID: ${item.GoodsId} 异常`, false)
      } finally {
        --count.count
      }
    },
    // 开始整店采集
    async entriresShopSearch() {
      const res = this.collectEntireApInstance.handleEntireKeyFactory(this.mallLinkKey) // 处理关键词
      if (res.code !== 200) {
        return this.$message.error(res.data)
      }
      this.buttonStatus.start = true
      this.consoleMsg = ''
      this.goodsList = []
      this.writeLog('开始整店链接采集搜索........', true)
      this.collectName = `整店采集数据`
      const data = res.data
      for (const item of data) {
        if (this.flag) {
          return
        }
        this.writeLog(`开始获取【${item}】`, true)
        await this.collectEntireApInstance.mallSearch(item)
      }
      if (this.flag) this.writeLog('取消整店采集', true)
      this.goodsList.forEach(row => {
        this.$refs.plTable.toggleRowSelection([{ row }])
      })
      this.writeLog(`整店链接：共采集：${this.goodsList.length}条`, true)
      this.writeLog(`整店链接采集完毕........`, true)
      this.buttonStatus.start = false
      this.flag = false
    },
    // 开始图搜同款采集
    async picToPicSearch() {
      if (!this.base64Str) {
        return this.$message.error('请上传图片')
      }
      this.buttonStatus.start = true
      this.consoleMsg = ''
      this.goodsList = []
      const Name = this.commonAttr.pictureSearchPlatformId === '8' ? '1688' : '淘宝'
      this.writeLog(`开始 ${Name} 图搜采集搜索........`, true)
      this.collectName = `图搜采集数据`
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
      this.goodsList.forEach(row => {
        this.$refs.plTable.toggleRowSelection([{ row }])
      })
      this.writeLog(`图搜：共采集：${this.goodsList.length}条`, true)
      this.writeLog(`${Name} 图搜采集完毕........`, true)
      this.buttonStatus.start = false
      this.flag = false
    },
    async getTaobaoAbroadAccount() {
      const res = await this.collectOtherApInstance.getTaobaoAbroadAccount()
      console.log('getTaobaoAbroadAccount', res)
      if (res.code !== 200) {
        return this.$message.error(`获取淘宝天猫海外账号失败：${res.code} ${res.data}`)
      }
      this.TaobaoAbroadAccount = res.data
    },
    // 开始天猫淘宝海外平台采集
    async taobaoAbroadSearch() {
      if (this.TaobaoAbroadAccountId.length === 0) {
        return this.$message.error('请选择账号')
      }
      this.buttonStatus.start = true
      this.consoleMsg = ''
      this.goodsList = []
      this.writeLog(`开始 淘宝天猫海外 采集搜索........`, true)
      this.collectName = '淘宝天猫海外采集数据'
      for (let i = 0; i < this.TaobaoAbroadAccountId.length; i++) {
        if (this.flag) {
          this.writeLog('取消淘宝天猫海外采集', true)
          break
        }
        const accountID = this.TaobaoAbroadAccountId[i]
        const account = this.TaobaoAbroadAccount.find(item => item.id === accountID)
        await this.collectOtherApInstance.queryTmCrossBorder(account, this.taobaoTimeAt)
      }
      console.log('taobaoData', this.goodsList)
      this.goodsList.forEach(row => {
        this.$refs.plTable.toggleRowSelection([{ row }])
      })
      this.writeLog(`淘宝天猫海外：共采集：${this.goodsList.length}条`, true)
      this.writeLog('淘宝天猫海外采集完毕........', true)
      this.buttonStatus.start = false
      this.flag = false
    },
    // 开始收藏
    async saveGoodsInfo() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择商品')
        return
      }
      this.buttonStatus.start = true
      this.successNum = 0
      this.failNum = 0
      // 编辑上新时根据用户选择的起止数据切割
      this.multipleSelection = this.isEditorVisible ? this.multipleSelection.splice(Number(this.start) - 1, Number(this.end) - Number(this.start) + 1) : this.multipleSelection
      this.goodsCollectionNum = this.multipleSelection.length
      await batchOperation(this.multipleSelection, this.saveGoods)
      this.buttonStatus.start = false
      this.flag = false
    },
    async saveGoods(item, count = { count: 1 }) {
      let res = null
      try {
        this.StatusName(item, `正在获取商品详情`, true)
        const res2 = await this.collectLinkApInstance.getGoodsDeail(item)
        if (res2.code !== 200) {
          this.StatusName(item, `获取商品详情失败：${res2.data}`, false)
          this.failNum++
          return
        } else {
          console.log('详情数据', res2.data)
          res = await this.CollectPublicApInstance.setGoodsData(item, res2.data)
          console.log('CollectPublicApInstance', res)
          if (res.code === 200) {
            res.data.operation_type = '收藏成功'
            this.StatusName(item, `收藏成功`, true)
            this.successNum++
            this.$nextTick(() => {
              this.$refs.plTable.toggleRowSelection([{ row: item, selected: false }])
            })
          } else {
            let errorStr = ''
            if (res.msg) {
              errorStr = res.msg
            } else {
              errorStr = '收藏失败：' + res.data
            }
            this.StatusName(item, `${errorStr}`, false)
            this.failNum++
          }
        }
      } catch (error) {
        if (res.msg) {
          error = res.msg
        } else {
          error = '收藏失败：' + res.data
        }
        this.StatusName(item, `${error}`, false)
        this.failNum++
        console.log(error)
      } finally {
        --count.count
      }
    },
    // 关闭上新弹窗
    closeEditor() {
      terminateThread()
    },
    // 辅助-----------------------------
    writeLog(msg, success = true) {
      if (this.consoleMsg === undefined) {
        return
      }
      if (!msg) {
        return
      }
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
      const fData = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const oldItem = this.goodsList.find(son => son.GoodsId === item.GoodsId)
        if (oldItem) {
          continue
        }
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
          const keyFilterArr = this.CollectPublicApInstance.handleKey(this.commonAttr.keyFilter)
          const fileWord = this.CollectPublicApInstance.filterLinkKeyWord(item.Title, keyFilterArr)
          item.keyWord = fileWord
          if (item.keyWord !== '') {
            continue
          }
        }
        // 过滤创建时间
        if (this.isShowCreateAt && this.commonAttr.value2?.length > 0) {
          const start = this.commonAttr.value2[0].getTime()
          const end = this.commonAttr.value2[1].getTime()
          const create = item.CreateTime * 1000
          if (create < start || create > end) {
            continue
          }
        }
        // 过滤虾皮官方店铺
        if (this.isShowShopeeSite && item.IsOfficialShop === true) {
          continue
        }
        fData.push(item)
      }
      // 淘宝 虾皮 排序方式
      if (this.isShowTaobao || this.isShowShopeeSite) {
        switch (this.commonAttr.shopeeSortTypeVal) {
          case 'price,asc':
            fData.sort((a, b) => {
              return a.Price - b.Price
            })
            break
          case 'price,desc':
            fData.sort((a, b) => {
              return b.Price - a.Price
            })
            break
          case 'sales,asc':
            fData.sort((a, b) => {
              return a.Sales - b.Sales
            })
            break
          case 'sales,desc':
            fData.sort((a, b) => {
              return b.Sales - a.Sales
            })
            break
        }
      }
      // 1688 排序方式
      if (this.isShowSort) {
        switch (this.commonAttr.alibabaSortTypeVal) {
          case 'pop':
            break
          case 'price_fale':
            fData.sort((a, b) => {
              return a.Price - b.Price
            })
            break
          case 'price_true':
            fData.sort((a, b) => {
              return b.Price - a.Price
            })
            break
          case 'booked_false':
            fData.sort((a, b) => {
              return a.Sales - b.Sales
            })
            break
          case 'booked_true':
            fData.sort((a, b) => {
              return b.Sales - a.Sales
            })
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
    tableDelete(row, index) {
      this.$refs.plTable.toggleRowSelection([
        { row, selected: false }
      ])
      this.goodsList.splice(index, 1)
    },
    // 批量删除表格数据
    batchTableDelete(tableData, selectData) {
      if (!selectData.length) {
        return this.$message.error('请选择要删除的选项')
      }
      selectData
        .map(n => n.__ob__.dep.id)
        .forEach(n => {
          tableData.splice(
            tableData.findIndex(j => j.__ob__.dep.id === n),
            1
          )
        })
      selectData.forEach(row => {
        this.$refs.plTable.toggleRowSelection([
          { row, selected: false }
        ])
      })
    },
    deleteAll() {
      this.$confirm('确定清理全部吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.goodsList = []
        this.$refs.plTable.reloadData(this.goodsList)
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
        <td>${item.Location ? item.Location : '' + '\t'}</td>
        </tr>`
      })
      exportExcelDataCommon(this.collectName, str)
    },
    // 链接导入
    linkImport() {
      const dataSum = this.importLinkData.length
      this.linkKeyArr = []
      if (dataSum <= 0) {
        this.writeLog('表格数据为空', false)
        return
      }
      this.writeLog('开始读取表格...', true)
      for (let i = 0; i < dataSum; i++) {
        const item = this.importLinkData[i]
        const arr = {}
        arr['Url'] = item['商品链接']
        arr['Weight'] = item['重量(kg)']
        arr['Length'] = item['长(cm)']
        arr['Width'] = item['宽(cm)']
        arr['Height'] = item['高(cm)']
        if (!arr['Url']) {
          continue
        }
        this.linkKeyArr.push(arr)
      }
      this.linksSearch(2)
    },
    // 链接采集-下载模板
    downloadTemplate() {
      const template = `<tr>
      <td style="width: 600px">商品链接</td>
      <td style="width: 100px">重量(kg)</td>
      <td style="width: 100px">长(cm)</td>
      <td style="width: 100px">宽(cm)</td>
      <td style="width: 100px">高(cm)</td>
      </tr>`
      exportExcelDataCommon('商品链接采集模板', template)
    },
    // 表格导入
    importTemplate(file) {
      const files = { 0: file.raw }
      if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.writeLog('格式错误,请上传xls、xlsx格式的文件', false)
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
        this.importLinkData = ws
        this.linkImport()
        ws = null
        this.$refs.importRef.value = ''
      }
      fileReader.readAsBinaryString(files[0])
    },
    // 打开外部链接
    async openUrl(url) {
      console.log('url', url)
      if (url) {
        this.$BaseUtilService.openUrl(url)
      }
    },
    close(name){
      if (name){
        this[name] = false
      }else {

      }
    },
    // 全选
    selectAll(key, baseData, type) {
      if (type === 1) {
        if (this[key].length < baseData.length) {
          this[key] = []
          baseData.map((item) => {
            this[key].push(item.id)
          })
        } else {
          this[key] = []
        }
      } else {
        if (this.commonAttr[key].length < baseData.length) {
          this.commonAttr[key] = []
          baseData.map((item) => {
            this.commonAttr[key].push(item.value)
          })
        } else {
          this.commonAttr[key] = []
        }
      }
    },
    changeSelect(val, key, type) {
      if (type === 1) {
        if (!val.includes(0) && val.length === this[key].length) {
        } else if (val.includes(0) && val.length - 1 < this[key].length) {
          this[key] = this[key].filter((item) => {
            return item !== 0
          })
        } else {
          if (!val.includes(0) && val.length === this.commonAttr[key].length) {
          } else if (val.includes(0) && val.length - 1 < this.commonAttr[key].length) {
            this.commonAttr[key] = this.commonAttr[key].filter((item) => {
              return item !== 0
            })
          }
        }
      }
    },
    accountPermissions(){
      return accountPermissions(3,()=>{
        this.$message.error('个人版不支持插件采集，请购买或升级进阶、企业、终生版！')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/product-put-less/platform-selection.less';
</style>
<style lang="less">
.on_new_dialog {
  .el-dialog__header {
    padding: 10px;

    .el-dialog__headerbtn {
      top: 10px;

      .el-icon-close {
        font-size: 16px !important;
      }
    }

    .el-dialog__title {
      font-weight: 700;
      font-size: 14px;
    }
  }

  .el-dialog__body {
    padding: 5px 16px 10px;

    .el-upload {
      width: 60px;
      height: 60px;

      .el-upload-dragger {
        width: 100%;
        height: 100%;
      }

      .avatar-uploader-icon {
        font-size: 20px;
        color: #8c939d;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

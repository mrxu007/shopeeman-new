<template>
  <el-row class="contaniner">
    <el-row class="header">
      <div class="nowrapBox" v-show="isNoFoldShow">
        <div class="basisInstall">
          <div class="basisInstall-title">店铺设置</div>
          <storeChoose @changeMallList="changeMallList" :spanWidth="'60px'" :source="'true'" :is-reset="true"
                       style="margin-bottom: 5px;"></storeChoose>
          <div class="basisInstall-box" style="flex-wrap: nowrap">
            <div>物流设置：</div>
            <div>
              <el-checkbox-group v-model="logistics" size="mini">
                <el-checkbox :label="item.ShipId" v-for="item in logisticsList"
                             :key="item.ShipId" :disabled="isBanPerform">{{ item.ShipName }}
                </el-checkbox>
              </el-checkbox-group>
              <div v-if="customLogistics[0]">
                <p style="color: var(--themeColor)">确保此物流方式已在商家后台开启
                  <el-tooltip class="item" effect="dark" content="请填写相应站点币种价格，此价格不可转换" placement="top">
                    <el-button size="mini" type="text"><i class="el-icon-question"></i></el-button>
                  </el-tooltip>
                </p>
                <div v-for="item in customLogistics" :key="item.ShipId" style="margin-bottom: 5px">
                  <span>{{ item.ShipName }}</span>
                  <el-input size="mini" v-model="item.price" style="width: 100px; margin-left: 5px;"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="basisInstall-box">
            <div>水印设置：</div>
            <div>
              <el-checkbox v-model="storeConfig.watermarkChecked" size="mini" :disabled="isBanPerform">批量添加水印
              </el-checkbox>
              <el-button :disabled="isBanPerform" size="mini" style="margin-left: 15px;" type="primary"
                         @click="setWatermark(1)">水印配置
              </el-button>
            </div>
          </div>
          <div class="basisInstall-box">
            <div>SKU价格：</div>
            <div>
              <el-radio v-model="storeConfig.priceRadio" :label="0" :disabled="isBanPerform">保留全部</el-radio>
              <el-radio v-model="storeConfig.priceRadio" :label="1" :disabled="isBanPerform">删除最低价</el-radio>
              <el-radio v-model="storeConfig.priceRadio" :label="2" :disabled="isBanPerform">删除最高价</el-radio>
            </div>
          </div>
          <div class="basisInstall-box">
            <div>商品设置：</div>
            <div>
              <el-checkbox v-model="storeConfig.activityChecked" size="mini" :disabled="isBanPerform">添加到折扣活动或商品分类
              </el-checkbox>
              <el-button size="mini" style="margin-left: 15px;" type="primary" @click="setSellActive()"
                         :disabled="isBanPerform">行销活动配置
              </el-button>
            </div>
          </div>
          <div class="basisInstall-box">
            <el-checkbox-group v-model="storeConfig.chineseChecked" size="mini">
              <el-checkbox label="允许上新中文" style="margin: 0;" :disabled="isBanPerform"></el-checkbox>
              <el-tooltip class="item" effect="dark" content="勾选后，将不再检测商品信息中是否含有中文" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
              <el-checkbox label="允许上新简体数据" style="margin-left: 15px;"
                           :disabled="isBanPerform || storeConfig.chineseChecked.length<1"></el-checkbox>
              <el-tooltip class="item" effect="dark" content="勾选后，将不再检测商品语种是否为简体" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </el-checkbox-group>
          </div>
          <div class="basisInstall-box">
            <div>图片上传线程数量：
              <el-input size="mini" v-model="storeConfig.pictureThread" style="width: 60px;"
                        @change="changeStockUpNumber(storeConfig.pictureThread,4)"></el-input>
              <el-tooltip class="item" effect="dark" content="0<线程数量<6，建议数量为3" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div style="margin-left: 15px;">
              <el-checkbox v-model="storeConfig.wordsHeavy" size="mini" :disabled="isBanPerform">标题内单词去重</el-checkbox>
            </div>
          </div>
          <div v-if="country==='MY'||country ==='ID'" class="basisInstall-box">
            <div>危险物品：</div>
            <el-radio v-model="storeConfig.dangerousRadio" :label="0" :disabled="isBanPerform">不是</el-radio>
            <el-radio v-model="storeConfig.dangerousRadio" :label="1" :disabled="isBanPerform">包含电池/磁铁/易燃材料</el-radio>
          </div>
          <div class="basisInstall-box">
            <el-button size="mini" :disabled="isBanPerform" type="primary" @click="enterGoodsTag">标记商品标签</el-button>
            <el-button size="mini" :disabled="isBanPerform" @click="enterCategory({})">同步类目属性</el-button>
            <el-button size="mini" :disabled="isBanPerform" type="primary" @click="">保存配置</el-button>
          </div>
        </div>
        <div class="basisInstall">
          <div class="basisInstall-title">基础设置</div>
          <div class="basisInstall-box">
            <el-radio :disabled="isBanPerform" v-model="basicConfig.valuationRadio" :label="1">计价方式一</el-radio>
            <el-radio :disabled="isBanPerform" v-model="basicConfig.valuationRadio" :label="2">计价方式二</el-radio>
            <el-radio :disabled="isBanPerform" v-model="basicConfig.valuationRadio" :label="3">计价方式三</el-radio>
          </div>
          <div v-if="basicConfig.valuationRadio === 1">
            <div class="basisInstall-box">
              <div>基础加价：</div>
              <el-input size="mini" style="width: 60px;margin-right: 5px"
                        v-model="basicConfig.formula.percentage"></el-input>
              %　+　基础价
              <el-input size="mini" style="width: 60px;margin-right: 5px"
                        v-model="basicConfig.formula.basis"></el-input>
              　+　藏价
              <el-input size="mini" style="width: 60px;" v-model="basicConfig.formula.hidden"></el-input>
              <el-tooltip class="item" effect="dark" content="加价方式：原价+原价*百分百+基础价+藏价" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box">
              <div>商品折扣：</div>
              <div>
                <el-input style="width: 60px;margin-right: 5px" size="mini" v-model="basicConfig.discount"></el-input>
                %
                <el-tooltip class="item" effect="dark" content="例：25（加价完成后价格） / 0.5（商品折扣为50%）" placement="top">
                  <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i>
                  </el-button>
                </el-tooltip>
              </div>
              <div style="margin-left: 10px;">计价方式：</div>
              <el-radio :disabled="isBanPerform" v-model="basicConfig.valuationMethodsRadio" :label="0"
                        style="margin-right: 10px">以折扣价为准
              </el-radio>
              <el-radio :disabled="isBanPerform" v-model="basicConfig.valuationMethodsRadio" :label="1">以零售价为准
              </el-radio>
            </div>
          </div>
          <div v-if="basicConfig.valuationRadio === 2">
            <div class="basisInstall-box">
              <div>计价方式：</div>
              <el-radio :disabled="isBanPerform" v-model="basicConfig.valuationMethodsRadio" :label="0"
                        style="margin-right: 10px">以折扣价为准
              </el-radio>
              <el-radio :disabled="isBanPerform" v-model="basicConfig.valuationMethodsRadio" :label="1">以零售价为准
              </el-radio>
              <el-button :disabled="isBanPerform" size="mini" type="primary" @click="valuationInit">计价配置</el-button>
            </div>
          </div>
          <div v-if="basicConfig.valuationRadio === 3">
            <div class="basisInstall-box">
              <div>商品价格：</div>
              <el-input size="mini" v-model="basicConfig.fixedPrice" style="width: 120px;"></el-input>
              <el-tooltip class="item" effect="dark" content="每个热搜词之间以逗号隔开，不进行翻译" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
          </div>
          <div class="basisInstall-box">
            <div style="display: flex;align-items: center">
              <div>添加热搜词：</div>
              <el-radio :disabled="isBanPerform" v-model="basicConfig.headlineRadio" :label="0"
                        style="margin-right: 15px;line-height: 28px;">
                标题前加
              </el-radio>
              <el-radio :disabled="isBanPerform" v-model="basicConfig.headlineRadio" :label="1"
                        style="margin-right: 20px;line-height: 28px;">
                标题后加
              </el-radio>
              <div>热搜词随机个数
                <el-input style="width: 60px;margin-left: 5px" size="mini" v-model="basicConfig.hotSearch"></el-input>
              </div>
              <el-tooltip class="item" effect="dark" content="每个热搜词之间以逗号隔开，不进行翻译" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div style="width: 95%;margin-top: 5px;">
              <el-input type="textarea" :rows="2" resize="none" style="width: 100%" placeholder="请输入热搜词,以逗号隔开"
                        v-model="basicConfig.hotList"></el-input>
            </div>
          </div>
          <div class="basisInstall-box">
            <div>禁运设置：</div>
            <div>
              <el-checkbox :disabled="isBanPerform" v-model="basicConfig.embargoChecked1" size="mini">启动禁运类目拦截
              </el-checkbox>
              <el-checkbox :disabled="isBanPerform" v-model="basicConfig.embargoChecked2" size="mini">启动禁运词拦截
              </el-checkbox>
            </div>
          </div>
          <div class="basisInstall-box">
            <div>商品重量：</div>
            <div>
              <el-input size="mini" style="width: 60px" v-model="basicConfig.minHeavy"></el-input>
              -
              <el-input size="mini" style="width: 60px;margin-right: 5px;" v-model="basicConfig.maxHeavy"></el-input>
              kg
              <el-tooltip class="item" effect="dark" content="商品重量默认随机0.1 - 1kg" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div style="margin-left: 15px;">类目映射：</div>
            <el-select v-model="basicConfig.categoryMapping" size="mini" style="width: 120px;">
              <el-option
                  v-for="item in categoryMappingList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="basisInstall-box">
            <div>Shopee商品类目：</div>
            <div>
              <el-checkbox v-model="basicConfig.sourceCategoryChecked" size="mini" :disabled="isBanPerform">
                使用Shopee采集商品源类目
              </el-checkbox>
              <el-tooltip class="item" effect="dark" content="Shopee商品只有类目能使用商品源类目，属性只能选择默认！" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
          </div>
          <div class="basisInstall-box">
            <div>预购：</div>
            <div>
              <el-checkbox v-model="basicConfig.stockUpChecked" size="mini" :disabled="isBanPerform">是否较长时间备货
              </el-checkbox>
              <el-input style="width: 60px;margin: 0 5px;" size="mini" v-model="basicConfig.stockUpNumber" :min="7"
                        :max="30"
                        @change="changeStockUpNumber(basicConfig.stockUpNumber,1)"></el-input>
              天
              <el-tooltip class="item" effect="dark" content="如果备货最短7天，最长30天" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
          </div>
          <div class="basisInstall-box">
            <div>上新线程：</div>
            <el-input style="width: 60px;margin: 0 5px;" size="mini" v-model="basicConfig.onNewThread"
                      @change="changeStockUpNumber(basicConfig.onNewThread,2)"></el-input>
            <el-tooltip class="item" effect="dark" content="请根据电脑配置合理设置上新线程数，最大为5" :min="1" :max="5" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
            <div style="margin-left: 25px;">
              <el-checkbox v-model="basicConfig.numberCeilingChecked" size="mini" :disabled="isBanPerform">单店店铺上货数量上限
              </el-checkbox>
              <el-input size="mini" style="width: 60px;margin: 0 5px;" v-model="basicConfig.numberCeiling"></el-input>
            </div>
          </div>
          <div class="basisInstall-box">
            <el-checkbox v-model="basicConfig.usedChecked" size="mini" :disabled="isBanPerform">是否二手商品</el-checkbox>
            <div style="margin-left: 15px;">
              <el-checkbox v-model="basicConfig.deleteCollectChecked" size="mini" :disabled="isBanPerform">上新后删除收藏商品
              </el-checkbox>
              <el-tooltip class="item" effect="dark" content="删除商品库中的原商品（不适用于一商品多店铺模式）" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div style="margin-left: 15px;">
              <el-checkbox v-model="basicConfig.autoCompleteChecked" size="mini" :disabled="isBanPerform">自动补齐9张轮播主图
              </el-checkbox>
            </div>
          </div>
        </div>
        <div class="basisInstall">
          <div class="basisInstall-title">防关联设置</div>
          <div class="basisInstall-box">
            <div class="keepRight">商品标题：</div>
            <el-checkbox v-model="associatedConfig.specialCharChecked" size="mini" :disabled="isBanPerform">随机加入特殊字符
            </el-checkbox>
            <el-checkbox v-model="associatedConfig.realNameChecked" size="mini" :disabled="isBanPerform">开头加上店铺真实名
            </el-checkbox>
          </div>
          <div class="basisInstall-box">
            <div class="keepRight">上新时间间隔：</div>
            <el-input size="mini" v-model="associatedConfig.onNewInterval"
                      style="width: 120px;margin-right: 5px;"></el-input>
            S
            <el-tooltip class="item" effect="dark" content="默认印尼站点上新时间间隔为50S，其他站点为40S" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
          <div class="basisInstall-box">
            <div class="keepRight">重复上新维度：</div>
            <el-radio v-model="associatedConfig.dimensionRadio" :label="0" :disabled="isBanPerform">站点</el-radio>
            <el-radio v-model="associatedConfig.dimensionRadio" :label="1" :disabled="isBanPerform">店铺</el-radio>
            <el-radio v-model="associatedConfig.dimensionRadio" :label="2" :disabled="isBanPerform"
                      style="margin-right: 0">一商品多店铺
            </el-radio>
            <el-tooltip class="item" effect="dark" content="同一商品上新到不同店铺中，为避免重复铺货，请配合热搜词使用" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>

          </div>
          <div class="basisInstall-box" v-if="associatedConfig.dimensionRadio === 2">
            <div class="keepRight">商品价格幅度：</div>
            一商品多店铺上新价格幅度±
            <el-input size="mini" v-model="associatedConfig.priceRange" style="width: 60px;margin:0 5px;"
                      @change="changeStockUpNumber(associatedConfig.priceRange,3)"></el-input>
            %
            <el-tooltip class="item" effect="dark" content="避免同一商品在多个店铺中价格相同，最大幅度10%，不设置请填入0" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
          <div class="basisInstall-box" style="flex-wrap: nowrap">
            <div class="keepRight">图片设置：</div>
            <div style="display: flex;flex-wrap: wrap;align-items: center;flex: 1;">
              <div style="width: 100%;">
                <el-checkbox v-model="associatedConfig.pictureSetting.mainRandomChecked" size="mini"
                             v-if="associatedConfig.dimensionRadio === 2" :disabled="isBanPerform">随机主图
                </el-checkbox>
                <el-checkbox v-model="associatedConfig.pictureSetting.firstChecked" size="mini"
                             :disabled="isBanPerform">删除首图
                </el-checkbox>
                <el-checkbox v-model="associatedConfig.pictureSetting.cutChecked" size="mini" :disabled="isBanPerform">
                  图片删减
                </el-checkbox>
              </div>
              <div style="width: 100%;">
                <el-checkbox v-model="associatedConfig.pictureSetting.randomChecked" size="mini"
                             :disabled="isBanPerform">图片顺序随机
                </el-checkbox>
                <el-checkbox v-model="associatedConfig.pictureSetting.whiteChecked" size="mini"
                             :disabled="isBanPerform">首图白底
                </el-checkbox>
              </div>
              <div style="width: 100%;">
                将
                <el-input style="width: 60px;margin: 0 5px;" size="mini"
                          v-model="associatedConfig.pictureSetting.index"></el-input>
                张设为封面
              </div>
              <el-checkbox v-model="associatedConfig.pictureSetting.compressionChecked" size="mini">自动压缩图片</el-checkbox>
              <el-tooltip class="item" effect="dark" content="商品图片超过1MB时，将压缩图片" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
          </div>
          <div class="basisInstall-box">
            <div class="keepRight">图片缺失上传：</div>
            <el-checkbox v-model="associatedConfig.missingUploadChecked" size="mini" :disabled="isBanPerform">
              是否允许图片缺失上传
            </el-checkbox>
          </div>
          <div class="basisInstall-box">
            <div class="keepRight">关键词过滤：</div>
            <div>
              <el-select v-model="associatedConfig.keyFilter" size="mini" style="width: 120px;">
                <el-option
                    v-for="item in keyFilterList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <el-tooltip class="item" effect="dark" content="每个关键词之间以逗号隔开，不进行翻译" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="separation">
              <el-input type="textarea" :rows="3" resize="none" style="width: 80%" placeholder="请输入关键词,以逗号隔开"
                        v-model="associatedConfig.keyList"></el-input>
            </div>
          </div>
        </div>
        <div class="basisInstall">
          <div class="basisInstall-title">数据统计</div>
          <div class="basisInstall-box loose">
            <div>商品总数：</div>
            <span style="margin-left: 5px">{{ statistics.count }}</span>
          </div>
          <div class="basisInstall-box loose">
            <div>成功总数：</div>
            <span style="margin-left: 5px">{{ statistics.success }}</span>
          </div>
          <div class="basisInstall-box loose">
            <div>失败总数：</div>
            <span style="margin-left: 5px">{{ statistics.failure }}</span>
          </div>
          <div class="basisInstall-box loose">
            <div>重复总数：</div>
            <span style="margin-left: 5px">{{ statistics.repeat }}</span>
          </div>
          <div class="basisInstall-box loose">
            <div>过滤总数：</div>
            <span style="margin-left: 5px">{{ statistics.filter }}</span>
          </div>
        </div>
      </div>
      <div class="nowrapBox">
        <el-button size="mini" type="primary" @click="startRelease" :disabled="isBanPerform">开始发布</el-button>
        <el-button size="mini" type="primary" :disabled="isBanPerform">导入数据</el-button>
        <el-button size="mini" @click="cancelRelease">取消发布</el-button>
        <el-button size="mini" type="primary" :disabled="isBanPerform">清理全部</el-button>
        <el-button size="mini" type="primary" :disabled="isBanPerform">设置定时任务</el-button>
        <el-button size="mini" type="primary" @click="enterCategory(2,1)" :disabled="isBanPerform">批量映射虾皮类目
        </el-button>
        <el-button size="mini" :type="isNoFoldShow && 'primary' || ''" @click="isNoFoldShow = !isNoFoldShow">
          {{ isNoFoldShow && '折叠' || '展开' }}
        </el-button>
        <el-button size="mini" type="primary">清理类目缓存</el-button>
        <div style="margin-left: 10px;">源商品类目：
          <el-select size="mini" v-model="sourceCategory" style="width: 120px;">
            <el-option v-for="(item,index) in sourceCategoryList"
                       :key="index"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div style="margin-left: 10px;">发布结果过滤：
          <el-select size="mini" v-model="resultsFilter" style="width: 120px;">
            <el-option v-for="(item,index) in resultsFilterList"
                       :key="index"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button size="mini" type="primary" style="margin-left: 10px;">查询</el-button>
        <el-button size="mini" type="primary">删除</el-button>
        <div style="margin-left: 10px;display: flex;align-items: center">
          <span>上新进度：</span>
          <el-progress style="width: 180px" :text-inside="true" :stroke-width="18"
                       :percentage="mewOnProgress"></el-progress>
        </div>
      </div>
    </el-row>
    <u-table :data="goodsTable"
             @selection-change="handleSelectionChange"
             use-virtual :data-changes-scroll-top="false"
             :header-cell-style="{backgroundColor: '#f5f7fa',}"
             row-key="id" :border="false" :big-data-checkbox="true"
             :height="isNoFoldShow && 320 || 729">
      <u-table-column align="left" type="selection" width="50"/>
      <u-table-column align="left" type="index" label="序列号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </u-table-column>
      <u-table-column align="center" label="商品主图" width="80">
        <template slot-scope="{ row }">
          <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false"
                      style="width: 56px; height: 56px; display: inline-block">
            <div slot="content">
              <el-image :src=" row.image " style="width: 400px; height: 400px"/>
            </div>
            <el-image :src="{url:row.image,source:row.source} | changeImgSizeFilter" style="width: 56px; height: 56px"/>
          </el-tooltip>
        </template>
      </u-table-column>
      <u-table-column align="center" label="上家商品Id" width="110">
        <template v-slot="{ row }">
          <p class="goToGoods" @click.stop="goToGoods(row)">{{ row.goods_id }}</p>
        </template>
      </u-table-column>
      <u-table-column align="left" label="shopee-Id" width="120">
        <template slot-scope="{ row }">
        </template>
      </u-table-column>
      <u-table-column align="left" label="标题" min-width="120">
        <template slot-scope="{ row }">
          <div class="goodsTableLine">
            {{ row.title }}
          </div>
        </template>
      </u-table-column>
      <u-table-column align="left" label="店铺" width="120">
        <template slot-scope="{ row }">{{ row.mallName || '' }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="状态" min-width="80">
        <template slot-scope="{ row }">
          <div class="goodsTableLine">
            {{ row.statusName }}
          </div>
        </template>
      </u-table-column>
      <u-table-column align="center" label="源平台类目" prop="category_name" show-overflow-tooltip/>
      <u-table-column align="left" :show-overflow-tooltip="true" label="shopee类目" prop="categoryName" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="enterCategory(0,scope.row)">
            {{ scope.row.categoryName || '请选择类目' }}
          </el-button>
        </template>
      </u-table-column>
      <u-table-column align="left" label="价格" prop="price" width="80"/>
      <u-table-column align="left" label="上新价格(RMB)" prop="CalAfterPriceRMB" width="110">
        <template slot-scope="{ row }">
          {{ getValuationPrice(row.price, row) }}
        </template>
      </u-table-column>
      <u-table-column align="left" :label="`上新价格(${$filters.siteCoin(country)})`" prop="CalAfterPrice" width="100">
        <template slot-scope="{ row }">
          {{ Math.ceil(getValuationPrice(row.price, row) / rateList[country]) }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="销量" prop="sales" width="80"/>
      <u-table-column align="left" label="标签" prop="sys_label_name" width="80" show-overflow-tooltip/>
      <u-table-column align="left" label="来源" prop="sourceName" width="80"/>
    </u-table>

    <div class="on_new_dialog">
      <el-dialog title="水印配置" width="500px" :close-on-click-modal="false"
                 top="10vh" :visible.sync="watermarkVisible">
        <div class="watermark_dialog">
          <div class="on_new_dialog_box">
            <div class="keepRight">水印类型：</div>
            <div>
              <el-radio v-model="watermarkConfig.type" :label="1">文字水印</el-radio>
              <el-radio v-model="watermarkConfig.type" :label="2">图片水印</el-radio>
              <el-radio v-model="watermarkConfig.type" :label="3">商品背景图</el-radio>
            </div>
          </div>
          <div class="on_new_dialog_box">
            <div class="keepRight">图片类型配置：</div>
            <div>
              <el-radio v-model="watermarkConfig.addType" :label="0">首图</el-radio>
              <el-radio v-model="watermarkConfig.addType" :label="1">全部</el-radio>
            </div>
          </div>
          <div v-show="watermarkConfig.type === 1" class="on_new_dialog_box">
            <div class="keepRight">水印文字：</div>
            <div>
              <el-radio v-model="watermarkConfig.textType" :label="1" style="margin: 0">店铺别名</el-radio>
              <el-tooltip class="item" effect="dark" content="选择店铺别名时，若无别名则使用店铺真实名" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question"
                                                      style="padding: 0 2px;margin-right: 15px;"></i></el-button>
              </el-tooltip>
              <el-radio v-model="watermarkConfig.textType" :label="2" style="margin: 0 15px 0 0">店铺真实名</el-radio>
              <el-radio v-model="watermarkConfig.textType" :label="3" style="margin: 0">店铺设置的水印文字</el-radio>
              <el-tooltip class="item" effect="dark" content="选择店铺设置的水印文字时，未设置则默认使用店铺名称" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question"
                                                      style="padding: 0 2px;margin-right: 15px;"></i></el-button>
              </el-tooltip>
            </div>
          </div>
          <div v-show="watermarkConfig.type !== 1" class="on_new_dialog_box">
            <div class="keepRight">示例图选择：</div>
            <div style="display: flex">
              <div
                  style="margin-right: 25px;display: flex; flex-flow: row;justify-content: center;align-items: center;">
                <div style="text-align: justify; text-align-last: justify;display: inline-block;width: 20px">商品图</div>
                <div @click="watermarkPreview1" class="watermarkConfig_img">
                  <el-image v-if="watermarkConfig.goodsImg" :src="watermarkConfig.goodsImg" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </div>
              <div style="display: flex; flex-flow: row;justify-content: center;align-items: center;">
                <div style="text-align: justify; text-align-last: justify;width: 20px">水印图</div>
                <div @click="watermarkPreview2" class="watermarkConfig_img">
                  <el-image v-if="watermarkConfig.watermarkImg" :src="watermarkConfig.watermarkImg" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </div>
              <el-upload v-if="uploadImgAdd" action="#" list-type="picture-card" :drag="true" v-show="false"
                         :show-file-list="false" :limit="1" :auto-upload="false" :on-change="watermarkPreview">
                <el-button ref="uploadImg" size="mini" type="primary">选择图片</el-button>
              </el-upload>
            </div>
          </div>
          <div v-show="watermarkConfig.type === 2" class="on_new_dialog_box">
            <div class="keepRight">图片透明度：</div>
            <el-slider style="width: 65%;" v-model="watermarkConfig.clarity" show-input
                       input-size="mini" :min="0" :max="1" :step="0.1"></el-slider>
          </div>
          <div v-show="watermarkConfig.type !== 3" class="on_new_dialog_box">
            <div style="display: flex; align-items: center">
              <div class="keepRight">水印位置：</div>
              <el-select v-model="watermarkConfig.locate" size="mini" style="width: 100px;">
                <el-option
                    v-for="item in locateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div v-show="watermarkConfig.type === 1" style="display: flex; align-items: center;margin-left: 15px;">
              <div class="keepRight">水印文字大小：</div>
              <el-input style="width: 60px" size="mini" v-model="watermarkConfig.textSize"></el-input>
              <el-color-picker style="margin-left: 5px;" v-model="watermarkConfig.textColor"
                               size="mini"></el-color-picker>
              <el-tooltip class="item" effect="dark" content="水印文字大小最小为12，水印文字颜色默认为灰白色（#D5D4DA）" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question"
                                                      style="padding: 0 2px;margin-right: 15px;"></i></el-button>
              </el-tooltip>
            </div>
            <div v-show="watermarkConfig.type === 2" style="display: flex; align-items: center">
              <div class="keepRight">图片大小：</div>
              <el-select v-model="watermarkConfig.imgSize" size="mini" style="width: 140px;">
                <el-option
                    v-for="item in imgSizeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="on_new_dialog_box" style="justify-content: center;margin-top: 5px;">
            <div class="watermark_palette">
              <div class="goods_image">
                <img :src="watermarkConfig.goodsImg || ''" alt="">
              </div>
              <div class="watermark_image"
                   :class="watermarkConfig.type < 3 && locateClass || 'watermark_image_background'">
                <span v-show="watermarkConfig.type === 1"
                      :style="'font-size:'+watermarkConfig.textSize+'px!important;color:'+watermarkConfig.textColor">
                  {{ watermarkConfig.text }}
                </span>
                <img :style="watermarkConfig.type === 2 && ('opacity: '+watermarkConfig.clarity) || ''"
                     v-show="watermarkConfig.type !== 1" :src="watermarkConfig.watermarkImg||''" alt="">
              </div>

            </div>
          </div>
          <div style="display:flex;justify-content: space-evenly">
            <el-button size="mini" type="primary" @click="setWatermark()">提交</el-button>
            <el-button size="mini" @click="watermarkVisible = false">退出</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="行销活动设置" width="700px" :close-on-click-modal="false"
                 top="10vh" :visible.sync="sellActiveVisible">
        <div class="sell_active_dialog">
          <div class="on_new_dialog_box">
            添加活动商品，请配置折扣活动信息或商店分类信息
          </div>
          <div class="on_new_dialog_box">
            <el-button size="mini" @click="" type="primary">下载模板</el-button>
            <el-button size="mini" @click="">导入模板</el-button>
          </div>
          <div class="on_new_dialog_box">
            <u-table :data="sellActiveTable" tooltip-effect="dark" height="450">
              <u-table-column label="店铺名称" align="left" :show-overflow-tooltip="true" min-width="120px">
                <template slot-scope="{row}">
                  {{ row.mall_alias_name || row.platform_mall_name }}
                </template>
              </u-table-column>
              <u-table-column label="活动折扣配置" align="left" width="350px">
                <template slot-scope="scope">
                  <div style="display: flex;align-items: center">
                    <el-checkbox v-model="scope.row.isExisting" size="mini">使用已有活动ID</el-checkbox>
                    <el-input size="mini" v-model="scope.row.discountId" style="width: 120px;margin: 0 5px"></el-input>
                    <el-button size="mini" type="primary" @click="setSellActive(scope.row)">{{
                        scope.row.isExisting &&
                        '配置折扣' || '创建活动'
                      }}
                    </el-button>
                  </div>
                </template>
              </u-table-column>
              <u-table-column align="left" width="130px">
                <template slot="header" slot-scope="scope">
                  商品分类ID
                  <el-tooltip class="item" effect="dark" content="分类ID请至【商品管理】 - 【商店分类】中查看" placement="top-end">
                    <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i>
                    </el-button>
                  </el-tooltip>
                </template>
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.goodsId" style="width: 120px;"></el-input>
                </template>
              </u-table-column>
            </u-table>
          </div>
          <div class="on_new_dialog_box" style="justify-content: space-evenly">
            <el-button size="mini" type="primary" @click="updateSellActive(1)">确定</el-button>
            <el-button size="mini" @click="sellActiveVisible = false">取消</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog :title="sellActiveCurrent.isExisting && '配置折扣' || '创建活动'" width="350px"
                 top="25vh" :visible.sync="setSellActiveVisible" :close-on-click-modal="false">
        <div class="sell_active_dialog">
          <div v-show="!sellActiveCurrent.isExisting" class="on_new_dialog_box">
            <div class="keepRight">活动名称：</div>
            <el-input size="mini" v-model="sellActiveCurrent.name" style="width: 180px"></el-input>
          </div>
          <div v-show="!sellActiveCurrent.isExisting" class="on_new_dialog_box">
            <div class="keepRight">活动开始时间：</div>
            <el-date-picker
                v-model="sellActiveCurrent.startTime"
                type="datetime"
                size="mini"
                style="width: 180px"
                placeholder="选择开始时间">
            </el-date-picker>
          </div>
          <div v-show="!sellActiveCurrent.isExisting" class="on_new_dialog_box">
            <div class="keepRight">活动结束时间：</div>
            <el-date-picker
                v-model="sellActiveCurrent.endTime"
                type="datetime"
                size="mini"
                style="width: 180px"
                placeholder="选择结束时间">
            </el-date-picker>
          </div>
          <div class="on_new_dialog_box">
            <div class="keepRight">活动折扣：</div>
            <el-input size="mini" style="width: 180px;margin-right: 5px;"
                      v-model="sellActiveCurrent.discount"></el-input>
            %
            <el-tooltip class="item" effect="dark" content="折扣价格 = 商品原价 * 折扣%，如原价1000的商品，输入80折扣的折扣价格为800"
                        placement="top-end">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
          <div class="on_new_dialog_box">
            <div class="keepRight">限购数量：</div>
            <el-input size="mini" style="width: 180px" v-model="sellActiveCurrent.number"></el-input>
          </div>
          <div class="on_new_dialog_box" style="justify-content: space-evenly">
            <el-button size="mini" type="primary" @click="updateSellActive()">确定</el-button>
            <el-button size="mini" @click="setSellActiveVisible = false">取消</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="商品标签" width="300px" top="25vh" :close-on-click-modal="false" :visible.sync="goodsTagVisible">
        <goodsLabel v-if="goodsTagVisible" :goods-table-select="goodsTableSelect" @goodsTagChange="goodsTagChange"/>
      </el-dialog>
      <el-dialog title="类目映射" width="700px" top="25vh" :close-on-click-modal="false" :visible.sync="categoryVisible">
        <categoryMapping v-if="categoryVisible" :country="country" :goods-current="goodsCurrent" :mall-list="mallList"
                         @categoryChange="categoryChange"/>
      </el-dialog>
      <el-dialog title="计价助手" width="900px" top="15vh" :close-on-click-modal="false" :visible.sync="valuationVisible">
        <div class="basisInstall" style="width: 100%">
          <div class="basisInstall-title">配置区<span style="color: red">(必填)</span></div>
          <div class="basisInstall-box" style="flex-wrap: nowrap;">
            <div>标签：</div>
            <el-select value="" size="mini" v-model="valuationLabel">
              <el-option :value="item.id" v-for="(item,index) in valuationLabelList" :key="index" :label="item.label"/>
            </el-select>
            <el-tooltip class="item" effect="dark" content="可设置常用的标签，保存区域运费比例数据" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
          <div class="basisInstall-box" style="flex-wrap: nowrap">
            <div class="basisInstall-box-item">
              <div class="item-name">运送方式：</div>
              <el-select value="" size="mini" v-model="valuationConfig.shippingMethod">
                <el-option v-for="(item,index) in shippingMethodList" :key="index" :label="item.label"
                           :value="item.value"/>
              </el-select>
              <el-tooltip class="item" effect="dark" content="小件计重商品一般选择空运方式；大件商品视您实际情况选择陆运或海运方式" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">货物类型：</div>
              <el-select value="" size="mini" v-model="valuationConfig.goodsType">
                <el-option value="" v-for="(item,index) in goodsTypeList" :key="index" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">交易手续费(%)：</div>
              <el-input size="mini" v-model="valuationConfig.transactionCommission"></el-input>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">仓库服务费(%)：</div>
              <el-input size="mini" v-model="valuationConfig.warehouseServiceCharge"></el-input>
            </div>
          </div>
          <div class="basisInstall-box" style="flex-wrap: nowrap;margin: 10px 0">
            <div class="basisInstall-box-item">
              <div class="item-name">折扣率(%)：</div>
              <el-input size="mini" v-model="valuationConfig.discount"></el-input>
              <el-tooltip class="item" effect="dark" content="折扣率：折扣需在行销活动中自行设置商品折扣" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">毛利率(%)：</div>
              <el-input size="mini" v-model="valuationConfig.grossProfitMargin"></el-input>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">提现手续费(%)：</div>
              <el-input size="mini" v-model="valuationConfig.withdrawalCharge"></el-input>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">清关费：</div>
              <el-input size="mini" v-model="valuationConfig.customsClearanceFee"></el-input>
            </div>
          </div>
          <div class="basisInstall-box" style="flex-wrap: nowrap">
            <div class="basisInstall-box-item" style="padding-right: 18px">
              <div class="item-name">其他杂费：</div>
              <el-input size="mini" v-model="valuationConfig.other"></el-input>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">泡重计算比：</div>
              <el-input @input="$set(calculateReference,'bubbleHeavyNum', valuationConfig.bubbleHeavy)"
                        size="mini" v-model="valuationConfig.bubbleHeavy"></el-input>
              <el-tooltip class="item" effect="dark" content="泡重计算比：泡重计算公式为：长*宽*高/泡重计算比，请填写相应货代的计算比" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
              <el-button size="mini" @click="freightVisible =true" type="primary" plain>运费设置</el-button>
            </div>
            <div class="basisInstall-box-item">
              <span style="display: inline-block;width: 100px;"></span>
            </div>
          </div>
        </div>
        <div class="basisInstall" style="width: 100%">
          <div class="basisInstall-title">计算参考</div>
          <div class="basisInstall-box" style="flex-wrap: nowrap;margin-bottom: 10px">
            <div class="basisInstall-box-item">
              <div class="item-name">长(CM)：</div>
              <el-input size="mini" v-model="calculateReference.long"></el-input>
              <el-tooltip class="item" effect="dark" content="填写此项仅为计算价格时使用，以选品时设置的体积为准" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">宽(CM)：</div>
              <el-input size="mini" v-model="calculateReference.width"></el-input>
              <el-tooltip class="item" effect="dark" content="填写此项仅为计算价格时使用，以选品时设置的体积为准" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">高(CM)：</div>
              <el-input size="mini" v-model="calculateReference.height"></el-input>
              <el-tooltip class="item" effect="dark" content="填写此项仅为计算价格时使用，以选品时设置的体积为准" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
            </div>
          </div>
          <div class="basisInstall-box" style="flex-wrap: nowrap;">
            <div class="basisInstall-box-item">
              <div class="item-name">成本(RMB)：</div>
              <el-input size="mini" v-model="calculateReference.costing"></el-input>
              <el-tooltip class="item" effect="dark" content="填写此项仅为计算价格时使用，以选品时设置的体积为准" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">重量(g)：</div>
              <el-input size="mini" v-model="calculateReference.weight"></el-input>
              <el-tooltip class="item" effect="dark" content="填写此项仅为计算价格时使用，以选品时设置的体积为准" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">泡重(g)：</div>
              <el-input style="pointer-events: none" size="mini" v-model="calculateReference.bubbleHeavy"></el-input>
              <el-tooltip class="item" effect="dark" content="填写此项仅为计算价格时使用，以选品时设置的体积为准" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: center;">
          <el-button size="mini" type="primary" style="margin: 0 25px;" @click="saveCalculate">确认</el-button>
          <el-button size="mini" type="primary" style="margin: 0 25px;" @click="saveCalculateLabel">保存标签</el-button>
          <el-button size="mini" type="primary" style="margin: 0 25px;" @click="referenceCalculate">计算价格</el-button>
        </div>
        <div class="basisInstall" style="width: 100%">
          <div class="basisInstall-title">计算参考</div>
          <div class="basisInstall-box" style="flex-wrap: nowrap;">
            <div class="basisInstall-box-item">
              <div class="item-name">上新价({{ RMBShow && 'RMB' || $filters.siteCoin(country) }})：</div>
              <div class="item-input">
                {{
                  RMBShow && calculateResults.results || Math.ceil(calculateResults.results / rateList[this.country])
                }}
              </div>
              <el-tooltip class="item" effect="dark" content="标价=折后价/折扣率" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">折后价({{ RMBShow && 'RMB' || $filters.siteCoin(country) }})：</div>
              <div class="item-input">
                {{
                  RMBShow && calculateResults.discount || Math.ceil(calculateResults.discount / rateList[this.country])
                }}
              </div>
              <el-tooltip class="item" effect="dark" content="折后价=成本+运费+手续费+佣金+仓库服务费+利润+交店费/清关费+其它杂费" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
            </div>
            <div class="basisInstall-box-item">
            </div>
          </div>
          <div class="basisInstall-box" style="flex-wrap: nowrap;margin: 10px 0;">
            <div class="basisInstall-box-item">
              <div class="item-name">运费({{ RMBShow && 'RMB' || $filters.siteCoin(country) }})：</div>
              <div class="item-input">
                {{
                  RMBShow && calculateResults.freight || Math.ceil(calculateResults.freight / rateList[this.country])
                }}
              </div>
              <el-tooltip class="item" effect="dark" content="运费=计费重*计费单价+仓库服务费+交店费/清关费" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
              <div class="item-name">利润({{ RMBShow && 'RMB' || $filters.siteCoin(country) }})：</div>
              <div class="item-input">
                {{
                  RMBShow && calculateResults.profits || Math.ceil(calculateResults.profits / rateList[this.country])
                }}
              </div>
              <el-tooltip class="item" effect="dark" content="利润=折后价*毛利率" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div class="basisInstall-box-item">
            </div>
            <div class="basisInstall-box-item">
            </div>
          </div>
          <div class="basisInstall-box" style="flex-wrap: nowrap;">
            <div class="basisInstall-box-item">
              <div class="item-name">当前汇率：</div>
              <el-input disabled style="pointer-events: none" size="mini" v-model="rateList[this.country]"></el-input>
            </div>
            <div class="basisInstall-box-item">
              <el-button type="primary" size="mini" @click="RMBShow = !RMBShow">币种转换</el-button>
            </div>
            <div class="basisInstall-box-item">
            </div>
            <div class="basisInstall-box-item">
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="运费详情" width="540px" top="14vh" :close-on-click-modal="false" :visible.sync="freightVisible">
        <div class="basisInstall" style="width: 100%">
          <div class="basisInstall-box" style="flex-wrap: nowrap;padding:0 10px;">
            <div class="basisInstall-box-item">
              运输方式
            </div>
            <div class="basisInstall-box-item">
              重量(g)
            </div>
            <div class="basisInstall-box-item">
              价格(RMB)
            </div>
          </div>
          <div v-for="(sItem,index) in shippingMethodList" :key="index">
            <div class="basisInstall-box" v-for="(gItem,index) in goodsTypeList" :key="index"
                 style="padding: 10px;margin: 0; color: #000"
                 :style="'background:'+(index == 1 && '#F6ECCB' || index == 2 && '#FE4148')">
              <div class="basisInstall-box-item">
                {{ sItem.label + '-' + gItem.label }}
              </div>
              <div class="basisInstall-box-item">
                每100g
              </div>
              <div class="basisInstall-box-item">
                <el-input size="mini" v-model="freightList[sItem.value + '-' +gItem.value]"></el-input>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </el-row>
</template>

<script>
import storeChoose from '../../../components/store-choose'
import categoryMapping from '../../../components/category-mapping'
import goodsLabel from '../../../components/goods-label'
import {
  getGoodsUrl,
  batchOperation,
  terminateThread,
  getSectionRandom,
  imageCompressionUpload,
  randomWord
} from '@/util/util'
import GUID from '@/util/guid'
import MallListAPI from '@/module-api/mall-manager-api/mall-list-api'

export default {
  data() {
    return {
      mallListAPIInstance: new MallListAPI(this),
      goodsTable: [], // 商品列表
      goodsTableSelect: [], // 商品列表所选
      goodsCurrent: '',
      mallList: [], // 店铺列表
      country: '',  // 店铺站点
      sourceCategoryList: [], //源商品类目
      sourceCategory: [],
      resultsFilterList: [], //结果过滤
      resultsFilter: '',
      mewOnProgress: 0,
      isNoFoldShow: true,
      //弹窗
      categoryVisible: false, //类目弹窗
      attributesList: [],
      attributesCurrent: [],

      goodsTagVisible: false, //标签弹窗
      goodsTagAction: '',
      goodsTagCurrent: '',

      sellActiveVisible: false, //活动弹窗
      setSellActiveVisible: false,
      sellActiveTable: [],
      sellActiveSetting: [],
      sellActiveCurrent: {},

      watermarkVisible: false,//水印弹窗
      watermarkConfig: {
        type: 1, //水印类型 1/2/3
        addType: 1,  // 添加类型 0
        textType: 1, // 文字类型 1
        textSize: '30',  //文字大小 1
        textColor: '#D5D4DA',// 文字颜色 1
        locate: 1, //添加位置 1， 2
        clarity: 0.3,  // 透明度 2
        imgSize: 1,  // 缩放方式 2
        goodsImg: '', // 商品图 2 3
        watermarkImg: '',  //水印图 2 3
        text: '水印'
      },
      watermarkSetting: {},
      locateList: [
        {
          label: '左上角',
          value: 1
        }, {
          label: '左下角',
          value: 2
        }, {
          label: '右上角',
          value: 3
        }, {
          label: '右下角',
          value: 4
        }, {
          label: '中间',
          value: 5
        }],
      imgSizeList: [
        {
          label: '按比例缩放',
          value: 1
        },
        {
          label: '与商品图宽一致',
          value: 2
        },
        {
          label: '与商品图高一致',
          value: 3
        }],
      locateClass: 'watermark_image_left watermark_image_top',
      logistics: [],  //所选物流
      logisticsList: [], // 物流列表
      customLogistics: [], //自定义物流列表
      //店铺设置
      storeConfig: {
        watermarkChecked: false, // 水印配置
        priceRadio: 1, // sku价格单选
        activityChecked: false, // 商品设置
        chineseChecked: [], //中文配置
        pictureThread: '3', //线程数量
        dangerousRadio: 0, //危险物品
        wordsHeavy: false //单词去重
      },
      //基础配置
      basicConfig: {
        valuationRadio: 1, //计价方式
        formula: {
          percentage: '50',
          basis: '5',
          hidden: '5'
        }, //加价方式 1
        discount: '100', //折扣 1
        valuationMethodsRadio: 0, //算价方式 1 ，2
        fixedPrice: '150',  //商品价格 3
        headlineRadio: 0, //热搜词标题位置
        hotSearch: '1', //热搜词数
        hotList: '', //热搜词列表
        embargoChecked1: true, //启动禁运类目拦截
        embargoChecked2: true, //启动禁运词拦截
        minHeavy: '0.1', //最小重量
        maxHeavy: '1', //最大重量
        categoryMapping: 1, //类目映射
        sourceCategoryChecked: false, //源类目映射
        stockUpChecked: true, //备货配置
        stockUpNumber: '15', //备货数量
        onNewThread: '5', //线程数量
        numberCeilingChecked: false, //上货上限配置
        numberCeiling: '1000', //上货上限
        usedChecked: false, //二手商品
        deleteCollectChecked: false, //删除收藏
        autoCompleteChecked: false //自动补齐轮播主图
      },
      valuationVisible: false,
      valuationLabel: '',
      valuationConfig: {
        shippingMethod: 'sea',
        goodsType: 'general',
        transactionCommission: '2',
        warehouseServiceCharge: '3',
        discount: '',
        grossProfitMargin: '20',
        withdrawalCharge: '3',
        customsClearanceFee: '4.5',
        other: '',
        bubbleHeavy: ''
      },  //计价配置 2
      valuationSetting: {},
      valuationLabelList: [],
      shippingMethodList: [{ label: '海运', value: 'sea' }, { label: '陆运', value: 'land' }, {
        label: '空运',
        value: 'air'
      }],
      goodsTypeList: [{ label: '普货', value: 'general' }, { label: '敏感货', value: 'sensitive' }, {
        label: '特货',
        value: 'special'
      }],
      calculateReference: {
        long: '',
        width: '',
        height: '',
        weight: '10',
        costing: '',
        bubbleHeavy: '',
        bubbleHeavyNum: ''
      },
      calculateResults: {
        results: '',
        discount: '',
        freight: '',
        profits: ''
      },
      freightVisible: false,
      freightList: {
        'sea-general': '1.8',
        'sea-sensitive': '1.8',
        'sea-special': '1.8',
        'land-general': '1.8',
        'land-sensitive': '1.8',
        'land-special': '1.8',
        'air-general': '1.8',
        'air-sensitive': '1.8',
        'air-special': '1.8'
      },
      exchangeRate: '',
      categoryMappingList: [
        {
          label: '个人类目映射',
          value: 1
        }, {
          label: '共有类目映射',
          value: 2
        }], //类目映射列表
      //防关联设置
      associatedConfig: {
        specialCharChecked: true, //特殊字符
        realNameChecked: false, //真实店铺名
        onNewInterval: '40', //上新时间间隔
        dimensionRadio: 0,//上新唯独
        pictureSetting: {
          mainRandomChecked: true,
          firstChecked: true,
          cutChecked: true,
          randomChecked: true,
          whiteChecked: false,
          index: '1',
          compressionChecked: true
        }, //图片设置
        missingUploadChecked: false, //图片缺失上传
        keyFilter: 0, //关键词过滤 0全部 1标题 2描述 3SKU
        keyList: '',
        priceRange: '0'
      },
      keyFilterList: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '标题',
          value: 1
        },
        {
          label: '描述',
          value: 2
        },
        {
          label: 'SKU',
          value: 3
        }
      ], //图片缺失上传

      //数据统计
      statistics: {
        count: 0,
        success: 0,
        failure: 0,
        repeat: 0,
        filter: 0
      },
      sourceObj: null,
      source: null,

      //额外
      labelList: [],
      isBanPerform: false, //禁止按钮

      //rateList
      RMBShow: true,
      rateList: {},
      titleInterval: {
        'TH': {
          min: 20,
          max: 120
        },
        'VN': {
          min: 10,
          max: 120
        },
        'MY': {
          min: 20,
          max: 120
        },
        'SG': {
          min: 10,
          max: 120
        },
        'TW': {
          min: 5,
          max: 60
        },
        'PH': {
          min: 20,
          max: 100
        },
        'ID': {
          min: 5,
          max: 100
        },
        'BR': {
          min: 1,
          max: 120
        }
      },
      descriptionInterval: {
        'TH': {
          min: 25,
          max: 3000
        },
        'VN': {
          min: 100,
          max: 3000
        },
        'MY': {
          min: 20,
          max: 3000
        },
        'SG': {
          min: 20,
          max: 3000
        },
        'TW': {
          min: 5,
          max: 3000
        },
        'PH': {
          min: 100,
          max: 3000
        },
        'ID': {
          min: 20,
          max: 3000
        },
        'BR': {
          min: 1,
          max: 3000
        }
      },
      uploadImgAdd: false,
      watermarkPreviewType: 1
    }
  },
  computed: {},
  components: { storeChoose, categoryMapping, goodsLabel },
  watch: {
    country(value) {
      this.associatedConfig.onNewInterval = value !== 'ID' && '40' || '50'
      this.sellActiveSetting = []
      this.changeLogistics()
    },
    watermarkConfig: {
      handler(val) {
        if (val.type < 3) {
          let locateClass = val.locate % 2 && 'watermark_image_top ' || 'watermark_image_bottom '
          locateClass += val.locate > 2 && 'watermark_image_right ' || 'watermark_image_left '
          locateClass = val.locate < 5 && locateClass || 'watermark_image_center '
          if (val.type === 2) {
            locateClass += val.imgSize === 1 && 'watermark_image_reduce ' || 'watermark_image_fixed '
            if (val.imgSize === 2) {

            } else if (val.imgSize === 3) {

            }
            locateClass += val.imgSize === 1 && 'watermark_image_reduce ' || val.imgSize === 2 && 'watermark_image_width ' || 'watermark_image_height '
          }
          this.locateClass = locateClass
        }

      },
      deep: true
    },
    logistics(val) {
      this.customLogistics = []
      val.forEach(item => {
        let temp = this.logisticsList.filter(i => i.ShipId === item)[0]
        if (temp && temp.IsCustomShipFee) {
          this.customLogistics.push(temp)
        }
      })
    },
    goodsTagAction(val) {
      this.goodsTagCurrent = val
    },
    goodsTable: {
      handler(val) {
      },
      deep: true
    },
    calculateReference: {
      handler(data) {
        let long = data.long || 0
        let width = data.width || 0
        let height = data.height || 0
        let bubbleHeavy = data.bubbleHeavyNum || 0
        let bulkWeightFormula = (long * width * height)
        if (bubbleHeavy && bulkWeightFormula) {
          bulkWeightFormula = (bulkWeightFormula / bubbleHeavy * 1000).toFixed(2) * 1
        }
        this.calculateReference.bubbleHeavy = bulkWeightFormula
      },
      deep: true
    },
    valuationLabel(val) {
      try {
        let configRes = this.valuationLabelList.find(i => i.id === val)
        let config = configRes && configRes.config
        let jsonStr = config && config[0] || ''
        if (jsonStr) {
          this.valuationSetting = JSON.parse(jsonStr)
          this.valuationConfig = JSON.parse(jsonStr)
          this.freightList = config[1] && JSON.parse(config[1]) || this.freightList
        } else {
          let temp = {
            shippingMethod: config.TransportType || 'sea',
            goodsType: config.GoodsType || 'general',
            transactionCommission: config.Brokerage || '2', //Brokerage
            warehouseServiceCharge: config.WarehouseFee || '3',  //WarehouseFee
            discount: config.DiscountRate || '', //DiscountRate
            grossProfitMargin: config.GrossMargin || '20', //GrossMargin
            withdrawalCharge: config.HandlingFee || '3',  //HandlingFee
            customsClearanceFee: config.ShopFeeOrClearanceFee || '4.5', // ShopFeeOrClearanceFee
            other: config.OriginPrice || '',  //OriginPrice
            bubbleHeavy: config.BulkRate || '' //BulkRate
          }
          this.valuationSetting = temp
          this.valuationConfig = temp
          if (config.FeeDetailList) {
            for (let key in config.FeeDetailList) {
              let item = config.FeeDetailList[key]
              let name = item.TransportType
              name.replaceAll('海运', 'sea')
              name.replaceAll('陆运', 'land')
              name.replaceAll('空运', 'air')
              name.replaceAll('普货', 'general')
              name.replaceAll('敏感货', 'sensitive')
              name.replaceAll('特货', 'special')
              this.freightList[name] = item.ShipFee
            }
          }
        }
      } catch (e) {

      }
    }
  },
  async mounted() {
    try {
      // this.$IpcMain.on('gotoUpload', async e => { // 点听
      //   let goodsListJSON = await this.$BaseUtilService.getUploadGoodsId()
      //   console.log('goodsListJSON', goodsListJSON)
      //   let goodsList = JSON.parse(goodsListJSON)
      //   for (let item of goodsList) {
      //     let index = this.goodsTable.findIndex(i => i.id === item.id)
      //     index >= 0 && this.$set(this.goodsTable, index, item) || this.goodsTable.push(item)
      //   }
      //   console.log(this.goodsTable)
      //   await this.$BaseUtilService.gotoUploadTab('updateId', '')
      // })
      let info = await this.$appConfig.getUserInfo()
      this.rateList = info.ExchangeRates || {}
      let goodsList = [{
        'category_id': 8483,
        'category_name': '牛仔裤',
        'created_at': '2021-12-31 15:50:11',
        'deleted_at': '0001-01-01T00:00:00Z',
        'description': 'กางเกงยีนส์สีดำสำหรับผู้หญิง 2021 ใหม่ เอวสูง ทรงสลิม ทรงหลวม แฟชั่น กางเกงขายาว ทรงตรง ครอป แบรนด์: Senda\r\nสไตล์: กางเกงทรงตรง\r\nประเภทเอว: เอวสูง\r\nความยาวกางเกง: เก้ากางเกง\r\nสไตล์: เดินทางง่าย/เวอร์ชั่นเกาหลี\r\nองค์ประกอบยอดนิยม: ซิป\r\nผ้า/วัสดุ: เดนิม/ผ้าฝ้าย\r\nเนื้อหาส่วนผสม: 81% (รวม) -90% (รวม)\r\nไม่ว่าจะเพิ่มกำมะหยี่: ไม่มีกำมะหยี่\r\nเวลาออกสู่ตลาด: ฤดูใบไม้ร่วง 2021',
        'goods_id': 292647902010,
        'height': 10,
        'id': 166292339,
        'image': 'https://img.pddpic.com/mms-material-img/2021-09-08/6d3b4996-c4ee-4832-a4e1-530b642957ad.jpeg.a.jpeg',
        'is_badword': '',
        'is_blacklist': '',
        'is_edit_description': 1,
        'is_edit_title': 1,
        'is_featured': '-1',
        'language': 'th',
        'long': 10,
        'pid': 166289836,
        'price': 51.97,
        'sales': 100000,
        'shopee_category': null,
        'short_title': null,
        'size_image_id': 0,
        'source': 1,
        'spec1': 'Variation',
        'spec2': 'Size',
        'stock': 2100,
        'synchronized_at': '0001-01-01T00:00:00Z',
        'title': 'กางเกงยีนส์ผู้หญิงสีดำ 2021 ใหม่เอวสูงบางหลวมอินเทรนด์ตรงยืดกางเกงตัด',
        'uid': 974,
        'updated_at': '2022-01-04 17:57:45',
        'uuid': 0,
        'weight': 1,
        'width': 10,
        'zhTitle': '',
        'extra_info': '{"videoUrl": "[]"}',
        'sys_label_id': '22648',
        'sys_label_name': '123',
        'sourceName': '拼多多'
      }]
      for (let item of goodsList) {
        let index = this.goodsTable.findIndex(i => i.id === item.id)
        index >= 0 && this.$set(this.goodsTable, index, item) || this.goodsTable.push(item)
      }
      this.statistics.count = this.goodsTable.length
      let valuationConfigRes = await this.$api.valuationConfigGetAll()
      this.valuationLabelList = valuationConfigRes && valuationConfigRes.data.data || []
      console.log(this.valuationLabelList)
    } catch (error) {
    }
  },
  methods: {
    async startRelease() {
      if (this.goodsTableSelect.length < 1) {
        this.$message.error('请选择商品后再操作')
        return
      }
      if (this.mallList.length < 1) {
        this.$message.error('请选择店铺后再操作')
        return
      }
      if (this.customLogistics.length > 0) {
        for (let item of this.customLogistics) {
          if (!(item.price * 1)) {
            this.$message.error('运费价格有误，请确认')
            return
          }
        }
      }
      if (this.storeConfig.watermarkChecked && this.watermarkSetting && !this.watermarkSetting.type) {
        this.$message.error('配置水印后再操作')
        return
      }
      this.isBanPerform = true
      await batchOperation(this.mallList, this.prepareWork, this.basicConfig.onNewThread)
      this.isBanPerform = false
    },
    async cancelRelease() {
      terminateThread()
    },
    async prepareWork(mall, count = { count: 1 }) {
      let errorItem = null
      try {
        let mallName = mall.mall_alias_name || mall.platform_mall_name
        let goodsList = []
        let logistics_channels = []
        let loginRes = await this.mallListAPIInstance.getUserInfo(mall)
        let loginSuccess = loginRes.code === 200
        if (loginSuccess) {
          const params = {}
          params['mallId'] = mall.platform_mall_id
          const channelListJSON = await this.$shopeemanService.getChinese(mall.country, '/api/v3/logistics/get_channel_list/?', params)
          const channelListRes = JSON.parse(channelListJSON)
          const channelListData = JSON.parse(channelListRes.data)
          let channelList = channelListData.data && channelListData.data.list || []
          // logistics_channels
          console.log('channelListRes', channelList, this.logistics, this.customLogistics)
          for (let item of channelList) {
            if (item.enabled !== this.logistics.includes(item.channel_id + '') || item.is_mask_channel) {
              let temp = {
                enabled: this.logistics.includes(item.channel_id + ''),
                channelid: item.channel_id,
                sizeid: 0,
                size: 0,
                price: '0.00',
                cover_shipping_fee: false,
                parent_channel_id: 0
              }
              let findItem = this.customLogistics.find(son => son.shopId === (item.channel_id + ''))
              if (findItem) {
                temp['price'] = findItem.price + ''
              }
              logistics_channels.push(temp)
            }
          }
        }
        if (this.associatedConfig.dimensionRadio < 2) {
          let mallCount = this.mallList.length
          let mallIndex = this.mallList.findIndex(son => son.id === mall.id)
          let goodsCount = this.goodsTable.length
          for (let i = 0; mallIndex < goodsCount; i++) {
            mallIndex = mallIndex + mallCount * i
            if (mallIndex < goodsCount) {
              goodsList = [...goodsList, this.goodsTableSelect[mallIndex]]
            }
          }
        } else {
          goodsList = this.goodsTableSelect
        }
        for (let item of goodsList) {
          errorItem = item
          this.updateAttributeName(item, '正在准备发布')
          if (!loginSuccess) {
            this.updateAttributeName(item, `${mallName}店铺未登录发布失败`)
            continue
          }
          let goodsInitParam = {
            attributes: [],
            stock: item.stock,
            model_list: [],
            weight: item.weight + '',
            dimension: {
              width: item.width,
              height: item.height,
              length: item.long
            },
            condition: 1,
            dangerous_goods: 0, //待修改
            min_purchase_limit: 1,
            input_normal_price: null,
            input_promotion_price: null,
            id: 0,
            images: [],
            tier_variation: [],
            category_recommend: [],
            price_before_discount: '',
            wholesale_list: [],
            installment_tenures: {},
            pre_order: this.basicConfig.stockUpChecked,
            days_to_ship: Math.floor(this.basicConfig.stockUpNumber) || 15,
            logistics_channels: logistics_channels.slice(0, 4),
            unlisted: this.basicConfig.usedChecked,
            add_on_deal: []
          }
          let originCategoryId = item.originCategoryId || item.category_id
          let platformId = item.platform || item.source
          // attributes brand_id category_path
          let categoryRelationJson = await this.$commodityService.getCategoryRelation(originCategoryId, this.country, platformId)
          let categoryRelationRes = JSON.parse(categoryRelationJson)
          let categoryId = categoryRelationRes?.data?.category?.platform_category_id || ''
          if (categoryId) {
            goodsInitParam['category_path'] = await this.getCategoryPath(categoryId) || []
            let attributesCurrent = categoryRelationRes.data && categoryRelationRes.data.attributes || []
            let category = categoryRelationRes.data.category
            let categoryName = `${category.platform_category_name}(${category.platform_category_cn_name})`
            let index = this.goodsTable.findIndex(son => son.id === item.id)
            this.$set(this.goodsTable[index], 'categoryName', categoryName)
            attributesCurrent.forEach(son => {
              if (son.attribute_id) {
                goodsInitParam['attributes'].push({
                  attribute_id: son.attribute_id,
                  attribute_value_id: Math.floor(son.value_id)
                })
              } else {
                goodsInitParam['brand_id'] = Math.floor(son.value_id) || 0
              }
            })
          } else {
            this.updateAttributeName(item, '无类目映射，请选择类目')
            return
          }
          let neededTranslateInfoJson = await this.$commodityService.getSpuDetailByIdV2(item.id)
          let neededTranslateInfoData = JSON.parse(neededTranslateInfoJson) && JSON.parse(neededTranslateInfoJson).data
          let goodsParam = JSON.parse(JSON.stringify(goodsInitParam))
          this.updateAttributeName(item, mallName, 'mallName')
          // weight
          if (goodsParam['weight'] === '0') {
            goodsParam['weight'] = getSectionRandom(this.basicConfig.minHeavy, this.basicConfig.maxHeavy, 2) + ''
            neededTranslateInfoData['weight'] = goodsParam['weight']
          }
          // parent_sku ds_cat_rcmd_id ds_attr_rcmd_id
          let extrainfo = item.extra_info && JSON.parse(item.extra_info)
          let tmall_cross_border_user_id = extrainfo && extrainfo.tmall_cross_border_user_id || ''
          goodsParam['parent_sku'] = await this.$BaseUtilService.buildGoodCode(platformId, item.goods_id, this.country, mall.platform_mall_id, tmall_cross_border_user_id)
          let guid = new GUID()
          goodsParam['ds_cat_rcmd_id'] = guid.newGUID() + '|c|EN'
          goodsParam['ds_attr_rcmd_id'] = guid.newGUID() + '|a|EN'
          // name description tier_variation price
          let tier_variation = neededTranslateInfoData.tier_variation
          if (tier_variation[tier_variation.spec1].length > 0) {
            goodsParam['tier_variation'].push({
              name: tier_variation.spec1,
              options: [...tier_variation[tier_variation.spec1].map(i => i.substring(0, 20).trim())],
              images: tier_variation.images
            })
          }
          if (tier_variation[tier_variation.spec2].length > 0) {
            goodsParam['tier_variation'].push({
              name: tier_variation.spec2,
              options: [tier_variation[tier_variation.spec2].map(i => i.substring(0, 20).trim())],
              images: []
            })
          }
          goodsParam['price'] = this.getValuationPrice(neededTranslateInfoData.price, neededTranslateInfoData)
          goodsParam['price'] = Math.ceil(goodsParam['price'] / this.rateList[this.country]) + ''

          goodsParam['description'] = neededTranslateInfoData.description || ''
          let hotList = this.basicConfig.hotList || ''
          hotList = hotList.replaceAll('，', ',')
          hotList = hotList.split(',') || []
          let hotStr = ''
          let name = item.title
          if (this.basicConfig.hotSearch > 0 && hotList[0]) {
            let hotListCount = hotList.length
            for (let i = 0; i < this.basicConfig.hotSearch; i++) {
              let hotIndex = hotList[Math.floor(Math.random() * hotListCount)] || ''
              hotStr += hotList[hotIndex] + ' '
            }
            if (this.basicConfig.headlineRadio) {
              name = name + ' ' + hotStr
            } else {
              name = hotStr + '' + name
            }
          }
          if (this.associatedConfig.specialCharChecked) {
            let specialCharList = this.$filters.special_characters
            let specialChar = specialCharList[Math.floor(Math.random() * specialCharList.length)]
            name = specialChar + ' ' + name
          }
          if (this.associatedConfig.realNameChecked) {
            name = mall.platform_mall_name + ' ' + name
          }
          goodsParam['name'] = name
          let isFieldFilter = await this.fieldFilter(goodsParam)
          if (!isFieldFilter) {
            continue
          }
          if (this.storeConfig.wordsHeavy) {
            let nameList = goodsParam['name'].split(' ')
            let setName = new Set()
            nameList.forEach(i => {
              setName.add(i)
            })
            goodsParam['name'] = [...setName].join('')
          }
          // images size_chart
          let imagesList = neededTranslateInfoData.images
          let imageTemp = await this.additionalWatermarking(imagesList[0], mall)
          console.log(imagesList)
          return
          if (this.associatedConfig.pictureSetting.firstChecked) {
            imagesList.splice(0, 1)
          }
          if (this.associatedConfig.pictureSetting.cutChecked) {
            let maxCount = Math.floor(imagesList.length / 3)
            let count = Math.ceil(Math.random() * maxCount) || 0
            while (count--) {
              let index = Math.floor(Math.random() * imagesList.length)
              imagesList.splice(index, 1)
            }
          }
          if (this.associatedConfig.dimensionRadio === 2) {
            if (this.associatedConfig.pictureSetting.mainRandomChecked) {
              let index = Math.floor(Math.random() * imagesList.length)
              let newMain = imagesList.splice(index, 1)
              imagesList = [...newMain, ...imagesList]
            }
          } else {
            let newMain = imagesList.splice(this.associatedConfig.pictureSetting.index, 1)
            imagesList = [...newMain, ...imagesList]
          }
          goodsParam['images'] = imagesList
          if (neededTranslateInfoData.sizeImages && neededTranslateInfoData.sizeImages[0]) {
            goodsParam['size_chart'] = neededTranslateInfoData.sizeImages[0].img || ''
          }
          // model_list

          let itemmodelsJson = JSON.stringify(neededTranslateInfoData.itemmodels)
          goodsParam['model_list'] = JSON.parse(itemmodelsJson).map(son => {
            let price = this.getValuationPrice(son.price, neededTranslateInfoData)
            price = Math.ceil(price / this.rateList[this.country]) + ''
            son = {
              id: 0,
              name: '',
              is_default: false,
              item_price: '',
              input_normal_price: null,
              input_promotion_price: null,
              tier_index: son.tier_index,
              sku: son.sku,
              stock: son.stock,
              price: price
            }
            return son
          })
          console.log('goodsParam', goodsParam)
          this.updateAttributeName(item, '正在上传轮播图')
          let imageMapping = await imageCompressionUpload(mall, goodsParam['images'], this, this.storeConfig.pictureThread)
          goodsParam['images'] = goodsParam.images.map(son => {
            son = imageMapping[son] || ''
            return son
          })
          if (goodsParam['images'].includes('')) {
            if (!this.associatedConfig.missingUploadChecked) {
              this.updateAttributeName(item, '轮播图上传缺失')
              continue
            }
            let temp = []
            goodsParam['images'].forEach(i => {
              i && temp.push(i)
            })
            goodsParam['images'] = temp
          }
          this.updateAttributeName(item, '正在上传规格图')
          let spec_imageMapping = await imageCompressionUpload(mall, neededTranslateInfoData.spec_image, this, this.storeConfig.pictureThread)
          let tier_variationJSON = JSON.stringify(goodsParam['tier_variation'])
          let spec_list = []
          for (let itemName in spec_imageMapping) {
            tier_variationJSON = tier_variationJSON.replaceAll('"' + itemName + '"', '"' + spec_imageMapping[itemName] + '"')
            spec_list.push(spec_imageMapping[itemName])
          }
          if (spec_list.includes('')) {
            this.updateAttributeName(item, '规格图上传缺失')
            continue
          }
          goodsParam['tier_variation'] = JSON.parse(tier_variationJSON)
          if (goodsParam['size_chart']) {
            this.updateAttributeName(item, '正在上传尺寸图')
            let size_chartMapping = await imageCompressionUpload(mall, [goodsParam['size_chart']], this, this.storeConfig.pictureThread)
            goodsParam['size_chart'] = size_chartMapping[goodsParam['size_chart']] || ''
          }
          if (this.basicConfig.autoCompleteChecked) {
            if (goodsParam['images'].length < 9) {
              let imageList = [...goodsParam['images'], ...spec_list]
              goodsParam['images'] = imageList.slice(0, 9)
            }
          }
          let resJSON = await this.$shopeemanService.createProduct(this.country, { mallId: mall.platform_mall_id }, [goodsParam])
          console.log('createProduct', resJSON)

          this.updateAttributeName(item, '发布完成')
        }
      } catch (e) {
        console.log(e)
        errorItem && this.updateAttributeName(errorItem, '发布失败，数据或请求异常')
      } finally {
        --count.count
      }
    },
    //标题，描述，sku过滤
    fieldFilter(goods) {
      return new Promise(async resolve => {
        try {
          let skuJson = JSON.stringify(goods['tier_variation'])
          let keyFilter = this.associatedConfig.keyFilter
          let titleInterval = this.titleInterval[this.country]
          let descriptionInterval = this.descriptionInterval[this.country]
          goods['name'] = goods['name'].slice(0, titleInterval.max)
          if (goods['name'].length < titleInterval.min) {
            this.updateAttributeName(goods, '商品标题长度过短')
            resolve(false)
          }
          goods['description'] = goods['description'].slice(0, descriptionInterval.max)
          if (goods['description'].length < descriptionInterval.min) {
            this.updateAttributeName(goods, '商品描述长度过短')
            resolve(false)
          }
          let keyListStr = this.associatedConfig.keyList
          let keyList = keyListStr.split(',')
          if (keyList.length > 0) {
            keyList.forEach(i => {
              if (i) {
                let isName = goods['name'].includes(i)
                let isDescription = goods['description'].includes(i)
                let isSKU = skuJson.search('"options":".*(' + i + ').*",')
                let success = false
                if (keyFilter === 0 && (isName || isDescription || isSKU)) {
                  success = true
                } else if (keyFilter === 1 && isName) {
                  success = true
                } else if (keyFilter === 2 && isDescription) {
                  success = true
                } else if (keyFilter === 3 && isSKU) {
                  success = true
                }
                success && this.updateAttributeName(goods, '关键词过滤成功')
                success && resolve(false)
              }
            })
          }
          const wordParams = {
            page: '1',
            perpage: '100',
            word: '',
            country: this.country,
            source: '0',
            type: '1'
          }
          const wordListJSON = await this.$commodityService.getBannedWordList(wordParams)
          const wordListRes = JSON.parse(wordListJSON)
          const wordListData = wordListRes.data && wordListRes.data.data || []
          wordListData.forEach(i => {
            if (i.word) {
              let isName = goods['name'].includes(i.word)
              let isDescription = goods['description'].includes(i.word)
              let isSKU = skuJson.search('"options":".*(' + i.word + ').*",')
              if ((isName || isDescription || isSKU)) {
                this.updateAttributeName(goods, '禁运词过滤成功')
                resolve(false)
              }
            }
          })
          const categoryParams = {
            type: '0',
            country: this.country,
            page: '1',
            perpage: '100',
            parentCategoryTree: []
          }
          const categoryJson = await this.$commodityService.getBlackCategory(categoryParams)
          const categoryRes = JSON.parse(categoryJson)
          const categoryData = categoryRes.data && categoryRes.data.data || []
          let category_path = goods['category_path'].join('-')
          categoryData.forEach(item => {
            if (item && item.parent_category_tree === category_path) {
              this.updateAttributeName(goods, '禁运类目过滤成功')
              resolve(false)
            }
          })
          resolve(true)
        } catch (e) {
          this.updateAttributeName(goods, '网络异常请稍后再试')
          resolve(false)
        }
      })
    },
    //附加水印图
    additionalWatermarking(url, mall) {
      let that = this
      return new Promise(resolve => {
        let setting = this.watermarkSetting
        console.log('additionalWatermarking', setting)
        const image = new Image()
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
        image.onload = async function() {
          const canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          const context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, image.width, image.height)
          if (setting.type === 1) {

          }
          else if (setting.type === 2) {
            if (setting.watermarkImg) {
              let watermark = new Image()
              watermark.src = setting.watermarkImg
              watermark.onload = async() => {
                if (setting.imgSize === 1) {
                  watermark.width = Math.floor(image.width / 5)
                  watermark.height = Math.floor(image.height / 5)
                } else if (setting.imgSize === 2) {
                  watermark.width = image.width
                } else if (setting.imgSize === 3) {
                  watermark.height = image.height
                }
                let dx = 0, dy = 0
                if (setting.locate === 1) {
                  dx = 5
                  dy = 5
                } else if (setting.locate === 2) {
                  dx = 5
                  dy = Math.floor(image.height - watermark.height) - 5
                } else if (setting.locate === 3) {
                  dx = Math.floor(image.width - watermark.width) - 5
                  dy = 5
                } else if (setting.locate === 4) {
                  dx = Math.floor(image.width - watermark.width) - 5
                  dy = Math.floor(image.height - watermark.height) - 5
                } else if (setting.locate === 5) {
                  dx = Math.floor((image.width- watermark.width)/2 )
                  dy = Math.floor((image.height - watermark.height) /2)
                }
                if (image.width <= watermark.width) {
                  dx = 0
                }
                if (image.height <= watermark.height) {
                  dy = 0
                }
                watermark.style.opacity = setting.clarity
                context.drawImage(watermark, dx, dy, watermark.width, watermark.height)
                console.log(dx, dy)
                console.log(watermark.width, watermark.height,watermark)
                let base64 = canvas.toDataURL('image/png')
                console.log(base64)
                that.goodsTable[0].image = base64
              }
            }
          }
          else if (setting.type === 3) {
          }

        }
      })
    },
    getValuationPrice(price, data, setting = null) {
      price = price * 1
      if (this.basicConfig.valuationRadio === 1) {
        let addPrice = (price * this.basicConfig.formula.percentage / 100).toFixed(2)
        let newPrice = addPrice * 1 + this.basicConfig.formula.hidden * 1 + this.basicConfig.formula.basis * 1
        newPrice = (price + newPrice * this.basicConfig.discount / 100).toFixed(2)
        if (this.basicConfig.valuationMethodsRadio) {
          newPrice = Math.ceil(newPrice)
        }
        return newPrice
      } else if (this.basicConfig.valuationRadio === 2) {
        setting = setting || this.valuationSetting
        if (setting && setting.bubbleHeavy >= 0) {
          let long = data.long || data.length
          let width = data.width
          let height = data.height
          let bulkWeightFormula = ((long * width * height) / setting.bubbleHeavy * 1000).toFixed(2) * 1
          let itemWeight = data.weight > bulkWeightFormula && data.weight || bulkWeightFormula
          itemWeight = Math.ceil(itemWeight / 100)
          let singleShipFee = this.freightList[setting.shippingMethod + '-' + setting.goodsType] * 1
          let packagingFee = setting.warehouseServiceCharge * 1
          let shopFeeOrClearanceFee = setting.customsClearanceFee * 1
          let logisticsCosts = (itemWeight * singleShipFee + packagingFee + shopFeeOrClearanceFee).toFixed(2) * 1
          let otherFee = setting.other && setting.other * 1 || 0
          let transactionCommission = setting.transactionCommission || 0
          let withdrawalCharge = setting.withdrawalCharge || 0
          let grossProfitMargin = setting.grossProfitMargin || 0
          let commissionMargin = ((100 - transactionCommission * 1) / 100).toFixed(2)
          let withdrawalFee = ((100 + withdrawalCharge * 1) / 100).toFixed(2)
          let profitMargin = ((100 - grossProfitMargin * 1) / 100).toFixed(2)
          let priceCount = (price + logisticsCosts + otherFee)
          let priceFormula = ((priceCount / commissionMargin / profitMargin) * withdrawalFee).toFixed(2) * 1
          let profits = (priceFormula * (1 - profitMargin)).toFixed(2) * 1
          if (this.valuationVisible) {
            this.calculateResults.profits = this.country.includes('MY') && profits || Math.ceil(profits)
            this.calculateResults.discount = this.country.includes('MY') && priceFormula || Math.ceil(priceFormula)
            this.calculateResults.freight = this.country.includes('MY') && logisticsCosts || Math.ceil(logisticsCosts)
          }
          let discount = (setting.discount / 100).toFixed(2)
          let results = (priceFormula / discount).toFixed(2) * 1
          results = this.country.includes('MY') && results || Math.ceil(results)
          if (this.basicConfig.valuationMethodsRadio) {
            results = Math.ceil(results)
          }
          return results
        } else {
          return 0
        }

      } else if (this.basicConfig.valuationRadio === 3) {
        return this.basicConfig.fixedPrice
      }
    },
    saveCalculate() {
      let setting = this.valuationConfig
      let messages = ''
      if (!setting.discount) {
        messages = '折扣率不能为空'
      } else if (!setting.bubbleHeavy) {
        messages = '泡重计算比不能为空'
      }
      if (messages) {
        this.$message.error(messages)
      } else {
        this.valuationSetting = JSON.parse(JSON.stringify(setting)) || ''
        this.valuationVisible = false
      }
    },
    saveCalculateLabel() {
      this.$prompt('请输入标签名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async({ value }) => {
        let params = {
          country: this.country,
          label: value,
          config: [JSON.stringify(this.valuationConfig), JSON.stringify(this.freightList)]
        }
        let res = await this.$api.valuationConfigSave(params)
        this.$message({
          type: 'success',
          message: '保存标签成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消保存标签'
        })
      })
    },
    updateAttributeName(item, value, attributeName = 'statusName') {
      let index = this.goodsTable.findIndex(i => i.id === item.id)
      if (index >= 0) {
        this.$set(this.goodsTable[index], attributeName, value)
      }
    },
    async getCategoryPath(categoryId) {
      try {
        let categoryTbInfoJson = await this.$commodityService.getCategoryTbInfo(this.country, categoryId, '0')
        let categoryTbInfoRes = JSON.parse(categoryTbInfoJson)
        let categoryTbInfoData = categoryTbInfoRes.data
        let parent_id = categoryTbInfoData?.categories[0].parent_id || 0
        return parent_id && [...await this.getCategoryPath(parent_id), categoryId] || [categoryId]
      } catch (e) {
        return [categoryId]
      }
    },
    //-------------以上为上新操作---------------------
    changeStockUpNumber(data, type) {
      if (type === 1) {
        data = data < 7 && 7 || data
        data = data > 30 && 30 || data
        this.basicConfig.stockUpNumber = data
      } else if (type === 2) {
        data = data < 1 && 1 || data
        data = data > 5 && 5 || data
        this.basicConfig.onNewThread = data
      } else if (type === 3) {
        data = data < 0 && 0 || data
        data = data > 10 && 10 || data
        this.associatedConfig.priceRange = data
      } else if (type === 4) {
        data = data < 1 && 1 || data
        data = data > 5 && 5 || data
        this.storeConfig.pictureThread = data
      }
    },
    async synchronousCategory() {

    },
    valuationInit() {
      this.valuationConfig = Object.assign(this.valuationConfig, this.valuationSetting)
      this.calculateReference = {
        long: '',
        width: '',
        height: '',
        weight: '10',
        costing: '',
        bubbleHeavy: ''
      }
      this.calculateResults = {
        results: '',
        discount: '',
        freight: '',
        profits: ''
      }
      this.valuationVisible = true
    },
    referenceCalculate() {
      let setting = this.valuationConfig
      let calculate = this.calculateReference
      let messages = ''
      if (!setting.discount) {
        messages = '折扣率不能为空'
      } else if (!setting.bubbleHeavy) {
        messages = '泡重计算比不能为空'
      }
      if (messages) {
        this.$message.error(messages)
        return
      }
      this.calculateResults.results = this.getValuationPrice(calculate.costing, calculate, setting)
    },
    goToGoods(item) {
      let extra_info = item.extra_info && JSON.parse(item.extra_info) || {}
      let temp = Object.assign({ productId: item.goods_id }, extra_info)
      let goods = getGoodsUrl(item.source, temp)
      this.$BaseUtilService.openUrl(goods.url)
    },
    async enterCategory(type = 0, row = null) {
      console.log(this.mallList)
      // if (type === 0 && row) {
      //   let categoryRelationJSON = await this.$commodityService.getCategoryRelation(row.category_id,this.country,row.source)
      //   console.log('categoryRelationJSON',categoryRelationJSON)
      // }
      if (type === 1 && this.mallList.length < 1) {
        this.$message.error('请选择一个店铺')
        return false
      }
      if (type === 2 && this.goodsTableSelect.length < 1) {
        this.$message.error('请选择一个商品信息')
        return false
      }
      this.goodsCurrent = row
      this.categoryVisible = true
    },
    categoryChange(val) {
      console.log('categoryChange', val)
      if (val) {
        let categoryList = val.categoryList
        let category = categoryList[categoryList.length - 1]
        let categoryName = category && `${category.category_name}(${category.category_cn_name})`
        if (this.goodsCurrent) {
          let index = this.goodsTable.findIndex(son => son.id === this.goodsCurrent.id)
          this.$set(this.goodsTable[index], 'categoryName', categoryName)
        } else {
          let attributesList = []
          val.attributesList.forEach(son => {
            let option = son.new_options_obj.find(i => i.value_id === son.options)
            attributesList.push({
              attributeId: son.attribute_id,
              attributeName: son.attribute_name,
              valueId: option.value_id,
              value: option.value
            })
          })
          this.goodsTableSelect.forEach(async item => {
            let param = {
              relationCategoryId: item.category_id,
              country: val.country,
              platformId: item.source,
              platformCategoryId: val.categoryList[val.categoryList.length - 1].category_id,
              categoryAttributes: attributesList
            }
            let save = await this.$commodityService.saveCategoryRelation(param)
            let index = this.goodsTable.findIndex(son => son.id === item.id)
            this.$set(this.goodsTable[index], 'categoryName', categoryName)
          })
        }
      }
      this.categoryVisible = false
    },
    enterGoodsTag() {
      if (this.goodsTableSelect.length < 1) {
        this.$message.error('请至少选择一个商品')
        return
      }
      this.goodsTagVisible = true
    },
    goodsTagChange(val) {
      console.log('goodsTagChange', val)
      if (val) {

      }
      this.goodsTagVisible = false
    },
    async updateSellActive(type) {
      if (type) {
        this.sellActiveTable.forEach(item => {
          let index = this.sellActiveSetting.findIndex(i => i.platform_mall_id === item.platform_mall_id)
          if (item.discount && item.number || item.goodsId) {
            if (index > -1) {
              this.sellActiveSetting[index] = item
            } else {
              this.sellActiveSetting.push(item)
            }
          } else {
            if (index > -1) {
              this.sellActiveSetting.splice(index, 1)
            }
          }
        })
        this.sellActiveVisible = false
      } else {
        let discount = parseInt(this.sellActiveCurrent.discount)
        let number = parseInt(this.sellActiveCurrent.number)
        if (discount < 0 || discount > 100 || number < 1) {
          this.$message.error('折扣比例或限购数量输入数值有误')
          return
        }
        let index = this.sellActiveTable.findIndex(i => i.platform_mall_id === this.sellActiveCurrent.platform_mall_id)
        if (this.sellActiveCurrent.isExisting) {
          this.sellActiveTable[index].discount = discount
          this.sellActiveTable[index].number = number
        } else {
          // 创建活动
          let start_time = Math.floor(new Date(this.sellActiveCurrent.startTime).getTime() / 1000)
          let end_time = Math.floor(new Date(this.sellActiveCurrent.endTime).getTime() / 1000)
          if (end_time - start_time < 3600) {
            this.$message.error('活动时间不能小于1小时')
            return
          }
          let param = {
            mallId: this.sellActiveCurrent.platform_mall_id,
            fe_status: 'upcoming',
            highlight: '',
            title: this.sellActiveCurrent.name,
            start_time: start_time,
            end_time: end_time,
            status: 1
          }
          let option = {
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
          }
          let discountJson = await this.$shopeemanService.discount(this.country, param, option)
          let discountRes = JSON.parse(discountJson)
          if (discountRes.status >= 200 && discountRes.status < 300) {
            const discountData = JSON.parse(discountRes.data)
            if (discountData.code === 0) {
              this.sellActiveTable[index].discountId = discountData.data.discount_id
              this.sellActiveTable[index].discount = discount
              this.sellActiveTable[index].number = number
            }
          } else if (discountRes.status === 403) {
            this.$message.error(`店铺【${this.sellActiveCurrent.mall_alias_name || this.sellActiveCurrent.platform_mall_name}】的未登录`)
          } else {
            this.$message.error(`店铺【${this.sellActiveCurrent.mall_alias_name || this.sellActiveCurrent.platform_mall_name}】的添加活动折扣失败`)
          }
        }
        this.setSellActiveVisible = false
      }
    },
    setSellActive(data) {
      if (data) {
        this.sellActiveCurrent = Object.assign(JSON.parse(JSON.stringify(data)), {
          name: '',
          startTime: '',
          endTime: ''
        })
        this.setSellActiveVisible = true
      } else {
        this.sellActiveTable = []
        this.mallList.forEach(item => {
          let temp = this.sellActiveSetting.filter(i => i.platform_mall_id === item.platform_mall_id)[0]
          temp = temp || Object.assign(JSON.parse(JSON.stringify(item)), {
            isExisting: true,
            discountId: '',
            goodsId: '',
            discount: '',
            number: ''
          })
          this.sellActiveTable.push(temp)
        })
        this.sellActiveVisible = true
      }
    },
    setWatermark(type) {
      if (type) {
        this.watermarkConfig = Object.assign(this.watermarkConfig, JSON.parse(JSON.stringify(this.watermarkSetting)))
        this.watermarkVisible = true
      } else {
        this.watermarkSetting = JSON.parse(JSON.stringify(this.watermarkConfig))
        this.watermarkVisible = false
      }
    },
    watermarkPreview1() {
      this.uploadImgAdd = true
      this.watermarkPreviewType = 1
      setTimeout(() => {
        this.$refs['uploadImg'].$el.click()
      }, 100)
    },
    watermarkPreview2() {
      this.uploadImgAdd = true
      this.watermarkPreviewType = 2
      setTimeout(() => {
        this.$refs['uploadImg'].$el.click()
      }, 100)
    },
    watermarkPreview(file) {
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = () => {
        if (this.watermarkPreviewType === 1) {
          this.watermarkConfig.goodsImg = reader.result
        } else {
          this.watermarkConfig.watermarkImg = reader.result
        }
      }
      this.uploadImgAdd = false
    },
    changeLogistics() {
      let logisticsList = this.$shopeeManConfig.getLogisticsList()
      logisticsList = logisticsList[this.country] || []
      this.logisticsList = []
      this.logistics = []
      logisticsList.forEach(item => {
        this.logisticsList.push(item)
        if (item.IsSelected) {
          this.logistics.push(item.ShipId)
        }
      })
    },
    changeMallList(data) {  //店铺列表
      console.log(data)
      this.mallList = data.mallList || []
      this.country = data.country
    },
    handleSelectionChange(val) {
      this.goodsTableSelect = val || []
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/product-put-less/shangxin.less';
</style>

<style lang="less">
.basisInstall {
  .el-checkbox-group {
    display: flex;
    flex-flow: wrap;
    align-items: center;
  }
}

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

.goToGoods {
  white-space: normal;
  cursor: pointer;
  line-height: 40px;

  &:hover {
    color: #ff0000;
  }
}
</style>

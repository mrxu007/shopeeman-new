<template>
  <el-row class="contaniner">
    <el-row class="header">
      <div class="basisInstall">
        <div class="basisInstall-title">店铺设置</div>
        <storeChoose @changeMallList="changeMallList" :spanWidth="'60px'" :is-country="true" :is-reset="true"
                     style="margin-bottom: 5px;"></storeChoose>
        <div class="basisInstall-box" style="flex-wrap: nowrap">
          <div>物流设置：</div>
          <div>
            <el-checkbox-group v-model="logistics" size="mini">
              <el-checkbox :label="item.ShipName" :value="item" v-for="item in logisticsList"
                           :key="item.ShipId"></el-checkbox>
            </el-checkbox-group>
            <div v-if="customLogistics[0]">
              <p style="color: var(--themeColor)">确保此物流方式已在商家后台开启
                <el-tooltip class="item" effect="dark" content="请填写相应站点币种价格，此价格不可转换" placement="top">
                  <el-button size="mini" type="text"><i class="el-icon-question"></i></el-button>
                </el-tooltip>
              </p>
              <div v-for="item in customLogistics" :key="item.ShipId" style="margin-bottom: 5px">
                <span>{{item.ShipName}}</span>
                <el-input size="mini" v-model="item.price" style="width: 100px; margin-left: 5px;"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="basisInstall-box">
          <div>水印设置：</div>
          <div>
            <el-checkbox v-model="watermarkChecked" size="mini">批量添加水印</el-checkbox>
            <el-button size="mini" style="margin-left: 15px;" type="primary" @click="setWatermark(1)">水印配置
            </el-button>
          </div>
        </div>
        <div class="basisInstall-box">
          <div>SKU价格：</div>
          <div>
            <el-radio v-model="priceRadio" :label="0">保留全部</el-radio>
            <el-radio v-model="priceRadio" :label="1">删除最低价</el-radio>
            <el-radio v-model="priceRadio" :label="2">删除最高价</el-radio>
          </div>
        </div>
        <div class="basisInstall-box">
          <div>商品设置：</div>
          <div>
            <el-checkbox v-model="activityChecked" size="mini">添加到折扣活动或商品分类</el-checkbox>
            <el-button size="mini" style="margin-left: 15px;" type="primary" @click="setSellActive()">行销活动配置</el-button>
          </div>
        </div>
        <div class="basisInstall-box">
          <el-checkbox-group v-model="chineseChecked" size="mini">
            <el-checkbox label="允许上新中文" style="margin: 0;"></el-checkbox>
            <el-tooltip class="item" effect="dark" content="勾选后，将不再检测商品信息中是否含有中文" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
            <el-checkbox label="允许上新简体数据" style="margin-left: 15px;" :disabled="chineseChecked.length<1"></el-checkbox>
            <el-tooltip class="item" effect="dark" content="勾选后，将不再检测商品语种是否为简体" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </el-checkbox-group>
        </div>
        <div class="basisInstall-box">
          <div>图片上传线程数量：
            <el-input size="mini" v-model="pictureThread" style="width: 60px;"></el-input>
            <el-tooltip class="item" effect="dark" content="0<线程数量<6，建议数量为3" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
          <div style="margin-left: 15px;">
            <el-checkbox v-model="wordsHeavy" size="mini">标题内单词去重</el-checkbox>
          </div>
        </div>
        <div v-if="country==='MY'||country ==='ID'" class="basisInstall-box">
          <div>危险物品：</div>
          <el-radio v-model="dangerousRadio" :label="0">不是</el-radio>
          <el-radio v-model="dangerousRadio" :label="1">包含电池/磁铁/易燃材料</el-radio>
        </div>
        <div class="basisInstall-box">
          <el-button size="mini" type="primary" @click="">标记商品标签</el-button>
          <el-button size="mini" @click="">同步类目属性</el-button>
          <el-button size="mini" type="primary" @click="">保存配置</el-button>
        </div>
      </div>
      <div class="basisInstall">
        <div class="basisInstall-title">基础设置</div>
        <div class="basisInstall-box">
          <el-radio v-model="valuationRadio" :label="1">计价方式一</el-radio>
          <el-radio v-model="valuationRadio" :label="2">计价方式二</el-radio>
          <el-radio v-model="valuationRadio" :label="3">计价方式三</el-radio>
        </div>
        <div v-if="valuationRadio === 1">
          <div class="basisInstall-box">
            <div>基础加价：</div>
            <el-input size="mini" style="width: 60px;margin-right: 5px" v-model="formula.percentage"></el-input>
            %　+　基础价
            <el-input size="mini" style="width: 60px;margin-right: 5px" v-model="formula.basis"></el-input>
            　+　藏价
            <el-input size="mini" style="width: 60px;" v-model="formula.basis"></el-input>
            <el-tooltip class="item" effect="dark" content="加价方式：原价+原价*百分百+基础价+藏价" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
          <div class="basisInstall-box">
            <div>商品折扣：</div>
            <div>
              <el-input style="width: 60px;margin-right: 5px" size="mini" v-model="discount"></el-input>
              %
              <el-tooltip class="item" effect="dark" content="例：25（加价完成后价格） / 0.5（商品折扣为50%）" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
              </el-tooltip>
            </div>
            <div style="margin-left: 10px;">计价方式：</div>
            <el-radio v-model="valuationMethodsRadio" :label="0" style="margin-right: 10px">以折扣价为准</el-radio>
            <el-radio v-model="valuationMethodsRadio" :label="1">以零售价为准</el-radio>
          </div>
        </div>
        <div v-if="valuationRadio === 2">
          <div class="basisInstall-box">
            <div>计价方式：</div>
            <el-radio v-model="valuationMethodsRadio" :label="0" style="margin-right: 10px">以折扣价为准</el-radio>
            <el-radio v-model="valuationMethodsRadio" :label="1">以零售价为准</el-radio>
            <el-button size="mini" type="primary" @click="">计价配置</el-button>
          </div>
        </div>
        <div v-if="valuationRadio === 3">
          <div class="basisInstall-box">
            <div>商品价格：</div>
            <el-input size="mini" v-model="fixedPrice" style="width: 120px;"></el-input>
            <el-tooltip class="item" effect="dark" content="每个热搜词之间以逗号隔开，不进行翻译" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
        </div>
        <div class="basisInstall-box">
          <div style="display: flex;align-items: center">
            <div>添加热搜词：</div>
            <el-radio v-model="headlineRadio" :label="0" style="margin-right: 15px;line-height: 28px;">标题前加</el-radio>
            <el-radio v-model="headlineRadio" :label="1" style="margin-right: 20px;line-height: 28px;">标题后加</el-radio>
            <div>热搜词随机个数
              <el-input style="width: 60px;margin-left: 5px" size="mini" v-model="hotSearch"></el-input>
            </div>
            <el-tooltip class="item" effect="dark" content="每个热搜词之间以逗号隔开，不进行翻译" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
          <div style="width: 95%;margin-top: 5px;">
            <el-input type="textarea" :rows="2" resize="none" style="width: 100%" placeholder="请输入热搜词,以逗号隔开"
                      v-model="hotList"></el-input>
          </div>
        </div>
        <div class="basisInstall-box">
          <div>禁运设置：</div>
          <div>
            <el-checkbox v-model="embargoChecked1" size="mini">启动禁运类目拦截</el-checkbox>
            <el-checkbox v-model="embargoChecked2" size="mini">启动禁运词拦截</el-checkbox>
          </div>
        </div>
        <div class="basisInstall-box">
          <div>商品重量：</div>
          <div>
            <el-input size="mini" style="width: 60px" v-model="minHeavy"></el-input>
            -
            <el-input size="mini" style="width: 60px;margin-right: 5px;" v-model="maxHeavy"></el-input>
            kg
            <el-tooltip class="item" effect="dark" content="商品重量默认随机0.1 - 1kg" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
          <div style="margin-left: 15px;">类目映射：</div>
          <el-select v-model="categoryMapping" size="mini" style="width: 120px;">
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
            <el-checkbox v-model="sourceCategoryChecked" size="mini">使用Shopee采集商品源类目</el-checkbox>
            <el-tooltip class="item" effect="dark" content="Shopee商品只有类目能使用商品源类目，属性只能选择默认！" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
        </div>
        <div class="basisInstall-box">
          <div>预购：</div>
          <div>
            <el-checkbox v-model="stockUpChecked" size="mini">是否较长时间备货</el-checkbox>
            <el-input style="width: 60px;margin: 0 5px;" size="mini" v-model="stockUpNumber" :min="7"
                      :max="30"></el-input>
            天
            <el-tooltip class="item" effect="dark" content="如果备货最短7天，最长30天" :min="7" :max="30" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
        </div>
        <div class="basisInstall-box">
          <div>上新线程：</div>
          <el-input style="width: 60px;margin: 0 5px;" size="mini" v-model="onNewThread"></el-input>
          <el-tooltip class="item" effect="dark" content="请根据电脑配置合理设置上新线程数量" :min="7" :max="30" placement="top">
            <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
          </el-tooltip>
          <div style="margin-left: 25px;">
            <el-checkbox v-model="numberCeilingChecked" size="mini">单店店铺上货数量上限</el-checkbox>
            <el-input size="mini" style="width: 60px;margin: 0 5px;" v-model="numberCeiling"></el-input>
          </div>
        </div>
        <div class="basisInstall-box">
          <el-checkbox v-model="usedChecked" size="mini">是否二手商品</el-checkbox>
          <div style="margin-left: 15px;">
            <el-checkbox v-model="deleteCollectChecked" size="mini">上新后删除收藏商品</el-checkbox>
            <el-tooltip class="item" effect="dark" content="删除商品库中的原商品（不适用于一商品多店铺模式）" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
          <div style="margin-left: 15px;">
            <el-checkbox v-model="autoCompleteChecked" size="mini">自动补齐9张轮播主图</el-checkbox>
          </div>
        </div>
      </div>
      <div class="basisInstall">
        <div class="basisInstall-title">防关联设置</div>
        <div class="basisInstall-box">
          <div class="keepRight">商品标题：</div>
          <el-checkbox v-model="specialCharChecked" size="mini">随机加入特殊字符</el-checkbox>
          <el-checkbox v-model="realNameChecked" size="mini">开头加上店铺真实名</el-checkbox>
        </div>
        <div class="basisInstall-box">
          <div class="keepRight">上新时间间隔：</div>
          <el-input size="mini" v-model="onNewInterval" style="width: 120px;margin-right: 5px;"></el-input>
          S
          <el-tooltip class="item" effect="dark" content="默认印尼站点上新时间间隔为50S，其他站点为40S" placement="top">
            <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
          </el-tooltip>
        </div>
        <div class="basisInstall-box">
          <div class="keepRight">重复上新维度：</div>
          <el-radio v-model="dimensionRadio" :label="0">站点</el-radio>
          <el-radio v-model="dimensionRadio" :label="1">店铺</el-radio>
          <el-radio v-model="dimensionRadio" :label="2" style="margin-right: 0">一商品多店铺</el-radio>
          <el-tooltip class="item" effect="dark" content="同一商品上新到不同店铺中，为避免重复铺货，请配合热搜词使用" placement="top">
            <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
          </el-tooltip>

        </div>
        <div class="basisInstall-box" style="flex-wrap: nowrap">
          <div class="keepRight">图片设置：</div>
          <div style="display: flex;flex-wrap: wrap;align-items: center;flex: 1;">
            <div style="width: 100%;">
              <el-checkbox v-model="pictureSetting.firstChecked" size="mini">删除首图</el-checkbox>
              <el-checkbox v-model="pictureSetting.cutChecked" size="mini">图片删减</el-checkbox>
            </div>
            <div style="width: 100%;">
              <el-checkbox v-model="pictureSetting.randomChecked" size="mini">图片顺序随机</el-checkbox>
              <el-checkbox v-model="pictureSetting.whiteChecked" size="mini">首图白底</el-checkbox>
            </div>
            <div style="width: 100%;">
              将
              <el-input style="width: 60px;margin: 0 5px;" size="mini" v-model="pictureSetting.index"></el-input>
              张设为封面
            </div>
            <el-checkbox v-model="pictureSetting.compressionChecked" size="mini">自动压缩图片</el-checkbox>
            <el-tooltip class="item" effect="dark" content="商品图片超过1MB时，将压缩图片" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
            </el-tooltip>
          </div>
        </div>
        <div class="basisInstall-box">
          <div class="keepRight">图片缺失上传：</div>
          <el-checkbox v-model="missingUploadChecked" size="mini">是否允许图片缺失上传</el-checkbox>
        </div>
        <div class="basisInstall-box">
          <div class="keepRight">关键词过滤：</div>
          <div>
            <el-select v-model="keyFilter" size="mini" style="width: 120px;">
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
                      v-model="keyList"></el-input>
          </div>
        </div>
      </div>
      <div class="basisInstall">
        <div class="basisInstall-title">数据统计</div>
        <div class="basisInstall-box loose">
          <div>商品总数：</div>
          <span style="margin-left: 5px">{{statistics.count}}</span>
        </div>
        <div class="basisInstall-box loose">
          <div>成功总数：</div>
          <span style="margin-left: 5px">{{statistics.success}}</span>
        </div>
        <div class="basisInstall-box loose">
          <div>失败总数：</div>
          <span style="margin-left: 5px">{{statistics.failure}}</span>
        </div>
        <div class="basisInstall-box loose">
          <div>重复总数：</div>
          <span style="margin-left: 5px">{{statistics.repeat}}</span>
        </div>
        <div class="basisInstall-box loose">
          <div>过滤总数：</div>
          <span style="margin-left: 5px">{{statistics.filter}}</span>
        </div>
      </div>
    </el-row>

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
            <div  class="keepRight">水印文字：</div>
            <div>
              <el-radio v-model="watermarkConfig.textType" :label="1" style="margin: 0">店铺别名</el-radio>
              <el-tooltip class="item" effect="dark" content="选择店铺别名时，若无别名则使用店铺真实名" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;margin-right: 15px;"></i></el-button>
              </el-tooltip>
              <el-radio v-model="watermarkConfig.textType" :label="2" style="margin: 0 15px 0 0">店铺真实名</el-radio>
              <el-radio v-model="watermarkConfig.textType" :label="3" style="margin: 0">店铺设置的水印文字</el-radio>
              <el-tooltip class="item" effect="dark" content="选择店铺设置的水印文字时，未设置则默认使用店铺名称" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;margin-right: 15px;"></i></el-button>
              </el-tooltip>
            </div>
          </div>
          <div v-show="watermarkConfig.type !== 1" class="on_new_dialog_box">
            <div class="keepRight">示例图选择：</div>
            <div style="display: flex">
              <div style="margin-right: 25px;display: flex; flex-flow: row;justify-content: center;align-items: center;">
                <div style="text-align: justify; text-align-last: justify;display: inline-block;width: 20px">商品图</div>
                <el-upload action="#" list-type="picture" :drag="true"
                           :show-file-list="false" :limit="1" :auto-upload="false"
                           :on-change="watermarkPreview1" style="display: flex; align-items: center;">
                <img v-if="watermarkConfig.goodsImageUrl" :src="watermarkConfig.goodsImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              </div>
              <div style="display: flex; flex-flow: row;justify-content: center;align-items: center;">
                <div style="text-align: justify; text-align-last: justify;width: 20px">水印图</div>
                <el-upload action="#" list-type="picture" :drag="true"
                           :show-file-list="false" :limit="1" :auto-upload="false"
                           :on-change="watermarkPreview2" style="display: flex; align-items: center;">
                <img v-if="watermarkConfig.watermarkImageUrl" :src="watermarkConfig.watermarkImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              </div>
            </div>
          </div>
          <div v-show="watermarkConfig.type === 2" class="on_new_dialog_box">
            <div  class="keepRight">图片透明度：</div>
            <el-slider style="width: 65%;" v-model="watermarkConfig.clarity"  show-input
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
              <el-color-picker style="margin-left: 5px;" v-model="watermarkConfig.textColor" size="mini"></el-color-picker>
              <el-tooltip class="item" effect="dark" content="水印文字大小最小为12，水印文字颜色默认为灰白色（#D5D4DA）" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;margin-right: 15px;"></i></el-button>
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
                <img :src="watermarkConfig.goodsImageUrl || ''" alt="">
              </div>
              <div class="watermark_image" :class="watermarkConfig.type < 3 && locateClass || 'watermark_image_background'"
                   :style="">
                <span v-show="watermarkConfig.type === 1"
                      :style="'font-size:'+watermarkConfig.textSize+'px!important;color:'+watermarkConfig.textColor">
                  {{watermarkConfig.text}}
                </span>
                <img :style="watermarkConfig.type === 2 && ('opacity: '+watermarkConfig.clarity) || ''"
                     v-show="watermarkConfig.type !== 1" :src="watermarkConfig.watermarkImageUrl||''" alt="">
              </div>

            </div>
          </div>
          <div style="display:flex;justify-content: space-evenly">
            <el-button size="mini" type="primary" @click="setWatermark()">提交</el-button>
            <el-button  size="mini" @click="watermarkVisible = false">退出</el-button>
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
            <el-table :data="sellActiveTable" tooltip-effect="dark" height="500">
              <el-table-column label="店铺名称" align="left" :show-overflow-tooltip="true" min-width="120px" >
                <template slot-scope="{row}">
                  {{  row.mall_alias_name || row.platform_mall_name  }}
                </template>
              </el-table-column>
              <el-table-column label="活动折扣配置" align="left" width="350px">
                <template slot-scope="scope" >
                  <div style="display: flex;align-items: center">
                    <el-checkbox v-model="scope.row.isExisting" size="mini">使用已有活动ID</el-checkbox>
                    <el-input size="mini" v-model="scope.row.activityId" style="width: 100px;margin: 0 5px"></el-input>
                    <el-button size="mini" type="primary" @click="setSellActive(scope.row)">{{ scope.row.isExisting && '配置折扣' || '创建活动' }}</el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column  align="left" width="120px">
                <template slot="header" slot-scope="scope">
                  商品分类ID
                  <el-tooltip class="item" effect="dark" content="分类ID请至【商品管理】 - 【商店分类】中查看" placement="top-end">
                    <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
                  </el-tooltip>
                </template>
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.goodsId" style="width: 100px;"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
      <el-dialog :title="sellActiveCurrent && sellActiveCurrent.isExisting && '配置折扣' || '创建活动'" width="350px"
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
            <el-input size="mini" style="width: 180px;margin-right: 5px;" v-model="sellActiveCurrent.discount"></el-input> %
            <el-tooltip class="item" effect="dark" content="折扣价格 = 商品原价 * 折扣%，如原价1000的商品，输入80折扣的折扣价格为800" placement="top-end">
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
    </div>
  </el-row>
</template>

<script>
  import storeChoose from '../../../components/store-choose'

  export default {
    data() {
      return {

        //弹窗
        sellActiveVisible:false,
        setSellActiveVisible:false,
        sellActiveTable:[],
        sellActiveCurrent:{},

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
          goodsImageUrl: '', // 商品图 2 3
          watermarkImg: '',  //水印图 2 3
          watermarkImageUrl: '',  //水印图 2 3
          text:'水印',
        },
        watermarkSetting:{
          type: 1, //水印类型 1/2/3
          addType: 1,  // 添加类型 0
          textType: 1, // 文字类型 1
          textSize: '30',  //文字大小 1
          textColor: '#D5D4DA',// 文字颜色 1
          locate: 1, //添加位置 1， 2
          clarity: 0.3,  // 透明度 2
          imgSize: 1,  // 缩放方式 2
          goodsImg: '', // 商品图 2 3
          goodsImageUrl: '', // 商品图 2 3
          watermarkImg: '',  //水印图 2 3
          watermarkImageUrl: '',  //水印图 2 3
          text:'水印',
        },
        imgWidth:'',
        imgHeight:'',
        locateList:[
          {
            label:'左上角',
            value:1
        },{
            label:'左下角',
            value:2
        },{
            label:'右上角',
            value:3
        },{
            label:'右下角',
            value:4
        },{
            label:'中间',
            value:5
        },],
        imgSizeList:[
          {
            label:'按比例缩放',
            value:1
          },
          {
            label:'与商品图宽一致',
            value:2
          },
          {
            label:'与商品图高一致',
            value:3
          },],
        locateClass: 'watermark_image_left watermark_image_top',

        //店铺设置
        mallList: [], //店铺列表
        country: '',  //店铺站点
        logistics: [],  //所选物流
        logisticsList: [], // 物流列表
        customLogistics: [], //自定义物流列表
        watermarkChecked: false, // 水印配置
        priceRadio: 1, // sku价格单选
        activityChecked: false, // 商品设置
        chineseChecked: [], //中文配置
        pictureThread: '3', //线程数量
        dangerousRadio: 0, //危险物品
        wordsHeavy: false, //单词去重

        //基础配置
        valuationRadio: 1, //计价方式
        formula: {
          percentage: '50',
          basis: '5',
          hidden: '5'
        }, //加价方式 1
        discount: '100', //折扣 1
        valuationMethodsRadio: 0, //算价方式 1 ，2
        valuationConfig: {},  //计价配置 2
        fixedPrice: '150',  //商品价格 3
        headlineRadio: 0, //热搜词标题位置
        hotSearch: '1', //热搜词数
        hotList: '', //热搜词列表
        embargoChecked1: true, //启动禁运类目拦截
        embargoChecked2: true, //启动禁运词拦截
        minHeavy: '0.1', //最小重量
        maxHeavy: '1', //最大重量
        categoryMapping: 1, //类目映射
        categoryMappingList: [
          {
            label: '个人类目映射',
            value: 1
          }, {
            label: '共有类目映射',
            value: 2
          }], //类目映射列表
        sourceCategoryChecked: false, //源类目映射
        stockUpChecked: true, //备货配置
        stockUpNumber: '15', //备货数量
        onNewThread: '5', //线程数量
        numberCeilingChecked: false, //上货上限配置
        numberCeiling: '1000', //上货上限
        usedChecked: false, //二手商品
        deleteCollectChecked: false, //删除收藏
        autoCompleteChecked: false, //自动补齐轮播主图

        //防关联设置
        specialCharChecked: true, //特殊字符
        realNameChecked: false, //真实店铺名
        onNewInterval: '40', //上新时间间隔
        dimensionRadio: 0,//上新唯独
        pictureSetting: {
          firstChecked: true,
          cutChecked: true,
          randomChecked: true,
          whiteChecked: false,
          index: '',
          compressionChecked: true
        }, //图片设置
        missingUploadChecked: false, //图片缺失上传
        keyFilter: 0, //关键词过滤 0全部 1标题 2描述 3SKU
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
        keyList: '',

        //数据统计
        statistics: {
          count: 0,
          success: 0,
          failure: 0,
          repeat: 0,
          filter: 0
        }
      }
    },
    components: { storeChoose },
    watch: {
      country(value) {
        this.onNewInterval = value !== 'ID' && '40' || '50'
        this.changeLogistics()
      },
      watermarkConfig:{
        handler(val){
          if (val.type < 3){
            let locateClass = val.locate % 2 && 'watermark_image_top ' || 'watermark_image_bottom '
            locateClass += val.locate > 2 && 'watermark_image_right ' || 'watermark_image_left '
            locateClass = val.locate < 5 && locateClass || 'watermark_image_center '
            if(val.type === 2){
              locateClass += val.imgSize ===1 && 'watermark_image_reduce ' || 'watermark_image_fixed '
              if (val.imgSize === 2) {

              }else  if (val.imgSize === 3) {

              }
              locateClass += val.imgSize === 1 && 'watermark_image_reduce ' || val.imgSize === 2 && 'watermark_image_width ' ||  'watermark_image_height '
            }
            this.locateClass = locateClass
          }

        },
        deep:true
      },
      logistics(val) {
        this.customLogistics = []
        val.forEach(item => {
          let temp = this.logisticsList.filter(i => i.ShipName === item)[0]
          if (temp && temp.IsCustomShipFee) {
            this.customLogistics.push(temp)
          }
        })
      }
    },
    mounted() {
    },
    methods: {

      async updateSellActive(type){
        if (type) {

        }else{
          let index = this.sellActiveTable.findIndex(i=>i.platform_mall_id ===this.sellActiveCurrent.platform_mall_id)
          if (this.sellActiveCurrent.isExisting){
            this.sellActiveTable[index].discount = this.sellActiveCurrent.discount
            this.sellActiveTable[index].number = this.sellActiveCurrent.number
          } else{
            // 创建活动
            let start_time =Math.floor(new Date(this.sellActiveCurrent.startTime).getTime() / 1000)
            let end_time =  Math.floor(new Date(this.sellActiveCurrent.endTime).getTime() / 1000)
            if (end_time - start_time < 3600){
              this.$message.error('活动时间不能小于1小时')
              return
            }
            let param = {
              mallId:this.sellActiveCurrent.platform_mall_id,
              fe_status: "upcoming",
              highlight: "",
              title: this.sellActiveCurrent.name,
              start_time: start_time,
              end_time: end_time,
              status: 1
            }
            let option = {
              headers:{ 'Content-Type':'application/json;charset=UTF-8' }
            }
            console.log(param)
            let discountJson = await this.$shopeemanService.discount(this.country,param,option)
            let discountRes = JSON.parse(discountJson)
            console.log(discountRes)
          }
          this.setSellActiveVisible = false
        }
      },
      setSellActive(data){
        if (data){
          this.sellActiveCurrent = Object.assign(JSON.parse(JSON.stringify(data)),{
            name: '',
            startTime:'',
            endTime:'',
          })
          this.setSellActiveVisible = true
        } else{
          this.sellActiveTable = []
          this.mallList.forEach(item=>{
            let temp = Object.assign(JSON.parse(JSON.stringify(item)),{
              isExisting:true,
              activityId:'',
              goodsId:'',
              discount:'',
              number:''
            })
            this.sellActiveTable.push(temp)
          })
          this.sellActiveVisible = true
        }
      },
      setWatermark(type){
        if (type){
          this.watermarkConfig = JSON.parse(JSON.stringify(this.watermarkSetting))
          this.watermarkVisible = true
        } else{
          this.watermarkSetting = JSON.parse(JSON.stringify(this.watermarkConfig))
          this.watermarkVisible = false
        }
      },
      watermarkPreview1(file) {
        this.watermarkPreview(file,1)
      },
      watermarkPreview2(file) {
        this.watermarkPreview(file,2)
      },
      watermarkPreview(file,type){
        if(type === 1){
          this.watermarkConfig.goodsImg = file
          this.watermarkConfig.goodsImageUrl = file.url
        }else{
          this.watermarkConfig.watermarkImg = file
          this.watermarkConfig.watermarkImageUrl = file.url
        }
        console.log(file)
      },
      changeLogistics() {
        let logisticsList = this.$shopeeManConfig.getLogisticsList()
        logisticsList = logisticsList[this.country]
        this.logisticsList = []
        this.logistics = []
        logisticsList.forEach(item => {
          this.logisticsList.push(item)
          if (item.IsSelected) {
            this.logistics.push(item.ShipName)
          }
        })
      },
      changeMallList(data) {  //店铺列表
        console.log(data, 'val')
        if (data.mallList && data.mallList.length > 0) {
          this.mallList = data.mallList
          this.country = data.country
        }
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
    .el-dialog__header{
      padding: 10px;
      .el-dialog__headerbtn{
        top: 10px;
      }
      .el-dialog__title{
        font-weight: 700;
        font-size: 14px;
      }
    }
    .el-dialog__body{
      padding: 5px 16px 10px;
      .el-upload{
        width: 60px;
        height: 60px;
        .el-upload-dragger{
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
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>

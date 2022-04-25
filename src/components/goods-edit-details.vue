<template>
  <el-row class="goods-edit-details" v-if="goodsDetails">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="商品信息" name="information" class="edit-details-box">
        <div class="goods-detail-block">
          <div class="keepRight keepTop">商品名称：</div>
          <div class="goods-detail-box">
            <el-input type="textarea" :rows="2" resize="none" placeholder="" size="mini"
                      v-model="goodsDetails.title"></el-input>
          </div>
          <div style="color: red;width: 60px;padding-left: 10px;">
            {{ goodsDetails.title && goodsDetails.title.length || 0 }}
          </div>
        </div>
        <div class="goods-detail-block">
          <div class="keepRight keepTop">商品描述：</div>
          <div class="goods-detail-box">
            <el-input type="textarea" :rows="8" resize="none" placeholder="" size="mini"
                      v-model="goodsDetails.description"></el-input>
          </div>
          <div style="color: red;width: 60px;padding-left: 10px;">
            {{ goodsDetails.description && goodsDetails.description.length || 0 }}
          </div>
        </div>
        <div class="goods-detail-block">
          <div class="keepRight">重量体积：</div>
          <div class="goods-detail-box">
            <div style="margin-right: 15px">重：
              <el-input v-model="goodsDetails.weight" size="mini" style="width: 80px;margin-right: 5px"></el-input>
              KG
            </div>
            <div style="margin-right: 15px">长：
              <el-input v-model="goodsDetails.long" size="mini" style="width: 80px;margin-right: 5px"></el-input>
              CM
            </div>
            <div style="margin-right: 15px">宽：
              <el-input v-model="goodsDetails.width" size="mini" style="width: 80px;margin-right: 5px"></el-input>
              CM
            </div>
            <div style="margin-right: 15px">高：
              <el-input v-model="goodsDetails.height" size="mini" style="width: 80px;margin-right: 5px"></el-input>
              CM
            </div>
          </div>
        </div>
        <div class="goods-detail-block">
          <div class="keepRight keepTop">活动主图：</div>
          <div class="goods-detail-box">
            <div class="goods-image-detail">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false"
                          v-if="goodsDetails.images1.length > 0"
                          :enterable="false" style="width: 160px; height: 160px; display: inline-block">
                <div slot="content">
                  <el-image :src="goodsDetails.images1[0].img" style="width: 400px; height: 400px"/>
                </div>
                <el-image :src="goodsDetails.images1[0].img"/>
              </el-tooltip>
              <div class="goods-image-footer">
                <el-button class="footer-but" type="" size="mini" @click="updateImage(2,0)">编辑</el-button>
                <el-button class="footer-but" type="" size="mini" @click="replaceImage(2,0)">
                  替换
                </el-button>
                <el-button class="footer-but" @click.stop="cancelBackground" type="" size="mini">去背景</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-detail-block">
          <div class="keepRight keepTop">
            规格图：
            <el-checkbox class="keepRight-flex" v-model="specImageAllCheck">全选</el-checkbox>
            <el-button style="padding-left: 8px;padding-right: 8px;"
                       type="primary" size="mini" @click="downloadImages(1)">下载规格图
            </el-button>
          </div>
          <div class="goods-detail-box">
            <div class="goods-image-detail" v-if="goodsDetails.spec_image.length > 0"
                 v-for="(item,index) in goodsDetails.spec_image" :key="index">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false"
                          v-if="goodsDetails.images1.length > 0"
                          :enterable="false" style="width: 160px; height: 160px; display: inline-block">
                <div slot="content">
                  <el-image :src="item" style="width: 400px; height: 400px"/>
                </div>
                <el-image v-if="item" :src="item" @click.native="multipleCheckClick(index,1)"/>
              </el-tooltip>
              <div></div>
              <div class="goods-image-top-right">
                <el-checkbox v-model="specImageCheck[index]"></el-checkbox>
              </div>
              <div class="goods-image-top">
                <el-button class="footer-but" type="primary" size="mini" @click="setMasterMap(item)">设为主图</el-button>
              </div>
              <div class="goods-image-footer">
                <el-button class="footer-but" type="" size="mini" @click="updateImage(1,index)">编辑</el-button>
                <el-button class="footer-but" type="" size="mini" @click="replaceImage(1,index)">替换</el-button>
                <el-button class="footer-but" type="" size="mini">以图搜图</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-detail-block">
          <div class="keepRight keepTop">
            轮播图：
            <el-checkbox class="keepRight-flex" v-model="carouselImageAllCheck">全选</el-checkbox>
            <el-button style="margin-bottom: 5px;padding-left: 8px;padding-right: 8px;"
                       type="primary" size="mini" @click="downloadImages(2)">下载轮播图
            </el-button>
            <br/>
            <el-button style="margin: 0;padding-left: 8px;padding-right: 8px;"
                       type="primary" size="mini" @click="deleteImages(2)">删除轮播图
            </el-button>
          </div>
          <div class="goods-detail-box">
            <draggable v-model="goodsDetails.images1" group="imagesDetails" dragClass="dragClass" class="draggable_box"
                       ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
              <transition-group>
                <div class="goods-image-detail" v-show="goodsDetails.images1.length > 0"
                     v-for="(item,index) in goodsDetails.images1" :key="item.id">
                  <el-tooltip effect="light" placement="right-end" :visible-arrow="false"
                              v-if="goodsDetails.images1.length > 0"
                              :enterable="false" style="width: 160px; height: 160px; display: inline-block">
                    <div slot="content">
                      <el-image :src="item.img" style="width: 400px; height: 400px"/>
                    </div>
                    <el-image :src="item.img" @click.native="multipleCheckClick(index,2)"/>
                  </el-tooltip>
                  <div class="goods-image-top-right">
                    <el-checkbox v-model="carouselImageCheck[index]" size="small"></el-checkbox>
                  </div>
                  <div class="goods-image-top">
                    <el-button class="footer-but" type="primary" size="mini" @click="setMasterMap(item)">设为主图
                    </el-button>
                  </div>
                  <div class="goods-image-footer">
                    <el-button class="footer-but" type="" size="mini" @click="updateImage(2,index)">编辑</el-button>
                    <el-button class="footer-but" type="" size="mini" @click="replaceImage(2,index)">替换</el-button>
                    <el-button class="footer-but" type="" size="mini" @click="deleteImages(2,index)">删除</el-button>
                    <el-button class="footer-but" type="" size="mini">以图搜图</el-button>
                  </div>
                </div>
              </transition-group>
            </draggable>
            <div class="goods-image-detail goods-image-add" @click="addImage(2)">
              <div class="image-add image-add-cross"></div>
              <div class="image-add image-add-vertical"></div>
            </div>
          </div>
        </div>
        <div class="goods-detail-block">
          <div class="keepRight keepTop">
            <el-tooltip class="item" effect="dark" content="详情图仅做展示，不做任何处理，如需上新展示，可添加至轮播图中" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question"></i></el-button>
            </el-tooltip>
            详情图：
            <el-checkbox class="keepRight-flex" v-model="descImageAllCheck">全选</el-checkbox>
            <el-button style="margin-bottom: 5px;padding-left: 8px;padding-right: 8px;"
                       type="primary" size="mini" @click="downloadImages(3)">下载详情图
            </el-button>
            <br/>
            <el-button style="margin: 0;padding-left: 8px;padding-right: 8px;"
                       type="primary" size="mini" @click="deleteImages(3)">删除详情图
            </el-button>
          </div>
          <div class="goods-detail-box">
            <draggable v-model="goodsDetails.descImages" group="imagesDetails" dragClass="dragClass" class="draggable_box"
                       ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
              <transition-group>
                <div class="goods-image-detail" v-show="goodsDetails.descImages.length > 0"
                     v-for="(item,index) in goodsDetails.descImages" :key="item.id">
                  <el-tooltip effect="light" placement="right-end" :visible-arrow="false"
                              v-if="goodsDetails.images1.length > 0"
                              :enterable="false" style="width: 160px; height: 160px; display: inline-block">
                    <div slot="content">
                      <el-image :src="item.img" style="width: 400px; height: 400px"/>
                    </div>
                    <el-image :src="item.img" @click.native="multipleCheckClick(index,3)"/>
                  </el-tooltip>
                  <div class="goods-image-top-right">
                    <el-checkbox v-model="descImageCheck[index]" size="small"></el-checkbox>
                  </div>
                  <div class="goods-image-top">
                    <el-button class="footer-but" type="primary" size="mini" @click="setMasterMap(item)">设为主图
                    </el-button>
                  </div>
                  <div class="goods-image-footer">
                    <el-button class="footer-but" type="" size="mini" @click="updateImage(3,index)">编辑</el-button>
                    <el-button class="footer-but" type="" size="mini" @click="replaceImage(3,index)">替换</el-button>
                    <el-button class="footer-but" type="" size="mini" @click="deleteImages(3,index)">删除</el-button>
                    <el-button class="footer-but" type="" size="mini">以图搜图</el-button>
                  </div>
                </div>
              </transition-group>
            </draggable>
            <div class="goods-image-detail goods-image-add" @click="addImage(3)">
              <div class="image-add image-add-cross"></div>
              <div class="image-add image-add-vertical"></div>
            </div>
          </div>
        </div>
        <div class="goods-detail-block">
          <div class="keepRight keepTop">尺寸图：</div>
          <div class="goods-detail-box">
            <div v-if="goodsDetails.sizeImages[0] && goodsDetails.sizeImages[0].img" class="goods-image-detail">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false"
                          v-if="goodsDetails.images1.length > 0"
                          :enterable="false" style="width: 160px; height: 160px; display: inline-block">
                <div slot="content">
                  <el-image :src="goodsDetails.sizeImages[0].img" style="width: 400px; height: 400px"/>
                </div>
                <el-image :src="goodsDetails.sizeImages[0].img"/>
              </el-tooltip>
              <div class="goods-image-footer">
                <el-button class="footer-but" type="" size="mini" @click="replaceImage(4,0)">替换</el-button>
                <el-button class="footer-but" type="" size="mini" @click="deleteImages(4)">删除</el-button>
              </div>
            </div>
            <div v-else class="goods-image-detail goods-image-add" @click="addImage(4)">
              <div class="image-add image-add-cross"></div>
              <div class="image-add image-add-vertical"></div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品规格" name="specifications" class="edit-details-box">
        <div class="goods-detail-block" style="display: block;">
          <div class="spec_detail">
            <span style="font-weight: 700;white-space: nowrap;">规格一名称：</span>
            <el-input size="mini" placeholder="颜色" style="width: 120px;margin-right: 10px;"
                      v-model="spec_name1"></el-input>
            <el-button size="mini" type="primary" @click="newSpecNumber(1)">新增规格值</el-button>
            <el-button size="mini" type="primary" @click="skuUpdateSpec='1';skuUpdateVisible=true">批量编辑规格值</el-button>
            <el-button size="mini" type="primary" @click="deleteImages(1)">批量删除</el-button>
            <el-checkbox size="mini" style="margin-left: 10px;" v-model="skuDetail1AllCheck">全选</el-checkbox>
          </div>
          <div class="spec_detail">
            <div class="sku_detail"
                 v-for="(item,index) in goodsDetails.tier_variation[goodsDetails.tier_variation.spec1]" :key="index"
                 v-if="goodsDetails.tier_variation && goodsDetails.tier_variation[goodsDetails.tier_variation.spec1]"
                 @click="multipleCheckClick(index,4)">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false"
                          v-if="goodsDetails.images1.length > 0"
                          :enterable="false" style="width: 160px; height: 160px; display: inline-block">
                <div slot="content">
                  <el-image :src="goodsDetails.tier_variation.images[index]" style="width: 400px; height: 400px"/>
                </div>
                <el-image class="sku_describe_image" v-if="goodsDetails.tier_variation.images[index]"
                          :src="goodsDetails.tier_variation.images[index]"/>
              </el-tooltip>
              <el-input type="textarea" :rows="4" resize="none" :placeholder="item" @change="updateSpec(item,1,index)"
                        size="mini" style="margin:0 5px;width: 103px;" @click.native.stop=""
                        v-model="goodsDetails.tier_variation[goodsDetails.tier_variation.spec1][index]"/>
              <el-checkbox class="sku_describe_check" style="pointer-events: none" v-model="skuDetail1Check[index]"/>
              <el-button class="sku_bottom_but" style="bottom: 25px" size="mini"
                         @click.native.stop="replaceImage(1,index)">替换
              </el-button>
              <el-button class="sku_bottom_but" size="mini" @click.native.stop="deleteImages(1,index)">删除</el-button>
            </div>
          </div>
        </div>
        <div class="goods-detail-block" style="display: block;">
          <div class="spec_detail">
            <span style="font-weight: 700;white-space: nowrap;">规格二名称：</span>
            <el-input size="mini" placeholder="尺寸" style="width: 120px;margin-right: 10px;"
                      v-model="spec_name2"></el-input>
            <el-button size="mini" type="primary" @click="newSpecNumber(2)">新增规格值</el-button>
            <el-button size="mini" type="primary" @click="skuUpdateSpec='2';skuUpdateVisible=true">批量编辑规格值</el-button>
            <el-button size="mini" type="primary" @click="deleteImages(5)">批量删除</el-button>
            <el-checkbox size="mini" style="margin-left: 10px;" v-model="skuDetail2AllCheck">全选</el-checkbox>
          </div>
          <div class="spec_detail">
            <div class="sku_detail" :key="index" @click="multipleCheckClick(index,5)"
                 v-if="goodsDetails.tier_variation && goodsDetails.tier_variation[goodsDetails.tier_variation.spec2]"
                 v-for="(item,index) in goodsDetails.tier_variation[goodsDetails.tier_variation.spec2]">
              <el-input type="textarea" :rows="4" resize="none" :placeholder="item" @change="updateSpec(item,2,index)"
                        size="mini" style="margin:0 5px;width: 103px;" @click.native.stop=""
                        v-model="goodsDetails.tier_variation[goodsDetails.tier_variation.spec2][index]"/>
              <el-checkbox class="sku_describe_check" v-model="skuDetail2Check[index]" style="pointer-events: none"/>
              <el-button class="sku_bottom_but" size="mini" @click.native.stop="deleteImages(5,index)">删除</el-button>
            </div>
          </div>
        </div>
        <div class="goods-detail-block" style="display: block;">
          <div class="spec_detail" style="display: flex;">
            <span style="font-weight: 700;white-space: nowrap;">价格及库存设置：</span>
            <div>库存：</div>
            <el-input size="mini" style="width: 120px;margin-right: 10px;" v-model="presetInventory"></el-input>
            <div>价格：</div>
            <el-input size="mini" style="width: 120px;margin-right: 10px;" v-model="presetPrice"></el-input>
            <el-radio size="mini" v-model="presetTypeRadio" :label="0">增加</el-radio>
            <el-radio size="mini" v-model="presetTypeRadio" :label="1">减少</el-radio>
            <el-radio size="mini" v-model="presetTypeRadio" :label="2">重新设置</el-radio>
            <el-button size="mini" type="primary" @click="priceStock">批量设置</el-button>
          </div>
          <u-table ref="goodsTable" :data="goodsDetails.itemmodels" use-virtual :data-changes-scroll-top="false"
                   :header-cell-style="{backgroundColor: '#f5f7fa',}" row-key="id" :border="false"
                   :big-data-checkbox="true">
            <u-table-column align="left" type="index" width="80" label="序号"/>
            <u-table-column align="left" label="规格一" show-overflow-tooltip width="200">
              <template slot-scope="{row}">
                <div class="ellipsis-detail">
                  {{ row.sku_spec1 }}
                </div>
              </template>
            </u-table-column>
            <u-table-column align="left" label="规格二" show-overflow-tooltip width="200">
              <template slot-scope="{row}">
                <div class="ellipsis-detail">
                  {{ row.sku_spec2 }}
                </div>
              </template>
            </u-table-column>
            <u-table-column align="left" label="库存" width="200">
              <template slot-scope="{ row }">
                <el-input v-model="row.sku_stock" size="mini"></el-input>
              </template>
            </u-table-column>
            <u-table-column align="left" label="单买价(元)" width="200">
              <template slot-scope="{ row }">
                <el-input v-model="row.sku_price" size="mini"></el-input>
              </template>
            </u-table-column>
            <u-table-column align="left" label="规格图" width="80">
              <template slot-scope="{row}">
                <el-tooltip effect="light" placement="right-end" :visible-arrow="false"
                            v-if="goodsDetails.images1.length > 0"
                            :enterable="false" style="width: 56px; height: 56px; display: inline-block">
                  <div slot="content">
                    <el-image :src="row.sku_image" style="width: 400px; height: 400px"/>
                  </div>
                  <el-image style="width: 60px;height: 60px"
                            :src="{url:row.sku_image,source:goodsDetails.source} | changeImgSizeFilter"></el-image>
                </el-tooltip>
              </template>
            </u-table-column>
          </u-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div style="display: flex; align-items: center;margin-top: 10px;justify-content: center">
      <el-button size="mini" type="primary" @click="goodsChange">保存</el-button>
      <el-button size="mini" @click="$emit('goodsEditorCancel','')">关闭</el-button>
    </div>
    <div class="on_new_dialog upload_new">
      <el-dialog class="goods-edit-details" title="图片选择" width="880px" :close-on-click-modal="false"
                 :modal="false" :visible.sync="picturesChooseVisible" top="10vh">
        <div v-if="picturesChooseVisible" class="goods-detail-block"
             style="background: white;margin-bottom: 0;padding: 0;">
          <div class="pictures_choose_dialog">
            <div style="margin: 5px 0;display: flex;align-items: center">
              <el-radio size="mini" v-model="picturesChooseTypeRadio" :label="0">使用本地图片</el-radio>
              <el-upload style="margin-right: 10px" action="#" :drag="true" :show-file-list="false"
                         :limit="1" :auto-upload="false" :on-change="imageUpload">
                <el-button size="mini" type="primary">选择图片</el-button>
              </el-upload>
              <el-radio size="mini" v-model="picturesChooseTypeRadio" :label="1">使用商品图片</el-radio>
            </div>
            <div style="display: flex;flex-wrap: wrap;overflow: auto;height: 67vh;">
              <div class="goods-image-detail" v-if="imageList.length > 0"
                   v-for="(item,index) in imageList" :key="index">
                <el-image :src="item" @click.native="picturesChooseRadio = item"/>
                <div class="goods-image-top-right">
                  <el-radio v-model="picturesChooseRadio" :label="item">
                    <span style="display: none;">1</span>
                  </el-radio>
                </div>
              </div>
            </div>
            <div style="margin-top: 5px;display: flex;justify-content: center;">
              <el-button size="mini" @click="picturesChooseSuccess = true;picturesChooseStart = true" type="primary">
                确定
              </el-button>
              <el-button size="mini" @click="picturesChooseSuccess = true" style="margin-left: 25px">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog class="goods-edit-details" title="批量修改SKU" width="450px" :close-on-click-modal="false"
                 :modal="false" :visible.sync="skuUpdateVisible" top="10vh">
        <div class="goods-detail-block" style="background: white;margin-bottom: 0;padding: 0;">
          <div class="pictures_choose_dialog">
            <div style="margin: 5px 0;display: flex;align-items: center">
              <el-radio size="mini" v-model="skuUpdateRadio" :label="0">删除关键词</el-radio>
              <el-radio size="mini" v-model="skuUpdateRadio" :label="1">添加在SKU前</el-radio>
              <el-radio size="mini" v-model="skuUpdateRadio" :label="2">添加在SKU后</el-radio>
              <el-radio size="mini" v-model="skuUpdateRadio" style="margin-right: 0" :label="3">替换关键词</el-radio>
              <el-tooltip class="item" effect="dark" content="原词与新词间用';'隔开，需替换多个关键词时用','间隔" placement="top">
                <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"/></el-button>
              </el-tooltip>
            </div>
            <div style="display: flex;align-items: center;">
              <div style="width: 60px;">关键词：</div>
              <el-input type="textarea" :rows="4" resize="none" size="mini"
                        v-model="skuUpdateKey" placeholder="请输入关键词，每个单词以逗号','隔开">
              </el-input>
            </div>
            <div style="margin-top: 5px;display: flex;justify-content: center;">
              <el-button size="mini" @click="skuUpdateVisible=false" type="primary">
                确定
              </el-button>
              <el-button size="mini" @click="skuUpdateSpec = ''; skuUpdateVisible=false" style="margin-left: 25px">取消
              </el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div v-show="GdEditorSdkVisible" class="updateImgBox">
      <div id="editorApp" class="updateImg"></div>
      <div class="updateImgBut">
        <el-button type="" size="mini" @click="closeEditor">取消</el-button>
      </div>
    </div>
  </el-row>
</template>
<script>
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { createImageEditor } from '@gaoding/editor-sdk'
import { randomWord, waitStart, getArraySrcLengthSort } from '../util/util'
import draggable from 'vuedraggable'

export default {
  name: 'goods-edit-details',
  components: {
    draggable
  },
  data() {
    return {
      goodsDetails: null,
      activeName: 'information',
      imageList: [],
      editor: null, //编辑
      GdEditorSdkVisible: false,
      editorImg: '',
      //图片选择
      picturesChooseStart: false,
      picturesChooseVisible: false,
      picturesChooseSuccess: false,
      picturesChooseTypeRadio: 0,
      picturesChooseFile: '',
      picturesChooseFileUrl: '',
      picturesChooseRadio: '',
      //批量修改SKU
      skuUpdateVisible: false,
      skuUpdateRadio: 1,
      skuUpdateKey: '',
      skuUpdateSpec: '',
      //activeName = information //商品详情
      specImageCheck: [],
      specImageAllCheck: false,
      carouselImageCheck: [],
      carouselImageAllCheck: false,
      descImageCheck: [],
      descImageAllCheck: false,

      //activeName = specifications //商品规格
      spec_name1: '',
      spec_name2: '',
      skuDetail1Check: [],
      skuDetail1AllCheck: false,
      skuDetail2Check: [],
      skuDetail2AllCheck: false,
      presetInventory: '',
      presetPrice: '',
      presetTypeRadio: 1,
      lodSpecImage: [],
      tier_variation: [],
      drag: false
    }
  },
  props: {
    goodsEditor: {
      type: Object,
      default: null
    }
  },
  watch: {
    specImageCheck(val) {
      let length = this.goodsDetails.spec_image.length
      let valList = val.toString().split(true)
      this.specImageAllCheck = length < valList.length
    },
    specImageAllCheck(val) {
      let length = this.goodsDetails.spec_image.length
      if (val) {
        for (let i = 0; i < length; i++) {
          this.specImageCheck[i] = true
        }
      } else {
        let valList = this.specImageCheck.toString().split(true)
        if (length < valList.length) {
          for (let i = 0; i < length; i++) {
            this.specImageCheck[i] = false
          }
        }
      }
    },
    carouselImageCheck(val) {
      let length = this.goodsDetails.images1.length
      let valList = val.toString().split(true)
      this.carouselImageAllCheck = length < valList.length
    },
    carouselImageAllCheck(val) {
      let length = this.goodsDetails.images1.length
      if (val) {
        for (let i = 0; i < length; i++) {
          this.carouselImageCheck[i] = true
        }
      } else {
        let valList = this.carouselImageCheck.toString().split(true)
        if (length < valList.length) {
          for (let i = 0; i < length; i++) {
            this.carouselImageCheck[i] = false
          }
        }
      }
    },
    descImageCheck(val) {
      let length = this.goodsDetails.descImages.length
      let valList = val.toString().split(true)
      this.descImageAllCheck = length < valList.length
    },
    descImageAllCheck(val) {
      let length = this.goodsDetails.descImages.length
      if (val) {
        for (let i = 0; i < length; i++) {
          this.descImageCheck[i] = true
        }
      } else {
        let valList = this.descImageCheck.toString().split(true)
        if (length < valList.length) {
          for (let i = 0; i < length; i++) {
            this.descImageCheck[i] = false
          }
        }
      }
    },
    skuDetail1Check(val) {
      if (this.goodsDetails.tier_variation && this.goodsDetails.tier_variation.spec1) {
        let length = this.goodsDetails.tier_variation[this.goodsDetails.tier_variation.spec1].length
        let valList = val.toString().split(true)
        this.skuDetail1AllCheck = length < valList.length && val.length
      }
    },
    skuDetail1AllCheck(val) {
      if (this.goodsDetails.tier_variation && this.goodsDetails.tier_variation.spec1) {
        let length = this.goodsDetails.tier_variation[this.goodsDetails.tier_variation.spec1].length
        if (val) {
          for (let i = 0; i < length; i++) {
            this.skuDetail1Check[i] = true
          }
        } else {
          let valList = this.skuDetail1Check.toString().split(true)
          if (length < valList.length) {
            for (let i = 0; i < length; i++) {
              this.skuDetail1Check[i] = false
            }
          }
        }
      }
    },
    skuDetail2Check(val) {
      if (this.goodsDetails.tier_variation && this.goodsDetails.tier_variation.spec2) {
        let length = this.goodsDetails.tier_variation[this.goodsDetails.tier_variation.spec2].length
        let valList = val.toString().split(true)
        this.skuDetail2AllCheck = length < valList.length && val.length
      }
    },
    skuDetail2AllCheck(val) {
      if (this.goodsDetails.tier_variation && this.goodsDetails.tier_variation.spec2) {
        let length = this.goodsDetails.tier_variation[this.goodsDetails.tier_variation.spec2].length
        if (val) {
          for (let i = 0; i < length; i++) {
            this.skuDetail2Check[i] = true
          }
        } else {
          let valList = this.skuDetail2Check.toString().split(true)
          if (length < valList.length) {
            for (let i = 0; i < length; i++) {
              this.skuDetail2Check[i] = false
            }
          }
        }
      }
    },
    skuUpdateVisible(val) {
      if (!val && this.skuUpdateSpec) {
        let keyList = this.skuUpdateKey.split(',')
        let spec1Name = this.goodsDetails.tier_variation['spec1']
        let spec2Name = this.goodsDetails.tier_variation['spec2']
        let spec1Json = JSON.stringify(this.goodsDetails.tier_variation[spec1Name])
        let spec2Json = JSON.stringify(this.goodsDetails.tier_variation[spec2Name])
        let itemModelsList = JSON.stringify(this.goodsDetails.itemmodels)
        let skuBeforeList = []
        let skuReplaceList = []
        let skuDetailList = this['skuDetail' + this.skuUpdateSpec + 'Check']
        skuDetailList.forEach((item, index) => {
          if (item) {
            let name = this.goodsDetails.tier_variation['spec' + this.skuUpdateSpec]
            let specList = this.goodsDetails.tier_variation[name]
            skuBeforeList.push(specList[index])
          }
        })
        let arraySrcLengthSort = getArraySrcLengthSort(skuBeforeList)
        if (this.skuUpdateRadio === 0) {
          arraySrcLengthSort.forEach(item => {
            let spec = skuBeforeList[item]
            keyList.forEach(son => {
              spec = spec.replaceAll(son, '')
            })
            skuReplaceList.push({
              before: skuBeforeList[item],
              after: spec
            })
          })
        } else if (this.skuUpdateRadio === 1 || this.skuUpdateRadio === 2) {
          arraySrcLengthSort.forEach(item => {
            let spec = skuBeforeList[item]
            if (this.skuUpdateRadio === 1) {
              spec = keyList.toString() + ' ' + spec
            } else {
              spec = spec + ' ' + keyList.toString()
            }
            skuReplaceList.push({
              before: skuBeforeList[item],
              after: spec
            })
          })
        } else if (this.skuUpdateRadio === 3) {
          arraySrcLengthSort.forEach(item => {
            let spec = skuBeforeList[item]
            keyList.forEach(son => {
              let tempList = son.split(';')
              tempList = tempList.length > 1 && tempList || son.split('；')
              let tempBefore = tempList[0] || ''
              let tempAfter = tempList[1] || ''
              spec = spec.replaceAll(tempBefore, tempAfter)
            })
            skuReplaceList.push({
              before: skuBeforeList[item],
              after: spec
            })
          })
        }
        skuReplaceList.forEach(item => {
          if (this.skuUpdateSpec === 1 || this.skuUpdateSpec === '1') {
            itemModelsList = itemModelsList.replaceAll('"sku_spec1":"' + item.before + '"', '"sku_spec1":"' + item.after + '"')
            itemModelsList = itemModelsList.replaceAll('"sku":"' + item.before + '=|=', '"sku":"' + item.after + '=|=')
            spec1Json = spec1Json.replaceAll('"' + item.before + '"', '"' + item.after + '"')
          } else {
            itemModelsList = itemModelsList.replaceAll('@', 'MD&&ZZ&&MD')
            itemModelsList = itemModelsList.replaceAll('=|=', '@')
            itemModelsList = itemModelsList.replaceAll('"sku_spec2":"' + item.before + '"', '"sku_spec2":"' + item.after + '"')
            itemModelsList = itemModelsList.replaceAll('@' + item.before + '"', '@' + item.after + '"')
            itemModelsList = itemModelsList.replaceAll('@', '=|=')
            itemModelsList = itemModelsList.replaceAll('MD&&ZZ&&MD', '@')
            spec2Json = spec2Json.replaceAll('"' + item.before + '"', '"' + item.after + '"')
          }
        })
        this.goodsDetails.itemmodels = JSON.parse(itemModelsList)
        this.goodsDetails.tier_variation[spec1Name] = JSON.parse(spec1Json)
        this.goodsDetails.tier_variation[spec2Name] = JSON.parse(spec2Json)
        console.log(this.goodsDetails)
      }
    },
    picturesChooseVisible(val) {
      if (val) {
        let image = [...this.goodsDetails.spec_image, ...this.goodsDetails.images, ...this.goodsDetails.descImages.map(i => i.img)]
        this.imageList = [...new Set(image)]
      }
    }
  },
  async mounted() {
    let neededTranslateInfoJson = await this.$commodityService.getSpuDetailByIdV2(this.goodsEditor.id)
    let neededTranslateInfoData = JSON.parse(neededTranslateInfoJson) && JSON.parse(neededTranslateInfoJson).data
    console.log('getSpuDetailByIdV2 - data', neededTranslateInfoData)
    if (!neededTranslateInfoData) {
      this.$message.error('不存在该商品信息，请确认后重试')
      this.$emit('goodsEditorCancel', '')
      return
    }
    this.goodsDetails = neededTranslateInfoData
    this.tier_variation = JSON.parse(JSON.stringify(neededTranslateInfoData.tier_variation))
    this.lodSpecImage = this.goodsDetails.spec_image
  },
  methods: {
    onStart() {
      this.drag = true
    },
    onEnd() {
      this.drag = false
    },
    async replaceImage(type, index) {
      let image = await this.selectImage()
      console.log(index, image)
      //1 - 规格图 2 - 轮播图 3 - 详情图
      if (image) {
        if (type === 1) {
          let itemmodels = JSON.stringify(this.goodsDetails.itemmodels)
          let oldImage = this.goodsDetails.spec_image[index]
          let spec1 = this.goodsDetails.tier_variation[this.goodsDetails.tier_variation.spec1][index]
          let oldReg = new RegExp('"sku_image":"' + oldImage + '",(((?!sku_image).)*)"sku_spec1":"' + spec1 + '","', 'gi')
          let newReg = '"sku_image":"' + image + '",$1"sku_spec1":"' + spec1 + '","'
          itemmodels = itemmodels.replaceAll(oldReg, newReg)
          this.goodsDetails.itemmodels = JSON.parse(itemmodels)
          this.$set(this.goodsDetails.tier_variation.images, index, image)
          this.$set(this.goodsDetails.spec_image, index, image)
        } else if (type === 2) {
          this.goodsDetails.images[index] = image
          this.$set(this.goodsDetails.images1[index], 'img', image)
        } else if (type === 3) {
          this.$set(this.goodsDetails.descImages[index], 'img', image)
        } else if (type === 4) {
          this.$set(this.goodsDetails.sizeImages[index], 'img', image)
        }
      }
    },
    async addImage(type) {
      let image = await this.selectImage()
      //type 1 - 规格图 2 - 轮播图 3 - 详情图 4 - 尺寸图
      if (image) {
        if (type === 2) {
          this.goodsDetails.images.push(image)
          this.goodsDetails.images1.push({ id: '0', img: image })
        } else if (type === 3) {
          this.goodsDetails.descImages.push({ id: '0', img: image })
        } else if (type === 4) {
          this.goodsDetails.sizeImages = [{ id: '0', img: image }]
        }
      }
    },
    async newSpecNumber(type) {
      let spec1Name = this.goodsDetails.tier_variation['spec1']
      let spec2Name = this.goodsDetails.tier_variation['spec2']
      let price = this.goodsDetails.price
      if (type === 1) {
        if (!this.spec_name1) {
          this.$message.error('请输入规格一')
          return
        }
        let image = await this.selectImage()
        if (image) {
          this.goodsDetails.tier_variation[spec1Name].push(this.spec_name1)
          this.goodsDetails.tier_variation['images'].push(image)
          this.goodsDetails.spec_image.push(image)
          let specList = this.goodsDetails.tier_variation[spec2Name]
          if (!JSON.stringify(this.goodsDetails.itemmodels).includes('"sku_spec1":""')) {
            specList.forEach((item) => {
              let temp = {
                sku: this.spec_name1 + '=|=' + item,
                sku_image: image,
                sku_spec1: this.spec_name1,
                sku_spec2: item,
                sku_stock: item.sku_stock || 1000,
                stock: item.stock || 1000,
                sku_price: price,
                price: price
              }
              this.goodsDetails.itemmodels.push(temp)
            })
          } else {
            let list = []
            this.goodsDetails.itemmodels.forEach(item => {
              list.push(Object.assign(item, {
                sku: this.sku_spec1 + '=|=' + item.spec_name2,
                sku_spec1: this.spec_name1
              }))
            })
            console.log(list)
            this.goodsDetails.itemmodels = list
          }
        } else {
          this.$message.error('请选择规格图')
          return false
        }
      } else {
        if (!this.spec_name2) {
          this.$message.error('请输入规格二')
          return
        }
        this.goodsDetails.tier_variation[spec2Name].push(this.spec_name2)
        let images = this.goodsDetails.tier_variation['images']
        let specList = this.goodsDetails.tier_variation[spec1Name]
        if (!JSON.stringify(this.goodsDetails.itemmodels).includes('"sku_spec2":""')) {
          specList.forEach((item, index) => {
            let temp = {
              sku: item + '=|=' + this.spec_name2,
              sku_image: images[index],
              sku_spec1: item,
              sku_spec2: this.spec_name2,
              sku_stock: item.sku_stock || 1000,
              stock: item.stock || 1000,
              sku_price: price,
              price: price
            }
            this.goodsDetails.itemmodels.push(temp)
          })
        } else {
          let list = []
          this.goodsDetails.itemmodels.forEach(item => {
            list.push(Object.assign(item, {
              sku: item.sku_spec1 + '=|=' + this.spec_name2,
              sku_spec2: this.spec_name2
            }))
          })
          console.log(list)
          this.goodsDetails.itemmodels = list
        }
      }
    },
    async cancelBackground() {
      let image = this.goodsDetails.images1[0] && this.goodsDetails.images1[0].img
      let byUrlRes = await this.$MattingService.getDrawbotMattingByUrl(image, new Date().getTime() + '.png')
      if (byUrlRes.Code === 200) {
        let byUrlData = byUrlRes.Data
        let ImageURL = byUrlData.Data && byUrlData.Data.ImageURL
        this.$set(this.goodsDetails.images1, 0, { id: '0', img: ImageURL })
        this.$set(this.goodsDetails.images, 0, ImageURL)
      } else {
        this.$message.error('去背景失败，请稍后重试！')
      }
    },
    async updateImage(type, index) {
      this.GdEditorSdkVisible = true
      let oldImage = ''
      this.editorImg = ''
      if (type === 1) {
        oldImage = this.goodsDetails.spec_image[index]
      } else if (type === 2) {
        oldImage = this.goodsDetails.images1[index].img
      } else if (type === 3) {
        oldImage = this.goodsDetails.descImages[index].img
      }
      this.editor = createImageEditor({
        appId: 'YMEQYU442168',
        container: '#editorApp'
      })
      this.editor.importImage([oldImage])
      let newImg = await this.getEditorImage()
      if (newImg) {
        if (type === 1) {
          let itemmodels = JSON.stringify(this.goodsDetails.itemmodels)
          let spec1 = this.goodsDetails.tier_variation[this.goodsDetails.tier_variation.spec1][index]
          let oldReg = new RegExp('"sku_image":"' + oldImage + '",(((?!sku_image).)*)"sku_spec1":"' + spec1 + '","', 'gi')
          let newReg = '"sku_image":"' + newImg + '",$1"sku_spec1":"' + spec1 + '","'
          itemmodels = itemmodels.replaceAll(oldReg, newReg)
          this.goodsDetails.itemmodels = JSON.parse(itemmodels)
          this.$set(this.goodsDetails.tier_variation.images, index, newImg)
          this.$set(this.goodsDetails.spec_image, index, newImg)
        } else if (type === 2) {
          this.goodsDetails.images[index] = newImg
          this.$set(this.goodsDetails.images1[index], 'img', newImg)
        } else if (type === 3) {
          this.$set(this.goodsDetails.descImages[index], 'img', newImg)
        }
      }
    },
    getEditorImage() {
      this.saveEditor()
      return new Promise(resolve => {
        let setIn = setInterval(() => {
          if (!this.GdEditorSdkVisible) {
            clearInterval(setIn)
            resolve(this.editorImg)
          }
        }, 300)
      })
    },
    saveEditor() {
      this.editor.onSave(({ files, workId, type, title }) => {
        const file = files[0]
        const url = URL.createObjectURL(file)
        let image = new Image()
        image.src = url
        image.onload = async() => {
          let canvas = document.createElement('canvas')
          let cxt = canvas.getContext('2d')
          canvas.width = image.width
          canvas.height = image.height
          cxt.drawImage(image, 0, 0, image.width, image.height)
          let dataURL = canvas.toDataURL('image/png')
          console.log('dataURL', image)
          const name = randomWord(false, 32) + '_' + new Date().getTime()
          this.editorImg = await this.$ossService.uploadFile(dataURL, name + '.png')
          this.GdEditorSdkVisible = false
          this.editor.close()
        }

        image.onerror = async ()=> {
          let base64Value = await this.$BaseUtilService.imageToBase64String(url)
          let base64 = 'data:image/png;base64,' + base64Value
          console.log('dataURL', image)
          const name = randomWord(false, 32) + '_' + new Date().getTime()
          this.editorImg = await this.$ossService.uploadFile(base64, name + '.png')
          this.GdEditorSdkVisible = false
          this.editor.close()
        }
      })
    },
    closeEditor() {
      this.GdEditorSdkVisible = false
      this.editor.close()
    },
    updateSpec(item, type, index) {
      let itemmodelsJson = JSON.stringify(this.goodsDetails.itemmodels)
      let specName = this.tier_variation['spec' + type]
      let specList = this.tier_variation[specName]
      let oldSpec = specList[index]
      let oldStr = '"sku_spec' + type + '":"' + oldSpec + '"'
      let newStr = '"sku_spec' + type + '":"' + item + '"'
      itemmodelsJson = itemmodelsJson.replaceAll(oldStr, newStr)
      if (type === 1) {
        oldStr = '"sku":"' + oldSpec + '=|='
        newStr = '"sku":"' + item + '=|='
      } else {
        oldStr = '=|=' + oldSpec + '",'
        newStr = '=|=' + item + '",'
      }
      itemmodelsJson = itemmodelsJson.replaceAll(oldStr, newStr)
      this.goodsDetails.itemmodels = JSON.parse(itemmodelsJson)
      this.tier_variation[specName][index] = item
    },
    priceStock() {
      let itemmodels = []
      if (!this.presetInventory && !this.presetPrice) {
        this.$message.error('库存与价格至少有一个数据不为空')
        return
      }
      let inventory = parseInt(this.presetInventory) || 0
      let price = parseFloat(parseFloat(this.presetPrice).toFixed(2) || 0)
      this.goodsDetails.itemmodels.forEach(item => {
        let sku_price = parseFloat(parseFloat(item.sku_price).toFixed(2))
        let sku_inventory = parseInt(item.sku_stock)
        if (this.presetTypeRadio === 0) {
          sku_inventory += inventory
          sku_price += price
        } else if (this.presetTypeRadio === 1) {
          sku_inventory -= inventory
          sku_price -= price
          sku_inventory = sku_inventory > 0 && sku_inventory || 0
          sku_price = sku_price > 0 && sku_price || 0
        } else if (this.presetTypeRadio === 2) {
          sku_inventory = inventory
          sku_price = price
          sku_inventory = sku_inventory > 0 && sku_inventory || 0
          sku_price = sku_price > 0 && sku_price || 0
        }
        let temp = JSON.parse(JSON.stringify(item))
        if (inventory) {
          temp.sku_stock = sku_inventory
          temp.stock = sku_inventory
        }
        if (price) {
          temp.sku_price = sku_price
          temp.price = sku_price
        }
        itemmodels.push(temp)
      })
      let stockList = [...itemmodels.map(i => i.sku_stock)]
      this.goodsDetails.stock = eval(stockList.join('+'))
      this.goodsDetails.price = price
      this.goodsDetails.itemmodels = itemmodels
    },
    imageUpload(file) {
      this.picturesChooseFile = file
      this.picturesChooseFileUrl = ''
    },
    selectImage() {
      return new Promise(resolve => {
        this.picturesChooseRadio = ''
        this.picturesChooseTypeRadio = 0
        this.picturesChooseVisible = true
        this.picturesChooseSuccess = false
        let isActive = setInterval(async() => {
          let success = true
          if (this.picturesChooseSuccess) {
            let temp = ''
            if (this.picturesChooseStart) {
              this.picturesChooseStart = false
              if (this.picturesChooseTypeRadio) {
                temp = this.picturesChooseRadio
              } else {
                if (!this.picturesChooseFile) {
                  this.$message.error('请选择本地图片')
                  temp = ''
                  this.picturesChooseSuccess = false
                  success = false
                } else if (this.picturesChooseFileUrl) {
                  temp = this.picturesChooseFileUrl
                } else {
                  const localFile = this.picturesChooseFile.raw
                  const reader = new FileReader()
                  reader.readAsDataURL(localFile)
                  reader.onload = async() => {
                    let imgData = reader.result
                    const name = randomWord(false, 32) + '_' + new Date().getTime()
                    temp = await this.$ossService.uploadFile(imgData, name + '.png')
                    this.picturesChooseFileUrl = temp
                  }
                  await waitStart(() => {
                    return temp
                  }, 50)
                }
              }
            }
            this.picturesChooseVisible = !success
            success && clearInterval(isActive)
            success && resolve(temp)
          }
        }, 300)
      })
    },
    setMasterMap(item) {
      console.log('setMasterMap', item)
      let imageUrl = item && item.img || item
      let index = this.goodsDetails.images1.findIndex(i => i.img === imageUrl)
      let temp = { img: imageUrl, id: new Date().getTime() }
      if (index > -1) {
        temp = this.goodsDetails.images1[index]
        this.goodsDetails.images1.splice(index, 1)
        this.goodsDetails.images.splice(index, 1)
        this.carouselImageCheck.splice(index, 1)
      }
      this.goodsDetails.images1.unshift(temp)
      this.goodsDetails.images.unshift(temp)
      this.carouselImageCheck.unshift(false)
      this.carouselImageAllCheck = false
    },
    deleteImages(type, index = -1) {
      let imageUrls = []
      let itemModelsList = []
      let price = this.goodsDetails.price
      if (type === 1) {
        if (index > -1) {
          let spec1Name = this.goodsDetails.tier_variation['spec1']
          let spec = this.goodsDetails.tier_variation[spec1Name][index]
          this.goodsDetails.itemmodels.forEach(son => {
            if (son.sku_spec1 !== spec) {
              itemModelsList.push(son)
            }
          })
          this.goodsDetails.tier_variation[spec1Name].splice(index, 1)
          this.goodsDetails.tier_variation['images'].splice(index, 1)
          this.goodsDetails.spec_image.splice(index, 1)
          this.goodsDetails.itemmodels = itemModelsList
        } else {
          let spec1Name = this.goodsDetails.tier_variation['spec1']
          let specList = []
          for (let i = this.skuDetail1Check.length - 1; i > -1; i--) {
            if (this.skuDetail1Check[i]) {
              specList.push(this.goodsDetails.tier_variation[spec1Name][i])
              this.goodsDetails.tier_variation[spec1Name].splice(i, 1)
              this.goodsDetails.tier_variation['images'].splice(i, 1)
              this.goodsDetails.spec_image.splice(i, 1)
            }
          }
          this.goodsDetails.itemmodels.forEach(son => {
            if (specList.indexOf(son.sku_spec1) < 0) {
              itemModelsList.push(son)
            }
          })
          this.skuDetail1Check = []
        }
        if (itemModelsList.length === 0) {
          let spec2Name = this.goodsDetails.tier_variation['spec2']
          let specList = this.goodsDetails.tier_variation[spec2Name]
          specList.forEach((item, index) => {
            let temp = {
              sku: item,
              sku_image: '',
              sku_spec1: '',
              sku_spec2: item,
              sku_stock: 1000,
              stock: 1000,
              sku_price: price,
              price: price
            }
            itemModelsList.push(temp)
          })
        }
        this.goodsDetails.itemmodels = itemModelsList
        this.skuDetail1AllCheck = false
      } else if (type === 2) {
        if (index > -1) {
          this.carouselImageCheck.splice(index, 1)
          this.goodsDetails.images1.splice(index, 1)
          this.goodsDetails.images.splice(index, 1)
        } else {
          this.goodsDetails.images1.forEach((item, i) => {
            if (!this.carouselImageCheck[i]) {
              imageUrls.push(item)
            }
          })
          this.carouselImageCheck = []
          this.goodsDetails.images1 = imageUrls
          this.goodsDetails.images = [...imageUrls.map(i => i.img)]
        }
      } else if (type === 3) {
        if (index > -1) {
          this.descImageCheck.splice(index, 1)
          this.goodsDetails.descImages.splice(index, 1)
        } else {
          this.goodsDetails.descImages.forEach((item, i) => {
            if (!this.descImageCheck[index]) {
              imageUrls.push(i)
            }
          })
          this.descImageCheck = []
          this.goodsDetails.descImages = imageUrls
        }
      } else if (type === 4) {
        this.$set(this.goodsDetails.sizeImages, 0, { id: 0, img: '' })
      } else if (type === 5) {
        if (index > -1) {
          let spec2Name = this.goodsDetails.tier_variation['spec2']
          let spec = this.goodsDetails.tier_variation[spec2Name][index]
          this.goodsDetails.itemmodels.forEach(son => {
            if (son.sku_spec2 !== spec) {
              itemModelsList.push(son)
            }
          })
          this.goodsDetails.tier_variation[spec2Name].splice(index, 1)
        } else {
          let spec2Name = this.goodsDetails.tier_variation['spec2']
          let specList = []
          for (let i = this.skuDetail2Check.length - 1; i > -1; i--) {
            if (this.skuDetail2Check[i]) {
              specList.push(this.goodsDetails.tier_variation[spec2Name][i])
              this.goodsDetails.tier_variation[spec2Name].splice(i, 1)
            }
          }
          this.goodsDetails.itemmodels.forEach(son => {
            if (specList.indexOf(son.sku_spec2) < 0) {
              itemModelsList.push(son)
            }
          })
          this.skuDetail2Check = []
        }
        if (itemModelsList.length === 0) {
          let spec1Name = this.goodsDetails.tier_variation['spec1']
          let specList = this.goodsDetails.tier_variation[spec1Name]
          specList.forEach((item, index) => {
            let temp = {
              sku: item,
              sku_image: this.goodsDetails.tier_variation.images[index],
              sku_spec1: item,
              sku_spec2: '',
              sku_stock: 1000,
              stock: 1000,
              sku_price: price,
              price: price
            }
            itemModelsList.push(temp)
          })
        }
        this.goodsDetails.itemmodels = itemModelsList
      }
    },
    downloadImage(src, name) {
      console.log(src)
      // crossorigin 是HTML5中新增的<img>标签属性
      // crossorigin属性有两个值可选：
      // anonymous:如果使用这个值的话就会在请求中的header中的带上origin属性，但请求不会带上cookie和其他的一些认证信息。
      // use-credentials:这个同时会在跨域请求中带上cookie和其他的一些认证信息。
      // 在使用这两个值时都需要server端在response的header中带上Access-Control-Allow-Credentials属性。
      // 可以通过server的配置文件来开启这个属性：server开启Access-Control-Allow-Credentials
      // 解决跨域 Canvas 污染问题
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = src
      // console.log(image)
      image.onload = function() {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        const url = canvas.toDataURL('image/png')
        // 生成一个a元素
        const a = document.createElement('a')
        // 创建一个单击事件
        const event = new MouseEvent('click')
        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = name || Math.round(Math.random() * 100000000) + '.png'
        // 将生成的URL设置为a.href属性
        a.href = url
        // 触发a的单击事件
        a.dispatchEvent(event)
      }

      image.onerror = async ()=> {
        let base64Value = await this.$BaseUtilService.imageToBase64String(src)
        let base64 = 'data:image/png;base64,' + base64Value
        // 生成一个a元素
        const a = document.createElement('a')
        // 创建一个单击事件
        const event = new MouseEvent('click')
        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = name || Math.round(Math.random() * 100000000) + '.png'
        // 将生成的URL设置为a.href属性
        a.href = base64
        // 触发a的单击事件
        a.dispatchEvent(event)
      }
    }, // 下载图片
    downloadImages(type) {
      let imageUrls = []
      let blogTitle = ''
      if (type === 1) {
        this.goodsDetails.spec_image.forEach((item, index) => {
          if (this.specImageCheck[index]) {
            imageUrls.push(item)
          }
        })
        blogTitle = '规格图片包'
      } else if (type === 2) {
        this.goodsDetails.images1.forEach((item, index) => {
          if (this.carouselImageCheck[index]) {
            imageUrls.push(item.img)
          }
        })
        blogTitle = '轮播图片包'
      } else if (type === 3) {
        this.goodsDetails.descImages.forEach((item, index) => {
          if (this.descImageCheck[index]) {
            imageUrls.push(item.img)
          }
        })
        blogTitle = '详情图片包'
      }
      console.log(imageUrls, 'imageUrls')
      var zip = new JSZip()
      var imgs = zip.folder(blogTitle)
      var baseList = []
      // 要下载图片的url
      var arr = imageUrls
      // 下载后图片的文件名，个数应与arr对应
      var imgNameList = []
      imgNameList = arr.map(item => {
        return Math.round(Math.random() * 100000000)
      })
      console.log(imgNameList)
      for (var i = 0; i < arr.length; i++) {
        const image = new Image()
        // 解决跨域 Canvas 污染问题
        image.setAttribute('crossOrigin', 'anonymous')
        image.onload = function() {
          const canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          const context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, image.width, image.height)
          const url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
          baseList.push(url.substring(22)) // 去掉base64编码前的 data:image/png;base64,
          if (baseList.length === arr.length && baseList.length > 0) {
            for (let k = 0; k < baseList.length; k++) {
              imgs.file(imgNameList[k] + '.png', baseList[k], { base64: true })
            }
            zip.generateAsync({ type: 'blob' }).then(function(content) {
              // see FileSaver.js
              FileSaver.saveAs(content, blogTitle + '.zip')
            })
          }
        }
        image.onerror = async ()=> {
          let base64Value = await this.$BaseUtilService.imageToBase64String(arr[i])
          let url = 'data:image/png;base64,' + base64Value
          baseList.push(url.substring(22)) // 去掉base64编码前的 data:image/png;base64,
          if (baseList.length === arr.length && baseList.length > 0) {
            for (let k = 0; k < baseList.length; k++) {
              imgs.file(imgNameList[k] + '.png', baseList[k], { base64: true })
            }
            zip.generateAsync({ type: 'blob' }).then(function(content) {
              // see FileSaver.js
              FileSaver.saveAs(content, blogTitle + '.zip')
            })
          }
        }
        image.src = arr[i]
      }
    }, // 下载图片包
    multipleCheckClick(index, type) {
      if (type === 1) {
        this.$set(this.specImageCheck, index, !this.specImageCheck[index])
      } else if (type === 2) {
        this.$set(this.carouselImageCheck, index, !this.carouselImageCheck[index])
      } else if (type === 3) {
        this.$set(this.descImageCheck, index, !this.descImageCheck[index])
      } else if (type === 4) {
        this.$set(this.skuDetail1Check, index, !this.skuDetail1Check[index])
      } else if (type === 5) {
        this.$set(this.skuDetail2Check, index, !this.skuDetail2Check[index])
      }
    },
    async goodsChange() {
      let goodsDetailsJson = JSON.stringify(this.goodsDetails)
      console.log(goodsDetailsJson, this.goodsDetails)
      let sysGoodsId = this.goodsDetails.id
      let description = this.goodsDetails.description || ''
      let title = this.goodsDetails.title || ''
      let width = this.goodsDetails.width || '0'
      let height = this.goodsDetails.height || '0'
      let long = this.goodsDetails.long || '0'
      let weight = this.goodsDetails.weight || '0'
      let itemmodels = JSON.stringify(this.goodsDetails.itemmodels)
      itemmodels = itemmodels.replaceAll(/"id":[0-9]*,/ig, '')
      itemmodels = itemmodels.replaceAll(/"sku":"(((?!",).)*)",/ig, '')
      itemmodels = itemmodels.replaceAll('"sku_spec1":', '"skuSpec1":')
      itemmodels = itemmodels.replaceAll('"sku_spec2":', '"skuSpec2":')
      itemmodels = itemmodels.replaceAll('"sku_image":', '"skuImage":')
      itemmodels = itemmodels.replaceAll('"sku_sn":', '"skuSn":')
      itemmodels = itemmodels.replaceAll(/"sku_price":"(((?!",).)*)",/ig, '"skuPrice":$1,')
      itemmodels = itemmodels.replaceAll('"sku_price":', '"skuPrice":')
      itemmodels = itemmodels.replaceAll(/"sku_stock":([0-9]*),/ig, '"skuStock":"$1",')
      itemmodels = itemmodels.replaceAll('"sku_stock":', '"skuStock":')
      let updateGoodsJson = await this.$commodityService.updateGoods({
        sysGoodsId,
        description,
        title,
        width,
        height,
        long,
        weight
      })
      let updateGoodsRes = JSON.parse(updateGoodsJson)
      if (updateGoodsRes.code === 200) {
        let andUpdateSkuJson = await this.$commodityService.saveAndUpdateSkuDatas(sysGoodsId, itemmodels)
        let andUpdateSkuRes = JSON.parse(andUpdateSkuJson)
        if (andUpdateSkuRes.code === 200) {
          let descImages = [...this.goodsDetails.descImages.map(i => {
            return { id: i.id + '', imageUrl: i.img }
          })]
          let images = [...this.goodsDetails.images1.map(i => {
            return { id: i.id + '', imageUrl: i.img }
          })]
          let sizeImageUrl = this.goodsDetails.sizeImages[0] && this.goodsDetails.sizeImages[0].img || ''
          let skuImages = []
          let length = this.goodsDetails.spec_image.length >= this.lodSpecImage.length && this.goodsDetails.spec_image.length || this.lodSpecImage.length
          for (let i = 0; i < length; i++) {
            let oldImageUrl = this.lodSpecImage[i] || ''
            let imageUrl = this.goodsDetails.spec_image[i] || ''
            skuImages.push({ oldImageUrl, imageUrl })
          }
          let updateGoodsAllImageRes = await this.$commodityService.updateGoodsAllImage({
            sysGoodsId,
            descImages,
            images,
            sizeImageUrl
          })
          this.$message.success('保存成功')
          this.$emit('goodsEditorCancel', { sysGoodsId, title, description, width, height, long, weight })
        } else {
          this.$message.error('保存失败')
        }
      } else {
        this.$message.error('保存失败')
      }
    },
    handleClick(val) {
    }
  }
}
</script>

<style scoped lang="less">
.updateImgBox {
  position: fixed;
  z-index: 99999999;
  display: flex;
  flex-flow: column;
  top: 2vh;
  left: 5vw;
  background: #FFF;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 15px #666;
  min-height: 648px;
  height: 96vh;
  width: 90vw;

  .updateImg {
    flex: 1;
    width: 100%;
  }

  .updateImgBut {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;

  }
}

.goods-edit-details {
  padding: 0;
  margin: 0;

  .edit-details-box {
    min-height: 400px;
    max-height: 78vh;
    overflow: auto;
  }

  .goods-detail-block {
    background: #F2F5FB;
    padding: 5px 0;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .keepRight {
      width: 90px;
      text-align: right;
      margin-right: 5px;
    }

    .keepTop {
      padding-top: 5px;
      align-self: flex-start;
    }

    .keepRight-flex {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 5px 0;
    }

    .goods-detail-box {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }

    .goods-image-detail {
      cursor: pointer;
      width: 162px;
      height: 162px;
      background: #FFF;
      position: relative;
      display: flex;
      border: 1px solid #F2F5FB;
      margin-right: 5px;
      margin-bottom: 5px;

      .goods-image-top-right {
        position: absolute;
        top: 10px;
        right: 10px;
      }

      .goods-image-top {
        display: none;
        position: absolute;
        top: 27px;
        right: 0;
      }

      .goods-image-footer {
        display: none;
        position: absolute;
        bottom: 0;
      }

      .footer-but {
        margin: 0;
        padding: 3px 3px;
        border-radius: 0;
      }

      &:hover {
        border-color: red;

        .goods-image-footer {
          display: block;
        }

        .goods-image-top {
          display: block;
        }
      }
    }

    .goods-image-add {
      border: 1px #999 dashed;

      .image-add {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        background: #999;
      }

      .image-add-cross {
        height: 8px;
        width: 100px;
      }

      .image-add-vertical {
        height: 100px;
        width: 8px;
      }
    }

    .spec_detail {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 5px;

      .sku_detail {
        position: relative;
        cursor: pointer;
        padding: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        border: 1px #bbb solid;
        display: flex;

        .sku_bottom_but {
          display: none;
          position: absolute;
          padding: 5px 10px;
          bottom: -1px;
          right: -1px;
        }

        &:hover {
          .sku_bottom_but {
            display: block;
          }
        }
      }

      .sku_describe_image {
        height: 80px!important;
        width: 80px!important;
      }

    }

    .ellipsis-detail {
      border: 1px #dfdfdf solid;
      padding: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      border-radius: 5px;
    }
  }
}
</style>
<style lang="less">
.goods-edit-details {
  .sku_detail {
    .el-textarea {
      .el-textarea__inner {
        line-height: 1.4 !important;
        padding: 5px;
      }
    }
  }

  .el-tabs__header {
    margin-bottom: 5px;
  }

  .el-tabs__item {
    height: 32px;
    line-height: 32px;
  }

}

.upload_new.on_new_dialog {
  border: none;

  .el-dialog__body {
    .el-upload {
      width: auto;
      height: auto;
      padding: 0;
      border: none;
    }
  }
}

.draggable_box{
  >span{
    display: flex;
    flex-flow: wrap;
    width: 100%;
  }
}
</style>

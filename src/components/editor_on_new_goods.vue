<template>
  <el-row class="editor_on_new_goods contaniner" style="margin: 0;padding: 0;min-width: 1000px;">
    <div class="nowrapBox" style="display: flex;" v-show="isNoFoldShow">
      <div class="basisInstall width_470" style="padding: 10px;">
        <div class="basisInstall-title">功能区</div>
        <div class="basisInstall-box">
          <div class="button_mini_box">
            <el-button class="button_mini" size="mini" @click="batchDealWith(1)" type="primary" disabled>收藏数据
            </el-button>
            <el-button class="button_mini" size="mini" @click="batchDealWith(2,1)" type="primary">翻译数据</el-button>
          </div>
          <el-button style="flex: 1;margin-left: 10px;" size="mini" @click="batchDealWith(3)" type="primary">批量编辑标题/描述
          </el-button>
          <el-button style="flex: 1" size="mini" @click="batchDealWith(4)" type="primary">批量添加尺寸图</el-button>
        </div>
        <div class="basisInstall-box">
          <el-button style="flex: 1" size="mini" @click="batchDealWith(5)" type="primary">一件组装数据到上新</el-button>
          <el-button style="flex: 1" size="mini" @click="batchDealWith(6)" type="primary">产品到上新</el-button>
          <el-button style="flex: 1" size="mini" @click="batchDealWith(7)" type="primary">批量删除尺寸图</el-button>
        </div>
        <div class="basisInstall-box">
          <el-button style="flex: 1" size="mini" @click="batchDealWith(8)" type="primary" disabled>收藏失败产品重试</el-button>
          <el-button style="flex: 1" size="mini" @click="batchDealWith(9)" type="primary">取消操作</el-button>
          <el-button style="flex: 1" size="mini" @click="batchDealWith(10)" type="primary">标记商品标签</el-button>
        </div>
        <div class="basisInstall-box">
          <el-button style="flex: 1" size="mini" @click="batchDealWith(11)" type="primary">翻译失败产品重试</el-button>
          <el-button style="flex: 1" size="mini" @click="batchDealWith(12)" type="primary">标题首字母大写</el-button>
          <el-button style="flex: 1" size="mini" @click="batchDealWith(13)" type="primary">取消商品标签</el-button>
        </div>
        <div class="basisInstall-box">
          <el-button style="flex: 1" size="mini" @click="batchDealWith(14)" type="primary">批量映射虾皮类目</el-button>
          <el-button style="flex: 1" size="mini" @click="batchDealWith(15)" type="primary">翻译图片</el-button>
          <el-button style="flex: 1" size="mini" @click="batchDealWith(16)" type="primary">批量设置重量/体积</el-button>
        </div>
        <div class="basisInstall-box">
          <el-button style="flex: 1" size="mini" @click="batchDealWith(17)" type="primary">批量删除</el-button>
        </div>
        <el-upload v-if="uploadImgAdd" v-show="false" style="margin-right: 10px" action="#" :drag="true"
                   :show-file-list="false" :limit="1" :auto-upload="false" :on-change="imageUpload">
          <el-button size="mini" type="primary" ref="uploadImg">选择图片</el-button>
        </el-upload>
      </div>
      <div class="basisInstall width_600" style="padding: 10px;">
        <div class="basisInstall-title">功能区</div>
        <div class="basisInstall-box" style="color: red" s>
          <div>温馨提示：</div>
          使用【翻译数据】【一键组装数据到上新】功能前，先配置以下信息
        </div>
        <div class="basisInstall-box">
          <div>标签列表：</div>
          <el-select value="" v-model="configLabel" size="mini" filterable
                     allow-create style="width: 120px;margin-right: 5px;">
            <el-option v-for="(item,index) in configLabelList" :value="item" :key="index">
              <div style="display: flex;justify-content: space-between;align-items: center">
                <div>{{ item }}</div>
                <i class="el-icon-circle-close close-right" @click.stop="deleteConfigClick(item,index)"></i>
              </div>
            </el-option>
          </el-select>
          <el-button size="mini" @click="saveConfigLabel" type="primary">保存配置信息</el-button>
          <el-button size="mini" @click="selectDescribe(0)" type="primary">选择模板</el-button>
          <el-button size="mini" @click="loginAliTranslation" type="primary">登录阿里翻译</el-button>
        </div>
        <div class="basisInstall-box">
          <div>商品描述：</div>
          <el-radio v-model="goodsDescribeRadio" :label="0">自定义+SKU描述</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="1">原描述</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="2">原描述+自定义</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="3">原描述+SKU描述</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="4">自定义</el-radio>
        </div>
        <div class="basisInstall-box">
          <div>翻译配置：</div>
          <el-checkbox v-model="translationConfig.titleChecked" size="mini">翻译标题</el-checkbox>
          <el-checkbox v-model="translationConfig.specChecked" size="mini">翻译规格信息</el-checkbox>
          <el-checkbox v-model="translationConfig.describeChecked" size="mini">翻译描述</el-checkbox>
          <el-tooltip class="item" effect="dark" content="如果选择付费翻译描述，将会产生大量扣费" placement="top">
            <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
          </el-tooltip>
        </div>
        <div class="basisInstall-box">
          <div>翻译语种：</div>
          <el-select v-model="translationConfig.languages" size="mini" style="width: 80px;" value="">
            <el-option
                v-for="item in languagesList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <div style="margin-left: 10px;">失败类型：</div>
          <el-select v-model="translationConfig.failureType" size="mini" style="width: 110px;" value="">
            <el-option :label="'全部'" :value="0"></el-option>
            <el-option :label="'文字翻译失败'" :value="1"></el-option>
            <el-option :label="'图片翻译失败'" :value="2"></el-option>
          </el-select>
          <div style="margin-left: 10px;">线程数量：</div>
          <el-input size="mini" v-model="threadNumber" style="width: 40px;margin-right: 10px;"></el-input>
          <el-checkbox v-model="filterSimplifiedChecked" size="mini">上新过滤简体数据</el-checkbox>
        </div>
        <div class="basisInstall-box">
          <div>图片类型：</div>
          <el-checkbox v-model="pictureConfig.specChecked" size="mini">翻译规格图</el-checkbox>
          <el-checkbox v-model="pictureConfig.shuffleChecked" size="mini">翻译轮播图</el-checkbox>
          <div>删除条件：</div>
          <el-checkbox v-model="pictureConfig.deleteGoodsChecked" size="mini">删除库存低于设定值的商品</el-checkbox>
          <el-input size="mini" v-model="pictureConfig.inventoryNumber" style="width: 80px;"></el-input>
        </div>
        <div class="basisInstall-box">
          <div>图片翻译：</div>
          <el-radio v-model="pictureConfig.typeRadio" :label="0">阿里免费翻译</el-radio>
          <el-radio style="margin-right: 0;" v-model="pictureConfig.typeRadio" :label="1">阿里付费翻译</el-radio>
          <el-tooltip style="margin-right: 10px;" class="item" effect="dark" content="0.06元一张图片" placement="top">
            <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
          </el-tooltip>
          <el-radio v-model="pictureConfig.typeRadio" :label="2">云图像翻译</el-radio>
          <div v-if="false && !pictureConfig.typeRadio" style="display: flex;">
            <div style="margin-left: 5px;">图片翻译检验：</div>
            <el-radio v-model="pictureConfig.checkedRadio" :label="1">检验</el-radio>
            <el-radio v-model="pictureConfig.checkedRadio" :label="0">不检验</el-radio>
          </div>
        </div>
        <div class="basisInstall-box">
          <div style="display: flex;align-items: center">
            <div>图片翻译：</div>
            <el-select v-model="translationConfig.before" size="mini" style="width: 80px;" value="">
              <el-option label="不翻译" :value="0"></el-option>
              <el-option label="中文" :value="1"></el-option>
              <el-option label="英文" :value="2"></el-option>
            </el-select>
            <div style="width: 10px;height: 1px;background-color: #333333;margin: 0 5px;"></div>
            <el-select v-model="translationConfig.after" size="mini" style="width: 80px;" value="">
              <el-option v-for="item in pictureLanguagesList" :key="item.value" :label="item.label" :value="item.value"
                         v-show="(pictureConfig.typeRadio !== 0 || translationConfig.before !==2) || item.free"
                         v-if="item.isShow.indexOf(translationConfig.before)>=0"/>
            </el-select>
          </div>
          <div v-if="!pictureConfig.typeRadio" style="display: flex;align-items: center;margin-left: 10px;">
            <div>阿里翻译账号：</div>
            <el-select class="select-right-30" v-model="aLiUsername" size="mini" style="width: 120px;" value="">
              <el-option v-for="item in aLiUsernameList" :key="item.id" :label="item.name" :value="item.name">
                <span>{{ item.name }}</span>
                <span class="span-but" @click.stop="deleteAliTranslation(item.id)">X</span>
              </el-option>
            </el-select>
            <el-button size="mini" @click="joinAliTranslation" style="margin-left: 5px">账号个人中心</el-button>
          </div>
        </div>
      </div>
      <div class="basisInstall" style="padding: 10px;">
        <div class="basisInstall-title">日志区</div>
        <div class="basisInstall-box loose">
          <div class="keepRight">商品总数：</div>
          <span style="margin-left: 5px">{{ statistics.count }}</span>
        </div>
        <div class="basisInstall-box loose">
          <div class="keepRight">收藏成功总数：</div>
          <span style="margin-left: 5px">{{ statistics.scSuccess }}</span>
        </div>
        <div class="basisInstall-box loose">
          <div class="keepRight">翻译成功总数：</div>
          <span style="margin-left: 5px">{{ statistics.fySuccess }}</span>
        </div>
      </div>
    </div>
    <u-table ref="mallTableRef" :data="mallTable" use-virtual :data-changes-scroll-top="false"
             :header-cell-style="{backgroundColor: '#f5f7fa',}" row-key="id" :border="false"
             :big-data-checkbox="true" @selection-change="handleSelectionChange" :height="isNoFoldShow && 400 || 680">
      <u-table-column align="center" type="selection" width="30"/>
      <u-table-column align="left" type="index" width="50" label="序号"/>
      <u-table-column align="left" label="主图" width="80" prop="Sales">
        <template v-slot="{ row }">
          <div style="justify-content: flex-start; display: flex">
            <img :src="row.image" style="width: 56px; height: 56px">
          </div>
        </template>
      </u-table-column>
      <u-table-column align="left" show-overflow-tooltip width="90" label="标签">
        <template v-slot="{ row }">
          <p style="white-space: normal">{{ getLabelName(row.sys_label_id) }}</p>
        </template>
      </u-table-column>
      <u-table-column align="left" label="商品编码" width="120" :show-overflow-tooltip="true">
        <template v-slot="{ row }">
          <p style="white-space: normal;cursor: pointer" @click.stop="goToGoods(row)">{{ row.goods_id }}</p>
        </template>
      </u-table-column>
      <u-table-column align="left" label="采购来源" width="80">
        <template v-slot="{ row }">
          <p style="white-space: normal;overflow: hidden">{{ sourceObj[row.source + ''] }}</p>
        </template>
      </u-table-column>
      <u-table-column align="left" label="标题" width="140">
        <template v-slot="{ row }">
          <div class="goodsTableLine" style="height: 80px">
            {{ row.title }}
          </div>
        </template>
      </u-table-column>
      <u-table-column align="left" :show-overflow-tooltip="true" label="类目" min-width="80">
        <template v-slot="{ row }">{{ getCategoty(row) || '未匹配到类目' }}</template>
      </u-table-column>
      <u-table-column align="left" label="价格" prop="price" width="70"/>
      <u-table-column align="left" label="重量(kg)" width="80">
        <template v-slot="{ row }">
          <el-input v-model="row.weight" size="mini"/>
        </template>
      </u-table-column>
      <u-table-column align="left" label="体积" width="120">
        <template v-slot="{ row }">
          <ul>
            <li style="display: flex;align-items: center;">
              <p style="white-space: nowrap;margin-right: 5px;">长(cm) </p>
              <el-input v-model="row.long" size="mini"/>
            </li>
            <li style="display: flex;align-items: center;">
              <p style="white-space: nowrap;padding-right: 5px;">宽(cm) </p>
              <el-input v-model="row.width" size="mini"/>
            </li>
            <li style="display: flex;align-items: center;">
              <p style="white-space: nowrap;padding-right: 5px;">高(cm) </p>
              <el-input v-model="row.height" size="mini"/>
            </li>
          </ul>
        </template>
      </u-table-column>
      <u-table-column align="left" label="库存" width="80" prop="stock"/>
      <u-table-column align="left" label="操作" width="140">
        <template v-slot="scope">
          <div style="display: flex;align-items: center;">
            <el-button size="mini" @click="updateGoodsEdit(scope.row)">删除</el-button>
            <el-button size="mini" @click="updateGoodsEdit(scope.row,1)" type="primary">编辑</el-button>
          </div>
        </template>
      </u-table-column>
      <u-table-column align="left" label="操作状态">
        <template v-slot="{row}">
          <div class="goodsTableLine" style="height: 80px">
            {{ row.operation_type || '' }}
          </div>
        </template>
      </u-table-column>
    </u-table>
    <div class="on_new_dialog">
      <el-dialog title="商品编辑" width="1000px" top="8vh" :close-on-click-modal="false"
                 :close-on-press-escape="false" :modal="false" :visible.sync="goodsEditorVisible">
        <goods-edit-details v-if="goodsEditorVisible" :goodsEditor="goodsEditor"
                            @goodsEditorCancel="goodsEditorCancel"></goods-edit-details>
      </el-dialog>
      <el-dialog title="编辑标题描述" width="620px" :close-on-click-modal="false" :modal="false"
                 :visible.sync="titleDescribeVisible">
        <div class="watermark_dialog">
          <div class="on_new_dialog_box">
            <div class="keepRight" style="width: 60px;">标签：</div>
            <el-radio v-model="titleDescribeTypeRadio" :label="0" size="mini">编辑标题</el-radio>
            <el-radio v-model="titleDescribeTypeRadio" :label="1" size="mini">编辑描述</el-radio>
          </div>
          <div v-if="titleDescribeTypeRadio === 1" class="on_new_dialog_box">
            <div class="keepRight" style="width: 60px;">商品描述：</div>
            <el-radio v-model="titleGoodsDescribeRadio" :label="0">自定义+SKU描述</el-radio>
            <el-radio v-model="titleGoodsDescribeRadio" :label="1">原描述</el-radio>
            <el-radio v-model="titleGoodsDescribeRadio" :label="2">原描述+自定义</el-radio>
            <el-radio v-model="titleGoodsDescribeRadio" :label="3">自定义</el-radio>
            <el-button size="mini" @click="selectDescribe(0)" type="primary">选择模板</el-button>
          </div>
          <div class="on_new_dialog_box" style="margin: 10px 0;">
            <div class="keepRight" style="width: 60px;">关键词：</div>
            <el-input type="textarea" :rows="6" resize="none" style="width: 100%" size="mini"
                      v-model="titleDescribeKey" placeholder="请输入关键词，每个单词以逗号','隔开">
            </el-input>
          </div>
          <div class="on_new_dialog_box">
            <div class="keepRight" style="width: 50px;"></div>
            <el-radio v-model="titleDescribeHandleRadio" :label="0" size="mini">删除关键词</el-radio>
            <el-radio v-model="titleDescribeHandleRadio" :label="1" size="mini">添加到标题/描述前</el-radio>
            <el-radio v-model="titleDescribeHandleRadio" :label="2" size="mini">添加到标题/描述后</el-radio>
            <el-radio v-model="titleDescribeHandleRadio" :label="3" size="mini">替换标题</el-radio>
            <el-radio v-model="titleDescribeHandleRadio" :label="4" size="mini" style="margin-right: 0">替换关键词</el-radio>
            <el-tooltip class="item" effect="dark" content="原词与新词间用';'隔开，需替换多个关键词时用','间隔" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"/></el-button>
            </el-tooltip>
          </div>
          <div style="display:flex;justify-content: space-evenly;margin: 15px 0;">
            <el-button size="mini" @click="titleDescribeSet" type="primary">确定</el-button>
            <el-button size="mini" @click="titleDescribeKey = ''; titleDescribeVisible = false">取消</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="描述模板" width="500px" :close-on-click-modal="false" :modal="false"
                 :visible.sync="describeVisible">
        <div class="watermark_dialog">
          <div class="on_new_dialog_box">
            <div style="display: flex;align-items: center;">
              <div>标签：</div>
              <el-select size="mini" style="width: 120px;" v-model="describeConfigId" @change="" value="">
                <el-option v-for="(item,index) in describeLabelList" :key="index" :label="item.lable" :value="item.id"/>
              </el-select>
            </div>
            <div style="display: flex;align-items: center;margin-left: 15px;">
              新增标签：
              <el-input size="mini" v-model="describeConfig.tag" style="width: 120px;"></el-input>
            </div>
          </div>
          <div class="on_new_dialog_box">
            <div style="white-space: nowrap">描述：</div>
            <el-input type="textarea" :rows="6" resize="none" style="width: 100%" placeholder=""
                      size="mini" v-model="describeConfig.text"></el-input>
          </div>
          <div style="display:flex;justify-content: space-evenly;margin-top: 15px;">
            <el-button size="mini" @click="selectDescribe(1)" type="primary">保存</el-button>
            <el-button size="mini" @click="selectDescribe(2)">删除</el-button>
            <el-button size="mini" @click="selectDescribe(3)" type="primary">确定</el-button>
            <el-button size="mini" @click="selectDescribe(4)">取消</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="商品标签" width="300px" top="25vh" :close-on-click-modal="false" :modal="false"
                 :visible.sync="goodsTagVisible">
        <goodsLabel v-if="goodsTagVisible" :goods-table-select="mallTableSelect" @goodsTagChange="goodsTagChange"/>
      </el-dialog>
      <el-dialog title="类目映射" width="700px" top="25vh" :close-on-click-modal="false" :modal="false"
                 :visible.sync="categoryVisible">
        <categoryMapping v-if="categoryVisible" :goods-current="{}" :mall-list="[]"
                         @categoryChange="categoryChange"/>
      </el-dialog>
      <el-dialog title="设置商品重量和体积" width="300px" top="25vh" :close-on-click-modal="false" :modal="false"
                 :visible.sync="goodsSizeVisible">
        <goods-size v-if="goodsSizeVisible" @goodsSizeChange="goodsSizeChange"/>
      </el-dialog>
    </div>
  </el-row>
</template>

<script>
import { source, sourceObj } from '../views/product-put-on/components/collection-platformId'
import goodsEditDetails from './goods-edit-details'
import categoryMapping from './category-mapping'
import goodsLabel from './goods-label'
import goodsSize from './goods-size'
import { batchOperation, getGoodsUrl, randomWord, selfAliYunTransImage, terminateThread } from '../util/util'

export default {
  name: 'editor_on_new_goods',
  data() {
    return {
      isNoFoldShow: true, //折叠
      mallTableSelect: [], //商品选择列表
      categoryList: {},
      //描述
      describeVisible: false,
      describeConfig: {
        describe: '',
        text: '',
        lable: '',
        tag: ''
      },
      describeConfigId: '',
      describeConfigText: '',
      describeLabelList: [],
      //标题-描述
      titleDescribeVisible: false,
      titleDescribeKey: '',
      titleDescribeTypeRadio: 0,
      titleGoodsDescribeRadio: 0,
      titleDescribeHandleRadio: 1,
      // 数据统计
      statistics: {
        count: 0,
        scSuccess: 0,
        fySuccess: 0
      },
      goodsDescribeRadio: 1,
      //翻译账户
      aLiUsername: '',
      aLiUsernameList: [],
      //翻译
      translationConfig: {
        titleChecked: true,
        describeChecked: true,
        specChecked: true,
        languages: 'th', // 翻译语种
        failureType: 1,  // 失败类型
        before: 0,  // 翻译前
        after: ''  // 翻译后
      },  // 文字
      pictureConfig: {
        specChecked: true,
        shuffleChecked: true,
        deleteGoodsChecked: false,
        inventoryNumber: '10', // 翻译语种
        typeRadio: 0, //单选
        checkedRadio: 0 //单选
      },  // 图片
      languagesList: [
        {
          label: '泰语',
          value: 'th'
        }, {
          label: '越南语',
          value: 'vi'
        }, {
          label: '英文',
          value: 'en'
        }, {
          label: '繁体',
          value: 'zh-tw'
        }, {
          label: '中文',
          value: 'zh'
        }, {
          label: '印尼语',
          value: 'id'
        }, {
          label: '马来语',
          value: 'ms'
        }, {
          label: '波兰语',
          value: 'pl'
        }, {
          label: '不翻译',
          value: 'no'
        }],
      pictureLanguagesList: [
        {
          label: '英文',
          isShow: '1',
          value: 'en'
        }, {
          label: '中文',
          isShow: '2',
          free: true,
          value: 'zh'
        }, {
          label: '繁体',
          isShow: '1,2',
          value: 'zh-TW'
        }, {
          label: '泰语',
          isShow: '1,2',
          value: 'th'
        }, {
          label: '印尼语',
          isShow: '1,2',
          value: 'id'
        }, {
          label: '马来语',
          isShow: '1',
          value: 'ms'
        }, {
          label: '越南语',
          isShow: '1,2',
          value: 'vi'
        }, {
          label: '葡萄牙语',
          isShow: '1,2',
          free: true,
          value: 'pt'
        }, {
          label: '西班牙语',
          isShow: '1,2',
          free: true,
          value: 'es'
        }, {
          label: '法语',
          isShow: '2',
          value: 'fr'
        }],
      filterSimplifiedChecked: false, //过滤简体
      threadNumber: '5', // 线程数量
      labelList: [],
      sourceObj: null,
      source: null,
      userInfo: null,
      goodsEditorVisible: false,
      goodsEditor: null,
      isTranslationText: true,
      uploadImgAdd: false,
      // 弹窗
      goodsTagVisible: false,
      categoryVisible: false,
      goodsSizeVisible: false,
      configLabelList: [],
      configLabel: ''

    }
  },
  props: {
    mallTable: {
      type: Array,
      default: []
    }
  },
  watch: {
    mallTable: {
      handler(val) {
        // console.log(val)
      },
      deep: true
    },
    describeConfigId(val) {
      let item = this.describeLabelList.filter(i => i && i.id === val)[0]
      this.describeConfig.text = item && item.description || ''
      this.describeConfig.describe = item && item.description || ''
      this.describeConfig.lable = item && item.lable || ''
    },
    categoryList: {
      handler(val) {
        console.log(val)
      },
      deep: true
    },
    goodsDescribeRadio(val) {
      this.translationConfig.describeChecked = val > 0 && val < 4
    },
    configLabel(val) {
      this.setConfigData(val)
    }
  },
  components: { goodsEditDetails, categoryMapping, goodsLabel, goodsSize },
  computed: {
    // 获取标签名
    getLabelName() {
      return function(id, isTrue) {
        const labelName = this.labelList.find(item => {
          return item.id === id + ''
        })
        isTrue ? this.currentLabelName = labelName.label_name : ''
        return labelName?.label_name || ''
      }
    },
    getCategoty() {
      return function(row) {
        return this.categoryList[row.category_id]
      }
    }
  },
  created() {
    this.sourceObj = sourceObj // 采购映射
    this.source = source // 采购来源
    this.getLabelList()
    this.getValueFormat()
  },
  async mounted() {
    let getLabelsRes = await this.$api.getLabels()
    let getLabelsData = getLabelsRes.data
    if (getLabelsData.code === 200) {
      this.configLabelList = getLabelsData.data
    }
    let userJson = await this.$appConfig.getUserConfig()
    let userInfo = await this.$appConfig.getUserInfo()
    this.userInfo = Object.assign(JSON.parse(userJson), userInfo)
    console.log('this.userInfo', this.userInfo)
    this.statistics.count = this.mallTable.length
    await this.showCategory()
    let buyerList = await this.$api.getBuyerList()
    buyerList.data.data.forEach(item => {
      if (item.type == 99 || item.type == -1) {
        this.aLiUsernameList.push(item)
      }
    })
    this.$refs.mallTableRef.toggleAllSelection()
  },
  methods: {
    // 开启任务
    async batchDealWith(type, data) {
      console.log('type ===', type)
      if (this.mallTableSelect.length < 1) {
        this.$message.error('请选择一个商品信息')
        return false
      }
      if (type === 1) {
      } else if (type === 2) {
        await this.translationPrepare(1)
      } else if (type === 3) {
        this.titleDescribeVisible = true
      } else if (type === 4) {
        this.uploadImgAdd = true
        setTimeout(() => {
          this.$refs['uploadImg'].$el.click()
        }, 100)
      } else if (type === 5) {
        await this.translationPrepare(1)
        await this.batchDealWith(6)
      } else if (type === 6) {
        let ids = [...this.mallTableSelect.map(i => {
          if (this.filterSimplifiedChecked) {
            if (i.language !== 'zh-Hans') {
              return i.id
            }
          } else {
            return i.id
          }
        })]
        this.$BaseUtilService.gotoUploadTab('gotoUpload', ids)
      } else if (type === 7) {
        for (const i of this.mallTableSelect) {
          let index = this.mallTable.findIndex(son => i.id === son.id)
          if (i.size_image_id) {
            let deleteGoodsImageJson = await this.$commodityService.deleteGoodsImage(2, i.id, '0')
            let deleteGoodsImage = JSON.parse(deleteGoodsImageJson)
            if (deleteGoodsImage.code === 200) {
              this.$set(this.mallTable[index], 'operation_type', '尺寸图删除成功')
            } else {
              this.$set(this.mallTable[index], 'operation_type', '尺寸图删除失败')
            }
          } else {
            this.$set(this.mallTable[index], 'operation_type', '无尺寸图可删除')
          }
        }
      } else if (type === 8) {

      } else if (type === 9) {
        terminateThread()
      } else if (type === 10) {
        this.goodsTagVisible = true
      } else if (type === 11) {
        await this.translationPrepare(3)
      } else if (type === 12) {
        for (const i of this.mallTableSelect) {
          let titleList = [...i.title]
          titleList[0] = titleList[0] && titleList[0].toLocaleUpperCase() || ''
          let param = {
            sysGoodsId: i.id,
            title: titleList.join('')
          }
          let collectGoodsJson = await this.$commodityService.updateCollectGoodsInfo(param)
          let collectGoodsRes = JSON.parse(collectGoodsJson)
          let index = this.mallTable.findIndex(son => i.id === son.id)
          if (collectGoodsRes.code === 200) {
            this.$set(this.mallTable[index], 'title', titleList.join(''))
            this.$set(this.mallTable[index], 'operation_type', '标题首字母大写修改成功')
          } else {
            this.$set(this.mallTable[index], 'operation_type', '标题首字母大写修改失败')
          }
        }
      } else if (type === 13) {
        let ids = [...this.mallTableSelect.map(i => i.id)]
        let addGoodsToTagJson = await this.$commodityService.addGoodsToTag('0', ids)
        console.log('addGoodsToTagJson', addGoodsToTagJson)
        let addGoodsToTagRes = JSON.parse(addGoodsToTagJson)
        this.mallTableSelect.forEach(item => {
          let index = this.mallTable.findIndex(son => item.id === son.id)
          if (addGoodsToTagRes.code === 200) {
            this.$set(this.mallTable[index], 'sys_label_id', '0')
            this.$set(this.mallTable[index], 'operation_type', '商品标签删除成功')
          } else {
            this.$set(this.mallTable[index], 'operation_type', '商品标签删除失败')
          }
        })
      } else if (type === 14) {
        this.categoryVisible = true
      } else if (type === 15) {
        await this.translationPrepare(1)
      } else if (type === 16) {
        this.goodsSizeVisible = true
      } else if (type === 17) {
        let mallList = this.mallTableSelect
        if (this.pictureConfig.deleteGoodsChecked) {
          mallList = []
          this.mallTableSelect.forEach(item => {
            if (item.stock < this.pictureConfig.inventoryNumber) {
              mallList.push(item)
            }
          })
        }
        let length = mallList.length
        this.$confirm('共选中' + length + '个商品是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          mallList.forEach(item => {
            this.updateGoodsEdit(item)
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    //商品编辑控制
    async updateGoodsEdit(item, type) {
      if (type) {
        this.goodsEditor = item
        this.goodsEditorVisible = true
      } else {
        let json = await this.$commodityService.deleteCollectGoodsInfo([item.id])
        let index = this.mallTable.findIndex(i => i.id === item.id)
        let index1 = this.mallTableSelect.findIndex(i => i.id === item.id)
        this.mallTable.splice(index, 1)
        this.mallTableSelect.splice(index1, 1)
      }
    },
    async translationPrepare(type) {
      let goodsList = []
      this.mallTableSelect.forEach(item => {
        if (type === 3 && item.operation_type.includes('翻译失败')) {
          goodsList.push(item)
        } else if (item.language.toLocaleUpperCase() !== this.translationConfig.languages.toLocaleUpperCase()) {
          if (item.language !== 'zh-Hans' && this.translationConfig.languages !== 'zh') {
            goodsList.push(item)
          }
        }
      })
      if (type === 2) {
        this.isTranslationText = false
      }
      let res = await batchOperation(goodsList, this.translationDate, parseInt(this.threadNumber))
      this.isTranslationText = true
      return
    },
    async titleDescribeSet() {
      let params = []
      this.mallTableSelect.forEach(item => {
        if (item.language.toLocaleUpperCase() !== this.translationConfig.languages.toLocaleUpperCase()) {
          params.push(item)
        }
      })
      let res = await batchOperation(params, this.titleDescribeUpdate, this.threadNumber)
    },
    async titleDescribeUpdate(item, count = { count: 1 }) {
      let index = this.mallTable.findIndex(i => i.id === item.id)
      this.$set(this.mallTable[index], 'operation_type', '正在更新...')
      try {
        let neededTranslateInfoJson = await this.$commodityService.getNeededTranslateInfoV2(item.id)
        let neededTranslateInfoData = JSON.parse(neededTranslateInfoJson) && JSON.parse(neededTranslateInfoJson).data
        let tempText = ''
        if (this.titleDescribeTypeRadio) {
          let text = this.describeConfig.text || ''
          if (this.titleGoodsDescribeRadio === 0) {
            let tier_variation = neededTranslateInfoData.tier_variation
            let spec1List = tier_variation[tier_variation.spec1].join('\n')
            let spec2List = tier_variation[tier_variation.spec2].join('\n')
            tempText = text + '\n' + spec1List + '\n' + spec2List
          } else if (this.titleGoodsDescribeRadio === 1) {
            tempText = neededTranslateInfoData.description
          } else if (this.titleGoodsDescribeRadio === 2) {
            tempText = neededTranslateInfoData.description + text
          } else if (this.titleGoodsDescribeRadio === 3) {
            tempText = text
          }
        } else {
          tempText = neededTranslateInfoData.title
        }
        let keyList = this.titleDescribeKey.split(',')
        if (this.titleDescribeHandleRadio === 0) {
          keyList.forEach(i => {
            tempText = tempText.replaceAll(i, '')
          })
        } else if (this.titleDescribeHandleRadio === 1 || this.titleDescribeHandleRadio === 2) {
          let keyStr = keyList.join(' ')
          tempText = this.titleDescribeHandleRadio === 1 ? (keyStr + ' ' + tempText) : (tempText + ' ' + keyStr)
        } else if (this.titleDescribeHandleRadio === 3) {
          if (this.titleDescribeTypeRadio) {
            this.$message.error('此次操作为编辑商品描述')
            return false
          }
        } else if (this.titleDescribeHandleRadio === 4) {
          keyList.forEach(i => {
            let key = i.split(';')
            let oldStr = key[0] || ''
            let newStr = key[1] || ''
            tempText = tempText.replaceAll(oldStr, newStr)
          })
        }
        let param = {
          sysGoodsId: item.id
        }
        if (this.titleDescribeTypeRadio) {
          param.description = tempText
        } else {
          param.title = tempText
        }
        console.log('updateCollectGoodsInfo - param', param)
        let collectGoods = await this.$commodityService.updateCollectGoodsInfo(param)
        console.log('collectGoods', collectGoods)
        if (param.title) {
          this.$set(this.mallTable[index], 'title', param.title)
        }
        this.$set(this.mallTable[index], 'operation_type', '更新成功')
      } catch (e) {
        this.$set(this.mallTable[index], 'operation_type', '更新失败')
        console.log('titleDescribeUpdate', e)
      } finally {
        count.count--
      }
    },
    async loginAliTranslation() {
      let login = await this.$buyerAccountService.loginAliTranslation()
      let params = {
        name: login.name,
        password: '',
        type: 99,
        site: login.country || '',
        loginInfo: login.login_info,
        ua: login.ua,
        cachePath: login.cache_path,
        proxyId: ''
      }
      const { data } = await this.$api.upLoadBuyAccount(params)
      if (data.code === 200) {
        this.aLiUsername = params.name
        let index = this.aLiUsernameList.findIndex(i => i.name === params.name)
        if (index >= 0) {
          this.aLiUsernameList[index] = params
        } else {
          this.aLiUsernameList.push(params)
        }
      } else {
        this.$message.error('阿里翻译账号上报失败')
      }
    },
    async joinAliTranslation() {
      if (!this.aLiUsername) {
        this.$message.error('请选择一个阿里翻译账号')
        return
      }
      let index = this.aLiUsernameList.findIndex(i => i.name === this.aLiUsername)
      let aLiUsername = this.aLiUsernameList[index]
      let param = {
        type: aLiUsername.type,
        name: aLiUsername.name,
        login_info: JSON.stringify(aLiUsername.login_info),
        cache_path: aLiUsername.cache_path || '',
        ua: aLiUsername.ua || '',
        loginCookies: aLiUsername.login_info
      }
      console.log(param)
      let data = await this.$buyerAccountService.aliTranslateCenter(param)
      console.log(data)
    },
    async deleteAliTranslation(id) {
      let index = this.aLiUsernameList.findIndex(i => i.id === id)
      let params = {
        name: this.aLiUsernameList[index].name,
        type: this.aLiUsernameList[index].type,
        site: this.aLiUsernameList[index].site
      }
      let { data } = await this.$api.deleteBuyAccount(params)
      if (data.code === 200) {
        this.aLiUsername = ''
        this.aLiUsernameList.splice(index, 1)
      } else {
        this.$message.error('阿里翻译账号删除失败')
      }
    },
    async selectDescribe(type) {
      if (type === 0) {
        let descriptionTemplateListJson = await this.$commodityService.descriptionTemplateList()
        let descriptionTemplateListRes = JSON.parse(descriptionTemplateListJson)
        this.describeLabelList = descriptionTemplateListRes.data || []
        if (this.describeConfigId) {
          let item = this.describeLabelList.filter(i => i && i.id === this.describeConfigId)[0]
          this.describeConfig.text = item && item.description || this.describeConfig.text
          this.describeConfig.describe = item && item.description || this.describeConfig.describe
          this.describeConfig.lable = item && item.lable || ''
        } else {
          this.describeConfigId = this.describeLabelList[0] && this.describeLabelList[0].id || ''
        }
        this.describeVisible = true
      } else {
        if (type === 1) {
          let label = this.describeConfig.tag || this.describeConfig.lable
          let descriptionTemplate = await this.$commodityService.uploadDescriptionTemplate(label, this.describeConfig.text)
          let data = JSON.parse(descriptionTemplate)
          this.describeConfig.tag = ''
          this.describeConfigId = parseInt(data.data)
          this.describeConfig.describe = this.describeConfig.text
        } else if (type === 2) {
          let resJson = await this.$commodityService.deleteDescriptionTemplate(this.describeConfigId)
          let res = JSON.parse(resJson)
          if (res.code === 200) {
            this.describeConfigId = ''
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        } else if (type === 3) {
          this.describeConfig.describe = this.describeConfig.text
        } else if (type === 4) {
          this.describeConfig.text = this.describeConfig.describe
        }
        this.describeVisible = false
      }
    },
    async translationDate(item, count = { count: 1 }) {
      let index = this.mallTable.findIndex(i => i.id === item.id)
      this.$set(this.mallTable[index], 'operation_type', '正在翻译...')
      try {
        let success = true
        if (this.isTranslationText && item.language.toLocaleUpperCase() !== this.translationConfig.languages) {
          success = await this.translationText(item, index)
        }
        if (this.translationConfig.before && (this.pictureConfig.shuffleChecked || this.pictureConfig.specChecked)) {
          let aLiUsernameIndex = this.aLiUsernameList.findIndex(i => i.name === this.aLiUsername)
          let aliAccount = this.aLiUsernameList[aLiUsernameIndex]
          if (!aliAccount && this.pictureConfig.typeRadio === 0) {
            this.$message.error('阿里图片翻译账户尚未登陆')
            return false
          }
          success = await this.translationPicture(item, index)
        }
        ++this.statistics.fySuccess
        this.$set(this.mallTable[index], 'operation_type', success && '翻译成功' || '翻译失败')
      } catch (e) {
        this.$set(this.mallTable[index], 'operation_type', '翻译失败')
        console.log(e)
      } finally {
        count.count--
      }
    },
    translationText(item, index) {
      return new Promise(async resolve => {
        console.log('getNeededTranslateInfoV2 - param', item)
        let success = true
        try {
          let neededTranslateInfoJson = await this.$commodityService.getNeededTranslateInfoV2(item.id)
          let neededTranslateInfoData = JSON.parse(neededTranslateInfoJson) && JSON.parse(neededTranslateInfoJson).data
          // console.log(neededTranslateInfoData)
          let title = this.translationConfig.titleChecked && neededTranslateInfoData.title || ''
          let description = this.translationConfig.describeChecked && neededTranslateInfoData.description || ''
          let spec1 = this.translationConfig.specChecked && neededTranslateInfoData.spec1 || ''
          let spec2 = this.translationConfig.specChecked && neededTranslateInfoData.spec2 || ''
          let fromLanguage = item.language
          let toLanguage = this.translationConfig.languages
          let param = {
            sysGoodsId: item.id,
            uuid: this.userInfo.child_id,
            language: toLanguage,
            shortTitle: '',
            spec1: spec1,
            spec2: spec2
          }
          let itemmodelsJson = JSON.stringify(neededTranslateInfoData.itemmodels)
          console.log(this.userInfo.translate_set)
          if (this.userInfo.translate_set == '2') {
            let translationJson1 = title && await this.$translationBridgeService.getGoogleTransResult([title], fromLanguage, toLanguage)
            console.log('translationJson1', translationJson1)
            param.title = translationJson1 && translationJson1.Data[0] && translationJson1.Data[0].DstText || neededTranslateInfoData.title
            let translationJson2 = description && await this.$translationBridgeService.getGoogleTransResult([description], fromLanguage, toLanguage)
            console.log('translationJson2', translationJson2)
            param.description = translationJson2 && translationJson2.Data[0] && translationJson2.Data[0].DstText || neededTranslateInfoData.description
            param.spec1 = neededTranslateInfoData.spec1
            param.spec2 = neededTranslateInfoData.spec2
            let tier_variation = neededTranslateInfoData.tier_variation
            console.log(neededTranslateInfoData, param)
            if (this.translationConfig.specChecked) {
              let spec1List = tier_variation[tier_variation.spec1].join('<><>')
              let spec2List = tier_variation[tier_variation.spec2].join('<><>')
              let spec1ListJson = await this.$translationBridgeService.getGoogleTransResult([spec1List], fromLanguage, toLanguage)
              let spec2ListJson = await this.$translationBridgeService.getGoogleTransResult([spec2List], fromLanguage, toLanguage)
              // console.log(spec1ListJson, spec2ListJson)
              if (spec1ListJson.Code === 0 && spec2ListJson.Code === 0) {
                let spec1ListDst = spec1ListJson.Data && spec1ListJson.Data[0] && spec1ListJson.Data[0].DstText.split('<><>')
                let spec1ListSrc = spec1ListJson.Data && spec1ListJson.Data[0] && spec1ListJson.Data[0].SrcText.split('<><>')
                let spec1List = this.getArraySrcLengthSort(spec1ListSrc)
                console.log('spec1List', spec1ListDst, spec1List)
                spec1List.forEach(item => {
                  itemmodelsJson = itemmodelsJson.replaceAll(spec1ListSrc[item], spec1ListDst[item])
                })
                let spec2ListDst = spec2ListJson.Data && spec2ListJson.Data[0] && spec2ListJson.Data[0].DstText.split('<><>')
                let spec2ListSrc = spec2ListJson.Data && spec2ListJson.Data[0] && spec2ListJson.Data[0].SrcText.split('<><>')
                let spec2List = this.getArraySrcLengthSort(spec2ListSrc)
                console.log('spec2List', spec2ListDst, spec2List)
                spec2List.forEach(item => {
                  itemmodelsJson = itemmodelsJson.replaceAll(spec2ListSrc[item], spec2ListDst[item])
                })
              } else {
                //谷歌翻译失败
              }

            }
          } else {

          }
          itemmodelsJson = itemmodelsJson.replaceAll('"sku_spec1":', '"spec1":')
          itemmodelsJson = itemmodelsJson.replaceAll('"sku_spec2":', '"spec2":')
          itemmodelsJson = itemmodelsJson.replaceAll('"sku_sn":', '"skuSn":')
          itemmodelsJson = itemmodelsJson.replaceAll(/"id":[0-9]*,/ig, '')
          itemmodelsJson = itemmodelsJson.replaceAll(/"selection_id":[0-9]*,/ig, '')
          itemmodelsJson = itemmodelsJson.replaceAll(/"skuId":([0-9]*),/ig, '"skuId":"$1",')
          param['skuSpecs'] = itemmodelsJson
          param.language = toLanguage === 'zh' && 'zh-Hans' || toLanguage === 'zh-tw' && 'zh-Hant' || toLanguage
          console.log('saveTranslationData - param', param)
          let translationDataJson = await this.$commodityService.saveTranslationData(param)
          let translationDataRes = JSON.parse(translationDataJson)
          console.log('saveTranslationData - json', translationDataJson)
          if (translationDataRes.code === 200) {
            let temp = Object.assign(this.mallTable[index], translationDataRes.data, { operation_type: '翻译成功' })
            this.$set(this.mallTable, index, temp)
          } else {
            success = false
            this.$set(this.mallTable[index], 'operation_type', '翻译失败')
          }
        } catch (e) {
          success = false
          this.$set(this.mallTable[index], 'operation_type', '翻译失败')
          console.log(e)
        } finally {
          resolve(success)
        }
      })
    },
    translationPicture(item, index) {
      return new Promise(async resolve => {
        let success = true
        this.$set(this.mallTable[index], 'operation_type', '正在获取商品图...')
        try {
          let neededTranslateInfoJson = await this.$commodityService.getSpuDetailByIdV2(item.id)
          let neededTranslateInfoData = JSON.parse(neededTranslateInfoJson) && JSON.parse(neededTranslateInfoJson).data
          console.log('getSpuDetailByIdV2 - data', neededTranslateInfoData)
          let aLiUsernameIndex = this.aLiUsernameList.findIndex(i => i.name === this.aLiUsername)
          let aliAccount = this.aLiUsernameList[aLiUsernameIndex]
          console.log('aliAccount', aliAccount)
          if (this.pictureConfig.shuffleChecked) {
            let image1List = neededTranslateInfoData.images1 || [] //轮播图
            let image1ListLength = image1List.length
            for (let i = 0; i < image1ListLength; i++) {
              let son = image1List[i]
              let imageData = ''
              this.$set(this.mallTable[index], 'operation_type', `正在翻译轮播图(${(i + 1)}/${image1ListLength})`)
              if (this.pictureConfig.typeRadio === 0) {
                let fromLa = this.translationConfig.before === 1 && 'zh' || 'en'
                const result = await selfAliYunTransImage(son, {
                  fromLanguage: fromLa,
                  toLanguage: this.translationConfig.after
                }, aliAccount, this)
                if (result) {
                  imageData = result
                } else {
                  continue
                }
              } else if (this.pictureConfig.typeRadio === 1) {
                let fromLa = this.translationConfig.before === 1 && 'zh' || 'en'
                let { Data } = await this.$translationBridgeService.getAliYunTranslateImg(son.img, fromLa, this.translationConfig.after)
                imageData = Data.Data && Data.Data.Url || son.img
              } else if (this.pictureConfig.typeRadio === 2) {
                console.log(son.img, this.translationConfig.after)
                let json = await this.$translationBridgeService.getYunTranslateImg(son.img, this.translationConfig.after)
                console.log(json)
                if (json.Code === 200) {
                  imageData = json.Data && json.Data.Url || son.img
                } else {
                  imageData = son.img
                }
              }
              let res = await this.$commodityService.updateGoodsImage('1', item.id, son.id, imageData)
              console.log(res)
            }
          }
          if (this.pictureConfig.specChecked) {
            let itemmodels = JSON.stringify(neededTranslateInfoData.itemmodels)
            let spec_imageList = neededTranslateInfoData.spec_image || [] //规格图
            let spec_imageListLength = spec_imageList.length
            for (let i = 0; i < spec_imageListLength; i++) {
              let son = spec_imageList[i]
              let imageData = ''
              this.$set(this.mallTable[index], 'operation_type', `正在翻译规格图(${(i + 1)}/${spec_imageListLength})`)
              if (this.pictureConfig.typeRadio === 0) {
                let fromLa = this.translationConfig.before === 1 && 'zh' || 'en'
                const result = await selfAliYunTransImage(son, {
                  fromLanguage: fromLa,
                  toLanguage: this.translationConfig.after
                }, aliAccount, this)
                if (result) {
                  imageData = result
                } else {
                  continue
                }
                console.log('selfAliYunTransImage', result)
              } else if (this.pictureConfig.typeRadio === 1) {
                let fromLa = this.translationConfig.before === 1 && 'zh' || 'en'
                let { Data } = await this.$translationBridgeService.getAliYunTranslateImg(son, fromLa, this.translationConfig.after)
                imageData = Data.Data && Data.Data.Url || son
              } else if (this.pictureConfig.typeRadio === 2) {
                let json = await this.$translationBridgeService.getYunTranslateImg(son, this.translationConfig.after)
                console.log(json)
                if (json.Code === 200) {
                  imageData = json.Data && json.Data.Url || son
                } else {
                  imageData = son
                }
              }
              itemmodels = itemmodels.replaceAll(son, imageData)
              let res = await this.$commodityService.updateGoodsSkuImage(item.id + '', imageData, son)
              console.log(res)
            }
            itemmodels = itemmodels.replaceAll(/"id":[0-9]*,/ig, '')
            itemmodels = itemmodels.replaceAll(/"sku":"[^(",)]*",/ig, '')
            itemmodels = itemmodels.replaceAll('"sku_spec1":', '"skuSpec1":')
            itemmodels = itemmodels.replaceAll('"sku_spec2":', '"skuSpec2":')
            itemmodels = itemmodels.replaceAll('"sku_image":', '"skuImage":')
            itemmodels = itemmodels.replaceAll('"sku_sn":', '"skuSn":')
            itemmodels = itemmodels.replaceAll('"sku_price":', '"skuPrice":')
            itemmodels = itemmodels.replaceAll(/"sku_stock":([0-9]*),/ig, '"skuStock":"$1",')
            console.log(itemmodels)
            let andUpdateSku = await this.$commodityService.saveAndUpdateSkuDatas(item.id, itemmodels)
            console.log(andUpdateSku)
          }
        } catch (e) {
          console.log(e)
          success = false
          this.$set(this.mallTable[index], 'operation_type', '翻译失败...')
        } finally {
          resolve(success)
        }
      })
    },
    handleSelectionChange(val) {
      this.mallTableSelect = val
    },
    async getLabelList(type) {
      const goodsLabelList = localStorage.getItem('goodsLabelList')
      if (goodsLabelList && type !== 'refresh') {
        const data = JSON.parse(goodsLabelList)
        this.labelList = data || []
        return
      }
      const res = await this.personalLibraryAPInstance.getLabelList()
      if (res.code !== 200) {
        return this.$message.error(`获取标签列表失败:${res.code}:${res.data}`)
      }
      localStorage.setItem('goodsLabelList', JSON.stringify(res.data))
      this.$message.success('获取标签列表成功')
      this.labelList = res.data || []
      console.log('labelList', this.labelList)
    },
    getValueFormat() {
      let nowDay = new Date()
      let oldDay = nowDay - 3600 * 1000 * 24 * 2 // 前2天
      oldDay = new Date(nowDay - 3600 * 24 * 1000 * 2).toISOString().slice(0, 10)
      nowDay = nowDay.toISOString().slice(0, 10)
      this.value2 = [oldDay, nowDay]
    },
    setIsNoFoldShow() {
      this.isNoFoldShow = !this.isNoFoldShow
    },
    getArraySrcLengthSort(arr, type) {
      let sort = []
      for (let i = 0; i < arr.length; i++) {
        let index = 0
        for (let j = 0; j < arr.length; j++) {
          if (arr[i].length > arr[j].length) {
            ++index
          }
        }
        while (sort[index] || sort[index] === 0) {
          ++index
        }
        sort[index] = i
      }
      return type && sort || sort.reverse()
    },
    goodsEditorCancel(data) {
      if (data) {
        let index = this.mallTable.findIndex(i => i.id === data.sysGoodsId)
        let temp = Object.assign(this.mallTable[index], data)
        this.$set(this.mallTable, index, temp)
      }
      this.goodsEditorVisible = false
    },
    async showCategory() {
      for (let i in this.mallTable) {
        let item = this.mallTable[i]
        let category = this.categoryList[item.category_id] || ''
        if (!category) {
          let categoty = JSON.parse(JSON.stringify(this.categoryList))
          let site = item.extra_info && JSON.parse(item.extra_info).site || ''
          let res = await this.$collectService.getGoodsCat(item.category_id, item.source, site)
          category = res.split('|')[0] || ''
          let name = res.split('|')[1] || ''
          if (category && name) {
            categoty[name] = category || '未匹配到类目'
            this.categoryList = categoty
          }
        }
      }
    },
    goToGoods(item) {
      let extra_info = item.extra_info && JSON.parse(item.extra_info) || {}
      let temp = Object.assign({ productId: item.goods_id }, extra_info)
      let goods = getGoodsUrl(item.source, temp)
      this.$BaseUtilService.openUrl(goods.url)
    },
    imageUpload(file) {
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      this.uploadImgAdd = false
      reader.onload = async() => {
        let imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        let temp = await this.$ossService.uploadFile(imgData, name + '.png')
        for (const i of this.mallTableSelect) {
          let index = this.mallTable.findIndex(son => i.id === son.id)
          let storeGoodsSizeImagesJson = await this.$commodityService.storeGoodsSizeImages(i.id + '', temp)
          let storeGoodsSizeImagesRes = JSON.parse(storeGoodsSizeImagesJson)
          let success = temp && storeGoodsSizeImagesRes.code === 200
          this.$set(this.mallTable[index], 'operation_type', '尺寸图添加' + (success && '成功' || '失败'))
        }
      }
    },
    goodsSizeChange(val) {
      console.log('goodsSizeChange', val)
      if (val) {
        this.mallTableSelect.forEach(async i => {
          let index = this.mallTable.findIndex(son => i.id === son.id)
          console.log(i)
          let sysGoodsId = i.id
          let description = i.description
          let title = i.title
          let updateGoodsJson = await this.$commodityService.updateGoods({ sysGoodsId, description, title, ...val })
          console.log(updateGoodsJson)
          let updateGoodsRes = JSON.parse(updateGoodsJson)
          if (updateGoodsRes.code === 200) {
            let temp = Object.assign(this.mallTable[index], val)
            this.$set(this.mallTable, index, temp)
            this.$set(this.mallTable[index], 'operation_type', '设置重量/体积成功')
          } else {
            this.$set(this.mallTable[index], 'operation_type', '设置重量/体积失败')
          }
        })
      }
      this.goodsSizeVisible = false
    },
    goodsTagChange(val) {
      console.log('goodsTagChange', val)
      if (val) {
        let mallList = [...this.mallTableSelect.map(i => i.id)]
        this.mallTable.forEach((item, index) => {
          if (mallList.includes(item.id)) {
            this.$set(this.mallTable[index], 'sys_label_id', val.category && val.category.id)
          }
        })
      }
      this.goodsTagVisible = false
    },
    categoryChange(val) {
      console.log('categoryChange', val)
      if (val) {
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
        this.mallTableSelect.forEach(async item => {
          let param = {
            relationCategoryId: item.category_id,
            country: val.country,
            platformId: item.source,
            platformCategoryId: val.categoryList[val.categoryList.length - 1].category_id,
            categoryAttributes: attributesList
          }
          let save = await this.$commodityService.saveCategoryRelation(param)
          console.log('saveCategoryRelation', save)
        })
      }
      this.categoryVisible = false
    },
    deleteConfigClick(item, index) {

    },
    async setConfigData(data) {
      let getLabelRes = await this.$api.getLabel({ label: data })
      let getLabelData = getLabelRes.data
      if (getLabelData.code === 200) {
        if (getLabelData.data) {

        }
      }
    },
    saveConfigLabel() {
      let label = this.configLabel

    }

  }
}
</script>

<style lang="less" scoped>
@import '../module-less/product-put-less/shangxin.less';
</style>

<style lang="less">
.editor_on_new_goods {
  .el-radio {
    margin-right: 10px;

    .el-radio__label {
      padding-left: 5px;
    }
  }

  .el-checkbox {
    margin-right: 10px;

    .el-checkbox__label {
      padding-left: 5px;
    }
  }

  .el-input--mini .el-input__inner {
    padding-left: 8px;
    padding-right: 8px;
  }

  .select-right-30 {
    .el-input--mini .el-input__inner {
      padding-right: 30px;
    }
  }
}

</style>

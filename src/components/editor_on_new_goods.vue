<template>
  <el-row class="editor_on_new_goods contaniner">
    <div class="nowrapBox" v-show="isNoFoldShow">
      <div class="basisInstall">
        <div class="basisInstall-title">功能区</div>
        <el-button size="mini" @click="" type="primary">收藏数据</el-button>
        <el-button size="mini" @click="" type="primary">翻译数据</el-button>
        <el-button size="mini" @click="" type="primary">批量编辑标题/描述</el-button>
        <el-button size="mini" @click="" type="primary">批量添加尺寸图</el-button>
        <el-button size="mini" @click="" type="primary">一件组装上新</el-button>
        <el-button size="mini" @click="" type="primary">产品到上新</el-button>
        <el-button size="mini" @click="">批量删除尺寸图</el-button>
        <el-button size="mini" @click="" type="primary">收藏失败产品重试</el-button>
        <el-button size="mini" @click="" type="primary">标题首字母大写</el-button>
        <el-button size="mini" @click="">取消商品标签</el-button>
        <el-button size="mini" @click="" type="primary">批量映射虾皮类目</el-button>
        <el-button size="mini" @click="" type="primary">翻译图片</el-button>
        <el-button size="mini" @click="" type="primary">批量设置重量/体积</el-button>
        <el-button size="mini" @click="">批量删除</el-button>
      </div>
      <div class="basisInstall">
        <div class="basisInstall-title">功能区</div>
        <div class="basisInstall-box" style="color: red">
          <div>温馨提示：</div>
          使用【翻译数据】【一键组装数据到上新】功能前，先配置以下信息
        </div>
        <div class="basisInstall-box" style="color: red">
          <div>标签列表：</div>
          <span></span>
          <el-button size="mini" @click="" type="primary">保存配置信息</el-button>
          <el-button size="mini" @click="" type="primary">选择模板</el-button>
          <el-button size="mini" @click="" type="primary">登陆阿里翻译</el-button>
        </div>
        <div class="basisInstall-box" style="color: red">
          <div>商品描述：</div>
          <el-radio v-model="goodsDescribeRadio" :label="0">自定义模板+SKU描述</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="1">原有描述</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="2">原有描述+自定义模板</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="3">原有描述+SKU描述</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="4">自定义模板</el-radio>
        </div>
        <div class="basisInstall-box" style="color: red">
          <div>翻译配置：</div>
          <el-checkbox v-model="translationConfig.titleChecked" size="mini">翻译标题</el-checkbox>
          <el-checkbox v-model="translationConfig.specChecked" size="mini">翻译规格信息</el-checkbox>
          <el-checkbox v-model="translationConfig.describeChecked" size="mini">翻译描述</el-checkbox>
          <el-tooltip class="item" effect="dark" content="如果选择付费翻译描述，将会产生大量扣费" placement="top">
            <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
          </el-tooltip>
        </div>
        <div class="basisInstall-box" style="color: red">
          <div>翻译语种：</div>
          <el-select v-model="languages" size="mini" style="width: 120px;" value="">
            <el-option
                v-for="item in languagesList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <div>失败类型：</div>
          <el-select v-model="failureType" size="mini" style="width: 120px;" value="">
            <el-option
                v-for="item in languagesList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <div>线程数量：</div>
          <el-input size="mini" v-model="threadNumber" style="width: 120px;"></el-input>
          <el-checkbox v-model="filterSimplifiedChecked" size="mini">上新过滤简体数据</el-checkbox>
        </div>
        <div class="basisInstall-box" style="color: red">
          <div>图片类型：</div>
          <el-checkbox v-model="pictureConfig.specChecked" size="mini">翻译规格图</el-checkbox>
          <el-checkbox v-model="pictureConfig.shuffleChecked" size="mini">翻译轮播图</el-checkbox>
          <div>删除条件：</div>
          <el-checkbox v-model="pictureConfig.deleteGoodsChecked" size="mini">删除库存低于设定值的商品</el-checkbox>
          <el-input size="mini" v-model="pictureConfig.inventoryNumber" style="width: 120px;"></el-input>
        </div>
        <div class="basisInstall-box" style="color: red">
          <div>图片翻译：</div>
          <el-radio v-model="pictureConfig.typeRadio" :label="0">阿里免费翻译</el-radio>
          <el-radio v-model="pictureConfig.typeRadio" :label="1">阿里付费翻译</el-radio>
          <el-tooltip class="item" effect="dark" content="0.06元一张图片" placement="top">
            <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
          </el-tooltip>
          <el-radio v-model="pictureConfig.typeRadio" :label="2">云图像翻译</el-radio>
        </div>
        <div class="basisInstall-box" style="color: red">
          <div style="display: flex;align-items: center">
            <div>图片翻译：</div>
            <el-select v-model="languages" size="mini" style="width: 120px;" value="">
              <el-option
                  v-for="item in languagesList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <div style="width: 12px;height: 1px;background-color: #333333;"></div>
            <el-select v-model="languages" size="mini" style="width: 120px;" value="">
              <el-option
                  v-for="item in languagesList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <div>阿里翻译账号：</div>
            <el-select v-model="languages" size="mini" style="width: 120px;" value="">
              <el-option
                  v-for="item in languagesList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-button size="mini" @click="">阿里翻译个人中心</el-button>
          </div>
        </div>
        <div class="basisInstall-box" style="color: red">
          <div>阿里图片翻译检验：</div>
          <el-radio v-model="pictureConfig.checkedRadio" :label="1">检验</el-radio>
          <el-radio v-model="pictureConfig.checkedRadio" :label="0">不检验</el-radio>
        </div>
      </div>
      <div class="basisInstall">
        <div class="basisInstall-title">日志区</div>
        <div class="basisInstall-box loose">
          <div class="keepRight">商品总数：</div>
          <span style="margin-left: 5px">{{statistics.count}}</span>
        </div>
        <div class="basisInstall-box loose">
          <div class="keepRight">收藏成功总数：</div>
          <span style="margin-left: 5px">{{statistics.scSuccess}}</span>
        </div>
        <div class="basisInstall-box loose">
          <div class="keepRight">翻译失败总数：</div>
          <span style="margin-left: 5px">{{statistics.fySuccess}}</span>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
  export default {
    name: 'editor_on_new_goods',
    data() {
      return {
        statistics: {
          count: 0,
          scSuccess: 0,
          fySuccess: 0
        },
        label: {},
        goodsDescribeRadio: 1,
        translationConfig: {
          titleChecked: true,
          specChecked: true,
          describeChecked: true,
          languages:'th', // 翻译语种
        },  // 图片
        pictureConfig: {
          specChecked: true,
          shuffleChecked: true,
          deleteGoodsChecked: false,
          inventoryNumber:'10', // 翻译语种
          typeRadio: 0, //单选
          checkedRadio: 0, //单选
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
          },{
            label: '中文',
            value: 'zh'
          },{
            label: '印尼语',
            value: 'id'
          },{
            label: '马来语',
            value: 'ms'
          },{
            label: '波兰语',
            value: 'pl'
          },{
            label: '不翻译',
            value: 'no'
          },],
        filterSimplifiedChecked:false, //过滤简体
        threadNumber: '5', // 线程数量
        failureType: '',  // 失败类型
      }
    },
    props: {
      mallTable: {
        type: Array,
        default: []
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped>
  /*@import '../module-less/product-put-less/shangxin.less';*/
</style>

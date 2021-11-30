<template>
  <div class="personal-container">
    <header>
      <div class="header-left">
        <p class="text">基础操作</p>
        <el-button type="primary" size="mini" disabled>批量添加尺寸图</el-button>
        <el-button type="primary" size="mini" disabled>批量删除尺寸图</el-button>
        <el-button type="primary" size="mini" @click="isEditorVisible = true">一键上新</el-button>
        <el-button type="primary" size="mini" disabled>批量映射虾皮类目</el-button>
        <el-button type="primary" size="mini" @click="markPreferredGoods('1')">标记优选商品</el-button>
        <el-button type="primary" size="mini" @click="markPreferredGoods('-1')">取消标记优选商品</el-button>
        <el-button type="primary" size="mini" @click="openLabelVisabel('1')">标记商品标签</el-button>
        <el-button type="primary" size="mini" @click="openLabelVisabel('-1')">取消商品标签</el-button>
        <el-button type="primary" size="mini" disabled>翻译后的数据导出</el-button>
        <el-button type="primary" size="mini" disabled>批量设置重量/体积</el-button>
        <el-button type="primary" size="mini" @click="deleteGoods">取消收藏</el-button>
      </div>
      <div class="header-right">
        <p class="text">列表筛选</p>
        <ul class="search-list">
          <li>
            <p>采购来源：</p>
            <el-select v-model="sourceVal" placeholder="" size="mini">
              <el-option label="全部" :value="''" />
              <el-option v-for="(item, index) in source" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </li>
          <li>
            <p>筛选时间：</p>
            <el-select v-model="timeType" placeholder="" size="mini">
              <el-option v-for="(item, index) in timeAt" :key="index" :label="item.label" :value="item.value" />
            </el-select>
            <el-date-picker v-model="value2" size="mini" value-format="yyyy-MM-dd" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
          </li>
          <li>
            <p>优选商品：</p>
            <el-select v-model="isFeatured" placeholder="" size="mini">
              <el-option label="全部" value="0" />
              <el-option v-for="(item, index) in isFeaturedArr" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </li>
          <li>
            <p>编辑状态：</p>
            <el-select v-model="isEditValue" placeholder="" size="mini">
              <el-option label="全部" :value="''" />
              <el-option v-for="(item, index) in editArr" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </li>
          <li>
            <p>语种：</p>
            <el-select v-model="language" placeholder="" size="mini">
              <el-option label="全部" :value="''" />
              <el-option v-for="(item, index) in languageArr" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </li>
          <li>
            <p>价格区间：</p>
            <el-input v-model="minPrice" size="mini" placeholder="" />
            <span class="slot">-</span>
            <el-input v-model="maxPrice" size="mini" placeholder="" />
          </li>
          <li>
            <p>商品ID：</p>
            <el-input v-model="goodsId" size="mini" placeholder="" />
          </li>
          <li>
            <p>商品标签：</p>
            <el-select v-model="labelId" placeholder="" size="mini">
              <el-option label="全部" value="0" />
              <el-option v-for="(item, index) in labelList" :key="index" :label="item.label_name" :value="item.id" />
            </el-select>
          </li>
          <li>
            <el-button type="primary" size="mini" @click="getLabelList('refresh')">刷新</el-button>
            <el-button type="primary" size="mini" @click="getGoodsList">搜索</el-button>
          </li>
        </ul>
      </div>
    </header>
    <article>
      <p class="tip">尊敬的用户：您好，为提高私有选品库模块的性能，系统只能保存近30天的非精选商品数据，为保证部分精选商品不被清理，请将需要保留的商品标记为精选商品</p>
      <u-table
        ref="plTable"
        v-loading="buttonStatus.getList"
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
        <u-table-column align="center" label="标签">
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ getLabelName(row.sys_label_id) }}</p>
          </template>
        </u-table-column>

        <u-table-column align="center" label="采购来源">
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ sourceObj[row.source + ''] }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="优选商品">
          <template v-slot="{ row }">
            {{ row.is_featured === '1' ? '是' : '否' }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="商品Id">
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.goods_id }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="标题" prop="Price" width="300px" fit>
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.title }}</p>
          </template>
        </u-table-column>

        <u-table-column align="center" label="主图" prop="Sales">
          <template v-slot="{ row }">
            <div style="justify-content: center; display: flex">
              <img :src="row.image" style="width: 56px; height: 56px">
            </div>
          </template>
        </u-table-column>
        <u-table-column align="center" label="价格" prop="price" />
        <u-table-column align="center" label="库存" prop="stock" />
        <u-table-column align="center" label="销量" prop="sales" />
        <u-table-column align="center" label="重量(kg)">
          <template v-slot="{ row }">
            <el-input v-model="row.weight" size="mini" />
          </template>
        </u-table-column>
        <u-table-column align="center" label="体积" width="130">
          <template v-slot="{ row }">
            <ul>
              <li style="display: flex">
                <p>长（cm）</p>
                <el-input v-model="row.long" size="mini" />
              </li>
              <li style="display: flex">
                <p>宽（cm）</p>
                <el-input v-model="row.width" size="mini" />
              </li>
              <li style="display: flex">
                <p>高（cm）</p>
                <el-input v-model="row.height" size="mini" />
              </li>
            </ul>
          </template>
        </u-table-column>
        <u-table-column align="center" label="翻译语种" prop="language">
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ languageArrObj[row.language] || row.language }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="源平台类目名称" prop="category_id" />
        <u-table-column align="center" label="更新时间" prop="updated_at" />
        <u-table-column align="center" label="收藏时间" prop="created_at" />
        <u-table-column align="center" label="操作结果" />
      </u-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          :total="total"
          :current-page="currentPage"
          :page-sizes="[30, 100, 200]"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </article>
    <!-- 商品标签配置 -->
    <el-dialog
      class="lable-settings"
      center
      title="商品标签配置"
      :visible.sync="goodsLabelVisiable"
      width="300px"
      :before-close="handleClose1"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <ul>
        <li>
          <p>商品标签：</p>
          <el-select v-model="labelId2" placeholder="" size="mini" @change="getLabelName(labelId2, true)">
            <el-option v-for="(item, index) in labelList" :key="index" :label="item.label_name" :value="item.id" />
          </el-select>
        </li>
        <li>
          <p>当前标签：</p>
          <el-input v-model="currentLabelName" size="mini" placeholder="" />
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="markGoodsLabel">添加商品到当前标签</el-button>
      </span>
    </el-dialog>
    <div class="on_new_dialog">
      <el-dialog width="1313px" :close-on-click-modal="false" top="6vh" :visible.sync="isEditorVisible">
        <template slot="title">
          <div style="display: flex;align-items: center">
            <div style="margin-right: 25px;">上新编辑</div>
            <el-button size="mini" :type="isNoFoldShow && 'primary' || ''" @click.native.stop="setIsNoFoldShow">
              {{isNoFoldShow && '折叠' || '展开'}}
            </el-button>
          </div>
        </template>
        <editor-on-new-goods  ref="editor_on_new_goods" :mall-table="multipleSelection"></editor-on-new-goods>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { delay } from '../../../util/util'
import PersonalLibraryAPI from '../../../module-api/product-put-on-api/personal-library-api'
import { source, sourceObj } from './collection-platformId'
import editorOnNewGoods from '../../../components/editor_on_new_goods'
export default {
  data() {
    return {
      isNoFoldShow:true,
      isEditorVisible: false,
      Height: 500,
      personalLibraryAPInstance: new PersonalLibraryAPI(this),
      // el-dialog
      goodsLabelVisiable: false,
      labelType: '',
      // search
      value2: [],
      sourceObj: null,
      labelList: [],
      sourceVal: '',
      timeType: '2',
      timeAt: [
        { label: '收藏时间', value: '2' },
        { label: '更新时间', value: '3' }
      ],
      isFeatured: '0',
      isFeaturedArr: [
        { value: '1', label: '是' },
        { value: '-1', label: '否' }
      ],
      minPrice: '',
      maxPrice: '',
      isEditValue: '',
      editArr: [
        { value: '1', label: '是否已编辑标题' },
        { value: '0', label: '是否已编辑描述' }
      ],
      goodsId: '',
      language: '',
      languageArr: [
        { value: 'zh-hans', label: '简体' },
        { value: 'zh-hant', label: '繁体' },
        { value: 'en', label: '英语' },
        { value: 'th', label: '泰语' },
        { value: 'vi', label: '越南语' },
        { value: 'id', label: '印度语' },
        { value: 'ms', label: '马来语' }
      ],
      languageArrObj: {
        'zh-Hans': '简体',
        'zh-Hant': '繁体',
        'en': '英语',
        'th': '泰语',
        'vi': '越南语',
        'id': '印度语',
        'ms': '马来语'
      },
      labelId: '0',
      labelId2: '',
      currentLabelName: '',
      // table
      goodsList: [],
      multipleSelection: [],
      // button
      buttonStatus: {
        getList: false
      },

      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 30
    }
  },
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
    }

  },
  components: { editorOnNewGoods },
  created() {
    this.sourceObj = sourceObj // 采购映射
    this.source = source // 采购来源
    this.getLabelList()
    this.getValueFormat()
  },
  mounted() {
    this.getGoodsList()
  },
  methods: {
    setIsNoFoldShow(){
      this.isNoFoldShow = !this.isNoFoldShow;
      this.$refs.editor_on_new_goods.setIsNoFoldShow()
    },
    handleClose1(done) {
      done()
      this.labelId2 = this.labelList[0].id
      this.currentLabelName = this.labelList[0].label_name
      return
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.currentPage = 1
      this.getGoodsList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getGoodsList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('this.multipleSelection', this.multipleSelection)
    },
    // 获取标签列表
    async getLabelList(type) {
      const goodsLabelList = localStorage.getItem('goodsLabelList')
      if (goodsLabelList && type !== 'refresh') {
        const data = JSON.parse(goodsLabelList)
        this.labelList = data
        return
      }
      const res = await this.personalLibraryAPInstance.getLabelList()
      if (res.code !== 200) {
        return this.$message.error(`获取标签列表失败:${res.code}:${res.data}`)
      }
      localStorage.setItem('goodsLabelList', JSON.stringify(res.data))
      this.$message.success('获取标签列表成功')
      this.labelList = res.data
      console.log('labelList', this.labelList)
    },
    async getGoodsList() {
      const params = {
        page: this.currentPage,
        perpage: this.pageSize,
        goodsId: this.goodsId,
        language: this.language,
        source: this.sourceVal,
        keyword: '',
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        timeType: this.timeType,
        startTime: `${this.value2[0]} 00:00:00`,
        endTime: `${this.value2[1]} 23:59:59`,
        isEditTitle: this.isEditValue === '' ? '' : this.isEditValue === '0' ? '2' : '1',
        isEditDescription: this.isEditValue === '' ? '' : this.isEditValue === '1' ? '' : '0',
        categoryId: '',
        isFeatured: this.isFeatured,
        mainShowData: '',
        sysLabelId: this.labelId
      }
      this.buttonStatus.getList = true
      this.goodsList = []
      this.$refs.plTable.reloadData(this.goodsList)
      const res = await this.personalLibraryAPInstance.getCollectGoodsV2(params)
      // debugger
      if (res.code !== 200) {
        this.$message.error(`${res.code}:${res.data}`)
      } else {
        this.total = res.data.total
        this.goodsList.push(...res.data.data)
        console.log('this.goodsList', this.goodsList)
      }
      this.buttonStatus.getList = false
    },
    async markPreferredGoods(type) {
      let selectElement = this.multipleSelection
      if (selectElement.length === 0) {
        selectElement = null
        return this.$message.error('请先选择商品')
      }
      const sysGoodsIds = []
      // 归类
      selectElement.forEach(item => {
        if (type === '1') { //  如果状态为标记优选,则只能选择 未优选的状态
          if (item.is_featured !== '1') {
            sysGoodsIds.push(item.id)
          }
        } else { //  如果状态为取消优选,则只能选择 优选的状态
          if (item.is_featured !== '-1') {
            sysGoodsIds.push(item.id)
          }
        }
      })
      if (sysGoodsIds.length === 0) {
        return this.$message.error(`该组商品已被${type === '1' ? '标记优选' : '取消优选'},请勿重复操作`)
      }
      const res = await this.personalLibraryAPInstance.markPreferredGoods(sysGoodsIds, type)
      if (res.code !== 200) {
        return this.$message.error(`${type === '1' ? '' : '取消'}标记优选商品失败`)
      }

      this.$message.success(`${type === '1' ? '' : '取消'}标记优选商品成功`)
      selectElement.map(item => {
        if (type === '1') { // 标记成功
          item.is_featured = '1'
        } else { // 取消标记
          item.is_featured = '-1'
        }
      })
      selectElement = null
    },
    openLabelVisabel(type) {
      if (this.multipleSelection.length === 0) {
        return this.$message.error('请先选择商品')
      }
      this.labelType = type
      if (type === '1') { // 标记商品标签
        this.goodsLabelVisiable = true
        this.labelId2 = this.labelList[0].id
        this.currentLabelName = this.labelList[0].label_name
      } else { // 取消
        this.markGoodsLabel()
      }
    },
    async markGoodsLabel() {
      let selectElement = this.multipleSelection
      let labelInfo = this.labelList.find(item => item.label_name === this.currentLabelName)
      if (!labelInfo) { // 如果未查询到标签信息,要自动为用户创建
        const res = await this.personalLibraryAPInstance.createLabel(this.currentLabelName)
        if (res.code !== 200) {
          return this.$message.error(`新标签创建失败${res.code}-${res.data}`)
        }
        await this.getLabelList('refresh')
        // 二次检测
        labelInfo = this.labelList.find(item => item.label_name === this.currentLabelName)
      }
      const sysGoodsId = selectElement.map(item => item.id)
      // 标记/取消
      const res2 = await this.personalLibraryAPInstance.addGoodsToTag(this.labelType === '1' ? labelInfo.id : '0', sysGoodsId)
      if (res2.code !== 200) {
        return this.$message.error(`${this.labelType === '1' ? '标记' : '取消'}商品标签失败:${res2.code}-${res2.data}`)
      }
      this.$message.success(`${this.labelType === '1' ? '标记' : '取消'}商品标签成功`)
      // 本地改变状态 ,不重新加载列表
      selectElement.forEach(item => {
        if (this.labelType === '1') {
          item.sys_label_id = labelInfo.id
        } else {
          item.sys_label_id = ''
        }
      })
      // 为商品添加标签
      selectElement = null
      this.goodsLabelVisiable = false
    },
    // 取消商品
    async deleteGoods() {
      if (this.multipleSelection.length === 0) {
        return this.$message.error('请选择需要取消收藏的商品')
      }
      const sysGoodsId = this.multipleSelection.map(item => {
        return item.id
      })
      const res = await this.personalLibraryAPInstance.deleteGoods(sysGoodsId)
      if (res.code !== 200) {
        return this.$message.error(`取消收藏商品失败:${res.code}-${res.data}`)
      }
      this.$message.success('取消收藏商品成功')
      this.getGoodsList()
    },
    // 辅助函数----------------------
    // 获取搜索时间
    getValueFormat() {
      let nowDay = new Date()
      let oldDay = nowDay - 3600 * 1000 * 24 * 2 // 前2天
      oldDay = new Date(nowDay - 3600 * 24 * 1000 * 2).toISOString().slice(0, 10)
      nowDay = nowDay.toISOString().slice(0, 10)
      this.value2 = [oldDay, nowDay]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/product-put-less/personal-library.less';
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
    .el-dialog{
      margin-bottom: 0;
    }
    .el-dialog__header {
      padding: 10px;

      .el-dialog__headerbtn {
        top: 10px;
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

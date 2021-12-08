<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom:5px">
        <storeChoose @changeMallList="changeMallList" />
        <el-button
          type="primary"
          size="mini"
          @click="isFold = !isFold"
        >{{ isFold?'折叠':'展开' }}</el-button>
      </ul>
      <ul v-if="isFold" style="margin-bottom:5px">
        <li class="data">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>商品数据相关</span>
            </div>
            <ul style="margin-bottom:3px">
              <li class="data-input">
                <el-form label-position="right" label-width="60px">
                  <el-form-item label="销售量：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="访客量：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="价格：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="商品数量：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="评星数：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                </el-form>
              </li>
              <li>
                <el-form label-position="right" label-width="60px">
                  <el-form-item label="是否售空：">
                    <el-select
                      v-model="sellStatus"
                      size="mini"
                      filterable
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
                  v-model="checked"
                  style="margin-right:3px"
                >单店查询商品数量</el-checkbox>
                <el-input
                  size="mini"
                  style="width:105px"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                />
              </li>
              <li class="data-goods">
                <el-input
                  v-model="keyword"
                  size="mini"
                  class="input-with-select"
                  oninput="value=value.replace(/\s+/g,'')"
                  clearable
                >
                  <el-select
                    slot="prepend"
                    v-model="searchType"
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
                type="primary"
                size="mini"
                style="margin-right:3px"
                @click="categoryVisible = true"
              >选择类目</el-button>
              <el-input
                size="mini"
                style="width:455px"
                onkeyup="value=value.replace(/[^\d]/g,'')"
              />
            </ul>
            <ul style="margin-bottom:3px">
              <el-button
                type="primary"
                size="mini"
                :disabled="queryLoding"
              >一键查询100小时以上无流量商品</el-button>
              <el-button type="primary" size="mini" :disabled="queryLoding">一键查询200小时以上无流量商品</el-button>
              <el-button type="primary" size="mini" :disabled="queryLoding">商品一键翻新1</el-button>
            </ul>
            <ul>
              <el-button type="primary" size="mini" :disabled="true">同步上家库存1</el-button>
              <el-button type="primary" size="mini" :disabled="true">商品搬迁1</el-button>
              <el-button type="primary" size="mini">批量确认</el-button>
              <el-button
                type="primary"
                size="mini"
                :loading="queryLoding"
                @click="queryData"
              >查询数据</el-button>
              <el-checkbox
                v-model="showConsole"
                style="margin-left:10px"
              >隐藏日志</el-checkbox>
            </ul>
          </el-card>
        </li>
        <li class="operation">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>操作选项</span>
            </div>
            <ul style="margin-bottom:3px">
              <el-button type="primary" size="mini" :disabled="queryLoding">批量删除</el-button>
              <el-button type="primary" size="mini" :disabled="queryLoding">批量下架</el-button>
              <el-button type="primary" size="mini" :disabled="queryLoding">批量编辑标题</el-button>
              <el-button type="primary" size="mini" :disabled="!queryLoding" @click="flag=true">取消操作</el-button>
              <el-button type="primary" size="mini" :disabled="queryLoding">批量修改类目属性</el-button>
            </ul>
            <ul style="margin-bottom:3px">
              <el-button type="primary" size="mini" :disabled="queryLoding">货源查找</el-button>
              <el-button type="primary" size="mini" :disabled="queryLoding">批量上架</el-button>
              <el-button type="primary" size="mini" :disabled="queryLoding">批量编辑描述</el-button>
              <el-button type="primary" size="mini" :disabled="queryLoding">导出数据</el-button>
              <el-button type="primary" size="mini" :disabled="queryLoding">一键查询禁卖商品</el-button>
            </ul>
            <ul>
              <li class="operation-input">
                <el-form label-position="right" label-width="60px">
                  <el-form-item label="商品库存：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="商品价格：">
                    <el-input class="mini-input" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" /> % +
                    <el-input class="mini-input" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="发货天数：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="物流方式：">
                    <!-- <el-select
                      size="mini"
                      filterable
                    >
                      <el-option value="" label="全部" />
                      <el-option
                        v-for="(item,index) in 4"
                        :key="index"
                      />
                    </el-select> -->
                  </el-form-item>
                  <el-form-item label="商品重量：">
                    <el-input style="width:102px" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    <span class="red-span" style="margin-left:3px">kg</span>
                  </el-form-item>
                  <div>
                    <el-radio v-model="radio" label="1">免运</el-radio>
                    <el-radio v-model="radio" label="2">运费由买家承担</el-radio>
                  </div>
                  <el-form-item label="商品尺寸：">
                    <el-input class="mini-input item" size="mini" placeholder="长" onkeyup="value=value.replace(/[^\d]/g,'')" />*
                    <el-input class="mini-input item" size="mini" placeholder="宽" onkeyup="value=value.replace(/[^\d]/g,'')" />*
                    <el-input class="mini-input item" size="mini" placeholder="高" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                </el-form>
              </li>
              <li class="operation-but">
                <ul style="margin-bottom:3px">
                  <el-button type="primary" size="mini">批量更新库存</el-button>
                  <span class="red-span">（0，表示库存设置为0）</span>
                </ul>
                <ul style="margin-bottom:3px">
                  <el-button type="primary" size="mini">批量更新价格</el-button>
                  <span class="red-span">（加价公式：原价+原价*百分比+数值）</span>
                </ul>
                <ul style="margin-bottom:3px">
                  <el-button type="primary" size="mini">批量更新天数</el-button>
                  <span class="red-span">（最长30天）</span>
                </ul>
                <ul style="margin-bottom:3px">
                  <el-popover placement="right" width="400" trigger="click">
                    aa
                    <el-button slot="reference" type="primary" size="mini">批量更新物流方式</el-button>
                  </el-popover>
                  <span class="red-span">（请先至商家后台开启对应物流方式）</span>
                </ul>
                <ul style="margin-bottom:3px">
                  <el-button type="primary" size="mini">批量更新重量</el-button>
                  <span class="red-span">（必须大于0kg）</span>
                </ul>
                <ul style="margin-bottom:3px">
                  <el-button type="primary" size="mini">批量更新运费</el-button>
                  <span class="red-span">（只能更改当前商品已开启的物流）</span>
                </ul>
                <ul>
                  <el-button type="primary" size="mini">批量修改商品尺寸</el-button>
                </ul>
              </li>
            </ul>
          </el-card>
        </li>
        <li class="progress">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>操作进度相关</span>
            </div>
            <ul>
              <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success" />
            </ul>
            <ul>
              <li>
                <el-form label-position="right" label-width="60px">
                  <el-form-item label="查询数量：">
                    <!-- {{}} -->
                  </el-form-item>
                  <el-form-item label="更新数量：">
                    <!-- {{}} -->
                  </el-form-item>
                  <el-form-item label="成功数量：">
                    <!-- {{}} -->
                  </el-form-item>
                  <el-form-item label="失败数量：">
                    <!-- {{}} -->
                  </el-form-item>
                </el-form>
              </li>
            </ul>
          </el-card>
        </li>
      </ul>
      <ul v-if="isFold">
        <span class="red-span">说明：库存公式：设置后的库存 = 原库存 +（填写的库存）；如果填写的库存为零将会把商品的库存置为0； 价格公式：设置后的价格 = 原价 +（原价*填写的百分比）+（填写的价格）</span>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="isShowLoading"
        height="calc(100vh - 440px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
        />
        <el-table-column align="center" min-width="120" label="站点">
          <template v-slot="{row}">
            {{ row.country | chineseSite }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="店铺名" prop="mallName" show-overflow-tooltip />
        <el-table-column align="center" min-width="120" label="主图">
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
                  :src="[row.country ,row.platform_mall_id , row.images] | imageRender"
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
                :src="[row.country ,row.platform_mall_id , row.images] | imageRender"
              >
                <div slot="error" class="image-slot" />
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="上家类型" />
        <el-table-column align="center" min-width="120" label="上家链接" />
        <el-table-column align="center" min-width="120" label="itemID">
          <template v-slot="{row}">
            <span class="green-span" @click="openUrl(row)">
              {{ row.id }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="价格" prop="price" />
        <el-table-column align="center" min-width="100" label="库存" prop="stock" />
        <el-table-column align="center" min-width="150" label="标题" prop="name" show-overflow-tooltip>
          <template v-slot="{row}">
            <span class="red-span">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="80" label="状态" />
        <el-table-column align="center" min-width="120" label="创建时间" prop="create_time" />
        <el-table-column align="center" min-width="120" label="更新时间" prop="modify_time" />
        <el-table-column align="center" min-width="100" label="销售量" />
        <el-table-column align="center" min-width="100" label="访客量" />
        <el-table-column align="center" min-width="100" label="评星数" />
        <el-table-column align="center" min-width="100" label="粉丝量" />
        <el-table-column align="center" min-width="120" label="操作状态" />
      </el-table>
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
      <category-choose ref="goodsCategory" :level="3" :is-column="false" @setCategory="setCategory" />
    </el-dialog>
  </el-row>
</template>

<script>
import GoodsList from '../../../module-api/goods-manager-api/goods-list'
import StoreChoose from '../../../components/store-choose'
import CategoryChoose from '../../../components/category-choose.vue'
import { exportExcelDataCommon } from '../../../util/util'
export default {
  components: {
    StoreChoose,
    CategoryChoose
  },
  data() {
    return {
      isFold: true,
      isShowLoading: false,
      showConsole: true,
      categoryVisible: false,
      queryLoding: false,
      radio: '',
      checked: false,
      flag: false,
      GoodsList: new GoodsList(this),

      selectMallList: '', // 选择的店铺分组数据
      tableData: [], // 表格数据
      pageSize: 48,
      sellStatus: 0, // 是否售空
      goodsStatus: 0, // 商品状态
      searchType: 'name', // 商品类型搜索条件
      keyword: '', // 商品类型搜索值
      source: 0, // 上家来源

      sellStatusList: [
        { value: 1, label: '售空' },
        { value: 2, label: '非售空' }
      ],
      goodsStatusList: [
        { value: 1, label: '正常' },
        { value: 2, label: '审核中' },
        { value: 3, label: '禁卖下架' },
        { value: 4, label: '已售完' },
        { value: 5, label: '待上架' },
        { value: 6, label: '禁卖shopee官方删除' },
        { value: 7, label: '已压制' }
      ],
      searchTypeList: [
        { value: 'name', label: '商品名称' },
        { value: 'sku', label: '主商品货号' },
        { value: 'msku', label: '商品规格货号' },
        { value: 'variation', label: '商品编号' },
        { value: 'id', label: '上家商品ID' }
      ],
      sourceList: [
        { value: 1, label: '拼多多' },
        { value: 2, label: '淘宝' },
        { value: 3, label: '天猫' },
        { value: 5, label: '自有' },
        { value: 8, label: '1688' },
        { value: 9, label: 'Lazada' },
        { value: 10, label: '京喜' },
        { value: 11, label: 'Shopee' },
        { value: 12, label: 'aliexpress' },
        { value: 13, label: '天猫淘宝海外平台' },
        { value: 15, label: '货老板海外' }
      ]
    }
  },
  async mounted() {
    this.selectAll('goodsStatus', this.goodsStatusList)
    this.selectAll('source', this.sourceList)
  },
  methods: {
    // 查询数据
    async queryData() {
      if (!this.selectMallList.length) {
        return this.$message.warning('请选择店铺')
      }
      this.tableData = []
      this.$refs.Logs.consoleMsg = ''
      this.queryLoding = true
      this.showConsole = false
      this.$refs.Logs.writeLog(`开始查询...`, true)
      for (let i = 0; i < this.selectMallList.length; i++) {
        if (this.flag) {
          break
        }
        const element = this.selectMallList[i]
        const mallData = element
        const pageNumber = 1
        await this.getTableData(pageNumber, mallData)
      }
      this.queryLoding = false
      this.$refs.Logs.writeLog(`查询完成`, true)
    },
    // 获取数据
    async getTableData(pageNumber, mallData) {
      let res = ''
      const params = { mallData, pageNumber, pageSize: this.pageSize }
      const mallName = mallData.mall_alias_name || mallData.platform_mall_name
      if (this.keyword) { // ?还有未判断数据
        params['searchType'] = this.searchType
        params['keyword'] = this.keyword
        res = await this.GoodsList.searchProductList(params)
      } else {
        res = await this.GoodsList.getMpskuList(params)
      }
      if (res.code === 200) {
        res.data.list.map(item => {
          let stock = 0
          const price = []
          item.country = mallData.country
          item.mallName = mallName
          item.create_time = this.$dayjs(item.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
          item.modify_time = this.$dayjs(item.modify_time * 1000).format('YYYY-MM-DD HH:mm:ss')
          item.images = item.images[0]
          item.platform_mall_id = mallData.platform_mall_id
          item.model_list.forEach(mItem => {
            price.push(Number(mItem.price_info.normal_price))
            stock += mItem.stock_info.normal_stock
          })
          item.stock = stock
          item.price = Math.min.apply(null, price)
          this.tableData.push(item)
        })
        console.log('list', res.data.list)
        this.$refs.Logs.writeLog(`查询店铺【${mallName}】第【${pageNumber}】页数据：${res.data.list.length}`, true)
        if (res.data.list.length >= this.pageSize) {
          pageNumber++
          await this.getTableData(pageNumber, mallData)
        }
      } else {
        this.$refs.Logs.writeLog(`店铺【${mallName}】${res.data}`, false)
      }
    },
    // 全选
    selectAll(key, baseData) {
      if (this[key].length < baseData.length) {
        this[key] = []
        this[key].push(0)
        baseData.map((item) => {
          this[key].push(item.value)
        })
      } else {
        this[key] = []
      }
    },
    changeSelect(val, key) {
      if (!val.includes(0) && val.length === this[key].length) {
        console.log('')
      } else if (val.includes(0) && val.length - 1 < this[key].length) {
        this[key] = this[key].filter((item) => {
          return item !== 0
        })
      }
    },
    // 打开外部链接
    async openUrl(row) {
      try {
        const url = this.$filters.countryShopeebuyCom(row.country)
        this.$BaseUtilService.openUrl(`${url}/product/${row.platform_mall_id}/${row.id}`)
      } catch (error) {
        this.$message.error(`打开失败`)
      }
    },
    setCategory(val) {
      console.log(val)
    },
    changeMallList(val) {
      this.selectMallList = val
      console.log('changeMallList', val)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      // this.getStock()
    },
    handleCurrentChange(val) {
      this.page = val
      // this.getStock()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/goods-manager-less/goods-list.less';
</style>

<template>
  <div class="goods-item-selector">
    <div class="goods-item-header">
      <div class="header-list">
        <div class="header-item">
          <el-select v-model="searchParams.type" size="mini" style="margin-right: 5px;width: 120px;">
            <el-option :value="0" label="关键字" />
            <el-option :value="1" label="商品编号" />
          </el-select>
          <el-input v-model="searchParams.typeKey" style="width: 120px;" size="mini" />
        </div>
        <div class="header-item">
          <div class="item-text">排序：</div>
          <el-select v-model="searchParams.sort" style="width: 120px;" size="mini">
            <el-option :value="''" label="默认排序" />
            <el-option :value="'sales'" label="销量从低往高" />
            <el-option :value="'-sales'" label="销量从高往低" />
            <el-option :value="'price'" label="价格从低往高" />
            <el-option :value="'-price'" label="价格从高往低" />
          </el-select>
        </div>
        <div class="header-item">
          <div class="item-text">价格区间：</div>
          <el-input v-model="searchParams.minPrice" style="width: 120px;" size="mini" />
          <div class="heng" />
          <el-input v-model="searchParams.maxPrice" style="width: 120px;" size="mini" />
        </div>
        <el-button type="primary" size="mini" :disabled="isRunning" @click="categoryVisible = true">选择类目</el-button>
        <el-button type="primary" size="mini" :disabled="isRunning" @click="queryGoods">查询商品</el-button>
        <el-button type="" size="mini" @click="cancelGoods">取消查询</el-button>
      </div>
      <div class="header-list">
        <div class="header-item">
          <div class="item-text" style="width: 120px;">每一个店铺商品数量：</div>
          <el-input v-model="searchParams.goodsCount" style="width: 120px;" size="mini" />
        </div>
        <div class="header-item">
          <div class="item-text">过滤商品编号：</div>
          <el-input v-model="searchParams.filterNo" style="width: 120px;" size="mini" />
          <el-tooltip class="item" effect="dark" content="不同商品id使用,号隔开" placement="top">
            <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;" /></el-button>
          </el-tooltip>
        </div>
        <div class="header-item">
          <div class="item-text" style="width: 72px;">销量区间：</div>
          <el-input v-model="searchParams.minSales" size="mini" style="width: 120px;" />
          <div class="heng" />
          <el-input v-model="searchParams.maxSales" size="mini" style="width: 120px;" />
        </div>
        <el-button type="primary" size="mini" :disabled="isRunning" @click="changeGoodsItem">添加已选商品</el-button>
        <el-checkbox v-model="isApplyCheck" :disabled="isRunning" style="margin-left: 10px;" size="mini">仅显示适用商品
        </el-checkbox>
        <el-checkbox v-model="showlog" style="margin-left: 10px;" size="mini">隐藏日志</el-checkbox>
      </div>
    </div>
    <Logs ref="goods_item_Logs" v-model="showlog" clear />
    <div class="goods-item-table">
      <u-table
        ref="goodsTable"
        height="620px"
        :data="goodsTable"
        :data-changes-scroll-top="false"
        :header-cell-style="{backgroundColor: '#f5f7fa',}"
        :big-data-checkbox="true"
        :border="false"
        use-virtual
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" />
        <u-table-column align="center" type="index" width="80" label="序号" />
        <u-table-column align="center" label="店铺名称" width="150" show-overflow-tooltip>
          <template v-slot="{ row }">{{ row.mall_alias_name || row.platform_mall_name }}</template>
        </u-table-column>
        <u-table-column align="center" label="类目" width="">
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ getCategoryName(row.categoryId) }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="主图" width="80" prop="Sales">
          <template v-slot="{ row }">
            <div style="justify-content: center; display: flex">
              <el-tooltip
                effect="light"
                placement="right-end"
                :visible-arrow="false"
                :enterable="false"
                style="width: 56px; height: 56px; display: inline-block"
              >
                <div slot="content">
                  <el-image
                    v-if="row['isImgShow']"
                    :src="[row.imageList[0]] | imageRender"
                    style="width: 400px; height: 400px"
                  />
                  <el-image v-else :src="[ row.imageList[0],true] | imageRender" style="width: 400px; height: 400px" />
                </div>
                <el-image
                  :src="[row.imageList[0],true] | imageRender"
                  style="width: 56px; height: 56px"
                  @mouseenter="row['isImgShow'] = true"
                />
              </el-tooltip>
            </div>
          </template>
        </u-table-column>
        <u-table-column align="center" label="itemId" width="120">
          <template v-slot="{ row }">{{ row.itemid }}</template>
        </u-table-column>
        <u-table-column align="center" label="商品标题" min-width="150" prop="Price" fit>
          <template v-slot="{ row }">
            <div class="goodsTableLine" style="height: 60px;text-align: left">
              {{ row.name }}
            </div>
          </template>
        </u-table-column>
        <u-table-column align="center" sortable label="库存" width="100" prop="stock" show-overflow-tooltip />
        <u-table-column align="center" sortable label="销量" width="100" prop="sold" show-overflow-tooltip />
        <u-table-column align="center" sortable label="价格" width="100" prop="price" show-overflow-tooltip />
      </u-table>
    </div>
    <div class="on_new_dialog">
      <el-dialog
        title="类目映射"
        width="700px"
        top="25vh"
        :close-on-click-modal="false"
        :visible.sync="categoryVisible"
        :modal="false"
      >
        <categoryMapping v-if="categoryVisible" :goods-current="{}" :mall-list="mall" @categoryChange="categoryChange" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { batchOperation, sleep, terminateThread } from '../util/util'
import categoryMapping from '@/components/category-mapping'

export default {
  name: 'GoodsItemSelector',
  components: {
    categoryMapping
  },
  props: {
    mall: {
      type: Array,
      default() {
        return []
      }
    },
    isNeedFilterAct: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      searchParams: {
        type: 1,
        typeKey: '',
        sort: '',
        minPrice: '0',
        maxPrice: '999999',
        goodsCount: '1000',
        filterNo: '',
        minSales: '0',
        maxSales: '999999'
      },
      goodsSelect: [],
      goodsTable: [],
      country: '',
      category: '',
      categoryList: {},
      isRunning: false,
      isApplyCheck: true,
      categoryVisible: false,
      showlog: true
    }
  },
  computed: {
    // 获取类目名
    getCategoryName() {
      return function(id) {
        const categoryName = this.categoryList[`category_${id}`]
        return categoryName
      }
    }
  },

  mounted() {
    console.log('mallList', this.mall)
    this.country = this.mall.country
  },
  methods: {
    async queryGoods() {
      this.showlog = false
      this.$refs.goods_item_Logs.writeLog(`------开始获取商品列表------`, true)
      this.isRunning = true
      this.goodsTable = []
      const tempList = [...this.mall.map(i => {
        i['offset'] = 0
        return i
      })]
      await batchOperation(tempList, this.queryGoodsList)
      !this.isRunning && this.$refs.goods_item_Logs.writeLog(`------列表获取停止成功------`, false)
      this.$refs.goods_item_Logs.writeLog(`------商品列表获取结束------`, true)
      this.isRunning = false
    },
    cancelGoods() {
      this.showlog = false
      this.isRunning = false
      this.$refs.goods_item_Logs.writeLog(`------开始停止列表获取------`, false)
      terminateThread(this.queryGoodsList)
    },
    categoryChange(val) {
      if (val) {
        const categoryList = val.categoryList
        const category = categoryList[categoryList.length - 1] || ''
        this.category = category && category.category_id || ''
      }
      this.categoryVisible = false
    },
    async getCategoryTbInfo(item) {
      const catiDList = item?.global_cat?.catid || []
      const categoryId = catiDList[catiDList.length - 1] + ''
      const categoryName = this.categoryList[`category_${categoryId}`]
      if (!categoryName) {
        const categoryRes = await this.$appConfig.temporaryCacheInfo('get', `category_${categoryId}`, '')
        const categoryName = this.isJsonString(categoryRes)
        if (!categoryName || categoryRes === '{}') {
          this.$appConfig.temporaryCacheInfo('save', `category_${categoryId}`, '正在获取类目')
          const categoryTbInfoRes = await this.$commodityService.getCategoryTbInfo(this.country, categoryId, '0', '')
          const categoryTbInfoJson = this.isJsonString(categoryTbInfoRes)
          const categoryTbInfoData = categoryTbInfoJson.data
          const categories = categoryTbInfoData && categoryTbInfoData.categories && categoryTbInfoData.categories[0] || ''
          const category_cn_name = categories && categories.category_cn_name || '未匹配到类目'
          const category_name = categories && categories.category_name || '未匹配到类目'
          this.categoryList[`category_${categoryId}`] = category_cn_name
          this.$appConfig.temporaryCacheInfo('save', `category_${categoryId}`, { category_name, category_cn_name })
        } else {
          this.categoryList[`category_${categoryId}`] = categoryName['category_cn_name']
        }
      }
    },
    async queryGoodsList(item, count = { count: 1 }) {
      console.log(item)
      const mallName = item.mall_alias_name || item.platform_mall_name
      try {
        let offset = item.offset || 0
        let index = 0
        if (offset === 0) {
          index = 1
        } else {
          index = Math.floor((offset / 100) + 1)
        }
        const limit = this.searchParams.goodsCount < 100 && this.searchParams.goodsCount || item.limit || 100
        const parma = {
          mallId: item.platform_mall_id,
          offset: offset,
          limit: limit,
          is_ads: '0',
          need_brand: '0',
          need_item_model: '0'
        }
        if (this.searchParams.typeKey) {
          parma['search_type'] = this.searchParams.type
          parma['search_content'] = this.searchParams.typeKey
        }
        if (this.category) {
          parma['category_type'] = 'shopee'
          parma['category'] = this.category
        }
        this.$refs.goods_item_Logs.writeLog(`店铺【${mallName}】开始获取第${index}页商品列表`, true)
        await sleep(1000)
        const productSelectorJson = await this.$shopeemanService.productSelector(item.country, parma)
        const productSelectorRes = JSON.parse(productSelectorJson)
        const productSelectorData = JSON.parse(productSelectorRes.data)
        console.log('productSelectorJson', productSelectorData)
        const tempList = productSelectorData.data && productSelectorData.data.item_list || []
        const item_stock_price_infos = productSelectorData.data && productSelectorData.data.item_stock_price_infos || []
        let errorCount = 0
        for (const son of tempList) {
          let filterNoStr = this.searchParams.filterNo || ''
          filterNoStr = filterNoStr.replaceAll('，', ',')
          const filterNoList = filterNoStr && filterNoStr.split(',')
          if (son.price < this.searchParams.minPrice || son.price > this.searchParams.maxPrice || filterNoList.includes(son.itemid) ||
              son.sold < this.searchParams.minSales || son.sold > this.searchParams.maxSales) {
            ++errorCount
            continue
          }
          if (this.isApplyCheck && this.isNeedFilterAct) {
            const info = item_stock_price_infos.find(i => i.item_id === son.itemid)
            if (info && info.sku_stock_price_list[0]) {
              const price_info = info.sku_stock_price_list[0].price_info
              if (price_info.price_promotion_type) {
                console.log('isApplyCheck',info)
                ++errorCount
                continue
              }
            }
          }
          await this.getCategoryTbInfo(son)
          const catIdList = son?.global_cat?.catid || []
          const temp = Object.assign(son, {
            platform_mall_id: item.platform_mall_id,
            platform_mall_name: item.platform_mall_name,
            mall_alias_name: item.mall_alias_name,
            categoryId: catIdList[catIdList.length - 1] || '',
            country: item.country,
            style_id: item.id,
            imageList: son.images && son.images.split(',')
          })
          temp && this.goodsTable.push(temp)
        }
        this.$refs.goods_item_Logs.writeLog(`店铺【${mallName}】获取第${index}页商品列表成功，共商品${tempList.length - errorCount}个`, true)
        const goodsCount = this.searchParams.goodsCount
        offset += 100
        if (this.isRunning && tempList.length === 100 && offset < goodsCount) {
          const number = (goodsCount - offset) < 100 && (goodsCount - offset) || 100
          await batchOperation([Object.assign(item, { offset: offset, limit: number })], this.queryGoodsList)
          console.log(this.goodsTable)
        } else {
          this.$refs.goods_item_Logs.writeLog(`店铺【${mallName}】获取商品列表结束`, true)
          item.offset = 0
          item.limit = 100
        }
      } catch (e) {
        this.$refs.goods_item_Logs.writeLog(`店铺【${mallName}】获取商品列表失败`, false)
        console.log(e)
      } finally {
        --count.count
      }
    },
    handleSelectionChange(val) {
      this.goodsSelect = val
    },
    changeGoodsItem() {
      this.$emit('changeGoodsItem', { goodsList: this.goodsSelect })
    },
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

<style lang="less">
.goods-item-selector {
  .header-list {
    display: flex;
    margin-bottom: 10px;
    align-items: center;

    .header-item {
      display: flex;
      align-items: center;
      margin-right: 10px;
      justify-content: center;

      .item-text {
        width: 90px;
        text-align: right;
        white-space: nowrap;
        margin-right: 5px;
      }
    }
  }

  .heng {
    width: 10px;
    height: 0;
    border: #1a1a1a 1px solid;
    margin: 0 5px;
    border-radius: 5px;
  }

}

.goods-item-table {

}

.goodsTableLine {
  white-space: normal;
  height: 56px;
  width: 100%;
  border: 1px #999999 solid;
  border-radius: 3px;
  padding: 0 5px 5px;
  line-height: 1.5;
  overflow: auto;
}
</style>

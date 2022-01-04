<template>
  <div class="goods-item-selector">
    <div class="goods-item-header">
      <div class="header-list">
        <div class="header-item">
          <el-select v-model="searchParams.type" size="mini" style="margin-right: 5px;width: 120px;">
            <el-option :value="0" label="关键字"></el-option>
            <el-option :value="1" label="商品编号"></el-option>
          </el-select>
          <el-input style="width: 120px;" size="mini" v-model="searchParams.typeKey"></el-input>
        </div>
        <div class="header-item">
          <div class="item-text">排序：</div>
          <el-select style="width: 120px;" size="mini" v-model="searchParams.sort">
            <el-option :value="''" label="默认排序"></el-option>
            <el-option :value="'sales'" label="销量从低往高"></el-option>
            <el-option :value="'-sales'" label="销量从高往低"></el-option>
            <el-option :value="'price'" label="价格从低往高"></el-option>
            <el-option :value="'-price'" label="价格从高往低"></el-option>
          </el-select>
        </div>
        <div class="header-item">
          <div class="item-text">价格区间：</div>
          <el-input style="width: 120px;" size="mini" v-model="searchParams.minPrice"></el-input>
          <div class="heng"/>
          <el-input style="width: 120px;" size="mini" v-model="searchParams.maxPrice"></el-input>
        </div>
        <el-button type="primary" size="mini" @click="categoryVisible = true">选择类目</el-button>
        <el-button type="primary" size="mini" @click="queryGoods">查询商品</el-button>
        <el-button type="" size="mini" @click="cancelGoods">取消查询</el-button>
      </div>
      <div class="header-list">
        <div class="header-item">
          <div class="item-text" style="width: 120px;">每一个店铺商品数量：</div>
          <el-input style="width: 120px;" size="mini" v-model="searchParams.goodsCount"></el-input>
        </div>
        <div class="header-item">
          <div class="item-text">过滤商品编号：</div>
          <el-input style="width: 120px;" size="mini" v-model="searchParams.filterNo"></el-input>
          <el-tooltip class="item" effect="dark" content="不同商品id使用,号隔开" placement="top">
            <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
          </el-tooltip>
        </div>
        <div class="header-item">
          <div class="item-text" style="width: 72px;">销量区间：</div>
          <el-input size="mini" style="width: 120px;" v-model="searchParams.minSales"></el-input>
          <div class="heng"/>
          <el-input size="mini" style="width: 120px;" v-model="searchParams.maxSales"></el-input>
        </div>
        <el-button type="primary" size="mini" @click="changeGoodsItem">添加已选商品</el-button>
        <el-checkbox style="margin-left: 10px;" size="mini" v-model="isApplyCheck">仅显示适用商品</el-checkbox>
        <el-checkbox style="margin-left: 10px;" size="mini" v-model="showlog">隐藏日志</el-checkbox>
      </div>
    </div>
    <Logs ref="goods_item_Logs" v-model="showlog" clear/>
    <div class="goods-item-table">
      <u-table ref="goodsTable"
               height="620px"
               :data="goodsTable"
               :data-changes-scroll-top="false"
               :header-cell-style="{backgroundColor: '#f5f7fa',}"
               :big-data-checkbox="true"
               :border="false"
               use-virtual
               @selection-change="handleSelectionChange">
        <u-table-column align="center" type="selection"/>
        <u-table-column align="center" type="index" width="80" label="序号"/>
        <u-table-column align="center" label="店铺名称" width="150" show-overflow-tooltip>
          <template v-slot="{ row }">{{ row.mall_alias_name || row.platform_mall_name }}</template>
        </u-table-column>
        <u-table-column align="center" label="类目" width="">
          <template v-slot="{ row }">
            <!--            <p style="white-space: normal">{{ sourceObj[row.source + ''] }}</p>-->
          </template>
        </u-table-column>
        <u-table-column align="center" label="主图" width="80" prop="Sales">
          <template v-slot="{ row }">
            <div style="justify-content: center; display: flex">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px; display: inline-block">
              <div slot="content">
                <el-image v-bind:src="[ row.imageList[0]] | imageRender" style="width: 400px; height: 400px" />
              </div>
              <el-image v-bind:src="[row.imageList[0],true] | imageRender" style="width: 56px; height: 56px" />
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
        <u-table-column align="center" sortable label="库存" width="100" prop="stock" show-overflow-tooltip/>
        <u-table-column align="center" sortable label="销量" width="100" prop="sold" show-overflow-tooltip/>
        <u-table-column align="center" sortable label="价格" width="100" prop="price" show-overflow-tooltip/>
      </u-table>
    </div>
    <div class="on_new_dialog">
      <el-dialog title="类目映射" width="700px" top="25vh" :close-on-click-modal="false" :visible.sync="categoryVisible" :modal="false">
        <categoryMapping v-if="categoryVisible" :goods-current="{}" :mall-list="mall" @categoryChange="categoryChange"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { batchOperation, sleep, terminateThread } from '../util/util'
import categoryMapping from '@/components/category-mapping'

export default {
  name: 'goods-item-selector',
  props: {
    mall: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    categoryMapping
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
      country:'',
      category: '',
      isRunning: true,
      isApplyCheck: true,
      categoryVisible:false,
      showlog:true,
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
      await batchOperation(this.mall, this.queryGoodsList)
      !this.isRunning && this.$refs.goods_item_Logs.writeLog(`------列表获取停止成功------`, false)
      this.$refs.goods_item_Logs.writeLog(`------商品列表获取结束------`, true)
    },
    cancelGoods(){
      this.showlog = false
      this.isRunning = false
      this.$refs.goods_item_Logs.writeLog(`------开始停止列表获取------`, false)
      terminateThread(this.queryGoodsList)
    },
    categoryChange(val){
      console.log('categoryChange',val)
      if (val){
        let categoryList = val.categoryList
        let category = categoryList[categoryList.length-1] || ''
        this.category = category && category.category_id || ''
      }
      this.categoryVisible= false
    },
    async queryGoodsList(item, count = { count: 1 }) {
      let mallName = item.mall_alias_name || item.platform_mall_name
      try {
        let offset = item.offset || 0
        let index = 0
        if (offset === 0){
          index = 1
        }else{
          index = (offset / 100) + 1
        }
        let parma = {
          mallId: item.platform_mall_id,
          offset: offset,
          limit: item.limit || 100,
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
        let productSelectorJson = await this.$shopeemanService.productSelector(item.country, parma)
        let productSelectorRes = JSON.parse(productSelectorJson)
        let productSelectorData = JSON.parse(productSelectorRes.data)
        console.log('productSelectorJson', productSelectorData)
        let tempList = productSelectorData.data && productSelectorData.data.item_list || []
        this.$refs.goods_item_Logs.writeLog(`店铺【${mallName}】获取第${index}页商品列表成功，共商品${tempList.length}个`, true)
        tempList.forEach(son => {
          if (this.isApplyCheck){
            let filterNoStr = this.searchParams.filterNo || ''
            filterNoStr = filterNoStr.replaceAll('，',',')
            let filterNoList = filterNoStr && filterNoStr.split(',')
            if (son.price < this.searchParams.minPrice || son.price > this.searchParams.maxPrice || filterNoList.includes(son.itemid)
                || son.sold < this.searchParams.minSales || son.sold > this.searchParams.maxSales){
              return
            }
          }
          let temp = Object.assign(son, {
              platform_mall_id: item.platform_mall_id,
              platform_mall_name: item.platform_mall_name,
              mall_alias_name: item.mall_alias_name,
              country: item.country,
              style_id: item.id,
              imageList :son.images && son.images.split(',')
            })
          temp && this.goodsTable.push(temp)
        })
        let goodsCount = this.searchParams.goodsCount
        offset += 100
        if (this.isRunning && tempList.length === 100 && offset < goodsCount) {
          let number = (goodsCount - offset) < 100 && (goodsCount - offset) || 100
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
    changeGoodsItem(){
      this.$emit('changeGoodsItem',{goodsList:this.goodsSelect})
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
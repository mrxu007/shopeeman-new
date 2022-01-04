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
        <el-button type="primary" size="mini">选择类目</el-button>
        <el-button type="primary" size="mini" @click="queryGoods">查询商品</el-button>
        <el-button type="" size="mini">取消查询</el-button>
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
        <el-button type="primary" size="mini">添加已选商品</el-button>
      </div>
    </div>
    <div class="goods-item-table">
      <u-table ref="goodsTable"
               height="620px"
               :data="goodsTable"
               :data-changes-scroll-top="false"
               :header-cell-style="{backgroundColor: '#f5f7fa',}"
               :big-data-checkbox="true"
               :border="false"
               @selection-change="handleSelectionChange">
        <u-table-column align="center" type="selection"/>
        <u-table-column align="center" type="index" label="序号"/>
        <u-table-column align="center" label="店铺名称" width="">
          <template v-slot="{ row }">
            {{ row.mall_alias_name || row.platform_mall_name }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="类目" width="">
          <template v-slot="{ row }">
            <!--            <p style="white-space: normal">{{ sourceObj[row.source + ''] }}</p>-->
          </template>
        </u-table-column>
        <u-table-column align="center" label="主图" width="80" prop="Sales">
          <template v-slot="{ row }">
            <div style="justify-content: center; display: flex">
              <img :src="row.image" style="width: 56px; height: 56px">
            </div>
          </template>
        </u-table-column>
        <u-table-column align="center" label="商品Id" width="">
          <template v-slot="{ row }">{{ row.itemid }}</template>
        </u-table-column>
        <u-table-column align="center" label="商品标题" width="150" prop="Price" fit>
          <template v-slot="{ row }">
            <div class="goodsTableLine" style="height: 80px;text-align: left">
              {{ row.name }}
            </div>
          </template>
        </u-table-column>
        <u-table-column align="center" label="库存" width="90" prop="stock" show-overflow-tooltip/>
        <u-table-column align="center" label="销量" width="90" prop="sold" show-overflow-tooltip/>
        <u-table-column align="center" label="价格" width="90" prop="price" show-overflow-tooltip/>
      </u-table>
    </div>
  </div>
</template>

<script>
import { batchOperation, getGoodsUrl, sleep } from '../util/util'

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
      category: '',
      isRunning: true
    }
  },
  mounted() {
    console.log('mallList', this.mall)

  },
  methods: {
    async queryGoods() {
      this.goodsTable = []
      await batchOperation(this.mall, this.queryGoodsList)
    },
    async queryGoodsList(item, count = { count: 1 }) {
      try {
        let offset = item.offset || 0
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
        let productSelectorJson = await this.$shopeemanService.productSelector(item.country, parma)
        let productSelectorRes = JSON.parse(productSelectorJson)
        let productSelectorData = JSON.parse(productSelectorRes.data)
        console.log('productSelectorJson', productSelectorData)
        let tempList = productSelectorData.data && productSelectorData.data.item_list || []
        tempList.forEach(son => {
          let temp = Object.assign(son, {
            platform_mall_id: item.platform_mall_id,
            platform_mall_name: item.platform_mall_name,
            mall_alias_name: item.mall_alias_name,
            country: item.country,
            style_id: item.id
          })
          this.goodsTable.push(temp)
        })
        let goodsCount = this.searchParams.goodsCount
        offset += 100
        if (this.isRunning && tempList.length === 100 && offset < goodsCount) {
          let number = (goodsCount - offset) < 100 && (goodsCount - offset) || 100
          let time = 3000 + Math.floor(Math.random() * 3000)
          await sleep(time)
          await batchOperation([Object.assign(item, { offset: offset, limit: number })], this.queryGoodsList)
          console.log(this.goodsTable)
        } else {
          item.offset = 0
          item.limit = 100
        }
      } catch (e) {
        console.log(e)
      } finally {
        --count.count
      }
    },
    handleSelectionChange(val) {
      this.goodsSelect = val
    }
  }
}
</script>

<style lang="less">
.goods-item-selector {
  .header-list {
    display: flex;
    margin-bottom: 10px;

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
<!--
 * @Author: your name
 * @Date: 2021-12-01 10:57:37
 * @LastEditTime: 2021-12-01 15:33:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\imageCollection.vue
-->
<template>
  <div class="image-collection">
    <div class="detail">
      <div v-if="!chooseData.goods_info || !chooseData.goods_info.goods_img" class="img">暂无图片</div>
      <img
        v-if="chooseData.goods_info && chooseData.goods_info.goods_img"
        :src="[chooseData.country, chooseData.mall_info ? chooseData.mall_info.platform_mall_id : '', chooseData.goods_info.goods_img] | imageRender"
        style="object-fit: contain; width: 56px; height: 56px"
      />
      <div class="desc">
        <p>{{ chooseData.goods_info && chooseData.goods_info.goods_name ? chooseData.goods_info.goods_name : '无商品名称' }}</p>
        <p>商品规格: {{ chooseData.goods_info.goods_spec }}</p>
        <p>
          采购来源：{{ sourceName(chooseData.goods_info.ori_platform_id) }}
          <a href="javascript:void(0)" class="bright" @click="$BaseUtilService.openUrl(chooseData.goods_info.ori_url)">{{ chooseData.goods_info.ori_goods_id }} </a>
        </p>
      </div>
    </div>
    <div style="border-top: 1px solid #ebeef5" class="collection-box">
      <el-table v-if="collectType === '1688'" v-loading="tableLoading" :header-cell-style="{ backgroundColor: '#f5f7fa' }" :data="tbSameList" height="68vh" style="width: 100%">
        <el-table-column prop="image" label="主图" width="80">
          <template slot-scope="{ row }">
            <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px">
              <div slot="content">
                <img :src="row.image.imgUrlOf290x290" width="400px" height="400px" />
              </div>
              <el-image :src="row.image.imgUrlOf100x100" alt="" width="56px" height="56px" style="border-radius: 4px; margin-right: 5px"
            /></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="上家id" width="120">
          <template slot-scope="{ row }">
            <a src="#" style="cursor: pointer" class="tabletext bright" @click="$BaseUtilService.openUrl(row.information.detailUrl)">{{ row.id }}</a>
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="280px">
          <template slot-scope="{ row }">
            <span v-if="row.information">{{ row.information.subject }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label="类目" width="120" /> -->
        <el-table-column align="center" prop="tradePrice.offerPrice.valueString" sortable label="价格" width="100">
          <template slot-scope="{ row }">
            <span v-if="row.tradePrice && row.tradePrice.offerPrice && row.tradePrice.offerPrice.valueString">{{ row.tradePrice.offerPrice.valueString }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="销量" prop="tradeQuantity.saleQuantity" sortable align="center" width="80">
          <template slot-scope="{ row }">
            <span v-if="row.tradeQuantity && row.tradeQuantity.saleQuantity">{{ row.tradeQuantity.saleQuantity }}</span>
            <span v-else>0</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货地" width="120">
          <template slot-scope="{ row }">
            <span v-if="row.company">{{ row.company.province }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="icon" align="center" label="来源" width="60">{{ collectType }}</el-table-column>
        <el-table-column label="操作" min-width="200">
          <template slot-scope="{ row }">
            <p style="cursor: pointer" class="tabletext bright" @click="setpurchasesList(row, 0)">设置为采购地址</p>
            <p style="cursor: pointer" class="tabletext bright" @click="setpurchasesList(row, 1)">设置为默认采购地址</p>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="collectType === '淘宝'" v-loading="tableLoading" :data="tbSameList" height="68vh" style="width: 100%">
        <el-table-column prop="image" label="主图" width="80">
          <template slot-scope="{ row }">
            <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px">
              <div slot="content">
                <img :src="row.pic_url" width="400px" height="400px" />
              </div>
              <el-image :src="row.pic_url" alt="" width="56px" height="56px" style="border-radius: 4px; margin-right: 5px"
            /></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="上家id" width="120">
          <template slot-scope="{ row }">
            <a src="#" style="cursor: pointer" class="tabletext bright" @click="$BaseUtilService.openUrl('https:' + row.detail_url)">{{ row.nid }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="raw_title" label="标题" min-width="280px">
          <template slot-scope="{ row }">
            <span v-if="row.raw_title">{{ row.raw_title }}</span>
          </template>
        </el-table-column>
        <!--  <el-table-column prop="category" label="类目ID" width="120" /> -->
        <el-table-column prop="view_price" align="center" label="价格" sortable width="90">
          <template slot-scope="{ row }">
            <span v-if="row.view_price">{{ row.view_price }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="view_sales" align="center" label="销量" sortable width="90">
          <template slot-scope="{ row }">
            <span v-if="row.view_sales">{{ row.view_sales }}</span>
            <span v-else>0</span>
          </template>
        </el-table-column>
        <el-table-column prop="item_loc" align="center" label="发货地" width="100">
          <template slot-scope="{ row }">
            <span v-if="row.item_loc">{{ row.item_loc }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="icon" align="center" label="来源" width="60">{{ collectType }}</el-table-column>
        <el-table-column label="操作" min-width="200px">
          <template slot-scope="{ row }">
            <p style="cursor: pointer" class="tabletext bright" @click="setpurchasesList(row, 0)">设置为采购地址</p>
            <p style="cursor: pointer" class="tabletext bright" @click="setpurchasesList(row, 1)">设置为默认采购地址</p>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div v-if="collectType === '1688'" >
          <el-pagination
            style="display: inline-block"
            background
            :current-page="sameData.page"
            :page-size="sameData.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="sameData.total"
            @current-change="newPage1"
          />
        </div> -->
    </div>
  </div>
</template>

<script>
import { sourceName } from './orderCenter'
export default {
  name: 'ImageCollection',
  data() {
    return {
      tableLoading: false,
      tbSameList: [],
    }
  },
  props: {
    chooseData: {
      type: Object,
      default: {},
    },
    collectType: {
      type: String,
      default: '淘宝',
    },
  },
  mounted() {
    this.searchFromImg()
  },
  methods: {
    async searchFromImg() {
      this.tableLoading = true
      let imgUrl = this.$filters.imageRender([this.chooseData.country, this.chooseData.mall_info ? this.chooseData.mall_info.platform_mall_id : '', this.chooseData.goods_info.goods_img])
      this.getBase64(imgUrl, (base64) => {
        let params = { ImageBase64: base64.replace('data:image/jpeg;base64,', ''), Page: 1 }
        let platform = '8'
        if (this.collectType === '淘宝') {
          platform = '2'
          params = { ImageBase64: base64.replace('data:image/jpeg;base64,', '') }
        }
        console.log(JSON.stringify(params))
        this.$collectService.imgSearch(platform, JSON.stringify(params)).then((res) => {
            console.log('1111', res)
            this.tableLoading = false
            if (res.data.code === 0) {
              if (this.collectType === '淘宝') {
                this.tbSameList = res.data.data.mods.itemlist.data.collections[0].auctions
              }
              if (this.collectType === '1688') {
                this.tbSameList = res.data.data.data.offerList
                // this.sameData.total = res.data.data.data.totalCount
              }
            }
          })
        //   .catch((err) => {
        //     this.tableLoading = false
        //     console.log(err)
        //   })
      })
    },
    // url转base64
    getBase64(url, callback) {
      var Img = new Image()
      var dataURL = ''
      Img.src = url + '?v=' + Math.random()
      Img.setAttribute('crossOrigin', 'Anonymous')
      Img.onload = function () {
        var canvas = document.createElement('canvas')
        var width = Img.width
        var height = Img.height
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(Img, 0, 0, width, height)
        dataURL = canvas.toDataURL('image/jpeg')
        return callback ? callback(dataURL) : null
      }
    },
    sourceName,
  },
}
</script>

<style lang="less" scoped>
.image-collection {
  .detail {
    display: flex;
    align-items: center;
    margin: -18px 0 30px;
    .img {
      background: rgb(245, 247, 250);
      width: 56px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      font-size: 12px;
    }
    .desc {
      width: 60%;
      margin-left: 18px;

      p {
        padding-bottom: 8px;
        &:first-child {
          font-weight: 600;
          color: #353232;
        }
        &:nth-child(2) {
          font-size: 13px;
        }
        &:last-child {
          font-weight: 500;
          color: #000;
        }
      }
    }
  }
}
</style>
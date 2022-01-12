<template>
  <div class="suit-style">
    <div class="header-btn">
      <storeChoose @changeMallList="changeMallList" :is-all="false" />
      <div class="header-row">
        <div class="item-box">
          <span>活动类型：</span>
          <el-select v-model="activeState" placeholder="请选择店铺" clearable size="mini" filterable style="width: 100px">
            <el-option label="全部" :value="1" />
            <el-option v-for="(item, index) in statuslist" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-button type="primary" :disabled="loading" size="mini" @click="batchGetSuitData" style="margin-left: 27px">搜索</el-button>
        <el-button type="primary" :disabled="loading" size="mini" @click="openCreateActive">创建套装促销活动</el-button>
        <el-button type="primary" size="mini" @click="stopCreate">停止活动创建</el-button>
        <el-button type="primary" :disabled="loading" size="mini" @click="batchStopSuit(multipleSelection)">批量删除/结束勾选活动</el-button>
        <el-button type="primary" :disabled="loading" size="mini" @click="clearLog">清除日志</el-button>
        <el-checkbox v-model="showlog" class="mar-left">隐藏日志</el-checkbox>
        <el-checkbox v-model="showexpiredactivities">不显示过期活动</el-checkbox>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="plTable"
        v-loading="loading"
        style="margin-top: 10px"
        header-align="center"
        height="calc(100vh - 110px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" label="序号" width="60" type="index" />
        <el-table-column align="center" label="店铺" width="180" prop="mallName" />
        <el-table-column prop="name" label="套装促销名称" width="160" align="center" />
        <el-table-column prop="usage_limit" label="限购次数" width="80" align="center" />
        <el-table-column prop="time_status" label="活动规则" width="280" align="center" show-overflow-tooltip>
          <template v-slot="{ row }">
            <span>{{ changeRule(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time_status" label="活动状态" width="120" align="center">
          <template v-slot="{ row }">
            <span :style="{ color: row.time_status == 2 ? 'orange' : row.time_status == 3 ? '#0ad10a' : '#000' }"> {{ changeType(row.time_status) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="extinfo_images.item_total_count" label="商品数量" width="100" align="center" />
        <el-table-column prop="time" label="促销期间" width="280" align="center">
          <template v-slot="{ row }">
            {{ `${$dayjs(row.start_time * 1000).format('YYYY/MM/DD HH:mm:ss')} - ${$dayjs(row.end_time * 1000).format('YYYY/MM/DD HH:mm:ss')}` }}
          </template>
        </el-table-column>
        <el-table-column prop="shippingcount" label="操作" align="center" width="370">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="updateSuit(row)">编辑商品</el-button>
            <el-button type="primary" size="mini" @click="copyActive(row)">复制活动</el-button>
            <el-button type="primary" size="mini" @click="shareLink(row)">分享链接</el-button>
            <el-button v-if="row.time_status === 3" type="primary" size="mini" @click="batchStopSuit([row])">结束</el-button>
            <el-button v-if="row.time_status === 2" type="primary" size="mini" @click="batchStopSuit([row])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Logs ref="Logs" v-model="showlog" clear />
    <el-dialog title="创建套装促销活动" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="creatactivity" v-if="creatactivity" width="450px" @close="closeDialog">
      <div class="create-style">
        <div class="item-box">
          <span>套装名称：</span>
          <el-input v-model="creatname" clearable size="mini" placeholder="24个字符以内" oninput="value=value.replace(/\s+/g,'')" style="width: 260px" />
        </div>
        <div class="item-box mar-top">
          <span>套装期间：</span>
          <el-date-picker
            v-model="creattime"
            format="yyyy-MM-dd HH:mm:ss"
            unlink-panels
            size="mini"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 340px"
          />
        </div>
        <div class="item-box mar-top">
          <span>套装类型：</span>
          <el-radio-group v-model="radio">
            <el-radio :label="2">折扣比率</el-radio>
            <el-radio :label="3">折扣金额</el-radio>
            <el-radio :label="1">套装特价</el-radio>
          </el-radio-group>
        </div>
        <div class="diff-type mar-top" v-if="radio == 2">
          <div class="diff-item">
            <p>购买</p>
            <el-input v-model="creatnum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 100px" />
            <p>个商品</p>
            <el-input v-model="creatdiscount" clearable size="mini" oninput="value=value.replace(/[^\d]/g,'')" style="width: 120px" @input="changeCreateDiscount">
              <template slot="append" style="width: 30px">%</template>
            </el-input>
          </div>
          <div class="diff-item" mar-top>
            <p class="activeColor mar-top" v-if="creatdiscount">*折扣比率 = 总结算价 - {{ creatdiscount }}%</p>
            <p class="activeColor mar-top" v-if="isNull">此栏位最小值必须>=1且为整数</p>
          </div>
        </div>
        <div class="diff-type mar-top" v-if="radio == 3">
          <div class="diff-item">
            <p>购买</p>
            <el-input v-model="creatnum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 100px" />
            <p>个商品</p>
            <el-input v-model="creatdiscount" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 120px" @change="changeCreateDiscount">
              <template slot="append" style="width: 30px">{{ country | siteCoin }}</template>
            </el-input>
          </div>
          <div class="diff-item mar-top">
            <p class="activeColor mar-top" v-if="creatdiscount">*折扣金额 = 总结算价 - {{ country | siteCoin }}{{ creatdiscount }}</p>
            <p class="activeColor mar-top" v-if="isNull">此栏位最小值必须>=1且为整数</p>
          </div>
        </div>
        <div class="diff-type mar-top" v-if="radio == 1">
          <div class="diff-item">
            <p>购买</p>
            <el-input v-model="creatnum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 100px" />
            <p>个商品</p>
            <el-input v-model="creatdiscount" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 120px" @change="changeCreateDiscount">
              <template slot="append" style="width: 30px">{{ country | siteCoin }}</template>
            </el-input>
          </div>
          <div class="diff-item mar-top">
            <p class="activeColor mar-top" v-if="creatdiscount">*套装特价{{ country | siteCoin }}{{ creatdiscount }}</p>
            <p class="activeColor mar-top" v-if="isNull">此栏位最小值必须>=1且为整数</p>
          </div>
        </div>
        <div class="item-box mar-top">
          <span>购买限制：</span>
          买家最多可以购买此套装优惠
          <el-input v-model="creatcount" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 100px" />
          次
        </div>
        <div class="item-box mar-top">
          <el-button type="primary" style="margin-left: 130px" size="mini" @click="batchCreateSuit">保存</el-button>
          <el-button type="primary" size="mini" @click="creatactivity = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="编辑活动" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="updateSuitVisible" v-if="updateSuitVisible" width="1200px" @close="closeDialog">
      <div class="create-style">
        <div class="header-btn">
          <p class="activeColor">开启商品后，请勿更换物流商，否则买家无法购买套装优惠。</p>
          <div class="header-row">
            <div class="item-box">
              <span>商品ID：</span>
              <el-input v-model="goodsID" size="mini"></el-input>
            </div>
            <el-button size="mini" type="primary" class="mar-left" @click="searchSuitGoods">搜索</el-button>
            <el-button size="mini" type="primary" @click="goodsItemSelectorVisible = true">添加商品</el-button>
            <el-button size="mini" type="primary" @click="batchDeleteSuitGoods(goodsSelection)">批量删除</el-button>
            <el-button size="mini" type="primary" @click="batchCloseSuitGoods(goodsSelection, 0)">批量关闭</el-button>
            <el-button size="mini" type="primary" @click="batchCloseSuitGoods(goodsSelection, 1)">批量开启</el-button>
          </div>
        </div>
        <el-table
          ref="editTable"
          v-loading="editLoading"
          style="margin-top: 10px"
          header-align="center"
          height="400"
          :data="editGoodsList"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
          @selection-change="handleSelectionChange1"
        >
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" label="序号" width="60" type="index" />
          <el-table-column align="center" label="商品ID" width="120" prop="itemid" />
          <el-table-column label="商品图片" width="80" align="center">
            <template slot-scope="scope">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 32px; height: 32px; display: inline-block">
                <div slot="content">
                  <el-image :src="[scope.row.images[0]] | imageRender" style="width: 400px; height: 400px" />
                </div>
                <el-image v-bind:src="[scope.row.images[0], true] | imageRender" style="width: 32px; height: 32px"></el-image>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="标题" width="140" align="center" show-overflow-tooltip />
          <el-table-column prop="price" label="价格" width="80" align="center" />
          <el-table-column prop="stock" label="库存" width="80" align="center" />
          <el-table-column label="运送渠道" width="260" align="center">
            <template slot-scope="{ row }">
              <p v-html="shipType"></p>
            </template>
          </el-table-column>

          <el-table-column label="开关" width="80" align="center">
            <template slot-scope="{ row }">
              <el-switch v-model="row.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" @change="batchCloseSuitGoods([row], row.status)"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="shippingcount" label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button type="primary" size="mini" @click="batchDeleteSuitGoods([row])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="goodsItemSelectorVisible" top="7vh" title="商品选择" :close-on-click-modal="false" :close-on-press-escape="false" width="1280px">
      <goodsItemSelector v-if="goodsItemSelectorVisible" :mall="selectMallListEdit" @changeGoodsItem="changeGoodsItem" />
    </el-dialog>
  </div>
</template>
<script>
import storeChoose from '../../../components/store-choose'
import { batchOperation, delay, terminateThread, creatDate } from '@/util/util'
import goodsItemSelector from '../../../components/goods-item-selector'
export default {
  components: {
    storeChoose,
    goodsItemSelector,
  },
  data() {
    return {
      isNull: false,
      loading: false,
      showlog: false,
      showexpiredactivities: true,
      creatactivity: false,
      creatactivity1: false,
      radio: 2,
      creatnum: 2,
      creatdiscount: 1,
      creatcount: 1,
      creatname: '',
      tableData: [],
      errmall: [],
      creattime: [],
      statuslist: [
        { label: '进行中', value: 3 },
        { label: '即将开始', value: 2 },
        { label: '已过期', value: 4 },
      ],
      activeState: 1,
      selectMallList: [],
      country: '',
      multipleSelection: [],
      updateSuitVisible: false,
      editGoodsList: [],
      goodsSelection: [],
      goodsID: '',
      editLoading: false,
      shipType: '',
      activeRow: {},
      selectMallListEdit: [],
      goodsItemSelectorVisible: false,
      createType: '',
      editGoodsListCopy: [],
    }
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.radio = 2
      this.creatnum = 2
      this.creatdiscount = 1
      this.creatcount = 1
      this.creatname = ''
      this.createType = ''
      this.editGoodsList = []
      this.activeRow = {}
    },
    openCreateActive() {
      this.creatactivity = true
      let startTime = new Date().getTime() + 1000 * 60 * 30
      let endTime = startTime + 1 * 60 * 60 * 1000
      this.creattime = [this.$dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'), this.$dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')]
    },
    copyActive(row) {
      console.log(row)
      this.activeRow = row
      this.creatactivity = true
      let startTime = new Date().getTime() + 1000 * 60 * 30
      let endTime = startTime + 1 * 60 * 60 * 1000
      this.creattime = [this.$dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'), this.$dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')]
      this.createType = 'single'
      this.radio = row.bundle_deal_rule.rule_type
      this.creatnum = row.bundle_deal_rule.min_amount
      this.creatcount = row.usage_limit
      if (row.bundle_deal_rule.rule_type === 1) {
        this.creatdiscount = Number(row.bundle_deal_rule.fix_price)
      } else if (row.bundle_deal_rule.rule_type === 2) {
        this.creatdiscount = Number(row.bundle_deal_rule.discount_percentage)
      } else {
        this.creatdiscount = Number(row.bundle_deal_rule.discount_value)
      }
    },
    changeRule(row) {
      let str = ''
      if (row.bundle_deal_rule.rule_type === 1) {
        str = `购买【${row.bundle_deal_rule.min_amount}】个商品【${row.bundle_deal_rule.fix_price}${this.$filters.siteCoin(row.country)}】`
      } else if (row.bundle_deal_rule.rule_type === 2) {
        str = `购买【${row.bundle_deal_rule.min_amount}】个商品优惠【${row.bundle_deal_rule.discount_percentage}%】`
      } else {
        str = `购买【${row.bundle_deal_rule.min_amount}】个商品优惠【${row.bundle_deal_rule.discount_value}${this.$filters.siteCoin(row.country)}】`
      }
      return str
    },
    //分享链接
    async shareLink(row) {
      let url = await this.$shopeemanService.getWebUrl(row.country)
      let link = url + '/bundle-deal/' + row.bundle_deal_id
      this.copyItem(link)
    },
    //点击复制
    copyItem(attr) {
      const target = document.createElement('div')
      target.id = 'tempTarget'
      target.style.opacity = '0'
      target.innerText = attr
      document.body.appendChild(target)
      try {
        const range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        this.$message.success('复制成功')
      } catch (e) {
        // console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    },
    async searchSuitGoods() {
      if (this.goodsID) {
        let resData = this.editGoodsListCopy.find((n) => n.itemid == this.goodsID)
        if (resData) {
          this.editGoodsList = [resData]
        }
      } else {
        this.shipType = ''
        this.editGoodsList = []
        let shipParams = {
          bundle_deal_id: this.activeRow.bundle_deal_id,
          need_all: 0,
          country: this.activeRow.country,
          mallId: this.activeRow.mallId,
        }
        let resShip = await this.$shopeemanService.getSuitShipType(this.activeRow.country, shipParams)
        if (resShip.code === 200) {
          if (resShip.data.shop_logistics_info.disabled) {
            resShip.data.shop_logistics_info.disabled.forEach((item) => {
              this.shipType = this.shipType + `<p>${item.display_name}</p>`
            })
          }
          if (resShip.data.shop_logistics_info.enabled) {
            resShip.data.shop_logistics_info.enabled.forEach((item) => {
              this.shipType = this.shipType + `<p>${item.display_name}</p>`
            })
          }
          let obj = (resShip.data && resShip.data.items) || []
          let arrStr = []
          obj.forEach((item) => {
            arrStr.push(item.itemid.toString())
          })
          let params = {
            query:
              'query Products($productIds: [String], $statusType: Int) {\n      products(productIds: $productIds, statusType: $statusType) \n    {\n      items {\n        itemid,\n    sold,\n    price,\n    promotions {\n      itemid,\n      promotionId,\n      startTime,\n      price,\n      endTime,\n      promotionType\n    },\n    logisticsChannels {\n      name,\n      enabled\n    },\n        name,\n        inputOriginPrice,\n        originPrice,\n        normalStock,\n        status,\n        stock,\n        pffTag,\n        normalSellerStock,\n        normalWmsStock,\n        images,\n        hasWholesale,\n        minPurchaseLimit,\n        modelList {\n          itemid,\n          modelid,\n          name,\n          inputOriginPrice,\n          originPrice,\n          normalStock,\n          stock,\n          pffTag,\n          normalSellerStock,\n          normalWmsStock,\n          isDefault\n        }\n      }\n    }\n  \n    }',
            variables: {
              productIds: arrStr,
              statusType: 0,
            },
            mallId: this.activeRow.mallId,
          }
          this.editLoading = true
          let res = await this.$shopeemanService.getSuitGoods(this.activeRow.country, params)
          if (res.code === 200) {
            this.editGoodsList = res.data
            this.editGoodsListCopy = JSON.parse(JSON.stringify(res.data))
            console.log('editGoodsList', this.editGoodsList)
          } else {
            this.$message.error(`获取商品详情失败`)
          }
        }
        this.editLoading = false
        console.log(resShip, 'resShip')
      }
    },
    //选择商品
    async changeGoodsItem(val) {
      this.goodsItemSelectorVisible = false
      console.log(val, 'val')
      let arr = []
      val.goodsList.forEach((item) => {
        item.status = 0
        item.images = item.images.split(',')
        let obj = {
          item_id: item.itemid,
          status: 1,
        }
        arr.push(obj)
      })
      this.editGoodsList = val.goodsList
      await this.addGoods(arr)
    },
    //添加商品
    async addGoods(arr) {
      let params = {
        bundle_deal_id: this.activeRow.bundle_deal_id,
        items: arr,
        mallId: this.activeRow.mallId,
      }
      this.editLoading = true
      let res = await this.$shopeemanService.mixSuitShipType(this.activeRow.country, params, 'put')
      console.log('addGoods', res)
      this.editLoading = false
      if (res.code === 200) {
        this.$alert(`添加商品成功`, '提示', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.searchSuitGoods()
          },
        })
      } else {
        if (res.code === 50003) {
          let arr = res.data.failed_items || []
          let message = ``
          arr.forEach((item) => {
            for (const key in item) {
              if (item[key].err_code == 1400101524) {
                message = message + `<p>商品【${key}】重复参加活动</p>\n`
              }
            }
          })
          return this.$alert(message, '提示', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
          })
        }
        return this.$alert(`添加商品失败，${res.data}`, '提示', {
          confirmButtonText: '确定',
        })
      }
    },
    //查询商品详情
    async searchProductDetail(shopGoodsId, shopMallId, country) {
      let params = {
        product_id: shopGoodsId,
        version: '3.2.0',
        shop_id: shopMallId,
      }
      let res = await this.$shopeemanService.searchProductDetail(this.activeRow.country, params)
      if (res.code === 200) {
        return res.data.model_list
      } else {
        return []
      }
    },
    //批量关闭开启商品
    async batchCloseSuitGoods(array, type) {
      if (!array.length) {
        return this.$message.warning(`请选择商品`)
      }
      let arr = []
      for (let i = 0; i < array.length; i++) {
        console.log(array, 'array')
        let obj = {
          item_id: array[i].itemid,
          status: type,
        }
        arr.push(obj)
      }
      console.log(arr)
      let params = {
        bundle_deal_id: this.activeRow.bundle_deal_id,
        items: arr,
        mallId: this.activeRow.mallId,
      }
      let res = await this.$shopeemanService.mixSuitShipType(this.activeRow.country, params, 'put')
      if (res.code === 200) {
        array.forEach((item) => {
          let index = this.editGoodsList.findIndex((n) => n.itemid == item.itemid)
          this.$set(this.editGoodsList[index], 'status', type)
        })
        return this.$message.success(`${type == 0 ? '关闭' : '开启'}成功`)
      } else {
        return this.$message.error(`${type == 0 ? '关闭' : '开启'}失败，${res.data}`)
      }
    },
    //批量删除商品
    async batchDeleteSuitGoods(array) {
      if (!array.length) {
        return this.$message.warning(`请选择商品`)
      }
      let arr = []
      for (let i = 0; i < array.length; i++) {
        console.log(array, 'array')
        let obj = {
          item_id: array[i].itemid,
        }
        arr.push(obj)
      }
      console.log(arr)
      let params = {
        bundle_deal_id: this.activeRow.bundle_deal_id,
        items: arr,
        mallId: this.activeRow.mallId,
      }
      let res = await this.$shopeemanService.mixSuitShipType(this.activeRow.country, params, 'delete')
      if (res.code === 200) {
        array.forEach((item) => {
          let index = this.editGoodsList.findIndex((n) => n.itemid == item.itemid)
          this.editGoodsList.splice(index, 1)
        })
      } else {
        return this.$message.error(`删除失败，${res.data.includes('bundle deal error bundle deal ended') ? '商品已过期' : res.data}`)
      }
    },
    //获取活动商品详情
    async updateSuit(row) {
      this.activeRow = row
      this.selectMallListEdit = [row.mallInfo]
      console.log(row, 'row')
      this.updateSuitVisible = true
      if (row.extinfo.itemid_list && row.extinfo.itemid_list.length) {
        let arrStr = row.extinfo.itemid_list.join(',').split(',')
        console.log(arrStr, 'ww')
        let params = {
          query:
            'query Products($productIds: [String], $statusType: Int) {\n      products(productIds: $productIds, statusType: $statusType) \n    {\n      items {\n        itemid,\n    sold,\n    price,\n    promotions {\n      itemid,\n      promotionId,\n      startTime,\n      price,\n      endTime,\n      promotionType\n    },\n    logisticsChannels {\n      name,\n      enabled\n    },\n        name,\n        inputOriginPrice,\n        originPrice,\n        normalStock,\n        status,\n        stock,\n        pffTag,\n        normalSellerStock,\n        normalWmsStock,\n        images,\n        hasWholesale,\n        minPurchaseLimit,\n        modelList {\n          itemid,\n          modelid,\n          name,\n          inputOriginPrice,\n          originPrice,\n          normalStock,\n          stock,\n          pffTag,\n          normalSellerStock,\n          normalWmsStock,\n          isDefault\n        }\n      }\n    }\n  \n    }',
          variables: {
            productIds: arrStr,
            statusType: 0,
          },
          mallId: row.mallId,
        }
        this.editLoading = true
        let res = await this.$shopeemanService.getSuitGoods(row.country, params)
        if (res.code === 200) {
          this.editGoodsList = res.data
          this.editGoodsListCopy = JSON.parse(JSON.stringify(res.data))
          console.log('editGoodsList', this.editGoodsList)
        } else {
          this.$message.error(`获取商品详情失败`)
        }
        let shipParams = {
          bundle_deal_id: row.bundle_deal_id,
          country: row.country,
          mallId: row.mallId,
        }
        let resShip = await this.$shopeemanService.getSuitShipType(row.country, shipParams)
        this.shipType = ``
        if (resShip.code === 200) {
          if (resShip.data.shop_logistics_info.disabled) {
            resShip.data.shop_logistics_info.disabled.forEach((item) => {
              this.shipType = this.shipType + `<p>${item.display_name}</p>`
            })
          }
          if (resShip.data.shop_logistics_info.enabled) {
            resShip.data.shop_logistics_info.enabled.forEach((item) => {
              this.shipType = this.shipType + `<p>${item.display_name}</p>`
            })
          }
        }
        this.editLoading = false
        console.log(resShip, 'resShip')
      } else {
        await this.searchSuitGoods()
      }
    },

    changeType(val) {
      switch (val) {
        case 2:
          return '即将开始'
        case 3:
          return '进行中'
        case 4:
          return '已过期'
        default:
          return ''
      }
    },
    //批量删除停止活动
    async batchStopSuit(array) {
      if (!array.length) {
        return this.$message.warning('请选择数据！')
      }
      for (let i = 0; i < array.length; i++) {
        let item = array[i]
        let params = {
          mallId: item.mallId,
          bundle_deal_id: item.bundle_deal_id,
          action: item.time_status === 2 ? 'delete' : 'stop',
        }
        let res = await this.$shopeemanService.stopSuit(item.country, params)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`店铺【${item.mallName}】${item.time_status === 2 ? '删除' : '停止'}活动【${item.name}】成功`, true)
          if (i === array.length - 1) {
            await this.batchGetSuitData()
          }
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(`店铺【${item.mallName}】${item.time_status === 2 ? '删除' : '停止'}活动【${item.name}】失败，店铺未登录`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${item.mallName}】${item.time_status === 2 ? '删除' : '停止'}活动【${item.name}】失败，${res.data}`, false)
        }
      }
    },
    //停止创建活动
    stopCreate() {
      terminateThread()
      this.$alert('正在停止操作，可能需要一些时间！', '提示', {
        confirmButtonText: '确定',
      })
      this.loading = false
    },
    changeCreateDiscount(val) {
      if (!val) {
        this.isNull = true
      } else {
        this.isNull = false
      }
    },
    changeMallList(val) {
      this.selectMallList = val
      this.country = val.country
    },
    async batchGetSuitData() {
      if (!this.selectMallList.length) {
        return this.$message.warning('请选择店铺！')
      }
      this.loading = true
      this.tableData = []
      await batchOperation(this.selectMallList, this.getSuitData)
      this.loading = false
      this.$refs.Logs.writeLog(`套装数据获取结束！`, true)
    },
    async getSuitData(mall, count = { count: 5 }) {
      let mallName = mall.mall_alias_name || mall.platform_mall_name
      let mallId = mall.platform_mall_id
      let limit = 40
      try {
        let params = {
          status: this.activeState,
          offset: 0,
          limit: limit,
          mallId: mallId,
        }
        let res = await this.$shopeemanService.getSuitList(mall.country, params)
        if (res.code === 200) {
          let array = res.data.bundle_deal_list || []
          while (array.length) {
            if (this.showexpiredactivities) {
              array = array.filter((item) => {
                return item.time_status !== 4
              })
            }
            array.forEach((item) => {
              item.mallName = mallName
              item.mallId = mallId
              item.country = mall.country
              item.mallInfo = mall
            })
            this.tableData = this.tableData.concat(array)
            if (array.length < limit) {
              array = []
            } else {
              params.offset += limit
              let res = await this.$shopeemanService.getSuitList(mall.country, params)
              array = res.code === 200 ? res.data.bundle_deal_list : []
            }
          }
          this.$refs.Logs.writeLog(`获取店铺【${mallName}】套装优惠数据完成`, true)
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取套装优惠失败，店铺未登录`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取套装优惠失败，${res.data}`, false)
        }
        console.log(res, 'res')
      } catch (error) {
        console.log(error)
      } finally {
        --count.count
      }
    },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChange1(val) {
      this.goodsSelection = val
    },
    async batchCreateSuit() {
      if (!this.creatname || !this.creatnum || !this.creatdiscount) {
        return this.$message.warning('请完整填写的活动信息！')
      }
      if (this.creatname.length < 3) {
        return this.$message.warning('活动名称必须三个字以上！')
      }
      if (!this.selectMallList.length) {
        return this.$message.warning('请选择店铺！')
      }
      this.loading = true
      this.creatactivity = false
      if (this.createType === 'single') {
        await this.savecreat(this.activeRow.mallInfo)
      } else {
        await batchOperation(this.selectMallList, this.savecreat)
      }

      this.loading = false
      this.closeDialog()
      await this.batchGetSuitData()
    },
    // 保存创建活动
    async savecreat(mall, count = { count: 5 }) {
      try {
        let mallId = mall.platform_mall_id
        let params = {
          mallId: mallId,
          name: this.creatname,
          rule_type: this.radio,
          min_amount: this.creatnum,
          start_time: Math.round(new Date(this.creattime[0]).getTime() / 1000),
          end_time: Math.round(new Date(this.creattime[1]).getTime() / 1000),
          usage_limit: this.creatcount,
          fix_price: 0,
          discount_value: 0,
          discount_percentage: 0,
        }
        if (this.radio === 1) {
          params.fix_price = this.creatdiscount
        } else if (this.radio === 2) {
          params.discount_percentage = this.creatdiscount
        } else {
          params.discount_value = this.creatdiscount
        }
        let res = await this.$shopeemanService.createSuit(mall.country, params)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】创建套装活动成功`, true)
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】创建套装活动失败，店铺未登录`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】创建套装活动失败，${res.data}`, false)
        }
        console.log('this is data', res)
      } catch (error) {
        console.log(error)
      } finally {
        --count.count
      }
    },
  },
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
.suit-style {
  padding: 10px;
  overflow: hidden;
  background: #fff;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.header-btn {
  margin: 10px 0;
  min-width: 800px;
  overflow: auto;
  .header-row {
    display: flex;
    margin: 5px;
  }
}
.mar-left {
  margin-left: 10px;
}
.mar-top {
  margin-top: 10px;
}
.item-box {
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 80px;
    text-align: right;
  }
}
.content {
  margin-top: 10px;
}
.create-style {
  .header-btn {
    .header-row {
      display: flex;
      margin-top: 10px;
    }
  }
  .diff-type {
    margin-left: 70px;
    .diff-item {
      display: flex;
      align-items: center;
      /deep/.el-input-group__append {
        padding: 0 10px;
      }
      .activeColor {
        color: red;
      }
    }
  }
}
</style>

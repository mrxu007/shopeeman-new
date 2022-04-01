
<template>
  <div v-loading="loading" class="purchase-info">
    <el-form ref="form" :model="form" label-width="150px" label-position="right" :rules="rules" :inline-message="true">
      <el-form-item label="采购状态:" prop="shotStatus">
        <el-select v-model="form.shotStatus" placeholder="请选择活动区域" size="mini" class="inputWidth">
          <el-option v-for="(item, index) in shotStatuForEdit" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="拍单订单号:" prop="shotOrderSn">
        <el-input v-model="form.shotOrderSn" size="mini" class="inputWidth" />
      </el-form-item>
      <el-form-item label="shopee订单详情链接:">
        <el-input v-model="shopeeLink" size="mini" class="inputWidth" resize="none" type="textarea" :rows="2" />
      </el-form-item>
      <p style="color: red; margin-bottom: 10px">注:shopee订单详情链接,请在个人中心订单详情页,右键复制当前链接植入</p>
      <el-form-item v-if="dealType === 'single'" prop="shotAmountRmb">
        <div slot="label">
          <el-select v-model="amountType" size="mini" style="width: 150px" @change="changeAmount">
            <el-option label="采购价RMB->采购价" :value="1" />
            <el-option label="采购价->采购价RMB" :value="2" />
          </el-select>
        </div>
        <el-input v-model="shotAmount" size="mini" class="inputWidthMini" style="margin-left: 10px" @change="changeAmount" />
        <span style="margin: 0 10px">{{ amountType === 1 ? '元' : $filters.siteCoin(country) }}</span>
        <el-input v-model="shotAmountRmb" size="mini" class="inputWidthMini" />
        <span>{{ amountType === 1 ? $filters.siteCoin(country) : '元' }}</span>
      </el-form-item>
      <el-form-item v-if="dealType === 'batch'" label="采购价格:" prop="shotAmountRmb">
        <el-input v-model="shotAmount" size="mini" class="inputWidth" />
      </el-form-item>
      <el-form-item label="平台类型:" prop="platformId">
        <el-select v-model="form.platformId" placeholder="请选择活动区域" size="mini" class="inputWidth" @change="changePlatform">
          <el-option v-for="(item, index) in goodsSourceList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="采购账号:" prop="buyAccountInfo">
        <el-select v-model="form.buyAccountInfo" placeholder="请选择活动区域" size="mini" class="inputWidth">
          <el-option v-for="(item, index) in buyerAccountListFilter" :key="index" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="dealType === 'single'" label="绑定仓库:" prop="warehouseName">
        <p>{{ warehouse ? warehouse.warehouse_name : '' }}</p>
        <!-- <el-input v-model="warehouse.warehouse_name" size="mini" class="inputWidth" disabled></el-input> -->
      </el-form-item>
      <el-form-item v-if="dealType !== 'single'" label="提示1:">
        <span style="color: red">添加采购信息前,请务必确认好已绑定仓库收货地址</span>
      </el-form-item>
      <el-form-item v-if="dealType !== 'single'" label="提示2:">
        <span style="color: red">运输方式修改维度针对于主订单</span>
      </el-form-item>
      <el-form-item v-if="dealType === 'single'" label="提示:">
        <span style="color: red">运输方式修改维度针对于主订单</span>
      </el-form-item>
      <el-form-item label="运输方式:">
        <el-radio-group v-model="form.transportType" size="mini">
          <el-radio label="1">空运</el-radio>
          <el-radio label="2">陆运</el-radio>
          <el-radio label="3">海运</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="货物类型:">
        <el-radio-group v-model="form.packageType" size="mini">
          <el-radio label="1">普货</el-radio>
          <el-radio label="2">敏感货</el-radio>
          <el-radio label="3">商检货</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="base-box">
        <span class="base-title">备注修改</span>
        <div class="base-item">
          <div class="remark">
            <span style="margin-right: 5px;">备注:</span>
            <el-input v-model="remark" size="mini" type="textarea" resize="none" :rows="2" style="width: 300px" />
          </div>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" size="mini" @click="saveBatchSetting">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { shotStatuForEdit, goodsSourceList } from './orderCenter'
export default {
  name: 'PurchaseInfo',
  props: {
    chooseData: {
      type: Array,
      default: []
    },
    buyerAccountList: {
      type: Array,
      default: []
    },
    dealType: {
      type: String,
      default: 'batch'
    }
  },

  data() {
    var amountCheck = (rule, value, callback) => {
      if (value == 0) {
        callback(new Error('采购金额不能为零'))
      }
      callback()
    }
    return {
      form: {
        shotOrderSn: '', // 拍单订单号
        shotStatus: '', // 采购状态
        transportType: '1', // 运输方式
        packageType: '1', // 货物类型
        platformId: 0, // 拍单平台
        shotAmountRmb: 0, // 拍单金额(rmb)
        shotAmount: 0, // 拍单金额(rmb)
        buyAccountInfo: '', // 买家账号信息 传json格式
        // shotOrderSn: '', // 拍单订单号
        // country: '',
        remark: ''
      },
      // buyAccountInfo: '',
      amountType: 1,
      shotStatuForEdit: shotStatuForEdit,
      goodsSourceList: goodsSourceList,
      buyerAccountListFilter: [],
      rules: {
        shotOrderSn: [{ required: true, message: '拍单订单号必填', trigger: 'blur' }],
        shotStatus: [{ required: true, message: '请选择状态', trigger: 'change' }],
        // shotAmountRmb: [{ required: true, message: '请输入拍单金额', trigger: 'change' }],
        platformId: [{ required: true, message: '请选择平台类型', trigger: 'change' }],
        buyAccountInfo: [{ required: true, message: '买手号不能为空', trigger: 'change' }]
        // shotAmount: [{ required: true, message: '采购金额不能为空', trigger: 'change' },{ validator: amountCheck, trigger: 'blur' }],
      },
      shopeeLink: '',
      remark: '',
      shotAmount: '',
      shotAmountRmb: '',
      rateList: [],
      country: '',
      warehouse: {},
      warehouseList: [],
      loading: false,
      shopeeLinks: {
        MY: 'https://shopee.com.my',
        TW: 'https://shopee.tw',
        VN: 'https://shopee.vn',
        ID: 'https://shopee.co.id',
        PH: 'https://shopee.ph',
        TH: 'https://shopee.co.th',
        SG: 'https://shopee.sg',
        BR: 'https://shopee.com.br'
      }
    }
  },
  mounted() {
    this.getRate()
    const data = this.chooseData[0]
    this.form.platformId = Number(data.goods_info.ori_platform_id)
    this.changePlatform(this.form.platformId)
    if (this.dealType === 'single') {
      this.form.shotOrderSn = data.shot_order_info.shot_order_sn
      this.form.shotStatus = data.shot_order_info.shot_status
      this.form.shotAmount = data.shot_order_info.shot_amount
      this.form.shotAmountRmb = data.shot_order_info.shot_amount_rmb
      this.form.buyAccountInfo = data.shot_order_info.buy_account
      this.country = data.country
      this.shotAmount = data.shot_order_info.shot_amount_rmb
      this.shotAmountRmb = data.shot_order_info.shot_amount
      if (this.form.platformId === 11) {
        if (data.shot_order_info.buy_account_info && data.shot_order_info.buy_account_info.orderType && data.shot_order_info.buy_account_info.orderId) {
          this.shopeeLink = `${this.shopeeLinks[data.country]}/user/purchase/order/${data.shot_order_info.buy_account_info.orderId}?type=${data.shot_order_info.buy_account_info.orderType}`
        } else if (data.shot_order_info.shop_id && data.shot_order_info.buy_account_info.orderId) {
          this.shopeeLink = `${this.shopeeLinks[data.country]}user/purchase/order/${data.shot_order_info.buy_account_info.orderId}/?shopid=${data.shot_order_info.shop_id}`
        }
      }
      console.log('single', data, this.chooseData)
      this.getWareHouse(data.mall_info.platform_mall_id, data.goods_info.ori_platform_id)
    }
  },
  methods: {
    async getWareHouse(mallId, platformId) {
      console.log(mallId, 'mallId')
      const res = await this.$appConfig.getWarehouseInfo(mallId)
      console.log(JSON.parse(res), '0---')
      this.warehouseList = (res && res !== '{}' && JSON.parse(res)) || []
      console.log(this.warehouseList, 'warehouseList')
      if ([1, 2, 3, 5, 8, 10].indexOf(Number(platformId)) > -1) {
        this.warehouse = this.warehouseList.find((n) => n.type == 0)
      } else if ([9, 11, 12, 15, 13].indexOf(Number(platformId)) > -1) {
        this.warehouse = this.warehouseList.find((n) => n.type == 3)
      }
      if (!this.warehouse && this.warehouseList.length) {
        this.warehouse = this.warehouseList[0]
      }
    },
    async getRate() {
      const info = await window['ConfigBridgeService'].getUserInfo()
      this.rateList = info.ExchangeRates || {}
    },
    changeAmount() {
      if (this.amountType === 1) {
        this.form.shotAmountRmb = this.shotAmount
        this.form.shotAmount = (Number(this.shotAmount) / Number(this.rateList[this.country.toUpperCase()])).toFixed(2)
        this.shotAmountRmb = (Number(this.shotAmount) / Number(this.rateList[this.country.toUpperCase()])).toFixed(2)
      } else {
        this.form.shotAmount = this.shotAmount
        this.form.shotAmountRmb = (Number(this.shotAmount) * Number(this.rateList[this.country.toUpperCase()])).toFixed(2)
        this.shotAmountRmb = (Number(this.shotAmount) * Number(this.rateList[this.country.toUpperCase()])).toFixed(2)
      }
    },
    changePlatform(val) {
      this.form.buyAccountInfo = ''
      this.buyerAccountListFilter = this.buyerAccountList.filter((item) => {
        return item.type == val
      })
      // this.form.buyAccountInfo = JSON.stringify(item)
    },
    // 处理shopee地址
    dealWithShopeeLink(link) {
      const linkInfo = {}
      const shopidInfo = link.match(/shopid=(\d+)/)
      if (shopidInfo) {
        linkInfo['shopId'] = shopidInfo[1]
      }
      const orderidInfo = link.match(/order\/(\d+)/)
      if (orderidInfo) {
        linkInfo['orderId'] = orderidInfo[1]
      }
      const typeInfo = link.match(/type=(\d+)/)
      if (typeInfo) {
        linkInfo['orderType'] = typeInfo[1]
      }
      return linkInfo
    },
    // batch保存
    async saveBatchSetting() {
      this.$refs['form'].validate(async(valid) => {
        if (!valid) {
          return false
        }
        if (this.shotAmount == 0) {
          return this.$message.error('采购价不能为零')
        }
        let obj = {}
        if (this.form.buyAccountInfo) {
          // let buy = JSON.parse(this.form.buyAccountInfo)
          const buy = this.buyerAccountListFilter.find(n => { return n.name == this.form.buyAccountInfo && n.type == this.form.platformId })

          // console.log(buy, 'buy')
          obj = {
            name: buy.name,
            type: buy.type
          }
        }
        try {
          for (let i = 0; i < this.chooseData.length; i++) {
            const order = this.chooseData[i]
            this.form.shotAmount = (Number(this.form.shotAmountRmb) / Number(this.rateList[order.country.toUpperCase()])).toFixed(2)
            const params = JSON.parse(JSON.stringify(this.form))
            params.sysOrderId = order.id
            params.platformId = params.platformId.toString()
            params.shotStatus = params.shotStatus.toString()

            if (this.form.platformId == 11 && this.shopeeLink === '') {
              return this.$message.warning('采购链接不能为空')
            }
            if (this.dealType === 'batch') {
              params.shotAmountRmb = this.shotAmount
              params.shotAmount = (Number(this.form.shotAmountRmb) / Number(this.rateList[order.country.toUpperCase()])).toFixed(2)
              console.log('params', params)
            }
            if (this.shopeeLink) {
              const linkInfo = this.dealWithShopeeLink(this.shopeeLink)
              params.shopId = linkInfo.shopId || ''
              obj['orderId'] = linkInfo.orderId || ''
              obj['orderType'] = linkInfo.orderType || ''
            }
            params.buyAccountInfo = JSON.stringify(obj)
            params.markStatus = '0'
            if (this.dealType === 'single') {
              if (!this.warehouse) {
                return this.$message.warning('没有绑定正确的仓库')
              }
              params.warehouseUserId = this.warehouse.id || ''
            }
            this.loading = true
            console.log('--------', params)
            const res = await this.$api.updateShotOrder(params)
            console.log(res, 'saveBatchSetting')
            if (res.data.code === 200) {
              console.log(i, this.chooseData.length, i === this.chooseData.length - 1)
              if (i === this.chooseData.length - 1) {
                this.$message.success('设置成功!')
                this.$emit('close')
              }
            } else {
              this.loading = false
              this.$message.error(`设置失败-${res.data.message}`)
            }
            console.log(this.form, params, res)
          }
        } catch (error) {
          this.loading = false
          return this.$message.error(`发生错误，请重试,${error}`)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.purchase-info {
  /deep/.el-form-item {
    margin-bottom: 5px;
  }
}
.inputWidth {
  width: 270px;
}
.inputWidthMini {
  width: 80px;
}
.remark {
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 80px;
    text-align: right;
  }
}
.base-box {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 10px;
  position: relative;
  // min-width: 702px;
  height: 100%;
  .base-title {
    padding: 0 5px;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #fff;
    position: absolute;
    left: 10px;
    top: -10px;
  }
  .base-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

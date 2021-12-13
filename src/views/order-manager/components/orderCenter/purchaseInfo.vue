
<template>
  <div class="purchase-info">
    <el-form ref="form" :model="form" label-width="150px" label-position="right" :rules="rules">
      <el-form-item label="采购状态:" prop="shotStatus">
        <el-select v-model="form.shotStatus" placeholder="请选择活动区域" size="mini" class="inputWidth">
          <el-option :label="item.label" :value="item.value" v-for="(item, index) in shotStatuForEdit" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拍单订单号:" prop="shotOrderSn">
        <el-input v-model="form.shotOrderSn" size="mini" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="shopee订单详情链接:">
        <el-input v-model="shopeeLink" size="mini" class="inputWidth"></el-input>
      </el-form-item>
      <p style="color: red; margin-bottom: 10px">注:shopee订单详情链接,请在个人中心订单详情页,右键复制当前链接植入</p>
      <el-form-item prop="shotAmount" v-if="dealType === 'single'">
        <div slot="label">
          <el-select v-model="amountType" size="mini" style="width: 150px" @change="changeAmount">
            <el-option label="采购价RMB->采购价" :value="1"></el-option>
            <el-option label="采购价->采购价RMB" :value="2"></el-option>
          </el-select>
        </div>
        <el-input v-model="shotAmount" size="mini" class="inputWidthMini" style="margin-left: 10px" @change="changeAmount"></el-input>
        <span style="margin: 0 10px">{{ amountType === 1 ? '元' : $filters.siteCoin(country) }}</span>
        <el-input v-model="shotAmountRmb" size="mini" class="inputWidthMini"></el-input>
        <span>{{ amountType === 1 ? $filters.siteCoin(country) : '元' }}</span>
      </el-form-item>
      <el-form-item label="采购价格:" prop="shotAmountRmb" v-if="dealType === 'batch'">
        <el-input v-model="form.shotAmountRmb" size="mini" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="平台类型:" prop="platformId">
        <el-select v-model="form.platformId" placeholder="请选择活动区域" size="mini" class="inputWidth" @change="changePlatform">
          <el-option :label="item.label" :value="item.value" v-for="(item, index) in goodsSourceList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采购账号:">
        <el-select v-model="form.buyAccountInfo" placeholder="请选择活动区域" size="mini" class="inputWidth">
          <el-option :label="item.name" :value="JSON.stringify(item)" v-for="(item, index) in buyerAccountListFilter" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="绑定仓库:" prop="warehouseName" v-if="dealType === 'single'">
        <p>{{ form.warehouseName }}</p>
        <!-- <el-input v-model="form.warehouseName" size="mini" class="inputWidth" disabled></el-input> -->
      </el-form-item>
      <el-form-item label="提示1:" v-if="dealType !== 'single'">
        <span style="color: red">添加采购信息前,请务必确认好已绑定仓库收货地址</span>
      </el-form-item>
      <el-form-item label="提示2:" v-if="dealType !== 'single'">
        <span style="color: red">运输方式修改维度针对于主订单</span>
      </el-form-item>
      <el-form-item label="提示:" v-if="dealType === 'single'">
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
      <div class="base-box" v-if="dealType !== 'single'">
        <span class="base-title">备注修改</span>
        <div class="base-item">
          <div class="remark" >
            <span>备注:</span>
            <el-input v-model="remark" size="mini" type="textarea" :rows="2" style="width: 300px"></el-input>
          </div>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="saveBatchSetting" size="mini">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { shotStatuForEdit, goodsSourceList } from './orderCenter'
export default {
  name: 'PurchaseInfo',
  data() {
    return {
      form: {
        shotOrderSn: '', //拍单订单号
        shotStatus: '', //采购状态
        transportType: '1', //运输方式
        packageType: '1', //货物类型
        platformId: '', //拍单平台
        shotAmountRmb: '', //拍单金额(rmb)
        shotAmount: '', //拍单金额(rmb)
        buyAccountInfo: '', //买家账号信息 传json格式
        shotOrderSn: '', //拍单订单号
        // country: '',
        remark: '',
      },
      amountType: 1,
      shotStatuForEdit: shotStatuForEdit,
      goodsSourceList: goodsSourceList,
      buyerAccountListFilter: [],
      rules: {
        shotOrderSn: [{ required: true, message: '拍单订单号必填', trigger: 'blur' }],
        shotStatus: [{ required: true, message: '请选择状态', trigger: 'change' }],
        shotAmountRmb: [{ required: true, message: '请输入拍单金额', trigger: 'change' }],
        platformId: [{ required: true, message: '请选择平台类型', trigger: 'change' }],
      },
      shopeeLink: '',
      remark: '',
      shotAmount: '',
      shotAmountRmb: '',
      rateList: [],
      country:''
    }
  },
  props: {
    chooseData: {
      type: Array,
      default: [],
    },
    buyerAccountList: {
      type: Array,
      default: [],
    },
    dealType: {
      type: String,
      default: 'batch',
    },
  },
  mounted() {
    let data = this.chooseData[0]
    this.form.platformId = Number(data.goods_info.ori_platform_id)
    this.changePlatform(this.form.platformId)
    if (this.dealType === 'single') {
      this.form.shotOrderSn = data.shot_order_info.order_sn
      this.form.shotStatus = data.shot_order_info.shot_status
      this.form.shotAmount = data.shot_order_info.shot_amount
      this.form.shotAmountRmb = data.shot_order_info.shot_amount_rmb
      this.form.warehouseName = data.shot_order_info.warehouse_name
      this.country = data.country
      this.shotAmount = data.shot_order_info.shot_amount
      this.shotAmountRmb = data.shot_order_info.shot_amount_rmb
      console.log('single', data, this.chooseData)
    }
    this.getRate()
    console.log("country",this.country)
  },
  methods: {
    async getRate() {
      const data = await this.$api.exchangeRateList()
      if (data.data.code === 200) {
        this.rateList = data.data.data
      }
      console.log(this.rateList)
    },
    changeAmount() {
      if (this.amountType === 1) {
        this.form.shotAmountRmb = this.shotAmount
        this.form.shotAmount = (Number(this.shotAmount) * Number(this.rateList[this.country.toUpperCase()])).toFixed(2)
        this.shotAmountRmb = (Number(this.shotAmount) * Number(this.rateList[this.country.toUpperCase()])).toFixed(2)
      } else {
        this.form.shotAmount = this.shotAmount
        this.form.shotAmountRmb = (Number(this.shotAmount) / Number(this.rateList[this.country.toUpperCase()])).toFixed(2)
        this.shotAmountRmb = (Number(this.shotAmount) / Number(this.rateList[this.country.toUpperCase()])).toFixed(2)
      }
    },
    changePlatform(val) {
      this.form.buyAccountInfo = ''
      this.buyerAccountListFilter = this.buyerAccountList.filter((item) => {
        return item.type === val
      })
      // this.form.buyAccountInfo = JSON.stringify(item)
    },
    //batch保存
    async saveBatchSetting() {
      this.$refs['form'].validate(async (valid) => {
        if (!valid) {
          return false
        }
        let ids = ''
        this.chooseData.forEach((item, index) => {
          if (index === 0) {
            ids = item.id.toString()
          } else {
            ids = ids + ',' + item.id
          }
        })
        let params = this.form
        params.sysOrderIds = ids
        params.platformId = params.platformId.toString()
        params.shotStatus = params.shotStatus.toString()
        if (this.shopeeLink) {
          let shopid = this.shopeeLink.match(/shopid=(\d+)/)
          shopid = shopid ? shopid[1] : ''
          let orderId = this.shopeeLink.match(/orderId=(\d+)/)
          orderId = orderId ? orderId[1] : ''
        }
        let res = await this.$api.batchUpdateShotOrder(params)
        console.log(res,"saveBatchSetting")
        if (res.data.code === 200) {
          this.$message.success('设置成功!')
          this.$emit('close', false)
        } else {
          this.$message.error(`设置失败-${res.data.message}`)
        }
        console.log(this.form, params, res)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.purchase-info {
  /deep/.el-form-item {
    margin-bottom: 5px;
  }
}
.inputWidth {
  width: 200px;
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
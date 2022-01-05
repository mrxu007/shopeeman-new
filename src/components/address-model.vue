<!--
 * @Author: your name
 * @Date: 2021-10-21 15:41:32
 * @LastEditTime: 2021-12-29 09:47:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\components\category-choose.vue
-->
<template>
  <div class="wrap">
    <el-form label-position="right" label-width="80px">
      <el-form-item label="收货省：">
        <el-select v-model="province" filterable placeholder="请选择" size="mini" @change="flag = false">
          <el-option v-for="(item, index) in provinceList" :key="index" :label="item.RegionName || item.division_name" :value="item.RegionId || item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="收货市：">
        <el-select v-model="city" :disabled="province ? false : true" placeholder="请选择" size="mini" @change="flag = false">
          <el-option v-for="(item, index) in cityList" :key="index" :label="item.RegionName || item.division_name" :value="item.RegionId || item.id" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="country!=='TW'" label="收货区：">
        <el-select v-model="distinct" :disabled="city ? false : true" placeholder="请选择" size="mini" @change="flag = false">
          <el-option v-for="(item, index) in distinctList" :key="index" :label="item.RegionName || item.division_name" :value="item.RegionId || item.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddressModel',
  props: {
    isInit: {
      type: Boolean,
      default: false
    },
    country: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      distinctList: [],

      province: '',
      city: '',
      distinct: '',
      provinceName: '',
      cityName: '',
      distinctName: '',

      addressData: {},

      flag: false
    }
  },
  watch: {
    country: {
      handler(n, o) {
        console.log('props', n, o)
        this.getPddAddressModel('0', 'provinceList', 'province')
        // this.sendData()
      }
    },
    province: {
      handler(n, o) {
        this.getPddAddressModel(this.province, 'cityList', 'city')
        console.log(this.provinceList, 'province')
        this.provinceList.forEach((item) => {
          if (item.RegionId === this.province || item.id === this.province) {
            this.addressData['province_id'] = item.RegionId || item.id.toString()
            this.addressData['province_text'] = item.RegionName || item.division_name
          }
        })
        this.sendData()
      },
      deep: true
    },
    city: {
      handler(n, o) {
        this.getPddAddressModel(this.city, 'distinctList', 'distinct')
        this.cityList.forEach((item) => {
          if (item.RegionId === this.city || item.id === this.city) {
            this.addressData['city_id'] = item.RegionId || item.id.toString()
            this.addressData['city_text'] = item.RegionName || item.division_name
          }
        })
        this.sendData()
      },
      deep: true
    },
    distinct: {
      handler(n, o) {
        console.log(this.distinctList, '44444444444')
        this.distinctList.forEach((item) => {
          if (item.RegionId === this.distinct || item.id === this.distinct) {
            this.addressData['distinct_id'] = this.country === 'TW' ? '' : item.RegionId
            this.addressData['distinct_text'] = this.country === 'TW' ? '' : item.RegionName
          }
        })
        console.log(this.addressData, 'this.addressData88888888888888')
        this.sendData()
      },
      deep: true
    }
  },
  mounted() {
    if (this.isInit) {
      this.init()
    }
  },
  methods: {
    // 修改
    async update(province, city, distinct) {
      this.flag = true
      await this.getPddAddressModel('0', 'provinceList', 'province')
      this.province = province.toString()
      await this.getPddAddressModel(this.province, 'cityList', 'city')
      this.city = city.toString()
      await this.getPddAddressModel(this.city, 'distinctList', 'distinctList')
      this.distinct = distinct.toString()
      this.sendData()
    },
    // 初始
    async init() {
      this.flag = false
      await this.getPddAddressModel('0', 'provinceList', 'province')
      this.sendData()
    },
    // 获取数据
    async getPddAddressModel(id, list, val) {
      console.log('5555555555555555555', this.country)
      if (this.country === 'TW') {
        const platform = this.$filters.sitePlatform('TW')
        const res = await this.$commodityService.getShopeeAddress(platform, '1', id)
        const resObj = JSON.parse(res)
        console.log('res-tw', resObj)
        this[list] = resObj
        this[val] = this.flag ? this[val] : this[list][0] ? this[list][0].id : ''
      } else {
        const res = await this.$BaseUtilService.getPddAddressModel(id)
        this[list] = res
        this[val] = this.flag ? this[val] : this[list][0].RegionId
      }
    },
    sendData() {
      this.$emit('sendData', this.addressData)
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  /deep/.el-form-item {
    margin-bottom: 0px !important;
  }
}
</style>

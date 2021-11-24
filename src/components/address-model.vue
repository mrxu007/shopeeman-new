<!--
 * @Author: your name
 * @Date: 2021-10-21 15:41:32
 * @LastEditTime: 2021-11-04 14:35:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\components\category-choose.vue
-->
<template>
  <div class="wrap">
    <el-form label-position="right" label-width="80px">
      <el-form-item label="收货省：">
        <el-select
          v-model="province"
          filterable
          placeholder="请选择"
          size="mini"
          @change="flag = false"
        >
          <el-option
            v-for="(item, index) in provinceList"
            :key="index"
            :label="item.RegionName"
            :value="item.RegionId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收货市：">
        <el-select
          v-model="city"
          :disabled="province ? false : true"
          placeholder="请选择"
          size="mini"
          @change="flag = false"
        >
          <el-option
            v-for="(item, index) in cityList"
            :key="index"
            :label="item.RegionName"
            :value="item.RegionId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收货区：">
        <el-select
          v-model="distinct"
          :disabled="city ? false : true"
          placeholder="请选择"
          size="mini"
          @change="flag = false"
        >
          <el-option
            v-for="(item, index) in distinctList"
            :key="index"
            :label="item.RegionName"
            :value="item.RegionId"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddressModel',
  props: {
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

      addressData: [],

      flag: false
    }
  },
  watch: {
    province: {
      handler(n, o) {
        this.getPddAddressModel(this.province, 'cityList', 'city')
        let arr = {}
        this.provinceList.forEach(item => {
          if (item.RegionId === this.province) arr = item
        })
        this.addressData['province_id'] = arr.RegionId
        this.addressData['province_text'] = arr.RegionName
        this.sendData()
      },
      deep: true
    },
    city: {
      handler(n, o) {
        let arr = {}
        this.getPddAddressModel(this.city, 'distinctList', 'distinct')
        this.cityList.forEach(item => {
          if (item.RegionId === this.city) arr = item
        })
        this.addressData['city_id'] = arr.RegionId
        this.addressData['city_text'] = arr.RegionName
        this.sendData()
      },
      deep: true
    },
    distinct: {
      handler(n, o) {
        let arr = {}
        this.distinctList.forEach(item => {
          if (item.RegionId === this.distinct) arr = item
        })
        this.addressData['distinct_id'] = arr.RegionId
        this.addressData['distinct_text'] = arr.RegionName
        this.sendData()
      },
      deep: true
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
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
    async init() {
      this.flag = false
      await this.getPddAddressModel('0', 'provinceList', 'province')
      this.sendData()
    },
    async getPddAddressModel(id, list, val) {
      const res = await this.$BaseUtilService.getPddAddressModel(id)
      this[list] = res
      this[val] = this.flag ? this[val] : this[list][0].RegionId
    },
    sendData() {
      this.$emit('sendData', this.addressData)
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap{
    /deep/.el-form-item{
      margin-bottom: 0px !important;
    }
  }
</style>

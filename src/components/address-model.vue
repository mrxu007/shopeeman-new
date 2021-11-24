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
        >
          <el-option
            v-for="(item, index) in provinceList"
            :key="item.id"
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
        >
          <el-option
            v-for="(item, index) in cityList"
            :key="item.id"
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
        >
          <el-option
            v-for="(item, index) in distinctList"
            :key="item.id"
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
        let newData = []
        this.getPddAddressModel(this.province, 'cityList', 'city')
        newData = this.provinceList.filter(item => {
          return item.RegionId === this.province
        })
        this.addressData['province_id'] = newData[0].RegionId
        this.addressData['province_text'] = newData[0].RegionName
        this.sendData()
      },
      deep: true
    },
    city: {
      handler(n, o) {
        let newData = []
        this.getPddAddressModel(this.city, 'distinctList', 'distinct')
        newData = this.cityList.filter(item => {
          return item.RegionId === this.city
        })
        this.addressData['city_id'] = newData[0].RegionId
        this.addressData['city_text'] = newData[0].RegionName
        this.sendData()
      },
      deep: true
    },
    distinct: {
      handler(n, o) {
        let newData = []
        newData = this.distinctList.filter(item => {
          return item.RegionId === this.distinct
        })
        this.addressData['distinct_id'] = newData[0].RegionId
        this.addressData['distinct_text'] = newData[0].RegionName
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
      await this.getPddAddressModel('0', 'provinceList', 'province')
      this.province = province
      this.city = city
      this.distinct = distinct
    },
    async init() {
      await this.getPddAddressModel('0', 'provinceList', 'province')
    },
    async getPddAddressModel(id, list, val) {
      const res = await this.$BaseUtilService.getPddAddressModel(id)
      this[list] = res
      this[val] = this.flag ? this[val] : this[list][0].RegionId
      console.log(this[val])
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

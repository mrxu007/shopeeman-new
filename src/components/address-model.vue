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

      addressData: []
    }
  },
  watch: {
    province: {
      handler(n, o) {
        this.getPddAddressModel(this.province, 'cityList', 'city')
      },
      deep: true
    },
    city: {
      handler(n, o) {
        this.getPddAddressModel(this.city, 'distinctList', 'distinct')
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.getPddAddressModel('0', 'provinceList', 'province')
    },
    async getPddAddressModel(id, list, val) {
      const res = await this.$BaseUtilService.getPddAddressModel(id)
      this[list] = res
      this[val] = this[list][0].RegionId
      this.addressData[val + '_id'] = this[list][0].RegionId
      this.addressData[val + '_text'] = this[list][0].RegionName
      this.$emit('addressData', this.addressData)
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

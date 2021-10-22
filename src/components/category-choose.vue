<!--
 * @Author: your name
 * @Date: 2021-10-21 15:41:32
 * @LastEditTime: 2021-10-22 15:56:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\components\category-choose.vue
-->
<template>
  <div>
    <ul :class="['category-content', { 'category-column': isColumn === true }]">
      <li :class="[{ 'column-item': isColumn === true }]">
        <span>站点：</span>
        <el-select v-model="countryVal" size="mini" filterable>
          <el-option v-if="isAll" label="全部" :value="''" />
          <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </li>
      <li :class="[{ 'column-item': isColumn === true }]">
        <span>一级类目：</span>
        <el-select v-model="category1" placeholder="" size="mini" filterable @change="getCategory($event, 1)">
          <el-option v-if="isCategoryAll" label="全部" :value="''" />
          <el-option v-for="(item, index) in categoryList1" :key="index" :label="item.category_name + '(' + item.category_cn_name + ')'" :value="item.category_id" />
        </el-select>
      </li>
      <li v-if="level === 3 || level === 2" :class="[{ 'column-item': isColumn === true }]">
        <span>二级类目：</span>
        <el-select v-model="category2" placeholder="" size="mini" filterable @change="getCategory($event, 2)">
          <el-option v-if="isCategoryAll" label="全部" :value="''" />
          <el-option v-for="(item, index) in categoryList2" :key="index" :label="item.category_name + '(' + item.category_cn_name + ')'" :value="item.category_id" />
        </el-select>
      </li>
      <li v-if="level === 3" :class="[{ 'column-item': isColumn === true }]">
        <span>三级类目：</span>
        <el-select v-model="category3" placeholder="" size="mini" filterable @change="getCategory($event, 3)">
          <el-option v-if="isCategoryAll" label="全部" :value="''" />
          <el-option v-for="(item, index) in categoryList3" :key="index" :label="item.category_name + '(' + item.category_cn_name + ')'" :value="item.category_id" />
        </el-select>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryChoose',
  props: {
    isAll: {
      type: Boolean,
      default: false
    },
    isCategoryAll: {
      type: Boolean,
      default: true
    },
    level: {
      type: Number,
      default: 3
    },
    isColumn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      countryVal: null,
      countries: [
        { label: '泰国站', value: 'TH' },
        { label: '马来站', value: 'MY' },
        { label: '台湾站', value: 'TW' },
        { label: '新加坡站', value: 'SG' },
        { label: '菲律宾站', value: 'PH' },
        { label: '越南站', value: 'VN' },
        { label: '印尼站', value: 'ID' },
        { label: '巴西站', value: 'BR' },
        { label: '墨西哥站', value: 'MX' }
      ],
      countries_id: {
        'TH': '4',
        'MY': '5',
        'TW': '3',
        'SG': '1',
        'PH': '7',
        'VN': '6',
        'ID': '2',
        'BR': '8'
      },
      category1: '',
      categoryList1: [],
      category2: '',
      categoryList2: [],
      category3: '',
      categoryList3: [],
      categoryList: []
    }
  },
  watch: {
    countryVal: {
      handler(val, oldVal) {
        this.category1 = ''
        this.category2 = ''
        this.category3 = ''
        this.categoryList1 = []
        this.categoryList2 = []
        this.categoryList3 = []
        this.getCategory(val, 0)
      },
      deep: true
    },
    category1(val, oldVal) {
      this.category2 = ''
      this.category3 = ''
      this.categoryList2 = []
      this.categoryList3 = []
      this.sendParent()
    },
    category2(val, oldVal) {
      this.category3 = ''
      this.categoryList3 = []
      this.sendParent()
    }
  },
  mounted() {
    this.countryVal = (!this.isAll && 'TH') || ''
  },
  methods: {
    async getCategory(categoryID, level) {
      if (!this.countryVal) {
        this.sendParent()
        return
      }
      if (this.level === level) {
        this.sendParent()
        return
      }
      if (level !== 0 && !categoryID) {
        this[`category${level + 1}`] = ''
        this[`categoryList${level + 1}`] = []
        this.sendParent()
        return
      }
      const query = [this.countryVal, level !== 0 ? (categoryID && categoryID !== '' ? categoryID : '') : '0', '1', 'tbCategory']
      const res = await this.$commodityService.getCategory(query)
      //   console.log('getCategory', res)
      if (!res) {
        return this.$message.warning('获取失败')
      }
      const resObj = JSON.parse(res)
      if (resObj.code === 200) {
        const data = resObj.data
        if (data.categories) {
          this[`categoryList${level + 1}`] = data.categories || []
        }
      } else {
        return this.$message.warning('获取失败')
      }
      console.log(this[`categoryList${level + 1}`], level, categoryID)
      this.sendParent()
    },
    sendParent() {
      console.log(this.category1, 1)
      this.categoryList = []
      if (this.category1) {
        const arr = [this.category1]
        this.categoryList = arr
        // console.log(this.categoryList, arr)
      }
      if (this.category1 && this.category2) {
        const arr = [this.category1, this.category2]
        this.categoryList = arr
        // console.log(this.categoryList, 2,arr)
      }
      if (this.category1 && this.category2 && this.category3) {
        const arr = [this.category1, this.category2, this.category3]
        this.categoryList = arr
        // console.log(this.categoryList, 3,arr)
      }
      const params = {
        country: this.countryVal,
        categoryFirst: this.category1,
        categorySecond: this.category2,
        categoryThird: this.category3,
        categoryList: this.categoryList,
        platformId: this.countries_id[this.countryVal]
      }
      console.log(params, 'params')
      this.$emit('setCategory', params)
    }
  }
}
</script>

<style lang="less" scoped>
.category-column {
  display: flex;
  flex-direction: column;
}
.category-content {
  display: flex;
  align-items: center;
  li {
    display: flex;
    margin-right: 10px;
    .el-select {
      display: flex;
    }
    .el-tag--info.el-tag--mini {
      max-width: 55%;
    }
  }
}
.column-item {
  margin-bottom: 10px;
  span {
    display: inline-block;
    width: 80px;
  }
}
</style>

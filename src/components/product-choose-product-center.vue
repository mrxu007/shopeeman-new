<!--
 * @Author: your name
 * @Date: 2021-10-21 15:41:32
 * @LastEditTime: 2022-01-17 16:41:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\components\category-choose.vue
-->
<template>
  <div>
    <ul class="wrap">
      <li>
        <span>一级类目：</span>
        <el-select
          v-model="categroyVal1"
          filterable
          placeholder="请选择"
          size="mini"
          @change="
            categroyVal2 = ''
            categroyVal3 = ''
            handleChange01()
          "
        >
          <el-option label="全部" :value="0" />
          <el-option v-for="(item, index) in categroyList1" :key="item.id" :label="item.cat_name" :value="item.id" />
        </el-select>
      </li>
      <li>
        <span>二级类目：</span>
        <el-select
          v-model="categroyVal2"
          filterable
          :disabled="categroyVal1 ? false : true"
          placeholder="请选择"
          size="mini"
          @change="
            categroyVal3 = ''
            handleChange02()
          "
        >
          <el-option v-for="(item, index) in categroyList2" :key="item.id" :label="item.cat_name" :value="item.id" />
        </el-select>
      </li>
      <li>
        <span>三级类目：</span>
        <el-select v-model="categroyVal3" filterable :disabled="categroyVal2 ? false : true" placeholder="请选择" size="mini" @change="handleChange03()">
          <el-option v-for="(item, index) in categroyList3" :key="item.id" :label="item.cat_name" :value="item.id" />
        </el-select>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProductChoose',
  props: {
    isClean: {
      type: Boolean,
      default: false,
    },
    isAll: {
      type: Boolean,
      default: false,
    },
    cataInfo: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 类目列表
      categroyList1: [],
      categroyList2: [],
      categroyList3: [],
      // 选中的类目
      categroyVal1: '',
      categroyVal2: '',
      categroyVal3: '',
      categroyData: [],
      categroyVal1Name: '',
      categroyVal2Name: '',
      categroyVal3Name: '',
    }
  },
  watch: {},
  async mounted() {
    await this.init()
    console.log(this.cataInfo, 'this.cataInfo')
    if (this.cataInfo.length) {
      this.categroyVal1 = this.cataInfo[0]
      let cate = this.categroyList1.find((n) => n.id == this.categroyVal1)
      if (cate) {
        this.categroyVal1Name = cate.cat_name
        this.$emit('CateId', { id: this.categroyVal1, name: [this.categroyVal1Name] })
        await this.getCategoryInfo(this.categroyVal1)
        this.categroyList2 = this.categroyData
        this.categroyVal2 = this.cataInfo[1]
      }
      if (this.categroyVal2) {
        let cate = this.categroyList2.find((n) => n.id == this.categroyVal2)
        if (cate) {
          this.categroyVal2Name = cate.cat_name
          this.$emit('CateId', { id: this.categroyVal2, name: [this.categroyVal1Name, this.categroyVal2Name] })
          await this.getCategoryInfo(this.categroyVal2)
          this.categroyList3 = this.categroyData
          this.categroyVal3 = this.cataInfo[2]
        }
        if (this.categroyVal3) {
          let cate = this.categroyList3.find((n) => n.id == this.categroyVal3)
          if (cate) {
            this.categroyVal3Name = cate.cat_name
            this.$emit('CateId', { id: this.categroyVal3, name: [this.categroyVal1Name, this.categroyVal2Name, this.categroyVal3Name] })
          }
        }
      }
    }
  },
  methods: {
    cleanData() {
      this.categroyVal1 = ''
      this.categroyVal2 = ''
      this.categroyVal3 = ''
      this.$emit('CateId', 0)
    },
    async init() {
      await this.getCategoryInfo(0)
      this.categroyList1 = this.categroyData
    },
    async handleChange01() {
      await this.getCategoryInfo(this.categroyVal1)
      // this.categroyVal2 = this.categroyData[0].id
      this.categroyList2 = this.categroyData
      if (this.isAll) {
        let cate = this.categroyList1.find((n) => n.id == this.categroyVal1)
        this.categroyVal1Name = cate?cate.cat_name:''
        this.$emit('CateId', { id: this.categroyVal1, name: [this.categroyVal1Name] })
      } else {
        this.$emit('CateId', this.categroyVal1)
      }
    },
    async handleChange02() {
      await this.getCategoryInfo(this.categroyVal2)
      // this.categroyVal3 = this.categroyData[0].id
      this.categroyList3 = this.categroyData
      if (this.isAll) {
        let cate = this.categroyList2.find((n) => n.id == this.categroyVal2)
        this.categroyVal2Name = cate.cat_name
        this.$emit('CateId', { id: this.categroyVal2, name: [this.categroyVal1Name, this.categroyVal2Name] })
      } else {
        this.$emit('CateId', this.categroyVal2)
      }
    },
    async handleChange03() {
      if (this.isAll) {
        let cate = this.categroyList3.find((n) => n.id == this.categroyVal3)
        this.categroyVal3Name = cate.cat_name
        this.$emit('CateId', { id: this.categroyVal3, name: [this.categroyVal1Name, this.categroyVal2Name, this.categroyVal3Name] })
      } else {
        this.$emit('CateId', this.categroyVal3)
      }
    },
    async getCategoryInfo(id) {
      let res = ''
      try {
        res = await this.$commodityService.getCategoryInfo(id)
        const jsonData = JSON.parse(res)
        console.log('hahwuhuba看jison', jsonData)
        if (jsonData.status_code === 200) {
          this.categroyData = jsonData.data
          console.log('categoryData', jsonData)
        } else {
          this.$message.error(jsonData.message)
        }
      } catch (error) {
        this.$message.error('产品中心类目获取失败')
        console.log(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '../module-less/product-center-less/own-goods.less';
.wrap {
  display: flex;
}
</style>

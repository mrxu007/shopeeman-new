<!--
 * @Author: your name
 * @Date: 2021-10-21 15:41:32
 * @LastEditTime: 2021-11-04 14:35:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\components\category-choose.vue
-->
<template>
  <div>
    <ul>
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
          <el-option
            v-for="(item, index) in categroyList1"
            :key="item.id"
            :label="item.cat_name"
            :value="item.id "
          />
        </el-select>
      </li>
      <li>
        <span>二级类目：</span>
        <el-select
          v-model="categroyVal2"
          :disabled="categroyVal1 ? false : true"
          placeholder="请选择"
          size="mini"
          @change="
            categroyVal3 = ''
            handleChange02()
          "
        >
          <el-option
            v-for="(item, index) in categroyList2"
            :key="item.id"
            :label="item.cat_name"
            :value="item.id "
          />
        </el-select>
      </li>
      <li>
        <span>三级类目：</span>
        <el-select
          v-model="categroyVal3"
          :disabled="categroyVal2 ? false : true"
          placeholder="请选择"
          size="mini"
          @change="handleChange03()"
        >
          <el-option
            v-for="(item, index) in categroyList3"
            :key="item.id"
            :label="item.cat_name"
            :value="item.id "
          />
        </el-select>
      </li>
    </ul></div>
</template>

<script>
export default {
  name: 'ProductChoose',
  props: {
    isClean: {
      type: Boolean,
      default: false
    }
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
      categroyData: []
    }
  },
  watch: {
  },
  mounted() {
    this.init()
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
      this.$emit('CateId', this.categroyVal1)
    },
    async handleChange02() {
      await this.getCategoryInfo(this.categroyVal2)
      // this.categroyVal3 = this.categroyData[0].id
      this.categroyList3 = this.categroyData
      this.$emit('CateId', this.categroyVal2)
    },
    async handleChange03() {
      this.$emit('CateId', this.categroyVal3)
    },
    async getCategoryInfo(id) {
      let res = ''
      try {
        res = await this.$commodityService.getCategoryInfo(id)
        const jsonData = JSON.parse(res)
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
    }

  }
}
</script>

<style lang="less" scoped>
  ul{
    // display: flex;
    li{
      margin: 0 20px 10px 0;
      display: flex;
    }
  }
</style>

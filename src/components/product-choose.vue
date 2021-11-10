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
          v-model="selectCategroyList.selectCategroyList1"
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          @change="
            selectCategroyList.selectCategroyList2 = ''
            CategroyCollect()
          "
        >
          <el-option v-for="(item, index) in CategroyList.pddCategroyList1" :key="item.id" :label="item.CatName" :value="item.CatId1 + '-' + item.CatName" />
        </el-select>
      </li>
      <li>
        <span>二级类目：</span>
        <el-select
          v-model="selectCategroyList.selectCategroyList2"
          :disabled="selectCategroyList.selectCategroyList1 ? false : true"
          placeholder="请选择"
          size="mini"
          @change="
            selectCategroyList.selectCategroyList3 = ''
            CategroyCollect()
          "
        >
          <el-option v-for="(item, index) in CategroyList.pddCategroyList2" :key="item.id" :label="item.CatName" :value="item.CatId2 + '-' + item.CatName" />
        </el-select>
      </li>
      <li>
        <span>三级类目：</span>
        <el-select
          v-model="selectCategroyList.selectCategroyList3"
          clearable
          :disabled="selectCategroyList.selectCategroyList2 ? false : true"
          placeholder="请选择"
          size="mini"
          @change="CategroyCollect()"
        >
          <el-option v-for="(item, index) in CategroyList.pddCategroyList3" :key="item.id" :label="item.CatName" :value="item.CatId3 + '-' + item.CatName" />
        </el-select>
      </li>
    </ul></div>
</template>

<script>
export default {
  name: 'ProductChoose',
  props: {
    // spanWidth: {
    //   type: String,
    //   default: '80px'
    // },
  },
  data() {
    return {
      // 类目列表
      CategroyList: {
        selectAllCategroyList: [],
        allJdCategroyList: [],
        pddCategroyList1: [],
        pddCategroyList2: [],
        pddCategroyList3: []
      },
      // 选中的类目
      selectCategroyList: {
        selectCategroyList1: '',
        selectCategroyList2: '',
        selectCategroyList3: ''
      }
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
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

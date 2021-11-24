<template>
  <div style="display: flex;">
    <div class="item">
      <label>所属站点：</label>
      <el-select v-model="site" size="mini" style="width:100px">
        <el-option v-for="(item,index) in siteList" :key="index" :value="item.value" :label="item.label" />
      </el-select>
    </div>

    <div class="item">
      <label>店铺分组：</label>
      <el-select v-model="group" size="mini" style="width:180px" clearable placeholder="">
        <el-option label="全部" value="" />
        <el-option v-for="(item,index) in gruopList" :key="index" :value="item.value" :label="item.label" />
      </el-select>
    </div>

    <div class="item">
      <label>店铺名称：</label>
      <el-select v-model="mall" size="mini" style="width:180px" clearable placeholder="" @change="changeMall">
        <!-- <el-option label="全部" value="" /> -->
        <el-option v-for="(item,index) in mallList" :key="index" :value="item.value" :label="item.label" />
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsChoose',
  data() {
    return {
      site: 'TH', // 站点
      siteList: this.$filters.countries_option, // 所有站点
      group: '', // 分组
      gruopList: [],
      mall: '', // 店铺
      mallList: []
    }
  },
  watch: {
    site: {
      handler(val, oldVal) {
        this.group = ''
        this.mall = ''
        this.site = val
        this.getInfo()
      }
    },
    group: {
      handler(val, oldVal) {
        this.group = val
        this.mall = ''
        this.getInfo()
      }
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    // 店铺选择
    changeMall() {
      this.$emit('getmall', {
        mallID: this.mall,
        country: this.site
      })
    },
    // 分组信息查找
    async getInfo() {
      const params = {
        country: this.site,
        mallGroupIds: this.group
      }
      const res = await this.$api.ddMallGoodsGetMallList(params)
      this.mallList = []; this.gruopList = []
      if (res.data.code === 200) {
        res.data.data.forEach(el => {
          if (el.group_id) {
            this.gruopList.push({ label: el.group_name, value: el.group_id })
          }
          if (el.id) {
            this.mallList.push({ label: el.mall_alias_name ? el.mall_alias_name : el.platform_mall_name, value: el.platform_mall_id })
          }
        })
        this.mall = this.mallList[0]?.value || ''
        this.$emit('getmall', {
          mallID: this.mall,
          country: this.site
        })
      } else {
        this.$message.warning('店铺列表获取失败！')
      }
    }
  }
}
</script>
<style lang="less">
   .item{
       margin-left: 20px;
   }
</style>

<template>
  <div>
    <ul class="storeChooseUL">
      <li :style="isReset &&'margin-bottom: 5px;' || ''">
        <span :style="{ width: spanWidth }">所属站点：</span>
        <el-select v-model="countryVal" size="mini" filterable class="siteSelectBox">
          <el-option v-if="isAll" label="全部" :value="''"/>
          <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
      </li>
      <li :style="isReset &&'margin-bottom: 5px;' || ''">
        <span :style="{ width: spanWidth }">店铺分组：</span>
        <el-select v-model="groupId" placeholder="" multiple collapse-tags size="mini" filterable class="selectBox">
          <el-option label="全部" :value="''"/>
          <el-option v-for="(item, index) in groupIdList" :key="index" :label="item.group_name" :value="item.id"/>
        </el-select>
      </li>
      <li :style="isReset &&'margin-bottom: 5px;' || ''">
        <span :style="{ width: spanWidth }">店铺名称：</span>
        <el-select v-model="site" placeholder="" multiple collapse-tags size="mini" filterable class="selectBox">
          <el-option label="全部" :value="''"/>
          <el-option v-for="(item, index) in siteList" :key="index"
                     :label="item.mall_alias_name || item.platform_mall_name" :value="item.platform_mall_id"/>
        </el-select>
      </li>
      <li v-if="isReset" style="margin-left: 45px;margin-bottom: 5px;">
        <el-button type="primary" size="mini" @click="reset" style="width: 120px;">刷　　新</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
  import MallListAPI from '../module-api/mall-manager-api/mall-list-api'

  export default {
    name: 'StoreChoose',
    props: {
      showMallAll: {
        type: Boolean,
        default: false
      },
      spanWidth: {
        type: String,
        default: '80px'
      },
      isAll: {
        type: Boolean,
        default() {
          return false
        }
      },
      source: {
        type: String,
        default() {
          return ''
        }
      },
      searchAll: {
        type: Boolean,
        default() {
          return false
        }
      },
      isCountry: {
        type: Boolean,
        default() {
          return false
        }
      },
      isReset: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        isAllowSet1: true,
        isAllowSet2: true,
        countryVal: null,
        groupId: [],
        groupIdList: [],
        site: [],
        siteList: [],
        countries: this.$filters.countries_option,
        mallListAPIInstance: new MallListAPI(this)
      }
    },
    watch: {
      countryVal: {
        handler(val, oldVal) {
          this.isAllowSet2 = false
          this.groupId = []
          this.groupIdList = []
          this.ddMallGoodsGetMallList(1)
        },
        deep: true
      },
      groupId: {
        handler(val, oldVal) {
          if (this.isAllowSet2) {
            this.isAllowSet2 = false
            const isOldAll = oldVal.indexOf('') > -1
            const isAll = val.indexOf('') > -1
            if (isOldAll !== isAll) {
              if (isAll) {
                this.groupId = ['']
                this.groupIdList.forEach((item) => {
                  this.groupId.push(item.id)
                })
              } else {
                this.groupId = []
              }
            } else if (isAll) {
              this.groupId = val.slice(1)
            } else if (this.groupIdList.length > 0 && this.groupId.length === this.groupIdList.length) {
              this.groupId.unshift('')
            }
            setTimeout(() => {
              this.isAllowSet2 = true
              this.ddMallGoodsGetMallList(2)
            }, 10)
          }
        },
        deep: true
      },
      site: {
        handler(val, oldVal) {
          if (this.isAllowSet1) {
            this.isAllowSet1 = false
            const isOldAll = oldVal.indexOf('') > -1
            const isAll = val.indexOf('') > -1
            if (isOldAll !== isAll) {
              if (isAll) {
                this.site = ['']
                this.siteList.forEach((item) => {
                  this.site.push(item.platform_mall_id)
                })
              } else {
                this.site = []
              }
            } else if (isAll) {
              this.site = val.slice(1)
            } else if (this.siteList.length > 0 && this.siteList.length === this.site.length) {
              this.site.unshift('')
            }
            setTimeout(() => {
              this.changeMallList()
              this.isAllowSet1 = true
            })
          }
        },
        deep: true
      }
    },
    mounted() {
      this.countryVal = (!this.isAll && 'TH') || ''
    },
    methods: {
      reset(){
        this.isAllowSet2 = false
        this.groupId = []
        this.groupIdList = []
        this.ddMallGoodsGetMallList(1)
      },
      async changeSelect(val) {
        console.log(val)
      },
      async ddMallGoodsGetMallList(val) {
        this.site = []
        const country = this.countryVal.toLocaleUpperCase()
        const groupId = (this.groupId.indexOf('') > -1 && this.groupId.slice(1).toString()) || this.groupId.toString()
        const param = {
          country: country,
          mallGroupIds: groupId
        }
        const res = await this.mallListAPIInstance.ddMallGoodsGetMallList(param)
        // console.log('ddMallGoodsGetMallList - res', res)
        if (res.code === 200) {
          console.log(res.data)
          this.siteList = res.data
          if (this.groupIdList.length === 0) {
            this.groupId = ['']
            this.siteList.forEach((item) => {
              const index = this.groupIdList.findIndex((i) => i.id === item.group_id)
              if (item.group_name && index < 0) {
                this.groupIdList.push({
                  group_name: item.group_name,
                  id: item.group_id
                })
                this.groupId.push(item.group_id)
              }
            })
          }
          setTimeout(() => {
            this.isAllowSet2 = true
            this.isAllowSet1 = true
            this.site = ['']
          }, 10)
        } else {
          this.$message.error('获取分组、店铺列表失败')
        }
      },
      changeMallList() {
        const mallList = []
        let searchAll = ''
        this.site.forEach((item) => {
          if (item) {
            const temp = this.siteList.filter((i) => i.platform_mall_id === item)
            mallList.push(temp[0])
            searchAll += item + ','
          }
        })
        searchAll = mallList.length === this.siteList.length && searchAll || ''
        if (this.source || this.searchAll || this.isCountry) {
          this.$emit('changeMallList', {
            mallList: mallList,
            source: this.source,
            searchAll: searchAll,
            country: this.countryVal.toLocaleUpperCase()
          })
        } else {
          this.$emit('changeMallList', mallList)
        }
      }
    }
  }
</script>

<style lang="less">
  .storeChooseUL {
    display: flex;
    align-items: center;
    flex-flow: wrap;
    li {
      display: flex;
      margin-right: 10px;
      align-items: center;

      span {
        display: inline-block;
        text-align: right;
      }

      .el-select {
        display: flex;
      }

      .el-tag--info.el-tag--mini {
        max-width: 80px;
      }

      .siteSelectBox {
        width: 100px;
      }

      .selectBox {
        width: 180px;
      }
    }
  }
</style>

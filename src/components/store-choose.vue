<template>
  <div>
    <ul class="storeChooseUL">
      <li v-if="isMall">{{ countryVal | chineseSite }}</li>
      <li v-else :style="isReset && 'margin-bottom: 5px'">
        <span :style="{ width: spanWidth }">所属站点：</span>
        <el-select v-model="countryVal" size="mini" filterable class="siteSelectBox" :disabled="isBanPerform">
          <el-option v-if="isAll" label="全部" :value="''"/>
          <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
      </li>
      <li :style="isReset && 'margin-bottom: 5px'">
        <span :style="{ width: spanWidth }">店铺分组：</span>
        <el-select :disabled="isBanPerform" v-model="groupId" multiple collapse-tags filterable size="mini" class="selectBox">
          <el-option v-for="(item, index) in groupIdList" :key="index" :label="item.group_name" :value="item.id"/>
        </el-select>
      </li>
      <li :style="isReset && 'margin-bottom: 5px'">
        <span :style="{ width: spanWidth }">店铺名称：</span>
        <el-select
            :disabled="isBanPerform"
            v-model="site"
            v-loadmore="loadmoreMall"
            placeholder=""
            :multiple="!isAShop"
            collapse-tags
            :filter-method="filterMall"
            size="mini"
            filterable
            class="selectBox"
            clearable
            @visible-change="filterMall('')"
        >
          <el-option v-if="!isAShop" label="全部" :value="''"/>
          <el-option
              v-for="(item, index) in siteShowList"
              v-if="showMall(item,index)"
              :key="index"
              :label="item.mall_alias_name || item.platform_mall_name"
              :value="item.platform_mall_id"
          />
        </el-select>
      </li>
      <li v-if="isReset" style="margin-bottom: 5px;margin-left: 25px;">
        <el-button size="mini" type="primary" style="justify-self: self-end" @click="reset" :disabled="isBanPerform">　刷　　新　</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import MallListAPI from '../module-api/mall-manager-api/mall-list-api'
import Vue from 'vue'

Vue.directive('loadmore', {
  bind(el, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTWRAP_DOM.addEventListener('scroll', function() {
      // console.log(this.scrollHeight,this.scrollTop,this.clientHeight)
      if (this.scrollHeight - this.scrollTop <= (this.clientHeight + 50)) {
        binding.value(true, this)
      } else if (this.scrollTop < 30) {
        binding.value(false, this)
      }
    })
    // SELECTWRAP_DOM.addEventListener('blur', () => {
    //   console.log('测试')
    //   this.scrollTop = 0
    // })
  }
})
export default {
  name: 'StoreChoose',
  props: {
    spanWidth: {
      type: String,
      default: '80px'
    },
    parentCountry: {
      type: String,
      default: 'TH'
    },
    isMall: {
      type: Boolean,
      default() {
        return false
      }
    },
    isBanPerform: {
      type: Boolean,
      default() {
        return false
      }
    },
    isAll: {
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
    },
    source: {
      type: String,
      default() {
        return ''
      }
    },
    isAShop:{
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
      siteShowList: [],
      countries: this.$filters.countries_option,
      mallListAPIInstance: new MallListAPI(this),
      isShowName: '',
      isShowNameAll: false,
      showMallNumber: 100,
      mallShowIndex: 0,
      jsonMallData: [],
      filterMallTime: null
    }
  },
  watch: {
    siteList(val) {
      this.siteShowList = val
    },
    countryVal: {
      handler(val, oldVal) {
        this.isShowName = ''
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
          this.isShowName = ''
          this.isAllowSet2 = false
          const isOldAll = oldVal.indexOf('') > -1
          const isAll = val.indexOf('') > -1
          if (isOldAll !== isAll) {
            if (isAll) {
              this.groupId = [...this.groupIdList.map(i => i.id)]
            } else {
              this.groupId = []
            }
          } else if (isAll) {
            this.groupId = val.slice(1)
          } else if (this.groupIdList.length > 0 && this.groupId.length === this.groupIdList.length - 1) {
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
          let showName = this.isShowName
          if (!this.isAShop){
            const isOldAll = oldVal.includes('')
            const isAll = val.includes('')
            if (isOldAll !== isAll || (oldVal.toString() === val.toString() && this.isShowNameAll)) {
              if (isAll && (!showName || showName && !this.isShowNameAll)) {
                let showList = showName && [...this.siteShowList.map(i => i.platform_mall_id)] || ['', ...this.siteList.map(i => i.platform_mall_id)]
                let setList = new Set([...showList, ...oldVal])
                this.site = [...setList]
                this.isShowNameAll = true
                showName && this.siteList.length === this.site.length && this.site.unshift('')
              } else {
                this.isShowNameAll = false
                let setList = []
                if (showName) {
                  let showList = showName && [...this.siteShowList.map(i => i.platform_mall_id)]
                  let maxList = showList.length > this.site.length && this.site || showList
                  let minList = showList.length > this.site.length && showList || this.site
                  setList = new Set(this.site)
                  for (let item of minList) {
                    if (maxList.includes(item)) {
                      setList.delete(item)
                    }
                  }
                  setList.delete('')
                }
                this.site = [...setList]
              }
            } else if (isAll) {
              this.site = val.slice(1)
            } else if (this.siteList.length > 0 && this.siteList.length === this.site.length) {
              this.site.unshift('')
            } else {
              this.isShowNameAll = false
            }
          }
          setTimeout(() => {
            this.changeMallList()
            this.filterMall(showName)
            this.isAllowSet1 = true
          }, 10)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.countryVal = this.isMall ? this.parentCountry : (!this.isAll && 'TH') || ''
  },
  methods: {
    reset() {
      this.isAllowSet2 = false
      this.groupId = []
      this.groupIdList = []
      this.ddMallGoodsGetMallList(1)
    },
    async ddMallGoodsGetMallList(val) {
      this.site = []
      const country = this.countryVal
      let jsonMallData = []
      if (this.jsonMallData.length > 0) {
        jsonMallData = this.jsonMallData
      } else {
        const mallData = await this.$appConfig.temporaryCacheInfo('get', 'mallAllData', '')
        jsonMallData = JSON.parse(mallData) || []
        this.jsonMallData = JSON.parse(mallData) || []
      }
      if (jsonMallData.length > 0) {
        if (val === 1) {
          this.siteList = country === '' ? jsonMallData : jsonMallData.filter(item => {
            return item.country === country
          })
        }
        if (val === 2) {
          if (this.groupId.length === 0) {
            this.siteList = []
          } else {
            this.siteList = []
            this.groupId.forEach(item => {
              jsonMallData.forEach(mItem => {
                if (country) {
                  if (item === mItem.group_id && country === mItem.country) {
                    this.siteList.push(mItem)
                  }
                } else {
                  if (item === mItem.group_id) {
                    this.siteList.push(mItem)
                  }
                }
              })
            })
          }
        }
      } else {
        const param = {
          country: '',
          mallGroupIds: ''
        }
        const res = await this.mallListAPIInstance.ddMallGoodsGetMallList(param)
        if (res.code === 200) {
          this.$appConfig.temporaryCacheInfo('save', 'mallAllData', res.data)
          const data = res.data || []
          this.siteList = data
          this.jsonMallData = data
          this.siteList = country === '' ? data : data.filter(item => {
            return item.country === country
          })
        } else {
          this.$message.error('获取分组、店铺列表失败')
        }
      }
      let groupIdList = []
      if (this.groupIdList.length === 0) {
        this.groupIdList = [{
          group_name: '全部',
          id: ''
        }]
        this.siteList.forEach((item) => {
          const index = groupIdList.findIndex((i) => i && i.id === item.group_id)
          if (item.group_name && index < 0) {
            groupIdList.push({
              group_name: item.group_name,
              id: item.group_id
            })
          }
        })
        groupIdList.zzSort('id')
        this.groupIdList = [...this.groupIdList,...groupIdList]
        this.groupId = ['',...groupIdList.map(son=>son.id)]
      }
      setTimeout(() => {
        this.isAllowSet2 = true
        this.isAllowSet1 = true
        this.site = !this.isAShop && [''] || ''
      }, 10)
    },
    changeMallList() {
      const mallList = []
      let searchAll = ''
      if (!this.isAShop){
        this.site.forEach((item) => {
          if (item) {
            const temp = this.siteList.find((i) => i.platform_mall_id === item)
            mallList.push(temp)
            searchAll += (item + ',')
          }
        })
      }else{
        const temp = this.siteList.find((i) => i.platform_mall_id === this.site)
        searchAll = this.site
        mallList.push(temp)
      }
      if (!this.countryVal && this.groupId.indexOf('') > -1) {
        searchAll = mallList.length !== this.siteList.length && searchAll || ''
      }
      if (this.source) {
        this.$emit('changeMallList', {
          mallList: mallList,
          source: this.source,
          searchAll: searchAll,
          country: this.countryVal.toLocaleUpperCase()
        })
      } else {
        mallList['country'] = this.countryVal
        this.$emit('changeMallList', mallList)
      }
    },
    filterMall(val) {
      let time = val && this.isShowName !== val && 1000 || 100
      if (this.filterMallTime) {
        clearTimeout(this.filterMallTime)
        this.filterMallTime = null
      }
      this.filterMallTime = setTimeout(() => {
        if (this.isShowName !== val){
          this.mallShowIndex = 0
        }
        this.isShowName = val || ''
        let list1 = this.siteList
        if (val) {
          list1 = this.siteList.filter(i => {
            const name = i.mall_alias_name || i.platform_mall_name
            return name.includes(val)
          })
        }
        this.siteShowList = list1
      }, time)
    },
    showMall(item, index) {
      const name = item.mall_alias_name || item.platform_mall_name
      const isFirst = this.site[0] === item.platform_mall_id
      return isFirst || this.mallShowIndex <= index && index <= this.mallShowIndex + this.showMallNumber && (!this.isShowName || name.includes(this.isShowName))
    },
    loadmoreMall(val, that) {
      if (this.siteShowList.length > this.showMallNumber) {
        let newIndex = 0
        if (val) {
          newIndex = this.mallShowIndex + 10
          newIndex = newIndex < (this.siteShowList.length - this.showMallNumber) && newIndex || (this.siteShowList.length - this.showMallNumber)
        } else {
          newIndex = this.mallShowIndex - 10
          newIndex = newIndex > 0 && newIndex || 0
        }
        if (newIndex !== this.mallShowIndex) {
          that.scrollTop = !val && 30 || (that.scrollTop - 100)
        }
        this.mallShowIndex = newIndex
      }
    }
  }
}
</script>

<style lang="less">
.storeChooseUL {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

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

    .el-select__tags {
      max-width: 153px !important;
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
    }

    .el-input__suffix {
      right: 0;
    }
  }
}
</style>

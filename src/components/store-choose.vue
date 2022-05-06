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
        <el-select :disabled="isBanPerform" v-model="groupId" :style="{ width: inputWidth }" multiple collapse-tags
                   filterable size="mini" class="selectBox">
          <el-option label="全部" :value="''" @click.native="changeGroupSelect(groupId,true)"/>
          <el-option v-for="(item, index) in groupIdList" :key="index" :label="item.group_name"
                     :value="item.id" @click.native="changeGroupSelect(groupId)"/>
        </el-select>
      </li>
      <li v-show="showGrade < 2" :style="isReset && 'margin-bottom: 5px'">
        <span :style="{ width: spanWidth }">店铺名称：</span>
        <el-select
            :style="{ width: inputWidth }"
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
            @visible-change="filterMall('')">
          <el-option v-if="!isAShop" label="全部" :value="''" @click.native="changeSiteSelect(site,true)"/>
          <el-option
              v-for="(item, index) in siteShowList"
              v-if="showMall(item,index)"
              @click.native="changeSiteSelect(site)"
              :key="index"
              :label="item.mall_alias_name || item.platform_mall_name"
              :value="item.platform_mall_id"
          />
        </el-select>
      </li>
      <li v-if="isReset" style="margin-bottom: 5px;margin-left: 25px;">
        <el-button size="mini" type="primary" style="justify-self: self-end" @click="reset" :disabled="isBanPerform">
          　刷　　新　
        </el-button>
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
    spanWidth: { //前缀宽
      type: String,
      default: '80px'
    },
    inputWidth: { //输入宽
      type: String,
      default: '180px'
    },
    parentCountry: {  //初始站点
      type: String,
      default: 'TH'
    },
    isMall: { //是否可修改站点
      type: Boolean,
      default() {
        return false
      }
    },
    isBanPerform: { // 停止使用
      type: Boolean,
      default() {
        return false
      }
    },
    isAll: {  //是否支持全站点
      type: Boolean,
      default() {
        return false
      }
    },
    isReset: {  //是否可刷新
      type: Boolean,
      default() {
        return false
      }
    },
    source: { //返回数据较比全
      type: String,
      default() {
        return ''
      }
    },
    isAShop: { //是否为单店铺
      type: Boolean,
      default() {
        return false
      }
    },
    showGrade: { //显示等级
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      countryVal: null,
      groupId: [],
      groupIdList: [],
      allSiteList: [],
      site: [],
      siteList: [],
      siteShowList: [],
      countries: this.$filters.countries_option,
      mallListAPIInstance: new MallListAPI(this),
      isShowName: '',
      isShowNameAll: false,
      showMallNumber: 100,
      mallShowIndex: 0,
      filterMallTime: null
    }
  },
  watch: {
    siteList(val) {
      this.siteShowList = val
    },
    countryVal: {
      handler(val) {
        this.isShowName = ''
        this.groupId = []
        this.groupIdList = []
        this.getMallGoodsGetMallList(1)
      },
      deep: true
    }
  },
  mounted() {
    this.countryVal = !this.isAll && this.parentCountry || ''
  },
  methods: {
    reset() {
      this.groupId = []
      this.groupIdList = []
      this.getMallGoodsGetMallList(1)
    },
    changeGroupSelect(val, type) {
      console.log('changeGroupSelect')
      if (type) {
        if (!val.includes('')) {
          this.groupId = []
        } else {
          this.groupId = ['', ...this.groupIdList.map(son => son.id)]
        }
      } else {
        if (!val.includes('') && val.length === this.groupIdList.length) {
          this.groupId.unshift('')
        } else if (val.includes('') && val.length === this.groupIdList.length) {
          this.groupId = val.slice(1)
        }
      }
      this.getMallGoodsGetMallList(2)
    },
    changeSiteSelect(val, type) {
      console.log('changeSiteSelect')
      let showName = this.isShowName
      if (!this.isAShop) {
        if (type) {
          if (!val.includes('')) {
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
          } else {
            let showList = showName && [...this.siteShowList.map(i => i.platform_mall_id)] || ['', ...this.siteList.map(i => i.platform_mall_id)]
            let setList = new Set([...showList, ...val])
            this.site = [...setList]
            this.isShowNameAll = true
            showName && this.siteList.length === this.site.length && this.site.unshift('')
          }
        } else {
          if (!val.includes('') && this.siteList.length > 0 && this.siteList.length === this.site.length) {
            this.site.unshift('')
          } else if (val.includes('')) {
            this.site = val.slice(1)
          }
        }
      }
      this.changeMallList()
      this.filterMall(showName)
    },
    async getMallGoodsGetMallList(val) {
      console.log('getMallGoodsGetMallList - val', val)
      if (val === 1) {
        const country = this.countryVal
        const res = await this.mallListAPIInstance.ddMallGoodsGetMallList()
        if (res.code === 200) {
          const data = res.data || []
          this.allSiteList = data
          this.siteList = country === '' ? data : data.filter(item => item.country === country)
        } else {
          this.$message.error('获取分组、店铺列表失败')
        }
        if (this.groupIdList.length === 0) {
          let setGroupIdList = new Set(this.siteList.map(son => {
            if (son.group_id) {
              return JSON.stringify({
                group_name: son.group_name,
                id: son.group_id
              })
            }
          }))
          setGroupIdList.delete(undefined)
          let groupIdListJson = [...setGroupIdList]
          let groupIdList = groupIdListJson.map(son => JSON.parse(son))
          groupIdList.zzSort('id')
          this.groupIdList = [...groupIdList]
          this.groupId = ['', ...groupIdList.map(son => son.id)]
        }
      } else {
        if (this.groupId[0] === ''){
          this.siteList = this.allSiteList
        }else{
          this.siteList = this.allSiteList.filter(son => {
            if (this.groupId.includes(son.group_id)) {
              return son
            }
          })
        }
      }
      this.changeSiteSelect([''], true)
    },
    changeMallList() {
      console.log('changeMallList')
      let start = new Date().getTime()
      let mallList = []
      let searchAll = ''
      let site = this.site
      if (!this.isAShop) {
        if (site.length && site[0] === '') {
          site = site.slice(1)
        }
        searchAll = site.toString()
        mallList = this.siteList.filter(son => {
          return site.includes(son.platform_mall_id)
        })
        console.log(new Date() - start)
      } else {
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
          groupIdList: this.groupId,
          source: this.source,
          searchAll: searchAll,
          country: this.countryVal.toLocaleUpperCase()
        })
      } else {
        mallList['country'] = this.countryVal
        this.$emit('changeMallList', mallList)
      }
    },
    filterMall(val,type) {
      let time = val && this.isShowName !== val && 1000 || 100
      if (this.filterMallTime) {
        clearTimeout(this.filterMallTime)
        this.filterMallTime = null
      }
      this.filterMallTime = setTimeout(() => {
        if (this.isShowName !== val ) {
          this.mallShowIndex = 0
        }
        this.isShowName = val || ''
        let list1 = []
        if (val) {
          list1 = this.siteList.filter(i => {
            const name = i.mall_alias_name || i.platform_mall_name
            return name.includes(val)
          })
        }else{
          list1 = this.siteList
        }
        this.siteShowList = list1
      }, time)
    },
    showMall(item, index) {
      console.log('showMall')
      const name = item.mall_alias_name || item.platform_mall_name
      const isFirst = this.site[0] === item.platform_mall_id
      return isFirst || this.mallShowIndex <= index && index <= this.mallShowIndex + this.showMallNumber && (!this.isShowName || name.includes(this.isShowName))
    },
    loadmoreMall(val, that) {
      if (this.siteList.length > this.showMallNumber) {
        let newIndex = 0
        if (val) {
          let maxIndex = (this.siteList.length - this.showMallNumber)
          newIndex = this.mallShowIndex + 10
          newIndex = newIndex < maxIndex && newIndex || maxIndex
        } else {
          newIndex = this.mallShowIndex - 10
          newIndex = newIndex > 0 && newIndex || 0
        }
        if (newIndex !== this.mallShowIndex) {
          that.scrollTop = !val && 30 || (that.scrollTop - 100)
          this.mallShowIndex = newIndex
          //this.siteShowList = this.siteList.slice(this.mallShowIndex,this.mallShowIndex + this.showMallNumber)
          //console.log('this.siteShowList',this.mallShowIndex,this.mallShowIndex + this.showMallNumber)
        }
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
.el-select-dropdown{
  max-width: 180px;
}
</style>

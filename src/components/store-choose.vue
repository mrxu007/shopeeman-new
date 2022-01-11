<template>
  <div>
    <ul class="storeChooseUL">
      <li :style="isReset && 'margin-bottom: 5px'">
        <span :style="{ width: spanWidth }">所属站点：</span>
        <el-select v-model="countryVal" :disabled="isMall" size="mini" filterable class="siteSelectBox">
          <el-option v-if="isAll" label="全部" :value="''" />
          <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </li>
      <li :style="isReset && 'margin-bottom: 5px'">
        <span :style="{ width: spanWidth }">店铺分组：</span>
        <el-select v-model="groupId" placeholder="" multiple collapse-tags size="mini" filterable class="selectBox">
          <el-option label="全部" :value="''" />
          <el-option v-for="(item, index) in groupIdList" :key="index" :label="item.group_name" :value="item.id" />
        </el-select>
      </li>
      <li :style="isReset && 'margin-bottom: 5px'">
        <span :style="{ width: spanWidth }">店铺名称：</span>
        <el-select
          v-model="site"
          v-loadmore="loadmoreMall"
          placeholder=""
          multiple
          collapse-tags
          :filter-method="filterMall"
          size="mini"
          filterable
          class="selectBox"
        >
          <el-option v-if="!isShowName" label="全部" :value="''" />
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
        <el-button size="mini" type="primary" style="justify-self: self-end" @click="reset">　刷　　新　</el-button>
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
      showMallNumber: 100,
      mallShowIndex: 0
    }
  },
  watch: {
    siteList(val) {
      this.siteShowList = val
    },
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
              this.groupId = ['', ...this.groupIdList.map(i => i.id)]
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
              this.site = ['', ...this.siteList.map(i => i.platform_mall_id)]
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
          const temp = this.siteList.find((i) => i.platform_mall_id === item)
          mallList.push(temp)
          searchAll += (item + ',')
        }
      })
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
      this.isShowName = val || ''
      const list1 = this.siteList.filter(i => {
        const name = i.mall_alias_name || i.platform_mall_name
        return name.includes(val)
      })
      this.showMallNumber = list1.length - this.showMallNumber
      const list2 = this.siteList.filter(i => {
        const name = i.mall_alias_name || i.platform_mall_name
        return !name.includes(val)
      })
      this.siteShowList = [...list1, ...list2]
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
          newIndex = newIndex < this.siteShowList.length && newIndex || this.mallShowIndex
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
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
    }
  }
}
</style>

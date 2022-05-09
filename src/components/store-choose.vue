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
        <el-popover placement="top" width="180" trigger="click">
          <u-table ref='zz_mall_select_all' class="zz_mall_select_all"
                   tooltip-effect='dark' v-if='tableShow'
                   :show-header="false" :row-height='34' :border='false'
                   big-data-checkbox use-virtual show-body-overflow
                   :data-changes-scroll-top='false'
                   :data='siteShowList' max-height='250' :cell-style="{ padding: '0px!important'}">
            <u-table-column align='left' min-width="160">
              <template slot-scope='scope'>
                <div @click="changeSiteSelect(scope.row.platform_mall_id,!scope.row.platform_mall_id)"
                     class="zz_mall_select_item"
                     :class="siteId.includes(scope.row.platform_mall_id) && 'zz_mall_select_active'">
                  {{ scope.row.mall_alias_name || scope.row.platform_mall_name }}
                </div>
              </template>
            </u-table-column>
          </u-table>
          <div slot="reference" class="zz_mall_select_input" @click="goTableShowTop" :style="{ width: inputWidth }">
            <el-tag type="info" size="mini" v-if="site.length">
              {{ site[0].mall_alias_name || site[0].platform_mall_name }}
            </el-tag>
            <el-tag type="info" size="mini" v-if="site.length > 1">+{{ site.length - 1 }}</el-tag>
            <el-input size="mini" v-model="searchSite" clearable @input="searchInput"></el-input>
          </div>
        </el-popover>
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
      siteId: [],
      siteList: [],
      siteShowList: [],
      tableShow: true,
      searchSite: '',
      countries: this.$filters.countries_option,
      mallListAPIInstance: new MallListAPI(this),
      showMallNumber: 100,
      mallShowIndex: 0
    }
  },
  watch: {
    siteList(val) {
      this.siteShowList = val
    },
    countryVal: {
      handler(val) {
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
    async getMallGoodsGetMallList(val) {
      console.log('getMallGoodsGetMallList - val', val)
      this.searchSite = ''
      if (val === 1) {
        const country = this.countryVal
        const res = await this.mallListAPIInstance.ddMallGoodsGetMallList()
        if (res.code === 200) {
          const data = res.data || []
          if (!this.isAShop) {
            data.unshift({ platform_mall_name: '全部', platform_mall_id: '' })
          }
          this.allSiteList = country === '' ? data : data.filter(item => item?.country === country || !item.platform_mall_id)
          this.siteList = this.allSiteList
          // this.siteShowList = this.siteList
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
        let temp = []
        if (this.groupId[0] === '') {
          temp = this.allSiteList
          // temp = this.siteList
        } else {
          temp = this.allSiteList.filter(son => {
            // temp = this.siteList.filter(son => {
            if (this.groupId.includes(son.group_id) || !son.platform_mall_id) {
              return son
            }
          })
        }
        this.siteList = temp
        // this.siteShowList = temp
      }
      this.siteId = []
      this.changeSiteSelect('', true)
    },
    changeSiteSelect(val, type) {
      let showName = this.searchSite
      let siteActive = this.siteId
      if (!this.isAShop) {
        if (type) {
          if (showName) {
            let showSiteId = this.siteShowList.map(son => son.platform_mall_id)
            if (siteActive.includes(val)) {
              siteActive = siteActive.filter(son => !showSiteId.includes(son))
            } else {
              let temp = new Set(['', ...siteActive, ...showSiteId])
              siteActive = [...temp]
            }
          } else {
            if (siteActive.includes(val)) {
              siteActive = []
            } else {
              siteActive = this.siteList.map(son => son.platform_mall_id)
            }
          }
        } else {
          let index = siteActive.findIndex(son => son === val)
          if (index > -1) {
            siteActive.splice(index, 1)
            if (siteActive.includes('')) {
              siteActive.splice(0, 1)
            }
          } else {
            siteActive.push(val)
            if (showName) {
              let showSiteId = this.siteShowList.filter(son => siteActive.includes(son.platform_mall_id))
              if (!siteActive.includes('') && this.siteShowList?.length === (showSiteId.length + 1)) {
                siteActive.unshift('')
              }
            } else {
              if (!siteActive.includes('') && this.siteList?.length === (siteActive.length + 1)) {
                siteActive.unshift('')
              }
            }
          }
        }
        this.siteId = siteActive
      } else {
        this.siteId = [val]
      }
      this.changeMallList()
    },
    changeMallList() {
      let mallList = []
      let searchAll = ''
      let site = this.siteId
      if (!this.isAShop) {
        this.site = this.siteList.filter(son => site.includes(son.platform_mall_id))
        if (site.length && site[0] === '') {
          site = site.slice(1)
          mallList = this.site.slice(1)
        } else {
          mallList = this.site
        }
        if (this.groupId.includes('') && site.length === this.siteList.length - 1) {
          searchAll = ''
        } else {
          searchAll = site.toString()
        }
      } else {
        site = site[0]
        const temp = this.siteList.find((i) => i.platform_mall_id === site)
        searchAll = site
        mallList.push(temp)
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
    // 搜索框功能
    searchInput() {
      this.searchSetTime && clearTimeout(this.searchSetTime)
      this.searchSetTime = null
      this.searchSetTime = setTimeout(() => {
        let selectList = this.siteList.filter(son => {
          let success = true
          if (this.searchSite && son.platform_mall_id) {
            let name = son.mall_alias_name || son.platform_mall_name
            success = name.includes(this.searchSite)
          }
          return success
        })
        this.siteShowList = selectList
        this.tableShow = false
        this.$nextTick(() => {
          this.tableShow = true
        })
      }, 500)
    },
    goTableShowTop() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
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

.el-select-dropdown {
  max-width: 180px;
}

.el-popover.el-popper {
  padding: 0;
}

.zz_mall_select_all {
  user-select: none;

  .cell.umy-table-beyond {
    padding: 0;
  }

  .el-table__body tr.el-table__row > td {
    padding: 0 !important;
    border: none;
    cursor: pointer;
  }

  .zz_mall_select_active {
    color: var(--themeColor);
    position: relative;

    &:after {
      position: absolute;
      right: 20px;
      font-family: element-icons;
      content: "\e6da";
      font-size: 12px;
      font-weight: 700;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  .zz_mall_select_item {
    padding-left: 20px;
    padding-right: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    line-height: 34px;
  }
}

.zz_mall_select_input {
  display: flex;
  align-items: center;
  border: 1px solid #DCDFE6;
  padding-left: 5px;
  border-radius: 5px;
  overflow: hidden;

  .el-input {
    border: none;
    flex: 1;
    padding: 0;

    .el-input__inner {
      border: none;
      padding: 0 0 0 5px;
    }
  }

  .el-tag.el-tag--info {
    padding: 0 5px;
    min-width: 30px;
    max-width: calc(100% - 70px) !important;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0s;
  }
}
</style>
<style scoped lang="less">
/deep/ .el-popover.el-popper {
  padding: 0;
}
</style>

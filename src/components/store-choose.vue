<template>
  <div>
    <ul class="storeChooseUL">
      <li>
        <span>站点：</span>
        <el-select v-model="countryVal" size="mini" filterable>
          <el-option v-if="isAll" label="全部" :value="''"/>
          <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
      </li>
      <li>
        <span>店铺分组：</span>
        <el-select v-model="groupId" placeholder="" multiple collapse-tags size="mini" filterable>
          <el-option label="全部" :value="''"/>
          <el-option v-for="(item, index) in groupIdList" :key="index" :label="item.group_name" :value="item.id"/>
        </el-select>
      </li>
      <li>
        <span>店铺：</span>
        <el-select v-model="site" placeholder="" multiple collapse-tags size="mini" filterable>
          <el-option label="全部" :value="''"/>
          <el-option v-for="(item, index) in siteList" :key="index" :label="item.platform_mall_name"
                     :value="item.platform_mall_id"/>
        </el-select>
      </li>
    </ul>
  </div>
</template>

<script>
  import { ddMallGoodsGetMallList } from '../module-api/mall-manager-api/mall-list-api'

  export default {
    name: 'store-choose',
    props: {
      isAll: {
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
        countries: [
          { label: '泰国站', value: 'TH' },
          { label: '马来站', value: 'MY' },
          { label: '台湾站', value: 'TW' },
          { label: '新加坡站', value: 'SG' },
          { label: '菲律宾站', value: 'PH' },
          { label: '越南站', value: 'VN' },
          { label: '印尼站', value: 'ID' },
          { label: '巴西站', value: 'BR' }
        ],
        groupId: [],
        groupIdList: [],
        site: [],
        siteList: []
      }
    },
    watch: {
      countryVal: {
        handler(val, oldVal) {
          this.isAllowSet2 = false
          this.groupId = []
          this.groupIdList = []
          this.ddMallGoodsGetMallList()
        },
        deep: true
      },
      groupId: {
        handler(val, oldVal) {
          if (this.isAllowSet2) {
            this.isAllowSet2 = false
            let isOldAll = oldVal.indexOf('') > -1
            let isAll = val.indexOf('') > -1
            if (isOldAll !== isAll) {
              if (isAll) {
                this.groupId = ['']
                this.groupIdList.forEach(item => {
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
              this.ddMallGoodsGetMallList()
            }, 10)
          }
        },
        deep: true
      },
      site: {
        handler(val, oldVal) {
          if(this.isAllowSet1){
            this.isAllowSet1 = false
            let isOldAll = oldVal.indexOf('') > -1
            let isAll = val.indexOf('') > -1
            if (isOldAll !== isAll) {
              if (isAll) {
                this.site = ['']
                this.siteList.forEach(item => {
                  this.site.push(item.platform_mall_id)
                })
              } else {
                this.site = []
              }
            }else if (isAll) {
              this.site = val.slice(1)
            } else if (this.siteList.length > 0 && this.siteList.length === this.site.length) {
              this.site.unshift('')
            }
            setTimeout(()=>{
              this.changeMallList()
              this.isAllowSet1 = true
            })
          }
        },
        deep: true
      }
    },
    mounted() {
      console.log(this.isAll)
      this.countryVal = !this.isAll && 'TH' || ''
    },
    methods: {
      async changeSelect(val) {
        console.log(val)
      },
      async ddMallGoodsGetMallList() {
        this.site = []
        let country = this.countryVal
        let groupId = this.groupId.indexOf('') > -1 && this.groupId.slice(1).toString() || this.groupId.toString()
        let param = {
          country: country,
          mallGroupIds: groupId
        }
        const res = await ddMallGoodsGetMallList(param)
        console.log('ddMallGoodsGetMallList - res', res)
        if (res.code === 200) {
          this.siteList = res.data
          if (this.groupIdList.length === 0) {
            this.groupId = ['']
            this.siteList.forEach(item => {
              if (item.group_name) {
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
        let mallList = []
        this.site.forEach(item => {
          if (item) {
            let temp = this.siteList.filter(i => i.platform_mall_id === item)
            mallList.push(temp[0])
          }
        })
        this.$emit('changeMallList', mallList)
      }
    }
  }
</script>

<style lang="less">
  .storeChooseUL {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

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
</style>

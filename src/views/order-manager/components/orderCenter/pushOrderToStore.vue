
<template>
  <div class="push-order">
    <p>温馨提示: 1:请务必确认当前订单对应店铺绑定的仓库是否正确</p>
    <p>温馨提示: 2:若店铺同时绑定了国内仓和海外仓,则通过采购平台区分(lazada和shopee默认为海外仓,其余默认国内仓,自有商品无法识别)</p>
    <p>温馨提示: 3:若店铺绑定的为自有仓库,请重新绑定仓库,否则无法将数据同步至仓库,将导致您的商品无法出库!!!</p>
    <el-table ref="muliTbale" :data="tableData" tooltip-effect="dark" style="width: 100%" height="500">
      <el-table-column min-width="80px" label="站点" prop="country" align="center">
        <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.country | chineseSite }}</template>
      </el-table-column>
      <el-table-column min-width="160px" label="店铺名称" prop="platform_mall_name" align="center">
        <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.mall_alias_name || scope.row.mall_info.platform_mall_name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="采购类型" min-width="120">
        <template slot-scope="scope">{{ scope.row.sourceName.join('/') }}</template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="仓库类型" min-width="120">
        <template slot-scope="scope" v-if="scope.row.sourceStoreType">{{ scope.row.sourceStoreType }}</template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="当前绑定仓库" min-width="120">
        <template slot-scope="scope" v-if="scope.row.sourceNameStr">{{ scope.row.sourceNameStr }}</template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="是否可同步" min-width="120">
        <template slot-scope="scope">{{ scope.row.sourceNameStr ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="主订单数" min-width="120">
        <template slot-scope="scope">{{ scope.row.orderIDs.length }}</template>
      </el-table-column>
      <el-table-column align="center" label="提示" width="150" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.warn }}</template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="chooseStore(scope.row, scope.$index)">选择仓库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn">
      <el-button size="mini" type="primary" @click="pushOrder">确 定</el-button>
    </div>
    <el-dialog title="选择仓库" :visible.sync="storeChooseVisible" width="400px" append-to-body v-if="storeChooseVisible">
      <div>
        <div class="item">
          <span>店铺名称:</span>
          <p>{{ chooseRow.mall_info.mall_alias_name || chooseRow.mall_info.platform_mall_name }}</p>
        </div>
        <div class="item">
          <span>系统仓库:</span>
          <el-select v-model="sysStore" size="mini" class="inputWidth">
            <el-option :label="item.warehouse_name" :value="item.warehouse_id" v-for="(item, index) in sysStoreList" :key="index"></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="addStore(activeIndex)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { goodsSourceList, sourceName } from './orderCenter'
export default {
  name: 'PushOrder',
  data() {
    return {
      goodsSourceList: goodsSourceList,
      storeChooseVisible: false,
      sysStore: '',
      mallName: '',
      sysStoreList: [],
      sysStoreListAll: [],
      tableData: [],
      activeIndex: -1,
    }
  },
  props: {
    chooseData: {
      type: Array,
      default: [],
    },
  },
  async mounted() {
    await this.getUserWarehouse()
    this.dealWithOrder(this.chooseData)
    console.log(this.tableData, ' this.tableData')
  },
  methods: {
    addStore(index) {
      this.tableData[index].storeId = this.sysStore
      this.storeChooseVisible = false
      console.log(this.tableData, 'this.tableData')
    },
    //推送订单
    async pushOrder() {
      for (let i = 0; i < this.tableData.length; i++) {
        let table = this.tableData[i]
        if (!table.storeId && !table.sourceNameStr) {
          this.$set(this.tableData[i], 'warn', `请先绑定${this.tableData[i].sourceStoreType}库`)
          continue
        } else {
          let paramsList = []
          table.orderIDs.forEach((item) => {
            let par = {
              sysOrderId: item,
              warehouseUserId: table.storeId || table.sourceWarehouseId,
            }
            paramsList.push(par)
          })
          if (paramsList.length) {
            let params = { lists: paramsList }
            let res = await this.$api.uploadWarehouseOrder(params)
            if (res.data.code === 200) {
              if (res.data.data.success.length) {
                this.$set(table, 'warn', res.data.data.success.join(','))
              }
              if (res.data.data.errors.length) {
                this.$set(this.tableData[i], 'warn', res.data.data.errors.join(','))
              }
            } else {
              this.$set(this.tableData[i], 'warn', res.data.message)
            }
            console.log(res, '00')
          }
        }
      }
      console.log(this.tableData, 'this.tableData')
    },
    dealWithOrder(arr) {
      let landArr = arr.filter((item) => {
        return [1, 2, 3, 5, 8, 10].indexOf(Number(item.goods_info.ori_platform_id)) > -1
      })
      let abroadArr = arr.filter((item) => {
        return [9, 11, 12, 15, 13].indexOf(Number(item.goods_info.ori_platform_id)) > -1
      })
      let landArrUnique = this.uniqueArr(landArr, '国内仓', 0)
      let abroadArrUnique = this.uniqueArr(abroadArr, '国外仓', 3)
      this.tableData = landArrUnique.concat(abroadArrUnique)
    },
    //去重
    uniqueArr(arr, typeName, type) {
      let map = new Map()
      for (let item of arr) {
        item.orderIDs = []
        item.sourceName = []
        item.sourceStoreType = typeName
        let filterStore = this.sysStoreListAll.find((store) => {
          return store.mall_info_ids.indexOf(item.mall_info.platform_mall_id) > -1 && store.type == type
        })
        item.sourceNameStr = filterStore && filterStore.warehouse_name
        item.sourceWarehouseId= filterStore && filterStore.warehouse_id
        if (!map.has(item.sys_mall_id)) {
          item.orderIDs.push(item.id)
          if (item.sourceName.indexOf(sourceName(item.goods_info.ori_platform_id)) == -1) {
            item.sourceName.push(sourceName(item.goods_info.ori_platform_id))
          }
          map.set(item.sys_mall_id, item)
        } else {
          let resF = map.get(item.sys_mall_id)
          resF.orderIDs.push(item.id)
          if (resF.sourceName.indexOf(sourceName(item.goods_info.ori_platform_id)) == -1) {
            resF.sourceName.push(sourceName(item.goods_info.ori_platform_id))
          }
        }
      }
      return [...map.values()]
    },
    async getUserWarehouse(row) {
      //   let res = await this.$configService.getWarehouseInfo(row.mall_info.platform_mall_id)
      //   let warehouseList = res && JSON.parse(res) || []
      //   this.sysStoreList = warehouseList.filter(item=>{
      //       return item.warehouse_status == 0
      //       return item.warehouse_status == 0
      //       return item.warehouse_status == 0
      //   })
      //   console.log(warehouseList,this.sysStoreList)
      let res = await this.$api.getUserWarehouse()
      if (res.data.code === 200) {
        this.sysStoreListAll = res.data.data.filter((item) => {
          return item.warehouse_status === 1 && item.mallInfo && item.mallInfo.length > 0
        })
      }
      this.sysStoreListAll.forEach((item) => {
        item.mall_info_ids = []
        item.mallInfo.forEach((subItem) => {
          item.mall_info_ids.push(subItem.platform_mall_id)
        })
      })
      console.log(res, 'store', this.sysStoreListAll)
    },
    chooseStore(row, index) {
      this.storeChooseVisible = true
      this.chooseRow = row
      this.sysStoreList = this.sysStoreListAll.filter((item) => {
        return item.mall_info_ids.indexOf(row.mall_info.platform_mall_id) > -1
      })
      this.sysStore = ''
      this.activeIndex = index
      console.log(this.sysStoreList, 'chooseStore')
      //   this.getUserWarehouse(row)
    },
    //商品来源中文信息
    changeTypeName(code, arr) {
      let res = arr.find((item) => {
        return item.value === code
      })
      return (res && res.label) || ''
    },
  },
}
</script>

<style lang="less" scoped>
.push-order {
  p {
    color: red;
    height: 26px;
  }
}
.inputWidth {
  width: 200px;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  span {
    display: inline-block;
    width: 80px;
    text-align: right;
    margin-right: 10px;
  }
}
.btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
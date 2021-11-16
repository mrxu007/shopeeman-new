<!--
 * @Author: your name
 * @Date: 2021-11-16 12:10:07
 * @LastEditTime: 2021-11-16 15:35:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\pushOrderToStore.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-11-16 11:42:09
 * @LastEditTime: 2021-11-16 12:09:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\purchaseInfo.vue
-->
<template>
  <div class="push-order">
    <p>温馨提示: 1:请务必确认当前订单对应店铺绑定的仓库是否正确</p>
    <p>温馨提示: 2:若店铺同时绑定了国内仓和海外仓,则通过采购平台区分(lazada和shopee默认为海外仓,其余默认国内仓,自有商品无法识别)</p>
    <p>温馨提示: 3:若店铺绑定的为自有仓库,请重新绑定仓库,否则无法将数据同步至仓库,将导致您的商品无法出库!!!</p>
    <el-table ref="muliTbale" :data="chooseData" tooltip-effect="dark" style="width: 100%" height="500">
      <el-table-column min-width="80px" label="站点" prop="country" align="center">
        <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.country }}</template>
      </el-table-column>
      <el-table-column min-width="120px" label="店铺名称" prop="platform_mall_name" align="center">
        <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.platform_mall_name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="采购类型" min-width="120">
        <template slot-scope="scope">{{ changeTypeName(scope.row.goods_info.ori_platform_id, goodsSourceList) }}</template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="当前绑定仓库" min-width="120">
        <template slot-scope="scope"></template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="是否可同步" min-width="120">
        <template slot-scope="scope"></template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="主订单数" min-width="120">
        <template slot-scope="scope"></template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="提示" min-width="120">
        <template slot-scope="scope"></template>
      </el-table-column>
      <el-table-column align="center" prop="ori_platform_id" label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="chooseStore(scope.row)">选择仓库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="选择仓库" :visible.sync="storeChooseVisible" width="400px" append-to-body>
      <div>
          <div class="item">
              <span>店铺名称:</span>
              <el-input v-model="mallName" size="mini" class="inputWidth"></el-input>
          </div>
           <div class="item">
              <span>系统仓库:</span>
               <el-select v-model="sysStore" size="mini" class="inputWidth">
               <el-option :label="item.label" :value="item.value" v-for="(item,index) in []" :key="index"></el-option>
        </el-select>
          </div>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { goodsSourceList } from './orderCenter'
export default {
  name: 'PushOrder',
  data() {
    return {
      goodsSourceList: goodsSourceList,
      storeChooseVisible:false,
      sysStore:'',
      mallName:''
    }
  },
  props: {
    chooseData: {
      type: Array,
      default: [],
    },
  },
  methods: {
    async pushOrderToStore(){
        
        this.$api.pushOrderToStore()
    },
    chooseStore(row){
        this.storeChooseVisible = true
        this.chooseRow = row
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
    p{
        color:red;
        height:26px;
    }
}
.inputWidth{
    width:200px;
}
.item{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom:20px;
    span{
        display:inline-block;
        width:80px;
        text-align: right;
        margin-right:10px;
    }
}
</style>
<!--
 * @Author: your name
 * @Date: 2021-11-18 15:59:48
 * @LastEditTime: 2021-11-18 20:22:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\OrderManagerStoreAdressSet.vue
-->
<template>
  <div class="store-address">
    <!-- tab区 -->
    <div class="tab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="国内仓设置" name="landStore">
          <div class="btn-tool">
            <el-button type="primary" size="mini" class="mar-right">添加国内自有仓库地址</el-button>
            <div class="warning-text activeColor">
              <p>温馨提示：1、绑定自有仓库时，订单信息将不会推送至对应站点的系统仓库，如使用软件合作物流，请申请绑定系统仓库！</p>
              <p>温馨提示：2、拍单平台为京喜时，收件人姓名只能由中文和字母组成，且在拍单时，软件不会自动增加买家姓名的拍单标识！</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="海外仓设置" name="abroadStore" >
            <div class="btn-tool">
            <el-button type="primary" size="mini" class="mar-right">添加国外自有仓库地址</el-button>
            <el-button type="primary" size="mini" class="mar-right">申请系统仓库地址</el-button>
            <div class="warning-text activeColor">
              <p>温馨提示：1、绑定自有仓库时，订单信息将不会推送至对应站点的系统仓库，如使用软件合作物流，请申请绑定系统仓库！</p>
              <p>温馨提示：2、拍单平台为lazada时，收件人姓名不能带有特殊字符，如下划线，加号等，且菲律宾站点不能带有#字符！</p>
              <p>温馨提示：3、收件人姓名请使用当地语言或拼音，尽量不使用中文！</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="content">
           <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        height="calc(100vh - 206px)"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column align="center" type="index" label="序号" min-width="50px" fixed/>
        <el-table-column min-width="120px" label="仓库" align="center" fixed prop="warehouse_name" />
        <el-table-column min-width="300px" label="地址" align="center" prop="detail_address" show-overflow-tooltip/>
        <el-table-column min-width="120px" label="收件人" align="center" prop="receiving_name"/>
        <el-table-column prop="type" label="仓库类型" align="center" min-width="140px">
          <template slot-scope="scope"> {{ warehouseType[scope.row.type] }} </template>
        </el-table-column>
        <el-table-column min-width="120px" label="联系电话" align="center" prop="receiving_tel"/>
        <el-table-column min-width="80px" label="邮编" align="center" prop="post_code"/>
        <el-table-column min-width="140px" label="是否使用自有手机号" align="center" >
             <template slot-scope="scope"> {{ scope.row.is_use_own_phone==="0"?'否':'是' }} </template>
        </el-table-column>
        <el-table-column min-width="140px" label="绑定店铺数量" align="center" >
                 <template slot-scope="scope"> {{ scope.row.mallInfo.length }} </template>
        </el-table-column>
        <el-table-column min-width="120px" label="对应站点" align="center" prop="country" >
              <template slot-scope="scope"> {{ scope.row.country | chineseSite }} </template>
        </el-table-column>
        <el-table-column min-width="120px" label="绑定的店铺" align="center" show-overflow-tooltip>
               <template slot-scope="scope"> {{ bindMallName(scope.row.mallInfo) }} </template>
        </el-table-column>
       <el-table-column prop="created_at" label="操作" align="center" min-width="200px">
          <template slot-scope="scope">  </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'landStore',
      tableData:[],
      tableDataAll:[],
      warehouseType:['国内中转仓','存储转运仓','海外存储仓','海外中转仓']
    }
  },
  mounted() {
    this.getUserWarehouse()
  },
  methods: {
    bindMallName(list){
        let name = ''
        list.forEach((item,index)=>{
            if(index === 0){
                name = item.platform_mall_name
            }else{
                name = name + ',' + item.platform_mall_name
            }
        })
        return name
    },
      //切换tab
    handleClick(){
        if(this.activeName === 'landStore'){
            this.tableData = this.tableDataAll.filter(item=>{return item.type === 0})
        }else{
            this.tableData = this.tableDataAll.filter(item=>{return item.type === 2 || item.type === 3})
        }
    },
    async getUserWarehouse() {
      let res = await this.$api.getUserWarehouse()
      if(res.data.code === 200){
          this.tableDataAll = res.data.data
          this.tableData = this.tableDataAll.filter(item=>{return item.type === 0})
      }
      console.log(res)
    },
  },
}
</script>

<style lang="less" scoped>
.store-address {
  margin: 10px;
  padding:16px;
  background: #fff;
}
.mar-right {
  margin-right: 10px;
}
.activeColor {
  color: red;
}
.btn-tool {
  display: flex;
  align-items:flex-start;
  margin-bottom:10px;
  .warning-text{
     p{
        height:26px;
     }
  }
}
.content{

}
</style>
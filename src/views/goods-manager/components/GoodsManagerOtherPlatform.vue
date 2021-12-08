<template>
  <div class="detail">
    <div class="condition" style="background-color: white;padding: 8px;">
      <!-- row1 -->
      <div class="row1" style="display: flex;">
        <storeChoose style="margin-left:-20px" :is-all="true" :show-mall-all="true" @changeMallList="changeMallList" />
        <el-checkbox v-model="showlog" style="margin: 4px">商品点赞</el-checkbox>
        <el-checkbox v-model="showlog" style="margin: 4px">评价点赞</el-checkbox>
        <el-checkbox v-model="showlog" style="margin: 4px">商品加入购物车</el-checkbox>
        <el-button size="mini" type="primary">开始</el-button>
        <el-button size="mini" type="primary">停止</el-button>
        <el-checkbox v-model="showlog" style="margin: 4px">隐藏日志</el-checkbox>
      </div>
      <!-- row2 -->
      <div class="row2" style="display:flex;margin-top:25px;">
        <div class="row2_left" style="border: 1px solid rgb(220, 228, 218);border-radius: 5px;">
          <span
            style="
          margin-top: -7px;
          display: block;
          margin-left: 14px;
          background-color: white;
          text-align: center;
          width: 110px;"
          >商品点赞/加购设置</span>
          <ul>
            <li>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞（加购）创建天数小于 <el-input v-model="unlikeCreateMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />的商品</div>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞（加购）销量小于 <el-input v-model="unlikeSaleMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />的商品</div>
            </li>
            <li>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞（加购）浏览数小于 <el-input v-model="unlikeViewMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px;" />的商品</div>
              <div style="margin-left:10px"><el-checkbox v-model="showlog" style="margin: 4px" />不点赞（加购）喜欢数小于 <el-input v-model="unlikeLikeMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />的商品</div>
            </li>
            <li>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />随机点赞数小于 <el-input v-model="RandomLikeMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />的商品</div>
            </li>
          </ul>
        </div>
        <div class="row2_right" style="border: 1px solid rgb(220, 228, 218);border-radius: 5px;margin-left:20px">
          <span
            style="
          margin-top: -7px;
          display: block;
          margin-left: 14px;
          background-color: white;
         text-align: center;
          width: 85px;"
          >评价点赞设置</span>
          <ul>
            <li>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞五星评价 </div>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞四星评价 </div>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞三星评价 </div>
            </li>
            <li>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞二星评价 </div>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞一星评价 </div>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞无内容评价 </div>
            </li>
            <li style="align-items: baseline;">
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞无图评价 </div>
              <div><el-checkbox v-model="showlog" style="margin: 4px" />不点赞 <el-input v-model="unlikeMonthAgoComment" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />天前的评价 </div>
            </li>
          </ul>
        </div>
      </div>
      <span style="color:red;display:block;margin:8px 0px">温馨提示：同一站点下，至少存在两个店铺以上才能进行操作</span>
    </div>
    <div class="tableDetail" style="margin-top: 8px;">
      <el-table
        :data="tableList"
        height="calc(100vh - 240px)"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <!-- <el-table-column type="selection" width="55" fixed /> -->
        <el-table-column prop="" label="店铺名称" align="center" min-width="150px" fixed />
        <el-table-column prop="" label="商品名称" align="center" min-width="150px" />
        <el-table-column prop="" label="商品编号" align="center" min-width="100px" />
        <el-table-column prop="" label="创建名称" align="center" min-width="100px" />
        <el-table-column prop="" label="历史销量" align="center" min-width="100px" />
        <el-table-column prop="" label="浏览数" align="center" min-width="100px" />
        <el-table-column prop="" label="点赞数" align="center" min-width="100px" />
        <el-table-column prop="" label="操作结果" align="center" min-width="100px" fixed="right" />
      </el-table>
    </div>
  </div>
</template>
<script>
import storeChoose from '../../../components/store-choose'
export default {
  components: {
    storeChoose
  },
  data() {
    return {
      // 商品点赞/加购设置
      showlog: '',
      unlikeCreateMinDay: '', // 不点赞创建天数小于
      unlikeSaleMinDay: '', // 不点赞销量小于
      unlikeViewMinDay: '', // 不点赞浏览数小于
      unlikeLikeMinDay: '', // 不点赞喜欢数小于
      RandomLikeMinDay: '', // 随机点赞/加购设置
      // 评价点赞设置
      unlikeMonthAgoComment: 30 // 不点赞30天前的评价
    }
  },
  methods: {
    // 店铺选择
    changeMallList(val) {}
  }
}
</script>
<style lang="less" scoped>
 .detail{
   min-width: 1200px;
   .row2_left{
     li{
       display: flex;
       margin: 8px;
       .el-input{
         margin-right: 4px;
       }
       div{
         margin-right: 20px;
       }
     }
   }
   .row2_right{
     li{
       display: flex;
       margin: 8px;
        .el-input{
         margin-right: 4px;
       }
       div{
         margin-right: 20px;
       }
     }
   }
 }
</style>

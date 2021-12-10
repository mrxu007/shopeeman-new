<template>
  <div class="detail">
    <div class="condition" style="background-color: white;padding: 8px;">
      <!-- row1 -->
      <div class="row1" style="display: flex;">
        <storeChoose style="margin-left:-20px" :is-all="true" :show-mall-all="true" @changeMallList="changeMallList" />
        <el-checkbox v-model="isgoodslike" style="margin: 4px">商品点赞</el-checkbox>
        <el-checkbox v-model="iscommentlike" style="margin: 4px">评价点赞</el-checkbox>
        <el-checkbox v-model="isbuy" style="margin: 4px">商品加入购物车</el-checkbox>
        <el-button size="mini" type="primary" @click="start">开始</el-button>
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
              <div><el-checkbox v-model="isunlikeCreateMinDay" style="margin: 4px" />不点赞（加购）创建天数小于 <el-input v-model="unlikeCreateMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />的商品</div>
              <div><el-checkbox v-model="isunlikeSaleMinDay" style="margin: 4px" />不点赞（加购）销量小于 <el-input v-model="unlikeSaleMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />的商品</div>
            </li>
            <li>
              <div><el-checkbox v-model="isunlikeViewMinDay" style="margin: 4px" />不点赞（加购）浏览数小于 <el-input v-model="unlikeViewMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px;" />的商品</div>
              <div style="margin-left:10px"><el-checkbox v-model="isunlikeLikeMinDay" style="margin: 4px" />不点赞（加购）喜欢数大于 <el-input v-model="unlikeLikeMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />的商品</div>
            </li>
            <li>
              <div><el-checkbox v-model="isRandomLikeMinDay" style="margin: 4px" />随机点赞（加购） <el-input v-model="RandomLikeMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />的商品</div>
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
              <div><el-checkbox v-model="isunlikestar5" style="margin: 4px" />不点赞五星评价 </div>
              <div><el-checkbox v-model="isunlikestar4" style="margin: 4px" />不点赞四星评价 </div>
              <div><el-checkbox v-model="isunlikestar3" style="margin: 4px" />不点赞三星评价 </div>
            </li>
            <li>
              <div><el-checkbox v-model="isunlikestar2" style="margin: 4px" />不点赞二星评价 </div>
              <div><el-checkbox v-model="isunlikestar1" style="margin: 4px" />不点赞一星评价 </div>
              <div><el-checkbox v-model="isunlikehaventContent" style="margin: 4px" />不点赞无内容评价 </div>
            </li>
            <li style="align-items: baseline;">
              <div><el-checkbox v-model="isunlikehaventPic" style="margin: 4px" />不点赞无图评价 </div>
              <div><el-checkbox v-model="isunlikeMonthAgoComment" style="margin: 4px" />不点赞 <el-input v-model="unlikeMonthAgoComment" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />天前的评价 </div>
            </li>
          </ul>
        </div>
      </div>
      <span style="color:red;display:block;margin:8px 0px">温馨提示：同一站点下，至少存在两个店铺以上才能进行操作</span>
    </div>
    <Logs ref="autoReplyLogs" v-model="showlog" clear />
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
import { batchOperation } from '../../../util/util'
import GoodsManagerAPI from '../../../module-api/goods-manager-api/goods-data'
export default {
  components: {
    storeChoose
  },
  data() {
    return {
      GoodsManagerAPIInstance: new GoodsManagerAPI(this),
      tableList: [],
      selectMall: [], // 所选店铺
      showlog: true,
      isgoodslike: false, // 商品点赞
      iscommentlike: false, // 评价点赞
      isbuy: false, // 商品加入购物车
      // 商品点赞/加购设置
      isunlikeCreateMinDay: false,
      unlikeCreateMinDay: '', // 不点赞创建天数小于
      isunlikeSaleMinDay: false,
      unlikeSaleMinDay: '', // 不点赞销量小于
      isunlikeViewMinDay: false,
      unlikeViewMinDay: '', // 不点赞浏览数小于
      isunlikeLikeMinDay: false,
      unlikeLikeMinDay: '', // 不点赞喜欢数小于
      isRandomLikeMinDay: false,
      RandomLikeMinDay: '', // 随机点赞/加购设置
      // 评价点赞设置
      isunlikestar1: false, // 不点赞一星
      isunlikestar2: false, // 不点赞二星
      isunlikestar3: false, // 不点赞三星
      isunlikestar4: false, // 不点赞四星
      isunlikestar5: false, // 不点赞五星
      isunlikehaventContent: false, // 不点赞无内容
      isunlikehaventPic: false, // 不点赞无图
      isunlikeMonthAgoComment: false,
      unlikeMonthAgoComment: 30 // 不点赞30天前的评价
    }
  },
  methods: {
    // 店铺选择
    changeMallList(val) {
      this.selectMall = val
    },
    // 获取所有商品信息
    async  start() {
      if (this.selectMall.length < 2) {
        this.$message.warning('统一站点下，请至少选择两个店铺')
        return
      }
      this.selectMall.forEach(el => {
        el.page = 1
      })
      // 1 获取所有商品数据
      // this.Mallskulist=[]   getMallsku()=>this.Mallskulist.push()
      this.Mallskulist = []
      this.$refs.autoReplyLogs.writeLog(`开始获取店铺信息`, true)
      const res1 = await batchOperation(this.selectMall, this.getMallsku)
      console.log('----mallskulist', this.Mallskulist)
      // 2 获取商品信息
      // this.goodsinfo = [] //所有商品详情信息
      // const res2 = await batchOperation(this.Mallskulist, this.getMallinfo)
      // console.log('---goodsinfo', this.goodsinfo)
      // ctime 创建时间
      // sold 历史销量
      // view_count 浏览数
      // liked_count 喜欢数
    },
    // 获取一个店铺的所有商品
    async  getMallsku(item, count = { count: 1 }) {
      try {
        const goodsinfo = {
          country: item.country,
          page_number: item.page,
          mallId: item.platform_mall_id,
          page_size: 48
        }
        debugger
        this.showlog = true
        const res = await this.GoodsManagerAPIInstance.getSkuList(goodsinfo)
        this.$refs.autoReplyLogs.writeLog(`查找【${item.mall_alias_name || item.platform_mall_name}】第${item.page}}页数据`, true)
        if (res.ecode === 0) {
          if (res.data.list?.length >= 48) {
            res.data.list.forEach(el => {
              el.shopid = item.platform_mall_id
              el.country = item.country
            })
            this.Mallskulist.push(...res.data.list)
            // 获取所有商品的详情信息
            this.goodsinfo = []
            this.$refs.autoReplyLogs.writeLog(`查找【${item.mall_alias_name || item.platform_mall_name}】第${item.page}}页数据`, true)
            const res2 = await batchOperation(res.data.list, this.getMallinfo)
            console.log(item.mall_alias_name || item.platform_mall_name + '---goodsinfo', this.goodsinfo)
            // 1.商品筛选 2.评价筛选 3.是否加入购物车
            item.page++
            this.getMallsku(item, count = { count: count.count++ })
          } else {

          }
        } else {
          console.log('goodsinfo-error', res.message)
          this.$refs.autoReplyLogs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】第${item.page}}页数据获取失败,${res.message}`, false)
        }
      } catch (error) {
        console.log(`${error}`)
        this.$refs.autoReplyLogs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】第${item.page}}页数据获取失败,${error}`, false)
      } finally {
        count.count--
      }
    },
    // 获取一个商品的所有信息
    async  getMallinfo(item, count = { count: 1 }) {
      try {
        const goodsinfo = {
          country: item.country,
          shopid: item.shopid,
          itemid: item.id
        }
        const res = await this.GoodsManagerAPIInstance.getGoodsDetailinfo(goodsinfo)
        if (res.ecode === 0) {
          this.goodsinfo.push(res.data)
        } else {
          console.log('---getMallinfo', res.message)
        }
      } catch (error) {
        console.log('---getMallinfo-catch', `${error}`)
      } finally {
        count.count--
      }
    }

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

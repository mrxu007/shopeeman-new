<template>
  <div class="detail">
    <div class="condition" style="background-color: white;padding: 8px;">
      <!-- row1 -->
      <div class="row1" style="display: flex;">
        <storeChoose style="margin-left:-20px" :is-all="true" :show-mall-all="true" @changeMallList="changeMallList" />
        <el-checkbox v-model="isgoodslike" style="margin: 4px">商品点赞</el-checkbox>
        <el-checkbox v-model="iscommentlike" style="margin: 4px">评价点赞</el-checkbox>
        <el-checkbox v-model="isbuy" style="margin: 4px">商品加入购物车</el-checkbox>
        <el-button size="mini" type="primary" :loading="btnloading" @click="start">开始</el-button>
        <el-button size="mini" type="primary" @click="stopFun">停止</el-button>
        <!-- <el-button size="mini" type="primary" @click="chekinfo">kkkkk</el-button> -->
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
              <div><el-checkbox v-model="isunlikeCreateMinDay" style="margin: 4px" />不点赞（加购）创建天数小于 <el-input v-model="unlikeCreateMinDay" clearable size="mini" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:100px" />的商品</div>
              <div><el-checkbox v-model="isunlikeSaleMin" style="margin: 4px" />不点赞（加购）销量小于 <el-input v-model="unlikeSaleMin" clearable size="mini" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:100px" />的商品</div>
            </li>
            <li>
              <div><el-checkbox v-model="isunlikeViewMinDay" style="margin: 4px" />不点赞（加购）浏览数小于 <el-input v-model="unlikeViewMinDay" clearable size="mini" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:100px;" />的商品</div>
              <div style="margin-left:10px"><el-checkbox v-model="isunlikeLikeMinDay" style="margin: 4px" />不点赞（加购）喜欢数小于 <el-input v-model="unlikeLikeMinDay" clearable size="mini" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:100px" />的商品</div>
            </li>
            <li>
              <div><el-checkbox v-model="isRandomLikeMinDay" style="margin: 4px" />随机点赞（加购） <el-input v-model="RandomLikeMinDay" clearable size="mini" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:100px" />个商品</div>
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
              <div><el-checkbox v-model="isunlikeMonthAgoComment" style="margin: 4px" />不点赞 <el-input v-model="unlikeMonthAgoComment" clearable size="mini" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:100px" />天前的评价 </div>
            </li>
          </ul>
        </div>
      </div>
      <span style="color:red;display:block;margin:8px 0px">温馨提示：同一站点下，至少存在两个店铺以上才能进行操作</span>
    </div>
    <Logs ref="autoReplyLogs" v-model="showlog" clear />
    <div class="tableDetail" style="margin-top: 8px;width:calc(100vw - 360px)">
      <u-table
        :row-style="{ height: '50px' }"
        :data="tableList"
        height="800px"
        width="600px"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <u-table-column type="index" width="55" label="序号" />
        <u-table-column prop="mallName" label="店铺名称" align="center" min-width="150px" />
        <u-table-column prop="name" label="商品名称" align="center" min-width="150px" show-overflow-tooltip />
        <u-table-column prop="itemid" label="商品编号" align="center" min-width="100px">
          <template v-slot="{row}">
            <el-button type="text" @click="open(row)">{{ row.itemid }}</el-button>
          </template>
        </u-table-column>
        <u-table-column prop="currenTime" label="创建时间" align="center" min-width="100px" />
        <u-table-column prop="historical_sold" label="历史销量" align="center" min-width="80px" />
        <u-table-column prop="cmt_count" label="浏览数" align="center" min-width="80px" />
        <u-table-column prop="liked_count" label="点赞数" align="center" min-width="80px" />
        <u-table-column prop="option_result" label="操作结果" align="center" min-width="100px">
          <template v-slot="{row}">
            <!-- <span v-if="row.option_result==='评论点赞成功' || row.option_result==='商品点赞成功' || row.option_result==='商品加购成功'" style="color:green">
              {{ row.option_result }}
            </span>
            <span v-else style="color:red">
              {{ row.option_result }}
            </span> -->

            <!-- 评价点赞 -->
            <div>
              <span v-if="row.option_result.iscommentLike==='评论点赞成功'" style="color:green">{{ row.option_result.iscommentLike }}</span>
              <span v-else style="color:red">{{ row.option_result.iscommentLike }}</span>
            </div>
            <!-- 商品点赞 -->
            <div>
              <span v-if="row.option_result.isgoodsLike==='商品点赞成功'" style="color:green">{{ row.option_result.isgoodsLike }}</span>
              <span v-else style="color:red">{{ row.option_result.isgoodsLike }}</span>
            </div>
            <!-- 加购 -->
            <div>
              <span v-if="row.option_result.isbuy==='商品加购成功'" style="color:green">{{ row.option_result.isbuy }}</span>
              <span v-else style="color:red">{{ row.option_result.isbuy }}</span>
            </div>
          </template>
        </u-table-column>
      </u-table>
    </div>
  </div>
</template>
<script>
import storeChoose from '../../../components/store-choose'
import { batchOperation, getMalls, GoodsMallgetValue, terminateThread } from '../../../util/util'
import GoodsManagerAPI from '../../../module-api/goods-manager-api/goods-data'
export default {
  components: {
    storeChoose
  },
  data() {
    return {
      addMax: '',
      btnloading: false,
      shopAccountList: [],
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
      isunlikeSaleMin: false,
      unlikeSaleMin: '', // 不点赞销量小于
      isunlikeViewMinDay: false,
      unlikeViewMinDay: '', // 不点赞浏览数小于
      isunlikeLikeMinDay: false,
      unlikeLikeMinDay: '', // 不点赞喜欢数小于
      isRandomLikeMinDay: false,
      RandomLikeMinDay: '', // 随机点赞/加购设置
      // 评价点赞设置
      isunlikestar1: true, // 不点赞一星
      isunlikestar2: true, // 不点赞二星
      isunlikestar3: true, // 不点赞三星
      isunlikestar4: false, // 不点赞四星
      isunlikestar5: false, // 不点赞五星
      isunlikehaventContent: false, // 不点赞无内容
      isunlikehaventPic: false, // 不点赞无图
      isunlikeMonthAgoComment: true,
      unlikeMonthAgoComment: 30 // 不点赞30天前的评价
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    // 跳转链接
    async open(val) {
      const country = this.selectMall.country
      const data = {
        mallId: val.shopid.toString()
      }
      const url = await this.$shopeemanService.getWebUrlLocal(country, data)
      this.$BaseUtilService.openUrl(`${url}/product/${val.shopid}/${val.itemid}`)
    },
    async getInfo() {
      getMalls().then(res => {
        this.shopAccountList = res
      })
    },
    // 停止
    stopFun() {
      terminateThread()
      this.btnloading = false
      this.$refs.autoReplyLogs.writeLog(`停止搜索`, true)
    },
    // 随机点赞
    randomLikegoods(val) {
      const randomList = []
      for (let i = 0; i < Number(val).length; i++) {
        const r = Math.floor(Math.random() * 48)
        randomList.push(r)
      }
      return randomList
    },
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
      if (!this.isgoodslike && !this.iscommentlike && !this.isbuy) {
        this.$message.warning('请选择要操作的选项')
        return false
      }
      this.$refs.autoReplyLogs.consoleMsg = ''
      // 点赞 加购 设置
      if (this.isgoodslike || this.isbuy) {
        // if (!this.isunlikeCreateMinDay &&
        //     !this.isunlikeSaleMin &&
        //     !this.isunlikeViewMinDay &&
        //     !this.isunlikeLikeMinDay &&
        //    !this.isRandomLikeMinDay) {
        //   this.$message.warning('请选择点赞设置')
        //   return
        // }
        // 不点赞（加购）创建天数小于
        if (this.isunlikeCreateMinDay && !this.unlikeCreateMinDay ||
          !this.isunlikeCreateMinDay && this.unlikeCreateMinDay) {
          this.$message.warning('请确保勾选项及内容正确')
          return
        }
        // 不点赞（加购）销量小于
        if (this.unlikeSaleMin && !this.isunlikeSaleMin ||
          !this.unlikeSaleMin && this.isunlikeSaleMin) {
          this.$message.warning('请确保勾选项及内容正确')
          return
        }
        // 不点赞（加购）浏览数小于
        if (this.isunlikeViewMinDay && !this.unlikeViewMinDay ||
        !this.isunlikeViewMinDay && this.unlikeViewMinDay) {
          this.$message.warning('请确保勾选项及内容正确')
          return
        }
        // 不点赞（加购）喜欢数小于
        if (this.isunlikeLikeMinDay && !this.unlikeLikeMinDay ||
        !this.isunlikeLikeMinDay && this.unlikeLikeMinDay) {
          this.$message.warning('请确保勾选项及内容正确')
          return
        }
      }
      // 评价设置
      if (this.iscommentlike) {
        if (!this.isunlikestar5 &&
           !this.isunlikestar4 &&
           !this.isunlikestar3 &&
           !this.isunlikestar2 &&
           !this.isunlikestar1 &&
           !this.isunlikehaventContent &&
           !this.isunlikehaventPic &&
           !this.isunlikeMonthAgoComment &&
           !this.unlikeMonthAgoComment) {
          this.$message.warning('请选择评价设置')
          return
        }
        if (!this.isunlikeMonthAgoComment && this.unlikeMonthAgoComment ||
        this.isunlikeMonthAgoComment && !this.unlikeMonthAgoComment) {
          this.$message.warning('请确保勾选项及内容正确')
          return
        }
      }
      this.selectMall.forEach(el => {
        el.page = 1
        el.goodslist = [] // 店铺里的商品数量
      })
      this.$refs.autoReplyLogs.writeLog(`开始获取店铺信息`, true)
      this.tableList = []
      this.btnloading = true
      await batchOperation(this.selectMall, this.getMallsku)
      this.btnloading = false
      // for (let i = 0; i < this.selectMall.length; i++) {
      //   await this.getMallsku(this.selectMall[i])
      // }
      this.$refs.autoReplyLogs.writeLog(`信息获取结束`, true)
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
        this.showlog = false
        const res = await this.GoodsManagerAPIInstance.getSkuList(goodsinfo)
        let array = res.ecode === 0 ? res.data.list : []
        const markeLike = []// 随机点赞，标记
        while (array.length) {
          console.log('markeLike', markeLike.length)
          array.forEach((el, index) => {
            el.shopid = item.platform_mall_id
            el.country = item.country
            el.cm_offset = 0// 评论初始页码

            // 随机点赞【顺序点赞】
            //
            if (this.isRandomLikeMinDay && this.RandomLikeMinDay) {
              el.randowLike = markeLike.length < Number(this.RandomLikeMinDay)
              markeLike.length < Number(this.RandomLikeMinDay) ? markeLike.push(el) : null
            }
          })
          await this.getgoodsdetail(array)
          if (array.length < 48) {
            array = []
          } else {
            goodsinfo.page_number++
            const res = await this.GoodsManagerAPIInstance.getSkuList(goodsinfo)
            array = res.ecode === 0 ? res.data.list : []
          }
        }
        this.$refs.autoReplyLogs.writeLog(`------【${item.mall_alias_name || item.platform_mall_name}】获取结束-----`, true)
      } catch (error) {
        this.$refs.autoReplyLogs.writeLog(`catch---【${item.mall_alias_name || item.platform_mall_name}】第${item.page}}页数据获取失败,${error}`, false)
      } finally {
        count.count--
      }
    },
    trantime(val) {
      const date = new Date(Number(val) * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-'
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const D = date.getDate() + ' '
      // const h = date.getHours() + ':'
      // const m = date.getMinutes() + ':'
      // const s = date.getSeconds()
      // return Y + M + D + h + m +
      return Y + M + D
    },
    async  chekinfo() {
      // const goodsinfo = {
      //   country: 'TH',
      //   shopid: '213693788',
      //   itemid: 14015158780
      // }
      const goodsinfo = {
        country: 'TH',
        shopid: '267731383',
        itemid: 7368998848,
        cmtid: 4965369836
      }
      // const goodsinfo = {
      //   country: 'TH',
      //   shopid: 333281690,
      //   itemid: 10413615014,
      //   offset: 0
      // }
      // // 获取所有的评论
      // const res = await this.GoodsManagerAPIInstance.addToCart(goodsinfo)
      // const res = await this.GoodsManagerAPIInstance.getRatings(goodsinfo)
      const res = await this.GoodsManagerAPIInstance.LikeItemRating(goodsinfo)

      if (res.ecode === 0) {
        const rate = res.data.ratings
        this.$refs.autoReplyLogs.writeLog(`总评论数【${res.data.item_rating_summary.rating_total}】获取第【${(item.cm_offset / 6) + 1}】页评论,一页51条`)
      }
      // const res = await this.GoodsManagerAPIInstance.GoodsbuyerLikePre(goodsinfo)
    },
    // 加购
    async addGoodsFun(goodsinfo, item, goods) {
      if (this.isbuy) {
        if (!this.btnloading) { return }
        // 不（加购）创建天数小于
        if (this.isunlikeCreateMinDay) {
          const curTime = Math.round(new Date().getTime() / 1000)
          if ((curTime - Number(goods.ctime)) / 3600 / 24 <= Number(this.unlikeCreateMinDay)) {
            return
          }
        }
        // 不（加购）销量小于
        if (this.isunlikeSaleMin) {
          if (Number(goods.historical_sold) <= Number(this.unlikeSaleMin)) {
            return
          }
        }
        // 不（加购）浏览数小于
        if (this.isunlikeViewMinDay) {
          if (Number(goods.cmt_count) <= Number(this.unlikeViewMinDay)) {
            return
          }
        }
        // 不（加购）喜欢数小于
        if (this.isunlikeLikeMinDay) {
          if (Number(goods.liked_count) <= Number(this.unlikeLikeMinDay)) {
            return
          }
        }
        // 随机（加购）
        if (this.isRandomLikeMinDay && !item.randowLike) {
          return
        }
        if (goods.models.length > 0) {
          for (let j = 0; j < goods.models.length; j++) {
            if (!this.btnloading) { return }
            if (goods.models[j].stock > 0) {
              const params = goodsinfo
              params.modelid = goods.models[j].modelid
              const sult3 = await this.addToCart(params)
              goods.option_result.isbuy = sult3 ? '商品加购成功' : '商品加购失败'
              if (this.addMax) {
                goods.option_result.isbuy = this.addMax
              }
              // 查重
              const des = this.tableList.findIndex(el => { return el === goods })
              if (des >= 0) {
                this.$set(goods, 'option_result', goods.option_result)
              } else {
                this.tableList.push(goods)
              }
              // this.$set(goods, 'option_result.isbuy', sult3 ? '商品加购成功' : '商品加购失败')
              return
            }
          }
        } else {
          return
        }
      }
    },
    // 评价点赞
    async commentFun(item, goods) {
      if (this.iscommentlike) {
        if (!this.btnloading) { return }
        this.$refs.autoReplyLogs.writeLog(`正在获取获取评论信息`)
        const sult1 = await this.getRatings(item)
        if (sult1) {
          this.$set(goods, 'liked_count', (goods.liked_count) + 1)
        }
        goods.option_result.iscommentLike = sult1 ? '评论点赞成功' : '评论点赞失败'
        // this.$set(goods, 'option_result', goods.option_result)
        // this.tableList.push(goods)
        // 查重
        const des = this.tableList.findIndex(el => { return el === goods })
        if (des >= 0) {
          this.$set(goods, 'option_result', goods.option_result)
        } else {
          this.tableList.push(goods)
        }
      }
    },
    // 商品点赞
    async goodsLikeFun(goodsinfo, item, goods) {
      if (this.isgoodslike) {
        if (!this.btnloading) { return }
        // 不点赞创建天数小于
        if (this.isunlikeCreateMinDay) {
          const curTime = Math.round(new Date().getTime() / 1000)
          if ((curTime - Number(goods.ctime)) / 3600 / 24 <= Number(this.unlikeCreateMinDay)) {
            return
          }
        }
        // 不点赞销量小于
        if (this.isunlikeSaleMin) {
          if (Number(goods.historical_sold) <= Number(this.unlikeSaleMin)) {
            return
          }
        }
        // 不点赞浏览数小于
        if (this.isunlikeViewMinDay) {
          if (Number(goods.cmt_count) <= Number(this.unlikeViewMinDay)) {
            return
          }
        }
        // 不点赞喜欢数小于
        if (this.isunlikeLikeMinDay) {
          if (Number(goods.liked_count) <= Number(this.unlikeLikeMinDay)) {
            return
          }
        }
        // 随机点赞
        if (this.isRandomLikeMinDay && !item.randowLike) {
          return
        }
        // 点赞
        if (!this.btnloading) { return }
        // 不能重复点赞
        if (goods.liked) {
          this.$refs.autoReplyLogs.writeLog(`【商品${goods.itemid}】不能重复点赞`, false)
          goods.option_result.isgoodsLike = '商品不能重复点赞'
          // 查重
          const des = this.tableList.findIndex(el => { return el === goods })
          if (des >= 0) {
            this.$set(goods, 'option_result', goods.option_result)
          } else {
            this.tableList.push(goods)
          }
          return
        }
        const sult2 = await this.GoodsbuyerLike(goodsinfo)
        goods.option_result.isgoodsLike = sult2 ? '商品点赞成功' : '商品点赞失败'
        this.$set(goods, 'option_result', goods.option_result)
        if (sult2) {
          this.$set(goods, 'liked_count', (goods.liked_count) + 1)
        }
      }
    },
    // 商品的详情信息
    // async  getDetailGoods(item) {
    //   try {
    //     this.getgoodsdetail(item)
    //   } catch (error) {
    //     console.log('---getMallinfo-catch', `${error}`)
    //   }
    // },
    // 加入购物车
    async addToCart(goodsinfo) {
      try {
      // const goodsinfo = {
      //   country: item.country,
      //   shopid: item.shopid,
      //   itemid: item.id,
      //   modelid: item.modelid
      // }
        if (!this.btnloading) { return }
        const res = await this.GoodsManagerAPIInstance.addToCart(goodsinfo)
        if (!this.btnloading) { return }
        // this.$refs.autoReplyLogs.writeLog(`【商品加购${goodsinfo.itemid}】测试,${JSON.stringify(res)}`, true)
        if (res.ecode === 0) {
          if (!this.btnloading) { return }
          this.$refs.autoReplyLogs.writeLog(`【商品加购${goodsinfo.itemid}】成功`, true)
          return true
        } else {
          if (!this.btnloading) { return }
          let message = ''
          if (res.message === 'This product has been suspended/deleted. You can buy other products.') {
            message = '此产品已被暂停/删除'
          }
          if (res.message === 'You already have 1 quantity in cart. Unable to add selected quantity to cart as it would exceed your purchase limit.') {
            message = '加购数量已达上限'
            this.addMax = '加购数量已达上限'
          }
          if (res.message === 'Sản phẩm này đã bị khóa/xóa. Vui lòng mua sản phẩm khác.') {
            message = '此产品已锁定并被删除'
          }
          this.$refs.autoReplyLogs.writeLog(`【商品加购${goodsinfo.itemid}】失败，${message || res.message}`, false)
          return false
        }
      } catch (error) {
        this.$refs.autoReplyLogs.writeLog(`catch--【商品点赞${goodsinfo.itemid}】失败`, false)
        console.log('---addToCart-catch', `${error}`)
        return false
      }
    },
    // 获取商品详情信息 && 相关筛选操作
    async getgoodsdetail(list) {
      // console.log(list)
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        const goodsinfo = {
          country: item.country,
          shopid: item.shopid,
          itemid: item.id
        }
        if (!this.btnloading) { return }
        this.$refs.autoReplyLogs.writeLog(`正在获取商品详情`)
        try {
          const res = await this.GoodsManagerAPIInstance.getGoodsDetailinfo(goodsinfo)
          if (res.ecode === 0) {
            if (!this.btnloading) { return }
            this.$refs.autoReplyLogs.writeLog(`商品【${item.id}】详情获取成功`)
            const goods = res.data
            goods.currenTime = await this.trantime(goods.ctime)
            goods.mallName = GoodsMallgetValue(this.shopAccountList, 'label', 'value', goods.shopid)
            goods.option_result = {
              iscommentLike: '',
              isgoodsLike: '',
              isbuy: ''
            }
            // this.tableList.push(goods)
            // 加购
            this.addGoodsFun(goodsinfo, item, goods)
            // 评价筛选
            this.commentFun(item, goods)
            // 点赞
            this.goodsLikeFun(goodsinfo, item, goods)
          } else {
            if (!this.btnloading) { return null }
            this.$refs.autoReplyLogs.writeLog(`商品【${item.id}】详情获取失败,${JSON.stringify(res.message)}`, false)
          }
        } catch (error) {
          console.log(error)
          this.$refs.autoReplyLogs.writeLog(`catch--商品【${item.id}】详情获取失败,${error}`, false)
        }
      }
      console.log('----', this.tableList)
    },
    // aa() {
    //   console.log('aaaaaa')
    //   debugger
    // },
    // 评价点赞
    async LikeItemRatingFun(item) {
      try {
        const goodsinfo = {
          country: item.country,
          shopid: Number(item.shopid),
          itemid: Number(item.itemid),
          cmtid: Number(item.cmtid),
          like: true
        }
        if (!this.btnloading) { return }
        const res = await this.GoodsManagerAPIInstance.LikeItemRating(goodsinfo)
        // this.$refs.autoReplyLogs.writeLog(`【商品评论点赞${item.itemid}】测试,${JSON.stringify(res)}`, true)
        if (res.ecode === 0) {
          if (!this.btnloading) { return }
          this.$refs.autoReplyLogs.writeLog(`【商品评论点赞${item.itemid}】成功`, true)
          return true
        } else {
          if (!this.btnloading) { return }
          this.$refs.autoReplyLogs.writeLog(`【商品评论点赞${item.itemid}】失败，${JSON.stringify(res.message)}`, false)
          return false
        }
      } catch (error) {
        this.$refs.autoReplyLogs.writeLog(`catch--【商品评论点赞${item.itemid}】失败,${error}`, true)
        return false
      }
    },
    // 获取商品所有评价 && 相关筛选操作
    async getRatings(item) {
      try {
        const goodsinfo = {
          country: item.country,
          shopid: item.shopid,
          itemid: item.id,
          offset: item.cm_offset
        }
        // 获取所有的评论
        if (!this.btnloading) { return }
        const res = await this.GoodsManagerAPIInstance.getRatings(goodsinfo)
        if (res.ecode === 0) {
          if (!this.btnloading) { return }
          if (res.data.ratings.length === 0) {
            this.$refs.autoReplyLogs.writeLog(`【${goodsinfo.itemid}】暂无任何评论,点赞失败`, false)
            return
          }
          const rate = res.data.ratings
          this.$refs.autoReplyLogs.writeLog(`【${goodsinfo.itemid}】总评论数【${res.data.item_rating_summary.rating_total}】获取第【${(item.cm_offset / 51) + 1}】页评论,一页51条`)
          for (let i = 0; i < rate.length; i++) {
            if (!this.btnloading) { return }
            if (rate[i].liked) {
              this.$refs.autoReplyLogs.writeLog(`【${rate[i].cmtid}不可重复点赞】`, false)
              continue
            }
            // 不点赞五星评价
            if (this.isunlikestar5 && Number(rate[i].rating_star) === 5) {
              continue
            }
            // 不点赞四星评价
            if (this.isunlikestar4 && Number(rate[i].rating_star) === 4) {
              continue
            }
            // 不点赞三星评价
            if (this.isunlikestar3 && Number(rate[i].rating_star) === 3) {
              continue
            }
            // 不点赞二星评价
            if (this.isunlikestar2 && Number(rate[i].rating_star) === 2) {
              continue
            }
            // 不点赞一星评价
            if (this.isunlikestar1 && Number(rate[i].rating_star) === 1) {
              continue
            }
            // 不点赞无内容评价
            if (this.isunlikehaventContent && rate[i].comment) {
              continue
            }
            // 不点赞无图评价
            if (this.isunlikehaventPic && !rate[i].images?.length) {
              continue
            }
            // 不点赞**天前评论
            if (this.isunlikeMonthAgoComment) {
              const curTimelastMonth = Math.round(new Date().getTime() / 1000) - (3600 * 24 * Number(this.unlikeMonthAgoComment))
              if (Number(rate[i].mtime) - curTimelastMonth > 0) {
                continue
              }
            }
            const params = {
              country: item.country,
              shopid: item.shopid,
              itemid: item.id,
              cmtid: rate[i].cmtid
            }
            const fes = await this.LikeItemRatingFun(params)// 评论点赞
            return fes
          }
          if (res.data.ratings.length >= 51) { // limit=51
            item.cm_offset = item.cm_offset + 51
            if (this.btnloading) {
              this.getRatings(item)
            }
          } else {
            return
          }
        } else {
          if (!this.btnloading) { return }
          this.$refs.autoReplyLogs.writeLog(`【${goodsinfo.itemid}】评论信息，获取失败${JSON.stringify(res.message)}`, false)
        }
      } catch (error) {
        this.$refs.autoReplyLogs.writeLog(`catch--【${item.id}】评论信息，获取失败${error}`, false)
      }
    },
    // 商品点赞
    async GoodsbuyerLike(goodsinfo) {
      try {
        if (!this.btnloading) { return }
        const res = await this.GoodsManagerAPIInstance.GoodsbuyerLike(goodsinfo)
        const aa = JSON.stringify(res)
        // this.$refs.autoReplyLogs.writeLog(`【商品点赞${goodsinfo.itemid}】测试`, true)
        if (res.ecode === 0) {
          if (!this.btnloading) { return }
          this.$refs.autoReplyLogs.writeLog(`【商品点赞${goodsinfo.itemid}】成功`, true)
          return true
        } else {
          if (!this.btnloading) { return }
          this.$refs.autoReplyLogs.writeLog(`【商品点赞${goodsinfo.itemid}】失败,${JSON.stringify(res.message)}`, false)
          return false
        }
      } catch (error) {
        this.$refs.autoReplyLogs.writeLog(`catch--【商品点赞${goodsinfo.itemid}】失败,${error}`, false)
        return false
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

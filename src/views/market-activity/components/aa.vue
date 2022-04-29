<template>
  <div class="detail">
    <ul>
      <!-- row1 -->
      <li>
        <storeChoose style="margin-left:-2px" @changeMallList="changeMallList" />
        <el-button type="primary" size="mini" @click="clearLog">清除日志</el-button>
        <el-button type="primary" size="mini" @click="setQurey">参数设置</el-button>
        <el-button @click="test">aa</el-button>
        <el-checkbox v-model="showlog" style="margin-top:5px;margin-left:5px">隐藏日志</el-checkbox>
      </li>
      <!-- row2 -->
      <span class="Follow">关注用户</span>
      <span class="cancerFollow">取关用户</span>
      <li class="row2">
        <el-row :gutter="25">
          <el-col :span="15">
            <ul>
              <!-- row2.1 -->
              <li style="align-items: center;margin-bottom: 5px;">
                <label style="width: 128px;">店铺ID信息：</label>
                <el-input v-model="mallIDinfo" type="textarea" resize="none" :rows="3" placeholder="请输入内容" />
                <div>
                  <el-button type="primary" size="mini" style="margin-left: 10px;margin-bottom: 5px;" @click="addCancerMall">添加关注店铺</el-button>
                  <el-button type="primary" size="mini">清空店铺信息</el-button>
                </div>
              </li>
              <!-- row2.2 -->
              <li style="margin-left: 80px;">
                <el-button type="primary" size="mini" @click="startCancer">开始关注</el-button>
                <el-button type="primary" size="mini" @click="stopSet">取消操作</el-button>
              </li>
            </ul>
          </el-col>
          <el-col :span="9"><div class="grid-content bg-purple" />
            <ul>
              <!-- row2.1 -->
              <li>
                <el-button type="primary" size="mini" style="width:105px" @click="Unfollower(1)">开始取关</el-button>
                <el-button type="primary" size="mini">取消操作</el-button>
              </li>
              <!-- row2.2 -->
              <li>
                <el-button type="primary" size="mini" @click="Unfollower(0)">取关所有用户</el-button>
                <el-button type="primary" size="mini">取关未关注我的用户</el-button>
              </li>
              <li style="height:30px" />
            </ul>
          </el-col>
        </el-row>
      </li>
      <!-- row3 -->
      <li style="color:red">温馨提示：关注用户或者取关啊用户后，获取到的关注用户量和粉丝量可能不准确，有缓存（shopee官网缓存），请稍后查看。</li>
      <!-- row4 -->
      <li>
        <el-table
          :header-cell-style="{ background: '#f7fafa' }"
          :data="tableList"
          :row-style="{ height: '50px' }"
          height="calc(100vh - 220px)"
        >
          <el-table-column type="index" label="序列号" min-width="100px" align="center" />
          <el-table-column prop="" label="站点" min-width="150px" align="center">
            <template v-slot="{row}">{{ row.country | chineseSite }}</template>
          </el-table-column>
          <el-table-column prop="" label="店铺名" min-width="150px" align="center">
            <template v-slot="{row}">{{ row.mall_alias_name || row.platform_mall_name }}</template>
          </el-table-column>
          <el-table-column prop="following" label="关注中" min-width="150px" align="center" />
          <el-table-column prop="fence" label="粉丝" min-width="150px" align="center" />
          <el-table-column prop="newFollow" label="新增关注数量" min-width="150px" align="center" />
          <el-table-column prop="cancerFollow" label="取关数量" min-width="150px" align="center" />
          <el-table-column prop="state" label="操作状态" min-width="150px" align="center" />
        </el-table>
      </li>
    </ul>
    <el-dialog
      title="店铺搜索"
      :visible.sync="dialog_mallSearch"
      width="950px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog_mall"
    >
      <ul>
        <!-- row1 -->
        <li>
          <label>关键词</label>
          <el-input v-model="keyword" size="mini" style="width:100px" clearable />
          <label>评论数</label>
          <el-input v-model="minComment" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:80px" size="mini" />-
          <el-input v-model="maxComment" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:80px" size="mini" />
          <label>点赞数</label>
          <el-input v-model="minLike" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:80px" size="mini" />-
          <el-input v-model="maxLike" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:80px" size="mini" />
        </li>
        <!-- row3 -->
        <li>
          <label>评分数</label>
          <el-input v-model="minScore" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:80px" size="mini" />-
          <el-input v-model="maxScore" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:80px" size="mini" />
          <label style="margin-left:50px">店铺数</label>
          <el-input v-model="mallNum" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:80px" size="mini" />
          <el-button type="primary" size="mini" style="margin-left:30px" @click="searchMall">搜索</el-button>
          <el-button type="primary" size="mini" @click="addTargetMall">添加勾选店铺</el-button>
        </li>
        <!-- row2 -->
        <li>
          <el-table
            :header-cell-style="{ background: '#f7fafa' }"
            :data="mallSearchList"
            :row-style="{ height: '50px' }"
            max-height="400"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" width="55" type="selection" />
            <el-table-column align="center" label="序号" width="55" type="index" />
            <el-table-column prop="shopid" label="店铺ID" min-width="100px" align="center" />
            <el-table-column prop="name" label="产品标题" min-width="150px" align="center" show-overflow-tooltip />
            <el-table-column prop="" label="主图" min-width="100px" align="center" fixed="right">
              <template v-slot="{row}">
                <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 50px; height: 50px; display: inline-block">
                  <div slot="content">
                    <el-image :src="[row.image] | imageRender" style="width: 400px; height: 400px" />
                  </div>
                  <el-image :src="[row.image, true] | imageRender" style="width: 50px; height: 50px" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="liked_count" label="点赞数" min-width="100px" align="center" fixed="right" />
            <el-table-column prop="totalRate" label="评论数" min-width="100px" align="center" fixed="right" />
            <el-table-column prop="rating_star" label="产品评分" min-width="100px" align="center" fixed="right">
              <template v-slot="{row}">{{ row.item_rating.rating_star.toFixed(2) }}</template>
            </el-table-column>
            <el-table-column prop="" label="操作" min-width="200px" align="center" fixed="right">
              <template v-slot="{row}">
                <el-button type="primary" size="mini" @click="open(row)">查看产品</el-button>
                <el-button type="primary" size="mini">添加店铺</el-button>
              </template>
            </el-table-column>
          </el-table>
        </li>

      </ul>
    </el-dialog>
    <!-- 用户设置 -->
    <el-dialog
      title="用户设置"
      :visible.sync="dialog_userInfo"
      width="700px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog_mall"
    >
      <autoFollow :user-info="userInfo" :mall="selmallList" @isSave="setSave" />
    </el-dialog>
    <Logs ref="Logs" v-model="showlog" clear />
  </div>
</template>

<script>
import StoreChoose from '../../../components/store-choose'
import autoFollow from '@/views/user-config/autoFollow.vue'
import MallManagerAPI from '@/module-api/market-activity-api/ai-addFence'
import { batchOperation, sleep } from '@/util/util'
import { AutoAddFence } from '@/views/order-manager/components/orderCenter/powderFence'
export default {
  name: 'BusinessAnalyseGoodsDiscount',
  components: {
    StoreChoose,
    autoFollow
  },
  data() {
    return {
      AutoAddFenceInstance: new AutoAddFence(this),
      MallAPIInstance: new MallManagerAPI(this),
      selmallList: [],
      // 参数设置
      isSave: false, // 是否保存
      // 弹窗--用户设置
      dialog_userInfo: false,
      userInfo: '',

      mallIDinfo: '', // 店铺ID信息
      showlog: false,
      tableList: [], // 表格
      // 弹窗-店铺搜索
      dialog_mallSearch: false, // 弹窗
      keyword: '裤子', // 关键词
      minComment: '50', // 评论数
      maxComment: '5000',
      minLike: '100', // 点赞数
      maxLike: '10000',
      minScore: '4.5', // 评分数
      maxScore: '5',
      mallNum: '1', // 店铺数
      mallSearchList: [], // 弹窗列表
      sel_mallSearchList: [], // 多选店铺
      isStop: false // 取消操作
    }
  },
  watch: {
    selmallList: {
      handler(newVal) {
        this.tableList = []
        if (newVal.length) { // 获取所有店铺
          newVal.forEach(el => {
            const obj = { ...el }
            obj['following'] = 0
            obj['fence'] = 0
            obj['newFollow'] = 0
            obj['cancerFollow'] = 0
            obj['state'] = '-'
            this.tableList.push(obj)
          })
        }
      },
      deep: true
    }
  },
  created() {
    this.getUserinfo() // 获取用户设置数据
  },
  methods: {
    // 取关未关注我的用户
    async canCerFollowUnFollowMe() {
      if (!this.tableList.length) {
        this.$message.warning('请选择要操作的数据')
        return
      }
      this.$refs.Logs.writeLog(`正在执行数据.....`, true)
      for (const mall of this.tableList) {
        this.$refs.Logs.writeLog(`当前操作店铺：【${mall.mall_alias_name || mall.platform_mall_name}】`, true)
        // 判断HOME店铺未登录（方法里已打印了日志）
        const islogin = await this.isLogin(mall)
        if (!islogin) {
          continue
        }
        // 获取我的关注
        const resMall = await this.getHomeMallData(mall)
        if (!resMall) {
          this.$refs.Logs.writeLog(`店铺暂无数据`)
          continue
        }
        const allhomeFollowringList = await this.getHomeFollowingList(mall, resMall.follower_count)
        this.$refs.Logs.writeLog(`店铺关注用户【${allhomeFollowringList.length}】个`, true)
        // 我的粉丝
        const params = {}
        params['country'] = mall.country
        params['mallId'] = mall.platform_mall_id
        params['shopid'] = mall.platform_mall_id
        let shopDatas = await this.GetShopLikes(params) // 获取粉丝信息
        let ALLshopDatas = shopDatas
        while (shopDatas.length === 20) {
          params['offset'] += 20
          this.$refs.Logs.writeLog(`店铺第【${(params.offset / 20) + 1}】页粉丝获取`, true)
          shopDatas = await this.GetShopLikes(params)
          ALLshopDatas = ALLshopDatas.concat(shopDatas)
        }
        this.$refs.Logs.writeLog(`店铺粉丝获取结束`, true)
        // 筛选关注
        let canCerFollowN = 0
        for (const homeFollow of allhomeFollowringList) {
          const isFollow = ALLshopDatas.indexOf(el => { return Number(el.userid) === Number(homeFollow.userid) })
          if (isFollow < 0) {
            // 取关
            const isFollow = await this.runCancerAttention(homeFollow, mall, mall.platform_mall_id)
            if (isFollow) {
              canCerFollowN++
            }
          }
        }
        this.$refs.Logs.writeLog(`成功取关【${canCerFollowN}】个用户`, true)
        this.$refs.Logs.writeLog(`店铺执行结束`, true)
      }
      this.$refs.Logs.writeLog(`数据执行结束`, true)
    },
    stopSet() {
      this.isStop = true
      this.$refs.Logs.writeLog(`正在取消操作`)
    },
    // 判断用户是否登录
    async isLogin(mall) {
      const res = await this.MallAPIInstance.isLogin(mall)
      if (res.code === 200 && res.data) {
        return true
      } else {
        this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺未登录`, false)
        return false
      }
    },
    // 取关
    async Unfollower(type) {
      if (!this.tableList.length) {
        this.$message.warning('请选择要操作的店铺')
        return
      }
      this.tableList.forEach(el => {
        const obj = { ...el }
        obj['following'] = 0
        obj['fence'] = 0
        obj['newFollow'] = 0
        obj['cancerFollow'] = 0
        obj['state'] = '-'
      })
      await batchOperation(this.tableList, this.UnfollowerFun)
    },
    async UnfollowerFun(mall, count = { count: 1 }) {
      try {
        // 判断店铺未登录
        const islogin = await this.isLogin(mall)
        if (!islogin) {
          return
        }
        // 获取店铺粉丝数据
        const resMall = await this.getHomeMallData(mall)
        this.$set(mall, 'following', resMall ? resMall.account.following_count : 0)
        this.$set(mall, 'fence', resMall ? resMall.follower_count : 0)
        if (!resMall) {
        // 打印该店铺暂无粉丝
          this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺暂无粉丝`)
          return
        }
        let shopDatas = []
        let flag = true

        // 获取第一页店铺粉丝
        const params = {}
        params['country'] = mall.country
        params['mallId'] = mall.platform_mall_id
        params['offset'] = 0
        let totalMallFollow = 0
        let ALLshopDatas = await this.getHomeFllowering(params) // 获取粉丝信息

        console.log('217', ALLshopDatas)
        // 获取粉丝详情过滤
        shopDatas = await this.filterShopDatas(ALLshopDatas, mall.country, mall.platform_mall_id) // 筛选活跃粉丝
        for (const shop of shopDatas) {
          // 开始取关
          const isFollow = await this.runCancerAttention(shop, mall, mall.platform_mall_id) // 开始关注
          if (isFollow) {
            totalMallFollow++
          }
          if (Number(this.userInfo.auto_attention_set.CancelFollowNumber)) { // 有数量限制取关
            if (totalMallFollow >= Number(this.userInfo.auto_attention_set.FollowNumber)) {
              flag = false
              break
            }
          }
        }
        // 取关更多粉丝
        while (flag) {
          params['offset'] += 20
          ALLshopDatas = await this.getHomeFllowering(params)
          shopDatas = await this.filterShopDatas(ALLshopDatas, mall.country, mall.platform_mall_id)
          for (let index = 0; index < shopDatas.length; index++) {
            const shop = shopDatas[index]
            // 开始取关
            const isFollow = await this.runCancerAttention(shop, mall, mall.platform_mall_id)
            if (isFollow) {
              totalMallFollow++
            }
            if (Number(this.userInfo.auto_attention_set.FollowNumber) && type === 1) { // 有数量限制关注
              if (totalMallFollow >= Number(this.userInfo.auto_attention_set.FollowNumber)) {
                flag = false
                break
              }
            } else { // 取关所有
              if (!isFollow || totalMallFollow === Number(resMall.account.following_count)) {
                flag = false
                break
              }
            }
          }
          if (ALLshopDatas.length < 20) {
            flag = false
          }
        }
      } catch (error) {
        console.log(`318-${error}`)
      } finally {
        --count.count
      }
    },
    // 获取HOME店铺数据
    async getHomeMallData(mall) {
      const params = {}
      params['country'] = mall.country
      params['mallId'] = mall.platform_mall_id
      const resUser = await this.MallAPIInstance.UserProfile(params) // 获取userName
      if (resUser.code === 200) {
        const userName = resUser.data.username
        params['username'] = userName
        const resMall = await this.MallAPIInstance.getHomeMallinfo(params)
        if (resMall.code === 200) {
          return resMall.data
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    // 获取HOME店铺数据
    async getHomeFllowering(item) {
      const params = {}
      params['country'] = item.country
      params['mallId'] = item.mallId

      params['offset'] = item.offset
      params['limit'] = 20
      params['offset_of_offset'] = 0
      params['timeStamp'] = new Date().getTime()
      const res = await this.MallAPIInstance.getFllowering(params)
      if (res.code === 200) {
        this.$refs.Logs.writeLog(`第【${(item.offset / 20) + 1}】页获取成功`, true)
        return res.data
      } else {
        this.$refs.Logs.writeLog(`获取失败，${res.message}`, false)
        return []
      }
    },
    // 跳转链接
    async open(val) {
      const country = this.tableList[0].country
      const data = {
        mallId: val.shopid.toString()
      }
      const url = await this.$shopeemanService.getWebUrlLocal(country, data)
      this.$BaseUtilService.openUrl(`${url}/product/${val.shopid}/${val.itemid}`)
    },
    async test() {
      const params = {}
      // 获取店铺粉丝
      // params['offset'] = 20
      // params['limit'] = 20
      // params['offset_of_offset'] = 0
      // params['timeStamp'] = new Date().getTime()
      this.AutoAddFenceInstance.autoAddFenceActive()
      // 关注
      // params['country'] = 'MY'
      // params['mallId'] = '268048262'
      // params['userShopid'] = '29058527'
      // // params['ShopId'] = '239487269'
      // params['followMallID'] = '239487269'
      // const res = await this.MallAPIInstance.buyerFollow(params)

      // 获取userName
      // const resUser = await this.MallAPIInstance.UserProfile(params) // 获取userName
      // if (resUser.code === 200) {
      //   const userName = resUser.data.username
      //   params['username'] = userName
      //   const resMall = await this.MallAPIInstance.getHomeMallinfo(params)
      //   console.log('249', resMall)
      // } else {
      //   return ''
      // }
      // const res = await this.MallAPIInstance.isLogin(params)
    },
    // 添加关注店铺--弹窗
    addCancerMall() {
      if (!this.tableList.length) {
        this.$message.warning('请先设置参数')
        return
      }
      this.dialog_mallSearch = true
    },
    // 添加关注店铺--搜素店铺接口
    async searchMallInstance(item) {
      const params = {}
      params['country'] = item.country
      params['mallId'] = item.mallId

      params['by'] = 'relevancy'
      params['keyword'] = this.keyword
      params['limit'] = 60
      params['newest'] = item.newest
      params['order'] = 'desc'
      params['page_type'] = 'search'
      console.log('479', this.userInfo)
      params['rating_filter'] = this.userInfo.auto_attention_set.MinOrderEvaluation// 评分
      try {
        const res = await this.MallAPIInstance.addCancerMall(params)
        if (res.status === 200) {
          return JSON.parse(res.data).items
        } else {
          this.$refs.Logs.writeLog(`店铺搜索请求失败,230-line:${res.status || '请求超时'}`, false)
          return []
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`店铺搜索请求失败,234-line:${error}`, false)
        return []
      }
    },
    // 添加关注店铺--店铺条件过滤
    async  filterList(goodsMalllist) {
      let getList = []
      const map = new Map()
      goodsMalllist.forEach(el => { // 去重
        if (!map.has(el.item_basic.itemid) && !map.has(el.item_basic.shopid)) {
          map.set(el.itemid, el)
        }
      })
      getList = [...map.values()]
      const getList2 = getList.filter(el => { // 条件过滤
        let flag = null
        const totalRate = el.item_basic.item_rating.rating_count.reduce(function(prev, curr, idx, arr) {
          return prev + curr
        }) // 评论总数求和
        if (Number(el.item_basic.liked_count) >= Number(this.minLike) && Number(el.item_basic.liked_count) <= Number(this.maxLike) && // 点赞
             (el.item_basic.item_rating.rating_star).toFixed(2) >= Number(this.minScore) && el.item_basic.item_rating.rating_star.toFixed(2) <= Number(this.maxScore) && // 评分
            totalRate >= Number(this.minComment) && totalRate <= Number(this.maxComment) && // 评论
            el.item_basic.stock >= Number(this.userInfo.auto_attention_set.ProductMax) // 库存
        ) {
          flag = true
        } else {
          flag = false
        }
        if (flag) {
          return el
        }
      })
      return getList2
    },
    // 添加关注店铺--搜素店铺
    async searchMall(mall) {
      console.log(this.userInfo)
      if (!this.keyword) {
        this.$message.warning('请输入关键字')
        return
      }
      this.showlog = false
      this.$refs.Logs.writeLog(`正在获取店铺信息......`, true)
      const maxPage = Number(this.mallNum) // 搜索店铺数
      if (maxPage >= 0) {
        let AllgoodsMalllist = []
        // 查询店铺
        for (let i = 0; i < maxPage; i++) {
          const params = {}
          params['country'] = this.tableList[0].country
          params['mallId'] = this.tableList[0].platform_mall_id // [country mallid 不影响搜索结果，去表格第一个]
          params['newest'] = 60 * i
          const goodsMalllist = await this.searchMallInstance(params)
          if (!goodsMalllist.length) {
            this.$refs.Logs.writeLog(`暂无数据`, true)
            return
          }
          console.log('310', goodsMalllist)
          if (goodsMalllist.length) {
            // 店铺条件过滤
            const fansMallsList = await this.filterList(goodsMalllist)
            console.log('299', fansMallsList)
            if (fansMallsList.length) {
              AllgoodsMalllist.push(...fansMallsList)
              // 根据配置信息截取所需
              if (AllgoodsMalllist.length >= maxPage) {
                AllgoodsMalllist = AllgoodsMalllist.splice(0, maxPage) // 截取所需店铺
                break
              }
            } else {
              this.$refs.Logs.writeLog(`此关键词暂未搜索到数据，请更换关键词或重试！`)
              break
            }
          } else {
            this.$refs.Logs.writeLog(`数据已被过滤空，请更换关键词或放宽搜索条件后重试！`)
            break
          }
        }
        this.$refs.Logs.writeLog(`店铺搜索获取结束`)
        this.mallSearchList = []
        AllgoodsMalllist.forEach(el => {
          el.item_basic.totalRate = el.item_basic.item_rating.rating_count.reduce(function(prev, curr, idx, arr) {
            return prev + curr
          })
          this.mallSearchList.push(el.item_basic)
        })
      }
    },
    // 添加关注店铺--目标店铺--赋值给mallIDinfo
    addTargetMall(val) {
      if (!this.sel_mallSearchList.length) {
        this.$message.warning('请选择店铺')
        return
      }
      const mallIDList = []
      this.sel_mallSearchList.forEach(el => {
        mallIDList.push(el.shopid)
      })
      // const str = mallIDList.toString().replaceAll(',', '\n')
      this.mallIDinfo = mallIDList.toString()
      this.dialog_mallSearch = false
    },
    // 开始关注---根据店铺获取粉丝或者用户信息
    async startCancer() {
      if (!this.mallIDinfo) {
        this.$message.warning('请先获取关注店铺')
        return
      }
      this.isStop = false
      this.$refs.Logs.writeLog(`数据正在处理......`, true)
      const mallIDlist = this.mallIDinfo.split(',')
      this.tableList.map(item => { item['mallIDlist'] = mallIDlist })
      await batchOperation(this.tableList, this.getFllowerInfo)
      this.$refs.Logs.writeLog(`数据处理结束`, true)
    },
    // 开始关注---筛选粉丝
    async getFllowerInfo(mall, count = { count: 1 }) {
      try {
        const followermallIDList = mall.mallIDlist
        this.$set(mall, 'following', 0)
        this.$set(mall, 'fence', 0)
        this.$set(mall, 'newFollow', 0)
        this.$set(mall, 'cancerFollow', 0)
        this.$set(mall, 'state', '-')
        this.$refs.Logs.writeLog(`正在查询【${mall.mall_alias_name || mall.platform_mall_name}】店铺信息`)
        for (const followermallID of followermallIDList) {
          this.$refs.Logs.writeLog(`关注【${followermallID}】店铺粉丝`)
          if (this.isStop) {
            return
          }
          // 判断HOME店铺未登录（方法里已打印了日志）
          const islogin = await this.isLogin(mall)
          if (!islogin) {
            return
          }
          // 获取HOME店铺数据
          const resMall = await this.getHomeMallData(mall)
          this.$set(mall, 'following', resMall ? resMall.account.following_count : 0)
          this.$set(mall, 'fence', resMall ? resMall.follower_count : 0)
          if (!resMall) {
            this.$refs.Logs.writeLog(`店铺暂无数据`, true)
            this.$set(mall, 'state', '店铺暂无数据')
            return
          }
          // 获取HOME店铺关注数据
          this.$refs.Logs.writeLog(`正在获取本店铺关注信息`, true)
          const allhomeFollowringList = await this.getHomeFollowingList(mall, resMall.account.following_count)
          this.$refs.Logs.writeLog(`本店铺关注用户数：【${allhomeFollowringList.length}】`, true)
          console.log('621', allhomeFollowringList)

          // 接口请求擦参数
          const params = {}
          params['country'] = mall.country
          params['mallId'] = mall.platform_mall_id
          params['shopid'] = followermallID
          const mallName = mall.mall_alias_name || mall.platform_mall_name

          if (this.userInfo.auto_attention_set.FollowType === '0') { // 关注店铺粉丝
            this.$refs.Logs.writeLog(`正在获取关注店铺粉丝信息`, true)
            let shopDatas = [] // 关注的粉丝
            let flag = true
            // 关注第一页粉丝
            params['offset'] = 0
            let totalMallFollow = 0
            let ALLshopDatas = await this.GetShopLikes(params) // 获取粉丝信息
            this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】获取第${(params.offset / 20) + 1}页粉丝`)
            shopDatas = await this.filterShopDatas(ALLshopDatas, mall.country, mall.platform_mall_id) // 筛选活跃粉丝
            for (const shop of shopDatas) {
              if (this.isStop) {
                return
              }
              const Followindex = allhomeFollowringList.findIndex(el => { return el.ShopId === shop.ShopId }) // 新增粉丝与已关注粉丝查重
              if (Followindex >= 0) {
                continue
              }
              const isFollow = await this.runAttention(shop, mall, followermallID) // 开始关注
              if (isFollow) {
                totalMallFollow++
              } else {
                this.$set(mall, 'newFollow', totalMallFollow)
                this.$set(mall, 'state', '关注失败')
                this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,`, false)
              }
              if (Number(this.userInfo.auto_attention_set.FollowNumber)) { // 有数量限制关注
                if (totalMallFollow >= Number(this.userInfo.auto_attention_set.FollowNumber)) {
                  this.$set(mall, 'newFollow', totalMallFollow)
                  this.$set(mall, 'state', '关注成功')
                  flag = false
                  break
                }
              }
            }
            // 关注更多粉丝
            while (flag) {
              if (this.isStop) {
                return
              }
              params['offset'] += 20
              ALLshopDatas = await this.GetShopLikes(params)
              this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】获取第${(params.offset / 20) + 1}页粉丝数据`)

              shopDatas = await this.filterShopDatas(ALLshopDatas, mall.country, mall.platform_mall_id)
              for (let index = 0; index < shopDatas.length; index++) {
                if (this.isStop) {
                  return
                }
                const shop = shopDatas[index]
                const Followindex = allhomeFollowringList.findIndex(el => { return el.ShopId === shop.ShopId }) // 新增粉丝与已关注粉丝查重
                if (Followindex >= 0) {
                  continue
                }
                const isFollow = await this.runAttention(shop, mall, followermallID)

                if (isFollow) {
                  totalMallFollow++
                } else {
                  this.$set(mall, 'newFollow', totalMallFollow)
                  this.$set(mall, 'state', '关注失败')
                  this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,`, false)
                }
                if (Number(this.userInfo.auto_attention_set.FollowNumber)) { // 有数量限制关注
                  if (totalMallFollow >= Number(this.userInfo.auto_attention_set.FollowNumber)) {
                    flag = false
                    break
                  }
                } else { // 无数量限制关注
                  if (!isFollow) {
                    this.$set(mall, 'newFollow', totalMallFollow)
                    this.$set(mall, 'state', '关注成功')
                    this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】成功关注${totalMallFollow}个粉丝`)
                    flag = false
                    break
                  }
                }
              }
              if (ALLshopDatas.length < 20) {
                flag = false
              }
              this.$set(mall, 'newFollow', totalMallFollow)
              // 任务执行间隔时间
              await sleep((Number(this.userInfo.auto_attention_set.FollowInterval) * 1000))
            }
            this.$set(mall, 'state', '操作结束')
            this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】成功关注${totalMallFollow}个粉丝`)
          } else { // 关注评价用户
            let flag2 = true
            let RateCustomList = []
            const itemIDindex = this.mallSearchList.findIndex(el => { return el.shopid === Number(followermallID) })
            const itemID = this.mallSearchList[itemIDindex].itemid
            // 关注第一页评价用户
            let totalCommentFollow = 0
            let offset = 0
            RateCustomList = await this.GetShopComment(itemID, followermallID, mall, offset)
            for (let j = 0; j < RateCustomList.length; j++) {
              const RateCustom = RateCustomList[j]
              const shop = {}
              shop['ShopId'] = RateCustom.shopid
              const isFollow = await this.runAttention(shop, mall, followermallID) // 开始关注
              if (isFollow) {
                totalCommentFollow++
              } else {
                this.$set(mall, 'newFollow', totalCommentFollow)
                this.$set(mall, 'state', '关注失败')
                this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,`, false)
                flag2 = false
                break
              }
              if (Number(this.userInfo.auto_attention_set.FollowNumber)) { // 有数量限制关注
                if (totalCommentFollow >= Number(this.userInfo.auto_attention_set.FollowNumber)) {
                  this.$set(mall, 'newFollow', totalCommentFollow)
                  this.$set(mall, 'state', '关注成功')
                  flag2 = false
                  break
                }
              }
            }
            console.log('452', totalCommentFollow)
            // 关注更多评价用户
            while (flag2) {
              offset += 52
              RateCustomList = await this.GetShopComment(itemID, followermallID, mall, offset)
              for (let j = 0; j < RateCustomList.length; j++) {
                const RateCustom = RateCustomList[j]
                const shop = {}
                shop['ShopId'] = RateCustom.shopid
                const isFollow = await this.runAttention(shop, mall, followermallID) // 开始关注
                if (isFollow) {
                  totalCommentFollow++
                } else {
                  this.$set(mall, 'newFollow', totalCommentFollow)
                  this.$set(mall, 'state', '关注失败')
                  this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,`, false)
                  break
                }
                if (Number(this.userInfo.auto_attention_set.FollowNumber)) { // 有数量限制关注
                  if (totalCommentFollow >= Number(this.userInfo.auto_attention_set.FollowNumber)) {
                    this.$set(mall, 'newFollow', totalCommentFollow)
                    this.$set(mall, 'state', '关注成功')
                    this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】成功关注${totalCommentFollow}个粉丝`)
                    flag2 = false
                    break
                  }
                } else { // 无数量限制关注
                  if (!isFollow) {
                    this.$set(mall, 'newFollow', totalCommentFollow)
                    this.$set(mall, 'state', '关注成功')
                    this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】成功关注${totalCommentFollow}个粉丝`)
                    flag2 = false
                    break
                  }
                }
              }
              await sleep((Number(this.userInfo.auto_attention_set.FollowInterval) * 1000))
            }
          }
          this.$refs.Logs.writeLog(`【${mallName}】关注结束`, true)
        }
      } catch (e) {
        this.$refs.Logs.writeLog(`用户信息获取失败-line373，${e}`, false)
      } finally {
        --count.count
      }
    },
    // 获取HOME店铺
    async getHomeFollowingList(mall, myFollowed) {
      const params = {}
      params['country'] = mall.country
      params['mallId'] = mall.platform_mall_id
      params['offset'] = 0
      let shopDatas = await this.getHomeFllowering(params)
      let ALLshopDatas = shopDatas
      if (!ALLshopDatas.length) {
        return []
      }
      while (shopDatas.length >= 20) {
        if (this.isStop) {
          break
        }
        params['offset'] += 20
        shopDatas = await this.getHomeFllowering(params)
        ALLshopDatas = ALLshopDatas.concat(shopDatas)
      }
      return ALLshopDatas
    },
    // 获取商品评价用户
    async GetShopComment(itemID, followermallID, mall, offset) {
      const params = {}
      params['mallId'] = mall.platform_mall_id
      params['country'] = mall.country
      params['itemid'] = itemID
      params['offset'] = offset
      params['shopid'] = followermallID
      const res = await this.MallAPIInstance.getShoppComment(params)
      if (res.code === 200) {
        const array = res.data.ratings || []
        // 用户设置的评论星级筛选
        const shopDatas = array.filter(el => {
          if (el.rating_star >= Number(this.userInfo.auto_attention_set.MinOrderEvaluation)) {
            return el
          }
        })
        return shopDatas
      } else {
        this.$refs.Logs.writeLog(`商品评价获取失败${res.message}`, false)
        return []
      }
    },
    // 关注用户
    async runAttention(shop, mall, followermallID) {
      const param = {}
      param['country'] = mall.country
      param['mallId'] = mall.platform_mall_id
      param['userShopid'] = shop.ShopId
      param['followMallID'] = followermallID
      const res = await this.MallAPIInstance.buyerFollow(param)
      if (res.code !== 200) {
        this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`, false)
      } else {
        if (res.data) {
          // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}成功`, true)
          return true
        } else {
          debugger
          this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`, false)
        }
      }
      return false
    },
    // 取关用户
    async runCancerAttention(shop, mall, followermallID) {
      const param = {}
      param['country'] = mall.country
      param['mallId'] = mall.platform_mall_id
      param['ShopId'] = shop.ShopId
      param['followMallID'] = followermallID
      const res = await this.MallAPIInstance.buyerUNFollow(param)
      if (res.code !== 200) {
        this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.ShopId}失败`, false)
        return true
      }
      this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.ShopId}成功`, true)
      return false
    },
    // 筛选活跃粉丝()
    async filterShopDatas(shopDatas, country, platform_mall_id) {
      const resLst = []
      for (const sd of shopDatas) {
        const timeStamp = await this.getActiveUser({ country: country, mallId: platform_mall_id, userName: sd.UserName })
        const zeroTime = new Date(new Date().toLocaleDateString()).getTime()
        const setTime = zeroTime - zeroTime * (Number(this.userInfo.auto_attention_set.LastLoginDay) - 1)
        if (timeStamp > setTime) {
          resLst.push(sd)
        }
      }
      return resLst
    },
    // 获取店铺活跃时间
    async getActiveUser(user) {
      const params = {}
      // 获取店铺粉丝
      params['country'] = user.country
      params['mallId'] = user.mallId
      params['username'] = user.userName
      const res = await this.MallAPIInstance.getActiveTimeFollower(params)
      if (res.code === 200) {
        return Number(res.data.last_active_time) * 1000
      } else {
        this.$refs.Logs.writeLog(`店铺活跃状态获取失败:${res.message}`, false)
        return ''
      }
    },
    // 获取粉丝信息
    async GetShopLikes(item) {
      const params = {}
      params['country'] = item.country
      params['mallId'] = item.mallId
      params['shopid'] = item.shopid

      params['offset'] = item.offset
      params['limit'] = 20
      params['offset_of_offset'] = 0
      params['timeStamp'] = new Date().getTime()
      const res = await this.MallAPIInstance.getFllower(params)
      if (res.code === 200) {
        return res.data
      } else {
        this.$refs.Logs.writeLog(`粉丝获取失败，${res.message}`, false)
        return []
      }
    },
    // 获取用户数据
    async getUserinfo() {
      this.showlog = true
      const res = await this.$appConfig.getUserConfig()
      this.userInfo = JSON.parse(res)
      if (!this.userInfo.auto_attention_set) {
        this.userInfo.auto_attention_set.ProductMax = 5 // 店铺商品上限
        this.userInfo.auto_attention_set.LastLoginDay = '1'// 最后活跃时间
        this.userInfo.auto_attention_set.FollowType = '0'// 关注对象
        this.userInfo.auto_attention_set.FollowNumber = '100'// 关注数量
        this.userInfo.auto_attention_set.FollowInterval = '10'// 关注间隔
        this.userInfo.auto_attention_set.MinOrderEvaluation = '4.5'// //不关注订单评价小于等于
        this.userInfo.auto_attention_set.IsNotFollowMinOrderEvaluation = true// 是否不关注订单评价小于等于最小值的卖家
        this.userInfo.auto_attention_set = '30'// 天内关注过的用户
        this.userInfo.auto_attention_set.IsNotFollowFollowedDay = true// 是否不关注一定天数内已关注的卖家
        this.userInfo.auto_attention_set.CancelFollowNumber = '100'// 取关数量：
        this.userInfo.auto_attention_set.IsOpenTimerBrushFans = false// 开启定时刷粉
        this.userInfo.auto_attention_set.OpenHour = '10'
        this.userInfo.auto_attention_set.OpenMinute = '00'// 每日启动时间
        console.log(this.startTime)
        this.userInfo.auto_attention_set.KeyWord || this.followKey// 关注关键词
      } else {
        this.userInfo.auto_attention_set.IsNotFollowMinOrderEvaluation = this.userInfo.auto_attention_set.IsNotFollowMinOrderEvaluation === '1' // 是否不关注订单评价小于等于最小值的卖家
        this.userInfo.auto_attention_set.IsNotFollowFollowedDay = this.userInfo.auto_attention_set.IsNotFollowFollowedDay === '1'// 是否不关注一定天数内已关注的卖家
      }
    },
    // 参数设置保存
    setSave(val) {
      // this.tableList = []
      // console.log('199', this.selmallList)
      // if (val) {
      //   this.selmallList.forEach(el => {
      //     const obj = { ...el }
      //     obj['following'] = 0
      //     obj['fence'] = 0
      //     obj['newFollow'] = 0
      //     obj['cancerFollow'] = 0
      //     obj['state'] = '-'
      //     this.tableList.push(obj)
      //   })
      // }
      this.dialog_userInfo = false
      // 更新userinfo
      this.getUserinfo()
    },
    // 参数设置
    async setQurey() {
      this.dialog_userInfo = true
    },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 选择的店铺
    changeMallList(val) {
      this.selmallList = val
    },
    // 多选
    handleSelectionChange(val) {
      this.sel_mallSearchList = val
    }
  }
}
</script>

<style scoped lang='less'>
.detail{
  width: 100%;
  height: 100%;
  padding: 5px;
  background-color: white;
  .dialog_mall{
    label:not(:first-child){
        margin-left: 30px;
      }
    .el-input{
        margin:0px 5px;
    }

  }
    li{
     display: flex;
     margin-bottom: 5px;
     align-items: center;
    }

    .row2{
      ul{
        border: 1px solid #dcdedc;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
      }
    }
    .Follow{
      position: absolute;
    padding: 5px;
    background-color: white;
    z-index: 999;
    left: 16px;
    top: 35px;
    }
    .cancerFollow{
    position: absolute;
    padding: 5px;
    background-color: white;
    z-index: 999;
    left: 560px;
    top: 35px;

    }

  }

</style>

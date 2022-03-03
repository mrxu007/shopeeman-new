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
                <el-input v-model="mallIDinfo" type="textarea" :rows="3" placeholder="请输入内容" />
                <div>
                  <el-button type="primary" size="mini" style="margin-left: 10px;margin-bottom: 5px;" @click="addCancerMall">添加关注店铺</el-button>
                  <el-button type="primary" size="mini">清空店铺信息</el-button>
                </div>
              </li>
              <!-- row2.2 -->
              <li style="margin-left: 80px;">
                <el-button type="primary" size="mini" @click="startCancer">开始关注</el-button>
                <el-button type="primary" size="mini">取消操作</el-button>
              </li>
            </ul>
          </el-col>
          <el-col :span="9"><div class="grid-content bg-purple" />
            <ul>
              <!-- row2.1 -->
              <li>
                <el-button type="primary" size="mini" style="width:105px">开始取关</el-button>
                <el-button type="primary" size="mini">取消操作</el-button>
              </li>
              <!-- row2.2 -->
              <li>
                <el-button type="primary" size="mini">取关所有用户</el-button>
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
          <el-input v-model="minComment" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />-
          <el-input v-model="maxComment" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />
          <label>点赞数</label>
          <el-input v-model="minLike" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />-
          <el-input v-model="maxLike" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />
        </li>
        <!-- row3 -->
        <li>
          <label>评分数</label>
          <el-input v-model="minScore" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />-
          <el-input v-model="maxScore" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />
          <label style="margin-left:50px">店铺数</label>
          <el-input v-model="mallNum" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />
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
            <el-table-column prop="itemid" label="店铺ID" min-width="100px" align="center" />
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
      <autoFollow :user-info="userInfo" @isSave="setSave" />
    </el-dialog>
    <Logs ref="Logs" v-model="showlog" clear />
  </div>
</template>

<script>
import StoreChoose from '../../../components/store-choose'
import autoFollow from '@/views/user-config/autoFollow.vue'
import MallManagerAPI from '@/module-api/market-activity-api/ai-addFence'
import { batchOperation } from '@/util/util'
import { data } from 'cheerio/lib/api/attributes'

export default {
  name: 'BusinessAnalyseGoodsDiscount',
  components: {
    StoreChoose,
    autoFollow
  },
  data() {
    return {
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
      keyword: '手机', // 关键词
      minComment: '50', // 评论数
      maxComment: '5000',
      minLike: '100', // 点赞数
      maxLike: '10000',
      minScore: '4.5', // 评分数
      maxScore: '5',
      mallNum: '1', // 店铺数
      mallSearchList: [], // 弹窗列表
      sel_mallSearchList: [] // 多选店铺
    }
  },
  created() {
    this.getUserinfo() // 获取用户设置数据
  },
  methods: {
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
      params['country'] = 'MY'
      params['mallId'] = '268048262'

      params['offset'] = 20
      params['limit'] = 20
      params['offset_of_offset'] = 0
      params['timeStamp'] = new Date().getTime()
      const res = await this.MallAPIInstance.getFllower(params)
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
      params['rating_filter'] = this.userInfo.auto_attention_set.MinOrderEvaluation // 评分
      try {
        const res = await this.MallAPIInstance.addCancerMall(params)
        if (res.status === 200) {
          return JSON.parse(res.data).items
        } else {
          this.$refs.Logs.writeLog(`店铺搜索请求失败,230-line:${res.status}`, false)
          return []
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`店铺搜索请求失败,234-line:${error}`, false)
        return []
      }
    },
    // 添加关注店铺--店铺条件过滤
    filterList(goodsMalllist) {
      let getList = []
      const map = new Map()
      goodsMalllist.forEach(el => { // 去重
        if (!map.has(el.item_basic.itemid) && !map.has(el.item_basic.shopid)) {
          map.set(el.itemid, el)
        }
      })
      getList = [...map.values()]
      console.log('266', 'liked_count,rating_star,totalRate')
      const getList2 = getList.filter(el => { // 条件过滤
        let flag = null
        const totalRate = el.item_basic.item_rating.rating_count.reduce(function(prev, curr, idx, arr) {
          return prev + curr
        }) // 评论总数求和
        if (Number(el.item_basic.liked_count) >= Number(this.minLike) && Number(el.item_basic.liked_count) <= Number(this.maxLike) && // 点赞
             (el.item_basic.item_rating.rating_star).toFixed(2) >= Number(this.minScore) && el.item_basic.item_rating.rating_star.toFixed(2) <= Number(this.maxScore) && // 评分
            totalRate >= Number(this.minComment) && totalRate <= Number(this.maxComment) // 评论
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
          if (goodsMalllist.length) {
            // 店铺条件过滤
            const fansMallsList = this.filterList(goodsMalllist)
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
      const mallIDList = []
      this.sel_mallSearchList.forEach(el => {
        mallIDList.push(el.shopid)
      })
      // const str = mallIDList.toString().replaceAll(',', '\n')
      this.mallIDinfo = mallIDList.toString()
      this.dialog_mallSearch = false
    },
    // 开始关注
    async startCancer() {
      this.$refs.Logs.writeLog(`开始关注店铺......`, true)
      await batchOperation(this.tableList, this.RunAttentionUsers)
      this.$refs.Logs.writeLog(`店铺关注结束`, true)
    },
    // 开始关注-根据userinfo配置关注用户
    RunAttentionUsers(item, count = { count: 1 }) {
      try {
        let shopDatas = []
        if (this.userInfo.auto_attention_set.FollowType === 0) { // 关注店铺粉丝
          item['offset'] = 0
          shopDatas = this.GetShopLikes(item) // 获取粉丝信息
        } else {
          shopDatas = this.GetShopComment(item) // 店铺评价用户
        }
      } catch (e) {

      } finally {
        --count.count
      }
    },

    // 获取粉丝信息
    async GetShopLikes(item) {
      const params = {}
      params['country'] = item.country
      params['mallId'] = item.platform_mall_id

      params['offset'] = item.offset
      params['limit'] = 20
      params['offset_of_offset'] = 0
      params['timeStamp'] = new Date().getTime()
      const res = await this.MallAPIInstance.getFllower(params)
    },
    // 获取用户数据
    async getUserinfo() {
      this.showlog = true
      const res = await this.$api.userSet()
      if (res.data.code === 200) {
        this.userInfo = res.data.data
      } else {
        this.$message.warning(`信息获取失败！${res.data.data.message}`)
      }
    },
    // 参数设置保存
    setSave(val) {
      this.tableList = []
      console.log('199', this.selmallList)
      if (val) {
        this.selmallList.forEach(el => {
          const obj = { ...el }
          obj['following'] = 0
          obj['fence'] = 0
          obj['newFollow'] = 0
          obj['cancerFollow'] = 0
          obj['state'] = '-'
          this.tableList.push(obj)
        })
      }
      this.dialog_userInfo = false
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

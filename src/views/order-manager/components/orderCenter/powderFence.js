import MallManagerAPI from '@/module-api/market-activity-api/ai-addFence'
import { batchOperation } from '@/util/util'

export class AutoAddFence {
    mallTest=''// 任务
    MallAPIInstance=new MallManagerAPI(this)
    mallSearchList = []// 店铺搜索列表

    // 定时涨粉
    async autoAddFenceActive() {
      const siteList = [
        'MY', 'TW', 'VN', 'ID',
        'PH', 'TH', 'SG', 'BR',
        'MX', 'CO', 'CL', 'PL'
      ]
      for (const site of siteList) {
        const storeLog = {}
        storeLog['country'] = site
        storeLog['log_message'] = []
        const mallTest = await window.BaseUtilBridgeService.getAttentionUserTask(site)
        // 检测时间-执行任务
        if (mallTest.length) {
          const curTime = new Date().getTime()
          const runTime = Number(mallTest[0].exec_time)
          this.runTesk(curTime - runTime, mallTest)
        }
      }
    }
    // 任务执行
    runTesk(getTime, mallTest) {
      debugger
      getTime = getTime > 0 ? 0 : 0 - (getTime)
      setTimeout(async() => {
        this.mallTest = mallTest
        await this.searchMall(mallTest) // 搜索关注店铺
        await this.startCancer() // 开始关注
      }, getTime)
    }
    /**
     *执行方法
     *
     */
    // 添加关注店铺--搜素店铺
    async searchMall(mall) {
      const maxPage = mall.mall_ids.split(',').length * 10 // 搜索店铺数
      let AllgoodsMalllist = []
      // 查询店铺
      this.$refs.Logs.writeLog(`正在获取店铺信息......`, true)
      for (let i = 0; i < maxPage; i++) {
        const params = {}
        params['country'] = mall.country
        params['mallId'] = mall.mall_ids.split(',')[0]
        params['newest'] = 60 * i
        params['keyword'] = mall.key_word
        const goodsMalllist = await this.searchMallInstance(params)
        if (!goodsMalllist.length) {
          this.$refs.Logs.writeLog(`暂无数据`, true)
          return
        }
        if (goodsMalllist.length) {
          // 店铺条件过滤
          const fansMallsList = await this.filterList(goodsMalllist)
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
    // 添加关注店铺--搜素店铺接口
    async searchMallInstance(item) {
      const params = {}
      params['country'] = item.country
      params['mallId'] = item.mallId

      params['by'] = 'relevancy'
      params['keyword'] = item.keyword
      params['limit'] = 60
      params['newest'] = item.newest
      params['order'] = 'desc'
      params['page_type'] = 'search'
      params['rating_filter'] = this.mallTest.min_order_evaluation // 评分
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
    }
    // 添加关注店铺--店铺条件过滤
    async filterList(goodsMalllist) {
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
        if (Number(el.item_basic.liked_count) >= 100 && Number(el.item_basic.liked_count) <= 10000 && // 点赞
           (el.item_basic.item_rating.rating_star).toFixed(2) >= 4.5 && el.item_basic.item_rating.rating_star.toFixed(2) <= 5 && // 评分
          totalRate >= 50 && totalRate <= 500 && // 评论
          el.item_basic.stock >= Number(this.mallTest.product_max) // 库存
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
    }
    // 判断用户是否登录
    async isLogin(mall) {
      const res = await this.MallAPIInstance.isLogin(mall)
      if (res.code === 200 && res.data) {
        return true
      } else {
        this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺未登录`, false)
        return false
      }
    }
    // 开始关注---根据店铺获取粉丝或者用户信息
}

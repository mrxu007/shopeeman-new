import MallManagerAPI from '@/module-api/market-activity-api/ai-addFence'
import { batchOperation, sleep } from '@/util/util'
import Vue from 'vue'

export class AutoAddFence {
    mallTest=''// 任务
    MallAPIInstance=new MallManagerAPI(new Vue())
    mallSearchList = []// 店铺搜索列表
    storeLog = {}
    // 定时涨粉
    async autoAddFenceActive() {
      const siteList = ['TH'
        // 'MY', 'TW', 'VN', 'ID',
        // 'PH', 'TH', 'SG', 'BR',
        // 'MX', 'CO', 'CL', 'PL'
      ]
      for (const site of siteList) {
        const storeLog = {}
        storeLog['country'] = site
        storeLog['log_message'] = []
        const mallTest = await window.BaseUtilBridgeService.getAttentionUserTask(site)
        console.log(mallTest)
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
      getTime = getTime > 0 ? 0 : 0 - (getTime)
      setTimeout(async() => {
        // 更新任务时间 --日志
        this.mallTest = mallTest[0]
        await this.searchMall(this.mallTest) // 搜索关注店铺
        await this.startCancer() // 开始关注
        // 删除原任务
        await window.BaseUtilBridgeService.deleteAttentionUserTask(this.mallTest.id)
        // 更新新任务
        const params = {
          'country': this.mallTest.country,
          'mall_ids': this.mallTest.mall_ids,
          'mall_names': this.mallTest.mall_names,
          'product_max': this.mallTest.product_max,
          'last_login_day': this.mallTest.last_login_day,
          'open_hour': this.mallTest.open_hour,
          'open_minute': this.mallTest.open_minute,
          'key_word': this.mallTest.key_word,
          'follow_number': this.mallTest.mallTest,
          'follow_interval': this.mallTest.follow_interval,
          'is_not_follow_min_order_evaluation': this.mallTest.is_not_follow_min_order_evaluation,
          'min_order_evaluation': this.mallTest.min_order_evaluation,
          'is_not_follow_followed_day': this.mallTest.is_not_follow_followed_day,
          'followed_day': this.mallTest.followed_day,
          'followed_type': this.mallTest.followed_type,
          'cancel_follow_number': this.mallTest.cancel_follow_number,
          'cancel_follow_sort_type': this.cancel_follow_sort_type.cancel_follow_sort_type,
          'exec_time': new Date().getTime()
        }
        const addTest = await window.BaseUtilBridgeService.saveAttentionUserTask(params)
        this.storeLog['task_id'] = addTest[0].id
        this.storeLog['country'] = this.mall[0].country
        this.storeLog['log_message'] = []
        // this.storeLog['created_at'] = this.formatTime(new Date().getTime())
        await window.BaseUtilBridgeService.saveAttentionUserLog(this.storeLog)
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
      this.storeLog['log_message'].push('正在查询关注店铺....')
      this.storeLog['created_at'] = this.formatTime(new Date().getTime())
      for (let i = 0; i < maxPage; i++) {
        const params = {}
        params['country'] = mall.country
        params['mallId'] = Number(mall.mall_ids.split(',')[0])
        params['newest'] = 60 * i
        params['keyword'] = mall.key_word
        const goodsMalllist = await this.searchMallInstance(params)
        if (!goodsMalllist.length) {
        //   this.$refs.Logs.writeLog(`暂无数据`, true)
          this.storeLog['log_message'].push('暂无数据')
          this.storeLog['created_at'] = this.formatTime(new Date().getTime())
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
            // this.$refs.Logs.writeLog(`此关键词暂未搜索到数据，请更换关键词或重试！`)
            this.storeLog['log_message'].push('此关键词暂未搜索到数据，请更换关键词或重试！')
            this.storeLog['created_at'] = this.formatTime(new Date().getTime())
            break
          }
        } else {
        //   this.$refs.Logs.writeLog(`数据已被过滤空，请更换关键词或放宽搜索条件后重试！`)
          this.storeLog['log_message'].push('数据已被过滤空，请更换关键词或放宽搜索条件后重试！')
          this.storeLog['created_at'] = this.formatTime(new Date().getTime())
          break
        }
      }
      //   this.$refs.Logs.writeLog(`店铺搜索获取结束`)
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
        //   this.$refs.Logs.writeLog(`店铺搜索请求失败,230-line:${res.status}`, false)
          this.storeLog['log_message'].push('店铺搜索请求失败,230-line:${res.status}')
          this.storeLog['created_at'] = this.formatTime(new Date().getTime())
          return []
        }
      } catch (error) {
        // this.$refs.Logs.writeLog(`店铺搜索请求失败,234-line:${error}`, false)
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
      const product_max = Number(this.mallTest.product_max)
      const getList2 = getList.filter(el => { // 条件过滤
        const totalRate = el.item_basic.item_rating.rating_count.reduce(function(prev, curr, idx, arr) {
          return prev + curr
        }) // 评论总数求和
        if (Number(el.item_basic.liked_count) >= 100 && Number(el.item_basic.liked_count) <= 10000 && // 点赞
           Number((el.item_basic.item_rating.rating_star).toFixed(2)) >= 4.5 && Number(el.item_basic.item_rating.rating_star.toFixed(2)) <= 5 && // 评分
          totalRate >= 50 && totalRate <= 5000 && // 评论
          el.item_basic.stock >= product_max // 库存
        ) {
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
        this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺未登录`)
        this.storeLog['created_at'] = this.formatTime(new Date().getTime())
        // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺未登录`, false)
        return false
      }
    }
    // 开始关注---根据店铺获取粉丝或者用户信息
    // 开始关注---根据店铺获取粉丝或者用户信息
    async startCancer(mallTest) {
    //   this.$refs.Logs.writeLog(`数据正在处理......`, true)
      this.storeLog['log_message'].push(`数据正在处理......`)
      this.storeLog['created_at'] = this.formatTime(new Date().getTime())
      const aa = this.mallSearchList // null
      console.log('111', aa)
      if (!this.mallSearchList.length) {
        // 当前关键词暂无数据
        this.storeLog['log_message'].push(`当前关键词暂无数据`)
        this.storeLog['created_at'] = this.formatTime(new Date().getTime())
        return
      }
      // 组装tablelist
      const platform_mall_idList = this.mallTest.mall_ids.split(',')
      const mall_namesList = this.mallTest.mall_names.split(',')
      const mallIDlist = this.mallSearchList.forEach(el => {
        return el.shopid
      })
      const tableList = platform_mall_idList.forEach((el, index) => {
        return {
          'platform_mall_id': el,
          'mall_alias_name': mall_namesList[index],
          'country': this.mallTest.country,
          'mallIDlist': mallIDlist
        }
      })
      // log 数据正在处理
      this.storeLog['log_message'].push(`数据正在处理`)
      this.storeLog['created_at'] = this.formatTime(new Date().getTime())
      await batchOperation(tableList, this.getFllowerInfo)
      this.storeLog['log_message'].push(`数据处理结束`)
      this.storeLog['created_at'] = this.formatTime(new Date().getTime())
      // log 数据处理结束
    }
    // 开始关注---筛选粉丝
    async getFllowerInfo(mall, count = { count: 1 }) {
      try {
        const followermallIDList = mall.mallIDlist
        // this.$set(mall, 'following', 0)
        // this.$set(mall, 'fence', 0)
        // this.$set(mall, 'newFollow', 0)
        // this.$set(mall, 'cancerFollow', 0)
        // this.$set(mall, 'state', '-')
        this.storeLog['log_message'].push(`正在查询【${mall.mall_alias_name || mall.platform_mall_name}】店铺关注信息`)
        this.storeLog['created_at'] = this.formatTime(new Date().getTime())
        // this.$refs.Logs.writeLog(`正在查询【${mall.mall_alias_name || mall.platform_mall_name}】店铺关注信息`)
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
          this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺暂无数据`)
          this.storeLog['created_at'] = this.formatTime(new Date().getTime())
          //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺暂无数据`, true)
          //   this.$set(mall, 'state', '店铺暂无数据')
          return
        }
        // 获取HOME店铺关注数据
        const allhomeFollowringList = await this.getHomeFollowingList(mall, resMall.account.following_count)
        this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺关注用户数：【${allhomeFollowringList.length}】`)
        this.storeLog['created_at'] = this.formatTime(new Date().getTime())
        // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺关注用户数：【${allhomeFollowringList.length}】`, true)
        // console.log('621', allhomeFollowringList)

        // 遍历关注店铺
        let totalMallFollow = Number(mall.newFollow)
        for (const followermallID of followermallIDList) {
          if (this.isStop) {
            return
          }
          // 接口请求擦参数
          const params = {}
          params['country'] = mall.country
          params['mallId'] = mall.platform_mall_id
          params['shopid'] = followermallID
          if (this.mallTest.followed_type === '0') { // 关注店铺粉丝
            this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】正在获取${followermallID}店铺粉丝信息`)
            this.storeLog['created_at'] = this.formatTime(new Date().getTime())
            // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】正在获取${followermallID}店铺粉丝信息`, true)
            let flag = true
            // 关注第一页粉丝
            params['offset'] = 0
            let ALLshopDatas = await this.GetShopLikes(params) // 获取粉丝信息
            this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】获取第${(params.offset / 20) + 1}页粉丝`)
            this.storeLog['created_at'] = this.formatTime(new Date().getTime())
            // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】获取第${(params.offset / 20) + 1}页粉丝`)
            for (const shop of ALLshopDatas) {
              if (this.isStop) {
                return
              }
              const lineUser = await this.filterShopDatas(ALLshopDatas, mall.country, mall.platform_mall_id) // 筛选活跃粉丝
              if (!lineUser) {
                continue
              }
              if (allhomeFollowringList.length) { // HOME店铺是否有关注的粉丝
                const Followindex = allhomeFollowringList.findIndex(el => { return el.ShopId === shop.ShopId }) // 新增粉丝与已关注粉丝查重
                if (Followindex >= 0) {
                  continue
                }
              }
              const isFollow = await this.runAttention(shop, mall, followermallID) // 开始关注
              if (isFollow) {
                totalMallFollow++
              } else {
                // this.$set(mall, 'newFollow', totalMallFollow)
                // this.$set(mall, 'state', '关注失败')
                this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败`)
                this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,`, false)
                flag = false
                continue
              }
              if (Number(this.mallTest.follow_number)) { // 有数量限制关注
                if (totalMallFollow >= Number(this.mallTest.follow_number)) {
                  //   this.$set(mall, 'newFollow', totalMallFollow)
                  //   this.$set(mall, 'state', '关注成功')
                  return
                }
              } else {
                if (mall.following + totalMallFollow >= 3000) {
                  this.storeLog['log_message'].push(`关注已达上限`)
                  this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                  //   this.$set(mall, 'newFollow', totalMallFollow)
                  //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限,`, true)
                  // flag = false
                  // break
                  return
                }
              }
            }
            this.storeLog['log_message'].push(`新增关注${totalMallFollow}个`)
            this.storeLog['created_at'] = this.formatTime(new Date().getTime())

            // this.$set(mall, 'newFollow', totalMallFollow)
            // 关注更多粉丝
            while (flag) {
              if (this.isStop) {
                return
              }
              params['offset'] += 20
              ALLshopDatas = await this.GetShopLikes(params)
              this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】获取第${(params.offset / 20) + 1}页粉丝数据`)
              this.storeLog['created_at'] = this.formatTime(new Date().getTime())
              //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】获取第${(params.offset / 20) + 1}页粉丝数据`)

              for (let index = 0; index < ALLshopDatas.length; index++) {
                if (this.isStop) {
                  return
                }
                const shop = ALLshopDatas[index]
                const lineUser = await this.filterShopDatas(shop, mall.country, mall.platform_mall_id) // 筛选活跃粉丝
                if (!lineUser) {
                  continue
                }
                if (allhomeFollowringList.length) { // HOME店铺是否有关注的粉丝
                  const Followindex = allhomeFollowringList.findIndex(el => { return el.ShopId === shop.ShopId }) // 新增粉丝与已关注粉丝查重
                  if (Followindex >= 0) {
                    continue
                  }
                }
                const isFollow = await this.runAttention(shop, mall, followermallID)
                if (isFollow) {
                  totalMallFollow++
                } else {
                //   this.$set(mall, 'newFollow', totalMallFollow)
                //   this.$set(mall, 'state', '关注失败')
                //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,`, false)
                  this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败`)
                  this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                  continue
                }
                if (Number(this.mallTest.follow_number)) { // 有数量限制关注
                  if (totalMallFollow >= Number(this.mallTest.follow_number)) {
                    // this.$set(mall, 'newFollow', totalMallFollow)
                    // this.$set(mall, 'state', '关注成功')
                    this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}成功`)
                    this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                    return
                  }
                } else {
                  if (mall.following + totalMallFollow >= 3000) {
                    // this.$set(mall, 'newFollow', totalMallFollow)
                    // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限,`, true)
                    this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限`)
                    this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                    // flag = false
                    // break
                    return
                  }
                }
              }
              if (ALLshopDatas.length < 20) {
                // this.$refs.Logs.writeLog(`【${followermallID}】查找结束`)
                this.storeLog['log_message'].push(`【${followermallID}】查找结束`)
                this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                flag = false
              }
              //   this.$set(mall, 'newFollow', totalMallFollow)
              this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个`)
              this.storeLog['created_at'] = this.formatTime(new Date().getTime())
              // 任务执行间隔时间
              await sleep((Number(this.mallTest.follow_interval) * 1000))
            }
            // this.$set(mall, 'state', '操作结束')
            // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】成功关注${totalMallFollow}个粉丝`)
            this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】操作结束`)
            this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个`)
            this.storeLog['created_at'] = this.formatTime(new Date().getTime())
          } else {
            // this.$refs.Logs.writeLog(`正在获取评价用户信息`, true)
            this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】正在获取评价用户信息`)
            this.storeLog['created_at'] = this.formatTime(new Date().getTime())
            // 关注评价用户
            let flag2 = true
            let RateCustomList = []
            const itemIDindex = this.mallSearchList.findIndex(el => { return el.shopid === Number(followermallID) })
            const itemID = this.mallSearchList[itemIDindex].itemid
            // 关注第一页评价用户
            let offset = 0
            // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】获取${followermallID}第【${(offset / 52) + 1}】页评价用户`)
            this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】获取${followermallID}第【${(offset / 52) + 1}】页评价用户`)
            this.storeLog['created_at'] = this.formatTime(new Date().getTime())
            RateCustomList = await this.GetShopComment(itemID, followermallID, mall, offset)
            if (!RateCustomList.length) {
              this.storeLog['log_message'].push(`${followermallID}暂无用户评价`)
              this.storeLog['created_at'] = this.formatTime(new Date().getTime())
              //   this.$refs.Logs.writeLog(`${followermallID}暂无用户评价`)
              continue
            }
            for (let j = 0; j < RateCustomList.length; j++) {
              const RateCustom = RateCustomList[j]
              const shop = {}
              shop['ShopId'] = RateCustom.author_shopid
              shop['UserName'] = RateCustom.author_username
              if (allhomeFollowringList.length) { // HOME店铺是否有关注的粉丝
                const Followindex = allhomeFollowringList.findIndex(el => { return Number(el.ShopId) === Number(shop.ShopId) }) // 新增粉丝与已关注粉丝查重
                if (Followindex >= 0) {
                  continue
                }
              }
              const isFollow = await this.runAttention(shop, mall, RateCustom.shopid) // 开始关注
              if (isFollow) {
                totalMallFollow++
              } else {
                this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败`)
                this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                // this.$set(mall, 'newFollow', totalMallFollow)
                // this.$set(mall, 'state', '关注失败')
                // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,`, false)
                flag2 = false
                continue
              }
              if (Number(this.mallTest.follow_number)) { // 有数量限制关注
                if (totalMallFollow >= Number(this.mallTest.follow_number)) {
                //   this.$set(mall, 'newFollow', totalMallFollow)
                //   this.$set(mall, 'state', '关注成功')
                  this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注成功`)
                  this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                  return
                }
              } else {
                if (mall.following + totalMallFollow >= 3000) {
                //   this.$set(mall, 'newFollow', totalMallFollow)
                //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限,`, true)
                  this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限`)
                  this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                  // flag2 = false
                  return
                }
              }
            }
            this.$set(mall, 'newFollow', totalMallFollow)
            console.log('452', totalMallFollow)
            // 关注更多评价用户
            while (flag2) {
              if (this.isStop) {
                return
              }
              offset += 52
              //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】获取${followermallID}第【${(offset / 52) + 1}】页评价用户`)
              this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】获取${followermallID}第【${(offset / 52) + 1}】页评价用户`)
              this.storeLog['created_at'] = this.formatTime(new Date().getTime())
              RateCustomList = await this.GetShopComment(itemID, followermallID, mall, offset)
              for (let j = 0; j < RateCustomList.length; j++) {
                if (this.isStop) {
                  return
                }
                const RateCustom = RateCustomList[j]
                const shop = {}
                shop['ShopId'] = RateCustom.shopid
                shop['UserName'] = RateCustom.author_username
                if (allhomeFollowringList.length) { // HOME店铺是否有关注的粉丝
                  const Followindex = allhomeFollowringList.findIndex(el => { return el.ShopId === shop.ShopId }) // 新增粉丝与已关注粉丝查重
                  if (Followindex >= 0) {
                    continue
                  }
                }
                const isFollow = await this.runAttention(shop, mall, followermallID) // 开始关注
                if (isFollow) {
                  totalMallFollow++
                } else {
                  this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败`)
                  this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                  //   this.$set(mall, 'newFollow', totalMallFollow)
                  //   this.$set(mall, 'state', '关注失败')
                  //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,`, false)
                  continue
                }
                if (Number(this.mallTest.follow_number)) { // 有数量限制关注
                  if (totalMallFollow >= Number(this.mallTest.follow_number)) {
                    // this.$set(mall, 'newFollow', totalMallFollow)
                    // this.$set(mall, 'state', '关注成功')
                    this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注成功`)
                    this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                    return
                  }
                } else {
                  if (mall.following + totalMallFollow >= 3000) {
                    // this.$set(mall, 'newFollow', totalMallFollow)
                    // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限,`, true)
                    this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限`)
                    this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                    // flag2 = false
                    // break
                    return
                  }
                }
              }
              if (RateCustomList.length < 52) {
                // this.$refs.Logs.writeLog(`【${followermallID}】查找结束`)
                this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】查找结束`)
                this.storeLog['created_at'] = this.formatTime(new Date().getTime())
                flag2 = false
              }
              //   this.$set(mall, 'newFollow', totalMallFollow)
              await sleep((Number(this.mallTest.follow_interval) * 1000))
            }
            // this.$set(mall, 'state', '操作结束')
            // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】成功关注${totalMallFollow}个粉丝`)
            this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】成功关注${totalMallFollow}个粉丝`)
            this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】操作结束`)
            this.storeLog['created_at'] = this.formatTime(new Date().getTime())
          }
        }
        this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注结束`, true)
      } catch (e) {
        this.$refs.Logs.writeLog(`用户信息获取失败-line373，${e}`, false)
      } finally {
        --count.count
      }
    }
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
    }
    // 获取HOME店铺
    async getHomeFollowingList(mall, myFollowed) {
      const params = {}
      params['country'] = mall.country
      params['mallId'] = mall.platform_mall_id
      params['offset'] = 0
      params['mallName'] = mall.mall_alias_name || mall.platform_mall_name
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
    }
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
        // this.$refs.Logs.writeLog(`粉丝获取失败，${res.message}`, false)
        this.storeLog['log_message'].push(`粉丝获取失败，${res.message}`)
        this.storeLog['created_at'] = this.formatTime(new Date().getTime())
        return []
      }
    }
    // 筛选活跃关注()
    async filterShopDatas(shop, country, platform_mall_id) {
      const activetime = await this.getActiveUser({ country: country, mallId: platform_mall_id, userName: shop.UserName })
      const nowTime = new Date(new Date().toLocaleDateString()).getTime()
      const setTime = nowTime - nowTime * (Number(this.mallTest.last_login_day) - 1)
      if (activetime > setTime) {
        return true
      } else {
        return false
      }
    }
    // 关注用户
    async runAttention(shop, mall, followermallID) {
      const param = {}
      param['country'] = mall.country
      param['mallId'] = mall.platform_mall_id
      param['userShopid'] = shop.ShopId
      param['followMallID'] = followermallID
      const res = await this.MallAPIInstance.buyerFollow(param)
      if (res.code !== 200) {
        this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`)
        this.storeLog['created_at'] = this.formatTime(new Date().getTime())
        // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`, false)
      } else {
        if (res.data) {
          this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}成功`)
          this.storeLog['created_at'] = this.formatTime(new Date().getTime())
          //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}成功`, true)
          return true
        } else {
        //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`, false)
          this.storeLog['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`)
          this.storeLog['created_at'] = this.formatTime(new Date().getTime())
        }
      }
      return false
    }
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
          if (el.rating_star >= Number(this.mallTest.min_order_evaluation)) {
            return el
          }
        })
        return shopDatas
      } else {
        // this.$refs.Logs.writeLog(`商品评价获取失败${res.message}`, false)
        this.storeLog['log_message'].push(`商品评价获取失败${res.message}`)
        this.storeLog['created_at'] = this.formatTime(new Date().getTime())
        return []
      }
    }
}

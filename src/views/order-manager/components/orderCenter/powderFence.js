import MallManagerAPI from '@/module-api/market-activity-api/ai-addFence'
import { batchOperation, sleep } from '@/util/util'
import Vue from 'vue'
// let __this = new AutoAddFence()
let _this = null
export class AutoAddFence {
  mallTest = '' // 任务
  MallAPIInstance = new MallManagerAPI(new Vue())
  mallSearchList = [] // 店铺搜索列表
  storeLogList = {} //任务日志列表
  // 定时涨粉
  async autoAddFenceActive() {
    const siteList = ['MY', 'TW', 'VN', 'ID', 'PH', 'TH', 'SG', 'BR', 'MX', 'CO', 'CL', 'PL']
    for (const site of siteList) {
      const storeLog = {}
      storeLog['country'] = site
      storeLog['log_message'] = []
      const mallTest = await window.BaseUtilBridgeService.getAttentionUserTask(site)
      // 检测时间-执行任务
      if (mallTest.length) {
        console.log(mallTest)
        const curTime = new Date().getTime()
        const runTime = Number(mallTest[0].exec_time)
        this.runTesk(curTime - runTime, mallTest)
      }
    }
  }
  // 任务执行
  runTesk(getTime, mallTest) {
    //添加日志列表
    this.storeLogList[`${mallTest[0].country}`] = {}
    this.storeLogList[`${mallTest[0].country}`].log_message = []
    getTime = getTime > 0 ? 0 : 0 - getTime
    if (!getTime) {
      console.log('任务即将执行', mallTest[0].country, mallTest[0])
      this.storeLogList[`${mallTest[0].country}`].log_message.push({ option: `【${mallTest[0].country}】任务即将执行....`, activeTime: this.formatTime(new Date().getTime()) })
    } else {
      console.log('该任务还未到执行时间', mallTest[0].country, mallTest[0])
      this.storeLogList[`${mallTest[0].country}`].log_message.push({ option: `【${mallTest[0].country}】该任务还未到执行时间`, activeTime: this.formatTime(new Date().getTime()) })
    }
    setTimeout(async () => {
      // 更新任务时间 --日志
      await this.searchMall(mallTest[0]) // 搜索关注店铺
      await this.startCancer(mallTest[0]) // 开始searchMall关注
      // 更新新任务
      const params = {
        country: mallTest[0].country,
        mall_ids: mallTest[0].mall_ids,
        mall_names: mallTest[0].mall_names,
        product_max: mallTest[0].product_max,
        last_login_day: mallTest[0].last_login_day,
        open_hour: mallTest[0].open_hour,
        open_minute: mallTest[0].open_minute,
        key_word: mallTest[0].key_word,
        follow_number: mallTest[0].follow_number,
        follow_interval: mallTest[0].follow_interval,
        is_not_follow_min_order_evaluation: mallTest[0].is_not_follow_min_order_evaluation,
        min_order_evaluation: mallTest[0].min_order_evaluation,
        is_not_follow_followed_day: mallTest[0].is_not_follow_followed_day,
        followed_day: mallTest[0].followed_day,
        followed_type: mallTest[0].followed_type,
        cancel_follow_number: mallTest[0].cancel_follow_number,
        cancel_follow_sort_type: mallTest[0].cancel_follow_sort_type,
        exec_time: new Date().getTime()
      }
      const addTest = await window.BaseUtilBridgeService.saveAttentionUserTask(params)
      console.log('addTest', addTest)
      const addTest_ofTest = await window.BaseUtilBridgeService.getAttentionUserTask(mallTest[0].country)
      this.storeLogList[`${mallTest[0].country}`].task_id = addTest_ofTest[0].id
      this.storeLogList[`${mallTest[0].country}`].country = addTest_ofTest[0].country
      this.storeLogList[`${mallTest[0].country}`].created_at = this.formatTime(new Date().getTime())
      this.storeLogList[`${mallTest[0].country}`].log_message = JSON.stringify(this.storeLogList[`${mallTest[0].country}`].log_message)
      const resLog = await window.BaseUtilBridgeService.saveAttentionUserLog(this.storeLogList[`${mallTest[0].country}`])
      console.log('日志存储',resLog);
    }, getTime)
  }
  /**
   *执行方法
   *
   */
  // 时间格式转换
  add0(m) {
    return m < 10 ? '0' + m : m
  }
  formatTime(val) {
    const that=new AutoAddFence()
    var time = new Date(val)
    var y = time.getFullYear()
    var m = time.getMonth() + 1
    var d = time.getDate()
    var h = time.getHours()
    var mm = time.getMinutes()
    var s = time.getSeconds()
    return y + '-' + that.add0(m) + '-' + that.add0(d) + ' ' + that.add0(h) + ':' + that.add0(mm) + ':' + that.add0(s)
  }
  // 添加关注店铺--搜素店铺
  async searchMall(mallTest) {
    const maxPage = mallTest.mall_ids.split(',').length * 10 // 搜索店铺数
    let AllgoodsMalllist = []
    // 查询店铺
    console.log('正在查询关注店铺')
    this.storeLogList[`${mallTest.country}`].log_message.push({ option: `正在查询【${mallTest.key_word}】相关店铺....`, activeTime: this.formatTime(new Date().getTime()) })
    for (let i = 0; i < maxPage; i++) {
      const params = {}
      params['country'] = mallTest.country
      params['mallId'] = Number(mallTest.mall_ids.split(',')[0])
      params['newest'] = 60 * i
      params['keyword'] = mallTest.key_word
      params['min_order_evaluation'] = mallTest.min_order_evaluation
      const goodsMalllist = await this.searchMallInstance(params)
      if (!goodsMalllist.length) {
        //   this.$refs.Logs.writeLog(`暂无数据`, true)
        console.log('暂无数据')
        this.storeLogList[`${mallTest.country}`].log_message.push({ option: '暂无数据', activeTime: this.formatTime(new Date().getTime()) })
        return
      }
      // 店铺条件过滤
      const fansMallsList = await this.filterList(goodsMalllist, mallTest)
      if (fansMallsList.length) {
        AllgoodsMalllist.push(...fansMallsList)
        // 根据配置信息截取所需
        if (AllgoodsMalllist.length >= maxPage) {
          AllgoodsMalllist = AllgoodsMalllist.splice(0, maxPage) // 截取所需店铺
          break
        }
      } else {
        console.log('此关键词暂无更多数据！')
        this.storeLogList[`${mallTest.country}`].log_message.push({ option: '此关键词暂无更多数据！', activeTime: this.formatTime(new Date().getTime()) })
        break
      }
    }
    console.log('店铺搜索获取结束')
    this.storeLogList[`${mallTest.country}`].log_message.push({ option: '店铺搜索获取结束', activeTime: this.formatTime(new Date().getTime()) })
    this.mallSearchList = []
    AllgoodsMalllist.forEach(el => {
      el.item_basic.totalRate = el.item_basic.item_rating.rating_count.reduce(function(prev, curr, idx, arr) {
        return prev + curr
      })
      this.mallSearchList.push(el.item_basic)
    })
    console.log('店铺数据',this.mallSearchList);
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
    params['rating_filter'] = item.min_order_evaluation // 评分
    try {
      const res = await this.MallAPIInstance.addCancerMall(params)
      if (res.status === 200) {
        return JSON.parse(res.data).items
      } else {
        console.log(`店铺搜索请求失败,230-line:${res.status}`)
        //   this.$refs.Logs.writeLog(`店铺搜索请求失败,230-line:${res.status}`, false)
        this.storeLogList[`${item.country}`].log_message.push({ option: `店铺搜索请求失败,230-line:${res.status}`, activeTime: this.formatTime(new Date().getTime()) })
        return []
      }
    } catch (error) {
      console.log(`店铺搜索请求失败,234-line:${error}`)
      this.storeLogList[`${item.country}`].log_message.push({ option: `店铺搜索请求失败,234-line:${error}`, activeTime: this.formatTime(new Date().getTime()) })
      // this.$refs.Logs.writeLog(`店铺搜索请求失败,234-line:${error}`, false)
      return []
    }
  }
  // 添加关注店铺--店铺条件过滤
  async filterList(goodsMalllist, mallTest) {
    let getList = []
    const map = new Map()
    goodsMalllist.forEach(el => {
      // 去重
      if (!map.has(el.item_basic.itemid) && !map.has(el.item_basic.shopid)) {
        map.set(el.itemid, el)
      }
    })
    getList = [...map.values()]
    const product_max = Number(mallTest.product_max)
    const getList2 = getList.filter(el => {
      // 条件过滤
      const totalRate = el.item_basic.item_rating.rating_count.reduce(function(prev, curr, idx, arr) {
        return prev + curr
      }) // 评论总数求和
      if (
        Number(el.item_basic.liked_count) >= 100 &&
        Number(el.item_basic.liked_count) <= 10000 && // 点赞
        Number(el.item_basic.item_rating.rating_star.toFixed(2)) >= 4.5 &&
        Number(el.item_basic.item_rating.rating_star.toFixed(2)) <= 5 && // 评分
        totalRate >= 50 &&
        totalRate <= 5000 && // 评论
        el.item_basic.stock >= product_max // 库存
      ) {
        return el
      }
    })
    return getList2
  }
  // 开始关注---根据店铺获取粉丝或者用户信息
  // 开始关注---根据店铺获取粉丝或者用户信息
  async startCancer(mallTest) {
    //   this.$refs.Logs.writeLog(`数据正在处理......`, true)
    if (this.mallSearchList.length<=0) {
      // 当前关键词暂无数据
      console.log(mallTest.country + `当前关键词【${mallTest.key_word}】暂无数据`)
      this.storeLogList[`${mallTest.country}`].log_message.push({ option: `当前关键词【${mallTest.key_word}】暂无数据`, activeTime: this.formatTime(new Date().getTime()) })
      return
    }
    // 组装tablelist
    const platform_mall_idList = mallTest.mall_ids.split(',')
    const mall_namesList = mallTest.mall_names.split(',')
    const mallIDlist = this.mallSearchList.map(el => {
      return el.shopid
    })
    const tableList = platform_mall_idList.map((el, index) => {
        const item={}
        item.platform_mall_id= el,
        item.mall_alias_name= mall_namesList[index],
        item.country= mallTest.country,
        item.mallIDlist=mallIDlist,
        item.Tesk_follow_number= mallTest.follow_number,
        item.followed_type=mallTest.followed_type,
        item.follow_interval= mallTest.follow_interval,
        item.last_login_day= mallTest.last_login_day,
        item.min_order_evaluation=mallTest.min_order_evaluation
        return item
    })
    // log 数据正在处理
    console.log('开始处理关注店铺数据......')
    _this = this
    this.storeLogList[`${mallTest.country}`].log_message.push({ option: `开始处理关注店铺数据......`, activeTime: this.formatTime(new Date().getTime()) })
    await batchOperation(tableList, this.getFllowerInfo)
    this.storeLogList[`${mallTest.country}`].log_message.push({ option: `【${mallTest.country}】数据处理结束`, activeTime: this.formatTime(new Date().getTime()) })
    console.log(`【${mallTest.country}】数据处理结束`)
    // log 数据处理结束
  }
  // 开始关注---筛选粉丝
  async getFllowerInfo(mall, count = { count: 1 }) {
    try {
    //  const that=new AutoAddFence()
      const followermallIDList = mall.mallIDlist
      mall.following=0
      mall.fence=0
      mall.newFollow=0
      mall.cancerFollow=0
      mall.state='-'
      // this.$set(mall, 'following', 0)
      // this.$set(mall, 'fence', 0)
      // this.$set(mall, 'newFollow', 0)
      // this.$set(mall, 'cancerFollow', 0)
      // this.$set(mall, 'state', '-')
      // this.$refs.Logs.writeLog(`正在查询【${mall.mall_alias_name || mall.platform_mall_name}】店铺关注信息`)
      // 判断HOME店铺未登录（方法里已打印了日志）
      const islogined = await _this.isLoginFun(mall)
      console.log();
      if (!islogined) {
        return
      }
      // 获取HOME店铺数据
      const resMall = await _this.getHomeMallData(mall)
      // _this.$set(mall, 'following', resMall ? resMall.account.following_count : 0)
      // _this.$set(mall, 'fence', resMall ? resMall.follower_count : 0)
      if (!resMall) {
        console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺暂无数据`)
        _this.storeLogList[`${mall.country}`].log_message.push({ option: `【${mall.mall_alias_name || mall.platform_mall_name}】店铺暂无数据`, activeTime: _this.formatTime(new Date().getTime()) })
        return
      }
      // 获取HOME店铺关注数据
      // const allhomeFollowringList = await this.getHomeFollowingList(mall, resMall.account.following_count)
      // this.storeLogList[`${mallTest[0].country}`]['log_message'].push(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺关注用户数：【${allhomeFollowringList.length}】`)
      // this.storeLog['created_at'] = this.formatTime(new Date().getTime())
      // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺关注用户数：【${allhomeFollowringList.length}】`, true)
      // console.log('621', allhomeFollowringList)

      // 遍历关注店铺
      let totalMallFollow = mall.newFollow
      for (const followermallID of followermallIDList) {
        if (_this.isStop) {
          return
        }
        // 接口请求擦参数
        const params = {}
        params['country'] = mall.country
        params['mallId'] = mall.platform_mall_id
        params['shopid'] = followermallID
        if (mall.followed_type === '0') {
          // 关注店铺粉丝
          console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】正在获取${followermallID}店铺粉丝信息`)
          _this.storeLogList[`${mall.country}`].log_message.push({
            option: `【${mall.mall_alias_name || mall.platform_mall_name}】正在获取${followermallID}店铺粉丝信息`,
            activeTime: _this.formatTime(new Date().getTime())
          })
          let flag = true
          // 关注第一页粉丝
          params['offset'] = 0
          let ALLshopDatas = await _this.GetShopLikes(params) // 获取粉丝信息
          console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】获取第${params.offset / 20 + 1}页粉丝`)
          _this.storeLogList[`${mall.country}`].log_message.push({
            option: `【${mall.mall_alias_name || mall.platform_mall_name}】获取第${params.offset / 20 + 1}页粉丝`,
            activeTime: _this.formatTime(new Date().getTime())
          })
          for (const shop of ALLshopDatas) {
            if (_this.isStop) {
              return
            }
            const lineUser = await _this.filterShopDatas(ALLshopDatas, mall.country, mall.platform_mall_id) // 筛选活跃粉丝
            if (!lineUser) {
              continue
            }
            // if (allhomeFollowringList.length) { // HOME店铺是否有关注的粉丝
            //   const Followindex = allhomeFollowringList.findIndex(el => { return el.ShopId === shop.ShopId }) // 新增粉丝与已关注粉丝查重
            //   if (Followindex >= 0) {
            //     continue
            //   }
            // }
            //查询壳内数据
            const isFollowed = await window.BaseUtilBridgeService.getAttentionUser(mall.country, mall.platform_mall_id.toString(), shop.ShopId)
            if (isFollowed.attention_shop_id) {
              continue
            }
            const isFollow = await _this.runAttention(shop, mall, followermallID) // 开始关注
            if (isFollow) {
              totalMallFollow++
              //存储数据到壳内
              const saveShopID = await BaseUtilBridgeService.saveAttentionUser({ country: mall.country, mall_id: mall.platform_mall_id.toString(), attention_shop_id: shop.ShopId })
            } else {
              // this.$set(mall, 'newFollow', totalMallFollow)
              // this.$set(mall, 'state', '关注失败')
              console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败`)
              _this.storeLogList[`${mall.country}`].log_message.push({
                option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败`,
                activeTime: _this.formatTime(new Date().getTime())
              })
              flag = false
              continue
            }
            if (Number(mall.Tesk_follow_number)) {
              // 有数量限制关注
              if (totalMallFollow >= Number(mall.Tesk_follow_number)) {
                //   this.$set(mall, 'newFollow', totalMallFollow)
                //   this.$set(mall, 'state', '关注成功')
                return
              }
            } else {
              if (mall.following + totalMallFollow >= 3000) {
                console.log('关注已达上限')
                _this.storeLogList[`${mall.country}`].log_message.push({ option: `【${mall.mall_alias_name || mall.platform_mall_name}】新增关注${totalMallFollow}个`, activeTime: _this.formatTime(new Date().getTime()) })
                _this.storeLogList[`${mall.country}`].log_message.push({ option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限`, activeTime: _this.formatTime(new Date().getTime()) })
                return
              }
            }
          }
          console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】新增关注${totalMallFollow}个`)
          _this.storeLogList[`${mall.country}`].log_message.push({ option: `【${mall.mall_alias_name || mall.platform_mall_name}】新增关注${totalMallFollow}个`, activeTime: _this.formatTime(new Date().getTime()) })

          // this.$set(mall, 'newFollow', totalMallFollow)
          // 关注更多粉丝
          while (flag) {
            if (_this.isStop) {
              return
            }
            params['offset'] += 20
            ALLshopDatas = await _this.GetShopLikes(params)
            console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】获取第${params.offset / 20 + 1}页粉丝数据`)
            _this.storeLogList[`${mall.country}`].log_message.push({
              option: `【${mall.mall_alias_name || mall.platform_mall_name}】获取第${params.offset / 20 + 1}页粉丝数据`,
              activeTime: _this.formatTime(new Date().getTime())
            })
            //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】获取第${(params.offset / 20) + 1}页粉丝数据`)
            
            for (let index = 0; index < ALLshopDatas.length; index++) {
              if (_this.isStop) {
                return
              }
              const shop = ALLshopDatas[index]
              const lineUser = await _this.filterShopDatas(shop, mall.country, mall.platform_mall_id, mall.last_login_day) // 筛选活跃粉丝
              if (!lineUser) {
                continue
              }
              // if (allhomeFollowringList.length) { // HOME店铺是否有关注的粉丝
              //   const Followindex = allhomeFollowringList.findIndex(el => { return el.ShopId === shop.ShopId }) // 新增粉丝与已关注粉丝查重
              //   if (Followindex >= 0) {
              //     continue
              //   }
              // }
              //查询壳内数据
              const isFollowed = await window.BaseUtilBridgeService.getAttentionUser(mall.country, mall.platform_mall_id.toString(), shop.ShopId)
              if (isFollowed.attention_shop_id) {
                continue
              }
              const isFollow = await _this.runAttention(shop, mall, followermallID)
              if (isFollow) {
                totalMallFollow++
                //存储数据到壳内
                const saveShopID = await BaseUtilBridgeService.saveAttentionUser({ country: mall.country, mall_id: mall.platform_mall_id.toString(), attention_shop_id: shop.ShopId })
              } else {
                //   this.$set(mall, 'newFollow', totalMallFollow)
                //   this.$set(mall, 'state', '关注失败')
                //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,`, false)
                console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败`)
                _this.storeLogList[`${mall.country}`].log_message.push({
                  option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败`,
                  activeTime: _this.formatTime(new Date().getTime())
                })
                continue
              }
              if (Number(mall.Tesk_follow_number)) {
                // 有数量限制关注
                if (totalMallFollow >= Number(mall.Tesk_follow_number)) {
                  // this.$set(mall, 'newFollow', totalMallFollow)
                  // this.$set(mall, 'state', '关注成功')
                  // console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}成功`)
                  // _this.storeLogList[`${mall.country}`].log_message.push({
                  //   option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}成功`,
                  //   activeTime: _this.formatTime(new Date().getTime())

                  // })
                  console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个粉丝`);
                  _this.storeLogList[`${mall.country}`].log_message.push({
                    option: `【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个粉丝`,
                    activeTime: _this.formatTime(new Date().getTime())
                    
                  })
                  return
                }
              } else {
                if (mall.following + totalMallFollow >= 3000) {
                  // this.$set(mall, 'newFollow', totalMallFollow)
                  // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限,`, true)
                  console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个`)
                  console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限`)

                  _this.storeLogList[`${mall.country}`].log_message.push({
                    option: `【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个`,
                    activeTime: _this.formatTime(new Date().getTime())
                  })
                  _this.storeLogList[`${mall.country}`].log_message.push({
                    option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限`,
                    activeTime: _this.formatTime(new Date().getTime())
                  })
                  // flag = false
                  // break
                  return
                }
              }
            }
            if (ALLshopDatas.length < 20) {
              // this.$refs.Logs.writeLog(`【${followermallID}】查找结束`)
              console.log(`【${followermallID}】查找结束`)
              _this.storeLogList[`${mall.country}`].log_message.push({ option: `【${followermallID}】查找结束`, activeTime: _this.formatTime(new Date().getTime()) })
              flag = false
            }
            //   this.$set(mall, 'newFollow', totalMallFollow)
            console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个`)
            _this.storeLogList[`${mall.country}`].log_message.push({
              option: `【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个`,
              activeTime: _this.formatTime(new Date().getTime())
            })
            // 任务执行间隔时间
            await sleep(Number(mall.follow_interval) * 1000)
          }
          // this.$set(mall, 'state', '操作结束')
          // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】成功关注${totalMallFollow}个粉丝`)
          console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】操作结束`)
          console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个`)
          _this.storeLogList[`${mall.country}`].log_message.push({
            option: `【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个`,
            activeTime: _this.formatTime(new Date().getTime())
          })
          _this.storeLogList[`${mall.country}`].log_message.push({ option: `【${mall.mall_alias_name || mall.platform_mall_name}】操作结束`, activeTime: that.formatTime(new Date().getTime()) })
        } else {
          // this.$refs.Logs.writeLog(`正在获取评价用户信息`, true)
          console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】正在获取评价用户信息`)
          _this.storeLogList[`${mall.country}`].log_message.push({
            option: `【${mall.mall_alias_name || mall.platform_mall_name}】正在获取评价用户信息`,
            activeTime: _this.formatTime(new Date().getTime())
          })
          // 关注评价用户
          let flag2 = true
          let RateCustomList = []
          const itemIDindex = _this.mallSearchList.findIndex(el => {
            return el.shopid === Number(followermallID)
          })
          const itemID = _this.mallSearchList[itemIDindex].itemid
          // 关注第一页评价用户
          let offset = 0
          // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】获取${followermallID}第【${(offset / 52) + 1}】页评价用户`)
          _this.storeLogList[`${mall.country}`].log_message.push({
            option: `【${mall.mall_alias_name || mall.platform_mall_name}】获取${followermallID}第【${offset / 52 + 1}】页评价用户`,
            activeTime: _this.formatTime(new Date().getTime())
          })
          RateCustomList = await _this.GetShopComment(itemID, followermallID, mall, offset)
          if (!RateCustomList.length) {
            _this.storeLogList[`${mall.country}`].log_message.push({ option: `${followermallID}暂无用户评价`, activeTime: _this.formatTime(new Date().getTime()) })
            continue
          }
          for (let j = 0; j < RateCustomList.length; j++) {
            const RateCustom = RateCustomList[j]
            const shop = {}
            shop['ShopId'] = RateCustom.author_shopid
            shop['UserName'] = RateCustom.author_username

            // if (allhomeFollowringList.length) { // HOME店铺是否有关注的粉丝
            //   const Followindex = allhomeFollowringList.findIndex(el => { return Number(el.ShopId) === Number(shop.ShopId) }) // 新增粉丝与已关注粉丝查重
            //   if (Followindex >= 0) {
            //     continue
            //   }
            // }
            //查询壳内数据
            const isFollowed = await window.BaseUtilBridgeService.getAttentionUser(mall.country, mall.platform_mall_id.toString(), shop.ShopId)
            if (isFollowed.attention_shop_id) {
              continue
            }
            const isFollow = await _this.runAttention(shop, mall, RateCustom.shopid) // 开始关注
            if (isFollow) {
              totalMallFollow++
              //存储数据到壳内
              const saveShopID = await BaseUtilBridgeService.saveAttentionUser({ country: mall.country, mall_id: mall.platform_mall_id.toString(), attention_shop_id: shop.ShopId })
            } else {
              _this.storeLogList[`${mall.country}`].log_message.push({
                option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败`,
                activeTime: _this.formatTime(new Date().getTime())
              })
              flag2 = false
              continue
            }
            if (Number(mall.Tesk_follow_number)) {
              // 有数量限制关注
              if (totalMallFollow >= Number(mall.Tesk_follow_number)) {
                //   this.$set(mall, 'newFollow', totalMallFollow)
                //   this.$set(mall, 'state', '关注成功')
                _this.storeLogList[`${mall.country}`].log_message.push({
                  option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注成功`,
                  activeTime: _this.formatTime(new Date().getTime())
                })
                return
              }
            } else {
              if (mall.following + totalMallFollow >= 3000) {
                //   this.$set(mall, 'newFollow', totalMallFollow)
                //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限,`, true)
                _this.storeLogList[`${mall.country}`].log_message.push({
                  option: `【${mall.mall_alias_name || mall.platform_mall_name}】新增${totalMallFollow}个`,
                  activeTime: _this.formatTime(new Date().getTime())
                })
                _this.storeLogList[`${mall.country}`].log_message.push({
                  option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限`,
                  activeTime: _this.formatTime(new Date().getTime())
                })
                // flag2 = false
                return
              }
            }
          }
          _this.$set(mall, 'newFollow', totalMallFollow)
          // 关注更多评价用户
          while (flag2) {
            if (_this.isStop) {
              return
            }
            offset += 52
            //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】获取${followermallID}第【${(offset / 52) + 1}】页评价用户`)
            _this.storeLogList[`${mall.country}`].log_message.push({
              option: `【${mall.mall_alias_name || mall.platform_mall_name}】获取${followermallID}第【${offset / 52 + 1}】页评价用户`,
              activeTime: _this.formatTime(new Date().getTime())
            })
            RateCustomList = await _this.GetShopComment(itemID, followermallID, mall, offset)
            for (let j = 0; j < RateCustomList.length; j++) {
              if (_this.isStop) {
                return
              }
              const RateCustom = RateCustomList[j]
              const shop = {}
              shop['ShopId'] = RateCustom.shopid
              shop['UserName'] = RateCustom.author_username
              // if (allhomeFollowringList.length) { // HOME店铺是否有关注的粉丝
              //   const Followindex = allhomeFollowringList.findIndex(el => { return el.ShopId === shop.ShopId }) // 新增粉丝与已关注粉丝查重
              //   if (Followindex >= 0) {
              //     continue
              //   }
              // }
              //查询壳内数据
              const isFollowed = await window.BaseUtilBridgeService.getAttentionUser(mall.country, mall.platform_mall_id.toString(), shop.ShopId)
              if (isFollowed.attention_shop_id) {
                continue
              }
              const isFollow = await _this.runAttention(shop, mall, followermallID) // 开始关注
              if (isFollow) {
                totalMallFollow++
                //存储数据到壳内
                const saveShopID = await BaseUtilBridgeService.saveAttentionUser({ country: mall.country, mall_id: mall.platform_mall_id.toString(), attention_shop_id: shop.ShopId })
              } else {
                _this.storeLogList[`${mall.country}`].log_message.push({
                  option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败`,
                  activeTime: _this.formatTime(new Date().getTime())
                })
                //   this.$set(mall, 'newFollow', totalMallFollow)
                //   this.$set(mall, 'state', '关注失败')
                //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,`, false)
                continue
              }
              if (Number(mall.Tesk_follow_number)) {
                // 有数量限制关注
                if (totalMallFollow >= Number(mall.Tesk_follow_number)) {
                  // this.$set(mall, 'newFollow', totalMallFollow)
                  // this.$set(mall, 'state', '关注成功')
                  _this.storeLogList[`${mall.country}`].log_message.push({
                    option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注成功`,
                    activeTime: _this.formatTime(new Date().getTime())
                  })
                  return
                }
              } else {
                if (mall.following + totalMallFollow >= 3000) {
                  // this.$set(mall, 'newFollow', totalMallFollow)
                  // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限,`, true)
                  _this.storeLogList[`${mall.country}`].log_message.push({
                    option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注已达上限`,
                    activeTime: _this.formatTime(new Date().getTime())
                  })
                  // flag2 = false
                  // break
                  return
                }
              }
            }
            if (RateCustomList.length < 52) {
              // this.$refs.Logs.writeLog(`【${followermallID}】查找结束`)
              _this.storeLogList[`${mall.country}`].log_message.push({ option: `【${mall.mall_alias_name || mall.platform_mall_name}】查找结束`, activeTime: _this.formatTime(new Date().getTime()) })
              flag2 = false
            }
            //   this.$set(mall, 'newFollow', totalMallFollow)
            await sleep(Number(mall.follow_interval) * 1000)
          }
          // this.$set(mall, 'state', '操作结束')
          // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】成功关注${totalMallFollow}个粉丝`)
          _this.storeLogList[`${mall.country}`].log_message.push({
            option: `【${mall.mall_alias_name || mall.platform_mall_name}】成功关注${totalMallFollow}个粉丝`,
            activeTime: _this.formatTime(new Date().getTime())
          })
          _this.storeLogList[`${mall.country}`].log_message.push({ option: `【${mall.mall_alias_name || mall.platform_mall_name}】操作结束`, activeTime: _this.formatTime(new Date().getTime()) })
        }
      }
      _this.storeLogList[`${mall.country}`].log_message.push({ option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注结束`, activeTime: _this.formatTime(new Date().getTime()) })
    } catch (e) {
      console.log(e);
      _this.storeLogList[`${mall.country}`].log_message.push({ option: `用户信息获取失败-line373，${e}`, activeTime: _this.formatTime(new Date().getTime()) })
    } finally {
      --count.count
    }
  }
     // 判断用户是否登录
  async isLoginFun(mall) {
      const res = await _this.MallAPIInstance.isLogin(mall)
      if (res.code === 200 && res.data) {
        return true
      } else {
        console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺未登录`)
        _this.storeLogList[`${mall.country}`].log_message.push({ option: `【${mall.mall_alias_name || mall.platform_mall_name}】店铺未登录`, activeTime: _this.formatTime(new Date().getTime()) })
        return false
      }
    }
  // 获取HOME店铺数据
  async getHomeMallData(mall) {
    const params = {}
    params['country'] = mall.country
    params['mallId'] = mall.platform_mall_id
    const resUser = await _this.MallAPIInstance.UserProfile(params) // 获取userName
    if (resUser.code === 200) {
      const userName = resUser.data.username
      params['username'] = userName
      const resMall = await _this.MallAPIInstance.getHomeMallinfo(params)
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
    const res = await _this.MallAPIInstance.getFllower(params)
    if (res.code === 200) {
      return res.data
    } else {
      // this.$refs.Logs.writeLog(`粉丝获取失败，${res.message}`, false)
      _this.storeLogList[`${item.country}`].log_message.push({ option: `粉丝获取失败`, activeTime: _this.formatTime(new Date().getTime()) })
      console.log(`粉丝获取失败，${res.message}`)
      return []
    }
  }
  // 筛选活跃关注()
  async filterShopDatas(shop, country, platform_mall_id, last_login_day) {
    const activetime = await _this.getActiveUser({ country: country, mallId: platform_mall_id, userName: shop.UserName })
    const nowTime = new Date(new Date().toLocaleDateString()).getTime()
    const setTime = nowTime - nowTime * (Number(last_login_day) - 1)
    if (activetime > setTime) {
      return true
    } else {
      return false
    }
  }
   // 获取店铺活跃时间
   async getActiveUser(user) {
    const params = {}
    // 获取店铺粉丝
    params['country'] = user.country
    params['mallId'] = user.mallId
    params['username'] = user.userName
    const res = await _this.MallAPIInstance.getActiveTimeFollower(params)
    if (res.code === 200) {
      return Number(res.data.last_active_time) * 1000
    } else {
      _this.$refs.Logs.writeLog(`店铺活跃状态获取失败:${res.message}`, false)
      return ''
    }
  }
  // 关注用户
  async runAttention(shop, mall, followermallID) {
    const param = {}
    param['country'] = mall.country
    param['mallId'] = mall.platform_mall_id
    param['userShopid'] = shop.ShopId
    param['followMallID'] = followermallID
    const res = await _this.MallAPIInstance.buyerFollow(param)
    console.log('关注',res);
    if (res.code !== 200) {
      console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`);
      _this.storeLogList[`${mall.country}`].log_message.push({
        option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`,
        activeTime: _this.formatTime(new Date().getTime())
      })
      // this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`, false)
    } else {
      if (res.data) {
        console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}成功`)
        _this.storeLogList[`${mall.country}`].log_message.push({
          option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}成功`,
          activeTime: _this.formatTime(new Date().getTime())
        })
        //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}成功`, true)
        return true
      } else {
        //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`, false)
        console.log(`【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`);
        _this.storeLogList[`${mall.country}`].log_message.push({
          option: `【${mall.mall_alias_name || mall.platform_mall_name}】关注${shop.UserName}失败,${res.message}`,
          activeTime: _this.formatTime(new Date().getTime())
        })
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
    const res = await _this.MallAPIInstance.getShoppComment(params)
    if (res.code === 200) {
      const array = res.data.ratings || []
      // 用户设置的评论星级筛选
      const shopDatas = array.filter(el => {
        if (el.rating_star >= Number(mall.min_order_evaluation)) {
          return el
        }
      })
      return shopDatas
    } else {
      // _this.$refs.Logs.writeLog(`商品评价获取失败${res.message}`, false)
      console.log(`商品评价获取失败${res.message}`)
      _this.storeLogList[`${mall.country}`].log_message.push({ option: `商品评价获取失败${res.message}`, activeTime: that.formatTime(new Date().getTime()) })
      return []
    }
  }
}

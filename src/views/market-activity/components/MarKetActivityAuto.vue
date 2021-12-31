<template>
  <div class="auto-order">
    <Logs ref="Logs" v-model="showlog" clear class="logBox" />
  </div>
</template>
<script>
import MarketManagerAPI from '../../../module-api/market-manager-api/market-data'
import GoodsList from '../../../module-api/goods-manager-api/goods-list'
import { GoodsMallgetValue, getMalls, batchOperation } from '../../../util/util'
export default {
  data() {
    return {
      showlog: false,
      page: 0,
      total: 0,
      topHistoryMsg: [],
      GoodsList: new GoodsList(this),
      MarketManagerAPIInstance: new MarketManagerAPI(this),
      shopAccountList: []

    }
  },
  mounted() {
    // 10分钟后运行，每隔两个小时运行一次
    setTimeout(() => {
      getMalls().then(res => {
        this.shopAccountList = res
        this.getTopTest()
      })
      setInterval(() => {
        getMalls().then(res => {
          this.shopAccountList = res
          this.getTopTest()
        })
      }, 2 * 60 * 60 * 1000)
    }, 10 * 60 * 1000)
  },
  methods: {
  // 获取置顶任务
    async getTopTest() {
      this.showlog = false
      this.$refs.Logs.writeLog(`正在获取置顶任务......`)
      const res = await this.$api.topTask()
      if (res.data.code === 200) {
        this.page = res.data.data.current_page
        this.total = res.data.data.total
        const list = res.data.data.data
        // 校验店铺
        this.topHistoryMsg.push({ topHistoryMsg: '置顶任务创建成功' })
        const res1 = await batchOperation(list, this.checkMall)
      } else {
        this.$message.error(`任务获取失败--${res.message}`, false)
      }
    },
    // 校验店铺
    async checkMall(item, count = { count: 1 }) {
      try {
        const mallName = GoodsMallgetValue(this.shopAccountList, 'label', 'value', item.sys_mall_id)
        // 店铺校验
        if (!mallName) {
          this.$refs.Logs.writeLog(`【${item.sys_mall_id}】店铺不存在`, false)
          this.topHistoryMsg.push({ topHistoryMsg: '店铺不存在' })
          return
        }
        const nextTopTime = new Date(item.next_top_time).getTime()
        const currentTime = new Date().getTime()
        // 时间校验
        if (nextTopTime > currentTime) {
          this.$refs.Logs.writeLog(`【${mallName}】店铺,未到置顶时间`)
          this.topHistoryMsg.push({ topHistoryMsg: '未到置顶时间，下次置顶时间为' + item.next_top_time })
          return
        }
        // 商品校验
        if (Number(item.top_total_count) <= Number(item.toped_count)) {
          this.$refs.Logs.writeLog(`【${mallName}】店铺,已置顶完所有商品`)
          this.topHistoryMsg.push({ topHistoryMsg: '已置顶完所有商品' })
          return
        }
        // 通过其他维度获取商品-置顶
        if (Number(item.top_type) !== 1) {
          item.page = 1
          item.mallName = mallName
          this.getMallTopGoods(item)
          // const res1 = await batchOperation(item, this.getMallTopGoods)
        }
        // 通过商品ID置顶
      } catch (error) {
        this.$refs.Logs.writeLog(`catch--【${item.sys_mall_id}】,${error}`, false)
      } finally {
        count.count--
      }
    },
    // 获取置顶商品
    async getMallTopGoods(val) {
      const mItem = {
        country: val.country,
        pageNumber: val.page,
        platform_mall_id: val.sys_mall_id
      }
      const params = {
        mItem: mItem,
        pageSize: 48,
        listType: 'all'
        // listOrderType: ''
      }
      // if (val.top_type === '2') {
      //   params.listOrderType = ''
      // }
      if (val.top_type === '3') {
        params.listOrderType = 'sales_asc'
      }
      if (val.top_type === '4') {
        params.listOrderType = 'sales_dsc'
      }
      if (val.top_type === '5') {
        params.listOrderType = 'price_asc'
      }
      if (val.top_type === '6') {
        params.listOrderType = 'price_dsc'
      }
      //   this.topHistoryMsg.push({ topHistoryMsg: '正在获取商品数据' })
      this.$refs.Logs.writeLog(`获取店铺【${val.mallName}】商品数据`, true)
      const loop = Number(val.top_total_count) <= 48 ? 1 : Math.floor(Number(val.top_total_count) / 48) + 1
      const resultList = []
      for (let i = 0; i < loop; i++) {
        params.mItem.pageNumber = i + 1
        try {
          this.$refs.Logs.writeLog(`获取店铺【${val.mallName}】商品数量为${(i + 1) * 48},正在获取第${i + 1}页数据`, true)
          const res = await this.GoodsList.getMpskuList(params)
          if (res.code === 200) {
            if (!res.data.list?.length) {
              this.$refs.Logs.writeLog(`店铺【${val.mallName}】暂无商品数据`)
              return
            }
            resultList.push(...res.data.list)
          } else {
            this.$refs.Logs.writeLog(`获取店铺【${val.mallName}】商品数量为${(i + 1) * 48},第${i + 1}页数据获取失败,${res.data}`, false)
            return
          }
        } catch (error) {
          this.$refs.Logs.writeLog(`获取店铺【${val.mallName}】商品数量为${(i + 1) * 48},第${i + 1}页数据获取失败,catch---${error}`, false)
          return
        }
      }
      this.$refs.Logs.writeLog(`店铺【${val.mallName}】商品数据获取结束`, true)
      const loopGoodsNum = [] // 置顶的商品数
      const topedNum = val.top_good_ids.split(',')
      resultList.forEach(el => {
        el.country = val.country
        el.sys_mall_id = val.sys_mall_id
        el.topTaskId = val.id
        el.mallName = val.mallName
        el.top_total_count = val.top_total_count
        el.toped_count = val.toped_count
        const num = topedNum.findIndex(ol => { return Number(ol) === el.id })
        const aa = (val.top_total_count - val.toped_count) > 5 ? 5 : (val.top_total_count - val.toped_count)
        if (loopGoodsNum.length < aa && num < 0) {
          loopGoodsNum.push(el)
        }
      })
      debugger
      const res1 = await batchOperation(loopGoodsNum, this.topAction)
    },
    // 置顶步骤
    async topAction(item, count = { count: 1 }) {
      try {
        // 置顶商品
        const query = {
          country: item.country,
          mallId: item.sys_mall_id,
          goodsID: item.id
        }
        const topServiceQuery = {
          list: [{
            topTaskId: item.topTaskId.toString(),
            topGoods: [{
              goodsId: item.id.toString(),
              isTop: 0
            }]
          }]
        }
        const res1 = await this.MarketManagerAPIInstance.topGoods(query)
        if (res1.ecode === 0) {
          topServiceQuery.list[0].topGoods.isTop = 1
          this.$refs.Logs.writeLog(`店铺【${item.mallName}】商品【${item.sys_mall_id}】置顶成功`, true)
          this.topHistoryMsg.push({ topHistoryMsg: '店铺【${val.mallname}】商品【${val.sys_mall_id}】置顶成功' })
          item.toped_count = item.toped_count + 1
        } else {
          this.$refs.Logs.writeLog(`店铺【${item.mallName}】商品【${item.sys_mall_id}】置顶失败${res1.message}`, false)
          this.topHistoryMsg.push({ topHistoryMsg: `店铺【${item.mallname}】商品【${item.sys_mall_id}】】置顶失败${res1.message}` })
        }

        // 上报置顶商品
        const res2 = await this.$api.uploadTopGood(topServiceQuery)
        if (res2.data.code !== 200) {
          this.$refs.Logs.writeLog(`【商品${item.id}】上报置顶商品失败，${res2.data.data.errors}`, false)
        //   this.topHistoryMsg.push({ topHistoryMsg: `上报置顶商品失败${res2.data.data.errors}` })
        }
        // this.topHistoryMsg.push({ topHistoryMsg: '上报置顶商品成功' })
        this.$refs.Logs.writeLog(`【商品${item.id}】上报置顶商品成功`, true)
        if (item.toped_count >= item.top_total_count) { this.topHistoryMsg.push({ topHistoryMsg: '已置顶完所有商品' }) }
        // 上报置顶商品历史记录
        const params3 = {
          list: [{
            topTaskId: item.topTaskId.toString(),
            // topHistory: this.topHistoryMsg
            topHistory: this.topHistoryMsg
          }]
        }
        const res3 = await this.$api.uploadTopHistory(params3)
        if (res3.data.code !== 200) {
          this.$refs.Logs.writeLog(`【商品${item.id}】上报置顶商品历史记录失败，${res3.data.message}`, false)
        } else {
          debugger
          this.$refs.Logs.writeLog(`【商品${item.id}】上报置顶商品历史记录成功`, true)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`【商品${item.id}】置顶失败----catch${error}`, false)
      } finally {
        count.count--
      }
    }
  }
}
</script>
<style lang="less" scoped>
.auto-order {
  /deep/.showLogBox {
    height: 600px;
    width: 800px;
    bottom: 100px;
    .consoleBox {
      height: 600px;
      width: 800px;
    }
  }
}
</style>

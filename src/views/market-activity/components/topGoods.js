import MallManagerAPI from '@/module-api/market-activity-api/ai-addFence'
import MarketManagerAPI from '../../../module-api/market-manager-api/market-data'
import Vue from 'vue'

export class topGoods {
  MallAPIInstance = new MallManagerAPI(new Vue())
  MarketManagerAPIInstance=new MarketManagerAPI(new Vue())

  // 时间格式转换
  add0(m) { return m < 10 ? '0' + m : m }
  formatTime(val) {
    var time = new Date(val)
    var y = time.getFullYear()
    var m = time.getMonth() + 1
    var d = time.getDate()
    var h = time.getHours()
    var mm = time.getMinutes()
    var s = time.getSeconds()
    return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
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
  // 置顶商品
  async topAction(item) {
    const query = {
      country: item.country,
      mallId: item.sys_mall_id,
      goodsID: item.id
    }
    console.log('置顶', item)
    const res = await this.MarketManagerAPIInstance.topGoods(query)
    if (res.ecode === 0) {
      // 上报历史记录
      await window.BaseUtilBridgeService.saveTopGoodsHistory({
        'country': item.country,
        'mall_name': item.mall_name,
        'mall_id': item.sys_mall_id,
        'log_time': this.formatTime(new Date().getTime()),
        'log_message': '商品置顶成功'
      })
      console.log('topAction-商品置顶suc')
      return true
    } else {
      // 上报历史记录
      await window.BaseUtilBridgeService.saveTopGoodsHistory({
        'country': item.country,
        'mall_name': item.mall_name,
        'mall_id': item.sys_mall_id,
        'log_time': this.formatTime(new Date().getTime()),
        'log_message': `商品【${item.id}】置顶失败${res.message}`
      })
      console.log('topAction-商品置顶fail')
      return false
    }
  }
  // 获取任务
  async init() {
    const alltest = await window.BaseUtilBridgeService.getTopGoodsTask('all')
    if (!alltest.length) {
      console.log('暂无任务')
      return
    }
    for (const mall of alltest) {
      // 判断店铺登录
      const islogin = await this.isLogin({ platform_mall_id: mall.mall_id, country: mall.country })
      if (!islogin) {
        await window.BaseUtilBridgeService.saveTopGoodsHistory({ // 历史记录
          'country': mall.country,
          'mall_name': mall.mall_name,
          'mall_id': mall.mall_id,
          'log_time': this.formatTime(new Date().getTime()),
          'log_message': `店铺未登录`
        })
        console.log('登录未登录')
        return
      }
      // 是否到了任务执行时间
      const runTime = new Date(mall.next_top_time).getTime()
      if (runTime > new Date().getTime()) {
        console.log(mall.country + '未到执行时间')
        await window.BaseUtilBridgeService.saveTopGoodsHistory({ // 历史记录
          'country': mall.country,
          'mall_name': mall.mall_name,
          'mall_id': mall.mall_id,
          'log_time': this.formatTime(new Date().getTime()),
          'log_message': `未到置顶时间`
        })
        return
      }
      // 查询未置顶的商品
      const willTopGoods =
      console.log('查询未置顶的商品', willTopGoods)
      if (!willTopGoods.length) {
        console.log('以置顶完所有商品')
        await window.BaseUtilBridgeService.saveTopGoodsHistory({ // 历史记录
          'country': mall.country,
          'mall_name': mall.mall_name,
          'mall_id': mall.mall_id,
          'log_time': this.formatTime(new Date().getTime()),
          'log_message': `以置顶完所有商品`
        })
        return
      }
      const getwillTopGoods = willTopGoods.splice(0, 4)
      // 更新置顶记录 && 置顶
      for (const goods of getwillTopGoods) {
        console.log('更新置顶商品状态', goods)
        const res_saveTopGoods = await window.BaseUtilBridgeService.saveTopGoods({
          mall_id: mall.mall_id,
          goods_id: goods.goods_id,
          is_top: '1'
        })
        console.log('更新置顶商品状态-result', res_saveTopGoods)
        console.log('置顶商品')
        await this.topAction({
          country: mall.country,
          sys_mall_id: mall.mall_id,
          id: goods.goods_id,
          mall_name: mall.mall_name
        })
      }
    }
  }
}

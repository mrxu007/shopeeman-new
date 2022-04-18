import MallManagerAPI from '@/module-api/market-activity-api/ai-addFence'
import MarketManagerAPI from '../../../module-api/market-manager-api/market-data'
import Vue from 'vue'
import { batchOperation } from '../../../util/util'
let _this = null
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
    return y + '-' + _this.add0(m) + '-' + _this.add0(d) + ' ' + _this.add0(h) + ':' + _this.add0(mm) + ':' + _this.add0(s)
  }
  // 判断用户是否登录
  async isLogin(mall) {
    const res = await _this.MallAPIInstance.isLogin(mall)
    if (res.code === 200 && res.data) {
      return true
    } else {
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
    const res = await _this.MarketManagerAPIInstance.topGoods(query)
    if (res.ecode === 0) {
      // 上报历史记录
      await window.BaseUtilBridgeService.saveTopGoodsHistory({
        'country': item.country,
        'mall_name': item.mall_name,
        'mall_id': item.sys_mall_id,
        'log_time': _this.formatTime(new Date().getTime()),
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
        'log_time': _this.formatTime(new Date().getTime()),
        'log_message': `商品【${item.id}】置顶失败${res.message}`
      })
      console.log('topAction-商品置顶fail')
      return false
    }
  }
  // 获取任务
  async init() {
    const alltest = await window.BaseUtilBridgeService.getTopGoodsTask('all')
    console.log(alltest)
    if (!alltest.length) {
      console.log('暂无任务')
      return
    }
    _this = this
    await batchOperation(alltest, this.runtesk)
  }
  // 执行任务
  async runtesk(mall, count = { count: 1 }) {
    try {
      // 判断任务执行完成
      const toped = await window.BaseUtilBridgeService.getTopGoods(mall.mall_id, '0')
      if (!toped.length) {
        await window.BaseUtilBridgeService.saveTopGoodsHistory({ // 历史记录
          'country': mall.country,
          'mall_name': mall.mall_name,
          'mall_id': mall.mall_id,
          'log_time': _this.formatTime(new Date().getTime()),
          'log_message': `已置顶完所有商品`
        })
        console.log('已置顶完所有商品')
        return
      }
      // 判断店铺登录
      const islogin = await _this.isLogin({ platform_mall_id: mall.mall_id, country: mall.country })
      if (!islogin) {
        await window.BaseUtilBridgeService.saveTopGoodsHistory({ // 历史记录
          'country': mall.country,
          'mall_name': mall.mall_name,
          'mall_id': mall.mall_id,
          'log_time': _this.formatTime(new Date().getTime()),
          'log_message': `店铺未登录`
        })
        console.log('登录未登录')
        // 四个半小时后执行
        // setTimeout(this.runtesk(mall, count = { count: 1 }), 60 * 60 * 1000 * 4.5)
        setTimeout(() => {
          console.log('104-----s')
        }, 1000)
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
          'log_time': _this.formatTime(new Date().getTime()),
          'log_message': `未到置顶时间`
        })
        // 四个半小时后执行
        setTimeout(this.runtesk(mall, count = { count: 1 }), 60 * 60 * 1000 * 4.5)
        return
      }
      // 查询未置顶的商品
      const willTopGoods = await window.BaseUtilBridgeService.getTopGoods(mall.mall_id, '0')
      console.log('查询未置顶的商品', willTopGoods)
      if (!willTopGoods.length) {
        console.log('已置顶完所有商品')
        await window.BaseUtilBridgeService.saveTopGoodsHistory({ // 历史记录
          'country': mall.country,
          'mall_name': mall.mall_name,
          'mall_id': mall.mall_id,
          'log_time': _this.formatTime(new Date().getTime()),
          'log_message': `已置顶完所有商品`
        })
        return
      }
      // 更新置顶记录 && 置顶
      for (const goods of willTopGoods) {
        // 正在置顶的商品
        const res1 = await _this.MarketManagerAPIInstance.topedGoods({ country: mall.country, mallId: mall.mall_id })
        if (res1.ecode !== 0) {
          console.log(`店铺【${mall.mall_name}】商品置顶数据获取失败`)
          await window.BaseUtilBridgeService.saveTopGoodsHistory({
            'country': mall.country,
            'mall_name': mall.mall_name,
            'mall_id': mall.mall_id,
            'log_time': _this.formatTime(new Date().getTime()),
            'log_message': `店铺【${mall.mall_name}】商品置顶数据获取失败`
          })
          console.log('414-商品数据获取失败')
          // 四个半小时后执行
          setTimeout(this.runtesk(mall, count = { count: 1 }), 60 * 60 * 1000 * 4.5)
          return
        }
        const toppingItemList = res1.data
        if (toppingItemList.findIndex(el => { return el === Number(goods.goods_id) }) >= 0) {
          const des = await window.BaseUtilBridgeService.saveTopGoods({ // 【壳内】商品表状态更新
            mall_id: mall.mall_id,
            goods_id: goods.goods_id,
            is_top: '1'
          })
          console.log('商品表状态更新', des)
          await window.BaseUtilBridgeService.saveTopGoodsHistory({
            'country': mall.country,
            'mall_name': mall.mall_name,
            'mall_id': mall.mall_id,
            'log_time': _this.formatTime(new Date().getTime()),
            'log_message': `${goods.goods_id}商品正在置顶`
          })
          console.log('426-该商品正在置顶')
          continue
        }
        if (toppingItemList.length >= 5) {
          await window.BaseUtilBridgeService.saveTopGoodsHistory({
            'country': mall.country,
            'mall_name': mall.mall_name,
            'mall_id': mall.mall_id,
            'log_time': _this.formatTime(new Date().getTime()),
            'log_message': '商品置顶已达上限'
          })
          console.log('商品置顶已达上限', toppingItemList)
          // 四个半小时后执行
          setTimeout(this.runtesk(mall, count = { count: 1 }), 60 * 60 * 1000 * 4.5)
          return
        }
        // 置顶
        console.log('置顶', goods)
        const query = {
          country: goods.country,
          mallId: goods.sys_mall_id,
          goodsID: goods.id
        }
        const res = await this.MarketManagerAPIInstance.topGoods(query)
        if (res.ecode === 0) {
          await window.BaseUtilBridgeService.saveTopGoodsHistory({ // 上报历史记录
            'country': mall.country,
            'mall_name': mall.mall_name,
            'mall_id': mall.mall_id,
            'log_time': _this.formatTime(new Date().getTime()),
            'log_message': '商品置顶成功'
          })
          console.log('置顶成功')
          await window.BaseUtilBridgeService.saveTopGoods({ // 【壳内】商品表状态更新
            mall_id: mall.mall_name,
            goods_id: goods.goods_id,
            is_top: '1'
          })
        } else {
          // 上报历史记录
          await window.BaseUtilBridgeService.saveTopGoodsHistory({
            'country': mall.country,
            'mall_name': mall.mall_name,
            'mall_id': mall.mall_id,
            'log_time': _this.formatTime(new Date().getTime()),
            'log_message': `商品【${goods.id}】置顶失败${res.message}`
          })
          console.log('置顶失败')
        }
      }
      // 四个半小时后执行
      setTimeout(this.runtesk(mall, count = { count: 1 }), 60 * 60 * 1000 * 4.5)
    } catch (e) {
      console.log('try-catch', e)
      // 上报历史记录
      await window.BaseUtilBridgeService.saveTopGoodsHistory({
        'country': mall.country,
        'mall_name': mall.mall_name,
        'mall_id': mall.mall_id,
        'log_time': _this.formatTime(new Date().getTime()),
        'log_message': `商品置顶失败${e}`
      })
    } finally {
      --count.count
    }
  }
}

// import api from '../../network/jx-request'
export default class MallListAPI {
  constructor(that) {
    this._this = that
    this.mallList = []
  }
  // 获取店铺列表
  async getMallList(params) {
    try {
      const res = await this._this.$api.getMallList(params)
      if (res.data.code === 200) {
        const mallArr = res.data.data.map(item => {
          item.LoginInfo = '<p>等待检测...</p>'
          return item
        })
        this.mallList = mallArr
        return { code: 200, data: mallArr }
      }
      return { code: -2, data: '获取店铺列表失败' }
    } catch (error) {
      return { code: -2, data: `getMallList-catch: ${error}` }
    }
  }

  // 根据 店铺频台id 找到店铺系统id
  getMallID(platform_mall_id) {
    return this.mallList.find(item => item.platform_mall_id === platform_mall_id)?.id
  }
  // 更新店铺水印
  async updateWatermark(params) {
    try {
      const res = await this._this.$api.updateWatermark(params)
      // debugger
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.code} ${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `getMallList-catch: ${error}` }
    }
  }

  // 修改账户登录密码
  async updateUserPassword(params) {
    try {
      const res = await this._this.$api.updateUserPassword(params)
      // debugger
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.code} ${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `updateUserPasswordAPI-catch: ${error}` }
    }
  }
  // 联动站点分组获取店铺列表
  async ddMallGoodsGetMallList(params) {
    try {
      const res = await this._this.$api.ddMallGoodsGetMallList({ params })
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: -2, data: '获取店铺列表失败' }
    } catch (error) {
      return { code: -2, data: `getMallList-catch: ${error}` }
    }
  }

  // 上报店铺cookie
  async uploadMallCookie(params) {
    try {
      const res = await this._this.$api.uploadMallCookie(params)
      if (res.data.code === 200) {
        return { code: 200, data: '上报成功' }
      }
      return { code: res.data.code, data: `${res.data.code} ${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `getMallList-catch: ${error}` }
    }
  }

  // 获取店铺上新商品额度
  async getMallGoodsAmount(mallInfo) {
    try {
      const { country, platform_mall_id } = mallInfo
      const params = {
        platform_mall_id: platform_mall_id, // 导入店铺初始没有mallId
        version: '3.1.0'
      }
      // cnsc_shop_id  店铺类型为 2 or 3时，需要此参数
      let res = await this.$shopeemanService.getChinese(country, '/api/v3/product/get_product_statistical_data/?', params, { headers: { referer: '/portal/product/list/all' } })
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: res.data } // count_for_limit
      }
      return { code: res.status, data: `${res.status} ${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `getMallGoodsAmount-catch: ${error}` }
    }
  }

  // 判断店铺是否是跨境店铺还是普通店铺
  async isNormalMall(mallInfo) {
    try {
      const { country, platform_mall_id } = mallInfo
      const params = {
        platform_mall_id: platform_mall_id
      }
      let res = await this.$shopeemanService.getChinese(country, '/api/v3/logistics/get_channel_list/?', params)
      res = JSON.parse(JSON.parse(res).data)
      const siteMall = this.$shopeeManConfig.getSiteMall()
      const isNormal = siteMall[country].some(item => {
        return res.data.list.some(resitem => {
          return Number(item.ShipId) === resitem.channel_id
        })
      })
      if (res.code === 0) {
        return { code: 200, data: isNormal }
      }
      return { code: res.status, data: `${res.status} ${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `isNormalMall-catch: ${error}` }
    }
  }

  // 用来检测 店铺是否已经登陆
  async getUserInfo(mallInfo) {
    try {
      const { country, platform_mall_id } = mallInfo
      const params = {
        'platform_mall_id': platform_mall_id // 导入店铺初始没有mallId
      }
      let res = await this.$shopeemanService.getChinese(country, '/api/selleraccount/user_info/?', params)
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: '店铺已经登陆' }
      }
      return { code: res.status, data: `${res.status} ${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `getUserInfo-catch: ${error}` }
    }
  }
}


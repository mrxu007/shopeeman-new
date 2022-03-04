import GUID from '@/util/guid'
export default class GoodsDiscount {
  constructor(that) {
    this._this = that
  }
  // str转码
  urlencode(str) {
    str = (str + '').toString()

    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28')
      .replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
  }
  guid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(
      /[xy]/g,
      function(c) {
        var r = (Math.random() * 16) | 0
        var v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }
    )
  }
  // 搜索关注店铺
  async addCancerMall(val) {
    const item = val
    try {
      const keywordEncode = encodeURI(item.keyword)
      const params = {}
      params['mallId'] = item.mallId

      params['by'] = item.by
      params['keyword'] = item.keyword
      params['limit'] = item.limit
      params['newest'] = item.newest
      params['order'] = item.order
      params['page_type'] = item.page_type
      params['scenario'] = 'PAGE_GLOBAL_SEARCH'
      // params['rating_filter'] = item.rating_filter
      // params['skip_autocorrect'] = 1
      params['version'] = 2
      const strGuid = this.guid()
      const res = await this._this.$shopeemanService.getChineseBuyer(item.country, '/api/v4/search/search_items?', params, {
        headers: {
          'Content-type': 'application/json',
          referer: `/search?keyword=${keywordEncode}&trackingId=searchhint-1646186021-961459e5-99cb-11ec-85af-8a3d66826fb4`,
          'Accept': 'application/json',
          'If-None-Match-': this.guid(),
          'x-api-source': 'pc',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'X-CSRFToken': strGuid

        }
      })
      return JSON.parse(res)
    } catch (error) {
      return { code: -2, data: `店铺搜索异常 ${error}` }
    }
  }
  // 获取粉丝数
  async getFllower(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.mallId

      params['shopid'] = item.shopid
      params['offset'] = item.offset
      params['limit'] = item.limit
      params['offset_of_offset'] = item.offset_of_offset
      params['_'] = item.timeStamp
      const res = await this._this.$shopeemanService.getChineseBuyer(item.country, `/shop/${item.shopid}/followers/?`, params, {
        headers: {
          'Content-type': 'text/html; charset=utf-8',
          referer: `/shop/${item.shopid}/followers/?__classic__=1`,
          'accept': '*/*',
          'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Mobile Safari/537.36',
          'x-requested-with': 'XMLHttpRequest',
          'If-None-Match-': this.guid(),
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'Accept-Encoding': 'gzip, deflate, br'

        }
      })
      // 正则表达转换
      const data = JSON.parse(res).data
      const reg = /<li\s*?data-follower-shop-id=.(?<ShopId>[0-9]+?).\s*?data-follower[^>]+>\s*?<a(([^>]+username='(?<UserName>[^>]+)'\s*?userid=.(?<UserId>[0-9]+?).\s*?class=.shop-href.)|())>/igs
      let info = {}
      const mallList = []
      do {
        info = reg.exec(data)
        if (info?.groups) {
          mallList.push(info.groups)
        }
      } while (info = reg.exec(data))
      if (res) {
        return { code: 200, data: mallList }
      } else {
        return { code: 201, data: [], message: '请求失败' }
      }
    } catch (error) {
      return { code: -2, data: `粉丝请求异常 ${error}` }
    }
  }
  // 关注用户
  async buyerFollow(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.mallId
      // params['userShopid'] = item.userShopid
      // params['ShopId'] = item.ShopId
      params['csrfmiddlewaretoken'] = this.guid().replaceAll('-', '')
      const res = await this._this.$shopeemanService.postChineseBuyer(item.country, `/buyer/follow/shop/${item.ShopId}/`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Content-Length': '52',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          'sec-ch-ua-mobile': '?1',
          referer: `/shop/${item.followMallID}/followers/?__classic__=1`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'Accept': ' */*',
          'X-Requested-With': 'XMLHttpRequest',
          'If-None-Match-': this.guid()

        }
      })
      console.log('135', res)
      return { code: 201, data: false, message: '请求失败' }
      // if (res) {
      //   return { code: 200, data: true }
      // } else {
      //   return { code: 201, data: false, message: '请求失败' }
      // }
    } catch (error) {
      return { code: -2, data: `关注请求异常 ${error}` }
    }
  }
  // 取消关注用户
  async buyerUNFollow(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.mallId
      params['csrfmiddlewaretoken'] = this.guid().replaceAll('-', '')
      const res = await this._this.$shopeemanService.postChineseBuyer(item.country, `/shop/${item.UserId}/unfollowers/?`, params, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          referer: `/shop/${item.mallId}/followers/?__classic__=1`,
          'accept': '*/*',
          'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Mobile Safari/537.36',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          'x-requested-with': 'XMLHttpRequest',
          'If-None-Match-': this.guid(),
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'Accept-Encoding': 'gzip, deflate, br'

        }
      })
      if (res) {
        return { code: 200, data: true }
      } else {
        return { code: 201, data: false, message: '请求失败' }
      }
    } catch (error) {
      return { code: -2, data: `关注请求异常 ${error}` }
    }
  }
  // 获取店铺活跃时间
  async getActiveTimeFollower(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.mallId
      params['shopid'] = item.mallId
      params['username'] = item.username
      const res = await this._this.$shopeemanService.getChineseBuyer(item.country, `/api/v4/shop/get_shop_detail?`, params, {
        headers: {
          'X-API-SOURCE': 'pc',
          'Content-Type': 'application/xml'
        }
      })
      const data = JSON.parse(JSON.parse(res).data)
      if (!data.error) {
        return { code: 200, data: data.data }
      } else {
        return { code: 201, data: [], message: data.error }
      }
    } catch (error) {
      return { code: -2, data: [], message: `粉丝活跃时间 ${error}` }
    }
  }
  // 获取host店铺粉丝
  async getFllowerHostMall(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.mallId

      params['offset'] = item.offset
      params['limit'] = item.limit
      params['offset_of_offset'] = item.offset_of_offset
      params['_'] = item.timeStamp
      const res = await this._this.$shopeemanService.getChineseBuyer(item.country, `/shop/${item.mallId}/followers/?`, params, {
        headers: {
          'Content-type': 'text/html; charset=utf-8',
          referer: `/shop/${item.mallId}/followers/?__classic__=1`,
          'accept': '*/*',
          'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Mobile Safari/537.36',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          'x-requested-with': 'XMLHttpRequest',
          'If-None-Match-': this.guid(),
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'Accept-Encoding': 'gzip, deflate, br'

        }
      })
      // 正则表达转换
      const data = JSON.parse(res).data
      const reg = /<li\s*?data-follower-shop-id=.(?<ShopId>[0-9]+?).\s*?data-follower[^>]+>\s*?<a(([^>]+username='(?<UserName>[^>]+)'\s*?userid=.(?<UserId>[0-9]+?).\s*?class=.shop-href.)|())>/igs
      let info = {}
      const mallList = []
      do {
        info = reg.exec(data)
        if (info?.groups) {
          mallList.push(info.groups)
        }
      } while (info = reg.exec(data))
      if (res) {
        return { code: 200, data: mallList }
      } else {
        return { code: 201, data: [], message: '请求失败' }
      }
    } catch (error) {
      return { code: -2, data: `粉丝请求异常 ${error}` }
    }
  }
  // 获取评论
  async getShoppComment(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.mallId
      params['filter'] = 0
      params['flag'] = 1
      params['itemid'] = item.itemid
      params['limit'] = 52
      params['offset'] = item.offset
      params['shopid'] = item.shopid
      params['type'] = 0
      const res = await this._this.$shopeemanService.getChineseBuyer(item.country, `/api/v2/item/get_ratings?`, params, {
        headers: {
          // referer: `/shop/${item.mallId}/followers/?__classic__=1`,
          'accept': '*/*',
          'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Mobile Safari/537.36',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          'x-requested-with': 'XMLHttpRequest',
          'If-None-Match-': this.guid(),
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'Accept-Encoding': 'gzip, deflate, br'
        }
      })
      const data = JSON.parse(JSON.parse(res).data)
      if (!data.error) {
        return { code: 200, data: data.data }
      } else {
        return { code: 201, data: [], message: data.error }
      }
    } catch (error) {
      return { code: -2, data: [], message: `获取评论 ${error}` }
    }
  }
  // 获取主要店铺信息
  async getHomeMallinfo(val) {
    try {
      const item = val
      const params = {}
      params['mallId'] = item.mallId
      params['username'] = item.username
      const res = await this._this.$shopeemanService.getChinese(item.country, `/api/v4/shop/get_shop_detail?`, params, {
        headers: {
          'X-API-SOURCE': 'pc',
          'Content-Type': 'application/xml',
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': 'gzip, deflate'
        }
      })
      const data = JSON.parse(JSON.parse(res).data)
      if (!data.error) {
        return { code: 200, data: data.data }
      } else {
        return { code: 201, data: [], message: data.error }
      }
    } catch (error) {
      return { code: -2, data: [], message: `主要店铺信息 ${error}` }
    }
  }
  // 获取用户基本信息
  async UserProfile(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.mallId
      const res = await this._this.$shopeemanService.getChineseBuyer(item.country, `/api/v2/user/profile/get/`, params, {
        headers: {
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml'
        }
      })
      const data = JSON.parse(JSON.parse(res).data)
      if (data.error) {
        return { code: 201, data: '', message: data.error_msg }
      } else {
        return { code: 200, data: data.data }
      }
    } catch (error) {
      return { code: -2, data: [], message: `用户信息获取 ${error}` }
    }
  }
}


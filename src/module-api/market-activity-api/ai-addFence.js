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
      params['isAddCsrfToken'] = true
      params['userShopid'] = item.userShopid
      // params['ShopId'] = item.ShopId
      params['csrfmiddlewaretoken'] = this.guid().replaceAll('-', '')
      const res = await this._this.$shopeemanService.postChineseBuyer(item.country, `/buyer/follow/shop/${item.userShopid}/`, params, {
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
      const data = JSON.parse(res)
      console.log('111', data)
      if (data.status === 200) {
        if (JSON.parse(data.data).success) {
          return { code: 200, data: true }
        } else {
          return { code: 200, data: false }
        }
      } else {
        return { code: 201, data: false, message: '请求失败' }
      }
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
      params['isAddCsrfToken'] = true

      params['ShopId'] = item.ShopId
      // params['ShopId'] = item.ShopId
      params['csrfmiddlewaretoken'] = this.guid().replaceAll('-', '')
      const res = await this._this.$shopeemanService.postChineseBuyer(item.country, `/buyer/unfollow/shop/${item.ShopId}/`, params, {
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
      if (res) {
        return { code: 200, data: true }
      } else {
        return { code: 201, data: false, message: '请求失败' }
      }
    } catch (error) {
      return { code: -2, data: `取消关注用户请求异常 ${error}` }
    }
  }
  // 关注评价用户
  async CommentFollow(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.mallId
      // params['isAddCsrfToken'] = true
      params['shopid'] = item.userShopid
      // params['ShopId'] = item.ShopId
      const strGuid = this.guid()
      // params['csrfmiddlewaretoken'] = this.guid().replaceAll('-', '')
      const res = await this._this.$shopeemanService.postChineseBuyer(item.country, `/api/v4/shop/follow`, params, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': '20',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          'sec-ch-ua-mobile': '?0',
          referer: `/shop/${item.userShopid}`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'Accept': ' application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'zh-CN,zh;q=0.9',
          'X-Requested-With': 'XMLHttpRequest',
          'If-None-Match-': this.guid(),
          'X-CSRFToken': strGuid
        }
      })
      const data = JSON.parse(res)
      console.log('111', data)
      if (data.status === 200) {
        if (JSON.parse(data.data).success) {
          return { code: 200, data: true }
        } else {
          return { code: 200, data: false }
        }
      } else {
        return { code: 201, data: false, message: '请求失败' }
      }
    } catch (error) {
      return { code: -2, data: `关注评价请求异常 ${error}` }
    }
  }
  // 取关评价用户
  async CommentUNFollow(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.mallId
      // params['isAddCsrfToken'] = true
      params['shopid'] = item.userShopid
      // params['ShopId'] = item.ShopId
      const strGuid = this.guid()
      // params['csrfmiddlewaretoken'] = this.guid().replaceAll('-', '')
      const res = await this._this.$shopeemanService.postChineseBuyer(item.country, `/api/v4/shop/unfollow`, params, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': '20',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          'sec-ch-ua-mobile': '?0',
          referer: `/shop/${item.userShopid}`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'Accept': ' application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'zh-CN,zh;q=0.9',
          'X-Requested-With': 'XMLHttpRequest',
          'If-None-Match-': this.guid(),
          'X-CSRFToken': strGuid
        }
      })
      const data = JSON.parse(res)
      console.log('111', data)
      if (data.status === 200) {
        if (JSON.parse(data.data).success) {
          return { code: 200, data: true }
        } else {
          return { code: 200, data: false }
        }
      } else {
        return { code: 201, data: false, message: '请求失败' }
      }
    } catch (error) {
      return { code: -2, data: `取关评价用户请求异常 ${error}` }
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
  // home店铺关注粉丝列表
  async getFllowering(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.mallId

      params['offset'] = item.offset
      params['limit'] = item.limit
      params['offset_of_offset'] = item.offset_of_offset
      params['_'] = item.timeStamp
      params['__classic__'] = 1
      const res = await this._this.$shopeemanService.getChineseBuyer(item.country, `/shop/${item.mallId}/following/?`, params, {
        headers: {
          referer: `/shop/${item.mallId}/following/`,
          'Accept-Encoding': 'gzip, deflate'
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
      return { code: -2, data: `host粉丝请求异常 ${error}` }
    }
  }
  // 用户是否登录
  async isLogin(val) {
    const item = val
    try {
      const params = {}
      params['mallId'] = item.platform_mall_id
      const res = await this._this.$shopeemanService.getChinese(item.country, `/api/v2/login/?`, params, {
        headers: {
          Accept: 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml'
        }
      })
      const data = JSON.parse(JSON.parse(res).data)
      // console.log(data)
      if (data.errcode) {
        return { code: 200, data: false, message: '店铺未登录' }
      } else {
        return { code: 200, data: true }
      }
    } catch (error) {
      return { code: -2, data: `判断用户是否登录请求异常 ${error}` }
    }
  }
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
}


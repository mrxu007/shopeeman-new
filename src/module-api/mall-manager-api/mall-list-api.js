
// import api from '../../network/jx-request'
export default class MallListAPI {
  constructor(that) {
    this._this = that
    this.mallList = []
  }

  // 第三方接口-------------------------------------------------
  // 获取店铺上新商品额度
  async getMallGoodsAmount(mallInfo) {
    try {
      const { country, platform_mall_id } = mallInfo
      const params = {
        platform_mall_id: platform_mall_id, // 导入店铺初始没有mallId
        version: '3.1.0'
      }
      // cnsc_shop_id  店铺类型为 2 or 3时，需要此参数
      let res = await this._this.$shopeemanService.getChinese(country, '/api/v3/product/get_product_statistical_data/?', params, { headers: { referer: '/portal/product/list/all' } })
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: res.data } // count_for_limit
      }
      return { code: res.errcode, data: `${res.errcode} ${res.message}` }
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
      let res = await this._this.$shopeemanService.getChinese(country, '/api/v3/logistics/get_channel_list/?', params)
      res = JSON.parse(JSON.parse(res).data)
      const siteMall = this._this.$shopeeManConfig.getLogisticsList()
      const isNormal = siteMall[country].some(item => {
        return res.data.list.some(resitem => {
          return Number(item.ShipId) === resitem.channel_id
        })
      })
      if (res.code === 0) {
        return { code: 200, data: isNormal }
      }
      return { code: res.errcode, data: `${res.errcode} ${res.message}` }
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
      let res = await this._this.$shopeemanService.getChinese(country, '/api/selleraccount/user_info/?', params)
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: '店铺已经登陆' }
      }
      return { code: res.errcode, data: `${res.errcode} ${res.message}` }
    } catch (error) {
      return { code: -2, data: `getUserInfo-catch: ${error}` }
    }
  }
  // 获取店铺信息
  async getMallInfo(mallInfo) {
    try {
      const { country, platform_mall_id } = mallInfo
      const params = {
        platform_mall_id: platform_mall_id
      }
      let res = await this._this.$shopeemanService.getChinese(country, '/api/forward/accountservice/v2/shop/', params)
      res = JSON.parse(JSON.parse(res).data)
      if (res?.username) {
        return { code: 200, data: res }
      }
      return { code: res.errcode, data: `${res.errcode} ${res.message}` }
    } catch (error) {
      return { code: -2, data: `getMallInfo-catch: ${error}` }
    }
  }
  // 开启或关闭店铺休假模式
  async closeOrOpenMallVacation(mallInfo, open) {
    try {
      const { country, platform_mall_id } = mallInfo
      const params = {
        'platform_mall_id': platform_mall_id,
        'enable_vacation_mode': open
      }
      // https://seller.th.shopee.cn/api/sellermisc/sc_conf/set_shop_settings/?SPC_CDS=3ab26097-85e9-48d2-baab-72766be9bb84&SPC_CDS_VER=2
      let res = await this._this.$shopeemanService.postChinese(country, '/api/sellermisc/sc_conf/set_shop_settings/?', params, { // options
        headers: {
          'Content-Type': 'application/json',
          'charset': 'UTF-8'
        }
      })
      res = JSON.parse(JSON.parse(res).data)

      if (res.code === 0) {
        return { code: 200, data: '操作成功' }// Errors within expectations  开启关闭太频繁，需冷却三小时
      }
      return { code: res.code, data: `${res.code} ${res.message.indexOf('Errors within expectations') > -1 ? '开启关闭太频繁，需冷却3小时' : res.message}` }
    } catch (error) {
      return { code: -2, data: `getMallInfo-catch: ${error}` }
    }
  }

  // 先上传图片：/api/v3/general/upload_image/（POST） 使用字节流上传，获取到resource_id（即图片的ID）
  async get_image_resource_id(mallInfo, base64File) {
    try {
      const { country, platform_mall_id } = mallInfo
      const params = {
        'platform_mall_id': platform_mall_id,
        'ratio': '2'
      }
      let res = await this._this.$shopeemanService.postChineseImageFile(country, '/api/v3/general/upload_image/', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'upImgType': 'file'
        }
      }, base64File)
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: res.data.resource_id }// Errors within expectations  开启关闭太频繁，需冷却三小时
      }
      return { code: res.code, data: `${res.errcode} ${res.message.indexOf('token not found') > -1 ? '请先登录' : res.message}` }
    } catch (error) {
      return { code: -2, data: `getMallInfo-catch: ${error}` }
    }
  }
  // 更新店铺背景图片
  async updateMallBK(mallInfo, resource_id) {
    try {
      const { country, platform_mall_id } = mallInfo
      const params = {
        'platform_mall_id': platform_mall_id,
        'cover': resource_id
      }
      let res = await this._this.$shopeemanService.putChinese(country, '/api/marketing/v4/shop/profile/?', params, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: '更新店铺背景图片成功' }// Errors within expectations  开启关闭太频繁，需冷却三小时
      }
      return { code: res.code, data: `${res.code} ${res.message}` }
    } catch (error) {
      return { code: -2, data: `getMallInfo-catch: ${error}` }
    }
  }
  // 发送短信
  async sendMessage(mallInfo, messageHeader) {
    try {
      const { country, platform_mall_id } = mallInfo
      const params = {
        platform_mall_id: platform_mall_id
      }
      const headers = {
        'cookies': []
      }
      messageHeader ? headers['cookies'].push({ 'name': 'RO_T', value: messageHeader }) : ''
      let res = await this._this.$shopeemanService.getChinese(country, '/api/selleraccount/vcode/resend/?', params, messageHeader ? { headers } : null)
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: '短信验证发送成功' }
      }
      return { code: res.errcode, data: `${res.errcode} ${res.message}` }
    } catch (error) {
      return { code: -2, data: `getMallGoodsAmount-catch: ${error}` }
    }
  }
  // 本地服务接口----------------------------------------------------
  // 获取店铺列表
  async getMallList(params) {
    try {
      const res = await this._this.$api.getMallList(params)
      if (res.data.code === 200) {
        const mallArr = res.data.data.data.map(item => {
          item.LoginInfo = '<p>等待检测...</p>'
          item.isCheckedWaterMark = false
          item.isCheckedWaterMark2 = false
          return item
        })
        // if (!params.country && !params.groupId) {
        //   this.mallList = mallArr
        // }
        return { code: 200, data: { total: res.data.data.total, mallArr } }
      }
      return { code: -2, data: '获取店铺列表失败' }
    } catch (error) {
      return { code: -2, data: `getMallList-catch: ${error}` }
    }
  }
  // 根据站点获取分组
  async getGroup(params) {
    try {
      const res = await this._this.$api.getGroupList(params)
      if (res.data.code === 200) {
        const groupList = []
        const isRepeatObj = {}
        res.data.data.map(item => {
          if (!isRepeatObj[item.group_id]) {
            isRepeatObj[item.group_id] = '123'
            const obj = {
              label: item.group_name,
              value: item.group_id
            }
            groupList.push(obj)
          }
        })
        return { code: 200, data: groupList }
      }
      return { code: res.status, data: '获取店铺列表失败' }
    } catch (error) {
      return { code: -2, data: `getMallList-catch: ${error}` }
    }
  }
  // 根据 店铺频台id 找到店铺系统id
  getMallID(platform_mall_id) {
    return this.mallList.find(item => item.platform_mall_id === platform_mall_id - 0)?.id
  }
  // 更新店铺水印
  async updateWatermark(params) {
    try {
      const res = await this._this.$api.updateWatermark(params)
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.code} ${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `getMallList-catch: ${error}` }
    }
  }
  // 更新店铺别名
  async updateMallAliasName(params) {
    try {
      const res = await this._this.$api.updateMallAliasName(params)
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
      // const res = await this._this.$api.ddMallGoodsGetMallList({ params })
      const res = await this._this.$api.ddMallGoodsGetMallList(params)
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
  // 导入店铺信息(服务端)
  async saveMallAuthInfo(mallInfo) {
    try {
      const res = await this._this.$api.saveMallAuthInfo(mallInfo) // 导入店铺信息（服务端）
      if (res.data.code === 200) {
        return { code: 200, data: res.data } // count_for_limit
      }
      return { code: res.status, data: `${res.status} ${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `saveMallAuthInfo-catch: ${error}` }
    }
  }
  // 更新店铺信息
  async updateMallInfo(params) {
    try {
      const res = await this._this.$api.updateMallInfo(params)
      if (res.data.code === 200) {
        return { code: 200, data: res.data }
      }
      return { code: res.status, data: `${res.status} ${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `saveMallAuthInfo-catch: ${error}` }
    }
  }
  // 获取银行卡信息列表
  async getBankList(params) {
    try {
      const res = await this._this.$api.getBankList({ params })
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: -2, data: '获取银行卡信息列表失败' }
    } catch (error) {
      return { code: -2, data: `getBankList-catch: ${error}` }
    }
  }
  // 整理登录数据  和  shopeeMan-service 的login 接口成功反出去的结果一样
  sortMallData(mallInfo, data) {
    const mallId = `${data.shopid}` // 平台店铺ID
    const mallUId = `${data.id}` // 平台店铺ID
    const username = data.username

    const Cookie = {} // (一键登陆专用)
    Cookie['SPC_EC'] = data.sso
    Cookie['SPC_SC_TK'] = data.token
    Cookie['ShopeeUid'] = mallUId // 虾皮平台用户Uid
    Cookie['shopid'] = mallId // 平台店铺ID

    const Cookie_new = { // 店铺cookie信息(导入店铺专用)(更新壳)
      'SPC_CDS_VER': '2',
      'SPC_EC': data.sso,
      'ShopeeUid': mallUId,
      'SPC_F': '',
      'CNSC_SSO': '',
      'SPC_CNSC_TK': '',
      'SPC_CNSC_UD': '',
      'SC_DFP': '',
      'SPC_SC_SA_UD': '',
      'SPC_SC_SA_TK': '',
      'SPC_SC_UD': '',
      'token': data.token,
      'cstoken': data.cs_token,
      'satoken': '',
      'sso': data.sso,
      'shopeeuid': mallUId,
      'shopid': mallId,
      'portrait': data.portrait,
      'userRealName': username,
      'mainAccountId': '',
      'spc_f': '',
      'SPC_SC_TK': data.token,
      'OtherCookieInfo': '',
      'spcf_update_time': ''
    }

    const mallInfo_new = { // 通知壳更新店铺信息 (导入店铺、一键登陆) 数据结构与壳内店铺信息一致
      'IPIsExpired': true,
      'IsOpenSIP': false,
      'ProxyType': 'ssr',
      'IsTransit': 0,
      'IPType': '',
      'GroupName': mallInfo.group_name, // 店铺分组
      'web_login_info': Cookie_new, // 店铺cookie
      'MallMainName': mallInfo.MallMainName,
      'id': 0,
      'uid': 0,
      'country': mallInfo.country, // 国家
      'platform_mall_name': mallInfo.mall_account_info.username,
      'platform_mall_id': mallId, // 店铺平台ID
      'platform_mall_uid': mallUId, // 店铺平台卖家ID
      'is_global': 0,
      'mall_main_id': 0,
      'mall_account_info': mallInfo.mall_account_info, // 店铺账户信息(导入模板里面的信息)
      //  { 'password': 'Bibbyrunp888',
      //   'username': 'bibbyrunp1907',
      //   'userRealName': 'bibbyrunp1907',
      //   'subsiteindex': 0
      // },
      'watermark': mallInfo.watermark, // 店铺水印
      'mall_alias_name': mallInfo.mall_alias_name, // 店铺别名
      'mall_type': mallInfo.mall_type, // 店铺类型
      'mall_group_id': mallInfo.mall_group_id // 店铺分组id
    }
    const obj = {
      mallId,
      mallUId,
      username,
      Cookie,
      mallInfo_new
    }
    return obj
  }
}

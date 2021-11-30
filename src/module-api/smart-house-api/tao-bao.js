/* 天猫淘宝海外平台 */

export default class taobaoAPI {
  constructor(that) {
    this._this = that
  }
  // 刷新列表
  async refreshAccessToken(userinfo) {
    try {
      const { userId } = userinfo
      const params = {
        userId: userId
      }
      const res = await this._this.$shopeemanService.postChineseLaiZan('http://api.laizand.com/api/open/refreshAccessToken', params, { // options
        headers: {
          'Content-Type':	'application/x-www-form-urlencoded'
        }
      })
      const data = JSON.parse(res)
      const des = JSON.parse(data.data)
      return { code: des.code, data: des.data, message: des.message }
    } catch (error) {
      return { code: -2, data: `refreshAccessToken-catch: ${error}` }
    }
  }

  // 天猫淘宝海外平台--列表
  async getTbGlobalUser(userinfo) {
    try {
      const { uid, uuid, account, accountAliasName } = userinfo
      const params = {
        uid: uid,
        uuid: uuid,
        account: account,
        accountAliasName: accountAliasName
        // app_key: 'KYsyQGFviz2i0uQF'
      }
      const res = await this._this.$shopeemanService.getChineseLaiZan('http://api.laizand.com/api/open/getTbGlobalUser?', params, { // options
        headers: {
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': ' gzip, deflate',
          'User-Agent': 'RestSharp/106.3.1.0'
        }
      })
      const data = JSON.parse(res)
      const des = JSON.parse(data.data)
      return { code: des.code, data: des.data, message: des.message }
    } catch (error) {
      return { code: -2, data: `getGloableUser-catch: ${error}` }
    }
  }

  // 修改别名
  async updateAliasName(userinfo) {
    try {
      const { id, uuid, accountAliasName } = userinfo
      const params = {
        id: id,
        uuid: uuid,
        accountAliasName: accountAliasName
        // app_key: 'KYsyQGFviz2i0uQF'
      }
      const res = await this._this.$shopeemanService.postChineseLaiZan('http://api.laizand.com/api/open/updateAliasName', params, { // options
        headers: {
          'Content-Type':	'application/json'
        }
      })
      const data = JSON.parse(res)
      const des = JSON.parse(data.data)
      return { code: des.code, data: des.data, message: des.message }
    } catch (error) {
      return { code: -2, data: `updateAliasName-catch: ${error}` }
    }
  }

  // 删除账号
  async deleteAccount(userinfo) {
    try {
      const { id } = userinfo
      const params = {
        id: id
        // app_key: 'KYsyQGFviz2i0uQF'
      }
      const res = await this._this.$shopeemanService.postChineseLaiZan('http://api.laizand.com/api/open/deleteAccount', params, { // options
        headers: {
          'Content-Type':	'application/x-www-form-urlencoded'
        }
      })
      const data = JSON.parse(res)
      const des = JSON.parse(data.data)
      return { code: des.code, data: des.data, message: des.message }
    } catch (error) {
      return { code: -2, data: `deleteAccount-catch: ${error}` }
    }
  }

  // 授权
  async getTbGlobalAuthUrl(userinfo) {
    try {
      const { accountAliasName } = userinfo
      const params = {
        accountAliasName: accountAliasName
        // app_key: 'KYsyQGFviz2i0uQF'
      }
      const res = await this._this.$shopeemanService.postChineseLaiZan('http://api.laizand.com/api/open/getTbGlobalAuthUrl', params, {
        headers: {
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': 'gzip, deflate',
          'User-Agent': 'RestSharp/106.3.1.0',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      const data = JSON.parse(res)
      const des = JSON.parse(data.data)
      return { code: des.code, data: des.data, message: des.message }
    } catch (error) {
      return { code: -2, data: `getTbGlobalAuthUrl-catch: ${error}` }
    }
  }
}

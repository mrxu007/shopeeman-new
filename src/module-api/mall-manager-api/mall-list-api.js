import api from '../../network/jx-request'
import ShopeemanConfig from '../../services/shopeeman-config'
import { sha256 } from 'js-sha256'
import md5 from 'js-md5'
import GUID from '../../util/guid'
const shopeemanConfig = new ShopeemanConfig()

// 获取店铺列表
export async function getMallListAPI(params) {
  try {
    const res = await api.getMallList(params)
    if (res.data.code === 200) {
      return { code: 200, data: res.data.data }
    }
    return { code: -2, data: '获取店铺列表失败' }
  } catch (error) {
    return { code: -2, data: `getMallList-catch: ${error}` }
  }
}

// 更新店铺水印
export async function updateWatermarkAPI(params) {
  try {
    const res = await api.updateWatermark(params)
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
export async function updateUserPasswordAPI(params) {
  try {
    const res = await api.updateUserPassword(params)
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
export async function ddMallGoodsGetMallList(params) {
  try {
    const res = await api.ddMallGoodsGetMallList({ params })
    if (res.data.code === 200) {
      return { code: 200, data: res.data.data }
    }
    return { code: -2, data: '获取店铺列表失败' }
  } catch (error) {
    return { code: -2, data: `getMallList-catch: ${error}` }
  }
}

// 店铺一键登陆
export async function loginAPI(mallInfo) {
  const { country, mall_account_info } = mallInfo
  const encryptPwd = sha256(md5(mall_account_info.password))
  const accountName = mall_account_info.username
  // const encryptPwd = sha256(md5('Th123654'))
  // const accountName = 'hellohappy586'
  try {
    const info = shopeemanConfig.getMallFormation(country, 3) // 店铺拼接信息
    const params = {
      // captcha: '',
      // captchar_id: '',
      remember: false,
      password_hash: encryptPwd,
      username: accountName
    }
    const guid = new GUID()
    const url = `${info.Origin}/api/v2/login/?SPC_CDS=${guid.newGUID()}&SPC_CDS_VER=2`
    const res = await api.otherRequest.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': info.loginLink,
        'Origin': info.Origin,
        'host': info.host
      }
    })
    if (res.status === 200) {
      const coookieStr = res.headers.find(item => item.Name === 'Set-Cookie') // 提取有用的cookie
      if (coookieStr) {
        const cookieArrTemp = []
        coookieStr.Value.split(';').forEach(item => {
          if (item.indexOf('Domain=') === -1 && item.indexOf('httponly') === -1 && item.indexOf('Path=/') === -1) {
            cookieArrTemp.push(item.trim().replace('secure,', ''))
          }
        })
        console.log('cookieArrTemp', cookieArrTemp)
        const Cookie = {}
        cookieArrTemp.forEach(item => {
          if (item) {
            const key = item.split('=')[0]
            const value = item.split('=')[1] || ''
            Cookie[key] = value
          }
        })
        Cookie['sso'] = res.data.sso
        Cookie['cs_token'] = res.data.cs_token
        Cookie['token'] = res.data.token
        const data = {
          mallId: res.data.shopid + '',
          username: res.data.username,
          Cookie
        }
        return { code: 200, data }
      }
    }
    return { code: res.status, data: `${res.status} 店铺【${accountName}】登录失败` }
  } catch (error) {
    const message = error?.data?.message || null
    if (message) {
      const status = error.status
      const debug_msg = error.data.data.raw_response.debug_msg
      return { code: status, data: `${status} 店铺【${accountName}】登录失败 ${message} ${debug_msg}` }
    }
    return { code: -2, data: `loginAPI-catch: 店铺【${accountName}】登录失败 ${error}` }
  }
}

// 上报店铺cookie
export async function uploadMallCookie(params) {
  try {
    const res = await api.uploadMallCookie(params)
    if (res.data.code === 200) {
      return { code: 200, data: '上报成功' }
    }
    return { code: res.data.code, data: `${res.data.code} ${res.data.message}` }
  } catch (error) {
    return { code: -2, data: `getMallList-catch: ${error}` }
  }
}

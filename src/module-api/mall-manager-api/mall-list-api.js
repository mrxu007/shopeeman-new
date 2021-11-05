import api from '../../network/jx-request'
// import ShopeemanConfig from '../../services/shopeeman-config'
// import { sha256 } from 'js-sha256'
// import md5 from 'js-md5'
// import GUID from '../../util/guid'
// const shopeemanConfig = new ShopeemanConfig()

// 获取店铺列表
export async function getMallListAPI(params) {
  try {
    const res = await api.getMallList(params)
    if (res.data.code === 200) {
      const mallArr = res.data.data.map(item => {
        item.LoginInfo = '<p>等待检测...</p>'
        return item
      })
      return { code: 200, data: mallArr }
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

// 获取银行卡信息列表
export async function getBankList(params) {
  try {
    const res = await api.getBankList({ params })
    if (res.data.code === 200) {
      return { code: 200, data: res.data.data }
    }
    return { code: -2, data: '获取店铺列表失败' }
  } catch (error) {
    return { code: -2, data: `getMallList-catch: ${error}` }
  }
}

import api from '../../network/jx-request'

// 获取店铺列表
export async function getMallListAPI(params) {
  try {
    const res = await api.getMallList({ params })
    if (res.status === 200) {
      return { code: 200, data: res.data }
    }
    return { code: -2, data: '获取店铺列表失败' }
  } catch (error) {
    return { code: -2, data: `getMallList-catch: ${error}` }
  }
}

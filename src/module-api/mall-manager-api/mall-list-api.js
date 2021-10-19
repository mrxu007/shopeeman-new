import api from '../../network/jx-request'

// 获取店铺列表
export async function getMallListAPI(params) {
  try {
    const res = await api.getMallList({ params })
    if (res.data.code === 200) {
      return { code: 200, data: res.data.data }
    }
    return { code: -2, data: '获取店铺列表失败' }
  } catch (error) {
    return { code: -2, data: `getMallList-catch: ${error}` }
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

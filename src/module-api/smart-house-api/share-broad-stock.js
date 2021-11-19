/**
 * 海外仓共享库存管理
 */
export default class ShareBroadStock {
  constructor(that) {
    this._this = that
  }
  // 获取数
  async stockSharedList() {
    // try {
    //   const res = await this._this.$api.stockSharedList()
    //   if (res.data.code === 200) {
    //     return { code: 200, data: res.data.data }
    //   }
    //   return { code: res.data.code, data: `${res.data.message}` }
    // } catch (error) {
    //   return { code: -2, data: `获取仓库列表异常： ${error}` }
    // }
  }
}


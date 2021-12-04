/**
 * 海外仓共享库存管理
 */
export default class ShareMyBroadStock {
  constructor(that) {
    this._this = that
  }
  // 获取海外仓库中文名
  async overseasWh(wid) {
    try {
      const res = await this._this.$appConfig.getGlobalCacheInfo('overseasWh', wid)
      if (res !== 'null') {
        const jsonData = JSON.parse(res)
        return { code: 200, data: jsonData.warehouse_name }
      }
      return { code: 200, data: '' }
    } catch (error) {
      return { code: -2, data: `获取海外仓库中文名异常： ${error}` }
    }
  }
  // 获取数据
  async getSharedIndex(val) {
    try {
      const res = await this._this.$XzyNetMessageService.post('xzy.getSharedIndex', val)
      const jsonData = JSON.parse(JSON.parse(res).data)
      if (jsonData.code === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: jsonData.code, data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `获取共享给我的海外仓库存列表异常： ${error}` }
    }
  }
  // // 获取仓库
  // async getOverseasWarehouse() {
  //   try {
  //     const res = await this._this.$api.getOverseasWarehouse()
  //     if (res.data.code === 200) {
  //       return { code: 200, data: res.data.data }
  //     }
  //     return { code: res.data.code, data: `${res.data.message}` }
  //   } catch (error) {
  //     return { code: -2, data: `获取仓库列表异常： ${error}` }
  //   }
  // }
  // 获取仓库 --- 壳
  async getOverseasWarehouse() {
    try {
      const res = await this._this.$appConfig.getGlobalCacheInfo('allWh', '')
      const jsonData = this.isJsonString(res)
      if (jsonData?.length) {
        return { code: 200, data: jsonData }
      }
      return { code: 201, data: `仓库列表为空` }
    } catch (error) {
      return { code: -2, data: `获取仓库列表异常： ${error}` }
    }
  }
  // 判断能否转JSON
  isJsonString(str) {
    if (typeof str === 'string') {
      try {
        JSON.parse(str)
        return JSON.parse(str)
      } catch (e) {
        return str
      }
    } else {
      return str
    }
  }
}


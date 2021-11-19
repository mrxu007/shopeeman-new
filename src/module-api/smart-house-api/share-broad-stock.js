/**
 * 海外仓共享库存管理
 */
export default class ShareBroadStock {
  constructor(that) {
    this._this = that
  }
  // 撤销共享库存
  async delSharedInventory(val) {
    try {
      const res = await this._this.$XzyNetMessageService.post('xzy.delSharedInventory', val)
      const jsonData = JSON.parse(JSON.parse(res).data)
      if (Number(jsonData.code) === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: Number(jsonData.code), data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `撤销共享库存异常： ${error}` }
    }
  }
  // 删除绑定用户
  async delbindUser(val) {
    try {
      const res = await this._this.$XzyNetMessageService.post('xzy.delbindUser', val)
      const jsonData = JSON.parse(JSON.parse(res).data)
      if (Number(jsonData.code) === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: Number(jsonData.code), data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `删除绑定用户异常： ${error}` }
    }
  }
  // 添加绑定用户
  async addSharedBindUser(val) {
    try {
      const res = await this._this.$XzyNetMessageService.post('xzy.addSharedBindUser', val)
      const jsonData = JSON.parse(JSON.parse(res).data)
      if (Number(jsonData.code) === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: Number(jsonData.code), data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `添加绑定用户异常： ${error}` }
    }
  }
  // 查询平台用户
  async getBindUser(val) {
    try {
      const res = await this._this.$XzyNetMessageService.post('xzy.getBindUser', val)
      const jsonData = JSON.parse(JSON.parse(res).data)
      if (Number(jsonData.code) === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: Number(jsonData.code), data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `查询平台用户异常： ${error}` }
    }
  }
  // 查看绑定用户
  async getSharedUserList(val) {
    try {
      const res = await this._this.$XzyNetMessageService.post('xzy.getSharedUserList', val)
      const jsonData = JSON.parse(JSON.parse(res).data)
      if (Number(jsonData.code) === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: Number(jsonData.code), data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `查看绑定用户异常： ${error}` }
    }
  }
  // 获取数据
  async stockSharedList(val) {
    try {
      const res = await this._this.$XzyNetMessageService.post('xzy.stockSharedList', val)
      const jsonData = JSON.parse(JSON.parse(res).data)
      if (jsonData.code === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: jsonData.code, data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `获取我共享的库存列表异常： ${error}` }
    }
  }
  // 获取仓库
  async getOverseasWarehouse() {
    try {
      const res = await this._this.$api.getOverseasWarehouse()
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取仓库列表异常： ${error}` }
    }
  }
}


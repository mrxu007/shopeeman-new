export default class AddressSet {
  constructor(that) {
    this._this = that
  }
  // 修改绑定店铺、修改仓库自用地址
  async updateData(val) {
    try {
      const res = await this._this.$api.updateData(val)
      if (res.data.code === 200) {
        return { code: 200 }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `修改数据异常： ${error}` }
    }
  }
  // 新增系统仓库
  async addXzyStore(val) {
    try {
      const res = await this._this.$api.addXzyStore(val)
      if (res.data.code === 200) {
        return { code: 200 }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `新增系统仓库异常： ${error}` }
    }
  }
  // 绑定店铺、申请仓库的店铺列表
  async getBindMall(val) {
    try {
      const res = await this._this.$api.getBindMall(val)
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `绑定店铺、申请仓库的店铺列表异常： ${error}` }
    }
  }
  // 删除仓库
  async deleteOwnStore(val) {
    try {
      const res = await this._this.$api.deleteOwnStore(val)
      if (res.data.code === 200) {
        return { code: 200 }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `删除仓库异常： ${error}` }
    }
  }
  // 配置手机号码
  async updateOwnPhone(val) {
    try {
      const res = await this._this.$api.updateOwnPhone(val)
      if (res.data.code === 200) {
        return { code: 200 }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `配置手机号码异常： ${error}` }
    }
  }
  // 添加国内自有仓库
  async adduserStore(val) {
    try {
      const res = await this._this.$api.adduserStore(val)
      if (res.data.code === 200) {
        return { code: 200 }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `添加国内自有仓库异常： ${error}` }
    }
  }
  // 获取数据
  async getUserWarehouse() {
    try {
      const res = await this._this.$api.getUserWarehouse()
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取用户仓库地址异常： ${error}` }
    }
  }
  // 获取系统仓库
  async xzyIndex(val) {
    const params = {
      warehouseType: val
    }
    try {
      const res = await this._this.$api.xzyIndex(params)
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取系统仓库异常： ${error}` }
    }
  }
  // 获取星卓越地址
  async xzyAllIndex() {
    try {
      const res = await this._this.$api.xzyAllIndex()
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取所属仓库异常： ${error}` }
    }
  }
}

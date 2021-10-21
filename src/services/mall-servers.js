export default class mallService {
  constructor() {

  }
  nativeService() {
    return window['mallService']
  }
  getMallList() {
    return this.nativeService().getMallList()
  }
  removeMall(mall) {
    return this.nativeService().removeMall(mall)
  }
  addMall(mall) {
    return this.nativeService().addMall(mall)
  }
  openOneKeyMallAdmin(mall, viewUrl = null) {
    return this.nativeService().openOneKeyMallAdmin(mall, viewUrl)
  }
  // openMallAdmin(mall,viewUrl=null){
  openMallAdmin(mall, viewUrl = null, isValidate = false) {
    return this.nativeService().openMallAdmin(mall, viewUrl, isValidate)
  }
  modify(mall) {
    return this.nativeService().modify(mall)
  }
  ModifyProxy() {
    return this.nativeService().modifyProxy()
  }
  OpenMallAdminCode(mall, userName, password, host) {
    return this.nativeService().openMallAdminCode(mall, userName, password, host)
  }

  async getMallById(mallId) {
    const malls = await this.nativeService().getMallList()
    let index = -1
    malls.forEach((v, i) => {
      if (v.id === mallId) {
        index = i
      }
    })
    if (index < 0) {
      return null
    }
    return malls[index]
  }
  async getMallBytagId(tagId) {
    const malls = await this.nativeService().getMallList()
    let newData = []
    malls.forEach((v, i) => {
      if (v.tags) {
        if (v.tags.includes(tagId)) {
          newData.push(v)
        }
      }
      if (tagId === '') {
        newData = malls
      }
    })
    return newData
  }
}

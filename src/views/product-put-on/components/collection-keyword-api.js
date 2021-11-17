class CollectionBaseConfig {
  _this = null
  constructor(that) {
    this._this = that // vue 实例
  }
}

class CollectKeyWordApI extends CollectionBaseConfig {
  _this = null
  constructor(that) {
    super(that)
    this._this = that // vue 实例
  }
  reset() {

  }
}

export default CollectKeyWordApI

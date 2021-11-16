class CollectionConfig {
  _this = null
  constructor(that) {
    this._this = that // vue 实例
  }
}

class CollectionApI extends CollectionConfig {
  _this = null
  constructor(that) {
    super(that)
    this._this = that // vue 实例
  }
  reset() {

  }
}

export default CollectionApI

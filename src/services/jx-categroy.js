export default class {
  jxCatagroyData=window['CollectBridgeService'];
  // allCategroy=jxCatagroyData.jxCatagroyData;
  async getAllCatagroy() {
    const allCategroy = await this.jxCatagroyData.getJxCategory()
    return JSON.parse(allCategroy)
  }
  async getPddAllCatagroy() {
    const allCategroy = await this.jxCatagroyData.getPddCategory()
    return JSON.parse(allCategroy)
  }
  /**
   * 获取一级类目列表
   */
  getLeve1(allCategroy) {
    console.log(allCategroy)
    if (allCategroy && allCategroy.length != 0) {
      const result = allCategroy.filter(n => {
        n.parent_cid ? '' : n.parent_cid = n.parent_id
        n.cid ? '' : n.cid = n.cat_id
        n.name ? '' : n.name = n.cat_name
        return n.parent_cid == 0 || n.parent_id == 0
      })
      return result
    }
  }
  /**
   * 获取对应类目的子级类目
   * @param {*} cid
   */
  getChildByCid(cid, allCategroy) {
    if (allCategroy && allCategroy.length != 0) {
      const result = allCategroy.filter(n => {
        n.parent_cid ? '' : n.parent_cid = n.parent_id
        n.cid ? '' : n.cid = n.cat_id
        n.name ? '' : n.name = n.cat_name
        return n.parent_cid == cid || n.parent_id == cid
      })
      return result
    }
  }
  /**
   * 获取id对应类目
   */
  getnameByCid(cid, allCategroy) {
    if (allCategroy && allCategroy.length != 0) {
      const result = allCategroy.filter(n => {
        return n.cid == cid || n.cat_id == cid
      })
      if (result && result[0]) {
        return result[0].name ? result[0].name : result[0].cat_name
      } else {
        return cid
      }
    }
  }
}

import jxCatagroyData from './jx-catagroy-json-data'

export default class {
    allCategroy=jxCatagroyData.jxCatagroyData;

    getAllCatagroy() {
      return this.allCategroy
    }
    /**
     * 获取一级类目列表
     */
    getLeve1() {
      if (this.allCategroy && this.allCategroy.length != 0) {
        const result = this.allCategroy.filter(n => {
          return n.parent_cid == 0
        })
        return result
      }
    }
    /**
     * 获取对应类目的子级类目
     * @param {*} cid
     */
    getChildByCid(cid) {
      if (this.allCategroy && this.allCategroy.length != 0) {
        const result = this.allCategroy.filter(n => {
          return n.parent_cid == cid
        })
        return result
      }
    }
}

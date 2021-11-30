
export default class GoodsManagerAPI {
  constructor(that) {
    this._this = that
    this.mallList = []
  }

  // 同步数据
  async getSkuList(goodsinfo) {
    try {
      const { country, page_number, mallId, page_size } = goodsinfo
      const params = {
        page_number: page_number,
        mallId: mallId,
        page_size: page_size,
        source: 'seller_center',
        version: '1.0.0'
      }
      const res = await this._this.$shopeemanService.getChinese(country, '/api/v3/mpsku/get_mpsku_list/?', params, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'zh-CN,zh;q=0.9'
        }
      })
      const des = JSON.parse(JSON.parse(res).data)
      let ecode = des.code ? des.code : des.errcode
      if (des.errcode) {
        ecode = des.errcode
      } else {
        ecode = des.code
      }
      const data = des.data
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data }
    } catch (error) {
      return { code: -2, data: `getSkuList-catch: ${error}` }
    }
  }

  // 商品分类
  async getcollectionlist(goodsinfo) {
    try {
      const { country, mallId } = goodsinfo
      const params = {
        mallId: mallId
      }
      const res = await this._this.$shopeemanService.getChinese(country, '/api/shopcategory/v3/category/get_collection_list/?', params, {
        headers: {
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': 'gzip, deflate'
        }
      })
      const des = JSON.parse(JSON.parse(res).data)
      // console.log('getcollectionlist', des)
      let ecode = des.code ? des.code : des.errcode
      if (des.errcode) {
        ecode = des.errcode
      } else {
        ecode = des.code
      }
      const data = des.data
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data }
    } catch (error) {
      return { code: -2, data: `getcollectionlist-catch: ${error}` }
    }
  }

  // 创建分组
  async createShopCollection(goodsinfo) {
    try {
      const { country, mallId, name } = goodsinfo
      const params = {
        mallId: mallId,
        name: name
      }
      const res = await this._this.$shopeemanService.postChinese(country, '/api/shopcategory/v3/category/create_shop_collection/?', params, {
        headers: {
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': 'gzip, deflate',
          Referer: '/portal/category',
          'Content-Type': 'application/json'
        }
      })
      const des = JSON.parse(JSON.parse(res).data)
      let ecode = des.code ? des.code : des.errcode
      if (des.errcode) {
        ecode = des.errcode
      } else {
        ecode = des.code
      }
      const data = des.data
      const message = des.message
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `createShopCollection-catch: ${error}` }
    }
  }
  // 删除分组
  async delShopCollection(goodsinfo) {
    try {
      const { country, mallId, id } = goodsinfo
      const params = {
        id: id,
        mallId: mallId
      }
      const res = await this._this.$shopeemanService.postChinese(country, '/api/shopcategory/v3/category/delete_shop_collection/?', params, {
        headers: {
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': 'gzip, deflate',
          Referer: '/portal/category',
          'Content-Type': 'application/json'
        }
      })
      const des = JSON.parse(JSON.parse(res).data)
      let ecode = des.code ? des.code : des.errcode
      if (des.errcode) {
        ecode = des.errcode
      } else {
        ecode = des.code
      }
      const data = des.data
      const message = des.message
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `createShopCollection-catch: ${error}` }
    }
  }

  // 批量开启知名度
  async updateShopCollection(goodsinfo) {
    try {
      const { country, mallId, id, status } = goodsinfo
      const params = {
        id: id,
        status: status,
        mallId: mallId
      }
      const res = await this._this.$shopeemanService.postChinese(country, '/api/shopcategory/v3/category/update_shop_collection/?', params, {
        headers: {
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': 'gzip, deflate',
          Referer: '/portal/category',
          'Content-Type': 'application/json'
        }
      })
      const des = JSON.parse(JSON.parse(res).data)
      let ecode = des.code ? des.code : des.errcode
      if (des.errcode) {
        ecode = des.errcode
      } else {
        ecode = des.code
      }
      const data = des.data
      const message = des.message
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `updateShopCollection-catch: ${error}` }
    }
  }

  // 获取商品列表
  async getMpskuList(goodsinfo) {
    try {
      const { country,
        mallId,
        search_type,
        keyword,
        stock_max,
        stock_min,
        sold_max,
        sold_min,
        category_id,
        list_type,
        page_number,
        page_size,
        list_order_type } = goodsinfo
      const params = {
        mallId,
        // search_type: search_type, // name 、id
        // keyword: keyword,
        // stock_max: stock_max,
        // stock_min: stock_min,
        // sold_max: sold_max,
        // sold_min: sold_min,
        // category_id: category_id,
        page_number: page_number,
        page_size: page_size,
        list_type: list_type,
        list_order_type: list_order_type,
        version: '4.0.0'
      }
      const res = await this._this.$shopeemanService.getChinese(country, '/api/v3/product/search_product_list/?', params, {
        headers: {
          'content-type': 'application/json; charset=utf-8'
        }
      })
      const des = JSON.parse(JSON.parse(res).data)
      let ecode = des.code ? des.code : des.errcode
      if (des.errcode) {
        ecode = des.errcode
      } else {
        ecode = des.code
      }
      const data = des.data
      const message = des.message
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `getMpskuList-catch: ${error}` }
    }
  }
}


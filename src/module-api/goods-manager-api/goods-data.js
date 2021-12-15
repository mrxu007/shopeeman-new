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
      const message = des.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
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
      const { country, mallId, page_number, page_size } = goodsinfo
      const params = {
        mallId,
        page_number: page_number,
        page_size: page_size,
        list_type: 'all',
        source: 'seller_center',
        version: '1.0.0'
      }
      const res = await this._this.$shopeemanService.getChinese(country, '/api/v3/mpsku/get_mpsku_list/?', params, {
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

  // 搜索商品列表
  async searchList(goodsinfo) {
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
        cursor
      } = goodsinfo
      const params = {
        mallId,
        page_number: page_number,
        search_type: search_type,
        keyword: keyword,
        page_size: page_size,
        cursor: cursor,
        stock_max: stock_max,
        stock_min: stock_min,
        sold_max: sold_max,
        sold_min: sold_min,
        category_id: category_id,
        list_type: list_type, // live all
        count_list_types: 'sold_out,banned,deboosted,deleted,unlisted',
        version: '4.0.0'
      }
      const res = await this._this.$shopeemanService.getChinese(country, '/api/v3/product/search_product_list/?', params, {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          Referer: `/portal/product/list/active?category=${category_id}&soldMax=${sold_max}&soldMin=${sold_min}&stockMax=${stock_max}&stockMin=${stock_min}&page=${page_number}&size=${page_size}`
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
      return { code: -2, data: `searchList-catch: ${error}` }
    }
  }

  // 获取商品详情 - first
  async getGoodsDetail(goodsinfo) {
    try {
      const { country, mallId, collection_ids } = goodsinfo
      const params = {
        collection_ids: collection_ids,
        mallId: mallId
      }
      const res = await this._this.$shopeemanService.getChinese(country, '/api/shopcategory/v3/category/get_collection/?', params, {
        headers: {
          'accept': 'application/json, text/plain, */*',
          referer: `/portal/category/${collection_ids}`
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
      return { code: -2, data: `getGoodsDetail-catch: ${error}` }
    }
  }

  // 获取商品详情 - second
  async getGoodsDetailList(goodsinfo) {
    try {
      const { country, mallId, productIds, collection_ids } = goodsinfo
      const params = {
        mallId: mallId,
        // query: 'query Products($productIds: [String], $statusType: Int) {' +
        //   'products(productIds: $productIds, statusType: $statusType) {' +
        // 'items {itemid,name,images,normalStock,normalSellerStock,normalWmsStock,sellerStock,' +
        //   'wmsStock,stock,pffTag,' +
        //    'modelList {inputOriginPrice,inputPromotionPrice,originPrice,promotionPrice}}'
        query: `query Products($productIds: [String], $statusType: Int) {
          products(productIds: $productIds, statusType: $statusType) {
        items {
          itemid,
          name,
          images,
          normalStock,
          normalSellerStock,
          normalWmsStock,
          sellerStock,
          wmsStock,
          stock,
          pffTag,
          modelList {
            inputOriginPrice,
            inputPromotionPrice,
            originPrice,
            promotionPrice
          }
        }
      }
        }`,
        variables: {
          productIds: productIds,
          statusType: 0
        }
      }
      const res = await this._this.$shopeemanService.postChineseReferer(country, '/api/marketing/v4/graphql/query/?', params, {
        headers: {
          'Content-Type': 'application/json',
          referer: `/portal/category/${collection_ids}`
        }
      })
      const des = JSON.parse(JSON.parse(res).data)
      const ecode = des.data?.products ? 0 : -2
      // if (des.errcode) {
      //   ecode = des.errcode
      // } else {
      //   ecode = des.code
      // }
      const data = des.data
      const message = des.message
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `getGoodsDetail-catch: ${error}` }
    }
  }

  // 删除-商品详情-商品
  async getGoodsDetailListdel(goodsinfo) {
    try {
      const { country, mallId, product_id_list, collection_ids } = goodsinfo
      const params = {
        mallId: mallId,
        collection_id: collection_ids,
        product_id_list: product_id_list
      }
      const res = await this._this.$shopeemanService.postChineseReferer(country, '/api/shopcategory/v3/category/remove_collection_item/?', params, {
        headers: {
          'Content-Type': 'application/json',
          referer: `/portal/category/${collection_ids}`
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
      return { code: -2, data: `getGoodsDetail-catch: ${error}` }
    }
  }
  // 修改名字
  async getGoodsDetailListUpdateName(goodsinfo) {
    try {
      const { country, mallId, name, collection_ids } = goodsinfo
      const params = {
        mallId: mallId,
        id: collection_ids,
        name: name
      }
      const res = await this._this.$shopeemanService.postChineseReferer(country, '/api/shopcategory/v3/category/update_shop_collection/?', params, {
        headers: {
          'Content-Type': 'application/json',
          referer: `/portal/category/${collection_ids}`
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
      return { code: -2, data: `getGoodsDetail-catch: ${error}` }
    }
  }
  // 获取商品信息
  async getGoodsDetailinfo(goodsinfo) {
    try {
      const { country, shopid, itemid } = goodsinfo
      const params = {
        shopid: shopid,
        itemid: itemid.toString(),
        platform_mall_id: shopid
      }
      const res = await this._this.$shopeemanService.getChinese(country, '/api/v4/item/get?', params, {
        headers: {
          isGBK: false,
          referer: `/%E2%80%BC%EF%B8%8F%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%AA%E0%B9%88%E0%B8%87-%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AB%E0%B8%A1%E0%B8%9E%E0%B8%A3%E0%B8%A1%E0%B9%81%E0%B8%82%E0%B8%99%E0%B8%AA%E0%B8%B1%E0%B9%89%E0%B8%99-i.158200153.14917339828?sp_atk=9ce84e99-1174-45ee-a41e-490ed09b0f89`,
          'Accept': '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'zh-CN,zh;q=0.9'
        }
      })

      const aa = JSON.parse(res)
      const bb = aa.data.replaceAll('?,', '?",')
      const des = JSON.parse(bb)
      let ecode = null
      let message = null
      let data = null
      if (des.data) {
        ecode = 0
        data = des.data
      } else {
        ecode = -2
        message = JSON.parse(res).error_msg
      }
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `getGoodsDetail-catch: ${error}` }
    }
  }
  // 商品点赞
  async GoodsbuyerLike(goodsinfo) {
    try {
      const { country, shopid, itemid } = goodsinfo
      const params = {
        mallId: shopid,
        shop_item_ids: [{
          shop_id: Number(shopid),
          item_id: Number(itemid)
        }]
      }
      const res = await this._this.$shopeemanService.postChineseBuyer(country, '/api/v4/pages/like_items', params, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'zh-CN,zh;q=0.9',
          referer: `/ADIDOG-%E0%B9%84%E0%B8%8B%E0%B8%8B%E0%B9%8C%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88%E0%B8%A1%E0%B8%B2%E0%B8%81%E0%B8%81%E0%B8%81%F0%9F%90%B6%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AE%E0%B8%B9%E0%B9%89%E0%B8%94-%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AA%E0%B8%B8%E0%B8%99%E0%B8%B1%E0%B8%82-%E0%B8%8A%E0%B8%B8%E0%B8%94%E0%B8%AA%E0%B8%B8%E0%B8%99%E0%B8%B1%E0%B8%82-%E0%B8%8A%E0%B8%B8%E0%B8%94%E0%B8%AB%E0%B8%A1%E0%B8%B2-%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AB%E0%B8%A1%E0%B8%B2-%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A7%E0%B9%8C%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87-i.161669595.9780892572?sp_atk=27921f6f-3ff1-40a3-a5ff-b5b7d469e59c`
        }
      })
      const des = JSON.parse(JSON.parse(res).data)
      debugger
      let ecode = null
      let message = null
      if (des.error === 0) {
        ecode = 0
      } else {
        ecode = -2
        message = '点赞失败'
      }
      return { ecode, message }
    } catch (error) {
      return { code: -2, data: `GoodsbuyerLike-catch: ${error}` }
    }
  }
  // 获取商品所有评论
  async getRatings(goodsinfo) {
    try {
      const { country, shopid, itemid } = goodsinfo
      const params = {
        filter: 0,
        flag: 1,
        itemid: itemid,
        limit: 51,
        offset: 0,
        shopid: shopid,
        type: 0
      }
      const query = {
        platform_mall_id: shopid
      }
      const webUrl = await this._this.$shopeemanService.getWebUrl(country, query)
      const url = `${webUrl}/api/v2/item/get_ratings`
      const res = await this._this.$shopeemanService.getChineseLaiZan(url, params, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Referer: `${webUrl}/BODY-GLOVE-Unisex-Basic-T-Shirt-%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B8%B7%E0%B8%94-%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B8%AA%E0%B8%B5-i.18663111.2953207966`,
          'Accept': 'application/json'
        }
      })

      let ecode = null
      let message = null
      if (res.error === 0) {
        ecode = 0
      } else {
        ecode = -2
        message = res.error_msg
      }
      const data = res.data
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `GoodsbuyerLike-catch: ${error}` }
    }
  }
  // 评价点赞
  async LikeItemRating(goodsinfo) {
    try {
      const { country, shopid, itemid, cmtid, like } = goodsinfo
      const params = {
        cmtid: cmtid,
        itemid: itemid,
        like: like, // true false
        shopid: shopid
      }
      const query = {
        platform_mall_id: shopid
      }
      const webUrl = await this._this.$shopeemanService.getWebUrl(country, query)
      const url = `${webUrl}/api/v4/pages/like_items`
      const res = await this._this.$shopeemanService.postChineseLaiZan(url, params, {
        headers: {
          'Content-Type': 'application/json',
          Referer: `${webUrl}/adidas-ORIGINALS-Collapsible-Nizza-Lo-Shoes-%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2-%E0%B8%AA%E0%B8%B5%E0%B8%82%E0%B8%B2%E0%B8%A7-Sneaker-H67375-i.217077552.6268815649?sp_atk=8852f8c3-a3cd-405b-bc78-f5eb1cf77e10`,
          'Accept': 'application/json'
        }
      })

      let ecode = null
      let message = null
      if (res.error === 0) {
        ecode = 0
      } else {
        ecode = -2
        message = res.error_msg
      }
      const data = res.data
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `GoodsbuyerLike-catch: ${error}` }
    }
  }
  // 加入购物车
  async addToCart(goodsinfo) {
    try {
      const { country, shopid, itemid, modelid } = goodsinfo
      const params = {
        checkout: true,
        client_source: 1,
        donot_add_quantity: false,
        itemid: itemid,
        modelid: modelid,
        quantity: 1,
        shopid: shopid,
        source: '{"refer_urls":[]}',
        update_checkout_only: false
      }
      const query = {
        platform_mall_id: shopid
      }
      const webUrl = await this._this.$shopeemanService.getWebUrl(country, query)
      const url = `${webUrl}/api/v4/cart/add_to_cart`
      const res = await this._this.$shopeemanService.postChineseLaiZan(url, params, {
        headers: {
          'Content-Type': 'application/json',
          Referer: `${webUrl}/adidas-ORIGINALS-Collapsible-Nizza-Lo-Shoes-%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2-%E0%B8%AA%E0%B8%B5%E0%B8%82%E0%B8%B2%E0%B8%A7-Sneaker-H67375-i.217077552.6268815649?sp_atk=48bb9610-70f2-4ab9-b934-a04706af1df4`,
          'Accept': 'application/json'
        }
      })

      let ecode = null
      let message = null
      if (res.error === 0) {
        ecode = 0
      } else {
        ecode = -2
        message = res.error_msg
      }
      const data = res.data
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `GoodsbuyerLike-catch: ${error}` }
    }
  }
}


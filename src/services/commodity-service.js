/**
 * 私有商品库服务
 */
import userInfo from './application-config'
export default class CommodityService {
  user = ''
  nativeService = window['CommodityBridgeService'];
  /**
   * 获取商品详情
   * @param {number} sysId 商品id
   */

  async getUserInfo() {
    const User = new userInfo()
    this.user = await User.getUserInfo()
  }

  getSpuDetailByIdV2(sysId) {
    return this.nativeService.callFunction('GetPrivateSelectionByIdTwo', sysId.toString())
  }
  /**
   * 获取信息 tier varation 定义为对象
   * @param {number} sysId
   */
  getPrivateSelectionByIdV1(sysId) {
    return this.nativeService.callFunction('GetPrivateSelectionById', sysId.toString())
  }
  /**
   * 获取信息
   * @param {string} sysId
   * @param {string} language
   */
  getPrivateSelectionByGoodsId(sysId, language) {
    return this.nativeService.callFunction('GetPrivateSelectionByGoodsId', sysId, language)
  }
  /**
   *
   * @param {{uuid:number,//子账号id
   * page:number, //当前页
   * perpage:number,//页码大小
   * goodsId:string,//商品id
   * language:string,//语种
   * source:string,// 来源（平台）
   * keyword:string,//关键字
   * minPrice:number,//最小价格
   * maxPrice:number,//最大价格
   * timeType:string,//筛选时间类型   2收藏时间；3更新时间
   * startTime:string,//开始时间
   * endTime:string,//结束时间
   * isEditTitle:string,//是否编辑标题 0：全部，1：已编辑，-1:为编辑
   * isEditDescription:string,//是否编辑描述  0：全部，1：已编辑，-1:为编辑
   * categoryId:string,//类目id
   * isFeatured:string,//0全部；1优选；-1非优选
   * mainShowData:string,//为1时显示子账号收藏的数据
   * sysLabelId:string//商品标签id
   * }} req
   */
  async getCollectGoodsV2(req) {
    await this.getUserInfo()
    req.uuid = this.user.child_id
    console.log(req, 'req=====GetCollectGoodsV2')
    return this.nativeService.callFunction('GetCollectGoodsV2', JSON.stringify(req))
  }
  /**
   * 根据id获取信息
   * @param {number} sysId
   */
  getDetailInfo(sysId) {
    return this.nativeService.callFunction('GetDetailInfo', sysId.toString())
  }
  /**
   * 上报采集数据,新增收藏商品
   * @param {{uuid:string,
   * goodsId:string,
   * source:string,
   * categoryId:string,
   * categoryName:string,
   * shortTitle:string,
   * title:string,
   * language:string,
   * description:string,
   * spec1:string,
   * spec2:string,
   * stock:number,
   * price:number,
   * weight:string,
   * long:string,
   * width:string,
   * height:string,
   * sales:string,
   * skus:string,
   * images:any,
   * goodsExtraInfo:any,
   * descImages:any,
   * }} data
   */
  async uploadCollectGoods(data) {
    await this.getUserInfo()
    data.uuid = this.user.child_id
    console.log(data, '=====>')
    return this.nativeService.callFunction('UploadCollectGoods', JSON.stringify(data))
  }
  /**
   * 删除用户收藏的商品信息
   * @param {number[]} ids
   */
  deleteCollectGoodsInfo(ids) {
    return this.nativeService.callFunction('DeleteCollectGoodsInfo', JSON.stringify(ids))
  }
  /**
   * 删除sku
   * @param {string} skuId
   */
  deleteCollectGoodsSku(skuId) {
    return this.nativeService.callFunction('DeleteCollectGoodsSku', skuId)
  }
  /**
   * 修改sku信息
   * @param {any[]} skus
   */
  uploadUpdatedSku(skus) {
    return this.nativeService.callFunction('UploadUpdatedSku', JSON.stringify(skus))
  }
  /**
   * 获取sku详情
   * @param {number} skuId
   */
  getSkuDetail(skuId) {
    return this.nativeService.callFunction('GetSkuDetail', skuId.toString())
  }
  /**
   * 获取商品描述信息
   * @param {number} goodsId
   */
  getGoodsDescription(goodsId) {
    return this.nativeService.callFunction('GetGoodsDescription', goodsId.toString())
  }

  storeGoodsSizeImages(selectionId, imageUrl) {
    return this.nativeService.callFunction('StoreGoodsSizeImages', selectionId, imageUrl)
  }
  /**
   * 批量更新商品图片
   * @param {number} sysGoodsId
   * @param {{imageId:string,imageUrl:string}[]} imageList
   */
  batchUpdateGoodsImageReq(sysGoodsId, imageList) {
    return this.nativeService.callFunction('BatchUpdateGoodsImageReq', sysGoodsId.toString(), JSON.stringify(imageList))
  }

  /**
   * 批量更新商品图片
   * @param {number} sysGoodsId
   * @param {{imageId:string,imageUrl:string}[]} imageList
   */
  batchUpdateDescImage(sysGoodsId, imageList) {
    return this.nativeService.callFunction('BatchUpdateDescImage', sysGoodsId.toString(), JSON.stringify(imageList))
  }
  /**
   * 添加详情图和尺寸图
   * @param {number} selectionId 私有选品库ID
   * @param {number} type 为新增图片的类型，1代表主图，2代表详情图，3代表尺寸图
   * @param {string} imageUrl 添加的图片集合
   */
  storeGoodsImage(selectionId, type, imageUrl) {
    return this.nativeService.callFunction('StoreGoodsImage', selectionId.toString(), type.toString(), imageUrl)
  }
  /**
   * 删除图片
   * @param {number} type 1轮播图，2尺寸图片
   * @param {number} sysGoodsId 系统id
   * @param {string} imageId 图片id
   */
  deleteGoodsImage(type, sysGoodsId, imageId) {
    return this.nativeService.callFunction('DeleteGoodsImage', type.toString(), sysGoodsId.toString(), imageId)
  }
  /**
   * 删除详情图
   * @param {{mageId:string,sysGoodsId:string}} req
   */
  deleteDescImage(req) {
    return this.nativeService.callFunction('DeleteDescImage', JSON.stringify(req))
  }
  /**
   * 添加详情图
   * @param {string} imageUrl
   * @param {number} sysGoodsId
   */
  addDescImage(imageUrl, sysGoodsId) {
    return this.nativeService.callFunction('AddDescImage', imageUrl, sysGoodsId.toString())
  }
  /**
   * 添加尺寸图
   * @param {string} imageUrl
   * @param {number} sysGoodsId
   */
  addSizeImageByUrl(imageUrl, sysGoodsId) {
    return this.nativeService.callFunction('AddSizeImageByUrl', imageUrl, sysGoodsId.toString())
  }
  /**
   * 添加轮播图or尺寸图
   * @param {number} sysGoodsId 系统商品id
   * @param {number} type 1轮播图 imageUrl 必传    2尺寸图 sizeImageId 必传
   * @param {string} imageUrl 图片地址
   * @param {number} sizeImageId 尺寸图ID
   */
  addImage(sysGoodsId, type, imageUrl, sizeImageId = 0) {
    return this.nativeService.callFunction('AddImage', sysGoodsId.toString(), type.toString(), imageUrl, sizeImageId.toString())
  }
  /**
   * 修改详情图片OR图片交换
   * @param {number} sysGoodsId 商品系统id
   * @param {number} type 1修改图片（在原有图片上修改）必须传imageUrl，imageID    2图片交换 传imageId   toImageId 参数
   * @param {string} imageUrl 图片地址
   * @param {number} imageId 图片ID
   * @param {number} toImageId 交换图片的ID
   */
  updateGoodsDescImage(sysGoodsId, type, imageUrl, imageId, toImageId) {
    return this.nativeService.callFunction('UpdateGoodsDescImage', sysGoodsId.toString(), type.toString(), imageUrl, imageId.toString(), toImageId.toString())
  }
  /**
   * 更新轮播图信息
   * @param {number} type 1替换图片；2设置成主图片
   * @param {number} sysGoodsId 系统id
   * @param {number} imageId 图片id
   * @param {string} imageUrl 图片Url
   * @param {number} toImageId 旧主图id，当type为1时，toImageId默认为0
   */
  updateGoodsImage(type, sysGoodsId, imageId, imageUrl, toImageId) {
    return this.nativeService.callFunction('UpdateGoodsImage', type.toString(), sysGoodsId.toString(), imageId.toString(), imageUrl, toImageId.toString())
  }
  /**
   * 修改sku图片OR图片交换
   * @param {number} sysGoodsId 商品系统id
   * @param {string} newImageUrl 新图片地址
   * @param {string} imageUrl 原图片地址
   */
  updateGoodsSkuImage(sysGoodsId, newImageUrl, imageUrl) {
    return this.nativeService.callFunction('UpdateGoodsSkuImage', sysGoodsId.toString(), newImageUrl, imageUrl)
  }
  /**
   * 添加OR替换主图
   * @param {number} sysGoodsId 商品系统id
   * @param {string} imageUrl 图片地址
   */
  addGoodsMainImage(sysGoodsId, imageUrl) {
    return this.nativeService.callFunction('AddGoodsMainImage', sysGoodsId.toString(), imageUrl)
  }
  /**
   *
   * @param {number} sysGoodsId 商品系统id
   * @param {{skuId:string,skuSpec1:string,skuSpec2:string,skuImage:string,skuPrice:number,skuStock:string}[]} skuList sku数据集合
   */
  saveAndUpdateSkuDatas(sysGoodsId, skuList) {
    return this.nativeService.callFunction('SaveAndUpdateSkuDatas', sysGoodsId.toString(), JSON.stringify(skuList))
  }
  /**
   * 更新商品
   * @param {{sysGoodsId:number,title:string,description:string,weight:string,long:string,width:string,height:string}} req
   */
  updateGoods(req) {
    return this.nativeService.callFunction('UpdateGoods', JSON.stringify(req))
  }
  /**
   * 修改商品的信息
   * @param {{sysGoodsId:number,title?:string,description?:string,spec1?:string,spec2?:string}} data
   */
  updateCollectGoodsInfo(data) {
    return this.nativeService.callFunction('UpdateCollectGoodsInfo', JSON.stringify(data))
  }
  /**
   * 获取上新统计数据
   * @param {number} withYesterday
   */
  getStatistics(withYesterday = 1) {
    return this.nativeService.callFunction('GetStatistics', withYesterday.toString())
  }
  /**
   * 修改商品所有图片
   * @param {*} req
   */
  updateGoodsAllImage(req) {
    return this.nativeService.callFunction('UpdateGoodsAllImage', JSON.stringify(req))
  }
  /**
   * 保存平台图片
   * @param {string} goodsId 商品id
   * @param {number} platformId 平台id
   * @param {string} imageId 平台图片id
   * @param {string} imageUrl 图片地址
   */
  savePlatformImage(goodsId, platformId, imageId, imageUrl) {
    return this.nativeService.callFunction('SavePlatformImage', goodsId, platformId.toString(), imageId, imageUrl)
  }
  /**
   * 获取平台图片
   * @param {*} goodsId 商品id
   * @param {*} platformId 平台id
   * @param {*} imageUrl 图片地址
   */
  getPlatformImage(goodsId, platformId, imageUrl) {
    return this.nativeService.callFunction('GetPlatformImage', goodsId, platformId.toString(), imageUrl)
  }
  /**
   * 标记选品库优选商品
   * @param {number[]} sysGoodsIds 系统商品id集合
   * @param {string} isFeatured 1是优选，-1是非优选
   */
  markPreferredGoods(sysGoodsIds, isFeatured) {
    return this.nativeService.callFunction('MarkPreferredGoods', JSON.stringify(sysGoodsIds), isFeatured)
  }
  /**
   * 通过产品id获取上家产品的信息
   * @param {string} lastProductId 上家产品id
   */
  getLastShopProductInfo(lastProductId) {
    return this.nativeService.callFunction('GetLastShopProductInfo', lastProductId)
  }
  /**
   * 获取标签列表
   */
  getGoodsTagList(labelName = '') {
    return this.nativeService.callFunction('GetGoodsTagList', labelName)
  }
  /**
   * 新增标签
   * @param {string} labelName 标签名称
   * @param {number} sysLabelId 标签id,修改需要传值，新增不需要传值
   */
  addGoodsTag(labelName, sysLabelId = 0) {
    return this.nativeService.callFunction('AddGoodsTag', labelName, sysLabelId)
  }

  /**
   * 添加商品到标签
   * @param {string} sysLabelId 为0时，取消此商品标签
   * @param {number[]} sysGoodsIds
   */
  addGoodsToTag(sysLabelId, sysGoodsIds) {
    return this.nativeService.callFunction('AddGoodsToTag', sysLabelId, JSON.stringify(sysGoodsIds))
  }
  /**
   * 删除标签
   * @param {number[]} sysLabelIds
   */
  deleteGoodsTag(sysLabelIds) {
    return this.nativeService.callFunction('DeleteGoodsTag', JSON.stringify(sysLabelIds))
  }
  /**
   * 获取店铺的商品列表数据
   * @param {string} sysMallId
   */
  mallAllList(sysMallId) {
    return this.nativeService.callFunction('MallAllList', sysMallId)
  }
  /**
   * 检查上新商品是否重复上新
   * @param {object} data
   */
  checkListingRepeat(data) {
    // string sysMallId, string platformType, string itemSku, string title, string country, string dimension
    const { sysMallId, platformType, itemSku, title, country, dimension } = data
    return this.nativeService.callFunction('CheckListingRepeat', sysMallId, platformType, itemSku, title, country, dimension)
  }
  /**
   *
   * @param {object} data
   */
  SaveListingRecord(data) {
    // long sysMallId, int platformType, string itemSku, string title, string listingId, string country, string mallId, long categoryId, string skuDatas = ""
    const { sysMallId, platformType, itemSku, title, listingId, country, mallId, categoryId, skuDatas } = data

    return this.nativeService.callFunction('SaveListingRecord', sysMallId, platformType, itemSku, title, listingId, country, mallId, categoryId, skuDatas)
  }
  /**
   * 取消保存的商品ID
   * @param {Array} data
   * @returns
   */
  DeleteCloudItems(data) {
    return this.nativeService.callFunction('Dictionary', data)
  }
  /**
  * 类目映射
  * @param {string} sysMallId
  */
  getCategoryRelation(data) {
    // console.log('值', data)

    return this.nativeService.callCategoryFunction('GetCategoryRelation', data[0] + '', data[1], data[2] + '', data[3])
  }
  /**
 * 保存映射
 * @param {string} sysMallId
 */
  saveCategoryRelation(data) {
    // console.log(JSON.stringify(data))
    return this.nativeService.callCategoryFunction('SaveCategoryRelation', JSON.stringify(data))
  }
  /**
   * 获取类目
   * @param {array} data
   */
  getTbCategory(data) {
    // console.log(JSON.stringify(data))
    return this.nativeService.callCategoryFunction('GetCategoryInfo', data[0] + '', data[1] + '', data[2] + '', data[3])
  }
  /**
   * 获取类目属性
   * @param {array} data
   */
  getTbCategoryAttr(data) {
    // console.log(JSON.stringify(data))
    return this.nativeService.callCategoryFunction('GetAttributeInfo', data[0] + '', data[1] + '', data[2] + '', data[3] + '', data[4] + '')
  }

  /**
   *
   * @param {array} data // 公共服务获取规格
   * @returns
   */
  getCategorySpecInfo(data) {
    // console.log(JSON.stringify(data))
    return this.nativeService.callCategoryFunction('GetCategorySpecInfo', data[0] + '', data[1] + '')
  }

  getMapCategoryRelationReq(data) {
    return this.nativeService.callCategoryFunction('GetCategoryMapInfo', JSON.stringify(data))
  }
  /**
   *
   * @param {string} categoryId // 公共服务淘宝类目完整路径
   * @returns
   */
  getParentsCategoryInfo(categoryId) {
    return this.nativeService.callCategoryFunction('GetParentsCategoryInfo', 'CN', categoryId)
  }
  getPlatformCategoryNameInfo(categoryId, platformId) {
    return this.nativeService.callCategoryFunction('GetPlatformCategoryNameInfo', 'CN', categoryId, platformId)
  }
  uploadSpecByCategoryId(data) {
    const { country, categoryId, dataSource, maxAmount, minAmount } = data
    return this.nativeService.callCategoryFunction('UploadSpecByCategoryId', country, categoryId + '', JSON.stringify(dataSource), maxAmount, minAmount)
  }
  UploadTbCatAttr(data) {
    const { categoryId, dataSource } = data
    return this.nativeService.callCategoryFunction('UploadTbCatAttr', categoryId + '', JSON.stringify(dataSource))
  }
}

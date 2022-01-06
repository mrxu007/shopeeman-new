/**
 * 私有商品库服务
 */
import applicationConfig from '../services/application-config'

export default class CommodityService {
  user = ''
  nativeService = window['CommodityBridgeService']

  /** 更新ip */
  RefreshLinkIp(targetId) {
    return this.nativeService.callCloudIpFunction('RefreshLinkIp', targetId)
  }

  //* *删除服务端商品 */
  delCloudItems(itemList) {
    return this.nativeService.callFunction('DeleteCloudItems', itemList)
  }
  /** 获取服务端商品上新记录 */
  getMallAllRecordList(sysMallId) {
    return this.nativeService.callFunction('MallAllList', sysMallId)
  }
  /**
   * 新增公司主体(系统)
   * @param {string} uid 主账号ID
   * @param {string} targetId 代理系统ip
   * @param {string} mallIds 系统店铺id
   */
  newBangdingMall(uid, targetId, mallIds) {
    return this.nativeService.callCloudIpFunction('NewBindingMallBySysMallId', uid, targetId, mallIds)
  }

  /**
   * 新增公司主体(系统)
   * @param {string} lineId 线路id
   * @param {string} uid 主账号ID
   * @param {string} ipAlias 主体名称
   * @param {string} 子账号ID
   * @param {string} num 购买数量
   * @param {string} period 购买时长
   * @param {string} isPresale 是否预售
   */
  addIPMaster(parmas) {
    return this.nativeService.callCloudIpFunction('BuyCloudIP',
      parmas.lineId.toString(),
      parmas.uid.toString(),
      parmas.ipAlias.toString(),
      parmas.uuid.toString(),
      parmas.num.toString(),
      parmas.period.toString(),
      parmas.isPresale.toString())
  }

  /**
   * 获取商品详情
   * @param {number} sysId 商品ida
   */

  async getUserInfo() {
    const User = new userInfo()
    this.user = await User.getUserInfo()
  }

  getSpuDetailByIdV2(sysId) {
    return this.nativeService.callFunction('GetPrivateSelectionByIdTwo', sysId.toString())
  }

  getNeededTranslateInfoV2(sysId) {
    return this.nativeService.callFunction('GetNeededTranslateInfoTwo', sysId.toString())
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
    const res = await new applicationConfig().getUserInfo()
    req.uuid = res.child_id
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
    // await this.getUserInfo()
    // data.uuid = this.user.child_id
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
  updateGoodsImage(type, sysGoodsId, imageId, imageUrl, toImageId = '0') {
    console.log(type, sysGoodsId, imageId, imageUrl, toImageId)
    return this.nativeService.callFunction('UpdateGoodsImage', type, sysGoodsId.toString(), imageId.toString(), imageUrl, toImageId)
  }

  /**
   * 修改sku图片OR图片交换
   * @param {number} sysGoodsId 商品系统id
   * @param {string} newImageUrl 新图片地址
   * @param {string} imageUrl 原图片地址
   */
  updateGoodsSkuImage(sysGoodsId, newImageUrl, imageUrl) {
    return this.nativeService.callFunction('UpdateGoodsSkuImage', sysGoodsId, newImageUrl, imageUrl)
  }

  /**
   * 添加OR替换主图
   * @param {number} sysGoodsId 商品系统id
   * @param {string} imageUrl 图片地址
   */
  addGoodsMainImage(sysGoodsId, imageUrl) {
    return this.nativeService.callFunction('AddGoodsMainImage', sysGoodsId, imageUrl)
  }

  /**
   *
   * @param {number} sysGoodsId 商品系统id
   * @param {{skuId:string,skuSpec1:string,skuSpec2:string,skuImage:string,skuPrice:number,skuStock:string}[]} skuList sku数据集合
   */
  saveAndUpdateSkuDatas(sysGoodsId, skuList) {
    return this.nativeService.callFunction('SaveAndUpdateSkuDatas', sysGoodsId.toString(), skuList)
  }

  /**
   * 更新商品
   * @param {*&{sysGoodsId, description, title}} req
   */
  updateGoods(req) {
    return this.nativeService.callFunction('UpdateGoods', JSON.stringify(req))
  }

  /**
   * 修改商品的信息
   * @param {{sysGoodsId:string,title?:string,description?:string,spec1?:string,spec2?:string}} data
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
  addGoodsTag(labelName, sysLabelId = '0') {
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
   * 保存翻译商品之后信息
   * @param dataReq 保存
   */
  saveTranslationData(dataReq) {
    return this.nativeService.callFunction('SaveTranslationData', JSON.stringify(dataReq))
  }

  /**
   * 获取描述模板
   * @param {string} sysMallId
   */
  descriptionTemplateList(templateType, noDescription) {
    return this.nativeService.callFunction('DescriptionTemplateList', templateType, noDescription)
  }
  /**
   * 删除描述模板
   * @param {string} sysMallId
   */
  deleteDescriptionTemplate(id) {
    return this.nativeService.callFunction('DeleteDescriptionTemplate', JSON.stringify(id))
  }

  /**
   * 保存描述模板
   * @param lableName sysMallId
   * @param description sysMallId
   * @param templateType sysMallId
   */
  uploadDescriptionTemplate(lableName, description, templateType) {
    templateType = description.length < 68 && '1' || '2'
    return this.nativeService.callFunction('UploadDescriptionTemplate', lableName, description, templateType)
  }

  /**
   * 检查上新商品是否重复上新
   * @param {object} data
   */
  checkListingRepeat(data) {
    // string sysMallId, string platformType, string itemSku, string title, string country, string dimension
    const {
      sysMallId,
      platformType,
      itemSku,
      title,
      country,
      dimension
    } = data
    return this.nativeService.callFunction('CheckListingRepeat', sysMallId, platformType, itemSku, title, country, dimension)
  }

  /**
   *
   * @param {object} data
   */
  SaveListingRecord(data) {
    // long sysMallId, int platformType, string itemSku, string title, string listingId, string country, string mallId, long categoryId, string skuDatas = ""
    const {
      sysMallId,
      platformType,
      itemSku,
      title,
      listingId,
      country,
      mallId,
      categoryId,
      skuDatas
    } = data

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
   * @param relationCategoryId 上家类目id
   * @param country 站点
   * @param platformId 上家平台
   * @param isUseCommon
   */
  getCategoryRelation(relationCategoryId, country, platformId, isUseCommon = '0') {
    // console.log(relationCategoryId, country, platformId, isUseCommon)
    return this.nativeService.callCategoryFunction('GetCategoryRelation', relationCategoryId, country, platformId, isUseCommon)
    return this.nativeService.callCategoryFunction('GetCategoryRelation', relationCategoryId.toString(), country, platformId.toString(), isUseCommon)
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
   * @param country :country站点
   * @param categoryId :categoryId类目id
   * @param isParent :isParent 类目的父级标识：1传入的类目作为父级查询；0当前类目查询
   * @param tableType : string
   */
  async getCategoryTbInfo(country, categoryId = '0', isParent = '1', tableType = '') {
    return await this.nativeService.callCategoryFunction('GetCategoryInfo', country, categoryId.toString(), isParent.toString(), tableType)
  }
  /**
   * 获取类目属性
   */
  getAttributeInfo(country, categoryId = '0', isNewOpen = '0', tableType = '', isMandatoryAttr = '1') {
    // console.log(country, categoryId, isNewOpen, tableType , isMandatoryAttr )
    return this.nativeService.callCategoryFunction('GetAttributeInfo', country, categoryId.toString(), isNewOpen, tableType, isMandatoryAttr)
  }

  /**
   * 同步类目属性
   * @param list 数组
   * @param isNative shopee 1 皮皮虾 2
   */
  uploadCateGoryAttr(list, isNative = '1') {
    return this.nativeService.callCategoryFunction('UploadCateGoryAttr', JSON.stringify(list), isNative)
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
    const {
      country,
      categoryId,
      dataSource,
      maxAmount,
      minAmount
    } = data
    return this.nativeService.callCategoryFunction('UploadSpecByCategoryId', country, categoryId + '', JSON.stringify(dataSource), maxAmount, minAmount)
  }

  UploadTbCatAttr(data) {
    const {
      categoryId,
      dataSource
    } = data
    return this.nativeService.callCategoryFunction('UploadTbCatAttr', categoryId + '', JSON.stringify(dataSource))
  }

  /**
   * @name :
   * @param  {
   * page:1,
   * country:'MY'
   * categoryId:'123'
   * type:'0' 类目来源
   * perpage:10,
   * parentCategoryTree:[]
   * }
    站点选择全部的时候 country为null
   parentCategoryTree：类目id父级集合
   */
  getBlackCategory(data) {
    return this.nativeService.callCategoryFunction('GetCategoryBlackList', JSON.stringify(data))
  }

  /**
   * @name :
   * @param  {
   * data[0] categoryId:类目id,
   * data[1] country:站点,
   * data[2] categoryPTree:[]父级类目id集合
   * }
   */
  addBlackCategory(data) {
    return this.nativeService.callCategoryFunction('AddCategoryBlackInfo', data[0] + '', data[1] + '', JSON.stringify(data[2]))
  }

  /**
   addBlackCategory(data) {
    return this.nativeService.callCategoryFunction('AddCategoryBlackInfo', data[0] + '', data[1] + '', data[2] + '')
  }
   /**
   * @name :
   * @param  {
   * id:黑名单id（系统id）
   * }
   */
  deleteBlackCategory(id) {
    return this.nativeService.callCategoryFunction('DeleteCategoryBlackInfo', id + '')
  }

  /**
   * @name :
   * @param  {
   * data[0]:startTime:yyyy-MM-dd 00:00:00
   * data[1]:endTime:yyyy-MM-dd 23:59:59
   * }
   */
  getStatisticsNew(data) {
    return this.nativeService.callFunction('GetStatisticsNew', data[0], data[1])
  }

  /**
   deleteBlackCategory(id) {
    return this.nativeService.callCategoryFunction('DeleteCategoryBlackInfo', id + '')
  }
   /**
   * 成交价格建议
   * @param {
   *  platform_id:站点ID
   *  order_by:排序方式
   *  cat_id_1:一级类目
   *  cat_id_2:二级类目
   *  cat_id_3:三级类目
   * } data
   * @returns
   */
  getAvgPrice(data) {
    return this.nativeService.callDianBaShopeeInfo('GetAvgPrice', JSON.stringify(data))
  }

  /**
   * @name :获取热搜词列表
   * @param : {
   * platform_id: '',国家code
   * cat_id_1: '',
   * cat_id_2: '',
   * }
   *
   */
  getKeyWord(data) {
    data['order_by'] = 'keyword_month_sales'
    return this.nativeService.callDianBaShopeeInfo('GetKeyWord', JSON.stringify(data))
  }

  /**
   * @name :获取爆款选品列表
   * @param : {
   * page：页码
   * page_size：页数据量
   * platform_id：参考成交价格建议
   * cat_id：当前选中的类目id（当前选中二级类目，三级类目未选择，这里传选择的二级类目id）
   * level：类目级别（一级 or 二级 or ）
   * price：12_35 价格范围
   * month_sales：12_35 月销量
   * increment_like_count：12_35 点赞数
   * increment_item_rating：12_35 评论数
   * location： -1   （-1：本地  -2：海外）出货地点
   * shopType：2   （2：全部  1：官方店铺  0：非官方店铺） 店铺类型
   * sortBy：1  （1：飙升  2：热门 ）排序
   *}
   */
  searchShopeeHotGoods(data) {
    return this.nativeService.callDianBaShopeeInfo('SearchShopeeHotGoods', data.page, data.page_size, data.platform_id, data.cat_id, data.level, data.price, data.month_sales,
      data.increment_like_count, data.increment_item_rating, data.location, data.shopType, data.sortBy)
  }

  /**
   * @name :品牌词库
   * @param : {
   * page: 页码
   * perpage：页码大小
   * word：关键词
   * country：站点
   * source：词来源
   * type：关键词类别
   * start_time：
   * end_time：
   *}
   */
  getBannedWordList(data) {
    return this.nativeService.callCategoryFunction('GetBannedWordList', JSON.stringify(data))
  }

  /**
   * @name :品牌词库添加
   */
  addBannedWord(data) {
    return this.nativeService.callCategoryFunction('AddBannedWord', data.word, data.country, data.type)
  }

  /**
   * @name :品牌词库删除
   */
  deleteDannedWord(data) {
    return this.nativeService.callCategoryFunction('DeleteDannedWord', data.toString())
  }

  /**
   * 获取类目
   * @param {array} data
   * data[0]:country站点
   * data[1]:categoryId类目id
   * data[2]:isParent 类目的父级标识：1传入的类目作为父级查询；0当前类目查询
   * data[3]: 'tbCategory'
   */
  getCategory(data) {
    // console.log(JSON.stringify(data))
    return this.nativeService.callCategoryFunction('GetCategoryInfo', data[0] + '', data[1] + '', data[2] + '', data[3])
  }
  /**
   * 获取产品中心类目
   */
  getCategoryInfo(data) {
    return this.nativeService.callProductCenter('GetCategoryInfo', data.toString())
  }
  /**
   * 获取产品中心列表数据
   */
  getProductList(data) {
    return this.nativeService.callProductCenter('GetProductList', JSON.stringify(data))
  }

  /**
   * 获取产品中心产品skulist
   */
  getProductSkuList(data) {
    return this.nativeService.callProductCenter('GetProductSkuList', data.toString())
  }
  /**
   * @name : 更新产品中心库存
   * @param  {*}
   * @param {*} skuId
   * @param {*} stock
   */
  updateSkuStock(skuId, stock) {
    return this.nativeService.callProductCenter('UpdateSkuStock', skuId.toString(), stock.toString())
  }
  delgoods(data) {
    return this.nativeService.callProductCenter('DeleteProduct', data.productId, data.productUid)
  }

  /**
   * 获取sku选项默认配置
   */
  getskucode() {
    return this.nativeService.callProductCenter('GetStaticSkuCode')
  }

  /**
   * 获取产品详情
   */
  getdetails(data) {
    return this.nativeService.callProductCenter('GetProductDetail', data.priductid, data.language)
  }

  /**
   * 获取shopee地址
   */
  getShopeeAddress(platform, type, parant) {
    return this.nativeService.callAddrHelper('GetAddress', platform, type, parant.toString())
  }
  // }

  /**
   * @name : 获取Lazada的订单详情
   * @param  {country} 站点
   * @param  {cookieStr} 登录信息
   * @param  {orderId} 拍单订单id
   */
  async getLazadaOrderDetail(country, cookieStr, orderId) {
    return await this.nativeService.callLazadaService('GetLazadaOrderDetail', country, cookieStr, orderId)
  }
  /**
   * @name : 获取订单支付方式
   * @param  {country} 站点
   * @param  {cookieStr} 登录信息
   * @param  {orderDetial} 获取Lazada的订单详情接口返回值
   * @param  {shotOrderSn} 拍单订单号
   */
  async getLazadaPayMethod(country, cookieStr, orderDetial, shotOrderSn) {
    return await this.nativeService.callLazadaService('GetPayMethod', country, cookieStr, orderDetial, shotOrderSn)
  }
  /**
   * @name :
   * @param  {String} sysOrderIds 系统订单id，用逗号隔开
   */
  async getSkuRelation(sysOrderIds) {
    return await this.nativeService.callSkuRelationClient('GetBySysOrderIds', sysOrderIds.toString())
  }
  /**
   * @name : 保存映射
   * @param  {*}
   * @param {*} SkuRelation
   */
  async saveSkuRelation(SkuRelation) {
    return await this.nativeService.callSkuRelationClient('SaveGoodsSkuRelation', SkuRelation)
  }

  /** 上报面单信息
   * @name :
   * @param  {*}
   * @param {*} sysMallId
   * @param {*} mallId
   * @param {*} urlObj [{"url":"https://www.baidu.com","orderSn":"200310ERCFQE5NUT"}]
   */
  async saveFaceSheetInfo(sysMallId, mallId, urlObj) {
    return await this.nativeService.callOrderAndMallUpload('SaveFaceSheetInfo', sysMallId.toString(), mallId.toString(), JSON.stringify(urlObj))
  }

  /**
   * @name : 上报平台物流单号
   * @param  {*}
   * @param {*} sysMallId
   * @param {*} mallId
   * @param {*} trackObj [{"orderId":"","orderSn":"200310ERCFQE5NUT","channel_id":"","trackingNo":"9999595959595"}]
   */
  async saveLogisticsInfo(sysMallId, mallId, trackObj) {
    return await this.nativeService.callOrderAndMallUpload('SaveLogisticsInfo', sysMallId, mallId, JSON.stringify(trackObj))
  }
  /**
   * @name : 上报平台订单信息
   * @param  {*}
   * @param {*} sysMallId
   * @param {*} mallId
   * @param {*} orderData
   */
  async saveOrder(sysMallId, mallId, orderData) {
    return await this.nativeService.callOrderAndMallUpload('SaveOrder', sysMallId, mallId, JSON.stringify(orderData))
  }
  /**
   * @name : 上报售后订单信息
   * @param  {*}
   * @param {*} sysMallId
   * @param {*} mallId
   * @param {*} afterOrderData
   */
  async saveAfterOrder(sysMallId, mallId, afterOrderData) {
    return await this.nativeService.callOrderAndMallUpload('SaveAfterOrder', sysMallId, mallId, JSON.stringify(afterOrderData))
  }

  /* @name :
   * @param  {String} sysOrderIds 系统订单id，用逗号隔开
   */
  async getSkuRelation(sysOrderIds) {
    return await this.nativeService.callSkuRelationClient('GetBySysOrderIds', sysOrderIds)
  }
}

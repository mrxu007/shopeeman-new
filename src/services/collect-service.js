export default class CollectService {
  nativeService = window['CollectBridgeService'];
  /**
   *关键字采集
   * @param {*} platform 平台ID
   * @param {Page:string,Key:string,Sort:string,SortType:string}  mallInformationModel 参数实体
   * @returns
   */
  querySpuByKeyworld(platform, mallInformationModel) {
    return this.nativeService.querySpuByKeyworld(platform, mallInformationModel)
  }
  /**
   * 淘宝关键词采集新接口
   * @param {*} keyword 关键词
   * @param {*} pageIndex 页数
   * @param {*} endPrice
   * @param {*} startPrice
   * @returns
   */
  tbQuerySpuByKeyworldNew(keyword, pageIndex, endPrice, startPrice) {
    return this.nativeService.tbQuerySpuByKeyworldNew(keyword, pageIndex, endPrice, startPrice)
  }
  // /**
  //  * 拼多多关键词采集新接口
  //  * @param {*} keyWord 关键词
  //  * @param {*} MinPrice 最小价格
  //  * @param {*} MaxPrice 最大价格
  //  * @param {*} MinSales 最小销量
  //  * @param {*} MaxSales 最大销量
  //  * @param {*} Page 页数
  //  * @param {*} SelectedLine 关键词传1  云数据传2
  //  * @returns
  //  */
  // pddQuerySpuByKeyworldNew(keyWord, MinPrice, MaxPrice, MinSales, MaxSales, Page, SelectedLine = 1) {
  //   return this.nativeService.pddQuerySpuByKeyworldNew(keyWord, MinPrice, MaxPrice, MinSales, MaxSales, Page, SelectedLine)
  // }
  /**
   *拼多多整店采集
   * @param {PddMallInformation:{
  *  ShopId:string,
  *  TokenParams:string, token_params={"token": "4NMSL7R342JS54P5Y2Y6MBFRF2E46G2LLYMZWNAXZTE3CX256YFQ1101851", "ua": "Mozilla/5.0 (Linux; Android 7.1.2; m3 note Build/NJH47F; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.109 Mobile Safari/537.36 pddmt_android_version/2.5.10 pddmt_android_build/2051001 pddmt_android_channel/qihu360", "pdduid": "17752623061", "api_uid": "CiHWXF9pwc9gEQBZPLf+Ag==", "ip": "27.42.139.193:44288"}
  * }}  mallInformationModel
  */
  searchPddMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('SearchPddMallGoodsAsync', JSON.stringify(mallInformationModel))
  }
  /**
   * 淘宝整店采集
   * @param {TbMallInformation:{
      *  ShopId:string,
      *  TokenParams:string, token_params={"token": "4NMSL7R342JS54P5Y2Y6MBFRF2E46G2LLYMZWNAXZTE3CX256YFQ1101851", "ua": "Mozilla/5.0 (Linux; Android 7.1.2; m3 note Build/NJH47F; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.109 Mobile Safari/537.36 pddmt_android_version/2.5.10 pddmt_android_build/2051001 pddmt_android_channel/qihu360", "pdduid": "17752623061", "api_uid": "CiHWXF9pwc9gEQBZPLf+Ag==", "ip": "27.42.139.193:44288"}
      * }}  mallInformationModel
   */
  searchtbMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('SearchTbMallGoodsAsync', JSON.stringify(mallInformationModel))
  }
  /**
   * 1688整店采集
   * @param {*} mallInformationModel 1688链接实体
   * @returns 返回采集数据
   */
  searchAliBaBaMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('SearchAliBaBaMallGoodsAsync', JSON.stringify(mallInformationModel))
  }
  /**
   * 获取云数据库top20万热词类目
   * @param {*} Keyword string 关键词
   * @returns
   */
  getKeyCategory(Keyword) {
    return this.nativeService.getKeyCategory(Keyword)
  }
  /**
   * 获取云数据库top20万热词信息
   * @param {*} Keyword string 关键词
   * @param {*} firstCategoryId 类目ID
   * @returns
   */
  getNewsByCategory(Keyword, firstCategoryId) {
    return this.nativeService.getNewsByCategory(Keyword, firstCategoryId)
  }
  /**
   * 云数据库选择类目导出相同主营类目店铺ID
   * @param {*} CategoryId 类目ID
   * @returns
   */
  getMallIdByCategory(CategoryId) {
    return this.nativeService.getMallIdByCategory(CategoryId)
  }
  /**
   *
   * @param {*} CatId 类目ID
   * @param {*} CatId2 类目ID2
   * @param {*} CatId3 类目ID3
   * @returns
   */
  getGoodsIdByCat3Id(CatId, CatId2, CatId3) {
    return this.nativeService.getGoodsIdByCat3Id(CatId, CatId2, CatId3)
  }
  /**
   *类目采集
   * @param {{mallInformationModel:{
   *  item:'', page='', "MinSales": "", "MaxSales": "", "MinPrice": "", "MaxPrice": "}
   * }}} mallInformationModel 类目采集实体
   * @returns
   */
  queryByCategory(mallInformationModel) {
    return this.nativeService.queryByCategory(mallInformationModel)
  }
  // /**
  //  * 获取拼多多店铺ID
  //  * @param {*} goodsID 商品id
  //  * @returns 直接返回店铺id给你
  //  */
  // pddQueryDetailByGoodId(goodsID) {
  //   return this.nativeService.callFunction('PddQueryDetailByGoodId', goodsID)
  // }
  /**
   * 链接分析
   * @param {*} searchLink url链接
   */
  getMallByLink(searchLink) {
    return this.nativeService.getMallByLink(searchLink)
  }
  /**
   * 获取过期时间
   */
  getexpiredDate() {
    return this.nativeService.getexpiredDate()
  }
  /**
   * 上传最新过期时间
   * @param {*} expiredDate 时间
   */
  updateExpiredDate(expiredDate) {
    return this.nativeService.updateExpiredDate(expiredDate)
  }
  /**
   *京喜整店采集
   * @param {JxMallInformation:{
  *  ShopId:string,1000350045
  *  Url:
  *  SortType:string,//sort_totalsales15_desc  销量排序，sort_totalsales15_desc  价格升序，sort_dredisprice_asc  价格降序,
  *  page:number,
  * }}  mallInformationModel
  */
  searchJxMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('SearchJxMallGoodsAsync', JSON.stringify(mallInformationModel))
  }
  /**
   * 拼多多详情接口
   * @param {*} id 商品ID
   * @returns
   */
  queryPddDetailByGoodId(id) {
    console.log('id', id)
    return this.nativeService.queryPddDetailByGoodId(id)
  }

  /**
   *
   * @param {*} date //当前日期
   * @param {*} page //当前页码
   * @returns
   */
  queryDbSearchGoodsByTop(date, page) {
    return this.nativeService.queryDbSearchGoodsByTop(date, page)
  }
  /**
   * 拼多多数据净化
   * @param {*} goodsId 商品ID
   * @param {*} configtemp 过滤实体
   * @param {*} temp 类目实体
   * @returns
   */
  filterPddDetail(goodsId, configtemp, temp) {
    return this.nativeService.filterPddDetail(goodsId, configtemp, temp)
  }
  /**
     * 淘宝数据净化
     * @param {*} goodsId 商品ID
     * @param {*} configtemp 过滤实体
     * @param {*} temp 类目实体
     * @returns
     */
  filterTbDetail(goodsId, configtemp, temp) {
    return this.nativeService.filterTbDetail(goodsId, configtemp, temp)
  }
  /**
   *关键词获取拼多多商品新接口id
   *@param {*} paramsObj  参数实体
   */
  pddQuerySpuByKeyworldNew(paramsObj) {
    return this.nativeService.pddQuerySpuByKeyworldNew(paramsObj)
  }
  /**
   *拼多多商品id获取商品
   *@param {*} goodsId  商品ID
   */
  pddQueryDetailByGoodId(goodsId) {
    return this.nativeService.pddQueryDetailByGoodId(goodsId)
  }
  /**
   *拼多多商品id获取店铺信息
   *
   */
  pddMallInfo(goodsId, mallId) {
    return this.nativeService.pddMallInfo(goodsId, mallId)
  }
  /**
   *拼多多获取拼购数
   */
  pddGetTotal(goodsId) {
    return this.nativeService.pddGetTotal(goodsId)
  }
}

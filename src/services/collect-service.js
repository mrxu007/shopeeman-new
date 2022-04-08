export default class CollectService {
  nativeService = window['CollectBridgeService']

  // /**
  //  * 链接分析
  //  * @param {*} searchLink url链接
  //  */
  // getMallByLink(searchLink) {
  //     return this.nativeService.getMallByLink(searchLink)
  // }

  // /**
  //  *京喜整店采集
  //  * @param {JxMallInformation:{
  // *  ShopId:string,1000350045
  // *  Url:
  // *  SortType:string,//sort_totalsales15_desc  销量排序，sort_totalsales15_desc  价格升序，sort_dredisprice_asc  价格降序,
  // *  page:number,
  // * }}  mallInformationModel
  // */
  // searchJxMallGoodsAsync(mallInformationModel) {
  //     return this.nativeService.callFunction('SearchJxMallGoodsAsync', JSON.stringify(mallInformationModel))
  // }
  // 关键词采集
  querySpuByKeyworld(platformId, params) {
    return this.nativeService.querySpuByKeyworld(platformId, JSON.stringify(params))
  }

  // 采集商品详情
  queryDetailById(platformId, collectGoodsLinkModel, isUserCache) { // collectGoodsLinkModel 这个参数国内没有
    return this.nativeService.queryDetailById(platformId, collectGoodsLinkModel, isUserCache)
  }

  // 检查店铺链接是否合规，并获取店铺信息
  getMallByLink(link) {
    return this.nativeService.getMallByLink(link)
  }

  // 整店采集------------------------------

  // *拼多多整店采集
  searchPddMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('SearchPddMallGoodsAsync', JSON.stringify(mallInformationModel))
  }

  // 淘宝整店采集
  searchTbMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('SearchTbMallGoodsAsync', JSON.stringify(mallInformationModel))
  }

  // 1688
  searchAliBaBaMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('SearchAliBaBaMallGoodsAsync', JSON.stringify(mallInformationModel))
  }

  // lazada
  searchLazadaMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('SearchLazadaMallGoodsAsync', JSON.stringify(mallInformationModel))
  }

  // 京喜/京东
  searchJxMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('SearchJxMallGoodsAsync', JSON.stringify(mallInformationModel))
  }

  // shopee
  searchShopeeMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('SearchShopeeMallGoodsAsync', JSON.stringify(mallInformationModel))
  }

  // 速卖通
  searchExpressMallGoodsAsync(mallInformationModel) {
    return this.nativeService.callFunction('searchExpressMallGoodsAsync', JSON.stringify(mallInformationModel))
  }

  // 以图搜图
  imgSearch(platform, params) {
    return this.nativeService.imgSearch(platform - 0, JSON.stringify(params))
  }

  // 天猫海外采集
  queryTmCrossBorder(token, params) {
    return this.nativeService.queryTmCrossBorder(token, JSON.stringify(params))
  }

  // 获取类目名
  getGoodsCat(category_id, source, site='') {
    console.log('getGoodsCat',category_id, source, site)
    return this.nativeService.getGoodsCat(category_id, source, site)
  }
  // 创建系统商品编码
  createSysGoodsNo(goodsId, platform) {
    return this.nativeService.createSysGoodsNo(goodsId, platform)
  }
  // 创建系统商品规格编码
  createSysSkuNo(goodsId, skuId, platform) {
    return this.nativeService.createSysSkuNo(goodsId, skuId, platform)
  }
  /**
   * 保存/更新定时刊登任务:
   * @param cronPublishTask {
   *   country  // 国家Code
   *   mall_names // 店铺名称（逗号分隔）
   *   mall_Ids // 店铺Id（逗号分隔）
   *   task_name  // 任务名称
   *   status // 执行状态（1：已执行，2：部分失败；3：待执行，4：待启动）
   *   exec_time  // 执行时间
   *   goods_count  // 商品数量
   *   success_count  // 成功数量
   *   fail_count // 失败数量
   *   ext_info //自定义
   *   created_at //创建时间
   * }
   * @returns {*}
   */
  saveCronPublishTask(cronPublishTask){
    return this.nativeService.saveCronPublishTask(cronPublishTask)
  }

  /**
   * 查询定时刊登任务
   * @param country
   * @param status
   * @param taskName
   * @param startTime
   * @param endTime
   * @returns {*}
   */
  getCronPublishTask(country,status,taskName,startTime,endTime){
    return this.nativeService.getCronPublishTask(country,status,taskName,startTime,endTime)
  }

  /**
   * 保存/更新定时刊登配置表，传入JSON
   * @param cronPublishConfig {
   *   task_id // 任务id
   *   publish_config // 配置信息
   * }
   */
  saveCronPublishConfig(cronPublishConfig){
    return this.nativeService.saveCronPublishConfig(cronPublishConfig);
  }

  /**
   * 删除定时刊登任务
   * @param ids
   * @returns {*}
   */
  deleteCronPublishTask(ids){
    return this.nativeService.deleteCronPublishTask(ids)
  }

  /**
   * 删除定时刊登配置表
   * @param ids
   * @returns {*}
   */
  deleteCronPublishConfig(ids){
    return this.nativeService.deleteCronPublishConfig(ids)
  }

  /**
   * 删除定时刊登商品表
   * @param ids
   * @returns {*}
   */
  deleteCronPublishGoods(id,status ='',oriGoodsId =''){
    return this.nativeService.deleteCronPublishGoods(id,status,oriGoodsId)
  }


}

export default class CollectService {
    nativeService = window['CollectBridgeService'];

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
}

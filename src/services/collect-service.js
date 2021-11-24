export default class CollectService {
    nativeService = window['CollectBridgeService'];

    // /**
    //  *拼多多整店采集
    //  * @param {PddMallInformation:{
    // *  ShopId:string,
    // *  TokenParams:string, token_params={"token": "4NMSL7R342JS54P5Y2Y6MBFRF2E46G2LLYMZWNAXZTE3CX256YFQ1101851", "ua": "Mozilla/5.0 (Linux; Android 7.1.2; m3 note Build/NJH47F; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.109 Mobile Safari/537.36 pddmt_android_version/2.5.10 pddmt_android_build/2051001 pddmt_android_channel/qihu360", "pdduid": "17752623061", "api_uid": "CiHWXF9pwc9gEQBZPLf+Ag==", "ip": "27.42.139.193:44288"}
    // * }}  mallInformationModel
    // */
    // searchPddMallGoodsAsync(mallInformationModel) {
    //     return this.nativeService.callFunction('SearchPddMallGoodsAsync', JSON.stringify(mallInformationModel))
    // }
    // /**
    //  * 淘宝整店采集
    //  * @param {TbMallInformation:{
    //     *  ShopId:string,
    //     *  TokenParams:string, token_params={"token": "4NMSL7R342JS54P5Y2Y6MBFRF2E46G2LLYMZWNAXZTE3CX256YFQ1101851", "ua": "Mozilla/5.0 (Linux; Android 7.1.2; m3 note Build/NJH47F; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.109 Mobile Safari/537.36 pddmt_android_version/2.5.10 pddmt_android_build/2051001 pddmt_android_channel/qihu360", "pdduid": "17752623061", "api_uid": "CiHWXF9pwc9gEQBZPLf+Ag==", "ip": "27.42.139.193:44288"}
    //     * }}  mallInformationModel
    //  */
    // searchtbMallGoodsAsync(mallInformationModel) {
    //     return this.nativeService.callFunction('SearchTbMallGoodsAsync', JSON.stringify(mallInformationModel))
    // }
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
}

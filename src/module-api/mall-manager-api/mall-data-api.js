/*
 * @Author: your name
 * @Date: 2021-11-03 18:05:34
 * @LastEditTime: 2021-11-04 12:28:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\module-api\mall-manager-api\mall-data-api.js
 */
import { formatDuring } from '../../util/util'
class MallDataApi {
    constructor(that) {
        this._this = that
    }
    //店铺数据（同步店铺数据）-获取店铺不同状态商品数量
    /**
     * @name : 
     * @param  {*}
     * @param {*} mallInfo
     * @param {*} api
     */
    async getProductStatisticalData(item, api) {
        try {
            const {
                platform_mall_id,
                country
            } = item
            const params = {
                'mallId': platform_mall_id,
                'version': '3.1.0'
            }
            let res = await this._this.$shopeemanService.getChinese(country, api, params)
            res = JSON.parse(res)
            if (res.status === 200) {
                let resData = res && res.data && JSON.parse(res.data) && JSON.parse(res.data).data
                if (resData) {
                    item['all_product_num'] = resData.product_count_for_limit + resData.unlisted_count + resData.banned_count
                    item['active_product_num'] = resData.product_count_for_limit //商品总数（需上报）---上架产品数
                    item['unlisted_product_num'] = resData.unlisted_count //已下架商品数量（需上报）
                    item['banned_product_num'] = resData.banned_count //禁卖商品数量（需上报）
                    item['mall_quota'] = resData.count_for_limit //店铺商品总数上限（需上报）--店铺额度
                    item['soldout_product_num'] = resData.sold_out_count //已售完商品数量（需上报）
                    // item[''] = resData.deleted_count //shopee删除商品数量
                    // item[''] = resData.deboosted_count //已压制商品数量
                }
                return {
                    code: 200,
                    data: resData || {}
                }
            }
            return {
                code: res.status,
                data: res.data
            }
        } catch (e) {
            return {
                code: -2,
                data: `theQuarterPoint-catch: ${e}`
            }
        }
    }
    //店铺数据（同步店铺数据）-获取店铺详情
    async getShopProfile(item, api) {
        try {
            const {
                platform_mall_id,
                country
            } = item
            const params = {
                'mallId': platform_mall_id,
                'version': '3.1.0'
            }
            let res = await this._this.$shopeemanService.getChinese(country, api, params)
            res = JSON.parse(res)
            console.log(res)
            if (res.status === 200) {
                let resData = res && res.data && JSON.parse(res.data) && JSON.parse(res.data).data
                if (resData) {
                    item['chat_response_rate'] = resData.shop.display_response_rate //聊天回应率
                    item['rating_star'] = resData.shop.rating_star.toFixed() //店铺评分（值保留两位小数 需上报）
                    item['fans_number'] = resData.shop.follower_count //关注店铺的粉丝数量（需上报） --粉丝量
                    item['followers_number'] = resData.user.follower_count //店铺关注粉丝数量（需上报）--关注量
                }
                return {
                    code: 200,
                    data: resData || {}
                }
            }
            return {
                code: res.status,
                data: res.data
            }
        } catch (e) {
            return {
                code: -2,
                data: `theQuarterPoint-catch: ${e}`
            }
        }
    }
    //店铺数据（同步店铺数据）-获取店铺订单未完成率
    async getShopMetricsvalue(item, api) {
        try {
            const {
                platform_mall_id,
                country
            } = item
            const params = {
                'mallId': platform_mall_id,
                'version': '3.1.0'
            }
            let res = await this._this.$shopeemanService.getChinese(country, api, params)
            res = JSON.parse(res)
            console.log(res)
            if (res.status === 200) {
                let resData = res && res.data && JSON.parse(res.data) && JSON.parse(res.data).data
                if (resData) {
                    item['order_non_fulfillment_rate'] = resData.non_fulfillment_rate //订单未完成率（需上报）
                }
                return {
                    code: 200,
                    data: resData || {}
                }
            }
            return {
                code: res.status,
                data: res.data
            }
        } catch (e) {
            return {
                code: -2,
                data: `theQuarterPoint-catch: ${e}`
            }
        }
    }
    //今日/昨日/过去七天/三十天访客数
    async getKeyMetrics(item, api, params, type) {
        try {
            const {
                platform_mall_id,
                country
            } = item
            let res = await this._this.$shopeemanService.getChinese(country, api, params)
            res = JSON.parse(res)
            console.log(res)
            if (res.status === 200) {
                let resData = res && res.data && JSON.parse(res.data) && JSON.parse(res.data).result
                if (resData) {
                    if (type === 'today') {
                        item['today_view_product_count'] = resData.shop_pv.value //商品浏览量（需上报）
                        item['today_view_person_count'] = resData.shop_uv.value //访客量（需上报）
                    } else if (type === 'yesterday') {
                        item['yesterday_view_product_count'] = resData.shop_pv.value //昨日商品浏览量（需上报）
                        item['yesterday_view_person_count'] = resData.shop_uv.value //访客量（需上报）
                    } else if (type === 'past7days') {
                        item['week_view_product_count'] = resData.shop_pv.value //近7天商品浏览量
                        item['week_view_person_count'] = resData.shop_uv.value //访客量（需上报）
                    } else if (type === 'past30days') {
                        item['month_view_product_count'] = resData.shop_pv.value //近30天商品浏览量（需上报）
                        item['month_view_person_count'] = resData.shop_uv.value //访客量（需上报）
                    }
                }
                return {
                    code: 200,
                    data: resData || {}
                }
            }
            return {
                code: res.status,
                data: res.data
            }
        } catch (e) {
            return {
                code: -2,
                data: `theQuarterPoint-catch: ${e}`
            }
        }
    }
    //今日/昨日/过去七天/三十天实时聊天
    async getChatDashboard(item, api, params, type) {
        try {
            const {
                platform_mall_id,
                country
            } = item
            let res = await this._this.$shopeemanService.getChinese(country, api, params)
            res = JSON.parse(res)
            // console.log(res, "getChatDashboard")
            if (res.status === 200) {
                let resData = res && res.data && JSON.parse(res.data) && JSON.parse(res.data).result
                console.log(resData, "getChatDashboard")
                if (resData) {
                    if (type === 'today') {
                        if (!item.mall_datas) {
                            item.mall_datas = {}
                        }
                        item.mall_datas.ChatShopUvData = resData.shop_uv.value //客服不重复访客数
                        item.mall_datas.ChatsEnquiredData = resData.chats_enquired.value //客服询问数
                        item.mall_datas.ChatVisitorsEnquiredData = resData.visitors_enquired.value //客服访客询问数
                        item.mall_datas.ChatRespondedChatsData = resData.responded_chats.value //客服已回应数
                        item.mall_datas.ChatNonRespondedChatsData = resData.non_responded_chats.value //客服无回应数
                        item.mall_datas.ChatResponseTimeData = formatDuring(resData.response_time.value) //客服平均回应时间
                        item.mall_datas.ChatBuyersData = resData.buyers.value //客服咨询买家数
                        item.mall_datas.ChatOrdersData = resData.orders.value //客服咨询订单数
                        item.mall_datas.ChatUnitsData = resData.units.value //客服咨询件数
                        item.mall_datas.ChatSalesData = resData.sales.value //客服咨询销售额
                    } else if (type === 'yesterday') {
                        if (!item.mall_datas) {
                            item.mall_datas = {}
                        }
                        item.mall_datas.ChatShopUvData = resData.shop_uv.value //客服不重复访客数
                        item.mall_datas.ChatsEnquiredData = resData.chats_enquired.value //客服询问数
                        item.mall_datas.ChatVisitorsEnquiredData = resData.visitors_enquired.value //客服访客询问数
                        item.mall_datas.ChatRespondedChatsData = resData.responded_chats.value //客服已回应数
                        item.mall_datas.ChatNonRespondedChatsData = resData.non_responded_chats.value //客服无回应数
                        item.mall_datas.ChatResponseTimeData = formatDuring(resData.response_time.value) //客服平均回应时间
                        item.mall_datas.ChatBuyersData = resData.buyers.value //客服咨询买家数
                        item.mall_datas.ChatOrdersData = resData.orders.value //客服咨询订单数
                        item.mall_datas.ChatUnitsData = resData.units.value //客服咨询件数
                        item.mall_datas.ChatSalesData = resData.sales.value //客服咨询销售额
                    } else if (type === 'past7days') {
                        if (!item.mall_datas) {
                            item.mall_datas = {}
                        }
                        item.mall_datas.ChatShopUvData = resData.shop_uv.value //客服不重复访客数
                        item.mall_datas.ChatsEnquiredData = resData.chats_enquired.value //客服询问数
                        item.mall_datas.ChatVisitorsEnquiredData = resData.visitors_enquired.value //客服访客询问数
                        item.mall_datas.ChatRespondedChatsData = resData.responded_chats.value //客服已回应数
                        item.mall_datas.ChatNonRespondedChatsData = resData.non_responded_chats.value //客服无回应数
                        item.mall_datas.ChatResponseTimeData = formatDuring(resData.response_time.value )//客服平均回应时间
                        item.mall_datas.ChatBuyersData = resData.buyers.value //客服咨询买家数
                        item.mall_datas.ChatOrdersData = resData.orders.value //客服咨询订单数
                        item.mall_datas.ChatUnitsData = resData.units.value //客服咨询件数
                        item.mall_datas.ChatSalesData = resData.sales.value //客服咨询销售额
                    } else if (type === 'past30days') {
                        if (!item.mall_datas) {
                            item.mall_datas = {}
                        }
                        item.mall_datas.ChatShopUvData = resData.shop_uv.value //客服不重复访客数
                        item.mall_datas.ChatsEnquiredData = resData.chats_enquired.value //客服询问数
                        item.mall_datas.ChatVisitorsEnquiredData = resData.visitors_enquired.value //客服访客询问数
                        item.mall_datas.ChatRespondedChatsData = resData.responded_chats.value //客服已回应数
                        item.mall_datas.ChatNonRespondedChatsData = resData.non_responded_chats.value //客服无回应数
                        item.mall_datas.ChatResponseTimeData = formatDuring(resData.response_time.value) //客服平均回应时间
                        item.mall_datas.ChatBuyersData = resData.buyers.value //客服咨询买家数
                        item.mall_datas.ChatOrdersData = resData.orders.value //客服咨询订单数
                        item.mall_datas.ChatUnitsData = resData.units.value //客服咨询件数
                        item.mall_datas.ChatSalesData = resData.sales.value //客服咨询销售额
                    }
                }
                return {
                    code: 200,
                    data: resData || {}
                }
            }
            return {
                code: res.status,
                data: res.data
            }
        } catch (e) {
            return {
                code: -2,
                data: `theQuarterPoint-catch: ${e}`
            }
        }
    }
    //店铺数据（同步店铺数据）-拨款信息 /api/v3/finance/get_income_meta/
    async getIncomeMeta(item, api) {
        try {
            const {
                platform_mall_id,
                country
            } = item
            const params = {
                'mallId': platform_mall_id
            }
            let res = await this._this.$shopeemanService.getChinese(country, api, params)
            res = JSON.parse(res)
            console.log(res)
            if (res.status === 200) {
                let resData = res && res.data && JSON.parse(res.data) && JSON.parse(res.data).data
                if (resData) {
                    // item['frozen_amount_orders'] = resData.shop.display_response_rate //待拨款订单数
                    item['frozen_amount'] = resData.frozen //待拨款金额
                    item['lastweek_amount'] = resData.last_week_income //本周已拨款
                    item['lastmonth_amount'] = resData.last_month_income //本月已拨款
                    item['available_amount'] = resData.available //全部已拨款
                }
                return {
                    code: 200,
                    data: resData || {}
                }
            }
            return {
                code: res.status,
                data: res.data
            }
        } catch (e) {
            return {
                code: -2,
                data: `theQuarterPoint-catch: ${e}`
            }
        }
    }
    //店铺数据（同步店铺数据）-上传服务端
    async uploadMallData(item) {
        try {
            let params = {
                "allProduct": item.all_product_num,
                "bannedProduct": item.banned_product_num,
                "soldoutProduct": item.soldout_product_num,
                "unlistedProduct": item.unlisted_product_num,
                "activeProduct": item.active_product_num,
                "fansNumber": item.fans_number,
                "followersNumber": item.followers_number,
                "displayResponseRate":item.all_product_num, //?
                "ratingStar":item.rating_star,
                "nonFulfillmentRate":item.order_non_fulfillment_rate,
                "todayViewProductCount": item.today_view_product_count,
                "yesterdayViewProductCount":item.yesterday_view_product_count,
                "weekViewProductCount":item.week_view_product_count,
                "monthViewProductCount":item.month_view_product_count,
                "todayViewPersonCount":item.today_view_person_count,
                "yesterdayViewPersonCount":item.yesterday_view_person_count,
                "weekViewPersonCount":item.week_view_person_count,
                "monthViewPersonCount":item.month_view_person_count,
                "mallQuota":item.mall_quota,
                "mallDatas":{
                    "ChatShopUvData":item.mall_datas.ChatShopUvData,
                    "ChatsEnquiredData":item.mall_datas.ChatsEnquiredData,
                    "ChatVisitorsEnquiredData":item.mall_datas.ChatVisitorsEnquiredData,
                    "ChatRespondedChatsData":item.mall_datas.ChatRespondedChatsData,
                    "ChatNonRespondedChatsData":item.mall_datas.ChatNonRespondedChatsData,
                    "ChatResponseTimeData":item.mall_datas.ChatResponseTimeData,
                    "ChatBuyersData":item.mall_datas.ChatBuyersData,
                    "ChatOrdersData":item.mall_datas.ChatOrdersData,
                    "ChatUnitsData":item.mall_datas.ChatUnitsData,
                    "ChatSalesData":item.mall_datas.ChatSalesData
                },
                "sysMallId":item.id
            }
            let res = await this._this.$api.mallStatisticsSave(params)
            if(res.status === 200){
                return {
                    code: 200,
                    data: res.data.date || ''
                }
            }
            return {
                code: res.status,
                data: res.data
            }
        } catch (e) {
            return {
                code: -2,
                data: `theQuarterPoint-catch: ${e}`
            }
        }
    }
}
export {
    MallDataApi
}
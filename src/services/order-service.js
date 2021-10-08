import jxRequest from '../network/jx-request';
import applicationConfig from '../services/application-config';
import _ from 'lodash';
export default class orderService{
    networkService=jxRequest.jdRequest;
    jszNetworkService=jxRequest.jxRequest;
    /**
     * 搜索订单
     * @param {*} mall 
     * @param {{
     * current:number,//当前页
     * pageSize:number,
     * sortName:string,
     * orderId:string,
     * skuName:string,
     * orderCreateDateRange:string[],
     * orderCompleteDateRange:string[]
     * receiverName:string,//收件人
     * receiverTel:string//收件人电话
     * userPin:string,
     * skuId:string,
     * logiNo:string,       
     * paymentType:string,//支付方式
     * orderType:string,//订单类型
     * deliveryType:string,
     * storeId:string
     * huoHao:string,//货号
     * selectedTabName:string,//所有订单：allOrders，未付款：notPay，暂停：suspend，待出库：waitOut，已出库：hadOut，已完成：completed，已取消：canceled，已锁定：locked
     * }} paramter 
     */
    // async searchOrder(mall,data={current:1,pageSize:100,sortName:"asc",orderId:"",skuName:"",selectedTabName:"waitOut"}){
    //     const url="https://porder.shop.jd.com/order/orderlist";
    //     let response=await this.networkService.post(url,data,{headers:{
    //         cookies:mall.web_login_info,
    //         referer:"https://porder.shop.jd.com/order/orderlist/allOrders"
    //     }});
    //     console.log(response);
    //     if(response.status==200 && response.data.orderList){
    //         return response.data;
    //     }
    // }
    //搜索淘宝订单
    // async searchOrder(mall,formData={auctionType: 1,close: 0,pageNum: 1,pageSize: 15,queryMore: false,rxAuditFlag: 0,rxElectronicAllFlag: 0,rxElectronicAuditFlag: 0,rxHasSendFlag: 0,rxOldFlag: 0,rxSendFlag: 0,rxSuccessflag: 0,rxWaitSendflag: 0,tradeTag: 0,useCheckcode: false,useOrderInfo: false,errorCheckcode: false,action: 'itemlist/SoldQueryAction',prePageNo: 1}){
    async searchOrder(mall,formData){
        const url="https://trade.taobao.com/trade/itemlist/asyncSold.htm?event_submit_do_query=1&_input_charset=utf8&isFrame=true&from=tejia";
        let response=await this.networkService.post(url,formData,{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            cookies:mall.web_login_info,
            referer:"https://trade.taobao.com/trade/itemlist/list_sold_items.htm?isFrame=true&from=tejia"
        }});
        console.log(response);
        if(response.status==200 && response.data.mainOrders){
            return response.data;
        }
    }
    /**
     * 查找指定订单号
     * @param {*} mall 
     * @param {*} orderId 
     */
    async searchOrderById(mall,orderIds){
        if(orderIds){
            const result=[];
            const paramter={ "current":1,
            "pageSize":10,
            "sortName":"desc",
            "orderId":"",
            "skuName":"",
            "orderCreateDateRange":null,
            "orderCompleteDateRange":[],
            "receiverName":"",
            "receiverTel":"",
            "userPin":"",
            "skuId":"",
            "logiNo":"",
            "paymentType":"",
            "orderType":"",
            "orderSource":"",
            "deliveryType":"",
            "storeId":"",
            "huoHao":"",
            "orderStatusArray":[],
            "o2oStoreIds":null,
            "selectedTabName":"allOrders"};
            for (let index = 0; index < orderIds.length; index++) {
                const itemId = orderIds[index];
                paramter.orderId=itemId;
                const {orderList} = await this.searchOrder(mall,paramter);
                if(orderList){
                    result.push(...orderList);
                }
            }
            return result;
        }
        return null;
    }
    /**
     * 检测订单是否已同步过
     * @param {number} orderId 
     */
    async orderExist(orderId){
        const userInfo=await new applicationConfig().getUserInfo();
        if(!userInfo)
            return true;
        const url=`/api/order/checkExist?muid=${userInfo.muid}&orderSn=${orderId}`
        const response= await this.jszNetworkService.get(url);
        // console.log(response,"check order exist");
        return response.data.order_sn==orderId.toString();        
    }
    /**
     * 同步订单状态
     */
    async syncOrderStatus(orderId,orderStatus){
        const url="/api/order/updateOrderStatus";
        const data={orderSn:orderId,orderStatus:orderStatus};
        const response=await this.jszNetworkService.post(url,data);
        return response.data.status_code==200;
    }
    
    /**
     * 获取sku图片
     * @param {string[]} skuIds sku id 列表 
     */
    async getSkusImage(mall,skuIds){
        console.log(skuIds,"origin sku ids");
        const maxLength = 18;
        const skus=Array.from(new Set(skuIds));//去除重复值
        const newIds = _.chunk(skus,maxLength);
        console.log(skus,"new sku ids");

        let result={};
        return new Promise(async (resolve,reject)=>{
            for (let index = 0; index < newIds.length; index++) {
                const element = newIds[index];
                const ids=element.join(",");
                const url=`https://porder.shop.jd.com/order/global/getSkuImgs?skuIds=${ids}`;
                const response=await this.networkService.get(url,{
                    headers:{
                        cookies:mall.web_login_info,
                        referer:"https://porder.shop.jd.com/order/orderlist/allOrders"
                    }
                });
                Object.assign(result,response.data);
            }
            resolve(result);
        })
       
    }
    /**
     * 上传订单信息
     * @param {*} order 
     */
    async uploadOrderInfo(order){
        const url="/api/tbtj/order/sync";
        const response= await this.jszNetworkService.post(url,order);
        return response;
    }

    /**
     * 获取收件人电话号码
     */
    async getPhonenumber(mall,orderId){
        const url = `https://morder.shop.jd.com/api/orderlist/sensInfo/${orderId}`;
        let response = await this.networkService.get(url,{headers:{
            cookies:mall.web_login_info,
            "User-Agent":"Mozilla/5.0 (Linux; Android 9; ONEPLUS A6000 Build/PKQ1.180716.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044904 Mobile Safari/537.36;JM_ANDROID/4.1.0 Language/zh_CN Region/CN",
            referer:url,
        }});
        console.log(response);
        if(response.status==200 && response.data.privacyMobilePhone){
            return response.data.privacyMobilePhone;
        }
    }
    /**
     * 获取拆单树
     * @param {*} mall 
     * @param {*} orderId 
     */
    async getSplitOrderTree(mall,orderId){
        const url="https://porder.shop.jd.com/order/global/getSplitOrderTree?orderId="+orderId;
        let response = await this.networkService.get(url,{headers:{
            cookies:mall.web_login_info,
        }});
        console.log(response);
        if(response.status==200){
            return response.data;
        }
    }
    /**
     * 上传拆分订单树
     * @param {*} splitOrderInfo 
     */
    async uploadSplitOrderInfo(splitOrderInfo){
        const url="/api/order/splitDetailV2";
        const response= await this.jszNetworkService.post(url,splitOrderInfo);
        return response;
    }
}
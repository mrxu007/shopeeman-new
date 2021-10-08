import orderService from './order-service';
import jxRequest from '../network/jx-request';
import orderDetail from './order-detail';

export default class{
    jdNetworkService=jxRequest.jdRequest;
    jszNetworkService=jxRequest.jxRequest;
    mall=undefined;
    params=undefined;
    writeLog=undefined;
    orderService=new orderService();
    skuImageCache={};
    constructor(mall,params,logCallback){
        this.mall=mall;
        this.params=params;
        this.writeLog=logCallback;
    }

    async start(isForce=false){
        try {
            let {page,mainOrders} = await this.orderService.searchOrder(this.mall,this.params);
            if(!page){
                return this.writeLog(`没有获取到【${this.mall.platform_mall_name}】店铺的订单.`);
            }
            console.log(page);
            if(!page.totalNumber){
                this.writeLog(`没有获取到【${this.mall.platform_mall_name}】店铺的订单.`);
                return;
            }
            let allTotal = page.totalPage //获取总页数
            this.writeLog(`开始同步【${this.mall.platform_mall_name}】店铺订单,共查询到${page.totalNumber}单`);
            console.log(mainOrders,'mainOrders');
            let syncCount=1;
            while(mainOrders){
                for (let index = 0; index < mainOrders.length; index++) {
                const orderItem=mainOrders[index];
                this.writeLog(`正在同步订单【${syncCount}/${page.totalNumber}】【${orderItem.id}】`);
                await this.tbsyncOrder(this.mall,orderItem);
                syncCount++;
                }
                console.log(paramter.pageNum);
                paramter.pageNum++;
                const response=await this.orderService.searchOrder(mall,paramter);
                mainOrders = response.mainOrders
                if(response.mainOrders.length === 0){
                    mainOrders=undefined
                }
                if(paramter.pageNum > allTotal){
                    mainOrders=undefined
                }
            }
            }
            catch(e) {
                console.log(e);
                return this.writeLog(`【${this.mall.platform_mall_name}】店铺的订单获取完成`)
            }
        // let {page,mainOrders}= await this.orderService.searchOrder(this.mall,this.params);
        // console.log(page);
        // console.log(mainOrders);
        // if(!page.totalNumber){
        //     this.writeLog(`没有获取到【${this.mall.platform_mall_name}】店铺的订单.`);
        //     return false;
        // }
        // this.writeLog(`开始同步【${this.mall.platform_mall_name}】店铺订单,共查询到${page.totalNumber}单`);
        // let syncCount=1;
        // while(mainOrders !== []){
        //     const skuIds=this.getOrderSkuIds(orderList);
        //     const images=await this.orderService.getSkusImage(this.mall,skuIds);
        //     Object.assign(this.skuImageCache,images);//缓存sku图片信息
        //     for (let index = 0; index < mainOrders.length; index++) {
        //         const orderItem=mainOrders[index];
        //         this.writeLog(`正在同步订单【${syncCount}/${totalCount}】【${orderItem.orderId}】`);
        //         await this.syncOrder(this.mall,orderItem,{isForce:isForce,isUploadSplitOrder:true});
        //         console.log(syncCount);
        //         isForce = true
        //         syncCount++;
        //     }
        //     this.params.pageNum++;
        //     const response=await this.orderService.searchOrder(this.mall,this.params);
        //     mainOrders=response.mainOrders;
        // }
        // this.writeLog(`同步【${mall.platform_mall_name}】店铺订单同步完成.`);
    }
        /**
         * 同步单个订单并上传服务器
         */
    async tbsyncOrder(mall,orderItem){
        console.log(orderItem);
        console.log(mall.id);
        const {id,statusInfo:{text},orderInfo:{createTime},payInfo:{postType,actualFee},subOrders} = orderItem
        // const {id,statusInfo:{text},orderInfo:{createTime},payInfo:{postType,actualFee},subOrders} = this.mainOrders[0]
        // console.log(id,text,createTime,postType,actualFee,subOrders);
        let newtext = JSON.parse(
            JSON.stringify(text)
            .replace('全部', 1)
            .replace('等待买家付款', 2)
            .replace('买家已付款', 3)
            .replace('卖家已发货', 4)
            .replace('交易成功', 5)
            .replace('交易关闭', 6)
            .replace('待付款和待发货订单', 7)
            .replace('未完成的订单', 8)
            .replace('退款中的订单', 9)
            .replace('定金已付', 10)
            .replace('异常订单', 11)
        )
        let order = {
            sys_mall_id: mall.id,
            order_id: id,
            main_order_sn:id,
            order_status: newtext,
            payment_method: 1,
            order_create_time: createTime,
            order_update_time: this.creatDate(),
            pay_time: createTime,
            promised_shipping_times:'2020-12-12',
            total_amount: actualFee,
            // buyer_shipping_cost: postType.match(/\d+/g).join("."),
            buyer_shipping_cost: postType.match(/\d+/g)[0],
            // actual_total_shipping_cost: postType.match(/\d+/g).join("."),
            actual_total_shipping_cost: postType.match(/\d+/g)[0],
            platform_remark: '',
            seller_id:'0'
        }
        let goods_list = []
        for (let index = 0; index < subOrders.length; index++) {
            let GoodsID = await this.getGoodsID(mall,`https:${subOrders[index].itemInfo.itemUrl}`)
            console.log(subOrders[index])
            console.log(GoodsID);
            let newUrl = this.maxUrl(subOrders[index].itemInfo.pic)
            let obj = {
                goods_id:GoodsID,
                sku_id:subOrders[index].itemInfo.skuId.toString(),
                sku_name:JSON.stringify(...subOrders[index].itemInfo.skuText),
                goods_title:subOrders[index].itemInfo.title,
                discounted_price:subOrders[index].priceInfo.realTotal,
                original_price:subOrders[index].priceInfo.realTotal,
                goods_count:subOrders[index].quantity,
                sku_img:`https://gsnapshot.alicdn.com${newUrl}`,
                goods_url:`https:${subOrders[index].itemInfo.itemUrl}`,
            }
            goods_list.push(obj)
        }
        order.goods_list = goods_list
        console.log(order);
        try {
            let url = '/api/tbtj/order/sync'
            const { data } = await this.jszNetworkService.post(url,order)
        }
        catch(e) {
            this.writeLog(`同步【${id}】订单失败 错误原因:${e.response.data.data}.`,false);
        }
    }
    //获取淘宝清晰大图链接
    maxUrl(url){
        let jpeg = url.lastIndexOf("jpeg")
        console.log(jpeg);
        let newUrl = ''
        if(jpeg !== -1){
            newUrl = url.slice(16,url.indexOf('tblite')+6) + '.jpeg_430x430.jpg'
            console.log(newUrl);
        }
        else {
            newUrl = url.slice(16,url.indexOf('tblite')+6) + '.jpg_430x430.jpg'
            console.log(newUrl);
        }
        return newUrl
    }
    //获取当前时间
    creatDate() {
        this.dateList = []
        let base = new Date()
        let baseVal = [
        base.getFullYear(),
        base.getMonth() + 1,
        base.getDate() + ' '
        ].join('-')
        let aa = [base.getHours(), base.getMinutes(), base.getSeconds()].join(':')
        baseVal = baseVal.concat(aa)
        return baseVal
    }
    //淘宝获取商品id
    async getGoodsID(mall,url){
        // let mall = this.malls[1]
        // let url = 'https://trade.taobao.com/trade/detail/tradeSnap.htm?spm=a1z09.1.0.0.65a33606yRojam&tradeID=1421679927685622330&snapShot=true'
        const { data } = await this.jdNetworkService.get(url,{headers:{
            cookies:mall.web_login_info,
        }})
        let str = data.toString()
        let goodsID = str.match(/\\"itemId\\":([0-9]*)/)? str.match(/\\"itemId\\":([0-9]*)/)[1] : ''
        return goodsID
    }
    // async syncOrder(mall,orderItem,option={isForce:false,isUploadSplitOrder:true}){
    //     orderItem.sysMallId = mall.id;
    //     const isExist=await this.orderService.orderExist(orderItem.orderId);
    //         // 设置订单商品图片
    //     this.initializeOrderSkuImage(mall,orderItem);
    //     if(isExist && option.isForce == false){
    //         const success=await this.orderService.syncOrderStatus(orderItem.orderId,orderItem.orderStatus);
    //         this.writeLog(`订单【${orderItem.orderId}】已存在,订单状态更新${success?"成功":"失败"}.`)
    //         return success;
    //     }else{
    //         await this.delay(1000);//500毫秒调用一次，防止喝咖啡
    //         const result= await this.uploadNewOrderToService(mall,orderItem,option.isUploadSplitOrder);
    //         this.writeLog(`订单【${orderItem.orderId}】同步完成`)
    //         return result;
    //     }
    // }
   /**
         * 初始化订单商品图片
         */
    async initializeOrderSkuImage(mall,orderItem){
        if(orderItem.orderItems){
            for (let index = 0; index < orderItem.orderItems.length; index++) {
                const skuItem = orderItem.orderItems[index];
                skuItem.skuImg = this.skuImageCache[`${skuItem.skuId}`];
                if(!skuItem.skuImg){
                    const images=await this.orderService.getSkusImage(mall,[skuItem.skuId]);
                    Object.assign(this.skuImageCache,images);
                    skuItem.skuImg = this.skuImageCache[`${skuItem.skuId}`];
                }
            }
        }
    }
    //获取需要同步订单详情
    async allOrderDetai(mall){
        let url = '/api/tbtj/order/needSyncOrders'
        const { data } = await this.jszNetworkService.get(url)
        console.log(data);
        let orderList = data.data.ids
        this.writeLog(`共${orderList.length}订单需同步`)
        for (let index = 0; index < orderList.length; index++) {
            console.log(orderList[index]);
            let isflag =await this.syncOrderDetail(mall,orderList[index])
            this.writeLog(`正在同步【${orderList[index]}】订单详情信息`,isflag)
            this.delay(1000)
        }
    }
    async syncOrderDetail(mall,order){
          let url = "https://trade.taobao.com/trade/detail/trade_order_detail.htm"
          const { data } = await this.$jdrequest.get(url,{headers:{
            cookies:mall.web_login_info
          },
          params:{biz_order_id:order}
          })
          let str = data.toString().match(/JSON.parse\(('{.*}')\)/)
          console.log(str);
          if(str) {
            str = str[0]
            let data = eval(str.replace(/^\'|\'$/g,''))
            let cloendata = _.cloneDeep(data)
            console.log(cloendata);
            const { buyMessage,mainOrder:{id},tabs } = cloendata
            let params = {
              sys_mall_id:mall.id,
              order_id:id,
              main_order_sn:id,
              order_status:'3',
              platform_remark:buyMessage ? buyMessage : '' ,
              receiver_info:{
                receiverInfo:tabs[0].content.address,
                buyersChoose:tabs[0].content.shipType,
              }
            }
            console.log(params);
            const {data2} = await this.$api.upOrderDetail(params)
            console.log(data2);
            return true
            // this.$message.success(`同步${order.order_sn}订单详情成功`)
          }
          else {
            // this.$message.error('登录信息过期')
            return false
          }
        }

        /**
         * 上传新订单到服务器
         */
        async uploadNewOrderToService(mall,orderItem,isUploadSplitOrder=true){
            const orderDetail= await this.getOrderDetail(mall,orderItem);
            if(orderDetail){
                orderItem.orderDetail=orderDetail;
                const response= await this.orderService.uploadOrderInfo(orderItem);
                const {status_code,message}=response.data;
                if(status_code!=200){
                    this.writeLog(`订单【${orderItem.orderId}】上报失败:${message}`);
                    console.log(response,orderItem,"订单上报响应")
                    return true;
                }
                this.writeLog(`订单【${orderItem.orderId}】上报成功.`);
                if(orderItem.isSplitOrder == true && isUploadSplitOrder==true){
                    //拆分订单处理
                    const splitInfo = await this.orderService.getSplitOrderTree(mall,orderItem.orderId);
                    const splitOrders=this.getSplitOrderIds(splitInfo);
                    if(splitOrders){
                        const splitOrderItems=await this.orderService.searchOrderById(mall,splitOrders);
                        this.writeLog(`正在同步拆分订单【${splitOrders.join(',')}】`);
                        if(splitOrderItems){
                            for (let index = 0; index < splitOrderItems.length; index++) {
                                const item = splitOrderItems[index];
                                await this.syncOrder(mall,item,{isForce:true,isUploadSplitOrder:false});
                            }
                        }
                    }
                    await this.orderService.uploadSplitOrderInfo(splitInfo);
                }
                return true;
            }else{
                this.writeLog(`【${orderItem.orderId}】获取订单详情失败`,false);
                return false;
            }
        }
        /**
         * 获取拆分订单树种包含的所有订单id
         */
        getSplitOrderIds(splitInfo){
            const ids=[];
            if(splitInfo){
                ids.push(splitInfo.orderId);
                if(splitInfo.subNodes){
                    for (let index = 0; index < splitInfo.subNodes.length; index++) {
                        const item =  splitInfo.subNodes[index];
                        const itemIds=this.getSplitOrderIds(item);
                        if(itemIds){
                            ids.push(...itemIds);
                        }
                    }
                }
                return ids;
            }
            return null;
        }
        /**
         * 获取订单中sku id 列表
         */
        getOrderSkuIds(orders){
            if(orders){
                const skuIds=[];
                orders.forEach(element => {
                    if(element.orderItems){
                        element.orderItems.forEach(n=>{
                            if(n.skuId){
                                skuIds.push(n.skuId);
                            }
                        })
                    }
                });
                return skuIds;
            }
        }
        /**
         * 获取订单详情
         */
        async getOrderDetail(mall,order){
            try {
                const url="https://neworder.shop.jd.com/order/orderDetail";
                console.log(order.orderId,"获取订单详情")
                const response=await this.jdNetworkService.get(url,{
                    headers:{
                        cookies:mall.web_login_info,
                        referer:"https://porder.shop.jd.com/order/orderlist/allOrders"
                    },
                    params:{
                        orderId:order.orderId
                    }
                })
                let orderDetailSerices=new orderDetail(response.data);
                const phoneNumber=await this.orderService.getPhonenumber(mall,order.orderId);
                const orderId= orderDetailSerices.getOrderId();
                const buyerInfo= orderDetailSerices.getBuyerInfo();
                if(phoneNumber){
                    buyerInfo.mobile=phoneNumber;
                }
                const paymentInfo= orderDetailSerices.getPaymentInfo();
                const remark=orderDetailSerices.getRemark();//获取商家备注
                const buyerRemark=orderDetailSerices.getBuyerRemark();//获取买家浏览
                const result = {
                    orderId:orderId,
                    buyerInfo:buyerInfo,
                    paymentInfo:paymentInfo,
                    remark:remark,
                    
                    buyerRemark:buyerRemark
                };
                return result;
            } catch (error) {
                console.error(error);
                return null;
            }
        
        }
        dateFormat(time,fmt){
            var o = {
                "M+": time.getMonth() + 1, //月份 
                "d+": time.getDate(), //日 
                "h+": time.getHours(), //小时 
                "m+": time.getMinutes(), //分 
                "s+": time.getSeconds(), //秒 
                "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
                "S": time.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o){
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
        /**
         * 暂停n毫秒后返回
         */
        async delay(time){
            return new Promise((resolve)=>{
              const timeId=  setTimeout(() => {
                    clearTimeout(timeId);
                    resolve(true);
                }, time);
            });
        }
}

import axios from 'axios';
import jxAdapter from '../../network/jx-apdater';

export default class PddService{
    pddNetworkService=  axios.create({
        timeout: '5000',
        headers:{
          "User-Agent":"Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
        },
        withCredentials: true,
        adapter: config => {
          return jxAdapter(config)
        }
    })
    pddUid="";
    buyerAccount={};
    token="";
    constructor(buyerAccount){
        this.buyerAccount=buyerAccount;
        try {
            this.buyerAccount.loginCookies=JSON.parse(buyerAccount.login_info);
        } catch (error) {
            const items=buyerAccount.login_info.split(';');
            if(items){
                this.buyerAccount.loginCookies=[];
                items.forEach(element => {
                    const index=element.indexOf("=");
                    const name=element.slice(0,index);
                    const value=element.slice(index+1);
                    if(name && value){
                        this.buyerAccount.loginCookies.push({
                            Name:name,
                            Value:value,
                            Domain:"mobile.yangkeduo.com",
                        })
                    }
                   
                });
            }
        }
        this.token=this.getCookieValueByName("PDDAccessToken");
        this.pddNetworkService.defaults.headers.AccessToken=this.token;
        this.pddNetworkService.defaults.headers.cookies=this.buyerAccount.loginCookies;
    }
    /**
     * 获取用户信息
     */
    async getUserInfo(){
        try {
            const url=`http://mobile.yangkeduo.com/proxy/api/api/apollo/v3/user/active?pdduid=${this.pddUid}`;
            const response=await this.pddNetworkService.get(url,{
                headers:{
                    cookies:this.buyerAccount.loginCookies
                }
            });
            this.pddUid=response.data.uid;
            return response.data;
        } catch (error) {
            console.log(error);
            return {};
        }
       
    }
    /**
     * 获取拼多多订单物流信息
     * @param {*} orderSn 
     */
    async getPddLogisticsInfo(orderSn){
        const url=`https://api.yangkeduo.com/order/${orderSn}/shipping?query_type=1&scene_type=1`;
        const response=await this.pddNetworkService.get(url,{
            headers:{
                isGBK:false
            }
        });
        console.log("response",response);
        const {shipping} = response.data;
        if(shipping){
            const {shipping_name,tracking_number,shipping_id}=shipping;
            return {
                shippingName:shipping_name,
                trackingNumber:tracking_number,
                shippingId:shipping_id,
            }
        }
        return null;
    }
    getCookieValueByName(name){
        if(this.buyerAccount && this.buyerAccount.loginCookies){
           const item = this.buyerAccount.loginCookies.find(b=>b.Name==name);
           if(item){
               return item.Value;
           }
        }
    }
    /**
     * 查询售后订单
     */
    async queryAfterSalesOrders(offset=0,id=""){
        const url="https://mobile.yangkeduo.com/proxy/api/after_sales/list";
        const params={
            accesstoken:this.token,
            pdduid:this.pddUid,
            range:"all",
            offset:offset,
            waitHandleOffset:"0",
            waitProofOffset:"0"
        }
        if(id){
            params.id=id;
        }
       const response=await this.pddNetworkService.get(url,{params:params});
       return response.data;
    }
}
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d7297"],{7646:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var r=a("1da1"),n=a("d4ec"),c=a("bee2"),u=(a("96cf"),a("99af"),a("a9e3"),a("4d63"),a("ac1f"),a("25f0"),a("2ca0"),a("d81d"),a("b0c0"),a("7db0"),function(){function e(t){Object(n["a"])(this,e),this._this=t,this.mallList=[]}return Object(c["a"])(e,[{key:"getMallGoodsAmount",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={platform_mall_id:r,version:"3.1.0"},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/v3/product/get_product_statistical_data/?",n,{headers:{referer:"/portal/product/list/all"}});case 5:if(c=e.sent,c=JSON.parse(JSON.parse(c).data),0!==c.code){e.next=9;break}return e.abrupt("return",{code:200,data:c.data});case 9:return e.abrupt("return",{code:c.errcode,data:"".concat(c.errcode," ").concat(c.message)});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallGoodsAmount-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isNormalMall",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,c,u,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={platform_mall_id:r},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/v3/logistics/get_channel_list/?",n);case 5:if(c=e.sent,c=JSON.parse(JSON.parse(c).data),u=this._this.$shopeeManConfig.getLogisticsList(),s=u[a].some((function(e){return c.data.list.some((function(t){return Number(e.ShipId)===t.channel_id}))})),0!==c.code){e.next=11;break}return e.abrupt("return",{code:200,data:s});case 11:return e.abrupt("return",{code:c.errcode,data:"".concat(c.errcode," ").concat(c.message)});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"isNormalMall-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getUserInfo",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={platform_mall_id:r},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/selleraccount/user_info/?",n);case 5:if(c=e.sent,c=JSON.parse(JSON.parse(c).data),0!==c.code){e.next=9;break}return e.abrupt("return",{code:200,data:"店铺已经登录"});case 9:return e.abrupt("return",{code:c.errcode,data:"".concat(c.errcode," ").concat(c.message)});case 12:if(e.prev=12,e.t0=e["catch"](0),!((e.t0+"").indexOf("Unexpected token < in JSON at")>=0||(e.t0+"").indexOf("of JSON input")>=0)){e.next=16;break}return e.abrupt("return",{code:502,data:"请检测代理信息"});case 16:return e.abrupt("return",{code:-2,data:"getUserInfo-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getMallInfo",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={platform_mall_id:r},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/forward/accountservice/v2/shop/",n);case 5:if(c=e.sent,c=JSON.parse(c),!c.data){e.next=13;break}if(c=JSON.parse(c.data),null===(u=c)||void 0===u||!u.username){e.next=11;break}return e.abrupt("return",{code:200,data:c});case 11:e.next=14;break;case 13:return e.abrupt("return",{code:-2,data:"店铺信息获取失败"});case 14:return e.abrupt("return",{code:c.errcode,data:"".concat(c.errcode," ").concat(c.message)});case 17:return e.prev=17,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallInfo-catch: ".concat(e.t0)});case 20:case"end":return e.stop()}}),e,this,[[0,17]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"closeOrOpenMallVacation",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r=t.country,n=t.platform_mall_id,c={platform_mall_id:n,enable_vacation_mode:a},e.next=5,this._this.$shopeemanService.postChinese(r,"/api/sellermisc/sc_conf/set_shop_settings/?",c,{headers:{"Content-Type":"application/json",charset:"UTF-8"}});case 5:if(u=e.sent,u=JSON.parse(JSON.parse(u).data),0!==u.code){e.next=9;break}return e.abrupt("return",{code:200,data:"操作成功"});case 9:return e.abrupt("return",{code:u.code,data:"".concat(u.code," ").concat(u.message.indexOf("Errors within expectations")>-1?"开启关闭太频繁，需冷却3小时":u.message)});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallInfo-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"get_image_resource_id",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r=t.country,n=t.platform_mall_id,c={platform_mall_id:n,ratio:"2"},e.next=5,this._this.$shopeemanService.postChineseImageFile(r,"/api/v3/general/upload_image/",c,{headers:{"Content-Type":"multipart/form-data",upImgType:"file"}},a);case 5:if(u=e.sent,u=JSON.parse(JSON.parse(u).data),0!==u.code){e.next=9;break}return e.abrupt("return",{code:200,data:u.data.resource_id});case 9:return e.abrupt("return",{code:u.code,data:"".concat(u.errcode," ").concat(u.message.indexOf("token not found")>-1?"请先登录":u.message)});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallInfo-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"updateMallBK",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r=t.country,n=t.platform_mall_id,c={platform_mall_id:n,cover:a},e.next=5,this._this.$shopeemanService.putChinese(r,"/api/marketing/v4/shop/profile/update/?",c,{headers:{"Content-Type":"application/json;charset=UTF-8"}});case 5:if(u=e.sent,u=JSON.parse(JSON.parse(u).data),0!==u.code){e.next=9;break}return e.abrupt("return",{code:200,data:"更新店铺背景图片成功"});case 9:return e.abrupt("return",{code:u.code,data:"".concat(u.code," ").concat(u.message)});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallInfo-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"sendMessage",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a,r){var n,c,u,s,i,o,p,d,l,h,m;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n=t.country,c=t.platform_mall_id,u=t.mall_account_info,s=u.username,i={platform_mall_id:c||"1111"},o={cookies:[]},a&&o["cookies"].push({name:"RO_T",value:a}),p={username:"",password:u.password},d=new RegExp("[\\u4E00-\\u9FFFa-zA-Z]+","g"),s.indexOf("@")>-1?(i["email"]=s,p["username"]=s):d.test(s)?(i["username"]=s,p["username"]=s):(l=this.getTelephoneNumberIsTrue(n,s),i["phone"]=l,p["username"]=l),h=null,2===r&&(h=JSON.parse(JSON.stringify(t)),h["accountName"]=p.username,h["mall_account_info"]=p),e.next=13,this._this.$shopeemanService.getChinese(n,"/api/selleraccount/vcode/resend/?",i,a?{headers:o}:null,h);case 13:if(m=e.sent,!JSON.parse(m).data){e.next=20;break}if(m=JSON.parse(JSON.parse(m).data),0!==m.code){e.next=18;break}return e.abrupt("return",{code:200,data:"短信验证发送成功"});case 18:e.next=21;break;case 20:return e.abrupt("return",{code:-2,data:"无法发送短信验证"});case 21:return e.abrupt("return",{code:m.errcode,data:"".concat(m.errcode," ").concat(m.message)});case 24:return e.prev=24,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallGoodsAmount-catch: ".concat(e.t0)});case 27:case"end":return e.stop()}}),e,this,[[0,24]])})));function t(t,a,r){return e.apply(this,arguments)}return t}()},{key:"getTelephoneNumberIsTrue",value:function(e,t){var a={MY:"60",TW:"886",VN:"84",ID:"62",PH:"63",TH:"66",SG:"65",BR:"55",CN:"86",MX:"52",CO:"57",CL:"56",PL:"48"};return t.startsWith("0")&&(t=t.substring(1)),"SG"===e||"ID"===e?t:a[e]+t}},{key:"getMallExpress",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,c,u,s,i,o,p,d,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={platform_mall_id:r},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/v3/logistics/get_channel_list?",n);case 5:if(c=e.sent,c=JSON.parse(JSON.parse(c).data),0!==c.code){e.next=16;break}if(u={},s={},i={},o={},p=[],d=c.data.list,""!==d[0].service_type&&0!==d[0].service_type_priority)d.map((function(e){e.service_type&&!o["".concat(e.service_type)]&&(o["".concat(e.service_type)]="111",u[e.service_type]=[],p.push(e.service_type)),e.service_type&&u[e.service_type].push({isChecked:!1,name:e.name,channel_id:e.channel_id})}));else{for(l in d.map((function(e){i["".concat(e.channel_id)]||(i[e.channel_id]=e.name),0===e.parent_channel_id?s[e.channel_id]=[]:s[e.parent_channel_id].push({isChecked:!1,name:e.name,channel_id:e.channel_id})})),s)s[l].length>0&&(p.push(i[l]),u[i[l]]=s[l]);s=null}return e.abrupt("return",{code:200,data:{activeNames:p,listsObj:u}});case 16:return e.abrupt("return",{code:c.code,data:"".concat(c.code," ").concat(c.message)});case 19:return e.prev=19,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallExpress-catch: ".concat(e.t0)});case 22:case"end":return e.stop()}}),e,this,[[0,19]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"setMallExpress",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r=t.country,n=t.platform_mall_id,c={platform_mall_id:n,command:"set_enable"},c["channel_id"]=a.channel_id,a.isChecked?c["enabled"]=!0:(c["enabled"]=!1,c["preferred"]=!1),e.next=7,this._this.$shopeemanService.postChinese(r,"/api/v3/settings/update_channel_toggle?",c,{headers:{"Content-Type":"application/json",charset:"UTF-8"}});case 7:if(u=e.sent,u=JSON.parse(JSON.parse(u).data),0!==u.code){e.next=11;break}return e.abrupt("return",{code:200,data:"操作成功"});case 11:return e.abrupt("return",{code:u.code,data:"".concat(u.code," ").concat(u.message)});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallExpress-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"getMallList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.getMallList(t);case 3:if(a=e.sent,200!==a.data.code){e.next=7;break}return r=a.data.data.data.map((function(e){return e.LoginInfo="<p>等待检测...</p>",e.isCheckedWaterMark=!1,e.isCheckedWaterMark2=!1,e})),e.abrupt("return",{code:200,data:{total:a.data.data.total,mallArr:r}});case 7:return e.abrupt("return",{code:-2,data:"获取店铺列表失败"});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getGroup",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.getMallGroupList(t);case 3:if(a=e.sent,200!==a.data.code){e.next=9;break}return r=[],a.data.data.map((function(e){r.push({label:e.group_name,value:e.group_id})})),r.zzSort("value"),e.abrupt("return",{code:200,data:r});case 9:return e.abrupt("return",{code:a.status,data:"获取店铺分组失败"});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getGroup-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getMallID",value:function(e){var t;return null===(t=this.mallList.find((function(t){return t.platform_mall_id===e-0})))||void 0===t?void 0:t.id}},{key:"updateWatermark",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.updateWatermark(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data});case 6:return e.abrupt("return",{code:a.data.code,data:"".concat(a.data.code," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"updateMallAliasName",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.updateMallAliasName(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data});case 6:return e.abrupt("return",{code:a.data.code,data:"".concat(a.data.code," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"updateUserPassword",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.updateUserPassword(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data});case 6:return e.abrupt("return",{code:a.data.code,data:"".concat(a.data.code," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"updateUserPasswordAPI-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"ddMallGoodsGetMallList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.ddMallGoodsGetMallList(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data});case 6:return e.abrupt("return",{code:-2,data:"获取店铺列表失败"});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"uploadMallCookie",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.uploadMallCookie(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:"上报成功"});case 6:return e.abrupt("return",{code:a.data.code,data:"".concat(a.data.code," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"saveMallAuthInfo",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.saveMallAuthInfo(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data.id+""});case 6:return e.abrupt("return",{code:a.status,data:"".concat(a.status," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"saveMallAuthInfo-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"updateMallInfo",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.updateMallInfo(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data});case 6:return e.abrupt("return",{code:a.status,data:"".concat(a.status," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"saveMallAuthInfo-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getBankList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.getBankList({params:t});case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data});case 6:return e.abrupt("return",{code:-2,data:"获取银行卡信息列表失败"});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getBankList-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"sortMallData",value:function(e,t){var a="".concat(t.shopid),r="".concat(t.id),n=t.username,c={};c["SPC_EC"]=t.sso,c["SPC_SC_TK"]=t.token,c["ShopeeUid"]=r,c["shopid"]=a;var u={SPC_CDS_VER:"2",SPC_EC:t.sso,ShopeeUid:r,SPC_F:"",CNSC_SSO:"",SPC_CNSC_TK:"",SPC_CNSC_UD:"",SC_DFP:"",SPC_SC_SA_UD:"",SPC_SC_SA_TK:"",SPC_SC_UD:"",cstoken:t.cs_token,satoken:"",shopeeuid:r,shopid:a,portrait:t.portrait,userRealName:n,mainAccountId:"",spc_f:"",SPC_SC_TK:t.token,OtherCookieInfo:"",spcf_update_time:""},s={IPIsExpired:!0,IsOpenSIP:!1,ProxyType:"ssr",IsTransit:0,IPType:"",GroupName:e.group_name,web_login_info:u,MallMainName:e.MallMainName,id:0,uid:0,country:e.country,platform_mall_name:e.mall_account_info.username,platform_mall_id:a,platform_mall_uid:r,is_global:0,mall_main_id:0,mall_account_info:e.mall_account_info,watermark:e.watermark,mall_alias_name:e.mall_alias_name,mall_type:e.mall_type,mall_group_id:e.mall_group_id},i={mallId:a,mallUId:r,username:n,Cookie:c,mallInfo_new:s};return i}},{key:"getMainMainList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a={uid:this._this.$userInfo.muid,uuid:"0",ip_id:"",ip_alias:t+"",source:"",statius:"",ip_address:"",supplier_info:"",expiration_datesg:"",mall_ids:""},e.next=4,this._this.$YipService.GetIpList(JSON.stringify(a));case 4:if(r=e.sent,r=JSON.parse(r),!(200===r.code&&r.data.length>0)){e.next=9;break}return n=r.data[0],e.abrupt("return",{code:200,data:n});case 9:return e.abrupt("return",{code:-2,data:"获取店铺主体失败"});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMainMainList-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"bindMainName",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$commodityService.newBangdingMall(this._this.$userInfo.muid+"",t+"",a);case 3:if(r=e.sent,r=JSON.parse(r),200!==r.code){e.next=7;break}return e.abrupt("return",{code:200,data:"绑定主体成功"});case 7:return e.abrupt("return",{code:-2,data:"绑定主体失败"});case 10:return e.prev=10,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"bindMainName-catch: ".concat(e.t0)});case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t,a){return e.apply(this,arguments)}return t}()}]),e}())}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d7297"],{7646:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var r=a("1da1"),n=a("d4ec"),c=a("bee2"),u=(a("96cf"),a("99af"),a("a9e3"),a("d81d"),a("7db0"),a("8237"),function(){function e(t){Object(n["a"])(this,e),this._this=t,this.mallList=[]}return Object(c["a"])(e,[{key:"getMallGoodsAmount",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={platform_mall_id:r,version:"3.1.0"},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/v3/product/get_product_statistical_data/?",n,{headers:{referer:"/portal/product/list/all"}});case 5:if(c=e.sent,c=JSON.parse(JSON.parse(c).data),0!==c.code){e.next=9;break}return e.abrupt("return",{code:200,data:c.data});case 9:return e.abrupt("return",{code:c.errcode,data:"".concat(c.errcode," ").concat(c.message)});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallGoodsAmount-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isNormalMall",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,c,u,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={platform_mall_id:r},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/v3/logistics/get_channel_list/?",n);case 5:if(c=e.sent,c=JSON.parse(JSON.parse(c).data),u=this._this.$shopeeManConfig.getSiteMall(),o=u[a].some((function(e){return c.data.list.some((function(t){return Number(e.ShipId)===t.channel_id}))})),0!==c.code){e.next=11;break}return e.abrupt("return",{code:200,data:o});case 11:return e.abrupt("return",{code:c.errcode,data:"".concat(c.errcode," ").concat(c.message)});case 14:return e.prev=14,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"isNormalMall-catch: ".concat(e.t0)});case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getUserInfo",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.country,r=t.platform_mall_id,n={platform_mall_id:r},e.next=5,this._this.$shopeemanService.getChinese(a,"/api/selleraccount/user_info/?",n);case 5:if(c=e.sent,c=JSON.parse(JSON.parse(c).data),0!==c.code){e.next=9;break}return e.abrupt("return",{code:200,data:"店铺已经登陆"});case 9:return e.abrupt("return",{code:c.errcode,data:"".concat(c.errcode," ").concat(c.message)});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getUserInfo-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getMallInfo",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r=t.country,n=t.platform_mall_id,c={platform_mall_id:n},e.next=5,this._this.$shopeemanService.getChinese(r,"/api/forward/accountservice/v2/shop/",c);case 5:if(u=e.sent,u=JSON.parse(JSON.parse(u).data),null===(a=u)||void 0===a||!a.username){e.next=9;break}return e.abrupt("return",{code:200,data:u});case 9:return e.abrupt("return",{code:u.errcode,data:"".concat(u.errcode," ").concat(u.message)});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallInfo-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"closeOrOpenMallVacation",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r=t.country,n=t.platform_mall_id,c={platform_mall_id:n,enable_vacation_mode:a},e.next=5,this._this.$shopeemanService.postChinese(r,"/api/sellermisc/sc_conf/set_shop_settings/?",c,{headers:{"Content-Type":"application/json",charset:"UTF-8"}});case 5:if(u=e.sent,u=JSON.parse(JSON.parse(u).data),0!==u.code){e.next=9;break}return e.abrupt("return",{code:200,data:"操作成功"});case 9:return e.abrupt("return",{code:u.code,data:"".concat(u.code," ").concat(u.message.indexOf("Errors within expectations")>-1?"开启关闭太频繁，需冷却3小时":u.message)});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallInfo-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"get_image_resource_id",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r=t.country,n=t.platform_mall_id,c={platform_mall_id:n,ratio:"2"},e.next=5,this._this.$shopeemanService.postChineseImageFile(r,"/api/v3/general/upload_image/",c,{headers:{"Content-Type":"multipart/form-data",upImgType:"file"}},a);case 5:if(u=e.sent,u=JSON.parse(JSON.parse(u).data),0!==u.code){e.next=10;break}return e.abrupt("return",{code:200,data:u.data.resource_id});case 10:return e.abrupt("return",{code:u.errcode,data:"".concat(u.errcode," ").concat(u.message.indexOf("token not found")>-1?"请先登录":u.message)});case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallInfo-catch: ".concat(e.t0)});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"updateMallBK",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r=t.country,n=t.platform_mall_id,c={platform_mall_id:n,cover:a},e.next=5,this._this.$shopeemanService.putChinese(r,"/api/marketing/v4/shop/profile/?",c,{headers:{"Content-Type":"application/json;charset=UTF-8"}});case 5:if(u=e.sent,u=JSON.parse(JSON.parse(u).data),0!==u.code){e.next=9;break}return e.abrupt("return",{code:200,data:"更新店铺背景图片成功"});case 9:return e.abrupt("return",{code:u.code,data:"".concat(u.code," ").concat(u.message)});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallInfo-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"getMallList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.getMallList(t);case 3:if(a=e.sent,200!==a.data.code){e.next=8;break}return r=a.data.data.map((function(e){return e.LoginInfo="<p>等待检测...</p>",e.isCheckedWaterMark=!1,e.isCheckedWaterMark2=!1,e})),this.mallList=r,e.abrupt("return",{code:200,data:r});case 8:return e.abrupt("return",{code:-2,data:"获取店铺列表失败"});case 11:return e.prev=11,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getGroup",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.getGroupList(t);case 3:if(a=e.sent,200!==a.data.code){e.next=9;break}return r=[],n={},a.data.data.map((function(e){if(!n[e.group_id]){n[e.group_id]="123";var t={label:e.group_name,value:e.group_id};r.push(t)}})),e.abrupt("return",{code:200,data:r});case 9:return e.abrupt("return",{code:a.status,data:"获取店铺列表失败"});case 12:return e.prev=12,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getMallID",value:function(e){var t;return null===(t=this.mallList.find((function(t){return t.platform_mall_id===e})))||void 0===t?void 0:t.id}},{key:"updateWatermark",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.updateWatermark(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data});case 6:return e.abrupt("return",{code:a.data.code,data:"".concat(a.data.code," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"updateMallAliasName",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.updateMallAliasName(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data});case 6:return e.abrupt("return",{code:a.data.code,data:"".concat(a.data.code," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"updateUserPassword",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.updateUserPassword(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data});case 6:return e.abrupt("return",{code:a.data.code,data:"".concat(a.data.code," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"updateUserPasswordAPI-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"ddMallGoodsGetMallList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.ddMallGoodsGetMallList({params:t});case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data});case 6:return e.abrupt("return",{code:-2,data:"获取店铺列表失败"});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"uploadMallCookie",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.uploadMallCookie(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:"上报成功"});case 6:return e.abrupt("return",{code:a.data.code,data:"".concat(a.data.code," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getMallList-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"saveMallAuthInfo",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.saveMallAuthInfo(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data});case 6:return e.abrupt("return",{code:a.status,data:"".concat(a.status," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"saveMallAuthInfo-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"updateMallInfo",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.updateMallInfo(t);case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data});case 6:return e.abrupt("return",{code:a.status,data:"".concat(a.status," ").concat(a.data.message)});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"saveMallAuthInfo-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getBankList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._this.$api.getBankList({params:t});case 3:if(a=e.sent,200!==a.data.code){e.next=6;break}return e.abrupt("return",{code:200,data:a.data.data});case 6:return e.abrupt("return",{code:-2,data:"获取银行卡信息列表失败"});case 9:return e.prev=9,e.t0=e["catch"](0),e.abrupt("return",{code:-2,data:"getBankList-catch: ".concat(e.t0)});case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"sortMallData",value:function(e,t){var a="".concat(t.shopid),r="".concat(t.id),n=t.username,c={};c["SPC_EC"]=t.sso,c["SPC_SC_TK"]=t.token,c["ShopeeUid"]=r,c["shopid"]=a;var u={SPC_CDS_VER:"2",SPC_EC:t.sso,ShopeeUid:r,SPC_F:"",CNSC_SSO:"",SPC_CNSC_TK:"",SPC_CNSC_UD:"",SC_DFP:"",SPC_SC_SA_UD:"",SPC_SC_SA_TK:"",SPC_SC_UD:"",token:t.token,cstoken:t.cs_token,satoken:"",sso:t.sso,shopeeuid:r,shopid:a,portrait:t.portrait,userRealName:n,mainAccountId:"",spc_f:"",SPC_SC_TK:t.token,OtherCookieInfo:"",spcf_update_time:""},o={IPIsExpired:!0,IsOpenSIP:!1,ProxyType:"ssr",IsTransit:0,IPType:"",GroupName:e.group_name,web_login_info:u,MallMainName:e.MallMainName,id:0,uid:0,country:e.country,platform_mall_name:e.mall_account_info.username,platform_mall_id:a,platform_mall_uid:r,is_global:0,mall_main_id:0,mall_account_info:e.mall_account_info,watermark:e.watermark,mall_alias_name:e.mall_alias_name,mall_type:e.mall_type,mall_group_id:e.mall_group_id},s={mallId:a,mallUId:r,username:n,Cookie:c,mallInfo_new:o};return s}}]),e}())}}]);
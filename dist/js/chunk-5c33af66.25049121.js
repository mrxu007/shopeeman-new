(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c33af66"],{"3ba1":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"contaniner"},[a("el-row",{staticClass:"header"},[a("ul",{staticStyle:{"margin-bottom":"10px"}},[a("li",[a("span",[t._v("站点：")]),a("el-select",{attrs:{size:"mini",filterable:""},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}},t._l(t.siteList,(function(t,e){return a("el-option",{key:e,attrs:{value:t.value,label:t.label}})})),1)],1),a("li",[a("span",[t._v("店铺分组：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择分组",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},[t.selectall?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.gruopList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",[t._v("店铺：")]),a("el-select",{staticClass:"mall",attrs:{placeholder:"请选择店铺",multiple:"","collapse-tags":"",clearable:"",size:"mini",filterable:""},model:{value:t.mall,callback:function(e){t.mall=e},expression:"mall"}},[t.selectall1?a("el-option",{attrs:{label:"全部",value:0}}):t._e(),t.selectall1?t._e():a("el-option",{attrs:{label:"全部",value:-2}}),t._l(t.mallList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],2)],1),a("li",[a("span",[t._v("统计时间：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Statisticaltime,callback:function(e){t.Statisticaltime=e},expression:"Statisticaltime"}},t._l(t.returnStatisticaltime,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("span",[t._v("订单类型：")]),a("el-select",{attrs:{placeholder:"",size:"mini",filterable:""},model:{value:t.Status,callback:function(e){t.Status=e},expression:"Status"}},t._l(t.returnStatusList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1),a("li",[a("el-button",{attrs:{type:"primary",disabled:t.Loading1,size:"mini"},on:{click:t.getallinfo}},[t._v("搜索")])],1)]),a("br"),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading3,expression:"Loading3"}],ref:"plTable",staticStyle:{"margin-top":"10px"},attrs:{"header-align":"center",height:"calc(100vh - 140px)",data:t.tableData3,"header-cell-style":{backgroundColor:"#f5f7fa"}}},[a("el-table-column",{attrs:{align:"center",label:"店铺名称",width:"140",prop:"mallname"}}),t._e(),t._e(),a("el-table-column",{attrs:{align:"center",prop:"ranktype",label:"排行类型",width:"355"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",{domProps:{innerHTML:t._s(s.ranktype)}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"img",label:"商品图片",width:"355"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[s.img?a("el-tooltip",{staticStyle:{width:"40px",height:"40px"},attrs:{effect:"light",placement:"right-end","visible-arrow":!1,enterable:!1}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("img",{attrs:{src:t._f("imageRender")([s.site,s.mallid,s.img]),width:"300px",height:"300px"}})]),a("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:t._f("imageRender")([s.site,s.mallid,s.img])}})],1):t._e()]}}])}),a("el-table-column",{attrs:{prop:"goodsname",label:"商品名称",width:"830",align:"center"}})],1)],1)],1)},i=[],l=a("1da1"),r=(a("96cf"),a("99af"),a("ac1f"),a("1276"),a("a15b"),a("a9e3"),a("159b"),a("a434"),a("b680"),{data:function(){return{Loading1:!1,Loading3:!1,selectall:!0,selectall1:!0,allgroupid:[],errmall:[],allmallid:[],tableData3:[],Status:"palced",total:0,Statisticaltime:"real_time",site:"TH",siteList:this.$filters.countries_option,group:0,gruopList:[],mall:[],mallList:[],start_time:Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,end_time:Math.round(new Date/1e3),returnStatisticaltime:[{value:"real_time",label:"实时"},{value:"yesterday",label:"昨日"},{value:"past7days",label:"近7天"},{value:"past30days",label:"近30天"}],returnStatusList:[{value:"palced",label:"下单"},{value:"confirmed",label:"确认订单"},{value:"paid",label:"付费订单"}]}},watch:{group:function(t,e){this.mall=[];for(var a=0;a<t.length;a++)if(0===t[a])this.group=this.allgroupid,this.mall=[].concat(this.allmallid),this.selectall=!1;else if(-2===t[a])this.group=[],this.mall=[],this.selectall=!0;else for(var s=0;s<this.mallList.length;s++)t[a]===this.mallList[s].group_id&&this.mall.push(this.mallList[s].value)},mall:function(t,e){for(var a=0;a<t.length;a++)0===t[a]&&(this.mall=this.allmallid,this.selectall1=!1),-2===t[a]&&(this.mall=[],this.selectall1=!0)},Statisticaltime:function(t,e){if("TH"===this.site||"ID"===this.site||"VN"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 01:00:00"))/1e3,this.timecant=!1;else if("month"===t){var a=this.$dayjs(this.timechoose).format("YYYY-MM-01"),s=a.split("-")[1];if("12"===s){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var i=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split("");i[5]="0",i[6]="1",i=i.join(""),this.end_time=Date.parse(this.$dayjs(i).format("YYYY-MM-01 01:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00"))/1e3;var l=this.$dayjs(this.timechoose).format("YYYY-MM-01 01:00:00").split(""),r=s.split("");l[5]=r[0],l[6]=Number(r[1])+1,l=l.join(""),this.end_time=Date.parse(this.$dayjs(l).format("YYYY-MM-01 01:00:00"))/1e3}this.timecant=!1}}else if("BR"===this.site){if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 11:00:00"))/1e3,this.timecant=!1;else if("month"===t){var n=this.$dayjs(this.timechoose).format("YYYY-MM-01"),o=n.split("-")[1];if("12"===o){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var m=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split("");m[5]="0",m[6]="1",m=m.join(""),this.end_time=Date.parse(this.$dayjs(m).format("YYYY-MM-01 11:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00"))/1e3;var h=this.$dayjs(this.timechoose).format("YYYY-MM-01 11:00:00").split(""),d=o.split("");h[5]=d[0],h[6]=Number(d[1])+1,h=h.join(""),this.end_time=Date.parse(this.$dayjs(h).format("YYYY-MM-01 11:00:00"))/1e3}this.timecant=!1}}else if("real_time"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.end_time=Math.round(new Date/1e3),this.timecant=!0;else if("yesterday"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past7days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-604800,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("past30days"===t)this.start_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3-2592e3,this.end_time=Date.parse(this.$dayjs(new Date).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!0;else if("day"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-86400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("week"===t)this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3-518400,this.end_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-DD 00:00:00"))/1e3,this.timecant=!1;else if("month"===t){var p=this.$dayjs(this.timechoose).format("YYYY-MM-01"),Y=p.split("-")[1];if("12"===Y){this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var c=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split("");c[5]="0",c[6]="1",c=c.join(""),this.end_time=Date.parse(this.$dayjs(c).format("YYYY-MM-01 00:00:00"))/1e3}else{this.start_time=Date.parse(this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00"))/1e3;var u=this.$dayjs(this.timechoose).format("YYYY-MM-01 00:00:00").split(""),f=Y.split("");u[5]=f[0],u[6]=Number(f[1])+1,u=u.join(""),this.end_time=Date.parse(this.$dayjs(u).format("YYYY-MM-01 00:00:00"))/1e3}this.timecant=!1}},site:function(t,e){this.mall=[],this.group=[],this.getInfo()}},mounted:function(){this.getInfo()},methods:{getInfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,s,i,l,r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={country:t.site,mallGroupIds:t.group},e.next=3,t.$api.ddMallGoodsGetMallList(a);case 3:if(s=e.sent,t.mallList=[],t.gruopList=[],t.allgroupid=[],t.allmallid=[],200===s.data.code){for(s.data.data.forEach((function(e){e.group_id&&t.gruopList.push({label:e.group_name,value:e.group_id}),e.id&&t.mallList.push({label:e.mall_alias_name?e.mall_alias_name:e.platform_mall_name,value:e.platform_mall_id,group_id:e.group_id})})),i=0;i<t.gruopList.length-1;i++)for(l=i+1;l<t.gruopList.length;l++)t.gruopList[i].value===t.gruopList[l].value&&t.gruopList.splice(l,1);for(r=0;r<t.gruopList.length;r++)t.allgroupid.push(t.gruopList[r].value);for(n=0;n<t.mallList.length;n++)t.allmallid.push(t.mallList[n].value)}else t.$message.warning("店铺列表获取失败！");case 9:case"end":return e.stop()}}),e)})))()},getallinfo:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,s,i,l,r,n,o,m,h,d,p,Y,c,u,f,D,g,M,_,y,v;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.Loading1=!0,t.Loading3=!0,t.tableData3=[],t.errmall=[],!(t.mall.length>0)){e.next=27;break}a=0;case 6:if(!(a<t.mall.length)){e.next=25;break}for(s={start_time:t.start_time,end_time:t.end_time,period:t.Statisticaltime,orderType:t.Status,mallId:t.mall[a],fetag:"fetag",limit:5},i=void 0,l=0;l<t.mallList.length;l++)t.mallList[l].value===t.mall[a]&&(i=t.mallList[l].label);return e.next=12,t.$shopeemanService.getCateRank(t.site,s,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 12:return r=e.sent,e.next=15,t.$shopeemanService.getRank(t.site,s,{headers:{"Content-Type":"application/json; charset=utf-8"}});case 15:if(n=e.sent,o=JSON.parse(r),m=JSON.parse(n),o.data=JSON.parse(o.data),m.data=JSON.parse(m.data),0===m.data.code)for(h in m.data.result){if("product_pv"===h&&m.data.result[h])for(d=0;d<m.data.result[h].length;d++)p={},p.site=t.site,p.mallid=t.mall[a],p.mallname=i,p.ranktype="<pre>按商品销量排行</pre><pre>销量 "+m.data.result[h][d].value+"</pre>",p.img=m.data.result[h][d].image,p.goodsname=m.data.result[h][d].item_name,t.tableData3.push(p);if("sales"===h&&m.data.result[h])for(Y=0;Y<m.data.result[h].length;Y++)c={},c.site=t.site,c.mallid=t.mall[a],c.mallname=i,c.ranktype="<pre>按下单数排行</pre><pre>下单数 "+m.data.result[h][Y].value+"</pre>",c.img=m.data.result[h][Y].image,c.goodsname=m.data.result[h][Y].item_name,t.tableData3.push(c);if("orders"===h&&m.data.result[h])for(u=0;u<m.data.result[h].length;u++)f={},f.site=t.site,f.mallid=t.mall[a],f.mallname=i,f.ranktype="<pre>按页面访客量排行</pre><pre>访客量 "+m.data.result[h][u].value+"</pre>",f.img=m.data.result[h][u].image,f.goodsname=m.data.result[h][u].item_name,t.tableData3.push(f);if("uv_to_paid_buyers_rate"===h&&m.data.result[h])for(D=0;D<m.data.result[h].length;D++)g={},g.site=t.site,g.mallid=t.mall[a],g.mallname=i,g.ranktype="<pre>按转换率排行</pre><pre>转换率 "+(100*m.data.result[h][D].value).toFixed(2)+"%</pre>",g.img=m.data.result[h][D].image,g.goodsname=m.data.result[h][D].item_name,t.tableData3.push(g)}else 2===m.data.errcode&&t.errmall.push(i);if(0===o.data.code&&o.data.result)for(M=0;M<o.data.result.length;M++)_={},_.site=t.site,_.mallid=t.mall[a],_.mallname=i,_.ranktype="<pre>按类目销量排行</pre><pre>销售量 "+o.data.result[M].value+"</pre>",_.img="",_.goodsname=o.data.result[M].l1_cat_name+"===>"+o.data.result[M].l2_cat_name,t.tableData3.push(_);else 2===o.data.errcode&&t.errmall.push(i);case 22:a++,e.next=6;break;case 25:e.next=28;break;case 27:t.$message({message:"请先选择店铺",type:"warning"});case 28:for(y=0;y<t.errmall.length-1;y++)for(v=y+1;v<t.errmall.length;v++)t.errmall[y]===t.errmall[v]&&t.errmall.splice(v,1);t.errmall.length>0&&t.$message.error("店铺【".concat(t.errmall,"】未登录")),t.Loading1=!1,t.Loading3=!1;case 32:case"end":return e.stop()}}),e)})))()}}}),n=r,o=(a("7d20"),a("2877")),m=Object(o["a"])(n,s,i,!1,null,"56248698",null);e["default"]=m.exports},"4c32":function(t,e,a){},"7d20":function(t,e,a){"use strict";a("4c32")}}]);
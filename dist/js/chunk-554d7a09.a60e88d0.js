(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-554d7a09"],{"9d76":function(t,e,s){},c495:function(t,e,s){"use strict";s("9d76")},df50:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"auto-order"},[s("Logs",{ref:"Logs",staticClass:"logBox",attrs:{clear:""},model:{value:t.showConsole,callback:function(e){t.showConsole=e},expression:"showConsole"}})],1)},r=[],a=s("1da1"),o=(s("96cf"),s("99af"),s("bcd0")),i=s("de70"),c=s("0098"),u={data:function(){return{showConsole:!1,mallList:[],statusListFirst:o["A"],statusListSecond:o["x"],statusListThird:o["y"]}},mounted:function(){var t=this;this.getAllMall(),this.$refs.Logs.writeLog("定时任务分别在五分钟、八分钟之后开启",!0),setTimeout((function(){t.syncOrders(t.statusListFirst,"auto-first",60),setInterval((function(){t.syncOrders(t.statusListFirst,"auto-first",60)}),144e5)}),3e5),setTimeout((function(){t.syncOrders(t.statusListSecond,"auto-second",60),setInterval((function(){t.syncOrders(t.statusListSecond,"auto-second",60)}),18e5)}),48e4),setTimeout((function(){t.syncOrders(t.statusListThird,"auto-third",60),setInterval((function(){t.syncOrders(t.statusListThird,"auto-third",60)}),36e5)}),48e4),setTimeout((function(){t.syncFaceData(),setInterval((function(){t.syncFaceData()}),72e5)}),48e4)},methods:{syncOrders:function(t,e,s){var n=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var a,o,c,u,l;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:n.$refs.Logs.writeLog("【".concat(e,"】开始同步"),!0),a=0;case 2:if(!(a<n.mallList.length)){r.next=16;break}o=n.mallList[a],c=0;case 5:if(!(c<t.length)){r.next=13;break}return u=t[c],l=new i["a"](o,u,n,n.$refs.Logs.writeLog),r.next=10,l.start("".concat(a+1,"/").concat(n.mallList.length),e,s);case 10:c++,r.next=5;break;case 13:a++,r.next=2;break;case 16:case"end":return r.stop()}}),r)})))()},getAllMall:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$appConfig.getGlobalCacheInfo("allMallInfo","key");case 2:if(s=e.sent,n=s&&JSON.parse(s),n)for(r in n)t.mallList.push(n[r]);case 5:case"end":return e.stop()}}),e)})))()},syncFaceData:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:s=new c["a"](t,t.$refs.Logs.writeLog),s.autoStart();case 2:case"end":return e.stop()}}),e)})))()}}},l=u,f=(s("c495"),s("2877")),d=Object(f["a"])(l,n,r,!1,null,"9e6e486c",null);e["default"]=d.exports}}]);
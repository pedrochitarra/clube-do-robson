(function(e){function t(t){for(var r,a,c=t[0],i=t[1],d=t[2],s=0,l=[];s<c.length;s++)a=c[s],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&l.push(u[a][0]),u[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(l.length)l.shift()();return o.push.apply(o,d||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==u[c]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},u={app:0},o=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-1cd858a2":"c17803b3","chunk-1318b775":"c0668b9f","chunk-354cde3f":"280916a7","chunk-44fd2670":"190de326","chunk-2de26645":"3a0a03b2","chunk-5d7402b6":"32207586","chunk-a339ef20":"f058da61"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-1318b775":1,"chunk-354cde3f":1,"chunk-2de26645":1,"chunk-5d7402b6":1,"chunk-a339ef20":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-1cd858a2":"31d6cfe0","chunk-1318b775":"a5786bd9","chunk-354cde3f":"38423ba7","chunk-44fd2670":"31d6cfe0","chunk-2de26645":"d68d2aa8","chunk-5d7402b6":"b39c7ac6","chunk-a339ef20":"5f3ccb07"}[e]+".css",u=i.p+r,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var d=o[c],s=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(s===r||s===u))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){d=l[c],s=d.getAttribute("data-href");if(s===r||s===u)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||u,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],f.parentNode.removeChild(f),n(o)},f.href=u;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){a[e]=0})));var r=u[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=u[e]=[t,n]}));t.push(r[2]=o);var d,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=c(e);var l=new Error;d=function(t){s.onerror=s.onload=null,clearTimeout(f);var n=u[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}u[e]=void 0}};var f=setTimeout((function(){d({type:"timeout",target:s})}),12e4);s.onerror=s.onload=d,document.head.appendChild(s)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],s=d.push.bind(d);d.push=t,d=d.slice();for(var l=0;l<d.length;l++)t(d[l]);var f=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-app-bar",{attrs:{app:"",color:"purple",dark:""}},[r("div",{staticClass:"d-flex align-center"},[r("v-img",{staticClass:"shrink mr-2",attrs:{alt:"Vuetify Logo",contain:"",src:"https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l99150901.png",transition:"scale-transition",width:"40"}}),r("v-img",{staticClass:"shrink mt-1 hidden-sm-and-down",attrs:{alt:"Vuetify Name",contain:"","min-width":"100",src:n("8fab"),width:"200"}})],1),r("v-spacer"),r("v-btn",{attrs:{text:"",to:"/clubes/6703918"}},[e._v("Clubes")]),r("v-btn",{attrs:{text:"",to:"/membros/6703918"}},[e._v("Jogadores")]),r("v-btn",{attrs:{text:"",to:"/partidas/6703918"}},[e._v("Partidas")])],1),r("v-main",[r("router-view")],1)],1)},u=[],o={name:"App",title:"Clube do Robson",data:function(){return{}}},c=o,i=(n("034f"),n("2877")),d=n("6544"),s=n.n(d),l=n("7496"),f=n("40dc"),p=n("8336"),h=n("adda"),b=n("f6c4"),m=n("2fa4"),v=Object(i["a"])(c,a,u,!1,null,null,null),g=v.exports;s()(v,{VApp:l["a"],VAppBar:f["a"],VBtn:p["a"],VImg:h["a"],VMain:b["a"],VSpacer:m["a"]});n("d3b7");var k=n("8c4f");r["default"].use(k["a"]);var y=new k["a"]({routes:[{path:"/clubes/:id",name:"clube",component:function(){return Promise.all([n.e("chunk-1cd858a2"),n.e("chunk-44fd2670"),n.e("chunk-5d7402b6")]).then(n.bind(null,"df08"))}},{path:"/membros/:clubId",name:"membros",component:function(){return Promise.all([n.e("chunk-1cd858a2"),n.e("chunk-a339ef20")]).then(n.bind(null,"634a"))}},{path:"/membros/:clubId/:id",name:"membro",component:function(){return Promise.all([n.e("chunk-1cd858a2"),n.e("chunk-44fd2670"),n.e("chunk-2de26645")]).then(n.bind(null,"bde5"))}},{path:"/partidas/:clubId",name:"partidas",component:function(){return Promise.all([n.e("chunk-1cd858a2"),n.e("chunk-1318b775")]).then(n.bind(null,"4f0a"))}},{path:"/partida/:partidaId",name:"partida",component:function(){return Promise.all([n.e("chunk-1cd858a2"),n.e("chunk-354cde3f")]).then(n.bind(null,"1192"))}}]}),w=n("5f5b"),P=n("b1e0"),x=(n("4989"),n("f309"));r["default"].use(x["a"]);var O=new x["a"]({}),_=n("75db"),C=n.n(_);r["default"].config.productionTip=!1,new r["default"]({router:y,vuetify:O,render:function(e){return e(g)}}).$mount("#app"),r["default"].use(w["a"]),r["default"].use(P["a"]),r["default"].config.productionTip=!1,r["default"].use(O),r["default"].use(C.a)},"85ec":function(e,t,n){},"8fab":function(e,t,n){e.exports=n.p+"img/CDR.c98e2048.png"}});
//# sourceMappingURL=app.b45491f4.js.map
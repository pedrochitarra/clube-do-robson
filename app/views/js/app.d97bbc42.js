(function(e){function t(t){for(var r,a,c=t[0],i=t[1],d=t[2],l=0,s=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&s.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(s.length)s.shift()();return u.push.apply(u,d||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o={app:0},u=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-74267ed5":"9731143d","chunk-1318b775":"357d96f8","chunk-21e16f7a":"0f5bb838","chunk-2f0e968a":"0203eb64","chunk-54789142":"e90c7eca","chunk-41d11d96":"36c79183","chunk-565c9a83":"471e3676"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-1318b775":1,"chunk-21e16f7a":1,"chunk-2f0e968a":1,"chunk-41d11d96":1,"chunk-565c9a83":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-74267ed5":"31d6cfe0","chunk-1318b775":"70ddd75d","chunk-21e16f7a":"85e4bd3d","chunk-2f0e968a":"0d6300d2","chunk-54789142":"31d6cfe0","chunk-41d11d96":"8d6b6604","chunk-565c9a83":"aec69f67"}[e]+".css",o=i.p+r,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var d=u[c],l=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(l===r||l===o))return t()}var s=document.getElementsByTagName("style");for(c=0;c<s.length;c++){d=s[c],l=d.getAttribute("data-href");if(l===r||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],f.parentNode.removeChild(f),n(u)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=u);var d,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(e);var s=new Error;d=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",s.name="ChunkLoadError",s.type=r,s.request=a,n[1](s)}o[e]=void 0}};var f=setTimeout((function(){d({type:"timeout",target:l})}),12e4);l.onerror=l.onload=d,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],l=d.push.bind(d);d.push=t,d=d.slice();for(var s=0;s<d.length;s++)t(d[s]);var f=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-app-bar",{attrs:{app:"",color:"purple",dark:""}},[r("div",{staticClass:"d-flex align-center"},[r("v-img",{staticClass:"shrink mr-2",attrs:{alt:"Vuetify Logo",contain:"",src:"https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l99150901.png",transition:"scale-transition",width:"40"}}),r("v-img",{staticClass:"shrink mt-1 hidden-sm-and-down",attrs:{alt:"Vuetify Name",contain:"","min-width":"100",src:n("8fab"),width:"200"}})],1),r("v-spacer"),r("v-btn",{attrs:{text:"",to:"/clubes/6703918"}},[e._v("Clube")]),r("v-btn",{attrs:{text:"",to:"/membros/6703918"}},[e._v("Jogadores")]),r("v-btn",{attrs:{text:"",to:"/partidas/6703918"}},[e._v("Partidas")])],1),r("v-main",[r("router-view")],1)],1)},o=[],u={name:"App",title:"Clube do Robson",data:function(){return{}}},c=u,i=(n("034f"),n("2877")),d=n("6544"),l=n.n(d),s=n("7496"),f=n("40dc"),p=n("8336"),h=n("adda"),m=n("f6c4"),b=n("2fa4"),v=Object(i["a"])(c,a,o,!1,null,null,null),g=v.exports;l()(v,{VApp:s["a"],VAppBar:f["a"],VBtn:p["a"],VImg:h["a"],VMain:m["a"],VSpacer:b["a"]});n("d3b7");var k=n("8c4f");r["default"].use(k["a"]);var y=new k["a"]({routes:[{path:"/clubes/:id",name:"clube",component:function(){return Promise.all([n.e("chunk-74267ed5"),n.e("chunk-54789142"),n.e("chunk-565c9a83")]).then(n.bind(null,"df08"))}},{path:"/membros/:clubId",name:"membros",component:function(){return Promise.all([n.e("chunk-74267ed5"),n.e("chunk-2f0e968a")]).then(n.bind(null,"634a"))}},{path:"/membros/:clubId/:id",name:"membro",component:function(){return Promise.all([n.e("chunk-74267ed5"),n.e("chunk-54789142"),n.e("chunk-41d11d96")]).then(n.bind(null,"bde5"))}},{path:"/partidas/:clubId",name:"partidas",component:function(){return Promise.all([n.e("chunk-74267ed5"),n.e("chunk-1318b775")]).then(n.bind(null,"4f0a"))}},{path:"/partida/:partidaId",name:"partida",component:function(){return Promise.all([n.e("chunk-74267ed5"),n.e("chunk-21e16f7a")]).then(n.bind(null,"1192"))}}]}),w=n("5f5b"),P=n("b1e0"),x=(n("4989"),n("f309"));r["default"].use(x["a"]);var O=new x["a"]({});r["default"].config.productionTip=!1,new r["default"]({router:y,vuetify:O,render:function(e){return e(g)}}).$mount("#app"),r["default"].use(w["a"]),r["default"].use(P["a"]),r["default"].config.productionTip=!1,r["default"].use(O)},"85ec":function(e,t,n){},"8fab":function(e,t,n){e.exports=n.p+"img/CDR.c98e2048.png"}});
//# sourceMappingURL=app.d97bbc42.js.map
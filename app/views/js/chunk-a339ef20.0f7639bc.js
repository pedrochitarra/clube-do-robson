(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a339ef20"],{"41e6":function(e,t,n){"use strict";n("f936")},"61ee":function(e,t,n){"use strict";var r=n("d4ec"),a=n("bee2"),o=n("c427"),s=function(){function e(){Object(r["a"])(this,e)}return Object(a["a"])(e,[{key:"getAll",value:function(){return o["a"].get("/robsoners/")}},{key:"get",value:function(e){return console.log(e),o["a"].get("/robsoners/".concat(e))}}]),e}();t["a"]=new s},"634a":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"background"},[n("div",{staticClass:"background-clubs"},[n("div",{staticClass:"xlarge-purple"},[e.listMembros?n("b-table",{attrs:{items:e.listMembros,fields:e.headers,id:"my-table","per-page":e.perPage,"current-page":e.currentPage},scopedSlots:e._u([{key:"cell(face)",fn:function(e){return[n("b-img",{attrs:{center:"",rounded:"circle",height:"100%",width:"100%",src:e.value,alt:"..."}})]}},{key:"cell(name)",fn:function(t){return[n("b-btn",{attrs:{variant:"purple",to:{name:"membro",params:{id:t.value}}}},[e._v("Detalhes")])]}}],null,!1,3979836280)}):e._e(),n("b-pagination",{staticClass:"paginationPurple",attrs:{align:"center","total-rows":e.rows,"per-page":e.perPage,"aria-controls":"my-table"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)])])},a=[],o=(n("7db0"),n("4160"),n("b0c0"),n("159b"),n("96cf"),n("1da1")),s=n("6a7b"),c=n("61ee"),u={name:"membros-list",data:function(){return{membros:[],robsoners:[],listMembros:[],fakeRobsoners:[],currentMembro:null,currentIndex:-1,perPage:10,currentPage:1,title:"",headers:[{key:"face",label:"",sortable:!1},{key:"number",label:"",sortable:!1},{key:"proName",label:"",sortable:!1},{key:"name",label:"",sortable:!1}]}},computed:{rows:function(){return this.listMembros.length}},methods:{getMembros:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:s["a"].getAll(e).then((function(e){t.membros=e.data,console.log(e.data),c["a"].getAll().then((function(e){t.robsoners=e.data,console.log(e.data),t.membros.forEach((function(e,r){var a=t.robsoners.find((function(t){return t.name===e.name}));void 0===a?t.membros[r].face=n("6a6b"):(t.membros[r].number=a.number,t.membros[r].face=a.face)})),console.log(t.membros),t.listMembros=t.membros,console.log(t.robsoners),t.robsoners.forEach((function(e){e.isfake&&t.listMembros.push(e)})),console.log(t.listMembros)}))})).catch((function(e){console.log(e)}));case 1:case"end":return r.stop()}}),r)})))()},getRobsoners:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:c["a"].getAll().then((function(t){e.robsoners=t.data,console.log(t.data),e.robsoners.forEach((function(t){e.membros.forEach((function(n,r){n.name===t.name?e.membros[r].face=t.face:e.membros[r].face="https://funkyimg.com/i/3aepK.png"}))})),console.log(e.membros)}));case 1:case"end":return t.stop()}}),t)})))()},setActiveMembro:function(e,t){this.currentMembro=e,this.currentIndex=t}},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getMembros(e.$route.params.clubId);case 2:case"end":return t.stop()}}),t)})))()}},i=u,l=(n("41e6"),n("2877")),b=Object(l["a"])(i,r,a,!1,null,null,null);t["default"]=b.exports},"6a6b":function(e,t,n){e.exports=n.p+"img/defaultMember.d34e072b.png"},"6a7b":function(e,t,n){"use strict";n("99af");var r=n("d4ec"),a=n("bee2"),o=n("c427"),s=function(){function e(){Object(r["a"])(this,e)}return Object(a["a"])(e,[{key:"getAll",value:function(e){return o["a"].get("/membros/".concat(e))}},{key:"get",value:function(e,t){return o["a"].get("/membros/".concat(t,"/").concat(e))}}]),e}();t["a"]=new s},f936:function(e,t,n){}}]);
//# sourceMappingURL=chunk-a339ef20.0f7639bc.js.map
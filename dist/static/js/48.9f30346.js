(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{356:function(e,t,i){"use strict";i.r(t);var o=i(816),n=i(489);for(var a in n)["default"].indexOf(a)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(a);var s=i(16),r=Object(s.a)(n.default,o.render,o.staticRenderFns,!1,null,"10078e26",null);t.default=r.exports},489:function(e,t,i){"use strict";i.r(t);var o=i(490),n=i.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){i.d(t,e,(function(){return o[e]}))}(a);t.default=n.a},490:function(e,t,i){"use strict";(function(e,i,o,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{city:{selects:[],now:0},zone:{selects:[],now:0},table:{pagination:{page:1,size:10,total:0},datas:[]},opened:!1,loading:!1,radio:0,radios:[{title:"市级",key:0},{title:"区县",key:1},{title:"学校",key:2}],form:{city:{selects:[],now:0},zone:{selects:[],now:0}},disabled:!1}},created:function(){var t=e.get("user");t.level>100&&(this.disabled=!0),1e4==t.level&&(this.city=i.getCity()),1200==t.level&&(this.city={selects:[{title:i.getName(t.idCity),key:t.idCity}],now:t.idCity},this.zone=i.getZone(this.city.now)),1100==t.level&&(this.city={selects:[{title:i.getName(t.idCity),key:t.idCity}],now:t.idCity},this.zone={selects:[{title:i.getName(t.idZone),key:t.idZone}],now:t.idZone}),this.init()},methods:{init:function(){var e=this;o.get("/organize/list",{id:this.zone.now||this.city.now}).then((function(t){t.ok&&e.setTable(t.body)}))},changeCity:function(){this.zone=i.getZone(this.city.now),this.init()},changeZone:function(){this.init()},setTable:function(e){var t=this.table.pagination.page-1,o=e.slice(10*t,10*(t+1));o.forEach((function(e){e.city=i.getName(e.idCity),e.zone=i.getName(e.idZone),e.school=i.getName(e.idSchool)})),this.table.datas=o,this.table.pagination.total=e.length},remove:function(e){var t=this;i.confirm(this,"确定删除该记录 ？",(function(i){t.loading=!0,i.close(),o.post("/organize/delete",{id:e.id}).then((function(e){t.loading=!1,e.ok&&(n.$Message.success("删除成功"),t.init())}))}))},save:function(){var e=this;this.loading=!0,0==this.radio?o.post("/organize/create/city",{name:this.form.name}).then((function(t){e.loading=!1,e.opened=!1,t.ok&&(n.$Message.success("保存成功"),e.updateOrganize(),e.init())})):1==this.radio?o.post("/organize/create/zone",{name:this.form.name,idCity:this.form.city.now}).then((function(t){e.loading=!1,e.opened=!1,t.ok&&(n.$Message.success("保存成功"),e.updateOrganize(),e.init())})):o.post("/organize/create/school",{name:this.form.name,idZone:this.form.zone.now}).then((function(t){e.loading=!1,e.opened=!1,t.ok&&(n.$Message.success("保存成功"),e.updateOrganize(),e.init())}))},open:function(){this.opened=!0;var t=e.get("user");1e4==t.level&&(this.radio=0,this.form.city=i.getCity(),this.form.zone={selects:[],now:0}),1200==t.level&&(this.radios=[{title:"区县",key:1},{title:"学校",key:2}],this.radio=1,this.form.city={selects:[{title:i.getName(t.idCity),key:t.idCity}],now:t.idCity},this.form.zone=i.getZone(this.city.now)),1100==t.level&&(this.radios=[{title:"学校",key:2}],this.radio=2,this.form.city={selects:[{title:i.getName(t.idCity),key:t.idCity}],now:t.idCity},this.form.zone={selects:[{title:i.getName(t.idZone),key:t.idZone}],now:t.idZone})},changeOpenCity:function(){this.form.zone=i.getZone(this.form.city.now)},updateOrganize:function(){o.get("/dashboard/setup",{}).then((function(t){t.ok&&e.set("organizes",t.body.organize)}))}}};t.default=a}).call(this,i(108),i(107).default,i(153).default,i(69))},633:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.staticRenderFns=t.render=void 0;var o=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"frame-page"},[t("div",{staticClass:"h-panel page-header"},[t("div",{staticClass:"h-panel-body"},[t("Row",{attrs:{type:"flex",space:20}},[t("Cell",{attrs:{width:4}},[t("Select",{attrs:{datas:e.city.selects,placeholder:"选择城市"},on:{change:e.changeCity},model:{value:e.city.now,callback:function(t){e.$set(e.city,"now",t)},expression:"city.now"}})],1),e._v(" "),t("Cell",{attrs:{width:4}},[t("Select",{attrs:{datas:e.zone.selects,placeholder:"选择区县"},on:{change:e.changeZone},model:{value:e.zone.now,callback:function(t){e.$set(e.zone,"now",t)},expression:"zone.now"}})],1),e._v(" "),t("Cell",{attrs:{flex:1}},[t("Button",{attrs:{color:"primary",circle:"",size:"l"},on:{click:e.open}},[e._v("创建组织")])],1)],1)],1)]),e._v(" "),t("div",{staticClass:"h-panel page-header"},[t("div",{staticClass:"h-panel-body"},[t("Table",{attrs:{datas:e.table.datas}},[t("TableItem",{attrs:{title:"序号",prop:"$serial",width:140}}),e._v(" "),t("TableItem",{attrs:{title:"城市",prop:"city"}}),e._v(" "),t("TableItem",{attrs:{title:"区县",prop:"zone"}}),e._v(" "),t("TableItem",{attrs:{title:"学校",prop:"school"}}),e._v(" "),t("TableItem",{attrs:{title:"操作",width:200},scopedSlots:e._u([{key:"default",fn:function(i){var o=i.data;return[t("Button",{attrs:{"text-color":"primary",size:"xs","no-border":"",disabled:e.disabled},on:{click:function(t){return e.remove(o)}}},[e._v("删除")])]}}])}),e._v(" "),t("div",{attrs:{slot:"empty"},slot:"empty"},[e._v("暂时无数据")])],1),e._v(" "),t("br"),t("br"),e._v(" "),t("Pagination",{attrs:{align:"center",layout:"pager"},on:{change:e.init},model:{value:e.table.pagination,callback:function(t){e.$set(e.table,"pagination",t)},expression:"table.pagination"}})],1)])]),e._v(" "),t("Modal",{attrs:{type:"drawer-right"},model:{value:e.opened,callback:function(t){e.opened=t},expression:"opened"}},[t("div",{staticClass:"model-right"},[t("div",{staticClass:"title"},[e._v("创建地区")]),e._v(" "),t("Form",{ref:"form",attrs:{labelPosition:"left"}},[t("FormItem",{attrs:{label:"类型"}},[t("Radio",{attrs:{datas:e.radios},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}})],1),e._v(" "),0==e.radio?t("FormItem",{attrs:{label:"城市"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.name,expression:"form.name"}],attrs:{type:"text",placeholder:"请输入城市名"},domProps:{value:e.form.name},on:{input:function(t){t.target.composing||e.$set(e.form,"name",t.target.value)}}})]):e._e(),e._v(" "),1==e.radio?t("FormItem",{attrs:{label:"城市"}},[t("Select",{attrs:{datas:e.form.city.selects,placeholder:"选择城市"},model:{value:e.form.city.now,callback:function(t){e.$set(e.form.city,"now",t)},expression:"form.city.now"}})],1):e._e(),e._v(" "),1==e.radio?t("FormItem",{attrs:{label:"区县"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.name,expression:"form.name"}],attrs:{type:"text",placeholder:"请输入区县名"},domProps:{value:e.form.name},on:{input:function(t){t.target.composing||e.$set(e.form,"name",t.target.value)}}})]):e._e(),e._v(" "),2==e.radio?t("FormItem",{attrs:{label:"城市"}},[t("Select",{attrs:{datas:e.form.city.selects,placeholder:"选择城市"},on:{change:e.changeOpenCity},model:{value:e.form.city.now,callback:function(t){e.$set(e.form.city,"now",t)},expression:"form.city.now"}})],1):e._e(),e._v(" "),2==e.radio?t("FormItem",{attrs:{label:"区县"}},[t("Select",{attrs:{datas:e.form.zone.selects,placeholder:"选择区县"},model:{value:e.form.zone.now,callback:function(t){e.$set(e.form.zone,"now",t)},expression:"form.zone.now"}})],1):e._e(),e._v(" "),2==e.radio?t("FormItem",{attrs:{label:"学校"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.name,expression:"form.name"}],attrs:{type:"text",placeholder:"请输入学校名"},domProps:{value:e.form.name},on:{input:function(t){t.target.composing||e.$set(e.form,"name",t.target.value)}}})]):e._e(),e._v(" "),t("FormItem",[t("Button",{attrs:{color:"primary",circle:"",loading:e.loading},on:{click:e.save}},[e._v("保 存")]),e._v(" "),t("Button",{attrs:{circle:""},on:{click:function(t){e.opened=!1}}},[e._v("取 消")])],1)],1)],1)])],1)};t.render=o;t.staticRenderFns=[],o._withStripped=!0},816:function(e,t,i){"use strict";var o=i(633);i.o(o,"render")&&i.d(t,"render",(function(){return o.render})),i.o(o,"staticRenderFns")&&i.d(t,"staticRenderFns",(function(){return o.staticRenderFns}))}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{387:function(t,e,a){"use strict";a.r(e);var s=a(874),n=a(551);for(var r in n)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a(875);var o=a(16),i=Object(o.a)(n.default,s.render,s.staticRenderFns,!1,null,"7fd825cc",null);e.default=i.exports},551:function(t,e,a){"use strict";a.r(e);var s=a(552),n=a.n(s);for(var r in s)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return s[t]}))}(r);e.default=n.a},552:function(t,e,a){"use strict";(function(t,a,s,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{year:{selects:[],now:0},step:{selects:[],now:0},clss:{selects:[],now:0},table:{pagination:{page:1,size:10,total:0},datas:[]},loading:!1,searched:!1,exStudent:null,open:{score:!1,update:!1},form:{},radios:[{title:"待审核",key:"0"},{title:"不通过",key:"1"},{title:"已审核",key:"2"}],disabled:!1}},created:function(){t.get("user").level>100&&(this.disabled=!0),this.year=a.getYear(),this.step=a.getStep(),this.clss=a.getClss(this.year.now),this.init()},methods:{init:function(){var t=this;this.searched=!0,s.get("/stu/skill/page",{page:this.exStudent?0:this.table.pagination.page-1,semester:this.step.now,idYear:this.year.now,idClass:this.clss.now,exStudent:this.exStudent}).then((function(e){e.ok&&t.setTable(e.body)}))},setTable:function(t){t.content.forEach((function(t){switch(t.class=a.getNameClss(t.idClass),t.valid=t.valid?t.valid:0,t.created=t.created.substr(0,10),t.type){case 1:t.type="声乐";break;case 2:t.type="器乐";break;case 3:t.type="舞蹈";break;case 4:t.type="戏剧";break;case 5:t.type="戏曲";break;case 6:t.type="绘画";break;case 7:t.type="书法";break;default:t.type="其他"}})),this.table.datas=t.content,this.table.pagination.total=t.totalElements},changeYear:function(){this.step.now=0,this.clss=a.getClss(this.year.now)},changeStep:function(){this.table.pagination.page=1,this.init()},changeClss:function(){this.table.pagination.page=1,this.init()},score:function(t){this.open.score=!0,this.form=a.copy(t)},update:function(t){this.open.update=!0,this.form=a.copy(t)},save:function(){var t=this;a.confirm(this,"确定修改该记录 ？",(function(e){t.loading=!0,e.close(),s.post("/stu/skill/update",{id:t.form.id,name:t.form.name,cert:t.form.cert,score:t.form.score,comment:t.form.comment,valid:t.form.valid}).then((function(e){t.open.score=!1,t.open.update=!1,t.loading=!1,e.ok&&(n.$Message.success("修改成功"),t.init())}))}))},remove:function(t){var e=this;a.confirm(this,"确定删除该记录 ？",(function(a){e.loading=!0,a.close(),s.post("/stu/skill/delete",{id:t.id}).then((function(t){e.loading=!1,t.ok&&(n.$Message.success("删除成功"),e.init())}))}))}}};e.default=r}).call(this,a(108),a(107).default,a(153).default,a(69))},688:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.staticRenderFns=e.render=void 0;var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"frame-page"},[e("div",{staticClass:"h-panel page-header"},[e("div",{staticClass:"h-panel-body"},[e("Row",{attrs:{type:"flex",space:20}},[e("Cell",{attrs:{width:4}},[e("Select",{attrs:{datas:t.year.selects,deletable:!1},on:{change:t.changeYear},model:{value:t.year.now,callback:function(e){t.$set(t.year,"now",e)},expression:"year.now"}})],1),t._v(" "),e("Cell",{attrs:{width:4}},[e("Select",{attrs:{datas:t.step.selects,placeholder:"选择学期"},on:{change:t.changeStep},model:{value:t.step.now,callback:function(e){t.$set(t.step,"now",e)},expression:"step.now"}})],1),t._v(" "),e("Cell",{attrs:{width:4}},[e("Select",{attrs:{datas:t.clss.selects,placeholder:"选择班级"},on:{change:t.changeClss},model:{value:t.clss.now,callback:function(e){t.$set(t.clss,"now",e)},expression:"clss.now"}})],1),t._v(" "),e("Cell",{attrs:{width:4}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.exStudent,expression:"exStudent"}],attrs:{type:"text",placeholder:"输入学生"},domProps:{value:t.exStudent},on:{input:function(e){e.target.composing||(t.exStudent=e.target.value)}}})]),t._v(" "),e("Cell",{attrs:{flex:1}},[e("Button",{attrs:{color:"primary",circle:"",size:"l"},on:{click:t.init}},[t._v("搜索")])],1)],1)],1)]),t._v(" "),e("div",{staticClass:"h-panel"},[e("div",{staticClass:"h-panel-body"},[e("Table",{attrs:{datas:t.table.datas}},[e("TableItem",{attrs:{title:"学生",prop:"exStudent",width:140}},[t._v(">")]),t._v(" "),e("TableItem",{attrs:{title:"班级",prop:"class"}}),t._v(" "),e("TableItem",{attrs:{title:"日期",prop:"created"}}),t._v(" "),e("TableItem",{attrs:{title:"活动类型",prop:"type"}}),t._v(" "),e("TableItem",{attrs:{title:"证书",prop:"name"}}),t._v(" "),e("TableItem",{attrs:{title:"状态"},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.data;return[0==s.valid?e("span",{staticClass:"h-tag h-tag-bg-gray"},[t._v("待审核")]):t._e(),t._v(" "),1==s.valid?e("span",{staticClass:"h-tag h-tag-bg-yellow"},[t._v("不通过")]):t._e(),t._v(" "),2==s.valid?e("span",{staticClass:"h-tag h-tag-bg-primary"},[t._v("已审核")]):t._e()]}}])}),t._v(" "),e("TableItem",{attrs:{title:"得分",prop:"score"}}),t._v(" "),e("TableItem",{attrs:{title:"操作",width:260},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.data;return[e("Button",{attrs:{"text-color":"primary",size:"xs","no-border":"",disabled:t.disabled},on:{click:function(e){return t.score(s)}}},[t._v("打分")]),t._v(" "),e("Button",{attrs:{"text-color":"primary",size:"xs","no-border":"",disabled:t.disabled},on:{click:function(e){return t.update(s)}}},[t._v("修改")]),t._v(" "),e("Button",{attrs:{"text-color":"primary",size:"xs","no-border":"",disabled:t.disabled},on:{click:function(e){return t.remove(s)}}},[t._v("删除")])]}}])}),t._v(" "),e("div",{attrs:{slot:"empty"},slot:"empty"},[t._v(t._s(t.searched?"无数据":"未搜索"))])],1),t._v(" "),e("br"),e("br"),t._v(" "),e("Pagination",{attrs:{align:"center",layout:"pager"},on:{change:t.init},model:{value:t.table.pagination,callback:function(e){t.$set(t.table,"pagination",e)},expression:"table.pagination"}})],1)]),t._v(" "),e("Modal",{attrs:{type:"drawer-right"},model:{value:t.open.score,callback:function(e){t.$set(t.open,"score",e)},expression:"open.score"}},[e("div",{staticClass:"model-right"},[e("div",{staticClass:"title"},[t._v("手动打分")]),t._v(" "),e("Form",{ref:"form",attrs:{labelPosition:"left"}},[e("FormItem",{attrs:{label:"姓名",readonly:""}},[t._v("\r\n          "+t._s(t.form.exStudent)+"\r\n        ")]),t._v(" "),e("FormItem",{attrs:{label:"证书",readonly:""}},[t._v("\r\n          "+t._s(t.form.name)+"\r\n          "),e("div",{staticClass:"cert-image"},[e("Qiniu",{attrs:{className:"cert-image",type:"image","data-type":"url"},model:{value:t.form.cert,callback:function(e){t.$set(t.form,"cert",e)},expression:"form.cert"}})],1)]),t._v(" "),e("FormItem",{attrs:{label:"得分",prop:"score"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.score,expression:"form.score"}],attrs:{type:"number",placeholder:"请输入分数"},domProps:{value:t.form.score},on:{input:function(e){e.target.composing||t.$set(t.form,"score",e.target.value)}}})]),t._v(" "),e("FormItem",{attrs:{label:"评语",prop:"comment"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.comment,expression:"form.comment"}],attrs:{type:"text",placeholder:"请输入评语"},domProps:{value:t.form.comment},on:{input:function(e){e.target.composing||t.$set(t.form,"comment",e.target.value)}}})]),t._v(" "),e("FormItem",[e("Button",{attrs:{color:"primary",circle:"",loading:t.loading},on:{click:t.save}},[t._v("保 存")]),t._v(" "),e("Button",{attrs:{circle:""},on:{click:function(e){t.open.score=!1}}},[t._v("取 消")])],1)],1)],1)]),t._v(" "),e("Modal",{attrs:{type:"drawer-right"},model:{value:t.open.update,callback:function(e){t.$set(t.open,"update",e)},expression:"open.update"}},[e("div",{staticClass:"model-right"},[e("div",{staticClass:"title"},[t._v("修改/审核")]),t._v(" "),e("Form",{ref:"form",attrs:{labelPosition:"left"}},[e("FormItem",{attrs:{label:"姓名",readonly:""}},[t._v("\r\n          "+t._s(t.form.exStudent)+"\r\n        ")]),t._v(" "),e("FormItem",{attrs:{label:"班级",readonly:""}},[t._v("\r\n          "+t._s(t.form.class)+"\r\n        ")]),t._v(" "),e("FormItem",{attrs:{label:"证书",prop:"name"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.name,expression:"form.name"}],attrs:{type:"text",placeholder:"输入名称"},domProps:{value:t.form.name},on:{input:function(e){e.target.composing||t.$set(t.form,"name",e.target.value)}}}),t._v(" "),e("div",{staticClass:"cert-image"},[e("Qiniu",{attrs:{className:"cert-image",type:"image","data-type":"url"},model:{value:t.form.cert,callback:function(e){t.$set(t.form,"cert",e)},expression:"form.cert"}})],1)]),t._v(" "),e("FormItem",{attrs:{label:"审核状态",prop:"valid"}},[e("Radio",{attrs:{datas:t.radios},model:{value:t.form.valid,callback:function(e){t.$set(t.form,"valid",e)},expression:"form.valid"}})],1),t._v(" "),e("FormItem",{staticClass:"btns"},[e("Button",{attrs:{color:"primary",circle:"",loading:t.loading},on:{click:t.save}},[t._v("保 存")]),t._v(" "),e("Button",{attrs:{circle:""},on:{click:function(e){t.open.update=!1}}},[t._v("取 消")])],1)],1)],1)])],1)};e.render=s;e.staticRenderFns=[],s._withStripped=!0},689:function(t,e,a){},874:function(t,e,a){"use strict";var s=a(688);a.o(s,"render")&&a.d(e,"render",(function(){return s.render})),a.o(s,"staticRenderFns")&&a.d(e,"staticRenderFns",(function(){return s.staticRenderFns}))},875:function(t,e,a){"use strict";a(689)}}]);
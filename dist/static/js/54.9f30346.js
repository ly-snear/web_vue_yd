(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{386:function(e,t,s){"use strict";s.r(t);var a=s(873),r=s(549);for(var l in r)["default"].indexOf(l)<0&&function(e){s.d(t,e,(function(){return r[e]}))}(l);var n=s(16),o=Object(n.a)(r.default,a.render,a.staticRenderFns,!1,null,"5402e09d",null);t.default=o.exports},549:function(e,t,s){"use strict";s.r(t);var a=s(550),r=s.n(a);for(var l in a)["default"].indexOf(l)<0&&function(e){s.d(t,e,(function(){return a[e]}))}(l);t.default=r.a},550:function(e,t,s){"use strict";(function(e,s,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{year:{selects:[],now:0},step:{selects:[],now:0},clss:{selects:[],now:0},serial:{selects:[],now:0},checkbox:{array:[],selects:[]},selects:[{title:"声乐",key:1},{title:"器乐",key:2},{title:"舞蹈",key:3},{title:"戏剧",key:4},{title:"戏曲",key:5},{title:"绘画",key:6},{title:"书法",key:7},{title:"其他",key:100}],form:{rules:{required:["name","type","cert"]},name:null,type:null,cert:null,selects:[]},loading:!1,upload:{options:{max_file_size:"1mb"}}}},created:function(){this.year=e.getYear(),this.step=e.getStep(),this.clss=e.getClss(this.year.now)},methods:{select:function(e){var t=this.checkbox.selects.findIndex((function(t){return t.id==e.id}));t<0?(e.color="#00C15E",this.checkbox.selects.push(e)):(e.color="#666666",this.checkbox.selects.splice(t,1))},setArray:function(e){for(var t=[],s=0;s<e.length;s+=10){for(var a=[],r=s;r<s+10&&r<e.length;r++){var l=e[r];l.color="#666666",a.push(l)}t.push({key:"k"+s,list:a})}this.checkbox.array=t},changeClss:function(){var e=this;s.get("/student/list",{idYear:this.year.now,idClass:this.clss.now}).then((function(t){t.ok&&e.setArray(t.body)}))},save:function(){var t=this;this.$refs.form.valid()&&e.confirm(this,"确定提交该特长 ？",(function(e){t.loading=!0,e.close();var r=[],l=[];t.checkbox.selects.forEach((function(e){r.push(e.id),l.push(e.name)})),s.post("/stu/skill/create",{semester:t.step.now,name:t.form.name,type:t.form.type,cert:t.form.cert,idClass:t.clss.now,idStudentList:r.join(),exStudentList:l.join()}).then((function(e){t.loading=!1,t.checkbox.selects.forEach((function(e){e.color="#666666"})),t.checkbox.selects=[],e.ok&&a.$Message.success("提交成功")}))}))}}};t.default=r}).call(this,s(107).default,s(153).default,s(69))},687:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.staticRenderFns=t.render=void 0;var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"frame-page"},[t("div",{staticClass:"h-panel page-header"},[t("div",{staticClass:"h-panel-body"},[t("Row",{attrs:{space:20}},[t("Cell",{attrs:{width:4}},[t("Select",{attrs:{datas:e.year.selects,deletable:!1,disabled:""},model:{value:e.year.now,callback:function(t){e.$set(e.year,"now",t)},expression:"year.now"}})],1),e._v(" "),t("Cell",{attrs:{width:4}},[t("Select",{attrs:{datas:e.step.selects,deletable:!1,disabled:""},model:{value:e.step.now,callback:function(t){e.$set(e.step,"now",t)},expression:"step.now"}})],1),e._v(" "),t("Cell",{attrs:{width:4}},[t("Select",{attrs:{datas:e.clss.selects,deletable:!1,placeholder:"选择班级"},on:{change:e.changeClss},model:{value:e.clss.now,callback:function(t){e.$set(e.clss,"now",t)},expression:"clss.now"}})],1)],1)],1)]),e._v(" "),t("div",{staticClass:"h-panel page-header"},[t("div",{staticClass:"h-panel-body"},[t("Form",{ref:"form",attrs:{labelPosition:"left",labelWidth:100,model:e.form,rules:e.form.rules,showErrorTip:""}},[t("FormItem",{attrs:{label:"类型",prop:"type"}},[t("Cell",{attrs:{width:5}},[t("Select",{attrs:{datas:e.selects},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1)],1),e._v(" "),t("FormItem",{attrs:{label:"证书",prop:"name"}},[t("Row",{attrs:{"space-x":50,type:"flex"}},[t("Cell",{attrs:{width:5}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.name,expression:"form.name"}],attrs:{type:"text",placeholder:"输入名称"},domProps:{value:e.form.name},on:{input:function(t){t.target.composing||e.$set(e.form,"name",t.target.value)}}})]),e._v(" "),t("Cell",{attrs:{width:5}},[t("Qiniu",{attrs:{className:"cert-image",options:e.upload.options,type:"image","data-type":"url"},model:{value:e.form.cert,callback:function(t){e.$set(e.form,"cert",t)},expression:"form.cert"}})],1)],1)],1),e._v(" "),t("FormItem",{attrs:{label:"选择学生",required:""}},e._l(e.checkbox.array,(function(s){return t("Row",{key:s.key},e._l(s.list,(function(s){return t("Cell",{key:s.id,attrs:{width:2,value:s}},[t("Checkbox",{staticClass:"check",style:{color:s.color},attrs:{value:s},on:{change:function(t){return e.select(s)}},model:{value:e.checkbox.selects,callback:function(t){e.$set(e.checkbox,"selects",t)},expression:"checkbox.selects"}},[e._v(e._s(s.name))])],1)})),1)})),1),e._v(" "),t("br"),e._v(" "),t("FormItem",[t("Button",{attrs:{color:"primary",circle:"",loading:e.loading,disabled:0==e.checkbox.selects.length},on:{click:e.save}},[e._v("提 交")])],1)],1)],1)])])};t.render=a;t.staticRenderFns=[],a._withStripped=!0},873:function(e,t,s){"use strict";var a=s(687);s.o(a,"render")&&s.d(t,"render",(function(){return a.render})),s.o(a,"staticRenderFns")&&s.d(t,"staticRenderFns",(function(){return a.staticRenderFns}))}}]);
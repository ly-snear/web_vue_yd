(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{363:function(e,t,n){"use strict";n.r(t);var i=n(828),s=n(503);for(var a in s)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return s[e]}))}(a);n(829);var r=n(16),l=Object(r.a)(s.default,i.render,i.staticRenderFns,!1,null,"1b96cebf",null);t.default=l.exports},503:function(e,t,n){"use strict";n.r(t);var i=n(504),s=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t.default=s.a},504:function(e,t,n){"use strict";(function(e,n,i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={data:function(){return{loading:!1,id:null,array1:[{}],array2:[{}]}},created:function(){var t=this;e.get("/setting/read",{}).then((function(e){e.ok&&e.body&&t.setArray(e.body)}))},methods:{setArray:function(e){if(this.id=e.id,e.levelAction.length>0&&e.scoreAction.length>0)for(var t=e.levelAction.split(","),n=e.scoreAction.split(","),i=0;i<t.length;i++)this.array1.splice(i,0,{level:t[i],score:n[i]});if(e.levelSkill.length>0&&e.scoreSkill.length>0)for(var s=e.levelSkill.split(","),a=e.scoreSkill.split(","),r=0;r<s.length;r++)this.array2.splice(r,0,{level:s[r],score:a[r]})},add:function(e,t){e.splice(t+1,0,{})},del:function(e,t){e.length>1&&e.splice(t,1)},save:function(){var t=this,s=[],a=[],r=[],l=[];this.array1.forEach((function(e){e.level&&e.score&&(s.push(e.level),a.push(e.score))})),this.array2.forEach((function(e){e.level&&e.score&&(r.push(e.level),l.push(e.score))})),n.confirm(this,"确定提交该设置 ？",(function(n){t.loading=!0,n.close(),t.id&&t.id>0?e.post("/setting/update",{id:t.id,levelAction:s.join(),scoreAction:a.join(),levelSkill:r.join(),scoreSkill:l.join()}).then((function(e){t.loading=!1,e.ok&&i.$Message.success("提交成功")})):e.post("/setting/create",{levelAction:s.join(),scoreAction:a.join(),levelSkill:r.join(),scoreSkill:l.join()}).then((function(e){t.loading=!1,e.ok&&(i.$Message.success("提交成功"),t.id=e.body.id)}))}))}}};t.default=s}).call(this,n(153).default,n(107).default,n(69))},645:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.staticRenderFns=t.render=void 0;var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"frame-page"},[t("div",{staticClass:"h-panel page-header"},[t("div",{staticClass:"h-panel-body"},[t("br"),e._v(" "),t("Form",{staticClass:"form",attrs:{labelPosition:"left",labelWidth:140}},[t("FormItem",{attrs:{label:"活动学习（10分）"}},e._l(e.array1,(function(n,i){return t("Row",{key:i,attrs:{type:"flex",space:30}},[t("Cell",{attrs:{width:10}},[t("div",{staticClass:"h-input-group"},[t("span",{staticClass:"h-input-addon"},[e._v("课时数达到")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:n.level,expression:"it.level"}],attrs:{type:"text"},domProps:{value:n.level},on:{input:function(t){t.target.composing||e.$set(n,"level",t.target.value)}}}),e._v(" "),t("span",{staticClass:"h-input-addon"},[e._v("时 ，获得综合分")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:n.score,expression:"it.score"}],attrs:{type:"text"},domProps:{value:n.score},on:{input:function(t){t.target.composing||e.$set(n,"score",t.target.value)}}}),e._v(" "),t("span",{staticClass:"h-input-addon"},[e._v("分")])])]),e._v(" "),t("Cell",{attrs:{width:2}},[t("div",{staticClass:"btns"},[t("i",{staticClass:"h-icon-plus green-color",on:{click:function(t){return e.add(e.array1,i)}}}),e._v(" "),t("i",{staticClass:"h-icon-trash green-color",on:{click:function(t){return e.del(e.array1,i)}}})])])],1)})),1),e._v(" "),t("FormItem",{attrs:{label:"艺术特长（10分）"}},e._l(e.array2,(function(n,i){return t("Row",{key:i,attrs:{type:"flex",space:30}},[t("Cell",{attrs:{width:10}},[t("div",{staticClass:"h-input-group"},[t("span",{staticClass:"h-input-addon"},[e._v("特长数达到")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:n.level,expression:"it.level"}],attrs:{type:"text"},domProps:{value:n.level},on:{input:function(t){t.target.composing||e.$set(n,"level",t.target.value)}}}),e._v(" "),t("span",{staticClass:"h-input-addon"},[e._v("个 ，获得综合分")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:n.score,expression:"it.score"}],attrs:{type:"text"},domProps:{value:n.score},on:{input:function(t){t.target.composing||e.$set(n,"score",t.target.value)}}}),e._v(" "),t("span",{staticClass:"h-input-addon"},[e._v("分")])])]),e._v(" "),t("Cell",{attrs:{width:5}},[t("div",{staticClass:"btns"},[t("i",{staticClass:"h-icon-plus green-color",on:{click:function(t){return e.add(e.array2,i)}}}),e._v(" "),t("i",{staticClass:"h-icon-trash green-color",on:{click:function(t){return e.del(e.array2,i)}}})])])],1)})),1),e._v(" "),t("FormItem",[t("Button",{attrs:{color:"primary",circle:"",loading:e.loading},on:{click:e.save}},[e._v("保 存")])],1)],1)],1)])])};t.render=i;t.staticRenderFns=[],i._withStripped=!0},646:function(e,t,n){},828:function(e,t,n){"use strict";var i=n(645);n.o(i,"render")&&n.d(t,"render",(function(){return i.render})),n.o(i,"staticRenderFns")&&n.d(t,"staticRenderFns",(function(){return i.staticRenderFns}))},829:function(e,t,n){"use strict";n(646)}}]);
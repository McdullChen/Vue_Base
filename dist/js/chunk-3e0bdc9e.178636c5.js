(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e0bdc9e","chunk-6b946f05","chunk-6b946f05"],{1299:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"search-wrop"},[a("lj-search-from",{attrs:{searchObj:t.searchObj},on:{searchList:t.searchList}})],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.list,"header-cell-style":{background:"#e9eff8"},"row-style":{cursor:"pointer"},border:"",size:"mini"},on:{"selection-change":t.handleSelectionChange,"row-click":t.seeFunction}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{align:"center",label:"面额",prop:"quotaInvoiceAmount","show-overflow-tooltip":"",width:"80"}}),a("el-table-column",{attrs:{align:"center",label:"起讫号",prop:"quotaInvoiceNum","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{align:"center",label:"领用部门",prop:"collarOrgName","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{align:"center",label:"领用人",prop:"collarOrgPerson","show-overflow-tooltip":"",width:"100"}}),a("el-table-column",{attrs:{align:"center",label:"领用日期",prop:"collarTime","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t._f("formatDate")(e.row.collarTime))+"\n            ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"待上缴份数",prop:"quotaInvoiceCount","show-overflow-tooltip":"",width:"100"}}),a("el-table-column",{attrs:{align:"center",label:"上缴份数",prop:"submittedNum","show-overflow-tooltip":"",width:"80"}}),a("el-table-column",{attrs:{align:"center",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{staticClass:"item",attrs:{content:"查看",effect:"dark",placement:"top-end"}},[t.buttonCheck("see")?a("el-link",{staticClass:"el-icon-search btn-css",attrs:{type:"success"},on:{click:function(a){return a.stopPropagation(),t.seeFunction(e.row)}}}):t._e()],1)]}}])})],1),a("lj-pagination",{staticClass:"page-css",attrs:{pageNum:t.form.pageNum,pageSize:t.form.pageSize,total:t.total},on:{"update:pageNum":function(e){return t.$set(t.form,"pageNum",e)},"update:page-num":function(e){return t.$set(t.form,"pageNum",e)},"update:pageSize":function(e){return t.$set(t.form,"pageSize",e)},"update:page-size":function(e){return t.$set(t.form,"pageSize",e)},getData:t.getList}}),a("seecontent",{attrs:{caseProcessList:t.caseProcessList,caseTypeList:t.caseTypeList,show:t.seeObj.show,title:t.seeObj.title,id:t.seeObj.editId},on:{"update:show":function(e){return t.$set(t.seeObj,"show",e)},getList:t.getList}})],1)},o=[],i=a("f499"),s=a.n(i),r=(a("ac6a"),a("7e62")),l=a("8984"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{"close-on-click-modal":!1,title:t.title,visible:t.show,center:"",top:"30px",width:"80%"},on:{close:t.closeDialog}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"wrop"},[a("table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"gridTable"},[a("tr",[a("td",{staticClass:"label"},[t._v("起始号 ：")]),a("td",[a("span",[t._v(t._s(t.info.quotaInvoiceStart+" - "+t.info.quotaInvoiceEnd))])]),a("td",{staticClass:"label"},[t._v("票面金额 ：")]),a("td",[a("span",[t._v(t._s(t.info.quotaInvoiceAmount))])])]),a("tr",[a("td",{staticClass:"label"},[t._v("领用部门 ：")]),a("td",{attrs:{colspan:"4"}},[a("span",[t._v(t._s(t.info.collarOrgName))])])]),a("tr",[a("td",{staticClass:"label"},[t._v("领用人 ：")]),a("td",[a("span",[t._v(t._s(t.info.collarOrgPerson))])]),a("td",{staticClass:"label"},[t._v("领用日期 ：")]),a("td",[a("span",[t._v(t._s(t._f("formatDate")(t.info.collarTime)))])])])]),a("el-table",{attrs:{data:t.list,"header-cell-style":{background:"#e9eff8"},"row-style":{cursor:"pointer"},border:"",size:"mini"}},[a("el-table-column",{attrs:{align:"center",label:"编号",prop:"quotaInvoiceNum","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{align:"center",label:"状态",prop:"quotaStatus","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                        "+t._s(t._f("doneStatus")(e.row.quotaStatus))+"\n                    ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"银行名称",prop:"turnBank","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{align:"center",label:"收据编号",prop:"turnReceiptNum","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{align:"center",label:"银行缴纳日期",prop:"turnDay","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                        "+t._s(t._f("formatDate")(e.row.turnDay))+"\n                    ")]}}])})],1),a("lj-pagination",{staticClass:"page-css",attrs:{pageNum:t.form.pageNum,pageSize:t.form.pageSize,total:t.total},on:{"update:pageNum":function(e){return t.$set(t.form,"pageNum",e)},"update:page-num":function(e){return t.$set(t.form,"pageNum",e)},"update:pageSize":function(e){return t.$set(t.form,"pageSize",e)},"update:page-size":function(e){return t.$set(t.form,"pageSize",e)},getData:t.initPage}})],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.buttonCheck("turnin")?a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.submitForm}},[a("i",{staticClass:"iconfont el-icon-upload2"}),t._v(" 上缴发票\n            ")]):t._e()],1)])],1)},u=[],p=a("d4f4"),m=a("9057"),f=(a("8237"),{name:"see",props:{show:{type:Boolean,default:!1},title:{type:String,default:"查看"},id:{type:String,default:""}},components:{LjPagination:r["a"]},data:function(){return{loading:!1,list:[],info:{},form:{pageSize:20,pageNum:1},total:0}},methods:{closeDialog:function(){this.$emit("update:show",!1)},submitForm:function(){var t=this;this.loading=!0;var e={quotaId:this.id,quotaStatus:3};Object(p["z"])(e).then(function(e){t.loading=!1,t.$message({type:"success",message:"上缴成功!"}),t.$emit("getList"),t.closeDialog()})},initPage:function(){var t=this;this.id&&(this.form.quotaId=this.id,Object(p["vb"])(this.form).then(function(e){t.loading=!1,t.total=e.data.quotaDetailNum,t.list=e.data.caseQuotaDetailList,t.info=e.data}))}},filters:{formatDate:function(t){return Object(m["g"])(t,"yyyy-MM-dd")},doneStatus:function(t){return m["f"][t]}},watch:{show:function(t){t&&this.initPage()}}}),d=f,h=(a("fafc"),a("2877")),g=Object(h["a"])(d,c,u,!1,null,"5b009dd5",null),b=g.exports,v={name:"tobeturned",data:function(){return{caseProcessList:[],docStyleArr:[],loading:!0,searchObj:[{type:"input",name:"quotaInvoiceStart",label:"开始发票号"},{type:"input",name:"quotaInvoiceEnd",label:"结束发票号"},{type:"date",dateType:"daterange",name:"timeRange",name1:"startTime",name2:"endTime",options:[],label:"时间段",span:12}],editObj:{show:!1,title:"",editId:null},seeObj:{show:!1,title:"",editId:null},caseTypeList:[],form:{pageSize:20,pageNum:1,quotaStatus:2},total:0,list:[],idstr:""}},components:{LjPagination:r["a"],LjSearchFrom:l["a"],seecontent:b},methods:{handleSelectionChange:function(t){var e=[];t.forEach(function(t){e.push(t.quotaId)}),this.idstr=e.join(",")},onImport:function(){this.seeObj.title="批量上传",this.seeObj.show=!0},getList:function(){var t=this;Object(p["x"])(this.form).then(function(e){t.total=e.total,t.list=e.data,t.loading=!1})},seeFunction:function(t){this.seeObj.editId=t.quotaId,this.seeObj.title="查看",this.seeObj.show=!0},onAdd:function(){this.editObj.editId=null,this.editObj.title="新增票据",this.editObj.show=!0},delateFunction:function(t,e){var a=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(p["C"])(e.quotaId).then(function(){a.getList(),a.$message({type:"success",message:"删除成功!"})})})},onDel:function(){var t=this;this.$confirm("此操作将永久删除这些数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(p["B"])({quotaIds:t.idstr}).then(function(){t.getList(),t.$message({type:"success",message:"批量删除成功!"})})})},searchList:function(t){var e=this;this.loading=!0,t.pageSize=this.form.pageSize,this.form=JSON.parse(s()(t)),this.form.pageNum=1,this.form.quotaStatus=2,Object(p["x"])(this.form).then(function(t){e.list=t.data,e.total=t.total,e.loading=!1})}},filters:{formatDate:function(t){return Object(m["g"])(t,"yyyy-MM-dd")}},created:function(){this.getList()}},w=v,y=(a("ca05"),Object(h["a"])(w,n,o,!1,null,"f672e1b2",null));e["default"]=y.exports},"6bdf":function(t,e,a){},"7e62":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.pageNum,"page-size":t.pageSize,total:t.total,layout:"total, sizes, prev, pager, next, jumper"},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)},o=[],i={name:"pagination",props:["pageNum","pageSize","total"],methods:{handleSizeChange:function(t){var e=this;this.$emit("update:pageNum",1),this.$emit("update:pageSize",t),this.$nextTick(function(){e.$emit("getData")})},handleCurrentChange:function(t){var e=this;this.$emit("update:pageNum",t),this.$nextTick(function(){e.$emit("getData")})}}},s=i,r=(a("d262"),a("2877")),l=Object(r["a"])(s,n,o,!1,null,"fe006920",null);e["a"]=l.exports},8984:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"clear-float",staticStyle:{"margin-bottom":"10px"}},[t.searchFlag?t._e():a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入查询条件"},model:{value:t.form.keyWord,callback:function(e){t.$set(t.form,"keyWord",e)},expression:"form.keyWord"}}),t.searchFlag?t._e():a("el-button",{staticStyle:{"margin-left":"5px"},attrs:{icon:"el-icon-search",type:"primary"},on:{click:t.searchList}},[t._v("搜索\n        ")]),a("div",{staticClass:"right-box"},[t.searchObj?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(e){t.searchFlag=!t.searchFlag}}},[t._v("\n                筛选更多"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]):t._e(),t.onCreate?a("el-button",{attrs:{icon:"el-icon-refresh",plain:"",type:"success"},on:{click:t.onCreate}},[t._v("生成当月检查数据\n            ")]):t._e(),t.onDel?a("el-button",{attrs:{icon:"el-icon-delete",plain:"",type:"danger"},on:{click:t.onDel}},[t._v("批量删除")]):t._e(),t.toVoid?a("el-button",{attrs:{icon:"el-icon-folder-delete",plain:"",type:"warning"},on:{click:t.toVoid}},[t._v("作废")]):t._e(),t.onAdd?a("el-button",{attrs:{icon:"el-icon-plus",plain:"",type:"primary"},on:{click:t.onAdd}},[t._v("新增")]):t._e(),t.onExport?a("el-button",{attrs:{icon:"el-icon-sort-down",plain:"",type:"primary"},on:{click:t.onExport}},[t._v("导出\n            ")]):t._e(),t.onImport?a("el-button",{attrs:{icon:"el-icon-sort-up",plain:"",type:"primary"},on:{click:t.onImport}},[t._v("批量导入\n            ")]):t._e()],1)],1),a("transition",{attrs:{name:"el-zoom-in-top"}},[a("el-form",{directives:[{name:"show",rawName:"v-show",value:t.searchFlag,expression:"searchFlag"}],ref:"form",staticClass:"search-box",staticStyle:{"padding-bottom":"10px"},attrs:{"label-width":"100px",size:"mini"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"关键字："}},[t.searchFlag?a("el-input",{attrs:{placeholder:"请输入查询条件"},model:{value:t.form.keyWord,callback:function(e){t.$set(t.form,"keyWord",e)},expression:"form.keyWord"}}):t._e()],1)],1),t._l(t.searchObj,function(e){return a("el-col",{key:e.name,attrs:{span:e.span?e.span:8}},[a("el-form-item",{attrs:{label:e.label+"："}},["input"===e.type?a("el-input",{model:{value:t.form[e.name],callback:function(a){t.$set(t.form,e.name,a)},expression:"form[data.name]"}}):t._e(),"select"===e.type?a("el-select",{model:{value:t.form[e.name],callback:function(a){t.$set(t.form,e.name,a)},expression:"form[data.name]"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._l(e.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})],2):t._e(),"date"===e.type?a("el-date-picker",{attrs:{type:e.dateType,"end-placeholder":"结束日期","range-separator":"至","start-placeholder":"开始日期","value-format":"timestamp"},model:{value:t.form[e.name],callback:function(a){t.$set(t.form,e.name,a)},expression:"form[data.name]"}}):t._e()],1)],1)}),a("el-col",{attrs:{span:24}},[a("div",{staticStyle:{"text-align":"center"}},[t.searchFlag?a("el-button",{attrs:{icon:"el-icon-refresh"},on:{click:t.refreshList}},[t._v("重置\n                        ")]):t._e(),t.searchFlag?a("el-button",{attrs:{icon:"el-icon-search",type:"primary"},on:{click:t.searchList}},[t._v("搜索\n                        ")]):t._e()],1)])],2)],1)],1)],1)},o=[],i=(a("7f7f"),{name:"searchForm",props:["searchObj","onAdd","onExport","onImport","onDel","onCreate","toVoid"],data:function(){var t={pageSize:20,pageNum:1,keyWord:""};for(var e in this.searchObj)"timeRange"===this.searchObj[e].name?(t[this.searchObj[e].name]=[],t[this.searchObj[e].name1]="",t[this.searchObj[e].name2]=""):t[this.searchObj[e].name]="";return{searchFlag:!1,searchKey:"",form:t}},methods:{refreshList:function(){for(var t in this.form)this.form[t]=""},searchList:function(){for(var t in this.searchObj)"timeRange"===this.searchObj[t].name&&(this.form[this.searchObj[t].name1]=this.form[this.searchObj[t].name][0],this.form[this.searchObj[t].name2]=this.form[this.searchObj[t].name][1]);this.form.pageNum=1,this.$emit("searchList",this.form)}}}),s=i,r=(a("a53f"),a("2877")),l=Object(r["a"])(s,n,o,!1,null,"07a28794",null);e["a"]=l.exports},"8c0a2":function(t,e,a){},a53f:function(t,e,a){"use strict";var n=a("8c0a2"),o=a.n(n);o.a},a60d:function(t,e,a){},be74:function(t,e,a){},ca05:function(t,e,a){"use strict";var n=a("a60d"),o=a.n(n);o.a},d262:function(t,e,a){"use strict";var n=a("6bdf"),o=a.n(n);o.a},fafc:function(t,e,a){"use strict";var n=a("be74"),o=a.n(n);o.a}}]);
//# sourceMappingURL=chunk-3e0bdc9e.178636c5.js.map
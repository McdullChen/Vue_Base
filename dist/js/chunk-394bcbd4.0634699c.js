(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-394bcbd4","chunk-6b946f05","chunk-6b946f05"],{"0b55":function(e,t,a){"use strict";var n=a("a756"),o=a.n(n);o.a},"29c3":function(e,t,a){"use strict";var n=a("c9e1"),o=a.n(n);o.a},"6bdf":function(e,t,a){},"7e62":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.pageNum,"page-size":e.pageSize,total:e.total,layout:"total, sizes, prev, pager, next, jumper"},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)},o=[],i={name:"pagination",props:["pageNum","pageSize","total"],methods:{handleSizeChange:function(e){var t=this;this.$emit("update:pageNum",1),this.$emit("update:pageSize",e),this.$nextTick(function(){t.$emit("getData")})},handleCurrentChange:function(e){var t=this;this.$emit("update:pageNum",e),this.$nextTick(function(){t.$emit("getData")})}}},r=i,l=(a("d262"),a("2877")),s=Object(l["a"])(r,n,o,!1,null,"fe006920",null);t["a"]=s.exports},8984:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"clear-float",staticStyle:{"margin-bottom":"10px"}},[e.searchFlag?e._e():a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入查询条件"},model:{value:e.form.keyWord,callback:function(t){e.$set(e.form,"keyWord",t)},expression:"form.keyWord"}}),e.searchFlag?e._e():a("el-button",{staticStyle:{"margin-left":"5px"},attrs:{icon:"el-icon-search",type:"primary"},on:{click:e.searchList}},[e._v("搜索\n        ")]),a("div",{staticClass:"right-box"},[e.searchObj?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(t){e.searchFlag=!e.searchFlag}}},[e._v("\n                筛选更多"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]):e._e(),e.onCreate?a("el-button",{attrs:{icon:"el-icon-refresh",plain:"",type:"success"},on:{click:e.onCreate}},[e._v("生成当月检查数据\n            ")]):e._e(),e.onDel?a("el-button",{attrs:{icon:"el-icon-delete",plain:"",type:"danger"},on:{click:e.onDel}},[e._v("批量删除")]):e._e(),e.toVoid?a("el-button",{attrs:{icon:"el-icon-folder-delete",plain:"",type:"warning"},on:{click:e.toVoid}},[e._v("作废")]):e._e(),e.onAdd?a("el-button",{attrs:{icon:"el-icon-plus",plain:"",type:"primary"},on:{click:e.onAdd}},[e._v("新增")]):e._e(),e.onExport?a("el-button",{attrs:{icon:"el-icon-sort-down",plain:"",type:"primary"},on:{click:e.onExport}},[e._v("导出\n            ")]):e._e(),e.onImport?a("el-button",{attrs:{icon:"el-icon-sort-up",plain:"",type:"primary"},on:{click:e.onImport}},[e._v("批量导入\n            ")]):e._e()],1)],1),a("transition",{attrs:{name:"el-zoom-in-top"}},[a("el-form",{directives:[{name:"show",rawName:"v-show",value:e.searchFlag,expression:"searchFlag"}],ref:"form",staticClass:"search-box",staticStyle:{"padding-bottom":"10px"},attrs:{"label-width":"100px",size:"mini"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"关键字："}},[e.searchFlag?a("el-input",{attrs:{placeholder:"请输入查询条件"},model:{value:e.form.keyWord,callback:function(t){e.$set(e.form,"keyWord",t)},expression:"form.keyWord"}}):e._e()],1)],1),e._l(e.searchObj,function(t){return a("el-col",{key:t.name,attrs:{span:t.span?t.span:8}},[a("el-form-item",{attrs:{label:t.label+"："}},["input"===t.type?a("el-input",{model:{value:e.form[t.name],callback:function(a){e.$set(e.form,t.name,a)},expression:"form[data.name]"}}):e._e(),"select"===t.type?a("el-select",{model:{value:e.form[t.name],callback:function(a){e.$set(e.form,t.name,a)},expression:"form[data.name]"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(t.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})],2):e._e(),"date"===t.type?a("el-date-picker",{attrs:{type:t.dateType,"end-placeholder":"结束日期","range-separator":"至","start-placeholder":"开始日期","value-format":"timestamp"},model:{value:e.form[t.name],callback:function(a){e.$set(e.form,t.name,a)},expression:"form[data.name]"}}):e._e()],1)],1)}),a("el-col",{attrs:{span:24}},[a("div",{staticStyle:{"text-align":"center"}},[e.searchFlag?a("el-button",{attrs:{icon:"el-icon-refresh"},on:{click:e.refreshList}},[e._v("重置\n                        ")]):e._e(),e.searchFlag?a("el-button",{attrs:{icon:"el-icon-search",type:"primary"},on:{click:e.searchList}},[e._v("搜索\n                        ")]):e._e()],1)])],2)],1)],1)],1)},o=[],i=(a("7f7f"),{name:"searchForm",props:["searchObj","onAdd","onExport","onImport","onDel","onCreate","toVoid"],data:function(){var e={pageSize:20,pageNum:1,keyWord:""};for(var t in this.searchObj)"timeRange"===this.searchObj[t].name?(e[this.searchObj[t].name]=[],e[this.searchObj[t].name1]="",e[this.searchObj[t].name2]=""):e[this.searchObj[t].name]="";return{searchFlag:!1,searchKey:"",form:e}},methods:{refreshList:function(){for(var e in this.form)this.form[e]=""},searchList:function(){for(var e in this.searchObj)"timeRange"===this.searchObj[e].name&&(this.form[this.searchObj[e].name1]=this.form[this.searchObj[e].name][0],this.form[this.searchObj[e].name2]=this.form[this.searchObj[e].name][1]);this.form.pageNum=1,this.$emit("searchList",this.form)}}}),r=i,l=(a("a53f"),a("2877")),s=Object(l["a"])(r,n,o,!1,null,"07a28794",null);t["a"]=s.exports},"8c0a2":function(e,t,a){},a53f:function(e,t,a){"use strict";var n=a("8c0a2"),o=a.n(n);o.a},a756:function(e,t,a){},b38a:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search-wrop"},[a("lj-search-from",{attrs:{onAdd:e.buttonCheck("add")?e.onAdd:"",onDel:e.buttonCheck("batchdel")?e.onDel:""},on:{searchList:e.searchList}})],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.list,"header-cell-style":{background:"#e9eff8"},"row-style":{cursor:"pointer"},border:"",size:"mini"},on:{"selection-change":e.handleSelectionChange,"row-click":e.seeFunction}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{align:"center",label:"收据编号",prop:"turnReceiptNum","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{align:"center",label:"缴款金额",prop:"totalAmount","show-overflow-tooltip":""}})],1),a("lj-pagination",{staticClass:"page-css",attrs:{pageNum:e.form.pageNum,pageSize:e.form.pageSize,total:e.total},on:{"update:pageNum":function(t){return e.$set(e.form,"pageNum",t)},"update:page-num":function(t){return e.$set(e.form,"pageNum",t)},"update:pageSize":function(t){return e.$set(e.form,"pageSize",t)},"update:page-size":function(t){return e.$set(e.form,"pageSize",t)},getData:e.getList}}),a("change-Edit",{attrs:{caseProcessList:e.caseProcessList,show:e.editObj.show,title:e.editObj.title,type:e.editObj.editId},on:{"update:show":function(t){return e.$set(e.editObj,"show",t)},getList:e.getList}})],1)},o=[],i=a("f499"),r=a.n(i),l=(a("ac6a"),a("7e62")),s=a("8984"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{"close-on-click-modal":!1,title:e.title,visible:e.show,center:"",width:"550px"},on:{close:e.closeDialog}},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",attrs:{model:e.form,rules:e.rules,"label-width":"130px",size:"medium"}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"选择组织部门："}},[a("el-select",{staticClass:"divwidth",attrs:{placeholder:"请选择部门"},on:{change:e.stlectOrg},model:{value:e.form.collarOrg,callback:function(t){e.$set(e.form,"collarOrg",t)},expression:"form.collarOrg"}},e._l(e.collarOrgList,function(e){return a("el-option",{key:e.orgId,attrs:{label:e.orgName,value:e.orgId}})}),1)],1)],1),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"银行名称：",prop:"turnBank"}},[a("el-select",{staticClass:"divwidth",attrs:{placeholder:"请选择缴款银行"},model:{value:e.form.turnBank,callback:function(t){e.$set(e.form,"turnBank",t)},expression:"form.turnBank"}},e._l(e.banklist,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"银行收据编号：",prop:"turnReceiptNum"}},[a("el-input",{attrs:{placeholder:"填写银行收据编号"},model:{value:e.form.turnReceiptNum,callback:function(t){e.$set(e.form,"turnReceiptNum",t)},expression:"form.turnReceiptNum"}})],1)],1),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"缴纳日期：",prop:"turnDay"}},[a("el-date-picker",{staticClass:"divwidth",attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.turnDay,callback:function(t){e.$set(e.form,"turnDay",t)},expression:"form.turnDay"}})],1)],1),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"票据清单：",prop:"detailId"}},[a("el-select",{staticClass:"divwidth",attrs:{multiple:"",placeholder:"请选择票据清单"},model:{value:e.form.detailId,callback:function(t){e.$set(e.form,"detailId",t)},expression:"form.detailId"}},e._l(e.billlist,function(t){return a("el-option-group",{key:t.label,attrs:{label:t.label}},e._l(t.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)}),1)],1)],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small",type:"info"},on:{click:e.closeDialog}},[a("i",{staticClass:"iconfont icon-back"}),e._v("取 消\n    ")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[a("i",{staticClass:"iconfont icon-save"}),e._v("确 定\n    ")])],1)],1)],1)},u=[],m=a("d4f4"),p=a("8593"),d={name:"edit",props:{caseProcessList:{type:Array,default:[]},show:{type:Boolean,default:!1},title:{type:String,default:"编辑"},type:{type:String,default:""}},data:function(){return{billlist:[],banklist:[{value:"建设银行",label:"建设银行"},{value:"工商银行",label:"工商银行"}],state1:"",restaurants:[],collarOrgList:[],loading:!1,quotaInvoiceNumArr:[{value:"10",label:"10"},{value:"20",label:"20"},{value:"50",label:"50"},{value:"100",label:"100"}],form:{},form2:{pageSize:20,pageNum:1},rules:{turnReceiptNum:[{required:!0,message:"请输入银行收据编号",trigger:"blur"}],detailId:[{required:!0,message:"请选择票据清单",trigger:"change"}],turnBank:[{required:!0,message:"请选择银行名称",trigger:"change"}],turnDay:[{required:!0,message:"选择日期",trigger:"change"}]}}},methods:{closeDialog:function(){this.$emit("update:show",!1)},stlectOrg:function(e){var t=this;Object(m["c"])({collarOrg:e}).then(function(e){var a=[],n={};e.data.forEach(function(e){var t=e.caseQuotaDetailList;n={label:e.quotaInvoiceNum,options:[]};var o={};t.forEach(function(e){o={value:e.detailId,label:e.quotaInvoiceNum},n.options.push(o)}),a.push(n)}),t.billlist=a})},submitForm:function(){var e=this;this.$refs.ruleForm.validate(function(t){t&&(e.loading=!0,e.form.turnDay=Date.parse(e.form.turnDay),e.form.detailId=e.form.detailId.join(","),Object(m["nc"])(e.form).then(function(t){e.$emit("getList"),e.$message({type:"success",message:"添加成功!"}),e.loading=!1,e.closeDialog()}))})},initPage:function(){var e=this;Object(p["G"])(this.form).then(function(t){e.collarOrgList=t.data}),this.form={}}},watch:{show:function(e){var t=this;e&&(this.initPage(),this.$nextTick(function(){t.$refs.ruleForm.clearValidate()}))}}},f=d,h=(a("29c3"),a("2877")),g=Object(h["a"])(f,c,u,!1,null,"2d831a18",null),b=g.exports,v=a("9057"),y={name:"bankbill",data:function(){return{caseProcessList:[],docStyleArr:[],loading:!0,editObj:{show:!1,title:"",editId:null},seeObj:{show:!1,title:"",editId:null},caseTypeList:[],form:{pageSize:20,pageNum:1,keyWord:""},total:0,list:[],idstr:""}},components:{LjPagination:l["a"],LjSearchFrom:s["a"],changeEdit:b},methods:{handleSelectionChange:function(e){var t=[];e.forEach(function(e){t.push(e.turnReceiptNum)}),this.idstr=t.join(",")},getList:function(){var e=this;Object(m["oc"])(this.form).then(function(t){e.total=t.total,e.list=t.data,e.loading=!1})},seeFunction:function(e){this.seeObj.editId=e.turnReceiptNum,this.seeObj.title="查看票据列表",this.seeObj.show=!0},onAdd:function(){this.editObj.editId=null,this.editObj.title="新增银行收据",this.editObj.show=!0},delateFunction:function(e,t){var a=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(m["C"])(t.quotaId).then(function(){a.getList(),a.$message({type:"success",message:"删除成功!"})})})},onDel:function(){var e=this;this.$confirm("此操作将永久删除这些数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(m["b"])({turnReceiptNums:e.idstr}).then(function(){e.getList(),e.$message({type:"success",message:"删除成功!"})})})},searchList:function(e){var t=this;this.loading=!0,e.pageSize=this.form.pageSize,this.form=JSON.parse(r()(e)),this.form.pageNum=1,Object(m["oc"])(this.form).then(function(e){t.list=e.data,t.total=e.total,t.loading=!1})}},filters:{quotaStatus:function(e){return v["i"][e]},formatDate:function(e){return Object(v["g"])(e,"yyyy-MM-dd")}},created:function(){this.getList()}},k=y,O=(a("0b55"),Object(h["a"])(k,n,o,!1,null,"6e6ff9a6",null));t["default"]=O.exports},c9e1:function(e,t,a){},d262:function(e,t,a){"use strict";var n=a("6bdf"),o=a.n(n);o.a}}]);
//# sourceMappingURL=chunk-394bcbd4.0634699c.js.map
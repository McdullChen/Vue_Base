(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2281388d"],{"31a7":function(e,t,i){},6286:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"wrop-search"},[i("lj-search-from",{attrs:{searchObj:e.searchObj,onAdd:e.onAdd},on:{searchList:e.searchList}})],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.list,"header-cell-style":{background:"#e9eff8"},"row-style":{cursor:"pointer"},border:"",size:"mini"}},[i("el-table-column",{attrs:{prop:"roleName",label:"角色名称",align:"center"}}),i("el-table-column",{attrs:{align:"center",label:"操作",width:"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tooltip",{staticClass:"item",attrs:{content:"查看",effect:"dark",placement:"top-end"}},[i("el-link",{staticClass:"el-icon-search btn-link",attrs:{type:"success"},on:{click:function(i){return i.stopPropagation(),e.seeRoleFun(t.row)}}},[i("i")])],1),i("el-tooltip",{staticClass:"item",attrs:{content:"修改配置人员",effect:"dark",placement:"top-end"}},[i("el-link",{staticClass:"el-icon-edit btn-link",attrs:{type:"primary"},on:{click:function(i){return i.stopPropagation(),e.editRoleFun(t.row)}}},[i("i")])],1),i("el-tooltip",{staticClass:"item",attrs:{content:"删除",effect:"dark",placement:"top-end"}},[i("el-link",{staticClass:"el-icon-delete btn-link",attrs:{type:"warning"},on:{click:function(i){return i.stopPropagation(),e.delRoleFun(t.row)}}},[i("i")])],1)]}}])})],1),i("set-role",{attrs:{see:e.editObj.see,isDisable:e.editObj.isDisable,isEdit:e.editObj.isEdit,dictName:e.editObj.dictName,show:e.editObj.show,title:e.editObj.title,editId:e.editObj.editId},on:{getAccountList:e.getAccountList,"update:show":function(t){return e.$set(e.editObj,"show",t)}}})],1)},s=[],o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-dialog",{attrs:{"close-on-click-modal":!1,title:e.title,visible:e.show,center:"","append-to-body":"",width:"650px",top:"30px"},on:{close:e.closeDialog}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"wrop"},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.form,"status-icon":"",rules:e.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"角色名称：",prop:"roleName"}},[e.isDisable?i("el-input",{model:{value:e.form.roleName,callback:function(t){e.$set(e.form,"roleName",t)},expression:"form.roleName"}}):e._e(),e.see?i("span",[e._v(e._s(e.form.roleName))]):e._e(),e.isEdit?i("span",[e._v(e._s(e.form.roleName))]):e._e()],1)],1),e.show?i("el-tree",{ref:"tree",attrs:{data:e.treeList,"show-checkbox":"","node-key":"orgId",props:{label:"orgName"},accordion:"","default-checked-keys":e.defaultArr,"default-expanded-keys":e.expandedArr}}):e._e()],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e.see?e._e():i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.AddEdit("ruleForm")}}},[i("i",{staticClass:"iconfont icon-save"}),e._v("确 定")])],1)])],1)},n=[],l=(i("ac6a"),i("8593")),r=i("d4f4"),c=i("6231"),d=(i("8237"),i("3022"),{name:"see",props:{show:{type:Boolean,default:!1},title:{type:String,default:""},see:{type:Boolean,default:!1},editId:{default:null},dictName:{type:String,default:""},isDisable:{type:Boolean,default:!1},isEdit:{type:Boolean,default:!1}},data:function(){return{rules:{roleName:[{required:!0,message:"请输入角色名称",trigger:"blur"}]},loading:!0,treeList:[{orgId:"1",orgName:"国家电网",status:null,isCheck:null,children:[]}],defaultArr:[],expandedArr:[],selectData:null,edit:!1,form:{roleName:""}}},methods:{closeDialog:function(){this.$emit("update:show",!1)},AddEdit:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return t.$message({type:"warning",message:"请填写角色名称 !"}),!1;var i=t.$refs.tree.getCheckedNodes(!0),a={};a.roleName=t.form.roleName,a.userList=i,t.dictName?Object(r["N"])(a).then(function(e){t.$message({type:"success",message:"修改成功 !"}),t.$emit("getAccountList")}):Object(r["J"])(a).then(function(e){t.$message({type:"success",message:"添加角色成功 !"}),t.$emit("getAccountList")}),t.closeDialog()})},initPage:function(){var e=this;Object(l["G"])().then(function(t){t.data.forEach(function(e){e.name=e.orgName}),e.treeList=Object(c["a"])(t.data,"orgId","parentCode","isParent"),e.treeList.forEach(function(t){t.children.forEach(function(t){t.children.forEach(function(t){Object(r["db"])(t.orgId).then(function(i){i.userList.forEach(function(e){e.a=e.orgName,e.b=e.orgId,e.orgName=e.fullName,e.orgId=e.loginId}),t.children=i.userList,e.loading=!1})})})})})},getSetRoles:function(){var e=this;this.form.roleName=this.dictName,Object(r["L"])({roleName:this.dictName}).then(function(t){var i=[];t.data&&(t.data.forEach(function(e){i.push(e.orgId)}),e.defaultArr=i)})}},created:function(){this.initPage()},watch:{show:function(e){var t=this;e&&(this.defaultArr=[],this.dictName?this.getSetRoles():this.form.roleName="",this.$nextTick(function(){t.$refs.ruleForm.clearValidate()}),this.expandedArr=["06414fb27d1e400995f85c14fa15b091"])}}}),u=d,f=(i("af63"),i("2877")),h=Object(f["a"])(u,o,n,!1,null,"a1680ea0",null),m=h.exports,p=i("8984"),b=i("7e62"),g={data:function(){return{loading:!0,list:[],editObj:{show:!1,dictName:null,title:"",see:!1,editId:!1,isEdit:!1},addObj:{show:!1,title:"",addId:null},form:{pageSize:20,pageNum:1},searchObj:null}},components:{SetRole:m,LjSearchFrom:p["a"],LjPagination:b["a"]},methods:{editRoleFun:function(e){this.editObj.dictName=e.roleName,this.editObj.show=!0,this.editObj.title="配置角色",this.editObj.see=!1,this.editObj.isEdit=!0,this.editObj.isDisable=!1},onAdd:function(){this.editObj.show=!0,this.editObj.title="添加配置角色",this.editObj.dictName=null,this.editObj.see=!1,this.editObj.isDisable=!0,this.editObj.isEdit=!1},seeRoleFun:function(e){this.editObj.dictName=e.roleName,this.editObj.show=!0,this.editObj.title="查看配置角色",this.editObj.see=!0,this.editObj.isDisable=!1,this.editObj.isEdit=!1},getAccountList:function(){var e=this;Object(r["M"])(this.form).then(function(t){e.list=t.data,e.loading=!1})},delRoleFun:function(e){var t=this;this.loading=!0,this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r["K"])({roleName:e.roleName}).then(function(){t.getAccountList(),t.$message({type:"success",message:"删除成功!"}),t.loading=!1})})},searchList:function(e){var t=this;this.loading=!0,this.form=e,this.form.pageNum=1,console.log(e),Object(r["M"])(e).then(function(e){console.log(e),t.list=e.data,t.loading=!1})}},created:function(){this.getAccountList()}},j=g,O=(i("8536"),Object(f["a"])(j,a,s,!1,null,"8c226b2e",null));t["default"]=O.exports},"81ac":function(e,t,i){},8536:function(e,t,i){"use strict";var a=i("31a7"),s=i.n(a);s.a},af63:function(e,t,i){"use strict";var a=i("81ac"),s=i.n(a);s.a}}]);
//# sourceMappingURL=chunk-2281388d.ff90d372.js.map
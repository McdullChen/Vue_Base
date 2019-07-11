/**
* 系统-部门管理组件
* @module 系统
* @desc 列表
* @author 王伟
* @date 2019-6-4
**/
<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8" id="div-col">
                <el-tree :data="list" :props="{label:'orgName'}" @node-click="handleNodeClick" default-expand-all>
                     <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span :class="{'item-block':true,active:data.orgId === detailId}" @click.stop="showDetail(data)"
                              class="span-css"
                        >{{ node.label }}</span>
                      </span>
                </el-tree>
            </el-col>
            <el-col :span="16" class="detail-block">
                <detail-page :id="detailId" @add="showHandleAdd" @del="showHandleDel" @showRole="showRole"/>
            </el-col>
        </el-row>
        <!-- 搜素条件 -->
        <org-role-page :id="roleObj.id" :orgName="roleObj.orgName" :show.sync="roleObj.show"/>
        <!-- 弹框 -->
        <edit-add :orgId='editObj.orgId'
                  :rowdata='rowdata'
                  :show.sync="editObj.show"
                  :title="editObj.title"
                  :type='editObj.type'
                  @getList='getList'
                  ref="child"></edit-add>
    </div>
</template>
<script>
    import orgRolePage from './components/orgRole'
    import {apiOrgDelete, apiOrgSearch} from "../../../api/system";
    import {getTree} from "../../../until/menuList";
    import searchForm from '../../../components/LjSearchForm';
    import editAdd from "./components/editadd";
    import IEcharts from 'vue-echarts-v3/src/full.js';
    import detailPage from './components/detail'

    export default {
        name: 'organizationPage',
        data() {
            return {
                detailId: "",
                list: [],
                expandKeys: [],
                rowdata: [],
                roleObj: {
                    show: false,
                    id: '',
                    orgName: ''
                },
                editObj: {
                    show: false,
                    title: '',
                    editId: null,
                    type: ''
                },
            }
        },
        components: {searchForm, editAdd, IEcharts, detailPage, orgRolePage},
        methods: {
            getList() {
                apiOrgSearch().then(res => {
                    res.data.forEach(i => {
                        i.name = i.orgName
                    });
                    this.list = getTree(res.data, 'orgId', 'parentCode', 'isParent');
                    this.expandKeys = [];
                })
            },
            showRole(data) {
                this.roleObj.id = data.id;
                this.roleObj.orgName = data.orgName;
                this.roleObj.show = true;
            },
            initPage() {
                apiOrgSearch().then(res => {
                    console.log(res)
                    res.data.forEach(i => {
                        i.name = i.orgName
                    });
                    this.list = getTree(res.data, 'orgId', 'parentCode', 'isParent');
                    this.showDetail(this.list[0]);
                    this.expandKeys = [];
                })
            },
            //编辑
            showDetail(data) {
                this.detailId = data.orgId
            },
            handleNodeClick() {
            },
            //添加子集
            showHandleAdd(row) {
                this.rowdata = row;
                this.editObj.title = '添加子集';
                this.editObj.type = 2;

                this.editObj.show = true;

            },
            //删除
            showHandleDel(row) {
                if (!row.children || row.children.length == 0) {
                    this.$confirm('此操作将删除该组织机构, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        apiOrgDelete(row.orgId).then(res => {
                            this.initPage();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请先清空下级部门'
                    });
                }

            },
            //新增父级
            onAdd() {
                this.editObj.editId = null;
                this.editObj.title = '新增组织父级';
                this.editData = {};
                this.rowdata = this.editData;
                this.editObj.type = 2;
                this.editObj.show = true;

            },


        },
        created() {
            this.initPage();
        },
        mounted() {
        }

    }

</script>
<style lang="less" scoped>
    /deep/ .el-table__row {
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size:  @fontSize + 2;
        padding-right: 8px;
    }

    .detail-block {
        max-height: calc(~'100vh - 140px');
        overflow: auto;
    }

    #id {
        border-right: 1px solid #ccc;
        height: calc(100vh - 140px);

        .pan-css {
            padding: 5px
        }
    }

</style>


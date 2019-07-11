/**
* 系统-权限管理组件
* @module 系统
* @desc 列表
* @author 王伟
* @date 2019-6-4
**/
<template>
    <div>
        <lj-search-form :onAdd="onAdd" :searchObj="searchObj" @searchList="searchList"/>
        <!-- 表格 -->
        <el-table :data="list" :header-cell-style="{background:'#e9eff8'}" @row-click="seeFunction" border size="mini">
            <el-table-column align="center" label="角色名称" prop="roleName"/>
            <el-table-column align="center" label="是否启用" prop="isDisable">
                <template slot-scope="scope">
                    {{scope.row.isDisable | yesNo}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="备注" prop="remark"/>
            <el-table-column align="center" label="操作" width="210">
                <template slot-scope="scope">
                    <el-tooltip :open-delay="500" content="修改" placement="top">
                        <el-link @click.stop="editFunction(scope.$index, scope.row)" icon="el-icon-edit"
                                 type="primary" v-if="buttonCheck('edit')"></el-link>
                    </el-tooltip>
                    <el-tooltip :open-delay="500" content="配置当前角色" placement="top">
                        <el-link @click.stop="relationFunction(scope.$index, scope.row)" class="btn-link"
                                 icon="el-icon-setting"
                                 type="warning"></el-link>
                    </el-tooltip>
                    <el-tooltip :open-delay="500" content="删除当前项" placement="top">
                        <el-link @click.stop="delateFunction(scope.$index, scope.row)" class="btn-link"
                                 icon="el-icon-delete"
                                 type="danger" v-if="buttonCheck('delete')"></el-link>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <lj-pagination :pageSize="form.pa" :total="total" @getData="getAccountList" class="page-css"
                       v-model="form.pageNum"/>
        <!-- 编辑&弹框 -->
        <change-edit :data='rowdata' :show.sync="editObj.show" :title="editObj.title" @updateTable="getAccountList"/>
        <!--查看-->
        <watch-detail :roleId="watchObj.roleId" :show.sync="watchObj.show" :title="watchObj.title"/>
        <!-- 关联 -->
        <relation-role :roleId="relationObj.id" :show.sync="relationObj.show" :title="relationObj.title"/>
    </div>
</template>

<script>
    import {apiRoleDelete, apiRoleSearch} from "../../../api/system";
    import LjPagination from '../../../components/LjPagination'
    import {formatDate, YESORNO} from "../../../until/wordBook";
    import LjSearchForm from '../../../components/LjSearchForm'
    import changeEdit from "./components/editadd";
    import relationRole from "./components/relation";
    import watchDetail from './components/watch'

    export default {
        name: "rolePage",
        data() {
            return {
                editObj: {
                    show: false,
                    title: '',
                    editId: null
                },
                //搜索组件数据
                searchObj: null,
                watchObj: {
                    title: '',
                    show: false,
                    roleId: ''
                },
                daytime: '',
                flag: true,
                input: '',
                rowdata: {},
                relationObj: {
                    show: false,
                    title: "",
                    id: ''
                },
                list: [],
                total: 0,
                form: {
                    pageSize: 20,
                    pageNum: 1,
                    pa: 20
                },

            }
        },
        components: {
            LjPagination,
            watchDetail,
            changeEdit,
            LjSearchForm,
            relationRole
        },

        methods: {
            seeFunction(data) {
                this.watchObj.roleId = data.roleId;
                this.watchObj.title = '查看"' + data.roleName + '"角色详情';
                this.watchObj.show = true
            },
            //新增账号
            onAdd() {
                this.editObj.editId = null;
                this.editObj.title = '新增账号';
                let addData = {type: 2};
                addData.isDisable = 1;
                this.rowdata = addData;
                this.editObj.show = true;
            },

            //编辑
            editFunction(index, row) {
                this.editObj.title = '编辑';
                this.rowdata = row;
                this.editObj.show = true;
            },
            //关联
            relationFunction(index, row) {
                this.relationObj.id = row.roleId;
                this.relationObj.title = row.roleName + '角色配置';
                this.relationObj.show = true;
            },
            //删除按钮事件
            delateFunction(index, data) {
                this.$confirm('此操作将删除条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiRoleDelete(data.roleId).then(res => {
                        this.getAccountList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
            },

            //搜索查询+分页
            getAccountList() {
                apiRoleSearch(this.form).then(res => {
                    this.list = res.data;
                    this.total = res.total
                })
            },
            //搜索
            searchList(data) {
                data.pageSize = this.form.pageSize;
                this.form = data;
                this.form.pageNum = 1;
                apiRoleSearch(data).then(res => {
                    this.list = res.data
                })

            },


        },
        filters: {
            yesNo(value) {
                return YESORNO[value]
            },
            trasormTime(val) {
                return formatDate(val, 'yyyy-MM-dd hh:mm:ss')

            }
        },
        created() {
            this.getAccountList();
        },

    }
</script>

<style scoped>
    .btn-link {
        margin-left: 5px
    }

    .page-css {
        margin-top: 10px
    }
</style>


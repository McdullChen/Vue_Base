/**
* 系统-系统参数组件
* @module 系统
* @desc 列表
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <div>
        <div class="wrop-search">
            <lj-search-form :onAdd="onAdd" :searchObj="searchObj" @searchList="searchList"/>
        </div>
        <!-- 表格 -->
        <el-table
                :data="list"
                :header-cell-style="{background:'#e9eff8'}"
                :row-style="{cursor:'pointer'}"
                border
                size="mini"
                v-loading="loading"
        >
            <el-table-column align="center" label="参数名称" prop="configName" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="参数值" prop="configValue" show-overflow-tooltip/>
            <el-table-column align="center" label="是否启用" prop="isDisable" width="80">
                <template slot-scope="scope">{{scope.row.isDisable | YESORNO}}</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template slot-scope="scope">
                    <el-tooltip class="item" content="查看" effect="dark" placement="top-end"></el-tooltip>
                    <el-tooltip class="item" content="编辑" effect="dark" placement="top-end">
                        <el-link
                                @click.stop="editFunction(scope.$index, scope.row)"
                                icon="el-icon-edit"
                                type="primary"
                                v-if="buttonCheck('edit')"
                        ></el-link>
                    </el-tooltip>
                    <el-tooltip class="item" content="删除" effect="dark" placement="top-end">
                        <el-link class="marginleft"
                                @click.stop="delateFunction(scope.$index, scope.row)"
                                icon="el-icon-delete"
                                type="warning"
                                v-if="buttonCheck('edit')"
                        ></el-link>
                    </el-tooltip>

                </template>
            </el-table-column>
        </el-table>
        <lj-pagination
                :pageNum.sync="form.pageNum"
                :pageSize.sync="form.pageSize"
                :total="total"
                @getData="getList"
                class="pageCss"
        />

        <!-- 编辑&添加弹框 -->
        <change-edit
                :caseProcessList="caseProcessList"
                :show.sync="editObj.show"
                :title="editObj.title"
                :type="editObj.editId"
                @getList='getList'
        />

    </div>
</template>

<script>
    import LjPagination from "../../../components/LjPagination";
    import LjSearchForm from "../../../components/LjSearchForm";
    import {YESORNO} from "../../../until/wordBook";
    import changeEdit from "./components/editadd";
    import {apirunConfigDelete, apirunConfigSearch} from "../../../api/system";

    let that;
    export default {
        name: "runConfigPage",
        data() {
            return {
                caseProcessList: [],
                loading: true,
                //弹出框数据
                editObj: {
                    show: false,
                    title: "",
                    editId: null
                },
                //搜索组件数据
                searchObj: null,
                form: {
                    pageSize: 20,
                    pageNum: 1
                },
                total: 0,
                list: []
            };
        },
        components: {
            changeEdit,
            LjPagination,
            LjSearchForm,
        },

        methods: {
            //查询+搜索
            getList() {
                this.loading = true;
                apirunConfigSearch(this.form).then(res => {
                    this.total = res.total;
                    this.list = res.data;
                    this.loading = false;
                });
            },
            //添加
            onAdd(){
                this.editObj.editId = null;
                this.editObj.title = "添加参数";
                this.editObj.show = true;
            },
            //编辑
            editFunction(index, row) {
                console.log(row)
                this.editObj.editId = row.configId;
                this.editObj.title = "修改参数";
                this.editObj.show = true;
            },
            //删除按钮事件
            delateFunction(index, data) {
                this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    apirunConfigDelete(data.configId).then(() => {
                        this.getList();
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    });
                });
            },
            //搜索
            searchList(data) {
                //data就是接收的this.form数据
                this.loading = true;
                data.pageSize = this.form.pageSize;
                this.form = data;
                this.form.pageNum = 1;
                apirunConfigSearch(data).then(res => {
                    this.list = res.data;
                    this.total = res.total;
                    this.loading = false;
                });
            }
        },
        beforeCreate() {
            that = this;
        },
        filters: {
            YESORNO(val) {
                return YESORNO[val];
            }
        },
        created() {
            this.getList();
        }
    };
</script>

<style scoped>
    .pageCss {
        margin-top: 10px
    }

    .wrop-search {
        margin-bottom: 10px
    }
    .marginleft{
        margin-left: 10px
    }
</style>

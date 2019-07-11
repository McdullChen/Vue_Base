<template>
    <div>
        <lj-search-form :onAdd="onAdd" @searchList="searchList"/>
        <div class="wrop">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-table :data="list" :header-cell-style="{background:'#e9eff8'}" @current-change="expandChange"
                              border
                              highlight-current-row size="mini">
                        <el-table-column align="center" label="表名" prop="tableName"/>
                        <el-table-column align="center" label="备注" prop="tableDesc"/>
                        <el-table-column align="center" label="操作" width="105">
                            <template slot-scope="scope">
                                <el-tooltip :open-delay="500" content="添加字段" placement="top">
                                    <el-link @click.stop="onAddField(scope.row)" icon="el-icon-plus"
                                             type="success"></el-link>
                                </el-tooltip>
                                <el-tooltip :open-delay="500" content="修改" placement="top">
                                    <el-link @click.stop="onEdit(scope.row)" class="btn-link" icon="el-icon-edit"
                                             type="primary" v-if="buttonCheck('edit')"></el-link>
                                </el-tooltip>
                                <el-tooltip :open-delay="500" content="删除当前项" placement="top">
                                    <el-link @click.stop="onDel(scope.row)" class="btn-link" icon="el-icon-delete"
                                             type="danger" v-if="buttonCheck('delete')"></el-link>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <lj-pagination :pageNum.sync="form.pageNum" :pageSize.sync="form.pageSize" :total="total"
                                   @getData="getList"/>
                </el-col>
                <el-col :span="12">
                    <el-table :data="list1" :header-cell-style="{background:'#e9eff8'}" @expand-change="expandChange"
                              border
                              size="mini">
                        <el-table-column align="center" label="字段名" prop="fieldName"/>
                        <el-table-column align="center" label="备注" prop="fieldDesc"/>
                        <el-table-column align="center" label="操作" width="200">
                            <template slot-scope="scope">
                                <el-tooltip :open-delay="500" content="修改" placement="top">
                                    <el-link @click.stop="onEditField(scope.row)" class="btn-link" icon="el-icon-edit"
                                             type="primary"></el-link>
                                </el-tooltip>
                                <el-tooltip :open-delay="500" content="删除当前项" placement="top">
                                    <el-link @click.stop="onDelField(scope.row)" class="btn-link" icon="el-icon-delete"
                                             type="danger"></el-link>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <i-edit :show.sync="editObj.show" :tableDesc="editObj.tableDesc" :tableName="editObj.tableName"
                :title="editObj.title"
                :type="editObj.editId" @updateTable="getList"/>
        <i-edit-field :fieldDesc="editFieldObj.fieldDesc"
                      :fieldName="editFieldObj.fieldName"
                      :fieldOrder="editFieldObj.fieldOrder"
                      :show.sync="editFieldObj.show"
                      :tableName="editFieldObj.tableName"
                      :title="editFieldObj.title"
                      :type="editFieldObj.editId"
                      @updateTable="updateTable"/>
    </div>
</template>

<script>
    import {apiTableDelete, apiTableDeleteField, apiTableGet, apiTableSearch} from "../../../api/system";
    import LjPagination from '../../../components/LjPagination'
    import {YESORNO} from "../../../until/wordBook";
    import LjSearchForm from '../../../components/LjSearchForm'
    import iEdit from './components/edit'
    import iEditField from './components/editField'

    export default {
        name: "tablePage",
        data() {
            return {
                list: [],
                list1: [],
                total: 200,
                tableName: '',
                editFieldObj: {
                    show: false,
                    title: '',
                    editId: null,
                    fieldName: "",
                    fieldDesc: '',
                    tableName: '',
                    fieldOrder: '',
                },
                editObj: {
                    show: false,
                    title: '',
                    editId: null,
                    tableDesc: '',
                    tableName: '',
                },
                form: {
                    pageSize: 20,
                    pageNum: 1
                },
                searchObj: [
                    {type: 'input', name: 'loginName', label: '登录名'},
                    {type: 'input', name: 'loginPwd', label: '登录密码'},
                    {
                        type: 'select',
                        options: [{label: '是', value: '1'}, {label: '否', value: '0'}],
                        name: 'isDelete',
                        label: '是否删除'
                    },
                ]
            }
        },
        components: {LjPagination, LjSearchForm, iEdit, iEditField},
        filters: {
            yesNo(value) {
                return YESORNO[value]
            }
        },
        methods: {
            initPage() {
                this.getList()
            },
            onEditField(data) {
                this.editFieldObj.editId = data.fieldId;
                this.editFieldObj.tableName = data.tableName;
                this.editFieldObj.fieldName = data.fieldName;
                this.editFieldObj.fieldOrder = data.fieldOrder;
                this.editFieldObj.fieldDesc = data.fieldDesc;
                this.editFieldObj.title = '编辑敏感字段';
                this.editFieldObj.show = true;
            },
            onAddField(data) {
                this.editFieldObj.editId = null;
                this.editFieldObj.tableName = data.tableName;
                this.editFieldObj.fieldName = "";
                this.editFieldObj.fieldOrder = 0;
                this.editFieldObj.fieldDesc = "";
                this.editFieldObj.title = '新增敏感字段';
                this.editFieldObj.show = true;
            },
            updateTable() {
                apiTableGet(this.tableName).then(res => {
                    this.list1 = res.data
                })
            },
            onDelField(data) {
                this.$confirm('此操作将删除该敏感表字段, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiTableDeleteField(data.fieldId).then(res => {
                        this.updateTable();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
            },
            expandChange(data) {
                if (data) {
                    this.tableName = data.tableName
                    apiTableGet(data.tableName).then(res => {
                        this.list1 = res.data
                    })
                }
            },
            onDel(data) {
                this.$confirm('此操作将删除该敏感表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiTableDelete(data.tableId).then(res => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
            },
            searchList(data) {
                data.pageSize = this.form.pageSize;
                this.form = data;
                this.form.pageNum = 1;
                apiTableSearch(data).then(res => {
                    this.total = res.total;
                    this.list = res.data
                })
            },
            getList() {
                apiTableSearch(this.form).then(res => {
                    this.total = res.total;
                    res.data.forEach(i => {
                        i.chlidren = []
                    });
                    this.list = res.data
                })
            },
            onAdd() {
                this.editObj.editId = null;
                this.editObj.title = '新增敏感表';
                this.editObj.show = true;
                this.editObj.tableName = "";
                this.editObj.tableDesc = "";
            },
            onEdit(data) {
                this.editObj.editId = data.tableId;
                this.editObj.tableName = data.tableName;
                this.editObj.tableDesc = data.tableDesc;
                this.editObj.title = '编辑敏感表';
                this.editObj.show = true;
            }
        },
        created() {
            this.initPage()
        }
    }
</script>

<style lang="less" scoped>
    label {
        color: #99a9bf;
        font-weight: bold;
    }

    /deep/ .el-table__expanded-cell[class*=cell] {
        padding: 10px 0 10px 50px;
        text-align: center;
        line-height: 30px;
    }

    .wrop {
        overflow: hidden
    }

    .btn-link {
        margin-left: 5px
    }
</style>

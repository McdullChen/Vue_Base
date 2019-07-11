/**
* 系统-用户管理组件
* @module 系统
* @desc 列表
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <div>
        <lj-search-form
                :onAdd="onAdd"
                :onDel="buttonCheck('batchdel')?onDelAll:''"
                :searchObj="searchObj"
                @searchList="searchList"/>
        <el-table :data="list"
                  :header-cell-style="{background:'#e9eff8'}"
                  @row-click="seeFunction"
                  @selection-change="handleSelectionChange"
                  border
                  size="mini">
            <el-table-column
                    type="selection"
                    width="40">
            </el-table-column>
            <el-table-column align="center" label="登录名" prop="loginName"/>
            <el-table-column align="center" label="组织机构" prop="orgName"/>
            <el-table-column align="center" label="首次登录时间" prop="firstTime">
                <template slot-scope="scope">
                    {{scope.row.firstTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="最后登录时间" prop="lastTime">
                <template slot-scope="scope">
                    {{scope.row.lastTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="登录次数" prop="loginCount" width="80"/>
            <el-table-column align="center" label="是否启用" prop="isDisable" width="80">
                <template slot-scope="scope">
                    {{scope.row.isDisable | yesNo}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="105">
                <template slot-scope="scope">
                    <el-tooltip :open-delay="500" content="编辑" placement="top">
                        <el-link @click.stop="onEdit(scope.row)" icon="el-icon-edit" style="margin-left: 5px"
                                 type="primary" v-if="buttonCheck('edit')"></el-link>
                    </el-tooltip>
                    <el-tooltip :open-delay="500" content="删除当前项" placement="top">
                        <el-link @click.stop="onDel(scope.row)" icon="el-icon-delete" style="margin-left: 5px"
                                 type="danger" v-if="buttonCheck('delete')"></el-link>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <i-edit
                :show.sync="editObj.show"
                :title="editObj.title"
                :type="editObj.editId"
                @updateTable="getAccountList"/>
        <watch-page
                :show.sync="watchObj.show"
                :type="watchObj.editId"/>
        <lj-pagination
                :pageNum.sync="form.pageNum"
                :pageSize.sync="form.pageSize"
                :total="total"
                @getData="getAccountList"/>
    </div>
</template>

<script>
    import {apiAccountDelete, apiAccountDeleteBatch, apiAccountSearch, apiUserSearch} from "../../../api/system";
    import LjPagination from '../../../components/LjPagination'
    import {formatDate, YESORNO} from "../../../until/wordBook";
    import LjSearchForm from '../../../components/LjSearchForm'
    import iEdit from './components/edit'
    import watchPage from './components/see'

    export default {
        name: "accountPage",
        data() {
            return {
                list: [],
                watchObj: {
                    show: false,
                    editId: ''
                },
                multipleSelection: [],
                total: 200,
                editObj: {
                    show: false,
                    title: '',
                    editId: null
                },
                bindObj: {
                    show: false,
                    loginId: '',
                    list: [],
                    userId: ''
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
        components: {LjPagination, LjSearchForm, iEdit, watchPage},
        filters: {
            yesNo(value) {
                return YESORNO[value]
            },
            formatDate(value) {
                return formatDate(value, 'yyyy-MM-dd hh:mm:ss')
            }
        },
        methods: {
            seeFunction(data) {
                this.watchObj.editId = data.loginId;
                this.watchObj.show = true
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            onDelAll() {
                this.$confirm('此操作将删除' + this.multipleSelection.length + '条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let arr = [];
                    this.multipleSelection.forEach(i => {
                        arr.push(i.loginId)
                    });
                    apiAccountDeleteBatch({userIds: arr.join(',')}).then(() => {
                        this.getAccountList();
                        this.$message({
                            type: 'success',
                            message: '批量删除成功!'
                        });
                    })

                });

            },
            initPage() {
                this.getAccountList();
                apiUserSearch({pageNum: 1, pageSize: 1000}).then(res => {
                    this.bindObj.list = res.data
                })
            },
            remoteMethod(data) {
                apiUserSearch({pageNum: 1, pageSize: 1000, keyWord: data}).then(res => {
                    this.bindObj.list = res.data
                })
            },
            onDel(data) {
                this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiAccountDelete(data.loginId).then(res => {
                        this.getAccountList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
            },
            searchList(data) {
                data.pageSize = this.form.pageSize;
                this.form = JSON.parse(JSON.stringify(data));
                this.form.pageNum = 1;
                apiAccountSearch(this.form).then(res => {
                    this.total = res.total;
                    this.list = res.data
                })
            },
            getAccountList() {
                apiAccountSearch(this.form).then(res => {
                    this.total = res.total;
                    this.list = res.data
                })
            },
            onAdd() {
                this.editObj.editId = null;
                this.editObj.title = '新增账号';
                this.editObj.show = true;
            },
            onEdit(data) {
                this.editObj.editId = data.loginId;
                this.editObj.title = '编辑账号';
                this.editObj.show = true;
            }
        },
        created() {
            this.initPage()
        }
    }
</script>

<style lang="less" scoped>

</style>

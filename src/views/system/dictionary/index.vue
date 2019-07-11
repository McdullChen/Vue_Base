/**
* 系统-数据字典组件
* @module 系统
* @desc 列表
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <div>
        <div class="wrop-search">
            <el-button @click="onAdd" icon="el-icon-plus" plain type="success">新增根节点</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="list" :onAdd="onAdd" :header-cell-style="{background:'#e9eff8'}" :load="load" :row-style="{cursor:'pointer'}"
                  border lazy
                  row-key="dictId" size="mini" v-loading="loading">
            <el-table-column align="left" label="字典名称" prop="dictName" show-overflow-tooltip/>
            <!-- <el-table-column align="left" label="dictId" prop="dictId"  show-overflow-tooltip /> -->
            <el-table-column align="center" label="字典值" prop="dictValue" show-overflow-tooltip width="250"/>
            <el-table-column align="center" label="是否系统" prop="isSys" show-overflow-tooltip width="80">
                <template slot-scope="scope">
                    {{scope.row.isSys | NOORYES}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="是否启用" prop="isDisable" show-overflow-tooltip width="80">
                <template slot-scope="scope">
                    {{scope.row.isDisable | NOORYES}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="排序" prop="dictOrder" width="80"/>
            <el-table-column align="center" label="操作" width="120">
                <template slot-scope="scope">
                    <el-tooltip class="item" content="添加" effect="dark" placement="top-end">
                        <el-link @click.stop="addFunction(scope.row)" class="el-icon-plus"
                                 type="success" v-if="buttonCheck('edit')"></el-link>
                    </el-tooltip>
                    <el-tooltip class="item" content="编辑" effect="dark" placement="top-end">
                        <el-link @click.stop="editFunction(scope.row)" class="el-icon-edit btn-link"
                                 type="primary" v-if="buttonCheck('edit')"></el-link>
                    </el-tooltip>
                    <el-tooltip class="item" content="删除" effect="dark" placement="top-end">
                        <el-link @click.stop="delateFunction(scope.row)" class="el-icon-delete"
                                 type="danger" v-if="buttonCheck('delete')"><i></i></el-link>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <!-- <lj-pagination :pageNum.sync="form.pageNum" :pageSize.sync="form.pageSize" :total="total"
                      @getData="getList"
                      style="margin-top:10px"/> -->

        <!-- 编辑&添加弹框 -->
        <change-edit :caseProcessList="caseProcessList" :child="editObj.child" :list="list" :parent="editObj.parent" :listArr="listArr"
                     :show.sync="editObj.show" :title="editObj.title"
                     :type="editObj.editId" @getList="getList"/>
        <!-- 查看 -->
    </div>
</template>

<script>
    import LjPagination from '../../../components/LjPagination'
    import changeEdit from "./components/editadd";
    import {apiCommonDictionAry, apiDictionaryDelete, apiDictionarySearch} from "../../../api/system";

    export default {
        name: "dictionaryPage",
        data() {
            return {
                listArr:[],
                caseProcessList: [],
                docStyleArr: [],
                loading: true,
                searchObj: [
                    {type: 'input', name: 'quotaInvoiceNum', label: '发票号码'},
                    {
                        type: 'select', name: 'quotaInvoiceAmount', options: [
                            {value: '10', label: '10'},
                            {value: '20', label: '20'},
                            {value: '50', label: '50'},
                            {value: '100', label: '100'},
                        ], label: '发票面额'
                    },
                ],
                //弹出框数据
                editObj: {
                    show: false,
                    child: null,
                    parent: null,
                    title: '',
                    editId: null
                },
                seeObj: {
                    show: false,
                    title: '',
                    editId: null
                },
                caseTypeList: [],

                form: {
                    pageSize: 20,
                    pageNum: 1,
                },
                total: 0,
                list: [],
                idstr: '',
            }
        },
        components: {
            changeEdit, LjPagination,
        },

        methods: {
            handleSelectionChange(val) {
                let idarr = [];
                val.forEach(item => {
                    idarr.push(item.quotaId);
                });
                this.idstr = idarr.join(',')
            },
            load(tree, treeNode, resolve) {
                // tree为点击那一行的数据
                let value = tree.dictValue;
                apiCommonDictionAry(value).then(res => {
                    res.dicList.forEach(item => {
                        if (item.isParent > 0) {
                            item.hasChildren = []
                        }
                        this.listArr.push(item)
                    });
                    //传入res.dicList加载下一级
                    resolve(res.dicList);
                    if (res.dicList.length == 0) {
                        this.$message({
                            type: 'error',
                            message: '本节点以下暂无子节点!'
                        });
                    }

                })

            },
            //查询+搜索
            getList() {
                this.loading = true;
                apiDictionarySearch(this.form).then(res => {
                    this.total = res.total;
                    res.data.forEach(item => {
                        item.hasChildren = [];
                        this.listArr.push(item)
                    })
                    this.list = res.data;
                    this.loading = false;
                })
            },
            //查看
            seeFunction(row) {
                this.seeObj.editId = row.docTypeId;
                this.seeObj.title = '查看';
                this.seeObj.show = true;
            },
            //新增父级
            onAdd() {
                this.editObj.parent = 1
                this.editObj.editId = null;
                this.editObj.title = '新增根节点';
                this.editObj.show = true;
            },
            //新增子集
            addFunction(row) {
                this.editObj.child = 1;
                this.editObj.parent = null;
                this.editObj.editId = String(row.dictId);
                this.editObj.title = '新增子集字典';
                this.editObj.show = true;
            },
            //编辑
            editFunction(row) {
                this.editObj.child = null;
                this.editObj.parent = null;
                this.editObj.editId = String(row.dictId);
                this.editObj.title = '修改字典';
                this.editObj.show = true;

            },
            //删除按钮事件
            delateFunction(data) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiDictionaryDelete(data.dictId).then(() => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                })
            },
            //搜索
            searchList(data) {  //data就是接收的this.form数据
                this.loading = true;
                data.pageSize = this.form.pageSize;
                this.form.pageNum = 1;
                apiDictionarySearch(data).then(res => {
                    this.list = res.data;
                    this.total = res.total;
                    res.data.forEach(item => {
                        item.hasChildren = []
                    })
                    this.loading = false;
                })
            },
        },
        filters: {
            NOORYES(val) {
                return val == '1' ? "是" : (val == '0' ? '否' : '')
            }

        },
        created() {
            this.getList();
            for (let i = 0; i < 2; i++) {

            }
        },
    }
</script>

<style scoped>
    .wrop-search {
        margin-bottom: 10px
    }

    .btn-link {
        margin: 0 10px
    }
</style>

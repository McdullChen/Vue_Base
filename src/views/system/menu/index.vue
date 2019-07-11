/**
* 系统-菜单组件
* @module 系统
* @desc 列表
* @author 王伟
* @date 2019-6-4
**/
<template>
    <div>
        <div>
            <el-button @click="onAdd(false,false)" plain type="success"><i
                    class="lj_font icon_tianjiaxinzengzhankai"></i>新增父级资源
            </el-button>
        </div>
        <el-table :data="tableData" :header-cell-style="{background:'#e9eff8'}" @row-click="seeFunction" border
                  class="tab-wrop" row-key="resId">
            <el-table-column label="资源名" prop="resName"/>
            <el-table-column align="center" label="code" prop="resCode"/>
            <el-table-column align="center" label="资源类型" prop="resName" width="150">
                <template slot-scope="scope">
                    {{scope.row.resType | menuType}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" prop="resName" width="100">
                <template slot-scope="scope">
                    <el-tooltip :open-delay="500" content="添加子项" placement="top">
                        <el-link @click.stop="onAdd(true,scope.row)" icon="el-icon-plus" type="success"></el-link>
                    </el-tooltip>
                    <el-tooltip :open-delay="500" content="修改" placement="top">
                        <el-link @click.stop="onAdd(false,scope.row)" class="btn-link" icon="el-icon-edit"
                                 type="primary" v-if="buttonCheck('edit')"></el-link>
                    </el-tooltip>
                    <el-tooltip :open-delay="500" content="删除当前项" placement="top">
                        <el-link @click.stop="onDel(scope.row)" class="btn-link" icon="el-icon-delete"
                                 type="danger" v-if="buttonCheck('delete')"></el-link>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <watch-page :data="watchObj" :show.sync="watchShow"/>
        <add-dialog :data="newMenu" @updateData="initPage"/>
    </div>
</template>

<script>
    import addDialog from './components/edit'
    import {MENUTYPEWORD} from "../../../until/wordBook";
    import {getTree} from "../../../until/menuList";
    import {apiMenuDelete, apiMenuSearch} from "../../../api/system";
    import watchPage from './components/watch'

    export default {
        name: "menuPage",
        filters: {
            menuType(value) {
                return MENUTYPEWORD[value]
            }
        },
        data() {
            return {
                watchObj: {},
                watchShow: false,
                tableData: [],
                editShow: false,
                newMenu: {
                    resName: '',
                    resUrl: '',
                    resStyle: '',
                    resOrder: '',
                    resLevel: '',
                    type: '',
                    resCode: '',
                    show: false
                },
                treeProps: {label: 'resName'}
            }
        },

        components: {addDialog, watchPage},

        methods: {
            seeFunction(data) {
                this.watchObj = data;
                this.watchObj.title = '资源详情';
                this.watchShow = true
            },
            onAdd(flag, data) {
                this.newMenu = {
                    resName: !flag && data ? data.resName : '',
                    resId: !flag && data ? data.resId : '',
                    resUrl: !flag && data ? (data.resUrl ? data.resUrl : '') : '',
                    title: !flag && data ? '编辑 ' + data.resName : (flag ? `新增 ${data.resName} 子项` : '新增根资源'),
                    resStyle: !flag && data ? data.resStyle : '',
                    resCode: !flag && data ? data.resCode : '',
                    resType: !flag && data ? data.resType.toString() : '',
                    resOrder: !flag && data ? data.resOrder : '',
                    resLevel: flag && data ? (data.resLevel + 1) : (data ? data.resLevel : 1),
                    parentId: flag && data ? data.resId : (data ? data.parentId : '0'),
                    type: flag ? 'chlidren' : (data ? 'edit' : 'new'),
                    show: true
                }
            },
            onDel(data) {
                this.$confirm('此操作将永久删除该权籍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiMenuDelete(data.resId).then(res => {
                        this.initPage();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
            },
            initPage() {
                apiMenuSearch().then(res => {
                    this.tableData = getTree(res.data, 'resId', 'parentId', 'resLevel');
                })
            }
        },
        created() {
            this.initPage()
        }
    }
</script>

<style lang="less" scoped>
    /*/deep/.el-table__body-wrapper .el-table__row{*/
    /*    display: table-row !important;*/
    /*}*/
    /*/deep/.el-table__expand-icon{*/
    /*    transform: rotate(90deg)*/
    /*}*/
    .tree-block {
        margin: 10px 0;
        border: 1px solid #e8e8e8;
        padding: 10px;

        .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size:  @fontSize  + 2;
            padding-right: 8px;
            line-height: 30px;
            height: 30px;
        }
    }

    .tab-wrop {
        margin-top: 20px
    }

    .btn-link {
        margin-left: 5px
    }
</style>

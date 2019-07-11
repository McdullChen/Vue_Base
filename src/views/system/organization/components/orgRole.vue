/**
* 系统-部门管理组件
* @module 系统
* @desc 角色
* @author 王伟
* @date 2019-6-4
**/
<template>
    <el-dialog :close-on-click-modal='false' :visible="show" @close="closeDialog" center title="部门角色配置" width="800px">
        <el-popover
                placement="right"
                v-model="visible2"
                width="435">
            <el-input class="ipt-role" placeholder="请输入角色名称" v-model="input"></el-input>
            <el-select
                    :remote-method="remoteMethod"
                    class="select-css"
                    filterable
                    placeholder="请输入指定人员"
                    remote
                    reserve-keyword
                    v-model="value">
                <el-option
                        :key="item.loginId"
                        :label="item.userName"
                        :value="item.loginId"
                        v-for="item in options">
                </el-option>
            </el-select>
            <div class="wrop-do">
                <el-button @click="visible2 = false" size="mini" type="text">取消</el-button>
                <el-button @click="addRole" size="mini" type="primary">确定</el-button>
            </div>
            <el-button icon="el-icon-plus" slot="reference" type="success">添加配置</el-button>
        </el-popover>
        <el-table :data="list" :header-cell-style="{background:'#e9eff8'}" border class="wrop-tab" size="mini">
            <el-table-column align="center" label="角色名" prop="dictName"/>
            <el-table-column align="center" label="人员" prop="userName"/>
            <el-table-column align="center" label="操作" prop="idCard" width="60">

                <template slot-scope="scope">
                    <el-tooltip :open-delay="500" content="删除当前项" placement="top">
                        <el-link @click.stop="delRole(scope.row.urid)" class="btn-link" icon="el-icon-delete"
                                 type="danger"></el-link>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :close-on-click-modal='false' :visible="editObj.show" @close="editObj.show=false" append-to-body
                   center
                   title="添加角色配置" width="800px">
            <span class="dialog-footer" slot="footer">
                <el-button @click="editObj.show=false" size="small" type="info">
                    <i class="lj_font icon_quxiaofanhui"></i>取 消
                </el-button>
                <el-button @click="submitForm('ruleForm')" size="small" type="primary">
                    <i class="lj_font icon_baocun"></i>确 定
                </el-button>
            </span>
        </el-dialog>
    </el-dialog>
</template>

<script>
    import {apiAccountSearch, apiOrgAddRole, apiOrgDeleteRole, apiOrgGetUsers} from "../../../../api/system";

    export default {
        name: "orgRole",
        props: ['id', 'show', 'orgName'],
        data() {
            return {
                list: [],
                input: '',
                options: [],
                value: '',
                jobtitlesArr: [],
                visible2: false,
                editObj: {
                    show: false,
                    userId: ''
                },
            }
        },
        methods: {
            remoteMethod(data) {
                apiAccountSearch({keyWord: data, pageNum: 1, pageSize: 20, orgId: this.id}).then(res => {
                    this.options = res.data
                })
            },
            addRole() {
                if (this.input && this.value) {
                    let json = {
                        orgId: this.id,
                        orgName: this.orgName,
                        dictName: this.input,
                        loginId: this.value
                    };
                    json.userName = this.options.find(i => {
                        return i.loginId === this.value
                    }).userName;
                    apiOrgAddRole(json).then(() => {
                        this.visible2 = false;
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.initPage()
                    })
                }

            },
            delRole(data) {
                this.$confirm('是否确定删除本条记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiOrgDeleteRole(data).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.initPage()
                    })
                })
            },
            closeDialog() {
                this.$emit('update:show', false)
            },
            initPage() {
                this.input = '';
                this.value = '';
                apiOrgGetUsers({orgId: this.id}).then(res => {
                    this.list = res.data;
                    this.remoteMethod()
                })
            },
        },
        created() {
        },
        watch: {
            show(val) {
                if (val) {
                    this.initPage()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .item-block {
        font-size:  @fontSize + 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.active {
            color: #6d8eff;
            font-weight: bold;
        }

        &:hover {
            color: #6d8eff;
            text-decoration: underline;
        }
    }

    ;
    .ipt-role {
        width: 200px
    }

    .select-css {
        margin-left: 10px
    }

    .wrop-do {
        text-align: right;
        margin-top: 10px
    }

    .wrop-tab {
        margin: 10px 0
    }

    .btn-link {
        margin-left: 5px
    }
</style>

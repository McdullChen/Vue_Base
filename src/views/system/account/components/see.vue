/**
* 系统-用户管理组件
* @module 系统
* @desc 查看
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <el-dialog :close-on-click-modal='false' :visible="show" @close="closeDialog" center title="用户详情" width="600px">
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="first">
                <table class="tab-wrop">
                    <tr>
                        <td class="label">登录名：</td>
                        <td>{{form.loginName}}</td>
                        <td class="label">账户名：</td>
                        <td>{{form.userName}}</td>
                    </tr>
                    <tr>
                        <td class="label">部门：</td>
                        <td>{{form.orgName}}</td>
                        <td class="label">是否启用：</td>
                        <td>{{form.isDisable == 1?'启用':'禁用'}}</td>
                    </tr>
                    <tr>
                        <td class="label">登录名：</td>
                        <td>{{form.loginName}}</td>
                        <td class="label">权限角色：</td>
                        <td>
                            <el-tag :key="data.roleId" v-for="data in roleList">{{data.roleName}}</el-tag>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">启用时间</td>
                        <td>{{form.useTime | formatDate}}</td>
                    </tr>
                </table>
            </el-tab-pane>

            <el-tab-pane label="权限信息" name="second">
                <table>
                    <tr v-if="roleList.length < 1">
                        <td align="center" class="bind-td" colspan="2">-暂未绑定权限角色-</td>
                    </tr>
                    <tbody :key="data.roleId" v-for="data in roleList">
                    <tr>
                        <td colspan="2">
                            <b>{{data.roleName}}</b>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">部门权限：</td>
                        <td>
                            <el-tag :key="item.orgId" v-for="item in data.orgItem">{{item.orgName}}</el-tag>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">资源权限：</td>
                        <td>
                            <el-tag :key="data.resId" v-for="item in data.resItem">{{item.resName}}</el-tag>
                        </td>
                    </tr>
                    </tbody>

                </table>
            </el-tab-pane>
        </el-tabs>
        <span class="dialog-footer" slot="footer">
            <el-button @click="closeDialog" size="small" type="info"><i class="lj_font icon_quxiaofanhui"></i>关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {apiAccountGet, apiAccountGetRole} from "../../../../api/system";
    import {formatDate} from "../../../../until/wordBook";

    export default {
        name: "edit",
        props: ["show", 'type', 'title'],
        data() {
            return {
                form: {
                    loginName: '',
                },
                activeName: 'first',
                roleList: [],
                userList: [],
                loading: false,
            }
        },
        methods: {
            closeDialog() {
                this.$emit('update:show', false)
            },
            initPage() {
                apiAccountGetRole(this.type).then(res => {
                    res.data_role.forEach(i => {
                        i.orgItem = JSON.parse(res['org_' + i.roleId]);
                        i.resItem = JSON.parse(res['res_' + i.roleId])
                    });
                    this.roleList = res.data_role;
                });
                apiAccountGet(this.type).then(res => {
                    this.form = res.data;
                    this.loading = false;
                })
            }
        },
        filters: {
            formatDate(val) {
                return formatDate(val, 'yyyy-MM-dd')
            },
        },
        watch: {
            'show'(value) {
                if (value) {
                    this.loading = true;
                    this.initPage();
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    table {
        .gridTable;

        .label {
            width: 100px;
        }
    }

    .el-tag {
        margin: 5px;
    }

    .tab-wrop {
        width: 100%
    }

    .bind-td {
        color: #888888
    }

</style>

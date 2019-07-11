/**
* 系统-权限管理组件
* @module 系统
* @desc 关联弹框
* @author 王伟
* @date 2019-6-4
**/
<template>
    <div>
        <el-dialog :close-on-click-modal='false' :title="title" :visible="show" @close="closeDialog" center
                   width="800px">
            <div class="alert_wrop" v-if="show">
                <el-tabs type="card" v-model="activeName2">
                    <el-tab-pane label="用户角色关联" name="user">
                        <div class="div_wrop">
                            <user-relation :roleId="roleId" @selected="userSelect"/>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="关联资源" name="menu">
                        <div class="div_wrop">
                            <tree-date-div :roleId="roleId" ref="menu" type="menu"></tree-date-div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="组织关联" name="org">
                        <div class="div_wrop">
                            <tree-date-div :roleId="roleId" ref="org" type="org"></tree-date-div>
                        </div>
                    </el-tab-pane>
                    <!--                    <el-tab-pane label="案件类型关联" name="fourth">-->
                    <!--                        <div class="div_wrop">-->
                    <!--                        </div>-->
                    <!--                    </el-tab-pane>-->
                    <!--                    <el-tab-pane label="敏感数据配置" name="table">-->
                    <!--                        <div class="div_wrop">-->
                    <!--                            <table-relation :roleId="roleId" @selected="tableSelect"/>-->
                    <!--                        </div>-->
                    <!--                    </el-tab-pane>-->
                </el-tabs>
            </div>
            <span class="dialog-footer" slot="footer">
                <el-button @click="closeDialog" size="small" type="info"><i
                        class="lj_font icon_quxiaofanhui"></i>取 消</el-button>
                <el-button @click="Cinfirm" size="small" type="primary"><i
                        class="lj_font icon_baocun"></i>保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {apiRoleBindMenu, apiRoleBindOrg, apiRoleBindUser} from "../../../../api/system";
    import treeDateDiv from './relationData/treeDate'
    import userRelation from './relationData/userRelation'
    import tableRelation from './relationData/tableRelation'

    export default {
        name: 'relation',
        props: {
            title: {
                type: String,
                default: ''
            },
            show: {
                type: Boolean,
                default: false
            },
            roleId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                activeName2: 'user',
                userSelected: [],
                tableSelected: [],
            }
        },
        components: {
            treeDateDiv, userRelation, tableRelation
        },
        methods: {
            userSelect(data) {
                this.userSelected = data
            },
            tableSelect(data) {
                this.tableSelected = data
            },
            getMenuKeys() {
                return this.$refs.menu.getKeys()
            },
            getOrgKeys() {
                return this.$refs.org.getKeys()
            },
            closeDialog() {
                this.$emit('update:show', false)
            },
            Cinfirm() {
                let json = [];
                this.userSelected.forEach(i => {
                    json.push({roleId: this.roleId, userId: i.loginId, isDefault: 0})
                });
                apiRoleBindUser(this.roleId ,json).then(res => {
                    let json = [];
                    let menu = this.getMenuKeys();
                    menu.forEach(i => {
                        json.push({roleId: this.roleId, resId: i.resId})
                    });
                    apiRoleBindMenu(this.roleId,json).then(res => {
                        let json = [];
                        let menu = this.getOrgKeys();
                        menu.forEach(i => {
                            json.push({roleId: this.roleId, orgId: i.orgId})
                        });
                        apiRoleBindOrg(this.roleId,json).then(res => {
                            this.$message({
                                type: 'success',
                                message: '配置成功!'
                            });
                            this.closeDialog()
                            // let json = [];
                            // this.tableSelected.forEach(i => {
                            //
                            //     json.push({roleId: this.roleId, tableName: i.tableName, fieldname: i.fieldName})
                            // });
                            // sensitiveDataAPI(json).then(res => {
                            //     this.$message({
                            //         type: 'success',
                            //         message: '配置成功!'
                            //     });
                            //     this.closeDialog()
                            // })
                        })
                    })
                });
            },
        },
        created() {


        },
        mounted() {

        },
        watch: {
            "show"(value) {
                if (value) {
                }
            }
        }


    }
</script>
<style lang='less' scoped>
</style>



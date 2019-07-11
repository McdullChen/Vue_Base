/**
* 系统-权限管理组件
* @module 系统
* @desc 查看
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
                            <people-tab :roleId="roleId"/>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="关联资源" name="menu">
                        <div class="div_wrop">
                            <menu-tab :roleId="roleId"/>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="组织关联" name="org">
                        <div class="div_wrop">
                            <org-tab :roleId="roleId"/>
                        </div>
                    </el-tab-pane>
                    <!--                    <el-tab-pane label="案件类型关联" name="fourth">-->
                    <!--                        <div class="div_wrop">-->
                    <!--                        </div>-->
                    <!--                    </el-tab-pane>-->
                    <!--                    <el-tab-pane label="敏感数据配置" name="table">-->
                    <!--                        <div class="div_wrop">-->
                    <!--                            <table-tab :roleId="roleId"/>-->
                    <!--                        </div>-->
                    <!--                    </el-tab-pane>-->
                </el-tabs>
            </div>
            <span class="dialog-footer" slot="footer">
                <el-button @click="closeDialog" size="small" type="info"><i
                        class="lj_font icon_quxiaofanhui"></i>关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import peopleTab from './watchTabs/people'
    import menuTab from './watchTabs/menu'
    import orgTab from './watchTabs/org'
    import tableTab from './watchTabs/table'

    export default {
        name: "watch",
        components: {peopleTab, menuTab, orgTab, tableTab},
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
                activeName2: 'user'
            }
        },
        methods: {
            closeDialog() {
                this.$emit('update:show', false)
            },
        }
    }
</script>

<style scoped>

</style>

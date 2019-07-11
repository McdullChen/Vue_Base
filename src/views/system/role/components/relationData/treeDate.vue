/**
* 系统-权限管理组件
* @module 系统
* @desc 资源&组织关联
* @author 王伟
* @date 2019-6-4
**/
<template>
    <div>
        <el-tree
                :data="list"
                :expand-on-click-node="false"
                :node-key="type==='menu'?'resId':'orgId'"
                default-expand-all
                ref="tree"
                show-checkbox>
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <span v-if="type === 'menu'">{{ data.resName }} 【{{data.resType | menuType}}】</span>
                <span v-if="type === 'org'">{{ data.orgName }}</span>
            </div>
        </el-tree>
    </div>
</template>
<script>
    import {MENUTYPEWORD} from "../../../../../until/wordBook";
    import {apiRoleSearchMenu, apiRoleSearchOrg} from "../../../../../api/system";
    import {getTree} from "../../../../../until/menuList";

    export default {
        name: 'treedate',
        props: ["roleId", "type"],
        data() {
            return {
                list: [],
                loading: false
            }
        },
        filters: {
            menuType(value) {
                return MENUTYPEWORD[value]
            }
        },
        methods: {
            initPage() {
                if (this.type === 'menu') {
                    apiRoleSearchMenu({roleId: this.roleId}).then(res => {
                        this.list = getTree(res.data, 'resId', 'parentId', 'resLevel');
                        this.$nextTick(() => {
                            res.data.forEach(i => {
                                if (i.roleId === this.roleId) {
                                    this.$refs.tree.setChecked(i.resId, true, false)
                                }
                            });
                        })

                    })
                } else if (this.type === 'org') {
                    apiRoleSearchOrg({roleId: this.roleId}).then(res => {
                        this.list = getTree(res.data, 'orgId', 'parentCode', 'isParent');
                        this.$nextTick(() => {
                            res.data.forEach(i => {
                                if (i.roleId === this.roleId) {
                                    this.$refs.tree.setChecked(i.orgId, true, false)
                                }
                            });
                        })
                    })
                }

            },
            getKeys() {
                let aaa = this.$refs.tree.getCheckedNodes(false, true);
                return aaa
            },
        },
        mounted() {
            this.initPage()
        }
    }
</script>
<style>

</style>


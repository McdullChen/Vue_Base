<template>
    <div>
        <el-form label-width="120px">
            <el-form-item label="已关联组织：">
                <el-tag :key="data.resId" class="tag-css" v-for="data in list">{{data.resName}}</el-tag>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {apiRoleSearchMenuView} from "../../../../../api/system";

    export default {
        props: ["roleId"],
        data() {
            return {
                list: ''
            }
        },
        methods: {
            getList() {
                apiRoleSearchMenuView({roleId: this.roleId,}).then(res => {
                    this.list = res.data
                })
            }
        },
        created() {
            this.getList()
        },
    }
</script>

<style scoped>
    .tag-css {
        margin-left: 10px
    }
</style>

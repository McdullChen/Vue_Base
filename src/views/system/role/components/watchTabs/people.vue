<template>
    <div>
        <el-form label-width="120px">
            <el-form-item label="已绑定账号：">
                <el-tag :key="data.loginId" class="tag-css" v-for="data in list">{{data.userName}}</el-tag>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {apiRoleSearchAccount} from "../../../../../api/system";

    export default {
        props: ["roleId"],
        data() {
            return {
                list: ''
            }
        },
        methods: {
            getList() {
                apiRoleSearchAccount({roleId: this.roleId,}).then(res => {
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

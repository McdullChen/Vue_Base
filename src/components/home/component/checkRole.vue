<template>
    <el-dialog
            title="切换角色"
            :visible.sync="show"
            width="30%"
            center
            @close="closeDialog">
        <div v-if="$store.state.setRoleList" style="text-align: center">
            <el-radio v-model="roleId" v-for="data in $store.state.setRoleList" :key="data.roleId" :label="data.roleId" border>{{data.roleName}}</el-radio>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="sureBtn">确 定</el-button>
          </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "checkRole",
        props:['show'],
        data(){
            return{
                roleId:this.$store.state.role
            }
        },
        methods:{
            sureBtn(){
                this.$store.dispatch('setRoleId',this.roleId);
                window.location.reload()
            },
            closeDialog() {
                this.$emit("update:show", false);
            },
        },
    }
</script>

<style scoped>

</style>

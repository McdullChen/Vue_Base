<template>
    <div>
        <el-table :data="list" :span-method="arraySpanMethod" border>
            <el-table-column
                    align="center"
                    label="表名"
                    prop="tableName">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="字段名"
                    prop="fieldName">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {apiRoleSearchTableView} from "../../../../../api/system";

    export default {
        props: ["roleId"],
        data() {
            return {
                list: []
            }
        },
        methods: {
            arraySpanMethod(data) {
            },
            getList() {
                apiRoleSearchTableView({roleId: this.roleId,}).then(res => {
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

</style>

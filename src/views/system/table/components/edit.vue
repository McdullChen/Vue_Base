/**
* 系统-系统参数组件
* @module 系统
* @desc 列表
* @author 王伟
* @date 2019-6-4
**/
<template>
    <el-dialog :close-on-click-modal='false' :title="title" :visible="show" @close="closeDialog" center width="400px">
        <el-form :model="form" label-width="80px" ref="form" size="medium">
            <el-form-item label="表名">
                <el-input v-model="form.tableName"/>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.tableDesc"/>
            </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">
            <el-button @click="closeDialog" size="small" type="info"><i class="lj_font icon_quxiaofanhui"></i>取 消</el-button>
            <el-button @click="onSure()" size="small" type="primary"><i class="lj_font icon_baocun"></i>确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {apiTableAdd, apiTableUpdate} from "../../../../api/system";

    export default {
        name: "edit",
        props: ["show", 'type', 'title', 'tableName', 'tableDesc'],
        data() {
            return {
                form: {},
            }
        },
        methods: {
            closeDialog() {
                this.$emit('update:show', false)
            },
            onSure() {
                if (this.type) {
                    apiTableUpdate(this.form).then(res => {
                        this.$emit('updateTable');
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        this.closeDialog()
                    })
                } else {
                    apiTableAdd(this.form).then(res => {
                        this.$emit('updateTable');
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        this.closeDialog()
                    })
                }
            },
            initPage() {
                if (this.type) {
                    this.form = {
                        tableName: this.tableName,
                        tableDesc: this.tableDesc,
                        tableId: this.type
                    };
                } else {
                    this.form = {
                        tableName: "",
                        tableDesc: "",
                    };
                }
            }
        },
        watch: {
            'show'(value) {
                if (value) {
                    this.loading = true;
                    this.initPage()
                }
            }
        }
    }
</script>

<style scoped>

</style>

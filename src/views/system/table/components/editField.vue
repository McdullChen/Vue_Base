<template>
    <el-dialog :close-on-click-modal='false' :title="title" :visible="show" @close="closeDialog" center width="400px">
        <el-form :model="form" label-width="80px" ref="form" size="medium">
            <el-form-item label="字段名">
                <el-input v-model="form.fieldName"/>
            </el-form-item>
            <el-form-item label="字段备注">
                <el-input v-model="form.fieldDesc"/>
            </el-form-item>
            <el-form-item label="字段序号">
                <el-input-number :min="0" v-model="form.fieldOrder"/>
            </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">
            <el-button @click="closeDialog" size="small" type="info"><i class="lj_font icon_quxiaofanhui"></i>取 消</el-button>
            <el-button @click="onSure()" size="small" type="primary"><i class="lj_font icon_baocun"></i>确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {apiTableAddField, apiTableUpdateField} from "../../../../api/system";

    export default {
        name: "edit",
        props: ["show", 'type', 'title', 'tableName', 'fieldOrder', 'fieldName', 'fieldDesc'],
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
                    apiTableUpdateField(this.form).then(res => {
                        this.$emit('updateTable');
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        this.closeDialog()
                    })
                } else {
                    apiTableAddField(this.form).then(res => {
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
                        fieldId: this.type,
                        tableName: this.tableName,
                        fieldDesc: this.fieldDesc,
                        fieldName: this.fieldName,
                        fieldOrder: this.fieldOrder,
                    };
                } else {
                    this.form = {
                        tableName: this.tableName,
                        fieldDesc: this.fieldDesc,
                        fieldName: this.fieldName,
                        fieldOrder: this.fieldOrder,
                    };
                }
            }
        },
        watch: {
            'show'(value) {
                if (value) {
                    this.initPage()
                }
            }
        }
    }
</script>

<style scoped>

</style>

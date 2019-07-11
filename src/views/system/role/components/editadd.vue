/**
* 系统-权限管理组件
* @module 系统
* @desc 添加修改
* @author 王伟
* @date 2019-6-4
**/
<template>
    <div>
        <el-dialog :close-on-click-modal='false' :title="title" :visible="show" @close="closeDialog" center
                   width="500px">
            <div class="alert_wrop">

                <el-form :label-position="labelPosition" :model="form" :rules="rules" label-width="100px" ref="ruleForm"
                         size="medium">
                    <el-form-item label="角色名称：" prop="roleName">
                        <el-input v-model="form.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息：">
                        <el-input :rows="3" type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用：">
                        <el-switch :active-value="1" :inactive-value="0" style="margin-right:70px"
                                   v-model="form.isDisable"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <span class="dialog-footer" slot="footer">
                <el-button @click="closeDialog" size="small" type="info"><i
                        class="lj_font icon_quxiaofanhui"></i>取 消</el-button>
                <el-button @click="submitForm('ruleForm')" size="small" type="primary"><i
                        class="lj_font icon_baocun"></i>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {apiRoleAdd, apiRoleUpdate} from "../../../../api/system";

    export default {
        name: 'edit',
        props: {
            data: {
                type: Object,
                default: () => {
                }
            },
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                labelPosition: 'right',
                form: {},
                rules: {
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            closeDialog() {
                this.$emit('update:show', false)
            },
            clearV() {
                this.$refs.ruleForm.clearValidate()
            },
            Cinfirm() {
                this.closeDialog()
                if (this.form.type == 2) {
                    apiRoleAdd(this.form).then(res => {
                        this.$message({type: 'success', message: '添加成功!'});
                        this.$emit('updateTable')
                    })

                } else {
                    //编辑
                    apiRoleUpdate(this.form).then(res => {
                        this.$message({type: 'success', message: '修改成功!'});
                        this.$emit('updateTable')

                    })
                }

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.closeDialog();

                        if (this.form.type == 2) {
                            apiRoleAdd(this.form).then(res => {
                                this.$message({type: 'success', message: '添加成功!'});
                                this.$emit('updateTable')
                            })

                        } else {
                            //编辑
                            apiRoleUpdate(this.form).then(res => {
                                this.$message({type: 'success', message: '修改成功!'});
                                this.$emit('updateTable')

                            })
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请填写完整 !'
                        });
                        return false;
                    }
                });
            },
            //弹框弹出时获取data给form
            initPage() {
                if (this.data) {
                    this.form = this.data
                } else {
                    this.form = {
                        isDisable: 1
                    };
                }

            }
        },
        watch: {
            'show'(value) {
                if (value) {
                    this.$nextTick(() => {
                        this.$refs.ruleForm.clearValidate();
                    })
                    this.initPage();
                }
            }
        },
        created() {


        },
        mounted() {

        }


    }
</script>
<style lang='less' scoped>

</style>



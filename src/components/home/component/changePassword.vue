<!--*
* aside
* @desc 修改密码
* @author WangWei
* @param {Boolean} [show]    - 显示控制
* @param {String} [title]    - 弹窗标题
* @date 2019/6/3
*-->
<template>
    <div>
        <div class="wrop">
            <el-dialog :title="title" :visible="show" @close="closeDialog" center width="30%">
                <el-form :model="ruleFormCheck" :rules="rules" ref="check" label-width="80px" status-icon v-if='loginSuccess'>
                    <el-form-item label="登录名" prop="loginName">
                        <el-input placeholder="请输入登录名" v-model="ruleFormCheck.loginName"></el-input>
                    </el-form-item>
                    <el-form-item label="原密码" prop="loginPwd">
                        <el-input placeholder="请输入原密码" v-model="ruleFormCheck.loginPwd"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="80px" 
                         status-icon v-else>
                    <el-form-item label="用户名">
                        <el-input placeholder="请输入登录名" v-model="ruleForm.loginName"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="pass">
                        <el-input auto-complete="off" placeholder="请输入新密码" type="password"
                                  v-model="ruleForm.pass"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="newloginPwd">
                        <el-input auto-complete="off" placeholder="请再次确认密码" type="password"
                                  v-model="ruleForm.newloginPwd"></el-input>
                    </el-form-item>
                </el-form>
                <span class="dialog-footer" slot="footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button @click="submitForm1Check('check')" type="primary" v-if="loginSuccess">确 定</el-button>
                    <el-button @click="submitFormChange('ruleForm')" type="primary" v-else>确 定</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>
<script>
    import {apiPasswordCheck, apiPasswordUpdate} from "../../../api/system";

    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            // 密码验证方法
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.newloginPwd !== '') {
                        this.$refs.ruleForm.validateField('newloginPwd');
                    }
                    callback();
                }
            };
            // 确认密码校验
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                loginSuccess: true,
                ruleFormCheck: {
                    loginName: '',
                    loginPwd: ''
                },
                ruleForm: {
                    loginName: '',
                    newloginPwd: '',
                    pass: '',
                },
                rules: {
                    //原来的密码
                    loginPwd: [
                        {required: true, validator: validatePass, trigger: 'blur'},
                        {message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 18, message: '请输入 6 到 18 个字符', trigger: 'blur'}
                    ],
                    pass: [
                        {required: true, validator: validatePass, trigger: 'blur'},
                        {message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 18, message: '请输入 6 到 18 个字符', trigger: 'blur'}
                    ],
                    newloginPwd: [
                        {required: true, validator: validatePass2, trigger: 'blur'},
                        {message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 18, message: '请输入 6 到 18 个字符', trigger: 'blur'}
                    ],
                    loginName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                    ]
                }
            };
        },
        methods: {
            // 弹窗关闭方法
            closeDialog() {
                this.$emit('update:show', false)
            },

            // 验证老密码方法
            submitForm1Check(check) {
                 this.$refs[check].validate((valid) => {
                    if (valid) {
                       apiPasswordCheck(this.ruleFormCheck).then(res => {
                            this.$message({
                                type: 'success',
                                message: '原密码检测成功!'
                            });
                            this.ruleForm.loginName = this.ruleFormCheck.loginName;
                            this.loginSuccess = false
                        })
                    } else {
                        return false;
                    }
                });
                
            },

            // 提交修改
            submitFormChange(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        apiPasswordUpdate(this.ruleForm).then(res => {
                            this.$message({
                                type: 'success',
                                message: '密码修改成功!'
                            });
                            this.closeDialog()
                        })
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>
<style lang="less" scoped>

    .wrop {
        border: 1px solid red
    }

</style>


<template>
    <div class="login-comp">
        <div class="title">
            网上办案系统
        </div>
        <div :style="{backgroundImage:`url(${logo_line_image})`}" class="line"></div>
        <el-form :model="form" :rules="rules" ref="loginForm" size="medium">
            <el-form-item prop="account">
                <el-input clearable placeholder="用户名" prefix-icon="lj_font el-icon-user"
                          v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input clearable placeholder="密码" prefix-icon="lj_font el-icon-lock" type="password"
                          v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item prop="password" v-if="false">
                <el-input clearable placeholder="请输入验证码" prefix-icon="lj_font el-icon-lock" v-model="form.code">
                    <template slot="append">
                        <img :src="codeUrl + timeStamp" @click="upDateTime">
                    </template>
                </el-input>

            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button @click="toHome" class="btn" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import logo_line_image from '../../assets/login_tit_b.png'
    import {apiCommonLogin} from "../../api/system";

    export default {
        name: "login",
        data() {
            let rememberMeFlag = localStorage.getItem('rememberMe') === 'false';
            let accountLocal = localStorage.getItem('rememberMe') === 'true' && localStorage.getItem('account') ? localStorage.getItem('account') : '';
            let passwordLocal = localStorage.getItem('rememberMe') === 'true' && localStorage.getItem('password') ? localStorage.getItem('password') : '';
            return {
                logo_line_image: logo_line_image,
                codeUrl: '/test/getcode?v=',
                timeStamp: Date.parse(new Date()),
                form: {
                    account: accountLocal,
                    password: passwordLocal,
                    code: ''
                },
                rememberMe: !rememberMeFlag,
                rules: {
                    account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            upDateTime() {
                this.timeStamp = Date.parse(new Date())
            },
            toHome() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let json = {
                            loginName: this.form.account,
                            loginPwd: this.form.password,
                        };
                        localStorage.setItem('rememberMe', this.rememberMe);
                        if (this.rememberMe) {
                            localStorage.setItem('account', this.form.account);
                            localStorage.setItem('password', this.form.password)
                        } else {
                            localStorage.removeItem('account');
                            localStorage.removeItem('password')
                        }
                        apiCommonLogin(json).then(res => {
                            let roleList = JSON.parse(res[this.$store.state.role?this.$store.state.role:res.roleList[0].roleId]);//权限组
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            this.$store.dispatch('setUser', res);
                            this.$store.dispatch('setMenu', roleList).then(() => {
                                this.$store.dispatch('setRoleList', res.roleList).then(res => {
                                    this.$router.push({name: 'index'})
                                })
                            })
                        })
                    }
                })
            },
            resetForm() {
                this.$refs.loginForm.resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/ .el-input-group__append {
        padding: 0;
        border: none;
        background: none;

        img {
            height: 40px;
        }
    }

    .login-comp {
        width: 390px;
        margin: auto;
        box-shadow: 0 0 15px #ccc;
        padding: 30px 50px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.5);

        .title {
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            color: #555;
        }

        .btn {
            width: 100%;
            margin: 0 0 10px 0;
        }

        .line {
            height: 6px;
            background-repeat: no-repeat;
            background-position: center;
            margin-bottom: 30px;
            margin-top: 20px;
        }
    }
</style>

/**
* 系统-用户管理组件
* @module 系统
* @desc 修改添加
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <el-dialog :close-on-click-modal='false' :title="title" :visible="show" @close="closeDialog" center width="500px">
        <el-form :model="form" :rules="rules" label-width="120px" ref="form" size="medium" status-icon
                 v-loading="loading">
            <el-form-item label="所属部门" prop="orgId">
                <el-select
                        :remote-method="remoteMethod"
                        @change="getUserListByOrg"
                        filterable
                        placeholder="请输入关键词"
                        remote
                        reserve-keyword
                        v-model="form.orgId">
                    <el-option
                            :key="item.orgId"
                            :label="item.orgName"
                            :value="item.orgId"
                            v-for="item in options">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户名称" prop="userName">
                <el-autocomplete
                        :fetch-suggestions="querySearchAsync"
                        @select="handleSelect"
                        placeholder="请输入内容"
                        v-model="form.userName"
                        value-key="fullName"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="登录名" prop="loginName">
                <el-input v-model="form.loginName"/>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch
                        :active-value="1"
                        :inactive-value="0"
                        v-model="form.isDisable">
                </el-switch>
                <span class="tit">  ( 初始密码为登录名 )</span>
            </el-form-item>
            <el-form-item label="启用时间">
                <el-date-picker
                        placeholder="选择日期"
                        type="date"
                        v-model="form.useTime"
                        value-format="timestamp">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">
            <el-button @click="closeDialog" size="small" type="info"><i class="lj_font icon_quxiaofanhui"></i>取 消</el-button>
            <el-button @click="onSure()" size="small" type="primary"><i class="lj_font icon_baocun"></i>确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {
        apiAccountAdd,
        apiAccountCheck,
        apiAccountGet,
        apiAccountUpdate,
        apiCommonGetUsersByOrg,
        apiOrgSearch
    } from "../../../../api/system";

    export default {
        name: "edit",
        props: ["show", 'type', 'title'],
        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.loginPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let checkLoginName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('登录名不能为空'));
                } else if (!this.type) {
                    apiAccountCheck(value).then(res => {
                        if (res.checkSize > 0) {
                            return callback(new Error('登录名已存在'));
                        } else {

                            callback();
                        }
                    })
                } else {
                    callback();
                }
            };
            let checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    loginName: '',
                },
                userList: [],
                loading: false,
                options: [],
                rules: {
                    loginName: [
                        {validator: checkLoginName, trigger: 'blur'},
                        {required: true, message: '请输入登录名', trigger: 'change'}
                    ],
                    loginPwd: [
                        {validator: checkPassword, trigger: 'blur'},
                        {required: true, message: '请输入密码', trigger: 'change'}
                    ],
                    loginPwd2: [
                        {validator: validatePass2, trigger: 'blur'},
                        {required: true, message: '请再次输入密码', trigger: 'change'}
                    ],
                    orgId: [
                        {required: true, message: '请选择账号所属机构', trigger: 'change'}
                    ],
                    userName: [
                        {required: true, message: '请选择账号所属人员', trigger: 'change'}
                    ],
                }
            }
        },
        methods: {
            closeDialog() {
                this.$emit('update:show', false)
            },
            querySearchAsync(data, cb) {
                cb(this.userList.filter(i => {
                    return i.fullName.indexOf(data) > -1
                }))
            },
            handleSelect(data) {
                this.form.userId = data.userId
            },
            getUserListByOrg(data) {
                this.form.orgName = this.options.find(i => {
                    return i.orgId === data
                }).orgName;
                apiCommonGetUsersByOrg(data).then(res => {
                    this.userList = res.userList
                })
            },
            changeUser(data) {
                if (this.userList.find(i => {
                    return i.userId === data
                })) {
                    this.form.userId = this.userList.find(i => {
                        return i.userId === data
                    }).userId;
                } else {
                    this.form.userId = ''
                }
            },
            remoteMethod(data) {
                apiOrgSearch({keyWord: data}).then(res => {
                    this.options = res.data
                })
            },
            onSure() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.type) {
                            apiAccountUpdate(this.form).then(res => {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.$emit('updateTable');
                                this.closeDialog()
                            })
                        } else {
                            apiAccountAdd(this.form).then(res => {
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.$emit('updateTable');
                                this.closeDialog()
                            })
                        }
                    }

                })

            },
            initPage() {
                this.remoteMethod();
                if (this.type) {
                    apiAccountGet(this.type).then(res => {
                        this.form = res.data;
                        this.form.loginPwd2 = this.form.loginPwd;
                        this.loading = false;
                        apiCommonGetUsersByOrg(res.data.orgId).then(res => {
                            this.userList = res.userList
                        })
                    })
                } else {
                    this.form = {
                        loginName: '',
                        loginPwd: '',
                        useTime: '',
                        orgId: '',
                        isDisable: 1
                    };
                    this.$nextTick(() => {
                        this.loading = false;
                    })
                }
            }
        },
        watch: {
            'show'(value) {
                if (value) {
                    this.loading = true;
                    this.initPage();
                    this.$nextTick(() => {
                        this.$refs.form.clearValidate();
                    })
                }
            }
        }
    }
</script>

<style scoped>
  .tit{
      color: #B2B2B2
  }
</style>

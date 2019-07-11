/**
* 系统-部门管理组件
* @module 系统
* @desc 添加修改
* @author 王伟
* @date 2019-6-4
**/
<template>
    <div>
        <el-dialog :close-on-click-modal='false' :title="title" :visible="show" @close="closeDialog" center
                   width="800px">

            <el-form :model="form" :rules="rules" label-width="160px" ref="ruleForm"
                     size="medium"
                     status-icon>
                <el-row>
                    <el-col :span="24">
                        <el-divider content-position="left">基本信息</el-divider>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门名称：" prop='orgName'>
                            <el-input placeholder="请填写添加部门名称" v-model="form.orgName"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门简称：" prop=''>
                            <el-input placeholder="请填写添加部门简称" v-model="form.departmentAbb"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门编号：" prop='orgNumber'>
                            <el-input placeholder="请填写部门编号" v-model="form.orgNumber"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门代码：" prop='orgCode'>
                            <el-input placeholder="请填写机构代码" v-model="form.orgCode"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="行政区域：" prop="parentAdminManage">
                            <el-cascader
                                    :options="provinceOptions"
                                    :props="{value:'areaId',label:'areaName'}"
                                    :show-all-levels="false"
                                    @change="handleItemChange"
                                    change-on-select
                                    expand-trigger="hover"
                                    v-model="selectedOptions">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">

                        <el-form-item label="邮箱地址：" prop='orgAreaCode'>
                            <el-input placeholder="请填写邮箱地址" v-model="form.orgAreaCode"/>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="联系人：" prop='orgContacts'>
                            <el-input placeholder="请填联系人" v-model="form.orgContacts"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号：" prop='orgTel'>
                            <el-input placeholder="请填写账户" v-model="form.orgTel"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="地址：" prop='orgAddress'>
                            <el-input placeholder="请填写地址" v-model="form.orgAddress"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="排序：" prop='orgOrder'>
                            <el-input placeholder="请填写排序值" v-model.number="form.orgOrder"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-divider content-position="left">附加信息</el-divider>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门案件编号：" prop='orgCaseCode'>
                            <el-input placeholder="请填案件部门编号" v-model="form.orgCaseCode"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="落款单位：" prop='departmentCode'>
                            <el-input placeholder="请填写落款单位" v-model="form.inscribedUnit"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="行政诉讼法院：">
                            <el-input placeholder="请填写行政诉讼法院" v-model="form.adminLawsuitCourt"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上级(复议)业务单位：" prop="parantBusManage">
                            <el-input placeholder="请填上级业务主管单位" v-model="form.parantBusManage"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上级(复议)行政单位：" prop="parentAdminManage">
                            <el-input placeholder="请填上级行政主管单位" v-model="form.parentAdminManage"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <span class="dialog-footer" slot="footer">
                <el-button @click="closeDialog" size="medium" type="info"><i
                        class="lj_font icon_quxiaofanhui"></i>取 消</el-button>
                <el-button @click="submitForm('ruleForm')" size="medium" type="primary"><i
                        class="lj_font icon_baocun"></i>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {apiCommonGetArea, apiOrgAdd, apiOrgGet, apiOrgUpdate} from "../../../../api/system";

    export default {
        name: 'edit',
        props: ['rowdata', 'show', 'title', 'orgId', 'type'],
        data() {

            return {
                form: {},

                dynamicValidateForm: {
                    domains: [
                        {value: ''}
                    ],
                    email: ''
                },
                provinceOptions: [{
                    areaId: this.$store.state.user.areaId,
                    areaName: this.$store.state.user.areaName,
                    children: []
                }],
                selectedOptions: [],
                rules: {
                    orgName: [
                        {required: true, message: '请输入部门名称', trigger: 'blur'},
                    ],
                    orgNumber: [
                        {required: true, message: '请输入组织编号', trigger: 'blur'},
                    ],
                }


            }
        },
        methods: {
            handleItemChange(val) {
                if (val.length === 1) {
                    apiCommonGetArea(val[0]).then(res => {
                        res.areaList.forEach(i => {
                            i.children = []
                        });
                        this.provinceOptions[0].children = res.areaList
                    })
                } else if (val.length === 2) {
                    apiCommonGetArea(val[1]).then(res => {
                        res.areaList.forEach(i => {
                            i.children = []
                        });
                        this.provinceOptions[0].children.find(i => {
                            return i.areaId === val[1]
                        }).children = res.areaList
                    })
                } else if (val.length === 3) {
                    apiCommonGetArea(val[2]).then(res => {
                        this.provinceOptions[0].children.find(i => {
                            return i.areaId === val[1]
                        }).children.find(i => {
                            return i.areaId === val[2]
                        }).children = res.areaList
                    })
                }
            },
            closeDialog() {
                this.$emit('update:show', false)
            },
            initPage() {
                this.provinceOptions = [{
                    areaId: this.$store.state.user.areaId,
                    areaName: this.$store.state.user.areaName,
                    children: []
                }];
                this.selectedOptions = [];
                if (this.type == 1) {
                    apiOrgGet(this.orgId).then(res => {
                        this.form = res.data
                    })
                } else if (this.type == 2) {
                    this.form = {
                        parentName: this.rowdata.orgName,
                        orgName: '',
                        orgNumber: "",
                        parentCode: this.rowdata.orgId,
                        orgOrder: 0,
                        orgCode: "",
                        orgCaseCode: '',
                        isParent: this.rowdata.isParent + 1,
                        orgAddress: "",
                        orgTel: "",
                        orgAreaCode: "",
                        orgContacts: "",
                        parantBusManage: this.rowdata.orgName,
                        parentAdminManage: this.rowdata.orgName,
                        adminLawsuitCourt: this.rowdata.adminLawsuitCourt,
                    }
                } else {
                    this.form = {
                        orgName: '',
                        orgNumber: "",
                        parentCode: 0,
                        isParent: 1,
                        orgOrder: 0,
                        orgCode: "",
                        orgCaseCode: '',
                        orgAddress: "",
                        orgTel: "",
                        orgAreaCode: "",
                        orgContacts: "",
                        parantBusManage: "",
                        parentAdminManage: "",
                        adminLawsuitCourt: "",
                    }
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.closeDialog()    //关闭弹出
                        if (this.type == 1) {
                            //编辑
                            apiOrgUpdate(this.form).then(res => {
                                this.$emit('getList')
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                this.$emit('getList')

                            })
                        } else {
                            if (this.type == 2) {
                                let x = {children: JSON.parse(JSON.stringify(this.provinceOptions))};
                                for (let i = 0; i < this.selectedOptions.length; i++) {
                                    x = x.children.find(s => {
                                        return s.areaId == this.selectedOptions[i]
                                    })
                                }
                                this.form.areaCode = x.areaId ? x.areaId : '';
                                this.form.areaName = x.areaName ? x.areaName : '';
                                apiOrgAdd(this.form).then(res => {
                                    this.$emit('getList')
                                    this.$message({
                                        type: 'success',
                                        message: '添加成功!'
                                    });
                                    this.$emit('getList')

                                })
                            }
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请把带星号的信息填写完整!'
                        });
                        return false;
                    }
                });
            },

            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            },


        },
        watch: {
            'show'(newVal, oldVal) {
                if (newVal) {
                    this.$nextTick(() => {
                        this.$refs.ruleForm.clearValidate();
                    })
                    this.initPage()
                }
            },

        },
    }
</script>
<style lang='less' scoped>
    .alert_wrop {
        //    border: 1px solid #ccc;border-radius: 5px;
        //    margin: -30px 0 -30px 0;
        padding: 10px;
        display: flex;
        justify-content: space-between;

        .left {
            width: 300px;
        }

        .right {
            width: 300px;

        }
    }
</style>



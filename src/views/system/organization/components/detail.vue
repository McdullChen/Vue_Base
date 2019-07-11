/**
* 系统-部门管理组件
* @module 系统
* @desc 详情
* @author 王伟
* @date 2019-6-4
**/
<template>
    <div class="detail-block">
        <div class="button-block" v-if="form">
            <el-button @click="showRole" icon="el-icon-s-tools" plain size="mini" type="primary">
                部门角色配置
            </el-button>
            <el-button @click="addThis" icon="el-icon-plus" plain size="mini" type="primary">
                添加子项
            </el-button>
            <el-button @click="editFlag = true" icon="el-icon-edit" plain size="mini" type="warning">
                编辑
            </el-button>
            <el-button @click="delThis" icon="el-icon-delete" plain size="mini" type="danger">
                删除该项
            </el-button>
        </div>
        <table class="tab-wrop" v-if="!editFlag">
            <tr>
                <td colspan="4"><b>基本信息</b></td>
            </tr>
            <tr>
                <td class="label">部门名称：</td>
                <td>{{form.orgName}}</td>
                <td class="label">部门简称：</td>
                <td>{{form.departmentAbb}}</td>
            </tr>
            <tr>
                <td class="label">部门编号：</td>
                <td>{{form.orgNumber}}</td>
                <td class="label">部门代码：</td>
                <td>{{form.orgCode}}</td>
            </tr>
            <tr>

                <td class="label">行政区域：</td>
                <td>
                    <div>{{form.areaName}}</div>
                </td>
                <td class="label">邮箱地址：</td>
                <td>{{form.orgAreaCode}}</td>
            </tr>
            <tr>
                <td class="label">手机号：</td>
                <td>{{form.orgTel}}</td>
                <td class="label">联系人：</td>
                <td>{{form.orgContacts}}</td>
            </tr>
            <tr>
                <td class="label">地址：</td>
                <td>{{form.orgAddress}}</td>
                <td class="label">排序：</td>
                <td>{{form.orgOrder}}</td>
            </tr>
            <tr>
                <td colspan="4"><b>附加信息</b></td>
            </tr>

            <tr>
                <td class="label">案件部门编号：</td>
                <td>{{form.orgCaseCode}}</td>
                <td class="label">落款单位：</td>
                <td>{{form.inscribedUnit}}</td>
            </tr>
            <tr>
                <td class="label">上级(复议)业务单位：</td>
                <td>{{form.parantBusManage}}</td>
                <td class="label">上级(复议)行政单位：</td>
                <td>{{form.parentAdminManage}}</td>
            </tr>
            <tr>
                <td class="label">诉讼法院：</td>
                <td>{{form.adminLawsuitCourt}}</td>
                <td></td>
                <td></td>
            </tr>


        </table>
        <el-form :model="form" :rules="rules" label-width="170px" ref="ruleForm" size="medium"
                 status-icon
                 v-if="editFlag">
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
                        <el-input placeholder="请填写部门编号" v-if="editFlag" v-model="form.orgNumber"/>
                        <div v-if="!editFlag">{{form.orgNumber}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="部门代码：" prop='orgCode'>
                        <el-input placeholder="请填写机构代码" v-if="editFlag" v-model="form.orgCode"/>
                        <div v-if="!editFlag">{{form.orgCode}}</div>
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
                                v-if="editFlag && areaFlag"
                                v-model="selectedOptions">
                        </el-cascader>
                        <div @click="editFlag? areaFlag = !areaFlag:''" v-if="!areaFlag ">{{form.areaName}}
                            <div class="icon-div" v-if="editFlag"><i class="el-icon-edit"></i></div>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">

                    <el-form-item label="邮箱地址：" prop='orgAreaCode'>
                        <el-input placeholder="请填写邮箱地址" v-if="editFlag" v-model="form.orgAreaCode"/>
                        <div v-if="!editFlag">{{form.orgAreaCode}}</div>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="联系人：" prop='orgContacts'>
                        <el-input placeholder="请填联系人" v-if="editFlag" v-model="form.orgContacts"/>
                        <div v-if="!editFlag">{{form.orgContacts}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号：" prop='orgTel'>
                        <el-input placeholder="请填写账户" v-if="editFlag" v-model="form.orgTel"/>
                        <div v-if="!editFlag">{{form.orgTel}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="地址：" prop='orgAddress'>
                        <el-input placeholder="请填写地址" v-if="editFlag" v-model="form.orgAddress"/>
                        <div v-if="!editFlag">{{form.orgAddress}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="排序：" prop='orgOrder'>
                        <el-input placeholder="请填写排序值" v-if="editFlag" v-model.number="form.orgOrder"/>
                        <div v-if="!editFlag">{{form.orgOrder}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-divider content-position="left">附加信息</el-divider>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="案件部门编号：" prop='orgCaseCode'>
                        <el-input placeholder="请填案件部门编号" v-if="editFlag" v-model="form.orgCaseCode"/>
                        <div v-if="!editFlag">{{form.orgCaseCode}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="落款单位：" prop='departmentCode'>
                        <el-input placeholder="请填写落款单位" v-if="editFlag" v-model="form.inscribedUnit"/>
                        <div v-if="!editFlag">{{form.inscribedUnit}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="上级(复议)业务单位：" prop="parantBusManage">
                        <el-input placeholder="请填上级业务主管单位" v-if="editFlag" v-model="form.parantBusManage"/>
                        <div v-if="!editFlag"></div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="上级(复议)行政单位：" prop="parentAdminManage">
                        <el-input placeholder="请填上级行政主管单位" v-if="editFlag" v-model="form.parentAdminManage"/>
                        <div v-if="!editFlag">{{form.parentAdminManage}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="行政诉讼法院：">
                        <el-input placeholder="请填写行政诉讼法院" v-if="editFlag" v-model="form.adminLawsuitCourt"/>
                        <div v-if="!editFlag">{{form.adminLawsuitCourt}}</div>
                    </el-form-item>
                </el-col>

            </el-row>
            <div class="wrop-do" v-if="editFlag">
                <el-button @click="initPage('ruleForm')" size="medium" type="info"><i
                        class="lj_font icon_quxiaofanhui"></i>取 消
                </el-button>
                <el-button @click="submitForm('ruleForm')" size="medium" type="primary"><i
                        class="lj_font icon_baocun"></i>确 定
                </el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
    import {apiCommonGetArea, apiOrgGet, apiOrgUpdate} from "../../../../api/system";

    export default {
        name: 'edit',
        props: ['id'],

        data() {

            return {
                selectedOptions: [],
                editFlag: false,
                areaFlag: false,
                form: {},
                provinceOptions: [{
                    areaId: this.$store.state.user.areaId,
                    areaName: this.$store.state.user.areaName,
                    children: []
                }],
                area: [],
                dynamicValidateForm: {
                    domains: [
                        {value: ''}
                    ],
                    email: ''
                },
                rules: {

                    orgName: [
                        {required: true, message: '请输入部门名称', trigger: 'blur'},
                    ],
                    orgNumber: [
                        {required: true, message: '请输入部门编号', trigger: 'blur'},
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
            initPage() {
                this.areaFlag = false
                this.selectedOptions = [];
                this.editFlag = false;
                apiOrgGet(this.id).then(res => {
                    this.form = res.data
                })
            },
            showRole() {
                let json = {id: this.id, orgName: this.form.orgName};
                this.$emit('showRole', json)
            },
            delThis() {
                this.$emit('del', this.form)
            },
            addThis() {
                this.$emit('add', this.form)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.areaFlag) {
                            let x = {children: JSON.parse(JSON.stringify(this.provinceOptions))};
                            for (let i = 0; i < this.selectedOptions.length; i++) {
                                x = x.children.find(s => {
                                    return s.areaId == this.selectedOptions[i]
                                })
                            }
                            this.form.areaCode = x.areaId;
                            this.form.areaName = x.areaName;
                        }
                        apiOrgUpdate(this.form).then(res => {
                            this.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                            this.initPage()
                        })
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
        created() {

        },
        watch: {
            'id'(newVal, oldVal) {
                this.initPage()
            },

        },
    }
</script>
<style lang='less' scoped>
    @borderColor: #ccc;
    .button-block {
        padding: 5px 0 15px 0;
        text-align: right;
    }

    .alert_wrop {
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

    table {
        .gridTable;

    }

    .tab-wrop {
        width: 100%
    }

    .icon-div {
        float: right;
        color: #00c1de
    }

    ;
    .alert_wrop {
        text-align: center
    }
</style>



/**
* 人事管理组件
* @module 系统
* @desc 添加修改
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <div>
        <el-dialog :close-on-click-modal='false' :title="title" :visible="show" @close="closeDialog" center top="50px"
                   width="750px">

            <el-form :model="form" :rules="rules" label-width="110px" ref="ruleForm" size="medium" status-icon>
                <table>
                    <tr>
                        <td>
                            人员信息
                        </td>
                    </tr>
                    <tr>
                    </tr>
                </table>
                <el-row>
                    <el-col :span="24">

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名：" prop="fullName">
                            <el-input placeholder="请输入姓名" v-model="form.fullName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="照片：" prop="picture">
                            <el-upload
                                    :action="uploadUserApi"
                                    :before-upload="beforeUploadFile"
                                    :data="uploadData()"
                                    :headers="{token:$store.state.token}"
                                    :on-success="onSuccess"
                                    :show-file-list="false"
                                    accept="image/*"
                                    class="avatar-uploader"
                                    multiple
                                    name="file">
                                <img :src="openUrl" class="avatar" v-if="openUrl">
                                <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号：" prop="idCard">
                            <el-input placeholder="请输入18位身份证号" v-model="form.idCard"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出生日期：" prop="birthDay">
                            <el-date-picker placeholder="选择出生日期" type="date" v-model="form.birthDay"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别：" prop="nation">
                            <el-radio label="1" v-model="form.nation">男</el-radio>
                            <el-radio label="0" v-model="form.nation">女</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号：" prop="mobile">
                            <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="学历：" prop="education">
                            <!-- <el-input placeholder="请输入学历" v-model="form.education"></el-input> -->
                            <el-select class="selectwidth" filterable placeholder="请选择学历" v-model="form.education">
                                <el-option :key="item.dictValue" :label="item.dictName" :value="item.dictValue"
                                           v-for="item in educationArr"/>
                            </el-select>
                        </el-form-item>
                    </el-col>


                    <el-col :span="12">
                        <el-form-item label="政治面貌：" prop="political">
                            <el-select class="selectwidth" filterable placeholder="请选择政治面貌" v-model="form.political">
                                <el-option :key="item.dictValue" :label="item.dictName" :value="item.dictValue"
                                           v-for="item in politicalFaceArr"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="家庭地址：" prop="homeAddress">
                            <el-input placeholder="请输入家庭地址" v-model="form.homeAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-divider content-position="left">职务信息</el-divider>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职位：" prop="postition">
                            <el-select @change="postitionChange" class="selectwidth" filterable placeholder="请选择职位"
                                       v-model="form.postition">
                                <el-option :key="item.dictValue" :label="item.dictName" :value="item.dictValue"
                                           v-for="item in jobTypeArr"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="领导职务：" prop="leadPost">
                            <el-select class="selectwidth" filterable placeholder="请选择领导职务" v-model="form.leadPost">
                                <el-option :key="item.dictValue" :label="item.dictName" :value="item.dictValue"
                                           v-for="item in leadershipArr"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工作部门：" prop="workOrgan">
                            <el-select v-model="form.workOrgan" placeholder="请选择部门"  class="marginleft divwidth">
                                <el-option
                                    v-for="item in collarOrgList"
                                    :key="item.orgId"
                                    :label="item.orgName"
                                    :value="item.orgId"
                                    >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="人员状态：" prop="status">
                            <el-select class="selectwidth" filterable placeholder="请选择人员状态" v-model="form.status">
                                <el-option :key="item.dictValue" :label="item.dictName" :value="item.dictValue"
                                           v-for="item in statusArr"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公务员职级：" prop="normalPost">
                            <el-select class="selectwidth" filterable placeholder="请选择公务员职级" v-model="form.normalPost">
                                <el-option :key="item.dictValue" :label="item.dictName" :value="item.dictValue"
                                           v-for="item in normalPostList"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="级别：" prop="rank">
                            <el-select class="selectwidth" filterable placeholder="请选择级别" v-model="form.rank">
                                <el-option :key="item.dictValue" :label="item.dictName" :value="item.dictValue"
                                           v-for="item in positionArr"/>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="工作称谓：" prop="jobTitle">
                            <el-select class="selectwidth" filterable placeholder="请选择级别" v-model="form.jobTitle">
                                <el-option :key="item.dictValue" :label="item.dictName" :value="item.dictValue"
                                           v-for="item in jobtitlesArr"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工号：" prop="jobNo">
                            <el-input placeholder="请输入工号" v-model="form.jobNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="入职日期：" prop="beginWorkDay">
                            <el-date-picker placeholder="请选择入职日期" type="date"
                                            v-model="form.beginWorkDay"></el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="人事部门：" prop="">
                            <el-input placeholder="请输入人事部门" v-model="form.hrOrgan"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工作电话：" prop="workTel">
                            <el-input placeholder="请输入工作电话" v-model.number="form.workTel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="家庭电话：" prop="homeTel">
                            <el-input placeholder="请输入家庭电话" v-model="form.homeTel"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="是否启用：" prop="isDisable">
                            <el-switch :active-value="1" :inactive-value="0" v-model="form.isDisable"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-form>
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
    import {
        apiCommonDictionAry,
        apiOrgSearch,
        apiUserAdd,
        apiUserCheck,
        apiUserUpdate,
        seeImgApi,
        uploadUserApi,
    } from "../../../api/system";
    import {formatDate} from "../../../until/wordBook";
    import {checkPhone} from '../../../until/rules';
    import {getTree} from "../../../until/menuList";
    import md5 from 'js-md5'

    export default {
        name: 'edit',
        props: {
            data: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: 'normal'
            },
            type: {
                type: String,
                default: ''
            },
        },
        data() {
            let checkWorkOrg = (rule, value, callback) => {
                if (value.length > 0) {
                    callback();
                } else {
                    return callback(new Error('请选择工作部门'))
                }
            };
            let checkIdNumR = (rule, value, callback) => {
                const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                if (!value) {
                    return callback(new Error('证件号码不能为空'))
                } else if (!reg.test(value)) {
                    return callback(new Error('证件号码格式不正确'))
                } else if (this.type == 2) {
                    apiUserCheck(value).then(res => {
                        if (res.checkSize > 0) {
                            return callback(new Error('证件号已存在'));
                        } else {
                            let x = value.substr(value.length - 2, 1);
                            if ((x % 2 == 0)) {
                                this.form.nation = '0'
                            } else {
                                this.form.nation = '1'
                            }
                            if (value.length == 18) {
                                let day = value.substr(6, 4) + '/' + value.substr(10, 2) + '/' + value.substr(12, 2);
                                // this.form.birthDay = (new Date(day + ' 00:00:00')).getTime()
                            }
                            callback();
                        }
                    })
                } else {
                    let x = value.substr(value.length - 2, 1);
                    if ((x % 2 == 0)) {
                        this.form.nation = '0'
                    } else {
                        this.form.nation = '1'
                    }
                    if (value.length == 18) {
                        let day = value.substr(6, 4) + '/' + value.substr(10, 2) + '/' + value.substr(12, 2);
                        // this.form.birthDay = (new Date(day + ' 00:00:00')).getTime()
                    }

                    callback()
                }
            };
            return {
                aaa: '',
                jobtitlesArr: [],
                collarOrgList:[],
                openUrl: '',
                jobTypeArr: [],
                leadershipArr: [],
                orgList: [],
                normalPostList: [],
                politicalFaceArr: [],
                positionArr: [],//职位
                statusArr: [
                    {
                        value: '0',
                        label: '离职'
                    },
                    {
                        value: '1',
                        label: '在职'
                    }
                ],//人员状态
                educationArr: [],//教育程度
                form: {},
                sexArr: [
                    {
                        value: 0,
                        label: '男'
                    },
                    {
                        value: 1,
                        label: '女'
                    }
                ],
                uploadUserApi: uploadUserApi,
                rules: {
                    fullName: [
                        {required: true, message: '请输入全名', trigger: 'blur'},
                        {min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur'}
                    ],
                    loginCount: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    loginPwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    idCard: [
                        {required: true, validator: checkIdNumR, trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, validator: checkPhone, trigger: 'blur'}
                    ],
                    nation: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    political: [
                        {required: true, message: '请输入政治面貌', trigger: 'blur'},
                        {min: 2, message: '至少2个以上字符', trigger: 'blur'}
                    ],

                    postition: [
                        {required: true, message: '请输入职位', trigger: 'blur'},
                        {min: 2, message: '至少2个以上字符', trigger: 'blur'}
                    ],
                    leadPost: [
                        {required: true, message: '请输入领导职务', trigger: 'blur'},
                        {min: 2, message: '至少2个以上字符', trigger: 'blur'}
                    ],
                    workOrgan: [
                        {required: true, message: '请选择工作部门', trigger: 'blur'},
                    ],
                    education: [
                        {required: true, message: '请选择学历', trigger: 'change'},
                    ],
                    workOrgan: [
                        // {validator: checkWorkOrg, trigger: 'blur'},
                        {required: true, message: '请选择工作部门', trigger: 'blur'},
                    ],
                    hrOrgan: [
                        {required: true, message: '请输入人事部门', trigger: 'blur'},
                        {min: 2, message: '至少2个以上字符', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请输入人员状态', trigger: 'blur'},

                    ],
                    birthDay: [
                        {required: true, message: '请选择日期', trigger: 'blur'}
                    ],
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
            onSuccess(data) {
                this.$message({
                    type: 'success',
                    message: '上传成功!'
                });
                this.form.picture = data.resMap['上传成功fileId']
                this.openUrl = seeImgApi + this.form.picture
            },
            beforeUploadFile() {
            },
            uploadData() {
                if (this.type) {
                    let message = {};
                    let keyStr = 'longjin2019shanghai';
                    let json = {
                        caseType: 'pic',
                    };
                    message.jsonstr = JSON.stringify(json);
                    message.timestamp = Date.parse(new Date()).toString();
                    message.webToken = md5(JSON.stringify(json) + keyStr);
                    message.requestUrlId = this.$route.meta.urlId;
                    return message
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.birthDay = Date.parse(this.form.birthDay);
                        this.form.beginWorkDay = Date.parse(this.form.beginWorkDay);
                        if (this.type == 2) {
                            console.log(this.form)
                            //添加
                            apiUserAdd(this.form).then(res => {
                                this.$emit("getList")
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.closeDialog();
                            })
                        } else if (this.type == 1) {
                            //编辑
                            apiUserUpdate(this.form).then(() => {
                                this.$emit("getList")
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                this.closeDialog();
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
                 //部门
                apiOrgSearch(this.form).then(res => {
                    this.collarOrgList = res.data;
                });
                if (this.data) {
                    this.data.birthDay = this.data.birthDay == '' ? "" : (formatDate(Number(this.data.birthDay), 'yyyy-MM-dd') == 'NaN-aN-aN' ? '' : formatDate(Number(this.data.birthDay), 'yyyy-MM-dd'))
                    this.data.beginWorkDay = this.data.beginWorkDay == '' ? "" : (formatDate(Number(this.data.beginWorkDay), 'yyyy-MM-dd') == 'NaN-aN-aN' ? '' : formatDate(Number(this.data.beginWorkDay), 'yyyy-MM-dd'))

                    this.form = this.data;
                    this.openUrl = this.form.picture ? (seeImgApi + this.form.picture) : null;
                } else {

                    this.form = {

                        // isDisable:1
                    };
                }
            },
            postitionChange() {
                apiCommonDictionAry(this.form.postition).then(res => {
                    let arr = res.dicList;
                    this.normalPostList = arr
                });
            },
            getEducation() {
                this.$until.workBookApi('educationLevel').then(res => {
                    this.educationArr = res
                });
                this.$until.workBookApi('leadershipPositions').then(res => {
                    this.leadershipArr = res
                });
                this.$until.workBookApi('jobtitle').then(res => {
                    this.jobtitlesArr = res
                });
                this.$until.workBookApi('jobType').then(res => {
                    this.jobTypeArr = res
                });
                this.$until.workBookApi('userStatus').then(res => {
                    this.statusArr = res
                });
                this.$until.workBookApi('politicalFace').then(res => {
                    this.politicalFaceArr = res
                });
                this.$until.workBookApi('civilServantRanks').then(res => {
                    this.positionArr = res
                });
            },

        },
        //监听，如果show为true,则执行initPage()
        watch: {
            'show'(value) {
                if (value) {
                    this.openUrl = null;
                    this.initPage();
                    this.$nextTick(() => {
                        this.$refs.ruleForm.clearValidate();
                    })
                }
            }
        },
        created() {
            this.getEducation()
            apiOrgSearch().then(res => {
                this.orgList = getTree(res.data, 'orgId', 'parentCode', 'isParent', true)

            })
        },
        mounted() {

        }


    }
</script>
<style lang='less' scoped>
    .alert_wrop {
        padding: 10px;
        display: flex;
        justify-content: space-between;

    }

    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader /deep/ .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .selectwidth {
        width: 100%
    }
</style>



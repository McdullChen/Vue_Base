/**
* 人事管理组件
* @module 系统
* @desc 查看
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <div>
        <el-dialog :close-on-click-modal='false' :title="title" :visible="show" @close="closeDialog" center top="50px"
                   width="750px">
            <table class="gridTable">
                <tr>
                    <td class="basic-td" colspan="12">
                        <b>基本信息</b>
                    </td>
                </tr>
                <tr>
                    <td class="name-td">姓名</td>
                    <td>{{form.fullName}}</td>
                    <td>出生日期</td>
                    <td>{{form.birthDay | formatDate}}</td>
                    <td align="center" class="for-td" rowspan="3">
                        <div class="wrop-div">
                            <img :src="pictureUrl" class="img-css" v-if="pictureUrl">
                            <div class="img-div"
                                 v-if="!pictureUrl">
                                <i class="el-icon-picture icon-css"></i>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>身份证号</td>
                    <td>{{form.idCard}}</td>
                    <td>手机号</td>
                    <td>{{form.mobile}}</td>
                </tr>
                <tr>
                    <td>性别</td>
                    <td>
                        {{form.nation == 1?'男':'女'}}
                    </td>
                    <td>家庭地址</td>
                    <td>
                        {{form.homeAddress}}
                    </td>
                </tr>
                <tr>
                    <td>政治面貌</td>
                    <td>{{filt(politicalFaceArr,form.political)}}</td>
                    <td>学历</td>
                    <td colspan="2">{{filt(educationArr,form.education)}}</td>
                </tr>
                <tr>
                    <td class="work-td" colspan="5">
                        <b>工作信息</b>
                    </td>
                </tr>
                <tr>
                    <td>职位</td>
                    <td>{{filt(jobTypeArr,form.postition)}}</td>
                    <td>领导职务</td>
                    <td colspan="2">{{filt(leadershipArr,form.leadPost)}}</td>
                </tr>
                <tr>
                    <td>公务员职级</td>
                    <td>{{filt(normalPostList,form.normalPost)}}</td>
                    <td>级别</td>
                    <td colspan="2">{{filt(positionArr,form.rank)}}</td>
                </tr>
                <tr>
                    <td>工作称谓</td>
                    <td>{{filt(jobtitlesArr,form.jobTitle)}}</td>
                    <td>工号</td>
                    <td colspan="2">{{form.jobNo}}</td>
                </tr>
                <tr>
                    <td>入职日期</td>
                    <td>{{form.beginWorkDay | formatDate}}</td>
                    <td>工作部门</td>
                    <td colspan="2">{{form.workOrganName}}</td>
                </tr>
                <tr>
                    <td>人事部门</td>
                    <td>{{form.hrOrgan}}</td>
                    <td>工作电话</td>
                    <td colspan="2">{{form.workTel}}</td>
                </tr>
                <tr>
                    <td>家庭电话</td>
                    <td>{{form.homeTel}}</td>
                    <td>人员状态</td>
                    <td colspan="2">{{filt(statusArr,form.status)}}</td>
                </tr>
                <tr>
                    <td>是否启用</td>
                    <td>{{form.isDisable==1?'启用':'禁用'}}</td>
                    <td></td>
                    <td colspan="2"></td>
                </tr>
            </table>

            <span class="dialog-footer" slot="footer">
                <el-button @click="closeDialog" size="small" type="info"><i
                        class="lj_font icon_quxiaofanhui"></i>关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {apiUserGet,seeImgApi} from "../../../api/system";
    import {formatDate} from "../../../until/wordBook";

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
            return {
                activeName: 'first',
                form: {},
                pictureUrl: '',
                loading: true,
                educationArr: [],
                leadershipArr: [],
                jobtitlesArr: [],
                jobTypeArr: [],
                statusArr: [],
                normalPostList: [],
                politicalFaceArr: [],
                positionArr: []
            }
        },
        methods: {
            closeDialog() {
                this.$emit('update:show', false)
            },
            filt(arr, value) {
                if (arr.find(i => {
                    return i.dictValue === value
                })) {
                    return arr.find(i => {
                        return i.dictValue == value
                    }).dictName
                } else {
                    return value
                }
            },
            //弹框弹出时获取data给form
            initPage() {
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

                apiUserGet(this.type).then(res => {
                    this.pictureUrl = this.form.picture ? (seeImgApi + this.form.picture) : null
                    this.loading = false;
                    this.$until.workBookApi(this.form.postition).then(res => {
                        this.normalPostList = res;

                    });
                    this.form = res.data;

                    console.log(this.form)

                })
            },

        },
        filters: {
            formatDate(val) {
                return formatDate(val, 'yyyy-MM-dd')
            },

        },
        //监听，如果show为true,则执行initPage()
        watch: {
            'show'(value) {
                if (value) {
                    this.activeName = 'first';
                    this.form = {};
                    this.loading = true;
                    this.initPage();
                }
            }
        },
    }
</script>
<style lang='less' scoped>
    .alert_wrop {
        padding: 10px;
        display: flex;
        justify-content: space-between;

    }

    .selectwidth {
        width: 100%
    }

    table {
        .gridTable;
    }

    .basic-td {
        background: #e5e7f8
    }

    .name-td {
        width: 80px
    }

    .for-td {
        max-width: 120px;

        .wrop-div {
            width: 100px;
            height: 100px;

            .img-css {
                width: 100px;
                height: 100px
            }

            .img-div {
                display: flex;
                width: 100px;
                height: 100px;;
                border-radius: 8px;
                border: 1px solid #cccccc;

                .icon-css {
                    font-size: 50px;
                    margin: auto;
                    color: #cccccc
                }
            }
        }
    }

    .work-td {
        background: #e5e7f8
    }
</style>



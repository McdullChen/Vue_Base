/**
* 人事管理组件
* @module 系统
* @desc 列表
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <div>
        <div class="wrop-search">
            <lj-search-from :onAdd="onAdd" :onDel="buttonCheck('batchdel')?onDel:''" :searchObj="searchObj"
                            @searchList="searchList"/>
        </div>
        <!-- 表格 -->
        <el-table :data="list" :header-cell-style="{background:'#e9eff8'}" @row-click="seeFunction"
                  @selection-change="handleSelectionChange" border
                  size="mini">
            <el-table-column
                    type="selection"
                    width="40">
            </el-table-column>
            <el-table-column align="center" label="用户名" prop="fullName" width="80"/>
            <!--            <el-table-column align="center" label="登录名" prop="loginName"/>-->
            <el-table-column align="center" label="性别" prop="nation" width="50">
                <template slot-scope="scope">
                    {{scope.row.nation | ifsex}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="身份证" prop="idCard"/>
            <el-table-column align="center" label="出生日期" prop="workOrgan">
                <template slot-scope="scope">
                    {{scope.row.birthDay|formatDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="学历" prop="workOrgan">
                <template slot-scope="scope">
                    {{filt(educationLevel,scope.row.education)}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="工作部门" prop="workOrganName">
            </el-table-column>

            <el-table-column align="center" label="人员状态" prop="workOrgan">
                <template slot-scope="scope">
                    {{filt(statusArr,scope.row.status)}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="90">
                <template slot-scope="scope">
                    <el-tooltip :open-delay="500" content="修改" placement="top">
                        <el-link @click.stop="editFunction(scope.$index, scope.row)" icon="el-icon-edit"
                                 type="primary" v-if="buttonCheck('edit')"></el-link>
                    </el-tooltip>
                    <el-tooltip :open-delay="500" content="删除当前项" placement="top">
                        <el-link @click.stop="delateFunction(scope.$index, scope.row)" icon="el-icon-delete" class="btnlink"
                                 type="danger" v-if="buttonCheck('delete')"></el-link>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <lj-pagination :pageNum.sync="form.pageNum" :pageSize.sync="form.pageSize" :total="total"
                       @getData="getList" class="page-css"/>
        <!--查看框-->
        <see-edit :show.sync="seeObj.show" :title="seeObj.title" :type="seeObj.type"/>
        <!-- 编辑&添加弹框 -->
        <change-edit :data='rowdata' :show.sync="editObj.show" :title="editObj.title" :type="editObj.type" 
                     @getList="getAccountList" ref="child"/>
    </div>
</template>

<script>
    import {
        apiAccountSearch,
        apiOrgSearch,
        apiUserDelete,
        apiUSerDeleteBatch,
        apiUserGet,
        apiUserSearch
    } from "../../../api/system";
    import LjPagination from '../../../components/LjPagination'
    import LjSearchFrom from '../../../components/LjSearchForm'
    import {formatDate, IFSEX} from "../../../until/wordBook";
    import changeEdit from "./editadd";
    import {getTree} from "../../../until/menuList";
    import seeEdit from './see'

    let that;
    export default {
        name: "userPage",
        data() {
            return {
                //弹出框数据
                editObj: {
                    show: false,
                    title: '',
                    type: '',
                    editId: null
                },
                seeObj: {
                    show: false,
                    title: '',
                    type: '',
                },
                bindObj: {
                    show: false,
                    loginId: '',
                    list: [],
                    userId: ''
                },
                //搜索组件数据
                searchObj: null,
                educationLevel: [],
                form: {
                    pageSize: 20,
                    pageNum: 1,
                },
                multipleSelection: [],
                total: 0,
                statusArr: [],
                input: '',
                list: [],
                rowdata: {},
                workOrganArr: []
            }
        },
        components: {
            changeEdit, LjPagination, LjSearchFrom, seeEdit
        },


        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //查询+搜索
            getAccountList() {
                apiUserSearch(this.form).then(res => {
                    this.total = res.total;
                    this.list = res.data;
                })
            },
            remoteMethod() {
            },
            onDel() {

                this.$confirm('此操作将删除' + this.multipleSelection.length + '条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let arr = [];
                    this.multipleSelection.forEach(i => {
                        arr.push(i.userId)
                    });
                    apiUSerDeleteBatch({userIds: arr.join(',')}).then(() => {
                        this.getAccountList();
                        this.$message({
                            type: 'success',
                            message: '批量删除成功!'
                        });
                    })

                });

            },
            seeFunction(data) {
                this.seeObj.type = data.userId;
                this.seeObj.title = '人员-' + data.fullName + "详细信息";
                this.seeObj.show = true;
            },
            //新增账号
            onAdd() {
                this.editObj.type = '2';
                this.editObj.title = '新增人员';
                this.rowdata = {
                    beginWorkDay: "",
                    birthDay: "",
                    education: "",
                    fullName: "",
                    homeAddress: "",
                    homeTel: "",
                    hrOrgan: "",
                    idCard: "",
                    isDisable: 0,
                    jobNo: "",
                    jobTitle: "",
                    leadPost: "",
                    mobile: "",
                    nation: "",
                    normalPost: "",
                    picture: "",
                    political: "",
                    postition: "",
                    rank: "",
                    status: ''
                };

                this.editObj.show = true;
            },

            //编辑
            editFunction(index, row) {
                apiUserGet(row.userId).then(res => {
                    // res.data.sex = String(res.data.sex);
                    this.rowdata = res.data;
                    this.editObj.title = '修改';
                    this.editObj.editId = row.loginId;
                    this.editObj.type = '1';
                    this.editObj.show = true;
                    this.getAccountList();

                })
                //根据id查询

            },

            //删除按钮事件
            delateFunction(index, data) {
                this.$confirm('此操作将删除条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiUserDelete(data.userId).then(res => {
                        this.getAccountList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
            },

            //搜索
            searchList(data) {  //data就是接收的this.form数据
                data.pageSize = this.form.pageSize;
                this.form.pageNum = 1;
                apiUserSearch(data).then(res => {
                    this.list = res.data;
                    this.total = res.total;
                })

            },
            getList() {
                apiOrgSearch().then(res => {
                    let arr = getTree(res.data, 'orgId', 'parentCode', 'isParent');
                    this.workOrganArr = arr;
                })
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
            initPage() {
                this.$until.workBookApi('jobType').then(res => {
                    this.jobType = res
                });

                this.$until.workBookApi('userStatus').then(res => {
                    this.statusArr = res
                });
                this.$until.workBookApi('educationLevel').then(res => {
                    this.educationLevel = res
                });
                this.getList();
                this.getAccountList();
                apiAccountSearch({pageNum: 1, pageSize: 1000}).then(res => {
                    this.bindObj.list = res.data
                })
            }
        },
        beforeCreate: function () {
            that = this;
        },
        filters: {
            ifsex(val) {
                return IFSEX[val]
            },
            formatDate(value) {
                return formatDate(value, 'yyyy-MM-dd')
            },
            workOrgan(value) {
                if (that.workOrganArr.find(i => {
                    return i.orgId == value
                })) {
                    return that.workOrganArr.find(i => {
                        return i.orgId == value
                    }).orgName
                }
            },
        },
        computed: {},
        mounted() {
            this.getList()
        },

        created() {
            this.initPage()

        },
    }
</script>

<style scoped>
    .wrop-search {
        margin-bottom: 10px
    }

    .btnlink {
        margin-left: 10px
    }

    .page-css {
        margin-top: 10px
    }
  
</style>

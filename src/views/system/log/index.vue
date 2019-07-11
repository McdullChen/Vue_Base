/**
* 系统-操作日志组件
* @module 系统
* @desc 列表
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <div>
        <div class="wrop-search">
            <lj-search-from :searchObj="searchObj" @searchList="searchList"/>
        </div>
        <!-- 表格 -->
        <el-table :data="list" :header-cell-style="{background:'#e9eff8'}" :row-style="{cursor:'pointer'}"
                  @row-click="seeFunction" border size="mini" v-loading="loading">
            <el-table-column align="center" label="操作用户" prop="userName" width="80"/>
            <el-table-column align="center" label="操作ID" prop="logId" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="操作IP" prop="operationIp" width="120"/>
            <el-table-column align="center" label="操作类型" prop="operationType" width="100"/>
            <el-table-column align="center" label="菜单名称" prop="resName" show-overflow-tooltip/>
            <el-table-column align="center" label="操作时间" prop="operationTime" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.operationTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="保存时间" prop="saveTime" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.saveTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="50">
                <template slot-scope="scope">
                    <el-tooltip class="item" content="查看修改内容" effect="dark" placement="top-end">
                        <el-link @click.stop="seeFunction(scope.row)" class="el-icon-view btn-link"
                                 type="success"><i></i></el-link>
                    </el-tooltip>
                </template>
            </el-table-column>

        </el-table>

        <lj-pagination :pageNum.sync="form.pageNum" :pageSize.sync="form.pageSize" :total="total"
                       @getData="getAccountList" class="page-css"/>
        <!-- 查看 -->
        <see-content :show.sync="seeObj.show" :title="seeObj.title" :type="seeObj.editId"/>
    </div>
</template>

<script>
    import {apiLogSearch} from "../../../api/system";
    import LjPagination from '../../../components/LjPagination'
    import LjSearchFrom from '../../../components/LjSearchForm'
    import seeContent from './components/seecontent'
    import {formatDate, IFSEX} from "../../../until/wordBook";

    export default {
        name: "logPage",
        data() {
            return {
                loading: true,
                //弹出框数据
                editObj: {
                    show: false,
                    title: '',
                    type: '',
                    editId: null
                },
                //查看数据
                seeObj: {
                    show: false,
                    title: '',
                    editId: null
                },

                //搜索组件数据
                searchObj: [
                    {type: 'input', name: 'userName', label: '用户名'},
                    {type: 'input', name: 'resName', label: '菜单名称 '},
                    {type: 'input', name: 'operationType', label: '操作类型'},
                    {
                        type: 'date',
                        dateType: 'daterange',
                        name: 'timeRange',
                        name1: 'startTime',
                        name2: 'endTime',
                        options: [],
                        label: '操作时间',
                        span: 12
                    },
                ],
                form: {
                    pageSize: 10,
                    pageNum: 1,
                },
                total: 0,
                input: '',
                list: [],
                rowdata: {}
            }
        },
        components: {
            LjPagination, LjSearchFrom, seeContent
        },
        methods: {
            //查询+搜索
            getAccountList() {
                // this.loading = true;
                apiLogSearch(this.form).then(res => {
                    this.total = res.total;
                    this.list = res.data;
                    this.loading = false;
                })
            },
            //查看
            seeFunction(row) {
                this.seeObj.show = true;
                this.seeObj.title = '查看修改信息';
                this.seeObj.editId = row.logId;
            },

            //搜索
            searchList(data) {  //data就是接收的this.form数据

                this.loading = true;
                data.pageSize = this.form.pageSize;
                // this.form = data;
                this.form.pageNum = 1;
                apiLogSearch(data).then(res => {
                    this.list = res.data;
                    this.total = res.total;
                    this.loading = false;

                })

            },

        },
        filters: {
            ifsex(val) {
                return IFSEX[val]
            },
            formatDate(value) {
                return formatDate(value, 'yyyy-MM-dd hh:mm:ss')
            },
            offereeType(val) {
                return val == 1 ? '自然人' : (val == 2 ? '法人' : (val == 3 ? '个体户' : '无'))
            }

        },
        computed: {},
        mounted() {

        },

        created() {
            this.getAccountList();
        },
    }
</script>

<style scoped>
    .wrop-search {
        margin-bottom: 10px
    }

    .btn-link {
        margin: 0 10px
    }

    .page-css {
        margin-top: 10px
    }
</style>


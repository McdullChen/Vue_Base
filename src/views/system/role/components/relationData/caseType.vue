/**
* 系统-权限管理组件
* @module 系统
* @desc 列表
* @author 王伟
* @date 2019-6-4
**/
<template>
    <div>
        <div class="wrop">
            <el-input
                    @keyup.enter.native="onSearch"
                    placeholder="输入关键字搜索"
                    size="mini"
                    v-model="search"/>
        </div>

        <el-table :data="list" :header-cell-style="{background:'#e9eff8'}" @selection-change="handleSelectionChange"
                  border ref="multipleTable"
                  rowKey="userId" size="mini">
            <el-table-column
                    reserve-selection
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column align="center" label="用户名" prop="fullName"/>
            <el-table-column align="center" label="性别" prop="sex">
                <template slot-scope="scope">
                    {{scope.row.sex | ifsex}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="地址" prop="address"/>
            <el-table-column align="center" label="手机号" prop="phoneNumber"/>
        </el-table>
        <div @click="nextList()" class="download-more"
             v-if="pageShow">加载更多
        </div>
    </div>
</template>

<script>
    import {apiRoleSearchCaseType} from "../../../../../api/system";
    import iPagination from '../../../../../components/LjPagination'

    export default {
        name: "tableRelation",
        props: ["roleId"],
        data() {
            return {
                list: [],
                total: 0,
                search: '',
                pageNum: 1,
                selected: [],
                pageSize: 20
            }
        },
        computed: {
            pageShow() {
                return this.pageNum < this.total / this.pageSize
            }
        },
        methods: {
            getList() {
                apiRoleSearchCaseType({
                    roleId: this.roleId,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    keyWord: this.search
                }).then(res => {
                    this.list = res.data;
                    this.total = res.total;
                    res.data.forEach(i => {
                        if (i.roleId === this.roleId) {
                            this.selected.push(i);
                            this.$emit('selected', this.selected);
                            this.$refs.multipleTable.toggleRowSelection(i)
                        }
                    });
                })
            },
            nextList() {
                this.pageNum++;
                apiRoleGetUsers({
                    roleId: this.roleId,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    keyWord: this.search
                }).then(res => {
                    res.data.forEach(i => {
                        if (i.roleId === this.roleId) {
                            this.selected.push(i);
                            this.$emit('selected', this.selected);
                            this.$refs.multipleTable.toggleRowSelection(i)
                        }
                    });
                    this.list = this.list.concat(res.data);
                    this.total = res.total
                })
            },
            handleSelectionChange(val) {
                this.selected = val;
                this.$emit('selected', val)
            },
            onSearch() {
                this.pageNum = 1;
                this.getList()
            }
        },
        created() {
            this.getList()
        },
        components: {iPagination}
    }
</script>

<style scoped>
    .wrop {
        padding: 10px
    }

    .download-more {
        padding: 10px;
        text-align: center;
        color: #6d8eff;
        text-decoration: underline;
        cursor: pointer
    }

</style>

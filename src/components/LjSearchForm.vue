<!--*
*searchForm
* @module
* @desc 条件搜索组件
* @author WangWei
* @date 2019/6/5
* @param {Object} [searchObj]    - 搜索字段及类型对象
* @param {Function} [onAdd] - 添加方法
* @param {Function} [onExport] - 导出方法
* @param {Function} [onImport] - 导入方法
* @param {Function} [onDel] - 批量删除方法
* @param {Function} [onCreate] - 当月数据方法
*-->

<template>
    <div>
        <div class="clear-float" style="margin-bottom:10px">
            <el-input placeholder="请输入查询条件" style="width:200px" v-if="!searchFlag" v-model="form.keyWord"></el-input>
            <el-button @click="searchList" icon="el-icon-search" style="margin-left: 5px" type="primary"
                       v-if="!searchFlag">搜索
            </el-button>
            <div class="right-box">
                <el-button @click="searchFlag= !searchFlag" size="small" type="text" v-if="searchObj">
                    筛选更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-button @click="onCreate" icon="el-icon-refresh" plain type="success" v-if="onCreate">生成当月检查数据
                </el-button>
                <el-button @click="onDel" icon="el-icon-delete" plain type="danger" v-if="onDel">批量删除</el-button>
                <el-button @click="toVoid" icon="el-icon-folder-delete" plain type="warning" v-if="toVoid">作废</el-button>
                <el-button @click="onAdd" icon="el-icon-plus" plain type="primary" v-if="onAdd">新增</el-button>
                <el-button @click="onExport" icon="el-icon-sort-down" plain type="primary" v-if="onExport">导出
                </el-button>
                <el-button @click="onImport" icon="el-icon-sort-up" plain type="primary" v-if="onImport">批量导入
                </el-button>
            </div>
        </div>
        <transition name="el-zoom-in-top">
            <el-form class="search-box" label-width="100px" ref="form" size="mini" style="padding-bottom: 10px"
                     v-show="searchFlag">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="关键字：">
                            <el-input placeholder="请输入查询条件" v-if="searchFlag" v-model="form.keyWord"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :key="data.name" :span="data.span ? data.span : 8" v-for="data in searchObj">
                        <el-form-item :label="data.label+'：'">
                            <el-input v-if="data.type === 'input'" v-model="form[data.name]"/>
                            <el-select v-if="data.type === 'select'" v-model="form[data.name]">
                                <el-option label="全部" value=""/>
                                <el-option :key="option.value" :label="option.label" :value="option.value"
                                           v-for="option in  data.options"/>
                            </el-select>
                            <el-date-picker
                                    :type="data.dateType"
                                    end-placeholder="结束日期"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    v-if="data.type === 'date'"
                                    v-model="form[data.name]"
                                    value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <div style="text-align: center">
                            <el-button @click="refreshList" icon="el-icon-refresh" v-if="searchFlag">重置
                            </el-button>
                            <el-button @click="searchList" icon="el-icon-search" type="primary" v-if="searchFlag">搜索
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "searchForm",
        props: ['searchObj', 'onAdd', 'onExport', 'onImport', 'onDel', 'onCreate','toVoid'],
        data() {
            let form = {pageSize: 20, pageNum: 1, keyWord: ''};
            for (let k in this.searchObj) {
                if (this.searchObj[k].name === 'timeRange') {
                    form[this.searchObj[k].name] = [];
                    form[this.searchObj[k].name1] = '';
                    form[this.searchObj[k].name2] = '';
                } else {
                    form[this.searchObj[k].name] = ''
                }
            }
            return {
                searchFlag: false,
                searchKey: '',
                form: form,
            }
        },
        methods: {
            refreshList(){

                for (let k in this.form) {
                    this.form[k]=''
                }
            },
            searchList() {
                for (let k in this.searchObj) {
                    if (this.searchObj[k].name === 'timeRange') {
                        this.form[this.searchObj[k].name1] = this.form[this.searchObj[k].name][0];
                        this.form[this.searchObj[k].name2] = this.form[this.searchObj[k].name][1];
                    }
                }
                this.form.pageNum = 1;
                this.$emit('searchList', this.form)
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/ .el-form-item__label {
        text-align: left;
        color: #888;
    }

    .search-box {
        border-top: 1px solid #d8d8d8;
        border-bottom: 1px solid #f8f8f8;
        padding-top: 18px;
    }

    .clear-float:after {
        content: '';
        display: block;
        clear: both;
    }

    .right-box {
        float: right;
        line-height: 28px;
        color: #409EFF;
        cursor: pointer;
        display: flex;

        .filter-button {
            font-size:  @fontSize +2;
            margin-right: 20px;

            &:hover {
                text-decoration: underline;
            }
        }

    }
</style>

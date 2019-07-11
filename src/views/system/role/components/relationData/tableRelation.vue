<template>
    <div class="table-relation">
        <div class="table-list">
            <el-table :data="list"
                      :header-cell-style="{background:'#e9eff8'}"
                      @current-change="handleCurrentChange"
                      border
                      highlight-current-row
                      ref="singleTable">
                <el-table-column align="center" label="表名" prop="tableName"/>
            </el-table>
        </div>

        <div class="right-box">
            <el-table :data="fileList[tableName]" :header-cell-style="{background:'#e9eff8'}"
                      @selection-change="handleSelectionChange" border
                      ref="tableTable" rowKey="fieldId" size="mini">
                <el-table-column
                        reserve-selection
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column align="center" label="字段名" prop="fieldName"/>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {apiRoleSearchTable, apiTableSearch} from "../../../../../api/system";
    import {IFSEX} from "../../../../../until/wordBook";
    import draggable from 'vuedraggable'

    export default {
        name: "tableRelation",
        props: ["roleId"],
        filters: {
            ifsex(val) {
                return IFSEX[val]
            }
        },
        data() {
            return {
                list: [],
                fileList: {},
                total: 0,
                pageNum: 1,
                pageSize: 20,
                tableName: '',
                selected: []
            }
        },
        created() {
            this.initPage()
        },
        methods: {
            handleCurrentChange(data) {
                this.tableName = data.tableName
            },
            getTableField(data) {
                apiRoleSearchTable({roleId: this.roleId, tableName: data.tableName}).then(res => {
                    this.fileList[data.tableName] = res.data;
                    res.data.forEach(i => {
                        if (i.roleId === this.roleId) {
                            this.selected.push(i);
                            this.$emit('selected', this.selected);
                            this.$refs.tableTable.toggleRowSelection(i)
                        }
                    });
                })
            },
            handleSelectionChange(val) {
                this.selected = val;
                this.$emit('selected', val);
            },
            initPage() {
                this.getTableList()
            },
            getTableList() {
                apiTableSearch({pageSize: this.pageSize, pageNum: this.pageNum}).then(res => {
                    this.list = res.data;
                    res.data.forEach(i => {
                        this.getTableField(i)
                    })
                })
            }
        },
        components: {draggable}
    }
</script>

<style lang="less" scoped>
    .table-relation {
        display: flex;

        .right-box {
            margin: 0;
            flex: 1;
        }

        .table-list {
            width: 200px;
            margin-right: 20px;
        }
    }

    .list-enter, .list-leave-active {
        opacity: 0;
        transform: translate(-30px, 0);
    }

    .list-enter-active, .list-leave-active {
        transition: all 0.5s ease;
    }
</style>

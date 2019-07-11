<!--*
*LjPagination
* @desc 分页组件
* @author WangWei
* @date 2019/6/5
* @param {Number} [pageNum]    - 当前页
* @param {Number} [pageSize] - 单个页面承载数据量
* @param {Number} [total] - 总数
*-->

<template>
    <div class="block">
        <el-pagination
                :current-page="pageNum"
                :page-size="pageSize"
                :total="total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: "pagination",
        props: ['pageNum', 'pageSize', "total"],
        methods: {
            handleSizeChange(value) {
                this.$emit('update:pageNum', 1);//触发使用了sync修饰符的字段的更新
                this.$emit('update:pageSize', value);
                this.$nextTick(() => {
                    this.$emit('getData')
                })
            },
            handleCurrentChange(value) {
                this.$emit('update:pageNum', value);
                this.$nextTick(() => {
                    this.$emit('getData')
                })
            }
        }

    }
</script>

<style lang="less" scoped>
    .block {
        text-align: center;
        margin-top: 10px;
    }
</style>

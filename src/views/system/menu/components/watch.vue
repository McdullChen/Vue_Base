/**
* 系统-菜单组件
* @module 系统
* @desc 查看
* @author 王伟
* @date 2019-6-4
**/
<template>
    <el-dialog :close-on-click-modal='false' :title="data.title" :visible="show" @close="closeDialog" center
               width="500px">
        <el-form :model="data" label-width="100px" ref="data" size="medium">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="名称：">
                        {{data.resName}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="类型：">
                        {{data.resType | MENUTYPEWORD}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                            label="编号：">
                        {{data.resCode}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="序号：">
                        {{data.resOrder}}
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="data.resType == 1">
                    <el-form-item
                            label="图标：">
                        {{data.resStyle}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="路径：" v-if="data.resType !== '3'">
                        {{data.resUrl}}
                    </el-form-item>
                </el-col>
            </el-row>


        </el-form>
        <span class="dialog-footer" slot="footer">
      <el-button @click="closeDialog" size="small" type="info"><i class="lj_font icon_quxiaofanhui"></i>关 闭</el-button>
    </span>
    </el-dialog>
</template>

<script>
    import {MENUTYPEWORD} from "../../../../until/wordBook";

    export default {
        name: "add",
        props: ["data", "show"],
        data() {
            return {};
        },
        filters: {
            MENUTYPEWORD(value) {
                return MENUTYPEWORD[value]
            }
        },
        methods: {
            closeDialog() {
                this.$emit('update:show', false)
            },
        }
    };
</script>

<style scoped></style>

/**
* 系统-菜单管理组件
* @module 系统
* @desc 添加修改
* @author 王伟
* @date 2019-6-4
**/
<template>
    <el-dialog :close-on-click-modal='false' :title="data.title" :visible.sync="data.show" center width="500px">
        <el-form :model="data" label-width="80px" ref="data" size="medium">
            <el-form-item label="名称">
                <el-input placeholder="请输入权籍显示名" v-model="data.resName"/>
            </el-form-item>
            <el-form-item label="权籍类型">
                <el-select placeholder="请选择类型" v-model="data.resType">
                    <el-option
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            v-for="item in menuTypeOptionList"/>
                </el-select>
            </el-form-item>
            <el-form-item label="路径" v-if="data.resType !== '3'">
                <el-input placeholder="请输入权籍相对路径" v-model="data.resUrl">
                    <template slot="prepend"
                    >根路径 /#
                    </template
                    >
                </el-input>
            </el-form-item>
            <el-form-item
                    label="ICON"
                    v-if="data.resType === '1'">
                <el-input v-model="data.resStyle">
                    <template slot="prepend">lj_font</template>
                </el-input>
            </el-form-item>
            <el-form-item
                    label="code">
                <el-input v-model="data.resCode"/>
            </el-form-item>
            <el-form-item label="序号">
                <el-input-number :min="-1" v-model="data.resOrder"/>
            </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">
      <el-button @click="data.show = false" size="small" type="info"><i class="lj_font icon_quxiaofanhui"></i>取 消</el-button>
      <el-button @click="onSubmit" size="small" type="primary"><i class="lj_font icon_baocun"></i>确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
    import {MENUTYPEWORD} from "../../../../until/wordBook";
    import {apiMenuAdd, apiMenuUpdate} from "../../../../api/system";

    let getOptionList = function (optionObj) {
        let optionList = [];
        for (let k in optionObj) {
            optionList.push({label: optionObj[k], value: k});
        }
        return optionList;
    };
    export default {
        name: "add",
        props: ["data"],
        data() {
            return {
                menuTypeOptionList: getOptionList(MENUTYPEWORD)
            };
        },
        methods: {
            onSubmit() {
                this.data.resOrder = this.data.resOrder.toString()
                if (this.data.type === 'edit') {
                    apiMenuUpdate(this.data).then(res => {
                        this.data.show = false;
                        this.$emit('updateData');
                        this.$message({
                            message: '修改更新成功',
                            type: 'success'
                        });
                    })
                } else {
                    apiMenuAdd(this.data).then(res => {
                        this.data.show = false;
                        this.$emit('updateData');
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    })
                }
            }
        }
    };
</script>

<style scoped></style>

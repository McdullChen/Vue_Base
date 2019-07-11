/**
* 系统-系统参数组件
* @module 系统
* @desc 添加&更新
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <div>
        <el-dialog
                :close-on-click-modal="false"
                :title="title"
                :visible="show"
                @close="closeDialog"
                center
                width="650px"
        >
            <el-form :model="form" :rules="rules" label-width="100px" ref="ruleForm" size="medium" v-loading="loading">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="参数key：" :prop="!type?'configKey':''" v-if="!type">
                            <el-input placeholder="参数key必填" v-model="form.configKey"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="参数名称：" prop="configName">
                            <el-input placeholder="请输入参数名称" v-model="form.configName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="参数值 ：" prop="configValue">
                            <el-input placeholder="请输入参数值" v-model="form.configValue"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="是否启用 ：" prop="isDisable">
                            <el-radio-group v-model="form.isDisable ">
                                <el-radio class="radio" label="1">是</el-radio>
                                <el-radio class="radio" label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>

            <span class="dialog-footer" slot="footer">
        <el-button @click="closeDialog" size="small" type="info">
          <i class="lj_font icon_quxiaofanhui"></i>取 消
        </el-button>
        <el-button @click="submitForm('ruleForm')" size="small" type="primary">
          <i class="lj_font icon_baocun"></i>确 定
        </el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
    import {apirunConfigGet, apirunConfigUpdate,apirunConfigAdd} from "../../../../api/system";

    export default {
        name: "edit",
        props: {

            caseProcessList: {
                type: Array,
                default: []
            },
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "编辑"
            },
            type: {
                default: ""
            }
        },

        data() {
            return {
                loading: true,
                form: {
                    configName: '',
                    configKey: "",
                    configValue: "",
                    isDisable: ""
                },

                rules: {
                    configKey: [
                        {required: true, message: '请输入参数key', trigger: 'blur'},
                    ],
                    configName: [
                        {required: true, message: '请输入参数名称', trigger: 'blur'},
                    ],
                    configValue: [
                        {required: true, message: '请输入参数值', trigger: 'blur'},
                    ],
                    isDisable: [
                        {required: true, message: '是否启用', trigger: 'change'},
                    ],
                }
            };
        },
        methods: {
            closeDialog() {
                this.$emit("update:show", false);
            },
            submitForm() {
                this.$refs.ruleForm.validate(valid => {

                    if (valid) {
                        if (this.type) {
                            //编辑
                            this.loading = true;
                            apirunConfigUpdate(this.form).then(res => {
                                this.$emit('getList');
                                this.$message({
                                    type: "success",
                                    message: "修改成功!"
                                });
                                this.loading = false;
                                this.closeDialog();
                            });
                        }else{
                            // 添加
                            this.loading = true;
                            apirunConfigAdd(this.form).then(res => {
                                this.$emit('getList');
                                this.$message({
                                    type: "success",
                                    message: "添加成功!"
                                });
                                this.loading = false;
                                this.closeDialog();
                            });
                        }

                    }
                });
            },
            //弹框弹出时获取data给form
            initPage() {
                if (this.type) {
                    //修改获取值
                    apirunConfigGet(this.type).then(res => {
                        this.form = res.data;
                        this.loading = false;
                        this.form.isDisable = String(this.form.isDisable);
                    });
                }else{
                        this.loading = false;
                        this.form={}
                }

            }
        },
        //监听，如果show为true,则执行initPage()
        watch: {
            show(value) {
                if (value) {
                    this.initPage();
                    this.$nextTick(() => {
                        this.$refs.ruleForm.clearValidate();
                    });
                }
            }
        }
    };
</script>
<style lang='less' scoped>

</style>



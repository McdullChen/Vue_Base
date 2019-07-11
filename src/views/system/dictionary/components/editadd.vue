/**
* 系统-数据字典组件
* @module 系统
* @desc 修改添加
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <div>
        <el-dialog :close-on-click-modal='false' :title="title" :visible="show" @close="closeDialog" center
                   width="550px">
            <el-form :model="form" :rules="rules" label-width="130px" ref="ruleForm" size="medium"
                     v-loading="loading">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="上级字典名称：" v-if="child">
                            <p>{{form.parentName}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="上级字典名称：" v-if="type&&!child">
                            <p>{{form.parentName}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="字典名称：" prop="dictName">
                            <el-input placeholder="字典名称" v-model="form.dictName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="字典值：" prop="dictValue" v-if="parent||child">
                            <el-input placeholder="字典值" v-model="form.dictValue"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="是否启用：" prop="isDisable">
                            <el-radio label="1" v-model="form.isDisable">是</el-radio>
                            <el-radio label="0" v-model="form.isDisable">否</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="排序值：" prop="dictOrder">
                            <el-input-number :max="100" :min="1" :step="1" v-model="form.dictOrder"></el-input-number>
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
    import {apiDictionaryAdd, apiDictionaryGet, apiDictionaryUpdate} from "../../../../api/system";


    export default {
        name: 'edit',
        props: {
            //证据类型数组listArr
            list: {
                type: Array,
                default: []
            },
            listArr: {
                type: Array,
                default: []
            },
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
                default: '编辑'
            },
            type: {
                type: String,
                default: ''
            },
            child: {
                type: Number,
                default: ''
            },
            parent: {
                type: Number,
                default: ''
            },
        },

        data() {
            return {
                subDictArr: [
                    {value: 222, label: '张三'}
                ],
                loading: true,
                wordvalue: '',
                form: {},
                rules: {
                    dictName: [
                        {required: true, message: '请填写字典名称', trigger: 'blur'},
                    ],
                    subDict: [
                        {required: true, message: '请选择所属字典类型', trigger: 'change'},
                    ],

                    dictValue: [
                        {required: true, message: '请输入字典值', trigger: 'blur'},
                        // {min: 12, max: 12, message: '发票代码必须12位', trigger: 'blur' }
                    ],
                    dictOrder: [
                        {required: true, message: '选择排序值', trigger: 'change'},
                    ],
                    isSys: [
                        {required: true, message: '选择是否系统?', trigger: 'blur'},
                    ],
                    isDisable: [
                        {required: true, message: '选择是否启用?', trigger: 'blur'},
                    ],

                }

            }
        },
        methods: {
            closeDialog() {
                this.$emit('update:show', false)
            },

            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.type) {
                            if (!this.child) {
                                //编辑
                                this.loading = true;
                                apiDictionaryUpdate(this.form).then(res => {
                                    this.$emit("getList")
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功!'
                                    });
                                    this.loading = false;
                                    this.closeDialog();
                                })
                            } else {
                                //添加
                                // this.loading = true;
                                apiDictionaryAdd(this.form).then(res => {
                                    this.$emit("getList")
                                    this.$message({
                                        type: 'success',
                                        message: '子节点添加成功!'
                                    });
                                    this.loading = false;
                                    this.closeDialog();
                                })
                            }

                        } else {
                            //添加
                            // this.loading = true;
                            apiDictionaryAdd(this.form).then(res => {
                                this.$parent.getList();
                                this.$message({
                                    type: 'success',
                                    message: '根节点添加成功!'
                                });
                                this.loading = false;
                                this.closeDialog();
                            })
                        }
                    }
                });
            },

            //弹框弹出时获取data给form
            initPage() {
                if (this.type) {
                    //修改
                    if (!this.child) {
                        apiDictionaryGet(this.type).then(res => {
                            this.form = res.data;
                            this.form.isDisable = String(res.data.isDisable);
                            this.loading = false;
                            let parid = this.form.subDict;
                            let filtObj = this.listArr.find(item=>{
                                return item.dictValue===parid
                            });
                            if(filtObj){
                                this.form.parentName = filtObj.dictName
                            }else{
                                this.form.parentName="根节点"
                            }
                        });
                    } else {
                        //新增子节点
                        this.loading = false;
                        apiDictionaryGet(this.type).then(res => {
                            this.form = res.data;
                            this.form.subDict = res.data.dictValue;
                            this.form.isDisable = '1';
                            this.form.parentName = this.form.dictName
                            this.form.dictName = '';
                            this.form.dictValue = '';
                            this.form.dictOrder = '';
                            this.form.isBase = 0;
                        });
                    }

                } else {
                    //新增根节点
                    this.loading = false;
                    //根节点
                    this.form = {
                        dictName: '',
                        dictValue: '',
                        subDict: '',
                        isBase: '1',
                        // isSys:'',
                        isDisable: '',
                        dictOrder: ''
                    };
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
                    })
                }
            },

        },
    }
</script>
<style lang='less' scoped>
    .alert_wrop {
        padding: 10px;
        display: flex;
        justify-content: space-between;

    }

    .bill {
        display: flex
    }
</style>



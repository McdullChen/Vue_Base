/**
* 系统-操作日志组件
* @module 系统
* @desc 查看
* @author 乔亚军
* @date 2019-6-4
**/
<template>
    <div>
        <el-dialog :close-on-click-modal='false' :title="title" :visible="show" @close="closeDialog" center
                   width="650px">
            <div class="wrop">
                <div class="content">
                    <h4>修改前内容：</h4>
                    <p>{{form.oldContent}}</p>
                </div>
                <hr class="hr-css">
                <div class="content">
                    <h4>修改后内容：</h4>
                    <p>{{form.newContent}}</p>
                </div>
            </div>

        </el-dialog>
    </div>
</template>
<script>
    import {apiLogGet} from "../../../../api/system";

    let that;
    export default {
        name: 'see',
        props: {
            type: {
                type: String,
                default: ''
            },
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                loading: false,
                form: {}

            }
        },
        methods: {
            closeDialog() {
                this.$emit('update:show', false)
            },

            submitForm() {
                this.closeDialog();
            },
            //初始数据
            initPage() {
                apiLogGet(this.type).then(res => {
                    this.form = res.data;
                })
            }

        },
        watch: {
            'show'(value) {
                if (value) {
                    this.initPage()
                }
            }
        },
    }
</script>
<style lang='less' scoped>
    .wrop {
        min-height: 200px;

        .content {
            p {
                padding: 10px
            }

        }
    }

    .hr-css {
        margin: 10px 0
    }
</style>



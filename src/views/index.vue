<template>
    <div class="index-page">
        <i-tabs/>
        <div class="index-box">
            <div class="index-left">
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card" shadow="hover">
                            <div class="clearfix" slot="header">
                                <span>卡片名称</span>
                                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                            </div>
                            <div :key="o" class="text item" v-for="o in 4">
                                {{'列表内容 ' + o }}
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12" shadow="hover">
                        <el-card class="box-card" shadow="hover">
                            <div class="clearfix" slot="header">
                                <span>某图表</span>
                                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                            </div>
                            <IEcharts :option="bar" style="height: 300px"/>
                        </el-card>
                    </el-col>
                    <el-col :span="12" shadow="hover">
                        <el-card class="box-card" shadow="hover">
                            <div class="clearfix" slot="header">
                                <span>卡片名称</span>
                                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                            </div>
                            <div :key="o" class="text item" v-for="o in 4">
                                {{'列表内容 ' + o }}
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div v-if="form">
                {{form}}
                <async-example v-bind:form="form"></async-example>
            </div>
            <div class="index-right">
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card" shadow="hover">
                            <div class="clearfix" slot="header">
                                <span>案件排名</span>
                                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                            </div>
                            <div :key="o" class="text item" v-for="o in 4">
                                {{o}}. XX大队
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import iTabs from '../components/home/component/tabs'
    import draggable from 'vuedraggable'
    import IEcharts from 'vue-echarts-v3/src/full.js';
    import {APItestURL} from "../api/system";

    export default {
        name: "index",
        components: {draggable, iTabs, IEcharts,
        "async-example":(resolve, reject)=>{
                APItestURL().then(res=>{
                    resolve({
                        template:res.dataHTML,
                        props:['form']
                    })
                })
            }
        },
        data() {
            return {
                form:false,
                currentTab:null,
                bar: {
                    title: {
                        text: '某统计图表'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
                    },
                    yAxis: {},
                    series: [{
                        name: 'Sales',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                }
            }
        },
        created() {
            // this.$post('http://192.168.10.14:8081/system/example/getHTMLInfo').then(res=>{
            //
            //     this.currentTab = {
            //         name:'app',
            //         template:res.dataHTML,
            //         props:['form']
            //     };
            //     this.form = {
            //         input:1,
            //     };
            // })
        }
    }
</script>

<style lang="less" scoped>
    .index-page {
        padding: 10px;
        background-color: #f8f8f8 !important;

        .index-box {
            display: flex;

            .index-right {
                width: 300px;
            }

            .index-left {
                flex: 1;
                margin-right: 20px;
            }
        }

        .el-row {
            margin-bottom: 20px;
        }
    }
</style>

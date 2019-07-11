<template>
    <div class="lj-collapse">
        <div class="collapse-title">
            <div @click="showFlag = !showFlag" class="collapse-title-content">
                <i class="el-icon-minus show-content" v-if="showFlag"></i>
                <i class="el-icon-plus show-content" v-if="!showFlag"></i>
                {{title}}
            </div>
            <div class="title-right">
                <slot name="title"></slot>
            </div>
        </div>
        <div>
            <el-collapse-transition>
                <div v-if="showFlag" key="box1">
                    <slot></slot>
                </div>
                <div v-if="!showFlag" key="box2">
                    <slot name="closed"></slot>
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LjCollapse",
        props:['title'],
        data (){
            return {
                showFlag:false
            }
        },
        methods:{
            // 当与 CSS 结合使用时
            // 回调函数 done 是可选的
            enter: function (el, done) {
                console.log(2)
                done()
            },
            leave: function (el, done) {
                console.log(6)
                done()
            },
        }
    }
</script>

<style scoped lang="less">
    .fade-enter-active, .fade-leave-active{                 //指就是html中fade名称
        transition: all 5s;
    }
    .fade-enter, .fade-leave-to {
        height: 0;
    }
    .lj-collapse{

        .collapse-title{
            padding: 10px 0;
            font-size: 16px;
            .clear-float;
            .collapse-title-content{
                float: left;
                user-select: none;
                cursor: pointer;
            }
            .title-right{
                float: right;
            }
        }
        .show-content{
            width: 18px;
            height: 18px;
            background: #66b1ff;
            text-align: center;
            line-height: 18px;
            color: #FFFFFF;
            font-weight: 700;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            margin-right: 5px;
            font-size: 10px;
        }
    }
</style>

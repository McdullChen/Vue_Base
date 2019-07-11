<!--*
*scroll
* @module
* @desc 滚动目录主组件
* @author WangWei
* @date 2019/6/5
* @example 调用示例
*  <lj-scroll>
*    <lj-scroll-item title="标题"></lj-scroll-item>
*  </li-scroll>
*-->

<template>
    <div style="height: 100%">
        <div class="scroll-block">
            <div class="bg-scroll"></div>
            <el-timeline style="margin: auto">
                <el-timeline-item :key="data.title" :type="data.color ? 'primary':''" @click.native="jump(data)"
                                  style="cursor: pointer" v-for="data in titleList">
                    <div :style="{color:data.color ? '#409EFF':'#ccc'}">{{data.title}}</div>
                </el-timeline-item>
            </el-timeline>
        </div>
        <div :style='{"height":myHeight}'
             @scroll="handleScroll"
             class="content-block"
             ref="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "scroll",
        data() {
            return {
                titleList: [],
                scrollTop: 0
            }
        },
        props: {
            myHeight: {
                type: String,
                default: '100%'
            }
        },
        methods: {
            handleScroll(el) {
                this.scrollTop = this.$refs.content.scrollTop;
                this.titleList.forEach((i, index) => {
                    if (index === this.titleList.length - 1) {
                        i.color = i.offsetTop < this.scrollTop
                    } else if (index === 0) {
                        i.color = this.titleList[index + 1].offsetTop > this.scrollTop
                    } else {
                        i.color = i.offsetTop <= this.scrollTop && this.titleList[index + 1].offsetTop > this.scrollTop
                    }
                })
            },
            jump(data) {
                let scrollTop = this.scrollTop;
                let i = 10;
                let setOut = (i) => {
                    i--;
                    if (i > 0) {
                        setTimeout(() => {
                            this.$refs.content.scrollTop = scrollTop - (scrollTop - data.offsetTop) / i;
                            setOut(i)
                        }, 10)
                    }
                };
                setOut(i)
            },
            initPage() {
                let arr = [];
                this.$slots.default.forEach((i, index) => {
                    arr.push({title: i.componentInstance.title, color: index === 0, offsetTop: i.elm.offsetTop})
                });
                this.titleList = arr
            }
        },
        mounted() {
            this.initPage()
        }
    }
</script>

<style lang="less" scoped>
    .scroll-block {
        position: fixed;
        z-index: 999;
        opacity: 0.5;
        top: 20vh;
        right: 50px;
        padding-top: 10px;

        .bg-scroll {
            width: 100%;
            top: 0;
            left: 0;
            height: 100%;
            background: #000;
            filter: blur(60px);
            position: absolute;
            z-index: -1;
        }

        &:hover {
            opacity: 1;
        }
    }

    .content-block {
        overflow-y: auto;
        margin: -20px;
        padding: 20px;
        overflow-x: hidden;
    }
</style>

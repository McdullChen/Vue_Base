<template>
    <el-container>
        <el-aside :width="widthAside">
            <i-second-menu style="float: left"/>
        </el-aside>
        <div :class="{ 'close-bg': true, closed: !menuShow }" @click="menuShow = !menuShow"></div>
        <div :class="{ 'aside-close': true, closed: !menuShow }"
             @click="menuShow = !menuShow">
            <i :class="{lj_font:true,'el-icon-s-fold': menuShow,'el-icon-s-unfold':!menuShow}"></i>
        </div>
        <el-main>
            <i-tabs/>
            <transition name="el-fade-in-linear">
                <keep-alive :include="$store.state.include">
                    <router-view class="second-view"/>
                </keep-alive>
            </transition>
        </el-main>
    </el-container>
</template>

<script>
    import iSecondMenu from "../../components/secondMenu";
    import iTabs from '../../components/home/component/tabs'

    export default {
        name: "humanPage",
        data() {
            return {
                menuShow: true
            };
        },
        computed: {
            widthAside() {
                return this.menuShow ? "160px" : "0px";
            }
        },
        components: {
            iSecondMenu, iTabs
        }
    };
</script>

<style lang="less" scoped>
    .el-container {
        position: relative;

        .aside-close {
            &.closed {
                left: 0;
            }

            transition: .5s all;
            width: 10px;
            height: 10px;
            margin-top: -5px;
            opacity: 0.8;
            z-index: 2;
            position: absolute;
            top: 50%;
            cursor: pointer;
            left: 140px;
        }

        .close-bg {
            &.closed {
                border-left: 20px solid #e8e8e8;
                border-right: none;
                left: 0;
            }

            transition: .5s all;
            border-bottom: 9px solid transparent;
            border-left: none;
            border-right: 20px solid #f7f7f7;
            border-top: 9px solid transparent;
            position: absolute;
            top: 50%;
            height: 50px;
            z-index: 1;
            margin-top: -20px;
            left: 140px;
        }
    }

    .el-main {
        padding: 10px;
        background: #eeeeee;

        .el-aside {
            position: relative;
            transition: all .5s;
        }

        .el-main {
            position: relative;
            overflow: auto;

            .second-view {
                position: absolute;
                background: white;
                left: 10px;
                top: 47px;
                bottom: 8px;
                right: 10px;
                padding: 10px;
                border-radius: 4px;
                overflow: auto;
            }
        }
    }
</style>

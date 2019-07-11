<!--*
*index
* @desc 主页面框架
* @author WangWei
* @date 2019/6/5
*-->

<template>
    <el-container class="home-page">
        <el-header height="50px">
            <header-comp/>
        </el-header>
        <el-container>
            <el-main class="main-block">
                <div class="menu-block">
                    <aside-comp/>
                </div>
                <div class="main-view">
                    <transition name="el-fade-in-linear">
                        <keep-alive :include="$store.state.include">
                            <router-view class="view-block"/>
                        </keep-alive>
                    </transition>
                    <div class="footer">©版权所有 上海龙进天下信息技术有限公司</div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import headerComp from './component/header'
    import asideComp from './component/aside'
    import iTabs from './component/tabs'

    export default {
        name: "home",
        components: {headerComp, asideComp, iTabs},
    }
</script>

<style lang="less" scoped>
    .home-page {
        overflow: auto;
        height: 100%;
        /*background-color: #f0f0f0;*/

        .main-block {
            .menu-block {
                width: 50px;
                position: fixed;
                left: 0;
                top: 50px;
                height: calc(~"100vh - 50px");
                z-index: 5;
            }

            .main-view {
                overflow: auto;
                margin-left: 50px;
                display: flex;
                height: 100%;
                flex-direction: column;
                position: relative;
                background-color:#FFFFFF;
                .view-block {
                    background-color: white;
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 25px;
                    right: 0;
                    overflow: auto;
                }

                .footer {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    font-size:  @fontSize ;
                    color: #888888;
                }
            }

            .el-breadcrumb {
                padding-bottom: 10px;
            }
        }
    }

</style>

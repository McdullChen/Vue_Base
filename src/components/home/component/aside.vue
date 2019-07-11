<!--*
* aside
* @desc 主菜单组件
* @author WangWei
* @date 2019/6/3
*-->
<template>
    <transition name="el-fade-in-linear">
        <div class="menu-ul">
            <ul>
                <li @mouseover="showMenuTotal">
                    <span class="icon-box">
                       <i class="lj_font icon_daohang-zhucaidan"></i>
                    </span>
                    <span class="name-block">全部功能</span>
                    <span class="arrow-box">
                        <i class="el-icon-arrow-right"></i>
                    </span>
                    <div @click.self="closeMenuTotal" class="menu-total" v-show="menuTotal">
                        <lj-menu-item/>
                        <i @click="closeMenuTotal" class="el-icon-close"></i>
                    </div>
                </li>
                <li :class="{'menu-item':true,active:$route.matched[1].name === itemFirst.resCode}"
                    :key="i"
                    @click="toRouter(itemFirst)" v-for="(itemFirst,i) in $store.state.menuList">
                    <span class="icon-box">
                       <i :class="'lj_font '+ itemFirst.resStyle"></i>
                    </span>
                    <span class="name-block">{{itemFirst.resName}}</span>
                    <span class="arrow-box">
                       <i class="el-icon-arrow-right"></i>
                    </span>
                </li>
            </ul>
        </div>

    </transition>
</template>

<script>
    import LjMenuItem from './menuItem'

    export default {
        name: "left",
        components: {LjMenuItem},
        data() {
            return {
                menuType: true,
                menuTotal: false,// 全部菜单显示标志
            }
        },
        methods: {
            // 跳转路由方法
            toRouter(data) {
                this.$router.push({name: data.resCode})
            },

            // 显示全部菜单
            showMenuTotal() {
                setTimeout(() => {
                    this.menuTotal = true
                }, 500)
            },

            //关闭全部菜单方法
            closeMenuTotal() {
                this.menuTotal = false
            }
        },
    }
</script>

<style lang="less" scoped>
    .menu-ul {
        width: 50px;
        overflow: hidden;

        ul {
            background: #252a2f;
            height: calc(~"100vh - 35px");
            width: 161px;
            color: #8f9cae;
            transition: width .5s;
            font-size:  @fontSize + 2;

            li {
                .menu-total {
                    position: absolute;
                    top: 0;
                    left: 161px;
                    color: #8f9cae;
                    overflow: hidden;
                    width: 0;
                    height: 100%;
                    transition: .5s all;

                    .el-icon-close {
                        position: absolute;
                        top: 10px;
                        left: 800-161-40px;
                        color: #8f9cae;
                        font-size: 24px;
                    }
                }

                &.active {
                    background-color: #2b3246;
                    border-left: 2px solid #6d8eff;

                    .icon-box {
                        color: white;
                    }

                    .name-block {
                        color: white !important;
                    }
                }

                width: 160px;
                line-height: 40px;

                &:hover {
                    .menu-total {
                        width: calc(~"100vw - 145px");
                    }

                    cursor: pointer;

                    .icon-box {
                        color: white;
                    }

                    .name-block {
                        color: #00c1de;
                    }

                    .arrow-box {
                        display: inline-block;
                    }
                }

                .arrow-box {
                    line-height: 40px;
                    text-align: center;
                    display: none;
                    vertical-align: middle;
                    font-size:  @fontSize ;
                }

                .icon-box {
                    width: 50px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    display: inline-block;
                    vertical-align: middle;
                    font-size:  @fontSize + 4;
                    color: #8f9cae;
                }

                .name-block {
                    display: inline-block;
                    vertical-align: middle;
                    width: 88px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #8f9cae;
                    font-size:  @fontSize ;
                    padding-right: 8px
                }
            }
        }

        &:hover {
            width: auto;
            animation: ttt .6s 1 forwards;
        }
    }

    @keyframes ttt {
        0% {
            width: 50px;
        }
        66% {
            width: 50px;
        }
        100% {
            width: 161px;
        }
    }

    @keyframes ttt2 {
        0% {
            width: 161px;
        }
        66% {
            width: 161px;
        }
        100% {
            width: 50px;
        }
    }
</style>

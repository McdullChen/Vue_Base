<!--*
*secondMenu
* @desc 二级菜单组件
* @author WangWei
* @date 2019/6/5
* @param {Object} [title]    - 参数说明
* @param {String} [columns] - 参数说明
* @example 调用示例
*-->

<template>
    <el-menu
            :default-active="$route.path"
            class="second-menu"
            router
            style="">
        <div class="title">{{$route.matched[1].meta.label}}</div>
        <menu-list :data="data" :key="data.resId" v-for="data in secondMenuList"/>
    </el-menu>
</template>

<script>
    import MenuList from './home/component/MenuList'

    export default {
        name: "secondMenu",
        data() {
            return {
                opened: []
            }
        },
        components: {MenuList},
        computed: {
            secondMenuList() {
                let p = this.$store.state.menuList.find(i => {

                    return i.resId === this.$route.matched[1].meta.urlId
                });
                p.children.forEach(i => {
                    this.opened.push(i.resUrl)
                });
                return p.children
            }
        }
    }
</script>

<style lang="less" scoped>
    .title {
        text-align: center;
        font-size:  @fontSize + 2;
        line-height: 37px;
        color: white;
    }

    .second-menu {
        width: 160px;
        background-color: #dee5ee;
        border: none;
        color: #333;
        height: 100%;

        /deep/ .el-menu-item.is-active {
            background-color: #ecf5ff
        }

        /deep/ .el-submenu .el-menu-item {
            min-width: auto;
        }

        /deep/ .el-menu {
            background: #dee5ee;
        }

        /deep/ .el-submenu {
            min-width: 160px;

            .el-submenu__title {
                height: 36px;
                line-height: 36px;
                font-size:  @fontSize ;
            }
        }

        /deep/ .el-menu-item, .el-submenu__title {
            height: 36px;
            line-height: 36px;
            font-size:  @fontSize ;
        }

        /deep/ .el-menu-item:hover {
            background-color: #F4F6F8;
        }
    }

</style>

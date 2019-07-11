<!--*
*tabs
* @desc 顶部tab页组件
* @author WangWei
* @date 2019/6/5
*-->

<template>
    <div class="main-tabs">
        <el-tabs @tab-click="onToRoute" @tab-remove="removeTab" type="card" v-model="editableTabsValue2">
            <el-tab-pane
                    :closable="!item.noDel"
                    :key="item.name"
                    :label="item.label"
                    :name="item.path"
                    v-for="item in $store.state.tabsList">
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
    export default {
        name: "tabs",
        data() {
            return {
                editableTabsValue2: this.$route.name
            }
        },
        methods: {
            onToRoute(data) {
                this.$router.push({path: data.name})
            },
            removeTab(data) {
                let i = this.$store.state.tabsList.findIndex(item => item.path === data);
                this.$store.dispatch('removeTabs', data).then(res => {
                    if (this.$route.path === data) {
                        this.$router.push({path: this.$store.state.tabsList[i - 1].path})
                    }
                });
            }
        },
        mounted() {
            let json = {
                name: this.$route.name,
                label: this.$route.meta.label,
                path:this.$route.path
            };
            this.$store.dispatch('addTabsList', json);
            this.editableTabsValue2 = this.$route.path;
        },
        watch: {
            '$route'(value) {
                let json = {
                    name: value.name,
                    label: value.meta.label,
                    path:value.path
                };
                this.$store.dispatch('addTabsList', json);
                this.editableTabsValue2 = value.path;
            }
        }
    }
</script>

<style lang="less" scoped>
    .main-tabs {
        position: relative;
        top: -10px;
        left: -10px;
        width: calc(~"100% + 20px");

        /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item {
            line-height: 38px;
            height: 38px;
            border-bottom: 2px solid transparent;
        }

        /deep/ .el-tabs--card > .el-tabs__header {
            background: white;
        }

        /deep/ .el-tabs__item {
            /*color: white;*/
        }

        /deep/ .el-tabs__header {
            /*margin: 0;*/
        }

        /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
            border: none;
            border-right: 1px solid #E4E7ED;
            border-radius: 0;
        }

        /deep/ .el-tabs--card > .el-tabs__header {

        }

        /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {

            background-color: #fff;
            /*color: white;*/
            border-bottom-color: #409EFF;
            /*background: #4751af;*/
        }
    }
</style>

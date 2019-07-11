<template>
    <div :class="fontSize" id="app">
        <router-view/>
    </div>
</template>
<script>
    import {apiCommonRefreshPermission} from "./api/system";

    export default {
        name: 'App',
        data() {
            return {
                fontSize: 'normal'
            }
        },
        created() {
            // 非登录时，本地记录添加到vuex 如果没有本地记录  则会跳到登录页
            if (window.location.href.indexOf('login') < 0) {
                this.$store.dispatch('setUser', JSON.parse(localStorage.getItem('userDetail')));
                // 获取当前用户权限
                apiCommonRefreshPermission().then(res => {
                    let roleList = JSON.parse(res[res.roleList[0].roleId]);
                    if (this.$store.state.role && res[this.$store.state.role]) {
                        roleList = JSON.parse(res[this.$store.state.role]);
                    }
                    // 菜单初始化方法
                    this.$store.dispatch('setMenu', roleList).then(() => {
                        // 权限列表方法
                        this.$store.dispatch('setRoleList', res.roleList).then(res => {
                        })
                    })
                });
            }
        }
    }
</script>
<style lang="less">

    #app {
        height: 100vh;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Microsoft YaHei";
    }
</style>

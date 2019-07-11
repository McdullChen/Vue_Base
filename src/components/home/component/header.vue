<!--*
*header
* @desc 页面头部组件
* @author WangWei
* @date 2019/6/5
* @param {Object} [title]    - 参数说明
* @param {String} [columns] - 参数说明
* @example 调用示例
*  <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
*-->

<template>
    <div class="header-comp">
        <div class="head-block">
            <div class="title-block">
                <img class="header-logo" src="../../../assets/logo.png"/>
                <span class="text">智慧城管执法平台 | </span>
                <span class="small">网上办案系统</span>
            </div>
            <div class="right-menu">
                <div class="menu-item">
                    <el-dropdown @command="handleCommand" size="medium" trigger="click">
                        <div class="el-dropdown-link">
                            {{greetings}}，{{$store.state.user.login.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="ChangePassword">修改密码</el-dropdown-item>
                            <el-dropdown-item command="role" v-if="$store.state.setRoleList.length > 1"> 切换角色</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="menu-item">
                    <i class="el-icon-message menu-icon"></i>
                </div>
                <div class="menu-item">
                    <i class="el-icon-alarm-clock menu-icon"></i>
                </div>

                <div class="menu-item">
                    {{nowTime}}
                    <span>晴转多云 17-31°</span>
                </div>
            </div>

        </div>
        <change-password :show.sync='editObj.isshow' :title='editObj.title'></change-password>
        <check-role :show.sync="checkRoleObj.show" v-if="checkRoleObj.show"></check-role>
    </div>
</template>

<script>
    import {apiCommonLogout} from "../../../api/system";
    import {resetRouter} from "../../../plugins/router";
    import {formatDate} from "../../../until/wordBook";
    import ChangePassword from './changePassword.vue'
    import CheckRole from './checkRole'

    export default {
        name: "headerComp",
        components: {
            ChangePassword,
            CheckRole
        },
        data() {
            let Get_Greetings=()=> {
                let now = new Date();
                let times = now.getHours();
                if(times>=0 && times<11){return "早上好"}
                if(times>=11 && times<13){return "中午好"}
                if(times>=13 && times<17){return "下午好"}
                if(times>=17 && times<24){return "晚上好"}
            };
            return {
               greetings:Get_Greetings(),
                nowTime:formatDate(Date.parse(new Date()),'yyyy年M月d日'),
                editObj: {
                    show: false,
                    title: '',
                    isshow: false
                },
                checkRoleObj:{
                   show: false,
                }
            }
        },
        methods: {
            handleCommand(command) {
                if (command === 'logout') {
                    this.$confirm('此操作将退出当前登录账号, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        apiCommonLogout().then(() => {
                            localStorage.removeItem('token');
                            this.$router.push({name: 'login'});
                            this.$nextTick(() => {
                                resetRouter()
                            })
                        })
                    })
                } else if (command === 'ChangePassword') {
                    this.editObj.isshow = true;
                    this.editObj.title = '修改密码'
                } else if (command === 'role') {
                    this.checkRoleObj.show = true
                }
            }
        },

    };
</script>

<style lang="less" scoped>
    .header-comp {
        height: inherit;
        background-color: #4c81df;
        color: white;
        position: relative;

        .head-block {
            padding: 0;
            font-size:  @fontSize + 6;
            display: flex;

            .right-menu {
                position: absolute;
                right: 0;
                &:after{
                    content: '';
                    display: block;
                    clear: both;
                }
                .menu-item{
                    float: left;
                    line-height: 50px;
                    padding: 0 20px;
                    border-right: 1px solid #95afff;
                    font-size:  @fontSize ;
                    transition: all 0.1s;
                    text-align: center;
                    cursor: pointer;
                }
                .menu-icon{
                    font-size: @fontSize + 4
                }
                .el-dropdown-link {
                    color: white;
                    font-size:  @fontSize ;
                }
            }

            .title-block {
                display: flex;
                height: 50px;
                line-height: 50px;
                overflow: hidden;
                padding-left: 10px;
                .text {
                    padding-left: 15px;
                    display: inline-block;
                    text-align: center;
                }
                .small{
                    font-size: 16px;
                    padding-left: 5px;
                }
                .header-logo {
                    margin: auto;
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }
</style>

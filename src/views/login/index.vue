<template>
    <div class="login-page">
        <img :src="loginBGI" class="bg-img">
        <div class="login-block">
            <div class="title">
                <img :src="logoImage">
                智慧城管执法平台
            </div>
            <login-comp/>
        </div>
    </div>
</template>

<script>
    import loginComp from './login'
    import loginBGI from '../../assets/shanghai.jpg'
    import logoImage from '../../assets/logo.png'

    export default {
        name: "login",
        components: {loginComp},
        data() {
            return {
                loginBGI: loginBGI,
                logoImage: logoImage
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-page {
        height: 100vh;
        position: relative;
        background: rgba(0, 0, 0, 0.3);
        overflow: hidden;

        & > .login-block {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -80px;
            transform: translateX(-50%) translateY(-50%);
        }

        .bg-img {
            position: absolute;
            z-index: -1;
            min-height: 100vh;
            min-width: 100vw;
            filter: blur(10px);
        }

        .title {
            color: white;
            font-size: 44px;
            text-align: center;
            line-height: 150px;

            img {
                width: 80px;
                height: 80px;
                vertical-align: middle;
                margin-right: 5px;
            }
        }

    }
</style>

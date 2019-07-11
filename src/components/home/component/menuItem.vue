<!--*
*menuItem
* @desc 全部菜单组件
* @author WangWei
* @date 2019/6/5
*-->
<template>
    <div class="menu-block-total">
        <!-- 第一层 -->
        <div :key="i" class="menu-li" v-for="(data,i) in $store.state.menuList">
            <div class="title">{{data.resName}}</div>
            <!-- 第二层 -->
            <div :key="i" v-for="(item,i) in data.children">
                <div @click="toRouter(item)" class="item" v-if="item.resType == 2">{{item.resName}}</div>
                <!-- 第三层 -->
                <div :key="i" @click="toRouter(x)" class="item thirdchildren" v-for="(x,i) in item.children" v-if="item.resType == 1">
                    {{x.resName}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "menuItem",
        data () {
            return {}
        },
        methods: {
            toRouter(data) {
                console.log(data)
                this.$parent.menuTotal = false;
                this.$nextTick(i => {
                    this.$router.push({name: data.resCode})
                })
            }
        },
    };
</script>

<style lang="less" scoped>
    .menu-block-total {
        width: 800-161px;
        background-color: white;
        height: 100%;
        padding: 20px;
        box-shadow: 0 0 10px #888;
        display: flex;


        .menu-li {
            width: 130px;
            min-height: 200px;
            justify-content: space-between;
           
            .title {
                line-height: 40px;
                height: 40px;
                color: #000;
                font-size:  @fontSize  + 2;
                padding: 0 10px;
                font-weight: 600;
                border-bottom: 1px solid #000;
            }

            .item {
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                display: block;
                color: #000;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                opacity: .65;

                &:hover {
                    background-color: rgba(0, 0, 0, .06)
                }
            }
           
        }

    }
</style>

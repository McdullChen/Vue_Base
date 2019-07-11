<!--*
*LjScrollItem
* @module
* @desc 滚动目录子组件
* @author WangWei
* @date 2019/6/5
* @param {String} [title]    - 标题
* @example 调用示例
*  <lj-scroll>
*    <lj-scroll-item title="标题"></lj-scroll-item>
*  </li-scroll>
*-->

<template>
    <div class="item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "scrollItem",
        props: {
            title: {
                type: String,
                default: '标题'
            }
        }
    }
</script>

<style scoped>

</style>

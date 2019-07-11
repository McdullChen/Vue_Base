<!--*
* MenuList
* @module
* @desc 二级菜单递归组件
* @author WangWei
* @date 2019/6/3
* @param {Array} [data]    - 参数说明
* @example 调用示例
*  <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
*-->

<template>
    <div>
        <el-submenu :index="data.resUrl" v-if="data.resType == 1">
            <span slot="title">{{data.resName}}</span>
            <menu-list :data="item" :key="item.resId" v-for="item in data.children"></menu-list>
        </el-submenu>
        <el-menu-item :index="data.resUrl" v-if="data.resType == 2"> {{data.resName}}</el-menu-item>
        
    </div>
</template>

<script>
    export default {
        name: "MenuList",
        props: ['data'],   
    }

</script>

<style scoped>

</style>

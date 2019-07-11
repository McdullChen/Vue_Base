<template>
    <div>
        <div>
            <input type="file" name="file" multiple  class="upload-input" ref="fileInput" @change="inputChange">
            <span @click="blurInput">
                <slot></slot>
            </span>
            <slot name="tip"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LjUpload",
        props:{
            fileChange:{
                type:Function,
            },
            item:{
                type: Object
            }
        },
        methods:{
            blurInput(){
                //激活上传input
                this.$refs.fileInput.click()
            },
            inputChange(e){
                // 返回文件列表（数组形式）
                this.fileChange(Array.from(e.target.files).map(x => x),this.item)
            }
        }
    }
</script>

<style scoped>
    .upload-input{
        display: none;
    }
</style>

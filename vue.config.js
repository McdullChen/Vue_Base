const path = require('path')
module.exports = {
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    publicPath: '/',
    runtimeCompiler:true,
    devServer: {
        host:'192.168.10.96', // can be overwritten by process.env.HOST
        port: 8081, // can be overwritt
        // proxy: {
        //     '/api': {
        //         target: 'http://192.168.10.154:8081/system',
        //         // target: 'http://192.168.10.56:8080/test',
        //         ws: true,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': '', // rewrite path
        //         },
        //     },
        //     '/test': {
        //         target: 'https://www.easy-mock.com/mock/5c9dc51a544eae2d8a0d35ac/longjin',
        //         pathRewrite: {
        //             '^/test': '', // rewrite path
        //         },
        //     }
        // }
    }
};
///20190711测试提交
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, 'src/style/public.less'), // 需要全局导入的less
            ],
        })
}

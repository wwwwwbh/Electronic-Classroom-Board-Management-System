module.exports = {

    devServer: {

        port: 8081,

        disableHostCheck: true
    },
    configureWebpack: config => {
    },
    chainWebpack: config => {
        config.optimization.minimize(true)
        config.externals({
            'vue': 'Vue',
            //'echarts': 'echarts',
            "element-ui":"ELEMENT"
        })
    },
}

const ip = require('ip');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ipAddress = ip.address();
const commonOptions = require('./webpack.common');

module.exports = merge.merge(commonOptions, {
    mode: 'development',
    devtool: 'source-map',
    // 配置开发服务器
    devServer: {
        host: ipAddress,
        port: 3333,
        hot: true,   // 开启热更新
        inline: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    plugins: [
        // 热更新的插件
        new webpack.HotModuleReplacementPlugin(),
    ],
});

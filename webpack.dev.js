const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ip = require('ip');
const ipAddress = ip.address();

module.exports = {
    // 指定项目的入口文件
    entry: {
        index: ['./src/index.jsx']
    },
    // 指定项目打包完成后的出口目录及文件名
    output: {
      path: `${__dirname}/dist`,
      filename: "bundle.js"
    },
    // 配置开发服务器
    devServer: {
        host: ipAddress,
        port: 3333,
        hot: true,   // 开启热更新
        inline: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            // 配置babel-loader
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            }
        ]
    },
    plugins: [
        // 将我们打包好的js代码动态的插入到html中
        new HtmlWebpackPlugin({
            title: 'learn ',
            template: './index.html',
            filename: 'index.html',
            inject: true,
            hash: true,
            chunksSortMode: 'none'
        }),
        // 热更新的插件
        new webpack.HotModuleReplacementPlugin(),
    ],
}

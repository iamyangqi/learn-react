# 搭建项目学习教程
#### 1. 首先面对一个新的项目我们首先应该使用npm init来初始化npm项目 
    package name： 包名称，有长度限制，不能以【点】或【下划线】开头，且不能包含大写字母，是每一个packeage
    必须的；
    
    version: package的版本。对于业务项目来说，这个往往不太重要，但是如果你要发布自己的项目，这个就显得十分重要了。name和version共同决定了唯一一份代码；
    
    description: 包的描述。开发组件库时必需，简明的向库的使用者介绍这个库是干嘛的。
    
    license：开源协议。对于开源组件库，这个十分重要。如果是作为公司的商用产品，我们必须注意组件库的开源协议，以免引起商业纠纷。
    
    entry point: 指定了程序的主入口文件，我们通常使用require/import某一个项目时，加载的就是这个文件。

#### 2. 初始化项目之后，我们就可以添加依赖了，这里我们又必须要弄懂几个package字段
    dependencies: 生产环境下所依赖的包列表，比如说react/react-router/lodash/antd这些库
    
    devDependencies: 开发环境下所依赖的包列表，比如说webpack/babel这些库
    
    peerDependencies: 这个比较少见，通常用于组件库的项目，它规定了使用该组件库，使用项目必须安装的依赖。

#### 3. 接下来，我们就可以按照上述原则和规范来安装相应的依赖了
    yarn add webpack webpack-dev-server @babel/core @babel/preset-env @babel/preset-react babel-loader -D
    yarn add react react-dom

简单介绍下webpack,babel。

webpack做的事情就是让你尽情使用模块化的便利，它会分析你的项目结构，找到javascript模块以及其他一些浏览器不能直接运行的拓展语言（比如less/sass），并将其转换和打包为合适的格式供浏览器使用。它主要就是通过loader和plugin来工作，loader通常用来转换格式（比如less-loader/ts-loader）,plugin通常用来优化/打包，比如UglifyjsWebpackPlugin等。

babel主要是来做浏览器兼容的，它有助于将我们写的代码转化成大部分浏览器可直接运行的代码。

#### 4. 配置webpack.config.js文件
```javascript
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
```

#### 5. 在src中创建index.jsx，开启react之旅
```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
    <div>HELLO WORD</div>,
    document.getElementById('root')
);
```

#### 6. 在package.json script中添加start命令

#### 7. 在cmd中运行yarn start, 就能看到熟悉的hello world了

#### 8. 在使用上，我们通常会将webpack.config.js切分成webpack.dev.js和webpack.prod.js来区分生产和开发环境。

webpack.dev.js
```javascript
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
```

webpack.prod.js
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    ],
}
```

此时package.json中scripts也变成了

    "start": "./node_modules/.bin/webpack-dev-server --open --progress --colors --config webpack.dev.js",
    "build": "./node_modules/.bin/webpack --config webpack.prod.js"

#### 9. 安装react-router-dom，添加react路由
    yarn add react-router-dom

index.jsx
```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path={'/'} component={Home}></Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
```

#### 10. 引入antd，并添加less-loader用以加载antd的样式
    yarn add antd
    yarn add less less-loader css-loader stlye-loader postcss-loader -D
    
到这里我们可以发现如果我们修改了webpack的某些配置后，需要修改两份代码，很不便利，因此我们可以将dev/prod共有的逻辑抽成common，得以复用。
webpack.common.js
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    // 配置省略后缀
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.json'],
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
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true,// 单独的style
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
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
    ],
}
``` 

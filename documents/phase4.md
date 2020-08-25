# 使用真实的后台服务
##### 1. 启动后台服务，这里以localhost:5000为例

##### 2. 关掉项目本身的mock服务
src/index.jsx

    // require('../mock/index');
    
##### 3. 配置服务器代理，用来解决跨域的问题
webpack.dev.js，改写devServer

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

具体含义就是将localhost:3333/api的所有请求代理到http://localhost:5000/api上，并且将/api去除，最终的请求为http://localhost:5000

##### 4. 创建基于http://localhost:5000代理的axios服务
userManagementApis.js
```javascript
import {_axios, _apiAxios} from "./index";
const baseUrl = '/user';
const apiUrl = '/api';

class UserManagementApis {
    async login(username, password) {
        const res = await _apiAxios.post(`${apiUrl}/login`, {username, password});
        return res.data
    }

    async getUserList() {
        const res = await _axios.get(baseUrl);
        return res.data;
    }
}

// 单例化
const uMApis = new UserManagementApis();

export default uMApis;
```

##### 5. 发一个请求试试
Login
```javascript
    async function onFinish(values) {
        const {username, password, remember} = values;
        const res = await uMApis.login(username, password);
        if (res.status === 0) {
            props.history.push('/');
                scope.dispatch({
                    type:'setLoginInfo',
                    loginInfo: {
                        username: res.data.username
                    }
                });

                if (remember) {
                    localStorage.setItem('loginSession', 'sjdfdskla;fjis;fjsdklfafdiroajka;fdafsdf');
                }
        } else {
            message.error('请输入正确的用户名和密码！');
        }
    }
```

# React项目实战
#### 1. 开始第一个组件Login
因为login中会设计到页面的跳转，我们需要用react-router中的withRouter方法，该方法为我们的组件注入了history/location的信息，方便我们实现路由跳转及获取路由信息。
    
    yarn add react-router
    
index.jsx
```javascript
import * as React from 'react';
import {withRouter} from "react-router";
import './index.less';

const Login = withRouter((props) => {
    return (
        <div className='login-bg'>

        </div>
    );
});

export default Login;
```
index.less
```less
.login-bg {
  width: 100vw;
  height: 100vh;
  background-image: url("../../statics/imgs/login_bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
```
本来为了美观，我们引入了一张背景图。但是页面刷新后并没有显示。有木有很沮丧！！！

我们看看cmd后，发现是因为由于我们使用的是css-in-js，但是webpack在打包时并不能识别图片资源，这个时候我们就需要加上对图片处理的loader。

    yarn add -D url-loader

webpack中添加新的loader逻辑

                {
                    test: /\.(png|jpg|gif)$/,
                    use: ['url-loader'],
                },
                
接下来我们就来写Login的逻辑了。

Login 主要实现用户名/密码的输入及校验，校验失败给出相应的错误提示语，校验成功跳转到home页面，并根据remember属性实现登录属性的持久化。

到这里我们差不多就把一个react项目的主要内容走了一遍。但这不够，，，

#### 2. 改写index.jsx，将逻辑移到App.jsx中，并实现一个全局的context，用以保存全局的一些状态, 并且借助useReducer hook来实现响应式数据。

首先创建一个context
App/context.jsx
```javascript
import React from "react";

const ScopeContext = React.createContext();

export default ScopeContext;
```

index.jsx
```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./pages/App";
import './index.less';
import {Switch, BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <App />
        </Switch>
    </BrowserRouter>
    ,
    document.getElementById('root')
);
```

App/index.jsx
```javascript
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {withRouter} from 'react-router';
import * as React from 'react';
import Login from "../Login";
import Home from "../Home";
import ScopeContext from "./context";

const App = withRouter((props) => {
    const [state, dispatch] = React.useReducer(reducer, {});

    function reducer(state, action) {
        switch (action.type) {
            case 'setLoginInfo': {
                return Object.assign({}, state, {loginInfo: action.loginInfo})
            }
            default: throw new Error('scope reducer action error');
        }
    }

    React.useEffect(() => {
        if (localStorage.getItem('loginSession')) {
            dispatch({
                type:'setLoginInfo',
                loginInfo: {
                    username: 'admin'
                }
            });
        } else {
            props.history.replace('/login');
        }
    }, []);

    return (
        <ScopeContext.Provider value={{
            state,
            dispatch
        }}>
            <Switch>
                <Route path={'/login'} component={Login}></Route>
                <Route path={'/'} component={Home}></Route>
            </Switch>
        </ScopeContext.Provider>
    );
}
)
export default App;

```

在Login/index.jsx中使用context
```javascript
const scope = React.useContext(ScopeContext);
scope.dispatch({
    type:'setLoginInfo',
    loginInfo: {
        username: 'admin'
    }
});
```

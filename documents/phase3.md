# React 项目实战
#### 1. 学习第一个自定义hook -- useDate, 用来显示当前时间
useDate.js
```javascript
import * as React from "react";
import * as moment from "moment";

function useDate() {
    const dateFormat = 'YYYY-MM-DD hh:MM:ss';
    const [currentTime, setCurrentTime] = React.useState(moment().format(dateFormat));

    React.useEffect(() => {
        const timeCount = () => {
            const timer = setTimeout(() => {
                setCurrentTime(moment().format(dateFormat));
                clearTimeout(timer);
                timeCount();
            }, 1000);
        }
        timeCount();
    }, []);

    return currentTime;
}

export default useDate;
```

#### 2. 为Home的header添加一些信息，如时间，用户信息，用户登出功能。
home.jsx
```javascript
import * as React from 'react';
import Layout from "antd/es/layout";
import 'antd/es/layout/style';
import ScopeContext from "../App/context";
import {message} from "antd";
import useDate from "../../hooks/useDate";
import './index.less';
import Popconfirm from "antd/es/popconfirm";
import "antd/es/popconfirm/style";
import {withRouter} from "react-router";
const { Header, Footer, Sider, Content } = Layout;

const Home = withRouter((props) => {
    const scope = React.useContext(ScopeContext);
    const currentTime = useDate();

    // 卸载时，清除message相关内容
    React.useEffect(() => {
        // 20分钟清除登录的持久状态
        const timer = setTimeout(() => {
            localStorage.clear();
            clearTimeout(timer);
        }, 1200000);

        return () => {
            message.destroy();
        }
    }, []);

    function onLogout() {
        scope.dispatch({
            type:'setLoginInfo',
            loginInfo: null
        });
        localStorage.clear();
        props.history.replace('/login');
    }

    const systemMenu = React.useMemo(() => {
        if (scope.state.loginInfo && scope.state.loginInfo.username) {
            message.success(`${scope.state.loginInfo && scope.state.loginInfo.username}， 欢迎回来！`);
            return (
                <Popconfirm
                    title={`确定退出账号【${scope.state.loginInfo && scope.state.loginInfo.username}】吗?`}
                    onConfirm={onLogout}
                    okText="确定"
                    cancelText="取消"
                >
                    <span style={{paddingLeft: '30px', cursor: 'pointer'}}>
                        {scope.state.loginInfo && scope.state.loginInfo.username}
                    </span>
                </Popconfirm>
            );
        } else {
            return null;
        }
    }, [scope.state.loginInfo && scope.state.loginInfo.username]);

    return (
        <Layout>
            <Sider>Sider</Sider>
            <Layout>
                <Header className='home-header'>
                    <div className='sth'></div>
                    <div className='system-info'>
                        <span>{currentTime}</span>
                        {systemMenu}
                    </div>
                </Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    )
});

export default Home;
```

#### 3. 到这里，我们就差不多对一个local的react应用有了一定认识，但是现实项目中，我们需要与后端联调，这里我们采用mockjs来模拟后端。
    yarn add -D mockjs
    yarn add axios
    
创建第一个mock服务
mock/index.js
```javascript
import * as Mock from 'mockjs';
// https://github.com/nuysoft/Mock/wiki/Getting-Started mock document
const baseUrl = `http://learn-react`;
// 创建一个用户列表
Mock.mock(`${baseUrl}/user`, 'get', {
    'user|100-300': [{ // 随机生成100到300个数组元素
        'id|+1': 1,     // 属性值自动加1，初始值为1
        'name': '@cname', // 中文名称
        'age|16-46': 0,
        'birthday': '@date("yyyy-MM-dd")',
        'city': '@city(true)',
        'isMale|1': true,
    }]
});
```

创建第一个axios请求
/api/index.js
```javascript
import axios from 'axios';

const _axios = axios.create({
    baseURL: 'http://learn-react',
    paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'}),
});

export default _axios;
```

/api/userManagementApis.js
```javascript
import _axios from "./index";
const baseUrl = '/user';

class UserManagementApis {
    async getUserList() {
        const res = await _axios.get(baseUrl);
        return res.data;
    }
}

const uMApis = new UserManagementApis();

export default uMApis;

```
    
#### 4. 改写home组件，使之具有动态路由，用以实现子组件的显示
```javascript
import * as React from 'react';
import Layout from "antd/es/layout";
import 'antd/es/layout/style';
import ScopeContext from "../../Containers/App/context";
import {message} from "antd";
import useDate from "../../hooks/useDate";
import './index.less';
import Popconfirm from "antd/es/popconfirm";
import "antd/es/popconfirm/style";
import {withRouter} from "react-router";
import Menu from "antd/es/menu";
import "antd/es/menu/style";
import HomeRoute from "../../Containers/HomeRoute";
const { Header, Footer, Sider, Content } = Layout;

const Home = withRouter((props) => {
    const scope = React.useContext(ScopeContext);
    const [siderSelectedKeys, setSiderSelectedKeys] = React.useState(['']);
    const currentTime = useDate();

    // 卸载时，清除message相关内容
    React.useEffect(() => {
        // 20分钟清除登录的持久状态
        const timer = setTimeout(() => {
            localStorage.clear();
            clearTimeout(timer);
        }, 1200000);

        return () => {
            message.destroy();
        }
    }, []);

    function onLogout() {
        scope.dispatch({
            type:'setLoginInfo',
            loginInfo: null
        });
        localStorage.clear();
        props.history.replace('/login');
    }

    const systemMenu = React.useMemo(() => {
        if (scope.state.loginInfo && scope.state.loginInfo.username) {
            message.success(`${scope.state.loginInfo && scope.state.loginInfo.username}， 欢迎回来！`);
            return (
                <Popconfirm
                    title={`确定退出账号【${scope.state.loginInfo && scope.state.loginInfo.username}】吗?`}
                    onConfirm={onLogout}
                    okText="确定"
                    cancelText="取消"
                >
                    <span style={{paddingLeft: '30px', cursor: 'pointer'}}>
                        {scope.state.loginInfo && scope.state.loginInfo.username}
                    </span>
                </Popconfirm>
            );
        } else {
            return null;
        }
    }, [scope.state.loginInfo && scope.state.loginInfo.username]);

    function handleSiderClick(e) {
        setSiderSelectedKeys(e.key);
        props.history.push(e.key);
    }

    return (
        <Layout id='home'>
            <Header className='home-header'>
                <div className='sth'></div>
                <div className='system-info'>
                    <span>{currentTime}</span>
                    {systemMenu}
                </div>
            </Header>
            <Layout>
                <Sider>
                    <Menu
                        onClick={handleSiderClick}
                        style={{ width: '100%' }}
                        selectedKeys={siderSelectedKeys}
                        mode="inline"
                        theme="dark"
                    >
                        <Menu.Item key="user-management">用户管理</Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <HomeRoute />
                </Content>
            </Layout>
        </Layout>
    )
});

export default Home;
```

HomeRoute组件
```javascript
import {Route, Switch, withRouter} from "react-router";
import * as React from 'react';
import UserManagement from "../../pages/UserManagement";

const HomeRoute = withRouter(() => {
    return (
        <Switch>
            <Route path={'/user-management'} component={UserManagement} />
        </Switch>
    )
});

export default HomeRoute;
```

#### 5. 创建UserManagement组件，使用axios获取数据
```javascript
import React from "react";
import uMApis from "../../apis/userManagementApis";
import Table from "antd/es/table";
import "antd/es/table/style";

function UserManagement() {
    const [dataSource, setDataSource] = React.useState([]);

    const columns = React.useMemo(() => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '性别',
                dataIndex: 'isMale',
                key: 'isMale',
                render(gender) {
                    return gender ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '所在地',
                dataIndex: 'city',
                key: 'city',
            },
        ];
    }, []);

    async function initUserList() {
        const list = await uMApis.getUserList();
        list.user.forEach(item => item.key = item.id);
        setDataSource(list.user);
    }

    React.useEffect(() => {
        initUserList();
    }, []);

    return (
        <div style={{padding: '20px'}}>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default UserManagement;
```



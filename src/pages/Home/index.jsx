import * as React from 'react';
import Layout from "antd/es/layout";
import 'antd/es/layout/style';
import ScopeContext from "../App/context";
import {message} from "antd";
const { Header, Footer, Sider, Content } = Layout;

function Home() {
    const scope = React.useContext(ScopeContext);

    React.useEffect(() => {
        scope.state.loginInfo
        && scope.state.loginInfo.username
        && message.success(`${scope.state.loginInfo && scope.state.loginInfo.username}， 欢迎回来！`)
    }, [scope.state.loginInfo && scope.state.loginInfo.username]);

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

    return (
        <Layout>
            <Sider>Sider</Sider>
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    )
}

export default Home;

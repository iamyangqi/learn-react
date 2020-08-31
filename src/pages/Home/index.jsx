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
import {useTranslation} from "react-i18next";

const Home = withRouter((props) => {
    const scope = React.useContext(ScopeContext);
    const {t, i18n} = useTranslation();
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

    const changeLng = React.useCallback(() => {
        let lng = i18n.language;
        lng = lng === 'zh' ? 'en' : 'zh';
        i18n.changeLanguage(lng);
    }, []);

    return (
        <Layout id='home'>
            <Header className='home-header'>
                <div className='sth'></div>
                <div className='system-info'>
                    <span>{currentTime}</span>
                    <span onClick={changeLng}>{t('home:Change Lng')}：{i18n.language}</span>
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
                        <Menu.Item key="user-management">{t('home:UserManagement')}</Menu.Item>
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

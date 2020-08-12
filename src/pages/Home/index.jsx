import * as React from 'react';
import Layout from "antd/es/layout";
import "antd/es/layout/style"
const { Header, Footer, Sider, Content } = Layout;

function Home() {
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

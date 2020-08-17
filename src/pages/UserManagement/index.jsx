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

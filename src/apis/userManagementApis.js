import _axios from "./index";
const baseUrl = '/user';

class UserManagementApis {
    async getUserList() {
        const res = await _axios.get(baseUrl);
        return res.data;
    }
}

// 单例化
const uMApis = new UserManagementApis();

export default uMApis;

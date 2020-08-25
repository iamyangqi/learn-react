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

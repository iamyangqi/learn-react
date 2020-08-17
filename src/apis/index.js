import axios from 'axios';

const _axios = axios.create({
    baseURL: 'http://learn-react',
    paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'}),
});

export default _axios;

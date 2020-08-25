import axios from 'axios';

const _axios = axios.create({
    baseURL: 'http://learn-react',
    paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'}),
});

const _apiAxios = axios.create({
    baseURL: '/',
    paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'}),
});

export {_axios, _apiAxios};

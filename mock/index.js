import * as Mock from 'mockjs';
// https://github.com/nuysoft/Mock/wiki/Getting-Started mock document
const baseUrl = `http://learn-react`;
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

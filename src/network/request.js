import axios from 'axios'
import { Loading } from 'element-ui';

export function request(config) {
    const instance = new axios.create({
        baseURL: "http://106.12.85.17:8090",
        timeout: 5000
    })
    // 请求拦截
    instance.interceptors.request.use(config => {
        Loading.service();
        return config
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
        let loadingInstance = Loading.service();
        loadingInstance.close();
        // console.log(res.data)
        return res.data
    }, err => {
        console.log(err)
        return { code: 500, msg: 'timeout' }
    })
    return instance(config)
}
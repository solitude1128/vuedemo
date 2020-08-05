import { request } from './request'

export function getHomeBanner() {
    return request({
        url: "/vuedemo/banner"
    })
}
export function getHomeFeature(a) {
    return request({
        url: "/vuedemo/jd_feature",
        params: {//get请求数据时,用params请求数据
            show: a
        }
    })
}
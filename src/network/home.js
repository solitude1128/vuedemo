import { request } from './request'

export function getHomeBanner() {
    return request({
        url: "/vuedemo/banner"
    })
}
export function getHomeFeature() {
    return request({
        url: "/vuedemo/feature",
        params: {
            show: 1
        }
    })
}
export function getHomeMax(page) {
    // 根据传递过来的页码取数据,默认取出50条
    return request({
        url: "/vuedemo/get_jd_category_three",
        params: {
            page: page,//页数
            // pageSize: pageSize//条数
        }
    })
}
import { request } from './request'

export function getHomeBanner() {
    return request({
        url: "/vuedemo/banner"
    })
}
export function getHomeFeature() {
    return request({
        url: "/vuedemo/jd_feature",
        params: {
            show: 1
        }
    })
}
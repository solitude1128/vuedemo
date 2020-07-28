import { request } from './request'

export function getjxTabBar() {
    return request({
        url: "/vuedemo/jx-tabbar"
    })
}
import { request } from './request'

export function getJdCategoryOne() {
    return request({
        url: "/vuedemo/get_jd_category_one"
    })
}
export function getJdCategoryTwo() {
    return request({
        url: "/vuedemo/get_jd_category_two"
    })
}
export function getJdCategoryThree() {
    return request({
        url: "/vuedemo/get_jd_category_three"
    })
}
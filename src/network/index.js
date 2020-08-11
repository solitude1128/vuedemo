import { request } from './request'
import { requestPost } from './request'

// 获取京东轮播
export function getHomeBanner() {
    return request({
        url: "/vuedemo/banner"
    })
}
// 获取京喜轮播
export function getjxBanner() {
    return request({
        url: "/vuedemo/jx-banner",
        params: {
            ip: "zhang"
        }
    })
}
// 获取京东功能视图,有一个参数判断,1在京东主页显示 0在全部页面中才显示
export function getHomeFeature(a) {
    return request({
        url: "/vuedemo/jd_feature",
        params: {//get请求数据时,用params请求数据
            show: a
        }
    })
}
// 获取京喜功能导航,有一个参数判断,1在京喜主页显示 0在全部页面中才显示
export function getjxFeature(a) {
    return request({
        url: "/vuedemo/jx_feature",
        params: {
            show: a
        }
    })
}
// 获取京东的底部导航
export function getJdTabBar() {
    return request({
        url: "/vuedemo/jd_tabbar"
    })
}
// 获取京喜底部导航
export function getJxTabBar() {
    return request({
        url: "/vuedemo/jx_tabbar"
    })
}
// 获取京东一级分类数据
export function getJdCategoryOne() {
    return request({
        url: "/vuedemo/get_jd_category_one"
    })
}
// 获取京东二级分类数据
export function getJdCategoryTwo() {
    return request({
        url: "/vuedemo/get_jd_category_two"
    })
}
// 获取京东三级分类数据
export function getJdCategoryThree() {
    return request({
        url: "/vuedemo/get_jd_category_three"
    })
}
// 根据京东一级分类查二级,根据二级查三级 取到三维数组
export function getJdCategoryMax(page) {
    // 根据传递过来的页码取数据,默认取出50条
    return request({
        url: "/vuedemo/get_jd_category_max",
        params: {
            page: page,//页数
        }
    })
}

// 手机号是否注册
export function isPhone(phone) {
    return request({
        url: "/vuedemo/land_have_telphone",
        params: {
            telphone: phone,
        }
    })
}
// 用户注册
export function land(obj) {
    return requestPost({
        url: "/vuedemo/login",
        data: {
            actionKey: obj.action,
            telphone: obj.phone,
            userName: obj.userName,
            password: obj.pwd,
            email: obj.email
        }
    })
}
// 用户登录
export function login(obj) {
    return requestPost({
        url: "/vuedemo/land",
        data: {
            actionKey: obj.action,
            username: obj.uName,
            password: obj.pwd,
        }
    })
}
// 用于搜索商品,关键字查数据等
export function getGoods(data) {
    return request({
        url: "/vuedemo/get_goods",
        params: { ...data }
    })
}
// 用于详情页面 根据商品id请求出商品的数据 已经商品数据以及发布商品的店铺信息
export function getGoodsDet(id) {
    return request({
        url: "/vuedemo/get_goodsDet",
        params: {
            goods_id: id
        }
    })
}
// 获取购物车数据
export function postShopCart(uid) {
    return requestPost({
        url: "/vuedemo/get_shopcart",
        data: {//post请求数据的时候,提交数据用data
            user_id: uid
        }
    })
}
// 修改购物车数据
export function updateShopcart() {
    return request({
        url: "/vuedemo/update_shopcart"
    })
}
// 删除购物车数据
export function deleteShopcart() {
    return request({
        url: "/vuedemo/delete_shopcart"
    })
}
// 获取关联商品
export function getGoodsRelation() {
    return request({
        url: "/vuedemo/get_goods_relation"
    })
}
// 获取商品规格
export function getNorms() {
    return request({
        url: "/vuedemo/get_norms"
    })
}
// 定义goods类
export class goods {
    constructor(goodsData, norms, relationGoods) {
        // 把你要用的字段都进行取值赋值
        this.goodsdata = goodsData
        this.norms = norms
        this.relationGoods = relationGoods
    }
}
import { request } from './request'

// 用于搜索数据,关键字查数据等
export function getGoods(data) {
    return request({
        url: "/vuedemo/get_goods",
        params: { ...data }
    })
}
// 用于详情页面 根据商品id请求出商品的数据 已经商品数据以及发布商品的店铺信息
export function getGoodsId(id) {
    return request({
        url: "/vuedemo/get_goodsDet",
        params: {
            goods_id: id
        }
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
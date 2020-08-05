import { POST_SHOPCART } from "./mutation-types"
import { postShopCart } from 'network/shopCart'

export default {
    // 要做的是网络请求 --- 需要在actions中做分发监控,不然同步数据不会被改变
    // 所以要把当前的事件,在actions中进行执行
    [POST_SHOPCART](state, payload) {
        postShopCart(payload.userInfo).then(res => {
            if (res.code != 200) return console.log('请求数据失败')
            state.shopCartLen = res.data.length;
            res.data.forEach(item => {
                if (state.shopCart[item.shop_name]) {
                    state.shopCart[item.shop_name].push(item)
                } else {
                    state.shopCart[item.shop_name] = [item]
                }
            });
            console.log(state.shopCart)
        })
    },
}
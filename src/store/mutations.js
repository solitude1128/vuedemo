import { POST_SHOPCART } from "./mutation-types"
import { postShopCart } from 'network'

export default {
    // 要做的是网络请求 --- 需要在actions中做分发监控,不然同步数据不会被改变
    // 所以要把当前的事件,在actions中进行执行
    [POST_SHOPCART](state) {
        state.totalPayment = 0
        state.totalNum = 0
        postShopCart(1).then(res => {
            state.shopCart = {};
            if (res.code != 200) return console.log('请求数据失败')
            state.shopCartLen = res.data.length;
            res.data.forEach(item => {//循环的是所有数据
                if (!state.shopCart[item.shop_name]) {
                    state.shopNameArr.push(item.shop_name)
                    state.shopCart[item.shop_name] = [item]
                }
                state.shopCart[item.shop_name].push(item)
                if (item.ischeck == '1') {
                    state.totalPayment += item.money_now * item.num
                    state.totalNum += item.num
                }
                state.shopCarMoneyAll += item.money_now * item.num
                state.shopCarNumAll += item.num * 1
            });
            console.log(state.shopCart)
        })
    },
}
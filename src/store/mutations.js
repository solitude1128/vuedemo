import { POST_SHOPCART, AUTOCODE } from "./mutation-types"
import { postShopCart, autoCode } from 'network'
import Vue from 'vue'

export default {
    // 要做的是网络请求 --- 需要在actions中做分发监控,不然同步数据不会被改变
    // 所以要把当前的事件,在actions中进行执行
    [POST_SHOPCART](state, payload) {
        state.totalPayment = 0
        state.totalNum = 0
        console.log(payload)
        postShopCart(payload).then(res => {
            state.shopCart = {};
            if (res.code != 200) return console.log('请求数据失败')
            state.shopCartLen = res.data.length;
            res.data.forEach(item => {//循环的是所有数据
                if (!state.shopCart[item.shop_name]) {
                    state.shopNameArr.push(item.shop_name)
                    state.shopCart[item.shop_name] = []
                    state.shopCartHistory[item.shop_name] = []
                }
                let a = {}, b = {}
                for (let i in item) {
                    a[i] = item[i]
                    b[i] = item[i]
                }
                state.shopCart[item.shop_name].push(a)
                state.shopCartHistory[item.shop_name].push(b)
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
    [AUTOCODE](state, payload) {
        autoCode(payload).then(res => {
            console.log(res)
            if (res.code != 200) return
            localStorage.autocode = res.data.user.autocode;
            // 直接搜索数据库里默认为1的数据给defaddr
            Vue.set(state.userInfo, 'defaddr', res.data.defaddr)
            for (let i in res.data.user) {
                Vue.set(state.userInfo, i, res.data.user[i])
            }
            console.log(state.userInfo);
        })
    },
}
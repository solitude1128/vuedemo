import * as types from "./mutation-types"
export default {
    getShopCart(contents, payload) {
        // this.$store.commit("方法",参数)
        // contents 相当于 $store 使用commit
        // 调用vuex的mutations中的types.POST_SHOPCART方法
        contents.commit(types.POST_SHOPCART, payload)
    },
    getUserInfo(contents, payload) {
        // this.$store.commit("方法",参数)
        // contents 相当于 $store 使用commit
        // 调用vuex的mutations中的types.POST_SHOPCART方法
        contents.commit(types.AUTOCODE, payload)
    },
}
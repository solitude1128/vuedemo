import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"

Vue.use(VueRouter)

const routes = [
    {
        path: "",
        redirect: "/category"
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("views/home/Home"),
        meta: {
            title: "主页"
        },
    },
    {
        path: "/category",
        name: "Category",
        component: () => import("views/category/Category"),
        meta: {
            title: "分类"
        }
    },
    {
        path: "/category/rl/:id",
        name: "cRankList",
        component: () => import("views/category/childComp/cRankList"),
        meta: {
            title: "rankList"
        },
    },
    {
        path: "/details/:did",
        name: "Details",
        component: () => import("views/details/Details"),
        meta: {
            title: "详情"
        },
    },
    {
        path: "/search/:threeId",
        name: "Search",
        component: () => import("views/search/Search"),
        meta: {
            title: "搜索"
        }
    },
    {
        path: "/kw",
        name: "Keywords",
        component: () => import("views/keywords/Keywords"),
        meta: {
            title: "关键字"
        }
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("views/login/Login"),
        meta: {
            title: "登录"
        }
    },
    {
        path: "/r",
        name: "Register",
        component: () => import("views/register/Register"),
        meta: {
            title: "注册"
        }
    },
    {
        path: "/jx",
        name: "Surprise",
        component: () => import("views/surprise/Surprise"),
        meta: {
            title: "京喜"
        },
    },
    {
        path: "/jc",
        name: "JxCategory",
        component: () => import("views/surprise/jxCategory/JxCategory"),
        meta: {
            title: "京喜分类"
        },
    },
    {
        path: "/live",
        name: "Live",
        component: () => import("views/surprise/live/Live"),
        meta: {
            title: "直播"
        },
    },
    {
        path: "/shopcart",
        name: "Shopcart",
        component: () => import("views/cat/Shopcart"),
        meta: {
            title: "购物车"
        },
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("views/profile/Profile"),
        meta: {
            title: "我的"
        },
    },
    {
        path: "/af",
        name: "AllFeature",
        component: () => import("views/allFeature/AllFeature"),
        meta: {
            title: "全部功能组件"
        },
    },
    {
        path: "/accounts/:shopId",//暂时直接传递商品数据
        name: "Accounts",
        component: () => import("views/accounts/Accounts"),
        meta: {
            title: "确认订单"
        },
    },
    {
        path: "/upaddr",
        name: "upAddr",
        component: () => import("views/accounts/childCom/upAddr"),
        meta: {
            title: "修改地址"
        },
    },
    {
        path: "/newaddr/:addrId",
        name: "newAddr",
        component: () => import("views/accounts/childCom/newAddr"),
        meta: {
            title: "新增地址"
        },
    },
    {
        path: "/payment/:orderId/:allMoney",//去支付页面带订单编号和总价
        name: "Payment",
        component: () => import("views/payment/Payment"),
        meta: {
            title: "支付页面"
        },
    },
    {
        path: "/pok",
        name: "Pok",
        component: () => import("views/pok/Pok"),
        meta: {
            title: "支付成功"
        },
    },
    {
        path: "/allOrder",
        name: "AllOrder",
        component: () => import("views/allOrder/AllOrder"),
        meta: {
            title: "全部订单"
        },
    },

]

// 3.创建一个vue-router实例
const routers = new VueRouter({
    routes,
    linkActiveClass: "active",
    mode: "history"
})
routers.beforeEach((to, from, next) => {
    // 每次路由在执行的时候,记录一下进入页面的路由地址,后期用于判断tabbar被重复点击
    store.state.redundancy = to.path
    if (to.path == from.path) return
    document.title = to.matched[0].meta.title
    for (let i in store.state.TabBar) {
        store.state.TabBar[i] = false
    }
    if (to.path == "/home" || to.path == "/category" || to.path == "/shopcart" || to.path == "/profile") {
        store.state.TabBar.isJdTabBar = true
    } else if (to.path == "/jx" || to.path == "/jc" || to.path == "/live") {
        store.state.TabBar.isJxTabBar = true
    }
    next()
})

export default routers
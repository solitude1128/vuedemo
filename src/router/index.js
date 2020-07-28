import Vue from 'vue'
import VueRouter from 'vue-router'

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
        path: "/my",
        name: "Profile",
        component: () => import("views/profile/Profile"),
        meta: {
            title: "我的"
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
    document.title = to.matched[0].meta.title
    next()
})

export default routers
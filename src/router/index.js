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
        name: "home",
        component: () => import("views/home/Home"),
        meta: {
            title: "home"
        },
    },
    {
        path: "/category",
        name: "category",
        component: () => import("views/category/Category"),
        meta: {
            title: "category"
        }
    },
    {
        path: "/category/rl",
        name: "rankList",
        component: () => import("views/category/childComp/cRankList"),
        meta: {
            title: "rankList"
        },
    },
    {
        path: "/category/details/:id",
        name: "cDetails",
        component: () => import("views/category/childComp/cDetails"),
        meta: {
            title: "详情"
        },
    },
    {
        path: "/search",
        name: "search",
        component: () => import("components/content/search/Search"),
        meta: {
            title: "search"
        }
    },
    {
        path: "/login",
        name: "login",
        component: () => import("components/content/login/Login"),
        meta: {
            title: "login"
        }
    },
    {
        path: "/surprise",
        name: "surprise",
        component: () => import("views/surprise/Surprise"),
        meta: {
            title: "surprise"
        },
    },
    {
        path: "/shopcart",
        name: "shopcart",
        component: () => import("views/cat/Shopcart"),
        meta: {
            title: "shopcart"
        },
    },
    {
        path: "/my",
        name: "my",
        component: () => import("views/profile/Profile"),
        meta: {
            title: "my"
        },
    },
]

// 3.创建一个vue-router实例
const routers = new VueRouter({
    routes,
    linkActiveClass: "active"
})
routers.beforeEach((to, from, next) => {
    console.log(to)
    document.title = to.matched[0].meta.title
    next()
})

export default routers
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
        component: () => import("@/views/home/Home"),
        meta: {
            title: "home"
        },
    },
    {
        path: "/category",
        name: "category",
        component: () => import("@/views/category/Category"),
        meta: {
            title: "category"
        },
    },
    {
        path: "/surprise",
        name: "surprise",
        component: () => import("@/views/surprise/Surprise"),
        meta: {
            title: "surprise"
        },
    },
    {
        path: "/shopcart",
        name: "shopcart",
        component: () => import("@/views/cat/Shopcart"),
        meta: {
            title: "shopcart"
        },
    },
    {
        path: "/my",
        name: "my",
        component: () => import("@/views/profile/Profile"),
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
    document.title = to.matched[0].meta.title
    next()
})

export default routers
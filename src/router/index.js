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
        children: [
            {//子路由定义时 path路径中不需要写'/'
                path: "phone",
                name: "phone",
                component: () => import("@/views/category/phone"),
            },
            {
                path: "idol",
                name: "idol",
                component: () => import("@/views/category/idol"),
            },
            {
                path: "default",
                component: () => {
                    return import("@/views/category/phone")
                }
            }
        ],
        meta: {
            title: "category"
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
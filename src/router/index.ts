import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [{
    name: 'HomeAd',
    path: '/',
    redirect: '/login',
    component: () => import('../views/HomeAd.vue'),
    children: [{
        name: 'WelcomeAd',
        path: '/welcome',
        component: () => import('../views/WelcomeAd.vue'),
    }]
}, {
    name: 'LoginAd',
    path: '/login',
    component: () => import('../views/LoginAd.vue')
}
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})
export default router
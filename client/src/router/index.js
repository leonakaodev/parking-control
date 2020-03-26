import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import SingleCars from '../pages/SingleCars.vue'
import ViewSingleCar from '../pages/ViewSingleCar.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/dashboard', redirect: '/single-cars'},
    { path: '/single-cars', component: SingleCars, meta: { requiresAuth: true } },
    { path: '/single-cars/:id', component: ViewSingleCar, props: true, meta: { requiresAuth: true } }
]

export default new VueRouter({
    mode: 'history',
    routes
})

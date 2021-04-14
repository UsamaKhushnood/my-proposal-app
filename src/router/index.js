import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Variable from '../views/Variable.vue'
import VariableDynamic from '../views/VariableDynamic.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '*',
        name: 'pageNotFound',
        component: PageNotFound
    },
    {
        path: '/variable',
        name: 'Variable',
        component: Variable
    },
    {
        path: '/variable-dynamic',
        name: 'VariableDynamic',
        component: VariableDynamic
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
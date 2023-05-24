import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      requiresAuth: true,
    },
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requiresAuth: false,
    },
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '*',
    redirect: '/',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !isUserAuthenticated()) {
    next('/login');
  } else {
    next();
  }
})

function isUserAuthenticated() {
  return Boolean(localStorage.getItem('user')); 
}

export default router

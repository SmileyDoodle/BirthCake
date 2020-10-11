import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'



Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: () => import('../views/SignupPage.vue')
  },
  {
    path: '/information',
    name: 'InformationPage',
    component: () => import('../views/InformationPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/single/:userID',
    name: 'SinglePage',
    component: () => import('../views/SinglePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit',
    name: 'EditPage',
    component: () => import('../views/EditPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if(isAuthenticated && to.path === '/') {
    next('/information')
  } else if 
    (requiresAuth && !isAuthenticated) {
      next('/login')
    } else {
    next()
  }
})
export default router

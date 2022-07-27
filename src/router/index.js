import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/app',
    name: 'App',
    component: () => import('../App.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/list',
    component: () => import('../views/Home.vue'),
    children:[
      {
        path: '/test',
        name: 'Test',
        component: () => import('../views/Test.vue')
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('../views/List.vue')
      }
    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

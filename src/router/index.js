// router.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TaskCreator from '../views/TaskCreator.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/taskcreator',
    name: 'taskcreator',
    component: TaskCreator
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

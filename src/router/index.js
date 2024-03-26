import { createRouter, createWebHistory } from 'vue-router'
import ArticleListView from '../views/ArticleListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ArticleList',
      component: ArticleListView
    },
  ]
})

export default router

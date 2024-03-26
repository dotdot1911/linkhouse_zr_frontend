import { createRouter, createWebHistory } from 'vue-router'
import ArticleListView from '../views/ArticleListView.vue'
import ArticleView from '../views/ArticleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ArticleListView
    },
    {
      path: '/article/:guid/:language',
      name: 'articleDetails',
      component: ArticleView,
      props: true
    }
  ]
})

export default router

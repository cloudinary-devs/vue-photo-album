import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/album',
      name: 'album',
      component: () => import('../views/PhotoAlbum.vue')
    },
    {
      path: '/apiupload',
      name: 'api upload',
      component: () => import('../views/ApiUpload.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/UploadWidget.vue')
    }
  ]
})

export default router

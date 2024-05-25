import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ComponentCommunication from '@/components/ComponentCommunication/ComponentCommunication.vue'
import ListingDemo from '@/components/ListingDemo/ListingDemo.vue'
import FormDemo from '@/components/FormDemo/FormDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'component_communicate',
          component: ComponentCommunication
        },
        {
          path: 'listing_demo',
          component: ListingDemo
        },
        {
          path: 'form_demo',
          component: FormDemo
        }
      ]
    }
  ]
})

export default router

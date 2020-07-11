import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'category-page',
      component: require('@/components/CategoryPage').default,
    },
    {
      path: '/landing-page',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

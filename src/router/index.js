import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/chart',
      name: 'chartPage',
      component: () => import('@/views/ChartView.vue'),
    },
  ],
});

export default router;

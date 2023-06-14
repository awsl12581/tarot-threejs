import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'loading',
    // component: HomeView,
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/Tarot.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const HOMEPAGE: AppRouteRecordRaw = {
  path: '/homepage',
  name: 'homepage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '主页',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/homepage/index.vue'),
      meta: {
        locale: '主页',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default HOMEPAGE;

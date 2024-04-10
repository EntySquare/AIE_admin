import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '主页',
    requiresAuth: true,
    icon: 'icon-home',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: '首页',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'order',
      name: 'Order',
      component: () => import('@/views/dashboard/workplace/order.vue'),
      meta: {
        locale: '订单',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'management',
      name: 'management',
      component: () => import('@/views/dashboard/workplace/management.vue'),
      meta: {
        locale: '参数管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;

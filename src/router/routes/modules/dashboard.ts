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
    // {
    //   path: 'order',
    //   name: 'Order',
    //   component: () => import('@/views/dashboard/workplace/order.vue'),
    //   meta: {
    //     locale: '订单',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    //
    // {
    //   path: 'management',
    //   name: 'management',
    //   component: () => import('@/views/dashboard/workplace/management.vue'),
    //   meta: {
    //     locale: '参数管理',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    // {
    //   path: 'income',
    //   name: 'Income',
    //   component: () => import('@/views/dashboard/workplace/income.vue'),
    //   meta: {
    //     locale: '分收益',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
};

export default DASHBOARD;

import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PHONE: AppRouteRecordRaw = {
  path: '/phone',
  name: 'phone',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '推特管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 0,
  },
  children: [
    {
      path: 'phoneControl',
      name: 'phoneControl',
      component: () => import('@/views/phone/phoneControl.vue'),
      meta: {
        locale: '推特管控',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'dailyOperates',
      name: 'dailyOperates',
      component: () => import('@/views/phone/dailyOperates.vue'),
      meta: {
        locale: '转发回复统计列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PHONE;

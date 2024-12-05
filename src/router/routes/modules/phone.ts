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
  ],
};

export default PHONE;

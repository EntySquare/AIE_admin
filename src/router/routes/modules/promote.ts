import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PROMOTE: AppRouteRecordRaw = {
  path: '/promote',
  name: 'promote',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '推广',
    requiresAuth: true,
    icon: 'icon-list',
    order: 8,
  },
  children: [
    {
      path: 'promoteConfig',
      name: 'promoteConfig',
      component: () => import('@/views/promote/index.vue'),
      meta: {
        locale: '设置',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PROMOTE;

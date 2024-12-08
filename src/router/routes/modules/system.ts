import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '系统配置管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 7,
  },
  children: [
    {
      path: 'systemInfo',
      name: 'systemInfo',
      component: () => import('@/views/system/index.vue'),
      meta: {
        locale: '系统配置',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;

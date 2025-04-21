import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/feed',
  name: 'feed',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '喂养管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 8,
  },
  children: [
    {
      path: 'feedRecord',
      name: 'feedRecord',
      component: () => import('@/views/feed/feedRecord.vue'),
      meta: {
        locale: '喂养记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

// export default SYSTEM;

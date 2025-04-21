import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/session',
  name: 'session',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '会话列表',
    requiresAuth: true,
    icon: 'icon-user',
    order: 1,
  },
  children: [
    {
      path: 'sessionInfo',
      name: 'sessionInfo',
      component: () => import('@/views/sessionList/index.vue'),
      meta: {
        locale: '会话列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

// export default USER;

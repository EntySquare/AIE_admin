import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const FANS: AppRouteRecordRaw = {
  path: '/fans',
  name: 'fans',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '粉丝列表',
    requiresAuth: true,
    icon: 'icon-user',
    order: 8,
  },
  children: [
    {
      path: 'fansList',
      name: 'fansList',
      component: () => import('@/views/fans/fansList.vue'),
      meta: {
        locale: '粉丝聊天',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default FANS;

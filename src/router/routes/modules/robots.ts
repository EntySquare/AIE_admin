import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/robots',
  name: 'robots',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '机器人列表',
    requiresAuth: true,
    icon: 'icon-user',
    order: 2,
  },
  children: [
    {
      path: 'robotsInfo',
      name: 'robotsInfo',
      component: () => import('@/views/robotsList/index.vue'),
      meta: {
        locale: '机器人列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default USER;

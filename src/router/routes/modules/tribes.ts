import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/tribes',
  name: 'tribes',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '部落列表',
    requiresAuth: true,
    icon: 'icon-user',
    order: 3,
  },
  children: [
    {
      path: 'tribesInfo',
      name: 'tribesInfo',
      component: () => import('@/views/tribesList/index.vue'),
      meta: {
        locale: '部落列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default USER;

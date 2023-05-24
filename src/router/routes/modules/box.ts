import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const BOX: AppRouteRecordRaw = {
  path: '/box',
  name: 'box',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '盲盒',
    requiresAuth: true,
    icon: 'icon-components',
    order: 9,
  },
  children: [
    {
      path: 'boxList',
      name: 'boxList',
      component: () => import('@/views/box/boxList.vue'),
      meta: {
        locale: '盲盒列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default BOX;

import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const WALLET: AppRouteRecordRaw = {
  path: '/test',
  name: 'test',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '测试',
    requiresAuth: true,
    icon: 'icon-list',
    order: 6,
  },
  children: [
    {
      path: 'testModel',
      name: 'testModel',
      component: () => import('@/views/test/testModel.vue'),
      meta: {
        locale: '工具测试',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default WALLET;

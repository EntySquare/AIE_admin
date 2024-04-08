import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const MANAGE: AppRouteRecordRaw = {
  path: '/manage',
  name: 'manage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '管理账户',
    requiresAuth: true,
    icon: 'icon-list',
    order: 7,
  },
  children: [
    {
      path: 'manageList',
      name: 'manageList',
      component: () => import('@/views/manage/index.vue'),
      meta: {
        locale: '账户列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

// export default MANAGE;

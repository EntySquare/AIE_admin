import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '用户管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 0,
  },
  children: [
    {
      path: 'userInfo',
      name: 'userInfo',
      component: () => import('@/views/user/userListInfo.vue'),
      meta: {
        locale: '用户数据',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'assetRecord',
      name: 'assetRecord',
      component: () => import('@/views/user/assetRecord.vue'),
      meta: {
        locale: '资产记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'payRecord',
      name: 'payRecord',
      component: () => import('@/views/user/payRecord.vue'),
      meta: {
        locale: '支付记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

// export default USER;

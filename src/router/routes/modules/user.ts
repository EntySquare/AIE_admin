import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '用户',
    requiresAuth: true,
    icon: 'icon-list',
    order: 4,
  },
  children: [
    {
      path: 'userList',
      name: 'userList',
      component: () => import('@/views/user/userList.vue'),
      meta: {
        locale: '用户列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'userListInfo',
      name: 'userListInfo',
      component: () => import('@/views/user/userListInfo.vue'),
      meta: {
        locale: '用户详情',
        requiresAuth: true,
        // hideInMenu: true,
        roles: ['*'],
      },
    },
  ],
};

export default USER;

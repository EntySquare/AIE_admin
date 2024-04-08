import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const fusion: AppRouteRecordRaw = {
  path: '/fusion',
  name: 'fusion',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '融合',
    requiresAuth: true,
    icon: 'icon-relation',
    order: 10,
  },
  children: [
    {
      path: 'create',
      name: 'create',
      component: () => import('@/views/fusion/create.vue'),
      meta: {
        locale: '创建融合',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'fusionList',
      name: 'fusionList',
      component: () => import('@/views/fusion/fusionList.vue'),
      meta: {
        locale: '融合列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'edit',
      name: 'edit',
      component: () => import('@/views/fusion/create.vue'),
      meta: {
        locale: '编辑融合',
        requiresAuth: true,
        roles: ['*'],
         hideInMenu:true,
      },
    },
  ],
};

export default fusion;

import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const LOG: AppRouteRecordRaw = {
  path: '/log',
  name: 'log',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '日志',
    requiresAuth: true,
    icon: 'icon-common',
    order: 10,
  },
  children: [
    {
      path: 'albumLogList',
      name: 'albumLogList',
      component: () => import('@/views/log/albumList.vue'),
      meta: {
        locale: '专辑空投/回收',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'materialLogList',
      name: 'materialLogList',
      component: () => import('@/views/log/materialList.vue'),
      meta: {
        locale: '材料空投/回收',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'blindBoxLogList',
      name: 'blindBoxLogList',
      component: () => import('@/views/log/blindBoxList.vue'),
      meta: {
        locale: '盲盒空投/回收',
        requiresAuth: true,
        roles: ['*'],
      },
    },

    {
      path: 'bonusLogList',
      name: 'bonusLogList',
      component: () => import('@/views/log/promotionBonusList.vue'),
      meta: {
        locale: '推广奖励',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'adminOperLogList',
      name: 'adminOperLogList',
      component: () => import('@/views/log/adminOperList.vue'),
      meta: {
        locale: '管理后台操作请求',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'notifyOperLogList',
      name: 'notifyOperLogList',
      component: () => import('@/views/log/notifyOperList.vue'),
      meta: {
        locale: '回调请求',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default LOG;

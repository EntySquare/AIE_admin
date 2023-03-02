import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const ACTIVITY: AppRouteRecordRaw = {
  path: '/activity',
  name: 'activity',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '活动',
    requiresAuth: true,
    icon: 'icon-list',
    order: 4,
  },
  children: [
    {
      path: 'activityList',
      name: 'activityList',
      component: () => import('@/views/activity/activityList.vue'),
      meta: {
        locale: '活动列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'publishActivity',
      name: 'publishActivity',
      component: () => import('@/views/activity/publishActivity.vue'),
      meta: {
        locale: '发布活动',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default ACTIVITY;

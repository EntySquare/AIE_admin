import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const LOTTERY: AppRouteRecordRaw = {
  path: '/lottery',
  name: 'lottery',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '抽奖列表',
    requiresAuth: true,
    icon: 'icon-user',
    order: 0,
  },
  children: [
    {
      path: 'lotteryist',
      name: 'lotteryist',
      component: () => import('@/views/lotteryList/index.vue'),
      meta: {
        locale: '抽奖列表',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default LOTTERY;

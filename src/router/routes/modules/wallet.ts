import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const WALLET: AppRouteRecordRaw = {
  path: '/wallet',
  name: 'wallet',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '钱包',
    requiresAuth: true,
    icon: 'icon-list',
    order: 6,
  },
  children: [
    {
      path: 'walletList',
      name: 'walletList',
      component: () => import('@/views/wallet/walletList.vue'),
      meta: {
        locale: '钱包列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'cashNote',
      name: 'cashNote',
      component: () => import('@/views/wallet/cashNote.vue'),
      meta: {
        locale: '提现记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'rechargeNote',
      name: 'rechargeNote',
      component: () => import('@/views/wallet/rechargeNote.vue'),
      meta: {
        locale: '充值记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

// export default WALLET;

import axios from 'axios';

/**
 * types.WithdrawList
 */
export interface Withdraw {
  /**
   * 交易后金额 余额
   */
  after_balance?: number;
  /**
   * 提现金额
   */
  amount?: number;
  /**
   * 审核状态 1=待审核 2=审核通过 3=审核不通过
   */
  audit_status?: number;
  /**
   * 审核人id
   */
  audit_user_id?: number;
  /**
   * 交易前金额 余额
   */
  before_balance?: number;
  /**
   * 手续费
   */
  charge?: number;
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 实际到账金额
   */
  real_amount?: number;
  /**
   * 原因或备注
   */
  remark?: string;
  /**
   * 订单编号
   */
  serial_number?: string;
  /**
   * 交易状态 1=进行中 2=成功 3=失败
   */
  status?: number;
  /**
   * 更新时间
   */
  updated_at?: string;
  /**
   * 用户id
   */
  user_id?: number;
  /**
   * 用户昵称
   */
  user_name?: string;
  /**
   * 用户手机号
   */
  user_phone?: string;
  /**
   * 钱包id
   */
  wallet_id?: number;
}

/**
 * types.GetWithdrawListResp
 */
export interface WithdrawList {
  /**
   * 当前页
   */
  current_page?: number;
  /**
   * 总数
   */
  total?: number;
  withdraw_list?: Withdraw[];
}

/**
 * types.GetWithdrawListReq
 */
export interface WithdrawParam {
  /**
   * 状态0=全部 1=待审核 2=审核通过 3=审核不通过 默认0
   */
  audit_status?: number;
  /**
   * 当前页码 默认1
   */
  pageNum?: number;
  /**
   * 每页数 默认10
   */
  pageSize?: number;
  /**
   * 订单编号
   */
  serial_number?: string;
  /**
   * 交易状态 0=全部  1=进行中 2=成功 3=失败 默认0
   */
  status?: number;
}

// 获取提现列表
export function fetchWithdrawList(params: WithdrawParam) {
  return axios.post<WithdrawList>('/admin/withdraw/list', params);
}

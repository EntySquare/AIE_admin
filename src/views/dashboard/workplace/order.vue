<template>
  <div >
    <!--    <div class="left-side">-->
    <!--      <div class="panel">-->
    <!--        <DataPanel />-->
    <!--      </div>-->
    <!--    </div>-->
    <div>
      <a-card>
        <a-typography-title :heading="6"> 订单信息</a-typography-title>
        <a-divider />
        <a-form>
<!--          <a-row :gutter="16">-->
<!--            <a-col :span="6">-->
<!--              <a-form-item-->
<!--                field="productName"-->
<!--                label="钱包地址搜索:"-->
<!--                label-col-flex="100px"-->
<!--                :model="inputAddress"-->
<!--              >-->
<!--                <a-input-->
<!--                  v-model="inputAddress.address"-->
<!--                  placeholder="请输入查询的手机号码"-->
<!--                  style="width: 300px"-->
<!--                />-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :span="4" :offset="2">-->
<!--              <a-space :size="18">-->
<!--                <a-button type="primary" @click="getUserInfo">-->
<!--                  <icon-search :size="20" />-->
<!--                  查询-->
<!--                </a-button>-->
<!--              </a-space>-->
<!--            </a-col>-->
<!--          </a-row>-->
        </a-form>

        <a-table :data="orderInfo" style="margin-top: 20px" :scroll="scrollPercent" :scrollbar="scrollbar">
          <template #columns>
            <a-table-column title="用户地址" data-index="user_address"  width="230"></a-table-column>
            <a-table-column title="金额" data-index="amount"  width="80">
              <template #cell="{ record }">
                {{ formatBalance18(record.amount, 2)}}
              </template>
            </a-table-column>
            <a-table-column title="算力" data-index="power"  width="80">
              <template #cell="{ record }">
                {{ formatBalance18(record.power, 2)}}
              </template>
            </a-table-column>
            <a-table-column title="类型" data-index="type"  width="80">
              <template #cell="{ record }">
                <a-space>
                  <a-tag v-if="record.type === 1" color="green">云算力</a-tag>
                  <a-tag v-if="record.type === 2" color="blue">整机</a-tag>
                  <a-tag v-if="record.type === 3" color="yellow">社区创始人</a-tag>
                  <a-tag v-if="record.type === 4" color="blue">联合创始人</a-tag>

                </a-space>
              </template>
            </a-table-column>
            <a-table-column title="状态" data-index="order_status"  width="80">
              <template #cell="{ record }">
                <a-space>
                  <a-tag v-if="record.type === 1" color="green">未激活</a-tag>
                  <a-tag v-if="record.type === 2" color="blue">已激活</a-tag>
                  <a-tag v-if="record.type === 3" color="yellow">以过期</a-tag>

                </a-space>
              </template>
            </a-table-column>
            <a-table-column title="支付时间" data-index="pay_time"  width="150"></a-table-column>
            <a-table-column title="结束时间" data-index="end_time"  width="150"></a-table-column>



            <!--            <a-table-column title="用户身份" data-index="identity">-->
            <!--              <template #cell="{ record }">-->
            <!--                <a-space>-->
            <!--                  <a-tag v-if="record.identity === 1" color="green">代理商</a-tag>-->
            <!--                  <a-tag v-if="record.identity === 0" color="blue">普通用户</a-tag>-->

            <!--                </a-space>-->
            <!--              </template>-->
            <!--            </a-table-column>-->

            <!--          <a-table-column-->
            <!--            title="成长值"-->
            <!--            data-index="growth_value"-->
            <!--          ></a-table-column>-->
            <!--          <a-table-column title="" data-index="balance"></a-table-column>-->
            <!--            <a-table-column title="余额" data-index="balance"></a-table-column>-->
            <!--          <a-table-column title="地址详情" data-index="">-->
            <!--            <template #cell="{ record }">-->
            <!--              <a-button type="primary" @click="openAddressList(record.userId)"-->
            <!--                >详情</a-button-->
            <!--              >-->
            <!--            </template>-->
            <!--          </a-table-column>-->
            <!--          <a-table-column title="优惠卷详情" data-index="">-->
            <!--            <template #cell="{ record }">-->
            <!--              <a-button type="primary" @click="openCouponList(record.userId)"-->
            <!--                >详情</a-button-->
            <!--              >-->
            <!--            </template>-->
            <!--          </a-table-column>-->
<!--                        <a-table-column title="操作">-->
<!--                          <template #cell="{ record }">-->
<!--                            <div v-if="record.order_status == 0">-->
<!--                              <a-popconfirm content="您确定要激活吗"  >-->
<!--                                <a-button type="primary" status="danger" >激活订单</a-button>-->
<!--                              </a-popconfirm>-->
<!--                            </div>-->

<!--                          </template>-->
<!--                        </a-table-column>-->
          </template>
        </a-table>
      </a-card>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { getOrderList} from "@/api/user";
import Web3 from 'web3';

const scroll = {
  x: 2000,
  y: 200
};
const scrollPercent = {
  x: '120%',
  y: '100%'
};

const orderInfo = ref([] as any);

const inputAddress = reactive({
  address: ""
});

const getOrderInfo = async () => {
  const res = await getOrderList()
  orderInfo.value = res.json;
}

const  formatBalance18 =  (balance: string | number | null, decimal: string | number): number => {
  if (balance == null || balance.toString() == null) {
    return 0;
  }
  const parsedBalance = typeof balance === 'string' ? balance : balance.toString();
  const etherValue = Web3.utils.fromWei(parsedBalance, 'ether');
  const decimalNumber = typeof decimal === 'string' ? parseInt(decimal, 10) : decimal as number;
  return parseFloat(etherValue).toFixed(decimalNumber);
}

onMounted(() => {
  getOrderInfo();
});

</script>

<style lang="less" scoped>
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  padding-bottom: 0;
  display: flex;
}

.left-side {
  flex: 1;
  overflow: auto;
}

.right-side {
  width: 280px;
  margin-left: 16px;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}

:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}

.moduler-wrap {
  border-radius: 4px;
  background-color: var(--color-bg-2);

  :deep(.text) {
    font-size: 12px;
    text-align: center;
    color: rgb(var(--gray-8));
  }

  :deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }

    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
        background-color: #e8f3ff;
      }

      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    background-color: rgb(var(--gray-1));
    border-radius: 4px;
  }
}
</style>

<style lang="less" scoped>
// responsive
.mobile {
  .container {
    display: block;
  }

  .right-side {
    // display: none;
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>

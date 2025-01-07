<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 抽奖列表</a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="value3" label="支付订单ID" label-col-flex="">
                <a-input
                  v-model.trim="form.paymentsOrderId"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="机器人ID" label-col-flex="">
                <a-input
                  v-model.trim="form.robotId"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="用户ID" label-col-flex="">
                <a-input
                  v-model.trim="form.userId"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
<!--            <a-col :span="12">-->
<!--              <a-form-item field="value2" label="状态" label-col-flex="">-->
<!--                <a-select-->
<!--                  v-model="options"-->
<!--                  placeholder="请选择"-->
<!--                  @change="handleSelectChange"-->
<!--                >-->
<!--                  <a-select-option-->
<!--                    v-for="option in options"-->
<!--                    :key="option.lable"-->
<!--                    :value="option.lable"-->
<!--                  >-->
<!--                    {{ option.label }}-->
<!--                  </a-select-option>-->
<!--                </a-select>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
            <a-col :span="12">
              <a-form-item field="value3" label="时间段" label-col-flex="">
                <a-range-picker
                  style="width: 360px; margin: 0 24px 24px 0"
                  :time-picker-props="{
                    defaultValue: ['00:00:00', '09:09:06'],
                  }"
                  format="YYYY-MM-DD HH:mm"
                  @change="onChange"
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-space>
                <a-button type="primary" @click="getlList">查询</a-button>
                <a-button type="primary" @click="resetForm">重置筛选</a-button>
              </a-space>
            </a-col>
          </a-row>
        </a-form>

        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
          >
            <a-table :data="List" style="margin-top: 20px" :pagination="false">
              <template #columns>
                <a-table-column title="ID" data-index="id"></a-table-column>
                <a-table-column
                  title="用户ID"
                  data-index="user_id"
                ></a-table-column>
                <a-table-column
                  title="支付订单ID"
                  data-index="payments_order_id"
                ></a-table-column>
                <a-table-column
                  title="机器人ID"
                  data-index="robot_id"
                ></a-table-column>
                <a-table-column
                  title="机器人名称"
                  data-index="robot_name"
                ></a-table-column>
                <a-table-column
                  title="中奖金额"
                  data-index="amount"
                ></a-table-column>
                <a-table-column title="hash" data-index="hash"></a-table-column>
                <a-table-column
                  title="状态"
                  data-index="status"
                ></a-table-column>
                <a-table-column title="状态" data-index="">
                  <template #cell="{ record }">
                    <a-tag color="blue">{{
                        record.status === 0
                          ? '未开奖'
                          : record.status === 1
                            ? '未中奖'
                            : record.status === 2
                              ? '已中奖'
                              : '未知'
                      }}</a-tag>
                  </template>
                </a-table-column>
                <a-table-column
                  title="中奖时间"
                  data-index="lottery_time"
                >
                  <template #cell="{ record }">
                    {{ formatDate(record.lottery_time) }}
                  </template>
                </a-table-column>
                <a-table-column
                  title="创建时间"
                  data-index="created_at"
                >
                  <template #cell="{ record }">
                    {{ formatDate(record.created_at) }}
                  </template></a-table-column>
              </template>
            </a-table>
            <div style="display: flex; justify-content: flex-end">
              <a-pagination
                :total="totalLottery"
                :current="form.pageIndex + 1"
                :page-size="10"
                show-total
                @change="
                  (current) => {
                    handlePageChange(current);
                  }
                "
              ></a-pagination>
            </div>
          </a-grid-item>
        </a-grid>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
  import { Message } from '@arco-design/web-vue';
  import { onMounted, reactive, ref } from 'vue';
  import { getLotteryRecord } from '@/api/lottery';

  interface LotteryStatus {
    [key: string]: string;
  }

  const List = ref([]);
  const loading = ref(false);
  // const options = reactive([
  //   { '0': '未中奖' },
  //   { '1': '未开奖' },
  //   { '2': '已中奖' },
  // ]);
  const form = reactive({
    pageIndex: 0,
    pageSize: 10,
    twitterAccount: '',
    paymentsOrderId: '',
    robotId: '',
    status: -1,
    userId: '',
    endTime: '',
    startTime: '',
  });

  // 时间格式化
  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const totalLottery = ref(0);
  const getlList = async () => {
    try {
      loading.value = true;
      const res = await getLotteryRecord({
        pageIndex: form.pageIndex + 1,
        pageSize: form.pageSize,
        endTime: form.endTime,
        startTime: form.startTime,
        // twitterAccount: form.twitterAccount,
        paymentsOrderId: form.paymentsOrderId,
        robotId: form.robotId,
        status: form.status,
        userId: form.userId,
      });
      if (res.code === 0) {
        List.value = res.data.data;
        totalLottery.value = res.data.total;
      }
    } catch (err) {
      // 1
    } finally {
      loading.value = false;
    }
  };

  const handlePageChange = (current: number) => {
    if (current - 1 !== form.pageIndex) {
      form.pageIndex = current - 1;
      getlList();
    }
  };
  const resetForm = () => {
    form.pageIndex = 0;
    form.pageSize = 10;
    form.endTime = '';
    form.startTime = '';
    form.twitterAccount = '';
    form.paymentsOrderId = '';
    form.robotId = '';
    form.status = -1;
    form.userId = '';
    getlList();
  };

  const onChange = (dates: any) => {
    // eslint-disable-next-line prefer-destructuring
    form.startTime = dates[0];
    // eslint-disable-next-line prefer-destructuring
    form.endTime = dates[1];
    console.log(form);
  };

  onMounted(async () => {
    getlList();
  });
</script>

<style scoped></style>

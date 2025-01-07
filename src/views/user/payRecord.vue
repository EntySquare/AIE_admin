<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 支付记录列表 </a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item field="value3" label="状态" label-col-flex="">
                <a-select
                  v-model="form.status"
                  allow-clear
                  :style="{ width: '200px' }"
                  placeholder="Please select ..."
                >
                  <a-option
                    v-for="(item, index) in optionType"
                    :key="index"
                    :value="item.value"
                    :label="item.label"
                  />
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="value3" label="用户ID" label-col-flex="">
                <a-input
                  v-model.trim="form.userId"
                  :style="{ width: '200px' }"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="value3" label="机器人ID" label-col-flex="">
                <a-input
                  v-model.trim="form.robotId"
                  :style="{ width: '200px' }"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="value3" label="哈希" label-col-flex="">
                <a-input
                  v-model.trim="form.hash"
                  :style="{ width: '300px' }"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item field="value3" label="订单号" label-col-flex="">
                <a-input
                  v-model.trim="form.orderId"
                  :style="{ width: '200px' }"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-space>
                <a-button type="primary" @click="queryListData()"
                  >查询</a-button
                >

                <a-button type="primary" @click="resetClick()"
                  >重置筛选</a-button
                >
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
                <a-table-column
                  title="订单号"
                  data-index="order_id"
                ></a-table-column>

                <a-table-column
                  title="用户ID"
                  data-index="user_id"
                ></a-table-column>

                <a-table-column
                  title="机器人ID"
                  data-index="robot_id"
                ></a-table-column>

                <a-table-column title="金额" data-index="amount">
                </a-table-column>

                <a-table-column title="哈希" data-index="hash">
                </a-table-column>

                <a-table-column title="状态" data-index="">
                  <template #cell="{ record }">
                    <a-tag color="blue">{{
                      record.status === 0
                        ? '未支付'
                        : record.status === 1
                        ? '已支付'
                        : record.status === 2
                        ? '已同步'
                        : record.status === 3
                        ? '异常'
                        : '未知'
                    }}</a-tag>
                  </template>
                </a-table-column>

                <a-table-column title="结算状态" data-index="">
                  <template #cell="{ record }">
                    <a-tag color="blue">{{
                      record.settle === 0
                        ? '未结算'
                        : record.settle === 1
                        ? '已结算'
                        : '未知'
                    }}</a-tag>
                  </template>
                </a-table-column>

                <a-table-column
                  title="结算哈希"
                  data-index="settle_hash"
                ></a-table-column>

                <a-table-column title="同步时间" data-index="sync_time">
                  <template #cell="{ record }">
                    {{ formatDate(record.sync_time) }}
                  </template>
                </a-table-column>

                <a-table-column
                  title="次数"
                  data-index="times"
                ></a-table-column>

                <a-table-column
                  title="备注"
                  data-index="remark"
                ></a-table-column>

                <!--              <a-table-column title="操作">-->
                <!--                <template #cell>-->
                <!--                  <div>-->
                <!--                    <a-button type="primary">修改</a-button>-->
                <!--                    <a-button type="primary">禁止收益</a-button>-->
                <!--                    <a-button type="primary">禁止提现</a-button>-->
                <!--                    <a-button type="primary">添加订单</a-button>-->
                <!--                  </div>-->
                <!--                </template>-->
                <!--              </a-table-column>-->
              </template>
            </a-table>
            <div style="display: flex; justify-content: flex-end">
              <a-pagination
                :total="total"
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
  import { onMounted, reactive, ref } from 'vue';
  import { getPayRecordListApi } from '@/api/user';

  const List = ref([]);
  const total = ref(0);
  const loading = ref(false);

  const optionType = [
    { label: '未支付', value: 0 },
    { label: '已支付', value: 1 },
    { label: '已同步', value: 2 },
    { label: '异常', value: 3 },
  ];

  const form = reactive({
    hash: '',
    orderId: '',
    robotId: '',
    status: '',
    userId: '',
    pageSize: 10,
    pageIndex: 0,
  });

  // const changeTime = (time: string) => {
  //   return time.replace('T', ' ').split('+')[0];
  // };

  // 时间格式化
  const formatDate = (timestamp: any) => {
    if (timestamp === "0001-01-01T00:00:00Z") {
      return '';
    }
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 查询用户列表
  const queryListData = async () => {
    try {
      loading.value = true;
      const res = await getPayRecordListApi({
        robotId: Number(form.robotId),
        userId: Number(form.userId),
        hash: form.hash,
        orderId: form.orderId,
        status: form.status,
        pageSize: form.pageSize,
        pageIndex: Number(form.pageIndex + 1),
      });
      if (res.code === 0) {
        List.value = res.data.list;
        total.value = res.data.total;
      }
      console.log('查询支付记录列表数据：', res);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      loading.value = false;
    }
  };

  const handlePageChange = (current: number) => {
    if (current - 1 !== form.pageIndex) {
      form.pageIndex = current - 1;
      queryListData();
    }
  };

  const resetClick = () => {
    form.orderId = '';
    form.userId = '';
    form.hash = '';
    form.status = '';
    form.robotId = '';
    form.pageIndex = 0;
    queryListData();
  };

  onMounted(async () => {
    queryListData();
  });
</script>

<style scoped></style>

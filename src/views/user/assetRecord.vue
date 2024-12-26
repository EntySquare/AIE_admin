<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 资产记录列表 </a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item field="value3" label="操作类型" label-col-flex="">
                <a-select
                  v-model="form.operate"
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
                  title="资产记录ID"
                  data-index="id"
                ></a-table-column>

                <a-table-column
                  title="用户ID"
                  data-index="user_id"
                ></a-table-column>

                <a-table-column
                  title="关联ID"
                  data-index="other_id"
                ></a-table-column>

                <a-table-column title="操作金额" data-index="amount">
                </a-table-column>

                <a-table-column title="操作类型" data-index="">
                  <template #cell="{ record }">
                    <a-tag color="blue">{{ record.operate === 1 ? '创建机器人' : record.operate === 2 ? '聊天支付' : record.operate === 3 ? '聊天收益（零点结算)' : '未知' }}</a-tag>
                  </template>
                </a-table-column>

                <a-table-column
                  title="AIE余额修改前"
                  data-index="leftBalanceAie"
                >
                </a-table-column>

                <a-table-column
                  title="AIE余额修改后"
                  data-index="rightBalanceAie"
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
  import { getAssetRecordListApi } from '@/api/user';

  const List = ref([]);
  const total = ref(0);
  const loading = ref(false);

  const optionType = [
    { label: '创建机器人', value: 1 },
    { label: '聊天支付', value: 2 },
    { label: '聊天收益（零点结算)', value: 3 },
  ];

  const form = reactive({
    operate: '',
    userId: '',
    pageSize: 10,
    pageIndex: 0,
  });

  // 查询用户列表
  const queryListData = async () => {
    try {
      loading.value = true;
      const res = await getAssetRecordListApi({
        operate: Number(form.operate),
        userId: Number(form.userId),
        pageSize: form.pageSize,
        pageIndex: Number(form.pageIndex + 1),
      });
      if (res.code === 0) {
        List.value = res.data.data;
        total.value = res.data.total;
      }
      console.log('查询资产记录列表数据：', res);
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
    form.operate = '';
    form.userId = '';
    form.pageIndex = 0;
    queryListData();
  };

  onMounted(async () => {
    queryListData();
  });
</script>

<style scoped></style>

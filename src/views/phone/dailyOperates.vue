<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 转发回复统计列表 </a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                field="value3"
                label="twitter账户名称"
                label-col-flex=""
              >
                <a-input
                  v-model.trim="form.twitterAccount"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
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
                <a-table-column
                  title="转发总数"
                  data-index="forwardCount"
                ></a-table-column>
                <a-table-column
                  title="转发失败数"
                  data-index="forwardFailCount"
                ></a-table-column>
                <a-table-column
                  title="转发成功数"
                  data-index="forwardSuccessCount"
                ></a-table-column>
                <a-table-column
                  title="回复总数"
                  data-index="replyCount"
                ></a-table-column>
                <a-table-column
                  title="回复失败数"
                  data-index="replyFailCount"
                ></a-table-column>
                <a-table-column
                  title="回复成功数"
                  data-index="replySuccessCount"
                ></a-table-column>
                <a-table-column
                  title="推特用户名"
                  data-index="tweets_user_name"
                ></a-table-column>
              </template>
            </a-table>
            <div style="display: flex; justify-content: flex-end">
              <a-pagination
                :total="totalUserInfos"
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
  import { getDailyOperatesApi } from '@/api/phone';

  const List = ref([]);
  const loading = ref(false);

  const form = reactive({
    pageIndex: 0,
    pageSize: 10,
    twitterAccount: '',
    endDate: '',
    startDate: '',
  });

  const totalUserInfos = ref(0);
  const getlList = async () => {
    try {
      loading.value = true;
      const res = await getDailyOperatesApi({
        pageIndex: form.pageIndex + 1,
        pageSize: form.pageSize,
        endDate: form.endDate,
        startDate: form.startDate,
        twitterAccount: form.twitterAccount,
      });
      if (res.code === 0) {
        List.value = res.data.data;
        totalUserInfos.value = res.data.total;
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
    form.endDate = '';
    form.startDate = '';
    form.twitterAccount = '';
    getlList();
  };

  const onChange = (dates: any) => {
    // eslint-disable-next-line prefer-destructuring
    form.startDate = dates[0];
    // eslint-disable-next-line prefer-destructuring
    form.endDate = dates[1];
    console.log(form)
  };

  onMounted(async () => {
    getlList();
  });
</script>

<style scoped></style>

<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 喂养记录 </a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item field="userId" label="用户ID" label-col-flex="">
                <a-input-number
                  v-model.trim="form.userId"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="robotId" label="机器人ID" label-col-flex="">
                <a-input-number
                  v-model.trim="form.robotId"
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
            <a-table
              :data="feedsRecord"
              style="margin-top: 20px"
              :pagination="false"
            >
              <template #columns>
                <a-table-column title="ID" data-index="Id"></a-table-column>

                <a-table-column
                  title="喂养内容"
                  data-index="Content"
                ></a-table-column>

                <a-table-column
                  title="文档ID"
                  data-index="document_id"
                ></a-table-column>
                <a-table-column
                  title="文档段落ID"
                  data-index="document_item_id"
                ></a-table-column>

                <a-table-column
                  title="喂养类型"
                  data-index="FeedTypeID"
                ></a-table-column>

                <a-table-column
                  title="机器人ID"
                  data-index="RobotID"
                ></a-table-column>
                <a-table-column
                  title="用户ID"
                  data-index="UserID"
                ></a-table-column>
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
  import { Message } from '@arco-design/web-vue';
  import { getFeedsRecord } from '@/api/feed';

  const feedsRecord = ref([]);
  const loading = ref(false);
  const total = ref(0);
  const form = reactive({
    userId: 0,
    robotId: 0,
    pageSize: 10,
    pageIndex: 0,
  });
  // 查列表
  const queryListData = async () => {
    try {
      loading.value = true;
      const res = await getFeedsRecord({
        userId: form.userId,
        robotId: form.robotId,
        pageSize: form.pageSize,
        pageIndex: Number(form.pageIndex + 1),
      });
      if (res.code === 0) {
        feedsRecord.value = res.data.data;
        total.value = res.data.total;
      }
      loading.value = false;
    } catch (err) {
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
    form.userId = 0;
    form.robotId = 0;
    form.pageIndex = 0;
    queryListData();
  };

  onMounted(async () => {
    queryListData();
  });
</script>

<style scoped></style>

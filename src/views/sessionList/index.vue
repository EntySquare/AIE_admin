<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 会话列表 </a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                field="value3"
                label="机器人ID
"
                label-col-flex=""
              >
                <a-input
                  v-model="form.robotId"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="用户ID" label-col-flex="">
                <a-input
                  v-model="form.userId"
                  placeholder="please enter..."
                  allow-clear
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
                <!-- <a-table-column title="用户ID" data-index="id"></a-table-column> -->

                <a-table-column title="会话ID" data-index="chat_id">
                </a-table-column>

                <a-table-column
                  title="机器人ID"
                  data-index="robot_id"
                ></a-table-column>

                <a-table-column
                  title="状态"
                  data-index="state"
                ></a-table-column>

                <a-table-column
                  title="用户ID"
                  data-index="user_id"
                ></a-table-column>

                <a-table-column title="操作">
                  <template #cell="{}">
                    <!-- <a-button type="primary" @click="modifiedState(record.id)"
                      >修改状态</a-button
                    > -->
                  </template>
                </a-table-column>
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
import { getChatList } from '@/api/session';
import { onMounted, ref } from 'vue';

const List = ref([]);
const loading = ref(false);
const form = ref({
  pageIndex: 0,
  pageSize: 10,
  robotId: '',
  userId: '',
});
const totalUserInfos = ref(0);
const getlList = async () => {
  console.log(form.value.pageIndex)
  try {
    loading.value = true;
    const res = await getChatList({
      pageIndex: form.value.pageIndex + 1,
      pageSize: form.value.pageSize,
      robotId: form.value.robotId ? form.value.robotId : '',
      userId: form.value.userId ? form.value.userId : '',
    });
    if (res.code === 0) {
      List.value = res.data.chat_list;
      totalUserInfos.value = res.data.count;
    }
  } catch (err) {
    // 1
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (current: number) => {
  if (current - 1 !== form.value.pageIndex) {
    form.value.pageIndex = current - 1;
    getlList();
  }
};
const resetForm = () => {
  form.value = { pageIndex: 1, pageSize: 10, robotId: '', userId: '' };
  getlList();
};

onMounted(async () => {
  getlList();
});
</script>

<style scoped></style>

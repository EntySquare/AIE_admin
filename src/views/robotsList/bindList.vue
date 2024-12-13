<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6">
          机器人twitter绑定列表
        </a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="value3" label="机器人名字" label-col-flex="">
                <a-input
                  v-model.trim="form.robotName"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="用户Id" label-col-flex="">
                <a-input
                  v-model.trim="form.userId"
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
                <a-table-column
                  title="机器人id"
                  data-index="ID"
                ></a-table-column>
                <a-table-column title="机器人名字" data-index="RobotName"></a-table-column>
                <a-table-column
                  title="用户ID"
                  data-index="UserID"
                ></a-table-column>
                <a-table-column
                    title="推特账号"
                    data-index="TwitterAccount"
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
import {getRobotBindList, getRobotList, updateRobot} from '@/api/robots';
  import { Message } from '@arco-design/web-vue';
  import { onMounted, reactive, ref } from 'vue';

  const List = ref([]);
  const loading = ref(false);

  const form = ref({
    pageIndex: 0,
    pageSize: 10,
    userId: '',
    robotName: '',
  });

  const totalUserInfos = ref(0);
  const getlList = async () => {
    try {
      loading.value = true;
      const res = await getRobotBindList({
        pageIndex: form.value.pageIndex + 1,
        pageSize: form.value.pageSize,
        robotName: form.value.robotName,
        userId: Number(form.value.userId),
      });
      if (res.code === 0) {
        List.value = res.data.binds;
        totalUserInfos.value = res.data.total;
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
    form.value = {
      pageIndex: 0,
      pageSize: 10,
      userId: '',
      robotName: '',
    };
    getlList();
  };


  onMounted(async () => {
    getlList();
  });
</script>

<style scoped></style>

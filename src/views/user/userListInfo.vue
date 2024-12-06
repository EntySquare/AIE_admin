<template>
  <div class="container">
    <a-card :loading="loading">
      <a-typography-title :heading="6"> 用户详情 </a-typography-title>
      <a-divider />
      <a-form :model="form" style="padding-right: 120px">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item field="value3" label="用户地址" label-col-flex="">
              <a-input
                v-model.trim="form.address"
                placeholder="please enter..."
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="value3" label="用户名" label-col-flex="">
              <a-input
                v-model.trim="form.name"
                placeholder="please enter..."
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="14">
            <a-form-item field="value2" label="相关机器人ID" label-col-flex="">
              <a-input
                v-model.trim="form.robotId"
                placeholder="please enter..."
                allow-clear
              />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-space>
              <a-button type="primary" @click="queryUserListData()"
                >查询</a-button
              >

              <a-button type="primary" @click="resetClick()">重置筛选</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>

      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
        >
          <a-table
            :data="userList"
            style="margin-top: 20px"
            :pagination="false"
          >
            <template #columns>
              <a-table-column title="用户ID" data-index="id"></a-table-column>

              <a-table-column
                title="用户名称"
                data-index="name"
              ></a-table-column>

              <a-table-column
                title="用户地址"
                data-index="address"
              ></a-table-column>

              <a-table-column title="用户余额" data-index="amount">
              </a-table-column>

              <a-table-column title="用户头像" data-index="avatar">
                <template #cell="{ record }">
                  <img
                    :src="record.avatar"
                    alt="头像"
                    style="
                      width: 30px;
                      height: 30px;
                      border-radius: 50%;
                      margin-right: 8px;
                    "
                  />
                </template>
              </a-table-column>

              <a-table-column
                title="与机器人对话次数"
                data-index="chatCount"
              ></a-table-column>

              <a-table-column
                title="相关机器人"
                data-index="robotId"
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getUserInfoApi } from '@/api/user';

const userList = ref([]);
const total = ref(0);
const loading = ref(false);

const form = reactive({
  address: '',
  name: '',
  robotId: '',
  pageSize: 10,
  pageIndex: 0,
});

// 查询用户列表
const queryUserListData = async () => {
  try {
    loading.value = true;
    const res = await getUserInfoApi({
      address: form.address,
      name: form.name,
      robotId: form.robotId,
      pageSize: form.pageSize,
      pageIndex: Number(form.pageIndex + 1),
    });
    if (res.code === 0) {
      userList.value = res.data.users;
      total.value = res.data.total;
    }
    console.log('查询用户列表数据：', res);
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (current: number) => {
  if (current - 1 !== form.pageIndex) {
    form.pageIndex = current - 1;
    queryUserListData();
  }
};

const resetClick = () => {
  form.address = '';
  form.name = '';
  form.robotId = '';
  form.pageIndex = 0;
  queryUserListData();
};

onMounted(async () => {
  queryUserListData();
});
</script>

<style scoped></style>

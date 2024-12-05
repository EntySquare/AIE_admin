<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6"> 用户详情 </a-typography-title>
      <a-divider />
      <a-form :model="form" style="padding-right: 120px">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item field="value3" label="用户地址" label-col-flex="">
              <a-input v-model="form.address" placeholder="please enter..." />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="value3" label="用户名" label-col-flex="">
              <a-input v-model="form.username" placeholder="please enter..." />
            </a-form-item>
          </a-col>
          <a-col :span="14">
            <a-form-item field="value2" label="相关机器人ID" label-col-flex="">
              <a-input v-model="form.robotId" placeholder="please enter..." />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-button type="primary">重置筛选</a-button>
          </a-col>
        </a-row>
      </a-form>

      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
        >
          <a-table :data="userList" style="margin-top: 20px" >
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
        </a-grid-item>
      </a-grid>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { getUserInfoApi } from '@/api/user';

  const userList = ref([]);

  const form = reactive({
    address: '',
    username: '',
    robotId: '',
    pageSize: 10,
    page: 1,
  });

  // 查询用户列表
  const queryUserListData = async () => {
    try {
      const res = await getUserInfoApi(form);
      if (res.code === 0) {
        userList.value = res.data.users;
      }
      console.log('查询用户列表数据：', res);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  onMounted(async () => {
    queryUserListData();
  });
</script>

<style scoped></style>

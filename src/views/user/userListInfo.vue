<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6"> 用户详情 </a-typography-title>
      <a-divider />
      <a-form :model="form" style="padding-right: 120px">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item field="value3" label="用户地址" label-col-flex="">
              <a-input v-model="form.value3" placeholder="please enter..." />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="value3" label="上级ID" label-col-flex="">
              <a-input v-model="form.value3" placeholder="please enter..." />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="value2" label="邀请码" label-col-flex="">
              <a-input v-model="form.value2" placeholder="please enter..." />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-button type="primary">重置筛选</a-button>
          </a-col>
        </a-row>
      </a-form>

      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
        >
          <a-table :data="userList" style="margin-top: 20px">
            <template #columns>
              <a-table-column
                title="用户ID"
                data-index="from_phone"
              ></a-table-column>

              <a-table-column title="钱包地址" data-index="nft_img">
              </a-table-column>

              <a-table-column
                title="激活状态"
                data-index="nft_name"
              ></a-table-column>

              <a-table-column
                title="邀请码"
                data-index="to_phone"
              ></a-table-column>

              <a-table-column
                title="上级ID"
                data-index="price"
              ></a-table-column>

              <a-table-column
                title="推荐人数"
                data-index="time"
              ></a-table-column>

              <a-table-column
                title="团队人数"
                data-index="time"
              ></a-table-column>

              <a-table-column
                title="可用USDT"
                data-index="time"
              ></a-table-column>

              <a-table-column
                title="可用Gns"
                data-index="time"
              ></a-table-column>

              <a-table-column
                title="剩余产值"
                data-index="time"
              ></a-table-column>

              <a-table-column
                title="注册时间"
                data-index="time"
              ></a-table-column>

              <a-table-column title="操作">
                <template #cell>
                  <div>
                    <a-button type="primary">修改</a-button>
                    <a-button type="primary">禁止收益</a-button>
                    <a-button type="primary">禁止提现</a-button>
                    <a-button type="primary">添加订单</a-button>
                  </div>
                </template>
              </a-table-column>
            </template>
          </a-table>
          <div style="display: flex; justify-content: flex-end">
            <a-pagination
              :total="totalUserInfos"
              :current="form.page + 1"
              :page-size="20"
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

  const totalUserInfos = ref(0);
  const userList = ref([]);

  const form = reactive({
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    page: 0,
  });

  const handlePageChange = (current: number) => {
    if (current - 1 !== form.page) {
      form.page = current - 1;
      // queryUserListData()
    }
  };

  // 查询用户列表
  const queryUserListData = async () => {
    try {
      const res = await getUserInfoApi(form);
      if (res.code === 0) {
        userList.value = res.json.list;
      }
      console.log(res);
      console.log('交易信息列表数据：', res);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  onMounted(async () => {
    queryUserListData();
  });
</script>

<style scoped></style>

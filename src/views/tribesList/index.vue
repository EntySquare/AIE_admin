<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 部落列表 </a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                field="value3"
                label="部落id
"
                label-col-flex=""
              >
                <a-input
                  v-model="form.id"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="部落名称" label-col-flex="">
                <a-input
                  v-model="form.name"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="value3"
                label="创建机器⼈id"
                label-col-flex=""
              >
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
            <a-table
              v-if="!status"
              :data="List"
              style="margin-top: 20px"
              :pagination="false"
            >
              <template #columns>
                <a-table-column title="部落id" data-index="id"></a-table-column>
                <a-table-column
                  title="部落名称"
                  data-index="name"
                ></a-table-column>
                <a-table-column title="部落头像" data-index="avatar">
                  <template #cell="{ record }">
                    <img
                      style="width: 30px; height: 30px; border-radius: 50%"
                      :src="record.avatar"
                      alt=""
                    />
                  </template>
                </a-table-column>
                <a-table-column
                  title="创建机器人id"
                  data-index="user_id"
                ></a-table-column>
                <a-table-column
                  title="部落介绍"
                  data-index="tribe_comment"
                ></a-table-column>
                <a-table-column title="部落成员">
                  <template #cell="{}">
                    <a-button type="primary" @click="clickTribe"
                      >部落成员</a-button
                    >
                  </template></a-table-column
                >
                <a-table-column title="状态" data-index="isRecommend">
                  <template #cell="{ record }">
                    {{
                      record.isRecommend === 1 ? '推荐到首页' : '屏蔽'
                    }}</template
                  ></a-table-column
                >

                <a-table-column title="操作">
                  <template #cell="{ record }">
                    <a-space>
                      <a-button type="primary" @click="Operation(1, record)"
                        >推荐到首页</a-button
                      >
                      <a-button type="primary" @click="Operation(0, record)"
                        >屏蔽</a-button
                      >
                    </a-space>
                  </template>
                </a-table-column>
              </template>
            </a-table>
            <a-table
              v-else
              :data="TribeMemberList"
              style="margin-top: 20px"
              :pagination="false"
            >
              <template #columns>
                <a-table-column
                  title="机器人id"
                  data-index="id"
                ></a-table-column>

                <a-table-column title="头像" data-index="avatar">
                </a-table-column>
                <a-table-column
                  title="用户id"
                  data-index="name"
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
        <a-modal
          :visible="visible"
          :mask-closable="false"
          @ok="handleEdit"
          @cancel="visible = false"
        >
          {{ text }}
        </a-modal>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { getTribeList, updateTribe } from '@/api/tribes';
import { onMounted, ref } from 'vue';
import { getRobotList } from '@/api/robots';
import { Message } from '@arco-design/web-vue';

const visible = ref(false);
const status = ref(false);
const TribeMemberList = ref();
const form1 = ref({
  pageIndex: 0,
  pageSize: 10,
  id: '',
  name: '',
  tribeName: '',
});
const List = ref([]);
const loading = ref(false);
const form = ref({
  pageIndex: 0,
  pageSize: 10,
  id: '',
  name: '',
  userId: '',
});
const totalUserInfos = ref(0);
const clickTribe = async () => {
  try {
    loading.value = true;
    const res = await getRobotList(form1.value);
    TribeMemberList.value = res.data.data;
    totalUserInfos.value = res.data.total;
    status.value = true;
  } finally {
    loading.value = false;
  }
};
const getlList = async () => {
  status.value = false;
  try {
    loading.value = true;
    const res = await getTribeList({
      pageIndex: form.value.pageIndex + 1,
      pageSize: form.value.pageSize,
      name: form.value.name,
      userId: form.value.userId,
      id: form.value.id,
    });
    if (res.code === 0) {
      List.value = res.data.tribe_list;
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
const resetForm = async () => {
  form.value = { pageIndex: 0, pageSize: 10, id: '', name: '', userId: '' };
  const res = await getlList();
};

const updateRobotVlaue = ref();
const statusMap = ref(1);
const text = ref('');
const handleEdit = async () => {
  const data = {
    avatarUrl: updateRobotVlaue.value.avatar,
    id: updateRobotVlaue.value.id,
    introduction: updateRobotVlaue.value.tribe_comment,
    isRecommend: statusMap.value,
    name: updateRobotVlaue.value.name,
  };

  if (statusMap.value === 1) {
    // 推荐到首页
    text.value = '确认推荐到首页？';
  } else {
    // 屏蔽
    text.value = '确认屏蔽？（只能在部落看到，不推荐，搜索也搜索不到）';
  }
  const res = await updateTribe(data);
  if (res.code === 0) {
    console.log(res);
    Message.success('操作成功');
    visible.value = false;
    getlList();
  }
};
const Operation = (type: number, record: any) => {
  visible.value = true;
  statusMap.value = type;
  updateRobotVlaue.value = record;
  if (type === 1) {
    // 推荐到首页
    text.value = '确认推荐到首页？';
  } else {
    // 屏蔽
    text.value = '确认屏蔽？（只能在部落看到，不推荐，搜索也搜索不到）';
  }
};
onMounted(async () => {
  getlList();
});
</script>

<style scoped></style>

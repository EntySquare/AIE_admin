<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 机器人列表 </a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="value3" label="机器人id" label-col-flex="">
                <a-input
                  v-model.trim="form.id"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="字名" label-col-flex="">
                <a-input
                  v-model.trim="form.name"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="部落" label-col-flex="">
                <a-input
                  v-model.trim="form.tribeName"
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
                  data-index="id"
                ></a-table-column>
                <a-table-column
                  title="创建者钱包地址"
                  data-index="created_address"
                ></a-table-column>
                <a-table-column title="头像" data-index="avatar">
                  <template #cell="{ record }">
                    <img
                      style="width: 30px; height: 30px; border-radius: 50%"
                      :src="record.avatar"
                      alt=""
                    />
                  </template>
                </a-table-column>
                <a-table-column title="机器人名字" data-index="name">
                  <template #cell="{ record }">
                    <a-button type="text" @click="handleEdit1(record)">{{
                      record.name
                    }}</a-button></template
                  >
                </a-table-column>
                <a-table-column
                  title="所在部落"
                  data-index="tribe"
                ></a-table-column>
                <a-table-column
                  title="受欢迎度"
                  data-index="likes"
                ></a-table-column>
                <a-table-column
                  title="使用人数"
                  data-index="use_count"
                ></a-table-column>
                <!-- <a-table-column
                  title="聊天收益"
                  data-index="reward"
                ></a-table-column> -->
                <a-table-column title="状态" data-index="status">
                  <template #cell="{ record }">
                    {{
                      record.isRecommend === 1 ? '推荐到首页' : '取消推荐'
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
                        >取消推荐</a-button
                      >
                    </a-space>
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
        <a-modal
          :visible="visible"
          :mask-closable="false"
          @ok="handleEdit"
          @cancel="visible = false"
        >
          {{ text }}
        </a-modal>
        <a-modal
          :visible="visible2"
          :mask-closable="false"
          @ok="visible2 = false"
          @cancel="visible2 = false"
        >
          <p>记录时间</p>
          <a-divider />
          <p>内容</p>
        </a-modal>
        <a-modal
          :visible="visible1"
          :mask-closable="false"
          @ok="visible1 = false"
          @cancel="visible1 = false"
        >
          <p>头像： {{ nameList.avatar }}</p>
          <a-divider />
          <p>机器人名字： {{ nameList.name }}</p>
          <a-divider />
          <p v-if="nameList.sex === 1">机器人性别： 男</p>
          <p v-else-if="nameList.sex === 2">机器人性别： 女</p>
          <p v-else>机器人性别： 其它</p>
          <a-divider />
          <p>一句话介绍： {{ nameList.characterIntroduction }}</p>
          <a-divider />
          <p>标签： {{ nameList.tag }}</p>
          <a-divider />

          <p>机器人性格： {{ nameList.personalityTraits }}</p>
          <a-divider />
          <p>机器人配置： {{ nameList.configurationTips }}</p>
          <a-divider />

          <p
            ><a-button type="text" style="padding: 0" @click="FeedingRecord"
              >喂养记录： {{ nameList.feedCount }}
            </a-button></p
          >
        </a-modal>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { getRobotList, updateRobot } from '@/api/robots';
import { Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';

const List = ref([]);
const loading = ref(false);
const form = ref({
  pageIndex: 0,
  pageSize: 10,
  id: '',
  name: '',
  tribeName: '',
});

const updateRobotVlaue = ref();
const totalUserInfos = ref(0);
const getlList = async () => {
  try {
    loading.value = true;
    const res = await getRobotList({
      pageIndex: form.value.pageIndex + 1,
      pageSize: form.value.pageSize,
      name: form.value.name,
      tribeName: form.value.tribeName,
      id: form.value.id,
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
  if (current - 1 !== form.value.pageIndex) {
    form.value.pageIndex = current - 1;
    getlList();
  }
};
const resetForm = () => {
  form.value = { pageIndex: 0, pageSize: 10, id: '', name: '', tribeName: '' };
  getlList();
};
const visible = ref(false);
const visible2 = ref(false);
const status = ref(1);
const text = ref('');
const handleEdit = async () => {
  const dataList = ref({
    avatarUrl: updateRobotVlaue.value.avatar,
    characterIntroduction: updateRobotVlaue.value.characterIntroduction,
    configurationTips: updateRobotVlaue.value.configurationTips,
    id: Number(updateRobotVlaue.value.id),
    isRecommend: status.value,
    name: updateRobotVlaue.value.name,
    sex: updateRobotVlaue.value.sex,
    tag: updateRobotVlaue.value.tag,
  });

  const res = await updateRobot(dataList.value);
  if (res.code === 0) {
    console.log(res);
    Message.success('操作成功');
    visible.value = false;
    getlList();
  }
};
const Operation = (type: number, record: any) => {
  visible.value = true;
  status.value = type;
  updateRobotVlaue.value = record;
  if (type === 1) {
    // 推荐到首页
    text.value = '确认推荐到首页？';
  } else {
    // 屏蔽
    text.value = '确认取消推荐';
  }
};

const visible1 = ref(false);
const nameList = ref<any>({});
const handleEdit1 = async (record: any) => {
  nameList.value = record;
  console.log('11111');

  if (nameList.value) {
    visible1.value = true;
    console.log('22222222');
  }
};

const FeedingRecord = () => {
  visible2.value = true;
};
onMounted(async () => {
  getlList();
});
</script>

<style scoped></style>

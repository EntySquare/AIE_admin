<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 统计数据 </a-typography-title>
        <a-divider />
        <div v-if="dataLoaded">
          <a-space>
            <a-typography-text>授权用户数量:</a-typography-text>
            <a-typography-text>{{ List.user_count }}</a-typography-text>
          </a-space>
          <a-divider />
          <a-space>
            <a-typography-text>机器人数量:</a-typography-text>
            <a-typography-text>{{ List.robot_count }}</a-typography-text>
          </a-space>
          <a-divider />
          <a-space>
            <a-typography-text>部落数量:</a-typography-text>
            <a-typography-text>{{ List.tribe_count }}</a-typography-text>
          </a-space>
          <a-divider />
          <a-space>
            <a-typography-text>总聊天收益:</a-typography-text>
            <a-typography-text>{{ List.chat_reward_count }}</a-typography-text>
          </a-space>
          <a-divider />
          <a-space>
            <a-typography-text>聊天数量:</a-typography-text>
            <a-typography-text>{{ List.chat_count }}</a-typography-text>
          </a-space>
          <a-divider />
          <a-space>
            <a-typography-text>人机聊天人数:</a-typography-text>
            <a-typography-text>{{ List.robot_chat_count }}</a-typography-text>
          </a-space></div
        >
        <div
          v-else
          style="
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <a-typography-text style="font-size: 18px; text-align: center"
            >暂无数据</a-typography-text
          >
        </div>

      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { statistics } from '@/api/statistics';
import { computed, onMounted, ref } from 'vue';

const List = ref<Record<string, any>>({});
const loading = ref(false);

const getlList = async () => {
  try {
    loading.value = true;
    const res = await statistics();
    if (res.code === 0) {
      List.value = res.data;
      console.log('List', res.data);
    }
  } catch (err) {
    // 1
  } finally {
    loading.value = false;
  }
};
const dataLoaded = computed(
  () => List.value && Object.keys(List.value).length > 0
);

onMounted(async () => {
  getlList();
});
</script>

<style scoped></style>

<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 统计数据 </a-typography-title>
        <a-divider />

        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
          >
            <a-table
              :data-source="List"
              style="margin-top: 20px"
              :pagination="false"
            >
              <template #columns>
                <a-table-column
                  title="授权用户数量"
                  data-index="user_count"
                ></a-table-column>
                <a-table-column title="机器人数量" data-index="robot_count">
                </a-table-column>
                <a-table-column
                  title="部落数量"
                  data-index="tribe_count"
                ></a-table-column>
                <a-table-column
                  title="总聊天收益"
                  data-index="chat_reward_count"
                ></a-table-column>
                <a-table-column
                  title="聊天数量"
                  data-index="chat_count"
                ></a-table-column>

                <a-table-column
                  title="人机聊天人数"
                  data-index="robot_chat_count"
                >
                </a-table-column>

                <a-table-column title="操作">
                  <!-- <template #cell="{ record }">
                    <a-space>
                      <a-button type="primary" @click="Operation(1, record)"
                        >推荐到首页</a-button
                      >
                      <a-button type="primary" @click="Operation(0, record)"
                        >屏蔽</a-button
                      >
                    </a-space>
                  </template> -->
                </a-table-column>
              </template>
            </a-table>
            <!-- <div style="display: flex; justify-content: flex-end">
              <a-pagination
                :total="totalUserInfos"
                :current="form.pageIndex + 1"
                :page-size="20"
                show-total
                @change="
                  (current) => {
                    handlePageChange(current);
                  }
                "
              ></a-pagination>
            </div> -->
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
import { statistics } from '@/api/statistics';
import { onMounted, ref } from 'vue';

const List = ref();
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

onMounted(async () => {
  getlList();
});
</script>

<style scoped></style>

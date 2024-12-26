<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="value3" label="Twitter 账号" label-col-flex="">
                <a-input
                  v-model.trim="form.account"
                  :style="{ width: '250px' }"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-space>
                <a-button type="primary" @click="getlList()">查询</a-button>

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
            <a-table :data="List.data" style="margin-top: 20px" :pagination="false">
              <template #columns>
                <a-table-column
                  title="账号"
                  data-index="account"
                ></a-table-column>

                <a-table-column
                  title="粉丝数量"
                  data-index="fans"
                ></a-table-column>

                <a-table-column
                  title="关注数量"
                  data-index="follower"
                ></a-table-column>

                <a-table-column title="今日发推数" data-index="today">
                </a-table-column>
              </template>
            </a-table>
<!--            <div style="display: flex; justify-content: flex-end">-->
<!--              <a-pagination-->
<!--                :total="total"-->
<!--                :current="form.pageIndex + 1"-->
<!--                :page-size="10"-->
<!--                show-total-->
<!--                @change="-->
<!--                  (current) => {-->
<!--                    handlePageChange(current);-->
<!--                  }-->
<!--                "-->
<!--              ></a-pagination>-->
<!--            </div>-->
          </a-grid-item>
        </a-grid>

        <a-divider />
<!--        <a-typography-title :heading="6"> 统计数据 </a-typography-title>-->
<!--        <a-divider />-->
        <div v-if="dataLoaded">
          <a-space>
            <a-typography-text>总粉丝数 :</a-typography-text>
            <a-typography-text>{{ List.fans_total }}</a-typography-text>
          </a-space>
          <a-divider />
          <a-space>
            <a-typography-text>总关注数 :</a-typography-text>
            <a-typography-text>{{ List.follower_total }}</a-typography-text>
          </a-space>
          <a-divider />
          <a-space>
            <a-typography-text>今日总发推数 :</a-typography-text>
            <a-typography-text>{{ List.today_total }}</a-typography-text>
          </a-space>
          <a-divider />
          <a-space>
            <a-typography-text>总条数 :</a-typography-text>
            <a-typography-text>{{ List.total }}</a-typography-text>
          </a-space>
          <a-divider />
          <a-space>
            <a-typography-text>总发推数 :</a-typography-text>
            <a-typography-text>{{ List.twitter_count }}</a-typography-text>
          </a-space>
          <a-divider />
        </div>
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
import {getTwitterListApi} from '@/api/statistics';
  import { computed, onMounted, reactive, ref } from 'vue';

  const List = ref<Record<string, any>>({});
  const loading = ref(false);
  const total = ref(0);

  const form = reactive({
    account: '',
    pageIndex: 0,
    pageSize: 10,
  });

  const getlList = async () => {
    try {
      loading.value = true;
      const res = await getTwitterListApi(form);
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

  const resetClick = () => {
    form.account = '';
    getlList();
  };

  const handlePageChange = (current: number) => {
    if (current - 1 !== form.pageIndex) {
      form.pageIndex = current - 1;
      getlList();
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

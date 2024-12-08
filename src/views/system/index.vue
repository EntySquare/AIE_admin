<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 系统配置列表 </a-typography-title>
        <a-divider />

        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
          >
            <a-table
              :data="systemConfigList"
              style="margin-top: 20px"
              :pagination="false"
            >
              <template #columns>
                <a-table-column title="ID" data-index="id"></a-table-column>

                <a-table-column title="名称" data-index="name"></a-table-column>

                <a-table-column title="值" data-index="value"></a-table-column>

                <a-table-column title="描述" data-index="comment"></a-table-column>

                <a-table-column title="操作">
                  <template #cell="{ record }">
                    <div>
                      <a-button type="primary" @click="handleUpdate(record)">修改</a-button>
                    </div>
                  </template>
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
      </a-card>
    </a-spin>

    <a-modal v-model:visible="updateVisible" @ok="updateSystemConfig">
      <template #title> 修改系统配置 </template>
      <div>
        <a-form :model="updateForm" auto-label-width>
          <a-form-item field="value" label="值">
            <a-input
              v-model="updateForm.value"
              placeholder="请输入需要值"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="comment" label="描述">
            <a-input
                v-model="updateForm.comment"
                placeholder="请输入描述"
                allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { getSysConfigList, updateConfig } from '@/api/system';

  const systemConfigList = ref([]);
  const loading = ref(false);
  const updateVisible = ref(false);
  const updateForm = reactive({
    value: '',
    id: 0,
    comment: '',
  });
  // 打开修改弹窗
  const handleUpdate = (item: any) => {
    updateForm.value = item.value;
    updateForm.id = item.id;
    updateForm.comment = item.comment;
    updateVisible.value = true;
  };

  // 查系统配置列表
  const queryListData = async () => {
    try {
      loading.value = true;
      const res = await getSysConfigList();
      if (res.code === 0) {
        systemConfigList.value = res.data.listConfig;
      } else {
        Message.error('获取系统配置列表失败');
      }
      loading.value = false;
    } catch (err) {
      Message.error('获取系统配置列表失败');
      // you can report use errorHandler or other
      loading.value = false;
    }
  };

  // 修改系统配置
  const updateSystemConfig = async () => {
    try {
      const res = await updateConfig(updateForm);
      if (res.code === 0) {
        Message.success('修改成功');
        updateVisible.value = false;
      } else {
        Message.error('修改失败');
      }
      queryListData();
    } catch (err) {
      Message.error('修改失败');
      // you can report use errorHandler or other
    }
  };
  // const handlePageChange = (current: number) => {
  //   if (current - 1 !== form.pageIndex) {
  //     form.pageIndex = current - 1;
  //     queryUserListData();
  //   }
  // };

  onMounted(async () => {
    queryListData();
  });
</script>

<style scoped></style>

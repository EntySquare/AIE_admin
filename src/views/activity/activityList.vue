<template>
  <div>
    <div class="container">
      <a-card class="card-div">
        <a-typography-title :heading="6"> 活动列表 </a-typography-title>
        <a-button
          style="margin-top: 20px"
          type="primary"
          @click="updateVisible(1, -1)"
        >
          <template #icon>
            <icon-plus />
          </template>
          发布活动
        </a-button>
        <a-table :data="tableData" style="margin-top: 20px">
          <template #columns>
            <a-table-column title="活动名字" data-index="name"></a-table-column>
            <a-table-column title="活动图片" data-index="mini_img">
              <template #cell="{ record }">
                <a-image :src="record.mini_img" height="80px" width="120px">
                </a-image>
              </template>
            </a-table-column>
            <a-table-column title="专辑列表">
              <template #cell="{ record }">
                <div v-for="(item1, i) of record" :key="i">
                  <div v-for="item2 of item1" :key="item2.name">
                    <p>{{ item2.name }}</p>
                  </div>
                </div>
              </template>
            </a-table-column>
            <a-table-column
              title="创建时间"
              data-index="created_at"
            ></a-table-column>
            <a-table-column
              title="开始时间"
              data-index="start_at"
            ></a-table-column>
            <a-table-column
              title="结束时间"
              data-index="end_at"
            ></a-table-column>
            <a-table-column title="是否隐藏" data-index="hide">
              <template #cell="{ record }">
                <p v-if="record.hide === true">是</p>
                <p v-else-if="record.hide === false">否</p>
              </template>
            </a-table-column>
            <a-table-column title="活动图片" data-index="illustrate_img">
              <template #cell="{ record }">
                <a-image
                  :src="record.illustrate_img"
                  height="80px"
                  width="120px"
                >
                </a-image>
              </template>
            </a-table-column>
            <!--          <a-table-column title="说明文字" data-index="illustrate_text"></a-table-column>-->
            <a-table-column title="操作">
              <template #cell="{ record }">
                <a-button
                  type="outline"
                  style="margin-right: 10px"
                  @click="updateVisible(2, record.id)"
                  >编辑
                </a-button>

                <!-- <a-button
                  style="margin-right: 10px"
                  @click="openModel(record.name, record.id)"
                  >删除</a-button
                > -->
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-card>
    </div>
    <modal-form
      :visible="modalVisible"
      :title="modalTitle"
      :rid="rid"
      @update-visible="updateVisible"
      @refresh="queryActivityListData"
    ></modal-form>

    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="visible = false">
      <template #title> 确认提示 </template>
      <div
        >{{ modelContent }}</div
      >
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import {
    Activity,
    ActivityParam,
    fetchActivityList,
    deleteActivity,
  } from '@/api/activity';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import { Message} from '@arco-design/web-vue';
  import { arcoUpload } from '@/api/upload';
  import ModalForm from '@/views/activity/components/modalForm.vue';

  const visible = ref<boolean>(false);
  const modelContent = ref<string>('');
  const deleteId = ref<number>(0);

  const { setLoading } = useLoading(true);
  const condition = ref<string>('');
  const tableData = ref<Activity[]>([]);

  const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
  });
  const modalVisible = ref<boolean>(false);
  const modalTitle = ref<string>('');
  const rid = ref<number>(-1);

  // 查询活动列表
  const queryActivityListData = async (
    params: ActivityParam = {
      name: condition.value,
      pageNum: pagination.current,
      pageSize: 10,
    }
  ) => {
    setLoading(true);
    try {
      const res = await fetchActivityList(params);
      tableData.value = res.data.activity_list ?? [];
      pagination.current = res.data.current_page ?? 1;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };

  const updateVisible = (type: any, index: number) => {
    if (type === 1) {
      modalTitle.value = '创建';
      rid.value = 0;
    } else if (type === 2) {
      modalTitle.value = '修改';
      rid.value = index;
    }
    modalVisible.value = !modalVisible.value;
  };

  const openModel = (name: string, index: number) => {
    modelContent.value = `活动【${name}】,将删除此活动关联专辑、融合、材料等,是否确认删除？`;
    deleteId.value = index;
    visible.value = true;
  };

  const handleOk =async () => {
    visible.value = false;
     deleteActivity(deleteId.value).then((res) => {
      if (res.data === 'success') {
        Message.success('删除成功');
        queryActivityListData();
      } else {
        Message.error(res.msg);
      }
    });
  };

  onMounted(() => {
    queryActivityListData();
  });
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }
  .card-div div {
    margin-top: 5px;
  }
  .row-div div {
    margin: 10px 0 20px 0;
  }
</style>

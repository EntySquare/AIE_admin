<template>
  <div>
    <div class="container">
      <a-card class="card-div">
        <a-typography-title :heading="6"> 活动列表 </a-typography-title>
        <a-button style="margin-top: 20px" type="primary" @click="updateVisible">
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
            <a-table-column title="结束时间" data-index="end_at"></a-table-column>
            <a-table-column title="是否隐藏" data-index="hide">
              <template #cell="{ record }">
                <p v-if="record.hide === true">是</p>
                <p v-else-if="record.hide === false">否</p>
              </template>
            </a-table-column>
            <a-table-column title="活动图片" data-index="illustrate_img">
              <template #cell="{ record }">
                <a-image :src="record.illustrate_img" height="80px" width="120px">
                </a-image>
              </template>
            </a-table-column>
            <!--          <a-table-column title="说明文字" data-index="illustrate_text"></a-table-column>-->
            <a-table-column title="操作">
              <template #cell="{ record }">
                <a-button
                    style="margin-right: 10px"
                    @click="$modal.info({ title: 'Name', content: record.name })"
                >删除</a-button
                >
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-card>
    </div>
    <!--    发布活动弹窗-->
    <a-modal
        v-model:visible="modalVisible"
        title="新增活动"
        width="40vw"
        @ok="handleCreate"
    >
      <a-form :model="form">
        <a-form-item label="活动名字">
          <a-input v-model="form.name" />
        </a-form-item>
        <a-form-item label="是否隐藏">
          <a-switch
              v-model="form.hide"
              :checked-value="true"
              :unchecked-value="false"
          />
        </a-form-item>
        <a-form-item label="专辑">
          <a-select
              v-model="form.album_ids"
              :options="selectorAlbum"
              :style="{ width: '360px' }"
              placeholder="请选择专辑"
              multiple
              :scrollbar="true"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="融合">
          <a-select
              v-model="form.fusion_ids"
              :options="selectorFusion"
              :style="{ width: '360px' }"
              placeholder="请选择融合"
              multiple
              :scrollbar="true"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="材料">
          <a-select
              v-model="form.material_ids"
              :options="selectorMaterial"
              :style="{ width: '360px' }"
              placeholder="请选择材料"
              multiple
              :scrollbar="true"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="说明图片">
          <a-upload
              draggable
              image-preview
              :custom-request="uploadImg"
              :limit="1"
          />
        </a-form-item>
        <a-form-item label="说明文字">
          <a-textarea
              v-model="form.illustrate_text"
              placeholder="请输入说明"
              allow-clear
          />
        </a-form-item>
        <a-form-item label="活动小图">
          <a-upload
              draggable
              image-preview
              :custom-request="uploadImg2"
              :limit="1"
          />
        </a-form-item>
        <a-form-item label="选择开始/结束时间">
          <a-range-picker
              style="width: 100vw; margin: 0 0 24px 0"
              show-time
              :time-picker-props="{ defaultValue: ['00:00:00', '09:09:06'] }"
              format="YYYY-MM-DD HH:mm:ss"
              @ok="onOk"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import {
    Activity,
    ActivityParam,
    createActivity,
    fetchActivityList,
    fetchItemSelector,
    ItemMap,
  } from '@/api/activity';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import { Message, RequestOption } from '@arco-design/web-vue';
  import { arcoUpload } from '@/api/upload';

  const { setLoading } = useLoading(true);
  const condition = ref<string>('');
  const tableData = ref<Activity[]>([]);
  const selectorAlbum = ref<ItemMap[]>([]);
  const selectorFusion = ref<ItemMap[]>([]);
  const selectorMaterial = ref<ItemMap[]>([]);
  const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
  });
  const modalVisible = ref<boolean>(false);
  const form = reactive<Activity>({
    album_ids: [],
    end_at: '',
    fusion_ids: [],
    hide: false,
    illustrate_img: '',
    illustrate_text: '',
    material_ids: [],
    mini_img: '',
    name: '',
    start_at: '',
  });
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

  // 物品选择器
  const queryItemSelector = async () => {
    setLoading(true);
    try {
      const res = await fetchItemSelector();
      selectorAlbum.value = res.data.album_list ?? [];
      selectorFusion.value = res.data.fusion_list ?? [];
      selectorMaterial.value = res.data.material_list ?? [];
      // console.log(selectorData1.value);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    const acData: Activity = form;
    const res = await createActivity(acData);
    if (res.data === 'success') {
      Message.success('创建成功');
      await queryActivityListData();
    }
  };

  const updateVisible = () => {
    modalVisible.value = !modalVisible.value;
  };

  async function uploadImg(option: RequestOption) {
    form.illustrate_img = await arcoUpload(option);
  }
  async function uploadImg2(option: RequestOption) {
    form.mini_img = await arcoUpload(option);
  }

  function onOk(dateString: string[]) {
    form.start_at = dateString[0] ?? '';
    form.end_at = dateString[1] ?? '';
    // console.log('onOk: ', dateString[0]);
    // console.log('onOk: ', dateString[1]);
  }

  onMounted(() => {
    queryActivityListData();
    queryItemSelector();
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

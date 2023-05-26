<template>
  <div class="container">
    <a-card class="card-div">
      <a-typography-title :heading="6"> 公告发布记录 </a-typography-title>

      <a-button style="margin-top: 20px" type="primary" @click="showModal">
        <template #icon>
          <icon-plus />
        </template>
        发布公告
      </a-button>
      <a-table style="margin-top: 20px" :data="tableData">
        <template #columns>
          <a-table-column title="标题" data-index="title"> </a-table-column>
          <a-table-column title="标签" data-index="tags"> </a-table-column>
          <a-table-column
            title="发布时间"
            data-index="created_at"
          ></a-table-column>
          <a-table-column title="详情">
            <template #cell="{ record }">
              <a-popover position="left" trigger="click">
                <a-button style="margin-right: 10px">查看</a-button>
                <template #content>
                  <div v-html="record.content"></div>
                </template>
              </a-popover>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <!--  发布信息-->
    <a-modal v-model:visible="modalVisible" width="60vw" @ok="handleCreate">
      <template #title> 信息发布 </template>

      <a-form :model="form" auto-label-width>
        <a-form-item field="name" label="标题">
          <a-input v-model="form.title" placeholder="发布的标题..." />
        </a-form-item>
        <a-form-item>
          <a-space wrap>
            <a-tag
              v-for="tag1 in form.tags1"
              :key="tag1"
              :closable="true"
              @close="handleRemove1(tag1)"
            >
              {{ tag1 }}
            </a-tag>

            <a-input
              v-if="showInput1"
              ref="inputRef"
              v-model.trim="inputVal1"
              :style="{ width: '90px' }"
              size="mini"
              @keyup.enter="handleAdd1"
              @blur="handleAdd1"
            />
            <a-tag
              v-else
              :style="{
                width: '90px',
                backgroundColor: 'var(--color-fill-2)',
                border: '1px dashed var(--color-fill-3)',
                cursor: 'pointer',
              }"
              @click="handleEdit1"
            >
              <template #icon>
                <icon-plus />
              </template>
              新增标签
            </a-tag>
          </a-space>
        </a-form-item>
        <a-form-item field="post" label="内容">
          <RichEditor v-model="form.content" @confirm="getContent" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, reactive, ref } from 'vue';
  import RichEditor from '@/components/rich/RichEditor.vue';
  import {
    BulletinParam,
    fetchBulletinList,
    Bulletin,
    createBulletin,
    BulletinReq,
  } from '@/api/message';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import { Message } from '@arco-design/web-vue';

  const { setLoading } = useLoading(true);
  const form = reactive({
    title: '',
    tags1: [] as string[],
    content: '',
  });
  const modalVisible = ref<boolean>(false);
  const inputRef1 = ref();
  const showInput1 = ref(false);
  const inputVal1 = ref('');
  const tableData = ref<Bulletin[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const showModal = () => {
    modalVisible.value = !modalVisible.value;
  };

  const handleEdit1 = () => {
    showInput1.value = true;

    nextTick(() => {
      if (inputRef1.value) {
        inputRef1.value.focus();
      }
    });
  };
  const handleAdd1 = () => {
    if (inputVal1.value) {
      form.tags1.push(inputVal1.value);
      inputVal1.value = '';
    }
    showInput1.value = false;
  };

  const handleRemove1 = (key1: any) => {
    form.tags1 = form.tags1.filter((tag1) => tag1 !== key1);
  };

  const handleCreate = async () => {
    const data: BulletinReq = {
      activity_id: 0,
      content: form.content,
      tags: form.tags1,
      title: form.title,
    };
    const res = await createBulletin(data);
    if (res.data === 'success') {
      Message.success('创建成功');
    }
  };

  const getContent = (value: string) => {
    form.content = value;
  };

  // 查询公告列表
  const queryBulletinListData = async (
    params: BulletinParam = { pageNum: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const res = await fetchBulletinList(params);
      tableData.value = res.data.bulletin_list;
      pagination.current = res.data.current_page;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };

  onMounted(() => {
    queryBulletinListData();
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

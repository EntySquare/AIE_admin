<template>
  <a-modal
    :visible="visible"
    :title="title"
    width="40vw"
    @ok="handleModalOk"
    @update:visible="handleModalUpdate"
  >
    <a-form :model="form">
      <a-form-item label="奖励数量">
        <a-input-number v-model="form.gift_num" mode="button" />
      </a-form-item>

      <a-form-item label="目标人数">
        <a-input-number v-model="form.headcount" mode="button" />
      </a-form-item>
      <a-form-item>
        <selectData
          v-model:id="form.id_data"
          v-model:typeId="form.id_types"
          width="12vw"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { createPromote, Promote, updatePromote } from '@/api/promote';
  import { Message } from '@arco-design/web-vue';
  import selectData from '@/views/box/components/selectData.vue';

  const emit = defineEmits(['confirm', 'updateVisible', 'refresh']);

  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    rid: {
      type: Number,
    },
  });
  const form = reactive<Promote>({
    gift_num: 0,
    headcount: 0,
    id_data: 0,
    id_types: 0,
  });

  const handleCreate = async () => {
    const proData: Promote = {
      id: props.rid,
      gift_num: form.gift_num,
      headcount: form.headcount,
      id_data: form.id_data,
      id_types: form.id_types,
    };
    const res = await createPromote(proData);
    if (res.data === 'success') {
      emit('refresh');
      Message.success('创建成功');
    }
  };

  const handleUpdate = async () => {
    const proData: Promote = {
      id: props.rid,
      gift_num: form.gift_num,
      headcount: form.headcount,
      id_data: form.id_data,
      id_types: form.id_types,
    };
    const res = await updatePromote(proData);
    if (res.data === 'success') {
      emit('refresh');
      Message.success('修改成功');
    }
  };

  const handleModalOk = () => {
    // emit(父组件中的自定义方法,参数一,参数二,...)
    if (props.title === '新建') {
      handleCreate();
    } else if (props.title === '修改') {
      handleUpdate();
    }
  };
  const handleModalUpdate = () => {
    emit('updateVisible');
  };
</script>

<style scoped></style>

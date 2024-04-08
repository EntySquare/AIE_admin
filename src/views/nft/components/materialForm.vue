<template>
  <a-modal
    :visible="visible"
    :title="title + '材料'"
    width="60vw"
    @ok="handleModalOk"
    @update:visible="handleModalUpdate"
  >
    <a-form :model="form" :auto-label-width="true">
      <a-form-item label="名称">
        <a-input v-model="form.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="说明">
        <a-textarea
          v-model="form.illustrate"
          placeholder="请输入说明"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="图片">
        <a-upload
          draggable
          image-preview
          :custom-request="uploadImg"
          :limit="1"
        >
          <!-- <template #upload-button>
            <div
              class="arco-upload-list-picture custom-upload-avatar"
              v-if="form.illustrate_img"
            >
              <img :src="form.illustrate_img" />
              <div class="arco-upload-list-picture-mask">
                <IconEdit />
              </div>
            </div>
          </template> -->
        </a-upload>
      </a-form-item>
      <a-form-item label="属性">
        <a-input v-model="form.attribute" placeholder="请输入属性" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import {
    Material,
    createMaterial,
    updateMaterial,
    fetchMaterialDetail,
  } from '@/api/material';
  import { Message, RequestOption } from '@arco-design/web-vue';
  import { arcoUpload } from '@/api/upload';
  import useLoading from '@/hooks/loading';

  const { setLoading } = useLoading(true);

  const imgPath = ref<string>('');

  const form = reactive<Material>({
    attribute: '',
    img: '',
    illustrate: '',
    name: '',
  });
  const emit = defineEmits(['confirm', 'updateVisible', 'refresh']);
  const handleCreate = async () => {
    const materialData: Material = {
      img: imgPath.value,
      illustrate: form.illustrate,
      name: form.name,
      attribute: form.attribute,
    };
    const res = await createMaterial(materialData);
    if (res.data === 'success') {
      emit('refresh');
      Message.success('创建成功');
    }
  };

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

  // 查询盲盒详情
  const queryMaterialDetailData = async (id: number) => {
    console.log(id);

    setLoading(true);
    try {
      const res = await fetchMaterialDetail(id);
      const { code, data } = res;
      if (code === 0) {
        console.log('res===', data);
        Object.assign(form, data);
      }
    } finally {
      setLoading(false);
    }
  };
  watch(
    () => props.rid,
    (newVal, oldVal) => {
      // 在rid字段变动时执行逻辑
      console.log('rid 变动了', newVal, oldVal);
      if (newVal !== 0) {
        queryMaterialDetailData(newVal);
      }
    }
  );

  watch(
    () => props.title,
    (newVal, oldVal) => {
      if (newVal === '创建') {
        Object.assign(form, {
          attribute: '',
          img: '',
          illustrate: '',
          name: '',
        });
      }
    }
  );
  const handleUpdate = async () => {
    const materialData: Material = {
      id: props.rid,
      img: imgPath.value,
      illustrate: form.illustrate,
      name: form.name,
      attribute: form.attribute,
    };
    const res = await updateMaterial(materialData);
    if (res.data === 'success') {
      emit('refresh');
      Message.success('修改成功');
    }
  };

  const handleModalOk = () => {
    // emit(父组件中的自定义方法,参数一,参数二,...)
    if (props.title === '创建') {
      handleCreate();
    } else if (props.title === '修改') {
      handleUpdate();
    }
  };

  const handleModalUpdate = () => {
    emit('updateVisible');
  };

  async function uploadImg(option: RequestOption) {
    imgPath.value = await arcoUpload(option);
  }
</script>

<template>
  <!--    发布活动弹窗-->
  <a-modal
    :visible="visible"
    :title="title"
    width="60vw"
    @ok="handleModalOk"
    @update:visible="handleModalUpdate"
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
          v-model="rangeValue"
          :time-picker-props="{ defaultValue: ['00:00:00', '09:09:06'] }"
          format="YYYY-MM-DD HH:mm:ss"
          @ok="onOk"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch,onMounted } from 'vue';
  import {
    Activity,
    createActivity,
    updateActivity,
    fetchActivityDetail,
    fetchItemSelector,
    ItemMap,
  } from '@/api/activity';
  import { Message, RequestOption } from '@arco-design/web-vue';
  import { arcoUpload } from '@/api/upload';
  import useLoading from '@/hooks/loading';

  const { setLoading } = useLoading(true);
  const selectorAlbum = ref<ItemMap[]>([]);
  const selectorFusion = ref<ItemMap[]>([]);
  const selectorMaterial = ref<ItemMap[]>([]);
  const imgPath = ref<string>('');
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
  const rangeValue = ref<string[]>([]);

  const emit = defineEmits(['confirm', 'updateVisible', 'refresh']);

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

  async function uploadImg(option: RequestOption) {
    form.illustrate_img = await arcoUpload(option);
  }
  async function uploadImg2(option: RequestOption) {
    form.mini_img = await arcoUpload(option);
  }

  const handleCreate = async () => {
    const acData: Activity = form;
    const res = await createActivity(acData);
    if (res.data === 'success') {
      emit('refresh');
      Message.success('创建成功');
    }
  };
  function onOk(dateString: string[]) {
    form.start_at = dateString[0] ?? '';
    form.end_at = dateString[1] ?? '';
    // console.log('onOk: ', dateString[0]);
    // console.log('onOk: ', dateString[1]);
  }
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

  // 查询活动详情
  const queryActivityDetailData = async (id: number) => {
    console.log(id);

    setLoading(true);
    try {
      const res = await fetchActivityDetail(id);
      const { code, data } = res;
      if (code === 0) {
        console.log('res===', data);
        Object.assign(form, data);
        rangeValue.value = [data.start_at, data.end_at];
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
        queryActivityDetailData(newVal);
      }
    }
  );

  watch(
    () => props.title,
    (newVal, oldVal) => {
      if (newVal === '创建') {
        Object.assign(form, {
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
      }
    }
  );
  const handleUpdate = async () => {
    const acData: Activity = form;
    const res = await updateActivity(acData);
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

  onMounted(() => {
    queryItemSelector();
  })
</script>

<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6"> 查询模块 </a-typography-title>
      <a-divider />
      <!--  推广人数查询 -->
      <a-form :model="recommendForm">
        <a-row :gutter="16">
          <a-col :span="4">
            <a-form-item
              field="min"
              label="推广人数查询"
              label-col-flex="100px"
            >
              <a-input-number
                v-model="recommendForm.min"
                placeholder="最少推广人数"
              />
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-form-item field="max" label="到" label-col-flex="0px">
              <a-input-number
                v-model="recommendForm.max"
                placeholder="最多推广人数"
              />
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-button
              type="primary"
              style="margin-right: 10px"
              @click="queryUserRecommend"
            >
              <icon-search :size="20" />
              查询
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <!-- 碎片持有数量 -->
      <a-form :model="holdMaterialForm">
        <a-row :gutter="16">
          <a-col :span="4">
            <a-form-item field="id" label="碎片持有人" label-col-flex="100px">
              <!-- <a-input
                v-model="holdMaterialForm.id"
                placeholder="选择碎片选择器"
              /> -->

              <a-select
                v-model="holdMaterialForm.id"
                :options="selectorMaterial"
                :style="{ width: '360px' }"
                placeholder="请选择材料/碎片"
              >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-form-item field="quantity" label-col-flex="0px">
              <a-input-number
                v-model="holdMaterialForm.quantity"
                placeholder="输入持有数量"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-button
              type="primary"
              style="margin-right: 10px"
              @click="queryUserByMaterial"
            >
              <icon-search :size="20" />
              查询
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <!-- 专辑持有人 -->
      <a-form :model="holdAlbumForm">
        <a-row :gutter="16">
          <a-col :span="7">
            <a-form-item
              field="albumId"
              label="专辑持有人"
              label-col-flex="100px"
            >
              <a-select
                v-model="holdAlbumForm.id"
                :options="selectorAlbum"
                placeholder="请选择专辑"
                :scrollbar="true"
              >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-button
              type="primary"
              style="margin-right: 10px"
              @click="queryUserByAlbum"
            >
              <icon-search :size="20" />
              查询
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-typography-title :heading="6">
            查询结果总人数:{{ userCount }}</a-typography-title
          >
          <a-textarea
            v-model="userStr"
            placeholder=""
            allow-clear
            :disabled="true"
            :auto-size="{ minRows: 10 }"
          />

          <a-typography-title :heading="6"> 操作模块 </a-typography-title>

          <a-row :gutter="[40, 20]">
            <a-col :span="24">
              <a-alert
                >功能提示:注意赠送碎片时候直接空头给用户，销毁碎片的数值若用户不足够这么多碎片
                依旧会回收掉</a-alert
              >
            </a-col>
            <!-- 碎片持有数量 -->
            <a-form :model="giftOrPresentMaterialForm">
              <a-row :gutter="24">
                <a-col :span="6">
                  <a-form-item field="id" label="" label-col-flex="20px">
                    <a-select
                      v-model="giftOrPresentMaterialForm.id"
                      :options="selectorMaterial"
                      :style="{ width: '360px' }"
                      placeholder="请选择材料/碎片"
                      :scrollbar="true"
                    >
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item field="quantity" label-col-flex="0px">
                    <a-input-number
                      v-model="giftOrPresentMaterialForm.quantity"
                      placeholder="输入持有数量"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-button
                    type="primary"
                    style="margin-right: 10px"
                    @click="giftOrPresentMaterial(1)"
                  >
                    <icon-plus :size="20" />
                    赠送碎片
                  </a-button>
                  <a-button
                    type="primary"
                    style="margin-right: 10px"
                    @click="giftOrPresentMaterial(2)"
                  >
                    <icon-minus :size="20" />
                    回收碎片
                  </a-button>
                </a-col>
              </a-row>
            </a-form>

            <a-col :span="24">
              <a-alert
                >功能提示:注意赠送碎片时候直接空头给用户，销毁碎片的数值若用户不足够这么多碎片
                依旧会回收掉</a-alert
              >
            </a-col>
            <!-- 专辑持有 -->
            <a-form :model="giftOrPresentAlbumForm">
              <a-row :gutter="24">
                <a-col :span="12">
                  <a-form-item field="albumId" label="" label-col-flex="20px">
                    <a-select
                      v-model="giftOrPresentAlbumForm.id"
                      :options="selectorAlbum"
                      placeholder="请选择专辑"
                      :scrollbar="true"
                    >
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-button
                    type="primary"
                    style="margin-right: 10px"
                    @click="giftOrPresentAlbum(1)"
                  >
                    <icon-plus :size="20" />
                    赠送专辑数藏
                  </a-button>
                  <a-button
                    type="primary"
                    style="margin-right: 10px"
                    @click="giftOrPresentAlbum(2)"
                  >
                    <icon-minus :size="20" />
                    回收专辑数藏
                  </a-button>
                </a-col>
              </a-row>
            </a-form>
            <a-col :span="24">
              <a-alert>功能提示:兑换碎片</a-alert>
            </a-col>
            <!-- TODO 还没有这个接口 待定 -->
            <!-- 兑换碎片 -->
            <a-form :model="exchangeForm">
              <a-row :gutter="24">
                <a-col :span="7">
                  <a-form-item
                    field="inMaterialId"
                    label=""
                    label-col-flex="20px"
                  >
                    <selectData
                      v-model:id="exchangeForm.in_data.id_data"
                      v-model:typeId="exchangeForm.in_data.id_types"
                      width="10vw"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="4">
                  <a-form-item field="albumId" label="1:" label-col-flex="0px">
                    <a-input-number
                      v-model="exchangeForm.num"
                      placeholder="兑换比例"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item
                    field="outMaterialId"
                    label=""
                    label-col-flex="0px"
                  >
                    <selectData
                      v-model:id="exchangeForm.out_data.id_data"
                      v-model:typeId="exchangeForm.out_data.id_types"
                      width="10vw"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-button type="primary" style="margin-right: 10px">
                    <icon-redo :size="20" />
                    执行兑换
                  </a-button>
                </a-col>
              </a-row>
            </a-form>
          </a-row>
        </a-grid-item>
        <!--        空投/回收操作日志记录-->
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-radio-group v-model="listType" type="button" @change="cutListType">
            <a-radio :value="1">材料</a-radio>
            <a-radio :value="2">专辑</a-radio>
            <a-radio :value="3">兑换碎片</a-radio>
          </a-radio-group>
          <a-typography-title :heading="6">
            空投/回收操作日志记录
          </a-typography-title>
          <a-table
            :data="tableData"
            :scroll="{
              y: 600,
            }"
            :scrollbar="true"
            style="height: 30vw"
          >
            <template #columns>
              <a-table-column title="名称" data-index="name"></a-table-column>
              <a-table-column title="图片" data-index="image">
                <template #cell="{ record }">
                  <a-image :src="record.image" height="80px" width="80px">
                  </a-image>
                </template>
              </a-table-column>

              <a-table-column title="操作类型" data-index="operation_type">
                <template #cell="{ record }">
                  {{ record.operation_type == 1 ? '空投/赠送' : '回收/销毁' }}
                </template>
              </a-table-column>
              <a-table-column
                title="操作人数"
                data-index="user_count"
              ></a-table-column>
              <a-table-column
                title="创建时间"
                data-index="created_at"
              ></a-table-column>
              <a-table-column title="操作" data-index="user_count">
                <!-- TODO 待完成查看用户  -->

                <!-- <template #cell="{ record }">
                 <a-button
                    style="margin-right: 10px"
                    @click="onRowClick(record.id)"
                    >查看</a-button
                  > 
                </template>-->
              </a-table-column>
            </template>
          </a-table>
          <a-row justify="center" style="padding-top: 20px">
            <a-pagination
              v-model:current="pagination.current"
              :total="pagination.total!"
              show-total
              @change="queryLogListData()"
            />
          </a-row>
        </a-grid-item>
      </a-grid>
      <a-divider />
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { Notification, Message } from '@arco-design/web-vue';
  import { onMounted, reactive, ref } from 'vue';
  import {
    getUserByRecommend,
    getUserByMaterialId,
    getUserByAlbumId,
    UserDetailInfo,
    RecommendParam,
    MaterialParam,
  } from '@/api/user';
  import selectData from '@/views/box/components/selectData.vue';
  import { fetchItemSelector, ItemMap } from '@/api/activity';
  import {
    presentAlbumByUserIds,
    giftAlbumByUserIds,
    GiftOrDestroyAlbumParam,
  } from '@/api/album';
  import {
    fetchDropRecyclingLogList,
    DropRecyclingLog,
    DropRecyclingLogListParam,
  } from '@/api/log';
  import {
    presentMaterialByUserIds,
    giftMaterialByUserIds,
    GiftOrDestroyMaterialParam,
  } from '@/api/material';
  import useLoading from '@/hooks/loading';
  import { number } from 'echarts/core';
  import { Pagination } from '@/types/global';

  const { setLoading } = useLoading(true);
  const selectorAlbum = ref<ItemMap[]>([]);
  const selectorFusion = ref<ItemMap[]>([]);
  const selectorMaterial = ref<ItemMap[]>([]);
  const userCount = ref<number>(0);
  const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const listType = ref<any>(1);
  const tableData = ref<DropRecyclingLog[]>([]);

  // 查询空投/回收操作日志列表
  const queryLogListData = async () => {
    const params: DropRecyclingLogListParam = {
      list_type: listType.value,
      pageNum: pagination.current,
      pageSize: 10,
    };
    setLoading(true);
    try {
      const res = await fetchDropRecyclingLogList(params);
      tableData.value = res.data.drop_recycling_log_list ?? [];
      pagination.current = res.data.current_page ?? 1;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };
  const cutListType = (v: any) => {
    listType.value = v;
    queryLogListData();
  };

  // recommendForm 用户关系人数
  const recommendForm = reactive<any>({
    min: '',
    max: '',
  });
  //  holdMaterialForm 持有指定材料/碎片 数量
  const holdMaterialForm = reactive<any>({
    id: '',
    quantity: '',
  });

  // holdAlbumForm 持有指定专辑
  const holdAlbumForm = reactive<any>({
    id: '',
    userIds: [],
  });

  const giftOrPresentMaterialForm = reactive<any>({
    id: '',
    quantity: '',
  });

  const giftOrPresentAlbumForm = reactive<any>({
    id: '',
  });

  const userIds = ref<any>([]);
  const userStr = ref<string>('');

  const openInfo = ref<boolean>(false);
  const editPrice = ref<boolean>(false);
  const profile = ref<string>();

  // 兑换
  const exchangeForm = reactive<any>({
    in_data: { id: 0, id_types: 0 },
    out_data: { id: 0, id_types: 1 },
    num: 0,
  });
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

  onMounted(() => {
    queryLogListData();
    queryItemSelector();
  });

  const processingUser = (ids: any, data: any) => {
    userCount.value = ids.length;
    userIds.value = ids;

    userStr.value = data.map((item) => item.phone);
  };

  const messageType = (operType: number) => {
    if (operType === 1) {
      Message.success('赠送成功');
    } else if (operType === 2) {
      Message.success('销毁/回收成功');
    }
  };

  // giftOrPresentMaterial 赠送/销毁材料
  const giftOrPresentMaterial = async (operType: number) => {
    console.log('giftOrPresentMaterialForm', giftOrPresentMaterialForm);
    setLoading(true);
    try {
      if (userIds.value.length === 0) {
        Notification.error({
          title: '提示',
          content: '请选择用户',
        });
        return;
      }
      const param: GiftOrDestroyMaterialParam = {
        id: giftOrPresentMaterialForm.id,
        quantity: giftOrPresentMaterialForm.quantity,
        user_ids: userIds.value,
      };
      // operType 1:赠送 2:销毁
      if (operType === 1) {
        const res = await giftMaterialByUserIds(param);
        console.log('giftM-res', res);
        if (res.data === 'success') {
          messageType(operType);
        }
      } else if (operType === 2) {
        const res = await presentMaterialByUserIds(param);
        console.log('present-res', res);
        if (res.data === 'success') {
          messageType(operType);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // giftOrPresentAlbum 赠送/销毁专辑
  const giftOrPresentAlbum = async (operType: number) => {
    setLoading(true);
    try {
      if (userIds.value.length === 0) {
        Notification.error({
          title: '提示',
          content: '请选择用户',
        });
        return;
      }
      const param: GiftOrDestroyAlbumParam = {
        id: giftOrPresentAlbumForm.id,
        quantity: userIds.value.length,
        user_ids: userIds.value,
      };
      // operType 1:赠送 2:销毁
      if (operType === 1) {
        const res = giftAlbumByUserIds(param);
        const { code, data } = res;
        console.log('gift-res', res);
        if (res.data === 'success') {
          messageType(operType);
        }
      } else if (operType === 2) {
        const res = presentAlbumByUserIds(param);
        console.log('present-res', res);
        if (res.data === 'success') {
          messageType(operType);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // 查询用户推荐人数
  const queryUserRecommend = async () => {
    setLoading(true);
    try {
      if (
        recommendForm.min === 0 ||
        recommendForm.max === 0 ||
        recommendForm.min === '' ||
        recommendForm.max === ''
      ) {
        Notification.warning({
          title: '参数错误',
          content: '请输入推广人数的最少或最多人数!',
        });
        return;
      }
      const res = await getUserByRecommend(recommendForm);
      const { code, data } = res;
      if (code === 0) {
        processingUser(data.user_ids, data.user_recommend);
      }
    } finally {
      setLoading(false);
    }
  };

  // 查询碎片持有
  const queryUserByMaterial = async () => {
    setLoading(true);
    try {
      if (
        holdMaterialForm.id === 0 ||
        holdMaterialForm.quantity === 0 ||
        holdMaterialForm.id === '' ||
        holdMaterialForm.quantity === ''
      ) {
        Notification.warning({
          title: '参数错误',
          content: '请选择材料/碎片或输入数量!',
        });
        return;
      }
      const res = await getUserByMaterialId(holdMaterialForm);
      const { code, data } = res;
      if (code === 0) {
        processingUser(data.user_ids, data.holder_user);
      }
      // tableData.value = res.data.activity_list ?? [];
      // pagination.current = res.data.current_page ?? 1;
      // pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };

  // 查询专辑持有
  const queryUserByAlbum = async () => {
    setLoading(true);
    try {
      if (holdAlbumForm.id === 0 || holdAlbumForm.id === '') {
        Notification.warning({
          title: '参数错误',
          content: '请选择专辑!',
        });
        return;
      }
      const res = await getUserByAlbumId(holdAlbumForm.id);
      const { code, data } = res;
      if (code === 0) {
        processingUser(data.user_ids, data.holder_user);
      }
      // tableData.value = res.data.activity_list ?? [];
      // pagination.current = res.data.current_page ?? 1;
      // pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }
  .col-div div {
    margin-top: 5px;
  }
</style>

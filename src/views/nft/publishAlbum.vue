<template>
  <div class="container">
    <a-card>
      <a-typography>
        <a-typography-title :heading="6"> 发布专辑</a-typography-title>
      </a-typography>
      <a-divider />
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-row justify="space-between">
            <a-col :span="6">
              <a-typography-title :heading="6"> 专辑封面图</a-typography-title>
              <a-upload
                list-type="picture-card"
                image-preview
                :custom-request="customRequest1"
                limit="1"
              />
            </a-col>
            <a-col :span="6">
              <a-typography-title :heading="6"> 专辑背景图</a-typography-title>
              <a-upload
                list-type="picture-card"
                image-preview
                :custom-request="customRequest2"
                limit="1"
              />
            </a-col>
          </a-row>
          <a-divider />

          <a-space direction="vertical" :size="16" style="display: block">
            <a-row>
              <a-col :span="18">
                <div style="line-height: 33px">专辑名称</div>
              </a-col>
              <a-col :span="5">
                <a-input
                  v-model="albumName"
                  placeholder="输入专辑名"
                  allow-clear
                />
              </a-col>
            </a-row>
            <a-divider />

            <a-row>
              <a-col :span="18">
                <div style="line-height: 33px">发行量</div>
              </a-col>
              <a-col :span="5">
                <a-input-number
                  v-model="circulation"
                  placeholder="输入发行量"
                  allow-clear
                  mode="button"
                />
              </a-col>
            </a-row>
            <a-divider />

            <a-row>
              <a-col :span="15">
                <div style="line-height: 33px">作者账号</div>
              </a-col>
              <a-col :span="8">
                <a-select
                  v-model="inputPhone"
                  :options="options"
                  placeholder="选择用户"
                  :trigger-props="{ autoFitPopupMinWidth: true }"
                  allow-search
                  @search="handleSearch"
                >
                  <!--                  <a-option v-for="item of data" :value="item" :label="item.label" />-->
                </a-select>
              </a-col>
            </a-row>
            <a-divider />
            <a-row>
              <div style="line-height: 33px">官方标签</div>
            </a-row>
            <a-space wrap>
              <a-tag
                v-for="tag1 in tags1"
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
            <a-divider />
            <a-row>
              <div style="line-height: 33px">类型标签</div>
            </a-row>
            <a-space wrap>
              <a-tag
                v-for="tag2 in tags2"
                :key="tag2"
                :closable="true"
                @close="handleRemove2(tag2)"
              >
                {{ tag2 }}
              </a-tag>

              <a-input
                v-if="showInput2"
                ref="inputRef"
                v-model.trim="inputVal2"
                :style="{ width: '90px' }"
                size="mini"
                @keyup.enter="handleAdd2"
                @blur="handleAdd2"
              />
              <a-tag
                v-else
                :style="{
                  width: '90px',
                  backgroundColor: 'var(--color-fill-2)',
                  border: '1px dashed var(--color-fill-3)',
                  cursor: 'pointer',
                }"
                @click="handleEdit2"
              >
                <template #icon>
                  <icon-plus />
                </template>
                新增标签
              </a-tag>
            </a-space>
            <a-typography-title :heading="6"> 专辑简介</a-typography-title>
            <a-textarea
              v-model="profile"
              placeholder="请输入内容"
              allow-clear
              :auto-size="{ minRows: 10 }"
            />
          </a-space>
        </a-grid-item>
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-row justify="space-between">
            <a-col :span="6">
              <a-typography-title :heading="6">
                数字藏品图片
              </a-typography-title>
              <a-upload
                list-type="picture-card"
                image-preview
                :custom-request="customRequest3"
                limit="1"
              />
            </a-col>
          </a-row>
          <a-divider />

          <a-row>
            <a-col :span="18">
              <div style="line-height: 33px">数字藏品名</div>
            </a-col>
            <a-col :span="5">
              <a-input
                v-model="collectionName"
                placeholder="输入数字藏品名"
                allow-clear
              />
            </a-col>
          </a-row>
          <a-divider />
          <a-row align="center">
            <a-col :span="12">
              <div style="line-height: 33px"
                >发售价
                <a-tooltip content="选择发售才可设置发售价">
                  <icon-info-circle-fill style="color: blueviolet" />
                </a-tooltip>
              </div>
            </a-col>
            <a-col :span="6">
              <!--              <a-checkbox value="1">发布</a-checkbox>-->
              <!--              <a-checkbox value="2">发售</a-checkbox>-->

              <a-radio-group v-model="sellState">
                <a-radio :value="1">发布</a-radio>
                <a-radio :value="2">发售</a-radio>
              </a-radio-group>
            </a-col>
            <a-col :span="5">
              <a-input-number
                v-model="price"
                placeholder="输入发售价"
                allow-clear
                mode="button"
              />
            </a-col>
          </a-row>
          <a-divider />
          <a-row>
            <a-col :span="18">
              <div style="line-height: 33px">出售价上限</div>
            </a-col>
            <a-col :span="5">
              <a-input-number
                v-model="priceLimit"
                placeholder="输入出售价上限"
                allow-clear
                mode="button"
              />
            </a-col>
          </a-row>
          <a-divider />
          <a-row>
            <div style="line-height: 33px">数字藏品分类标签</div>
          </a-row>
          <a-space wrap>
            <a-tag
              v-for="tag3 in tags3"
              :key="tag3"
              :closable="true"
              @close="handleRemove3(tag3)"
            >
              {{ tag3 }}
            </a-tag>

            <a-input
              v-if="showInput3"
              ref="inputRef"
              v-model.trim="inputVal3"
              :style="{ width: '90px' }"
              size="mini"
              @keyup.enter="handleAdd3"
              @blur="handleAdd3"
            />
            <a-tag
              v-else
              :style="{
                width: '90px',
                backgroundColor: 'var(--color-fill-2)',
                border: '1px dashed var(--color-fill-3)',
                cursor: 'pointer',
              }"
              @click="handleEdit3"
            >
              <template #icon>
                <icon-plus />
              </template>
              新增标签
            </a-tag>
          </a-space>
          <!--          <a-col style="margin-top: 20px">-->
          <!--            <a-row>-->
          <!--              <a-col :span="18">-->
          <!--                <a-typography-title :heading="6">-->
          <!--                  专辑类型(最多3个)-->
          <!--                </a-typography-title>-->
          <!--              </a-col>-->
          <!--              <a-col :span="6">-->
          <!--                <a-button-->
          <!--                  type="primary"-->
          <!--                  :style="{ marginTop: '10px' }"-->
          <!--                  :loading="loading"-->
          <!--                  @click="getLista"-->
          <!--                >-->
          <!--                  <template #icon>-->
          <!--                    <icon-plus />-->
          <!--                  </template>-->
          <!--                  添加类型-->
          <!--                </a-button>-->
          <!--              </a-col>-->
          <!--            </a-row>-->
          <!--            <a-table :data="data" style="margin-top: 10px">-->
          <!--              <template #columns>-->
          <!--                <a-table-column title="排序" data-index="name"></a-table-column>-->
          <!--                <a-table-column-->
          <!--                  title="类型"-->
          <!--                  data-index="surplus"-->
          <!--                ></a-table-column>-->
          <!--                <a-table-column title="操作">-->
          <!--                  <template #cell="{ record }">-->
          <!--                    <a-button-->
          <!--                      @click="-->
          <!--                        $modal.info({ title: 'Name', content: record.name })-->
          <!--                      "-->
          <!--                      >删除-->
          <!--                    </a-button>-->
          <!--                  </template>-->
          <!--                </a-table-column>-->
          <!--              </template>-->
          <!--            </a-table>-->
          <!--          </a-col>-->
          <!--          <a-button type="primary" long style="margin-top: 20px"-->
          <!--            >点击上传-->
          <!--          </a-button>-->
        </a-grid-item>
      </a-grid>
      <a-divider />
      <a-row justify="center">
        <a-col :span="4">
          <a-button type="primary" long @click="handleCreate"
            >完成并上传</a-button
          >
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, nextTick, onMounted } from 'vue';
  import { uploadFile } from '@/api/upload';
  import { createAlbum, Album } from '@/api/album';
  import { Message, RequestOption } from '@arco-design/web-vue';
  import { getUser } from '@/api/user';

  const circulation = ref<number>(0);
  const albumName = ref<string>();
  const collectionName = ref<string>();
  const price = ref<number>(0.0);
  const profile = ref<string>();
  const inputPhone = ref<string>('');
  const sellState = ref<number>(1);
  const priceLimit = ref<number>(0);

  const options = ref<string[]>([]);
  // const options = ref(['Option1', 'Option2', 'Option3']);
  const loading = ref(false);

  const tags1 = ref<string[]>([]);
  const inputRef1 = ref<any>();
  const showInput1 = ref(false);
  const inputVal1 = ref('');

  const tags2 = ref<string[]>([]);
  const inputRef2 = ref<any>();
  const showInput2 = ref(false);
  const inputVal2 = ref('');

  const tags3 = ref<string[]>([]);
  const inputRef3 = ref<any>();
  const showInput3 = ref(false);
  const inputVal3 = ref('');

  const imgPath1 = ref('');
  const imgPath2 = ref('');
  const imgPath3 = ref('');

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
      tags1.value.push(inputVal1.value);
      inputVal1.value = '';
    }
    showInput1.value = false;
  };

  const handleRemove1 = (key1: string) => {
    tags1.value = tags1.value.filter((tag1) => tag1 !== key1);
  };

  const handleEdit2 = () => {
    showInput2.value = true;

    nextTick(() => {
      if (inputRef2.value) {
        inputRef2.value.focus();
      }
    });
  };
  const handleAdd2 = () => {
    if (inputVal2.value) {
      tags2.value.push(inputVal2.value);
      inputVal2.value = '';
    }
    showInput2.value = false;
  };

  const handleRemove2 = (key3: string) => {
    tags3.value = tags3.value.filter((tag3) => tag3 !== key3);
  };

  const handleEdit3 = () => {
    showInput3.value = true;

    nextTick(() => {
      if (inputRef3.value) {
        inputRef3.value.focus();
      }
    });
  };
  const handleAdd3 = () => {
    if (inputVal3.value) {
      tags3.value.push(inputVal3.value);
      inputVal3.value = '';
    }
    showInput3.value = false;
  };

  const handleRemove3 = (key3: string) => {
    tags3.value = tags3.value.filter((tag3) => tag3 !== key3);
  };

  const customRequest1 = async (option: RequestOption) => {
    const { onError, onSuccess, fileItem, name = 'file' } = option;
    const formData = new FormData();
    formData.append(name as string, fileItem.file as Blob);
    try {
      const res = await uploadFile(formData);
      onSuccess(res);
      imgPath1.value = res.data.url;
    } catch (error) {
      onError(error);
    }
  };

  const customRequest2 = async (option: RequestOption) => {
    const { onError, onSuccess, fileItem, name = 'file' } = option;
    const formData = new FormData();
    formData.append(name as string, fileItem.file as Blob);
    try {
      const res = await uploadFile(formData);
      onSuccess(res);
      imgPath2.value = res.data.url;
    } catch (error) {
      onError(error);
    }
  };

  const customRequest3 = async (option: RequestOption) => {
    const { onError, onSuccess, fileItem, name = 'file' } = option;
    const formData = new FormData();
    formData.append(name as string, fileItem.file as Blob);
    try {
      const res = await uploadFile(formData);
      onSuccess(res);
      imgPath3.value = res.data.url;
    } catch (error) {
      onError(error);
    }
  };

  const handleSearch = async (value: string) => {
    if (value) {
      loading.value = true;
      const res = await getUser(value);
      // console.log(11111111);
      // console.log(res.data.user_list);
      const users = res.data.user_list;

      const opList: string[] = [];
      for (let i = 0; i < users.length; i += 1) {
        opList.push(`${users[i].nickname}:${users[i].phone}`);
      }
      //   res.data.userList.forEach((user) => {
      //
      // });
      options.value = opList;
      loading.value = false;
      // console.log(options.value);
    }
  };

  const handleCreate = async () => {
    const data: Album = {
      authority: tags1.value,
      background_img: imgPath1.value,
      circulation: parseInt(circulation.value.toString(), 10),
      face_img: imgPath2.value,
      labels: tags2.value,
      name: albumName.value ?? '',
      nft_category: tags3.value,
      nft_img: imgPath3.value,
      nft_name: collectionName.value ?? '',
      price: parseFloat(price.value.toString()),
      profile: profile.value ?? '',
      phone: inputPhone.value.slice(-11) ?? '',
      status: parseInt(sellState.value.toString(), 10),
      user_price_limit: parseInt(priceLimit.value.toString(), 10),
    };
    const res = await createAlbum(data);
    if (res.data === 'success') {
      Message.success('创建成功');
    }
  };

  onMounted(() => {
    // handleSearch(phoneInput);
  });
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }
</style>

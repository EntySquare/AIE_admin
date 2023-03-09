<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6">
        用户列表
      </a-typography-title>
      <a-divider />
      <a-form :model="form">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-input v-model="form.value5" placeholder="手机号,昵称" />
          </a-col>
          <a-col :span="4" >
            <a-space  :size="18" style="margin-left: 100px">
              <a-button type="primary" style="margin-right: 10px">
                <icon-search :size="20"  />
                查询
              </a-button>
              <a-button>
                <icon-loop :size="20" />
                重置
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
      <a-divider />
      <a-table :data="data" style="margin-top: 20px">
        <template #columns>
          <a-table-column title="头像" data-index="picture">
            <template #cell="{ record }">
              <a-image :src="record.uiPicture" height="80px" width="120px" >
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="手机号/账号" data-index="title"></a-table-column>
          <a-table-column title="持有NFT数" data-index="content"></a-table-column>
          <a-table-column title="创作数量" data-index="publishTimer"></a-table-column>
          <a-table-column title="发布专辑数量" data-index="title"></a-table-column>
          <a-table-column title="余额" data-index="content"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <router-link
                :to="{
                            name: 'userListInfo',
                            params: {
                              shopId: record.shopId,
                              shopName: record.shopName,
                            },
                          }"
              >
                <a-button
                  v-permission="['*']"
                  type="outline"
                >
                  详情
                </a-button>
              </router-link>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const form = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
})
</script>

<style scoped>
.container{
  padding: 16px 20px;
}


</style>

<template>
  <div class="container">
    <a-card>
      <a-typography>
        <a-typography-title :heading="6">
          发布专辑
        </a-typography-title>
      </a-typography>
      <a-divider />
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-typography-title :heading="6">
            专辑封面图
          </a-typography-title>
          <a-upload
            list-type="picture-card"
            action="/"
            :default-file-list="fileList"
            image-preview
          />
          <a-divider />
          <a-space direction="vertical" :size="16" style="display: block;">
            <a-row >
              <a-col :span="18">
                <div style="line-height: 33px">专辑名称</div>
              </a-col>
              <a-col :span="5">
                <div>
                  <a-button type="text">aaaaaa</a-button>
                </div>
              </a-col>
              <a-col :span="1">
                <div style="line-height: 33px">
                  >
                </div>
              </a-col>
            </a-row>
            <a-divider />
            <a-row >
              <a-col :span="18">
                <div style="line-height: 33px">专辑所属账号</div>
              </a-col>
              <a-col :span="5">
                <div>
                  <a-button type="text">aaaaaa</a-button>
                </div>
              </a-col>
              <a-col :span="1">
                <div style="line-height: 33px">
                  >
                </div>
              </a-col>
            </a-row>
            <a-divider />
            <a-typography-title :heading="6">
              专辑简介
            </a-typography-title>
            <a-textarea placeholder="请输入内容" allow-clear :auto-size="{minRows: 10}"/>
          </a-space>
        </a-grid-item>
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
          sty
        >
          <a-col style="margin-top: 20px">
            <a-row >
              <a-col :span="18">
                <a-typography-title :heading="6">
                  专辑类型(最多3个)
                </a-typography-title>
              </a-col>
              <a-col :span="6">
                <a-button type="primary" :style="{marginTop: '10px'}" :loading="loading" @click="getLista">
                  <template #icon>
                    <icon-plus />
                  </template>
                  添加类型
                </a-button>
              </a-col>
            </a-row>
            <a-table :data="data" style="margin-top: 10px">
              <template #columns>
                <a-table-column title="排序" data-index="name"></a-table-column>
                <a-table-column title="类型" data-index="surplus"></a-table-column>
                <a-table-column title="操作">
                  <template #cell="{ record }">
                    <a-button @click="$modal.info({ title:'Name', content:record.name })">删除</a-button>
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </a-col>
          <a-button type="primary" long style="margin-top: 20px">点击上传</a-button>
        </a-grid-item>
      </a-grid>
    </a-card>
  </div>
  <!--  添加标签弹窗-->
  <a-modal v-model:visible="visible" title="添加类型">
    <a-form :model="form">
      <a-form-item field="name" label="类型">
        <a-input v-model="form.label" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container{
  padding: 16px 20px;
}

</style>

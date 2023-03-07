<template>
  <div class="container">
    <a-card>
      <a-typography>
        <a-typography-title :heading="6">
          发布NFT
        </a-typography-title>
      </a-typography>
      <a-divider />
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-typography-title :heading="6">
            NFT主图(1张)
          </a-typography-title>
            <a-upload
              list-type="picture-card"
              action="/"
              :default-file-list="fileList"
              image-preview
            />
          <a-divider />
          <a-space direction="vertical" :size="16" style="display: block;">
            <a-row class="grid-demo">
              <a-col :span="18">
                <div style="line-height: 33px">所属专辑</div>
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
            <a-row class="grid-demo">
              <a-col :span="18">
                <div style="line-height: 33px">发布者账号</div>
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
            <a-row class="grid-demo">
              <a-col :span="18">
                <div style="line-height: 33px">作者账号</div>
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
              作品简介
            </a-typography-title>
            <a-textarea placeholder="Please enter something" allow-clear/>
          </a-space>
        </a-grid-item>
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
          sty
        >
          <a-col>
            <a-typography-title :heading="6">
              售价(元)
            </a-typography-title>
            <a-space size="large" style="margin-top: 20px">
              <a-radio-group>
                <a-radio value="A">暂不出售</a-radio>
                <a-radio value="B" :default-checked="true">出售</a-radio>
              </a-radio-group>
            </a-space>
            <div style="margin-top: 20px">
              <a-input-number :style="{width:'320px'}" placeholder="请输入售价" mode="button" class="input-demo" />
            </div>
          </a-col>

          <a-col style="margin-top: 20px">
            <a-row class="grid-demo">
              <a-col :span="18">
                <a-typography-title :heading="6">
                  标签(最多3个)
                </a-typography-title>
              </a-col>
              <a-col :span="6">
                <a-button type="primary" :style="{marginTop: '10px'}" :loading="loading" @click="getLista">
                  <template #icon>
                    <icon-plus />
                  </template>
                  添加标签
                </a-button>
              </a-col>
            </a-row>
            <a-table :data="data" style="margin-top: 10px">
              <template #columns>
                <a-table-column title="排序" data-index="name"></a-table-column>
                <a-table-column title="标签内容" data-index="surplus"></a-table-column>
                <a-table-column title="操作"></a-table-column>
              </template>
            </a-table>
          </a-col>
        </a-grid-item>
      </a-grid>
    </a-card>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container{
  padding: 16px 20px;
}

</style>

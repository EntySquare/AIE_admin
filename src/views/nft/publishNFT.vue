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
            NFT主图
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
                <div style="line-height: 33px">所属专辑</div>
              </a-col>
              <a-col :span="5">
                <div>
                  <a-button type="text" @click="openSelector">aaaaaa</a-button>
                </div>
              </a-col>
              <a-col :span="1">
               <div style="line-height: 33px">
                  >
                </div>
              </a-col>
            </a-row>
            <a-divider />
            <a-row  >
              <a-col :span="18">
                <div style="line-height: 33px">发布者账号</div>
              </a-col>
              <a-col :span="5">
                <div>
                  <a-button type="text" @click="openUserSelector">aaaaaa</a-button>
                </div>
              </a-col>
              <a-col :span="1">
                <div style="line-height: 33px">
                  >
                </div>
              </a-col>
            </a-row>
            <a-divider />
            <a-row  >
              <a-col :span="18">
                <div style="line-height: 33px" @click="openUserSelector">作者账号</div>
              </a-col>
              <a-col :span="5">
                <div>
                  <a-button type="text" >aaaaaa</a-button>
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
            <a-textarea placeholder="请输入内容" allow-clear :auto-size="{minRows: 10}"/>
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
            <a-row >
              <a-col :span="18">
                <a-typography-title :heading="6">
                  标签(最多3个)
                </a-typography-title>
              </a-col>
              <a-col :span="6">
                <a-button type="primary" :style="{marginTop: '10px'}" @click="addLabel">
                  <template #icon>
                    <icon-plus />
                  </template>
                  添加标签
                </a-button>
              </a-col>
            </a-row>
            <a-table style="margin-top: 10px">
              <template #columns>
                <a-table-column title="排序" data-index="name"></a-table-column>
                <a-table-column title="标签内容" data-index="surplus"></a-table-column>
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
  <a-modal v-model:visible="visible" title="添加标签">
    <a-form :model="form">
      <a-form-item field="name" label="标签">
        <a-input v-model="form.label" />
      </a-form-item>
    </a-form>
  </a-modal>
<!--  所属专辑-->
  <a-modal v-model:visible="selector" title="专辑选择器">
    <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
      <a-col :span="6" style="margin-top: 10px">
        <div :style="{borderRadius: '12px',background:'#FFFFFF',boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.04)'}">
          <a-image width="100%" height="100px" :style="{borderRadius: '8px 8px 0px 0px'}"></a-image>
          <div :style="{textAlign: 'center',margin: '5px 0'}">小天才专辑</div>
          <a-button type="primary" long>选择</a-button>
        </div>
      </a-col>
      <a-col :span="6" style="margin-top: 10px">
        <div :style="{borderRadius: '12px',background:'#FFFFFF',boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.04)'}">
          <a-image width="100%" height="100px" :style="{borderRadius: '8px 8px 0px 0px'}"></a-image>
          <div :style="{textAlign: 'center',margin: '5px 0'}">小天才专辑</div>
          <a-button type="primary" long>选择</a-button>
        </div>
      </a-col>
      <a-col :span="6" style="margin-top: 10px">
        <div :style="{borderRadius: '12px',background:'#FFFFFF',boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.04)'}">
          <a-image width="100%" height="100px" :style="{borderRadius: '8px 8px 0px 0px'}"></a-image>
          <div :style="{textAlign: 'center',margin: '5px 0'}">小天才专辑</div>
          <a-button type="primary" long>选择</a-button>
        </div>
      </a-col>
      <a-col :span="6" style="margin-top: 10px">
        <div :style="{borderRadius: '12px',background:'#FFFFFF',boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.04)'}">
          <a-image width="100%" height="100px" :style="{borderRadius: '8px 8px 0px 0px'}"></a-image>
          <div :style="{textAlign: 'center',margin: '5px 0'}">小天才专辑</div>
          <a-button type="primary" long>选择</a-button>
        </div>
      </a-col>
      <a-col :span="6" style="margin-top: 10px">
        <div :style="{borderRadius: '12px',background:'#FFFFFF',boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.04)'}">
          <a-image width="100%" height="100px" :style="{borderRadius: '8px 8px 0px 0px'}"></a-image>
          <div :style="{textAlign: 'center',margin: '5px 0'}">小天才专辑</div>
          <a-button type="primary" long>选择</a-button>
        </div>
      </a-col>
    </a-row>
  </a-modal>
<!--  发布者账号弹窗-->
  <a-modal v-model:visible="selectorTwo" title="用户选择器">
    <a-space>
      <a-input :style="{width:'280px'}" placeholder="请输入账号,用户id" allow-clear />
      <a-button type="primary">
        <template #icon>
          <icon-search />
        </template>查询
      </a-button>
      <a-button>
        <template #icon>
          <icon-refresh />
        </template>
        重置
      </a-button>
    </a-space>
    <a-table style="margin-top: 20px">
      <template #columns>
        <a-table-column title="图片" data-index="picture">
          <template #cell="{ record }">
            <a-image :src="record.uiPicture" height="80px" width="120px" >
            </a-image>
          </template>
        </a-table-column>
        <a-table-column title="账号" data-index="title"></a-table-column>
        <a-table-column title="用户id" data-index="content"></a-table-column>
        <a-table-column title="操作">
          <template #cell="{ record }">
            <a-button @click="$modal.info({ title:'Name', content:record.name })">选择</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const visible = ref<boolean>(false);

const selector = ref<boolean>(false);
const selectorTwo = ref<boolean>(false);
const form = reactive({
  label: ''
})
// 添加标签
const addLabel = () =>{
  visible.value = true;
}
// 专辑选择器
const openSelector = () =>{
  selector.value = true;
}
// 用户选择器
const openUserSelector = () =>{
  selectorTwo.value = true;
}

</script>

<style scoped>
.container{
  padding: 16px 20px;
}

</style>

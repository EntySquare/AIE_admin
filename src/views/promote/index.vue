<template>
  <div class="container">
    <a-card class="card-div">
      <a-typography-title :heading="6"> 推广奖励设置 </a-typography-title>
      <!--      <a-button style="margin-top: 20px" type="primary">-->
      <!--        <template #icon>-->
      <!--          <icon-plus />-->
      <!--        </template>-->
      <!--        推广奖励-->
      <!--      </a-button>-->
      <a-space direction="vertical" :size="10" style="display: block">
        <a-row align="center" justify="space-between">
          <a-col :span="5">
            <div>奖励数量</div>
          </a-col>
          <a-col :span="5">
            <a-input-number
              v-model="count"
              placeholder="输入奖励数量"
              allow-clear
              mode="button"
            />
          </a-col>
          <a-col :span="5">
            <div>目标人数</div>
          </a-col>
          <a-col :span="5">
            <a-input-number v-model="people" placeholder="输入目标人数" allow-clear mode="button"/>
          </a-col>
        </a-row>
        <a-divider />
      </a-space>
      <a-row justify="center">
        <a-col :span="4">
          <a-button type="primary" long>确认</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const count = ref<number>();
  const people = ref<number>();
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

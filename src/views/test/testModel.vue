<template>
  <div class="container">
    <!--    使用案例 -->
    <a-card>
      <!--      <div>dsadas</div>-->
      <!--      <a-cascader-->
      <!--        :options="list"-->
      <!--        :default-value="['datunli']"-->
      <!--        :style="{ width: '320px' }"-->
      <!--        placeholder="Please select ..."-->
      <!--        multiple-->
      <!--      />-->
      盲盒
      <selectData v-model:id="id" v-model:typeId="typeId" />

      <p>id : {{ id }}</p>
      <p>Value : {{ typeId }}</p>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import selectData from './selectData.vue';

  const id = ref();
  const typeId = ref();
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }
</style>

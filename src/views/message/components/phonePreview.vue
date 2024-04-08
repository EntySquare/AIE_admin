<template>
  <div class="phone-case">
    <div class="phone-content">
      <!-- <div v-html="props.content"></div> -->
      <div v-html="props.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    content: {
      type: String,
      required: true,
    },
  });
</script>

<style scoped>
  .phone-case {
    position: relative;
    width: 300px; /* 手机壳的宽度 */
    height: 600px; /* 手机壳的高度 */
    background-color: #ccc; /* 手机壳的颜色 */
    border-radius: 20px; /* 手机壳的圆角 */
    overflow: hidden;
  }

  .phone-content {
    position: absolute;
    top: 0; /* 内容相对于手机壳的垂直位置 */
    left: 0; /* 内容相对于手机壳的水平位置 */
    bottom: 0;
    right: 0;
    margin: 20px;

    background-color: #fff; /* 内容的背景颜色 */
    /* 可根据需求添加其他样式 */
    color: black;
    overflow: overlay;
  }
</style>

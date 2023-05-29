<template>
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      :body-style="{
        paddingTop: '20px',
      }"
      title="交易额统计(24小时)"
    >
      <template #extra>
        <a-link>查看更多</a-link>
      </template>
      <Chart height="310px" :option="chartOption" />
    </a-card>
</template>

<script setup lang="ts">
  import useChartOption from "@/hooks/chart-option";
  import { ref } from "vue";

  const chartsData = ref<number[]>([]);
  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: '7%',
        right: '3%',
        top: '10',
        bottom: '30',
      },
      xAxis: {
        type: 'category',
        data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        axisLabel: {

        },
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          // data: chartsData.value,
          data: [111,222,333,444,555,666,111,222,333,444,555,666],
          type: 'bar',
          showBackground: true,
          barWidth: '20px',
          color: '#246EFF',
          backgroundStyle: {
            color: 'rgba(129,226,255,1.000)'

          }
        }
      ]
    };
  });
</script>

<style scoped>

</style>

<template>
  <a-spin :loading="loading" :style="{width: '100%' , height:'100% '}">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      :body-style="{
        paddingTop: '20px',
      }"
      title="用户增幅统计(24小时)"
    >
      <template #extra>
        <a-link>查看更多</a-link>
      </template>
      <Chart height="310px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { graphic } from 'echarts';
  import useLoading from '@/hooks/loading';
  import { queryContentData, ContentDataRecord } from '@/api/dashboard';
  import useChartOption from '@/hooks/chart-option';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import { AnyObject } from '@/types/global';

  function graphicFactory(side: AnyObject) {
    return {
      type: 'text',
      bottom: '8',
      ...side,
      style: {
        text: '',
        textAlign: 'center',
        fill: '#4E5969',
        fontSize: 12,
      },
    };
  }
  const { loading, setLoading } = useLoading(true);
  const xAxis = ref<string[]>([]);
  const chartsData = ref<number[]>([]);
  // const graphicElements = ref([
  //   graphicFactory({ left: '4%' }),
  //   graphicFactory({ right: 0 }),
  // ]);
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
        offset: 2,
        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        boundaryGap: false,

        axisLabel: {
          color: '#4E5969',

        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#E5E8EF',
          },
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#23ADFF',
            width: 2,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: any, idx: number) {
            if (idx === 0) return value;
            return `${value}%`;
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#E5E8EF',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[];
          return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>增幅人数</span><span class="tooltip-value">${(
              Number(firstElement.value) * 10000
            ).toLocaleString()}</span></div>
          </div>`;
        },
        className: 'echarts-tooltip-diy',
      },
      // graphic: {
      //   elements: graphicElements.value,
      // },
      series: [
        {
          data: chartsData.value,
          // data: [22222,222,2222,222,2222,222,2,222],
          type: 'line',
          smooth: true,
          // symbol: 'circle',
          symbolSize: 12,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
            },
          },
          lineStyle: {
            width: 3,
            color: new graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(30, 231, 255, 1)',
              },
              {
                offset: 0.5,
                color: 'rgba(36, 154, 255, 1)',
              },
              {
                offset: 1,
                color: 'rgba(111, 66, 251, 1)',
              },
            ]),
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(17, 126, 255, 0.16)',
              },
              {
                offset: 1,
                color: 'rgba(17, 128, 255, 0)',
              },
            ]),
          },
        },
      ],
    };
  });
  const fetchData = async () => {
    // setLoading(true);
    // try {
    //   const { data: chartData } = await queryContentData();
    //   chartData.forEach((el: ContentDataRecord, idx: number) => {
    //     // xAxis.value.push(el.x);
    //     chartsData.value.push(el.y);
    //     if (idx === 0) {
    //       // graphicElements.value[0].style.text = el.x;
    //     }
    //     if (idx === chartData.length - 1) {
    //       // graphicElements.value[1].style.text = el.x;
    //     }
    //   });
    // } catch (err) {
    //   // you can report use errorHandler or other
    // } finally {
    //   setLoading(false);
    // }
  };
  fetchData();
</script>

<style scoped lang="less"></style>

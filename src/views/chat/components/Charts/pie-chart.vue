<template>
<!--  <e-charts class="echart-pie" :options="option"></e-charts>-->
  <div ref="pieChartRef" style="width:600px;height: 400px"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  name:"pieChart",
  props:{

  },
  setup(props,_context){
    const pieChartRef = ref(null);
    let chartInstance = null;
    const initPieChart = ()=>{
      chartInstance = echarts.init(pieChartRef.value);

      const option = ref<any>({
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      // const option = {
      //   title: {
      //     text: 'Vue 3 ECharts 示例'
      //   },
      //   tooltip: {},
      //   legend: {
      //     data: ['销量']
      //   },
      //   xAxis: {
      //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      //   },
      //   yAxis: {},
      //   series: [
      //     {
      //       name: '销量',
      //       type: 'bar',
      //       data: [5, 20, 36, 10, 10, 20]
      //     }
      //   ]
      // };
      chartInstance.setOption(option);

      window.addEventListener('resize', () => {
        chartInstance.resize();
      });
    }

    onMounted(()=>{
      initPieChart()
    })
    return {
      pieChartRef
    }
  }
})

</script>
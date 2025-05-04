<template>
  <div ref="pieChartRef" style="width:600px;height: 400px"></div>
<!--  <e-charts class="chart" :option="option" autoresize />-->
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, ref} from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  name:"pieChart",
  props:{

  },
  setup(props,_context){
    const pieChartRef = ref(null);
    let chartInstance = null;
    const option = ref<any>({
      title: {
        text: 'Traffic Sources',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
      },
      series: [
        {
          name: 'Traffic Sources',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 234, name: 'Ad Networks' },
            { value: 135, name: 'Video Ads' },
            { value: 1548, name: 'Search Engines' },
          ]
        },
      ],
    })
    const initPieChart = ()=>{
      console.log(pieChartRef.value)
      if (pieChartRef.value === null){
        console.log('non ref of pie chart')
        return;
      }
      console.log(pieChartRef.value)
      chartInstance = echarts.init(pieChartRef.value);


      chartInstance.setOption(option.value);
      window.addEventListener('resize', () => {
        chartInstance.resize();
      });
    }

    onMounted(()=>{
      nextTick(()=>{
        initPieChart();
      })
    })
    return {
      pieChartRef,
      option
    }
  }
})

</script>
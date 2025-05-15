<template>
  <el-tabs v-model="activeName" class="chatBI-tabs" >
    <el-tab-pane label="Chart" :name="DisplayTab.CHART_TAB">
      <div ref="pieChartRef" style="width:600px;height: 400px"></div>
    </el-tab-pane>
    <el-tab-pane label="Sql" :name="DisplayTab.SQL_TAB">
      {{responseOfChatBI.sql}}
    </el-tab-pane>
  </el-tabs>
<!--  <e-charts class="chart" :option="option" autoresize />-->
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, PropType, ref} from 'vue'
import * as echarts from 'echarts'
import {DisplayTab, NoStreamChatBIResponse} from "#/types-chatBI.ts";
export default defineComponent({
  name:"pieChart",
  computed: {
    DisplayTab() {
      return DisplayTab
    }
  },
  props:{
    responseOfChatBI:{
      default:{
        sql:"",
        data:[],
        columns:[],
        display_type:""
      },
      type:Object as PropType<NoStreamChatBIResponse> ,
    }
  },
  setup(props,_context){
    const activeName = ref<string>(DisplayTab.CHART_TAB)
    const pieChartRef = ref(null);
    let chartInstance = null;
    const option = ref<any>({
      backgroundColor: '#ffffff',
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
        data: props.responseOfChatBI.columns,
      },
      series: [
        {
          name: 'Traffic Sources',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: props.responseOfChatBI.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
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
      option,
      activeName
    }
  }
})

</script>
<style lang="scss" scoped>
:deep(.el-tabs__item){
  color: white !important;
}
:deep(.el-tabs__item.is-active){
  color: var(--el-color-primary) !important;
}
</style>
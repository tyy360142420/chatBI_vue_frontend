<template>
  <el-tabs v-model="activeName" class="chatBI-tabs" >
    <el-tab-pane label="Chart" :name="DisplayTab.CHART_TAB">
      <div ref="lineChartRef" style="width:600px;height: 400px"></div>
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
  name:"lineChart",
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
    const lineChartRef = ref(null);
    let chartInstance = null;
    const option = ref<any>({
      xAxis: {
        type: 'category',
        data: props.responseOfChatBI.columns,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: props.responseOfChatBI.data,
          type: 'line'
        }
      ]
    })
    const initLineChart = ()=>{
      console.log(lineChartRef.value)
      if (lineChartRef.value === null){
        console.log('non ref of pie chart')
        return;
      }
      console.log(lineChartRef.value)
      chartInstance = echarts.init(lineChartRef.value);
      chartInstance.setOption(option.value);
      window.addEventListener('resize', () => {
        chartInstance.resize();
      });
    }

    onMounted(()=>{
      nextTick(()=>{
        initLineChart();
      })
    })
    return {
      lineChartRef,
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
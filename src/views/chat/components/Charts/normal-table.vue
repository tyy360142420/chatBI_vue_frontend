<template>

  <el-tabs v-model="activeName" class="chatBI-tabs" >
    <el-tab-pane label="Chart" :name="DisplayTab.CHART_TAB">
      <el-table :data="responseOfChatBI.data">
        <el-table-column
            v-for="(item, index) of responseOfChatBI.columns"
            :prop="item"
            :label="item"
            :key="index"
        >
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="Sql" :name="DisplayTab.SQL_TAB">
      {{responseOfChatBI.sql}}
    </el-tab-pane>
  </el-tabs>


</template>

<script lang="ts">
import {defineComponent, onMounted, PropType,ref} from 'vue'
import Message from "@/views/chat/components/Message/index.vue";
import {DisplayTab, NoStreamChatBIResponse} from "@/types/types-chatBI.ts";
export default defineComponent({
  name:"pieChart",
  computed: {
    DisplayTab() {
      return DisplayTab
    }
  },
  components: {Message},
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
    onMounted(()=>{
    })
    return {
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

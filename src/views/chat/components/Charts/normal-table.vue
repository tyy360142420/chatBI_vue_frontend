<template>
  <el-table :data="responseOfChatBI.data">
    <el-table-column
        v-for="(item, index) of responseOfChatBI.columns"
        :prop="item"
        :label="item"
        :key="index"
    >
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType} from 'vue'
import Message from "@/views/chat/components/Message/index.vue";
import {NoStreamChatBIResponse} from "@/types/types-chatBI.ts";
export default defineComponent({
  name:"pieChart",
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

    onMounted(()=>{
    })
    return {
    }
  }
})

</script>
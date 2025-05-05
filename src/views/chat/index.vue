<template>
  <div class="h-full flex flex-col text-#fff justify-center">
    <div class="h-50px leading-50px text-20px text-center px-20px" v-if="dataSources.length">
      {{ currentChatHistory?.title }}
    </div>
    <main class="overflow-hidden" :class="{ 'flex-1': dataSources.length }">
      <el-scrollbar ref="scrollRef">
        <div id="scroll-box" class="w-full max-w-screen-md m-auto">
          <div v-if="!dataSources.length" class="text-center p-20px">
            <div class="text-26px font-bold">我是 小DeepSeek，很高兴见到你</div>
            <div class="text-14px mt-10px">我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~</div>
          </div>
          <div v-else>
            <template
                v-for="(item, index) of dataSources" :key="index">
              <normal-table v-if="item.chatBIResponse?.display_type===DisplayType.DISPLAY_TABLE && !item.inversion"
              :response-of-chat-b-i="item.chatBIResponse">
              </normal-table>
              <bar-chart v-else-if="item.chatBIResponse?.display_type===DisplayType.DISPLAY_BAR_CHART && !item.inversion"></bar-chart>
              <pie-chart v-else-if="item.chatBIResponse?.display_type===DisplayType.DISPLAY_PIE_CHART && !item.inversion"></pie-chart>
              <Message
                  v-if="item.inversion"
                  :date-time="item.dateTime"
                  :text="item.text"
                  :reasoning="item.reasoning"
                  :inversion="item.inversion"
                  :error="item.error"
                  :loading="item.loading" />
            </template>
          </div>
        </div>
      </el-scrollbar>
    </main>
    <!-- 输入框 -->
    <footer>
      <div class="py-20px max-w-screen-md m-auto">
        <div class="p-15px bg-#404045 rounded-24px">
          <div class="input-box">
            <el-input
              v-model="questionFromUser"
              style="width: 100%"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              resize="none"
              placeholder="发送消息"
              @keypress="handleEnter" />
          </div>
          <div class="flex items-center justify-between">
            <div></div>
            <div class="flex items-center">
              <!-- <el-button :icon="Link" circle /> -->
              <el-button v-if="loading" type="primary" :icon="CloseBold" circle @click="handleStop" />
              <el-button v-else type="primary" :icon="Position" :disabled="!questionFromUser" circle @click="handleSubmit" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Position, CloseBold } from '@element-plus/icons-vue'
import Message from './components/Message/index.vue'
import PieChart from './components/Charts/pie-chart.vue'
import NormalTable from "@/views/chat/components/Charts/normal-table.vue";
import BarChart from "@/views/chat/components/Charts/bar-chart.vue";
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {chatCompletions, chatForBI} from '@/api/chat'
import { useChat } from './hooks/useChat'
import { useScroll } from './hooks/useScroll'
import { useChatStore } from '@/store'
import { useRoute } from 'vue-router'
import { useReadStream } from './hooks/useReadStream'
import { ss } from "@/utils/storage";
import {useReadNoStream} from "@/views/chat/hooks/useReadNoStream.ts";
import {DisplayType} from "#/types-chatBI.ts";
let controller = new AbortController()
const chatStore = useChatStore()
const route = useRoute()

// 会话方法
const { addChat, updateChat } = useChat()
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll()
const { handleStreamResponse } = useReadStream()
const { handleNoStreamResponse } = useReadNoStream()
const { uuid } = route.params as { uuid: string }
// 输入框
const questionFromUser = ref<string>('')
const loading = ref<boolean>(false)
// 对话信息
const dataSources = computed(() => chatStore.getChatByUuid(+uuid))
const currentChatHistory = computed(() => chatStore.getChatHistoryByCurrentActive)

// 是否开启多轮对话，开启后会带上之前的聊天信息
const usingContext = computed<boolean>(() => chatStore.usingContext)

// 输入框回车事件
function handleEnter(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSubmit()
  }
}
async function handleSubmit() {
  if (!+uuid || +uuid === 0) {
    chatStore.addHistory({
      title: '新建会话',
      uuid: Date.now(),
      isEdit: false,
      visible: false,
    })
    ss.set('chatSubmitPrompt', questionFromUser.value)
    return
  }
  await onNoStreamConversation()
}


async function onNoStreamConversation(){
  let message = questionFromUser.value
  if(loading.value) return;
  if(!message || message.trim() ==='') return;
  console.log("dataSources",dataSources.value)
  const conversationList = dataSources.value.filter(item => item.text).map(item => ({
    role: item.inversion ? 'user' : 'assistant',
    content: item.text,
  } as Chat.ConversationMessage))
  addChat(+uuid, {
    dateTime: new Date().toLocaleString(),
    text: message,
    inversion: true,
    error: false,
  })
  scrollToBottom()
  loading.value = true
  questionFromUser.value = ''
  addChat(+uuid, {
    dateTime: new Date().toLocaleString(),
    text: '',
    reasoning: '思考中...',
    loading: true,
    inversion: false,
    error: false,
  })
  scrollToBottom()
  try {
    const paramMsg = []

    if (usingContext.value) {
      // AI回复
      paramMsg.push(...conversationList)
    }
    paramMsg.push({ role: 'user', content: message })
    const response: any = await chatForBI(message, +uuid)
    console.log(11)
    console.log(response)
    await handleNoStreamResponse(response, (jsonData: any) => {
      const contentText = jsonData
      console.log("contentText")
      console.log(contentText)
      if (contentText) {
        updateChat(+uuid, dataSources.value.length - 1, {
          text: contentText ?? '',
          inversion: false,
          error: false,
          loading: true,
          chatBIResponse:jsonData
        })
        scrollToBottomIfAtBottom()
      }
      // 思考信息
      const reasoning = jsonData.thoughts
      if (reasoning) {
        updateChat(+uuid, dataSources.value.length - 1, {
          reasoning: reasoning ?? '',
          reasoningTime: new Date().toLocaleString(),
          inversion: false,
          error: false,
          loading: true,
          chatBIResponse:jsonData
        })
        scrollToBottomIfAtBottom()
      }
    })
    updateChat(+uuid, dataSources.value.length - 1, {
      inversion: false,
      error: false,
      loading: false,
    })
    loading.value = false
    console.log('query ended')
  } catch (error: any) {
    console.log(error)
    loading.value = false
    if (error instanceof DOMException && error.name === 'AbortError') {
      updateChat(+uuid, dataSources.value.length - 1, {
        text: '\n\n用户手动中断。',
        inversion: false,
        error: false,
        loading: false,
      })
    } else {
      updateChat(+uuid, dataSources.value.length - 1, {
        text: '\n\n服务器异常，请稍后再试。',
        inversion: false,
        error: true,
        loading: false,
      })
    }
  }
}
async function onStreamConversation() {
  let message = questionFromUser.value
  if (loading.value) return
  if (!message || message.trim() === '') return
  // 流式输出信号
  controller = new AbortController()
  const conversationList = dataSources.value.filter(item => item.text).map(item => ({
    role: item.inversion ? 'user' : 'assistant',
    content: item.text,
  } as Chat.ConversationMessage))
  // 添加用户消息到对话框
  addChat(+uuid, {
    dateTime: new Date().toLocaleString(),
    text: message,
    inversion: true,
    error: false,
  })
  scrollToBottom()
  loading.value = true
  questionFromUser.value = ''
  // 添加AI初始对话 思考信息
  addChat(+uuid, {
    dateTime: new Date().toLocaleString(),
    text: '',
    reasoning: '思考中...',
    loading: true,
    inversion: false,
    error: false,
  })
  scrollToBottom()
  // 开始发起请求
  try {
    const paramMsg = []
    if (usingContext.value) {
      // AI回复
      paramMsg.push(...conversationList)
    }
    paramMsg.push({ role: 'user', content: message })
    const response: any = await chatCompletions(controller.signal, paramMsg)
    await handleStreamResponse(response, (jsonData: any) => {
      const contentText = jsonData.choices[0]?.delta?.content
      if (contentText) {
        updateChat(+uuid, dataSources.value.length - 1, {
          text: contentText ?? '',
          inversion: false,
          error: false,
          loading: true,
        })
        scrollToBottomIfAtBottom()
      }
      // 思考信息
      const reasoning = jsonData.choices[0].delta.reasoning_content
      if (reasoning) {
        updateChat(+uuid, dataSources.value.length - 1, {
          reasoning: reasoning ?? '',
          reasoningTime: new Date().toLocaleString(),
          inversion: false,
          error: false,
          loading: true,
        })
        scrollToBottomIfAtBottom()
      }
    })
    updateChat(+uuid, dataSources.value.length - 1, {
      inversion: false,
      error: false,
      loading: false,
    })
    loading.value = false
    console.log('Stream ended')
  } catch (error: any) {
    console.log(error)
    loading.value = false
    if (error instanceof DOMException && error.name === 'AbortError') {
      updateChat(+uuid, dataSources.value.length - 1, {
        text: '\n\n用户手动中断。',
        inversion: false,
        error: false,
        loading: false,
      })
    } else {
      updateChat(+uuid, dataSources.value.length - 1, {
        text: '\n\n服务器异常，请稍后再试。',
        inversion: false,
        error: true,
        loading: false,
      })
    }
  }
}
function handleStop() {
  if (loading.value) {
    controller.abort()
    loading.value = false
  }
}
onMounted(() => {
  if (!route.params.uuid) {
    chatStore.active = 1002
  }
  const promptValue = ss.get('chatSubmitPrompt')
  if (promptValue) {
    questionFromUser.value = promptValue
    ss.set('chatSubmitPrompt', '')
    onNoStreamConversation()
  }
  scrollToBottom()
})
onUnmounted(() => {
  if (loading.value) controller.abort()
})
</script>

<style scoped lang="scss">
.input-box {
  :deep(.el-textarea) {
    .el-textarea__inner {
      background-color: transparent;
      color: #fff;
      box-shadow: none;
      padding: 0;
      font-size: 16px;
    }
  }
}
</style>

<template>
  <el-scrollbar class="px-4">
    <div class="flex flex-col gap-2 text-#ffffff">
      <template v-if="!dataSources.length">
        <div class="flex flex-col items-center mt-4 text-center">
          <span>暂无数据</span>
        </div>
      </template>
      <template v-else>
        <div v-for="(item, index) of dataSources" :key="index">
          <div
            class="group relative h-38px px-10px text-14px rounded-12px flex items-center break-all cursor-pointer hover:bg-#333333"
            :class="isActive(item.uuid) && ['bg-#333333']"
            @click="handleSelect(item)">
            <div class="overflow-hidden flex-1 whitespace-nowrap">
              {{ item.title }}
            </div>
            <div
              class="w-24px h-24px absolute right-10px top-50% transform -translate-y-1/2 flex flex items-center justify-center z-1 opacity-0 group-hover:opacity-100 hover:bg-#212327 rounded-8px"
              :class="isActive(item.uuid) && ['opacity-100']"
              @click.stop="e => ((buttonRef = e.currentTarget), (currentItem = item), (visible = !visible))">
              <el-icon color="#ffffff" size="16px"><MoreFilled /></el-icon>
            </div>
            <div
              class="w-24px pointer-events-none absolute right-0 top-0 bottom-0 rounded-rt-12px rounded-rb-12px"
              style="background: linear-gradient(90deg, rgba(33, 35, 39, 0) 0%, #212327 50%, #212327 100%)"></div>
            <div
              class="w-84px pointer-events-none absolute right-0 top-0 bottom-0 opacity-0 group-hover:opacity-100 rounded-rt-12px rounded-rb-12px"
              :class="isActive(item.uuid) && ['opacity-100']"
              style="background: linear-gradient(90deg, rgba(51, 51, 51, 0) 0%, rgb(51, 51, 51) 60%, rgb(51, 51, 51) 100%)"></div>
          </div>
        </div>
      </template>
      <el-popover virtual-triggering ref="popoverRef" placement="bottom-start" :visible="visible" effect="dark" :virtual-ref="buttonRef">
        <div>
          <el-button link @click="handleDelete"> 删除 </el-button>
        </div>
      </el-popover>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useChatStore } from '@/store'
import { MoreFilled } from '@element-plus/icons-vue'
import { onClickOutside } from '@vueuse/core'
const chatStore = useChatStore()
const dataSources = computed(() => chatStore.history)

const buttonRef = ref<EventTarget | null>()
const currentItem = ref<Chat.History | null>(null)
const visible = ref(false)
const popoverRef = ref()

onClickOutside(popoverRef, () => (visible.value = false))
function isActive(uuid: number) {
  return chatStore.active === uuid
}
async function handleSelect({ uuid }: Chat.History) {
  if (isActive(uuid)) return

  if (chatStore.active) chatStore.updateHistory(chatStore.active, { isEdit: false })
  await chatStore.setActive(uuid)
}
function handleDelete() {
  if (currentItem.value?.uuid) {
    chatStore.deleteHistory(currentItem.value.uuid)
    visible.value = false
  }
}
</script>

<style scoped lang="scss"></style>

<template>
  <div class="h-full relative transition-all duration-300 ease" :class="{ 'w-68px': collapsed, 'w-260px': !collapsed }">
    <Transition name="slide-fade">
      <div class="absolute top-0 left-0 z-10 bg-#212327 w-260px flex flex-col h-full overflow-hidden" v-show="!collapsed">
        <main class="flex flex-col flex-1 min-h-0">
          <div class="flex justify-between items-center p-4">
            <span class="text-24px font-bold text-#fff">DeepSeek</span>
            <el-icon
              class="cursor-pointer"
              size="24px"
              color="#fff"
              @click="changeCollapsed"
              ><Fold
            /></el-icon>
          </div>
          <div class="p-4">
            <el-button type="primary" @click="handleAdd"> 新建会话 </el-button>
          </div>
          <div class="flex-1 min-h-0 pb-4 overflow-hidden">
            <List />
          </div>
        </main>
        <!-- <Footer /> -->
      </div>
    </Transition>
    <Transition name="slide2-fade">
      <div class="absolute top-0 left-0 z-9 bg-#212327 w-68px flex flex-col h-full items-center overflow-hidden" v-show="collapsed">
        <main class="flex flex-col flex-1 min-h-0">
          <div class="flex justify-between items-center p-4">
            <el-icon
              class="cursor-pointer"
              size="24px"
              color="#fff"
              @click="changeCollapsed"
              ><Expand
            /></el-icon>
          </div>
          <div class="p-4">
            <el-icon class="text-#fff cursor-pointer" size="24px" @click="handleAdd"><ChatRound /></el-icon>
          </div>
        </main>
        <!-- <Footer /> -->
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Fold, ChatRound, Expand } from "@element-plus/icons-vue";
import List from "./List.vue";
import { useChatStore } from "@/store";
import { computed } from "vue";
import { useAppStore } from "@/store";
const appStore = useAppStore();
const chatStore = useChatStore();
const collapsed = computed(() => appStore.siderCollapsed);
function handleAdd() {
  chatStore.createNewChat();
}
function changeCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value);
}
</script>

<style scoped lang="scss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-192px);
  opacity: 0;
}
.slide2-fade-enter-active,
.slide2-fade-leave-active {
  transition: all 0.3s ease;
}

.slide2-fade-leave-to,.slide2-fade-enter-from {
  opacity: 0;
}
</style>

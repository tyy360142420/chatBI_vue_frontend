<script setup lang="ts">
// import { computed } from "vue";
// // import { NLayout, NLayoutContent } from 'naive-ui'
// import { useRouter } from 'vue-router'
import Sider from "./sider/index.vue";
// import Permission from './Permission.vue'
// import { useAppStore } from "@/store";

// const router = useRouter()
// const appStore = useAppStore();
// const chatStore = useChatStore()
// const authStore = useAuthStore()

// router.replace({ name: 'Chat', params: { uuid: chatStore.active } })

// const collapsed = computed(() => appStore.siderCollapsed);

// const needPermission = computed(() => !!authStore.session?.auth && !authStore.token)

// const getMobileClass = computed(() => {
//   if (isMobile.value)
//     return ['rounded-none', 'shadow-none']
//   return ['border', 'rounded-md', 'shadow-md', 'dark:border-neutral-800']
// })

// const getContainerClass = computed(() => {
//   return ["h-full", { "pl-260px": !collapsed.value }];
// });
</script>

<template>
  <div class="h-full dark:bg-#24272e transition-all">
    <div class="z-40 transition flex h-full">
      <Sider />
      <div class="h-full bg-#292a2d p-0 flex-1 m-w-0">
        <RouterView v-slot="{ Component, route }">
          <component :is="Component" :key="route.fullPath" />
        </RouterView>
      </div>
    </div>
    <!-- <Permission :visible="needPermission" /> -->
  </div>
</template>

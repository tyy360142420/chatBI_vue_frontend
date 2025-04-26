<template>
  <div
    class="flex w-full mb-6 overflow-hidden"
    :class="[{ 'flex-row-reverse': inversion }]"
  >
    <div
      class="overflow-hidden text-sm"
      :class="[inversion ? 'items-end' : 'items-start']"
    >
      <p
        class="text-xs text-[#b4bbc4]"
        :class="[inversion ? 'text-right' : 'text-left']"
      >
        {{ dateTime }}
      </p>
      <div
        class="flex items-end gap-1 mt-2"
        :class="[inversion ? 'flex-row-reverse' : 'flex-row']"
      >
        <TextComponent
          ref="textRef"
          :inversion="inversion"
          :error="error"
          :text="text"
          :reasoning="reasoning"
          :loading="loading"
          :as-raw-text="asRawText"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextComponent from './Text.vue'
import { ref } from "vue";
const props = defineProps<{
  dateTime?: string;
  text?: string;
  reasoning?: string;
  inversion?: boolean;
  error?: boolean;
  loading?: boolean;
}>();
const asRawText = ref(props.inversion)
</script>

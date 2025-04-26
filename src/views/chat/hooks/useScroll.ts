import type { Ref } from 'vue'
import { nextTick, ref } from 'vue'
import type { ScrollbarInstance } from 'element-plus'
// type ScrollElement = HTMLDivElement | null

interface ScrollReturn {
  scrollRef: Ref<ScrollbarInstance | undefined>
  scrollToBottom: () => Promise<void>
  scrollToTop: () => Promise<void>
  scrollToBottomIfAtBottom: () => Promise<void>
}

export function useScroll(): ScrollReturn {
  const scrollRef = ref<ScrollbarInstance>()

  const scrollToBottom = async () => {
    await nextTick()
    if (scrollRef.value)
      scrollRef.value.setScrollTop(scrollRef.value?.wrapRef?.scrollHeight || 0)
  }

  const scrollToTop = async () => {
    await nextTick()
    if (scrollRef.value)
      scrollRef.value.setScrollTop(0)
  }

  const scrollToBottomIfAtBottom = async () => {
    await nextTick()
    if (scrollRef.value) {
      const scrollHeight = scrollRef.value?.wrapRef?.scrollHeight || 0
      const threshold = 100 // Threshold, indicating the distance threshold to the bottom of the scroll bar.
      const distanceToBottom = scrollHeight - scrollRef.value?.wrapRef?.scrollTop! - scrollRef.value?.wrapRef?.clientHeight!
      if (distanceToBottom <= threshold)
        scrollRef.value.setScrollTop(scrollHeight)
    }
  }

  return {
    scrollRef,
    scrollToBottom,
    scrollToTop,
    scrollToBottomIfAtBottom,
  }
}

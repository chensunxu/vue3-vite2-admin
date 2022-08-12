<template>
  <el-scrollbar
    ref="scrollContainerRef"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance
} from 'vue'
export default defineComponent({
  name: 'ScrollPane',
  emits: ['scroll'],
  setup(_, context) {
    const scrollContainerRef = ref(null)
    const scrollWrapper = computed(() => {
      return scrollContainerRef.value?.$refs.wrap
    })

    const tagAndTagSpacing = 4 // tagAndTagSpacing
    const { ctx } = getCurrentInstance()

    const handleScroll = (e) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      scrollWrapper.value.scrollLeft =
        scrollWrapper.value.scrollLeft + eventDelta / 4
    }
    const moveToTarget = (currentTag) => {
      const $container = scrollContainerRef.value.$el
      const $containerWidth = $container.offsetWidth
      const tagList = ctx.$parent.$refs.tag

      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        scrollWrapper.value.scrollLeft = 0
      } else if (lastTag === currentTag) {
        scrollWrapper.value.scrollLeft =
          scrollWrapper.value.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex((item) => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing

        if (
          afterNextTagOffsetLeft >
          scrollWrapper.value.scrollLeft + $containerWidth
        ) {
          scrollWrapper.value.scrollLeft =
            afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < scrollWrapper.value.scrollLeft) {
          scrollWrapper.value.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
    const emitScroll = () => {
      context.emit('scroll')
    }

    onMounted(() => {
      scrollWrapper?.value?.addEventListener('scroll', emitScroll, true)
    })

    onBeforeUnmount(() => {
      scrollWrapper?.value?.removeEventListener('scroll', emitScroll)
    })

    return {
      handleScroll,
      moveToTarget
    }
  }
})
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }

  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>

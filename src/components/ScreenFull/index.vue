<template>
  <div @click="click">
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'ScreenFull',
  setup() {
    const isFullscreen = ref(false)
    const click = () => {
      if (!screenfull.isEnabled) {
        ElMessage({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }

    const change = () => {
      isFullscreen.value = screenfull.isFullscreen
    }
    const init = () => {
      if (screenfull.isEnabled) {
        screenfull.on('change', change)
      }
    }
    const destroy = () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', change)
      }
    }

    onMounted(() => {
      init()
    })
    onBeforeUnmount(() => {
      destroy()
    })

    return { isFullscreen, click }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>

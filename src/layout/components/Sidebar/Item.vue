<!--  -->
<template>
  <el-icon>
    <component v-if="isElIcon" :is="getComponentIcon" />
    <svg-icon v-else :icon-class="icon" :color="variables.menuText" />
  </el-icon>
  <span>{{ title }}</span>
</template>

<script>
import { reactive, computed, toRefs } from 'vue'
import variables from '@/styles/variables.scss.js'
export default {
  name: 'SItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const data = reactive({
      icon: props.icon,
      title: props.title
    })
    const isIcon = data.icon.includes('el-icon')
    const isElIcon = computed(() => isIcon)
    const getComponentIcon = computed(
      () => isIcon && data.icon?.split('el-icon-')?.[1]
    )
    return {
      ...toRefs(data),
      getComponentIcon,
      isElIcon,
      variables
    }
  }
}
</script>
<style scoped></style>

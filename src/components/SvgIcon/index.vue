<template>
  <div
    v-if="isExternalIcon"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$attrs"
  />
  <svg :class="svgClass" aria-hidden="true" v-on="$attrs">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'
import { computed } from 'vue'
export default {
  name: 'SvgIconIndex',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      // 设置图标颜色
      type: String,
      default: '#333'
    }
  },
  setup(props) {
    const isExternalIcon = isExternal(props.iconClass)

    const iconName = computed(() => `#icon-${props.iconClass}`)

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      }
      return 'svg-icon'
    })

    const styleExternalIcon = computed(() => ({
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
    }))

    return { iconName, svgClass, isExternalIcon, styleExternalIcon }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>

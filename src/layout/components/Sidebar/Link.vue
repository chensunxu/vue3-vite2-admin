<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
import { computed } from 'vue'
export default {
  name: 'SidebarLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isExternalRouter = isExternal(props.to)
    const type = computed(() => {
      if (isExternalRouter) {
        return 'a'
      }
      return 'router-link'
    })

    const linkProps = (to) => {
      if (isExternalRouter) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return { to }
    }

    return { type, linkProps }
  }
}
</script>

import { onBeforeMount, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const $store = useStore()
    const device = computed(() => $store.state.app.device)
    const instance = getCurrentInstance()

    const fixBugIniOS = () => {
      const $subMenu = instance?.$refs.subMenu
      if ($subMenu) {
        const { handleMouseleave } = $subMenu
        $subMenu.handleMouseleave = (e) => {
          if (device.value === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
      }
    }
    onBeforeMount(() => {
      fixBugIniOS()
    })
    return {
      device
    }
  }
}

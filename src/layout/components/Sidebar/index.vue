<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { useRouter, useRoute } from 'vue-router'
import variables from '@/styles/variables.scss.js'
export default {
  name: 'SideBar',
  components: { Logo, SidebarItem },
  setup() {
    const $router = useRouter()
    const $route = useRoute()
    const $store = useStore()

    const routes = computed(() => $router.options.routes)
    const activeMenu = computed(() => {
      const route = $route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const showLogo = computed(() => $store.state.settings.sidebarLogo)

    const isCollapse = computed(() => !$store.state.app.sidebar.opened)

    return { routes, activeMenu, showLogo, isCollapse, variables }
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

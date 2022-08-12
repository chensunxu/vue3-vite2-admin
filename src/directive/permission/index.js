import store from '@/store'

export const permission = (app) => {
  app.directive('permission', {
    mounted(el, binding) {
      const { value } = binding

      const roles =
        store.getters &&
        store.getters.userInfo &&
        store.getters.userInfo.permission
      if (value && value instanceof Array && value.length > 0) {
        const permissionRoles = value

        const hasPermission = roles.some((role) => {
          return permissionRoles.includes(role)
        })

        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error(`need roles! Like v-permission="['admin','editor']"`)
      }
    }
  })
}

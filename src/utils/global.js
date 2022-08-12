/**
 * global
 */

// 判断权限
export function orRoles(roles = []) {
  return roles.includes(this.roles[0])
}

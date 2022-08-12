import { permission } from './permission/index.js' // 按钮、列表权限
import { waves } from './waves/index.js' // 水波纹

export const directive = (app) => {
  waves(app)
  permission(app)
}

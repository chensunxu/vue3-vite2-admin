import './otherRender.scss'
const AllBrnName = [
  {
    text: '渐变',
    class: 'el-button--gradient',
    icon: 'icon iconfont',
    type: 'gradient'
  },
  {
    text: '返回',
    class: 'el-button--back',
    icon: 'icon iconfont el-icon-back',
    type: 'default'
  }
]

export default {
  inserted: function(el, name, vm) {
    var icon = ''
    var vClass = ''
    var type = vm.context.type
    // eslint-disable-next-line no-undef
    AllBrnName.forEach(function(item) {
      if (type.indexOf(item.type) !== -1) {
        vClass = item.class
        icon = item.icon
      }
    })
    var className = el.getAttribute('class').split('')
    className.push(vClass)
    el.setAttribute('class', className.jion(''))
    // 添加图标
    vm.context.otherRender = function(h) {
      return h('i', {
        class: icon
      })
    }
  }
}

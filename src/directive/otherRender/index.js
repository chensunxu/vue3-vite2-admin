import otherRender from './otherRender'

const install = function(Vue) {
  Vue.directive('otherRender', otherRender)
}

if (window.Vue) {
  window['otherRender'] = otherRender
  Vue.use(install); // eslint-disable-line
}

otherRender.install = install
export default otherRender

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { getList } from '../src/api/table'
import '../mock/table'
export default {
  name: 'App',
  setup() {
    // getList().then((res) => {
    //   console.log(res)
    // })
  }
}
</script>

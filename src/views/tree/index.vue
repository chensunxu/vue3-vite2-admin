<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px"
    />

    <el-tree
      ref="treeRef"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import { watch, ref } from 'vue'

export default {
  setup() {
    const defaultProps = {
      children: 'children',
      label: 'label'
    }

    const data2 = [
      {
        id: 1,
        label: 'Level one 1',
        children: [
          {
            id: 4,
            label: 'Level two 1-1',
            children: [
              {
                id: 9,
                label: 'Level three 1-1-1'
              },
              {
                id: 10,
                label: 'Level three 1-1-2'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: 'Level one 2',
        children: [
          {
            id: 5,
            label: 'Level two 2-1'
          },
          {
            id: 6,
            label: 'Level two 2-2'
          }
        ]
      },
      {
        id: 3,
        label: 'Level one 3',
        children: [
          {
            id: 7,
            label: 'Level two 3-1'
          },
          {
            id: 8,
            label: 'Level two 3-2'
          }
        ]
      }
    ]
    const filterNode = (value, data) => {
      if (!value) return true
      return data.label.includes(value)
    }

    const filterText = ref('')
    const treeRef = ref(null)
    watch(filterText, (val) => {
      treeRef.value.filter(val)
    })
    return { data2, filterNode, defaultProps, filterText, treeRef }
  },
  methods: {}
}
</script>

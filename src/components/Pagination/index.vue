<template>
  <div
    :class="{ hidden: hidden }"
    class="pagination-container"
    :style="getStyle"
  >
    <el-pagination
      :prev-text="prevText"
      :next-text="nextText"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :small="small"
      :disabled="disabled"
      :background="background"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
// import { scrollTo } from '@/utils/scroll-to'
import { computed } from 'vue'

export default {
  name: 'PaginationIndex',
  props: {
    disabled: {
      required: false,
      type: Boolean
    },
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    nextText: {
      type: String,
      default: ''
    },
    prevText: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:limit', 'update:page', 'pagination'],
  setup(props, { emit }) {
    const getStyle = computed(() => {
      const backgroundColor = props.backgroundColor
      return `background:${backgroundColor}px`
    })

    const currentPage = computed({
      get() {
        return props.page
      },
      set(val) {
        emit('update:page', val)
      }
    })

    const pageSize = computed({
      get() {
        return props.limit
      },
      set(val) {
        emit('update:limit', val)
      }
    })

    const handleSizeChange = (val) => {
      emit('pagination', { page: currentPage, limit: val })
      // if (props.autoScroll) {
      //   scrollTo(0, 800)
      // }
    }
    const handleCurrentChange = (val) => {
      emit('pagination', { page: val, limit: pageSize })
      // if (props.autoScroll) {
      //   scrollTo(0, 800)
      // }
    }
    return {
      getStyle,
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.pagination-container {
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>

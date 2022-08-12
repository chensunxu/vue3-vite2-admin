<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template v-slot="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="Title">
        <template v-slot="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template v-slot="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template v-slot="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getListData"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index.vue'
import { getList } from '@/api/table'
import { computed, reactive, toRefs } from 'vue'

const getTagTypeEffect = () => {
  const getTagType = computed(() => (status) => {
    const statusMap = {
      published: 'success',
      draft: 'gray',
      deleted: 'danger'
    }
    return statusMap[status]
  })
  return { getTagType }
}

const listEffect = () => {
  const listStage = reactive({
    total: 0,
    list: [],
    listLoading: true,
    listQuery: {
      page: 1,
      limit: 10
    }
  })
  const getListData = () => {
    listStage.listLoading = true
    getList().then((res) => {
      listStage.list = res.data.items
      listStage.total = res.data.total
      listStage.listLoading = false
    })
  }
  return { getListData, listStage }
}

export default {
  components: {
    Pagination
  },
  setup() {
    const { getTagType } = getTagTypeEffect()
    const { getListData, listStage } = listEffect()
    getListData()

    return { getTagType, getListData, ...toRefs(listStage) }
  }
}
</script>

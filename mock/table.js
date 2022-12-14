import Mock from 'mockjs'

Mock.setup({
  timeout: 1000
})

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      'status|1': ['published', 'draft', 'deleted'],
      author: 'name',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)'
    }
  ]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: () => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items
        }
      }
    }
  }
]

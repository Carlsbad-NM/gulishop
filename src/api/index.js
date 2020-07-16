// 这个文件是项目的接口请求函数文件
// 给每个接口发送请求，都封装成一个函数，需要请求拿数据时，就调用对应函数
import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'

// 请求获取三级分类列表数据
export const reqCategoryList = () => Ajax({
  url: '/product/getBaseCategoryList',
  method: 'GET'
})

// 使用mock的接口去请求数据
export const reqBannerList = () => mockAjax.get('/banner')
export const reqFloorList = () => mockAjax.get('/floor')
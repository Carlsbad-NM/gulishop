import Mock from 'mockjs'
// json数据被引入之后会变为真正的数组，不再是json串了
import banner from './banner.json'
import floor from './floor.json'

// 第一个参数，是我们要请求的模拟接口路径
// 第二个参数，是访问这个接口后返回的数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })

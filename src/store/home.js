import { reqCategoryList } from '@/api'

const state = {
  categoryList: []
}

const mutations = {
  // 直接修改数据
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  }
}

const actions = {
  // 异步请求数据
  async getCategoryList({ commit }) {
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('RECEIVECATEGORYLIST', result.data)
    }
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
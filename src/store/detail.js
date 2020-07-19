import { reqGoodsDetailInfo } from '@/api'

const state = {
  goodsDetailInfo: {}
}

const mutations = {
  // 直接修改数据
  RECEIVEGOODSDETAILINFO(state, goodsDetailInfo) {
    state.goodsDetailInfo = goodsDetailInfo
  }

}

const actions = {
  //异步请求数据
  async getGoodsDetailInfo({ commit }, skuId) {
    const result = await reqGoodsDetailInfo(skuId)
    if (result.code === 200) {
      commit('RECEIVEGOODSDETAILINFO', result.data)
    }
  },
}

const getters = {
  categoryView(state) {
    return state.goodsDetailInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsDetailInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsDetailInfo.spuSaleAttrList || []
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
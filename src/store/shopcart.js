import {
  reqAddOrUpdateShopCart,
  reqShopCartList,
  reqUpdateIsChecked,
  reqDeleteCart
} from "@/api";

const state = {
  shopCartList: []
};

const mutations = {
  // 直接修改数据
  RECEIVESHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  }
};

const actions = {
  //异步请求数据
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code === 200) {
      return "添加成功";
    } else {
      return Promise.reject(new Error("添加失败"));
    }
  },
  async getShopCartList({ commit }) {
    const result = await reqShopCartList();
    if (result.code === 200) {
      commit("RECEIVESHOPCARTLIST", result.data);
    }
  },
  async updateIsChecked({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateIsChecked(skuId, isChecked);
    if (result.code === 200) {
      return "修改成功";
    } else {
      return Promise.reject(new Error("修改失败"));
    }
  },

  updateAllIsChecked({ commit, state, dispatch }, isChecked) {
    let promises = [];
    state.shopCartList.forEach(item => {
      if (item.isChecked === isChecked) return;
      let promise = dispatch("updateIsChecked", {
        skuId: item.skuId,
        isChecked: isChecked
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  },

  async deleteShopCart({ commit }, skuId) {
    const result = await reqDeleteCart(skuId)
    if (result.code === 200) {
      return '删除成功'
    } else {
      return Promise.reject(new Error("删除失败"));
    }
  },

  deleteCheckedShopCard({ commit, state, dispatch }) {
    let promises = []
    state.shopCartList.forEach(item => {
      if (!item.isChecked) return
      let promise = dispatch('deleteShopCart', item.shuId)
      promises.push(promise)
    })
    return Promise.all(promises)
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};

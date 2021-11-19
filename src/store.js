import axiousObjsct from "./helper/api";

export const storeObject = {
  state: {
    targetType: 'bike',
    sortList: [
      { name: 'bike', on: true },
      { name: 'stop', on: false },
      { name: 'scenicspot', on: true },
      { name: 'restaurant', on: false }
    ],
    position: {
      latitude: "25.046951",
      longitude: "121.516887", // 預設台北車站
    },
    expandMContent: false
  },
  getters: {
    targetType: state => state.targetType,
    sortList: state => state.sortList,
    expandMContent: state => state.expandMContent
  },
  mutations: {
    CHECKOUT_TARGET_TYPE(state, targetType) {
      state.targetType = targetType;
    },
    CHANGE_SORT_LIST_ON(state, sortOn) {
      const on = sortOn[0];
      const off = sortOn[1];
      state.sortList[on].on = true;
      state.sortList[off].on = false;
    },
    SET_POSITION(state, position) {
      state.position = position;
    },
    TOGGLE_M_CONTENT_SHOW(state, toggle) {
      state.expandMContent = toggle;
    }
  },
  actions: {
    // 更改 navbar 的類型
    checkoutTargetType({ commit }, targetType) {
      commit("CHECKOUT_TARGET_TYPE", targetType);
    },
    // 更改第二層搜尋類型
    changeSortList({ commit }, targetIndex) {
      switch (targetIndex) {
        case 0:
          commit("CHANGE_SORT_LIST_ON", [0, 1]);
          break;
        case 1:
          commit("CHANGE_SORT_LIST_ON", [1, 0]);
          break;
        case 2:
          commit("CHANGE_SORT_LIST_ON", [2, 3]);
          break;
        case 3:
          commit("CHANGE_SORT_LIST_ON", [3, 2]);
          break;
        default:
          break;
      }
    },
    // 定位目前位置
    setCurrentPosition({ commit }, position) {
      if (position) {
        commit("SET_POSITION", position)
      }
    },
    toggleMContent({ commit }, toggle) {
      commit("TOGGLE_M_CONTENT_SHOW", toggle);
    },
    // 取得資料列表
    getDataList({ commit }) {
      if (this.state.targetType === 'bike') {
        const target = this.state.sortList[0].on ? this.state.sortList[0] : this.state.sortList[1];
        console.log(target);
      } else if (this.state.targetType === 'scenicspot') {
        const target = this.state.sortList[2].on ? this.state.sortList[2] : this.state.sortList[3];
        console.log(target);
      } else if (this.state.targetType === 'route') {
        console.log('search route')
      } else {
        console.log('搜尋類型錯誤');
      }
      // console.log(axiousObjsct("Bike/Station/NearBy"))
      // console.log(position);
    }
  }
}

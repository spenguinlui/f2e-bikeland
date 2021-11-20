import axios from 'axios';
import api from "./helper/api";

const roundX = (val, precision) => Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));

const distance = (lat1, lon1, lat2, lon2) => {
  if (!((lat1 == lat2) && (lon1 == lon2))) {
    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  } else {
    return 0;
  }
}
const distanceZh = (dist) => {
  let distStr = '0公尺';
  if (dist <= 1) {
    distStr = `${Math.round(dist * 1000)}公尺`;
  } else {
    distStr = `${roundX(dist, 2)}公里`;
  }
  return distStr;
}
const cityHash = {
  "TXG": "Taichung",
  "HSZ": "Hsinchu",
  "MIA": "MiaoliCounty",
  "NWT": "NewTaipei",
  "PIF": "PingtungCounty",
  "KIN": "KinmenCounty",
  "TAO": "Taoyuan",
  "TPE": "Taipei",
  "KHH": "Kaohsiung",
  "TNN": "Tainan",
  "CYI": "Chiayi"
}

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
    isLoading: false,
    expandMContent: false,
    mContentData: {},
    bikeDataList: [],
    currentCity: '',
    routeDataList: [],
    spotDataList: [],
    restaurantDataList: []
  },
  getters: {
    targetType: state => state.targetType,
    sortList: state => state.sortList,
    expandMContent: state => state.expandMContent,
    mContentData: state => state.mContentData,
    bikeDataList: state => state.bikeDataList,
    routeDataList: state => state.routeDataList,
    spotDataList: state => state.spotDataList,
    restaurantDataList: state => state.restaurantDataList,
    isLoading: state => state.isLoading
  },
  mutations: {
    // 切換搜尋類型 找單車/找路線/找景點
    CHECKOUT_TARGET_TYPE(state, targetType) {
      state.targetType = targetType;
    },
    // 更改目前子選單 找單車/找車位/找景點／找餐廳
    CHANGE_SORT_LIST_ON(state, sortOn) {
      const on = sortOn[0];
      const off = sortOn[1];
      state.sortList[on].on = true;
      state.sortList[off].on = false;
    },
    // 設定目前位置座標
    SET_POSITION(state, position) {
      state.position = position;
    },
    // 切換 mobile 景點/餐廳詳細內容顯示
    TOGGLE_M_CONTENT_SHOW(state, toggle) {
      state.expandMContent = toggle;
    },
    // 更新自行車站點資料
    UPDATE_BIKE_DATA_LIST(state, data) {
      state.bikeDataList = data;
    },
    // 確認目前位置城市 -- 路線用到
    GET_CURRNET_CITY(state, cityCode) {
      state.currentCity = cityHash[cityCode];
    },
    // 更新自行車路線資料
    UPDATE_ROUTE_DATA_LIST(state, data) {
      state.routeDataList = data;
    },
    // 更新景點資料
    UPDATE_SPOT_DATA_LIST(state, data) {
      state.spotDataList = data;
      console.log(state.spotDataList)
    },
    // 更新餐廳資料
    UPDATE_RESTAURANT_DATA_LIST(state, data) {
      state.restaurantDataList = data;
      console.log(state.restaurantDataList)
    },
    // 依照距離位置排序
    SORT_BY_DISTANCE(state) {
      state.bikeDataList = state.bikeDataList.sort((a, b) => a.Distance - b.Distance)
    },
    // 依照可租用量排序
    SORT_BY_RENT(state) {
      state.bikeDataList = state.bikeDataList.sort((a, b) => b.AvailableRentBikes - a.AvailableRentBikes)
    },
    // 依照可還車量排序
    SORT_BY_RETURN(state) {
      state.bikeDataList = state.bikeDataList.sort((a, b) => b.AvailableReturnBikes - a.AvailableReturnBikes)
    },
    // 更換 mobile 版本景點資料
    CHECKOUT_M_CONTENT(state, index) {
      if (this.state.sortList[2].on) {
        console.log(this.state.spotDataList[index])
        state.mContentData = this.state.spotDataList[index];
      } else {
        state.mContentData = this.state.restaurantDataList[index];
      }
    },
    // 有空在做
    DATA_LOADING(state, isLoading) {
      state.isLoading = isLoading;
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
      if (position) commit("SET_POSITION", position)
    },
    // 切換 mobile 景點內容顯示
    toggleMContent({ commit }, toggle) {
      commit("TOGGLE_M_CONTENT_SHOW", toggle);
    },
    // 取得自行車資料列表
    getBikeDataList({ commit }) {
      commit("DATA_LOADING", true);
      const stationQuery = { position: this.state.position, select: ['StationUID', 'AuthorityID','StationName', 'StationPosition'] }
      const availabilityQuery = { position: this.state.position, select: ['StationUID', 'AvailableRentBikes', 'AvailableReturnBikes'] }
      const header = api.authorizationHeader();
      
      let dataList = [];
      axios({
        method: 'get',
        url: api.urlQueryStr("Bike/Station/NearBy", stationQuery),
        headers: header
      })
      .then((res) => {
        dataList =  res.data; // 保存第一次站點資料
        commit("GET_CURRNET_CITY", dataList[0].AuthorityID);
        axios({
          method: 'get',
          url: api.urlQueryStr("Bike/Availability/NearBy", availabilityQuery),
          headers: header
        })
        .then((res) => {
          let avaDataList = res.data;
          avaDataList = avaDataList.map((data) => {
            let findData = dataList.find((d) => d.StationUID === data.StationUID);
            if (findData) data = {...data, ...findData}
            data.StationName.Zh_tw = data.StationName.Zh_tw.replace("YouBike1.0_", "1.0");
            data.StationName.Zh_tw = data.StationName.Zh_tw.replace("YouBike2.0_", "2.0");
            data.Distance = distance(data.StationPosition.PositionLat, data.StationPosition.PositionLon, this.state.position.latitude, this.state.position.longitude);
            data.DistanceZH = distanceZh(data.Distance);
            return data;
          })
          commit("UPDATE_BIKE_DATA_LIST", avaDataList);
          commit("DATA_LOADING", false);
        }).catch(() => {
          // 錯誤處理
          commit("DATA_LOADING", false);
        })
      }).catch(() => {
        // 錯誤處理
        commit("DATA_LOADING", false);
      })
    },

    // 取得自行車路線資料
    getRouteDataList({ commit }){
      const header = api.authorizationHeader();
      if (this.state.currentCity) { return } // 沒有可選定縣市就不用繼續查了
      axios({
        method: 'get',
        url: api.urlQueryStr(`Cycling/Shape/${this.state.currentCity}`, { top: 30 }),
        headers: header
      }).then((res) => {
        commit("UPDATE_ROUTE_DATA_LIST", res.data);
      }).catch(() => {
        // 錯誤處理
      })
    },

    // 取得景點資料
    getSpotDataList({ commit }) {
      const header = api.authorizationHeader();
      const dataType = this.state.sortList[2].on ? "Tourism/ScenicSpot" : "Tourism/Restaurant";
      axios({
        method: 'get',
        url: api.urlQueryStr(`${dataType}/`, { position: this.state.position }),
        headers: header
      }).then((res) => {
        if (this.state.sortList[2].on) {
          commit("UPDATE_SPOT_DATA_LIST", res.data);
        } else {
          commit("UPDATE_RESTAURANT_DATA_LIST", res.data);
        }
      }).catch(() => {
        // 錯誤處理
      })
    }
  }
}

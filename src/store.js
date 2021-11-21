import axios from 'axios';
import api from "./helper/api";
import L from 'leaflet';

import SpotIcon from "./assets/images/spot-maker.svg";

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
const countChangeClass = (dataCount) => {
  const calssName = dataCount === 0 ? 'disable' : dataCount < 5 ? 'limit' : 'default';
  return calssName
}

const createBikeMarker = (dataCount) => {
  const markerIcon = countChangeClass(dataCount);
  return new L.DivIcon(
    {
      className: 'bike-maker-icon-dafault',
      html: `
        <div class="bike-maker-icon ${markerIcon}">
          <span class="bike-maker-icon-text">${dataCount}</span>
        </div>
      `
    })
}

const spotMarker = () => {
  return L.icon({
    iconUrl: SpotIcon,
    iconSize: [62, 62],
  })
}

const createBikePopupObj = (data) => {
  return `
    <div class="tooltips-title">${data.StationName.Zh_tw}</div>
    <div class="tooltips-content">
      <div class="block-left">
        <div class="bike-block ${countChangeClass(data.AvailableRentBikes)}"><i class="fas fa-bicycle"></i>${data.AvailableRentBikes}</div>
        <div class="stop-block ${countChangeClass(data.AvailableReturnBikes)}"><i class="fas fa-parking"></i>${data.AvailableReturnBikes}</div>
      </div>
      <div class="block-right"><i class="fas fa-map-marker-alt"></i>距離 ${data.DistanceZH}</div>
    </div>
  `
}

// 移除指定 Layer 以外的 其他 Layer
const removeOtherLayers = (state, layerName) => {
  switch (layerName) {
    case 'bikeRentLayer':
      if (state.storeMap.hasLayer(state.mapLayers.bikeReTurnLayer)) state.storeMap.removeLayer(state.mapLayers.bikeReTurnLayer);
      if (state.storeMap.hasLayer(state.mapLayers.bikeRouteLayer)) state.storeMap.removeLayer(state.mapLayers.bikeRouteLayer);
      if (state.storeMap.hasLayer(state.mapLayers.spotLayer)) state.storeMap.removeLayer(state.mapLayers.spotLayer);
      if (state.storeMap.hasLayer(state.mapLayers.restaurantLayer)) state.storeMap.removeLayer(state.mapLayers.restaurantLayer);
      break;
    case 'bikeReTurnLayer':
      if (state.storeMap.hasLayer(state.mapLayers.bikeRentLayer)) state.storeMap.removeLayer(state.mapLayers.bikeRentLayer);
      if (state.storeMap.hasLayer(state.mapLayers.bikeRouteLayer)) state.storeMap.removeLayer(state.mapLayers.bikeRouteLayer);
      if (state.storeMap.hasLayer(state.mapLayers.spotLayer)) state.storeMap.removeLayer(state.mapLayers.spotLayer);
      if (state.storeMap.hasLayer(state.mapLayers.restaurantLayer)) state.storeMap.removeLayer(state.mapLayers.restaurantLayer);
      break;
    case 'bikeRouteLayer':
      if (state.storeMap.hasLayer(state.mapLayers.bikeReTurnLayer)) state.storeMap.removeLayer(state.mapLayers.bikeReTurnLayer);
      if (state.storeMap.hasLayer(state.mapLayers.bikeRentLayer)) state.storeMap.removeLayer(state.mapLayers.bikeRentLayer);
      if (state.storeMap.hasLayer(state.mapLayers.spotLayer)) state.storeMap.removeLayer(state.mapLayers.spotLayer);
      if (state.storeMap.hasLayer(state.mapLayers.restaurantLayer)) state.storeMap.removeLayer(state.mapLayers.restaurantLayer);
      break;
    case 'spotLayer':
      if (state.storeMap.hasLayer(state.mapLayers.bikeReTurnLayer)) state.storeMap.removeLayer(state.mapLayers.bikeReTurnLayer);
      if (state.storeMap.hasLayer(state.mapLayers.bikeRouteLayer)) state.storeMap.removeLayer(state.mapLayers.bikeRouteLayer);
      if (state.storeMap.hasLayer(state.mapLayers.bikeRentLayer)) state.storeMap.removeLayer(state.mapLayers.bikeRentLayer);
      if (state.storeMap.hasLayer(state.mapLayers.restaurantLayer)) state.storeMap.removeLayer(state.mapLayers.restaurantLayer);
      break;
    case 'restaurantLayer':
      if (state.storeMap.hasLayer(state.mapLayers.bikeReTurnLayer)) state.storeMap.removeLayer(state.mapLayers.bikeReTurnLayer);
      if (state.storeMap.hasLayer(state.mapLayers.bikeRouteLayer)) state.storeMap.removeLayer(state.mapLayers.bikeRouteLayer);
      if (state.storeMap.hasLayer(state.mapLayers.spotLayer)) state.storeMap.removeLayer(state.mapLayers.spotLayer);
      if (state.storeMap.hasLayer(state.mapLayers.bikeRentLayer)) state.storeMap.removeLayer(state.mapLayers.bikeRentLayer);
      break;
    default:
      break;
  }
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
    restaurantDataList: [],
    storeMap: null,
    mapLayers: {
      bikeRentLayer: null,
      bikeReTurnLayer: null,
      bikeRouteLayer: null,
      spotLayer: null,
      restaurantLayer: null
    }
  },
  getters: {
    targetType: state => state.targetType,
    sortList: state => state.sortList,
    position: state => state.position,
    expandMContent: state => state.expandMContent,
    mContentData: state => state.mContentData,
    bikeDataList: state => state.bikeDataList,
    routeDataList: state => state.routeDataList,
    spotDataList: state => state.spotDataList,
    restaurantDataList: state => state.restaurantDataList,
    isLoading: state => state.isLoading,
    storeMap: state => state.storeMap
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
    },
    // 將地圖物件存放到 store
    SET_MAP_OBJECT(state, map) {
      state.storeMap = map;
    },
    // 存放 layer 物件
    SET_BIKE_RENT_LAYER(state, layer) {
      state.mapLayers.bikeRentLayer = layer;
    },
    SET_BIKE_RETURN_LAYER(state, layer) {
      state.mapLayers.bikeReTurnLayer = layer;
    },
    SET_SPOT_LAYER(state, layer) {
      state.mapLayers.spotLayer = layer;
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
    getBikeDataList({ commit }, init = false) {
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
            const lat = data.StationPosition.PositionLat;
            const lon = data.StationPosition.PositionLon;
            data.Distance = distance(lat, lon, this.state.position.latitude, this.state.position.longitude);
            data.DistanceZH = distanceZh(data.Distance);
            return data;
          });
          commit("UPDATE_BIKE_DATA_LIST", avaDataList);
          if (!init) {
            this.dispatch("setBikeRentDataOnMap", avaDataList);
          }
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

    // 將自行車租借資料打上地圖
    setBikeRentDataOnMap({ commit }, bikeDataList) {
      removeOtherLayers(this.state, "bikeRentLayer");
      let bikeLayer = new L.LayerGroup().addTo(this.state.storeMap);
      bikeDataList.map((data) => {
        const divIcon = createBikeMarker(data.AvailableRentBikes);
        L.marker([data.StationPosition.PositionLat, data.StationPosition.PositionLon], { icon: divIcon })
        .bindPopup(createBikePopupObj(data), { minWidth: 270, offset: [-0, -0], className: "bike-tooltips" })
          .openPopup()
          .addTo(bikeLayer);
      })
      commit("SET_BIKE_RENT_LAYER", bikeLayer);
    },

    // 將自行車還車資料打上地圖
    setBikeReTurnDataOnMap({ commit }, bikeDataList) {
      removeOtherLayers(this.state, "bikeReTurnLayer");
      let bikeLayer = new L.LayerGroup().addTo(this.state.storeMap);
      bikeDataList.map((data) => {
        const divIcon = createBikeMarker(data.AvailableReturnBikes);
        L.marker([data.StationPosition.PositionLat, data.StationPosition.PositionLon], { icon: divIcon })
          .bindPopup(createBikePopupObj(data), { minWidth: 270, offset: [-0, -0], className: "bike-tooltips" })
          .addTo(bikeLayer);
      })
      commit("SET_BIKE_RETURN_LAYER", bikeLayer);
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
          this.dispatch("setSpotDataOnMap", res.data);
        } else {
          commit("UPDATE_RESTAURANT_DATA_LIST", res.data);
          this.dispatch("setRestaurantDataOnMap", res.data);
        }
      }).catch(() => {
        // 錯誤處理
      })
    },

    // 將景觀資料打上地圖
    setSpotDataOnMap({ commit }, spotDataList) {
      removeOtherLayers(this.state, "spotLayer");
      let spotLayer = new L.LayerGroup().addTo(this.state.storeMap);
      spotDataList.map((data) => {
        L.marker([data.Position.PositionLat, data.Position.PositionLon], { icon: spotMarker() })
          .bindPopup(data.Name, { offset: [-10, -10], className: "spot-tooltips" })
          .openPopup()
          .addTo(spotLayer);
      })
      commit("SET_SPOT_LAYER", spotLayer);
    },

    // 將餐廳資料打上地圖
    setRestaurantDataOnMap({ commit }, spotDataList) {
      removeOtherLayers(this.state, "restaurantLayer");
      let restaurantLayer = new L.LayerGroup().addTo(this.state.storeMap);
      spotDataList.map((data) => {
        L.marker([data.Position.PositionLat, data.Position.PositionLon], { icon: spotMarker() })
          .bindPopup(data.Name, { offset: [-10, -10], className: "spot-tooltips" })
          .openPopup()
          .addTo(restaurantLayer);
      })
      commit("SET_SPOT_LAYER", restaurantLayer);
    },
  }
}

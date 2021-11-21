<template>
  <div id="app">
    <Navbar/>
    <SearchTypeBar/>
    <template v-if="targetType === 'bike' || targetType === 'route'">
      <ListBoard/>
    </template>
    <template v-if="targetType === 'scenicspot'">
      <ListImgBoard/>
      <Content/>
      <MContent/> 
    </template>
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import { mapGetters } from 'vuex';

import Navbar from "./components/navbar.vue";
import SearchTypeBar from "./components/search_type_bar.vue";
import ListBoard from "./components/list_board.vue";
import ListImgBoard from "./components/list_img_board.vue";
import Content from "./components/content.vue";
import MContent from "./components/m_content.vue";

import CenterIcon from "./assets/images/user-position.svg";
// import BikeMakerIconDefault from "./assets/images/bike-maker-icon-default.svg";
// import BikeMakerIconLimit from "./assets/images/bike-maker-icon-limit.svg";
// import BikeMakerIconDisable from "./assets/images/bike-maker-icon-disable.svg";

const centerIcon = L.icon({
  iconUrl: CenterIcon,
  iconSize:     [38, 95],
  iconAnchor:   [22, 94],
  popupAnchor:  [-3, -76]
})

// const bikeMakerIconDefault = L.icon({
//   iconUrl: BikeMakerIconDefault,
//   iconSize:     [38, 95],
//   iconAnchor:   [22, 94],
//   popupAnchor:  [-3, -76]
// })
// const bikeMakerIconLimit = L.icon({
//   iconUrl: BikeMakerIconLimit,
//   iconSize:     [38, 95],
//   iconAnchor:   [22, 94],
//   popupAnchor:  [-3, -76]
// })
// const bikeMakerIconDisable = L.icon({
//   iconUrl: BikeMakerIconDisable,
//   iconSize:     [38, 95],
//   iconAnchor:   [22, 94],
//   popupAnchor:  [-3, -76]
// })

export default {
  name: 'App',
  data() {
    return {
      findType: 'list-board'
    }
  },
  computed: {
    ...mapGetters(['targetType', 'storeMap', 'bikeDataList'])
  },
  methods: {
    getCurrentPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setPosition(position);
          this.getData();              // 取得定位後再要一次資料
        }, (error) => {
          this.getData();
          console.log("定位失敗", error);  // 做失敗處置
        })
      } else {
        this.getData();
        console.log("無法使用定位") // 做失敗處置
      }
    },
    setPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const currentPosition = { latitude: lat, longitude: lon };
      // vuex 加入位置
      this.$store.dispatch("setCurrentPosition", currentPosition);

      // 地圖更新及移動位置
      L.marker([lat, lon], { icon: centerIcon }).addTo(this.storeMap);
      this.storeMap.flyTo([position.coords.latitude, position.coords.longitude], 16)
    },
    getData() {
      this.$store.dispatch("getBikeDataList");
      this.setBikeDataOnMap();
    },
    initMap() {
      let map = L.map('map').setView([25.046951, 121.516887], 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        opacity: 0.5
      }).addTo(map);
      this.$store.commit("SET_MAP_OBJECT", map);
    },
    setBikeDataOnMap() {
      if (this.bikeDataList.length > 0) {
        // const bikeLayer = L.LayerGroup().addTo(this.storeMap);
        this.bikeDataList.map((data) => {
          const markerIcon = data.AvailableRentBikes === 0 ? 'disable' : data.AvailableRentBikes < 5 ? 'limit' : 'default';
          const divIcon = new L.DivIcon(
            {
              className: 'bike-maker-icon-dafault',
              html: `
                <div class="bike-maker-icon ${markerIcon}">
                  <span class="bike-maker-icon-text">${data.AvailableRentBikes}</span>
                </div>
              `
            })
          L.marker([data.StationPosition.PositionLat, data.StationPosition.PositionLon], { icon: divIcon })
            .bindPopup(data.StationName.Zh_tw)
            .openPopup()
            .addTo(this.storeMap);
        })
      }
    }
  },
  components: {
    Navbar,
    SearchTypeBar,
    ListBoard,
    ListImgBoard,
    Content,
    MContent
  },
  created() {
    // 創立元件要資料 - 已預設地點防止沒定位功能
    this.getData();

    // 取得座標
    this.getCurrentPosition();

    // 之後每 15秒更新資訊
    window.setInterval(() => { this.getData() }, 15000);
  },
  mounted() {
    // #map 掛上去後初始化 Map
    this.initMap();
    // 在 store 增加方法

    // this.$store.dispatch("setMakerToMap");
  }
}

</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#map {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.bike-maker-icon {
  width: 58px;
  height: 77px;
  &.default {
    background-image: url("./assets/images/bike-maker-icon-default.svg");
    color: $primary-500;
  }
  &.limit {
    background-image: url("./assets/images/bike-maker-icon-limit.svg");
    color: $alert-500;
  }
  &.disable {
    background-image: url("./assets/images/bike-maker-icon-disable.svg");
    color: $grey-500;
  }
  .bike-maker-icon-text {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 14px;
    top: 16px;
    @include font-h5;
    color: inherit;
  }
}
</style>
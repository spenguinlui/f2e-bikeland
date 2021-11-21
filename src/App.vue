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

const centerIcon = L.icon({
  iconUrl: CenterIcon,
  iconSize: [40, 40],
})

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
        }, () => {
          // 拿不到當下位置就用預設座標跑
          this.$store.dispatch("setBikeRentDataOnMap", this.bikeDataList);
        })
      } else {
        // 拿不到當下位置就用預設座標跑
        this.$store.dispatch("setBikeRentDataOnMap", this.bikeDataList);
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
    getInitData() {
      this.$store.dispatch("getBikeDataList", true);
    },
    getData() {
      this.$store.dispatch("getBikeDataList");
    },
    initMap() {
      let map = L.map('map').setView([25.046951, 121.516887], 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        opacity: 0.5
      }).addTo(map);
      this.$store.commit("SET_MAP_OBJECT", map);
    },
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
    this.getInitData();

    // 取得座標
    this.getCurrentPosition();

    // 之後每 15秒更新資訊 -- 先不實裝
    // window.setInterval(() => { this.getData() }, 15000);
  },
  mounted() {
    this.initMap();
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
.bike-tooltips {
  width: 344px;
  // height: 96px;
  .leaflet-popup-content-wrapper {
    box-shadow: none;
  }
  .leaflet-popup-tip-container {
    display: none;
  }
  .leaflet-popup-content {
    margin: 0;
  }
  background-color: $grey-100;
  border: 2px solid $primary-300;
  box-shadow: $card-show;
  border-radius: 8px;
  padding: 16px 24px;
  @include flex-column-center-baseline;
  .tooltips-title {
    @include font-content(1);
    color: $primary-500;
    margin: 8px 0;
  }
  .tooltips-content {
    @include flex-row-space-between-center;
    width: 100%;
    .block-left {
      @include flex-row-center-center;
      .bike-block, .stop-block {
        padding: 4px 12px;
        background-color: $primary-100;
        @include font-button(1);
        color: $primary-500;
        border-radius: 4px;
        &.limit {
          background-color: $alert-100;
          color: $alert-500;
        }
        &.disable {
          background-color: $grey-200;
          color: $grey-500;
        }
      }
      .bike-block {
        margin-right: 12px;
      }
    }
    .block-right {
      @include font-button;
      font-weight: 500;
      color: $grey-500;
    }
  }
}
</style>